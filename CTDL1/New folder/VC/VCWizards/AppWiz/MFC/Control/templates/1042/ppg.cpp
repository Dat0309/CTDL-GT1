// [!output PROPERTY_PAGE_IMPL] : [!output PROPERTY_PAGE_CLASS] 속성 페이지 클래스의 구현입니다.

#include "stdafx.h"
#include "[!output PROJECT_NAME].h"
#include "[!output PROPERTY_PAGE_HEADER]"

#ifdef _DEBUG
#define new DEBUG_NEW
#endif

IMPLEMENT_DYNCREATE([!output PROPERTY_PAGE_CLASS], COlePropertyPage)

// 메시지 맵입니다.

BEGIN_MESSAGE_MAP([!output PROPERTY_PAGE_CLASS], COlePropertyPage)
END_MESSAGE_MAP()

// 클래스 팩터리와 GUID를 초기화합니다.

[!if PROPERTY_PAGE_TYPE_ID_SET]
IMPLEMENT_OLECREATE_EX([!output PROPERTY_PAGE_CLASS], "[!output PROPERTY_PAGE_TYPE_ID]",
	[!output PROPERTY_PAGE_CLSID_IMPLEMENT_OLECREATE_FORMAT])
[!else]
IMPLEMENT_OLECREATE_NOREGNAME([!output PROPERTY_PAGE_CLASS],
	[!output PROPERTY_PAGE_CLSID_IMPLEMENT_OLECREATE_FORMAT])
[!endif]

// [!output PROPERTY_PAGE_CLASS]::[!output PROPERTY_PAGE_CLASS]Factory::UpdateRegistry -
// [!output PROPERTY_PAGE_CLASS]에서 시스템 레지스트리 항목을 추가하거나 제거합니다.

BOOL [!output PROPERTY_PAGE_CLASS]::[!output PROPERTY_PAGE_CLASS]Factory::UpdateRegistry(BOOL bRegister)
{
	if (bRegister)
		return AfxOleRegisterPropertyPageClass(AfxGetInstanceHandle(),
			m_clsid, IDS_[!output UPPER_CASE_SAFE_PROJECT_IDENTIFIER_NAME]_PPG);
	else
		return AfxOleUnregisterClass(m_clsid, NULL);
}

// [!output PROPERTY_PAGE_CLASS]::[!output PROPERTY_PAGE_CLASS] - 생성자입니다.

[!output PROPERTY_PAGE_CLASS]::[!output PROPERTY_PAGE_CLASS]() :
	COlePropertyPage(IDD, IDS_[!output UPPER_CASE_SAFE_PROJECT_IDENTIFIER_NAME]_PPG_CAPTION)
{
[!if HELP_FILES]
	SetHelpInfo(_T("컨트롤에 표시할 이름"), _T("[!output PROJECT_NAME].HLP"), 0);
[!endif]
}

// [!output PROPERTY_PAGE_CLASS]::DoDataExchange - 페이지와 속성 사이에서 데이터를 이동시킵니다.

void [!output PROPERTY_PAGE_CLASS]::DoDataExchange(CDataExchange* pDX)
{
	DDP_PostProcessing(pDX);
}

// [!output PROPERTY_PAGE_CLASS] 메시지 처리기입니다.
