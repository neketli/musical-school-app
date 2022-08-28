const Router = require("express");
const router = new Router();
const studentsController = require("../controller/students.controller");

router.post("/students", studentsController.createStudents);
router.get("/students/:id", studentsController.getStudents);
router.get("/students", studentsController.getAllStudents);
router.put("/students/:id", studentsController.updateStudents);
router.delete("/students/:id", studentsController.deleteStudents);

module.exports = router;
