const Router = require('express')
const router = new Router()
const classroomsController = require('../controller/classrooms.controller')
const jwtAuthMiddleware = require('../middleware/auth')


router.post('/classrooms', jwtAuthMiddleware, classroomsController.createClassrooms)
router.get('/classrooms/:id', jwtAuthMiddleware, classroomsController.getClassrooms)
router.get('/classrooms', jwtAuthMiddleware, classroomsController.getAllClassrooms)
router.put('/classrooms/:id', jwtAuthMiddleware, classroomsController.updateClassrooms)
router.delete('/classrooms/:id', jwtAuthMiddleware, classroomsController.deleteClassrooms)

module.exports = router
