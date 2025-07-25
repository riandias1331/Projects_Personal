require('dotenv').config()
const express = require('express')
const app = express()
const port = 3333 || process.env.PORT

const path = require('path')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const session = require('express-session') 
const MongoStore = require('connect-mongo')
const flash = require('connect-flash') 

const sessionOptions = session({
    secret: 'askodjiyfdygdlm', 
    store: MongoStore.create({ mongoUrl: process.env.CONNECTION }), 
    resave: false, 
    saveUninitialized: true, 
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, 
        httpOnly: true 
    }
})

app.use(sessionOptions) // aplica as opções de sessão configuradas
app.use(flash()) // ativa o uso de flash messages

const mongoose = require('mongoose')
mongoose.connect(process.env.CONNECTION)
    .then(() => {
        console.log('Database Connected')
        app.emit('DataBase')
    })
    .catch(() => console.log('Database is not Connected'))

const routes = require('./routes')
app.use(routes)


app.on('DataBase', () => {
    app.listen(port, () => {
        console.log('Serving is Running')
    })
})
