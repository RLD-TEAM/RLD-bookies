const { Sequelize, sequelize } = require('../db/db');
const { DataTypes } = require('sequelize');

const Book = sequelize.define('books', {
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    isBorrowed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    dueDate: DataTypes.DATEONLY,
    fine: {
        type: DataTypes.FLOAT,
        defaultValue: 0.99,
    },
});

module.exports = { Book };
