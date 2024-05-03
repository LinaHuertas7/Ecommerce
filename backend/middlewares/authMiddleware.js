const jwt = require('jsonwebtoken')
const SECRET_KEY = 'secret'

// This is an express middleware function for validating a user
exports.middlewareValidateUser = async (req, res, next) => {
	try {
		// Extract the authorization header from the request
		const { authorization } = await req.headers

		// If the authorization header is not set or is undefined, return a 401 status
		if (!authorization || authorization === undefined) {
			res.status(401).json({
				error:
					'You should set a header named Authorization with the token to get access',
			})
		} else {
			// If the authorization header is set, verify the token using jwt
			const { userSlug } = jwt.verify(authorization, SECRET_KEY)

			// If the token is valid, set the userSlug on the request and call the next middleware
			req.userSlug = userSlug
			next()
		}
	} catch (error) {
		// If there is an error (like the token being invalid), return a 401 status
		res.status(401).json({ error: 'Unauthorized' })
	}
}
