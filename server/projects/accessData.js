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
