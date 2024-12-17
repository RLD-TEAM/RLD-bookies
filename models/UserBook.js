const { Sequelize, sequelize } = require("../db/db");
const { DataTypes } = require("sequelize");


const UserBook = sequelize.define("UserBook", {
  checkoutDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  returnDate: {
    type: DataTypes.DATE,
  },
});

module.exports = { UserBook };
