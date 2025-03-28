create or replace PROCEDURE assign_employee_to_project(
    p_project_id IN NUMBER,
    p_employee_id IN NUMBER
) AS
    v_project_id NUMBER;
    v_employee_id NUMBER;
    v_employee_id_to_project NUMBER;
BEGIN
SELECT count(*) INTO v_project_id FROM PROJECTS WHERE id = p_project_id;
SELECT count(*) INTO v_employee_id FROM EMPLOYEES WHERE id = p_employee_id;

IF v_project_id = 0 OR  v_employee_id = 0 THEN
        RAISE_APPLICATION_ERROR(-20003, 'The record with the specified ID does not exist.');
END IF;

SELECT count(*) INTO v_employee_id_to_project FROM project_employees
WHERE project_id = p_project_id AND employee_id = p_employee_id;

IF v_employee_id_to_project > 0 THEN
        RAISE_APPLICATION_ERROR(-20006, 'The employee:' || v_employee_id_to_project ||' is already to assign to this project');
END IF;

INSERT INTO project_employees(project_id, employee_id)
VALUES(p_project_id,p_employee_id);
--        UPDATE USER_ROLES SET
--        role_id = p_role_id
--        WHERE user_id = p_user_id;
--
--
EXCEPTION
        WHEN NO_DATA_FOUND THEN
            DBMS_OUTPUT.PUT_LINE('NO FOUND SPECIFIED PROJECT ID: '|| p_project_id);
            DBMS_OUTPUT.PUT_LINE('NO FOUND SPECIFIED EMPLOYEE ID: '|| p_employee_id);
COMMIT;
END;
