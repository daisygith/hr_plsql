//employees
const { connection, options } = require("../db/config");
const { lowercaseKeys } = require("../utils");
exports.getEmployees = async function () {
  let conn;

  try {
    conn = await connection();

    const result = await conn.execute("select * from employees", [], options);

    return result.rows.map((row) => lowercaseKeys(row));
  } catch (err) {
    console.log("Err", err);
  } finally {
    if (conn) {
      await conn.close();
    }
  }
};

exports.getEmployeeById = async function (employeeId) {
  let conn;

  try {
    conn = await connection();

    const result = await conn.execute(
      `SELECT * FROM employees WHERE id = :id`,
      [employeeId],
      options,
    );

    return lowercaseKeys(result.rows[0]);
  } catch (err) {
    console.log("Err", err);
    console.error("ORA ERROR", err.message, err.stack);
  } finally {
    if (conn) {
      await conn.close();
    }
  }
};

exports.addEmployee = async function (employee) {
  let conn;

  try {
    conn = await connection();

    await conn.execute(
      "BEGIN NEW_EMPLOYEE(:name, :department, :department_id, :position, :staff_id, :type_of_contract, :image, :phone, :address); END;",
      {
        name: employee.name,
        department: employee.department,
        department_id: employee.department_id,
        position: employee.position,
        staff_id: employee.staff_id,
        type_of_contract: employee.type_of_contract,
        image: employee.image,
        phone: employee.phone,
        address: employee.address,
      },
    );
    const result = await conn.execute(
      `SELECT * FROM (
                    SELECT * FROM employees ORDER BY id DESC
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

exports.updateEmployee = async function (employee) {
  let conn;

  try {
    conn = await connection();

    await conn.execute(
      `BEGIN UPDATE_EMPLOYEE(:id, :name, :department, :department_id, :position, :staff_id, :type_of_contract, :image, :phone, :address); END;`,
      {
        id: employee.id,
        name: employee.name,
        department: employee.department,
        department_id: employee.department_id,
        position: employee.position,
        staff_id: employee.staff_id,
        type_of_contract: employee.type_of_contract,
        image: employee.image,
        phone: employee.phone,
        address: employee.address,
      },
    );
    const result = await conn.execute(
      `SELECT * FROM employees WHERE id = :id`,
      [employee.id],
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

exports.deleteEmployee = async function (employeeId) {
  let conn;

  try {
    conn = await connection();
    await conn.execute(`BEGIN DELETE_EMPLOYEE(:id); END;`, {
      id: employeeId,
    });
  } catch (err) {
    console.log("Err", err);
  } finally {
    if (conn) {
      await conn.close();
    }
  }
};

exports.updateImageByEmployeeId = async function (image) {
  let conn;

  try {
    conn = await connection();

    await conn.execute(`BEGIN UPDATE_IMAGE_EMPLOYEE(:id, :image); END;`, {
      id: image.id,
      image: image.url,
    });
    const result = await conn.execute(
      `SELECT * FROM employees WHERE id = :id`,
      [image.id],
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

exports.deleteImageByEmployeeId = async function (image) {
  let conn;

  try {
    conn = await connection();

    await conn.execute(`BEGIN DELETE_IMAGE_EMPLOYEE(:id, :image); END;`, {
      id: image.id,
      image: image.url,
    });
    const result = await conn.execute(
      `SELECT * FROM employees WHERE id = :id`,
      [image.id],
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
