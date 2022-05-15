const { jwtVerify } = require('../../utils/jwt.verify')

const accessVerify = (req, res, next) => {
    try {
        const { userId, accessLevel } = jwtVerify(req.cookies.token)
        req['userData'] = { userId, accessLevel }
        next()
    } catch (e) {
        res.status(403).json({
            errors: ["Invalid token"]
        })
    }
}

module.exports = accessVerify
