const {Client} = require('pg');
const config = require('../configs/db.json');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const client = new Client(dbConfig);

client.connect();


// beforeExit - подія
// навішування подій у ноді відбувається за допомогою методу on

process.on('beforeExit', () => {
    client.end();
});

module.exports = {
    client
};