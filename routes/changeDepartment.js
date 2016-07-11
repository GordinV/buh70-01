exports.get = function(req, res) {

// will offer departments, if exists
// 1. render template with departments
// 2. get departments list

    var departmentId = null,
        async = require('async'),
        userid = require('../models/userid'),
        user = require('middleware/userData')(req);

    if (req.params.id) {
        departmentId = req.params.id;
        async.series([
            function(callback) {
                // loading new user's data
                var login = req.session.user.login.trim();
                console.log('departId:' + departmentId + login);

                userid.getUserId(login, departmentId, function (err, kasutaja) {
                    if (err) return next(err);

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
                    callback(err, kasutaja);
                });
            },
            function(callback) {
                // saving last login
                userid.updateUseridLastLogin(req.session.user.id, function(err, result) {
                    if (err) return next(err);
                    callback(null);
                });
            },
        ], function(err) {
                if (err) return next(err);
            // redirect to main page
            console.log('redirect to main page');
            user = require('middleware/userData')(req);
            res.redirect('/');
            console.log('redirect to main page finished');
        });
    } else {
        // return dep. list
        res.render('changeDepartment', {"user":user, departmentId:departmentId});
    }
    console.log('changeDep' + user.asutus);
};
