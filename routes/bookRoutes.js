const bookController = require("../controllers/bookController");

// routes that point to bookController to query our DB to be used in the server file.
module.exports = (app) => {
    // create a book
    app.post("/books", bookController.createBook);
    // find all books in DB
    app.get("/books", bookController.getAllBooks);

    // find ONE book by ID in DB
    app.get("/books/:id", bookController.getBookById);

    // edit ONE book by ID in DB
    app.put("/books/:id", bookController.updateBook);

    // delete ONE book by ID in DB
    app.delete("/books/:id", bookController.deleteBook);
};
