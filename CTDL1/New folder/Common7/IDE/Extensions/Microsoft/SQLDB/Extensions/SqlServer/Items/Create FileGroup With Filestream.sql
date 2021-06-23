/*
$DatabaseNameTemplateComment$
*/
ALTER DATABASE [$(DatabaseName)]
	ADD FILEGROUP [$rawname$] CONTAINS FILESTREAM
