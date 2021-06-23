CREATE DATABASE AUDIT SPECIFICATION [$rawname$]
	FOR SERVER AUDIT [$SomeServerAudit$]
	ADD (SELECT, INSERT
		ON [$SomeSecurable$]
		BY dbo)
	WITH (State = ON)
