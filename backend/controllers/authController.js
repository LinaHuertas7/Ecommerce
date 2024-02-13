const { User } = require('./../models/index')

const jwt = require('jsonwebtoken')

const SECRET_KEY = 'secret'

exports.register = async (req, res) => {
	try {
		const { name, email, password } = req.body

		// Check if the email is already registered
		const existingUser = await User.findOne({ where: { email } })

		if (existingUser) {
			return res.status(400).json({ error: 'Email already registered' })
		}

		await User.create({ name, email, password })

		res.status(201).json({ message: 'User registered successfully' })
	} catch (error) {
		res
			.status(500)
			.json({ error: 'An error occurred while registering the user' })
	}
}

exports.login = async (req, res) => {
	try {
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
			SECRET_KEY
		)

		res.status(200).json({ token })
	} catch (error) {
		console.log(error)
		res.status(500).json({ error: 'An error occurred while logging in' })
	}
}

exports.profile = async (req, res) => {
	try {
		const user = await User.findOne({ where: { slug: req.userSlug } })

		res.status(200).json({ user })
	} catch (error) {
		res.status(500).json({ error: 'An error occurred while logging in' })
	}
}
