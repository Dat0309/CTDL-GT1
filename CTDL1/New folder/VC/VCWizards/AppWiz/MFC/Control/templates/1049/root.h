#pragma once

// [!output PROJECT_NAME].h: ������� ���� ��������� ��� [!output PROJECT_NAME].DLL

#if !defined( __AFXCTL_H__ )
#error "�������� afxctl.h �� ��������� ����� �����"
#endif

#include "resource.h"       // �������� �������


// [!output APP_CLASS]: ��� ���������� ��. [!output PROJECT_NAME].cpp.

class [!output APP_CLASS] : public COleControlModule
{
public:
	BOOL InitInstance();
	int ExitInstance();
};

extern const GUID CDECL _tlid;
extern const WORD _wVerMajor;
extern const WORD _wVerMinor;

