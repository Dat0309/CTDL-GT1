// [!output IMPL_FILE] : 実装ファイル
//

#include "stdafx.h"
[!if PROJECT_NAME_HEADER]
#include "[!output PROJECT_NAME].h"
[!endif]
#include "[!output HEADER_FILE]"
[!if !MERGE_FILE]

#ifdef _DEBUG
#define new DEBUG_NEW
#endif
[!endif]


// [!output CLASS_NAME]

IMPLEMENT_DYNCREATE([!output CLASS_NAME], [!output BASE_CLASS_SAFE])

[!output CLASS_NAME]::[!output CLASS_NAME]()
{
[!if ACCESSIBILITY]
#ifndef _WIN32_WCE
	EnableActiveAccessibility();
#endif
[!endif]

[!if AUTOMATION || CREATABLE]
	EnableAutomation();
[!endif]
[!if CREATABLE]
	
	// OLE オートメーション オブジェクトがアクティブである限り、アプリケーションを 
	//	実行状態にしてください、コンストラクターは AfxOleLockApp を呼び出します。
	
	AfxOleLockApp();
[!endif]
}

[!output CLASS_NAME]::~[!output CLASS_NAME]()
{
[!if CREATABLE]
	// すべてのオブジェクトが OLE オートメーションで作成された場合にアプリケーション
	//	を終了するために、デストラクターが AfxOleUnlockApp を呼び出します。
	
	AfxOleUnlockApp();
[!endif]
}
[!if AUTOMATION || CREATABLE]

void [!output CLASS_NAME]::OnFinalRelease()
{
	// オートメーション オブジェクトに対する最後の参照が解放されるときに
	// OnFinalRelease が呼び出されます。基底クラスは自動的にオブジェク
	// トを削除します。基底クラスを呼び出す前に、オブジェクトで必要な特
	// 別な後処理を追加してください。

	[!output BASE_CLASS_SAFE]::OnFinalRelease();
}
[!endif]

BOOL [!output CLASS_NAME]::OnCreateClient(LPCREATESTRUCT /*lpcs*/, CCreateContext* pContext)
{
	return m_wndSplitter.Create(this,
		2, 2,       // TODO: 行と列の数を調整してください。
		CSize(10, 10),  // TODO: 最小ペインのサイズを変更します。
		pContext);
}

BEGIN_MESSAGE_MAP([!output CLASS_NAME], [!output BASE_CLASS_SAFE])
END_MESSAGE_MAP()
[!if AUTOMATION || CREATABLE]

BEGIN_DISPATCH_MAP([!output CLASS_NAME], [!output BASE_CLASS_SAFE])
END_DISPATCH_MAP()

// メモ: VBA からタイプ セーフなバインドをサポートするために、IID_I[!output CLASS_NAME_ROOT] のサポートを追加します。
//  この IID は、.IDL ファイルのディスパッチ インターフェイスへアタッチされる 
//  GUID と一致しなければなりません。

// {[!output DISPIID_REGISTRY_FORMAT]}
static const IID IID_I[!output CLASS_NAME_ROOT] =
[!output DISPIID_STATIC_CONST_GUID_FORMAT];

BEGIN_INTERFACE_MAP([!output CLASS_NAME], [!output BASE_CLASS_SAFE])
	INTERFACE_PART([!output CLASS_NAME], IID_I[!output CLASS_NAME_ROOT], Dispatch)
END_INTERFACE_MAP()
[!endif]
[!if CREATABLE]

// {[!output CLSID_REGISTRY_FORMAT]}
IMPLEMENT_OLECREATE([!output CLASS_NAME], "[!output TYPEID]", [!output CLSID_IMPLEMENT_OLECREATE_FORMAT])
[!endif]


// [!output CLASS_NAME] メッセージ ハンドラー
