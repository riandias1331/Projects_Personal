const db = require('../models/db');


exports.getUsers = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
};


exports.createUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    await db.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email]);
    res.status(201).json({ message: 'Usuário criado com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
};


exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    await db.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [name, email, id]);
    res.json({ message: 'Usuário atualizado com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
};


exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM users WHERE id = $1', [id]);
    res.json({ message: 'Usuário deletado com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar usuário' });
  }
};
