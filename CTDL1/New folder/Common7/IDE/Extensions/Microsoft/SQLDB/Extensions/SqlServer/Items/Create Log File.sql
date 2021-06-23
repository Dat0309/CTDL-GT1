/*
$DatabaseNameTemplateComment$
*/
ALTER DATABASE [$(DatabaseName)]
ADD LOG FILE
(
	NAME = [$SqlFileFileName$_log],
	FILENAME = '$(DefaultLogPath)$(DefaultFilePrefix)_$SqlFileFileNameWithExtension$',
	SIZE = 1024 KB,
	FILEGROWTH = 10%
)
