const { Router } = require('express')
const rt = Router()

const { myfetch } = require('../utils/my.fetch')
const mac = require('../middlewares/accessors/manager.accessor')
const aac = require('../middlewares/accessors/admin.accessor')

rt.post('/company_users', async (request, response) => {
    const { body } = request
    try {
        const res = await myfetch({
            path: '/userCompany',
            body
        })
        const data = await res.json()
        response.status(200).json(data)
    } catch (e) {
        response.status(403).json({
            errors: [e]
        })
    }
})

rt.post('/add_company', mac,
async (request, response) => {
    const { body } = request
    try {
        const res = await myfetch({
            path: '/addCompany',
            body
        })
        const data = await res.json()
        response.status(200).json(data)
    } catch (e) {
        response.status(403).json({
            errors: [e]
        })
    }
})

rt.post('/remove_company', mac,
async (request, response) => {
    const { body } = request
    try {
        const res = await myfetch({
            path: '/delCompany',
            body
        })
        const data = await res.json()
        response.status(200).json(data)
    } catch (e) {
        response.status(403).json({
            errors: [e]
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
            path: '/addUser',
            body
        })
        const data = await res.json()
        response.status(200).json(data)
    } catch (e) {
        response.status(403).json({
            errors: [e]
        })
    }
})

rt.post('/remove_user', mac,
async (req, res, next) => {
    try {
        const { accessLevel } = await myfetch({
            path: '/accessCheck',
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
            path: '/delUser',
            body
        })
        const data = await res.json()
        response.status(200).json(data)
    } catch (e) {
        response.status(403).json({
            errors: [e]
        })
    }
})

module.exports = rt
