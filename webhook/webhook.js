const { io, connectedClients } = require('./socketServer');
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const amqp = require('amqplib/callback_api');

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

// Connect to RabbitMQ
let channel;
amqp.connect('amqp://localhost', (err, connection) => {
	if (err) {
		console.error('Error connecting to RabbitMQ:', err);
		return;
	}
	connection.createChannel((err, ch) => {
		if (err) throw err;
		channel = ch;
		channel.assertQueue('notifications', { durable: true });
	});
});

const areDatesEqual = (date1, date2) => {
	if (date1) {
		if (date2) {
			return new Date(date1).getTime() === new Date(date2).getTime();
		} else {
			return false;
		}
	}
	if (date2) {
		return false;
	}
	return true;
};

// Webhook endpoint for updating flight data
app.put('/webhook/flight', async (req, res) => {
	const newFlightData = req.body;
	try {
		// Fetch the existing flight data from the database
		const existingFlightData = await prisma.flight.findUnique({
			where: { flight_id: newFlightData.flight_id },
		});

		if (!existingFlightData) {
			return res.status(404).json({ error: 'Flight not found' });
		}

		const {
			flight_id,
			status,
			arrival_gate,
			departure_gate,
			actual_departure,
			actual_arrival,
			scheduled_departure,
			scheduled_arrival,
		} = newFlightData;

		// if new flight data same as previous flight data

		if (
			existingFlightData.status === newFlightData.status &&
			existingFlightData.departure_gate ===
				newFlightData.departure_gate &&
			existingFlightData.arrival_gate === newFlightData.arrival_gate &&
			areDatesEqual(
				existingFlightData.actual_departure,
				newFlightData.actual_departure
			) &&
			areDatesEqual(
				existingFlightData.actual_arrival,
				newFlightData.actual_arrival
			) &&
			areDatesEqual(
				existingFlightData.scheduled_departure,
				newFlightData.scheduled_departure
			) &&
			areDatesEqual(
				existingFlightData.scheduled_arrival,
				newFlightData.scheduled_arrival
			)
		) {
			return res.status(200).json({ message: 'Nothing to update' });
		}

		// Update the flight data in the database
		await prisma.flight.update({
			where: { flight_id: newFlightData.flight_id },
			data: newFlightData,
		});

		// Send newFlightData flight data to Connected Users
		io.emit('newFlightData', newFlightData);

		// Fetch all subscribers for the flight
		const subscriptions = await prisma.subscription.findMany({
			where: { flight_id: flight_id },
			include: { user: true },
		});

		// Prepare notifications for each subscriber
		subscriptions.forEach(async (sub) => {
			const { email, phone } = sub.user;
			let message = `Your flight ${flight_id} is ${status}.`;

			if (actual_departure) {
				message += `\nDepartured at ${actual_departure}.`;
			} else {
				message += `\nScheduled Departure Time: ${scheduled_departure}.`;
			}

			if (actual_arrival) {
				message += `\nArrived at ${actual_arrival}.`;
			} else {
				message += `\nScheduled Arrival Time: ${scheduled_arrival}.`;
			}

			if (departure_gate != existingFlightData.departure_gate) {
				message += `\nDeparture gate changed from ${existingFlightData.departure_gate} to ${departure_gate}.`;
			} else {
				message += `\nDeparture gate: ${departure_gate}.`;
			}

			if (arrival_gate != existingFlightData.arrival_gate) {
				message += `\nArrival gate changed from ${existingFlightData.arrival_gate} to ${arrival_gate}.`;
			} else {
				message += `\mArrival gate: ${arrival_gate}.`;
			}

			// Create SMS and Email notifications
			const notifications = [
				{
					flight_id,
					message,
					timestamp: new Date().toISOString(),
					method: 'Email',
					recipient: email,
				},
				{
					flight_id,
					message,
					timestamp: new Date(),
					method: 'SMS',
					recipient: phone,
				},
				{
					flight_id,
					message,
					timestamp: new Date().toISOString(),
					method: 'App',
					status: 'unread',
					recipient: email,
				},
			];

			// Update in DB
			const { count } = await prisma.notification.createMany({
				data: notifications,
			});

			console.log(
				`Created ${count} notifications for flight ${flight_id}`
			);

			// Publish notifications to RabbitMQ
			notifications.forEach((notification) => {
				channel.sendToQueue(
					'notifications',
					Buffer.from(JSON.stringify(notification))
				);
			});

			// Send notifications to user
			const userSocketId = connectedClients.get(email);
			if (userSocketId) {
				io.to(userSocketId).emit('notification', {
					flight_id,
					message,
					timestamp: new Date().toISOString(),
				});
			}
		});

		res.status(200).json({
			message: 'Flight data updated and notifications sent successfully',
		});
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ error: 'Internal server error' });
	}
});

// Endpoint to add new flight detail
app.post('/webhook/flight', async (req, res) => {
	const newFlight = req.body;

	try {
		const flight = await prisma.flight.create({
			data: newFlight,
		});

		res.status(201).json(flight);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal server error' });
	}
});

app.use('/', (req, res) => {
	res.send('Webhook is online.');
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
	console.log(`Webhook Server is running on port ${PORT} ...`);
});

app.use((error, req, res, next) => {
	const status = error.statusCode || 500;
	const message = error.message;
	const data = error.data;
	res.status(status).json({ message: message, data: data });
});
