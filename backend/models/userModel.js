const db = require('../db/database');

const User = {
  getAll: (callback) => {
    db.query('SELECT * FROM users', callback);
  },
  getById: (id, callback) => {
    db.query('SELECT * FROM users WHERE id = ?', [id], callback);
  },
  create: (user, callback) => {
    const { name, email, age, phone } = user;
    db.query(
      'INSERT INTO users (name, email, age, phone) VALUES (?, ?, ?, ?)',
      [name, email, age, phone],
      callback
    );
  },
  update: (id, user, callback) => {
    const { name, email, age, phone } = user;
    db.query(
      'UPDATE users SET name = ?, email = ?, age = ?, phone = ? WHERE id = ?',
      [name, email, age, phone, id],
      (error, results) => {
        if (error) {
          console.error('Database error:', error);
          return callback(error);
        }
        callback(null, results);
      }
    );
  },
  delete: (id, callback) => {
    db.query('DELETE FROM users WHERE id = ?', [id], callback);
  },
};

module.exports = User;