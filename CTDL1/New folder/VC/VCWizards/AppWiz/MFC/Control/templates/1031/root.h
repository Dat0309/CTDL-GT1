#pragma once

// [!output PROJECT_NAME].h : Hauptheaderdatei f�r [!output PROJECT_NAME].DLL

#if !defined( __AFXCTL_H__ )
#error "'afxctl.h' vor dieser Datei einschlie�en"
#endif

#include "resource.h"       // Hauptsymbole


// [!output APP_CLASS] : Informationen zur Implementierung unter [!output PROJECT_NAME].cpp.

class [!output APP_CLASS] : public COleControlModule
{
public:
	BOOL InitInstance();
	int ExitInstance();
};

extern const GUID CDECL _tlid;
extern const WORD _wVerMajor;
extern const WORD _wVerMinor;

