[!if RIBBON_TOOLBAR]
// In diesem MFC-Beispielquellcode wird die Verwendung der MFC Microsoft Office Fluent-Benutzeroberfläche 
// ("Fluent-Benutzeroberfläche") demonstriert. Der Beispielquellcode wird ausschließlich zu Referenzzwecken und als Ergänzung zur 
// Microsoft Foundation Classes-Referenz und zugehöriger elektronischer Dokumentation 
// bereitgestellt, die in der MFC C++-Bibliotheksoftware enthalten sind.  
// Lizenzbedingungen zum Kopieren, Verwenden oder Verteilen der Fluent-Benutzeroberfläche sind separat erhältlich.  
// Weitere Informationen zum Lizenzierungsprogramm für die Fluent-Benutzeroberfläche finden Sie unter 
// http://go.microsoft.com/fwlink/?LinkId=238214.
//
// Copyright (C) Microsoft Corporation
// Alle Rechte vorbehalten.
[!endif]

// [!output INPLACE_FRAME_IMPL]: Implementierung der Klasse [!output INPLACE_FRAME_CLASS]
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


// [!output INPLACE_FRAME_CLASS]-Erstellung/Zerstörung

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

	// CResizeBar implementiert direkte Größenänderungen.
	if (!m_wndResizeBar.Create(this))
	{
		TRACE0("Failed to create resize bar\n");
		return -1;      // Fehler beim Erstellen
	}

	// Allgemein ist es von Vorteil, ein Drop-Ziel zu registrieren, das
	//  keinerlei Auswirkung auf Ihr Rahmenfenster hat.  Dies verhindert bei Drops ("Abwürfen")
	//  ein "Durchfallen" zu einem Container, der Drag & Drop unterstützt.
	m_dropTarget.Register(this);

	return 0;
}

[!if DOCKING_TOOLBAR || TOOLBAR_STYLE_REBAR || MENUBAR_TOOLBAR  || RIBBON_TOOLBAR]
// OnCreateControlBars wird automatisch aufgerufen, um Steuerleisten im Fenster der
//  Container-Anwendung zu erstellen.  pWndFrame ist das hierarchisch höchste Rahmenfenster des
//  Containers und ist immer ungleich NULL.  pWndDoc ist das Rahmenfenster auf Dokumentebene
//  und ist gleich NULL, wenn der Container eine SDI-Anwendung ist.  Eine Server
//  Anwendung kann MFC-Steuerelementleisten in jedes Fenster platzieren.
BOOL [!output INPLACE_FRAME_CLASS]::OnCreateControlBars(CFrameWnd* pWndFrame, CFrameWnd* pWndDoc)
{
	// Entfernen Sie dies, wenn Sie pWndDoc verwenden
	UNREFERENCED_PARAMETER(pWndDoc);

	// Dieses Fenster als Owner festlegen, damit Meldungen an die richtige Anwendung gesendet werden
	m_wndToolBar.SetOwner(this);

[!if MENUBAR_TOOLBAR || RIBBON_TOOLBAR]
	if (![!output INPLACE_FRAME_BASE_CLASS]::OnCreateControlBars(pWndFrame, pWndDoc))
	{
		return FALSE;
	}

	COleCntrFrameWndEx* pNewFrame = DYNAMIC_DOWNCAST(COleCntrFrameWndEx, m_pMainFrame);
	ASSERT_VALID(pNewFrame);
[!endif]

	// Symbolleiste im Clientfenster erstellen
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
	// Dieses Fenster als Owner festlegen, damit Meldungen an die richtige Anwendung gesendet werden
	m_wndDlgBar.SetOwner(this);

	// Dialogleiste im Clientfenster erstellen
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

	// Owner dieses Fensters festlegen, damit Nachrichten an die richtige Anwendung gesendet werden
	m_wndReBar.SetOwner(this);

	// Infoleiste im Clientfenster erstellen
	if (!m_wndReBar.Create(pWndFrame) ||
		!m_wndReBar.AddBar(&m_wndToolBar) ||
		!m_wndReBar.AddBar(&m_wndDlgBar))
	{
		TRACE0("Failed to create rebar\n");
		return FALSE;
	}

[!else]
	// TODO: Löschen Sie diese drei Zeilen, wenn Sie nicht möchten, dass die Systemleiste andockbar ist
	m_wndToolBar.EnableDocking(CBRS_ALIGN_ANY);
[!if MENUBAR_TOOLBAR || RIBBON_TOOLBAR]
	pNewFrame->EnableDocking(CBRS_ALIGN_ANY);
	pNewFrame->DockPane(&m_wndToolBar);

	// TODO: Entfernen, wenn Sie keine QuickInfos wünschen
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
	// TODO: Ändern Sie die Fensterklasse oder die Stile hier, indem Sie CREATESTRUCT ändern

	return [!output INPLACE_FRAME_BASE_CLASS]::PreCreateWindow(cs);
}


// [!output INPLACE_FRAME_CLASS]-Diagnose

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


// [!output INPLACE_FRAME_CLASS]-Befehle

