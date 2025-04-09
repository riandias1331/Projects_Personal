const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db');
const taskRoutes = require('./taskRoutes');
const authRoutes = require('./authRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`);
});
