import UserModel from '../models/userModel.js';

const UsuarioController = {
  async createUser(req, res) {
    try {
      const usuario = await UserModel.create(req.body);
      res.status(201).json(usuario);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getUsers(req, res) {
    try {
      const usuarios = await UserModel.findAll();
      res.json(usuarios);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getUserId(req, res) {
    try {
      const usuario = await UserModel.findById(req.params.id);
      if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
      res.json(usuario);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateUser(req, res) {
    try {
      const usuario = await UserModel.update(req.params.id, req.body);
      if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
      res.json(usuario);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async deleteUser(req, res) {
    try {
      await UserModel.delete(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export default UsuarioController;