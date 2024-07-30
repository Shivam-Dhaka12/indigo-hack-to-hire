const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createSubscription = async (req, res) => {
	const { user_id, flight_id } = req.body;
	console.log(user_id, flight_id);

	if (!user_id || !flight_id) {
		return res
			.status(400)
			.json({ error: 'User ID and Flight ID are required' });
	}

	try {
		// Check if the subscription already exists
		const existingSubscription = await prisma.subscription.findFirst({
			where: {
				user_id: user_id,
				flight_id: flight_id,
			},
		});

		if (existingSubscription) {
			return res
				.status(200)
				.json({
					message: 'Subscription already exists',
					subscription: existingSubscription,
				});
		}
		const subscription = await prisma.subscription.create({
			data: {
				user_id,
				flight_id,
			},
		});

		console.log(subscription);
		res.status(201).json(subscription);
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ error: 'Failed to add subscription' });
	}
};

exports.createSubscription = createSubscription;
