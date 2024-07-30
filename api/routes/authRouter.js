const { signin, signup } = require('../controllers/authController');
const express = require('express');

const authRouter = express.Router();

authRouter.post('/signin', signin);
authRouter.post('/signup', signup);

module.exports = authRouter;
