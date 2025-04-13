CREATE OR REPLACE PROCEDURE update_status_request_time_off(
    p_id IN NUMBER,
    p_status IN VARCHAR2
)
AS
    v_id NUMBER;
    v_status VARCHAR2(50);
    v_status_count NUMBER;
BEGIN
SELECT COUNT(*) INTO v_id FROM requests_time_off WHERE id = p_id;
IF v_id = 0 THEN
        RAISE_APPLICATION_ERROR(-20003, 'The record with the specified ID does not exist.');
END IF;

    IF p_status IS NOT NULL THEN
SELECT COUNT(*) INTO v_status_count FROM DICTIONARY_VALUES WHERE dictionary_id = 9 AND value = p_status;
IF v_status_count = 0 THEN
            RAISE_APPLICATION_ERROR(-20009, 'Invalid status');
END IF;
END IF;

UPDATE requests_time_off SET
    status = p_status
WHERE id = p_id;
commit;
END;
/