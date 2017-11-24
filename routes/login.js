'use strict';

const userid = require('../models/userid'),
    async = require('async'),
    HttpError = require('./../error').HttpError,
    errorMessage = '';


exports.get = function (req, res) {
    res.render('login', {"title": 'login', "errorMessage": errorMessage});
};


exports.post = function (req, res, next) {

    let username = req.body.username,
        password = req.body.password,
        errorMessage,
        statusCode = 200;


    async.waterfall([
            function (callback) {
                //Loooking for acccount and loading login data
                userid.getUserId(username, 1, function (err, kasutaja) {
                    if (err) return callback(err, null);

                    if (!kasutaja) {
                        const err = new HttpError(403, 'No user');
                        return callback(err, null);
                    }

                    errorMessage = null;
                    req.session.user = {
                        id: kasutaja.id,
                        login: kasutaja.kasutaja,
                        userName: kasutaja.ametnik,
                        userAsutus: kasutaja.asutus,
                        userAsutusId: kasutaja.rekvid,
                        userLastLogin: kasutaja.last_login,
                        userAccessList: kasutaja.allowed_access,
                        userLibraryList: kasutaja.allowed_libs
                    };
                    global.userId = kasutaja.id;
                    global.rekvId = kasutaja.rekvid;

                    callback(null, kasutaja);
                });
            },
            // checking for password
            function (kasutaja, callback) {
                userid.updateUserPassword(username, password, kasutaja.parool, function (err, result) {
                    if (err) return callback(err, null, null);
                    let error;

                    if (!result) {
                        error = new HttpError(403, 'Ошибка в пароле');
                        req.session.user = null;
                        global.userId = null;
                        global.rekvId = null;
                        errorMessage = 'Ошибка в пароле';
                        statusCode = 403;
                        console.error('Ошибка в пароле');
                        // return next(err);
                    }
                    return callback(error, result, kasutaja);

                });
            },

            // saving last login timestamp
            function (result, kasutaja, callback) {
                if (result) {
                    userid.updateUseridLastLogin(kasutaja.id, function (err, result) {
                        callback(err, result);
                    });
                }
            },

        ],


        // finished
        function (err) {
            if (err) return next(err);

            if (errorMessage) {
                //back to login
                res.statusCode = statusCode;
                res.redirect('/login');
            } else {
                // open main page
                res.redirect('/documents');
            }
        });
};