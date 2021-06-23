// [!output DOCUMENT_HEADER_FILENAME_TRIMMED] : Declaration of the [!output DOCUMENT_CLASS_NAME_TRIMMED] class

#pragma once

#include <atlhandlerimpl.h>

using namespace ATL;

class [!output DOCUMENT_CLASS_NAME_TRIMMED] : public CAtlDocumentImpl
{
public:
	[!output DOCUMENT_CLASS_NAME_TRIMMED](void)
	{
	}

	virtual ~[!output DOCUMENT_CLASS_NAME_TRIMMED](void)
	{
	}

	virtual HRESULT LoadFromStream(IStream* pStream, DWORD grfMode);
	virtual void InitializeSearchContent();

protected:
	void SetSearchContent(CString& value);
	virtual void OnDrawThumbnail(HDC hDrawDC, LPRECT lprcBounds);
};
