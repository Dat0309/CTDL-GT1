// dllmain.cpp : Define as rotinas de inicializa��o da DLL.
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
	// Remova isto se voc� utiliza lpReserved
	UNREFERENCED_PARAMETER(lpReserved);

	if (dwReason == DLL_PROCESS_ATTACH)
	{
		TRACE0("[!output PROJECT_NAME].DLL Inicializando!\n");
		
		// Extens�o DLL de inicializa��o �nica
		if (!AfxInitExtensionModule([!output SAFE_PROJECT_IDENTIFIER_NAME]DLL, hInstance))
			return 0;

		// Insire esta DLL na cadeia de recursos
		// NOTE: Se esta extens�o DLL estiver sendo implicitamente vinculada por uma
		//  DLL MFC Regular (como um Controle ActiveX)
		//  ao inv�s de uma aplica��o MFC, ent�o voc� dever�
		//  remover esta linha de DllMain e coloc�-la em uma fun��o
		//  exportada dessa Extens�o DLL.  A DLL Regular
		//  que utiliza esta Extens�o DLL deve ent�o chamar explicitamente aquela
		//  fun��o para inicializar esta Extens�o DLL.  Caso contr�rio,
		//  o objeto CDynLinkLibrary n�o ser� anexado �
		//  cadeia de recursos da DLL Regular, e problemas s�rios
		//  ocorrer�o.

		new CDynLinkLibrary([!output SAFE_PROJECT_IDENTIFIER_NAME]DLL);

[!if SOCKETS]
		// Inicializa��o dos Soquetes
		// NOTE: Se esta extens�o DLL estiver sendo implicitamente vinculada por uma
		//  DLL MFC Regular (como um Controle ActiveX)
		//  ao inv�s de uma aplica��o MFC, ent�o voc� dever�
		//  remover esta linha de DllMain e coloc�-la em uma fun��o
		//  exportada dessa Extens�o DLL.  A DLL Regular
		//  que utiliza esta Extens�o DLL deve ent�o chamar explicitamente aquela
		//  fun��o para inicializar esta Extens�o DLL.
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
