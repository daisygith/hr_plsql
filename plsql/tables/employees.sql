CREATE TABLE "HR_APP"."EMPLOYEES"
(	"ID" NUMBER DEFAULT "HR_APP"."INCREMENT_EMPLOYEE"."NEXTVAL",
     "NAME" VARCHAR2(50 BYTE),
     "DEPARTMENT" VARCHAR2(20 BYTE),
     "DEPARTMENT_ID" NUMBER,
     "POSITION" VARCHAR2(20 BYTE),
     "STAFF_ID" NUMBER,
     "TYPE_OF_CONTRACT" VARCHAR2(40 BYTE),
     "IMAGE" VARCHAR2(255 BYTE),
     "PHONE" VARCHAR2(9 BYTE),
     "ADDRESS" VARCHAR2(250 BYTE)
) SEGMENT CREATION IMMEDIATE
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255
 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;