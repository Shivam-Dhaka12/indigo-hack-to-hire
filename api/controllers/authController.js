const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

const signin = async (req, res) => {
	try {
		let { email, password } = req.body;
		//CHECK IF DATA EXISTS
		if (!email || !password) {
			return res.status(404).json({
				message: 'Both email and password are required for login',
				success: false,
			});
		}

		email = email.trim();
		email = email.toLowerCase();

		const foundUser = await prisma.user.findUnique({
			where: {
				email: email,
			},
		});

		if (foundUser) {
			const isMatch = bcrypt.compareSync(password, foundUser.password);

			if (isMatch) {
				console.log('===============================================');
				console.log('Logged in successfully as:', foundUser.email);
				const token = jwt.sign(
					{ email: foundUser.email, id: foundUser.id },
					JWT_SECRET,
					{
						expiresIn: '1d',
					}
				);
				return res.status(200).json({
					message: `Logged in successfully as: ${foundUser.email}`,
					success: true,
					email: foundUser.email,
					token,
				});
			} else {
				return res.status(403).json({
					message: 'Invalid Password',
					success: false,
				});
			}
		}
		return res.status(403).json({
			message: `No user with the email : ${email}`,
			success: false,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			message: getErrorMessage(error),
			success: false,
		});
	}
};
const signup = async (req, res) => {
	try {
		const { name, email, password, phone } = req.body;

		//CHECK IF DATA EXISTS
		if (!email || !password || !name || !phone) {
			return res.status(400).json({
				message:
					'All email, password, name and phone are required for the registration',
				success: false,
			});
		}

		email.trim();
		email.toLowerCase();
		console.log(email);
		//CHECK IF USER ALREADY EXISTS
		const userAlreadyRegistered = await prisma.user.findFirst({
			where: {
				email,
			},
		});
		if (userAlreadyRegistered) {
			return res.status(404).json({
				message: 'email already taken',
				success: false,
			});
		}
		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create the new user
		await prisma.user.create({
			data: {
				name,
				email,
				password: hashedPassword,
				phone,
			},
		});

		return res.status(200).json({
			message: 'User registration successfully done!!',
			success: true,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			message: error.message,
			success: false,
		});
	}
};

exports.signin = signin;
exports.signup = signup;
