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


// [!output CLASS_NAME] 對話方塊

IMPLEMENT_DYNCREATE([!output CLASS_NAME], CDHtmlDialog)

[!output CLASS_NAME]::[!output CLASS_NAME](CWnd* pParent /*=NULL*/)
	: CDHtmlDialog([!output CLASS_NAME]::IDD, [!output CLASS_NAME]::IDH, pParent)
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

	// 若要讓應用程式於 OLE Automation 作用期間保持執行，
	//	建構函式必須呼叫 AfxOleLockApp。

	AfxOleLockApp();

[!endif]
}

[!output CLASS_NAME]::~[!output CLASS_NAME]()
{
[!if CREATABLE]
	// 若要在使用 OLE Automation 建立了所有物件之後結束應用程式，
	//	解構函式必須呼叫 AfxOleUnlockApp。

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

	CDHtmlDialog::OnFinalRelease();
}
[!endif]

void [!output CLASS_NAME]::DoDataExchange(CDataExchange* pDX)
{
	CDHtmlDialog::DoDataExchange(pDX);
}

BOOL [!output CLASS_NAME]::OnInitDialog()
{
	CDHtmlDialog::OnInitDialog();
	return TRUE;  // 傳回 TRUE，除非您對控制項設定焦點
}

BEGIN_MESSAGE_MAP([!output CLASS_NAME], CDHtmlDialog)
END_MESSAGE_MAP()

BEGIN_DHTML_EVENT_MAP([!output CLASS_NAME])
	DHTML_EVENT_ONCLICK(_T("ButtonOK"), OnButtonOK)
	DHTML_EVENT_ONCLICK(_T("ButtonCancel"), OnButtonCancel)
END_DHTML_EVENT_MAP()

[!if AUTOMATION || CREATABLE]

BEGIN_DISPATCH_MAP([!output CLASS_NAME], CDHtmlDialog)
END_DISPATCH_MAP()

// 注意: 我們加入了對 IID_I[!output CLASS_NAME_ROOT] 的支援
//  以便從 VBA 支援類型安全繫結。此 IID 必須與 .IDL 檔中，
//  附加至分配介面 (Dispinterface) 的 GUID 相符。

// {[!output DISPIID_REGISTRY_FORMAT]}
static const IID IID_I[!output CLASS_NAME_ROOT] =
[!output DISPIID_STATIC_CONST_GUID_FORMAT];

BEGIN_INTERFACE_MAP([!output CLASS_NAME], CDHtmlDialog)
	INTERFACE_PART([!output CLASS_NAME], IID_I[!output CLASS_NAME_ROOT], Dispatch)
END_INTERFACE_MAP()
[!endif]
[!if CREATABLE]

// {[!output CLSID_REGISTRY_FORMAT]}
IMPLEMENT_OLECREATE([!output CLASS_NAME], "[!output TYPEID]", [!output CLSID_IMPLEMENT_OLECREATE_FORMAT])
[!endif]


// [!output CLASS_NAME] 訊息處理常式

HRESULT [!output CLASS_NAME]::OnButtonOK(IHTMLElement* /*pElement*/)
{
	OnOK();
	return S_OK;
}

HRESULT [!output CLASS_NAME]::OnButtonCancel(IHTMLElement* /*pElement*/)
{
	OnCancel();
	return S_OK;
}
