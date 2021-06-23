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

// [!output CONTAINER_ITEM_IMPL] : [!output CONTAINER_ITEM_CLASS] 類別的實作
//

#include "stdafx.h"
#include "[!output APP_HEADER]"

[!if OLEDB_RECORD_VIEW || ODBC_RECORD_VIEW]
#include "[!output ROWSET_HEADER]"
[!endif]
#include "[!output DOC_HEADER]"
#include "[!output VIEW_HEADER]"
#include "[!output CONTAINER_ITEM_HEADER]"

#ifdef _DEBUG
#define new DEBUG_NEW
#endif


// [!output CONTAINER_ITEM_CLASS] 實作

IMPLEMENT_SERIAL([!output CONTAINER_ITEM_CLASS], [!output CONTAINER_ITEM_BASE_CLASS], 0)

[!if RICH_EDIT_VIEW]
[!output CONTAINER_ITEM_CLASS]::[!output CONTAINER_ITEM_CLASS](REOBJECT* preo, [!output DOC_CLASS]* pContainer)
	: [!output CONTAINER_ITEM_BASE_CLASS](preo, pContainer)
[!else]
[!output CONTAINER_ITEM_CLASS]::[!output CONTAINER_ITEM_CLASS]([!output DOC_CLASS]* pContainer)
	: [!output CONTAINER_ITEM_BASE_CLASS](pContainer)
[!endif]
{
	// TODO:  在此加入一次建構程式碼
}

[!output CONTAINER_ITEM_CLASS]::~[!output CONTAINER_ITEM_CLASS]()
{
	// TODO:  在此加入清除程式碼
}
[!if !RICH_EDIT_VIEW]

void [!output CONTAINER_ITEM_CLASS]::OnChange(OLE_NOTIFICATION nCode, DWORD dwParam)
{
	ASSERT_VALID(this);

	[!output CONTAINER_ITEM_BASE_CLASS]::OnChange(nCode, dwParam);

	// 當正在編輯項目時 (直接或完全開啟)，該項目會傳送項目
	// 目前狀態的 OnChange 變更告知，
	// 或其內容的視覺化外觀。

	// TODO:  使項目失效，藉由呼叫 UpdateAllViews
	// (搭配提示來使用您的應用程式)

	GetDocument()->UpdateAllViews(NULL);
		// 現在只需更新 [所有] 檢視表/沒有提示
}

BOOL [!output CONTAINER_ITEM_CLASS]::OnChangeItemPosition(const CRect& rectPos)
{
	ASSERT_VALID(this);

	// 當就地啟用 [!output CONTAINER_ITEM_CLASS]::OnChangeItemPosition
	// 被伺服器呼叫來變更就地視窗的位置。
	// 通常，這是伺服器文件中資料變更
	// 造成的結果，這類變更為內容變更
	// 或就地調整大小的結果等等。
	//
	// 此處的預設是呼叫基底類別，該類別會呼叫
	// [!output CONTAINER_ITEM_BASE_CLASS]::SetItemRects 來將項目
	// 移動至新位置。

	if (![!output CONTAINER_ITEM_BASE_CLASS]::OnChangeItemPosition(rectPos))
		return FALSE;

	// TODO:  更新您擁有快取項目的矩形/內容

	return TRUE;
}

BOOL [!output CONTAINER_ITEM_CLASS]::OnShowControlBars(CFrameWnd* pFrameWnd, BOOL bShow)
{
[!if APP_TYPE_MDI]
	CMDIFrameWndEx* pMainFrame = DYNAMIC_DOWNCAST(CMDIFrameWndEx, pFrameWnd);
[!else]
	CFrameWndEx* pMainFrame = DYNAMIC_DOWNCAST(CFrameWndEx, pFrameWnd);
[!endif]

	if (pMainFrame != NULL)
	{
		ASSERT_VALID(pMainFrame);
		return pMainFrame->OnShowPanes(bShow);
	}

	return FALSE;
}

[!if !ACTIVE_DOC_CONTAINER]
void [!output CONTAINER_ITEM_CLASS]::OnGetItemPosition(CRect& rPosition)
{
	ASSERT_VALID(this);

	// 在就地啟用 (In-place Activation) 期間，呼叫 [!output CONTAINER_ITEM_CLASS]::OnGetItemPosition
	// 以決定此項目的位置。通常此方框
	// 用以反應項目目前位置與啟動使用的
	// 檢視間的關係。您可呼叫 
	// [!output CONTAINER_ITEM_CLASS]::GetActiveView 獲得此檢視。

	// TODO:  傳回 rPosition 中正確的矩形，以像素為單位

	CSize size;
	rPosition.SetRectEmpty();
	if (GetExtent(&size, m_nDrawAspect))
	{
		[!output VIEW_CLASS]* pView = GetActiveView();
		ASSERT_VALID(pView);
		if (!pView)
			return;
		CDC *pDC = pView->GetDC();
		ASSERT(pDC);
		if (!pDC)
			return;
		pDC->HIMETRICtoLP(&size);
		rPosition.SetRect(10, 10, size.cx + 10, size.cy + 10);
	}
	else
		rPosition.SetRect(10, 10, 210, 210);
}
[!endif]

void [!output CONTAINER_ITEM_CLASS]::OnActivate()
{
[!if !ACTIVE_DOC_CONTAINER]
    // 每框架僅允許一個就地啟動
    [!output VIEW_CLASS]* pView = GetActiveView();
    ASSERT_VALID(pView);
	if (!pView)
		return;
    COleClientItem* pItem = GetDocument()->GetInPlaceActiveItem(pView);
    if (pItem != NULL && pItem != this)
        pItem->Close();
    
    [!output CONTAINER_ITEM_BASE_CLASS]::OnActivate();
[!endif]
}

void [!output CONTAINER_ITEM_CLASS]::OnDeactivateUI(BOOL bUndoable)
{
	[!output CONTAINER_ITEM_BASE_CLASS]::OnDeactivateUI(bUndoable);

    DWORD dwMisc = 0;
    m_lpObject->GetMiscStatus(GetDrawAspect(), &dwMisc);
    if (dwMisc & OLEMISC_INSIDEOUT)
        DoVerb(OLEIVERB_HIDE, NULL);
}

void [!output CONTAINER_ITEM_CLASS]::Serialize(CArchive& ar)
{
	ASSERT_VALID(this);

	// 先呼叫基底類別讀取 [!output CONTAINER_ITEM_BASE_CLASS] 中的資料。
	// 因為這會設定 m_pDocument 指標，該指標是從
	// [!output CONTAINER_ITEM_CLASS]::GetDocument 傳回，先呼叫
	// 基底類別序列化 (Serialize) 是很好的作法。
	[!output CONTAINER_ITEM_BASE_CLASS]::Serialize(ar);

	// 現在儲存/擷取特定給 [!output CONTAINER_ITEM_CLASS] 的資料
	if (ar.IsStoring())
	{
		// TODO:  在此加入儲存程式碼
	}
	else
	{
		// TODO:  在此加入載入程式碼
	}
}
[!if CONTAINER_SERVER]

BOOL [!output CONTAINER_ITEM_CLASS]::CanActivate()
{
	// 當就地編輯伺服器本身時，
	// 就地編輯不會發生作用，且不被支援。
	// 所以，此情況下會停用就地啟用。
	[!output DOC_CLASS]* pDoc = GetDocument();
	ASSERT_VALID(pDoc);
	if (!pDoc)
		return FALSE;
	ASSERT_KINDOF(COleServerDoc, pDoc);
	if (!pDoc->IsKindOf(RUNTIME_CLASS(COleServerDoc)))
	{
		return FALSE;
	}
	if (pDoc->IsInPlaceActive())
		return FALSE;

	// 否則，依靠預設的行為
	return COleClientItem::CanActivate();
}
[!endif]
[!endif]


// [!output CONTAINER_ITEM_CLASS] 診斷

#ifdef _DEBUG
void [!output CONTAINER_ITEM_CLASS]::AssertValid() const
{
	[!output CONTAINER_ITEM_BASE_CLASS]::AssertValid();
}

void [!output CONTAINER_ITEM_CLASS]::Dump(CDumpContext& dc) const
{
	[!output CONTAINER_ITEM_BASE_CLASS]::Dump(dc);
}
#endif

