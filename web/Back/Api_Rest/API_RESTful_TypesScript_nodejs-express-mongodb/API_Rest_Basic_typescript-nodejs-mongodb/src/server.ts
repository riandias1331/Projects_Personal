// import express, { Application } from 'express';
// import mongoose from 'mongoose';
// import router from './routes/userRoutes';

// const app: Application = express();
// const PORT = 5000;

// // Middleware para JSON
// app.use(express.json());

// // Conexão com o MongoDB
// mongoose.connect('mongodb://localhost:27017/restful_api')
//   .then(() => console.log('Conectado ao MongoDB'))
//   .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// // Rotas
// app.use('/api', router);

// // Iniciar o servidor
// app.listen(PORT, () => {
//     console.log(`Servidor rodando na porta ${PORT}`);
// });

import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import userRoutes from './routes/userRoutes';

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));