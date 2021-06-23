// [!output PROJECT_NAME].h : main header file for the [!output PROJECT_NAME] DLL
//

#pragma once

#ifndef __AFXWIN_H__
	#error "include 'stdafx.h' before including this file for PCH"
#endif

#include "resource.h"		// main symbols


// [!output APP_CLASS]
// See [!output PROJECT_NAME].cpp for the implementation of this class
//

class [!output APP_CLASS] : public [!output APP_BASE_CLASS]
{
public:
	[!output APP_CLASS]();

// Overrides
public:
	virtual BOOL InitInstance();

	DECLARE_MESSAGE_MAP()
};
