// [!output PROJECT_NAME].cpp: реализаци€ [!output APP_CLASS] и регистраци€ DLL.

#include "stdafx.h"
#include "[!output PROJECT_NAME].h"

#ifdef _DEBUG
#define new DEBUG_NEW
#endif


[!output APP_CLASS] theApp;

const GUID CDECL _tlid = [!output LIBID_STATIC_CONST_GUID_FORMAT];
const WORD _wVerMajor = 1;
const WORD _wVerMinor = 0;



// [!output APP_CLASS]::InitInstance - инициализаци€ DLL

BOOL [!output APP_CLASS]::InitInstance()
{
	BOOL bInit = COleControlModule::InitInstance();

	if (bInit)
	{
		// TODO: ƒобавьте здесь свой код инициализации модул€.
	}

	return bInit;
}



// [!output APP_CLASS]::ExitInstance - завершение DLL

int [!output APP_CLASS]::ExitInstance()
{
	// TODO: ƒобавьте здесь свой код завершени€ работы модул€.

	return COleControlModule::ExitInstance();
}



// DllRegisterServer - добавл€ет записи в системный реестр

STDAPI DllRegisterServer(void)
{
	AFX_MANAGE_STATE(_afxModuleAddrThis);

	if (!AfxOleRegisterTypeLib(AfxGetInstanceHandle(), _tlid))
		return ResultFromScode(SELFREG_E_TYPELIB);

	if (!COleObjectFactoryEx::UpdateRegistryAll(TRUE))
		return ResultFromScode(SELFREG_E_CLASS);

	return NOERROR;
}



// DllUnregisterServer - удал€ет записи из системного реестра

STDAPI DllUnregisterServer(void)
{
	AFX_MANAGE_STATE(_afxModuleAddrThis);

	if (!AfxOleUnregisterTypeLib(_tlid, _wVerMajor, _wVerMinor))
		return ResultFromScode(SELFREG_E_TYPELIB);

	if (!COleObjectFactoryEx::UpdateRegistryAll(FALSE))
		return ResultFromScode(SELFREG_E_CLASS);

	return NOERROR;
}
