//profiles
const { connection, options } = require("../db/config");
const { lowercaseKeys } = require("../utils");
exports.getProfiles = async function () {
  let conn;

  try {
    conn = await connection();

    const result = await conn.execute("select * from profiles", [], options);

    return result.rows.map((row) => lowercaseKeys(row));
  } catch (err) {
    console.log("Err", err);
  } finally {
    if (conn) {
      await conn.close();
    }
  }
};

exports.getProfileById = async function (profileId) {
  let conn;

  try {
    conn = await connection();

    const result = await conn.execute(
      `SELECT * FROM profiles WHERE id = :id`,
      [profileId],
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

exports.addProfile = async function (profile) {
  let conn;

  try {
    conn = await connection();

    await conn.execute(
      "BEGIN NEW_PROFILE(:name, :destination, :email, :gender, :staff_id, :user_id, :image, :phone, :address); END;",
      {
        name: profile.name,
        destination: profile.destination,
        email: profile.email,
        gender: profile.gender,
        staff_id: profile.staff_id,
        user_id: profile.user_id,
        image: profile.image,
        phone: profile.phone,
        address: profile.address,
      },
    );
    const result = await conn.execute(
      `SELECT * FROM (
                    SELECT * FROM profiles ORDER BY id DESC
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

exports.updateProfile = async function (profile) {
  let conn;

  try {
    conn = await connection();

    await conn.execute(
      `BEGIN UPDATE_PROFILE(:id, :name, :destination, :email, :gender, :staff_id, :user_id, :image, :phone, :address); END;`,
      {
        id: profile.id,
        name: profile.name,
        destination: profile.destination,
        email: profile.email,
        gender: profile.gender,
        staff_id: profile.staff_id,
        user_id: profile.user_id,
        image: profile.image,
        phone: profile.phone,
        address: profile.address,
      },
    );
    const result = await conn.execute(
      `SELECT * FROM profiles WHERE id = :id`,
      [profile.id],
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

exports.deleteProfile = async function (profileId) {
  let conn;

  try {
    conn = await connection();
    await conn.execute(`BEGIN DELETE_PROFILE(:id); END;`, {
      id: profileId,
    });
  } catch (err) {
    console.log("Err", err);
  } finally {
    if (conn) {
      await conn.close();
    }
  }
};
