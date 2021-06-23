#pragma once

// [!output PROJECT_NAME].h: главный файл заголовка для [!output PROJECT_NAME].DLL

#if !defined( __AFXCTL_H__ )
#error "включить afxctl.h до включения этого файла"
#endif

#include "resource.h"       // основные символы


// [!output APP_CLASS]: про реализацию см. [!output PROJECT_NAME].cpp.

class [!output APP_CLASS] : public COleControlModule
{
public:
	BOOL InitInstance();
	int ExitInstance();
};

extern const GUID CDECL _tlid;
extern const WORD _wVerMajor;
extern const WORD _wVerMinor;

