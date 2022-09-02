const Router = require('express')
const router = new Router()
const usersController = require('../controller/users.controller')

router.post('/users', usersController.createUsers)
router.get('/users/:id', usersController.getUsers)
router.get('/users', usersController.getAllUsers)
router.put('/users/:id', usersController.updateUsers)
router.delete('/users/:id', usersController.deleteUsers)

module.exports = router
