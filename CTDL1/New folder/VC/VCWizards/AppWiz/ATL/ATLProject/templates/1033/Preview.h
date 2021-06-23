// PreviewHandler.h : Declaration of the preview handler

#pragma once
#include "resource.h"       // main symbols

[!if !SUPPORT_MFC || GENERATE_ATL_DOCUMENT]
#define AFX_PREVIEW_STANDALONE
[!endif]
#include <atlhandler.h>
#include <atlhandlerimpl.h>
[!if SUPPORT_MFC && !GENERATE_ATL_DOCUMENT]
#include <afxext.h>
[!endif]
#include "[!output DOCUMENT_HEADER_FILENAME_TRIMMED]"
[!if PREVIEW_HANDLER && VIEW_HEADER_FILENAME_SPECIFIED]
#include "[!output VIEW_HEADER_FILENAME_TRIMMED]"
[!endif]
[!if !SUPPORT_MFC || GENERATE_ATL_DOCUMENT]
#include <atlpreviewctrlimpl.h>
[!endif]

#include "[!output SAFE_IDL_NAME]_i.h"

using namespace ATL;

[!if PREVIEW_HANDLER && !VIEW_CLASS_NAME_SPECIFIED]
// CPreviewCtrl implementation
[!if SUPPORT_MFC && !GENERATE_ATL_DOCUMENT]
class CPreviewCtrl : public IPreviewCtrl
{
protected:
	virtual void DoPaint(CPaintDC* pDC)
	{
		// you can obtain a pointer to IDocument as follows, if CMyDoc is derived from CDocument
		// CMyDoc* pDoc = (CMyDoc*)m_pDocument->GetContainer();

		CRect rectClient;
		GetClientRect(rectClient);
		pDC->FillSolidRect(rectClient, m_clrBackColor);

		CString strData = _T("Draw Rich Preview content here.");
		pDC->TextOut(10, 20, strData, strData.GetLength());
	}
};
[!else]
class CPreviewCtrl : public CAtlPreviewCtrlImpl
{
protected:
	virtual void DoPaint(HDC hdc)
	{
		// you can obtain a pointer to IDocument as follows
		// CMyDoc* pDoc = (CMyDoc*)m_pDocument;
		CString strData = _T("Draw Rich Preview content here.");
		TextOut(hdc, 10, 20, strData, strData.GetLength());
	}
};
[!endif]
[!endif]

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
[!if !VIEW_CLASS_NAME_SPECIFIED]
	virtual IPreviewCtrl* CreatePreviewControl()
	{
		// This class is defined at the beginning of this header
		CPreviewCtrl *pPreviewCtrl = NULL;
		ATLTRY(pPreviewCtrl = new CPreviewCtrl());
		return pPreviewCtrl;
	}
[!else]
[!if SUPPORT_MFC]
	virtual IPreviewCtrl* CreatePreviewControl()
	{
		// create your preview control here
		CMFCPreviewCtrlImpl *pPreviewCtrl = NULL;
		ATLTRY(pPreviewCtrl = new CMFCPreviewCtrlImpl());
		return pPreviewCtrl;
	}
[!else]
	virtual IPreviewCtrl* CreatePreviewControl()
	{
		// derive a class from IPreviewCtrl and instantiate it here
		return NULL;
	}
[!endif]
[!endif]

[!if SUPPORT_MFC && !GENERATE_ATL_DOCUMENT]
	DECLARE_DOCUMENT([!output DOCUMENT_CLASS_NAME_TRIMMED])
[!else]
	virtual IDocument* CreateDocument()
	{
		[!output DOCUMENT_CLASS_NAME_TRIMMED] *pDocument = NULL;
		ATLTRY(pDocument = new [!output DOCUMENT_CLASS_NAME_TRIMMED]());
		return pDocument;
	}
[!endif]

[!if PREVIEW_HANDLER && VIEW_CLASS_NAME_SPECIFIED && DOCUMENT_CLASS_NAME_SPECIFIED && SUPPORT_MFC]
public:
	virtual HRESULT InitializeDocumentPreview(HWND hWndParent, RECT* prc)
	{
		m_pPreviewCtrl = CreatePreviewControl();
		CMFCPreviewCtrlImpl* pCtrl = DYNAMIC_DOWNCAST(CMFCPreviewCtrlImpl, (CObject*) m_pPreviewCtrl);
		if (pCtrl == NULL)
		{
			ATLTRACE2(atlTraceGeneral, 4, L"InitializeDocumentPreview: pointer to preview control is NULL.\n");
			return E_POINTER;
		}

		ASSERT_VALID(pCtrl);

		CCreateContext ctx;
		ctx.m_pNewViewClass = RUNTIME_CLASS([!output VIEW_CLASS_NAME_TRIMMED]);

		m_pDocument = CreateDocument();

		if (m_pDocument == NULL) 
		{
			ATLTRACE2(atlTraceGeneral, 4, L"InitializeDocumentPreview: pointer to document is NULL.\n");
			return E_POINTER;
		}

		m_pDocument->AddRef();
		ctx.m_pCurrentDoc = DYNAMIC_DOWNCAST([!output DOCUMENT_CLASS_NAME_TRIMMED], (CObject*) m_pDocument->GetContainer());

		if (!pCtrl->Create(hWndParent, prc, &ctx))
		{
			ATLTRACE2(atlTraceGeneral, 4, L"InitializeDocumentPreview: preview control creation failed. Error Code: %d\n", GetLastError());
			return E_FAIL;
		}
		return S_OK;
	}
[!endif]
};

OBJECT_ENTRY_AUTO(__uuidof(Preview), CPreviewHandler)
