const cors = require("cors");
const express = require("express");
const session = require("express-session");
const { auth } = require("express-openid-connect");
const AllUserRoutes = require("./routes/userRoutes");
const AllBookRoutes = require("./routes/bookRoutes");

const { sequelize } = require("./db/db");

const app = express();

// Add session support
app.use(
  session({
    secret: "mySecret",
    resave: false,
  })
);

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
