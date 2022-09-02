const Router = require('express')
const router = new Router()
const subjects_plansController = require('../controller/subjects_plans.controller')
const jwtAuthMiddleware = require('../middleware/auth')


router.post('/subjects_plans', subjects_plansController.createSubjectPlan)
router.get(
	'/subjects_plans?:id_plan', jwtAuthMiddleware,
	subjects_plansController.getSubjectByPlan,
)
router.get(
	'/subjects_plans?:id_subject', jwtAuthMiddleware,
	subjects_plansController.getSubjectsPlan,
)
router.get('/subjects_plans', jwtAuthMiddleware, subjects_plansController.getAllSubjectPlan)
router.put('/subjects_plans', jwtAuthMiddleware, subjects_plansController.updateSubjectPlan)
router.delete('/subjects_plans', jwtAuthMiddleware, subjects_plansController.deleteSubjectPlan)

module.exports = router
