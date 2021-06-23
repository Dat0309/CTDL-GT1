// [!output PROPERTY_PAGE_IMPL] : [!output PROPERTY_PAGE_CLASS] 属性页类的实现。

#include "stdafx.h"
#include "[!output PROJECT_NAME].h"
#include "[!output PROPERTY_PAGE_HEADER]"

#ifdef _DEBUG
#define new DEBUG_NEW
#endif

IMPLEMENT_DYNCREATE([!output PROPERTY_PAGE_CLASS], COlePropertyPage)

// 消息映射

BEGIN_MESSAGE_MAP([!output PROPERTY_PAGE_CLASS], COlePropertyPage)
END_MESSAGE_MAP()

// 初始化类工厂和 guid

[!if PROPERTY_PAGE_TYPE_ID_SET]
IMPLEMENT_OLECREATE_EX([!output PROPERTY_PAGE_CLASS], "[!output PROPERTY_PAGE_TYPE_ID]",
	[!output PROPERTY_PAGE_CLSID_IMPLEMENT_OLECREATE_FORMAT])
[!else]
IMPLEMENT_OLECREATE_NOREGNAME([!output PROPERTY_PAGE_CLASS],
	[!output PROPERTY_PAGE_CLSID_IMPLEMENT_OLECREATE_FORMAT])
[!endif]

// [!output PROPERTY_PAGE_CLASS]::[!output PROPERTY_PAGE_CLASS]Factory::UpdateRegistry -
// 添加或移除 [!output PROPERTY_PAGE_CLASS] 的系统注册表项

BOOL [!output PROPERTY_PAGE_CLASS]::[!output PROPERTY_PAGE_CLASS]Factory::UpdateRegistry(BOOL bRegister)
{
	if (bRegister)
		return AfxOleRegisterPropertyPageClass(AfxGetInstanceHandle(),
			m_clsid, IDS_[!output UPPER_CASE_SAFE_PROJECT_IDENTIFIER_NAME]_PPG);
	else
		return AfxOleUnregisterClass(m_clsid, NULL);
}

// [!output PROPERTY_PAGE_CLASS]::[!output PROPERTY_PAGE_CLASS] - 构造函数

[!output PROPERTY_PAGE_CLASS]::[!output PROPERTY_PAGE_CLASS]() :
	COlePropertyPage(IDD, IDS_[!output UPPER_CASE_SAFE_PROJECT_IDENTIFIER_NAME]_PPG_CAPTION)
{
[!if HELP_FILES]
	SetHelpInfo(_T("出现在控件中的名称"), _T("[!output PROJECT_NAME].HLP"), 0);
[!endif]
}

// [!output PROPERTY_PAGE_CLASS]::DoDataExchange - 在页和属性间移动数据

void [!output PROPERTY_PAGE_CLASS]::DoDataExchange(CDataExchange* pDX)
{
	DDP_PostProcessing(pDX);
}

// [!output PROPERTY_PAGE_CLASS] 消息处理程序
