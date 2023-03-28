--------------------------------------------------------
--  파일이 생성됨 - 화요일-3월-28-2023   
--------------------------------------------------------
--------------------------------------------------------
--  DDL for Table USERTBL
--------------------------------------------------------

  CREATE TABLE "HR"."USERTBL" 
   (	"USERID" CHAR(8 BYTE), 
	"USERNAME" NVARCHAR2(10), 
	"BIRTHYEAR" NUMBER(4,0), 
	"ADDR" NCHAR(2), 
	"MOBILE1" CHAR(3 BYTE), 
	"MOBILE2" CHAR(8 BYTE), 
	"HEIGHT" NUMBER(3,0), 
	"MDATE" DATE
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
REM INSERTING into HR.USERTBL
SET DEFINE OFF;
Insert into HR.USERTBL (USERID,USERNAME,BIRTHYEAR,ADDR,MOBILE1,MOBILE2,HEIGHT,MDATE) values ('LSG     ','이승기',1987,'서울','011','11111111',182,to_date('08/08/08','RR/MM/DD'));
Insert into HR.USERTBL (USERID,USERNAME,BIRTHYEAR,ADDR,MOBILE1,MOBILE2,HEIGHT,MDATE) values ('KBS     ','김범수',1979,'경남','011','22222222',173,to_date('12/04/04','RR/MM/DD'));
Insert into HR.USERTBL (USERID,USERNAME,BIRTHYEAR,ADDR,MOBILE1,MOBILE2,HEIGHT,MDATE) values ('KKH     ','김경호',1971,'전남','019','33333333',177,to_date('07/07/07','RR/MM/DD'));
Insert into HR.USERTBL (USERID,USERNAME,BIRTHYEAR,ADDR,MOBILE1,MOBILE2,HEIGHT,MDATE) values ('JYP     ','조용필',1950,'경기','011','44444444',166,to_date('09/04/04','RR/MM/DD'));
Insert into HR.USERTBL (USERID,USERNAME,BIRTHYEAR,ADDR,MOBILE1,MOBILE2,HEIGHT,MDATE) values ('SSK     ','성시경',1979,'서울',null,null,186,to_date('13/12/12','RR/MM/DD'));
Insert into HR.USERTBL (USERID,USERNAME,BIRTHYEAR,ADDR,MOBILE1,MOBILE2,HEIGHT,MDATE) values ('LJB     ','임재범',1963,'서울','016','66666666',182,to_date('09/09/09','RR/MM/DD'));
Insert into HR.USERTBL (USERID,USERNAME,BIRTHYEAR,ADDR,MOBILE1,MOBILE2,HEIGHT,MDATE) values ('YJS     ','윤종신',1969,'경남',null,null,170,to_date('05/05/05','RR/MM/DD'));
Insert into HR.USERTBL (USERID,USERNAME,BIRTHYEAR,ADDR,MOBILE1,MOBILE2,HEIGHT,MDATE) values ('EJW     ','은지원',1972,'경북','011','88888888',174,to_date('14/03/03','RR/MM/DD'));
Insert into HR.USERTBL (USERID,USERNAME,BIRTHYEAR,ADDR,MOBILE1,MOBILE2,HEIGHT,MDATE) values ('JKW     ','조관우',1965,'경기','018','99999999',172,to_date('10/10/10','RR/MM/DD'));
Insert into HR.USERTBL (USERID,USERNAME,BIRTHYEAR,ADDR,MOBILE1,MOBILE2,HEIGHT,MDATE) values ('BBK     ','바비킴',1973,'서울','010','00000000',176,to_date('13/05/05','RR/MM/DD'));
--------------------------------------------------------
--  DDL for Index SYS_C007030
--------------------------------------------------------

  CREATE UNIQUE INDEX "HR"."SYS_C007030" ON "HR"."USERTBL" ("USERID") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
--------------------------------------------------------
--  Constraints for Table USERTBL
--------------------------------------------------------

  ALTER TABLE "HR"."USERTBL" ADD PRIMARY KEY ("USERID")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS"  ENABLE;
  ALTER TABLE "HR"."USERTBL" MODIFY ("ADDR" NOT NULL ENABLE);
  ALTER TABLE "HR"."USERTBL" MODIFY ("BIRTHYEAR" NOT NULL ENABLE);
  ALTER TABLE "HR"."USERTBL" MODIFY ("USERNAME" NOT NULL ENABLE);
  ALTER TABLE "HR"."USERTBL" MODIFY ("USERID" NOT NULL ENABLE);
