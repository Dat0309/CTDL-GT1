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

// [!output VIEW_IMPL] : [!output VIEW_CLASS] 클래스의 구현
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
#include "resource.h"
[!endif]
#include "[!output VIEW_HEADER]"

#ifdef _DEBUG
#define new DEBUG_NEW
#endif


// [!output VIEW_CLASS]

IMPLEMENT_DYNCREATE([!output VIEW_CLASS], [!output VIEW_BASE_CLASS])

BEGIN_MESSAGE_MAP([!output VIEW_CLASS], [!output VIEW_BASE_CLASS])
[!if PROJECT_STYLE_EXPLORER]
[!if LIST_VIEW]
	ON_WM_STYLECHANGED()
[!endif]
[!endif]
[!if CONTAINER || CONTAINER_SERVER]
	ON_WM_DESTROY()
[!if !RICH_EDIT_VIEW]
	ON_WM_SETFOCUS()
	ON_WM_SIZE()
	ON_COMMAND(ID_OLE_INSERT_NEW, &[!output VIEW_CLASS]::OnInsertObject)
	ON_COMMAND(ID_CANCEL_EDIT_CNTR, &[!output VIEW_CLASS]::OnCancelEditCntr)
	ON_COMMAND(ID_FILE_PRINT, &[!output VIEW_CLASS]::OnFilePrint)
[!else]
[!if PRINTING]
	// 표준 인쇄 명령입니다.
	ON_COMMAND(ID_FILE_PRINT, &[!output VIEW_BASE_CLASS]::OnFilePrint)
[!endif]
[!endif]
[!else]
[!if PRINTING]
	// 표준 인쇄 명령입니다.
	ON_COMMAND(ID_FILE_PRINT, &[!output VIEW_BASE_CLASS]::OnFilePrint)
[!endif]
[!endif]
[!if MINI_SERVER || FULL_SERVER || CONTAINER_SERVER]
	ON_COMMAND(ID_CANCEL_EDIT_SRVR, &[!output VIEW_CLASS]::OnCancelEditSrvr)
[!endif]
[!if PRINTING]
[!if !HTML_VIEW && !HTML_EDITVIEW && !ACTIVE_DOC_CONTAINER]
	ON_COMMAND(ID_FILE_PRINT_DIRECT, &[!output VIEW_BASE_CLASS]::OnFilePrint)
[!if MENUBAR_TOOLBAR || RIBBON_TOOLBAR]
	ON_COMMAND(ID_FILE_PRINT_PREVIEW, &[!output VIEW_CLASS]::OnFilePrintPreview)
[!else]
	ON_COMMAND(ID_FILE_PRINT_PREVIEW, &[!output VIEW_BASE_CLASS]::OnFilePrintPreview)
[!endif]
[!endif]
[!if ACTIVE_DOC_CONTAINER]
	ON_COMMAND(ID_FILE_PRINT_DIRECT, &[!output VIEW_BASE_CLASS]::OnFilePrint)
	ON_COMMAND(ID_FILE_PRINT_PREVIEW, &[!output VIEW_CLASS]::OnFilePrintPreview)
[!if !RICH_EDIT_VIEW]
	ON_UPDATE_COMMAND_UI(ID_FILE_PRINT_PREVIEW, &OnFilePrintPreviewUIUpdate)
[!endif]
[!endif]
[!endif]
[!if MENUBAR_TOOLBAR || RIBBON_TOOLBAR]
	ON_WM_CONTEXTMENU()
	ON_WM_RBUTTONUP()
[!endif]
END_MESSAGE_MAP()

[!if HTML_EDITVIEW]
BEGIN_DHTMLEDITING_CMDMAP([!output VIEW_CLASS])
	DHTMLEDITING_CMD_ENTRY(ID_EDIT_COPY, IDM_COPY)
	DHTMLEDITING_CMD_ENTRY(ID_EDIT_CUT, IDM_CUT)
	DHTMLEDITING_CMD_ENTRY(ID_EDIT_PASTE, IDM_PASTE)
	DHTMLEDITING_CMD_ENTRY(ID_EDIT_UNDO, IDM_UNDO)
END_DHTMLEDITING_CMDMAP()
[!endif]
// [!output VIEW_CLASS] 생성/소멸

[!output VIEW_CLASS]::[!output VIEW_CLASS]()
[!if FORM_VIEW || OLEDB_RECORD_VIEW || ODBC_RECORD_VIEW]
	: [!output VIEW_BASE_CLASS]([!output VIEW_CLASS]::IDD)
[!endif]
{
[!if ACCESSIBILITY]
	EnableActiveAccessibility();
[!endif]
[!if FORM_VIEW || OLEDB_RECORD_VIEW || ODBC_RECORD_VIEW]
[!if OLEDB_RECORD_VIEW || ODBC_RECORD_VIEW]
	m_pSet = NULL;
[!endif]
[!endif]
[!if CONTAINER || CONTAINER_SERVER]
[!if !RICH_EDIT_VIEW]
	m_pSelection = NULL;
[!endif]
[!endif]
	// TODO: 여기에 생성 코드를 추가합니다.

}

[!output VIEW_CLASS]::~[!output VIEW_CLASS]()
{
}
[!if FORM_VIEW || OLEDB_RECORD_VIEW || ODBC_RECORD_VIEW]

void [!output VIEW_CLASS]::DoDataExchange(CDataExchange* pDX)
{
	[!output VIEW_BASE_CLASS]::DoDataExchange(pDX);
[!if ODBC_RECORD_VIEW]
	// 컨트롤을 데이터베이스 필드에 '연결'하기 위해 여기에 DDX_Field* 함수를 삽입할 수 있습니다. 예:
	// DDX_FieldText(pDX, IDC_MYEDITBOX, m_pSet->m_szColumn1, m_pSet);
	// DDX_FieldCheck(pDX, IDC_MYCHECKBOX, m_pSet->m_bColumn2, m_pSet);
	// 자세한 내용은 MSDN 및 ODBC 샘플을 참조하십시오.
[!endif]
[!if OLEDB_RECORD_VIEW]
	// SetDlgItem*/GetDlgItem* API 호출뿐 아니라 DDX_* 함수를 삽입하여 데이터베이스를 뷰에 연결할 수 있습니다.
	// ex. ::SetDlgItemText(m_hWnd, IDC_MYCONTROL, m_pSet->m_MyColumn);
	// 자세한 내용은 MSDN 및 OLEDB 샘플을 참조하십시오.
[!endif]
}
[!endif]

BOOL [!output VIEW_CLASS]::PreCreateWindow(CREATESTRUCT& cs)
{
	// TODO: CREATESTRUCT cs를 수정하여 여기에서
	//  Window 클래스 또는 스타일을 수정합니다.

[!if EDIT_VIEW]
	BOOL bPreCreated = CEditView::PreCreateWindow(cs);
	cs.style &= ~(ES_AUTOHSCROLL|WS_HSCROLL);	// 자동 줄바꿈을 사용합니다.

	return bPreCreated;
[!else]
	return [!output VIEW_BASE_CLASS]::PreCreateWindow(cs);
[!endif]
}
[!if !TREE_VIEW && !LIST_VIEW && !HTML_VIEW && !HTML_EDITVIEW && !RICH_EDIT_VIEW && !EDIT_VIEW && !FORM_VIEW && !OLEDB_RECORD_VIEW && !ODBC_RECORD_VIEW]

// [!output VIEW_CLASS] 그리기
[!if CONTAINER || CONTAINER_SERVER]
[!if !ACTIVE_DOC_CONTAINER]

void [!output VIEW_CLASS]::OnDraw(CDC* pDC)
{
	if (!pDC)
		return;

	[!output DOC_CLASS]* pDoc = GetDocument();
	ASSERT_VALID(pDoc);
	if (!pDoc)
		return;

	// TODO: 여기에 원시 데이터에 대한 그리기 코드를 추가합니다.
	// TODO: 문서에 모든 OLE 항목도 그립니다.

	// 임의의 위치에 선택 영역을 그립니다.  이 코드는 실제 그리기 코드가
	//  구현되면 제거해야 합니다.  이 위치는 [!output CONTAINER_ITEM_CLASS]에서
	//  반환하는 사각형에 정확히 대응하며
	//  내부 편집 효과를 제공합니다.

	// TODO: 마지막 그리기 코드가 완료되면 이 코드를 제거합니다.
	if (m_pSelection != NULL)
	{
		CSize size;
		CRect rect(10, 10, 210, 210);
		
		if (m_pSelection->GetExtent(&size, m_pSelection->m_nDrawAspect))
		{
			pDC->HIMETRICtoLP(&size);
			rect.right = size.cx + 10;
			rect.bottom = size.cy + 10;
		}
		m_pSelection->Draw(pDC, rect);
	}
}
[!else]

void [!output VIEW_CLASS]::OnDraw(CDC* /*pDC*/)
{
	[!output DOC_CLASS]* pDoc = GetDocument();
	ASSERT_VALID(pDoc);
	if (!pDoc)
		return;

	// TODO: 여기에 원시 데이터에 대한 그리기 코드를 추가합니다.
}[!endif]
[!else]

void [!output VIEW_CLASS]::OnDraw(CDC* /*pDC*/)
{
	[!output DOC_CLASS]* pDoc = GetDocument();
	ASSERT_VALID(pDoc);
	if (!pDoc)
		return;

	// TODO: 여기에 원시 데이터에 대한 그리기 코드를 추가합니다.
}
[!endif]
[!endif] 
[!if PRINTING]
[!if TREE_VIEW || LIST_VIEW]


void [!output VIEW_CLASS]::OnDraw(CDC* /*pDC*/)
{
	[!output DOC_CLASS]* pDoc = GetDocument();
	ASSERT_VALID(pDoc);

	// TODO: 여기에 원시 데이터에 대한 그리기 코드를 추가합니다.
}

[!endif]
[!endif]
[!if SCROLL_VIEW || CONTAINER || CONTAINER_SERVER || OLEDB_RECORD_VIEW || LIST_VIEW || TREE_VIEW || FORM_VIEW || HTML_VIEW || ODBC_RECORD_VIEW]

void [!output VIEW_CLASS]::OnInitialUpdate()
{
[!if ODBC_RECORD_VIEW]
	m_pSet = &GetDocument()->[!output ROWSET_CLASS_VARIABLE_NAME];
[!endif]
[!if OLEDB_RECORD_VIEW]
	m_pSet = &GetDocument()->[!output ROWSET_CLASS_VARIABLE_NAME];
	{
		CWaitCursor wait;
		HRESULT hr = m_pSet->OpenAll();
		if (FAILED(hr))
		{
			// 레코드 집합을 열지 못했습니다.  레코드 집합이 저장
			// 프로시저인 경우 OpenAll()을 호출하기 전에 
			// 입력 매개 변수를 제대로 초기화했는지
			// 확인하십시오.

			AfxMessageBox(_T("레코드 집합을 열지 못했습니다."), MB_OK);
			// 열린 RowSet 없이 현재 레코드의 변경을 시도하면
			// 충돌할 수 있기 때문에 다음 및 이전 레코드 명령을
			// 비활성화합니다.
			m_bOnFirstRecord = TRUE;
			m_bOnLastRecord = TRUE;
		}
		if( hr == DB_S_ENDOFROWSET )
		{
			// 행 집합이 비어 있습니다(행이 포함되어 있지 않음).
			AfxMessageBox(_T("레코드 집합이 열렸지만 반환할 행이 없었습니다."), MB_OK);
			// 다음 및 이전 레코드 명령을 비활성화합니다.
			m_bOnFirstRecord = TRUE;
			m_bOnLastRecord = TRUE;
		}
	}
[!endif]
	[!output VIEW_BASE_CLASS]::OnInitialUpdate();
[!if FORM_VIEW]
[!if APP_TYPE_SDI]
	GetParentFrame()->RecalcLayout();
[!endif]
	ResizeParentToFit();
[!endif]

[!if LIST_VIEW]

	// TODO: GetListCtrl()을 호출하여 해당 list 컨트롤을 직접 액세스함으로써
	//  ListView를 항목으로 채울 수 있습니다.
[!if TREE_VIEW]

	// TODO: TreeView를 항목으로 채우려면
	//  GetTreeCtrl()을 호출하여 해당 tree 컨트롤을 직접 액세스하십시오.
[!if HTML_VIEW]
	// TODO: 이 코드는 웹 상의 인기있는 사이트를 탐색합니다.
	//  원하는 사이트로 가려면 코드를 변경하십시오.
[!endif]
[!endif]
[!endif]
[!if HTML_VIEW]
	Navigate2(_T("http://www.msdn.microsoft.com/korea/visualc/"),NULL,NULL);
[!endif]
[!if CONTAINER || CONTAINER_SERVER]
[!if !RICH_EDIT_VIEW]

	// TODO: 마지막 선택 모델 코드가 작성되면 이 코드를 제거합니다.
	m_pSelection = NULL;    // 선택 영역을 초기화합니다.

[!endif]
[!if RICH_EDIT_VIEW]

	// 인쇄 여백(720 twips = 1/2 inch)을 설정합니다.
	SetMargins(CRect(720, 720, 720, 720));
[!endif]
[!endif]
[!if SCROLL_VIEW]
	CSize sizeTotal;
	// TODO: 이 뷰의 전체 크기를 계산합니다.
	sizeTotal.cx = sizeTotal.cy = 100;
	SetScrollSizes(MM_TEXT, sizeTotal);
[!endif]
}
[!endif]
[!if PRINTING]


// [!output VIEW_CLASS] 인쇄

[!if ACTIVE_DOC_CONTAINER || MENUBAR_TOOLBAR || RIBBON_TOOLBAR]
[!if ACTIVE_DOC_CONTAINER && !RICH_EDIT_VIEW]
void [!output VIEW_CLASS]::OnFilePrintPreviewUIUpdate(CCmdUI* pCmdUI)
{
	if (!pCmdUI)
		return;

	if (m_pSelection != NULL)
	{
		DWORD dwStatus = 0;
		if (SUCCEEDED(m_pSelection->QueryCommand(OLECMDID_PRINTPREVIEW, &dwStatus)) &&
			dwStatus & OLECMDF_ENABLED)
		{
				pCmdUI->Enable(TRUE);
				return;
		}
	}
	pCmdUI->Enable(FALSE);
}
[!endif]

void [!output VIEW_CLASS]::OnFilePrintPreview()
{
[!if MENUBAR_TOOLBAR || RIBBON_TOOLBAR]
#ifndef SHARED_HANDLERS
	AFXPrintPreview(this);
#endif
[!else]
[!if !RICH_EDIT_VIEW]
	if (!m_pSelection)
		return;
	m_pSelection->ExecCommand(OLECMDID_PRINTPREVIEW);
[!else]
	[!output VIEW_BASE_CLASS]::OnFilePrintPreview();
[!endif]
[!endif]
}

[!endif]
[!if !HTML_VIEW && !HTML_EDITVIEW]
BOOL [!output VIEW_CLASS]::OnPreparePrinting(CPrintInfo* pInfo)
{
[!if EDIT_VIEW]
	// 기본적인 CEditView 준비
	return CEditView::OnPreparePrinting(pInfo);
[!else]
[!if ACTIVE_DOC_CONTAINER]
	if (!CView::DoPreparePrinting(pInfo))
		return FALSE;
	
	if (!COleDocObjectItem::OnPreparePrinting(this, pInfo))
		return FALSE;

	return TRUE;
[!else]
	// 기본적인 준비
	return DoPreparePrinting(pInfo);
[!endif]
[!endif]
}

[!if !RICH_EDIT_VIEW]
[!if EDIT_VIEW]
void [!output VIEW_CLASS]::OnBeginPrinting(CDC* pDC, CPrintInfo* pInfo)
[!else]
void [!output VIEW_CLASS]::OnBeginPrinting(CDC* /*pDC*/, CPrintInfo* /*pInfo*/)
[!endif]
{
[!if EDIT_VIEW]
	// 기본 CEditView 시작 인쇄
	CEditView::OnBeginPrinting(pDC, pInfo);
[!else]
	// TODO: 인쇄하기 전에 추가 초기화 작업을 추가합니다.
[!endif]
}

[!if EDIT_VIEW]
void [!output VIEW_CLASS]::OnEndPrinting(CDC* pDC, CPrintInfo* pInfo)
[!else]
void [!output VIEW_CLASS]::OnEndPrinting(CDC* /*pDC*/, CPrintInfo* /*pInfo*/)
[!endif]
{
[!if EDIT_VIEW]
	// 기본 CEditView 종료 인쇄
	CEditView::OnEndPrinting(pDC, pInfo);
[!else]
	// TODO: 인쇄 후 정리 작업을 추가합니다.
[!endif]
}
[!endif]
[!endif]
[!if FORM_VIEW || ACTIVE_DOC_CONTAINER]

[!if ACTIVE_DOC_CONTAINER]
void [!output VIEW_CLASS]::OnPrint(CDC* pDC, CPrintInfo* pInfo)
[!else]
void [!output VIEW_CLASS]::OnPrint(CDC* pDC, CPrintInfo* /*pInfo*/)
[!endif]
{
	// TODO: 여기에 사용자 지정 인쇄 코드를 추가합니다.
[!if ACTIVE_DOC_CONTAINER]
	if(pInfo->m_bDocObject)
		COleDocObjectItem::OnPrint(this, pInfo, TRUE);
	else
		CView::OnPrint(pDC, pInfo);
[!endif]
}
[!endif]
[!endif]
[!if CONTAINER || CONTAINER_SERVER]

void [!output VIEW_CLASS]::OnDestroy()
{
	// 소멸 중인 항목을 비활성화합니다.
	// 분할 창이 사용될 경우 이 작업은 중요합니다.
   COleClientItem* pActiveItem = GetDocument()->GetInPlaceActiveItem(this);
   if (pActiveItem != NULL && pActiveItem->GetActiveView() == this)
   {
      pActiveItem->Deactivate();
      ASSERT(GetDocument()->GetInPlaceActiveItem(this) == NULL);
   }
   [!output VIEW_BASE_CLASS]::OnDestroy();
}

[!if !RICH_EDIT_VIEW]


// OLE 클라이언트 지원 및 명령

BOOL [!output VIEW_CLASS]::IsSelected(const CObject* pDocItem) const
{
	// 아래 구현은 선택이 [!output CONTAINER_ITEM_CLASS] 개체로만
	//  이루어진 경우 적합합니다.  다른 선택 메커니즘을
	//  처리하려면 이 구현을 바꿔야 합니다.

	// TODO: 선택된 OLE 클라이언트 항목을 테스트하는 이 함수를 구현합니다.

	return pDocItem == m_pSelection;
}

void [!output VIEW_CLASS]::OnInsertObject()
{
	// 표준 개체 삽입 대화 상자를 호출하여 새 [!output CONTAINER_ITEM_CLASS]
	//  개체에 대한 정보를 얻습니다.
	COleInsertDialog dlg;
[!if ACTIVE_DOC_CONTAINER]
	if (dlg.DoModal(COleInsertDialog::DocObjectsOnly) != IDOK)
		return;
[!else]
	if (dlg.DoModal() != IDOK)
		return;
[!endif]

	BeginWaitCursor();

	[!output CONTAINER_ITEM_CLASS]* pItem = NULL;
	TRY
	{
		// 이 문서에 연결된 새 항목을 만듭니다.
		[!output DOC_CLASS]* pDoc = GetDocument();
		ASSERT_VALID(pDoc);
		pItem = new [!output CONTAINER_ITEM_CLASS](pDoc);
		ASSERT_VALID(pItem);

		// 대화 상자에 있는 데이터 항목을 초기화합니다.
		if (!dlg.CreateItem(pItem))
			AfxThrowMemoryException();  // 모든 예외에서 수행됩니다.
		ASSERT_VALID(pItem);
		
[!if ACTIVE_DOC_CONTAINER]
		pItem->DoVerb(OLEIVERB_SHOW, this);
[!else]
        if (dlg.GetSelectionType() == COleInsertDialog::createNewItem)
			pItem->DoVerb(OLEIVERB_SHOW, this);
[!endif]

		ASSERT_VALID(pItem);
		// 임의의 사용자 인터페이스 디자인으로, 선택 영역을 삽입된 마지막 항목으로
		//  설정합니다.

		// TODO: 응용 프로그램에 맞게 선택 영역을 다시 구현합니다.
		m_pSelection = pItem;   // 선택 영역을 마지막으로 삽입된 항목으로 설정합니다.
		pDoc->UpdateAllViews(NULL);
	}
	CATCH(CException, e)
	{
		if (pItem != NULL)
		{
			ASSERT_VALID(pItem);
			pItem->Delete();
		}
		AfxMessageBox(IDP_FAILED_TO_CREATE);
	}
	END_CATCH

	EndWaitCursor();
}

// 다음 명령 처리기는 표준 키보드 사용자 인터페이스를 제공하여
//  내부 편집 세션을 취소합니다.  그러면
//  컨테이너(서버가 아님)가 비활성화됩니다.
void [!output VIEW_CLASS]::OnCancelEditCntr()
{
	// 이 뷰에 있는 내부 활성 항목을 닫습니다 .
	COleClientItem* pActiveItem = GetDocument()->GetInPlaceActiveItem(this);
	if (pActiveItem != NULL)
	{
		pActiveItem->Close();
	}
	ASSERT(GetDocument()->GetInPlaceActiveItem(this) == NULL);
}

// 개체를 내부 편집하려고 할 경우 컨테이너에는 OnSetFocus 및
//  OnSize에 대한 특별한 처리가 필요합니다.
void [!output VIEW_CLASS]::OnSetFocus(CWnd* pOldWnd)
{
	COleClientItem* pActiveItem = GetDocument()->GetInPlaceActiveItem(this);
	if (pActiveItem != NULL &&
		pActiveItem->GetItemState() == COleClientItem::activeUIState)
	{
		// 같은 뷰에 있을 경우 이 항목에 포커스를 설정해야 합니다.
		CWnd* pWnd = pActiveItem->GetInPlaceWindow();
		if (pWnd != NULL)
		{
			pWnd->SetFocus();   // 기본 클래스를 호출하지 않습니다.
			return;
		}
	}

	[!output VIEW_BASE_CLASS]::OnSetFocus(pOldWnd);
}

void [!output VIEW_CLASS]::OnSize(UINT nType, int cx, int cy)
{
	[!output VIEW_BASE_CLASS]::OnSize(nType, cx, cy);
	COleClientItem* pActiveItem = GetDocument()->GetInPlaceActiveItem(this);
	if (pActiveItem != NULL)
		pActiveItem->SetItemRects();
}

void [!output VIEW_CLASS]::OnFilePrint()
{
	//기본적으로 활성 문서가
	//IOleCommandTarget을 사용하여 자체적으로 인쇄되도록 요청합니다. 이 동작을 원하지 않을 경우
	//COleDocObjectItem::DoDefaultPrinting에 대한 호출을 제거하십시오.
	//어떤 이유로 인해 호출이 실패하면 
	//IPrint 인터페이스를 사용하여 docobject의 인쇄를 시도할 수 있습니다.
	CPrintInfo printInfo;
	ASSERT(printInfo.m_pPD != NULL); 
	if (S_OK == COleDocObjectItem::DoDefaultPrinting(this, &printInfo))
		return;
	
	CView::OnFilePrint();

}

[!endif]
[!endif]
[!if MENUBAR_TOOLBAR || RIBBON_TOOLBAR]

void [!output VIEW_CLASS]::OnRButtonUp(UINT /* nFlags */, CPoint point)
{
	ClientToScreen(&point);
	OnContextMenu(this, point);
}

void [!output VIEW_CLASS]::OnContextMenu(CWnd* /* pWnd */, CPoint point)
{
#ifndef SHARED_HANDLERS
	theApp.GetContextMenuManager()->ShowPopupMenu(IDR_POPUP_EDIT, point.x, point.y, this, TRUE);
#endif
}
[!endif]
[!if MINI_SERVER || FULL_SERVER || CONTAINER_SERVER]

// OLE 서버 지원

// 다음 명령 처리기는 표준 키보드 사용자 인터페이스를 제공하여
//  내부 편집 세션을 취소합니다.  그러면
//  서버(컨테이너가 아님)가 비활성화됩니다.
void [!output VIEW_CLASS]::OnCancelEditSrvr()
{
	GetDocument()->OnDeactivateUI(FALSE);
}
[!endif]


// [!output VIEW_CLASS] 진단

#ifdef _DEBUG
void [!output VIEW_CLASS]::AssertValid() const
{
	[!output VIEW_BASE_CLASS]::AssertValid();
}

void [!output VIEW_CLASS]::Dump(CDumpContext& dc) const
{
	[!output VIEW_BASE_CLASS]::Dump(dc);
}

[!output DOC_CLASS]* [!output VIEW_CLASS]::GetDocument() const // 디버그되지 않은 버전은 인라인으로 지정됩니다.
{
	ASSERT(m_pDocument->IsKindOf(RUNTIME_CLASS([!output DOC_CLASS])));
	return ([!output DOC_CLASS]*)m_pDocument;
}
#endif //_DEBUG
[!if OLEDB_RECORD_VIEW]


// [!output VIEW_CLASS] 데이터베이스 지원
CRowset<>* [!output VIEW_CLASS]::OnGetRowset()
{
	return m_pSet->GetRowsetBase();
}

[!endif]
[!if ODBC_RECORD_VIEW]


// [!output VIEW_CLASS] 데이터베이스 지원
CRecordset* [!output VIEW_CLASS]::OnGetRecordset()
{
	return m_pSet;
}

[!endif]


// [!output VIEW_CLASS] 메시지 처리기
[!if PROJECT_STYLE_EXPLORER]
[!if LIST_VIEW]
void [!output VIEW_CLASS]::OnStyleChanged(int nStyleType, LPSTYLESTRUCT lpStyleStruct)
{
	//TODO: 사용자가 창의 뷰 스타일을 변경했을 때 반응하는 코드를 추가합니다.	
	[!output VIEW_BASE_CLASS]::OnStyleChanged(nStyleType,lpStyleStruct);	
}
[!endif]
[!endif]
