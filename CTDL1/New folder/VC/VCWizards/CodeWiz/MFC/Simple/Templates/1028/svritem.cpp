// [!output IMPL_FILE] : 實作檔
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

[!if CREATABLE]
IMPLEMENT_DYNCREATE([!output CLASS_NAME], [!output BASE_CLASS])
[!else]
IMPLEMENT_DYNAMIC([!output CLASS_NAME], [!output BASE_CLASS])
[!endif]

[!output CLASS_NAME]::[!output CLASS_NAME](COleServerDoc* pServerDoc, BOOL bAutoDelete)
		: COleServerItem( pServerDoc, bAutoDelete)
{
[!if AUTOMATION || CREATABLE]
	EnableAutomation();
[!endif]
[!if CREATABLE]
	
	// 若要讓應用程式於 OLE Automation 作用期間保持執行，
	//	 建構函式必須呼叫 AfxOleLockApp。
	
	AfxOleLockApp();
[!endif]
}

[!output CLASS_NAME]::~[!output CLASS_NAME]()
{
[!if CREATABLE]
	// 若要在使用 OLE Automation 建立了所有物件之後結束應用程式，
	//	 解構函式必須呼叫 AfxOleUnlockApp。
	
	AfxOleUnlockApp();
[!endif]
}
[!if AUTOMATION || CREATABLE]

void [!output CLASS_NAME]::OnFinalRelease()
{
	// 當釋放 Automation 物件最後的參考時，
	// 會呼叫 OnFinalRelease。基底類別會自動
	// 刪除物件。呼叫基底類別前，請先加入您物件所需的額外清除 (Cleanup)
	// 程式碼。

	[!output BASE_CLASS]::OnFinalRelease();
}
[!endif]

BOOL [!output CLASS_NAME]::OnDraw(CDC* pDC, CSize& rSize)
{
	// 由框架呼叫將 OLE 項目呈現在中繼檔中。
	// 這個 OLE 項目的中繼檔表示方式是用來顯示容器應用程式中的項目。
	// 如果容器應用程式是以 MFC 程式庫撰寫，
	// 這個中繼檔將會由 
	// 對應的 COleClientItem 物件之 Draw 成員函式使用。
	// 它沒有預設的實作，您必須覆寫這函式，
	// 將項目繪製到指定的裝置內容中。
	ASSERT(FALSE);			// 請在完成 TODO 之後移除此項目
	return TRUE;
}

BEGIN_MESSAGE_MAP([!output CLASS_NAME], [!output BASE_CLASS])
END_MESSAGE_MAP()
[!if AUTOMATION || CREATABLE]

BEGIN_DISPATCH_MAP([!output CLASS_NAME], [!output BASE_CLASS])
END_DISPATCH_MAP()

// 注意: 我們加入了對 IID_I[!output CLASS_NAME_ROOT] 的支援
// 以便從 VBA 支援類型安全繫結。此 IID 必須與 .IDL 檔中，
// 附加至分配介面 (Dispinterface) 的 GUID 相符。

// {[!output DISPIID_REGISTRY_FORMAT]}
static const IID IID_I[!output CLASS_NAME_ROOT] =
[!output DISPIID_STATIC_CONST_GUID_FORMAT];

BEGIN_INTERFACE_MAP([!output CLASS_NAME], [!output BASE_CLASS])
	INTERFACE_PART([!output CLASS_NAME], IID_I[!output CLASS_NAME_ROOT], Dispatch)
END_INTERFACE_MAP()
[!endif]
[!if CREATABLE]

// {[!output CLSID_REGISTRY_FORMAT]}
IMPLEMENT_OLECREATE([!output CLASS_NAME], "[!output TYPEID]", [!output CLSID_IMPLEMENT_OLECREATE_FORMAT])
[!endif]


// [!output CLASS_NAME] 診斷

#ifdef _DEBUG
void [!output CLASS_NAME]::AssertValid() const
{
	[!output BASE_CLASS]::AssertValid();
}

#ifndef _WIN32_WCE
void [!output CLASS_NAME]::Dump(CDumpContext& dc) const
{
	[!output BASE_CLASS]::Dump(dc);
}
#endif
#endif //_DEBUG


// [!output CLASS_NAME] 序列化

#ifndef _WIN32_WCE
void [!output CLASS_NAME]::Serialize(CArchive& ar)
{
	if (ar.IsStoring())
	{
		// TODO:  在此加入儲存程式碼
	}
	else
	{
		// TODO:  在此加入載入程式碼
	}
}
#endif

// [!output CLASS_NAME] 命令
