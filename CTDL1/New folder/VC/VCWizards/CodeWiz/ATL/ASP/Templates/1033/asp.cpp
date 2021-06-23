// [!output IMPL_FILE] : Implementation of [!output CLASS_NAME]

#include "stdafx.h"
#include "[!output HEADER_FILE]"


// [!output CLASS_NAME]

[!if !ATTRIBUTED]
[!if SUPPORT_ERROR_INFO]
STDMETHODIMP [!output CLASS_NAME]::InterfaceSupportsErrorInfo(REFIID riid)
{
	static const IID* const arr[] = 
	{
		&IID_[!output INTERFACE_NAME]
	};

	for (int i=0; i < sizeof(arr) / sizeof(arr[0]); i++)
	{
		if (InlineIsEqualGUID(*arr[i],riid))
			return S_OK;
	}
	return S_FALSE;
}
[!endif]
[!endif]

[!if ON_START_PAGE]
STDMETHODIMP [!output CLASS_NAME]::OnStartPage (IUnknown* pUnk)  
{
	if(!pUnk)
		return E_POINTER;

	CComPtr<IScriptingContext> spContext;
	HRESULT hr;

	// Get the IScriptingContext Interface
	hr = pUnk->QueryInterface(__uuidof(IScriptingContext), (void **)&spContext);
	if(FAILED(hr))
		return hr;

[!if REQUEST]
	// Get Request Object Pointer
	hr = spContext->get_Request(&m_piRequest);
	if(FAILED(hr))
	{
		return hr;
	}
[!endif]

[!if RESPONSE]
	// Get Response Object Pointer
	hr = spContext->get_Response(&m_piResponse);
	if(FAILED(hr))
	{
[!if REQUEST]
		m_piRequest.Release();
[!endif]
		return hr;
	}
[!endif]
	
[!if SERVER]
	// Get Server Object Pointer
	hr = spContext->get_Server(&m_piServer);
	if(FAILED(hr))
	{
[!if REQUEST]
		m_piRequest.Release();
[!endif]
[!if RESPONSE]
		m_piResponse.Release();
[!endif]
		return hr;
	}
[!endif]
	
[!if SESSION]
	// Get Session Object Pointer
	hr = spContext->get_Session(&m_piSession);
	if(FAILED(hr))
	{
[!if REQUEST]
		m_piRequest.Release();
[!endif]
[!if RESPONSE]
		m_piResponse.Release();
[!endif]
[!if SERVER]
		m_piServer.Release();
[!endif]
		return hr;
	}
[!endif]

[!if APPLICATION]
	// Get Application Object Pointer
	hr = spContext->get_Application(&m_piApplication);
	if(FAILED(hr))
	{
[!if REQUEST]
		m_piRequest.Release();
[!endif]
[!if RESPONSE]
		m_piResponse.Release();
[!endif]
[!if SERVER]
		m_piServer.Release();
[!endif]
[!if SESSION]
		m_piSession.Release();
[!endif]
		return hr;
	}
[!endif]
	m_bOnStartPageCalled = TRUE;
	return S_OK;
}

STDMETHODIMP [!output CLASS_NAME]::OnEndPage ()  
{
	m_bOnStartPageCalled = FALSE;
	// Release all interfaces
[!if REQUEST]
	m_piRequest.Release();
[!endif]
[!if RESPONSE]
	m_piResponse.Release();
[!endif]
[!if SERVER]
	m_piServer.Release();
[!endif]
[!if SESSION]
	m_piSession.Release();
[!endif]
[!if APPLICATION]
	m_piApplication.Release();
[!endif]
	return S_OK;
}
[!endif]