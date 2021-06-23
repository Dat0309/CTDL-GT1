// dllmain.cpp: Definiuje procedury inicjowania biblioteki DLL.
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
	// Usu�, je�li u�ywasz lpReserved
	UNREFERENCED_PARAMETER(lpReserved);

	if (dwReason == DLL_PROCESS_ATTACH)
	{
		TRACE0("Inicjowanie biblioteki [!output PROJECT_NAME].DLL!\n");
		
		// Jednorazowe inicjowanie biblioteki DLL rozszerzenia
		if (!AfxInitExtensionModule([!output SAFE_PROJECT_IDENTIFIER_NAME]DLL, hInstance))
			return 0;

		// Wstaw t� bibliotek� DLL do �a�cucha zasob�w
		// Uwaga: Je�li ta biblioteka DLL rozszerzenia jest niejawnie po��czona z
		//  regularn� bibliotek� DLL MFC (tak� jak formant ActiveX)
		//  zamiast aplikacj� MFC, b�dziesz chcia�
		//  usu� t� lini� z funkcji DllMain i umie�� j� w oddzielnej
		//  funkcji wyeksportowanej z tej biblioteki DLL rozszerzenia.  Regularna biblioteka DLL
		//  kt�re u�ywa tej biblioteki DLL rozszerzenia, powinno nast�pnie jawnie wywo�a�
		//  funkcji, aby zainicjowa� t� bibliotek� DLL rozszerzenia.  W przeciwnym razie
		//  obiekt CDynLinkLibrary nie zostanie do��czony do
		//  �a�cuch zasob�w regularnej biblioteki DLL, co prowadzi do powa�nych problem�w
		//  wynik.

		new CDynLinkLibrary([!output SAFE_PROJECT_IDENTIFIER_NAME]DLL);

[!if SOCKETS]
		// Inicjowanie gniazd
		// Uwaga: Je�li ta biblioteka DLL rozszerzenia jest niejawnie po��czona z
		//  regularn� bibliotek� DLL MFC (tak� jak formant ActiveX)
		//  zamiast aplikacj� MFC, b�dziesz chcia�
		//  usu� nast�puj�ce linie z funkcji DllMain i umie�� je w oddzielnej
		//  funkcji wyeksportowanej z tej biblioteki DLL rozszerzenia.  Regularna biblioteka DLL
		//  kt�re u�ywa tej biblioteki DLL rozszerzenia, powinno nast�pnie jawnie wywo�a�
		//  funkcji, aby zainicjowa� t� bibliotek� DLL rozszerzenia.
		if (!AfxSocketInit())
		{
			return FALSE;
		}
	
[!endif]
	}
	else if (dwReason == DLL_PROCESS_DETACH)
	{
		TRACE0("Ko�czenie biblioteki [!output PROJECT_NAME].DLL!\n");

		// Zako�cz bibliotek� zanim zostan� wywo�ane destruktory
		AfxTermExtensionModule([!output SAFE_PROJECT_IDENTIFIER_NAME]DLL);
	}
	return 1;   // ok
}
