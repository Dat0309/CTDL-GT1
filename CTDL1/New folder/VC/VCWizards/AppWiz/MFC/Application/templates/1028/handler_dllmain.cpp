// dllmain.cpp : DllMain ªº¹ê§@¡C

#include "stdafx.h"
#include "resource.h"
#include "[!output SAFE_IDL_NAME]_i.h"
#include "dllmain.h"
#include "xdlldata.h"

[!output SAFE_ATL_MODULE_NAME] _AtlModule;

class [!output SAFE_MFC_APP_NAME] : public CWinApp
{
public:

//ÂÐ¼g
	virtual BOOL InitInstance();
	virtual int ExitInstance();

	DECLARE_MESSAGE_MAP()
};

BEGIN_MESSAGE_MAP([!output SAFE_MFC_APP_NAME], CWinApp)
END_MESSAGE_MAP()

[!output SAFE_MFC_APP_NAME] theApp;

BOOL [!output SAFE_MFC_APP_NAME]::InitInstance()
{
	if (!PrxDllMain(m_hInstance, DLL_PROCESS_ATTACH, NULL))
		return FALSE;
	return CWinApp::InitInstance();
}

int [!output SAFE_MFC_APP_NAME]::ExitInstance()
{
	return CWinApp::ExitInstance();
}
