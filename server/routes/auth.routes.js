const { Router } = require('express')
const { validationResult } = require('express-validator')
const rt = Router()
const { myfetch } = require('../utils/my.fetch')
const { jwtEncode } = require('../utils/jwt.encode')
const { checkErrors } = require('../utils/global/check.errors')

rt.post(
    '/authorization',
    require('../middlewares/validators/email.validator'),
    require('../middlewares/validators/password.validator'),
async (request, response) => {
    const errors = checkErrors(request)
    if (errors) return response.status(403).json({ errors })

    const { body, headers } = request
    try {
        const res = await myfetch({
            path: '/login',
            method: 'POST',
            body,
            headers
        })
        const userData = await res.json()
        const {
            userId,
            accessLevel,
            name,
            companies
        } = userData
        const accessToken = jwtEncode({ userId, accessLevel })
        response.cookie('token', accessToken, { maxAge: 2592000000, httpOnly: true })
        response.status(200).json({ name, companies })
    } catch (e) {
        response.status(403).json({ errors: e })
    }
})

rt.post(
    '/remember',
    require('../middlewares/validators/email.validator'),
async(request, response) => {
    const errors = checkErrors(request)
    if (errors) return response.status(403).json({ errors })

    const { body, headers } = request
    try {
        const res = await myfetch({
            path: '/repeatPass',
            method: 'POST',
            body,
            headers
        })
        const data = await res.json()
        response.status(200).json(data)
    } catch (e) {
        console.log(e)
        response.status(403).json({ errors: e })
    }
})

module.exports = rt