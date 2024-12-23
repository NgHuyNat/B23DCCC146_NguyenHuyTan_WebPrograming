const db = require('../configs/database');

const User = {
  getUserById: (id, callback) => {
    const query = 'SELECT * FROM users WHERE user_id = ?';
    db.query(query, [id], callback);
  },

  create: (data, callback) => {
    const query = 'INSERT INTO users (email, phone_number, full_name, password) VALUES (?, ?, ?, ?)';
    db.query(query, [data.email, data.phone_number, data.full_name, data.password], callback);
  },

  findByEmail: (email, callback) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], callback);
  },

  findByPhone: (phone_number, callback) => {
    const query = 'SELECT * FROM users WHERE phone_number = ?';
    db.query(query, [phone_number], callback);
  },

  findById: (id, callback) => {
    const query = 'SELECT * FROM users WHERE user_id = ?';
    db.query(query, [id], callback);
  },

  update: (data, callback) => {
    const query = 'UPDATE users SET phone_number = ?, full_name = ?, address = ?, ward = ?, district = ?, province= ? WHERE user_id = ?';
    db.query(query, [data.phone_number, data.full_name, data.address, data.ward, data.district, data.province, data.user_id], callback);
},
};

module.exports = User;
