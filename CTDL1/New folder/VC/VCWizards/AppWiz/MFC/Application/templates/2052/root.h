[!if RIBBON_TOOLBAR]
// 这段 MFC 示例源代码演示如何使用 MFC Microsoft Office Fluent 用户界面 
// (“Fluent UI”)。该示例仅供参考，
// 用以补充《Microsoft 基础类参考》和 
// MFC C++ 库软件随附的相关电子文档。  
// 复制、使用或分发 Fluent UI 的许可条款是单独提供的。  
// 若要了解有关 Fluent UI 许可计划的详细信息，请访问  
// http://go.microsoft.com/fwlink/?LinkId=238214。
//
// 版权所有(C) Microsoft Corporation
// 保留所有权利。
[!endif]

// [!output APP_HEADER] : [!output PROJECT_NAME] 应用程序的主头文件
//
#pragma once

#ifndef __AFXWIN_H__
	#error "在包含此文件之前包含“stdafx.h”以生成 PCH 文件"
#endif

#include "resource.h"       // 主符号


// [!output APP_CLASS]:
// 有关此类的实现，请参阅 [!output APP_IMPL]
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

// 重写
public:
	virtual BOOL InitInstance();
[!if CONTAINER || MINI_SERVER || FULL_SERVER || CONTAINER_SERVER || AUTOMATION || OLEDB || ACTIVEX_CONTROLS || ACCESSIBILITY || RIBBON_TOOLBAR || APP_TYPE_MDI || !DOCVIEW]
	virtual int ExitInstance();
[!endif]

// 实现
[!if FULL_SERVER || MINI_SERVER || CONTAINER_SERVER || AUTOMATION]
	COleTemplateServer m_server;
		// 用于文档创建的服务器对象
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
