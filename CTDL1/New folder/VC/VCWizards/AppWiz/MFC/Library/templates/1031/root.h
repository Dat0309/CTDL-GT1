// [!output PROJECT_NAME].h : Hauptheaderdatei f�r die [!output PROJECT_NAME]-DLL
//

#pragma once

#ifndef __AFXWIN_H__
	#error "'stdafx.h' vor dieser Datei f�r PCH einschlie�en"
#endif

#include "resource.h"		// Hauptsymbole


// [!output APP_CLASS]
// Siehe [!output PROJECT_NAME].cpp f�r die Implementierung dieser Klasse
//

class [!output APP_CLASS] : public [!output APP_BASE_CLASS]
{
public:
	[!output APP_CLASS]();

// �berschreibungen
public:
	virtual BOOL InitInstance();

	DECLARE_MESSAGE_MAP()
};
