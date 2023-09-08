const {Client} = require('pg');
const config = require('../configs/db.json');
const fs = require('fs');
const path = require('path');

const currentFileName = path.basename(__filename);

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const client = new Client(dbConfig);

client.connect();

const db = {
    client
};

fs.readdirSync(__dirname) // отримуємо назву поточного файлу
.filter(fName => /.js$/.test(fName) && fName !== currentFileName) // фільтруємо index.js і "зайве"
.forEach(fName => { // реквайримо, фаршируємо кожну модель клієнтом і експортуємо це все
    const absPathToFile = path.resolve(__dirname, fName);
    const Model = require(absPathToFile);
    Model._client = client;
    db[Model.name] = Model;
});


// beforeExit - подія
// навішування подій у ноді відбувається за допомогою методу on

process.on('beforeExit', () => {
    client.end();
});

module.exports = db;