// const { User } = require('../models/User');
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:', // Use in-memory storage for SQLite
});

const Book = sequelize.define('Book', {
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    isBorrow: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    dueDate: DataTypes.DATE,
    fine: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
    },
});

// AI ATTEMPTED
// Book.associate = (models) => {
//     Book.belongsTo(models.User, {
//         foreignKey: 'userId',
//         as: 'borrower',
//     });

//     return Book;
// };

// HUMAN ATTEMPTED
// Book.belongsTo(User, {
//     foreignKey: 'ownerId'
// });
// User.hasMany(Book);

module.exports = { Book, sequelize };