const DataBaseError = require("./errors/DataBaseError");
const { ValidationError } = require('yup');

module.exports.basicErrorHandler = (err, req, res, next) => { // ОБРОБНИК ПОМИЛОК
    if(err instanceof DataBaseError) {
        return res.status(404).send('Something wrong with database');
    }

    if(err instanceof ValidationError) {
        return res.status(400).send('Invalid data');
    }
}