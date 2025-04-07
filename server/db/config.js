const oracledb = require("oracledb");
const config = {
  user: "hr_app",
  password: "hr123",
  connectString: "localhost:1521/FREEPDB1",
};
const options = { outFormat: oracledb.OBJECT };

const connection = async function () {
  return await oracledb.getConnection(config);
};

module.exports = {
  connection,
  options,
};
