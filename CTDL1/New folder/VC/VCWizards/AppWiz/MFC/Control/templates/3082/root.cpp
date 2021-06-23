// [!output PROJECT_NAME].cpp: implementación del registro de [!output APP_CLASS] y del archivo DLL.

#include "stdafx.h"
#include "[!output PROJECT_NAME].h"

#ifdef _DEBUG
#define new DEBUG_NEW
#endif


[!output APP_CLASS] theApp;

const GUID CDECL _tlid = [!output LIBID_STATIC_CONST_GUID_FORMAT];
const WORD _wVerMajor = 1;
const WORD _wVerMinor = 0;



// [!output APP_CLASS]::InitInstance: inicialización del archivo DLL

BOOL [!output APP_CLASS]::InitInstance()
{
	BOOL bInit = COleControlModule::InitInstance();

	if (bInit)
	{
		// TODO: agregar aquí su propio código de inicialización de módulo.
	}

	return bInit;
}



// [!output APP_CLASS]::ExitInstance: finalización del archivo DLL

int [!output APP_CLASS]::ExitInstance()
{
	// TODO: agregar aquí su propio código de finalización de módulo.

	return COleControlModule::ExitInstance();
}



// DllRegisterServer: agrega entradas al Registro del sistema

STDAPI DllRegisterServer(void)
{
	AFX_MANAGE_STATE(_afxModuleAddrThis);

	if (!AfxOleRegisterTypeLib(AfxGetInstanceHandle(), _tlid))
		return ResultFromScode(SELFREG_E_TYPELIB);

	if (!COleObjectFactoryEx::UpdateRegistryAll(TRUE))
		return ResultFromScode(SELFREG_E_CLASS);

	return NOERROR;
}



// DllUnregisterServer: quita entradas del Registro del sistema

STDAPI DllUnregisterServer(void)
{
	AFX_MANAGE_STATE(_afxModuleAddrThis);

	if (!AfxOleUnregisterTypeLib(_tlid, _wVerMajor, _wVerMinor))
		return ResultFromScode(SELFREG_E_TYPELIB);

	if (!COleObjectFactoryEx::UpdateRegistryAll(FALSE))
		return ResultFromScode(SELFREG_E_CLASS);

	return NOERROR;
}
