const express = require('express')
const { User } = require('./models/index')
const route = express.Router()
const jwt = require('jsonwebtoken')
const e = require('express')

route.get('/', (req, res) => {
	res.status(200).json({
		data: 'hello',
	})
})

// Register a new user
route.post('/auth/register', async (req, res) => {
	try {
		const { name, email, password } = req.body

		// Check if the email is already registered
		const existingUser = await User.findOne({ where: { email } })
		if (existingUser) {
			return res.status(400).json({ error: 'Email already registered' })
		}

		await User.create({
			name,
			email,
			password,
		})

		res.status(201).json({ message: 'User registered successfully' })
	} catch (error) {
		res
			.status(500)
			.json({ error: 'An error occurred while registering the user' })
	}
})

// User login
route.post('/auth/login', async (req, res) => {
	try {
		console.log('Request body:', req.body)
		const { email, password } = await req.body
		// Check if the user exists
		const user = await User.findOne({ where: { email } })
		if (!user) {
			return res.status(401).json({ error: 'Invalid email or password 1' })
		}

		// Validate the password
		const isPasswordValid = await user.validPassword(password)
		if (!isPasswordValid) {
			return res.status(401).json({ error: 'Invalid email or password 2' })
		}
		// Generate a JWT token
		const token = jwt.sign(
			{ userSlug: user.slug, userEmail: user.email },
			'secret'
		)

		res.status(200).json({ token })
	} catch (error) {
		res.status(500).json({ error: 'An error occurred while logging in' })
	}
})

// User login
route.post('/auth/verify', async (req, res) => {
	try {
		console.log('Request body:', req.body)
		const { token } = await req.body
		const decoded = jwt.verify(token, 'secret')

		res.status(200).json({ decoded })
	} catch (error) {
		res.status(500).json({ error: 'An error occurred while logging in' })
	}
})

module.exports = route
