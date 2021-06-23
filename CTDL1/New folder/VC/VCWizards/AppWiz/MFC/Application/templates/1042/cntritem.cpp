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

// [!output CONTAINER_ITEM_IMPL] : [!output CONTAINER_ITEM_CLASS] 클래스의 구현
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


// [!output CONTAINER_ITEM_CLASS] 구현

IMPLEMENT_SERIAL([!output CONTAINER_ITEM_CLASS], [!output CONTAINER_ITEM_BASE_CLASS], 0)

[!if RICH_EDIT_VIEW]
[!output CONTAINER_ITEM_CLASS]::[!output CONTAINER_ITEM_CLASS](REOBJECT* preo, [!output DOC_CLASS]* pContainer)
	: [!output CONTAINER_ITEM_BASE_CLASS](preo, pContainer)
[!else]
[!output CONTAINER_ITEM_CLASS]::[!output CONTAINER_ITEM_CLASS]([!output DOC_CLASS]* pContainer)
	: [!output CONTAINER_ITEM_BASE_CLASS](pContainer)
[!endif]
{
	// TODO: 여기에 일회성 생성 코드를 추가합니다.
}

[!output CONTAINER_ITEM_CLASS]::~[!output CONTAINER_ITEM_CLASS]()
{
	// TODO: 여기에 정리 코드를 추가합니다.
}
[!if !RICH_EDIT_VIEW]

void [!output CONTAINER_ITEM_CLASS]::OnChange(OLE_NOTIFICATION nCode, DWORD dwParam)
{
	ASSERT_VALID(this);

	[!output CONTAINER_ITEM_BASE_CLASS]::OnChange(nCode, dwParam);

	// 항목이 편집(내부 편집 또는 완전 개방 편집)될 때
	//  해당 항목의 상태나 내용의 모양이 변경되면 OnChange
	//  알림을 보냅니다.

	// TODO: UpdateAllViews를 호출하여 항목을 무효화합니다.
	//  응용 프로그램에 적합한 힌트를 포함합니다.

	GetDocument()->UpdateAllViews(NULL);
		// 여기서는 힌트 없이 모든 뷰를 업데이트합니다.
}

BOOL [!output CONTAINER_ITEM_CLASS]::OnChangeItemPosition(const CRect& rectPos)
{
	ASSERT_VALID(this);

	// 내부 활성화 동안 서버에서 [!output CONTAINER_ITEM_CLASS]::OnChangeItemPosition을
	//  호출하여 내부 창의 위치를 변경합니다.
	//  일반적으로, 이러한 작업은 범위가 변경되거나
	//  내부 크기가 변경됨으로써 서버 문서의 데이터가 변경되어
	//  나타나는 결과입니다.
	//
	// 여기서 기본값은 기본 클래스를 호출하는 것이며
	//  [!output CONTAINER_ITEM_BASE_CLASS]::SetItemRects를 호출하여 항목을
	//  새 위치로 이동합니다.

	if (![!output CONTAINER_ITEM_BASE_CLASS]::OnChangeItemPosition(rectPos))
		return FALSE;

	// TODO: 항목의 사각형/범위에 해당하는 모든 캐시를 업데이트합니다.

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

	// 내부 활성화 동안 서버에서 [!output CONTAINER_ITEM_CLASS]::OnGetItemPosition을
	//  호출하여 이 항목의 위치를 결정합니다.  일반적으로, 이 사각형은
	//  해당 항목의 현재 위치를 반영하는데, 이 위치는 활성화에 사용되는 뷰에 대한
	//  상대적 위치입니다.  [!output CONTAINER_ITEM_CLASS]::GetActiveView를 
	//  호출하면 뷰를 얻을 수 있습니다.

	// TODO: rPosition에 올바른 사각형을 픽셀 단위로 반환합니다.

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
    // 프레임마다 내부 활성화 항목을 하나만 허용합니다.
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

	// [!output CONTAINER_ITEM_BASE_CLASS] 데이터에서 읽기 위해 기본 클래스를 맨 처음 호출합니다.
	// 이렇게 하면 [!output CONTAINER_ITEM_CLASS]::GetDocument에서 반환한
	//  m_pDocument 포인터가 설정되기 때문에 기본 클래스
	//  Serialize를 먼저 호출하는 것이 좋습니다.
	[!output CONTAINER_ITEM_BASE_CLASS]::Serialize(ar);

	// 이제 [!output CONTAINER_ITEM_CLASS]에 관련된 데이터를 저장/검색합니다.
	if (ar.IsStoring())
	{
		// TODO: 여기에 저장 코드를 추가합니다.
	}
	else
	{
		// TODO: 여기에 로딩 코드를 추가합니다.
	}
}
[!if CONTAINER_SERVER]

BOOL [!output CONTAINER_ITEM_CLASS]::CanActivate()
{
	// 서버 자체가 내부 편집되는 동안에는 내부 편집이 작동되지 않으며
	//  지원되지도 않습니다.  따라서 이 경우에는 내부 활성화를
	//  비활성화합니다.
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

	// 그렇지 않으면 기본 동작을 사용합니다.
	return COleClientItem::CanActivate();
}
[!endif]
[!endif]


// [!output CONTAINER_ITEM_CLASS] 진단

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

