// [!output PROJECT_NAME].cpp : [!output APP_CLASS] ����� DLL �o�^�̎���

#include "stdafx.h"
#include "[!output PROJECT_NAME].h"

#ifdef _DEBUG
#define new DEBUG_NEW
#endif


[!output APP_CLASS] theApp;

const GUID CDECL _tlid = [!output LIBID_STATIC_CONST_GUID_FORMAT];
const WORD _wVerMajor = 1;
const WORD _wVerMinor = 0;



// [!output APP_CLASS]::InitInstance - DLL ������

BOOL [!output APP_CLASS]::InitInstance()
{
	BOOL bInit = COleControlModule::InitInstance();

	if (bInit)
	{
		// TODO: ���̈ʒu�Ƀ��W���[���̏����������R�[�h��ǉ����Ă��������B
	}

	return bInit;
}



// [!output APP_CLASS]::ExitInstance - DLL �I��

int [!output APP_CLASS]::ExitInstance()
{
	// TODO: ���̈ʒu�Ƀ��W���[���̏I��������ǉ����Ă��������B

	return COleControlModule::ExitInstance();
}



// DllRegisterServer - �G���g�����V�X�e�� ���W�X�g���ɒǉ����܂��B

STDAPI DllRegisterServer(void)
{
	AFX_MANAGE_STATE(_afxModuleAddrThis);

	if (!AfxOleRegisterTypeLib(AfxGetInstanceHandle(), _tlid))
		return ResultFromScode(SELFREG_E_TYPELIB);

	if (!COleObjectFactoryEx::UpdateRegistryAll(TRUE))
		return ResultFromScode(SELFREG_E_CLASS);

	return NOERROR;
}



// DllUnregisterServer - �G���g�������W�X�g������폜���܂��B

STDAPI DllUnregisterServer(void)
{
	AFX_MANAGE_STATE(_afxModuleAddrThis);

	if (!AfxOleUnregisterTypeLib(_tlid, _wVerMajor, _wVerMinor))
		return ResultFromScode(SELFREG_E_TYPELIB);

	if (!COleObjectFactoryEx::UpdateRegistryAll(FALSE))
		return ResultFromScode(SELFREG_E_CLASS);

	return NOERROR;
}
