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

// [!output INPLACE_FRAME_IMPL] : [!output INPLACE_FRAME_CLASS] クラスの実装
//

#include "stdafx.h"
#include "[!output APP_HEADER]"

#include "[!output INPLACE_FRAME_HEADER]"

#ifdef _DEBUG
#define new DEBUG_NEW
#endif


// [!output INPLACE_FRAME_CLASS]

IMPLEMENT_DYNCREATE([!output INPLACE_FRAME_CLASS], [!output INPLACE_FRAME_BASE_CLASS])

BEGIN_MESSAGE_MAP([!output INPLACE_FRAME_CLASS], [!output INPLACE_FRAME_BASE_CLASS])
	ON_WM_CREATE()
END_MESSAGE_MAP()


// [!output INPLACE_FRAME_CLASS] コンストラクション/デストラクション

[!output INPLACE_FRAME_CLASS]::[!output INPLACE_FRAME_CLASS]()
{
[!if ACCESSIBILITY]
	EnableActiveAccessibility();
[!endif]
}

[!output INPLACE_FRAME_CLASS]::~[!output INPLACE_FRAME_CLASS]()
{
}

int [!output INPLACE_FRAME_CLASS]::OnCreate(LPCREATESTRUCT lpCreateStruct)
{
	if ([!output INPLACE_FRAME_BASE_CLASS]::OnCreate(lpCreateStruct) == -1)
		return -1;

	// CResizeBar は組み込み先でのサイズの変更を実現します。
	if (!m_wndResizeBar.Create(this))
	{
		TRACE0("Failed to create resize bar\n");
		return -1;      // 作成できませんでした。
	}

	// 既定で、ドロップ ターゲットをフレーム ウィンドウと共に登録し
	//  ないのは、良い考えです。これは "falling through" ドロップからコ
	//  ンテナのドラッグ アンド ドロップ サポートを保護します。
	m_dropTarget.Register(this);

	return 0;
}

[!if DOCKING_TOOLBAR || TOOLBAR_STYLE_REBAR || MENUBAR_TOOLBAR  || RIBBON_TOOLBAR]
// OnCreateControlBars はコンテナー アプリケーションのウィンドウ上にツール バーを作成するために、
//  フレームワークから呼ばれます。pWndFrame はコンテナーのトップ レベルのフレーム ウィンドウで、
//  常に NULL ではありません。pWndDoc はドキュメント レベルのフレーム ウィンドウでコンテナーが SDI
//  アプリケーションのときに NULL になります。サーバー アプリケーションは他のウィンドウに MFC の
//  コントロール バーを配置できます。
BOOL [!output INPLACE_FRAME_CLASS]::OnCreateControlBars(CFrameWnd* pWndFrame, CFrameWnd* pWndDoc)
{
	// pWndDoc を使用する場合はこのコードを削除します。
	UNREFERENCED_PARAMETER(pWndDoc);

	// メッセージが正しいアプリケーションに渡されるように、このウィンドウにオーナーを設定します。
	m_wndToolBar.SetOwner(this);

[!if MENUBAR_TOOLBAR || RIBBON_TOOLBAR]
	if (![!output INPLACE_FRAME_BASE_CLASS]::OnCreateControlBars(pWndFrame, pWndDoc))
	{
		return FALSE;
	}

	COleCntrFrameWndEx* pNewFrame = DYNAMIC_DOWNCAST(COleCntrFrameWndEx, m_pMainFrame);
	ASSERT_VALID(pNewFrame);
[!endif]

	// クライアントのフレーム ウィンドウにツール バーを作成します。
[!if TOOLBAR_STYLE_REBAR]
	if (!m_wndToolBar.CreateEx(pWndFrame, TBSTYLE_FLAT | TBSTYLE_TRANSPARENT) ||
[!else]
[!if MENUBAR_TOOLBAR || RIBBON_TOOLBAR]
	if (!m_wndToolBar.CreateEx(pNewFrame, TBSTYLE_FLAT,WS_CHILD | WS_VISIBLE | CBRS_TOP
		| CBRS_GRIPPER | CBRS_TOOLTIPS | CBRS_FLYBY | CBRS_SIZE_DYNAMIC) ||
[!else]
	if (!m_wndToolBar.CreateEx(pWndFrame, TBSTYLE_FLAT,WS_CHILD | WS_VISIBLE | CBRS_TOP
		| CBRS_GRIPPER | CBRS_TOOLTIPS | CBRS_FLYBY | CBRS_SIZE_DYNAMIC) ||
[!endif]
[!endif]
[!if APP_TYPE_MDI]
[!if MENUBAR_TOOLBAR]
		!m_wndToolBar.LoadToolBar(theApp.m_bHiColorIcons ? IDR_[!output SAFE_DOC_TYPE_NAME]TYPE_SRVR_IP_256 : IDR_[!output SAFE_DOC_TYPE_NAME]TYPE_SRVR_IP))
[!else]
		!m_wndToolBar.LoadToolBar(IDR_[!output SAFE_DOC_TYPE_NAME]TYPE_SRVR_IP))
[!endif]
[!else]
[!if MENUBAR_TOOLBAR]
		!m_wndToolBar.LoadToolBar(theApp.m_bHiColorIcons ? IDR_SRVR_INPLACE_256 : IDR_SRVR_INPLACE))
[!else]
		!m_wndToolBar.LoadToolBar(IDR_SRVR_INPLACE))
[!endif]
[!endif]
	{
		TRACE0("Failed to create toolbar\n");
		return FALSE;
	}

[!if TOOLBAR_STYLE_REBAR]
	// メッセージが正しいアプリケーションに渡されるように、このウィンドウにオーナーを設定します。
	m_wndDlgBar.SetOwner(this);

	// クライアントのフレーム ウィンドウにダイアログ バーを作成します。
[!if APP_TYPE_MDI]
	if (!m_wndDlgBar.Create(pWndFrame, IDR_[!output SAFE_DOC_TYPE_NAME]TYPE_SRVR_IP, 
[!else]
	if (!m_wndDlgBar.Create(pWndFrame, IDR_SRVR_INPLACE,
[!endif]
		CBRS_ALIGN_TOP, AFX_IDW_DIALOGBAR))
	{
		TRACE0("Failed to create dialogbar\n");
		return FALSE;
	}

	// このウィンドウのオーナーを設定することにより、メッセージが正しいアプリケーションに配信されます。
	m_wndReBar.SetOwner(this);

	// クライアントのフレームに rebar を作成します。
	if (!m_wndReBar.Create(pWndFrame) ||
		!m_wndReBar.AddBar(&m_wndToolBar) ||
		!m_wndReBar.AddBar(&m_wndDlgBar))
	{
		TRACE0("Failed to create rebar\n");
		return FALSE;
	}

[!else]
	// TODO: ツール バーをドッキング可能にしない場合は、これらの 3 行を削除してください。
	m_wndToolBar.EnableDocking(CBRS_ALIGN_ANY);
[!if MENUBAR_TOOLBAR || RIBBON_TOOLBAR]
	pNewFrame->EnableDocking(CBRS_ALIGN_ANY);
	pNewFrame->DockPane(&m_wndToolBar);

	// TODO: ツール ヒントを表示しない場合は、削除してください。
	m_wndToolBar.SetControlBarStyle(m_wndToolBar.GetPaneStyle() |
		CBRS_TOOLTIPS | CBRS_FLYBY);
[!else]
	pWndFrame->EnableDocking(CBRS_ALIGN_ANY);
	pWndFrame->DockControlBar(&m_wndToolBar);
[!endif]
[!endif]

	return TRUE;
}

[!endif]
BOOL [!output INPLACE_FRAME_CLASS]::PreCreateWindow(CREATESTRUCT& cs)
{
	// TODO: CREATESTRUCT cs を変更して、Window クラスまたはスタイルを変更します。

	return [!output INPLACE_FRAME_BASE_CLASS]::PreCreateWindow(cs);
}


// [!output INPLACE_FRAME_CLASS] 診断

#ifdef _DEBUG
void [!output INPLACE_FRAME_CLASS]::AssertValid() const
{
	[!output INPLACE_FRAME_BASE_CLASS]::AssertValid();
}

void [!output INPLACE_FRAME_CLASS]::Dump(CDumpContext& dc) const
{
	[!output INPLACE_FRAME_BASE_CLASS]::Dump(dc);
}
#endif //_DEBUG


// [!output INPLACE_FRAME_CLASS] コマンド

