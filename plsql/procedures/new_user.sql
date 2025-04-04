create or replace PROCEDURE new_user(
    p_email IN VARCHAR2,
    p_password IN VARCHAR2,
    p_username IN VARCHAR2
) AS
    v_count_email NUMBER;
    v_count_username NUMBER;
BEGIN
    -- check user with this email is exist
SELECT COUNT(*) INTO v_count_email FROM USERS WHERE email = p_email;
-- if email exist, report an error
IF v_count_email > 0 THEN
        RAISE_APPLICATION_ERROR(-20001, 'Exist this email: '|| CHR(9) || p_email );
END IF;

    -- check user with this username is exist
SELECT COUNT(*) INTO v_count_username FROM USERS WHERE username = p_username;
-- if username exist, report an error
IF v_count_username > 0 THEN
        RAISE_APPLICATION_ERROR(-20001, 'Exist this username: '|| CHR(9) || p_username );
END IF;

    -- if all is ok, create new user
INSERT INTO USERS(email, password, username)
VALUES(p_email, p_password, p_username);

COMMIT;
END;
