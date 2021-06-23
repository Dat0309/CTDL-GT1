// [!output PROJECT_NAME].h: главный файл заголовка для DLL [!output PROJECT_NAME]
//

#pragma once

#ifndef __AFXWIN_H__
	#error "включить stdafx.h до включения этого файла в PCH"
#endif

#include "resource.h"		// основные символы


// [!output APP_CLASS]
// Про реализацию данного класса см. [!output PROJECT_NAME].cpp
//

class [!output APP_CLASS] : public [!output APP_BASE_CLASS]
{
public:
	[!output APP_CLASS]();

// Переопределение
public:
	virtual BOOL InitInstance();

	DECLARE_MESSAGE_MAP()
};
