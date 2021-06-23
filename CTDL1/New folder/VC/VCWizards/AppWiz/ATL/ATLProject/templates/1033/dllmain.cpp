// dllmain.cpp : Implementation of DllMain.

#include "stdafx.h"
#include "resource.h"
#include "[!output SAFE_IDL_NAME]_i.h"
#include "dllmain.h"
[!if SUPPORT_COMPONENT_REGISTRAR]
#include "compreg.h"
[!endif]
[!if MERGE_PROXY_STUB]
#include "xdlldata.h"
[!endif]

[!output SAFE_ATL_MODULE_NAME] _AtlModule;

[!if SUPPORT_MFC]
class [!output SAFE_MFC_APP_NAME] : public CWinApp
{
public:

// Overrides
	virtual BOOL InitInstance();
	virtual int ExitInstance();

	DECLARE_MESSAGE_MAP()
};

BEGIN_MESSAGE_MAP([!output SAFE_MFC_APP_NAME], CWinApp)
END_MESSAGE_MAP()

[!output SAFE_MFC_APP_NAME] theApp;

BOOL [!output SAFE_MFC_APP_NAME]::InitInstance()
{
[!if MERGE_PROXY_STUB]
#ifdef _MERGE_PROXYSTUB
	if (!PrxDllMain(m_hInstance, DLL_PROCESS_ATTACH, NULL))
		return FALSE;
#endif
[!endif]
	return CWinApp::InitInstance();
}

int [!output SAFE_MFC_APP_NAME]::ExitInstance()
{
	return CWinApp::ExitInstance();
}
[!else]
// DLL Entry Point
extern "C" BOOL WINAPI DllMain(HINSTANCE hInstance, DWORD dwReason, LPVOID lpReserved)
{
[!if MERGE_PROXY_STUB]
#ifdef _MERGE_PROXYSTUB
	if (!PrxDllMain(hInstance, dwReason, lpReserved))
		return FALSE;
#endif
[!endif]
	hInstance;
	return _AtlModule.DllMain(dwReason, lpReserved); 
}
[!endif]
