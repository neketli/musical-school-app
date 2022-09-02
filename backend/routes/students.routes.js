const Router = require('express')
const router = new Router()
const studentsController = require('../controller/students.controller')
const jwtAuthMiddleware = require('../middleware/auth')


router.post('/students', jwtAuthMiddleware, studentsController.createStudents)
router.get('/students/:id', jwtAuthMiddleware, studentsController.getStudents)
router.get('/students', jwtAuthMiddleware, studentsController.getAllStudents)
router.put('/students/:id', jwtAuthMiddleware, studentsController.updateStudents)
router.delete('/students/:id', jwtAuthMiddleware, studentsController.deleteStudents)

module.exports = router
