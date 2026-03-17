const Book = require('../models/Book'); 
 
class BookService { 
  static async createBook(bookData) { 
    // Validation 
    if (!bookData.title || !bookData.author || !bookData.isbn) { 
      throw new Error('Title, author, and ISBN are required'); 
    } 
 
    // Validation ISBN (simplifié) 
    if (bookData.isbn.length < 10) { 
      throw new Error('Invalid ISBN format'); 
    } 
 
    // Validation année de publication 
    if (bookData.published_year && (bookData.published_year < 1000 || 
bookData.published_year > new Date().getFullYear())) { 
      throw new Error('Invalid published year'); 
    } 
 
    return await Book.create(bookData); 
  } 
 
  static async getAllBooks() { 
    return await Book.getAll(); 
  } 
 
  static async getBookById(id) { 
    const book = await Book.getById(id); 
    if (!book) { 
      throw new Error('Book not found'); 
    } 
    return book; 
  } 
 
  static async updateBook(id, bookData) { 
    // Validation 
    if (!bookData.title || !bookData.author || !bookData.isbn) { 
      throw new Error('Title, author, and ISBN are required'); 
    } 
 
    return await Book.update(id, bookData); 
  } 
 
  static async deleteBook(id) { 
    return await Book.delete(id); 
  } 
} 
 
module.exports = BookService; 