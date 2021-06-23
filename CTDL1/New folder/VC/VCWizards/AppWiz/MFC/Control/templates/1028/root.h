#pragma once

// [!output PROJECT_NAME].h : [!output PROJECT_NAME].DLL 的主要標頭檔

#if !defined( __AFXCTL_H__ )
#error "在包含此檔案前先包含 'afxctl.h'"
#endif

#include "resource.h"       // 主要符號


// [!output APP_CLASS] : 相關實作請參閱 [!output PROJECT_NAME].cpp。

class [!output APP_CLASS] : public COleControlModule
{
public:
	BOOL InitInstance();
	int ExitInstance();
};

extern const GUID CDECL _tlid;
extern const WORD _wVerMajor;
extern const WORD _wVerMinor;

