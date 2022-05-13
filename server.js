const express = require('express')
const app = express()
const path = require('path')
require('dotenv').config()

const port = process.env.PORT || 3001

if (!process.env.DEV){
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))
    app.get('*', (_, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.use(express.json({ extended: true }))
app.use('/auth', require('./server/routes/auth.routes'))

app.listen(port, err => {
    if (err){
        console.log(err)
        process.exit(1)
    }
    console.log(`Server successfuly started on ${port} port`)
})