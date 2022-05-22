const { jwtVerify } = require('../../utils/jwt.verify')

const accessVerify = (req, res, next) => {
    try {
        const { userId, accessLevel, email, password } = jwtVerify(req.cookies['teustat_token'])
        req['userData'] = { userId, accessLevel, email, password }
        next()
    } catch (e) {
        res.status(403).json({
            errors: ["Invalid token"]
        })
    }
}

module.exports = accessVerify
