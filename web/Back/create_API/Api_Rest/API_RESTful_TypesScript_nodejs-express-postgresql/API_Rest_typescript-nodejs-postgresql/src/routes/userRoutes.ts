import { Router } from 'express';
import UsuarioController from '../controllers/userController';

const router: Router = Router();

router.post('/users', UsuarioController.createUser);
router.get('/users', UsuarioController.getUsers);
router.get('/users/:id', UsuarioController.getUserId);
router.put('/users/:id', UsuarioController.updateUser);
router.delete('/users/:id', UsuarioController.deleteUser);
router.delete('/users', UsuarioController.deleteUserAll);

export default router;