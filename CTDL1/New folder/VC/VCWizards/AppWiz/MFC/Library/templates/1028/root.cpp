// [!output PROJECT_NAME].cpp : �w�q DLL ����l�Ʊ`���C
//

#include "stdafx.h"
[!if !DLL_TYPE_EXTENSION]
#include "[!output PROJECT_NAME].h"
[!endif]

#ifdef _DEBUG
#define new DEBUG_NEW
#endif

[!if DLL_TYPE_REGULAR || DLL_TYPE_REGULAR_STATIC]
//
//TODO:  �p�G�o�� DLL �O�ʺA�a�� MFC DLL �s���A
//		����q�o�� DLL �ץX������|�I�s
//		MFC �������禡�A�������b�禡�@�}�Y�[�W AFX_MANAGE_STATE
//		�����C
//
//		�Ҧp: 
//
//		extern "C" BOOL PASCAL EXPORT ExportedFunction()
//		{
//			AFX_MANAGE_STATE(AfxGetStaticModuleState());
//			// ���B�����`�禡�D��
//		}
//
//		�o�ӥ����@�w�n�X�{�b�C�@��
//		�禡���A�~����I�s MFC �������C�o�N����
//		�������O�禡�����Ĥ@�ӳ��z��
//		�A�Ʀܥ����b���󪫥��ܼƫŧi�e��
//		�A�]�����̪��غc�禡�i��|���͹� MFC
//		DLL �������I�s�C
//
//		�аѾ\ MFC �޳N���� 33 �M 58 ����
//		�ԲӸ�ơC
//
[!endif]

[!if !DLL_TYPE_EXTENSION]
// [!output APP_CLASS]

BEGIN_MESSAGE_MAP([!output APP_CLASS], [!output APP_BASE_CLASS])
END_MESSAGE_MAP()


// [!output APP_CLASS] �غc

[!output APP_CLASS]::[!output APP_CLASS]()
{
	// TODO:  �b���[�J�غc�{���X�A
	// �N�Ҧ����n����l�]�w�[�J InitInstance ��
}


// �Ȧ����@�� [!output APP_CLASS] ����

[!output APP_CLASS] theApp;

[!if AUTOMATION]
const GUID CDECL _tlid = [!output LIBID_STATIC_CONST_GUID_FORMAT];
const WORD _wVerMajor = 1;
const WORD _wVerMinor = 0;

[!endif]

// [!output APP_CLASS] ��l�]�w

BOOL [!output APP_CLASS]::InitInstance()
{
	[!output APP_BASE_CLASS]::InitInstance();
[!if SOCKETS]

	if (!AfxSocketInit())
	{
		AfxMessageBox(IDP_SOCKETS_INIT_FAILED);
		return FALSE;
	}
[!endif]
[!if AUTOMATION]

	// �N�Ҧ� OLE ���A�� (Factory) �n�������椤�C�o�˥i�H��
	//  OLE �{���w�q��L�����ε{���إߪ���C
	COleObjectFactory::RegisterAll();
[!endif]

	return TRUE;
}
[!if AUTOMATION]

// DllGetClassObject - �Ǧ^ Class Factory

STDAPI DllGetClassObject(REFCLSID rclsid, REFIID riid, LPVOID* ppv)
{
	AFX_MANAGE_STATE(AfxGetStaticModuleState());
	return AfxDllGetClassObject(rclsid, riid, ppv);
}


// DllCanUnloadNow - ���\ COM ���� DLL

STDAPI DllCanUnloadNow(void)
{
	AFX_MANAGE_STATE(AfxGetStaticModuleState());
	return AfxDllCanUnloadNow();
}


// DllRegisterServer - �N���إ[�J��t�εn��

STDAPI DllRegisterServer(void)
{
	AFX_MANAGE_STATE(AfxGetStaticModuleState());

	if (!AfxOleRegisterTypeLib(AfxGetInstanceHandle(), _tlid))
		return SELFREG_E_TYPELIB;

	if (!COleObjectFactory::UpdateRegistryAll())
		return SELFREG_E_CLASS;

	return S_OK;
}


// DllUnregisterServer - �q�t�εn����������

STDAPI DllUnregisterServer(void)
{
	AFX_MANAGE_STATE(AfxGetStaticModuleState());

	if (!AfxOleUnregisterTypeLib(_tlid, _wVerMajor, _wVerMinor))
		return SELFREG_E_TYPELIB;

	if (!COleObjectFactory::UpdateRegistryAll(FALSE))
		return SELFREG_E_CLASS;

	return S_OK;
}
[!endif]
[!endif]
