// [!output PROJECT_NAME].cpp : definisce le routine di inizializzazione per la DLL.
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
//TODO: se questa DLL è collegata in modo dinamico alle DLL
//		MFC, le funzioni esportate da questa DLL che
//		vengono chiamate in MFC devono avere la macro AFX_MANAGE_STATE
//		all'inizio della funzione.
//
//		Ad esempio:
//
//		extern "C" BOOL PASCAL EXPORT ExportedFunction()
//		{
//			AFX_MANAGE_STATE(AfxGetStaticModuleState());
//			// corpo della funzione normale
//		}
//
//		È molto importante che tale macro sia presente in ciascuna
//		funzione davanti a qualsiasi chiamata MFC.  Tale macro dovrà
//		quindi comparire come prima istruzione all'interno della 
//		funzione, precedendo anche le dichiarazioni di variabili oggetto,
//		poiché i relativi costruttori possono generare chiamate alla DLL
//		MFC.
//
//		Vedere le note tecniche 33 e 58 di MFC per ulteriori
//		informazioni.
//
[!endif]

[!if !DLL_TYPE_EXTENSION]
// [!output APP_CLASS]

BEGIN_MESSAGE_MAP([!output APP_CLASS], [!output APP_BASE_CLASS])
END_MESSAGE_MAP()


// Costruzione di [!output APP_CLASS]

[!output APP_CLASS]::[!output APP_CLASS]()
{
	// TODO: aggiungere qui il codice di costruzione.
	// Inserire l'inizializzazione significativa in InitInstance.
}


// L'unico oggetto [!output APP_CLASS]

[!output APP_CLASS] theApp;

[!if AUTOMATION]
const GUID CDECL _tlid = [!output LIBID_STATIC_CONST_GUID_FORMAT];
const WORD _wVerMajor = 1;
const WORD _wVerMinor = 0;

[!endif]

// Inizializzazione di [!output APP_CLASS]

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

	// Registrare tutti i server OLE (factory) come in esecuzione.  Ciò consente alle
	//  librerie OLE di creare oggetti da altre applicazioni.
	COleObjectFactory::RegisterAll();
[!endif]

	return TRUE;
}
[!if AUTOMATION]

// DllGetClassObject - Restituisce la class factory

STDAPI DllGetClassObject(REFCLSID rclsid, REFIID riid, LPVOID* ppv)
{
	AFX_MANAGE_STATE(AfxGetStaticModuleState());
	return AfxDllGetClassObject(rclsid, riid, ppv);
}


// DllCanUnloadNow - Consente a COM di scaricare DLL

STDAPI DllCanUnloadNow(void)
{
	AFX_MANAGE_STATE(AfxGetStaticModuleState());
	return AfxDllCanUnloadNow();
}


// DllRegisterServer - Aggiunge voci al Registro di sistema

STDAPI DllRegisterServer(void)
{
	AFX_MANAGE_STATE(AfxGetStaticModuleState());

	if (!AfxOleRegisterTypeLib(AfxGetInstanceHandle(), _tlid))
		return SELFREG_E_TYPELIB;

	if (!COleObjectFactory::UpdateRegistryAll())
		return SELFREG_E_CLASS;

	return S_OK;
}


// DllUnregisterServer - Rimuove voci dal Registro di sistema

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
