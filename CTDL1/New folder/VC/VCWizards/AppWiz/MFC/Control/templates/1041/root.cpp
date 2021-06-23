// [!output PROJECT_NAME].cpp : [!output APP_CLASS] および DLL 登録の実装

#include "stdafx.h"
#include "[!output PROJECT_NAME].h"

#ifdef _DEBUG
#define new DEBUG_NEW
#endif


[!output APP_CLASS] theApp;

const GUID CDECL _tlid = [!output LIBID_STATIC_CONST_GUID_FORMAT];
const WORD _wVerMajor = 1;
const WORD _wVerMinor = 0;



// [!output APP_CLASS]::InitInstance - DLL 初期化

BOOL [!output APP_CLASS]::InitInstance()
{
	BOOL bInit = COleControlModule::InitInstance();

	if (bInit)
	{
		// TODO: この位置にモジュールの初期化処理コードを追加してください。
	}

	return bInit;
}



// [!output APP_CLASS]::ExitInstance - DLL 終了

int [!output APP_CLASS]::ExitInstance()
{
	// TODO: この位置にモジュールの終了処理を追加してください。

	return COleControlModule::ExitInstance();
}



// DllRegisterServer - エントリをシステム レジストリに追加します。

STDAPI DllRegisterServer(void)
{
	AFX_MANAGE_STATE(_afxModuleAddrThis);

	if (!AfxOleRegisterTypeLib(AfxGetInstanceHandle(), _tlid))
		return ResultFromScode(SELFREG_E_TYPELIB);

	if (!COleObjectFactoryEx::UpdateRegistryAll(TRUE))
		return ResultFromScode(SELFREG_E_CLASS);

	return NOERROR;
}



// DllUnregisterServer - エントリをレジストリから削除します。

STDAPI DllUnregisterServer(void)
{
	AFX_MANAGE_STATE(_afxModuleAddrThis);

	if (!AfxOleUnregisterTypeLib(_tlid, _wVerMajor, _wVerMinor))
		return ResultFromScode(SELFREG_E_TYPELIB);

	if (!COleObjectFactoryEx::UpdateRegistryAll(FALSE))
		return ResultFromScode(SELFREG_E_CLASS);

	return NOERROR;
}
