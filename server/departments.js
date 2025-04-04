"use strict";

const {
  getDepartments,
  addDepartment,
  updateDepartment,
  deleteDepartment,
} = require("./db");
exports.list = async function (req, res) {
  const data = await getDepartments();
  res.send(data);
};

exports.add = async function (req, res) {
  const data = await addDepartment(req.body);
  res.send(data);
};

exports.update = async function (req, res) {
  const data = await updateDepartment(req.body);
  res.send(data);
};

exports.delete = async function (req, res) {
  const id = req.params.id;
  const data = await deleteDepartment(id);
  res.send({ message: `Deleted ${id}` });
};
