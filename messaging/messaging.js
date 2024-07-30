const amqp = require('amqplib/callback_api');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const consumeNotifications = () => {
	amqp.connect(process.env.RABBITMQ_URL, (err, connection) => {
		if (err) throw err;
		connection.createChannel((err, channel) => {
			if (err) throw err;
			const queue = 'notifications';
			channel.assertQueue(queue, { durable: true });
			console.log(
				' [*] Waiting for messages in %s. To exit press CTRL+C',
				queue
			);

			channel.consume(queue, async (msg) => {
				if (msg !== null) {
					const notification = JSON.parse(msg.content.toString());

					// Check if the notification has been attempted more than 3 times
					if (notification.attempts && notification.attempts >= 3) {
						console.log(
							`Discarding notification after ${
								notification.attempts
							} attempts: ${JSON.stringify(notification)}`
						);
						channel.ack(msg);
						return;
					}

					try {
						await sendNotification(notification);
						channel.ack(msg); // Acknowledge the message on success
					} catch (error) {
						console.error(
							`Failed to send notification: ${error.message}`
						);

						if (!notification.hasOwnProperty('attempts')) {
							notification.attempts = 1;
						} else {
							notification.attempts += 1;
						}

						const message = JSON.stringify(notification);
						channel.sendToQueue(queue, Buffer.from(message), {
							persistent: true,
						});

						console.log(
							`Notification sent to queue: ${notification.attempts}`
						); // Re-publish the notification with incremented attempts
						channel.ack(msg); // Acknowledge the message even on failure
					}
				}
			});
		});
	});
};

const sendNotification = async (notification) => {
	if (notification.method === 'Email') {
		await sendMail(notification);
	} else if (notification.method === 'SMS') {
		//await sendSMS(notification);
	} else if (notification.method === 'App') {
		//for future use
	}
};

const sendMail = async (notification) => {
	const mailOptions = {
		from: process.env.ADMIN_EMAIL_USERNAME,
		to: notification.recipient,
		subject: `Flight Notification: ${notification.flight_id}`,
		text: notification.message,
	};

	const transporter = nodemailer.createTransport({
		host: process.env.EMAIL_HOST,
		port: process.env.EMAIL_PORT,
		auth: {
			user: process.env.EMAIL_USERNAME,
			pass: process.env.EMAIL_PASSWORD,
		},
		tls: {
			rejectUnauthorized: false,
		},
		// Activate in gmail "less secure app" option
	});

	try {
		await transporter.sendMail(mailOptions);
		console.log(`Email sent to ${notification.recipient}`);
	} catch (error) {
		throw new Error(`Failed to send email: ${error}`);
	}
};

// const sendSMS = async (notification) => {
// 	let sendTransacSms = new SibApiV3Sdk.SendTransacSms();

// 	sendTransacSms = {
// 		sender: 'Shivam Dhaka', // Replace with your sender name
// 		recipient: notification.recipient,
// 		content: notification.message,
// 	};

// 	try {
// 		const data = await apiInstance.sendTransacSms(sendTransacSms);
// 		console.log(
// 			'SMS sent successfully. Returned data: ' + JSON.stringify(data)
// 		);
// 	} catch (error) {
// 		console.error('Failed to send SMS: ', error);
// 		throw new Error(`Failed to send SMS: ${error.message}`);
// 	}
// };

try {
	consumeNotifications();
} catch (error) {
	console.error(`Failed to consume notifications: ${error.message}`);
	process.exit(1);
}
