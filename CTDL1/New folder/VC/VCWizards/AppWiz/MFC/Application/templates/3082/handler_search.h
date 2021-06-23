// FilterHandler.h: declaración del controlador de filtros

#pragma once
#include "resource.h"       // símbolos principales

#include <atlhandler.h>
#include <atlhandlerimpl.h>
#include "..\[!output BASE_PROJECT_NAME]\[!output DOC_HEADER]"
#include "[!output SAFE_IDL_NAME]_i.h"

using namespace ATL;

// CFilterHandler

class ATL_NO_VTABLE CFilterHandler :
	public CComObjectRootEx<CComMultiThreadModel>,
	public CComCoClass<CFilterHandler, &CLSID_Search>,
	public CSearchFilterImpl
{
public:
	CFilterHandler()
	{
	}

DECLARE_REGISTRY_RESOURCEID(IDR_FILTER_HANDLER)
DECLARE_NOT_AGGREGATABLE(CFilterHandler)

BEGIN_COM_MAP(CFilterHandler)
	COM_INTERFACE_ENTRY(IPersistStream)
	COM_INTERFACE_ENTRY(IPersistFile)
	COM_INTERFACE_ENTRY(IFilter)
END_COM_MAP()

	DECLARE_PROTECT_FINAL_CONSTRUCT()

	HRESULT FinalConstruct()
	{
		return S_OK;
	}

	void FinalRelease()
	{
		CSearchFilterImpl::FinalRelease();
	}

public:
	// Implementación de IPersistStream
	IFACEMETHODIMP GetClassID(CLSID* pClassID)
	{
		*pClassID = CLSID_Search;
		return S_OK;
	}

protected:
	DECLARE_DOCUMENT([!output DOC_CLASS])
};

OBJECT_ENTRY_AUTO(__uuidof(Search), CFilterHandler)
