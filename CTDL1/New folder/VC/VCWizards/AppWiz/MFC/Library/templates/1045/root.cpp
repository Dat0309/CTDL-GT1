// [!output PROJECT_NAME].cpp: Definiuje procedury inicjowania biblioteki DLL.
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
//TODO: Jeœli ta biblioteka DLL jest po³¹czona dynamicznie z bibliotekami DLL MFC,
//		wszystkie funkcje wyeksportowane z tej biblioteki DLL, które wywo³uj¹
//		musz¹ mieæ makro AFX_MANAGE_STATE dodane w
//		na samym pocz¹tku funkcji.
//
//		Na przyk³ad:
//
//		extern "C" BOOL PASCAL EXPORT ExportedFunction()
//		{
//			AFX_MANAGE_STATE(AfxGetStaticModuleState());
//			// zwyk³e cia³o funkcji
//		}
//
//		Jest bardzo wa¿nym, ¿eby to makro pojawi³o siê w ka¿dym
//		funkcjê, przed dowolnymi wywo³aniami MFC.  Oznacza to, ¿e
//		musi wyst¹piæ jako pierwsza instrukcja w obrêbie 
//		funkcjê, nawet przed dowolnymi deklaracjami zmiennych obiektu
//		tak, jak ich konstruktory mogê generowaæ wywo³ania MFC
//		biblioteka DLL.
//
//		Zobacz uwagi techniczne MFC nr 33 i 58 dla dodatkowych
//		szczegó³y.
//
[!endif]

[!if !DLL_TYPE_EXTENSION]
// [!output APP_CLASS]

BEGIN_MESSAGE_MAP([!output APP_CLASS], [!output APP_BASE_CLASS])
END_MESSAGE_MAP()


// konstrukcja [!output APP_CLASS]

[!output APP_CLASS]::[!output APP_CLASS]()
{
	// TODO: W tym miejscu dodaj kod konstruktora,
	// Umieœæ wszystkie znacz¹ce inicjacje w InitInstance
}


// Jedyny obiekt [!output APP_CLASS]

[!output APP_CLASS] theApp;

[!if AUTOMATION]
const GUID CDECL _tlid = [!output LIBID_STATIC_CONST_GUID_FORMAT];
const WORD _wVerMajor = 1;
const WORD _wVerMinor = 0;

[!endif]

// Inicjowanie [!output APP_CLASS]

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

	// Rejestruje wszystkie serwery obiektów OLE (fabryki) jako uruchomione.  Dziêki temu
	//  Biblioteki obiektów OLE do tworzenia obiektów z innych aplikacji.
	COleObjectFactory::RegisterAll();
[!endif]

	return TRUE;
}
[!if AUTOMATION]

// DllGetClassObject - Zwraca fabrykê klas

STDAPI DllGetClassObject(REFCLSID rclsid, REFIID riid, LPVOID* ppv)
{
	AFX_MANAGE_STATE(AfxGetStaticModuleState());
	return AfxDllGetClassObject(rclsid, riid, ppv);
}


// DllCanUnloadNow - pozwala modelowi COM wy³adowaæ bibliotekê DLL

STDAPI DllCanUnloadNow(void)
{
	AFX_MANAGE_STATE(AfxGetStaticModuleState());
	return AfxDllCanUnloadNow();
}


// DllRegisterServer - Dodaje wpisy do rejestru systemowego

STDAPI DllRegisterServer(void)
{
	AFX_MANAGE_STATE(AfxGetStaticModuleState());

	if (!AfxOleRegisterTypeLib(AfxGetInstanceHandle(), _tlid))
		return SELFREG_E_TYPELIB;

	if (!COleObjectFactory::UpdateRegistryAll())
		return SELFREG_E_CLASS;

	return S_OK;
}


// DllUnregisterServer - Usuwa wpisy z rejestru systemowego

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
