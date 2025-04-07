//users
const { connection, options } = require("../db/config");
const { lowercaseKeys } = require("../utils");

// exports.getDepartmentById = async function (departmentId) {
//   let conn;
//
//   try {
//     conn = await connection();
//
//     const result = await conn.execute(
//       `SELECT * FROM departments WHERE id = :id`,
//       [departmentId],
//       options,
//     );
//
//     return lowercaseKeys(result.rows[0]);
//   } catch (err) {
//     console.log("Err", err);
//   } finally {
//     if (conn) {
//       await conn.close();
//     }
//   }
// };

//users
exports.getUsers = async function () {
  let conn;

  try {
    conn = conn = await connection();

    const result = await conn.execute("select * from users", [], options);

    return result.rows.map((row) => lowercaseKeys(row));
  } catch (err) {
    console.log("Err", err);
  } finally {
    if (conn) {
      await conn.close();
    }
  }
};

exports.addUser = async function (user) {
  let conn;

  try {
    conn = conn = await connection();

    await conn.execute("BEGIN NEW_USER(:email, :password, :username); END;", {
      email: user.email,
      password: user.password,
      username: user.username,
    });
    const result = await conn.execute(
      `SELECT * FROM (
                         SELECT * FROM users ORDER BY id DESC
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

exports.updateUser = async function (user) {
  let conn;

  try {
    conn = conn = await connection();

    await conn.execute(
      `BEGIN UPDATE_USER(:id, :email, :password, :username); END;`,
      {
        id: user.id,
        email: user.email,
        password: user.password,
        username: user.username,
      },
    );
    const result = await conn.execute(
      `SELECT * FROM users WHERE id = :id`,
      [user.id],
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

exports.deleteUser = async function (userId) {
  let conn;

  try {
    conn = conn = await connection();
    await conn.execute(`BEGIN DELETE_USER(:id); END;`, { id: userId });
  } catch (err) {
    console.log("Err", err);
  } finally {
    if (conn) {
      await conn.close();
    }
  }
};
