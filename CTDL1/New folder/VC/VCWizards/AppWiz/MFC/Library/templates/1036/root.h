// [!output PROJECT_NAME].h : fichier d'en-tête principal pour la DLL [!output PROJECT_NAME]
//

#pragma once

#ifndef __AFXWIN_H__
	#error "incluez 'stdafx.h' avant d'inclure ce fichier pour PCH"
#endif

#include "resource.h"		// symboles principaux


// [!output APP_CLASS]
// Consultez [!output PROJECT_NAME].cpp pour l'implémentation de cette classe
//

class [!output APP_CLASS] : public [!output APP_BASE_CLASS]
{
public:
	[!output APP_CLASS]();

// Substitutions
public:
	virtual BOOL InitInstance();

	DECLARE_MESSAGE_MAP()
};
