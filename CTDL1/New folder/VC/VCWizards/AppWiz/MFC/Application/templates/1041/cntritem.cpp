[!if RIBBON_TOOLBAR]
// この MFC サンプル ソース コードでは、MFC Microsoft Office Fluent ユーザー インターフェイス 
// ("Fluent UI") の使用方法を示します。このコードは、MFC C++ ライブラリ ソフトウェアに 
// 同梱されている Microsoft Foundation Class リファレンスおよび関連電子ドキュメントを
// 補完するための参考資料として提供されます。
// Fluent UI を複製、使用、または配布するためのライセンス条項は個別に用意されています。
// Fluent UI ライセンス プログラムの詳細については、Web サイト
// http://go.microsoft.com/fwlink/?LinkId=238214 を参照してください。
//
// Copyright (C) Microsoft Corporation
// All rights reserved.
[!endif]

// [!output CONTAINER_ITEM_IMPL] : [!output CONTAINER_ITEM_CLASS] クラスの実装
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


// [!output CONTAINER_ITEM_CLASS] 実装

IMPLEMENT_SERIAL([!output CONTAINER_ITEM_CLASS], [!output CONTAINER_ITEM_BASE_CLASS], 0)

[!if RICH_EDIT_VIEW]
[!output CONTAINER_ITEM_CLASS]::[!output CONTAINER_ITEM_CLASS](REOBJECT* preo, [!output DOC_CLASS]* pContainer)
	: [!output CONTAINER_ITEM_BASE_CLASS](preo, pContainer)
[!else]
[!output CONTAINER_ITEM_CLASS]::[!output CONTAINER_ITEM_CLASS]([!output DOC_CLASS]* pContainer)
	: [!output CONTAINER_ITEM_BASE_CLASS](pContainer)
[!endif]
{
	// TODO: この位置に 1 度だけ呼ばれる構築用のコードを追加してください。
}

[!output CONTAINER_ITEM_CLASS]::~[!output CONTAINER_ITEM_CLASS]()
{
	// TODO: この場所に後処理用コードを追加してください。
}
[!if !RICH_EDIT_VIEW]

void [!output CONTAINER_ITEM_CLASS]::OnChange(OLE_NOTIFICATION nCode, DWORD dwParam)
{
	ASSERT_VALID(this);

	[!output CONTAINER_ITEM_BASE_CLASS]::OnChange(nCode, dwParam);

	// アイテムが編集されている時には (組み込み先でも 開いていても)
	//  アイテムの状態またはその内容の画面表示の変更に対し、OnChange
	//  通知を送ります。

	// TODO: UpdateAllViews を呼び出してアイテムを無効にしてください。
	//  (アプリケーション特有のヒントを添えて)

	GetDocument()->UpdateAllViews(NULL);
		// すべてのビューをヒント情報なしで更新しました。
}

BOOL [!output CONTAINER_ITEM_CLASS]::OnChangeItemPosition(const CRect& rectPos)
{
	ASSERT_VALID(this);

	// 組み込み先アクティブ化中に [!output CONTAINER_ITEM_CLASS]::OnChangeItemPosition
	//  が、組み込み先ウィンドウの位置を変更するためにサーバーによって
	//  呼び出されます。通常、これは、サーバー ドキュメントの範囲が変更されたり、
	//  組み込み先サイズが変更された結果としてデータが変わった
	//  場合に起こります。
	//
	// ここでの既定動作は、基底クラスを呼び出して、
	//  その結果 [!output CONTAINER_ITEM_BASE_CLASS]::SetItemRects を呼び出し、
	//  項目を新しい位置に移動します。

	if (![!output CONTAINER_ITEM_BASE_CLASS]::OnChangeItemPosition(rectPos))
		return FALSE;

	// TODO:アイテムの四角形/範囲のキャッシュを更新してください。

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

	// 組み込み先が起動している間、[!output CONTAINER_ITEM_CLASS]::OnGetItemPosition
	//  が呼び出されてこの項目の場所を決定します。通常、この四角形は、 
	//  アクティブ化に使われたビューに関連する項目の現在位置を反映します。
	//  [!output CONTAINER_ITEM_CLASS]::GetActiveView 
	//  を呼び出すことによって、ビューを取得することができます。

	// TODO: rPosition にはピクセル単位で正しい四角形を返してください。

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
    // フレームごとに一つだけアイテムのビジュアル編集を可能にします。
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

	// 最初の基底クラスの呼び出しは [!output CONTAINER_ITEM_BASE_CLASS] データへ読み込まれます。
	// これにより、[!output CONTAINER_ITEM_CLASS]::GetDocument から返された
	//  m_pDocument ポインターがセットアップされるため、
	//  基底クラス Serialize を最初に呼び出すことを推奨します。
	[!output CONTAINER_ITEM_BASE_CLASS]::Serialize(ar);

	// [!output CONTAINER_ITEM_CLASS] に対してデータの保存/読み込みを行います。
	if (ar.IsStoring())
	{
		// TODO: 格納するコードをここに追加してください。
	}
	else
	{
		// TODO: 読み込むコードをここに追加してください。
	}
}
[!if CONTAINER_SERVER]

BOOL [!output CONTAINER_ITEM_CLASS]::CanActivate()
{
	// サーバーで編集されているときには組み込み先での編集は
	//  サポートされていません。この場合は組み込み先の起動
	//  を無効にしてください。
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

	// その他は既定動作に任せます。
	return COleClientItem::CanActivate();
}
[!endif]
[!endif]


// [!output CONTAINER_ITEM_CLASS] 診断

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

