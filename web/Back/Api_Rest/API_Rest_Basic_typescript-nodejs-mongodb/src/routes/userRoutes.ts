import { Router } from 'express';
import * as UserController from '../controllers/userController.js';
import { AuthMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/users', AuthMiddleware, UserController.getUsers);
router.post('/users', UserController.createUser);
router.put('/users/:id', UserController.updateUser);
router.delete('/users/:id', UserController.deleteUser);

export default router;