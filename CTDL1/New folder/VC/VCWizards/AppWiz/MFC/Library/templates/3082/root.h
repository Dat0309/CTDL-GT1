// [!output PROJECT_NAME].h: archivo de encabezado principal del archivo DLL de [!output PROJECT_NAME]
//

#pragma once

#ifndef __AFXWIN_H__
	#error "incluir 'stdafx.h' antes de incluir este archivo para PCH"
#endif

#include "resource.h"		// Símbolos principales


// [!output APP_CLASS]
// Consultar [!output PROJECT_NAME].cpp para realizar la implementación de esta clase
//

class [!output APP_CLASS] : public [!output APP_BASE_CLASS]
{
public:
	[!output APP_CLASS]();

// Reemplazos
public:
	virtual BOOL InitInstance();

	DECLARE_MESSAGE_MAP()
};
