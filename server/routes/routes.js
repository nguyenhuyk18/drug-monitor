const express = require('express');// As in the server.js
const route = express.Router(); //Allows us use express router in this file
const services = require('../services/render');//uses the render.js file from services here

const controller = require('../controller/controller');//uses the render.js file from services here
const { validationName, validationDosage, validationCard, validationPack, validationPerDay } = require('../middleware/validation');


route.get('/', services.home);


route.get('/manage', services.manage);
route.get('/dosage', services.dosage);
route.get('/purchase', services.purchase);
route.get('/add-drug', services.addDrug);
route.get('/update-drug', services.updateDrug);



// API for CRUD operations
route.post('/api/drugs', validationName, validationDosage, validationCard, validationPack, validationPerDay, controller.create);
route.get('/api/drugs', controller.find);
route.put('/api/drugs/:id', validationName, validationDosage, validationCard, validationPack, validationPerDay, controller.update);
route.delete('/api/drugs/:id', controller.delete);
route.get('/api/drugs/filter/:days', controller.drugsCusWant);

module.exports = route;//exports this so it can always be used elsewhere
