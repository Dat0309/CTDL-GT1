#pragma once

#ifdef _WIN32_WCE
#error "Windows CE에서는 COlePropertyPage가 지원되지 않습니다."
#endif 

// [!output CLASS_NAME] : 속성 페이지 대화 상자입니다.

class [!output CLASS_NAME] : public COlePropertyPage
{
	DECLARE_DYNCREATE([!output CLASS_NAME])
	DECLARE_OLECREATE_EX([!output CLASS_NAME])

// 생성자입니다.
public:
	[!output CLASS_NAME]();

// 대화 상자 데이터입니다.
	enum { IDD = [!output IDD_DIALOG] };

// 구현입니다.
protected:
	virtual void DoDataExchange(CDataExchange* pDX);        // DDX/DDV 지원입니다.

// 메시지 맵입니다.
protected:
	DECLARE_MESSAGE_MAP()
};
