const passport = require("passport")

module.exports = (req, res, next) => {
    passport.authenticate('jwt', (err, user, info) => {
        if (err) {
            return next(err)
        }
        if (!user) {
            return res.status(401).json({
                message: "Forbidden Access"
            })
        }
        req.user = user;
        return next()
    })(req, res, next)
}