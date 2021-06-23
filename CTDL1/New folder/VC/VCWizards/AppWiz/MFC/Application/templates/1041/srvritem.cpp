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

// [!output SERVER_ITEM_IMPL] : [!output SERVER_ITEM_CLASS] クラスの実装
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


// [!output SERVER_ITEM_CLASS] 実装

IMPLEMENT_DYNAMIC([!output SERVER_ITEM_CLASS], [!output SERVER_ITEM_BASE_CLASS])

[!output SERVER_ITEM_CLASS]::[!output SERVER_ITEM_CLASS]([!output DOC_CLASS]* pContainerDoc)
	: [!output SERVER_ITEM_BASE_CLASS](pContainerDoc, TRUE)
{
	// TODO: この位置に 1 度だけ呼ばれる構築用のコードを追加してください。
	//  (たとえば、アイテム データ ソース用の特別なクリップボード形式の追加)
}

[!output SERVER_ITEM_CLASS]::~[!output SERVER_ITEM_CLASS]()
{
	// TODO: この場所に後処理用コードを追加してください。
}

void [!output SERVER_ITEM_CLASS]::Serialize(CArchive& ar)
{
	// [!output SERVER_ITEM_CLASS]::Serialize はアイテムがクリップボードにコピーさ
	//  れているときには、フレームワークによって呼ばれます。これは OLE コール
	//  バック OnGetClipboardData を通り越して自動的に行わせることができます。
	//  埋め込みアイテムの既定は簡単なドキュメントのシリアライズ関数の代
	//  わりをします。
	//  リンクをサポートしているときは、ドキュメントの一部をシリアライズします。

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
	// 多くのアプリケーションでは、アイテムのコンテンツ アスペクトの描画だけをハンドルします。
	//  OnDrawEx がオーバーライドしている DVASPECT_THUMBNAIL で他のアスペクトもサポートする
	//  時には、OnGetExtent を追加するアスペクトもハンドルするように変更してください。
	//
	//

	if (dwDrawAspect != DVASPECT_CONTENT)
		return [!output SERVER_ITEM_BASE_CLASS]::OnGetExtent(dwDrawAspect, rSize);

	// [!output SERVER_ITEM_CLASS]::OnGetExtent は、項目全体の
	//  HIMETRIC 単位の範囲を取得するために呼び出されます。
	//  既定値では、単純にハードコーディングされた値を返します。

	// TODO: 適当なサイズに置き換えてください。

	rSize = CSize(3000, 3000);   // 3000 x 3000 HIMETRIC ユニット

	return TRUE;
}

BOOL [!output SERVER_ITEM_CLASS]::OnDraw(CDC* pDC, CSize& rSize)
{
	if (!pDC)
		return FALSE;

	// rSize を使う場合はこれを削除します。
	UNREFERENCED_PARAMETER(rSize);

	// TODO: マッピング モードと範囲の設定。
	//  (範囲は通常 OnGetExtent から返されたサイズと同じです)
	pDC->SetMapMode(MM_ANISOTROPIC);
	pDC->SetWindowOrg(0,0);
	pDC->SetWindowExt(3000, 3000);

	// TODO: この場所に描画用のコードを追加します。任意で HIMETRIC の範囲を塗りつぶしてください。
	//  メタファイル デバイス コンテキスト (pDC) のすべてを描画します。

[!if CONTAINER_SERVER]
	// TODO: 埋め込み [!output CONTAINER_ITEM_CLASS] オブジェクトも描画してください。

[!endif]
[!if CONTAINER_SERVER]
	// 以下のコードは、任意の位置に、最初の項目を描画します。

	// TODO: 実際の描画コードが完了したときにこのコードを削除します。

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


// [!output SERVER_ITEM_CLASS] 診断

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

