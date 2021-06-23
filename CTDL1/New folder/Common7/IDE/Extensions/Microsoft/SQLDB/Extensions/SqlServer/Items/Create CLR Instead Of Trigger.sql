CREATE TRIGGER [$ChildObjectName$]
ON [$SchemaName$].[$ParentObjectName$]
INSTEAD OF INSERT
AS EXTERNAL NAME $SomeAssembly$.$SomeType$.$SomeMethod$ 
