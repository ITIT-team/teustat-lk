const { check } = require('express-validator')

module.exports = [
    check('email', 'Некорректный email').isEmail()
]
