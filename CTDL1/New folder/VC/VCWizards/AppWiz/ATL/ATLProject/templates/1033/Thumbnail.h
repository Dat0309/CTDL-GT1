// ThumbnailHandler.h : Declaration of the thumbnail handler

#pragma once
#include "resource.h"       // main symbols

[!if !SUPPORT_MFC]
#define AFX_PREVIEW_STANDALONE
[!endif]
#include <atlhandler.h>
#include <atlhandlerimpl.h>
#include "[!output DOCUMENT_HEADER_FILENAME_TRIMMED]"

#include "[!output SAFE_IDL_NAME]_i.h"

using namespace ATL;

// CThumbnailHandler

class ATL_NO_VTABLE CThumbnailHandler :
	public CComObjectRootEx<CComSingleThreadModel>,
	public CComCoClass<CThumbnailHandler, &CLSID_Thumbnail>,
	public CThumbnailProviderImpl
{
public:
	CThumbnailHandler()
	{
	}

DECLARE_REGISTRY_RESOURCEID(IDR_THUMBNAIL_HANDLER)
DECLARE_NOT_AGGREGATABLE(CThumbnailHandler)

BEGIN_COM_MAP(CThumbnailHandler)
	COM_INTERFACE_ENTRY(IInitializeWithStream)
	COM_INTERFACE_ENTRY(IThumbnailProvider)
END_COM_MAP()

	DECLARE_PROTECT_FINAL_CONSTRUCT()

	HRESULT FinalConstruct()
	{
		return S_OK;
	}

	void FinalRelease()
	{
		CThumbnailProviderImpl::FinalRelease();
	}

protected:
	virtual HRESULT GetBitmap(UINT cx, HBITMAP *phbmp, WTS_ALPHATYPE *pdwAlpha)
	{
[!if DOCUMENT_CLASS_NAME_SPECIFIED]
		if (m_pDocument == NULL)
		{
			return E_NOTIMPL;
		}

		// Implement OnDrawThumbnail in IDocument derived class
		static int const nDocDimensions = 256;
		if (!m_pDocument->GetThumbnail(nDocDimensions, phbmp, pdwAlpha))
		{
			return E_FAIL;
		}
[!else]
		// modify this code and create a bitmap from document's data
		static int const nDocDimensions = 256;
[!if SUPPORT_MFC]
		HDC hdc = ::GetDC(NULL);
		CDC* pDC = CDC::FromHandle(hdc);
		CDC dc;
		CDC* pDrawDC = pDC;
		CBitmap* pOldBitmap = NULL;
		CBitmap bitmap;

		// Here you need  to calculate document area to be displayed on the Live Icon
		CRect rectDocBounds = CRect(0, 0, nDocDimensions, nDocDimensions);

		if (dc.CreateCompatibleDC(pDC))
		{
			if (bitmap.CreateCompatibleBitmap(pDC, rectDocBounds.Width(), rectDocBounds.Height()))
			{
				pDrawDC = &dc;
				pOldBitmap = dc.SelectObject(&bitmap);
			}
		}
		else
		{
			::ReleaseDC(NULL, hdc);
			return E_FAIL;
		}

		dc.SelectObject(&bitmap);

		// Here you need to draw the document's data
		pDrawDC->FillSolidRect(rectDocBounds, RGB (255, 255, 255));
		CString strText = _T("TODO: implement thumbnail drawing here");

		LOGFONT lf;

		CFont* pDefaultGUIFont = CFont::FromHandle((HFONT)GetStockObject(DEFAULT_GUI_FONT));
		pDefaultGUIFont->GetLogFont(&lf);
		lf.lfHeight = 36;

		CFont fontDraw;
		fontDraw.CreateFontIndirect(&lf);

		CFont* pOldFont = pDrawDC->SelectObject(&fontDraw);
		pDrawDC->DrawText(strText, rectDocBounds, DT_CENTER | DT_WORDBREAK);
		pDrawDC->SelectObject(pOldFont);

		if (pDrawDC != pDC)
		{
			dc.SelectObject(pOldBitmap);
		}

		::ReleaseDC (NULL, hdc);
		*phbmp = (HBITMAP)bitmap.Detach ();
[!else]
		HDC hdc = ::GetDC(NULL);
		RECT rcBounds;

		SetRect(&rcBounds, 0, 0, nDocDimensions, nDocDimensions);

		HDC hDrawDC = CreateCompatibleDC(hdc);
		if (hDrawDC == NULL)
		{
			ReleaseDC(NULL, hdc);
			return E_FAIL;
		}

		HBITMAP hBmp = CreateCompatibleBitmap(hDrawDC, nDocDimensions, nDocDimensions);
		if (hBmp == NULL)
		{
			ReleaseDC(NULL, hdc);
			DeleteDC(hDrawDC);
			return E_FAIL;
		}

		HBITMAP hOldBitmap = (HBITMAP) SelectObject(hDrawDC, hBmp);

		// Here you need to draw the document's data
		HBRUSH hDrawBrush = CreateSolidBrush(RGB(255, 255, 255));
		FillRect(hDrawDC, &rcBounds, hDrawBrush);
		

		HFONT hStockFont = (HFONT) GetStockObject(DEFAULT_GUI_FONT);
		LOGFONT lf;

		GetObject(hStockFont, sizeof(LOGFONT), &lf);
		lf.lfHeight = 34;

		HFONT hDrawFont = CreateFontIndirect(&lf);
		HFONT hOldFont = (HFONT) SelectObject(hDrawDC, hDrawFont);

		CString strText = _T("TODO: implement thumbnail drawing here");
		DrawText(hDrawDC, strText, strText.GetLength(), &rcBounds, DT_CENTER | DT_WORDBREAK);

		SelectObject(hDrawDC, hDrawFont);
		SelectObject(hDrawDC, hOldFont);
		SelectObject(hDrawDC, hOldBitmap);

		DeleteObject(hDrawBrush);
		DeleteObject(hDrawFont);
		DeleteDC(hDrawDC);
		ReleaseDC(NULL, hdc);

		*phbmp = hBmp;
[!endif]
[!endif]

		return S_OK;
	}

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
};

OBJECT_ENTRY_AUTO(__uuidof(Thumbnail), CThumbnailHandler)
