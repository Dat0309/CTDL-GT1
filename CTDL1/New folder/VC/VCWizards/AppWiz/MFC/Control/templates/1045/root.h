#pragma once

// [!output PROJECT_NAME].h: plik g��wnego nag��wka dla biblioteki [!output PROJECT_NAME].DLL

#if !defined( __AFXCTL_H__ )
#error "do��cz nag��wek 'afxctl.h' przed do��czeniem tego pliku"
#endif

#include "resource.h"       // g��wne symbole


// [!output APP_CLASS]: Aby uzyska� implementacj�, zobacz [!output PROJECT_NAME].cpp.

class [!output APP_CLASS] : public COleControlModule
{
public:
	BOOL InitInstance();
	int ExitInstance();
};

extern const GUID CDECL _tlid;
extern const WORD _wVerMajor;
extern const WORD _wVerMinor;

