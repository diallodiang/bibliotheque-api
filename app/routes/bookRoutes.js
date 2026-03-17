const express = require('express'); 
const router = express.Router(); 
const BookController = require('../controllers/bookController'); 
// Create a new book 
router.post('/', BookController.createBook); 
// Get all books 
router.get('/', BookController.getAllBooks); 
// Get book by ID 
router.get('/:id', BookController.getBookById); 
// Update book 
router.put('/:id', BookController.updateBook); 
// Delete book 
router.delete('/:id', BookController.deleteBook); 
module.exports = router; 