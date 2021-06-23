// [!output HEADER_FILE] : Declaration of the [!output CLASS_NAME]

#pragma once

#include "resource.h"       // main symbols
#include <asptlb.h>         // Active Server Pages Definitions

[!if !ATTRIBUTED]
#include "[!output MIDL_H_FILENAME]"
[!if CONNECTION_POINTS]
#include "[!output PROJECT_NAME]CP.h"
[!endif]
[!endif]

using namespace ATL;

[!if ATTRIBUTED]

// [!output INTERFACE_NAME]
[
	object,
	uuid("[!output INTERFACE_IID]"),
	dual,
[!if AUTOMATION]
	nonextensible,
[!endif]	
	pointer_default(unique)
]
__interface [!output INTERFACE_NAME] : IDispatch
{
[!if ON_START_PAGE]
	//Standard Server Side Component Methods
	[id(1)] HRESULT OnStartPage([in] IUnknown* piUnk);
	[id(2)] HRESULT OnEndPage();
[!endif]
};

[!if CONNECTION_POINTS]

// _[!output INTERFACE_NAME]Events
[
	dispinterface,
	uuid("[!output CONNECTION_POINT_IID]")
]
__interface _[!output INTERFACE_NAME]Events
{
};
[!endif]
[!endif]


// [!output CLASS_NAME]

[!if ATTRIBUTED]
[
	coclass,
	default([!output INTERFACE_NAME][!if CONNECTION_POINTS], _[!output INTERFACE_NAME]Events[!endif]),
[!if THREADING_SINGLE]
	threading(single),
[!endif]
[!if THREADING_APARTMENT]
	threading(apartment),
[!endif]
[!if THREADING_BOTH]
	threading(both),
[!endif]
[!if THREADING_FREE]
	threading(free),
[!endif]
[!if THREADING_NEUTRAL]
	threading(neutral),
[!endif]
[!if SUPPORT_ERROR_INFO]
	support_error_info("[!output INTERFACE_NAME]"),
[!endif]
[!if CONNECTION_POINTS]
	event_source(com),
[!endif]
[!if AGGREGATION_NO]
	aggregatable(never),
[!endif]
[!if AGGREGATION_ONLY]
	aggregatable(always),
[!endif]
[!if PROGID_VALID]
	vi_progid("[!output VERSION_INDEPENDENT_PROGID]"),
	progid("[!output PROGID]"),
[!endif]
	version(1.0),
	uuid("[!output CLSID_REGISTRY_FORMAT]")	
]
[!endif]
class ATL_NO_VTABLE [!output CLASS_NAME] :
[!if ATTRIBUTED]
	public [!output INTERFACE_NAME]
[!else]
[!if THREADING_SINGLE]
	public CComObjectRootEx<CComSingleThreadModel>,
[!endif]
[!if THREADING_APARTMENT]
	public CComObjectRootEx<CComSingleThreadModel>,
[!endif]
[!if THREADING_FREE]
	public CComObjectRootEx<CComMultiThreadModel>,
[!endif]
[!if THREADING_BOTH]
	public CComObjectRootEx<CComMultiThreadModel>,
[!endif]
[!if THREADING_NEUTRAL]
	public CComObjectRootEx<CComMultiThreadModel>,
[!endif]
	public CComCoClass<[!output CLASS_NAME], &CLSID_[!output COCLASS]>,
[!if SUPPORT_ERROR_INFO]
	public ISupportErrorInfo,
[!endif]
[!if CONNECTION_POINTS]
	public IConnectionPointContainerImpl<[!output CLASS_NAME]>,
	public CProxy_[!output INTERFACE_NAME]Events<[!output CLASS_NAME]>,
[!endif]
	public IDispatchImpl<[!output INTERFACE_NAME], &IID_[!output INTERFACE_NAME], &LIBID_[!output LIB_NAME], /*wMajor =*/ [!output TYPELIB_VERSION_MAJOR], /*wMinor =*/ [!output TYPELIB_VERSION_MINOR]>
[!endif]
{
public:
	[!output CLASS_NAME]()
	{
[!if FREE_THREADED_MARSHALER]
		m_pUnkMarshaler = NULL;
[!endif]
[!if ON_START_PAGE]
		m_bOnStartPageCalled = FALSE;
[!endif]
	}

[!if !ATTRIBUTED]
DECLARE_REGISTRY_RESOURCEID([!output RGS_ID])

[!if AGGREGATION_NO]
DECLARE_NOT_AGGREGATABLE([!output CLASS_NAME])
[!endif]
[!if AGGREGATION_ONLY]
DECLARE_ONLY_AGGREGATABLE([!output CLASS_NAME])
[!endif]

BEGIN_COM_MAP([!output CLASS_NAME])
	COM_INTERFACE_ENTRY([!output INTERFACE_NAME])
	COM_INTERFACE_ENTRY(IDispatch)
[!if SUPPORT_ERROR_INFO]
	COM_INTERFACE_ENTRY(ISupportErrorInfo)
[!endif]
[!if CONNECTION_POINTS]
	COM_INTERFACE_ENTRY(IConnectionPointContainer)
[!endif]
[!if FREE_THREADED_MARSHALER]
	COM_INTERFACE_ENTRY_AGGREGATE(IID_IMarshal, m_pUnkMarshaler.p)
[!endif]
END_COM_MAP()

[!if CONNECTION_POINTS]
BEGIN_CONNECTION_POINT_MAP([!output CLASS_NAME])
	CONNECTION_POINT_ENTRY(__uuidof(_[!output INTERFACE_NAME]Events))
END_CONNECTION_POINT_MAP()
[!endif]
[!if SUPPORT_ERROR_INFO]
// ISupportsErrorInfo
	STDMETHOD(InterfaceSupportsErrorInfo)(REFIID riid);
[!endif]
[!else]
[!if CONNECTION_POINTS]
	__event __interface _[!output INTERFACE_NAME]Events;
[!endif]
[!endif]
[!if FREE_THREADED_MARSHALER]

	DECLARE_PROTECT_FINAL_CONSTRUCT()
	DECLARE_GET_CONTROLLING_UNKNOWN()

	HRESULT FinalConstruct()
	{
		return CoCreateFreeThreadedMarshaler(
			GetControllingUnknown(), &m_pUnkMarshaler.p);
	}

	void FinalRelease()
	{
		m_pUnkMarshaler.Release();
	}

	CComPtr<IUnknown> m_pUnkMarshaler;
[!else]

	DECLARE_PROTECT_FINAL_CONSTRUCT()

	HRESULT FinalConstruct()
	{
		return S_OK;
	}

	void FinalRelease()
	{
	}
[!endif]

// [!output INTERFACE_NAME]
public:
[!if ON_START_PAGE]
	//Active Server Pages Methods
	STDMETHOD(OnStartPage)(IUnknown* IUnk);
	STDMETHOD(OnEndPage)();
private:
[!if REQUEST]
	CComPtr<IRequest> m_piRequest;					//Request Object
[!endif]
[!if RESPONSE]
	CComPtr<IResponse> m_piResponse;				//Response Object
[!endif]
[!if SESSION]
	CComPtr<ISessionObject> m_piSession;			//Session Object
[!endif]
[!if SERVER]
	CComPtr<IServer> m_piServer;					//Server Object
[!endif]
[!if APPLICATION]
	CComPtr<IApplicationObject> m_piApplication;	//Application Object
[!endif]
	BOOL m_bOnStartPageCalled;						//OnStartPage successful?
[!endif]
};

[!if !ATTRIBUTED]
OBJECT_ENTRY_AUTO(__uuidof([!output COCLASS]), [!output CLASS_NAME])
[!endif]
