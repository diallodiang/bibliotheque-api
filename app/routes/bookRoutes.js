// app/routes/bookRoutes.js
const express = require('express');
const router = express.Router();
const BookController = require('../controllers/BookController');
const multer = require('multer');

// Configuration multer pour upload d'images
const upload = multer({ dest: 'uploads/' }); // dossier où les images seront stockées

// Routes CRUD avec gestion des images
router.get('/', BookController.getAllBooks);
router.get('/:id', BookController.getBookById);

// Ajouter un livre avec image
router.post('/', upload.single('image'), BookController.createBook);

// Modifier un livre avec image
router.put('/:id', upload.single('image'), BookController.updateBook);

// Supprimer un livre
router.delete('/:id', BookController.deleteBook);

module.exports = router;