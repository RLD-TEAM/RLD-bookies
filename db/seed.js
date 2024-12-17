const { sequelize } = require('./db');
const seed = require('./seedFn');

seed()
    .then( () => {
        console.log('Seeding successful.. Books in your library!');
    })
    .catch(err => {
        console.error(`error seeding within seedFn: ${err}`);
    })
    .finally( () => {
        sequelize.close();
    });