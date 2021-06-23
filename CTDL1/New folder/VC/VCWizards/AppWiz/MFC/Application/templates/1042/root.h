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

// [!output APP_HEADER] : [!output PROJECT_NAME] 응용 프로그램에 대한 주 헤더 파일
//
#pragma once

#ifndef __AFXWIN_H__
	#error "PCH에 대해 이 파일을 포함하기 전에 'stdafx.h'를 포함합니다."
#endif

#include "resource.h"       // 주 기호입니다.


// [!output APP_CLASS]:
// 이 클래스의 구현에 대해서는 [!output APP_IMPL]을 참조하십시오.
//

class [!output APP_CLASS] : public [!output APP_BASE_CLASS]
{
public:
	[!output APP_CLASS]();

[!if APP_TYPE_MTLD]
[!if !DOCVIEW]
	CArray<HWND, HWND> m_aryFrames;
[!else]
protected:
	CMultiDocTemplate* m_pDocTemplate;
[!endif]
public:
[!endif]

// 재정의입니다.
public:
	virtual BOOL InitInstance();
[!if CONTAINER || MINI_SERVER || FULL_SERVER || CONTAINER_SERVER || AUTOMATION || OLEDB || ACTIVEX_CONTROLS || ACCESSIBILITY || RIBBON_TOOLBAR || APP_TYPE_MDI || !DOCVIEW]
	virtual int ExitInstance();
[!endif]

// 구현입니다.
[!if FULL_SERVER || MINI_SERVER || CONTAINER_SERVER || AUTOMATION]
	COleTemplateServer m_server;
		// 문서 만들기에 대한 서버 개체입니다.
[!endif]
[!if !DOCVIEW]
[!if !APP_TYPE_SDI]
protected:
	HMENU  m_hMDIMenu;
	HACCEL m_hMDIAccel;
[!endif]

public:
[!endif]
[!if ENABLE_VISUAL_STYLE_SWITCHING]
	UINT  m_nAppLook;
[!endif]
[!if MENUBAR_TOOLBAR || ADV_DOCKING_EXPLORER || ADV_DOCKING_OUTPUT || ADV_DOCKING_PROPERTIES || ADV_DOCKING_NAVIGATION]
	BOOL  m_bHiColorIcons;

[!endif]
[!if MENUBAR_TOOLBAR || RIBBON_TOOLBAR]
	virtual void PreLoadState();
	virtual void LoadCustomState();
	virtual void SaveCustomState();

[!endif]
	afx_msg void OnAppAbout();
[!if !DOCVIEW]
[!if APP_TYPE_MDI]
	afx_msg void OnFileNew();
[!endif]
[!endif]
[!if APP_TYPE_MTLD]
	afx_msg void OnFileNewFrame();
[!if DOCVIEW]
	afx_msg void OnFileNew();
[!endif]
[!endif]
	DECLARE_MESSAGE_MAP()
};

extern [!output APP_CLASS] theApp;
