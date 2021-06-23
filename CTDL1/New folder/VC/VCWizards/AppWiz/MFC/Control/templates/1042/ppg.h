#pragma once

// [!output PROPERTY_PAGE_HEADER] : [!output PROPERTY_PAGE_CLASS] 속성 페이지 클래스의 선언입니다.


// [!output PROPERTY_PAGE_CLASS] : 구현을 보려면 [!output PROPERTY_PAGE_IMPL]을(를) 참조하십시오.

class [!output PROPERTY_PAGE_CLASS] : public COlePropertyPage
{
	DECLARE_DYNCREATE([!output PROPERTY_PAGE_CLASS])
	DECLARE_OLECREATE_EX([!output PROPERTY_PAGE_CLASS])

// 생성자입니다.
public:
	[!output PROPERTY_PAGE_CLASS]();

// 대화 상자 데이터입니다.
	enum { IDD = IDD_PROPPAGE_[!output UPPER_CASE_SAFE_PROJECT_IDENTIFIER_NAME] };

// 구현입니다.
protected:
	virtual void DoDataExchange(CDataExchange* pDX);    // DDX/DDV 지원입니다.

// 메시지 맵입니다.
protected:
	DECLARE_MESSAGE_MAP()
};

