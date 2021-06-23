// [!output PROJECT_NAME].h : Hauptheaderdatei für die [!output PROJECT_NAME]-DLL
//

#pragma once

#ifndef __AFXWIN_H__
	#error "'stdafx.h' vor dieser Datei für PCH einschließen"
#endif

#include "resource.h"		// Hauptsymbole


// [!output APP_CLASS]
// Siehe [!output PROJECT_NAME].cpp für die Implementierung dieser Klasse
//

class [!output APP_CLASS] : public [!output APP_BASE_CLASS]
{
public:
	[!output APP_CLASS]();

// Überschreibungen
public:
	virtual BOOL InitInstance();

	DECLARE_MESSAGE_MAP()
};
