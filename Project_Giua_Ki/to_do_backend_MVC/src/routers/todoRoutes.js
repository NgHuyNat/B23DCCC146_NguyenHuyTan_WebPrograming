const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

router.get('/todo', todoController.getAllTodos);
router.post('/todo', todoController.createTodo);
router.put('/todo/:id', todoController.updateTodo);
router.put('/todo/:id/checkbox', todoController.updateCheckbox);
router.delete('/todo/:id', todoController.deleteTodo);

module.exports = router;