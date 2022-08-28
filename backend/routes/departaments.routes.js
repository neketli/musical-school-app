const Router = require("express");
const router = new Router();
const departamentController = require("../controller/departaments.controller");

router.post("/departaments", departamentController.createDepartament);
router.get("/departaments/:id", departamentController.getDepartament);
router.get("/departaments", departamentController.getAllDepartaments);
router.put("/departaments/:id", departamentController.updateDepartament);
router.delete("/departaments/:id", departamentController.deleteDepartament);

module.exports = router;
