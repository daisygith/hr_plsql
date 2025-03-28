create or replace PROCEDURE delete_project(
    p_id NUMBER
)AS
    v_id NUMBER;
BEGIN
SELECT id INTO v_id FROM PROJECTS WHERE id = p_id;

IF v_id <> p_id THEN
        RAISE_APPLICATION_ERROR(-20003, 'The record with the specified ID does not exist.');

ELSE
DELETE FROM PROJECTS
WHERE id = p_id;
END IF;
COMMIT;
END;
