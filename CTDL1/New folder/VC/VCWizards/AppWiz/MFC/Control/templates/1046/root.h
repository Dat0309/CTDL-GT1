#pragma once

// [!output PROJECT_NAME].h : arquivo de cabe�alho principal para [!output PROJECT_NAME].DLL

#if !defined( __AFXCTL_H__ )
#error "inclua 'afxctl.h' antes de incluir este arquivo"
#endif

#include "resource.h"       // s�mbolos principais


// [!output APP_CLASS] : Olhe [!output PROJECT_NAME].cpp para implementa��o.

class [!output APP_CLASS] : public COleControlModule
{
public:
	BOOL InitInstance();
	int ExitInstance();
};

extern const GUID CDECL _tlid;
extern const WORD _wVerMajor;
extern const WORD _wVerMinor;

