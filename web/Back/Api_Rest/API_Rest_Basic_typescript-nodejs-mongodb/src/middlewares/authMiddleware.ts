import { Request, Response, NextFunction } from 'express';

export const AuthMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers['authorization'];
    if (!token) {
        res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
    } else {
        // Aqui você pode validar o token (exemplo: JWT)
        next();
    }
};