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

// [!output SERVER_ITEM_IMPL] : [!output SERVER_ITEM_CLASS] 類別的實作
//

#include "stdafx.h"
#include "[!output APP_HEADER]"

#include "[!output DOC_HEADER]"
#include "[!output SERVER_ITEM_HEADER]"
[!if CONTAINER_SERVER]
#include "[!output CONTAINER_ITEM_HEADER]"
[!endif]

#ifdef _DEBUG
#define new DEBUG_NEW
#endif


// [!output SERVER_ITEM_CLASS] 實作

IMPLEMENT_DYNAMIC([!output SERVER_ITEM_CLASS], [!output SERVER_ITEM_BASE_CLASS])

[!output SERVER_ITEM_CLASS]::[!output SERVER_ITEM_CLASS]([!output DOC_CLASS]* pContainerDoc)
	: [!output SERVER_ITEM_BASE_CLASS](pContainerDoc, TRUE)
{
	// TODO:  在此加入一次建構程式碼
	// (例如，將其他剪貼簿格式加入項目的資料來源)
}

[!output SERVER_ITEM_CLASS]::~[!output SERVER_ITEM_CLASS]()
{
	// TODO:  在此加入清除程式碼
}

void [!output SERVER_ITEM_CLASS]::Serialize(CArchive& ar)
{
	// 如果將項目複製到剪貼簿，架構會呼叫 
	// [!output SERVER_ITEM_CLASS]::Serialize。這會經由
	// OLE 回呼 OnGetClipboardData 而自動發生。
	// 內嵌項目的最好預設為委託給文件的
	// 序列化函式。如果您支援連結，
	// 則您可僅序列化文件的一部分。

	if (!IsLinkedItem())
	{
		[!output DOC_CLASS]* pDoc = GetDocument();
		ASSERT_VALID(pDoc);
		if (pDoc)
			pDoc->Serialize(ar);
	}
}

BOOL [!output SERVER_ITEM_CLASS]::OnGetExtent(DVASPECT dwDrawAspect, CSize& rSize)
{
	// 類似的大部分應用程式僅處理
	// 描繪項目方面的內容。如果您想支援
	// 其他方面，如 DVASPECT_THUMBNAIL 
	// (經由覆寫 OnDrawEx)，則應修改 
	// OnGetExtent 的實作以處理其他方面。

	if (dwDrawAspect != DVASPECT_CONTENT)
		return [!output SERVER_ITEM_BASE_CLASS]::OnGetExtent(dwDrawAspect, rSize);

	// 呼叫 [!output SERVER_ITEM_CLASS]::OnGetExtent 
	// 來取得整個項目 HIMETRIC 單位中的延伸。
	// 此處預設的實作僅傳回單元的硬式編碼數目。

	// TODO:  取代此任意大小

	rSize = CSize(3000, 3000);   // 3000 x 3000 HIMETRIC 單元

	return TRUE;
}

BOOL [!output SERVER_ITEM_CLASS]::OnDraw(CDC* pDC, CSize& rSize)
{
	if (!pDC)
		return FALSE;

	// 如果您使用 rSize 則移除
	UNREFERENCED_PARAMETER(rSize);

	// TODO:  設定對應模式與延伸
	// (延伸通常與從 OnGetExtent 傳回的大小相同)
	pDC->SetMapMode(MM_ANISOTROPIC);
	pDC->SetWindowOrg(0,0);
	pDC->SetWindowExt(3000, 3000);

	// TODO:  在此加入描繪程式碼。選項性的，在 HIMETRIC 中填寫內容。
	// 所有的描繪都發生於中繼檔裝置內容 (pDC)。

[!if CONTAINER_SERVER]
	// TODO: 有描繪內嵌的 [!output CONTAINER_ITEM_CLASS] 物件。

[!endif]
[!if CONTAINER_SERVER]
	// 下列程式碼描繪任何位置上的第一的項目。

	// TODO:  當完成您的實際描繪程式碼時，移除此程式碼

	[!output DOC_CLASS]* pDoc = GetDocument();
	ASSERT_VALID(pDoc);
	if (!pDoc)
		return FALSE;

	POSITION pos = pDoc->GetStartPosition();
	[!output CONTAINER_ITEM_CLASS]* pItem = DYNAMIC_DOWNCAST([!output CONTAINER_ITEM_CLASS], pDoc->GetNextClientItem(pos));
	if (pItem != NULL)
		pItem->Draw(pDC, CRect(10, 10, 1010, 1010));
[!endif]
	return TRUE;
}


// [!output SERVER_ITEM_CLASS] 診斷

#ifdef _DEBUG
void [!output SERVER_ITEM_CLASS]::AssertValid() const
{
	[!output SERVER_ITEM_BASE_CLASS]::AssertValid();
}

void [!output SERVER_ITEM_CLASS]::Dump(CDumpContext& dc) const
{
	[!output SERVER_ITEM_BASE_CLASS]::Dump(dc);
}
#endif

