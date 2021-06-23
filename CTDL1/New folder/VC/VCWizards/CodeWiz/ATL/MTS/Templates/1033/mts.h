// [!output HEADER_FILE] : Declaration of the [!output CLASS_NAME]

#pragma once
[!if !ATTRIBUTED]
#include "[!output MIDL_H_FILENAME]"
[!endif]
#include "resource.h"       // main symbols
#include <comsvcs.h>
[!if TRANSACTION_SUPPORT]
#include <mtxattr.h>
[!else]
[!if QUEUEABLE]
#include <mtxattr.h>
[!endif]
[!endif]

using namespace ATL;

[!if ATTRIBUTED]

// [!output INTERFACE_NAME]
[
	object,
	uuid("[!output INTERFACE_IID]"),
[!if INTERFACE_DUAL]	
	dual,
[!endif]
[!if AUTOMATION]	
	oleautomation,
[!endif]
[!if INTERFACE_DUAL]
[!if AUTOMATION]	
	nonextensible,
[!endif]
[!endif]
[!if QUEUEABLE]
	custom(TLBATTR_QUEUEABLE, 0),
[!endif]	
	pointer_default(unique)
]
__interface [!output INTERFACE_NAME] : [!if INTERFACE_DUAL]IDispatch[!else]IUnknown[!endif]

{
};
[!endif]


// [!output CLASS_NAME]

[!if ATTRIBUTED]
[
	coclass,
	default([!output INTERFACE_NAME]),
[!if OBJECT_CONTROL]
	threading(free),
[!else]
	threading(single),
	aggregatable(never),
[!endif]
[!if SUPPORT_ERROR_INFO]
	support_error_info("[!output INTERFACE_NAME]"),
[!endif]
[!if PROGID_VALID]
	vi_progid("[!output VERSION_INDEPENDENT_PROGID]"),
	progid("[!output PROGID]"),
[!endif]
	uuid("[!output CLSID_REGISTRY_FORMAT]"),
[!if TRANSACTION_SUPPORT]
	[!output TRANSACTION_TYPE],
[!endif]
	version(1.0)
]
[!endif]
class ATL_NO_VTABLE [!output CLASS_NAME] :
[!if ATTRIBUTED]
[!if OBJECT_CONTROL]
	public IObjectControl,
[!endif]
[!if OBJECT_CONSTRUCT]
	public IObjectConstruct,
[!endif]
	public [!output INTERFACE_NAME]
[!else]
[!if OBJECT_CONTROL]
	public CComObjectRootEx<CComMultiThreadModel>,
	public IObjectControl,
[!else]
	public CComObjectRootEx<CComSingleThreadModel>,
[!endif]
[!if OBJECT_CONSTRUCT]
	public IObjectConstruct,
[!endif]
	public CComCoClass<[!output CLASS_NAME], &CLSID_[!output COCLASS]>,
[!if INTERFACE_DUAL]
	public IDispatchImpl<[!output INTERFACE_NAME], &IID_[!output INTERFACE_NAME], &LIBID_[!output LIB_NAME], /*wMajor =*/ [!output TYPELIB_VERSION_MAJOR], /*wMinor =*/ [!output TYPELIB_VERSION_MINOR]>
[!else]
	public [!output INTERFACE_NAME]
[!endif]
[!endif]
{
public:
	[!output CLASS_NAME]()
	{
	}

	DECLARE_PROTECT_FINAL_CONSTRUCT()

	HRESULT FinalConstruct()
	{
		return S_OK;
	}

	void FinalRelease()
	{
	}
[!if !ATTRIBUTED]

DECLARE_REGISTRY_RESOURCEID([!output RGS_ID])
[!if !OBJECT_CONTROL]

DECLARE_NOT_AGGREGATABLE([!output CLASS_NAME])
[!endif]

BEGIN_COM_MAP([!output CLASS_NAME])
	COM_INTERFACE_ENTRY([!output INTERFACE_NAME])
[!if OBJECT_CONTROL]
	COM_INTERFACE_ENTRY(IObjectControl)
[!endif]
[!if OBJECT_CONSTRUCT]
	COM_INTERFACE_ENTRY(IObjectConstruct)
[!endif]
[!if INTERFACE_DUAL]
	COM_INTERFACE_ENTRY(IDispatch)
[!endif]
END_COM_MAP()

[!if SUPPORT_ERROR_INFO]
// ISupportsErrorInfo
	STDMETHOD(InterfaceSupportsErrorInfo)(REFIID riid)
	{
		static const IID* const arr[] =
		{
			&IID_[!output INTERFACE_NAME]
		};
		for (int i = 0; i < sizeof(arr) / sizeof(arr[0]); i++)
		{
			if (InlineIsEqualGUID(*arr[i], riid))
				return S_OK;
		}
		return S_FALSE;
	}

[!endif]
[!endif]

[!if OBJECT_CONTROL]

// IObjectControl
public:
	STDMETHOD(Activate)();
	STDMETHOD_(BOOL, CanBePooled)();
	STDMETHOD_(void, Deactivate)();

	CComPtr<IObjectContext> m_spObjectContext;
[!endif]

[!if OBJECT_CONSTRUCT]
	STDMETHOD(Construct)(IDispatch * pCtorObj)
	{
		CComPtr<IObjectConstructString> spObjectConstructString;
		HRESULT hr = pCtorObj->QueryInterface(&spObjectConstructString);
		if (SUCCEEDED(hr))
		{
			CComBSTR bstrConstruct;
			hr = spObjectConstructString->get_ConstructString(&bstrConstruct);
			if (SUCCEEDED(hr))
			{
				// TODO : Use the string to construct the object.
			}
		}
		return hr;
	}
[!endif]

// [!output INTERFACE_NAME]
public:
};

[!if !ATTRIBUTED]
OBJECT_ENTRY_AUTO(__uuidof([!output COCLASS]), [!output CLASS_NAME])
[!endif]
