const express = require('express')
const app = express()

const port = process.env.PORT || 3333


const route = require('./routes')
app.use(route)

//middlewares
app.use(express.urlencoded({ extended: true}))
app.use(express.json())

app.listen(port, () => {
    console.log('server is running in port: ', port)
    console.log('http://localhost:3333')
})