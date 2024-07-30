const flightController = require('../controllers/flightController');
const express = require('express');
const flightRouter = express.Router();

flightRouter.post('/', flightController.getFlights);

module.exports = flightRouter;
