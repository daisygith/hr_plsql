create or replace PROCEDURE new_task(
    p_name IN VARCHAR2,
    p_status IN VARCHAR2,
    p_estimated_task_time_end IN DATE,
    p_estimated_work_time IN DATE,
    p_priority_status IN VARCHAR2,
    p_start_date IN DATE,
    p_type_task IN VARCHAR2,
    p_project_id IN NUMBER,
    p_employee_id IN NUMBER
) AS
    v_name VARCHAR2(50);
    v_status VARCHAR2(20);
    v_project_id NUMBER;
    v_employee_id_to_project NUMBER;
    v_priority_status VARCHAR2(30);
    v_priority_status_count NUMBER;
    v_type_task VARCHAR2(30);
    v_type_task_count NUMBER;
    v_now DATE := SYSDATE;
BEGIN

    -- check taks with this name is exist
SELECT COUNT(*) INTO v_name FROM TASKS WHERE name = p_name;
IF v_name IS NULL OR LENGTH(v_name) = 0 THEN
        RAISE_APPLICATION_ERROR(-20004, 'Name cannot be empty');
END IF;
    -- if name exist, report an error
    IF v_name > 0 THEN
        RAISE_APPLICATION_ERROR(-20001, 'Exist this name: '|| CHR(9) || p_name );
END IF;

    IF p_start_date < v_now OR p_estimated_task_time_end < v_now THEN
        RAISE_APPLICATION_ERROR(-20008, 'The end date cannot be in the past');
END IF;

    IF p_status IS NULL THEN
        v_status := 'New';
END IF;

   IF p_priority_status IS NOT NULL THEN
SELECT COUNT(*) INTO v_priority_status_count FROM DICTIONARY_VALUES WHERE dictionary_id = 7 AND value = p_priority_status;
IF v_priority_status_count = 0 THEN
            RAISE_APPLICATION_ERROR(-20009, 'Invalid priority status');
END IF;
        v_priority_status := p_priority_status;
ELSE
        v_priority_status := 'LOW';
END IF;

    IF p_type_task IS NOT NULL THEN
SELECT COUNT(*) INTO v_type_task_count FROM DICTIONARY_VALUES WHERE dictionary_id = 8 AND value = p_type_task;
IF v_type_task_count = 0 THEN
            RAISE_APPLICATION_ERROR(-20009, 'Invalid type of task');
END IF;
        v_type_task := p_type_task;
ELSE
        v_type_task := 'NORMAL';
END IF;

SELECT COUNT(*) INTO v_project_id FROM projects WHERE id = p_project_id;
IF v_project_id = 0 THEN
        RAISE_APPLICATION_ERROR(-20002, 'The project:' || v_project_id ||' is not exist');
END IF;

IF p_employee_id IS NOT NULL THEN 
    SELECT COUNT(*) INTO v_employee_id_to_project FROM project_employees WHERE project_id = p_project_id AND employee_id = p_employee_id;
    IF v_employee_id_to_project = 0 THEN
        RAISE_APPLICATION_ERROR(-20009, 'Invalid match');
    END IF;
    v_employee_id_to_project := p_employee_id;
ELSE
     v_employee_id_to_project := NULL;
 END IF;

    -- if all is ok, create new tak
INSERT INTO TASKS(name, status, estimated_task_time_end, estimated_work_time, priority_status, start_date, type_task, project_id, employee_id)
VALUES(p_name,v_status, p_estimated_task_time_end, p_estimated_work_time, v_priority_status, p_start_date, v_type_task, p_project_id, p_employee_id);

COMMIT;
END;
