const sqlite3 = require('sqlite3').verbose(); 
const path = require('path'); 
 
// Chemin vers le fichier de base de données 
const dbPath = path.resolve(__dirname, '../../database.sqlite'); 
 
// Créer la connexion 
const db = new sqlite3.Database(dbPath, (err) => { 
  if (err) { 
    console.error('Erreur lors de la connexion à la base de données:', 
err.message); 
  } else { 
    console.log('Connecté à la base de données SQLite'); 
  } 
}); 
 
// Activer les clés étrangères 
db.run('PRAGMA foreign_keys = ON'); 
 
module.exports = db; 