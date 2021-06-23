/*
$DatabaseNameTemplateComment$
*/
ALTER DATABASE [$(DatabaseName)]
	ADD FILEGROUP [$rawname$] CONTAINS MEMORY_OPTIMIZED_DATA
