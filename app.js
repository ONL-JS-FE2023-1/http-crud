const express = require('express');
const ThingController = require('./controllers/Thing.controller');

const app = express();

const bodyParser = express.json();

app.post('/thing', bodyParser, ThingController.createThing); // insert one
app.get('/thing/:id', ThingController.getOne); // 1 thing
app.get('/things', ThingController.getAllThings); // all things
app.delete('/thing/:id', ThingController.deleteOne); // delete one
app.put('/thing/:id', bodyParser, ThingController.updateOne); // update one

module.exports = app;