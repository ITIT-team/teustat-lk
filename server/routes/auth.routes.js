const { Router } = require('express')
const rt = Router()
const verifyAccessor = require('../middlewares/accessors/verify.accessor')
const { myfetch } = require('../utils/my.fetch')
const { jwtEncode } = require('../utils/jwt.encode')
const { checkErrors } = require('../utils/global/check.errors')
const { errorInHuman } = require('../utils/global/translate.errors')

rt.post(
    '/authorization',
    require('../middlewares/validators/login.validator'),
async (request, response) => {
    const errors = checkErrors(request)
    if (errors) return response.status(403).json({ errors })

    const { body } = request
    const { email, password, remember } = body
    try {
        const res = await myfetch({
            path: '/login',
            body
        })
        let userData = await res.json()
        if (userData.error){
            throw new Error(userData.error)
        }
        const {
            userId,
            accessLevel,
        } = userData
        const accessToken = jwtEncode({ userId, accessLevel, email, password })
        const cookieOptions = remember ? { maxAge: 2592000000, httpOnly: true } : { httpOnly: true }
        response.cookie('teustat_token', accessToken, cookieOptions)
        delete userData.userId
        response.status(200).json(userData)
    } catch (e) {
        response.status(403).json({ errors: [errorInHuman[e.message] || e.message] })
    }
})

rt.post(
    '/passive_authorization',
    verifyAccessor,
async (request, response) => {
    const { userData } = request
    const { email, password } = userData
    try {
        const res = await myfetch({
            path: '/login',
            body: { email, password }
        })
        let newUserData = await res.json()
        if (newUserData.error){
            throw new Error(newUserData.error)
        }
        const {
            userId,
            accessLevel,
        } = newUserData
        const accessToken = jwtEncode({ userId, accessLevel, email, password })
        response.cookie('teustat_token', accessToken, { maxAge: 2592000000, httpOnly: true })
        delete newUserData.userId
        response.status(200).json(newUserData)
    } catch (e) {
        response.status(403).json({ errors: [errorInHuman[e.message] || e.message] })
    }
})

rt.post(
    '/remember',
    require('../middlewares/validators/remember.validator'),
async(request, response) => {
    const errors = checkErrors(request)
    if (errors) return response.status(403).json({ errors })

    const { body } = request
    try {
        const res = await myfetch({
            path: '/repeatPass',
            body
        })
        const data = await res.json()
        if (data.error){
            throw new Error(data.error)
        }
        response.status(200).json(["Пароль направлен вам на электронную почту"])
    } catch (e) {
        response.status(403).json({
            errors: [errorInHuman[e.message] || e.message]
        })
    }
})

rt.post(
    '/logout',
async(_, response) => {
    response.clearCookie('teustat_token')
    response.status(200).json({ status: 'ok' })
})

module.exports = rt
