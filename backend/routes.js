const express = require('express')
const { User } = require('./models/index')
const route = express.Router()
const jwt = require('jsonwebtoken')

route.get('/', (req, res) => {
	res.status(200).json({
		data: 'hello',
	})
})

// User login
route.post('/login', async (req, res) => {
	try {
		console.log('Request body:', req.body)
		const { email, password } = await req.body
		// Check if the user exists
		const user = await User.findOne({ where: { email } })
		if (!user) {
			return res.status(401).json({ error: 'Invalid email or password 1' })
		}
		console.log('pass find one')
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
		console.error('Error logging in:', error)
		res.status(500).json({ error: 'An error occurred while logging in' })
	}
})

// User login
route.post('/verify', async (req, res) => {
	try {
		console.log('Request body:', req.body)
		const { token } = await req.body
		const decoded = jwt.verify(token, 'secret')

		res.status(200).json({ decoded })
	} catch (error) {
		console.error('Error logging in:', error)
		res.status(500).json({ error: 'An error occurred while logging in' })
	}
})

module.exports = route
