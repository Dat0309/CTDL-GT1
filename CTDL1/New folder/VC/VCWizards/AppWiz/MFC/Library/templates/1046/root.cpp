// [!output PROJECT_NAME].cpp : Define as rotinas de inicialização da DLL.
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
//TODO: Se esta DLL é conectada dinamicamente contra as MFC DLLs,
//		qualquer função exportada desta DLL que chama a
//		MFC deve possuir o macro AFX_MANAGE_STATE adicionado no
//		começo desta função.
//
//		Por exemplo:
//
//		extern "C" BOOL PASCAL EXPORT ExportedFunction()
//		{
//			AFX_MANAGE_STATE(AfxGetStaticModuleState());
//			//corpo normal da função aqui
//		}
//
//		É muito importante que essa macro apareça em todas
//		as funções, antes de qualquer chamada a MFC.  Isto significa que
//		isto deve aparecer como a primeira declaração dentro da 
//		função, antes mesmo da declaração de qualquer objeto variável
//		uma vez que seus construtores podem gerar chamadas ao MFC
//		DLL.
//
//		Consulte Notas Técnicas MFC 33 e 58 para informações
//		adicionais.
//
[!endif]

[!if !DLL_TYPE_EXTENSION]
// [!output APP_CLASS]

BEGIN_MESSAGE_MAP([!output APP_CLASS], [!output APP_BASE_CLASS])
END_MESSAGE_MAP()


// [!output APP_CLASS] construção

[!output APP_CLASS]::[!output APP_CLASS]()
{
	// TODO: adicione código de construção aqui,
	// Coloque todas as inicializações significativas em InitInstance
}


// O único objeto [!output APP_CLASS]

[!output APP_CLASS] theApp;

[!if AUTOMATION]
const GUID CDECL _tlid = [!output LIBID_STATIC_CONST_GUID_FORMAT];
const WORD _wVerMajor = 1;
const WORD _wVerMinor = 0;

[!endif]

// [!output APP_CLASS] inicialização

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

	// Registra todos os servidores OLE (fábricas) como executando.  Isto habilita as
	//  bibliotecas OLE a criar objetos de outras aplicações.
	COleObjectFactory::RegisterAll();
[!endif]

	return TRUE;
}
[!if AUTOMATION]

// DllGetClassObject - Retorna fábrica de classes

STDAPI DllGetClassObject(REFCLSID rclsid, REFIID riid, LPVOID* ppv)
{
	AFX_MANAGE_STATE(AfxGetStaticModuleState());
	return AfxDllGetClassObject(rclsid, riid, ppv);
}


// DllCanUnloadNow - Permite que o COM descarregue o DLL

STDAPI DllCanUnloadNow(void)
{
	AFX_MANAGE_STATE(AfxGetStaticModuleState());
	return AfxDllCanUnloadNow();
}


// DllRegisterServer - Adiciona entradas ao registro do sistema

STDAPI DllRegisterServer(void)
{
	AFX_MANAGE_STATE(AfxGetStaticModuleState());

	if (!AfxOleRegisterTypeLib(AfxGetInstanceHandle(), _tlid))
		return SELFREG_E_TYPELIB;

	if (!COleObjectFactory::UpdateRegistryAll())
		return SELFREG_E_CLASS;

	return S_OK;
}


// DllUnregisterServer - Remove entradas do registro do sistema

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
