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

// [!output MAIN_FRAME_HEADER] : [!output MAIN_FRAME_CLASS] 类的接口
//

#pragma once
[!if APP_TYPE_SDI || APP_TYPE_MTLD]
[!if PROJECT_STYLE_EXPLORER]
class [!output VIEW_CLASS];
[!else]
[!if !DOCVIEW]
#include "[!output WND_VIEW_HEADER]"
[!endif]
[!endif]
[!endif]
[!if ADV_DOCKING_EXPLORER]
#include "FileView.h"
#include "ClassView.h"
[!endif]
[!if ADV_DOCKING_OUTPUT]
#include "OutputWnd.h"
[!endif]
[!if ADV_DOCKING_PROPERTIES]
#include "PropertiesWnd.h"
[!endif]
[!if ADV_DOCKING_NAVIGATION]
#include "CalendarBar.h"
#include "Resource.h"

class COutlookBar : public CMFCOutlookBar
{
	virtual BOOL AllowShowOnPaneMenu() const { return TRUE; }
	virtual void GetPaneName(CString& strName) const { BOOL bNameValid = strName.LoadString(IDS_OUTLOOKBAR); ASSERT(bNameValid); if (!bNameValid) strName.Empty(); }
};
[!endif]

[!if APP_TYPE_MDI]
class [!output MAIN_FRAME_CLASS] : public [!output MAIN_FRAME_BASE_CLASS]
{
	DECLARE_DYNAMIC([!output MAIN_FRAME_CLASS])
public:
	[!output MAIN_FRAME_CLASS]();
[!else]
class [!output MAIN_FRAME_CLASS] : public [!output MAIN_FRAME_BASE_CLASS]
{
	
[!if !DOCVIEW]
public:
	[!output MAIN_FRAME_CLASS]();
protected: 
	DECLARE_DYNAMIC([!output MAIN_FRAME_CLASS])
[!else]
protected: // 仅从序列化创建
	[!output MAIN_FRAME_CLASS]();
	DECLARE_DYNCREATE([!output MAIN_FRAME_CLASS])
[!endif]
[!endif]

// 特性
[!if SPLITTER || PROJECT_STYLE_EXPLORER]
[!if APP_TYPE_SDI || APP_TYPE_MTLD]
protected:
	CSplitterWnd m_wndSplitter;
[!endif]
[!endif]
public:

// 操作
public:

// 重写
public:
[!if SPLITTER || PROJECT_STYLE_EXPLORER]
[!if APP_TYPE_SDI || APP_TYPE_MTLD]
	virtual BOOL OnCreateClient(LPCREATESTRUCT lpcs, CCreateContext* pContext);
[!endif]
[!endif]
	virtual BOOL PreCreateWindow(CREATESTRUCT& cs);
[!if !DOCVIEW]
[!if APP_TYPE_SDI]
	virtual BOOL OnCmdMsg(UINT nID, int nCode, void* pExtra, AFX_CMDHANDLERINFO* pHandlerInfo);
[!endif] 
[!endif]
[!if APP_TYPE_MTLD || MENUBAR_TOOLBAR && TOOLBAR_CUST_USER]
	virtual BOOL LoadFrame(UINT nIDResource, DWORD dwDefaultStyle = WS_OVERLAPPEDWINDOW | FWS_ADDTOTITLE, CWnd* pParentWnd = NULL, CCreateContext* pContext = NULL);
[!endif]

// 实现
public:
	virtual ~[!output MAIN_FRAME_CLASS]();
[!if PROJECT_STYLE_EXPLORER]
[!if APP_TYPE_SDI || APP_TYPE_MTLD]
	[!output VIEW_CLASS]* GetRightPane();
[!endif]
[!endif]
#ifdef _DEBUG
	virtual void AssertValid() const;
	virtual void Dump(CDumpContext& dc) const;
#endif

[!if DOCKING_TOOLBAR || TOOLBAR_STYLE_REBAR || MENUBAR_TOOLBAR || RIBBON_TOOLBAR || STATUS_BAR]
protected:  // 控件条嵌入成员
[!if MENUBAR_TOOLBAR]
	CMFCMenuBar       m_wndMenuBar;
	CMFCToolBar       m_wndToolBar;
[!endif]
[!if DOCKING_TOOLBAR || TOOLBAR_STYLE_REBAR]
	CToolBar          m_wndToolBar;
[!endif]
[!if RIBBON_TOOLBAR]
	CMFCRibbonBar     m_wndRibbonBar;
	CMFCRibbonApplicationButton m_MainButton;
	CMFCToolBarImages m_PanelImages;
[!endif]
[!if TOOLBAR_STYLE_REBAR]
[!if MENUBAR_TOOLBAR]
	CMFCReBar         m_wndReBar;
[!else]
	CReBar            m_wndReBar;
[!endif]
	CDialogBar        m_wndDlgBar;
[!endif]
[!if STATUS_BAR]
[!if MENUBAR_TOOLBAR || RIBBON_TOOLBAR]
[!if MENUBAR_TOOLBAR]
	CMFCStatusBar     m_wndStatusBar;
[!else]
	CMFCRibbonStatusBar  m_wndStatusBar;
[!endif]
[!else]
	CStatusBar        m_wndStatusBar;
[!endif]
[!endif]
[!endif]
[!if MENUBAR_TOOLBAR]
[!if TOOLBAR_CUST_USER]
	CMFCToolBarImages m_UserImages;
[!endif]
[!endif]
[!if ADV_DOCKING_EXPLORER]
	CFileView         m_wndFileView;
	CClassView        m_wndClassView;
[!endif]
[!if ADV_DOCKING_OUTPUT]
	COutputWnd        m_wndOutput;
[!endif]
[!if ADV_DOCKING_PROPERTIES]
	CPropertiesWnd    m_wndProperties;
[!endif]
[!if ADV_DOCKING_NAVIGATION]
	COutlookBar       m_wndNavigationBar;
	CMFCShellTreeCtrl m_wndTree;
	CCalendarBar      m_wndCalendar;
[!endif]
[!if ADV_DOCKING_CAPTION]
	CMFCCaptionBar    m_wndCaptionBar;
[!endif]
[!if !DOCVIEW]
[!if APP_TYPE_SDI]
	[!output WND_VIEW_CLASS]    m_wndView;
[!endif]
[!endif]

// 生成的消息映射函数
protected:
[!if DOCKING_TOOLBAR || TOOLBAR_STYLE_REBAR || MENUBAR_TOOLBAR || RIBBON_TOOLBAR || STATUS_BAR]
	afx_msg int OnCreate(LPCREATESTRUCT lpCreateStruct);
[!else]
[!if APP_TYPE_SDI && !DOCVIEW]
	afx_msg int OnCreate(LPCREATESTRUCT lpCreateStruct);
[!endif]
[!endif]
[!if !DOCVIEW]
[!if APP_TYPE_SDI]
	afx_msg void OnSetFocus(CWnd *pOldWnd);
[!endif] 
[!endif]
[!if APP_TYPE_MTLD]
	afx_msg void OnFileClose();
[!if !DOCVIEW]
	afx_msg void OnClose();
[!endif]
[!endif]
[!if PROJECT_STYLE_EXPLORER]
[!if APP_TYPE_SDI || APP_TYPE_MTLD]
[!if LIST_VIEW]
	afx_msg void OnUpdateViewStyles(CCmdUI* pCmdUI);
	afx_msg void OnViewStyle(UINT nCommandID);
[!endif]
[!endif]
[!endif]
[!if MENUBAR_TOOLBAR || RIBBON_TOOLBAR]
[!if APP_TYPE_MDI]
	afx_msg void OnWindowManager();
[!endif]
[!endif]
[!if MENUBAR_TOOLBAR]
	afx_msg void OnViewCustomize();
	afx_msg LRESULT OnToolbarCreateNew(WPARAM wp, LPARAM lp);
[!endif]
[!if ENABLE_VISUAL_STYLE_SWITCHING]
	afx_msg void OnApplicationLook(UINT id);
	afx_msg void OnUpdateApplicationLook(CCmdUI* pCmdUI);
[!endif]
[!if PANE_MENUS_ACTIVATE]
[!if ADV_DOCKING_EXPLORER]
	afx_msg void OnViewFileView();
	afx_msg void OnUpdateViewFileView(CCmdUI* pCmdUI);
	afx_msg void OnViewClassView();
	afx_msg void OnUpdateViewClassView(CCmdUI* pCmdUI);
[!endif]
[!if ADV_DOCKING_OUTPUT]
	afx_msg void OnViewOutputWindow();
	afx_msg void OnUpdateViewOutputWindow(CCmdUI* pCmdUI);
[!endif]
[!if ADV_DOCKING_PROPERTIES]
	afx_msg void OnViewPropertiesWindow();
	afx_msg void OnUpdateViewPropertiesWindow(CCmdUI* pCmdUI);
[!endif]
[!endif]
[!if ADV_DOCKING_CAPTION]
	afx_msg void OnViewCaptionBar();
	afx_msg void OnUpdateViewCaptionBar(CCmdUI* pCmdUI);
	afx_msg void OnOptions();
[!endif]
[!if PRINTING]
[!if RIBBON_TOOLBAR]
[!if APP_TYPE_SDI || APP_TYPE_MTLD]
	afx_msg void OnFilePrint();
	afx_msg void OnFilePrintPreview();
	afx_msg void OnUpdateFilePrintPreview(CCmdUI* pCmdUI);
[!endif]
[!endif]
[!endif]
[!if ADV_DOCKING_OUTPUT]
	afx_msg void OnSettingChange(UINT uFlags, LPCTSTR lpszSection);
[!endif]
	DECLARE_MESSAGE_MAP()

[!if ADV_DOCKING_EXPLORER || ADV_DOCKING_OUTPUT || ADV_DOCKING_PROPERTIES]
	BOOL CreateDockingWindows();
	void SetDockingWindowIcons(BOOL bHiColorIcons);
[!endif]
[!if ADV_DOCKING_NAVIGATION]
	BOOL CreateOutlookBar(CMFCOutlookBar& bar, UINT uiID, CMFCShellTreeCtrl& tree, CCalendarBar& calendar, int nInitialWidth);
[!endif]
[!if ADV_DOCKING_CAPTION]
	BOOL CreateCaptionBar();
[!endif]
[!if ADV_DOCKING_NAVIGATION]

	int FindFocusedOutlookWnd(CMFCOutlookBarTabCtrl** ppOutlookWnd);

	CMFCOutlookBarTabCtrl* FindOutlookParent(CWnd* pWnd);
	CMFCOutlookBarTabCtrl* m_pCurrOutlookWnd;
	CMFCOutlookBarPane*    m_pCurrOutlookPage;
[!endif]
};


