"use strict";

const {
  getTaskForProjectId,
  getTaskByIdForProjectId,
  addTaskForProjectId,
  updateTaskForProjectId,
  deleteTaskForProjectId,
} = require("./accessData");
exports.list = async function (req, res) {
  const projectId = req.params.projectId;
  const data = await getTaskForProjectId(projectId);
  res.send(data);
};

exports.getById = async function (req, res) {
  // const projectId = req.params.projectId;
  // const taskId = req.params.id;
  const { projectId, taskId } = req.params;
  const data = await getTaskByIdForProjectId(projectId, taskId);
  res.send(data);
};

exports.add = async function (req, res) {
  const projectId = req.params.projectId;
  const taskData = {
    ...req.body,
    project_id: Number(projectId),
  };
  const data = await addTaskForProjectId(taskData);
  res.send(data);
};

exports.update = async function (req, res) {
  const { projectId, taskId } = req.params;
  const taskData = {
    ...req.body,
    id: Number(taskId),
    project_id: Number(projectId),
  };
  const data = await updateTaskForProjectId(taskData);
  res.send(data);
};

exports.delete = async function (req, res) {
  const { projectId, taskId } = req.params;
  const data = await deleteTaskForProjectId(taskId);
  res.send({ message: `Deleted ${taskId}` });
};
