// [!output HEADER_FILE] : Declaration of the [!output CLASS_NAME]


#pragma once
[!if !DEVICE]
#include "resource.h"       // main symbols
[!else]

[!if STANDARDSHELL_UI_MODEL]
#ifdef STANDARDSHELL_UI_MODEL
#include "resource.h"
#endif
[!endif]

[!if POCKETPC2003_UI_MODEL]
#ifdef POCKETPC2003_UI_MODEL
#include "resourceppc.h"
#endif
[!endif]

[!if SMARTPHONE2003_UI_MODEL]
#ifdef SMARTPHONE2003_UI_MODEL
#include "resourcesp.h"
#endif
[!endif]

[!if AYGSHELL_UI_MODEL]
#ifdef AYGSHELL_UI_MODEL
#include "resourceayg.h"
#endif
[!endif]

[!endif]


[!if !ATTRIBUTED]
#include "[!output MIDL_H_FILENAME]"
[!endif]

using namespace ATL;

// [!output CLASS_NAME]

[!if ATTRIBUTED]
[
	coclass,
	default(IUnknown),
[!if THREADING_SINGLE]
	threading(single),
[!endif]
[!if THREADING_APARTMENT]
	threading(apartment),
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
[!if !ATTRIBUTED]
[!if THREADING_SINGLE]
	public CComObjectRootEx<CComSingleThreadModel>,
[!endif]
[!if THREADING_APARTMENT]
	public CComObjectRootEx<CComSingleThreadModel>,
[!endif]
	public CComCoClass<[!output CLASS_NAME], &CLSID_[!output COCLASS]>,
[!endif]
	public IPropertyPageImpl<[!output CLASS_NAME]>,
	public ATL::CDialogImpl<[!output CLASS_NAME]>
{
public:
	[!output CLASS_NAME]()
	{
		m_dwTitleID = [!output IDS_TITLE];
		m_dwHelpFileID = [!output IDS_HELPFILE];
		m_dwDocStringID = [!output IDS_DOCSTRING];
	}

	DECLARE_PROTECT_FINAL_CONSTRUCT()

	HRESULT FinalConstruct()
	{
		return S_OK;
	}

	void FinalRelease()
	{
	}

	enum {IDD = [!output IDD_DIALOGID]};

[!if !ATTRIBUTED]
[!if !DEVICE]
DECLARE_REGISTRY_RESOURCEID([!output RGS_ID])
[!else]
[!if SUPPORT_NON_DCOM]
#ifndef _CE_DCOM
DECLARE_REGISTRY_RESOURCEID([!output RGS_ID])
#endif
[!endif]
[!if SUPPORT_DCOM]
#ifdef _CE_DCOM
DECLARE_REGISTRY_RESOURCEID([!output RGSDCOM_ID])
#endif
[!endif]
[!endif]

[!if AGGREGATION_NO]
DECLARE_NOT_AGGREGATABLE([!output CLASS_NAME])
[!endif]
[!if AGGREGATION_ONLY]
DECLARE_ONLY_AGGREGATABLE([!output CLASS_NAME])
[!endif]

BEGIN_COM_MAP([!output CLASS_NAME])
	COM_INTERFACE_ENTRY(IPropertyPage)
END_COM_MAP()
[!endif]

BEGIN_MSG_MAP([!output CLASS_NAME])
	CHAIN_MSG_MAP(IPropertyPageImpl<[!output CLASS_NAME]>)
END_MSG_MAP()

// Handler prototypes:
//  LRESULT MessageHandler(UINT uMsg, WPARAM wParam, LPARAM lParam, BOOL& bHandled);
//  LRESULT CommandHandler(WORD wNotifyCode, WORD wID, HWND hWndCtl, BOOL& bHandled);
//  LRESULT NotifyHandler(int idCtrl, LPNMHDR pnmh, BOOL& bHandled);

	STDMETHOD(Apply)(void)
	{
		ATLTRACE(_T("[!output CLASS_NAME]::Apply\n"));
		for (UINT i = 0; i < m_nObjects; i++)
		{
			// Do something interesting here
			// ICircCtl* pCirc;
			// m_ppUnk[i]->QueryInterface(IID_ICircCtl, (void**)&pCirc);
			// pCirc->put_Caption(CComBSTR("something special"));
			// pCirc->Release();
		}
		m_bDirty = FALSE;
		return S_OK;
	}
};


[!if !ATTRIBUTED]
OBJECT_ENTRY_AUTO(__uuidof([!output COCLASS]), [!output CLASS_NAME])
[!endif]
