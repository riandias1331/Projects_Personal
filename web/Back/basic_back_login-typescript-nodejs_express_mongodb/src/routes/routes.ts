import { Router } from 'express';
import { UserController } from '../controllers/controller';

const router = Router();

router.post('/users', UserController.create);
router.get('/users', UserController.getAll);

export default router;
