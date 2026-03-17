// server.js
const app = require('./app/app');
const Book = require('./app/models/Book');
const Admin = require('./app/models/Admin');
const db = require('./app/config/database');

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // 1️⃣ Initialiser la table books
    await Book.initTable();
    console.log('Table "books" initialisée');

    // 2️⃣ Ajouter colonne "image" si elle n'existe pas
    db.run("ALTER TABLE books ADD COLUMN image TEXT", (err) => {
      if (err) {
        console.log("Colonne 'image' déjà présente ou erreur :", err.message);
      } else {
        console.log("Colonne 'image' ajoutée avec succès !");
      }
    });

    // 3️⃣ Initialiser la table admins
    await Admin.initTable();
    console.log('Table "admins" initialisée');

    // 4️⃣ Démarrer le serveur
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`API: http://localhost:${PORT}/api`);
      console.log(`Swagger docs: http://localhost:${PORT}/api-docs`);
    });

  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
}

// Lancer le serveur
startServer();