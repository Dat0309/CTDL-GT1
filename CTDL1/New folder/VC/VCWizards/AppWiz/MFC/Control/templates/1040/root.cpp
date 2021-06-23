// [!output PROJECT_NAME].cpp : implementazione di [!output APP_CLASS] e registrazione DLL.

#include "stdafx.h"
#include "[!output PROJECT_NAME].h"

#ifdef _DEBUG
#define new DEBUG_NEW
#endif


[!output APP_CLASS] theApp;

const GUID CDECL _tlid = [!output LIBID_STATIC_CONST_GUID_FORMAT];
const WORD _wVerMajor = 1;
const WORD _wVerMinor = 0;



// [!output APP_CLASS]::InitInstance - Inizializzazione DLL

BOOL [!output APP_CLASS]::InitInstance()
{
	BOOL bInit = COleControlModule::InitInstance();

	if (bInit)
	{
		// TODO: aggiungere qui il codice di inizializzazione del modulo.
	}

	return bInit;
}



// [!output APP_CLASS]::ExitInstance - Terminazione DLL

int [!output APP_CLASS]::ExitInstance()
{
	// TODO: aggiungere qui il codice di terminazione del modulo.

	return COleControlModule::ExitInstance();
}



// DllRegisterServer - Aggiunge voci al Registro di sistema

STDAPI DllRegisterServer(void)
{
	AFX_MANAGE_STATE(_afxModuleAddrThis);

	if (!AfxOleRegisterTypeLib(AfxGetInstanceHandle(), _tlid))
		return ResultFromScode(SELFREG_E_TYPELIB);

	if (!COleObjectFactoryEx::UpdateRegistryAll(TRUE))
		return ResultFromScode(SELFREG_E_CLASS);

	return NOERROR;
}



// DllUnregisterServer - Rimuove voci dal Registro di sistema

STDAPI DllUnregisterServer(void)
{
	AFX_MANAGE_STATE(_afxModuleAddrThis);

	if (!AfxOleUnregisterTypeLib(_tlid, _wVerMajor, _wVerMinor))
		return ResultFromScode(SELFREG_E_TYPELIB);

	if (!COleObjectFactoryEx::UpdateRegistryAll(FALSE))
		return ResultFromScode(SELFREG_E_CLASS);

	return NOERROR;
}
