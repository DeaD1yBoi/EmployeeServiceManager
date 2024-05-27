INSERT INTO departments (id, dep_title) VALUES (1, 'Human Resources');
INSERT INTO departments (id, dep_title) VALUES (2, 'Finance');
INSERT INTO departments (id, dep_title) VALUES (3, 'IT');
INSERT INTO departments (id, dep_title) VALUES (4, 'Marketing');
INSERT INTO departments (id, dep_title) VALUES (5, 'Sales');
INSERT INTO positions (id, pos_title) VALUES (1, 'Manager');
INSERT INTO positions (id, pos_title) VALUES (2, 'Analyst');
INSERT INTO positions (id, pos_title) VALUES (3, 'Developer');
INSERT INTO positions (id, pos_title) VALUES (4, 'Accountant');
INSERT INTO positions (id, pos_title) VALUES (5, 'Sales Representative');
INSERT INTO ROLES(ID, ROLE_DESC, ROLE_NAME, ACC_TO_SERVICE, owner) VALUES (1, 'EMPLOYEE','EMPLOYEE', '', 0);
INSERT INTO ROLES(ID, ROLE_DESC, ROLE_NAME, ACC_TO_SERVICE, owner) VALUES (2, 'ADMIN','ADMIN', '', 1);
INSERT INTO STATUS(ID, NOTE, STATUS) VALUES (1, 'Just created. Waiting for owner to respond', 'Waiting for owner response');
INSERT INTO STATUS(ID, NOTE, STATUS) VALUES (2, 'Owner declined request', 'Owner declined');
INSERT INTO STATUS(ID, NOTE, STATUS) VALUES (3, 'Owner accepted request. Waiting for admin to respond', 'Waiting for admin response');
INSERT INTO STATUS(ID, NOTE, STATUS) VALUES (4, 'Admin declined request', 'Admin declined');
INSERT INTO STATUS(ID, NOTE, STATUS) VALUES (5, 'Admin accepted. Access GRANTED!', 'Access granted');
INSERT INTO STATUS(ID, NOTE, STATUS) VALUES (6, 'User canceled request', 'Canceled');
INSERT INTO EMPLOYEES(ID, FULL_NAME, DEP_ID, POS_ID) VALUES (1, 'Yehor Kulish', 5, 5);
INSERT INTO USERS_ROLES(USERS_ID, ROLES_ID) VALUES (25, 2);

CREATE OR REPLACE TRIGGER USER_ROLE_GRANTED_TRIGGER
AFTER UPDATE ON ESM.USER_ROLE_REQUESTS
FOR EACH ROW
WHEN (NEW.STATUS_ID = 5)
BEGIN
    INSERT INTO ESM.USERS_ROLES (USERS_ID, ROLES_ID)
    VALUES (:NEW.USER_ROLE_REQUESTED_BY, :NEW.REQUESTED_ROLE);
END;
/

