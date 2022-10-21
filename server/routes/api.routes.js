const { Router } = require('express')
const rt = Router()
const { myfetch } = require('../utils/my.fetch')
const { errorInHuman } = require('../utils/global/translate.errors')
const mac = require('../middlewares/accessors/manager.accessor')
const aac = require('../middlewares/accessors/admin.accessor')

rt.post('/company_users', async (request, response) => {
    const { body } = request
    try {
        const res = await myfetch({
            path: '/lk/userCompany',
            body
        })
        const data = await res.json()
        if (data.error){
            throw new Error(data.error)
        }
        response.status(200).json(data)
    } catch (e) {
        response.status(403).json({
            errors: [errorInHuman[e.message] || e.message]
        })
    }
})

rt.post('/add_company', mac,
async (request, response) => {
    const { body } = request
    try {
        const res = await myfetch({
            path: '/lk/addCompany',
            body: { ...body, userId: request.userData.userId }
        })
        const data = await res.json()
        if (data.error){
            throw new Error(data.error)
        }
        response.status(200).json(data)
    } catch (e) {
        response.status(403).json({
            errors: [errorInHuman[e.message] || e.message]
        })
    }
})

rt.post('/remove_company', mac,
async (request, response) => {
    const { body } = request
    try {
        const res = await myfetch({
            path: '/lk/delCompany',
            body
        })
        const data = await res.json()
        if (data.error){
            throw new Error(data.error)
        }
        response.status(200).json(data)
    } catch (e) {
        response.status(403).json({
            errors: [errorInHuman[e.message] || e.message]
        })
    } 
})

rt.post('/add_user', mac,
(req, res, next) => {
    if (req.body.accessLevel > process.env.MANAGER_LEVEL){
        return aac(req, res, next)
    } else {
        next()
    }
},
async (request, response) => {
    const { body } = request
    try {
        const res = await myfetch({
            path: '/lk/addUser',
            body
        })
        const data = await res.json()
        if (data.error){
            throw new Error(data.error)
        }
        response.status(200).json(data)
    } catch (e) {
        response.status(403).json({ errors: [ errorInHuman[e.message] || e.message ] })
    }
})

rt.post('/remove_user', mac,
async (req, res, next) => {
    try {
        const { accessLevel } = await myfetch({
            path: '/lk/accessCheck',
            body: req.body
        })
        if (accessLevel > process.env.USER_LEVEL){
            return aac(req, res, next)
        } else {
            next()
        }
    } catch (e) {
        res.status(403).json({
            errors: [e]
        })
    }
},
async (request, response) => {
    const { body } = request
    try {
        const res = await myfetch({
            path: '/lk/delUser',
            body
        })
        const data = await res.json()
        if (data.error){
            throw new Error(data.error)
        }
        response.status(200).json(data)
    } catch (e) {
        response.status(403).json({
            errors: [errorInHuman[e.message] || e.message]
        })
    }
})

rt.post('/change_company', mac,
async(request, response) => {
    const { body } = request
    try {
        const res = await myfetch({
            path: '/lk/changeData/company',
            body
        })
        const data = await res.json()
        if (data.error){
            throw new Error(data.error)
        }
        response.status(200).json(data)
    } catch (e) {
        response.status(403).json({
            errors: [errorInHuman[e.message] || e.message]
        })
    }
})

rt.post('/change_user', mac,
async (req, res, next) => {
    try {
        const { accessLevel } = await myfetch({
            path: '/lk/accessCheck',
            body: req.body
        })
        if (accessLevel > process.env.USER_LEVEL){
            return aac(req, res, next)
        } else {
            next()
        }
    } catch (e) {
        res.status(403).json({
            errors: [e]
        })
    }
},
async (request, response) => {
    const { body } = request
    try {
        const res = await myfetch({
            path: '/lk/changeData/user',
            body
        })
        const data = await res.json()
        if (data.error){
            throw new Error(data.error)
        }
        response.status(200).json(data)
    } catch (e) {
        response.status(403).json({
            errors: [errorInHuman[e.message] || e.message]
        })
    }
})

rt.post('/get_archive', async (request, response) => {
    try {
        const { body } = request
        const res = await myfetch({
            path: '/rates/manageRequests/getRequestHistory',
            body: {
                ...body,
                clientId: request.userData.userId
            }
        })
        const data = await res.json()
        if (data.error){
            throw new Error(data.error)
        }
        response.status(200).json(data)
    } catch (e) {
        response.status(403).json({
            errors: [errorInHuman[e.message] || e.message]
        })
    }
})

rt.post('/remove_archive_records', async (request, response) => {
    try {
        const res = await myfetch({
            path: '/rates/manageRequests/deleteRequest',
            body: {
                ...request.body,
                clientId: request.userData.userId,
            }
        })
        const data = await res.json()
        if (data.error){
            throw new Error(data.error)
        }
        response.status(200).json(data)
    } catch (e) {
        response.status(403).json({
            errors: [errorInHuman[e.message] || e.message]
        })
    }
})

module.exports = rt
