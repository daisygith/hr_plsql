//profiles
const { connection, options } = require("../db/config");
const { lowercaseKeys } = require("../utils");
exports.getTaskForProjectId = async function (projectId) {
  let conn;

  try {
    conn = await connection();

    const result = await conn.execute(
      `SELECT * FROM tasks WHERE project_id = :projectId`,
      [projectId],
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

exports.getTaskByIdForProjectId = async function (projectId, taskId) {
  let conn;

  try {
    conn = await connection();

    const result = await conn.execute(
      `SELECT * FROM tasks WHERE project_id = :projectId AND id = :taskId`,
      [projectId, taskId],
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
//
// exports.addRole = async function (role) {
//   let conn;
//
//   try {
//     conn = await connection();
//
//     await conn.execute("BEGIN NEW_ROLE(:name); END;", {
//       name: role.name,
//     });
//     const result = await conn.execute(
//       `SELECT * FROM (
//                     SELECT * FROM roles ORDER BY id DESC
//                            ) FETCH FIRST 1 ROWS ONLY`,
//       [],
//       options,
//     );
//     return lowercaseKeys(result.rows[0]);
//   } catch (err) {
//     console.log("Err", err);
//   } finally {
//     if (conn) {
//       await conn.close();
//     }
//   }
// };
//
// exports.updateRole = async function (role) {
//   let conn;
//
//   try {
//     conn = await connection();
//
//     await conn.execute(`BEGIN UPDATE_ROLE(:id, :name); END;`, {
//       id: role.id,
//       name: role.name,
//     });
//     const result = await conn.execute(
//       `SELECT * FROM roles WHERE id = :id`,
//       [role.id],
//       options,
//     );
//     return lowercaseKeys(result.rows[0]);
//   } catch (err) {
//     console.log("Err", err);
//   } finally {
//     if (conn) {
//       await conn.close();
//     }
//   }
// };
//
// exports.deleteRole = async function (roleId) {
//   let conn;
//
//   try {
//     conn = await connection();
//     await conn.execute(`BEGIN DELETE_ROLE(:id); END;`, {
//       id: roleId,
//     });
//   } catch (err) {
//     console.log("Err", err);
//   } finally {
//     if (conn) {
//       await conn.close();
//     }
//   }
// };
