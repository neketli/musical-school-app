const Router = require("express");
const router = new Router();
const subjects_teachersController = require("../controller/subjects_teachers.controller");

router.post(
  "/subjects_teachers",
  subjects_teachersController.createSubjectTeacher
);
router.get(
  "/subjects_teachers?:id_plan",
  subjects_teachersController.getSubjectByTeacher
);
router.get(
  "/subjects_teachers?:id_subject",
  subjects_teachersController.getSubjectsTeacher
);
router.get(
  "/subjects_teachers",
  subjects_teachersController.getAllSubjectTeacher
);
router.put(
  "/subjects_teachers",
  subjects_teachersController.updateSubjectTeacher
);
router.delete(
  "/subjects_teachers",
  subjects_teachersController.deleteSubjectTeacher
);

module.exports = router;
