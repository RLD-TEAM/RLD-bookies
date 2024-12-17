const { Sequelize, sequelize } = require('../db/db');
const { DataTypes } = require('sequelize');

const Book = sequelize.define('Book', {
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    isBorrow: {
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
