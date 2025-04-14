"use strict";

const {
  getAuthUsers,
  addAuthUser,
  updateAuthUser,
  deleteAuthUser,
} = require("./accessData");
exports.listAuth = async function (req, res) {
  const data = await getAuthUsers();
  res.send(data);
};

exports.addAuth = async function (req, res) {
  const data = await addAuthUser(req.body);
  res.send(data);
};

// exports.updateAuth = async function (req, res) {
//   const data = await updateAuthUser(req.body);
//   res.send(data);
// };

// exports.deleteAuth = async function (req, res) {
//   const id = req.params.id;
//   const data = await deleteAuthUser(id);
//   res.send({ message: `Deleted ${id}` });
// };
