const Router = require('express')
const router = new Router()
const groupsController = require('../controller/groups.controller')

router.post('/groups', groupsController.createGroups)
router.get('/groups/:id', groupsController.getGroups)
router.get('/groups', groupsController.getAllGroups)
router.put('/groups/:id', groupsController.updateGroups)
router.delete('/groups/:id', groupsController.deleteGroups)

module.exports = router
