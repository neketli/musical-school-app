const Router = require("express");
const router = new Router();
const dumpController = require("../controller/dump.controller");
const jwtAuthMiddleware = require("../middleware/auth");

router.post("/dump", jwtAuthMiddleware, dumpController.setDump);
router.get("/dump", jwtAuthMiddleware, dumpController.getDump);

module.exports = router;
