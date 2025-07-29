import dotenv from 'dotenv';
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import pool from '../src/config/config';
import userRoutes from '../src/routes/userRoutes';
import createUserTable from './data/createUserTable';

dotenv.config();
const app: Application = express();
const port: string | number = process.env.PORT || 5002;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Routes
app.use('/api', userRoutes);

// Database
createUserTable();

// Testing Database
app.get('/', async (req: Request, res: Response) => {
    const result = await pool.query("SELECT current_database()");
    res.send(`The database name is : ${result.rows[0].current_database}`);
});

// Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});