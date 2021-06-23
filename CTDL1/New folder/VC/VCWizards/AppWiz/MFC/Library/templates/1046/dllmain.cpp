// dllmain.cpp : Define as rotinas de inicialização da DLL.
//

#include "stdafx.h"
#include <afxwin.h>
#include <afxdllx.h>

#ifdef _DEBUG
#define new DEBUG_NEW
#endif

static AFX_EXTENSION_MODULE [!output SAFE_PROJECT_IDENTIFIER_NAME]DLL = { NULL, NULL };

extern "C" int APIENTRY
DllMain(HINSTANCE hInstance, DWORD dwReason, LPVOID lpReserved)
{
	// Remova isto se você utiliza lpReserved
	UNREFERENCED_PARAMETER(lpReserved);

	if (dwReason == DLL_PROCESS_ATTACH)
	{
		TRACE0("[!output PROJECT_NAME].DLL Inicializando!\n");
		
		// Extensão DLL de inicialização única
		if (!AfxInitExtensionModule([!output SAFE_PROJECT_IDENTIFIER_NAME]DLL, hInstance))
			return 0;

		// Insire esta DLL na cadeia de recursos
		// NOTE: Se esta extensão DLL estiver sendo implicitamente vinculada por uma
		//  DLL MFC Regular (como um Controle ActiveX)
		//  ao invés de uma aplicação MFC, então você deverá
		//  remover esta linha de DllMain e colocá-la em uma função
		//  exportada dessa Extensão DLL.  A DLL Regular
		//  que utiliza esta Extensão DLL deve então chamar explicitamente aquela
		//  função para inicializar esta Extensão DLL.  Caso contrário,
		//  o objeto CDynLinkLibrary não será anexado à
		//  cadeia de recursos da DLL Regular, e problemas sérios
		//  ocorrerão.

		new CDynLinkLibrary([!output SAFE_PROJECT_IDENTIFIER_NAME]DLL);

[!if SOCKETS]
		// Inicialização dos Soquetes
		// NOTE: Se esta extensão DLL estiver sendo implicitamente vinculada por uma
		//  DLL MFC Regular (como um Controle ActiveX)
		//  ao invés de uma aplicação MFC, então você deverá
		//  remover esta linha de DllMain e colocá-la em uma função
		//  exportada dessa Extensão DLL.  A DLL Regular
		//  que utiliza esta Extensão DLL deve então chamar explicitamente aquela
		//  função para inicializar esta Extensão DLL.
		if (!AfxSocketInit())
		{
			return FALSE;
		}
	
[!endif]
	}
	else if (dwReason == DLL_PROCESS_DETACH)
	{
		TRACE0("[!output PROJECT_NAME].DLL Terminando!\n");

		// Termina a biblioteca antes que os destrutores sejam chamados
		AfxTermExtensionModule([!output SAFE_PROJECT_IDENTIFIER_NAME]DLL);
	}
	return 1;   // ok
}
