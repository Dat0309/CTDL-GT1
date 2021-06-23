// [!output DOCUMENT_IMPL_FILENAME_TRIMMED] : Implementation of the [!output DOCUMENT_CLASS_NAME_TRIMMED] class

#include "stdafx.h"
#include <propkey.h>
#include "[!output DOCUMENT_HEADER_FILENAME_TRIMMED]"

HRESULT [!output DOCUMENT_CLASS_NAME_TRIMMED]::LoadFromStream(IStream* pStream, DWORD grfMode)
{
	// Load from stream your document data
	UNREFERENCED_PARAMETER(pStream);
	UNREFERENCED_PARAMETER(grfMode);
	return S_OK;
}

void [!output DOCUMENT_CLASS_NAME_TRIMMED]::InitializeSearchContent()
{
	// initialise search content from document's data as the following value
	CString value = _T("test;content;");
	SetSearchContent(value);
}

void [!output DOCUMENT_CLASS_NAME_TRIMMED]::SetSearchContent(CString& value)
{
	// Assigns search content to PKEY_Search_Contents key
	if (value.IsEmpty())
	{
		RemoveChunk(PKEY_Search_Contents.fmtid, PKEY_Search_Contents.pid);
	}
	else
	{
		CFilterChunkValueImpl *pChunk = NULL;
		ATLTRY(pChunk = new CFilterChunkValueImpl);
		if (pChunk != NULL)
		{
			pChunk->SetTextValue(PKEY_Search_Contents, value, CHUNK_TEXT);
			SetChunkValue(pChunk);
		}
	}
}

void [!output DOCUMENT_CLASS_NAME_TRIMMED]::OnDrawThumbnail(HDC hDrawDC, LPRECT lprcBounds)
{
	HBRUSH hDrawBrush = CreateSolidBrush(RGB(255, 255, 255));
	FillRect(hDrawDC, lprcBounds, hDrawBrush);

	HFONT hStockFont = (HFONT) GetStockObject(DEFAULT_GUI_FONT);
	LOGFONT lf;

	GetObject(hStockFont, sizeof(LOGFONT), &lf);
	lf.lfHeight = 34;

	HFONT hDrawFont = CreateFontIndirect(&lf);
	HFONT hOldFont = (HFONT) SelectObject(hDrawDC, hDrawFont);

	CString strText = _T("TODO: implement thumbnail drawing here");
	DrawText(hDrawDC, strText, strText.GetLength(), lprcBounds, DT_CENTER | DT_WORDBREAK);

	SelectObject(hDrawDC, hDrawFont);
	SelectObject(hDrawDC, hOldFont);

	DeleteObject(hDrawBrush);
	DeleteObject(hDrawFont);
}
