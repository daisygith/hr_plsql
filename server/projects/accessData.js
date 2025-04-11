//profiles
const { connection, options } = require("../db/config");
const { lowercaseKeys } = require("../utils");
exports.getProjects = async function () {
  let conn;

  try {
    conn = await connection();

    const result = await conn.execute("select * from projects", [], options);

    return result.rows.map((row) => lowercaseKeys(row));
  } catch (err) {
    console.log("Err", err);
  } finally {
    if (conn) {
      await conn.close();
    }
  }
};

exports.getProjectById = async function (projectId) {
  let conn;

  try {
    conn = await connection();

    const result = await conn.execute(
      `SELECT * FROM projects WHERE id = :id`,
      [projectId],
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

exports.addProject = async function (project) {
  let conn;

  try {
    conn = await connection();

    await conn.execute("BEGIN NEW_PROJECT(:name); END;", {
      name: project.name,
    });
    const result = await conn.execute(
      `SELECT * FROM (
                    SELECT * FROM projects ORDER BY id DESC
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

exports.updateProject = async function (project) {
  let conn;

  try {
    conn = await connection();

    await conn.execute(`BEGIN UPDATE_PROJECT(:id, :name); END;`, {
      id: project.id,
      name: project.name,
    });
    const result = await conn.execute(
      `SELECT * FROM projects WHERE id = :id`,
      [project.id],
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

exports.deleteProject = async function (projectId) {
  let conn;

  try {
    conn = await connection();
    await conn.execute(`BEGIN DELETE_PROJECT(:id); END;`, {
      id: projectId,
    });
  } catch (err) {
    console.log("Err", err);
  } finally {
    if (conn) {
      await conn.close();
    }
  }
};

exports.getEmployeesByProjectId = async function () {
  let conn;

  try {
    conn = await connection();

    const result = await conn.execute(
      "select * from project_employees",
      [],
      options,
    );

    return result.rows.map((row) => lowercaseKeys(row));
  } catch (err) {
    console.log("Err", err);
  } finally {
    if (conn) {
      await conn.close();
    }
  }
};

exports.addEmployeeToProjectId = async function (employee) {
  let conn;

  try {
    conn = await connection();

    await conn.execute(
      "BEGIN ASSIGN_EMPLOYEE_TO_PROJECT(:project_id, :employee_id); END;",
      {
        project_id: employee.project_id,
        employee_id: employee.employee_id,
      },
    );
    const result = await conn.execute(
      `SELECT * FROM (
                    SELECT * FROM project_employees 
                             WHERE project_id = :project_id AND employee_id = :employee_id
                           ) FETCH FIRST 1 ROWS ONLY`,
      [employee.project_id, employee.employee_id],
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

exports.updateEmployeeForProjectId = async function (employee) {
  let conn;

  try {
    conn = await connection();

    await conn.execute(
      `BEGIN UPDATE_ASSIGN_EMPLOYEE_TO_PROJECT(:project_id, :employee_id, :old_employee_id); END;`,
      {
        project_id: employee.project_id,
        employee_id: employee.employee_id,
        old_employee_id: employee.old_employee_id,
      },
    );
    const result = await conn.execute(
      `SELECT * FROM (
                         SELECT * FROM project_employees
                         WHERE project_id = :project_id AND employee_id = :employee_id
                       ) FETCH FIRST 1 ROWS ONLY`,
      [employee.project_id, employee.employee_id],
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

exports.deleteEmployeeForProjectId = async function (projectId, employeeId) {
  let conn;

  try {
    conn = await connection();
    await conn.execute(
      `BEGIN DELETE_ASSIGN_EMPLOYEE_TO_PROJECT(:project_id, :employee_id); END;`,
      {
        project_id: projectId,
        employee_id: employeeId,
      },
    );
  } catch (err) {
    console.log("Err", err);
  } finally {
    if (conn) {
      await conn.close();
    }
  }
};
