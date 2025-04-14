"use strict";

const {
  getEmployees,
  getEmployeeById,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  updateImageByEmployeeId,
  deleteImageByEmployeeId,
} = require("./accessData");
exports.list = async function (req, res) {
  const data = await getEmployees();
  res.send(data);
};

exports.getById = async function (req, res) {
  // const id = req.params.id;
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).send({ error: "Invalid id" });
  }
  const data = await getEmployeeById(id);
  res.send(data);
};

exports.add = async function (req, res) {
  const data = await addEmployee(req.body);
  res.send(data);
};

exports.update = async function (req, res) {
  const data = await updateEmployee(req.body);
  res.send(data);
};

exports.delete = async function (req, res) {
  const id = req.params.id;
  const data = await deleteEmployee(id);
  res.send({ message: `Deleted ${id}` });
};

exports.updateImage = async function (req, res) {
  const employeeId = req.params.employeeId;
  const imageData = {
    ...req.body,
    id: Number(employeeId),
  };
  const data = await updateImageByEmployeeId(imageData);
  res.send(data);
};

exports.deleteImage = async function (req, res) {
  const employeeId = req.params.employeeId;
  const imageData = {
    ...req.body,
    id: Number(employeeId),
  };
  const data = await deleteImageByEmployeeId(imageData);
  res.send(data);
};
