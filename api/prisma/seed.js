const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
	// Seed Flights
	const flights = await Promise.all([
		prisma.flight.create({
			data: {
				flight_id: '6E 2341',
				airline: 'Indigo',
				status: 'On Time',
				departure_gate: 'A12',
				arrival_gate: 'B7',
				scheduled_departure: new Date('2024-07-26T14:00:00Z'),
				scheduled_arrival: new Date('2024-07-26T18:00:00Z'),
				actual_departure: null,
				actual_arrival: null,
			},
		}),
		prisma.flight.create({
			data: {
				flight_id: '6E 2342',
				airline: 'Indigo',
				status: 'Delayed',
				departure_gate: 'C3',
				arrival_gate: 'D4',
				scheduled_departure: new Date('2024-07-26T16:00:00Z'),
				scheduled_arrival: new Date('2024-07-26T20:00:00Z'),
				actual_departure: null,
				actual_arrival: null,
			},
		}),
		prisma.flight.create({
			data: {
				flight_id: '6E 2343',
				airline: 'Indigo',
				status: 'Cancelled',
				departure_gate: 'E2',
				arrival_gate: 'F1',
				scheduled_departure: new Date('2024-07-26T12:00:00Z'),
				scheduled_arrival: new Date('2024-07-26T16:00:00Z'),
				actual_departure: null,
				actual_arrival: null,
			},
		}),
	]);

	// Seed Users
	const users = await Promise.all([
		prisma.user.create({
			data: {
				name: 'shivam',
				email: 'shivamdhaka1200@gmail.com',
				password: 'password123',
				phone: '1234567890',
			},
		}),
		prisma.user.create({
			data: {
				name: 'user2',
				email: 'b@b.com',
				password: 'password123',
				phone: '1234567890',
			},
		}),
	]);

	// Seed Notifications
	await Promise.all([
		prisma.notification.create({
			data: {
				message: 'Your flight 6E 2341 is on time. Departure gate: A12.',
				timestamp: new Date('2024-07-26T13:00:00Z'),
				method: 'SMS',
				recipient: '1234567890',
				flight: { connect: { flight_id: '6E 2341' } },
			},
		}),
		prisma.notification.create({
			data: {
				message:
					'Your flight 6E 2342 is delayed. New departure time: 2024-07-26T17:00:00Z. Departure gate: C3.',
				timestamp: new Date('2024-07-26T15:30:00Z'),
				method: 'Email',
				recipient: 'a@a.com',
				flight: { connect: { flight_id: '6E 2342' } },
			},
		}),
		prisma.notification.create({
			data: {
				message: 'Your flight 6E 2343 has been cancelled.',
				timestamp: new Date('2024-07-26T11:00:00Z'),
				method: 'SMS',
				recipient: '1234567890',
				flight: { connect: { flight_id: '6E 2343' } },
			},
		}),
	]);

	// Seed Subscriptions
	await Promise.all([
		prisma.subscription.create({
			data: {
				user: { connect: { id: users[0].id } },
				flight: { connect: { flight_id: '6E 2341' } },
			},
		}),
		prisma.subscription.create({
			data: {
				user: { connect: { id: users[1].id } },
				flight: { connect: { flight_id: '6E 2342' } },
			},
		}),
	]);
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
