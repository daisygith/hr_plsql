create or replace PROCEDURE update_request_time_off(
    p_id IN NUMBER,
    p_leave_type IN VARCHAR2,
    p_reason IN VARCHAR2,
    p_start_date IN DATE,
    p_end_date IN DATE,
    p_status IN VARCHAR2,
    p_employee_id IN NUMBER
) AS
    v_id NUMBER;
    v_status VARCHAR2(50);
    v_status_count NUMBER;
    v_employee_id NUMBER;
    v_leave_type NUMBER;
    v_now DATE := SYSDATE;
BEGIN
    IF p_reason IS NULL OR LENGTH(p_reason) = 0 THEN
        RAISE_APPLICATION_ERROR(-20004, 'Reason cannot be empty');
END IF;

    IF p_status IS NOT NULL THEN
SELECT COUNT(*) INTO v_status_count FROM DICTIONARY_VALUES WHERE dictionary_id = 9 AND value = p_status;
IF v_status_count = 0 THEN
            RAISE_APPLICATION_ERROR(-20009, 'Invalid status');
END IF;
        v_status := p_status;
ELSE
        v_status := 'DRAFT';
END IF;

    IF (p_start_date < v_now OR p_end_date < v_now) AND p_end_date > p_start_date THEN
        RAISE_APPLICATION_ERROR(-20008, 'The end date cannot be in the past');
END IF;

    IF p_leave_type IS NOT NULL THEN
SELECT COUNT(*) INTO v_leave_type FROM DICTIONARY_VALUES WHERE dictionary_id = 4 AND value = p_leave_type;
IF v_leave_type = 0 THEN
            RAISE_APPLICATION_ERROR(-20009, 'Invalid type of leave');
END IF;
ELSE
        RAISE_APPLICATION_ERROR(-20004, 'Type of leave cannot be empty');
END IF;

SELECT COUNT(*) INTO v_employee_id FROM employees WHERE id = p_employee_id;
IF v_employee_id = 0 THEN
        RAISE_APPLICATION_ERROR(-20003, 'The record with the specified ID does not exist.');
END IF;

UPDATE requests_time_off SET
                             leave_type = p_leave_type,
                             reason = p_reason,
                             start_date = p_start_date,
                             end_date = p_end_date,
                             status = v_status,
                             employee_id = p_employee_id
WHERE id = p_id;

COMMIT;
END;
