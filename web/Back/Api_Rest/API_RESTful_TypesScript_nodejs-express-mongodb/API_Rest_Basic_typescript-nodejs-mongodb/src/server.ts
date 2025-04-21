import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import userRoutes from './routes/userRoutes';

const PORT = process.env.PORT || 3333;
dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(userRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});