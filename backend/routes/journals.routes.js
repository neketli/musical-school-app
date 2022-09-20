const Router = require("express");
const router = new Router();
const journalsController = require("../controller/journals.controller");
const jwtAuthMiddleware = require("../middleware/auth");

router.post("/journals", jwtAuthMiddleware, journalsController.createJournals);
router.post(
  "/journals/undo",
  jwtAuthMiddleware,
  journalsController.undoJournals.bind(journalsController)
);
router.get("/journals/:id", jwtAuthMiddleware, journalsController.getJournals);
router.get("/journals", jwtAuthMiddleware, journalsController.getAllJournals);
router.put(
  "/journals/:id",
  jwtAuthMiddleware,
  journalsController.updateJournals
);
router.delete(
  "/journals/:id",
  jwtAuthMiddleware,
  journalsController.deleteJournals
);

module.exports = router;
