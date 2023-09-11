const express = require('express');
const ThingController = require('./controllers/Thing.controller');
const { basicErrorHandler } = require('./errorHandler');
const { validateThing } = require('./utils/validationThings');

const app = express();

const bodyParser = express.json();
app.use(bodyParser);

app.post('/thing', validateThing, ThingController.createThing); // insert one
app.get('/thing/:id', ThingController.getOne); // 1 thing
app.get('/things', ThingController.getAllThings); // all things
app.delete('/thing/:id', ThingController.deleteOne); // delete one
app.put('/thing/:id', validateThing, ThingController.updateOne); // update one


app.use(basicErrorHandler);

module.exports = app;