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

exports.addTaskForProjectId = async function (task) {
  let conn;

  try {
    conn = await connection();

    await conn.execute(
      "BEGIN NEW_TASK(:name, :status, :estimated_task_time_end, :estimated_work_time, :priority_status, :start_date, :type_task, :project_id, :employee_id); END;",
      {
        name: task.name,
        status: task.status,
        estimated_task_time_end: task.estimated_task_time_end,
        estimated_work_time: task.estimated_work_time,
        priority_status: task.priority_status,
        start_date: task.start_date,
        type_task: task.type_task,
        project_id: task.project_id,
        employee_id: task.employee_id,
      },
    );
    const result = await conn.execute(
      `SELECT * FROM (
                    SELECT * FROM tasks 
                             ORDER BY id DESC
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

exports.updateTaskForProjectId = async function (task) {
  let conn;

  try {
    conn = await connection();

    await conn.execute(
      `BEGIN UPDATE_TASK(:id, :name, :status, :estimated_task_time_end, :estimated_work_time, :priority_status, :start_date, :type_task, :project_id, :employee_id); END;`,
      {
        id: task.id,
        name: task.name,
        status: task.status,
        estimated_task_time_end: task.estimated_task_time_end,
        estimated_work_time: task.estimated_work_time,
        priority_status: task.priority_status,
        start_date: task.start_date,
        type_task: task.type_task,
        project_id: task.project_id,
        employee_id: task.employee_id,
      },
    );
    const result = await conn.execute(
      `SELECT * FROM tasks WHERE id = :id`,
      [task.id],
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

exports.deleteTaskForProjectId = async function (taskId) {
  let conn;

  try {
    conn = await connection();
    await conn.execute(`BEGIN DELETE_TASK(:id); END;`, {
      id: taskId,
    });
  } catch (err) {
    console.log("Err", err);
  } finally {
    if (conn) {
      await conn.close();
    }
  }
};
