const Task = require('../models/taskmodel');

// Criar nova tarefa
exports.createTask = async (req, res) => {
  const { title, description, priority, dueDate } = req.body;
  try {
    const newTask = new Task({
      title,
      description,
      priority,
      dueDate,
    });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar tarefa' });
  }
};

// Listar todas as tarefas
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar tarefas' });
  }
};

// Atualizar uma tarefa
exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, priority, dueDate } = req.body;
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, priority, dueDate },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar tarefa' });
  }
};

// Deletar uma tarefa
exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    res.status(200).json({ message: 'Tarefa deletada' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar tarefa' });
  }
};
