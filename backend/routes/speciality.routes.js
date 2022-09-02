const Router = require('express')
const router = new Router()
const specialityController = require('../controller/speciality.controller')
const jwtAuthMiddleware = require('../middleware/auth')


router.post('/speciality', jwtAuthMiddleware, specialityController.createSpeciality)
router.get('/speciality/:id', jwtAuthMiddleware, specialityController.getSpeciality)
router.get('/speciality', jwtAuthMiddleware, specialityController.getAllSpeciality)
router.put('/speciality/:id', jwtAuthMiddleware, specialityController.updateSpeciality)
router.delete('/speciality/:id', jwtAuthMiddleware, specialityController.deleteSpeciality)

module.exports = router
