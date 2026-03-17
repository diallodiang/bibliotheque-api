const express = require("express");
const cors = require('cors');
const YAML = require('yamljs'); 
const swaggerUi = require('swagger-ui-express'); 
const path = require('path'); 

const app = express();   // ✅ d'abord on crée app

// Middleware
app.use(cors());         // ✅ ensuite on l’utilise
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes 
const bookRoutes = require('./routes/bookRoutes');

// Charger Swagger
const swaggerDocument = YAML.load(
  path.join(__dirname, '../docs/swagger.yaml')
);

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { 
  customCss: '.swagger-ui .topbar { display: none }', 
  customSiteTitle: 'Documentation API Bibliothèque' 
}));

// Routes API
app.use('/api/books', bookRoutes);

// Route racine
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: "Bienvenue sur l'API Bibliothèque",
    documentation: '/api-docs',
    endpoints: {
      books: '/api/books'
    }
  });
});

// 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

module.exports = app;
const cookieParser = require('cookie-parser');
app.use(cookieParser());

const AuthController = require('./controllers/authController');
// Exemple : protéger toutes les routes /api/books
app.use('/api/books', AuthController.verifyToken, bookRoutes);