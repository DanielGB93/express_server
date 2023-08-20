const express = require('express');
const router = express.Router();
router.use(express.json());

let tasks = require('./tasks.json');

router.get('/completed', (req, res)=>{
     res.status(200).send(tasks.filter((task)=>task.completed== true));
})

router.get('/uncompleted', (req, res)=>{
    res.status(200).send(tasks.filter((task)=>task.completed== false));
})

router.post('/', (req, res)=>{
    res.send('Post de prueba')
})

module.exports = router;