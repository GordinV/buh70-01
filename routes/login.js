var userid = require('../models/userid'),
    async = require('async'),
    HttpError = require('error').HttpError,
    errorMessage = '';


exports.get = function (req, res) {
    res.render('login', {"title": 'login', "errorMessage":errorMessage});
};


exports.post = function (req, res, next) {
    var username = req.body.username,
        password = req.body.password;

    async.waterfall([
        function (callback) {
            //Loooking for acccount and loading login data
            userid.getUserId(username, 1, function (err, kasutaja) {
                if (err) return next(err);

                console.log('session:' + req.session.userId);
                errorMessage = null;
                req.session.user = {
                    id: kasutaja.id,
                    login: kasutaja.kasutaja,
                    userName: kasutaja.ametnik,
                    userAsutus: kasutaja.asutus,
                    userAsutusId:kasutaja.rekvid,
                    userLastLogin: kasutaja.last_login,
                    userAccessList: kasutaja.allowed_access,
                    userLibraryList: kasutaja.allowed_libs
                };
                console.log( req.session.user.userName);
                callback(null, kasutaja);
            });
        },
        // checking for password
        function (kasutaja, callback) {
            console.log('checking for password');
            userid.updateUserPassword(username, password, kasutaja.parool, function (err, result) {
                if (err) return next(err);

                if (!result) {
                    var err = new HttpError(403, 'Ошибка в пароле');
                    req.session.userId = null;
                    errorMessage = 'Ошибка в пароле';
                    console.error('Ошибка в пароле');
                   // return next(err);
                }
                return callback(err, result, kasutaja);

            });
        },

        // saving lat login timestamp
        function (result,kasutaja, callback) {
            if (result) {
                userid.updateUseridLastLogin(kasutaja.id, function(err, result) {
                    callback(err, result);
                });
            }
        },

    ],
        // finished
        function (err, result) {
        if (err) return next(err);
//        res.status(200).send();
 //       res.end();
        if (errorMessage) {
            //back to login
            res.redirect('/login');
        }   else {
            // open main page
            console.log('redirect main page');
            res.redirect('/main');
        }
    });
};