const db = require('../configs/database');

const Todo = {
    getAll: (callback) => {
        db.query('SELECT * FROM todo', (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },

    create: (data, callback) => {
        db.query('INSERT INTO todo (title, description, due_date) VALUES (?, ?, ?)', [data.title, data.description, data.due_date], (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },

    update: (data, callback) => {
        db.query('UPDATE todo SET title = ?, description = ?, due_date = ?, completed = ? WHERE id = ?', [data.title, data.description, data.due_date, data.completed, data.id], (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },

    delete: (id, callback) => {
        db.query('DELETE FROM todo WHERE id = ?', [id], (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    }
};
module.exports = Todo;