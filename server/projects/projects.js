"use strict";

const {
  getProjects,
  getProjectById,
  addProject,
  updateProject,
  deleteProject,
} = require("./accessData");
exports.list = async function (req, res) {
  const data = await getProjects();
  res.send(data);
};

exports.getById = async function (req, res) {
  const id = req.params.id;
  const data = await getProjectById(id);
  res.send(data);
};

exports.add = async function (req, res) {
  const data = await addProject(req.body);
  res.send(data);
};

exports.update = async function (req, res) {
  const data = await updateProject(req.body);
  res.send(data);
};

exports.delete = async function (req, res) {
  const id = req.params.id;
  const data = await deleteProject(id);
  res.send({ message: `Deleted ${id}` });
};
