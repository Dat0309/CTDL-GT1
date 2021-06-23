#pragma once

// [!output PROJECT_NAME].h: plik g³ównego nag³ówka dla biblioteki [!output PROJECT_NAME].DLL

#if !defined( __AFXCTL_H__ )
#error "do³¹cz nag³ówek 'afxctl.h' przed do³¹czeniem tego pliku"
#endif

#include "resource.h"       // g³ówne symbole


// [!output APP_CLASS]: Aby uzyskaæ implementacjê, zobacz [!output PROJECT_NAME].cpp.

class [!output APP_CLASS] : public COleControlModule
{
public:
	BOOL InitInstance();
	int ExitInstance();
};

extern const GUID CDECL _tlid;
extern const WORD _wVerMajor;
extern const WORD _wVerMinor;

