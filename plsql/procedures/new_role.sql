create or replace PROCEDURE new_role(
    p_role IN VARCHAR2
) AS
    v_count_role NUMBER;
BEGIN
    -- check the role is exist
SELECT COUNT(*) INTO v_count_role FROM ROLES WHERE name = p_role;

-- if role exist, report an error
IF v_count_role > 0 THEN
        RAISE_APPLICATION_ERROR(-20001, 'Exist this role: '|| CHR(9) || p_role );
END IF;

    -- if all is ok, create new role
INSERT INTO ROLES(name)
VALUES(p_role);

COMMIT;
END;
