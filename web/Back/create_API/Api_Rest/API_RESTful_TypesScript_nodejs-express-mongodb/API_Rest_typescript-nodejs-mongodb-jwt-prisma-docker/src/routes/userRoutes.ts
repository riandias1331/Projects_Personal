import { Router } from 'express'
const route: Router = Router()


import * as userController from '../controllers/userController'
import * as auth from '../middlewares/auth'

// Private Routes
route.get("/users", auth.authMiddleware, userController.getUserAll)
route.get("/users/:id", auth.authMiddleware, userController.getUser)
route.put("/users/:id", auth.authMiddleware, userController.updateeUser)
route.delete("/users", auth.authMiddleware, userController.deleteUserAll)
route.delete("/users/:id", auth.authMiddleware, userController.deleteUser)

// Public Routes
route.post("/users", userController.create)


export default route