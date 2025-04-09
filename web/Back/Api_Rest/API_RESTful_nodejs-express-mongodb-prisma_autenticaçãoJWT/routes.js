const express = require('express');
const route = express.Router();
const controller = require('./src/controlles/controller.js');
const auth = require('./src/middleware/auth.js');


// Private routes
route.put('/users/:id', auth, controller.updateUser); 
route.delete('/users/:id', auth, controller.deletedUser); 
route.delete('/users', auth, controller.deletedUserAll); 


// Public routes
route.get('/users', controller.getUsers); 
route.get('/users/:id', controller.getUser); 
route.post('/users', controller.createUser); 


module.exports = route;