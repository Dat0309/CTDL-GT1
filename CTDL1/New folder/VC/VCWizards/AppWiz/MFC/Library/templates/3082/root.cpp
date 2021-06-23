// [!output PROJECT_NAME].cpp: define las rutinas de inicialización del archivo DLL.
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
//TODO: si este archivo DLL se vincula de forma dinámica con los archivos DLL de MFC,
//		las funciones que se exporten desde el archivo DLL y a las que se llame en
//		MFC deben agregar la macro AFX_MANAGE_STATE al
//		principio de la función.
//
//		Por ejemplo:
//
//		extern "C" BOOL PASCAL EXPORT ExportedFunction()
//		{
//			AFX_MANAGE_STATE(AfxGetStaticModuleState());
//			// colocar aquí el cuerpo de la función estándar
//		}
//
//		Es de suma importancia que esta macro aparezca en todas las funciones
//		antes de que se llamen en MFC.  Esto significa que debe aparecer
//		en la primera instrucción de la función, 
//		antes incluso de cualquier declaración de variables de objetos,
//		ya que sus constructores pueden generar llamadas al archivo DLL de MFC.
//		
//
//		Consulte las notas técnicas 33 y 58 de MFC para obtener
//		detalles adicionales.
//
[!endif]

[!if !DLL_TYPE_EXTENSION]
// [!output APP_CLASS]

BEGIN_MESSAGE_MAP([!output APP_CLASS], [!output APP_BASE_CLASS])
END_MESSAGE_MAP()


// Construcción de [!output APP_CLASS]

[!output APP_CLASS]::[!output APP_CLASS]()
{
	// TODO: agregar aquí el código de construcción,
	// Colocar toda la inicialización importante en InitInstance
}


// El único objeto [!output APP_CLASS]

[!output APP_CLASS] theApp;

[!if AUTOMATION]
const GUID CDECL _tlid = [!output LIBID_STATIC_CONST_GUID_FORMAT];
const WORD _wVerMajor = 1;
const WORD _wVerMinor = 0;

[!endif]

// Inicialización de [!output APP_CLASS]

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

	// Registrar todos los servidores o generadores OLE como en ejecución.  Esto habilita las bibliotecas
	//  OLE para crear objetos desde otras aplicaciones.
	COleObjectFactory::RegisterAll();
[!endif]

	return TRUE;
}
[!if AUTOMATION]

// DllGetClassObject: devuelve el generador de clases

STDAPI DllGetClassObject(REFCLSID rclsid, REFIID riid, LPVOID* ppv)
{
	AFX_MANAGE_STATE(AfxGetStaticModuleState());
	return AfxDllGetClassObject(rclsid, riid, ppv);
}


// DllCanUnloadNow: permite que COM descargue archivos DLL

STDAPI DllCanUnloadNow(void)
{
	AFX_MANAGE_STATE(AfxGetStaticModuleState());
	return AfxDllCanUnloadNow();
}


// DllRegisterServer: agrega entradas al Registro del sistema

STDAPI DllRegisterServer(void)
{
	AFX_MANAGE_STATE(AfxGetStaticModuleState());

	if (!AfxOleRegisterTypeLib(AfxGetInstanceHandle(), _tlid))
		return SELFREG_E_TYPELIB;

	if (!COleObjectFactory::UpdateRegistryAll())
		return SELFREG_E_CLASS;

	return S_OK;
}


// DllUnregisterServer: quita entradas del Registro del sistema

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
