CREATE OR REPLACE PROCEDURE delete_assign_employee_to_project(
    p_project_id IN NUMBER,
    p_employee_id IN NUMBER
) AS
    v_project_employee NUMBER;
BEGIN
SELECT count(*) INTO v_project_employee FROM PROJECT_EMPLOYEES WHERE project_id = p_project_id AND employee_id = p_employee_id;

IF v_project_employee = 0 THEN
        RAISE_APPLICATION_ERROR(-20003, 'The record with the specified project_id ' || p_project_id || ' and employee_id ' || p_employee_id || ' does not exist.');
END IF;

DELETE FROM PROJECT_EMPLOYEES
WHERE project_id = p_project_id AND employee_id = p_employee_id;

COMMIT;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        DBMS_OUTPUT.PUT_LINE('NO FOUND SPECIFIED EMPLOYEE ID: '|| p_employee_id);
        DBMS_OUTPUT.PUT_LINE('NO FOUND SPECIFIED PROJECT ID: '|| p_project_id);

END;
/