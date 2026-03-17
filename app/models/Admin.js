const db = require('../config/database');
const bcrypt = require('bcrypt');

class Admin {
  static initTable() {
    return new Promise((resolve, reject) => {
      const sql = `
        CREATE TABLE IF NOT EXISTS admins (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL
        )
      `;
      db.run(sql, (err) => (err ? reject(err) : resolve()));
    });
  }

  static async create(username, password) {
    const hashed = await bcrypt.hash(password, 10);
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO admins (username, password) VALUES (?, ?)',
        [username, hashed],
        function (err) {
          if (err) reject(err);
          else resolve({ id: this.lastID, username });
        }
      );
    });
  }

  static async getByUsername(username) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM admins WHERE username = ?', [username], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }
}

module.exports = Admin;