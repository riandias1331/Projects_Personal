const { query, pool } = require('../config/db');

// Criação da tabela (executar uma vez: npm run migrate)
const createTable = async () => {
  try {
    await query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);
    console.log('✅ Tabela users criada/verificada');
  } catch (err) {
    console.error('❌ Erro ao criar tabela:', err);
    pool.end();
    process.exit(1);
  } finally {
    pool.end(); // Encerra a conexão após a migração
  }
};

// Apenas para execução da migração
if (require.main === module) {
  createTable();
}

// Operações CRUD
module.exports = {
  create: async ({ name, email, password }) => {
    const result = await query(
      `INSERT INTO users (name, email, password)
       VALUES ($1, $2, $3)
       RETURNING id, name, email, created_at`,
      [name, email, password]
    );
    return result.rows[0];
  },

  findAll: async () => {
    const result = await query(
      `SELECT id, name, email, created_at, updated_at 
       FROM users`
    );
    return result.rows;
  },

  findById: async (id) => {
    const result = await query(
      `SELECT id, name, email, created_at, updated_at
       FROM users WHERE id = $1`,
      [id]
    );
    return result.rows[0];
  },

  findByEmail: async (email) => {
    const result = await query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    return result.rows[0];
  },

  update: async (id, { name, email, password }) => {
    const result = await query(
      `UPDATE users
       SET name = $1, email = $2, password = $3, updated_at = NOW()
       WHERE id = $4
       RETURNING id, name, email, updated_at`,
      [name, email, password, id]
    );
    return result.rows[0];
  },

  delete: async (id) => {
    await query('DELETE FROM users WHERE id = $1', [id]);
    return true;
  },
};