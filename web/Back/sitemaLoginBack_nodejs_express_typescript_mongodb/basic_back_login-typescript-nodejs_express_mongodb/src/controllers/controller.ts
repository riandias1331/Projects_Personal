import { Request, Response } from 'express';
import { User } from '../models/Model';

export const UserController = {
  create: async (req: Request, res: Response) => {
    try {
      const user = await User.create(req.body);
      res.status(201).json(user);
    } catch (err) {
      res.status(400).json({ error: 'Erro ao criar usuário', detail: err });
    }
  },

  getAll: async (_req: Request, res: Response) => {
    const users = await User.find();
    res.json(users);
  }
};
