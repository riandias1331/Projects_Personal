const express = require('express')
const route = express.Router()
const usercontroller = require('./src/controllers/UserController')

route.get('/users', usercontroller.getUsers)
route.get('/users/:id', usercontroller.getUser)
route.post('/users', usercontroller.create)
route.put('/users/:id', usercontroller.updateUser)
route.delete('/users/:id', usercontroller.deleteUser)
route.delete('/users', usercontroller.deleteUsers)

module.exports = route