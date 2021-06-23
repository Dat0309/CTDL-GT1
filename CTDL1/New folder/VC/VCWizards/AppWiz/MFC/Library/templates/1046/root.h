// [!output PROJECT_NAME].h : arquivo de cabeçalho principal para a DLL [!output PROJECT_NAME]
//

#pragma once

#ifndef __AFXWIN_H__
	#error "inclua 'stdafx.h' antes de incluir este arquivo para PCH"
#endif

#include "resource.h"		// símbolos principais


// [!output APP_CLASS]
// Consulte [!output PROJECT_NAME].cpp para a implementação desta classe
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
