import { Request, Response, NextFunction } from 'express';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Middleware de exemplo (ainda sem lógica de autenticação)
  console.log('Middleware executado');
  next();
};
