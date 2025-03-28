create or replace PROCEDURE update_user_roles(
    p_user_id IN NUMBER,
    p_role_id IN NUMBER
) AS
    v_user_id NUMBER;
    v_role_id NUMBER;
BEGIN
SELECT user_id INTO v_user_id FROM USER_ROLES WHERE user_id = p_user_id;
SELECT id INTO v_role_id FROM ROLES WHERE id = p_role_id;

IF v_user_id <> p_user_id THEN
        RAISE_APPLICATION_ERROR(-20003, 'The record with the specified ID does not exist.');
ELSE
UPDATE USER_ROLES SET
    role_id = p_role_id
WHERE user_id = p_user_id;
END IF;

EXCEPTION
        WHEN NO_DATA_FOUND THEN
            DBMS_OUTPUT.PUT_LINE('NO FOUND SPECIFIED ROLE ID: '|| p_role_id);
COMMIT;
END;
