"use strict";

const { getAuthUser, addAuthUser, getUserRoles } = require("./accessData");
const jwt = require("jsonwebtoken");
const { secret } = require("./config");

exports.login = async function (req, res) {
  const { username, password } = req.body;
  const data = await getAuthUser(username, password);
  if (data) {
    const roles = await getUserRoles(data.id);
    const token = jwt.sign({ username }, secret, { expiresIn: "4H" });
    return res.json({
      token,
      id: data.id,
      username: data.username,
      email: data.email,
      employeeId: null,
      roles,
    });
  }
  res.status(401).json({ message: "Invalid credentials" });
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
