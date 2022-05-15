const jwt = require('jsonwebtoken')
const jwtVerify = (cookie) => jwt.verify(cookie, process.env['SECRET_JWT'])
module.exports = {
    jwtVerify
}
