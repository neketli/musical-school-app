const Router = require('express')
const router = new Router()
const specialityController = require('../controller/speciality.controller')

router.post('/speciality', specialityController.createSpeciality)
router.get('/speciality/:id', specialityController.getSpeciality)
router.get('/speciality', specialityController.getAllSpeciality)
router.put('/speciality/:id', specialityController.updateSpeciality)
router.delete('/speciality/:id', specialityController.deleteSpeciality)

module.exports = router
