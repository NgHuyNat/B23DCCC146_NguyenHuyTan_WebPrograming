const User = require('../models/user');

exports.getAllUsers = (req, res) => {
    User.getAll((err, results) => {
        if (err) return res.status(500).json({error : err});
        res.status(200).json(results);
})};

exports.createUser = (req, res) => {
    const { name, email, mobile, password } = req.body;
    User.create({ name, email, mobile, password }, (err, result) => {
        if (err) return res.status(500).json({error : err});
        res.status(201).json(result);
})}

exports.updateUser = (req, res) => {
    const { name, email, mobile, password } = req.body;
    const { id } = req.params;
    User.update({ name, email, mobile, password, id }, (err, result) => {
        if (err) return res.status(500).json({error : err});
        res.status(200).json({ message: 'User updated successfully' });
})}

exports.deleteUser = (req, res) => {
    const { id } = req.params;
    User.delete(id, (err, result) => {
        if (err) return res.status(500).json({error : err});
        res.status(200).json({ message: 'Todo deleted successfully' });
})}

