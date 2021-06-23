[!if RIBBON_TOOLBAR]
// 이 MFC 샘플 소스 코드는 MFC Microsoft Office Fluent 사용자 인터페이스("Fluent UI")를 
// 사용하는 방법을 보여 주며, MFC C++ 라이브러리 소프트웨어에 포함된 
// Microsoft Foundation Classes Reference 및 관련 전자 문서에 대해 
// 추가적으로 제공되는 내용입니다.  
// Fluent UI를 복사, 사용 또는 배포하는 데 대한 사용 약관은 별도로 제공됩니다.  
// Fluent UI 라이선싱 프로그램에 대한 자세한 내용은 
// http://go.microsoft.com/fwlink/?LinkId=238214.
//
// Copyright (C) Microsoft Corporation
// All rights reserved.
[!endif]

// [!output DIALOG_HEADER] : 헤더 파일
//

#pragma once

[!if AUTOMATION]
class [!output DIALOG_AUTO_PROXY_CLASS];

[!endif]

// [!output DIALOG_CLASS] 대화 상자
class [!output DIALOG_CLASS] : public [!output DIALOG_BASE_CLASS]
{
[!if AUTOMATION]
	DECLARE_DYNAMIC([!output DIALOG_CLASS]);
	friend class [!output DIALOG_AUTO_PROXY_CLASS];

[!endif]
// 생성입니다.
public:
	[!output DIALOG_CLASS](CWnd* pParent = NULL);	// 표준 생성자입니다.
[!if AUTOMATION]
	virtual ~[!output DIALOG_CLASS]();
[!endif]

// 대화 상자 데이터입니다.
[!if HTML_DIALOG]
	enum { IDD = IDD_[!output UPPER_CASE_SAFE_PROJECT_IDENTIFIER_NAME]_DIALOG, IDH = IDR_HTML_[!output UPPER_CASE_SAFE_PROJECT_IDENTIFIER_NAME]_DIALOG };
[!else]
	enum { IDD = IDD_[!output UPPER_CASE_SAFE_PROJECT_IDENTIFIER_NAME]_DIALOG };
[!endif]

	protected:
	virtual void DoDataExchange(CDataExchange* pDX);	// DDX/DDV 지원입니다.

[!if HTML_DIALOG]
	HRESULT OnButtonOK(IHTMLElement *pElement);
	HRESULT OnButtonCancel(IHTMLElement *pElement);
[!endif]

// 구현입니다.
protected:
[!if AUTOMATION]
	[!output DIALOG_AUTO_PROXY_CLASS]* m_pAutoProxy;
[!endif]
	HICON m_hIcon;
[!if AUTOMATION]

	BOOL CanExit();
[!endif]

	// 생성된 메시지 맵 함수
	virtual BOOL OnInitDialog();
[!if ABOUT_BOX]	
	afx_msg void OnSysCommand(UINT nID, LPARAM lParam);
[!endif]
	afx_msg void OnPaint();
	afx_msg HCURSOR OnQueryDragIcon();
[!if AUTOMATION]
	afx_msg void OnClose();
	virtual void OnOK();
	virtual void OnCancel();
[!endif]
	DECLARE_MESSAGE_MAP()
[!if HTML_DIALOG]
	DECLARE_DHTML_EVENT_MAP()
[!endif]
};
