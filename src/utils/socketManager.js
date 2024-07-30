import { io } from 'socket.io-client'; // Singleton pattern implementation
let socketInstance = null;

const getSocketInstance = (jwt) => {
	if (!socketInstance) {
		if (!jwt) {
			console.log('jwt not provided');
			return;
		}
		//create new instance with server
		socketInstance = io(import.meta.env.VITE_BACKEND_URL, {
			reconnection: true,
			reconnectionDelay: 1000,
			reconnectionDelayMax: 5000,
			reconnectionAttempts: 5,
			auth: {
				token: jwt,
			},
		});

		console.log('socket created');
	}
	return socketInstance;
};

const deleteSocketInstance = () => {
	socketInstance = null;
};

const handleSocketError = (socket, showAlert, navigate, navigateTo) => {
	socket.on('error', (error) => {
		// Display an alert with the error message
		showAlert({
			show: true,
			type: 'error',
			msg: 'Error: ' + error.message,
		});

		if (navigate && error.navigateURL) {
			// Redirect the user to the navigateTo page
			console.log('inside navigate');
			navigateTo = navigateTo || '/';
			navigate(error.navigateURL);
		}
	});

	socket.on('reconnect-error', (error) => {
		// Display an alert with the error message
		console.log('inside reconnect error frontend');
		showAlert({
			show: true,
			type: 'error',
			msg: 'Error: ' + error.message,
		});

		if (navigate) {
			// Redirect the user to the navigateTo page
			console.log('inside navigate');
			navigateTo = navigateTo || '/';
			navigate(navigateTo);
		}
	});
};

export { getSocketInstance, deleteSocketInstance, handleSocketError };
