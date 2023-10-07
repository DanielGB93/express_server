const express = require('express');
const router = express.Router();
const fs = require('fs');

// Ruta para crear una nueva tarea
router.post('/tasks', (req, res) => {
  // Obtener datos de la solicitud
  const newTask = req.body;

  // Leer tareas existentes desde el archivo tasks.json
  fs.readFile('tasks.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error interno del servidor' });
      return;
    }

    const tasks = JSON.parse(data);
    newTask.id = tasks.length + 1;
    tasks.push(newTask);

    // Escribir las tareas actualizadas en el archivo
    fs.writeFile('tasks.json', JSON.stringify(tasks), (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Error interno del servidor' });
        return;
      }

      res.status(201).json(newTask);
    });
  });
});

// Ruta para actualizar una tarea
router.put('/tasks/:id', (req, res) => {
  // Obtener datos de la solicitud
  const taskId = parseInt(req.params.id);
  const updatedTask = req.body;

  // Leer tareas existentes desde el archivo tasks.json
  fs.readFile('tasks.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error interno del servidor' });
      return;
    }

    const tasks = JSON.parse(data);
    const taskIndex = tasks.findIndex((task) => task.id === taskId);

    if (taskIndex === -1) {
      res.status(404).json({ message: 'Tarea no encontrada' });
      return;
    }

    tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask };

    // Escribir las tareas actualizadas en el archivo
    fs.writeFile('tasks.json', JSON.stringify(tasks), (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Error interno del servidor' });
        return;
      }

      res.status(200).json(tasks[taskIndex]);
    });
  });
});

// Ruta para eliminar una tarea
router.delete('/tasks/:id', (req, res) => {
  // Obtener datos de la solicitud
  const taskId = parseInt(req.params.id);

  // Leer tareas existentes desde el archivo tasks.json
  fs.readFile('tasks.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error interno del servidor' });
      return;
    }

    const tasks = JSON.parse(data);
    const taskIndex = tasks.findIndex((task) => task.id === taskId);

    if (taskIndex === -1) {
      res.status(404).json({ message: 'Tarea no encontrada' });
      return;
    }

    tasks.splice(taskIndex, 1);

    // Escribir las tareas actualizadas en el archivo
    fs.writeFile('tasks.json', JSON.stringify(tasks), (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Error interno del servidor' });
        return;
      }

      res.status(204).send();
    });
  });
});

module.exports = router;
