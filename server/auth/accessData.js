//auth
const { connection, options } = require("../db/config");
const { lowercaseKeys } = require("../utils");

//users
exports.getAuthUsers = async function () {
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

exports.addAuthUser = async function (userId) {
  let conn;

  try {
    conn = await connection();

    const result = await conn.execute(
      `SELECT * FROM users WHERE id = :id`,
      [userId],
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

// exports.updateAuthUser = async function (user) {
//   let conn;
//
//   try {
//     conn = conn = await connection();
//
//     await conn.execute("BEGIN NEW_USER(:email, :password, :username); END;", {
//       email: user.email,
//       password: user.password,
//       username: user.username,
//     });
//     const result = await conn.execute(
//       `SELECT * FROM (
//                          SELECT * FROM users ORDER BY id DESC
//                        ) FETCH FIRST 1 ROWS ONLY`,
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

// exports.deleteAuth = async function (userId) {
//   let conn;
//
//   try {
//     conn = conn = await connection();
//     await conn.execute(`BEGIN DELETE_USER(:id); END;`, { id: userId });
//   } catch (err) {
//     console.log("Err", err);
//   } finally {
//     if (conn) {
//       await conn.close();
//     }
//   }
// };
