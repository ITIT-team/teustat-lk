const express = require('express')
const app = express()
const path = require('path')
require('dotenv').config()

const { myFetch } = require('./server/utils/myFetch')

const port = process.env.PORT || 3001

app.use(express.json({ extended: true }))

if (!process.env.DEV){
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))
    app.get('*', (_, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.post('*', async (req, res) => {
    const resp = await myFetch({
        path: '/userCompany',
        body: { companyId: "280b908d-726b-11eb-9c66-ac1f6b817986" },
        headers: req.headers
    })
    console.log(resp)
    return res.status(200).json(resp)
})

app.listen(port, err => {
    if (err){
        console.log(err)
        process.exit(1)
    }
    console.log(`Server successfuly started on ${port} port`)
})