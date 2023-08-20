const express = require('express');
const router = express.Router();
router.use(express.json());

let tasks = require('./tasks.json');

router.post('/', (req, res) => {
    const { description } = req.body;
  
     if (!description) {
       return res.status(400).json({ error: 'La descripción de la tarea es obligatoria.' });
     }
  
     const id = tasks.length + 1;
     const newTask = {
       id,
       description,
       completed: false,
     };
  
     tasks.push(newTask);
     res.json(newTask);
   });


 router.delete('/:id', (req, res)=>{
   const id= req.params.id;

   res.send('Tarea ' +id+ ' eliminada');
 })

 router.put('/:id', (req, res) => {
    const { id } = req.params;
 
    const task = tasks.find((t) => t.id === parseInt(id));
 
    if (!task) {
      return res.status(404).json({ error: 'Tarea no encontrada.' });
    }
 
    task.completed = true;
    res.json(task);
  });

module.exports = router;