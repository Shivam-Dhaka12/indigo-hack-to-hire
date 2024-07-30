const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getNotifications = async (req, res) => {
	const { email } = req.body;
	console.log(email);
	if (!email) {
		return res.status(400).json({ error: 'User Email is required' });
	}

	try {
		const notifications = await prisma.notification.findMany({
			where: {
				recipient: email,
				method: 'App',
			},
		});

		console.log(notifications);
		res.status(200).json(notifications);
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ error: 'Failed to get notifications' });
	}
};

const updateNotificationAsRead = async (req, res) => {
	const { id } = req.body;

	try {
		const updatedNotification = await prisma.notification.update({
			where: {
				id,
			},
			data: {
				status: 'read',
			},
		});

		console.log('Notification marked as read:', updatedNotification);
		res.status(200).send(updatedNotification);
	} catch (error) {
		console.error('Error marking notification as read:', error);
		res.status(500).send({ error: 'Failed to mark notification as read' });
	}
};

exports.getNotifications = getNotifications;
exports.updateNotificationAsRead = updateNotificationAsRead;
