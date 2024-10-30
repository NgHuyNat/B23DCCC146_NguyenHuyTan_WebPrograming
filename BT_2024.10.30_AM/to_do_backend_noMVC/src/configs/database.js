const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'todolist'
});

db.connect((err) => {
    if (err) {
        console.log('Error connecting to database',err.stack);
        return;
    }
    console.log('Connection established');
});

module.exports = db;