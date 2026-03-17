const app = require('./app/app'); 
const Book = require('./app/models/Book'); 
const PORT = process.env.PORT || 3000; 
async function startServer() { 
try { 
// Initialiser la base de données 
await Book.initTable(); 
console.log('Database initialized'); 
// Démarrer le serveur 
app.listen(PORT, () => { 
console.log(`Server running on port ${PORT}`); 
console.log(`API: http://localhost:${PORT}/api`); 
}); 
} catch (error) { 
console.error('Error starting server:', error); 
process.exit(1); 
} 
} 
startServer(); 