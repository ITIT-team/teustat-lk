const { Router } = require('express')
const { validationResult } = require('express-validator')
const rt = Router()
const { myfetch } = require('../utils/my.fetch')

rt.post(
    '/authorization',
    require('../middlewares/validators/login.validator'),
async (request, response) => {
    const validationErrors = validationResult(request)
    if (!validationErrors.isEmpty()){
        return response.status(403).json({
            errors: validationErrors.array()
        })
    }
    const { body, headers } = request
    try {
        const res = await myfetch({
            path: '/login',
            method: 'POST',
            body,
            headers
        })
        const userData = await res.json()
        response.status(200).json(userData)
    } catch (e) {
        response.status(403).json(e.errors)
    }
})

module.exports = rt