require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3333

const bodyparser = require('body-parser')
app.use(bodyparser.json())

const route = require('./routes')
app.use(route)

const mongoose = require('mongoose')



mongoose.connect(process.env.connectionString)
    .then(() => {
        console.log('Connected')
        app.emit('database')
    }).catch((e) => console.log(e))



app.on('database', () => {
    app.listen(port, () => {
        console.log('Server is running in port: ', port)
    })
})
