const Router = require('express')
const router = new Router()
const plansController = require('../controller/plans.controller')

router.post('/plans', plansController.createPlans)
router.get('/plans/:id', plansController.getPlans)
router.get('/plans', plansController.getAllPlans)
router.put('/plans/:id', plansController.updatePlans)
router.delete('/plans/:id', plansController.deletePlans)

module.exports = router
