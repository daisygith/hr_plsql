create or replace PROCEDURE update_assign_employee_to_project(
    p_project_id IN NUMBER,
    p_employee_id IN NUMBER,
    p_old_employee_id IN NUMBER
)
AS 
    v_project_id NUMBER;
    v_employee_id NUMBER;
    v_old_employee_id NUMBER;
    v_employee_id_to_project NUMBER;
BEGIN
    SELECT count(*) INTO v_project_id FROM PROJECT_EMPLOYEES WHERE project_id = p_project_id;

    IF v_project_id = 0 THEN
        RAISE_APPLICATION_ERROR(-20003, 'The record with the specified ID does not exist.');
    END IF;   

    SELECT id INTO v_employee_id FROM EMPLOYEES WHERE id = p_employee_id;

    SELECT count(*) INTO v_old_employee_id 
    FROM PROJECT_EMPLOYEES
    WHERE project_id = p_project_id AND employee_id = p_old_employee_id;

    IF v_old_employee_id = 0 THEN
        RAISE_APPLICATION_ERROR(-20006, 'The employee:' || v_old_employee_id ||' is not to assign to this project');
    ELSE 
        UPDATE PROJECT_EMPLOYEES SET
        employee_id = p_employee_id
        WHERE project_id = p_project_id AND employee_id = p_old_employee_id;
    END IF;

COMMIT;
    EXCEPTION
    WHEN NO_DATA_FOUND THEN
        DBMS_OUTPUT.PUT_LINE('NO FOUND SPECIFIED EMPLOYEE ID: '|| p_employee_id);
END;
/
