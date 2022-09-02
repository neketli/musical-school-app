const Router = require('express')
const router = new Router()
const departamentController = require('../controller/subjects.controller')

router.post('/subjects', departamentController.createSubjects)
router.get('/subjects/:id', departamentController.getSubjects)
router.get('/subjects', departamentController.getAllSubjectss)
router.put('/subjects/:id', departamentController.updateSubjects)
router.delete('/subjects/:id', departamentController.deleteSubjects)

module.exports = router
