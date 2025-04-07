//departments
const { connection, options } = require("../db/config");
const { lowercaseKeys } = require("../utils");
exports.getDepartments = async function () {
  let conn;

  try {
    conn = await connection();

    const result = await conn.execute("select * from departments", [], options);

    return result.rows.map((row) => lowercaseKeys(row));
  } catch (err) {
    console.log("Err", err);
  } finally {
    if (conn) {
      await conn.close();
    }
  }
};

exports.getDepartmentById = async function (departmentId) {
  let conn;

  try {
    conn = await connection();

    const result = await conn.execute(
      `SELECT * FROM departments WHERE id = :id`,
      [departmentId],
      options,
    );

    return lowercaseKeys(result.rows[0]);
  } catch (err) {
    console.log("Err", err);
  } finally {
    if (conn) {
      await conn.close();
    }
  }
};

exports.addDepartment = async function (department) {
  let conn;

  try {
    conn = await connection();

    await conn.execute("BEGIN NEW_DEPARTMENT(:name); END;", {
      name: department.name,
    });
    const result = await conn.execute(
      `SELECT * FROM (
                    SELECT * FROM departments ORDER BY id DESC
                           ) FETCH FIRST 1 ROWS ONLY`,
      [],
      options,
    );
    return lowercaseKeys(result.rows[0]);
  } catch (err) {
    console.log("Err", err);
  } finally {
    if (conn) {
      await conn.close();
    }
  }
};

exports.updateDepartment = async function (department) {
  let conn;

  try {
    conn = await connection();

    await conn.execute(`BEGIN UPDATE_DEPARTMENT(:id, :name); END;`, {
      id: department.id,
      name: department.name,
    });
    const result = await conn.execute(
      `SELECT * FROM departments WHERE id = :id`,
      [department.id],
      options,
    );
    return lowercaseKeys(result.rows[0]);
  } catch (err) {
    console.log("Err", err);
  } finally {
    if (conn) {
      await conn.close();
    }
  }
};

exports.deleteDepartment = async function (departmentId) {
  let conn;

  try {
    conn = await connection();
    await conn.execute(`BEGIN DELETE_DEPARTMENT(:id); END;`, {
      id: departmentId,
    });
  } catch (err) {
    console.log("Err", err);
  } finally {
    if (conn) {
      await conn.close();
    }
  }
};
