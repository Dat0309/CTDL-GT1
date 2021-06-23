[!if RIBBON_TOOLBAR]
// 這個 MFC 範例原始程式碼會示範如何使用 MFC Microsoft Office Fluent 使用者介面
// (「Fluent UI」)，並且僅提供為參考資料，做為
// MFC 參考及 MFC C++ 程式庫軟體
// 隨附相關電子文件的補充。
// 關於 Fluent UI 之複製、使用或散發的授權條款則分別提供。
// 如需 Fluent UI 授權計劃的詳細資訊，請造訪 
// http://go.microsoft.com/fwlink/?LinkId=238214。
//
// Copyright (C) Microsoft Corporation
// 著作權所有，並保留一切權利。
[!endif]

// [!output VIEW_IMPL] : [!output VIEW_CLASS] 類別的實作
//

#include "stdafx.h"
// SHARED_HANDLERS 可以定義在實作預覽、縮圖和搜尋篩選條件處理常式的
// ATL 專案中，並允許與該專案共用文件程式碼。
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
	// 標準列印命令
	ON_COMMAND(ID_FILE_PRINT, &[!output VIEW_BASE_CLASS]::OnFilePrint)
[!endif]
[!endif]
[!else]
[!if PRINTING]
	// 標準列印命令
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
// [!output VIEW_CLASS] 建構/解構

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
	// TODO:  在此加入建構程式碼

}

[!output VIEW_CLASS]::~[!output VIEW_CLASS]()
{
}
[!if FORM_VIEW || OLEDB_RECORD_VIEW || ODBC_RECORD_VIEW]

void [!output VIEW_CLASS]::DoDataExchange(CDataExchange* pDX)
{
	[!output VIEW_BASE_CLASS]::DoDataExchange(pDX);
[!if ODBC_RECORD_VIEW]
	// 您可以在此插入 DDX_Field* 函式將您的控制項連接到資料庫欄位，例如
	// DDX_FieldText(pDX, IDC_MYEDITBOX, m_pSet->m_szColumn1, m_pSet);
	// DDX_FieldCheck(pDX, IDC_MYCHECKBOX, m_pSet->m_bColumn2, m_pSet);
	// 如需更多資訊，請參閱 MSDN 和 ODBC 範本
[!endif]
[!if OLEDB_RECORD_VIEW]
	// 您可以插入 DDX_* 函式與 SetDlgItem*/GetDlgItem* 應用程式開發介面呼叫，將您的資料庫連結到檢視
	// ex. ::SetDlgItemText(m_hWnd, IDC_MYCONTROL, m_pSet->m_MyColumn);
	// 如需詳細資訊，請參閱 MSDN 和 OLEDB 範本
[!endif]
}
[!endif]

BOOL [!output VIEW_CLASS]::PreCreateWindow(CREATESTRUCT& cs)
{
	// TODO:  在此經由修改 CREATESTRUCT cs 
	// 達到修改視窗類別或樣式的目的

[!if EDIT_VIEW]
	BOOL bPreCreated = CEditView::PreCreateWindow(cs);
	cs.style &= ~(ES_AUTOHSCROLL|WS_HSCROLL);	// 啟用自動換行

	return bPreCreated;
[!else]
	return [!output VIEW_BASE_CLASS]::PreCreateWindow(cs);
[!endif]
}
[!if !TREE_VIEW && !LIST_VIEW && !HTML_VIEW && !HTML_EDITVIEW && !RICH_EDIT_VIEW && !EDIT_VIEW && !FORM_VIEW && !OLEDB_RECORD_VIEW && !ODBC_RECORD_VIEW]

// [!output VIEW_CLASS] 描繪
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

	// TODO:  在此加入原生資料的描繪程式碼
	// TODO:  也描繪文件中的所有 OLE 項目

	// 描繪任意位置的選取範圍。一旦實作您的
	// 實際描繪程式碼，應該移除此程式碼。
	// 此位置正好對應 [!output CONTAINER_ITEM_CLASS] 
	// 傳回的矩形，指定現用編輯的效用。

	// TODO:  當完成最後的描繪程式碼時，移除此程式碼。
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

	// TODO:  在此加入原生資料的描繪程式碼
}[!endif]
[!else]

void [!output VIEW_CLASS]::OnDraw(CDC* /*pDC*/)
{
	[!output DOC_CLASS]* pDoc = GetDocument();
	ASSERT_VALID(pDoc);
	if (!pDoc)
		return;

	// TODO:  在此加入原生資料的描繪程式碼
}
[!endif]
[!endif] 
[!if PRINTING]
[!if TREE_VIEW || LIST_VIEW]


void [!output VIEW_CLASS]::OnDraw(CDC* /*pDC*/)
{
	[!output DOC_CLASS]* pDoc = GetDocument();
	ASSERT_VALID(pDoc);

	// TODO:  在此加入原生資料的描繪程式碼
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
			// 開啟資料錄集失敗。
			// 如果資料錄集是預存程序，
			// 請確定在呼叫 OpenAll() 方法前，
			// 已妥善初始設定任何的輸入參數。

			AfxMessageBox(_T("開啟資料錄集失敗。"), MB_OK);
			// 因為沒有使用開啟資料列集，嘗試變更
			// 目前的資料錄會造成損毀，請停用 
			// [下一筆資料錄] 與 [上一筆資料錄] 命令
			m_bOnFirstRecord = TRUE;
			m_bOnLastRecord = TRUE;
		}
		if( hr == DB_S_ENDOFROWSET )
		{
			// 資料列集是空的 (不包含任何資料列)
			AfxMessageBox(_T("已開啟資料錄集，但沒有傳回資料列。"), MB_OK);
			// 停用 [下一筆資料錄] 與 [上一筆資料錄] 命令
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

	// TODO:  您可以透過對 GetListCtrl() 的呼叫，
	// 直接存取其清單控制項，使用項目填入您的 ListView。
[!if TREE_VIEW]

	// TODO:  您可以透過對 GetTreeCtrl() 的呼叫，
	// 直接存取其樹狀控制項，使用項目填入您的 TreeView。
[!if HTML_VIEW]
	// TODO:  此程式碼巡覽至 Web 上的流行點。
	// 變更此程式碼到您想前往的地方。
[!endif]
[!endif]
[!endif]
[!if HTML_VIEW]
	Navigate2(_T("http://www.microsoft.com/taiwan/vstudio/visualc/default.mspx"),NULL,NULL);
[!endif]
[!if CONTAINER || CONTAINER_SERVER]
[!if !RICH_EDIT_VIEW]

	// TODO:  當寫入最終選取範圍模式程式碼時，移除此程式碼
	m_pSelection = NULL;    // 初始設定選取範圍

[!endif]
[!if RICH_EDIT_VIEW]

	// 設定列印邊界 (720 Twip = 1/2 英吋)
	SetMargins(CRect(720, 720, 720, 720));
[!endif]
[!endif]
[!if SCROLL_VIEW]
	CSize sizeTotal;
	// TODO:  計算此檢視的總大小
	sizeTotal.cx = sizeTotal.cy = 100;
	SetScrollSizes(MM_TEXT, sizeTotal);
[!endif]
}
[!endif]
[!if PRINTING]


// [!output VIEW_CLASS] 列印

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
	// 預設的 CEditView 準備列印程式碼
	return CEditView::OnPreparePrinting(pInfo);
[!else]
[!if ACTIVE_DOC_CONTAINER]
	if (!CView::DoPreparePrinting(pInfo))
		return FALSE;
	
	if (!COleDocObjectItem::OnPreparePrinting(this, pInfo))
		return FALSE;

	return TRUE;
[!else]
	// 預設的準備列印程式碼
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
	// 預設的 CEditView 開始列印
	CEditView::OnBeginPrinting(pDC, pInfo);
[!else]
	// TODO:  加入列印前額外的初始設定
[!endif]
}

[!if EDIT_VIEW]
void [!output VIEW_CLASS]::OnEndPrinting(CDC* pDC, CPrintInfo* pInfo)
[!else]
void [!output VIEW_CLASS]::OnEndPrinting(CDC* /*pDC*/, CPrintInfo* /*pInfo*/)
[!endif]
{
[!if EDIT_VIEW]
	// 預設的 CEditView 結束列印
	CEditView::OnEndPrinting(pDC, pInfo);
[!else]
	// TODO:  加入列印後的清除程式碼
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
	// TODO:  在此加入自訂的列印程式碼
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
	// 停用解構上的項目; 當使用分割檢視時，
	// 這非常重要
   COleClientItem* pActiveItem = GetDocument()->GetInPlaceActiveItem(this);
   if (pActiveItem != NULL && pActiveItem->GetActiveView() == this)
   {
      pActiveItem->Deactivate();
      ASSERT(GetDocument()->GetInPlaceActiveItem(this) == NULL);
   }
   [!output VIEW_BASE_CLASS]::OnDestroy();
}

[!if !RICH_EDIT_VIEW]


// OLE 用戶端支援與命令

BOOL [!output VIEW_CLASS]::IsSelected(const CObject* pDocItem) const
{
	// 如果您的選取範圍僅包含 [!output CONTAINER_ITEM_CLASS] 物件，
	// 則下列實作是足夠的。若要處理不同的選取範圍機制，
	// 應該取代此處的實作

	// TODO:  實作測試所選取 OLE 用戶端項目的此函式

	return pDocItem == m_pSelection;
}

void [!output VIEW_CLASS]::OnInsertObject()
{
	// 叫用標準的 [插入物件] 對話方塊，以取得新的 
	// [!output CONTAINER_ITEM_CLASS] 物件資訊
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
		// 建立連至此文件的新項目
		[!output DOC_CLASS]* pDoc = GetDocument();
		ASSERT_VALID(pDoc);
		pItem = new [!output CONTAINER_ITEM_CLASS](pDoc);
		ASSERT_VALID(pItem);

		// 從對話方塊資料初始設定項目
		if (!dlg.CreateItem(pItem))
			AfxThrowMemoryException();  // 任何例外狀況會從事
		ASSERT_VALID(pItem);
		
[!if ACTIVE_DOC_CONTAINER]
		pItem->DoVerb(OLEIVERB_SHOW, this);
[!else]
        if (dlg.GetSelectionType() == COleInsertDialog::createNewItem)
			pItem->DoVerb(OLEIVERB_SHOW, this);
[!endif]

		ASSERT_VALID(pItem);
		// 當做任意使用者介面的設計，這會將選取範圍
		// 設定到最後一個插入的項目

		// TODO:  重新實作適合您應用程式的選取範圍
		m_pSelection = pItem;   // 設定選取範圍至最後插入的項目
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

// 下列的命令處理常式提供了標準的鍵盤使用者
// 介面，以取消現用的編輯工作階段。在這裡，
// 容器 (非伺服器) 造成停用
void [!output VIEW_CLASS]::OnCancelEditCntr()
{
	// 關閉此檢視上任何現用項目。
	COleClientItem* pActiveItem = GetDocument()->GetInPlaceActiveItem(this);
	if (pActiveItem != NULL)
	{
		pActiveItem->Close();
	}
	ASSERT(GetDocument()->GetInPlaceActiveItem(this) == NULL);
}

// 當編輯現用物件時，OnSetFocus 與 OnSize 對容器
// 必須有特殊處理
void [!output VIEW_CLASS]::OnSetFocus(CWnd* pOldWnd)
{
	COleClientItem* pActiveItem = GetDocument()->GetInPlaceActiveItem(this);
	if (pActiveItem != NULL &&
		pActiveItem->GetItemState() == COleClientItem::activeUIState)
	{
		// 如果位於相同檢視，必須設定焦點至此項目
		CWnd* pWnd = pActiveItem->GetInPlaceWindow();
		if (pWnd != NULL)
		{
			pWnd->SetFocus();   // 不要呼叫基底類別
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
	// 依照預設，我們要求使用中的文件使用 
	// IOleCommandTarget 列印文件本身。如果您不想要
	// 此行為，就移除指向 COleDocObjectItem::DoDefaultPrinting 
	// 的呼叫。如果因為某些原因呼叫失敗，我們
	// 會使用 IPrint 介面嘗試列印 docobject。
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

// 支援 OLE 伺服器

// 下列的命令處理常式提供了標準的鍵盤使用者
// 介面，以取消現用的編輯工作階段。在這裡，
// 容器 (非伺服器) 造成停用
void [!output VIEW_CLASS]::OnCancelEditSrvr()
{
	GetDocument()->OnDeactivateUI(FALSE);
}
[!endif]


// [!output VIEW_CLASS] 診斷

#ifdef _DEBUG
void [!output VIEW_CLASS]::AssertValid() const
{
	[!output VIEW_BASE_CLASS]::AssertValid();
}

void [!output VIEW_CLASS]::Dump(CDumpContext& dc) const
{
	[!output VIEW_BASE_CLASS]::Dump(dc);
}

[!output DOC_CLASS]* [!output VIEW_CLASS]::GetDocument() const // 內嵌非偵錯版本
{
	ASSERT(m_pDocument->IsKindOf(RUNTIME_CLASS([!output DOC_CLASS])));
	return ([!output DOC_CLASS]*)m_pDocument;
}
#endif //_DEBUG
[!if OLEDB_RECORD_VIEW]


// 支援 [!output VIEW_CLASS] 資料庫
CRowset<>* [!output VIEW_CLASS]::OnGetRowset()
{
	return m_pSet->GetRowsetBase();
}

[!endif]
[!if ODBC_RECORD_VIEW]


// 支援 [!output VIEW_CLASS] 資料庫
CRecordset* [!output VIEW_CLASS]::OnGetRecordset()
{
	return m_pSet;
}

[!endif]


// [!output VIEW_CLASS] 訊息處理常式
[!if PROJECT_STYLE_EXPLORER]
[!if LIST_VIEW]
void [!output VIEW_CLASS]::OnStyleChanged(int nStyleType, LPSTYLESTRUCT lpStyleStruct)
{
	//TODO:  加入程式碼來反應至使用者變更您視窗的檢視樣式	
	[!output VIEW_BASE_CLASS]::OnStyleChanged(nStyleType,lpStyleStruct);	
}
[!endif]
[!endif]
