#pragma once

// [!output PROJECT_NAME].h: archivo de encabezado principal de [!output PROJECT_NAME].DLL

#if !defined( __AFXCTL_H__ )
#error "incluir 'afxctl.h' antes de incluir este archivo"
#endif

#include "resource.h"       // Símbolos principales


// [!output APP_CLASS]: consultar [!output PROJECT_NAME].cpp para realizar la implementación.

class [!output APP_CLASS] : public COleControlModule
{
public:
	BOOL InitInstance();
	int ExitInstance();
};

extern const GUID CDECL _tlid;
extern const WORD _wVerMajor;
extern const WORD _wVerMinor;

