create or replace PROCEDURE update_department(
    p_id NUMBER,
    p_name IN VARCHAR2
) AS
    v_id NUMBER;
BEGIN
SELECT id INTO v_id FROM DEPARTMENTS WHERE id = p_id;

IF v_id <> p_id THEN
        RAISE_APPLICATION_ERROR(-20003, 'The record with the specified ID does not exist.');

ELSE
        IF p_name IS NULL OR LENGTH(p_name) = 0 THEN
            RAISE_APPLICATION_ERROR(-20004, 'The name cannot be empty.');
END IF;

UPDATE DEPARTMENTS SET
    name = p_name
WHERE id = p_id;

END IF;
COMMIT;
END;
