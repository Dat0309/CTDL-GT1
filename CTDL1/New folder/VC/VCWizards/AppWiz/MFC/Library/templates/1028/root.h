// [!output PROJECT_NAME].h : [!output PROJECT_NAME] DLL 的主要標頭檔
//

#pragma once

#ifndef __AFXWIN_H__
	#error "對 PCH 包含此檔案前先包含 'stdafx.h'"
#endif

#include "resource.h"		// 主要符號


// [!output APP_CLASS]
// 這個類別的實作請參閱 [!output PROJECT_NAME].cpp
//

class [!output APP_CLASS] : public [!output APP_BASE_CLASS]
{
public:
	[!output APP_CLASS]();

// 覆寫
public:
	virtual BOOL InitInstance();

	DECLARE_MESSAGE_MAP()
};
