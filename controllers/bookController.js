const { Book } = require("../models/Book");
const { User } = require("../models/User");

// Create a new Book
const createBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

// getAllBooks
const getAllBooks = async (req, res) => {
  const books = await Book.findAll();
  res.json(books);
};

// Get a specific book by ID
const getBookById = async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  book
    ? res.json(book)
    : res.status(404).json({
        error: "Book not found",
      });
};

// Update a book
const updateBook = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (book) {
      await book.update(req.body);
      res.json(book);
    } else {
      res.status(404).json({
        error: "Book not found",
      });
    }
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

// Delete a book
const deleteBook = async (req, res) => {
  const result = await Book.destroy({
    where: {
      id: req.params.id,
    },
  });
  result
    ? res.status(204).send()
    : res.status(404).json({
        error: "Book not found",
      });
};

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
};
