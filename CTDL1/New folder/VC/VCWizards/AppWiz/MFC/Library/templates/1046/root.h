// [!output PROJECT_NAME].h : arquivo de cabe�alho principal para a DLL [!output PROJECT_NAME]
//

#pragma once

#ifndef __AFXWIN_H__
	#error "inclua 'stdafx.h' antes de incluir este arquivo para PCH"
#endif

#include "resource.h"		// s�mbolos principais


// [!output APP_CLASS]
// Consulte [!output PROJECT_NAME].cpp para a implementa��o desta classe
//

class [!output APP_CLASS] : public [!output APP_BASE_CLASS]
{
public:
	[!output APP_CLASS]();

// Substitui
public:
	virtual BOOL InitInstance();

	DECLARE_MESSAGE_MAP()
};
