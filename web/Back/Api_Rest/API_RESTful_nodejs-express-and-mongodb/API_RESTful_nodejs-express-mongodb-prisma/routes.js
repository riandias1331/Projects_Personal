const express = require('express')
const route = express.Router()

const homeController  = require('./src/controllers/homeController')

route.post('/users', homeController.created);
route.get('/users', homeController.getUsers);
route.get('/users/:id', homeController.getUser);
route.put('/users/:id', homeController.update);
route.delete('/users/:id', homeController.deleted);
route.delete('/users', homeController.deletedAll);

module.exports = route;
