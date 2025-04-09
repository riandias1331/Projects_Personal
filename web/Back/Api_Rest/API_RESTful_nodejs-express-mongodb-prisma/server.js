require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const routes = require('./routes.js')
app.use(routes)

const mongoose = require('mongoose')
const connectMDB = process.env.DATABASE_URL

mongoose.connect(connectMDB)
    .then(() => {
        console.log('Connected dataBase')
        app.emit('DataBase')
    })
    .catch((e) => console.log(e))

app.on('DataBase', () => {
    app.listen(port, () => {
        console.log('server is running')
        console.log(`http://localhost:${port}`)
    })
})
