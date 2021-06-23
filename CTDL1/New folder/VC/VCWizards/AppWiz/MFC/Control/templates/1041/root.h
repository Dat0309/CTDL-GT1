#pragma once

// [!output PROJECT_NAME].h : [!output PROJECT_NAME].DLL のメイン ヘッダー ファイル

#if !defined( __AFXCTL_H__ )
#error "このファイルをインクルードする前に 'afxctl.h' をインクルードしてください。"
#endif

#include "resource.h"       // メイン シンボル


// [!output APP_CLASS] : 実装に関しては [!output PROJECT_NAME].cpp を参照してください。

class [!output APP_CLASS] : public COleControlModule
{
public:
	BOOL InitInstance();
	int ExitInstance();
};

extern const GUID CDECL _tlid;
extern const WORD _wVerMajor;
extern const WORD _wVerMinor;

