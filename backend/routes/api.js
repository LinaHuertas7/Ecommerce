const express = require('express')

const route = express.Router()

const { middlewareValidateUser } = require('./../middlewares/authMiddleware')
const {
	register: registerController,
	login: loginController,
	profile: profileController,
} = require('./../controllers/authController')
const { loginRequest, registerRequest } = require('./../request/AuthRequest')
const { validateRequest } = require('./../request/RequestValidator')

route.get('/', (req, res) => {
	res.status(200).json({
		data: 'hello',
	})
})

// Register a new user
route.post(
	'/auth/register',
	registerRequest(),
	validateRequest,
	registerController
)

// User login
route.post('/auth/login', loginRequest(), validateRequest, loginController)

// User Profile
route.get('/auth/profile', middlewareValidateUser, profileController)

module.exports = route
