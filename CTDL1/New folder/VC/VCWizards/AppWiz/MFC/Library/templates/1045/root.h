// [!output PROJECT_NAME].h: plik g³ównego nag³ówka dla biblioteki DLL [!output PROJECT_NAME]
//

#pragma once

#ifndef __AFXWIN_H__
	#error "do³¹cz nag³ówek 'stdafx.h' przed do³¹czeniem tego pliku dla PCH"
#endif

#include "resource.h"		// g³ówne symbole


// [!output APP_CLASS]
// Aby uzyskaæ implementacjê klasy, zobacz [!output PROJECT_NAME].cpp
//

class [!output APP_CLASS] : public [!output APP_BASE_CLASS]
{
public:
	[!output APP_CLASS]();

// Zastêpuje
public:
	virtual BOOL InitInstance();

	DECLARE_MESSAGE_MAP()
};
