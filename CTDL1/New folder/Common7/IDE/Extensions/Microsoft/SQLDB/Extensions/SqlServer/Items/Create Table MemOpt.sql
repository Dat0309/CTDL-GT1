/*
$DatabaseMustHaveMemOptFilegroupComment$

$DatabaseBucketCountComment$
*/

CREATE TABLE $SchemaQualifiedObjectName$
(
	[Id] INT NOT NULL PRIMARY KEY NONCLUSTERED HASH WITH (BUCKET_COUNT = 131072)
) WITH (MEMORY_OPTIMIZED = ON)