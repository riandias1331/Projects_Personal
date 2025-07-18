import { Router } from 'express'
const route: Router = Router()

import * as userController from './src/controllers/userController';

route.get('/users', userController.getUsersAll)
route.get('/users/:id', userController.getUser)
route.post('/users', userController.createUser)
route.put('/users', userController.updateUser)
route.delete('/users', userController.deleteUserAll)
route.delete('/users/:id', userController.deleteUser)


export default route