const http = require('http');
const socketIo = require('socket.io');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET;

const server = http.createServer();
const io = socketIo(server, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST'],
	},
});

const connectedClients = new Map(); // Map to store connected clients

io.use((socket, next) => {
	const token = socket.handshake.auth.token;
	if (!token) {
		return next(new Error('Authentication error'));
	}

	jwt.verify(token, SECRET_KEY, (err, decoded) => {
		if (err) {
			return next(new Error('Authentication error'));
		}
		socket.userId = decoded.userEmail;
		next();
	});
});

io.on('connection', (socket) => {
	console.log('A user connected:', socket.id);
	connectedClients.set(socket.userId, socket.id);

	socket.on('disconnect', () => {
		console.log('A user disconnected:', socket.id);
		connectedClients.delete(socket.userId);
	});
});

const PORT = process.env.SOCKET_PORT || 8001;

try {
	server.listen(PORT, () => {
		console.log(`Socket.IO server running on port ${PORT} ...`);
	});
} catch (error) {
	console.log('Error starting Socket Server', error);
}

module.exports = { io, connectedClients };
