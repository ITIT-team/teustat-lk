const { Router } = require('express')
const res = require('express/lib/response')
const rt = Router()

rt.post(
    '/myroute',
    require('../middlewares/accessors/verify.accessor'),
async (request, response) => {
    const { body } = request
    try {
        response.status(200).json({
            body
        })
    } catch (e) {
        response.status(403).json(e)
    }
})

module.exports = rt
