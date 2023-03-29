const Router = require("express");
const router = new Router();
const historyConroller = require("../controller/history.controller");

router.post("/history", historyConroller.getHistory);

module.exports = router;
