const jwt = require('jsonwebtoken');

const protectedController = (req, res, next) => {
	const bearerToken = req.headers.authorization;
	const token = bearerToken.split(' ')[1];
	if (token) {
		try {
			const decode = jwt.verify(token, process.env.JWT_SECRET);
			console.log(decode);
			req.body.user_id = decode.id;
			req.body.email = decode.email;
			next();
		} catch (error) {
			console.log(error);
			return res.status(403).json({
				success: false,
				message: 'Auth error: Invalid JWT Token',
			});
		}
	} else {
		console.log('No token provided');
		return res.status(403).json({
			success: false,
			message: 'Auth error: No token provided',
		});
	}
};

module.exports = protectedController;
