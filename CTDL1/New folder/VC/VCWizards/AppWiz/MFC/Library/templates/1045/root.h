// [!output PROJECT_NAME].h: plik g��wnego nag��wka dla biblioteki DLL [!output PROJECT_NAME]
//

#pragma once

#ifndef __AFXWIN_H__
	#error "do��cz nag��wek 'stdafx.h' przed do��czeniem tego pliku dla PCH"
#endif

#include "resource.h"		// g��wne symbole


// [!output APP_CLASS]
// Aby uzyska� implementacj� klasy, zobacz [!output PROJECT_NAME].cpp
//

class [!output APP_CLASS] : public [!output APP_BASE_CLASS]
{
public:
	[!output APP_CLASS]();

// Zast�puje
public:
	virtual BOOL InitInstance();

	DECLARE_MESSAGE_MAP()
};
