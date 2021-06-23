// ThumbnailHandler.h : 축소판 처리기의 선언입니다.

#pragma once
#include "resource.h"       // 주 기호입니다.

#include <atlhandler.h>
#include <atlhandlerimpl.h>
#include "..\[!output BASE_PROJECT_NAME]\[!output DOC_HEADER]"
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
		if (m_pDocument == NULL)
		{
			return E_NOTIMPL;
		}

		// IDocument 파생 클래스에서 OnDrawThumbnail을 구현합니다.
		static int const nDocDimensions = 256;
		if (!m_pDocument->GetThumbnail(nDocDimensions, phbmp, pdwAlpha))
		{
			return E_FAIL;
		}

		return S_OK;
	}

	DECLARE_DOCUMENT([!output DOC_CLASS])
};

OBJECT_ENTRY_AUTO(__uuidof(Thumbnail), CThumbnailHandler)
