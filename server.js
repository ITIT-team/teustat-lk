const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const path = require('path')
require('dotenv').config()

const port = process.env.PORT || 3001

app.use(cookieParser())
app.use(express.json({ extended: true }))

app.use(
    '/auth',
    require('./server/routes/auth.routes')
)

app.use(
    '/api',
    require('./server/middlewares/accessors/verify.accessor'),
    require('./server/routes/api.routes')
)

app.use(
    '/panel',
    require('./server/middlewares/accessors/verify.accessor'),
    require('./server/middlewares/accessors/panel.accessor'),
    require('./server/routes/panel.routes')
)

if (!process.env.DEV){
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))
    app.get('*', (_, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.listen(port, err => {
    if (err){
        console.log(err)
        process.exit(1)
    }
    console.log(`Server successfuly started on ${port} port`)
})
