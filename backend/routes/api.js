const express = require('express')

const route = express.Router()

const { middlewareValidateUser } = require('./../middlewares/authMiddleware')
const {
	register: registerController,
	login: loginController,
	profile: profileController,
} = require('./../controllers/authController')

const { getAllUsers } = require('./../controllers/userController')

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

// Get all users
route.get('/users', getAllUsers)

// Get user by slug
route.get('/users/:slug', middlewareValidateUser)

// Store user
route.post('/users', middlewareValidateUser)

// Update user
route.put('/users/:slug', middlewareValidateUser)

// Delete user
route.delete('/users/:slug', middlewareValidateUser)

module.exports = route
