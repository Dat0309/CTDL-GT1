CREATE TRIGGER [$ChildObjectName$]
ON [$SchemaName$].[$ParentObjectName$]
FOR DELETE, INSERT, UPDATE
AS EXTERNAL NAME $SomeAssembly$.$SomeType$.$SomeMethod$
