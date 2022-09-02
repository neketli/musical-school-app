const Router = require('express')
const router = new Router()
const teachersController = require('../controller/teachers.controller')

router.post('/teachers', teachersController.createTeachers)
router.get('/teachers/:id', teachersController.getTeachers)
router.get('/teachers', teachersController.getAllTeachers)
router.put('/teachers/:id', teachersController.updateTeachers)
router.delete('/teachers/:id', teachersController.deleteTeachers)

module.exports = router
