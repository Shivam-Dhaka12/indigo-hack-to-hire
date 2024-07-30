const express = require('express');
const bodyParser = require('body-parser');
const authRouter = require('./routes/authRouter');
const protectedRouter = require('./routes/protectedRouter');
const protectedController = require('./controllers/protectedController');
const flightRouter = require('./routes/flightRouter');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config({ path: '../shared/prisma/.env' });

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.send('API server is online');
});
app.use('/api/auth', authRouter);
app.use('/api/flights', flightRouter);

app.use('/api/protected', protectedController, protectedRouter);

const PORT = process.env.API_PORT || 8002;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT} ...`);
});

app.use((error, req, res, next) => {
	const status = error.statusCode || 500;
	const message = error.message;
	const data = error.data;
	res.status(status).json({ message: message, data: data });
});
