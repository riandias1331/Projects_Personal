import { Router } from 'express'
const route: Router = Router()

import * as userController from './src/controllers/userController'
import { authMiddleware } from './src/middlewares/auth'

// private routes
route.get('/users', authMiddleware, userController.getUsers)
route.get('/users/:id', authMiddleware, userController.getUserById)
route.put('/users/:id', authMiddleware, userController.updateUser)
route.delete('/users/:id', authMiddleware, userController.deleteUser)

// public route for creating a user
route.post('/users', userController.createUser)

export default route