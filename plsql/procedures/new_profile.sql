create or replace PROCEDURE new_profile(
    p_name IN VARCHAR2,
    p_desctination IN VARCHAR2,
    p_email IN VARCHAR2,
    p_gender IN VARCHAR2,
    p_staff_id IN NUMBER,
    p_user_id IN NUMBER,
    p_image IN VARCHAR2,
    p_phone IN VARCHAR2,
    p_address IN VARCHAR2
) AS
    v_gender NUMBER;
BEGIN

    IF p_gender IS NOT NULL THEN
SELECT COUNT(*) INTO v_gender FROM DICTIONARY_VALUES WHERE dictionary_id = 5 AND value = p_gender;
IF v_gender = 0 THEN
                RAISE_APPLICATION_ERROR(-20005, 'Invalid gender');
END IF;
ELSE
        v_gender := NULL;
END IF;

    -- if all is ok, create new profile
INSERT INTO PROFILES(id, name, destination, email, gender, staff_id, user_id, image, phone,address)
VALUES(increment_profile.NEXTVAL, p_name, p_desctination, p_email, p_gender, p_staff_id, p_user_id, p_image, p_phone, p_address);

--    END;
COMMIT;
END;
