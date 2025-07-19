import { Router } from 'express'
const route: Router = Router()

import  * as userController from './src/controllers/userController'

route.get('/users', userController.getUsers)
route.post('/users', userController.register)
route.post('/users', userController.login)


export default route