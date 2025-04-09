const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Criar tarefa
router.post('/tasks', taskController.createTask);

// Listar todas as tarefas
router.get('/tasks', taskController.getTasks);

// Atualizar uma tarefa
router.put('/tasks/:id', taskController.updateTask);

// Deletar uma tarefa
router.delete('/tasks/:id', taskController.deleteTask);

module.exports = router;
