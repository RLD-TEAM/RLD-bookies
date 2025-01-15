const userController = require("../controllers/userController");

// routes that point to userController to query our DB to be used in the server file.
module.exports = (app) => {
    // create a user
    app.post("/users", userController.createUser);

    // find all users
    app.get("/users", userController.getAllUsers);

    // find a user by ID
    app.get("/users/:id", userController.getUserById);

    // update a user by ID
    app.put("/users/:id", userController.updateUser);

    // delete a user by ID
    app.delete("/users/:id", userController.deleteUser);

    // login a User, creates a session
    app.post("/login", userController.loginUser);

    // logout a User, clearing session -- *** update this to get a GET. ***
    // a GET because we are not sending data, we are requesting to remove a session
    // then redirect to login or page that requires no user session.
    app.post("/logout", userController.logoutUser);
}