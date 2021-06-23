#pragma once

// [!output PROJECT_NAME].h : arquivo de cabeçalho principal para [!output PROJECT_NAME].DLL

#if !defined( __AFXCTL_H__ )
#error "inclua 'afxctl.h' antes de incluir este arquivo"
#endif

#include "resource.h"       // símbolos principais


// [!output APP_CLASS] : Olhe [!output PROJECT_NAME].cpp para implementação.

class [!output APP_CLASS] : public COleControlModule
{
public:
	BOOL InitInstance();
	int ExitInstance();
};

extern const GUID CDECL _tlid;
extern const WORD _wVerMajor;
extern const WORD _wVerMinor;

