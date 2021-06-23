// [!output IMPL_FILE] : 구현 파일입니다.
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


// [!output CLASS_NAME] 대화 상자입니다.

IMPLEMENT_DYNCREATE([!output CLASS_NAME], COlePropertyPage)



// 메시지 맵입니다.

BEGIN_MESSAGE_MAP([!output CLASS_NAME], COlePropertyPage)
END_MESSAGE_MAP()



// 클래스 팩터리와 GUID를 초기화합니다.

// {[!output CLSID_REGISTRY_FORMAT]}
IMPLEMENT_OLECREATE_EX([!output CLASS_NAME], "[!output TYPEID]",
	[!output CLSID_IMPLEMENT_OLECREATE_FORMAT])



// [!output CLASS_NAME]::[!output CLASS_NAME]Factory::UpdateRegistry -
// [!output CLASS_NAME]에서 시스템 레지스트리 항목을 추가하거나 제거합니다.

BOOL [!output CLASS_NAME]::[!output CLASS_NAME]Factory::UpdateRegistry(BOOL bRegister)
{
	// TODO: 페이지 형식에 대해 문자열 리소스를 정의합니다. 아래의 '0'은 ID로 대체합니다.

	if (bRegister)
		return AfxOleRegisterPropertyPageClass(AfxGetInstanceHandle(),
			m_clsid, 0);
	else
		return AfxOleUnregisterClass(m_clsid, NULL);
}



// [!output CLASS_NAME]::[!output CLASS_NAME] - 생성자입니다.

// TODO: 페이지 캡션에 대해 문자열 리소스를 정의합니다. 아래의 '0'은 ID로 대체합니다.

[!output CLASS_NAME]::[!output CLASS_NAME]() :
	COlePropertyPage(IDD, 0)
{
[!if ACCESSIBILITY]
#ifndef _WIN32_WCE
	EnableActiveAccessibility();
#endif
[!endif]

}



// [!output CLASS_NAME]::DoDataExchange - 페이지와 속성 사이에서 데이터를 이동시킵니다.

void [!output CLASS_NAME]::DoDataExchange(CDataExchange* pDX)
{
	DDP_PostProcessing(pDX);
}



// [!output CLASS_NAME] 메시지 처리기입니다.
