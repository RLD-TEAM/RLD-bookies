const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/db");

const User = sequelize.define("user", {
  username: DataTypes.STRING,
  name: DataTypes.STRING,
  password: DataTypes.STRING,
  email: DataTypes.STRING,
});

module.exports = { User };
