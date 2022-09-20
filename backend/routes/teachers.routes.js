const Router = require("express");
const router = new Router();
const teachersController = require("../controller/teachers.controller");
const jwtAuthMiddleware = require("../middleware/auth");

router.post("/teachers", jwtAuthMiddleware, teachersController.createTeachers);
router.post(
  "/teachers/undo",
  jwtAuthMiddleware,
  teachersController.undoTeachers.bind(teachersController)
);
router.get("/teachers/:id", jwtAuthMiddleware, teachersController.getTeachers);
router.get("/teachers", jwtAuthMiddleware, teachersController.getAllTeachers);
router.put(
  "/teachers/:id",
  jwtAuthMiddleware,
  teachersController.updateTeachers
);
router.delete(
  "/teachers/:id",
  jwtAuthMiddleware,
  teachersController.deleteTeachers
);

module.exports = router;
