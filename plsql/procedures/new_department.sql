create or replace PROCEDURE new_department(
    p_department IN VARCHAR2
) AS
    v_count_department NUMBER;
BEGIN
    -- check the department is exist
SELECT COUNT(*) INTO v_count_department FROM DEPARTMENTS WHERE name = p_department;

-- if department exist, report an error
IF v_count_department > 0 THEN
        RAISE_APPLICATION_ERROR(-20001, 'Exist this department: '|| CHR(9) || p_department );
END IF;

    -- if all is ok, create new department
INSERT INTO DEPARTMENTS(name)
VALUES(p_department);

COMMIT;
END;
