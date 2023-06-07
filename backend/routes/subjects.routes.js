const Router = require("express");
const router = new Router();
const subjectsController = require("../controller/subjects.controller");
const jwtAuthMiddleware = require("../middleware/auth");

router.post("/subjects", jwtAuthMiddleware, subjectsController.createSubjects);
router.post(
  "/subjects/undo",
  jwtAuthMiddleware,
  subjectsController.undoSubjects.bind(subjectsController)
);
router.get("/subjects/:id", jwtAuthMiddleware, subjectsController.getSubjects);
router.get("/subjects", jwtAuthMiddleware, subjectsController.getAllSubjects);
router.put(
  "/subjects/:id",
  jwtAuthMiddleware,
  subjectsController.updateSubjects
);
router.delete(
  "/subjects/:id",
  jwtAuthMiddleware,
  subjectsController.deleteSubjects
);

module.exports = router;
