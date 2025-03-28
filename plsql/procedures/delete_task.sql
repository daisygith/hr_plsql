create or replace PROCEDURE delete_task(
    p_id IN NUMBER
) AS
    v_id NUMBER;
BEGIN
SELECT COUNT(*) INTO v_id FROM TASKS WHERE id = p_id;

IF v_id = 0 THEN
        RAISE_APPLICATION_ERROR(-20003, 'The record with the specified ID does not exist.');

ELSE
DELETE FROM TASKS
WHERE id = p_id;

END IF;
COMMIT;
END;