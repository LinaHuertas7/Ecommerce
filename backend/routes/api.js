const express = require('express')

const route = express.Router()

const { middlewareValidateUser } = require('./../middlewares/authMiddleware')
const {
	register: registerController,
	login: loginController,
	profile: profileController,
} = require('./../controllers/authController')

const {
	getAllUsers,
	getUserBySlug,
	storeUser,
	updateUser,
	deleteUser,
} = require('./../controllers/userController')

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
route.get('/users/:slug', getUserBySlug)

// Store user
route.post('/users', storeUser)

// Update user
route.put('/users/:slug', updateUser)

// Delete user
route.delete('/users/:slug', deleteUser)

module.exports = route
