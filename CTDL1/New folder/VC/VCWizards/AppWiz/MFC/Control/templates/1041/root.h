#pragma once

// [!output PROJECT_NAME].h : [!output PROJECT_NAME].DLL �̃��C�� �w�b�_�[ �t�@�C��

#if !defined( __AFXCTL_H__ )
#error "���̃t�@�C�����C���N���[�h����O�� 'afxctl.h' ���C���N���[�h���Ă��������B"
#endif

#include "resource.h"       // ���C�� �V���{��


// [!output APP_CLASS] : �����Ɋւ��Ă� [!output PROJECT_NAME].cpp ���Q�Ƃ��Ă��������B

class [!output APP_CLASS] : public COleControlModule
{
public:
	BOOL InitInstance();
	int ExitInstance();
};

extern const GUID CDECL _tlid;
extern const WORD _wVerMajor;
extern const WORD _wVerMinor;

