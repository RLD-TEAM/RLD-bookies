const cors = require("cors");
const express = require("express");
const session = require("express-session");
const AllUserRoutes = require("./routes/userRoutes");
const AllBookRoutes = require("./routes/bookRoutes");

const { sequelize } = require("./db/db");

const app = express();

// Add session support
app.use(session({ secret:'mySecret', resave: false, saveUninitialized: false }));

app.use(express.json());

// Access data from backend to frontend CLIENT
// placed before using routes in server.js
app.use(cors());

// Define CRUD routes have no been..
// Modularized within ./routes/bookRoutes.js
AllBookRoutes(app);
// Modularized within ./routes/userRoutes.js
AllUserRoutes(app);

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
