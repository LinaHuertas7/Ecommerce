const express = require('express')

const route = express.Router()

const { middlewareValidateUser } = require('./../middlewares/authMiddleware')
const { register, login, profile } = require('./../controllers/authController')

route.get('/', (req, res) => {
	res.status(200).json({
		data: 'hello',
	})
})

// Register a new user
route.post('/auth/register', register)

// User login
route.post('/auth/login', login)

// User Profile
route.get('/auth/profile', middlewareValidateUser, profile)

module.exports = route
