CREATE AGGREGATE $SchemaQualifiedObjectName$
	(@param1 nvarchar(4000))
	RETURNS nvarchar(4000)
	EXTERNAL NAME $SomeAssembly$.$SomeType$
