// [!output PROJECT_NAME].cpp : DLL 匯出的實作。

#include "stdafx.h"
#include "resource.h"
#include "[!output SAFE_IDL_NAME]_i.h"
#include "dllmain.h"
#include "xdlldata.h"

[!if PREVIEW_HANDLER]
#include "PreviewHandler.h"
[!endif]
[!if THUMBNAIL_HANDLER]
#include "ThumbnailHandler.h"
[!endif]
[!if SEARCH_HANDLER]
#include "FilterHandler.h"
[!endif]

// 用來判斷 DLL 是否可被 OLE 卸載。
STDAPI DllCanUnloadNow(void)
{
	HRESULT hr = PrxDllCanUnloadNow();
	if (hr != S_OK)
		return hr;
	AFX_MANAGE_STATE(AfxGetStaticModuleState());
	return (AfxDllCanUnloadNow()==S_OK && _AtlModule.GetLockCount()==0) ? S_OK : S_FALSE;
}

// 傳回 Class Factory 以建立所要求類型的物件。
STDAPI DllGetClassObject(REFCLSID rclsid, REFIID riid, LPVOID* ppv)
{
	if (PrxDllGetClassObject(rclsid, riid, ppv) == S_OK)
		return S_OK;
	return _AtlModule.DllGetClassObject(rclsid, riid, ppv);
}

// DllRegisterServer - 將項目加入到系統登錄。
STDAPI DllRegisterServer(void)
{
	// 登錄物件、Typelib 和所有 Typelib 中的介面
	HRESULT hr = _AtlModule.DllRegisterServer();
	if (FAILED(hr))
		return hr;
	hr = PrxDllRegisterServer();
	return hr;
}

// DllUnregisterServer - 從系統登錄移除項目。
STDAPI DllUnregisterServer(void)
{
	HRESULT hr = _AtlModule.DllUnregisterServer();
	if (FAILED(hr))
		return hr;
	hr = PrxDllRegisterServer();
	if (FAILED(hr))
		return hr;
	hr = PrxDllUnregisterServer();
	return hr;
}

// DllInstall - 針對個別使用者及個別電腦，在系統登錄中加入/移除項目。
STDAPI DllInstall(BOOL bInstall, LPCWSTR pszCmdLine)
{
	HRESULT hr = E_FAIL;
	static const wchar_t szUserSwitch[] = _T("使用者");

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
