#pragma once

// [!output PROJECT_NAME].h : fichier d'en-tête principal pour [!output PROJECT_NAME].DLL

#if !defined( __AFXCTL_H__ )
#error "incluez 'afxctl.h' avant d'inclure ce fichier"
#endif

#include "resource.h"       // symboles principaux


// [!output APP_CLASS] : consultez [!output PROJECT_NAME].cpp pour l'implémentation.

class [!output APP_CLASS] : public COleControlModule
{
public:
	BOOL InitInstance();
	int ExitInstance();
};

extern const GUID CDECL _tlid;
extern const WORD _wVerMajor;
extern const WORD _wVerMinor;

