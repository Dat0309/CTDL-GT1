[!if RIBBON_TOOLBAR]
// This MFC Samples source code demonstrates using MFC Microsoft Office Fluent User Interface 
// (the "Fluent UI") and is provided only as referential material to supplement the 
// Microsoft Foundation Classes Reference and related electronic documentation 
// included with the MFC C++ library software.  
// License terms to copy, use or distribute the Fluent UI are available separately.  
// To learn more about our Fluent UI licensing program, please visit 
// http://go.microsoft.com/fwlink/?LinkId=238214.
//
// Copyright (C) Microsoft Corporation
// All rights reserved.
[!endif]

// [!output MAIN_FRAME_IMPL] : implementation of the [!output MAIN_FRAME_CLASS] class
//

#include "stdafx.h"
#include "[!output APP_HEADER]"

#include "[!output MAIN_FRAME_HEADER]"
[!if PROJECT_STYLE_EXPLORER]
[!if APP_TYPE_SDI || APP_TYPE_MTLD]
#include "[!output TREE_VIEW_HEADER]"
#include "[!output VIEW_HEADER]"
[!endif]
[!endif]

#ifdef _DEBUG
#define new DEBUG_NEW
#endif

// [!output MAIN_FRAME_CLASS]

[!if APP_TYPE_MDI || !DOCVIEW]
IMPLEMENT_DYNAMIC([!output MAIN_FRAME_CLASS], [!output MAIN_FRAME_BASE_CLASS])
[!else]
IMPLEMENT_DYNCREATE([!output MAIN_FRAME_CLASS], [!output MAIN_FRAME_BASE_CLASS])
[!endif]
[!if TOOLBAR_CUST_USER]

const int  iMaxUserToolbars = 10;
const UINT uiFirstUserToolBarId = AFX_IDW_CONTROLBAR_FIRST + 40;
const UINT uiLastUserToolBarId = uiFirstUserToolBarId + iMaxUserToolbars - 1;
[!endif]

BEGIN_MESSAGE_MAP([!output MAIN_FRAME_CLASS], [!output MAIN_FRAME_BASE_CLASS])
[!if DOCKING_TOOLBAR || TOOLBAR_STYLE_REBAR || MENUBAR_TOOLBAR || RIBBON_TOOLBAR || STATUS_BAR]
	ON_WM_CREATE()
[!else]
[!if APP_TYPE_SDI && !DOCVIEW]
	ON_WM_CREATE()
[!endif]
[!endif]
[!if APP_TYPE_SDI]
[!if !DOCVIEW]
	ON_WM_SETFOCUS()
[!endif] 
[!endif] 
[!if APP_TYPE_MTLD]
	ON_COMMAND(ID_FILE_CLOSE, &[!output MAIN_FRAME_CLASS]::OnFileClose)
[!if !DOCVIEW]
	ON_WM_CLOSE()
[!endif]
[!endif] 
[!if PROJECT_STYLE_EXPLORER]
[!if APP_TYPE_SDI || APP_TYPE_MTLD]
[!if LIST_VIEW]
	ON_UPDATE_COMMAND_UI_RANGE(AFX_ID_VIEW_MINIMUM, AFX_ID_VIEW_MAXIMUM, &[!output MAIN_FRAME_CLASS]::OnUpdateViewStyles)
	ON_COMMAND_RANGE(AFX_ID_VIEW_MINIMUM, AFX_ID_VIEW_MAXIMUM, &[!output MAIN_FRAME_CLASS]::OnViewStyle)
[!endif]
[!endif]
[!endif]
[!if MENUBAR_TOOLBAR || RIBBON_TOOLBAR]
[!if APP_TYPE_MDI]
	ON_COMMAND(ID_WINDOW_MANAGER, &[!output MAIN_FRAME_CLASS]::OnWindowManager)
[!endif]
[!endif]
[!if MENUBAR_TOOLBAR]
	ON_COMMAND(ID_VIEW_CUSTOMIZE, &[!output MAIN_FRAME_CLASS]::OnViewCustomize)
	ON_REGISTERED_MESSAGE(AFX_WM_CREATETOOLBAR, &[!output MAIN_FRAME_CLASS]::OnToolbarCreateNew)
[!endif]
[!if ENABLE_VISUAL_STYLE_SWITCHING]
	ON_COMMAND_RANGE(ID_VIEW_APPLOOK_WIN_2000, ID_VIEW_APPLOOK_WINDOWS_7, &[!output MAIN_FRAME_CLASS]::OnApplicationLook)
	ON_UPDATE_COMMAND_UI_RANGE(ID_VIEW_APPLOOK_WIN_2000, ID_VIEW_APPLOOK_WINDOWS_7, &[!output MAIN_FRAME_CLASS]::OnUpdateApplicationLook)
[!endif]
[!if ADV_DOCKING_CAPTION]
	ON_COMMAND(ID_VIEW_CAPTION_BAR, &[!output MAIN_FRAME_CLASS]::OnViewCaptionBar)
	ON_UPDATE_COMMAND_UI(ID_VIEW_CAPTION_BAR, &[!output MAIN_FRAME_CLASS]::OnUpdateViewCaptionBar)
	ON_COMMAND(ID_TOOLS_OPTIONS, &[!output MAIN_FRAME_CLASS]::OnOptions)
[!endif]
[!if PANE_MENUS_ACTIVATE]
[!if ADV_DOCKING_EXPLORER]
	ON_COMMAND(ID_VIEW_FILEVIEW, &[!output MAIN_FRAME_CLASS]::OnViewFileView)
	ON_UPDATE_COMMAND_UI(ID_VIEW_FILEVIEW, &[!output MAIN_FRAME_CLASS]::OnUpdateViewFileView)
	ON_COMMAND(ID_VIEW_CLASSVIEW, &[!output MAIN_FRAME_CLASS]::OnViewClassView)
	ON_UPDATE_COMMAND_UI(ID_VIEW_CLASSVIEW, &[!output MAIN_FRAME_CLASS]::OnUpdateViewClassView)
[!endif]
[!if ADV_DOCKING_OUTPUT]
	ON_COMMAND(ID_VIEW_OUTPUTWND, &[!output MAIN_FRAME_CLASS]::OnViewOutputWindow)
	ON_UPDATE_COMMAND_UI(ID_VIEW_OUTPUTWND, &[!output MAIN_FRAME_CLASS]::OnUpdateViewOutputWindow)
[!endif]
[!if ADV_DOCKING_PROPERTIES]
	ON_COMMAND(ID_VIEW_PROPERTIESWND, &[!output MAIN_FRAME_CLASS]::OnViewPropertiesWindow)
	ON_UPDATE_COMMAND_UI(ID_VIEW_PROPERTIESWND, &[!output MAIN_FRAME_CLASS]::OnUpdateViewPropertiesWindow)
[!endif]
[!endif]
[!if PRINTING]
[!if RIBBON_TOOLBAR]
[!if APP_TYPE_SDI || APP_TYPE_MTLD]
	ON_COMMAND(ID_FILE_PRINT, &[!output MAIN_FRAME_CLASS]::OnFilePrint)
	ON_COMMAND(ID_FILE_PRINT_DIRECT, &[!output MAIN_FRAME_CLASS]::OnFilePrint)
	ON_COMMAND(ID_FILE_PRINT_PREVIEW, &[!output MAIN_FRAME_CLASS]::OnFilePrintPreview)
	ON_UPDATE_COMMAND_UI(ID_FILE_PRINT_PREVIEW, &[!output MAIN_FRAME_CLASS]::OnUpdateFilePrintPreview)
[!endif]
[!endif]
[!endif]
[!if ADV_DOCKING_OUTPUT]
	ON_WM_SETTINGCHANGE()
[!endif]
END_MESSAGE_MAP()
[!if STATUS_BAR]
[!if !RIBBON_TOOLBAR]

static UINT indicators[] =
{
	ID_SEPARATOR,           // status line indicator
[!if DO_KANA]
	ID_INDICATOR_KANA,
[!endif]
	ID_INDICATOR_CAPS,
	ID_INDICATOR_NUM,
	ID_INDICATOR_SCRL,
};
[!endif]
[!endif]

// [!output MAIN_FRAME_CLASS] construction/destruction

[!output MAIN_FRAME_CLASS]::[!output MAIN_FRAME_CLASS]()
{
[!if ACCESSIBILITY]
	EnableActiveAccessibility();
[!endif]
	// TODO: add member initialization code here
[!if MENUBAR_TOOLBAR || RIBBON_TOOLBAR]
[!if ENABLE_VISUAL_STYLE_SWITCHING]
	theApp.m_nAppLook = theApp.GetInt(_T("ApplicationLook"), [!output APPLICATION_LOOK_VALUE]);
[!endif]
[!endif]
}

[!output MAIN_FRAME_CLASS]::~[!output MAIN_FRAME_CLASS]()
{
}
[!if DOCKING_TOOLBAR || TOOLBAR_STYLE_REBAR || MENUBAR_TOOLBAR || RIBBON_TOOLBAR || STATUS_BAR]

int [!output MAIN_FRAME_CLASS]::OnCreate(LPCREATESTRUCT lpCreateStruct)
{
	if ([!output MAIN_FRAME_BASE_CLASS]::OnCreate(lpCreateStruct) == -1)
		return -1;
[!if MENUBAR_TOOLBAR || RIBBON_TOOLBAR]

	BOOL bNameValid;
[!endif]
[!if APP_TYPE_MDI && APP_TYPE_TABBED_MDI]

	CMDITabInfo mdiTabParams;
	mdiTabParams.m_style = CMFCTabCtrl::STYLE_3D_ONENOTE; // other styles available...
	mdiTabParams.m_bActiveTabCloseButton = TRUE;      // set to FALSE to place close button at right of tab area
	mdiTabParams.m_bTabIcons = FALSE;    // set to TRUE to enable document icons on MDI taba
	mdiTabParams.m_bAutoColor = TRUE;    // set to FALSE to disable auto-coloring of MDI tabs
	mdiTabParams.m_bDocumentMenu = TRUE; // enable the document menu at the right edge of the tab area
	EnableMDITabbedGroups(TRUE, mdiTabParams);
[!endif]
[!if MENUBAR_TOOLBAR]

	if (!m_wndMenuBar.Create(this))
	{
		TRACE0("Failed to create menubar\n");
		return -1;      // fail to create
	}

	m_wndMenuBar.SetPaneStyle(m_wndMenuBar.GetPaneStyle() | CBRS_SIZE_DYNAMIC | CBRS_TOOLTIPS | CBRS_FLYBY);

	// prevent the menu bar from taking the focus on activation
	CMFCPopupMenu::SetForceMenuFocus(FALSE);
[!endif]
[!if APP_TYPE_SDI]
[!if !DOCVIEW]

	// create a view to occupy the client area of the frame
	if (!m_wndView.Create(NULL, NULL, AFX_WS_DEFAULT_VIEW, CRect(0, 0, 0, 0), this, AFX_IDW_PANE_FIRST, NULL))
	{
		TRACE0("Failed to create view window\n");
		return -1;
	}
[!endif]
[!endif]
[!if DOCKING_TOOLBAR || TOOLBAR_STYLE_REBAR || MENUBAR_TOOLBAR]
[!if TOOLBAR_STYLE_REBAR]

	if (!m_wndToolBar.CreateEx(this, TBSTYLE_FLAT | TBSTYLE_TRANSPARENT) ||
[!else]

	if (!m_wndToolBar.CreateEx(this, TBSTYLE_FLAT, WS_CHILD | WS_VISIBLE | CBRS_TOP | CBRS_GRIPPER | CBRS_TOOLTIPS | CBRS_FLYBY | CBRS_SIZE_DYNAMIC) ||
[!endif]
[!if MENUBAR_TOOLBAR]
		!m_wndToolBar.LoadToolBar(theApp.m_bHiColorIcons ? IDR_MAINFRAME_256 : IDR_MAINFRAME))
[!else]
		!m_wndToolBar.LoadToolBar(IDR_MAINFRAME))
[!endif]
	{
		TRACE0("Failed to create toolbar\n");
		return -1;      // fail to create
	}
[!if MENUBAR_TOOLBAR]

	CString strToolBarName;
	bNameValid = strToolBarName.LoadString(IDS_TOOLBAR_STANDARD);
	ASSERT(bNameValid);
	m_wndToolBar.SetWindowText(strToolBarName);

	CString strCustomize;
	bNameValid = strCustomize.LoadString(IDS_TOOLBAR_CUSTOMIZE);
	ASSERT(bNameValid);
	m_wndToolBar.EnableCustomizeButton(TRUE, ID_VIEW_CUSTOMIZE, strCustomize);
[!if TOOLBAR_CUST_USER]

	// Allow user-defined toolbars operations:
	InitUserToolbars(NULL, uiFirstUserToolBarId, uiLastUserToolBarId);
[!endif]
[!endif]
[!if TOOLBAR_STYLE_REBAR]
[!if CONTAINER || CONTAINER_SERVER]

	m_wndToolBar.SetBarStyle(m_wndToolBar.GetBarStyle() & ~CBRS_HIDE_INPLACE);

[!endif]
	if (!m_wndDlgBar.Create(this, IDR_MAINFRAME, CBRS_ALIGN_TOP, AFX_IDW_DIALOGBAR))
	{
		TRACE0("Failed to create dialogbar\n");
		return -1;		// fail to create
	}

	if (!m_wndReBar.Create(this) || !m_wndReBar.AddBar(&m_wndToolBar) || !m_wndReBar.AddBar(&m_wndDlgBar))
	{
		TRACE0("Failed to create rebar\n");
		return -1;      // fail to create
	}
[!if CONTAINER || CONTAINER_SERVER]
	m_wndReBar.SetBarStyle(m_wndReBar.GetBarStyle() & ~CBRS_HIDE_INPLACE);
[!endif]
[!endif]
[!endif]
[!if RIBBON_TOOLBAR]

	m_wndRibbonBar.Create(this);
	m_wndRibbonBar.LoadFromResource(IDR_RIBBON);
[!endif]
[!if STATUS_BAR]

	if (!m_wndStatusBar.Create(this))
	{
		TRACE0("Failed to create status bar\n");
		return -1;      // fail to create
	}
[!if RIBBON_TOOLBAR]

	CString strTitlePane1;
	CString strTitlePane2;
	bNameValid = strTitlePane1.LoadString(IDS_STATUS_PANE1);
	ASSERT(bNameValid);
	bNameValid = strTitlePane2.LoadString(IDS_STATUS_PANE2);
	ASSERT(bNameValid);
	m_wndStatusBar.AddElement(new CMFCRibbonStatusBarPane(ID_STATUSBAR_PANE1, strTitlePane1, TRUE), strTitlePane1);
	m_wndStatusBar.AddExtendedElement(new CMFCRibbonStatusBarPane(ID_STATUSBAR_PANE2, strTitlePane2, TRUE), strTitlePane2);
[!else]
	m_wndStatusBar.SetIndicators(indicators, sizeof(indicators)/sizeof(UINT));
[!endif]
[!endif]
[!if DOCKING_TOOLBAR || TOOLBAR_STYLE_REBAR || MENUBAR_TOOLBAR]
[!if TOOLBAR_STYLE_REBAR]

	// TODO: Remove this if you don't want tool tips
	m_wndToolBar.SetBarStyle(m_wndToolBar.GetBarStyle() | CBRS_TOOLTIPS | CBRS_FLYBY);
[!else]
[!if MENUBAR_TOOLBAR]

	// TODO: Delete these five lines if you don't want the toolbar and menubar to be dockable
	m_wndMenuBar.EnableDocking(CBRS_ALIGN_ANY);
[!else]

	// TODO: Delete these three lines if you don't want the toolbar to be dockable
[!endif]
	m_wndToolBar.EnableDocking(CBRS_ALIGN_ANY);
	EnableDocking(CBRS_ALIGN_ANY);
[!if MENUBAR_TOOLBAR]
	DockPane(&m_wndMenuBar);
[!endif]
[!if MENUBAR_TOOLBAR]
	DockPane(&m_wndToolBar);
[!else]
	DockControlBar(&m_wndToolBar);
[!endif]

[!endif]
[!endif]
[!if MENUBAR_TOOLBAR || RIBBON_TOOLBAR]

	// enable Visual Studio 2005 style docking window behavior
	CDockingManager::SetDockingMode(DT_SMART);
	// enable Visual Studio 2005 style docking window auto-hide behavior
	EnableAutoHidePanes(CBRS_ALIGN_ANY);
[!if ADV_DOCKING_NAVIGATION]

	// Navigation pane will be created at left, so temporary disable docking at the left side:
	EnableDocking(CBRS_ALIGN_TOP | CBRS_ALIGN_BOTTOM | CBRS_ALIGN_RIGHT);

	// Create and setup "Outlook" navigation bar:
	if (!CreateOutlookBar(m_wndNavigationBar, ID_VIEW_NAVIGATION, m_wndTree, m_wndCalendar, 250))
	{
		TRACE0("Failed to create navigation pane\n");
		return -1;      // fail to create
	}
[!endif]
[!if ADV_DOCKING_CAPTION]

	// Create a caption bar:
	if (!CreateCaptionBar())
	{
		TRACE0("Failed to create caption bar\n");
		return -1;      // fail to create
	}
[!endif]
[!if ADV_DOCKING_NAVIGATION]

	// Outlook bar is created and docking on the left side should be allowed.
	EnableDocking(CBRS_ALIGN_LEFT);
	EnableAutoHidePanes(CBRS_ALIGN_RIGHT);
[!endif]
[!if ADV_DOCKING_EXPLORER || ADV_DOCKING_OUTPUT || ADV_DOCKING_PROPERTIES]
[!if ADV_DOCKING_EXPLORER]

	// Load menu item image (not placed on any standard toolbars):
	CMFCToolBar::AddToolBarForImageCollection(IDR_MENU_IMAGES, theApp.m_bHiColorIcons ? IDB_MENU_IMAGES_24 : 0);
[!endif]

	// create docking windows
	if (!CreateDockingWindows())
	{
		TRACE0("Failed to create docking windows\n");
		return -1;
	}

[!if ADV_DOCKING_EXPLORER]
	m_wndFileView.EnableDocking(CBRS_ALIGN_ANY);
	m_wndClassView.EnableDocking(CBRS_ALIGN_ANY);
	DockPane(&m_wndFileView);
	CDockablePane* pTabbedBar = NULL;
	m_wndClassView.AttachToTabWnd(&m_wndFileView, DM_SHOW, TRUE, &pTabbedBar);
[!endif]
[!if ADV_DOCKING_OUTPUT]
	m_wndOutput.EnableDocking(CBRS_ALIGN_ANY);
	DockPane(&m_wndOutput);
[!endif]
[!if ADV_DOCKING_PROPERTIES]
	m_wndProperties.EnableDocking(CBRS_ALIGN_ANY);
	DockPane(&m_wndProperties);
[!endif]

[!endif]
[!if USE_VISUAL_MANAGER]
[!if MENUBAR_TOOLBAR || RIBBON_TOOLBAR]
[!if !ENABLE_VISUAL_STYLE_SWITCHING]

	// set the visual manager used to draw all user interface elements
	CMFCVisualManager::SetDefaultManager(RUNTIME_CLASS([!output VISUAL_MANAGER]));
[!if RIBBON_TOOLBAR]
[!if VISUAL_MANAGER_WINDOWS_7]
	m_wndRibbonBar.SetWindows7Look(TRUE);
[!endif]
[!endif]
[!if USE_VISUAL_STYLE]

	// set the visual style to be used the by the visual manager
	CMFCVisualManagerOffice2007::SetStyle(CMFCVisualManagerOffice2007::[!output VISUAL_STYLE]);
[!endif]
[!else]
	// set the visual manager and style based on persisted value
	OnApplicationLook(theApp.m_nAppLook);
[!endif]
[!endif]
[!endif]
[!if APP_TYPE_MDI]

	// Enable enhanced windows management dialog
	EnableWindowsDialog(ID_WINDOW_MANAGER, ID_WINDOW_MANAGER, TRUE);
[!endif]
[!if MENUBAR_TOOLBAR]

	// Enable toolbar and docking window menu replacement
	EnablePaneMenu(TRUE, ID_VIEW_CUSTOMIZE, strCustomize, ID_VIEW_TOOLBAR);

	// enable quick (Alt+drag) toolbar customization
	CMFCToolBar::EnableQuickCustomization();
[!if TOOLBAR_CUST_USER]

	if (CMFCToolBar::GetUserImages() == NULL)
	{
		// load user-defined toolbar images
		if (m_UserImages.Load(_T(".\\UserImages.bmp")))
		{
			CMFCToolBar::SetUserImages(&m_UserImages);
		}
	}
[!endif]
[!if TOOLBAR_CUST_PERSONAL]

	// enable menu personalization (most-recently used commands)
	// TODO: define your own basic commands, ensuring that each pulldown menu has at least one basic command.
	CList<UINT, UINT> lstBasicCommands;

[!if APP_TYPE_MDI || DOCVIEW]
	lstBasicCommands.AddTail(ID_FILE_NEW);
[!endif]
[!if DOCVIEW]
	lstBasicCommands.AddTail(ID_FILE_OPEN);
	lstBasicCommands.AddTail(ID_FILE_SAVE);
[!endif]
[!if PRINT]
	lstBasicCommands.AddTail(ID_FILE_PRINT);
[!endif]
	lstBasicCommands.AddTail(ID_APP_EXIT);
	lstBasicCommands.AddTail(ID_EDIT_CUT);
	lstBasicCommands.AddTail(ID_EDIT_PASTE);
	lstBasicCommands.AddTail(ID_EDIT_UNDO);
[!if OLEDB || ODBC]
	lstBasicCommands.AddTail(ID_RECORD_NEXT);
	lstBasicCommands.AddTail(ID_RECORD_LAST);
[!endif]
	lstBasicCommands.AddTail(ID_APP_ABOUT);
	lstBasicCommands.AddTail(ID_VIEW_STATUS_BAR);
	lstBasicCommands.AddTail(ID_VIEW_TOOLBAR);
[!if APP_TYPE_MTLD]
	lstBasicCommands.AddTail(ID_FILE_NEW_FRAME);
	lstBasicCommands.AddTail(ID_FILE_CLOSE);
[!endif]
[!if RICH_EDIT_VIEW]
	lstBasicCommands.AddTail(ID_EDIT_SELECT_ALL);
	lstBasicCommands.AddTail(ID_EDIT_FIND);
	lstBasicCommands.AddTail(ID_EDIT_REPEAT);
	lstBasicCommands.AddTail(ID_EDIT_REPLACE);
[!endif]
[!if ENABLE_VISUAL_STYLE_SWITCHING]
	lstBasicCommands.AddTail(ID_VIEW_APPLOOK_OFF_2003);
	lstBasicCommands.AddTail(ID_VIEW_APPLOOK_VS_2005);
	lstBasicCommands.AddTail(ID_VIEW_APPLOOK_OFF_2007_BLUE);
	lstBasicCommands.AddTail(ID_VIEW_APPLOOK_OFF_2007_SILVER);
	lstBasicCommands.AddTail(ID_VIEW_APPLOOK_OFF_2007_BLACK);
	lstBasicCommands.AddTail(ID_VIEW_APPLOOK_OFF_2007_AQUA);
	lstBasicCommands.AddTail(ID_VIEW_APPLOOK_WINDOWS_7);
[!endif]
[!if ADV_DOCKING_EXPLORER]
	lstBasicCommands.AddTail(ID_SORTING_SORTALPHABETIC);
	lstBasicCommands.AddTail(ID_SORTING_SORTBYTYPE);
	lstBasicCommands.AddTail(ID_SORTING_SORTBYACCESS);
	lstBasicCommands.AddTail(ID_SORTING_GROUPBYTYPE);
[!endif]
[!if CONTAINER || CONTAINER_SERVER]
	lstBasicCommands.AddTail(ID_OLE_INSERT_NEW);
[!endif]

	CMFCToolBar::SetBasicCommands(lstBasicCommands);
[!endif]
[!endif]
[!endif]
[!if APP_TYPE_MDI && APP_TYPE_TABBED_MDI]

	// Switch the order of document name and application name on the window title bar. This
	// improves the usability of the taskbar because the document name is visible with the thumbnail.
	ModifyStyle(0, FWS_PREFIXTITLE);
[!endif]

	return 0;
}
[!else]
[!if APP_TYPE_SDI && !DOCVIEW]

int [!output MAIN_FRAME_CLASS]::OnCreate(LPCREATESTRUCT lpCreateStruct)
{
	if ([!output MAIN_FRAME_BASE_CLASS]::OnCreate(lpCreateStruct) == -1)
		return -1;

	// create a view to occupy the client area of the frame
	if (!m_wndView.Create(NULL, NULL, AFX_WS_DEFAULT_VIEW,
		CRect(0, 0, 0, 0), this, AFX_IDW_PANE_FIRST, NULL))
	{
		TRACE0("Failed to create view window\n");
		return -1;
	}
	return 0;
}
[!endif]
[!endif]
[!if SPLITTER || PROJECT_STYLE_EXPLORER]
[!if APP_TYPE_SDI || APP_TYPE_MTLD]

BOOL [!output MAIN_FRAME_CLASS]::OnCreateClient(LPCREATESTRUCT /*lpcs*/,
	CCreateContext* pContext)
{
[!if PROJECT_STYLE_EXPLORER]
	// create splitter window
	if (!m_wndSplitter.CreateStatic(this, 1, 2))
		return FALSE;

	if (!m_wndSplitter.CreateView(0, 0, RUNTIME_CLASS([!output TREE_VIEW_CLASS]), CSize(100, 100), pContext) ||
		!m_wndSplitter.CreateView(0, 1, RUNTIME_CLASS([!output VIEW_CLASS]), CSize(100, 100), pContext))
	{
		m_wndSplitter.DestroyWindow();
		return FALSE;
	}

	return TRUE;
[!else]
[!if HTML_VIEW || HTML_EDITVIEW]
	return m_wndSplitter.Create(this,
		2, 2,               // TODO: adjust the number of rows, columns
		CSize(10, 10),      // TODO: adjust the minimum pane size
		pContext, WS_CHILD | WS_VISIBLE | SPLS_DYNAMIC_SPLIT);
[!else]
	return m_wndSplitter.Create(this,
		2, 2,               // TODO: adjust the number of rows, columns
		CSize(10, 10),      // TODO: adjust the minimum pane size
		pContext);
[!endif]
[!endif]
}
[!endif]
[!endif]

BOOL [!output MAIN_FRAME_CLASS]::PreCreateWindow(CREATESTRUCT& cs)
{
	if( ![!output MAIN_FRAME_BASE_CLASS]::PreCreateWindow(cs) )
		return FALSE;
	// TODO: Modify the Window class or styles here by modifying
	//  the CREATESTRUCT cs

[!if !MAIN_FRAME_DEFAULT_STYLES]
	cs.style = WS_OVERLAPPED | WS_CAPTION | FWS_ADDTOTITLE
		[!output MAIN_FRAME_STYLE_FLAGS];

[!endif]
[!if APP_TYPE_SDI]
[!if !DOCVIEW]
	cs.dwExStyle &= ~WS_EX_CLIENTEDGE;
	cs.lpszClass = AfxRegisterWndClass(0);
[!endif]
[!endif]
	return TRUE;
}
[!if ADV_DOCKING_EXPLORER || ADV_DOCKING_OUTPUT || ADV_DOCKING_PROPERTIES]

BOOL [!output MAIN_FRAME_CLASS]::CreateDockingWindows()
{
	BOOL bNameValid;
[!if ADV_DOCKING_EXPLORER]

	// Create class view
	CString strClassView;
	bNameValid = strClassView.LoadString(IDS_CLASS_VIEW);
	ASSERT(bNameValid);
	if (!m_wndClassView.Create(strClassView, this, CRect(0, 0, 200, 200), TRUE, ID_VIEW_CLASSVIEW, WS_CHILD | WS_VISIBLE | WS_CLIPSIBLINGS | WS_CLIPCHILDREN | CBRS_LEFT | CBRS_FLOAT_MULTI))
	{
		TRACE0("Failed to create Class View window\n");
		return FALSE; // failed to create
	}

	// Create file view
	CString strFileView;
	bNameValid = strFileView.LoadString(IDS_FILE_VIEW);
	ASSERT(bNameValid);
	if (!m_wndFileView.Create(strFileView, this, CRect(0, 0, 200, 200), TRUE, ID_VIEW_FILEVIEW, WS_CHILD | WS_VISIBLE | WS_CLIPSIBLINGS | WS_CLIPCHILDREN | CBRS_LEFT| CBRS_FLOAT_MULTI))
	{
		TRACE0("Failed to create File View window\n");
		return FALSE; // failed to create
	}

[!endif]
[!if ADV_DOCKING_OUTPUT]
	// Create output window
	CString strOutputWnd;
	bNameValid = strOutputWnd.LoadString(IDS_OUTPUT_WND);
	ASSERT(bNameValid);
	if (!m_wndOutput.Create(strOutputWnd, this, CRect(0, 0, 100, 100), TRUE, ID_VIEW_OUTPUTWND, WS_CHILD | WS_VISIBLE | WS_CLIPSIBLINGS | WS_CLIPCHILDREN | CBRS_BOTTOM | CBRS_FLOAT_MULTI))
	{
		TRACE0("Failed to create Output window\n");
		return FALSE; // failed to create
	}

[!endif]
[!if ADV_DOCKING_PROPERTIES]
	// Create properties window
	CString strPropertiesWnd;
	bNameValid = strPropertiesWnd.LoadString(IDS_PROPERTIES_WND);
	ASSERT(bNameValid);
	if (!m_wndProperties.Create(strPropertiesWnd, this, CRect(0, 0, 200, 200), TRUE, ID_VIEW_PROPERTIESWND, WS_CHILD | WS_VISIBLE | WS_CLIPSIBLINGS | WS_CLIPCHILDREN | CBRS_RIGHT | CBRS_FLOAT_MULTI))
	{
		TRACE0("Failed to create Properties window\n");
		return FALSE; // failed to create
	}

[!endif]
	SetDockingWindowIcons(theApp.m_bHiColorIcons);
	return TRUE;
}

void [!output MAIN_FRAME_CLASS]::SetDockingWindowIcons(BOOL bHiColorIcons)
{
[!if ADV_DOCKING_EXPLORER]
	HICON hFileViewIcon = (HICON) ::LoadImage(::AfxGetResourceHandle(), MAKEINTRESOURCE(bHiColorIcons ? IDI_FILE_VIEW_HC : IDI_FILE_VIEW), IMAGE_ICON, ::GetSystemMetrics(SM_CXSMICON), ::GetSystemMetrics(SM_CYSMICON), 0);
	m_wndFileView.SetIcon(hFileViewIcon, FALSE);

	HICON hClassViewIcon = (HICON) ::LoadImage(::AfxGetResourceHandle(), MAKEINTRESOURCE(bHiColorIcons ? IDI_CLASS_VIEW_HC : IDI_CLASS_VIEW), IMAGE_ICON, ::GetSystemMetrics(SM_CXSMICON), ::GetSystemMetrics(SM_CYSMICON), 0);
	m_wndClassView.SetIcon(hClassViewIcon, FALSE);

[!endif]
[!if ADV_DOCKING_OUTPUT]
	HICON hOutputBarIcon = (HICON) ::LoadImage(::AfxGetResourceHandle(), MAKEINTRESOURCE(bHiColorIcons ? IDI_OUTPUT_WND_HC : IDI_OUTPUT_WND), IMAGE_ICON, ::GetSystemMetrics(SM_CXSMICON), ::GetSystemMetrics(SM_CYSMICON), 0);
	m_wndOutput.SetIcon(hOutputBarIcon, FALSE);

[!endif]
[!if ADV_DOCKING_PROPERTIES]
	HICON hPropertiesBarIcon = (HICON) ::LoadImage(::AfxGetResourceHandle(), MAKEINTRESOURCE(bHiColorIcons ? IDI_PROPERTIES_WND_HC : IDI_PROPERTIES_WND), IMAGE_ICON, ::GetSystemMetrics(SM_CXSMICON), ::GetSystemMetrics(SM_CYSMICON), 0);
	m_wndProperties.SetIcon(hPropertiesBarIcon, FALSE);

[!endif]
[!if APP_TYPE_MDI && APP_TYPE_TABBED_MDI]
	UpdateMDITabbedBarsIcons();
[!endif]
}
[!endif]
[!if ADV_DOCKING_NAVIGATION]

BOOL [!output MAIN_FRAME_CLASS]::CreateOutlookBar(CMFCOutlookBar& bar, UINT uiID, CMFCShellTreeCtrl& tree, CCalendarBar& calendar, int nInitialWidth)
{
	bar.SetMode2003();

	BOOL bNameValid;
	CString strTemp;
	bNameValid = strTemp.LoadString(IDS_SHORTCUTS);
	ASSERT(bNameValid);
	if (!bar.Create(strTemp, this, CRect(0, 0, nInitialWidth, 32000), uiID, WS_CHILD | WS_VISIBLE | CBRS_LEFT))
	{
		return FALSE; // fail to create
	}

	CMFCOutlookBarTabCtrl* pOutlookBar = (CMFCOutlookBarTabCtrl*)bar.GetUnderlyingWindow();

	if (pOutlookBar == NULL)
	{
		ASSERT(FALSE);
		return FALSE;
	}

	pOutlookBar->EnableInPlaceEdit(TRUE);

	static UINT uiPageID = 1;

	// can float, can autohide, can resize, CAN NOT CLOSE
	DWORD dwStyle = AFX_CBRS_FLOAT | AFX_CBRS_AUTOHIDE | AFX_CBRS_RESIZE;

	CRect rectDummy(0, 0, 0, 0);
	const DWORD dwTreeStyle = WS_CHILD | WS_VISIBLE | TVS_HASLINES | TVS_LINESATROOT | TVS_HASBUTTONS;

	tree.Create(dwTreeStyle, rectDummy, &bar, 1200);
	bNameValid = strTemp.LoadString(IDS_FOLDERS);
	ASSERT(bNameValid);
	pOutlookBar->AddControl(&tree, strTemp, 2, TRUE, dwStyle);

	calendar.Create(rectDummy, &bar, 1201);
	bNameValid = strTemp.LoadString(IDS_CALENDAR);
	ASSERT(bNameValid);
	pOutlookBar->AddControl(&calendar, strTemp, 3, TRUE, dwStyle);

	bar.SetPaneStyle(bar.GetPaneStyle() | CBRS_TOOLTIPS | CBRS_FLYBY | CBRS_SIZE_DYNAMIC);

	pOutlookBar->SetImageList(theApp.m_bHiColorIcons ? IDB_PAGES_HC : IDB_PAGES, 24);
	pOutlookBar->SetToolbarImageList(theApp.m_bHiColorIcons ? IDB_PAGES_SMALL_HC : IDB_PAGES_SMALL, 16);
	pOutlookBar->RecalcLayout();

	BOOL bAnimation = theApp.GetInt(_T("OutlookAnimation"), TRUE);
	CMFCOutlookBarTabCtrl::EnableAnimation(bAnimation);

	bar.SetButtonsFont(&afxGlobalData.fontBold);

	return TRUE;
}
[!endif]
[!if ADV_DOCKING_CAPTION]

BOOL [!output MAIN_FRAME_CLASS]::CreateCaptionBar()
{
	if (!m_wndCaptionBar.Create(WS_CHILD | WS_VISIBLE | WS_CLIPSIBLINGS, this, ID_VIEW_CAPTION_BAR, -1, TRUE))
	{
		TRACE0("Failed to create caption bar\n");
		return FALSE;
	}

	BOOL bNameValid;

	CString strTemp, strTemp2;
	bNameValid = strTemp.LoadString(IDS_CAPTION_BUTTON);
	ASSERT(bNameValid);
	m_wndCaptionBar.SetButton(strTemp, ID_TOOLS_OPTIONS, CMFCCaptionBar::ALIGN_LEFT, FALSE);
	bNameValid = strTemp.LoadString(IDS_CAPTION_BUTTON_TIP);
	ASSERT(bNameValid);
	m_wndCaptionBar.SetButtonToolTip(strTemp);

	bNameValid = strTemp.LoadString(IDS_CAPTION_TEXT);
	ASSERT(bNameValid);
	m_wndCaptionBar.SetText(strTemp, CMFCCaptionBar::ALIGN_LEFT);

	m_wndCaptionBar.SetBitmap(IDB_INFO, RGB(255, 255, 255), FALSE, CMFCCaptionBar::ALIGN_LEFT);
	bNameValid = strTemp.LoadString(IDS_CAPTION_IMAGE_TIP);
	ASSERT(bNameValid);
	bNameValid = strTemp2.LoadString(IDS_CAPTION_IMAGE_TEXT);
	ASSERT(bNameValid);
	m_wndCaptionBar.SetImageToolTip(strTemp, strTemp2);

	return TRUE;
}
[!endif]

// [!output MAIN_FRAME_CLASS] diagnostics

#ifdef _DEBUG
void [!output MAIN_FRAME_CLASS]::AssertValid() const
{
	[!output MAIN_FRAME_BASE_CLASS]::AssertValid();
}

void [!output MAIN_FRAME_CLASS]::Dump(CDumpContext& dc) const
{
	[!output MAIN_FRAME_BASE_CLASS]::Dump(dc);
}
#endif //_DEBUG


// [!output MAIN_FRAME_CLASS] message handlers
[!if APP_TYPE_SDI]
[!if !DOCVIEW]

void [!output MAIN_FRAME_CLASS]::OnSetFocus(CWnd* /*pOldWnd*/)
{
	// forward focus to the view window
	m_wndView.SetFocus();
}

BOOL [!output MAIN_FRAME_CLASS]::OnCmdMsg(UINT nID, int nCode, void* pExtra, AFX_CMDHANDLERINFO* pHandlerInfo)
{
	// let the view have first crack at the command
	if (m_wndView.OnCmdMsg(nID, nCode, pExtra, pHandlerInfo))
		return TRUE;

	// otherwise, do default handling
	return [!output MAIN_FRAME_BASE_CLASS]::OnCmdMsg(nID, nCode, pExtra, pHandlerInfo);
}
[!endif]
[!endif]
[!if APP_TYPE_SDI || APP_TYPE_MTLD]
[!if PROJECT_STYLE_EXPLORER]
[!if LIST_VIEW]

[!output VIEW_CLASS]* [!output MAIN_FRAME_CLASS]::GetRightPane()
{
	CWnd* pWnd = m_wndSplitter.GetPane(0, 1);
	[!output VIEW_CLASS]* pView = DYNAMIC_DOWNCAST([!output VIEW_CLASS], pWnd);
	return pView;
}

void [!output MAIN_FRAME_CLASS]::OnUpdateViewStyles(CCmdUI* pCmdUI)
{
	if (!pCmdUI)
		return;

	// TODO: customize or extend this code to handle choices on the View menu

	[!output VIEW_CLASS]* pView = GetRightPane();

	// if the right-hand pane hasn't been created or isn't a view,
	// disable commands in our range

	if (pView == NULL)
		pCmdUI->Enable(FALSE);
	else
	{
		DWORD dwStyle = pView->GetStyle() & LVS_TYPEMASK;

		// if the command is ID_VIEW_LINEUP, only enable command
		// when we're in LVS_ICON or LVS_SMALLICON mode

		if (pCmdUI->m_nID == ID_VIEW_LINEUP)
		{
			if (dwStyle == LVS_ICON || dwStyle == LVS_SMALLICON)
				pCmdUI->Enable();
			else
				pCmdUI->Enable(FALSE);
		}
		else
		{
			// otherwise, use dots to reflect the style of the view
			pCmdUI->Enable();
			BOOL bChecked = FALSE;

			switch (pCmdUI->m_nID)
			{
			case ID_VIEW_DETAILS:
				bChecked = (dwStyle == LVS_REPORT);
				break;

			case ID_VIEW_SMALLICON:
				bChecked = (dwStyle == LVS_SMALLICON);
				break;

			case ID_VIEW_LARGEICON:
				bChecked = (dwStyle == LVS_ICON);
				break;

			case ID_VIEW_LIST:
				bChecked = (dwStyle == LVS_LIST);
				break;

			default:
				bChecked = FALSE;
				break;
			}

			pCmdUI->SetRadio(bChecked ? 1 : 0);
		}
	}
}

void [!output MAIN_FRAME_CLASS]::OnViewStyle(UINT nCommandID)
{
	// TODO: customize or extend this code to handle choices on the View menu
	[!output VIEW_CLASS]* pView = GetRightPane();

	// if the right-hand pane has been created and is a [!output VIEW_CLASS],
	// process the menu commands...
	if (pView != NULL)
	{
		DWORD dwStyle = -1;

		switch (nCommandID)
		{
		case ID_VIEW_LINEUP:
			{
				// ask the list control to snap to grid
				CListCtrl& refListCtrl = pView->GetListCtrl();
				refListCtrl.Arrange(LVA_SNAPTOGRID);
			}
			break;

		// other commands change the style on the list control
		case ID_VIEW_DETAILS:
			dwStyle = LVS_REPORT;
			break;

		case ID_VIEW_SMALLICON:
			dwStyle = LVS_SMALLICON;
			break;

		case ID_VIEW_LARGEICON:
			dwStyle = LVS_ICON;
			break;

		case ID_VIEW_LIST:
			dwStyle = LVS_LIST;
			break;
		}

		// change the style; window will repaint automatically
		if (dwStyle != -1)
			pView->ModifyStyle(LVS_TYPEMASK, dwStyle);
	}
}
[!endif]
[!endif]
[!endif]
[!if MENUBAR_TOOLBAR || RIBBON_TOOLBAR]
[!if APP_TYPE_MDI]

void [!output MAIN_FRAME_CLASS]::OnWindowManager()
{
	ShowWindowsDialog();
}
[!endif]
[!endif]
[!if MENUBAR_TOOLBAR]

void [!output MAIN_FRAME_CLASS]::OnViewCustomize()
{
	CMFCToolBarsCustomizeDialog* pDlgCust = new CMFCToolBarsCustomizeDialog(this, TRUE /* scan menus */);
[!if TOOLBAR_CUST_USER]
	pDlgCust->EnableUserDefinedToolbars();
[!endif]
	pDlgCust->Create();
}

LRESULT [!output MAIN_FRAME_CLASS]::OnToolbarCreateNew(WPARAM wp,LPARAM lp)
{
	LRESULT lres = [!output MAIN_FRAME_BASE_CLASS]::OnToolbarCreateNew(wp,lp);
	if (lres == 0)
	{
		return 0;
	}

	CMFCToolBar* pUserToolbar = (CMFCToolBar*)lres;
	ASSERT_VALID(pUserToolbar);

	BOOL bNameValid;
	CString strCustomize;
	bNameValid = strCustomize.LoadString(IDS_TOOLBAR_CUSTOMIZE);
	ASSERT(bNameValid);

	pUserToolbar->EnableCustomizeButton(TRUE, ID_VIEW_CUSTOMIZE, strCustomize);
	return lres;
}
[!endif]
[!if ENABLE_VISUAL_STYLE_SWITCHING]

void [!output MAIN_FRAME_CLASS]::OnApplicationLook(UINT id)
{
	CWaitCursor wait;

	theApp.m_nAppLook = id;

	switch (theApp.m_nAppLook)
	{
	case ID_VIEW_APPLOOK_WIN_2000:
		CMFCVisualManager::SetDefaultManager(RUNTIME_CLASS(CMFCVisualManager));
[!if RIBBON_TOOLBAR]
		m_wndRibbonBar.SetWindows7Look(FALSE);
[!endif]
		break;

	case ID_VIEW_APPLOOK_OFF_XP:
		CMFCVisualManager::SetDefaultManager(RUNTIME_CLASS(CMFCVisualManagerOfficeXP));
[!if RIBBON_TOOLBAR]
		m_wndRibbonBar.SetWindows7Look(FALSE);
[!endif]
		break;

	case ID_VIEW_APPLOOK_WIN_XP:
		CMFCVisualManagerWindows::m_b3DTabsXPTheme = TRUE;
		CMFCVisualManager::SetDefaultManager(RUNTIME_CLASS(CMFCVisualManagerWindows));
[!if RIBBON_TOOLBAR]
		m_wndRibbonBar.SetWindows7Look(FALSE);
[!endif]
		break;

	case ID_VIEW_APPLOOK_OFF_2003:
		CMFCVisualManager::SetDefaultManager(RUNTIME_CLASS(CMFCVisualManagerOffice2003));
		CDockingManager::SetDockingMode(DT_SMART);
[!if RIBBON_TOOLBAR]
		m_wndRibbonBar.SetWindows7Look(FALSE);
[!endif]
		break;

	case ID_VIEW_APPLOOK_VS_2005:
		CMFCVisualManager::SetDefaultManager(RUNTIME_CLASS(CMFCVisualManagerVS2005));
		CDockingManager::SetDockingMode(DT_SMART);
[!if RIBBON_TOOLBAR]
		m_wndRibbonBar.SetWindows7Look(FALSE);
[!endif]
		break;

	case ID_VIEW_APPLOOK_VS_2008:
		CMFCVisualManager::SetDefaultManager(RUNTIME_CLASS(CMFCVisualManagerVS2008));
		CDockingManager::SetDockingMode(DT_SMART);
[!if RIBBON_TOOLBAR]
		m_wndRibbonBar.SetWindows7Look(FALSE);
[!endif]
		break;

	case ID_VIEW_APPLOOK_WINDOWS_7:
		CMFCVisualManager::SetDefaultManager(RUNTIME_CLASS(CMFCVisualManagerWindows7));
		CDockingManager::SetDockingMode(DT_SMART);
[!if RIBBON_TOOLBAR]
		m_wndRibbonBar.SetWindows7Look(TRUE);
[!endif]
		break;

	default:
		switch (theApp.m_nAppLook)
		{
		case ID_VIEW_APPLOOK_OFF_2007_BLUE:
			CMFCVisualManagerOffice2007::SetStyle(CMFCVisualManagerOffice2007::Office2007_LunaBlue);
			break;

		case ID_VIEW_APPLOOK_OFF_2007_BLACK:
			CMFCVisualManagerOffice2007::SetStyle(CMFCVisualManagerOffice2007::Office2007_ObsidianBlack);
			break;

		case ID_VIEW_APPLOOK_OFF_2007_SILVER:
			CMFCVisualManagerOffice2007::SetStyle(CMFCVisualManagerOffice2007::Office2007_Silver);
			break;

		case ID_VIEW_APPLOOK_OFF_2007_AQUA:
			CMFCVisualManagerOffice2007::SetStyle(CMFCVisualManagerOffice2007::Office2007_Aqua);
			break;
		}

		CMFCVisualManager::SetDefaultManager(RUNTIME_CLASS(CMFCVisualManagerOffice2007));
		CDockingManager::SetDockingMode(DT_SMART);
[!if RIBBON_TOOLBAR]
		m_wndRibbonBar.SetWindows7Look(FALSE);
[!endif]
	}

[!if ADV_DOCKING_OUTPUT]
	m_wndOutput.UpdateFonts();
[!endif]
	RedrawWindow(NULL, NULL, RDW_ALLCHILDREN | RDW_INVALIDATE | RDW_UPDATENOW | RDW_FRAME | RDW_ERASE);

[!if MENUBAR_TOOLBAR || RIBBON_TOOLBAR]
	theApp.WriteInt(_T("ApplicationLook"), theApp.m_nAppLook);
[!endif]
}

void [!output MAIN_FRAME_CLASS]::OnUpdateApplicationLook(CCmdUI* pCmdUI)
{
	pCmdUI->SetRadio(theApp.m_nAppLook == pCmdUI->m_nID);
}
[!endif]
[!if ADV_DOCKING_CAPTION]

void [!output MAIN_FRAME_CLASS]::OnViewCaptionBar()
{
	m_wndCaptionBar.ShowWindow(m_wndCaptionBar.IsVisible() ? SW_HIDE : SW_SHOW);
	RecalcLayout(FALSE);
}

void [!output MAIN_FRAME_CLASS]::OnUpdateViewCaptionBar(CCmdUI* pCmdUI)
{
	pCmdUI->SetCheck(m_wndCaptionBar.IsVisible());
}

void [!output MAIN_FRAME_CLASS]::OnOptions()
{
[!if RIBBON_TOOLBAR]
	CMFCRibbonCustomizeDialog *pOptionsDlg = new CMFCRibbonCustomizeDialog(this, &m_wndRibbonBar);
	ASSERT(pOptionsDlg != NULL);

	pOptionsDlg->DoModal();
	delete pOptionsDlg;
[!endif]
}
[!endif]

[!if PANE_MENUS_ACTIVATE]
[!if ADV_DOCKING_EXPLORER]
void [!output MAIN_FRAME_CLASS]::OnViewFileView()
{
	// Show or activate the pane, depending on current state.  The
	// pane can only be closed via the [x] button on the pane frame.
	m_wndFileView.ShowPane(TRUE, FALSE, TRUE);
	m_wndFileView.SetFocus();
}

void [!output MAIN_FRAME_CLASS]::OnUpdateViewFileView(CCmdUI* pCmdUI)
{
	pCmdUI->Enable(TRUE);
}

void [!output MAIN_FRAME_CLASS]::OnViewClassView()
{
	// Show or activate the pane, depending on current state.  The
	// pane can only be closed via the [x] button on the pane frame.
	m_wndClassView.ShowPane(TRUE, FALSE, TRUE);
	m_wndClassView.SetFocus();
}

void [!output MAIN_FRAME_CLASS]::OnUpdateViewClassView(CCmdUI* pCmdUI)
{
	pCmdUI->Enable(TRUE);
}

[!endif]
[!if ADV_DOCKING_OUTPUT]
void [!output MAIN_FRAME_CLASS]::OnViewOutputWindow()
{
	// Show or activate the pane, depending on current state.  The
	// pane can only be closed via the [x] button on the pane frame.
	m_wndOutput.ShowPane(TRUE, FALSE, TRUE);
	m_wndOutput.SetFocus();
}

void [!output MAIN_FRAME_CLASS]::OnUpdateViewOutputWindow(CCmdUI* pCmdUI)
{
	pCmdUI->Enable(TRUE);
}

[!endif]
[!if ADV_DOCKING_PROPERTIES]
void [!output MAIN_FRAME_CLASS]::OnViewPropertiesWindow()
{
	// Show or activate the pane, depending on current state.  The
	// pane can only be closed via the [x] button on the pane frame.
	m_wndProperties.ShowPane(TRUE, FALSE, TRUE);
	m_wndProperties.SetFocus();
}

void [!output MAIN_FRAME_CLASS]::OnUpdateViewPropertiesWindow(CCmdUI* pCmdUI)
{
	pCmdUI->Enable(TRUE);
}

[!endif]
[!endif]
[!if APP_TYPE_MTLD || MENUBAR_TOOLBAR && TOOLBAR_CUST_USER]

BOOL [!output MAIN_FRAME_CLASS]::LoadFrame(UINT nIDResource, DWORD dwDefaultStyle, CWnd* pParentWnd, CCreateContext* pContext) 
{
	// base class does the real work

	if (![!output MAIN_FRAME_BASE_CLASS]::LoadFrame(nIDResource, dwDefaultStyle, pParentWnd, pContext))
	{
		return FALSE;
	}

[!if APP_TYPE_MTLD]
	CWinApp* pApp = AfxGetApp();
	if (pApp->m_pMainWnd == NULL)
		pApp->m_pMainWnd = this;
[!if !RIBBON_TOOLBAR && !MENUBAR_TOOLBAR]

	// replace Exit option on File menu with Close for secondary windows
	if (AfxGetApp()->m_pMainWnd != this)
	{
		CMenu *pMenu = GetMenu();
		ASSERT(pMenu);
		BOOL bNameValid;
		CString strTemp;
		bNameValid = strTemp.LoadString(IDS_CLOSE);
		ASSERT(bNameValid);
		pMenu->ModifyMenu(ID_APP_EXIT, MF_BYCOMMAND | MF_STRING, ID_FILE_CLOSE, strTemp);
	}
[!endif]
[!endif]
[!if MENUBAR_TOOLBAR && TOOLBAR_CUST_USER]

	// enable customization button for all user toolbars
	BOOL bNameValid;
	CString strCustomize;
	bNameValid = strCustomize.LoadString(IDS_TOOLBAR_CUSTOMIZE);
	ASSERT(bNameValid);

	for (int i = 0; i < iMaxUserToolbars; i ++)
	{
		CMFCToolBar* pUserToolbar = GetUserToolBarByIndex(i);
		if (pUserToolbar != NULL)
		{
			pUserToolbar->EnableCustomizeButton(TRUE, ID_VIEW_CUSTOMIZE, strCustomize);
		}
	}
[!endif]

	return TRUE;
}

[!if APP_TYPE_MTLD]
void [!output MAIN_FRAME_CLASS]::OnFileClose()
{
	DestroyWindow();
}
[!if !DOCVIEW]

void [!output MAIN_FRAME_CLASS]::OnClose()
{
	[!output APP_CLASS] *pApp = reinterpret_cast<[!output APP_CLASS]*>(AfxGetApp());
	// main window is being closed so cleanup
	if (pApp->m_pMainWnd == this)
	{
		for (int iCntr=0; iCntr < pApp->m_aryFrames.GetSize(); iCntr++)
		{
			HWND hFrame = pApp->m_aryFrames.GetAt(iCntr);
			if (::IsWindow(hFrame))
				::SendMessage(hFrame, WM_CLOSE, 0, 0);
		}
	}
	CFrameWnd::OnClose();
}
[!endif]
[!endif]
[!endif]
[!if PRINTING]
[!if RIBBON_TOOLBAR]
[!if APP_TYPE_SDI || APP_TYPE_MTLD]

void [!output MAIN_FRAME_CLASS]::OnFilePrint()
{
	if (IsPrintPreview())
	{
		PostMessage(WM_COMMAND, AFX_ID_PREVIEW_PRINT);
	}
}

void [!output MAIN_FRAME_CLASS]::OnFilePrintPreview()
{
	if (IsPrintPreview())
	{
		PostMessage(WM_COMMAND, AFX_ID_PREVIEW_CLOSE);  // force Print Preview mode closed
	}
}

void [!output MAIN_FRAME_CLASS]::OnUpdateFilePrintPreview(CCmdUI* pCmdUI)
{
	pCmdUI->SetCheck(IsPrintPreview());
}
[!endif]
[!endif]
[!endif]
[!if ADV_DOCKING_OUTPUT]

void [!output MAIN_FRAME_CLASS]::OnSettingChange(UINT uFlags, LPCTSTR lpszSection)
{
	[!output MAIN_FRAME_BASE_CLASS]::OnSettingChange(uFlags, lpszSection);
	m_wndOutput.UpdateFonts();
}
[!endif]
