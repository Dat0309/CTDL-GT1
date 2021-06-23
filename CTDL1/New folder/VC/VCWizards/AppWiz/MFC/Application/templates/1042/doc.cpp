[!if RIBBON_TOOLBAR]
// 이 MFC 샘플 소스 코드는 MFC Microsoft Office Fluent 사용자 인터페이스("Fluent UI")를 
// 사용하는 방법을 보여 주며, MFC C++ 라이브러리 소프트웨어에 포함된 
// Microsoft Foundation Classes Reference 및 관련 전자 문서에 대해 
// 추가적으로 제공되는 내용입니다.  
// Fluent UI를 복사, 사용 또는 배포하는 데 대한 사용 약관은 별도로 제공됩니다.  
// Fluent UI 라이선싱 프로그램에 대한 자세한 내용은 
// http://go.microsoft.com/fwlink/?LinkId=238214.
//
// Copyright (C) Microsoft Corporation
// All rights reserved.
[!endif]

// [!output DOC_IMPL] : [!output DOC_CLASS] 클래스의 구현
//

#include "stdafx.h"
// SHARED_HANDLERS는 미리 보기, 축소판 그림 및 검색 필터 처리기를 구현하는 ATL 프로젝트에서 정의할 수 있으며
// 해당 프로젝트와 문서 코드를 공유하도록 해 줍니다.
#ifndef SHARED_HANDLERS
#include "[!output APP_HEADER]"
#endif

[!if OLEDB_RECORD_VIEW || ODBC_RECORD_VIEW]
#include "[!output ROWSET_HEADER]"
[!endif]
#include "[!output DOC_HEADER]"
[!if CONTAINER || CONTAINER_SERVER]
#include "[!output CONTAINER_ITEM_HEADER]"
[!endif]
[!if MINI_SERVER || FULL_SERVER || CONTAINER_SERVER]
#include "[!output SERVER_ITEM_HEADER]"
[!endif]

#include <propkey.h>

#ifdef _DEBUG
#define new DEBUG_NEW
#endif

// [!output DOC_CLASS]

IMPLEMENT_DYNCREATE([!output DOC_CLASS], [!output DOC_BASE_CLASS])

BEGIN_MESSAGE_MAP([!output DOC_CLASS], [!output DOC_BASE_CLASS])
[!if CONTAINER || CONTAINER_SERVER]
	// 기본 OLE 컨테이너 구현을 활성화합니다.
[!if !RICH_EDIT_VIEW]
	ON_UPDATE_COMMAND_UI(ID_EDIT_PASTE, &[!output DOC_BASE_CLASS]::OnUpdatePasteMenu)
	ON_UPDATE_COMMAND_UI(ID_EDIT_PASTE_LINK, &[!output DOC_BASE_CLASS]::OnUpdatePasteLinkMenu)
	ON_UPDATE_COMMAND_UI(ID_OLE_EDIT_CONVERT, &[!output DOC_BASE_CLASS]::OnUpdateObjectVerbMenu)
	ON_COMMAND(ID_OLE_EDIT_CONVERT, &[!output DOC_BASE_CLASS]::OnEditConvert)
[!endif]
	ON_UPDATE_COMMAND_UI(ID_OLE_EDIT_LINKS, &[!output DOC_BASE_CLASS]::OnUpdateEditLinksMenu)
	ON_UPDATE_COMMAND_UI(ID_OLE_VERB_POPUP, &[!output DOC_CLASS]::OnUpdateObjectVerbPopup)
	ON_COMMAND(ID_OLE_EDIT_LINKS, &[!output DOC_BASE_CLASS]::OnEditLinks)
	ON_UPDATE_COMMAND_UI_RANGE(ID_OLE_VERB_FIRST, ID_OLE_VERB_LAST, &[!output DOC_BASE_CLASS]::OnUpdateObjectVerbMenu)
[!endif]
[!if MAPI]
	ON_COMMAND(ID_FILE_SEND_MAIL, &[!output DOC_CLASS]::OnFileSendMail)
	ON_UPDATE_COMMAND_UI(ID_FILE_SEND_MAIL, &[!output DOC_CLASS]::OnUpdateFileSendMail)
[!endif]
END_MESSAGE_MAP()

[!if AUTOMATION]
BEGIN_DISPATCH_MAP([!output DOC_CLASS], [!output DOC_BASE_CLASS])
END_DISPATCH_MAP()

// 참고: IID_I[!output SAFE_PROJECT_IDENTIFIER_NAME]에 대한 지원을 추가하여
//  VBA에서 형식 안전 바인딩을 지원합니다. 
//  이 IID는 .IDL 파일에 있는 dispinterface의 GUID와 일치해야 합니다.

// {[!output DISPIID_REGISTRY_FORMAT]}
static const IID IID_I[!output SAFE_PROJECT_IDENTIFIER_NAME] =
[!output DISPIID_STATIC_CONST_GUID_FORMAT];

BEGIN_INTERFACE_MAP([!output DOC_CLASS], [!output DOC_BASE_CLASS])
	INTERFACE_PART([!output DOC_CLASS], IID_I[!output SAFE_PROJECT_IDENTIFIER_NAME], Dispatch)
END_INTERFACE_MAP()

[!endif]

// [!output DOC_CLASS] 생성/소멸

[!output DOC_CLASS]::[!output DOC_CLASS]()
{
[!if SUPPORT_COMPOUND_FILES && !COMPOUND_DOC_NONE]
	// OLE 복합 파일을 사용합니다.
	EnableCompoundFile();

[!endif]
	// TODO: 여기에 일회성 생성 코드를 추가합니다.

[!if AUTOMATION]
	EnableAutomation();

	AfxOleLockApp();
[!endif]
}

[!output DOC_CLASS]::~[!output DOC_CLASS]()
{
[!if AUTOMATION]
	AfxOleUnlockApp();
[!endif]
}

BOOL [!output DOC_CLASS]::OnNewDocument()
{
	if (![!output DOC_BASE_CLASS]::OnNewDocument())
		return FALSE;
[!if APP_TYPE_SDI]
[!if EDIT_VIEW]
	if (!m_viewList.IsEmpty())
	{
[!if PROJECT_STYLE_EXPLORER]
		POSITION pos = GetFirstViewPosition();
		GetNextView(pos);  // 트리 뷰를 건너뜁니다.
		reinterpret_cast<CEditView*>(GetNextView(pos))->SetWindowText(NULL);
[!else]
		reinterpret_cast<CEditView*>(m_viewList.GetHead())->SetWindowText(NULL);
[!endif]
	}
[!endif]
[!endif]

	// TODO: 여기에 재초기화 코드를 추가합니다.
	// SDI 문서는 이 문서를 다시 사용합니다.

	return TRUE;
}
[!if RICH_EDIT_VIEW]

[!output CONTAINER_ITEM_BASE_CLASS]* [!output DOC_CLASS]::CreateClientItem(REOBJECT* preo) const
{
	return new [!output CONTAINER_ITEM_CLASS](preo, const_cast<[!output DOC_CLASS]*>(this));
}
[!endif]
[!if MINI_SERVER || FULL_SERVER || CONTAINER_SERVER]


// [!output DOC_CLASS] 서버 구현

COleServerItem* [!output DOC_CLASS]::OnGetEmbeddedItem()
{
	// 문서와 관련된 COleServerItem을 가져오기 위해 프레임워크에서 OnGetEmbeddedItem을
	//  호출합니다.  이것은 필요할 때만 호출됩니다.

	[!output SERVER_ITEM_CLASS]* pItem = new [!output SERVER_ITEM_CLASS](this);
	ASSERT_VALID(pItem);
	return pItem;
}
[!endif]
[!if ACTIVE_DOC_SERVER]


// [!output DOC_CLASS] 액티브 문서 서버 구현

CDocObjectServer *[!output DOC_CLASS]::GetDocObjectServer(LPOLEDOCUMENTSITE pDocSite)
{
	return new CDocObjectServer(this, pDocSite);
}
[!endif]


[!if !DB_VIEW_NO_FILE && !HTML_EDITVIEW]


// [!output DOC_CLASS] serialization

void [!output DOC_CLASS]::Serialize(CArchive& ar)
{
[!if EDIT_VIEW]
	// CEditView에는 모든 serialization을 처리하는 edit 컨트롤이 들어 있습니다.
	if (!m_viewList.IsEmpty())
	{
[!if PROJECT_STYLE_EXPLORER]
		POSITION pos = GetFirstViewPosition();
		GetNextView(pos);  // 트리 뷰를 건너뜁니다.
		reinterpret_cast<CEditView*>(GetNextView(pos))->SerializeRaw(ar);
[!else]
		reinterpret_cast<CEditView*>(m_viewList.GetHead())->SerializeRaw(ar);
[!endif]
	}
#ifdef SHARED_HANDLERS

	if (m_viewList.IsEmpty() && ar.IsLoading())
	{
		CFile* pFile = ar.GetFile();
		pFile->Seek(0, FILE_BEGIN);
		ULONGLONG nFileSizeBytes = pFile->GetLength();
		ULONGLONG nFileSizeChars = nFileSizeBytes/sizeof(TCHAR);
		LPTSTR lpszText = (LPTSTR)malloc(((size_t)nFileSizeChars + 1) * sizeof(TCHAR));
		if (lpszText != NULL)
		{
			ar.Read(lpszText, (UINT)nFileSizeBytes);
			lpszText[nFileSizeChars] = '\0';
			m_strThumbnailContent = lpszText;
			m_strSearchContent = lpszText;
		}
	}
#endif
[!else]
	if (ar.IsStoring())
	{
		// TODO: 여기에 저장 코드를 추가합니다.
	}
	else
	{
		// TODO: 여기에 로딩 코드를 추가합니다.
	}
[!if CONTAINER || CONTAINER_SERVER]

	// 기본 클래스인 [!output DOC_BASE_CLASS]를 호출하면 컨테이너 문서의 COleClientItem 개체에 대한 serialization이
	//  활성화됩니다.
[!if RICH_EDIT_VIEW]
	// TODO: 텍스트로 serialize할 경우 CRichEditDoc::m_bRTF = FALSE로 설정합니다.
[!endif] 
	[!output DOC_BASE_CLASS]::Serialize(ar);
[!if ACTIVE_DOC_CONTAINER]
	// 첫째 항목을 활성화합니다.
	if (!ar.IsStoring())
	{
		POSITION posItem = GetStartPosition();
		if (posItem != NULL)
		{
			CDocItem* pItem = GetNextItem(posItem);
			POSITION posView = GetFirstViewPosition();
			COleDocObjectItem *pDocObjectItem = DYNAMIC_DOWNCAST(COleDocObjectItem, pItem);
			if (posView != NULL && pDocObjectItem != NULL)
			{
				CView* pView = GetNextView(posView);
				pDocObjectItem->DoVerb(OLEIVERB_SHOW, pView);
			}
		}
	}
[!endif]
[!endif]
[!endif]
}
[!endif]

#ifdef SHARED_HANDLERS

// 축소판 그림을 지원합니다.
void [!output DOC_CLASS]::OnDrawThumbnail(CDC& dc, LPRECT lprcBounds)
{
	// 문서의 데이터를 그리려면 이 코드를 수정하십시오.
	dc.FillSolidRect(lprcBounds, RGB(255, 255, 255));

[!if !EDIT_VIEW]
	CString strText = _T("TODO: implement thumbnail drawing here");
[!endif]
	LOGFONT lf;

	CFont* pDefaultGUIFont = CFont::FromHandle((HFONT) GetStockObject(DEFAULT_GUI_FONT));
	pDefaultGUIFont->GetLogFont(&lf);
	lf.lfHeight = 36;

	CFont fontDraw;
	fontDraw.CreateFontIndirect(&lf);

	CFont* pOldFont = dc.SelectObject(&fontDraw);
[!if !EDIT_VIEW]
	dc.DrawText(strText, lprcBounds, DT_CENTER | DT_WORDBREAK);
[!else]
	dc.DrawText(m_strThumbnailContent, lprcBounds, DT_CENTER | DT_WORDBREAK);
[!endif]
	dc.SelectObject(pOldFont);
}

// 검색 처리기를 지원합니다.
void [!output DOC_CLASS]::InitializeSearchContent()
{
[!if !EDIT_VIEW]
	CString strSearchContent;
[!endif]
	// 문서의 데이터에서 검색 콘텐츠를 설정합니다.
	// 콘텐츠 부분은 ";"로 구분되어야 합니다.
[!if !EDIT_VIEW]

	// 예: strSearchContent = _T("point;rectangle;circle;ole object;");
	SetSearchContent(strSearchContent);
[!else]

	// 전체 텍스트 파일 콘텐츠를 검색 콘텐츠로 사용합니다.
	SetSearchContent(m_strSearchContent);
[!endif]
}

void [!output DOC_CLASS]::SetSearchContent(const CString& value)
{
	if (value.IsEmpty())
	{
		RemoveChunk(PKEY_Search_Contents.fmtid, PKEY_Search_Contents.pid);
	}
	else
	{
		CMFCFilterChunkValueImpl *pChunk = NULL;
		ATLTRY(pChunk = new CMFCFilterChunkValueImpl);
		if (pChunk != NULL)
		{
			pChunk->SetTextValue(PKEY_Search_Contents, value, CHUNK_TEXT);
			SetChunkValue(pChunk);
		}
	}
}

#endif // SHARED_HANDLERS

// [!output DOC_CLASS] 진단

#ifdef _DEBUG
void [!output DOC_CLASS]::AssertValid() const
{
	[!output DOC_BASE_CLASS]::AssertValid();
}

void [!output DOC_CLASS]::Dump(CDumpContext& dc) const
{
	[!output DOC_BASE_CLASS]::Dump(dc);
}
#endif //_DEBUG


// [!output DOC_CLASS] 명령
