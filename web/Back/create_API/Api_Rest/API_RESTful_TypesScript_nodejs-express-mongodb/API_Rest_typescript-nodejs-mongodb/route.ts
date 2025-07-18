import { Router } from 'express'
const route: Router = Router()

route.get('/users')
route.get('/users/:id')
route.post('/users')
route.put('/users')
route.delete('/users')
route.delete('/users/:id')


export default route