const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const routerUser = require('./routers/user.js')

app.use(morgan('short'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(routerUser)

app.get('/', (req, res) => {
    res.send('Hello Nodejs backend')
})

app.listen(6969, () => {
    console.log('Server is running')
})