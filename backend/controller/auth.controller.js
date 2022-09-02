const jwt = require('jsonwebtoken')

const db = require('../db')
const usersController = require('../controller/users.controller')

const accessTokenSecret = 'secret'

class AuthController {
	async login (req, res) {
		const { login, password } = req.body
		const user = usersController.getAllUsers
			.find(user => user.login === login && user.password === password)

		if (!user) {
			res.status(403).send('Username or password incorrect')
			throw new Error()
		}
		const accessToken = jwt.sign({
			username: user.username,
			user_group: user.user_group,
		}, accessTokenSecret)

		res.json({
			accessToken,
		})
	}
}

module.exports = new AuthController()
