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
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
  logoutUser,
  signUp,
} = require("./controllers/userController");

const app = express();

app.use(express.json());

const {
  AUTH0_SECRET,
  AUTH0_AUDIENCE,
  AUTH0_CLIENT_ID,
  AUTH0_BASE_URL,
  AUTH0_ISSUER_BASE_URL,
} = process.env;

const config = {
  authRequired: true,
  auth0Logout: true,
  secret: AUTH0_SECRET,
  baseURL: AUTH0_BASE_URL,
  clientID: AUTH0_CLIENT_ID,
  issuerBaseURL: AUTH0_ISSUER_BASE_URL,
};

app.use(auth(config));

// Define CRUD routes
app.post("/books", createBook);
app.get("/books", getAllBooks);
app.get("/books/:id", getBookById);
app.put("/books/:id", updateBook);
app.delete("/books/:id", deleteBook);

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
