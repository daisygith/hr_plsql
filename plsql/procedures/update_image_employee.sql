CREATE OR REPLACE PROCEDURE update_image_employee(
    p_id IN NUMBER,
    p_image IN VARCHAR2
) AS
    v_id NUMBER;
BEGIN
SELECT id INTO v_id FROM EMPLOYEES WHERE id = p_id;
IF v_id <> p_id THEN
        RAISE_APPLICATION_ERROR(-20003, 'The record with the specified ID does not exist.');
END IF;

UPDATE employees SET
    image = p_image
WHERE id = p_id;

COMMIT;
END;
/
