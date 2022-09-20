const Router = require("express");
const router = new Router();
const subjects_plansController = require("../controller/subjects_plans.controller");
const jwtAuthMiddleware = require("../middleware/auth");

router.post(
  "/subjects_plans",
  jwtAuthMiddleware,
  subjects_plansController.createSubjectPlan
);
router.post(
  "/subjects_plans/undo",
  jwtAuthMiddleware,
  subjects_plansController.undoSubjectsPlans.bind(subjects_plansController)
);
router.get(
  "/subjects_plans",
  jwtAuthMiddleware,
  subjects_plansController.getAllSubjectPlan
);
router.put(
  "/subjects_plans",
  jwtAuthMiddleware,
  subjects_plansController.updateSubjectPlan
);
router.delete(
  "/subjects_plans",
  jwtAuthMiddleware,
  subjects_plansController.deleteSubjectPlan
);

module.exports = router;
