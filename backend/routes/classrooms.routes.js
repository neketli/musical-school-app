const Router = require('express')
const router = new Router()
const classroomsController = require('../controller/classrooms.controller')

router.post('/classrooms', classroomsController.createClassrooms)
router.get('/classrooms/:id', classroomsController.getClassrooms)
router.get('/classrooms', classroomsController.getAllClassrooms)
router.put('/classrooms/:id', classroomsController.updateClassrooms)
router.delete('/classrooms/:id', classroomsController.deleteClassrooms)

module.exports = router
