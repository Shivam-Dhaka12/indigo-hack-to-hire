const notificationController = require('../../controllers/notificationController');
const express = require('express');
const notificationRouter = express.Router();

notificationRouter.get('/', notificationController.getNotifications);
notificationRouter.post(
	'/update-as-read',
	notificationController.updateNotificationAsRead
);

module.exports = notificationRouter;
