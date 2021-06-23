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

// [!output TREE_VIEW_IMPL] : [!output TREE_VIEW_CLASS] 類別的實作
//

#include "stdafx.h"
#include "[!output APP_HEADER]"

#include "[!output DOC_HEADER]"
#include "[!output TREE_VIEW_HEADER]"

#ifdef _DEBUG
#define new DEBUG_NEW
#endif


// [!output TREE_VIEW_CLASS]

IMPLEMENT_DYNCREATE([!output TREE_VIEW_CLASS], [!output TREE_VIEW_BASE_CLASS])

BEGIN_MESSAGE_MAP([!output TREE_VIEW_CLASS], [!output TREE_VIEW_BASE_CLASS])
[!if PRINTING]
	// 標準列印命令
	ON_COMMAND(ID_FILE_PRINT, &[!output TREE_VIEW_BASE_CLASS]::OnFilePrint)
	ON_COMMAND(ID_FILE_PRINT_DIRECT, &[!output TREE_VIEW_BASE_CLASS]::OnFilePrint)
	ON_COMMAND(ID_FILE_PRINT_PREVIEW, &[!output TREE_VIEW_BASE_CLASS]::OnFilePrintPreview)
[!endif]
END_MESSAGE_MAP()


// [!output TREE_VIEW_CLASS] 建構/解構

[!output TREE_VIEW_CLASS]::[!output TREE_VIEW_CLASS]()
{
[!if ACCESSIBILITY]
	EnableActiveAccessibility();
[!endif]
	// TODO:  在此加入建構程式碼
}

[!output TREE_VIEW_CLASS]::~[!output TREE_VIEW_CLASS]()
{
}

BOOL [!output TREE_VIEW_CLASS]::PreCreateWindow(CREATESTRUCT& cs)
{
	// TODO:  在此經由修改 CREATESTRUCT cs 達到修改視窗類別或樣式的目的

	return [!output TREE_VIEW_BASE_CLASS]::PreCreateWindow(cs);
}
[!if PRINTING]


// [!output TREE_VIEW_CLASS] 列印

BOOL [!output TREE_VIEW_CLASS]::OnPreparePrinting(CPrintInfo* pInfo)
{
	// 預設的準備列印程式碼
	return DoPreparePrinting(pInfo);
}

void [!output TREE_VIEW_CLASS]::OnDraw(CDC* /*pDC*/)
{
	[!output DOC_CLASS]* pDoc = GetDocument();
	ASSERT_VALID(pDoc);

	// TODO:  在此加入原生資料的描繪程式碼
}

void [!output TREE_VIEW_CLASS]::OnBeginPrinting(CDC* /*pDC*/, CPrintInfo* /*pInfo*/)
{
	// TODO:  加入列印前額外的初始設定
}

void [!output TREE_VIEW_CLASS]::OnEndPrinting(CDC* /*pDC*/, CPrintInfo* /*pInfo*/)
{
	// TODO:  加入列印後的清除程式碼
}
[!endif]

void [!output TREE_VIEW_CLASS]::OnInitialUpdate()
{
	[!output TREE_VIEW_BASE_CLASS]::OnInitialUpdate();

	// TODO:  您可以透過對 GetTreeCtrl() 的呼叫，
	// 直接存取其樹狀控制項，使用項目填入您的 TreeView。
}


// [!output TREE_VIEW_CLASS] 診斷

#ifdef _DEBUG
void [!output TREE_VIEW_CLASS]::AssertValid() const
{
	[!output TREE_VIEW_BASE_CLASS]::AssertValid();
}

void [!output TREE_VIEW_CLASS]::Dump(CDumpContext& dc) const
{
	[!output TREE_VIEW_BASE_CLASS]::Dump(dc);
}

[!output DOC_CLASS]* [!output TREE_VIEW_CLASS]::GetDocument() // 內嵌非偵錯版本
{
	ASSERT(m_pDocument->IsKindOf(RUNTIME_CLASS([!output DOC_CLASS])));
	return ([!output DOC_CLASS]*)m_pDocument;
}
#endif //_DEBUG


// [!output TREE_VIEW_CLASS] 訊息處理常式
