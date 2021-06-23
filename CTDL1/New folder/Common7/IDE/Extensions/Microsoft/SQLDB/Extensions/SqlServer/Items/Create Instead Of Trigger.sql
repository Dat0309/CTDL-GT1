CREATE TRIGGER [$ChildObjectName$]
ON [$SchemaName$].[$ParentObjectName$]
INSTEAD OF INSERT
AS
BEGIN
	SET NOCOUNT ON
END
