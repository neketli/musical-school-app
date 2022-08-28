const Router = require("express");
const router = new Router();
const students_groupsController = require("../controller/students_groups.controller");

router.post("/students_groups", students_groupsController.createStudentsGroups);
router.get(
  "/students_groups?:id_group",
  students_groupsController.getStudentsByGroup
);
router.get(
  "/students_groups?:id_student",
  students_groupsController.getStudentsGroup
);
router.get("/students_groups", students_groupsController.getAllStudentsGroups);
router.put("/students_groups", students_groupsController.updateStudentsGroups);
router.delete(
  "/students_groups",
  students_groupsController.deleteStudentsGroups
);

module.exports = router;
