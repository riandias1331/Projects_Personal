const User = require('../models/userModel');

const handleErrors = (res, error) => {
  console.error(error);
  if (error.code === '23505') { // Violação de unique constraint
    return res.status(400).json({ error: 'Email já está em uso' });
  }
  res.status(500).json({ error: 'Erro interno do servidor' });
};

module.exports = {
  createUser: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
      }

      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: 'Email já está em uso' });
      }

      const newUser = await User.create({ name, email, password });
      res.status(201).json(newUser);
    } catch (error) {
      handleErrors(res, error);
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      handleErrors(res, error);
    }
  },

  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
      res.json(user);
    } catch (error) {
      handleErrors(res, error);
    }
  },

  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email, password } = req.body;

      const existingUser = await User.findById(id);
      if (!existingUser) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      const updatedUser = await User.update(id, { name, email, password });
      res.json(updatedUser);
    } catch (error) {
      handleErrors(res, error);
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      await User.delete(id);
      res.status(204).end();
    } catch (error) {
      handleErrors(res, error);
    }
  },
};