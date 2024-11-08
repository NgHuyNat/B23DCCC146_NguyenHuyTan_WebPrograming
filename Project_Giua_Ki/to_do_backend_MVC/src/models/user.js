const db = require('../configs/database');

const User = {
    getAll : (callback) => {
        db.query('SELECT * FROM user', (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },

    create : (newUser, callback) => {
        const { name, email, mobile, password } = newUser;
        db.query('INSERT INTO user (name, email, mobile, password) VALUES (?, ?, ?, ?)', [name, email, mobile, password], (err, result) => {
            if (err) return callback(err);
            callback(null, { id: result.insertId, name, email, mobile, password});
        });
    },

    update : (updatedUser, callback) => {
        const { name, email, mobile, password, id } = updatedUser;
        db.query('UPDATE user SET name = ?, email = ?, due_date = ?, mobile = ?, password = ? WHERE id = ?', 
        [name, email, mobile, password, id], (err, result) => {
            if (err) return callback(err);
            callback(null, { message: 'User updated successfully' });
        });
    },

    delete : (id, callback) => {
        db.query('DELETE FROM user WHERE id = ?', [id], (err, result) => {
            if (err) return callback(err);
            callback(null, { message: 'User deleted successfully' });
        });
    }
}

module.exports = User;