//requests-time-off
const { connection, options } = require("../db/config");
const { lowercaseKeys } = require("../utils");
exports.getRequestsTimeOff = async function () {
  let conn;

  try {
    conn = await connection();

    const result = await conn.execute(
      `SELECT * FROM requests_time_off`,
      [],
      options,
    );

    return result.rows.map((row) => lowercaseKeys(row));
  } catch (err) {
    console.log("Err", err.message);
  } finally {
    if (conn) {
      await conn.close();
    }
  }
};

exports.getRequestTimeOffByEmployeeId = async function (employeeId) {
  let conn;

  try {
    conn = await connection();

    const result = await conn.execute(
      `SELECT * FROM requests_time_off WHERE employee_id = :employeeId`,
      [employeeId],
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

exports.addRequestTimeOff = async function (request) {
  let conn;

  try {
    conn = await connection();

    await conn.execute(
      "BEGIN NEW_REQUEST_TIME_OFF(:leave_type, :reason, :start_date, :end_date, :status, :employee_id); END;",
      {
        leave_type: request.leave_type,
        reason: request.reason,
        start_date: new Date(request.start_date),
        end_date: new Date(request.end_date),
        status: request.status,
        employee_id: request.employee_id,
      },
    );
    const result = await conn.execute(
      `SELECT * FROM (
                    SELECT * FROM requests_time_off ORDER BY id DESC
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

exports.updateRequestTimeOff = async function (request) {
  let conn;

  try {
    conn = await connection();

    await conn.execute(
      `BEGIN UPDATE_REQUEST_TIME_OFF(:id, :leave_type, :reason, :start_date, :end_date, :status, :employee_id); END;`,
      {
        id: request.id,
        leave_type: request.leave_type,
        reason: request.reason,
        start_date: new Date(request.start_date),
        end_date: new Date(request.end_date),
        status: request.status,
        employee_id: request.employee_id,
      },
    );
    const result = await conn.execute(
      `SELECT * FROM requests_time_off WHERE id = :id`,
      [request.id],
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

exports.deleteRequestTimeOff = async function (requestId) {
  let conn;

  try {
    conn = await connection();
    await conn.execute(`BEGIN DELETE_REQUEST_TIME_OFF(:id); END;`, {
      id: requestId,
    });
  } catch (err) {
    console.log("Err", err);
  } finally {
    if (conn) {
      await conn.close();
    }
  }
};

exports.updateStatusApprove = async function (request) {
  let conn;

  try {
    conn = await connection();

    await conn.execute(
      `BEGIN update_status_request_time_off(:id, :status); END;`,
      {
        id: request.id,
        status: "APPROVE",
      },
    );
    const result = await conn.execute(
      `SELECT * FROM requests_time_off WHERE id = :id`,
      [request.id],
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

exports.updateStatusReject = async function (request) {
  let conn;

  try {
    conn = await connection();

    await conn.execute(
      `BEGIN update_status_request_time_off(:id, :status); END;`,
      {
        id: request.id,
        status: "REJECT",
      },
    );
    const result = await conn.execute(
      `SELECT * FROM requests_time_off WHERE id = :id`,
      [request.id],
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
exports.updateStatusPending = async function (request) {
  let conn;

  try {
    conn = await connection();

    await conn.execute(
      `BEGIN update_status_request_time_off(:id, :status); END;`,
      {
        id: request.id,
        status: "PENDING",
      },
    );
    const result = await conn.execute(
      `SELECT * FROM requests_time_off WHERE id = :id`,
      [request.id],
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
