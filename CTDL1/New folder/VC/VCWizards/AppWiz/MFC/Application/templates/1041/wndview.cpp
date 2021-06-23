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

// [!output WND_VIEW_IMPL] : [!output WND_VIEW_CLASS] クラスの実装
//

#include "stdafx.h"
#include "[!output APP_HEADER]"
#include "[!output WND_VIEW_HEADER]"

#ifdef _DEBUG
#define new DEBUG_NEW
#endif


// [!output WND_VIEW_CLASS]

[!output WND_VIEW_CLASS]::[!output WND_VIEW_CLASS]()
{
[!if ACCESSIBILITY]
	EnableActiveAccessibility();
[!endif]
}

[!output WND_VIEW_CLASS]::~[!output WND_VIEW_CLASS]()
{
}


BEGIN_MESSAGE_MAP([!output WND_VIEW_CLASS], [!output WND_VIEW_BASE_CLASS])
	ON_WM_PAINT()
END_MESSAGE_MAP()



// [!output WND_VIEW_CLASS] メッセージ ハンドラー

BOOL [!output WND_VIEW_CLASS]::PreCreateWindow(CREATESTRUCT& cs) 
{
	if (!CWnd::PreCreateWindow(cs))
		return FALSE;

	cs.dwExStyle |= WS_EX_CLIENTEDGE;
	cs.style &= ~WS_BORDER;
	cs.lpszClass = AfxRegisterWndClass(CS_HREDRAW|CS_VREDRAW|CS_DBLCLKS, 
		::LoadCursor(NULL, IDC_ARROW), reinterpret_cast<HBRUSH>(COLOR_WINDOW+1), NULL);

	return TRUE;
}

void [!output WND_VIEW_CLASS]::OnPaint() 
{
	CPaintDC dc(this); // 描画のデバイス コンテキスト
	
	// TODO: ここにメッセージ ハンドラー コードを追加します。
	
	// メッセージの描画のために CWnd::OnPaint() を呼び出さないでください。
}

