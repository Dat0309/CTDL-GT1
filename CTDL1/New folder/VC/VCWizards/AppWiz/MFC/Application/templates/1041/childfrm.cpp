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

// [!output CHILD_FRAME_IMPL] : [!output CHILD_FRAME_CLASS] クラスの実装
//

#include "stdafx.h"
#include "[!output APP_HEADER]"

#include "[!output CHILD_FRAME_HEADER]"
[!if PROJECT_STYLE_EXPLORER]
#include "[!output TREE_VIEW_HEADER]"
#include "[!output VIEW_HEADER]"
[!endif]

#ifdef _DEBUG
#define new DEBUG_NEW
#endif

// [!output CHILD_FRAME_CLASS]

IMPLEMENT_DYNCREATE([!output CHILD_FRAME_CLASS], [!output CHILD_FRAME_BASE_CLASS])

BEGIN_MESSAGE_MAP([!output CHILD_FRAME_CLASS], [!output CHILD_FRAME_BASE_CLASS])
[!if !DOCVIEW]
	ON_COMMAND(ID_FILE_CLOSE, &[!output CHILD_FRAME_CLASS]::OnFileClose)
	ON_WM_SETFOCUS()
	ON_WM_CREATE()
[!endif]
[!if PROJECT_STYLE_EXPLORER]
[!if LIST_VIEW]
	ON_UPDATE_COMMAND_UI_RANGE(AFX_ID_VIEW_MINIMUM, AFX_ID_VIEW_MAXIMUM, &[!output CHILD_FRAME_CLASS]::OnUpdateViewStyles)
	ON_COMMAND_RANGE(AFX_ID_VIEW_MINIMUM, AFX_ID_VIEW_MAXIMUM, &[!output CHILD_FRAME_CLASS]::OnViewStyle)
[!endif]
[!endif]
[!if PRINTING]
[!if RIBBON_TOOLBAR]
	ON_COMMAND(ID_FILE_PRINT, &[!output CHILD_FRAME_CLASS]::OnFilePrint)
	ON_COMMAND(ID_FILE_PRINT_DIRECT, &[!output CHILD_FRAME_CLASS]::OnFilePrint)
	ON_COMMAND(ID_FILE_PRINT_PREVIEW, &[!output CHILD_FRAME_CLASS]::OnFilePrintPreview)
	ON_UPDATE_COMMAND_UI(ID_FILE_PRINT_PREVIEW, &[!output CHILD_FRAME_CLASS]::OnUpdateFilePrintPreview)
[!endif]
[!endif]
END_MESSAGE_MAP()

// [!output CHILD_FRAME_CLASS] コンストラクション/デストラクション

[!output CHILD_FRAME_CLASS]::[!output CHILD_FRAME_CLASS]()
{
[!if ACCESSIBILITY]
	EnableActiveAccessibility();
[!endif]
	// TODO: メンバー初期化コードをここに追加してください。
}

[!output CHILD_FRAME_CLASS]::~[!output CHILD_FRAME_CLASS]()
{
}

[!if APP_TYPE_MDI && SPLITTER]
BOOL [!output CHILD_FRAME_CLASS]::OnCreateClient(LPCREATESTRUCT /*lpcs*/, CCreateContext* pContext)
{
[!if PROJECT_STYLE_EXPLORER]
	// 分割ウィンドウの作成
	if (!m_wndSplitter.CreateStatic(this, 1, 2))
		return FALSE;

	if (!m_wndSplitter.CreateView(0, 0, RUNTIME_CLASS([!output TREE_VIEW_CLASS]), CSize(100, 100), pContext) ||
		!m_wndSplitter.CreateView(0, 1, RUNTIME_CLASS([!output VIEW_CLASS]), CSize(100, 100), pContext))
	{
		m_wndSplitter.DestroyWindow();
		return FALSE;
	}
	return TRUE;
[!else]
[!if HTML_VIEW || HTML_EDITVIEW]
	return m_wndSplitter.Create(this,
		2, 2,			// TODO: 行と列の数を調整してください。
		CSize(10, 10),	// TODO: 最小ペインのサイズを変更します。
		pContext, WS_CHILD | WS_VISIBLE | SPLS_DYNAMIC_SPLIT);
[!else]
	return m_wndSplitter.Create(this,
		2, 2,			// TODO: 行と列の数を調整してください。
		CSize(10, 10),	// TODO: 最小ペインのサイズを変更します。
		pContext);
[!endif]
[!endif]
}
[!else]
[!if PROJECT_STYLE_EXPLORER]
BOOL [!output CHILD_FRAME_CLASS]::OnCreateClient(LPCREATESTRUCT /*lpcs*/, CCreateContext* pContext)
{
	// 分割ウィンドウの作成
	if (!m_wndSplitter.CreateStatic(this, 1, 2))
		return FALSE;

	if (!m_wndSplitter.CreateView(0, 0, RUNTIME_CLASS([!output TREE_VIEW_CLASS]), CSize(100, 100), pContext) ||
		!m_wndSplitter.CreateView(0, 1, RUNTIME_CLASS([!output VIEW_CLASS]), CSize(100, 100), pContext))
	{
		m_wndSplitter.DestroyWindow();
		return FALSE;
	}
	return TRUE;
}
[!endif]
[!endif]

BOOL [!output CHILD_FRAME_CLASS]::PreCreateWindow(CREATESTRUCT& cs)
{
	// TODO: CREATESTRUCT cs を変更して、Window クラスまたはスタイルを変更します。
	if( ![!output CHILD_FRAME_BASE_CLASS]::PreCreateWindow(cs) )
		return FALSE;

[!if !CHILD_FRAME_DEFAULT_STYLES]
	cs.style = WS_CHILD | WS_VISIBLE | WS_OVERLAPPED | WS_CAPTION | WS_SYSMENU
		| FWS_ADDTOTITLE[!output CHILD_FRAME_STYLE_FLAGS];

[!endif]
[!if !DOCVIEW]
	cs.dwExStyle &= ~WS_EX_CLIENTEDGE;
	cs.lpszClass = AfxRegisterWndClass(0);
[!endif]
	return TRUE;
}

// [!output CHILD_FRAME_CLASS] 診断

#ifdef _DEBUG
void [!output CHILD_FRAME_CLASS]::AssertValid() const
{
	[!output CHILD_FRAME_BASE_CLASS]::AssertValid();
}

void [!output CHILD_FRAME_CLASS]::Dump(CDumpContext& dc) const
{
	[!output CHILD_FRAME_BASE_CLASS]::Dump(dc);
}
#endif //_DEBUG

// [!output CHILD_FRAME_CLASS] メッセージ ハンドラー
[!if PROJECT_STYLE_EXPLORER]
[!if LIST_VIEW]
[!output VIEW_CLASS]* [!output CHILD_FRAME_CLASS]::GetRightPane()
{
	CWnd* pWnd = m_wndSplitter.GetPane(0, 1);
	[!output VIEW_CLASS]* pView = DYNAMIC_DOWNCAST([!output VIEW_CLASS], pWnd);
	return pView;
}

void [!output CHILD_FRAME_CLASS]::OnUpdateViewStyles(CCmdUI* pCmdUI)
{
	if (!pCmdUI)
		return;

	// TODO: [表示] メニューの選択肢を処理するには、このコードをカスタマイズまたは拡張します。
	[!output VIEW_CLASS]* pView = GetRightPane(); 

	// 右側のペインが作成されていないか、ビューになっていない場合は、この範囲のコマンドを無効にします。
	if (pView == NULL)
		pCmdUI->Enable(FALSE);
	else
	{
		DWORD dwStyle = pView->GetStyle() & LVS_TYPEMASK;
		// もしコマンドが ID_VIEW_LINEUP ならば、LVS_ICON or LVS_SMALLICON
		// モードになった場合だけ、このコマンドを有効にします
		if (pCmdUI->m_nID == ID_VIEW_LINEUP)
		{
			if (dwStyle == LVS_ICON || dwStyle == LVS_SMALLICON)
				pCmdUI->Enable();
			else
				pCmdUI->Enable(FALSE);
		}
		else
		{
			// それ以外の場合は、ビューのスタイルを反映させるためにドットを使ってください。
			pCmdUI->Enable();
			BOOL bChecked = FALSE;

			switch (pCmdUI->m_nID)
			{
			case ID_VIEW_DETAILS:
				bChecked = (dwStyle == LVS_REPORT);
				break;

			case ID_VIEW_SMALLICON:
				bChecked = (dwStyle == LVS_SMALLICON);
				break;

			case ID_VIEW_LARGEICON:
				bChecked = (dwStyle == LVS_ICON);
				break;

			case ID_VIEW_LIST:
				bChecked = (dwStyle == LVS_LIST);
				break;

			default:
				bChecked = FALSE;
				break;
			}

			pCmdUI->SetRadio(bChecked ? 1 : 0);
		}
	}
}

void [!output CHILD_FRAME_CLASS]::OnViewStyle(UINT nCommandID)
{
	// TODO: [表示] メニューの選択肢を処理するには、このコードをカスタマイズまたは拡張します。
	[!output VIEW_CLASS]* pView = GetRightPane();

	// 右側のペインが作成されていて、[!output VIEW_CLASS] である場合、メニュー コマンドを処理します...
	if (pView != NULL)
	{
		int nStyle = -1;

		switch (nCommandID)
		{
		case ID_VIEW_LINEUP:
			{
				// リスト コントロールのアイコンをグリッド位置に合わせます。
				CListCtrl& refListCtrl = pView->GetListCtrl();
				refListCtrl.Arrange(LVA_SNAPTOGRID);
			}
			break;

		// 他のコマンドはリスト コントロールのスタイルを変更します。
		case ID_VIEW_DETAILS:
			nStyle = LVS_REPORT;
			break;

		case ID_VIEW_SMALLICON:
			nStyle = LVS_SMALLICON;
			break;

		case ID_VIEW_LARGEICON:
			nStyle = LVS_ICON;
			break;

		case ID_VIEW_LIST:
			nStyle = LVS_LIST;
			break;
		}

		// スタイル変更; ウィンドウは自動的に再描画します。
		if (nStyle != -1)
			pView->ModifyStyle(LVS_TYPEMASK, nStyle);
	}
}
[!endif]
[!endif]
[!if !DOCVIEW]
void [!output CHILD_FRAME_CLASS]::OnFileClose() 
{
	// このフレームを閉じるには、WM_CLOSE を送ります。このメッセージは、
	// システム メニューの [閉じる] を選択した場合と同じです。
	SendMessage(WM_CLOSE);
}

int [!output CHILD_FRAME_CLASS]::OnCreate(LPCREATESTRUCT lpCreateStruct) 
{
	if ([!output CHILD_FRAME_BASE_CLASS]::OnCreate(lpCreateStruct) == -1)
		return -1;
	
	// フレームのクライアント領域全体を占めるビューを作成します。
	if (!m_wndView.Create(NULL, NULL, AFX_WS_DEFAULT_VIEW, 
		CRect(0, 0, 0, 0), this, AFX_IDW_PANE_FIRST, NULL))
	{
		TRACE0("ビュー ウィンドウを作成できませんでした。\n");
		return -1;
	}

	return 0;
}

void [!output CHILD_FRAME_CLASS]::OnSetFocus(CWnd* pOldWnd) 
{
	[!output CHILD_FRAME_BASE_CLASS]::OnSetFocus(pOldWnd);

	m_wndView.SetFocus();
}

BOOL [!output CHILD_FRAME_CLASS]::OnCmdMsg(UINT nID, int nCode, void* pExtra, AFX_CMDHANDLERINFO* pHandlerInfo) 
{
	// ビューに最初にコマンドを処理する機会を与えます。
	if (m_wndView.OnCmdMsg(nID, nCode, pExtra, pHandlerInfo))
		return TRUE;
	
	// それ以外の場合は、既定の処理を行います。
	return [!output CHILD_FRAME_BASE_CLASS]::OnCmdMsg(nID, nCode, pExtra, pHandlerInfo);
}
[!endif]
[!if PRINTING]
[!if RIBBON_TOOLBAR]

void [!output CHILD_FRAME_CLASS]::OnFilePrint()
{
	if (m_dockManager.IsPrintPreviewValid())
	{
		PostMessage(WM_COMMAND, AFX_ID_PREVIEW_PRINT);
	}
}

void [!output CHILD_FRAME_CLASS]::OnFilePrintPreview()
{
	if (m_dockManager.IsPrintPreviewValid())
	{
		PostMessage(WM_COMMAND, AFX_ID_PREVIEW_CLOSE);  // 印刷プレビュー モードを強制的に終了する
	}
}

void [!output CHILD_FRAME_CLASS]::OnUpdateFilePrintPreview(CCmdUI* pCmdUI)
{
	pCmdUI->SetCheck(m_dockManager.IsPrintPreviewValid());
}
[!endif]
[!endif]
