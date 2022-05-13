const { check } = require('express-validator')

module.exports = [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Пароль должен содержать только буквы и цифры').matches(/^[a-zA-Zа-яА-Я0-9]*$/)
]