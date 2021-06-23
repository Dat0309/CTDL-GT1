// dllmain.cpp : Define las rutinas de inicialización de la aplicación DLL.
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
	// Quitar lo siguiente si se utiliza lpReserved
	UNREFERENCED_PARAMETER(lpReserved);

	if (dwReason == DLL_PROCESS_ATTACH)
	{
		TRACE0("Inicializando [!output PROJECT_NAME].DLL\n");
		
		// Inicialización única del archivo DLL de extensión
		if (!AfxInitExtensionModule([!output SAFE_PROJECT_IDENTIFIER_NAME]DLL, hInstance))
			return 0;

		// Insertar este archivo DLL en la cadena de recursos
		// NOTA: si un archivo DLL estándar de MFC, como un control ActiveX,
		//  vincula de forma implícita el archivo DLL de extensión,
		//  en vez de una aplicación MFC,
		//  quite esta línea de DllMain y colóquela en
		//  otra función que se haya exportado del archivo DLL de extensión.  El archivo DLL estándar
		//  que utiliza el archivo DLL de extensión llama de forma explícita
		//  a esa función para inicializar el archivo DLL de extensión.  De lo contrario,
		//  el objeto CDynLinkLibrary no se adjunta a la cadena de recursos
		//  del archivo DLL estándar y se pueden producir
		//  problemas graves.

		new CDynLinkLibrary([!output SAFE_PROJECT_IDENTIFIER_NAME]DLL);

[!if SOCKETS]
		// Inicialización de sockets
		// NOTA: si un archivo DLL estándar de MFC, como un control ActiveX,
		//  vincula de forma implícita el archivo DLL de extensión,
		//  en vez de una aplicación MFC,
		//  quite las siguientes líneas de DllMain y colóquelas en
		//  otra función que se haya exportado del archivo DLL de extensión.  El archivo DLL estándar
		//  que utiliza el archivo DLL de extensión llama de forma explícita
		//  a esa función para inicializar el archivo DLL de extensión.
		if (!AfxSocketInit())
		{
			return FALSE;
		}
	
[!endif]
	}
	else if (dwReason == DLL_PROCESS_DETACH)
	{
		TRACE0("Finalizando [!output PROJECT_NAME].DLL\n");

		// Finalizar la biblioteca antes de llamar a los destructores
		AfxTermExtensionModule([!output SAFE_PROJECT_IDENTIFIER_NAME]DLL);
	}
	return 1;   // aceptar
}
