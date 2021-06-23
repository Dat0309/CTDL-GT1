// [!output PROPERTY_PAGE_IMPL] : [!output PROPERTY_PAGE_CLASS] 屬性頁類別的實作。

#include "stdafx.h"
#include "[!output PROJECT_NAME].h"
#include "[!output PROPERTY_PAGE_HEADER]"

#ifdef _DEBUG
#define new DEBUG_NEW
#endif

IMPLEMENT_DYNCREATE([!output PROPERTY_PAGE_CLASS], COlePropertyPage)

// 訊息對應

BEGIN_MESSAGE_MAP([!output PROPERTY_PAGE_CLASS], COlePropertyPage)
END_MESSAGE_MAP()

// 初始化 Class Factory 和 GUID

[!if PROPERTY_PAGE_TYPE_ID_SET]
IMPLEMENT_OLECREATE_EX([!output PROPERTY_PAGE_CLASS], "[!output PROPERTY_PAGE_TYPE_ID]",
	[!output PROPERTY_PAGE_CLSID_IMPLEMENT_OLECREATE_FORMAT])
[!else]
IMPLEMENT_OLECREATE_NOREGNAME([!output PROPERTY_PAGE_CLASS],
	[!output PROPERTY_PAGE_CLSID_IMPLEMENT_OLECREATE_FORMAT])
[!endif]

// [!output PROPERTY_PAGE_CLASS]::[!output PROPERTY_PAGE_CLASS]Factory::UpdateRegistry -
// 加入或移除 [!output PROPERTY_PAGE_CLASS] 的系統登錄項目

BOOL [!output PROPERTY_PAGE_CLASS]::[!output PROPERTY_PAGE_CLASS]Factory::UpdateRegistry(BOOL bRegister)
{
	if (bRegister)
		return AfxOleRegisterPropertyPageClass(AfxGetInstanceHandle(),
			m_clsid, IDS_[!output UPPER_CASE_SAFE_PROJECT_IDENTIFIER_NAME]_PPG);
	else
		return AfxOleUnregisterClass(m_clsid, NULL);
}

// [!output PROPERTY_PAGE_CLASS]::[!output PROPERTY_PAGE_CLASS] - 建構函式

[!output PROPERTY_PAGE_CLASS]::[!output PROPERTY_PAGE_CLASS]() :
	COlePropertyPage(IDD, IDS_[!output UPPER_CASE_SAFE_PROJECT_IDENTIFIER_NAME]_PPG_CAPTION)
{
[!if HELP_FILES]
	SetHelpInfo(_T("要顯示在控制項中的名稱"), _T("[!output PROJECT_NAME].HLP"), 0);
[!endif]
}

// [!output PROPERTY_PAGE_CLASS]::DoDataExchange - 在頁面與屬性間移動資料

void [!output PROPERTY_PAGE_CLASS]::DoDataExchange(CDataExchange* pDX)
{
	DDP_PostProcessing(pDX);
}

// [!output PROPERTY_PAGE_CLASS] 訊息處理常式
