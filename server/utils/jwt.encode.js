const jwt = require('jsonwebtoken')
const jwtEncode = (payload) => jwt.sign(payload, process.env['SECRET_JWT'])
module.exports = {
    jwtEncode
}