//{{NO_DEPENDENCIES}}
// Microsoft Visual C++ generated include file.
// Used by [!output RC_FILE_NAME]
//

[!if SERVICE_APP]
#define IDS_SERVICENAME					100
[!else]
#define IDS_PROJNAME                    100
[!endif]
#define IDR_[!output UPPER_CASE_SAFE_PROJECT_IDENTIFIER_NAME]	101
[!if PREVIEW_HANDLER]
#define IDR_PREVIEW_HANDLER             103
[!endif]
[!if THUMBNAIL_HANDLER]
#define IDR_THUMBNAIL_HANDLER           104
[!endif]
[!if SEARCH_HANDLER]
#define IDR_FILTER_HANDLER              105
[!endif]

// Next default values for new objects
//
#ifdef APSTUDIO_INVOKED
#ifndef APSTUDIO_READONLY_SYMBOLS
#define _APS_NEXT_RESOURCE_VALUE        201
#define _APS_NEXT_COMMAND_VALUE         32768
#define _APS_NEXT_CONTROL_VALUE         201
#define _APS_NEXT_SYMED_VALUE           106
#endif
#endif
