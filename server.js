const express = require('express');
const { sequelize } = require('./db/db');
const {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
} = require("./controllers/bookController");
const {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
  logoutUser,
} = require("./controllers/userController");

const app = express();

app.use(express.json());

// Define CRUD routes
app.post("/books", createBook);
app.get("/books", getAllBooks);
app.get("/books/:id", getBookById);
app.put("/books/:id", updateBook);
app.delete("/books/:id", deleteBook);
app.post("/user", createUser);
app.get("/user/:id", getUserById);
app.put("/user/:id", updateUser);
app.delete("/user/:id", deleteUser);

app.post("/login", loginUser);
app.post("/logout", logoutUser);

// Export the app for testing purposes
module.exports = app;

// Separate function to start the server
if (require.main === module) {
  (async () => {
    try {
      await sequelize.sync();
      app.listen(3000, () => {
        console.log("Server is running on http://localhost:3000");
      });
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  })();
}
