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
            path: '/lk/login',
            body
        })
        let userData = await res.json()
        if (userData.error){
            throw new Error(userData.error)
        }
        const {
            userId,
            accessLevel,
            accessPanel,
            accessAnalytics,
        } = userData
        const accessToken = jwtEncode({ userId, accessLevel, email, password, accessPanel, accessAnalytics })
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
            path: '/lk/login',
            body: { email, password }
        })
        let newUserData = await res.json()
        if (newUserData.error){
            throw new Error(newUserData.error)
        }
        const {
            userId,
            accessLevel,
            accessPanel,
            accessAnalytics,
        } = newUserData
        const accessToken = jwtEncode({ userId, accessLevel, email, password, accessPanel, accessAnalytics })
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
            path: '/lk/repeatPass',
            body
        })
        const data = await res.json()
        if (data.error){
            throw new Error(data.error)
        }
        response.status(200).json(["пароль_направлен_на_почту"])
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
