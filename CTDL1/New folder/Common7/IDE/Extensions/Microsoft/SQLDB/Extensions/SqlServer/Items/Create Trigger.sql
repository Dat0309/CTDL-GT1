CREATE TRIGGER [$ChildObjectName$]
	ON [$SchemaName$].[$ParentObjectName$]
	FOR DELETE, INSERT, UPDATE
	AS
	BEGIN
		SET NOCOUNT ON
	END
