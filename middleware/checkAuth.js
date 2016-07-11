
module.exports = function(req, res, next) {
//    console.log('Auth');
    if (!req.session.user) {
        return next(new Error(401,'Autoriseeerimise viga'));
    }
//    console.log('Auth, done');
    next();
}