const Router = require('express')
const router = new Router()
const groupsController = require('../controller/groups.controller')
const jwtAuthMiddleware = require('../middleware/auth')


router.post('/groups', jwtAuthMiddleware, groupsController.createGroups)
router.get('/groups/:id', jwtAuthMiddleware, groupsController.getGroups)
router.get('/groups', jwtAuthMiddleware, groupsController.getAllGroups)
router.put('/groups/:id', jwtAuthMiddleware, groupsController.updateGroups)
router.delete('/groups/:id', jwtAuthMiddleware, groupsController.deleteGroups)

module.exports = router
