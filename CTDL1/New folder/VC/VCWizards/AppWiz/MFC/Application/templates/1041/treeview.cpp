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

// [!output TREE_VIEW_IMPL] : [!output TREE_VIEW_CLASS] クラスの実装
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
	// 標準印刷コマンド
	ON_COMMAND(ID_FILE_PRINT, &[!output TREE_VIEW_BASE_CLASS]::OnFilePrint)
	ON_COMMAND(ID_FILE_PRINT_DIRECT, &[!output TREE_VIEW_BASE_CLASS]::OnFilePrint)
	ON_COMMAND(ID_FILE_PRINT_PREVIEW, &[!output TREE_VIEW_BASE_CLASS]::OnFilePrintPreview)
[!endif]
END_MESSAGE_MAP()


// [!output TREE_VIEW_CLASS] コンストラクション/デストラクション

[!output TREE_VIEW_CLASS]::[!output TREE_VIEW_CLASS]()
{
[!if ACCESSIBILITY]
	EnableActiveAccessibility();
[!endif]
	// TODO: 構築コードをここに追加します。
}

[!output TREE_VIEW_CLASS]::~[!output TREE_VIEW_CLASS]()
{
}

BOOL [!output TREE_VIEW_CLASS]::PreCreateWindow(CREATESTRUCT& cs)
{
	// TODO: CREATESTRUCT cs を変更して、Window クラスまたはスタイルを変更します。

	return [!output TREE_VIEW_BASE_CLASS]::PreCreateWindow(cs);
}
[!if PRINTING]


// [!output TREE_VIEW_CLASS] 印刷

BOOL [!output TREE_VIEW_CLASS]::OnPreparePrinting(CPrintInfo* pInfo)
{
	// 既定の印刷準備
	return DoPreparePrinting(pInfo);
}

void [!output TREE_VIEW_CLASS]::OnDraw(CDC* /*pDC*/)
{
	[!output DOC_CLASS]* pDoc = GetDocument();
	ASSERT_VALID(pDoc);

	// TODO: この場所にネイティブ データ用の描画コードを追加します。
}

void [!output TREE_VIEW_CLASS]::OnBeginPrinting(CDC* /*pDC*/, CPrintInfo* /*pInfo*/)
{
	// TODO: 印刷前の特別な初期化処理を追加してください。
}

void [!output TREE_VIEW_CLASS]::OnEndPrinting(CDC* /*pDC*/, CPrintInfo* /*pInfo*/)
{
	// TODO: 印刷後の後処理を追加してください。
}
[!endif]

void [!output TREE_VIEW_CLASS]::OnInitialUpdate()
{
	[!output TREE_VIEW_BASE_CLASS]::OnInitialUpdate();

	// TODO:  GetTreeCtrl() メンバー関数の呼び出しをとおして直接そのリスト コントロールに
	//  アクセスすることによって TreeView をアイテムで固定できます。
}


// [!output TREE_VIEW_CLASS] 診断

#ifdef _DEBUG
void [!output TREE_VIEW_CLASS]::AssertValid() const
{
	[!output TREE_VIEW_BASE_CLASS]::AssertValid();
}

void [!output TREE_VIEW_CLASS]::Dump(CDumpContext& dc) const
{
	[!output TREE_VIEW_BASE_CLASS]::Dump(dc);
}

[!output DOC_CLASS]* [!output TREE_VIEW_CLASS]::GetDocument() // デバッグ以外のバージョンはインラインです。
{
	ASSERT(m_pDocument->IsKindOf(RUNTIME_CLASS([!output DOC_CLASS])));
	return ([!output DOC_CLASS]*)m_pDocument;
}
#endif //_DEBUG


// [!output TREE_VIEW_CLASS] メッセージ ハンドラー
