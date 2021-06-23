// [!output PROJECT_NAME].cpp : Implementação de [!output APP_CLASS] e registro DLL.

#include "stdafx.h"
#include "[!output PROJECT_NAME].h"

#ifdef _DEBUG
#define new DEBUG_NEW
#endif


[!output APP_CLASS] theApp;

const GUID CDECL _tlid = [!output LIBID_STATIC_CONST_GUID_FORMAT];
const WORD _wVerMajor = 1;
const WORD _wVerMinor = 0;



// [!output APP_CLASS]::InitInstance - Inicialização DLL

BOOL [!output APP_CLASS]::InitInstance()
{
	BOOL bInit = COleControlModule::InitInstance();

	if (bInit)
	{
		// TODO: Adicione aqui seu código de inicialização do módulo.
	}

	return bInit;
}



// [!output APP_CLASS]::ExitInstance - Termina a DLL

int [!output APP_CLASS]::ExitInstance()
{
	// TODO: Adicione aqui seu código de terminação do módulo.

	return COleControlModule::ExitInstance();
}



// DllRegisterServer - Adiciona entradas ao registro do sistema

STDAPI DllRegisterServer(void)
{
	AFX_MANAGE_STATE(_afxModuleAddrThis);

	if (!AfxOleRegisterTypeLib(AfxGetInstanceHandle(), _tlid))
		return ResultFromScode(SELFREG_E_TYPELIB);

	if (!COleObjectFactoryEx::UpdateRegistryAll(TRUE))
		return ResultFromScode(SELFREG_E_CLASS);

	return NOERROR;
}



// DllUnregisterServer - Remove entradas do registro do sistema

STDAPI DllUnregisterServer(void)
{
	AFX_MANAGE_STATE(_afxModuleAddrThis);

	if (!AfxOleUnregisterTypeLib(_tlid, _wVerMajor, _wVerMinor))
		return ResultFromScode(SELFREG_E_TYPELIB);

	if (!COleObjectFactoryEx::UpdateRegistryAll(FALSE))
		return ResultFromScode(SELFREG_E_CLASS);

	return NOERROR;
}
