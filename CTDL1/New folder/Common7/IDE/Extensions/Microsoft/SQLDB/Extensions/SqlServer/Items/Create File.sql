/*
$DatabaseNameTemplateComment$
*/
ALTER DATABASE [$(DatabaseName)]
	ADD FILE
	(
		NAME = [$SqlFileFileName$],
		FILENAME = '$(DefaultDataPath)$(DefaultFilePrefix)_$SqlFileFileNameWithExtension$'
	)
	$ToFileGroupStatement$
