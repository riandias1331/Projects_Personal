import { Pool } from 'pg';
import dotenv from 'dotenv';

// Carrega variáveis do .env
dotenv.config();

// Cria pool de conexões diretamente
const pool = new Pool({
  user: process.env.DB_USER as string,    
  host: process.env.DB_HOST as string,    
  database: process.env.DB_DATABASE as string, 
  password: process.env.DB_PASSWORD as string,     
  port: Number(process.env.DB_PORT) || 5432    
});

// Apenas um log simples quando conectar
pool.on('connect', () => console.log('Conectado ao PostgreSQL'));

// Exporta o pool pronto para uso
export default pool;