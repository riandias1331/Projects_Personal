import { Request, Response } from 'express';
import UserModel from '../models/userModel';

interface ApiResponse {
  message?: string;
  error?: string;
  [key: string]: any;
}

const UsuarioController = {
  async createUser(req: Request, res: Response): Promise<Response> {
    try {
      const usuario = await UserModel.create(req.body);
      return res.status(201).json(usuario);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  },

  async getUsers(req: Request, res: Response): Promise<Response> {
    try {
      const usuarios = await UserModel.findAll();
      return res.json(usuarios);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  },

  async getUserId(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      const usuario = await UserModel.findById(id);
      
      if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
      
      return res.json(usuario);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  },

  async updateUser(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      const usuario = await UserModel.update(id, req.body);
      
      if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
      
      return res.json(usuario);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  },

  async deleteUser(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      await UserModel.delete(id);
      return res.status(204).end();
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  },

  async deleteUserAll(req: Request, res: Response): Promise<Response> {
    try {
      if (process.env.NODE_ENV === 'production') {
        return res.status(403).json({
          error: "This operation is not allowed in production"
        });
      }
      
      const result = await UserModel.deleteAll();
      return res.status(200).json({
        message: `All users (${result.count}) were deleted successfully`,
        deletedCount: result.count
      });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
};

export default UsuarioController;