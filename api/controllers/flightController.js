const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getFlights = async (req, res) => {
	const { searchParam } = req.body;

	try {
		const flights = await prisma.flight.findMany({
			where: {
				OR: [
					{
						flight_id: {
							contains: searchParam, // Assumes searchParam is a string
							mode: 'insensitive', // Optional: make the search case-insensitive
						},
					},
					{
						airline: {
							contains: searchParam,
							mode: 'insensitive',
						},
					},
					{
						departure_gate: {
							contains: searchParam,
							mode: 'insensitive',
						},
					},
					{
						arrival_gate: {
							contains: searchParam,
							mode: 'insensitive',
						},
					},
				],
			},
		});

		res.status(200).json({
			flights,
		});
	} catch (error) {
		res.status(500).json({ error: 'Failed to search flights' });
	}
};

exports.getFlights = getFlights;
