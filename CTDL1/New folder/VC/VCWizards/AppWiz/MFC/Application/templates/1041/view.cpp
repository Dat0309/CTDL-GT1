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

// [!output VIEW_IMPL] : [!output VIEW_CLASS] クラスの実装
//

#include "stdafx.h"
// SHARED_HANDLERS は、プレビュー、縮小版、および検索フィルター ハンドラーを実装している ATL プロジェクトで定義でき、
// そのプロジェクトとのドキュメント コードの共有を可能にします。
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
	// 標準印刷コマンド
	ON_COMMAND(ID_FILE_PRINT, &[!output VIEW_BASE_CLASS]::OnFilePrint)
[!endif]
[!endif]
[!else]
[!if PRINTING]
	// 標準印刷コマンド
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
// [!output VIEW_CLASS] コンストラクション/デストラクション

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
	// TODO: 構築コードをここに追加します。

}

[!output VIEW_CLASS]::~[!output VIEW_CLASS]()
{
}
[!if FORM_VIEW || OLEDB_RECORD_VIEW || ODBC_RECORD_VIEW]

void [!output VIEW_CLASS]::DoDataExchange(CDataExchange* pDX)
{
	[!output VIEW_BASE_CLASS]::DoDataExchange(pDX);
[!if ODBC_RECORD_VIEW]
	// コントロールをデータベース フィールドに接続するための DDX_Field* 関数をここに挿入できます。
	// DDX_FieldText(pDX, IDC_MYEDITBOX, m_pSet->m_szColumn1, m_pSet);
	// DDX_FieldCheck(pDX, IDC_MYCHECKBOX, m_pSet->m_bColumn2, m_pSet);
	// 詳細については、MSDN および ODBC サンプルを参照してください。
[!endif]
[!if OLEDB_RECORD_VIEW]
	// データベースをビューにリンクする SetDlgItem*/GetDlgItem* API 呼び出しと同様に、DDX_* 関数を挿入することもできます。
	// ex. ::SetDlgItemText(m_hWnd, IDC_MYCONTROL, m_pSet->m_MyColumn);
	// 詳細については MSDN および OLEDB サンプルを参照してください。
[!endif]
}
[!endif]

BOOL [!output VIEW_CLASS]::PreCreateWindow(CREATESTRUCT& cs)
{
	// TODO: この位置で CREATESTRUCT cs を修正して Window クラスまたはスタイルを
	//  修正してください。

[!if EDIT_VIEW]
	BOOL bPreCreated = CEditView::PreCreateWindow(cs);
	cs.style &= ~(ES_AUTOHSCROLL|WS_HSCROLL);	// ワード ラップを使用可能にします

	return bPreCreated;
[!else]
	return [!output VIEW_BASE_CLASS]::PreCreateWindow(cs);
[!endif]
}
[!if !TREE_VIEW && !LIST_VIEW && !HTML_VIEW && !HTML_EDITVIEW && !RICH_EDIT_VIEW && !EDIT_VIEW && !FORM_VIEW && !OLEDB_RECORD_VIEW && !ODBC_RECORD_VIEW]

// [!output VIEW_CLASS] 描画
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

	// TODO: この場所にネイティブ データ用の描画コードを追加します。
	// TODO: また、ドキュメントのすべての OLE 項目も描画します。

	// 選択範囲を適当な位置に描画します。このコードは実際の描画用のコードが
	//  実装されてから削除してください。組み込み先編集を有効にする
	//  ために、この位置は [!output CONTAINER_ITEM_CLASS],
	//  します。

	// TODO: 最終的な描画用のコードが確定したときにはこのコードは削除してください。
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

	// TODO: この場所にネイティブ データ用の描画コードを追加します。
}[!endif]
[!else]

void [!output VIEW_CLASS]::OnDraw(CDC* /*pDC*/)
{
	[!output DOC_CLASS]* pDoc = GetDocument();
	ASSERT_VALID(pDoc);
	if (!pDoc)
		return;

	// TODO: この場所にネイティブ データ用の描画コードを追加します。
}
[!endif]
[!endif] 
[!if PRINTING]
[!if TREE_VIEW || LIST_VIEW]


void [!output VIEW_CLASS]::OnDraw(CDC* /*pDC*/)
{
	[!output DOC_CLASS]* pDoc = GetDocument();
	ASSERT_VALID(pDoc);

	// TODO: この場所にネイティブ データ用の描画コードを追加します。
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
			// レコードセットを開けませんでした。このレコードセットが 
			// ストアド プロシージャの場合、OpenAll() メソッドを呼び出す前に、
			// 入力パラメーターが正しく初期化されているかどうか
			// 確認してください。

			AfxMessageBox(_T("レコードセットを開けませんでした。"), MB_OK);
			// Recordet を開かずに現在のレコードを変更しようとすると
			// クラッシュの原因となるため、次 および 前 のレコード
			// コマンドを使用不能にします。
			m_bOnFirstRecord = TRUE;
			m_bOnLastRecord = TRUE;
		}
		if( hr == DB_S_ENDOFROWSET )
		{
			// 行セットが空です。行が含まれていません。
			AfxMessageBox(_T("レコード セットが開かれましたが、返す行がありません。"), MB_OK);
			// [次のレコード] および [前のレコード] コマンドを無効にします。
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

	// TODO: GetListCtrl() メンバー関数の呼び出しをとおして直接そのリスト コントロールに
	//  アクセスすることによって ListView をアイテムで固定できます。
[!if TREE_VIEW]

	// TODO:  GetTreeCtrl() メンバー関数の呼び出しをとおして直接そのリスト コントロールに
	//  アクセスすることによって TreeView をアイテムで固定できます。
[!if HTML_VIEW]
	// TODO: このコードはポピュラーなウェッブ サイトへナビゲートします
	//  任意のウェッブ サイトに変更してください
[!endif]
[!endif]
[!endif]
[!if HTML_VIEW]
	Navigate2(_T("http://msdn.microsoft.com/ja-jp/visualc/default.aspx"),NULL,NULL);
[!endif]
[!if CONTAINER || CONTAINER_SERVER]
[!if !RICH_EDIT_VIEW]

	// TODO: 最終的な選択方式のコードが確定したときにはこのコードは削除してください。
	m_pSelection = NULL;    // 選択範囲を初期化します。

[!endif]
[!if RICH_EDIT_VIEW]

	// 印刷時の余白を設定します (720 twips = 1/2 inch).
	SetMargins(CRect(720, 720, 720, 720));
[!endif]
[!endif]
[!if SCROLL_VIEW]
	CSize sizeTotal;
	// TODO: このビューのサイズの合計を計算します。
	sizeTotal.cx = sizeTotal.cy = 100;
	SetScrollSizes(MM_TEXT, sizeTotal);
[!endif]
}
[!endif]
[!if PRINTING]


// [!output VIEW_CLASS] 印刷

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
	// 既定の CEditView の印刷準備
	return CEditView::OnPreparePrinting(pInfo);
[!else]
[!if ACTIVE_DOC_CONTAINER]
	if (!CView::DoPreparePrinting(pInfo))
		return FALSE;
	
	if (!COleDocObjectItem::OnPreparePrinting(this, pInfo))
		return FALSE;

	return TRUE;
[!else]
	// 既定の印刷準備
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
	// 既定の CEditView で印刷を開始します。
	CEditView::OnBeginPrinting(pDC, pInfo);
[!else]
	// TODO: 印刷前の特別な初期化処理を追加してください。
[!endif]
}

[!if EDIT_VIEW]
void [!output VIEW_CLASS]::OnEndPrinting(CDC* pDC, CPrintInfo* pInfo)
[!else]
void [!output VIEW_CLASS]::OnEndPrinting(CDC* /*pDC*/, CPrintInfo* /*pInfo*/)
[!endif]
{
[!if EDIT_VIEW]
	// 既定の CEditView の印刷後の後処理
	CEditView::OnEndPrinting(pDC, pInfo);
[!else]
	// TODO: 印刷後の後処理を追加してください。
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
	// TODO: 印刷用のコードをここに追加してください。
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
	// 消滅時にアイテムを非アクティベートします; これは分割ビューが
	// 使用されている場合には重要です。
   COleClientItem* pActiveItem = GetDocument()->GetInPlaceActiveItem(this);
   if (pActiveItem != NULL && pActiveItem->GetActiveView() == this)
   {
      pActiveItem->Deactivate();
      ASSERT(GetDocument()->GetInPlaceActiveItem(this) == NULL);
   }
   [!output VIEW_BASE_CLASS]::OnDestroy();
}

[!if !RICH_EDIT_VIEW]


// OLE クライアント サポートおよびコマンド

BOOL [!output VIEW_CLASS]::IsSelected(const CObject* pDocItem) const
{
	// [!output CONTAINER_ITEM_CLASS] オブジェクトだけで構成されている時には
	//  [!output CONTAINER_ITEM_CLASS] 以下に示す方法で十分です。異なる選択方式を処理するときには
	//  この場所を書き換えてください。

	// TODO: この関数は選択された OLE クライアントのアイテムに対するテストを実現します。

	return pDocItem == m_pSelection;
}

void [!output VIEW_CLASS]::OnInsertObject()
{
	// 新規の [!output CONTAINER_ITEM_CLASS] オブジェクトの情報を得るための
	//  標準的なオブジェクト挿入ダイアログ ボックスを呼び出します。
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
		// このドキュメントに接続された新規の項目を作成します。
		[!output DOC_CLASS]* pDoc = GetDocument();
		ASSERT_VALID(pDoc);
		pItem = new [!output CONTAINER_ITEM_CLASS](pDoc);
		ASSERT_VALID(pItem);

		// ダイアログ データから項目を初期化します。
		if (!dlg.CreateItem(pItem))
			AfxThrowMemoryException();  // 例外処理を行います。
		ASSERT_VALID(pItem);
		
[!if ACTIVE_DOC_CONTAINER]
		pItem->DoVerb(OLEIVERB_SHOW, this);
[!else]
        if (dlg.GetSelectionType() == COleInsertDialog::createNewItem)
			pItem->DoVerb(OLEIVERB_SHOW, this);
[!endif]

		ASSERT_VALID(pItem);
		// 暫定的なユーザー インターフェイスのデザインとして最後に挿入された
		//  アイテムを選択しています。

		// TODO: アプリケーションに適当な選択方式にあわせて書き直してください。
		m_pSelection = pItem;   // 最後に挿入されたアイテムを選択
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

// 以下に示すコマンド ハンドラーは組み込み先編集を中止するための標準的な
//  キーボード ユーザー インターフェイスを用意しています。ここではコンテナー
//  (サーバーではない)が非アクティブ化を引き起こします。
void [!output VIEW_CLASS]::OnCancelEditCntr()
{
	// このビュー上にある組み込み先で有効なアイテムを閉じます。
	COleClientItem* pActiveItem = GetDocument()->GetInPlaceActiveItem(this);
	if (pActiveItem != NULL)
	{
		pActiveItem->Close();
	}
	ASSERT(GetDocument()->GetInPlaceActiveItem(this) == NULL);
}

// オブジェクトが組み込み先で編集されはじめたときには OnSetFocus と OnSize の特別な
//  ハンドリングにはコンテナーが必要です。
void [!output VIEW_CLASS]::OnSetFocus(CWnd* pOldWnd)
{
	COleClientItem* pActiveItem = GetDocument()->GetInPlaceActiveItem(this);
	if (pActiveItem != NULL &&
		pActiveItem->GetItemState() == COleClientItem::activeUIState)
	{
		// 同じビューにあるアイテムにはフォーカスを設定する必要があります。
		CWnd* pWnd = pActiveItem->GetInPlaceWindow();
		if (pWnd != NULL)
		{
			pWnd->SetFocus();   // 基底クラスを呼び出しません。
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
	//既定では、Active ドキュメントは、IOleCommandTarget を使って
	//印刷されます。この動作が不要な場合は、
	//COleDocObjectItem::DoDefaultPrinting への呼び出しを削除してください。
	//呼び出しが失敗した場合は、IPrint インターフェイスを使って
	//docobject を印刷します。
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

// OLE Server サポート

// 以下に示すコマンド ハンドラーは組み込み先編集を中止するための標準的な
//  キーボード ユーザー インターフェイスを用意しています。ここではコンテナー
//  (サーバーではない)が非アクティブ化を引き起こします。
void [!output VIEW_CLASS]::OnCancelEditSrvr()
{
	GetDocument()->OnDeactivateUI(FALSE);
}
[!endif]


// [!output VIEW_CLASS] 診断

#ifdef _DEBUG
void [!output VIEW_CLASS]::AssertValid() const
{
	[!output VIEW_BASE_CLASS]::AssertValid();
}

void [!output VIEW_CLASS]::Dump(CDumpContext& dc) const
{
	[!output VIEW_BASE_CLASS]::Dump(dc);
}

[!output DOC_CLASS]* [!output VIEW_CLASS]::GetDocument() const // デバッグ以外のバージョンはインラインです。
{
	ASSERT(m_pDocument->IsKindOf(RUNTIME_CLASS([!output DOC_CLASS])));
	return ([!output DOC_CLASS]*)m_pDocument;
}
#endif //_DEBUG
[!if OLEDB_RECORD_VIEW]


// [!output VIEW_CLASS] データベース サポート
CRowset<>* [!output VIEW_CLASS]::OnGetRowset()
{
	return m_pSet->GetRowsetBase();
}

[!endif]
[!if ODBC_RECORD_VIEW]


// [!output VIEW_CLASS] データベース サポート
CRecordset* [!output VIEW_CLASS]::OnGetRecordset()
{
	return m_pSet;
}

[!endif]


// [!output VIEW_CLASS] メッセージ ハンドラー
[!if PROJECT_STYLE_EXPLORER]
[!if LIST_VIEW]
void [!output VIEW_CLASS]::OnStyleChanged(int nStyleType, LPSTYLESTRUCT lpStyleStruct)
{
	//TODO: ユーザーが変更するウィンドウのビュー スタイルに対応するコードを追加してください	
	[!output VIEW_BASE_CLASS]::OnStyleChanged(nStyleType,lpStyleStruct);	
}
[!endif]
[!endif]
