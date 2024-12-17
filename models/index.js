const { sequelize } = require("../db/db");
const { Book } = require("./Book");
const { User } = require("./User");
const { UserBook } = require("./UserBook");

User.belongsToMany(Book, {
  through: UserBook,
  foreignKey: "userId",
  otherKey: "bookId",
  as: "borrowedBooks",
});

Book.belongsToMany(User, {
  through: UserBook,
  foreignKey: "bookId",
  otherKey: "userId",
  as: "borrowers",
});

module.exports = {
  sequelize,
  User,
  Book,
  UserBook,
};
