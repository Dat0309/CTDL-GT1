[!if RIBBON_TOOLBAR]
// Этот исходный код MFC Samples демонстрирует функционирование пользовательского интерфейса Fluent на основе MFC в Microsoft Office
// ("Fluent UI") и предоставляется исключительно как справочный материал в качестве дополнения к
// справочнику по пакету Microsoft Foundation Classes и связанной электронной документации,
// включенной в программное обеспечение библиотеки MFC C++.  
// Условия лицензионного соглашения на копирование, использование или распространение Fluent UI доступны отдельно.  
// Для получения дополнительных сведений о нашей лицензионной программе Fluent UI посетите веб-узел
// http://go.microsoft.com/fwlink/?LinkId=238214.
//
// (C) Корпорация Майкрософт (Microsoft Corp.)
// Все права защищены.
[!endif]

// [!output INPLACE_FRAME_IMPL] : реализация класса [!output INPLACE_FRAME_CLASS]
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


// создание/уничтожение [!output INPLACE_FRAME_CLASS]

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

	// CResizeBar реализует изменение размеров по месту.
	if (!m_wndResizeBar.Create(this))
	{
		TRACE0("Failed to create resize bar\n");
		return -1;      // не удалось создать
	}

	// По умолчанию рекомендуется регистрировать раскрывающиеся конечные объекты, которые не изменяют
	//  окно рамки.  Это позволяет избежать
	//  передачи управления в контейнер, поддерживающий перетаскивание.
	m_dropTarget.Register(this);

	return 0;
}

[!if DOCKING_TOOLBAR || TOOLBAR_STYLE_REBAR || MENUBAR_TOOLBAR  || RIBBON_TOOLBAR]
// OnCreateControlBars вызывается рабочей средой для создания панелей элементов управления в
//  окнах приложения контейнера.  pWndFrame – окно рамки верхнего уровня для
//  контейнера и никогда не принимает значение NULL.  pWndDoc – окно рамки уровня документа
//  и может принимать значение NULL, когда контейнер является приложением SDI.  Сервер
//  может размещать панели управления MFC в любом окне.
BOOL [!output INPLACE_FRAME_CLASS]::OnCreateControlBars(CFrameWnd* pWndFrame, CFrameWnd* pWndDoc)
{
	// Удалите этот код, если вы используете pWndDoc
	UNREFERENCED_PARAMETER(pWndDoc);

	// Задайте владельца окна, чтобы сообщения доставлялись соответствующему приложению
	m_wndToolBar.SetOwner(this);

[!if MENUBAR_TOOLBAR || RIBBON_TOOLBAR]
	if (![!output INPLACE_FRAME_BASE_CLASS]::OnCreateControlBars(pWndFrame, pWndDoc))
	{
		return FALSE;
	}

	COleCntrFrameWndEx* pNewFrame = DYNAMIC_DOWNCAST(COleCntrFrameWndEx, m_pMainFrame);
	ASSERT_VALID(pNewFrame);
[!endif]

	// Создайте панель инструментов в окне рамки клиента
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
	// Задайте владельца окна, чтобы сообщения доставлялись соответствующему приложению
	m_wndDlgBar.SetOwner(this);

	// Создайте диалоговую панель в окне рамки клиента
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

	// Задайте владельца окна, чтобы сообщения доставлялись соответствующему приложению
	m_wndReBar.SetOwner(this);

	// Создайте главную панель в окне рамки клиента
	if (!m_wndReBar.Create(pWndFrame) ||
		!m_wndReBar.AddBar(&m_wndToolBar) ||
		!m_wndReBar.AddBar(&m_wndDlgBar))
	{
		TRACE0("Failed to create rebar\n");
		return FALSE;
	}

[!else]
	// TODO: Удалите эти три строки, если не собираетесь закреплять панель инструментов
	m_wndToolBar.EnableDocking(CBRS_ALIGN_ANY);
[!if MENUBAR_TOOLBAR || RIBBON_TOOLBAR]
	pNewFrame->EnableDocking(CBRS_ALIGN_ANY);
	pNewFrame->DockPane(&m_wndToolBar);

	// TODO: Удалите этот код, если вам не нужны всплывающие подсказки
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
	// TODO: измените класс Window или стили посредством изменения CREATESTRUCT cs

	return [!output INPLACE_FRAME_BASE_CLASS]::PreCreateWindow(cs);
}


// диагностика [!output INPLACE_FRAME_CLASS]

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


// команды [!output INPLACE_FRAME_CLASS]

