exports.get = function(req, res) {
    console.log('main');
    var user = require('middleware/userData')(req);
    res.render('frontpage', {"user":user});
};
