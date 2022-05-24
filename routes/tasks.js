const express = require("express");
const router = express.Router();
const {
  getAllTasks,
  getSingleTask,
  updateTask,
  deleteTask,
  createTask,
} = require("../controllers/tasks");

router.route("/").get(getAllTasks).post(createTask);

router.route("/:id").get(getSingleTask).patch(updateTask).delete(deleteTask);

module.exports = router;
