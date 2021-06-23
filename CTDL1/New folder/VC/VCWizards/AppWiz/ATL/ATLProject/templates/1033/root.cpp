[!if DLL_APP]
// [!output PROJECT_NAME].cpp : Implementation of DLL Exports.
[!else]
// [!output PROJECT_NAME].cpp : Implementation of WinMain
[!endif]

[!if SUPPORT_COMPLUS]
//
// Note: COM+ 1.0 Information:
//      Please remember to run Microsoft Transaction Explorer to install the component(s).
//      Registration is not done by default. 
[!endif]

#include "stdafx.h"
#include "resource.h"
#include "[!output SAFE_IDL_NAME]_i.h"
[!if DLL_APP]
#include "dllmain.h"
[!endif]
[!if SUPPORT_COMPONENT_REGISTRAR]
#include "compreg.h"
[!endif]
[!if MERGE_PROXY_STUB]
#include "xdlldata.h"
[!endif]

[!if PREVIEW_HANDLER]
#include "PreviewHandler.h"
[!endif]
[!if THUMBNAIL_HANDLER]
#include "ThumbnailHandler.h"
[!endif]
[!if SEARCH_HANDLER]
#include "FilterHandler.h"
[!endif]

using namespace ATL;

[!if EXE_APP]

class [!output SAFE_ATL_MODULE_NAME] : public ATL::CAtlExeModuleT< [!output SAFE_ATL_MODULE_NAME] >
[!endif]
[!if SERVICE_APP]
#include <stdio.h>

class [!output SAFE_ATL_MODULE_NAME] : public ATL::CAtlServiceModuleT< [!output SAFE_ATL_MODULE_NAME], IDS_SERVICENAME >
[!endif]
[!if !DLL_APP]
{
public :
	DECLARE_LIBID(LIBID_[!output LIB_NAME]Lib)
	DECLARE_REGISTRY_APPID_RESOURCEID(IDR_[!output UPPER_CASE_SAFE_PROJECT_IDENTIFIER_NAME], "{[!output APPID_REGISTRY_FORMAT]}")
	[!if SERVICE_APP]
	HRESULT InitializeSecurity() throw()
	{
		// TODO : Call CoInitializeSecurity and provide the appropriate security settings for your service
		// Suggested - PKT Level Authentication, 
		// Impersonation Level of RPC_C_IMP_LEVEL_IDENTIFY 
		// and an appropriate Non NULL Security Descriptor.

		return S_OK;
	}
	[!endif]
};

[!output SAFE_ATL_MODULE_NAME] _AtlModule;

[!endif]
[!if DLL_APP]
// Used to determine whether the DLL can be unloaded by OLE.
STDAPI DllCanUnloadNow(void)
{
	[!if MERGE_PROXY_STUB]
#ifdef _MERGE_PROXYSTUB
	HRESULT hr = PrxDllCanUnloadNow();
	if (hr != S_OK)
		return hr;
#endif
	[!endif]
	[!if SUPPORT_MFC]
	AFX_MANAGE_STATE(AfxGetStaticModuleState());
	return (AfxDllCanUnloadNow()==S_OK && _AtlModule.GetLockCount()==0) ? S_OK : S_FALSE;
	[!else]
	return _AtlModule.DllCanUnloadNow();
	[!endif]
}

// Returns a class factory to create an object of the requested type.
STDAPI DllGetClassObject(_In_ REFCLSID rclsid, _In_ REFIID riid, _Outptr_ LPVOID* ppv)
{
	[!if MERGE_PROXY_STUB]
#ifdef _MERGE_PROXYSTUB
	HRESULT hr = PrxDllGetClassObject(rclsid, riid, ppv);
	if (hr != CLASS_E_CLASSNOTAVAILABLE)
		return hr;
#endif
	[!endif]
	return _AtlModule.DllGetClassObject(rclsid, riid, ppv);
}

// DllRegisterServer - Adds entries to the system registry.
STDAPI DllRegisterServer(void)
{
	// registers object, typelib and all interfaces in typelib
	HRESULT hr = _AtlModule.DllRegisterServer();
	[!if MERGE_PROXY_STUB]
#ifdef _MERGE_PROXYSTUB
	if (FAILED(hr))
		return hr;
	hr = PrxDllRegisterServer();
#endif
	[!endif]
	return hr;
}

// DllUnregisterServer - Removes entries from the system registry.
STDAPI DllUnregisterServer(void)
{
	HRESULT hr = _AtlModule.DllUnregisterServer();
	[!if MERGE_PROXY_STUB]
#ifdef _MERGE_PROXYSTUB
	if (FAILED(hr))
		return hr;
	hr = PrxDllRegisterServer();
	if (FAILED(hr))
		return hr;
	hr = PrxDllUnregisterServer();
#endif
	[!endif]
	return hr;
}

// DllInstall - Adds/Removes entries to the system registry per user per machine.
STDAPI DllInstall(BOOL bInstall, _In_opt_  LPCWSTR pszCmdLine)
{
	HRESULT hr = E_FAIL;
	static const wchar_t szUserSwitch[] = L"user";

	if (pszCmdLine != NULL)
	{
		if (_wcsnicmp(pszCmdLine, szUserSwitch, _countof(szUserSwitch)) == 0)
		{
			ATL::AtlSetPerUserRegistration(true);
		}
	}

	if (bInstall)
	{	
		hr = DllRegisterServer();
		if (FAILED(hr))
		{
			DllUnregisterServer();
		}
	}
	else
	{
		hr = DllUnregisterServer();
	}

	return hr;
}

[!endif]

[!if EXE_APP]

//
extern "C" int WINAPI _tWinMain(HINSTANCE /*hInstance*/, HINSTANCE /*hPrevInstance*/, 
								LPTSTR /*lpCmdLine*/, int nShowCmd)
{
	return _AtlModule.WinMain(nShowCmd);
}

[!endif]
[!if SERVICE_APP]

//
extern "C" int WINAPI _tWinMain(HINSTANCE /*hInstance*/, HINSTANCE /*hPrevInstance*/, 
								LPTSTR /*lpCmdLine*/, int nShowCmd)
{
	return _AtlModule.WinMain(nShowCmd);
}

[!endif]
