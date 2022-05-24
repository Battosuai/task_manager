const Task = require("../models/task");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({ tasks });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error });
  }
};

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error });
  }
};

const getSingleTask = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const task = await Task.findOne({ _id: taskId });
    if (!task) {
      return res.status(404).json({ msg: `No task with Id ${taskId}` });
    }
    res.status(200).json({ task });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const { name, completed } = req.body;
    let data = {};
    if (completed) {
      data.finished_at = Date.now();
      data.completed = completed;
    } else {
      data.completed = completed;
      data.finished_at = null;
    }
    if (name) {
      data.name = name;
    }
    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId },
      { ...data, updated_at: Date.now() },
      { new: true, runValidators: true }
    );
    if (!updatedTask) {
      return res
        .status(404)
        .json({ msg: `No task with Id ${taskId}`, success: false, task: null });
    }
    res
      .status(200)
      .json({ msg: "Task Updated", success: true, task: updatedTask });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ success: false, task: null, msg: error });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const deletedTask = await Task.findOneAndDelete({ _id: taskId });
    if (!deletedTask) {
      return res
        .status(404)
        .json({ msg: `No task with Id ${taskId}`, success: false });
    }
    res.status(200).json({ msg: "Task Deleted", success: true });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ success: false, msg: error });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getSingleTask,
  updateTask,
  deleteTask,
};
