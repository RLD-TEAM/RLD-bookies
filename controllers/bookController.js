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

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    return res
      .status(200)
      .json({ message: "Login successful", user: { username: user.username } });
  } catch (error) {
    res
      .status(500)
      .json({ message: " Error during login", error: error.message });
  }
};

const logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Failed to log out" });
    }
    res.status(200).json({ message: "Logout successful" });
  });
};

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
  loginUser,
  logoutUser,
};
