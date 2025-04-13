"use strict";

const {
  getRequestsTimeOff,
  getRequestTimeOffByEmployeeId,
  addRequestTimeOff,
  updateRequestTimeOff,
  deleteRequestTimeOff,
  updateStatusApprove,
  updateStatusReject,
  updateStatusPending,
} = require("./accessData");
exports.list = async function (req, res) {
  const data = await getRequestsTimeOff();
  res.send(data);
};

exports.getById = async function (req, res) {
  const employeeId = req.params.employeeId;
  const data = await getRequestTimeOffByEmployeeId(employeeId);
  res.send(data);
};

exports.add = async function (req, res) {
  const data = await addRequestTimeOff(req.body);
  res.send(data);
};

exports.update = async function (req, res) {
  const data = await updateRequestTimeOff(req.body);
  res.send(data);
};
exports.delete = async function (req, res) {
  const id = req.params.id;
  const data = await deleteRequestTimeOff(id);
  res.send({ message: `Deleted ${id}` });
};

exports.statusApprove = async function (req, res) {
  const data = await updateStatusApprove(req.body);
  res.send(data);
};
exports.statusReject = async function (req, res) {
  const data = await updateStatusReject(req.body);
  res.send(data);
};
exports.statusPending = async function (req, res) {
  const data = await updateStatusPending(req.body);
  res.send(data);
};
