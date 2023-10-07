const express = require('express');
const router = express.Router();
const fs = require('fs');

// Ruta para listar todas las tareas
router.get('/tasks', (req, res) => {
  // Leer tareas desde el archivo tasks.json
  fs.readFile('tasks.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error interno del servidor' });
      return;
    }

    const tasks = JSON.parse(data);
    res.status(200).json(tasks);
  });
});

// Ruta para listar tareas completas e incompletas
router.get('/tasks/completed', (req, res) => {
  // Leer tareas desde el archivo tasks.json
  fs.readFile('tasks.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error interno del servidor' });
      return;
    }

    const tasks = JSON.parse(data);
    const completedTasks = tasks.filter((task) => task.completed);
    const incompleteTasks = tasks.filter((task) => !task.completed);

    res.status(200).json({ completed: completedTasks, incomplete: incompleteTasks });
  });
});

// Ruta para obtener una sola tarea
router.get('/tasks/:id', (req, res) => {
  // Obtener datos de la solicitud
  const taskId = parseInt(req.params.id);

  // Leer tareas desde el archivo tasks.json
  fs.readFile('tasks.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error interno del servidor' });
      return;
    }

    const tasks = JSON.parse(data);
    const task = tasks.find((task) => task.id === taskId);

    if (!task) {
      res.status(404).json({ message: 'Tarea no encontrada' });
      return;
    }

    res.status(200).json(task);
  });
});

module.exports = router;
