"use strict";

const {
  getProjects,
  getProjectById,
  addProject,
  updateProject,
  deleteProject,
  getEmployeesByProjectId,
  addEmployeeToProjectId,
  updateEmployeeForProjectId,
  deleteEmployeeForProjectId,
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

exports.getEmployees = async function (req, res) {
  const projectId = req.params.projectId;
  const data = await getEmployeesByProjectId(projectId);
  res.send(data);
};

exports.addEmployee = async function (req, res) {
  const projectId = +req.params.projectId;
  if (projectId !== req.body.project_id) {
    return res.status(500).send({ error: "something blew up" });
  }
  const data = await addEmployeeToProjectId(req.body);
  res.send(data);
};

exports.updateEmployee = async function (req, res) {
  const { projectId, employeeId } = req.body;
  const employeeData = {
    project_id: Number(projectId),
    employee_id: Number(employeeId),
    old_employee_id: Number(req.params["employeeId"]),
  };
  const data = await updateEmployeeForProjectId(employeeData);
  res.send(data);
};

exports.deleteEmployee = async function (req, res) {
  const { projectId, employeeId } = req.params;
  const data = await deleteEmployeeForProjectId(projectId, employeeId);
  res
    .status(200)
    .send(`Deleted employee ${employeeId} from project ${projectId}`);
};
