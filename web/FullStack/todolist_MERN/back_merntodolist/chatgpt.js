import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Conexão com o MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado ao MongoDB'))
  .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

app.use(cors());
app.use(express.json());

// Modelo do banco de dados (Tarefa)
const taskSchema = new mongoose.Schema({
  title: String,
  completed: Boolean,
});
const Task = mongoose.model('Task', taskSchema);

// Rotas
app.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.post('/tasks', async (req, res) => {
  const newTask = new Task(req.body);
  await newTask.save();
  res.json(newTask);
});

app.delete('/tasks/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Tarefa removida' });
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
