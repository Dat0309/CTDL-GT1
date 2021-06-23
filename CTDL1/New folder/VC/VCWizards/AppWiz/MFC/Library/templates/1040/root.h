// [!output PROJECT_NAME].h : file di intestazione principale per la DLL [!output PROJECT_NAME]
//

#pragma once

#ifndef __AFXWIN_H__
	#error "inclusione di 'stdafx.h' del file corrente per PCH"
#endif

#include "resource.h"		// simboli principali


// [!output APP_CLASS]
// Vedere [!output PROJECT_NAME].cpp per l'implementazione di questa classe
//

class [!output APP_CLASS] : public [!output APP_BASE_CLASS]
{
public:
	[!output APP_CLASS]();

// Override
public:
	virtual BOOL InitInstance();

	DECLARE_MESSAGE_MAP()
};
