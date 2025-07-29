import pool from '../config/config';
import { QueryResult } from 'pg';

// Interface para o usuário
interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  created_at?: Date;
}

interface DeleteResult {
  count: number;
  deletedUsers: User[];
}

const UserModel = {
  async create(user: User): Promise<User> {
    const { name, email, password } = user;
    const query = `
      INSERT INTO users (name, email, password) 
      VALUES ($1, $2, $3) 
      RETURNING *
    `;
    const values = [name, email, password];
    const { rows }: QueryResult<User> = await pool.query(query, values);
    return rows[0];
  },

  async findAll(): Promise<User[]> {
    const { rows }: QueryResult<User> = await pool.query('SELECT * FROM users ORDER BY created_at DESC');
    return rows;
  },

  async findById(id: number): Promise<User | undefined> {
    const { rows }: QueryResult<User> = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return rows[0];
  },

  async findByEmail(email: string): Promise<User | undefined> {
    const { rows }: QueryResult<User> = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return rows[0];
  },

  async update(id: number, user: User): Promise<User | undefined> {
    const { name, email, password } = user;
    const query = `
      UPDATE users 
      SET name = $1, email = $2, password = $3 
      WHERE id = $4 
      RETURNING *
    `;
    const values = [name, email, password, id];
    const { rows }: QueryResult<User> = await pool.query(query, values);
    return rows[0];
  },

  async delete(id: number): Promise<void> {
    await pool.query('DELETE FROM users WHERE id = $1', [id]);
  },
  
  async deleteAll(): Promise<DeleteResult> {
    const result: QueryResult<User> = await pool.query('DELETE FROM users RETURNING *');
    return {
      count: result.rowCount || 0,
      deletedUsers: result.rows
    };
  }
};

export default UserModel;