const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'nghuytan',
    password: '',
    database: 'delivery_management'
});

db.connect((err) => {
    if (err) {
    console.log('Connected to database',err.stack);
    return;
    }
    console.log('Connected to database');
});

module.exports = db;