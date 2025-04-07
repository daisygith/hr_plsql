"use strict";

const {
  getProfiles,
  getProfileById,
  addProfile,
  updateProfile,
  deleteProfile,
} = require("./accessData");
exports.list = async function (req, res) {
  const data = await getProfiles();
  res.send(data);
};

exports.getById = async function (req, res) {
  const id = req.params.id;
  const data = await getProfileById(id);
  res.send(data);
};

exports.add = async function (req, res) {
  const data = await addProfile(req.body);
  res.send(data);
};

exports.update = async function (req, res) {
  const data = await updateProfile(req.body);
  res.send(data);
};

exports.delete = async function (req, res) {
  const id = req.params.id;
  const data = await deleteProfile(id);
  res.send({ message: `Deleted ${id}` });
};
