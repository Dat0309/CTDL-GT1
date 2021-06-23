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
	// Usuñ, jeœli u¿ywasz lpReserved
	UNREFERENCED_PARAMETER(lpReserved);

	if (dwReason == DLL_PROCESS_ATTACH)
	{
		TRACE0("Inicjowanie biblioteki [!output PROJECT_NAME].DLL!\n");
		
		// Jednorazowe inicjowanie biblioteki DLL rozszerzenia
		if (!AfxInitExtensionModule([!output SAFE_PROJECT_IDENTIFIER_NAME]DLL, hInstance))
			return 0;

		// Wstaw tê bibliotekê DLL do ³añcucha zasobów
		// Uwaga: Jeœli ta biblioteka DLL rozszerzenia jest niejawnie po³¹czona z
		//  regularn¹ bibliotek¹ DLL MFC (tak¹ jak formant ActiveX)
		//  zamiast aplikacj¹ MFC, bêdziesz chcia³
		//  usuñ tê liniê z funkcji DllMain i umieœæ j¹ w oddzielnej
		//  funkcji wyeksportowanej z tej biblioteki DLL rozszerzenia.  Regularna biblioteka DLL
		//  które u¿ywa tej biblioteki DLL rozszerzenia, powinno nastêpnie jawnie wywo³aæ
		//  funkcji, aby zainicjowaæ tê bibliotekê DLL rozszerzenia.  W przeciwnym razie
		//  obiekt CDynLinkLibrary nie zostanie do³¹czony do
		//  ³añcuch zasobów regularnej biblioteki DLL, co prowadzi do powa¿nych problemów
		//  wynik.

		new CDynLinkLibrary([!output SAFE_PROJECT_IDENTIFIER_NAME]DLL);

[!if SOCKETS]
		// Inicjowanie gniazd
		// Uwaga: Jeœli ta biblioteka DLL rozszerzenia jest niejawnie po³¹czona z
		//  regularn¹ bibliotek¹ DLL MFC (tak¹ jak formant ActiveX)
		//  zamiast aplikacj¹ MFC, bêdziesz chcia³
		//  usuñ nastêpuj¹ce linie z funkcji DllMain i umieœæ je w oddzielnej
		//  funkcji wyeksportowanej z tej biblioteki DLL rozszerzenia.  Regularna biblioteka DLL
		//  które u¿ywa tej biblioteki DLL rozszerzenia, powinno nastêpnie jawnie wywo³aæ
		//  funkcji, aby zainicjowaæ tê bibliotekê DLL rozszerzenia.
		if (!AfxSocketInit())
		{
			return FALSE;
		}
	
[!endif]
	}
	else if (dwReason == DLL_PROCESS_DETACH)
	{
		TRACE0("Koñczenie biblioteki [!output PROJECT_NAME].DLL!\n");

		// Zakoñcz bibliotekê zanim zostan¹ wywo³ane destruktory
		AfxTermExtensionModule([!output SAFE_PROJECT_IDENTIFIER_NAME]DLL);
	}
	return 1;   // ok
}
