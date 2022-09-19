const Router = require("express");
const router = new Router();
const departamentController = require("../controller/departaments.controller");
const jwtAuthMiddleware = require("../middleware/auth");

router.post(
  "/departaments",
  jwtAuthMiddleware,
  departamentController.createDepartament
);
router.post(
  "/departaments/undo",
  jwtAuthMiddleware,
  departamentController.undoDepartament.bind(departamentController)
);
router.get(
  "/departaments/:id",
  jwtAuthMiddleware,
  departamentController.getDepartament
);
router.get(
  "/departaments",
  jwtAuthMiddleware,
  departamentController.getAllDepartaments
);
router.put(
  "/departaments/:id",
  jwtAuthMiddleware,
  departamentController.updateDepartament
);
router.delete(
  "/departaments/:id",
  jwtAuthMiddleware,
  departamentController.deleteDepartament
);

module.exports = router;
