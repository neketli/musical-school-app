const Router = require('express')
const router = new Router()
const journalsController = require('../controller/journals.controller')

router.post('/journals', journalsController.createJournals)
router.get('/journals/:id', journalsController.getJournals)
router.get('/journals', journalsController.getAllJournals)
router.put('/journals/:id', journalsController.updateJournals)
router.delete('/journals/:id', journalsController.deleteJournals)

module.exports = router
