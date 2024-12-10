/**
    const { sequelize, Sequelize } = require('./db/db');

    // HUMAN ATTEMPT 2, REFER TO BOOK.JS
    Book.belongsTo(User, {
        // Book table, there will be an ownerId <- FK
        // Preferably userId <- FK
        foreignKey: 'ownerId'
    });
    User.hasMany(Book);

    module.exports = {
        Book,
        User,
        sequelize,
        Sequelize
    };

 
*/
