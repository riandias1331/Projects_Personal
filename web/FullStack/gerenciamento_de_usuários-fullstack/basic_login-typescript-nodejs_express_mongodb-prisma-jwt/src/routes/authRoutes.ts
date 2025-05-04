import { Router } from 'express';
import { AuthController } from '../controllers/authController';
// import { authMiddleware }from '../middlewares/authMiddleware';

const router = Router();

////public routes
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

// //private routes
// router.get('/profile', authMiddleware, (req, res) => {
//     res.send('Área protegida!');
// });

export default router;
