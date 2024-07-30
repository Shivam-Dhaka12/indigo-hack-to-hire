const subscriptionController = require('../../controllers/subscriptionController');
const express = require('express');

const subscriptionRouter = express.Router();

subscriptionRouter.post('/', subscriptionController.createSubscription);

module.exports = subscriptionRouter;
