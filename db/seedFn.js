const { sequelize } = require('../db/db');
const { User } = require('../models/User');
const { Book } = require('../models/Book');
const { books } = require('../db/seedData');
const { users } = require('../db/seedData');

const seed = async () => {
    try {
        await sequelize.sync({
            force: true
        }); // recreate DB
        console.log(`*** books: ${books} ***`);
        console.log(`*** users: ${users} ***`);
        const createdUsers = await User.bulkCreate(users);
        const createdBooks = await Book.bulkCreate(books);
        console.log(createdBooks);
        console.log(createdUsers);
        // for (let i = 0; i < createdBooks.length; ++i) {
        //     let book = createdBooks[i];
        //     // have sequelize model's autoincrement PKs
        //     // const userId = createdUsers[i % 3].id;
        //     // await book.setUser(userId);
        // }
    } catch (error) {
        console.error(error);
    }
};

module.exports = seed;