"use strict";

const {
  getRoles,
  getRoleById,
  addRole,
  updateRole,
  deleteRole,
} = require("./accessData");
exports.list = async function (req, res) {
  const data = await getRoles();
  res.send(data);
};

exports.getById = async function (req, res) {
  const id = req.params.id;
  const data = await getRoleById(id);
  res.send(data);
};

exports.add = async function (req, res) {
  const data = await addRole(req.body);
  res.send(data);
};

exports.update = async function (req, res) {
  const data = await updateRole(req.body);
  res.send(data);
};

exports.delete = async function (req, res) {
  const id = req.params.id;
  const data = await deleteRole(id);
  res.send({ message: `Deleted ${id}` });
};
