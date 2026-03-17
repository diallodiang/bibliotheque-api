const BookService = require('../services/bookService'); 
 
class BookController { 
  static async createBook(req, res) { 
    try { 
      const book = await BookService.createBook(req.body); 
      res.status(201).json({ 
        success: true, 
        message: 'Book created successfully', 
        data: book 
      }); 
    } catch (error) { 
      res.status(400).json({ 
        success: false, 
        message: error.message 
      }); 
    } 
  } 
 
  static async getAllBooks(req, res) { 
    try { 
      const books = await BookService.getAllBooks(); 
      res.status(200).json({ 
        success: true, 
        message: 'Books retrieved successfully', 
        data: books, 
        count: books.length 
      }); 
    } catch (error) { 
      res.status(500).json({ 
        success: false, 
        message: error.message 
      }); 
    } 
  } 
 
  static async getBookById(req, res) { 
    try { 
      const book = await BookService.getBookById(parseInt(req.params.id)); 
      res.status(200).json({ 
        success: true, 
        message: 'Book retrieved successfully', 
        data: book 
      }); 
    } catch (error) { 
      const statusCode = error.message === 'Book not found' ? 404 : 500; 
      res.status(statusCode).json({ 
        success: false, 
        message: error.message 
      }); 
    } 
  } 
 
  static async updateBook(req, res) { 
    try { 
      const book = await BookService.updateBook(parseInt(req.params.id), 
req.body); 
      res.status(200).json({ 
        success: true, 
        message: 'Book updated successfully', 
        data: book 
      }); 
    } catch (error) { 
      const statusCode = error.message === 'Book not found' ? 404 : 400; 
      res.status(statusCode).json({ 
        success: false, 
        message: error.message 
      }); 
    } 
  } 
 
  static async deleteBook(req, res) { 
    try { 
      await BookService.deleteBook(parseInt(req.params.id)); 
      res.status(200).json({ 
        success: true, 
        message: 'Book deleted successfully' 
      }); 
    } catch (error) { 
      const statusCode = error.message === 'Book not found' ? 404 : 500; 
      res.status(statusCode).json({ 
        success: false, 
        message: error.message 
      }); 
    } 
  } 
} 
module.exports = BookController; 