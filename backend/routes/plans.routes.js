const Router = require('express')
const router = new Router()
const plansController = require('../controller/plans.controller')
const jwtAuthMiddleware = require('../middleware/auth')


router.post('/plans', jwtAuthMiddleware, plansController.createPlans)
router.get('/plans/:id', jwtAuthMiddleware, plansController.getPlans)
router.get('/plans', jwtAuthMiddleware, plansController.getAllPlans)
router.put('/plans/:id', jwtAuthMiddleware, plansController.updatePlans)
router.delete('/plans/:id', jwtAuthMiddleware, plansController.deletePlans)

module.exports = router
