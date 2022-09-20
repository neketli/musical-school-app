const Router = require("express");
const router = new Router();
const departamentController = require("../controller/subjects.controller");
const jwtAuthMiddleware = require("../middleware/auth");

router.post(
  "/subjects",
  jwtAuthMiddleware,
  departamentController.createSubjects
);
router.post(
  "/subjects/undo",
  jwtAuthMiddleware,
  departamentController.undoSubjects.bind(departamentController)
);
router.get(
  "/subjects/:id",
  jwtAuthMiddleware,
  departamentController.getSubjects
);
router.get(
  "/subjects",
  jwtAuthMiddleware,
  departamentController.getAllSubjectss
);
router.put(
  "/subjects/:id",
  jwtAuthMiddleware,
  departamentController.updateSubjects
);
router.delete(
  "/subjects/:id",
  jwtAuthMiddleware,
  departamentController.deleteSubjects
);

module.exports = router;
