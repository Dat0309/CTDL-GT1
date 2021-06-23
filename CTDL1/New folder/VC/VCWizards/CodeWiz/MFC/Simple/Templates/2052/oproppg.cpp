// [!output IMPL_FILE] : 实现文件
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


// [!output CLASS_NAME] 对话框

IMPLEMENT_DYNCREATE([!output CLASS_NAME], COlePropertyPage)



// 消息映射

BEGIN_MESSAGE_MAP([!output CLASS_NAME], COlePropertyPage)
END_MESSAGE_MAP()



// 初始化类工厂和 guid

// {[!output CLSID_REGISTRY_FORMAT]}
IMPLEMENT_OLECREATE_EX([!output CLASS_NAME], "[!output TYPEID]",
	[!output CLSID_IMPLEMENT_OLECREATE_FORMAT])



// [!output CLASS_NAME]::[!output CLASS_NAME]Factory::UpdateRegistry -
// 添加或移除 [!output CLASS_NAME] 的系统注册表项

BOOL [!output CLASS_NAME]::[!output CLASS_NAME]Factory::UpdateRegistry(BOOL bRegister)
{
	// TODO:  定义页类型的字符串资源；用 ID 替换下面的“0”。

	if (bRegister)
		return AfxOleRegisterPropertyPageClass(AfxGetInstanceHandle(),
			m_clsid, 0);
	else
		return AfxOleUnregisterClass(m_clsid, NULL);
}



// [!output CLASS_NAME]::[!output CLASS_NAME] - 构造函数

// TODO:  定义页标题的字符串资源；用 ID 替换下面的“0”。

[!output CLASS_NAME]::[!output CLASS_NAME]() :
	COlePropertyPage(IDD, 0)
{
[!if ACCESSIBILITY]
#ifndef _WIN32_WCE
	EnableActiveAccessibility();
#endif
[!endif]

}



// [!output CLASS_NAME]::DoDataExchange - 在页和属性间移动数据

void [!output CLASS_NAME]::DoDataExchange(CDataExchange* pDX)
{
	DDP_PostProcessing(pDX);
}



// [!output CLASS_NAME] 消息处理程序
