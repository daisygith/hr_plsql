create or replace PROCEDURE delete_request_time_off(
    p_id IN NUMBER
) AS
    v_id NUMBER;
BEGIN
SELECT COUNT(*) INTO v_id FROM requests_time_off WHERE id = p_id;

IF v_id = 0 THEN
        RAISE_APPLICATION_ERROR(-20003, 'The record with the specified ID does not exist.');
ELSE
DELETE FROM requests_time_off
WHERE id = p_id;
END IF;

COMMIT;
END;
