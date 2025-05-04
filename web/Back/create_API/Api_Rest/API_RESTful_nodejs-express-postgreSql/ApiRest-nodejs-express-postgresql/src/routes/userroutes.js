import express from 'express';
const router = express.Router();

import { userController }  from '../controllers/usercontroller.js'
import { auth } from '../middleware/auth.js'

// private routes
router.get('/users', auth, userController.getAllUsers)

// public routes
router.get('/users', userController.getAllUsers)
router.post('/users', userController.createUser)
router.put('/users', userController.updateUser)  
router.delete('/users/:id', userController.deleteUser)

export default router