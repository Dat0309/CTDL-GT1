// [!output HANDLER_ATL_DOC_HEADER_FILE_TRIMMED] : Declaration of the [!output HANDLER_ATL_DOC_CLASS_NAME_TRIMMED]

#pragma once

#include <atlhandlerimpl.h>

using namespace ATL;

class [!output HANDLER_ATL_DOC_CLASS_NAME_TRIMMED] : public CAtlDocumentImpl
{
public:
	[!output HANDLER_ATL_DOC_CLASS_NAME_TRIMMED](void)
	{
	}

	virtual ~[!output HANDLER_ATL_DOC_CLASS_NAME_TRIMMED](void)
	{
	}

	virtual HRESULT LoadFromStream(IStream* pStream, DWORD grfMode);
	virtual void InitializeSearchContent();

protected:
	void SetSearchContent(CString& value);
	virtual void OnDrawThumbnail(HDC hDrawDC, LPRECT lprcBounds);
};
