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

// [!output INPLACE_FRAME_IMPL] : implementation of the [!output INPLACE_FRAME_CLASS] class
//

#include "stdafx.h"
#include "[!output APP_HEADER]"

#include "[!output INPLACE_FRAME_HEADER]"

#ifdef _DEBUG
#define new DEBUG_NEW
#endif


// [!output INPLACE_FRAME_CLASS]

IMPLEMENT_DYNCREATE([!output INPLACE_FRAME_CLASS], [!output INPLACE_FRAME_BASE_CLASS])

BEGIN_MESSAGE_MAP([!output INPLACE_FRAME_CLASS], [!output INPLACE_FRAME_BASE_CLASS])
	ON_WM_CREATE()
END_MESSAGE_MAP()


// [!output INPLACE_FRAME_CLASS] construction/destruction

[!output INPLACE_FRAME_CLASS]::[!output INPLACE_FRAME_CLASS]()
{
[!if ACCESSIBILITY]
	EnableActiveAccessibility();
[!endif]
}

[!output INPLACE_FRAME_CLASS]::~[!output INPLACE_FRAME_CLASS]()
{
}

int [!output INPLACE_FRAME_CLASS]::OnCreate(LPCREATESTRUCT lpCreateStruct)
{
	if ([!output INPLACE_FRAME_BASE_CLASS]::OnCreate(lpCreateStruct) == -1)
		return -1;

	// CResizeBar implements in-place resizing.
	if (!m_wndResizeBar.Create(this))
	{
		TRACE0("Failed to create resize bar\n");
		return -1;      // fail to create
	}

	// By default, it is a good idea to register a drop-target that does
	//  nothing with your frame window.  This prevents drops from
	//  "falling through" to a container that supports drag-drop.
	m_dropTarget.Register(this);

	return 0;
}

[!if DOCKING_TOOLBAR || TOOLBAR_STYLE_REBAR || MENUBAR_TOOLBAR  || RIBBON_TOOLBAR]
// OnCreateControlBars is called by the framework to create control bars on the
//  container application's windows.  pWndFrame is the top level frame window of
//  the container and is always non-NULL.  pWndDoc is the doc level frame window
//  and will be NULL when the container is an SDI application.  A server
//  application can place MFC control bars on either window.
BOOL [!output INPLACE_FRAME_CLASS]::OnCreateControlBars(CFrameWnd* pWndFrame, CFrameWnd* pWndDoc)
{
	// Remove this if you use pWndDoc
	UNREFERENCED_PARAMETER(pWndDoc);

	// Set owner to this window, so messages are delivered to correct app
	m_wndToolBar.SetOwner(this);

[!if MENUBAR_TOOLBAR || RIBBON_TOOLBAR]
	if (![!output INPLACE_FRAME_BASE_CLASS]::OnCreateControlBars(pWndFrame, pWndDoc))
	{
		return FALSE;
	}

	COleCntrFrameWndEx* pNewFrame = DYNAMIC_DOWNCAST(COleCntrFrameWndEx, m_pMainFrame);
	ASSERT_VALID(pNewFrame);
[!endif]

	// Create toolbar on client's frame window
[!if TOOLBAR_STYLE_REBAR]
	if (!m_wndToolBar.CreateEx(pWndFrame, TBSTYLE_FLAT | TBSTYLE_TRANSPARENT) ||
[!else]
[!if MENUBAR_TOOLBAR || RIBBON_TOOLBAR]
	if (!m_wndToolBar.CreateEx(pNewFrame, TBSTYLE_FLAT,WS_CHILD | WS_VISIBLE | CBRS_TOP
		| CBRS_GRIPPER | CBRS_TOOLTIPS | CBRS_FLYBY | CBRS_SIZE_DYNAMIC) ||
[!else]
	if (!m_wndToolBar.CreateEx(pWndFrame, TBSTYLE_FLAT,WS_CHILD | WS_VISIBLE | CBRS_TOP
		| CBRS_GRIPPER | CBRS_TOOLTIPS | CBRS_FLYBY | CBRS_SIZE_DYNAMIC) ||
[!endif]
[!endif]
[!if APP_TYPE_MDI]
[!if MENUBAR_TOOLBAR]
		!m_wndToolBar.LoadToolBar(theApp.m_bHiColorIcons ? IDR_[!output SAFE_DOC_TYPE_NAME]TYPE_SRVR_IP_256 : IDR_[!output SAFE_DOC_TYPE_NAME]TYPE_SRVR_IP))
[!else]
		!m_wndToolBar.LoadToolBar(IDR_[!output SAFE_DOC_TYPE_NAME]TYPE_SRVR_IP))
[!endif]
[!else]
[!if MENUBAR_TOOLBAR]
		!m_wndToolBar.LoadToolBar(theApp.m_bHiColorIcons ? IDR_SRVR_INPLACE_256 : IDR_SRVR_INPLACE))
[!else]
		!m_wndToolBar.LoadToolBar(IDR_SRVR_INPLACE))
[!endif]
[!endif]
	{
		TRACE0("Failed to create toolbar\n");
		return FALSE;
	}

[!if TOOLBAR_STYLE_REBAR]
	// Set owner to this window, so messages are delivered to correct app
	m_wndDlgBar.SetOwner(this);

	// Create dialog bar on client's frame window
[!if APP_TYPE_MDI]
	if (!m_wndDlgBar.Create(pWndFrame, IDR_[!output SAFE_DOC_TYPE_NAME]TYPE_SRVR_IP, 
[!else]
	if (!m_wndDlgBar.Create(pWndFrame, IDR_SRVR_INPLACE,
[!endif]
		CBRS_ALIGN_TOP, AFX_IDW_DIALOGBAR))
	{
		TRACE0("Failed to create dialogbar\n");
		return FALSE;
	}

	// Set the owner of this window, so messages are delivered to correct app
	m_wndReBar.SetOwner(this);

	// Create a rebar on client's frame window
	if (!m_wndReBar.Create(pWndFrame) ||
		!m_wndReBar.AddBar(&m_wndToolBar) ||
		!m_wndReBar.AddBar(&m_wndDlgBar))
	{
		TRACE0("Failed to create rebar\n");
		return FALSE;
	}

[!else]
	// TODO: Delete these three lines if you don't want the toolbar to be dockable
	m_wndToolBar.EnableDocking(CBRS_ALIGN_ANY);
[!if MENUBAR_TOOLBAR || RIBBON_TOOLBAR]
	pNewFrame->EnableDocking(CBRS_ALIGN_ANY);
	pNewFrame->DockPane(&m_wndToolBar);

	// TODO: Remove this if you don't want tool tips
	m_wndToolBar.SetControlBarStyle(m_wndToolBar.GetPaneStyle() |
		CBRS_TOOLTIPS | CBRS_FLYBY);
[!else]
	pWndFrame->EnableDocking(CBRS_ALIGN_ANY);
	pWndFrame->DockControlBar(&m_wndToolBar);
[!endif]
[!endif]

	return TRUE;
}

[!endif]
BOOL [!output INPLACE_FRAME_CLASS]::PreCreateWindow(CREATESTRUCT& cs)
{
	// TODO: Modify the Window class or styles here by modifying the CREATESTRUCT cs

	return [!output INPLACE_FRAME_BASE_CLASS]::PreCreateWindow(cs);
}


// [!output INPLACE_FRAME_CLASS] diagnostics

#ifdef _DEBUG
void [!output INPLACE_FRAME_CLASS]::AssertValid() const
{
	[!output INPLACE_FRAME_BASE_CLASS]::AssertValid();
}

void [!output INPLACE_FRAME_CLASS]::Dump(CDumpContext& dc) const
{
	[!output INPLACE_FRAME_BASE_CLASS]::Dump(dc);
}
#endif //_DEBUG


// [!output INPLACE_FRAME_CLASS] commands

