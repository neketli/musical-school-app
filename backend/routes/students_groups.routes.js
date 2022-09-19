const Router = require("express");
const router = new Router();
const students_groupsController = require("../controller/students_groups.controller");
const jwtAuthMiddleware = require("../middleware/auth");

router.post(
  "/students_groups",
  jwtAuthMiddleware,
  students_groupsController.createStudentsGroups
);
router.get(
  "/students_groups",
  jwtAuthMiddleware,
  students_groupsController.getAllStudentsGroups
);
router.put(
  "/students_groups",
  jwtAuthMiddleware,
  students_groupsController.updateStudentsGroups
);
router.delete(
  "/students_groups",
  jwtAuthMiddleware,
  students_groupsController.deleteStudentsGroups
);

module.exports = router;
