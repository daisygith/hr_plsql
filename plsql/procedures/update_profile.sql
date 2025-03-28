create or replace PROCEDURE update_profile(
    p_id NUMBER,
    p_name IN VARCHAR2,
    p_destination IN VARCHAR2,
    p_email IN VARCHAR2,
    p_gender IN VARCHAR2,
    p_staff_id IN NUMBER,
    p_user_id IN NUMBER,
    p_image IN VARCHAR2,
    p_phone IN VARCHAR2,
    p_address IN VARCHAR2
) AS
    v_id NUMBER;
    v_gender NUMBER;
BEGIN
SELECT id INTO v_id FROM PROFILES WHERE id = p_id;

IF v_id <> p_id THEN
        RAISE_APPLICATION_ERROR(-20003, 'The record with the specified ID does not exist.');
END IF;
    IF p_name IS NULL OR LENGTH(p_name) = 0 THEN
        RAISE_APPLICATION_ERROR(-20004, 'The name cannot be empty.');
END IF;
        IF p_gender IS NOT NULL THEN
SELECT COUNT(*) INTO v_gender FROM DICTIONARY_VALUES WHERE dictionary_id = 5 AND value = p_gender;
IF v_gender = 0 THEN
                RAISE_APPLICATION_ERROR(-20005, 'Invalid gender');
END IF;
ELSE
        v_gender := NULL;
END IF;

UPDATE PROFILES SET
                    name = p_name,
                    destination = p_destination,
                    email = p_email,
                    gender = p_gender,
                    staff_id = p_staff_id,
                    user_id = p_user_id,
                    image = p_image,
                    phone = p_phone,
                    address = p_address
WHERE id = p_id;


COMMIT;
END;
