import express from 'express';
import { 
    getAllUsers, 
    createUser, 
    getUserById, 
    updateUser, 
    deleteUser, 
    deleteAll 
} from '../controllers/userController';
// import * as auth from '../middlewares/auth';
// import validator from '../utils/validator';

const router: express.Router = express.Router();

// Tipagem para os middlewares (opcional, mas recomendado)
type Middleware = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => void;

// // Private routes
// router.get('/users', auth.authMiddleware as Middleware, getAllUsers);
// router.get('/users/:id', auth.authMiddleware as Middleware, getUserById);
// router.put('/users/:id', auth.authMiddleware as Middleware, updateUser);
// router.delete('/users/:id', auth.authMiddleware as Middleware, deleteUser);
// router.delete('/users/', auth.authMiddleware as Middleware, deleteAll);


// routes
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.delete('/users/', deleteAll);



// Public routes
// router.post('/users', validator as Middleware, createUser);
router.post('/users',  createUser);

export default router;