const express = require("express");
const router = express.Router();
const {
  getGoal,
  getGoals,
  postGoal,
  deleteGaol,
  updateGoal,
} = require("../controller/goalController");

router.route("/").get(getGoals).post(postGoal);

router.route("/:id").get(getGoal).delete(deleteGaol).put(updateGoal);

module.exports = router;
