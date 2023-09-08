const fs = require('fs');
const path = require('path');

const currentFileName = path.basename(__filename);

const db = {};

fs.readdirSync(__dirname) // отримуємо назву поточного файлу
.filter(fName => /.js$/.test(fName) && fName !== currentFileName) // фільтруємо index.js і "зайве"
.forEach(fName => { // реквайримо, фаршируємо кожну модель клієнтом і експортуємо це все
    const absPathToFile = path.resolve(__dirname, fName);
    const Model = require(absPathToFile);
    Model._client = client;
    db[Model.name] = Model;
});