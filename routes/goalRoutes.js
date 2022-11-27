const express = require("express");
const router = express.Router();
const {
  getGoal,
  getGoals,
  postGoal,
  deleteGaol,
  updateGoal,
} = require("../controller/goalController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getGoals).post(protect, postGoal);

router
  .route("/:id")
  .get(protect, getGoal)
  .delete(protect, deleteGaol)
  .put(protect, updateGoal);

module.exports = router;
