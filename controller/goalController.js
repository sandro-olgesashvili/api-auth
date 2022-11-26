const Goal = require("../models/goalModel");

const getGoals = async (req, res) => {
  const goals = await Goal.find({});
  res.status(200).json(goals);
};

const getGoal = async (req, res) => {
  res.json({ msg: "get goal" });
};

const postGoal = async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add text field");
  }
  const goal = await Goal.create(req.body);

  res.status(201).json(goal);
};

const deleteGaol = async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    req.status(400);
    throw new Error("Gaol Not Found");
  }
  await goal.remove();
  res.json({id:req.params.id});
};

const updateGoal = async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Gaol Not Found");
  }

  const updateGoal = await Goal.findByIdAndUpdate(
    req.params.id,
    { ...req.body },
    {
      new: true,
    }
  );

  res.status(200).json(updateGoal);
};

module.exports = { getGoals, getGoal, deleteGaol, updateGoal, postGoal };
