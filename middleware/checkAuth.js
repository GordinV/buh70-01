
module.exports = function(req, res, next) {
    if (!req.session.user) {
        return next(new Error(401,'Autoriseeerimise viga'));
    }
    next();
}