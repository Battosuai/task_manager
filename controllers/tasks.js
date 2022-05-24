const asyncWrapper = require("../middlewares/asyncWrapper");
const Task = require("../models/task");
const { createCustomError } = require("../classes/custom-error");

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find();
  res.status(200).json({ tasks });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

const getSingleTask = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params;
  const task = await Task.findOne({ _id: taskId });
  if (!task) {
    return next(createCustomError(`No task with Id ${taskId}`, 404));
  }
  res.status(200).json({ task });
});

const updateTask = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params;

  const updatedTask = await Task.findOneAndUpdate(
    { _id: taskId },
    { ...req.body, updated_at: Date.now() },
    { new: true, runValidators: true }
  );
  if (!updatedTask) {
    return next(createCustomError(`No task with Id ${taskId}`, 404));
  }
  res
    .status(200)
    .json({ msg: "Task Updated", success: true, task: updatedTask });
});

const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params;
  const deletedTask = await Task.findOneAndDelete({ _id: taskId });
  if (!deletedTask) {
    return next(createCustomError(`No task with Id ${taskId}`, 404));
  }
  res.status(200).json({ msg: "Task Deleted", success: true });
});

module.exports = {
  getAllTasks,
  createTask,
  getSingleTask,
  updateTask,
  deleteTask,
};
