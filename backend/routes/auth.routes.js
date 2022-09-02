const Router = require('express')
const router = new Router()
const authController = require('../controller/auth.controller')

router.post('/login', authController.login)

module.exports = router
