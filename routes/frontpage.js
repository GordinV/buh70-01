exports.get = function(req, res) {
    // check for userid in session
    var user = require('middleware/userData')(req);
    res.render('frontpage', {"user":user});
};