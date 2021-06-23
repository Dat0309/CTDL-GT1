// [!output IMPL_FILE] : Implementation of [!output CLASS_NAME]
#include "stdafx.h"
#include "[!output HEADER_FILE]"

[!if !HTML_CONTROL && !COMPOSITE_CONTROL]
[!if USE_COMMON_CONTROLS || USE_COMMON_CONTROLS_EX]
#ifndef _WIN32_WCE
#pragma comment(lib, "comctl32.lib")
#else
#pragma comment(lib, "commctrl.lib")
#endif
[!endif]
[!endif]

// [!output CLASS_NAME]
