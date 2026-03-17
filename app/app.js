const express = require("express");
const YAML = require('yamljs'); 
const swaggerUi = require('swagger-ui-express'); 
const path = require('path'); 
 
const app = express(); 
// Import routes 
const bookRoutes = require('./routes/bookRoutes'); 
// Middleware 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
// Charger la documentation Swagger 
const swaggerDocument = YAML.load(path.join(__dirname, 
'../docs/swagger.yaml')); 
// Servir la documentation Swagger UI 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { 
customCss: '.swagger-ui .topbar { display: none }', 
customSiteTitle: 'Documentation API Bibliothèque' 
})); 
// API Routes 
app.use('/api/books', bookRoutes); 
// Root route 
app.get('/', (req, res) => { 
res.json({ 
success: true, 
message: 'Bienvenue sur l\'API Bibliothèque', 
documentation: '/api-docs', 
endpoints: { 
books: '/api/books' 
} 
}); 
}); 
// 404 handler 
app.use((req, res) => { 
res.status(404).json({ 
success: false, 
message: 'Route not found' 
}); 
}); 
module.exports = app; 
