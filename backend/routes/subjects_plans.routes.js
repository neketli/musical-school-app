const Router = require('express')
const router = new Router()
const subjects_plansController = require('../controller/subjects_plans.controller')

router.post('/subjects_plans', subjects_plansController.createSubjectPlan)
router.get(
	'/subjects_plans?:id_plan',
	subjects_plansController.getSubjectByPlan,
)
router.get(
	'/subjects_plans?:id_subject',
	subjects_plansController.getSubjectsPlan,
)
router.get('/subjects_plans', subjects_plansController.getAllSubjectPlan)
router.put('/subjects_plans', subjects_plansController.updateSubjectPlan)
router.delete('/subjects_plans', subjects_plansController.deleteSubjectPlan)

module.exports = router
