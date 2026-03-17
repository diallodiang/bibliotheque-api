const db = require('../config/database'); 
 
class Book { 
  /** 
   * Initialiser la table books 
   */ 
  static initTable() { 
    return new Promise((resolve, reject) => { 
      const sql = ` 
        CREATE TABLE IF NOT EXISTS books ( 
          id INTEGER PRIMARY KEY AUTOINCREMENT, 
          title TEXT NOT NULL, 
          author TEXT NOT NULL, 
          isbn TEXT UNIQUE NOT NULL, 
          published_year INTEGER, 
          genre TEXT, 
          available BOOLEAN DEFAULT 1, 
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP 
        ) 
      `; 
 
      db.run(sql, (err) => { 
        if (err) reject(err); 
        else resolve(); 
      }); 
    }); 
  } 
 
  /** 
   * Créer un nouveau livre 
   */ 
  static create(bookData) { 
    return new Promise((resolve, reject) => { 
      const { title, author, isbn, published_year, genre } = bookData; 
      const sql = ` 
        INSERT INTO books (title, author, isbn, published_year, genre) 
        VALUES (?, ?, ?, ?, ?) 
      `; 
 
      db.run(sql, [title, author, isbn, published_year, genre], function(err) 
{ 
        if (err) reject(err); 
        else { 
          Book.getById(this.lastID).then(resolve).catch(reject); 
        } 
      }); 
    }); 
  } 
 
  /** 
   * Récupérer tous les livres 
   */ 
  static getAll() { 
    return new Promise((resolve, reject) => { 
      const sql = 'SELECT * FROM books ORDER BY created_at DESC'; 
      db.all(sql, [], (err, rows) => { 
        if (err) reject(err); 
        else resolve(rows); 
      }); 
    }); 
  } 
 
  /** 
   * Récupérer un livre par ID 
   */ 
  static getById(id) { 
    return new Promise((resolve, reject) => { 
      const sql = 'SELECT * FROM books WHERE id = ?'; 
      db.get(sql, [id], (err, row) => { 
        if (err) reject(err); 
        else resolve(row); 
      }); 
    }); 
  } 
 
  /** 
   * Mettre à jour un livre 
   */ 
  static update(id, bookData) { 
    return new Promise((resolve, reject) => { 
      const { title, author, isbn, published_year, genre, available } = 
bookData; 
      const sql = ` 
        UPDATE books 
        SET title = ?, author = ?, isbn = ?, published_year = ?, genre = ?, 
available = ? 
        WHERE id = ? 
      `; 
 
      db.run(sql, [title, author, isbn, published_year, genre, available, 
id], function(err) { 
        if (err) reject(err); 
        else if (this.changes === 0) reject(new Error('Book not found')); 
        else { 
          Book.getById(id).then(resolve).catch(reject); 
        } 
      }); 
    }); 
  } 
 
  /** 
   * Supprimer un livre 
   */ 
  static delete(id) { 
    return new Promise((resolve, reject) => { 
      const sql = 'DELETE FROM books WHERE id = ?'; 
      db.run(sql, [id], function(err) { 
        if (err) reject(err); 
        else if (this.changes === 0) reject(new Error('Book not found')); 
        else resolve(true); 
      }); 
    }); 
  } 
} 
 
module.exports = Book; 