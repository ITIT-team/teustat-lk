const { jwtVerify } = require('../../utils/jwt.verify')

const accessVerify = (req, res, next) => {
    try {
        jwtVerify(req.cookies.token)
        next()
    } catch (e) {
        res.status(403).json({
            errors: ["Invalid token"]
        })
    }
}

module.exports = accessVerify
