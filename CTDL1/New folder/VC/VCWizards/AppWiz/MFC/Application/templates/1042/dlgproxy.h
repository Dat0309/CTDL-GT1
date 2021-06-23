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

// [!output DIALOG_AUTO_PROXY_HEADER]: 헤더 파일
//

#pragma once

class [!output DIALOG_CLASS];


// [!output DIALOG_AUTO_PROXY_CLASS] 명령 대상

class [!output DIALOG_AUTO_PROXY_CLASS] : public [!output DIALOG_AUTO_PROXY_BASE_CLASS]
{
	DECLARE_DYNCREATE([!output DIALOG_AUTO_PROXY_CLASS])

	[!output DIALOG_AUTO_PROXY_CLASS]();           // 동적 만들기에 사용되는 protected 생성자입니다.

// 특성입니다.
public:
	[!output DIALOG_CLASS]* m_pDialog;

// 작업입니다.
public:

// 재정의입니다.
	public:
	virtual void OnFinalRelease();

// 구현입니다.
protected:
	virtual ~[!output DIALOG_AUTO_PROXY_CLASS]();

	// 생성된 메시지 맵 함수

	DECLARE_MESSAGE_MAP()
	DECLARE_OLECREATE([!output DIALOG_AUTO_PROXY_CLASS])

	// 생성된 OLE 디스패치 맵 함수

	DECLARE_DISPATCH_MAP()
	DECLARE_INTERFACE_MAP()
};

