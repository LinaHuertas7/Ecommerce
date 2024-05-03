const { User } = require('../models/index')

//get all users
exports.getAllUsers = async (req, res) => {
	try {
		const users = await User.findAll()
		res.status(200).json({ users })
	} catch (error) {
		res.status(500).json({ error: 'An error occurred while fetching users' })
	}
}

//get user by slug
exports.getUserBySlug = async (req, res) => {
	try {
		const user = await User.findOne({ where: { slug: req.params.slug } })
		if (!user) {
			return res.status(404).json({ error: 'User not found' })
		}
		res.status(200).json({ user })
	} catch (error) {
		res.status(500).json({ error: 'An error occurred while fetching the user' })
	}
}

//store user
exports.storeUser = async (req, res) => {
	try {
		const { name, email, password } = req.body
		// Check if the email is already registered
		const existingUser = await User.findOne({ where: { email } })
		if (existingUser) {
			return res.status(400).json({ error: 'Email already registered' })
		}
		await User.create({ name, email, password })
		res.status(201).json({ message: 'User save successfully' })
	} catch (error) {
		res.status(500).json({ error: 'An error occurred while save the user' })
	}
}

//update user
exports.updateUser = async (req, res) => {
	try {
		const { name, email, password } = req.body
		const user = await User.findOne({ where: { slug: req.params.slug } })
		if (!user) {
			return res.status(404).json({ error: 'User not found' })
		}
		await user.update({ name, email, password })
		res.status(200).json({ message: 'User updated successfully' })
	} catch (error) {
		res.status(500).json({ error: 'An error occurred while updating the user' })
	}
}

//delete user
exports.deleteUser = async (req, res) => {
	try {
		const user = await User.findOne({ where: { slug: req.params.slug } })
		if (!user) {
			return res.status(404).json({ error: 'User not found' })
		}
		await user.destroy()
		res.status(200).json({ message: 'User deleted successfully' })
	} catch (error) {
		res.status(500).json({ error: 'An error occurred while deleting the user' })
	}
}
