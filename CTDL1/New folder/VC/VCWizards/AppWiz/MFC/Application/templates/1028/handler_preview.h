// PreviewHandler.h : 預覽處理常式的宣告

#pragma once
#include "resource.h"       // 主要符號

#include <atlhandler.h>
#include <atlhandlerimpl.h>
#include <afxext.h>
#include "..\[!output BASE_PROJECT_NAME]\[!output DOC_HEADER]"
#include "..\[!output BASE_PROJECT_NAME]\[!output VIEW_HEADER]"
#include "[!output SAFE_IDL_NAME]_i.h"

using namespace ATL;

// CPreviewHandler

class ATL_NO_VTABLE CPreviewHandler :
	public CComObjectRootEx<CComSingleThreadModel>,
	public CComCoClass<CPreviewHandler, &CLSID_Preview>,
	public CPreviewHandlerImpl <CPreviewHandler>
{
public:
	CPreviewHandler()
	{
	}

DECLARE_REGISTRY_RESOURCEID(IDR_PREVIEW_HANDLER)
DECLARE_NOT_AGGREGATABLE(CPreviewHandler)

BEGIN_COM_MAP(CPreviewHandler)
	COM_INTERFACE_ENTRY(IObjectWithSite)
	COM_INTERFACE_ENTRY(IOleWindow)
	COM_INTERFACE_ENTRY(IInitializeWithStream)
	COM_INTERFACE_ENTRY(IPreviewHandler)
	COM_INTERFACE_ENTRY(IPreviewHandlerVisuals)
END_COM_MAP()

	DECLARE_PROTECT_FINAL_CONSTRUCT()

	HRESULT FinalConstruct()
	{
		return S_OK;
	}

	void FinalRelease()
	{
		CPreviewHandlerImpl<CPreviewHandler>::FinalRelease();
	}

protected:
	virtual IPreviewCtrl* CreatePreviewControl()
	{
		// 在這裡建立您的預覽控制項
		CMFCPreviewCtrlImpl *pPreviewCtrl = NULL;
		ATLTRY(pPreviewCtrl = new CMFCPreviewCtrlImpl());
		return pPreviewCtrl;
	}

	DECLARE_DOCUMENT([!output DOC_CLASS])

public:
	virtual HRESULT InitializeDocumentPreview(HWND hWndParent, RECT* prc)
	{
		m_pPreviewCtrl = CreatePreviewControl();
		CMFCPreviewCtrlImpl* pCtrl = DYNAMIC_DOWNCAST(CMFCPreviewCtrlImpl, (CObject*) m_pPreviewCtrl);
		if (pCtrl == NULL)
		{
			ATLTRACE2(atlTraceGeneral, 4, L"InitializeDocumentPreview: 預覽控制項的指標為 NULL。\n");
			return E_POINTER;
		}

		ASSERT_VALID(pCtrl);

		CCreateContext ctx;
		ctx.m_pNewViewClass = RUNTIME_CLASS([!output VIEW_CLASS]);

		m_pDocument = CreateDocument();

		if (m_pDocument == NULL) 
		{
			ATLTRACE2(atlTraceGeneral, 4, L"InitializeDocumentPreview: 文件的指標為 NULL。\n");
			return E_POINTER;
		}

		m_pDocument->AddRef();
		ctx.m_pCurrentDoc = DYNAMIC_DOWNCAST([!output DOC_CLASS], (CObject*) m_pDocument->GetContainer());

		if (!pCtrl->Create(hWndParent, prc, &ctx))
		{
			ATLTRACE2(atlTraceGeneral, 4, L"InitializeDocumentPreview:  預覽控制項建立失敗。錯誤碼:  %d\n", GetLastError());
			return E_FAIL;
		}
		return S_OK;
	}
};

OBJECT_ENTRY_AUTO(__uuidof(Preview), CPreviewHandler)
