#pragma once

// [!output PROJECT_NAME].h : [!output PROJECT_NAME].DLL ���D�n���Y��

#if !defined( __AFXCTL_H__ )
#error "�b�]�t���ɮ׫e���]�t 'afxctl.h'"
#endif

#include "resource.h"       // �D�n�Ÿ�


// [!output APP_CLASS] : ������@�аѾ\ [!output PROJECT_NAME].cpp�C

class [!output APP_CLASS] : public COleControlModule
{
public:
	BOOL InitInstance();
	int ExitInstance();
};

extern const GUID CDECL _tlid;
extern const WORD _wVerMajor;
extern const WORD _wVerMinor;

