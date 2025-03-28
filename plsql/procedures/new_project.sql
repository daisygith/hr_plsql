create or replace PROCEDURE new_project(
    p_project IN VARCHAR2
) AS
    v_count_project NUMBER;
BEGIN
    -- check the project is exist
SELECT COUNT(*) INTO v_count_project FROM PROJECTS WHERE name = p_project;

-- if project exist, report an error
IF v_count_project > 0 THEN
        RAISE_APPLICATION_ERROR(-20001, 'Exist this project: '|| CHR(9) || p_project );
END IF;

    -- if all is ok, create new project
INSERT INTO PROJECTS(id, name)
VALUES(increment_project.NEXTVAL, p_project);

COMMIT;
END;
