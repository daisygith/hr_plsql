create or replace PROCEDURE new_employee(
    p_name IN VARCHAR2,
    p_department IN VARCHAR2,
    p_department_id IN NUMBER,
    p_position IN VARCHAR2,
    p_staff_id IN NUMBER,
    p_type_of_contract IN VARCHAR2,
    p_image IN VARCHAR2,
    p_phone IN VARCHAR2,
    p_address IN VARCHAR2
) AS
    v_position NUMBER;
    v_department NUMBER;
    v_contract NUMBER;
BEGIN

    IF p_position IS NOT NULL THEN
SELECT COUNT(*) INTO v_position FROM DICTIONARY_VALUES WHERE dictionary_id = 1 AND value = p_position;
IF v_position = 0 THEN
                RAISE_APPLICATION_ERROR(-20009, 'Invalid position');
END IF;
ELSE
        v_position := NULL;
END IF;

    IF p_department IS NOT NULL THEN
SELECT COUNT(*) INTO v_department FROM DICTIONARY_VALUES WHERE dictionary_id = 2 AND value = p_department;
IF v_department = 0 THEN
                RAISE_APPLICATION_ERROR(-20009, 'Invalid department');
END IF;
ELSE
        v_department := NULL;
END IF;

    IF p_type_of_contract IS NOT NULL THEN
SELECT COUNT(*) INTO v_contract FROM DICTIONARY_VALUES WHERE dictionary_id = 3 AND value = p_type_of_contract;
IF v_contract = 0 THEN
            RAISE_APPLICATION_ERROR(-20009, 'Invalid type of contract');
END IF;
ELSE
        v_contract := NULL;
END IF;
    -- if all is ok, create new profile
INSERT INTO EMPLOYEES(name, department, department_id, position, staff_id, type_of_contract, image, phone, address)
VALUES(p_name, p_department, p_department_id, p_position, p_staff_id, p_type_of_contract, p_image, p_phone, p_address);

COMMIT;
END;
