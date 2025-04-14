"use strict";

const {
  getUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
} = require("./accessData");
exports.list = async function (req, res) {
  const data = await getUsers();
  res.send(data);
};

exports.getById = async function (req, res) {
  const id = req.params.id;
  const data = await getUserById(id);
  res.send(data);
};

exports.add = async function (req, res) {
  const data = await addUser(req.body);
  res.send(data);
};

exports.update = async function (req, res) {
  const data = await updateUser(req.body);
  res.send(data);
};

exports.delete = async function (req, res) {
  const id = req.params.id;
  const data = await deleteUser(id);
  res.send({ message: `Deleted ${id}` });
};
