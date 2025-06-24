const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Middleware de validação básica
const validateUserData = (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }
  next();
};

router.post('/users', validateUserData, userController.createUser);
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', validateUserData, userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

module.exports = router;