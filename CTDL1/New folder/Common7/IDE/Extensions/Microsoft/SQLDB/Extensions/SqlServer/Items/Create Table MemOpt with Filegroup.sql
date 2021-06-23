/*
$DatabaseBucketCountComment$
*/

CREATE TABLE $SchemaQualifiedObjectName$
(
	[Id] INT NOT NULL PRIMARY KEY NONCLUSTERED HASH WITH (BUCKET_COUNT = 131072)
) WITH (MEMORY_OPTIMIZED = ON)

GO

/*
$DatabaseNameTemplateComment$
*/

ALTER DATABASE [$(DatabaseName)]
	ADD FILEGROUP [$rawname$_FG] CONTAINS MEMORY_OPTIMIZED_DATA