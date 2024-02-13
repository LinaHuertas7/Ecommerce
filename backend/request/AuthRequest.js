const { body } = require('express-validator')

exports.loginRequest = () => [
	body('email').isEmail().withMessage('Invalid email'),
	body('email').exists().withMessage('Email is required'),
	body('password').exists().withMessage('Email is required'),
]

exports.registerRequest = () => [
	body('name').optional().isString().withMessage('Name must be a string'),
	body('email').isEmail().withMessage('Invalid email'),
	body('email').exists().withMessage('Email is required'),
	body('password').exists().withMessage('Password is required'),
]
