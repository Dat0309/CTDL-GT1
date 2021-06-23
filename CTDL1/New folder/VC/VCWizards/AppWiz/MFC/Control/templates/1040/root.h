#pragma once

// [!output PROJECT_NAME].h : file di intestazione principale per [!output PROJECT_NAME].DLL

#if !defined( __AFXCTL_H__ )
#error "inclusione di 'afxctl.h' prima dell'inclusione del file corrente"
#endif

#include "resource.h"       // simboli principali


// [!output APP_CLASS] : vedere [!output PROJECT_NAME].cpp per l'implementazione.

class [!output APP_CLASS] : public COleControlModule
{
public:
	BOOL InitInstance();
	int ExitInstance();
};

extern const GUID CDECL _tlid;
extern const WORD _wVerMajor;
extern const WORD _wVerMinor;

