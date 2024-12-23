const Todo = require('../models/todo');

exports.getAllTodos = (req, res) => {
    Todo.getAll((err, results) => {
        if (err) return res.status(500).json({error : err});
        res.status(200).json(results);
})};

exports.createTodo = (req, res) => {
    const { title, description, due_date } = req.body;
    Todo.create({ title, description, due_date }, (err, result) => {
        if (err) return res.status(500).json({error : err});
        res.status(200).json({ id: result.insertId, title, description, due_date, completed: 0});
})}

exports.updateTodo = (req, res) => {
    const { title, description, due_date, completed } = req.body;
    const { id } = req.params;
    Todo.update({ title, description, due_date, completed, id }, (err, result) => {
        if (err) return res.status(500).json({error : err});
        res.status(200).json({ message: 'Todo updated successfully' });
})}

exports.deleteTodo = (req, res) => {
    const { id } = req.params;
    Todo.delete(id, (err, result) => {
        if (err) return res.status(500).json({error : err});
        res.status(200).json({ message: 'Todo deleted successfully' });
})}