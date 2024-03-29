const { jwtVerify } = require('../../utils/jwt.verify')

const accessVerify = (req, res, next) => {
    try {
        const {
            userId,
            accessLevel,
            email,
            password,
            accessPanel,
            accessAnalytics
        } = jwtVerify(req.cookies['teustat_token'])
        req['userData'] = { userId, accessLevel, email, password, accessPanel, accessAnalytics }
        next()
    } catch (e) {
        res.status(403).json({
            errors: ["Invalid token"]
        })
    }
}

module.exports = accessVerify
