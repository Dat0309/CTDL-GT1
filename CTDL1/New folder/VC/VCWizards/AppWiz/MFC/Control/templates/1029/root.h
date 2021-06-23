#pragma once

// [!output PROJECT_NAME].h : main header file for [!output PROJECT_NAME].DLL

#if !defined( __AFXCTL_H__ )
#error "include 'afxctl.h' before including this file"
#endif

#include "resource.h"       // main symbols


// [!output APP_CLASS] : See [!output PROJECT_NAME].cpp for implementation.

class [!output APP_CLASS] : public COleControlModule
{
public:
	BOOL InitInstance();
	int ExitInstance();
};

extern const GUID CDECL _tlid;
extern const WORD _wVerMajor;
extern const WORD _wVerMinor;

