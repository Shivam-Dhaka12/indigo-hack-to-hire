const express = require('express');
const subscriptionRouter = require('./protectedRoutes/subscriptionRouter');
const notificationRouter = require('./protectedRoutes/notificationRouter');

const protectedRouter = express.Router();

protectedRouter.use('/subscriptions', subscriptionRouter);
protectedRouter.use('/notifications', notificationRouter);

module.exports = protectedRouter;
