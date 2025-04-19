const express = require('express')
const router = express.Router();

const controller = require('./src/controllers/userController')

router.get('/users', controller.getAllUsers);
router.get('/users/:id', controller.getUserById);
router.post('/users', controller.createUser);
router.put('/users/:id', controller.updateUser);
router.delete('/users/:id', controller.deleteUser);

module.exports = router;