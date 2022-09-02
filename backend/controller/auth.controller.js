const jwt = require('jsonwebtoken')

const usersController = require('../controller/users.controller')

class AuthController {
	async login (req, res) {
		const { login, password } = req.body
		const user = usersController.getAllUsers
			.find(user => user.login === login && user.password === password)
		if (!user) {
			res.status(403).send('Username or password incorrect')
			// throw new Error()
			return
		}
		const token = jwt.sign({
			login: user.login,
			user_group: user.user_group,
		}, process.env.JWT_KEY);

		res.json({
			token,
		});
	}
}

module.exports = new AuthController()
