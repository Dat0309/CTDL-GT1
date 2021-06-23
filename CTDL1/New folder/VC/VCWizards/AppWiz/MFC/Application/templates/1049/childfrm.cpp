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

// [!output CHILD_FRAME_IMPL] : реализация класса [!output CHILD_FRAME_CLASS]
//

#include "stdafx.h"
#include "[!output APP_HEADER]"

#include "[!output CHILD_FRAME_HEADER]"
[!if PROJECT_STYLE_EXPLORER]
#include "[!output TREE_VIEW_HEADER]"
#include "[!output VIEW_HEADER]"
[!endif]

#ifdef _DEBUG
#define new DEBUG_NEW
#endif

// [!output CHILD_FRAME_CLASS]

IMPLEMENT_DYNCREATE([!output CHILD_FRAME_CLASS], [!output CHILD_FRAME_BASE_CLASS])

BEGIN_MESSAGE_MAP([!output CHILD_FRAME_CLASS], [!output CHILD_FRAME_BASE_CLASS])
[!if !DOCVIEW]
	ON_COMMAND(ID_FILE_CLOSE, &[!output CHILD_FRAME_CLASS]::OnFileClose)
	ON_WM_SETFOCUS()
	ON_WM_CREATE()
[!endif]
[!if PROJECT_STYLE_EXPLORER]
[!if LIST_VIEW]
	ON_UPDATE_COMMAND_UI_RANGE(AFX_ID_VIEW_MINIMUM, AFX_ID_VIEW_MAXIMUM, &[!output CHILD_FRAME_CLASS]::OnUpdateViewStyles)
	ON_COMMAND_RANGE(AFX_ID_VIEW_MINIMUM, AFX_ID_VIEW_MAXIMUM, &[!output CHILD_FRAME_CLASS]::OnViewStyle)
[!endif]
[!endif]
[!if PRINTING]
[!if RIBBON_TOOLBAR]
	ON_COMMAND(ID_FILE_PRINT, &[!output CHILD_FRAME_CLASS]::OnFilePrint)
	ON_COMMAND(ID_FILE_PRINT_DIRECT, &[!output CHILD_FRAME_CLASS]::OnFilePrint)
	ON_COMMAND(ID_FILE_PRINT_PREVIEW, &[!output CHILD_FRAME_CLASS]::OnFilePrintPreview)
	ON_UPDATE_COMMAND_UI(ID_FILE_PRINT_PREVIEW, &[!output CHILD_FRAME_CLASS]::OnUpdateFilePrintPreview)
[!endif]
[!endif]
END_MESSAGE_MAP()

// создание/уничтожение [!output CHILD_FRAME_CLASS]

[!output CHILD_FRAME_CLASS]::[!output CHILD_FRAME_CLASS]()
{
[!if ACCESSIBILITY]
	EnableActiveAccessibility();
[!endif]
	// TODO: добавьте код инициализации члена
}

[!output CHILD_FRAME_CLASS]::~[!output CHILD_FRAME_CLASS]()
{
}

[!if APP_TYPE_MDI && SPLITTER]
BOOL [!output CHILD_FRAME_CLASS]::OnCreateClient(LPCREATESTRUCT /*lpcs*/, CCreateContext* pContext)
{
[!if PROJECT_STYLE_EXPLORER]
	// создать окно разделения
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
		2, 2,			// TODO: измените число строк, столбцов
		CSize(10, 10),	// TODO: измените минимальный размер области
		pContext, WS_CHILD | WS_VISIBLE | SPLS_DYNAMIC_SPLIT);
[!else]
	return m_wndSplitter.Create(this,
		2, 2,			// TODO: измените число строк, столбцов
		CSize(10, 10),	// TODO: измените минимальный размер области
		pContext);
[!endif]
[!endif]
}
[!else]
[!if PROJECT_STYLE_EXPLORER]
BOOL [!output CHILD_FRAME_CLASS]::OnCreateClient(LPCREATESTRUCT /*lpcs*/, CCreateContext* pContext)
{
	// создать окно разделения
	if (!m_wndSplitter.CreateStatic(this, 1, 2))
		return FALSE;

	if (!m_wndSplitter.CreateView(0, 0, RUNTIME_CLASS([!output TREE_VIEW_CLASS]), CSize(100, 100), pContext) ||
		!m_wndSplitter.CreateView(0, 1, RUNTIME_CLASS([!output VIEW_CLASS]), CSize(100, 100), pContext))
	{
		m_wndSplitter.DestroyWindow();
		return FALSE;
	}
	return TRUE;
}
[!endif]
[!endif]

BOOL [!output CHILD_FRAME_CLASS]::PreCreateWindow(CREATESTRUCT& cs)
{
	// TODO: измените класс Window или стили посредством изменения CREATESTRUCT cs
	if( ![!output CHILD_FRAME_BASE_CLASS]::PreCreateWindow(cs) )
		return FALSE;

[!if !CHILD_FRAME_DEFAULT_STYLES]
	cs.style = WS_CHILD | WS_VISIBLE | WS_OVERLAPPED | WS_CAPTION | WS_SYSMENU
		| FWS_ADDTOTITLE[!output CHILD_FRAME_STYLE_FLAGS];

[!endif]
[!if !DOCVIEW]
	cs.dwExStyle &= ~WS_EX_CLIENTEDGE;
	cs.lpszClass = AfxRegisterWndClass(0);
[!endif]
	return TRUE;
}

// диагностика [!output CHILD_FRAME_CLASS]

#ifdef _DEBUG
void [!output CHILD_FRAME_CLASS]::AssertValid() const
{
	[!output CHILD_FRAME_BASE_CLASS]::AssertValid();
}

void [!output CHILD_FRAME_CLASS]::Dump(CDumpContext& dc) const
{
	[!output CHILD_FRAME_BASE_CLASS]::Dump(dc);
}
#endif //_DEBUG

// обработчики сообщений [!output CHILD_FRAME_CLASS]
[!if PROJECT_STYLE_EXPLORER]
[!if LIST_VIEW]
[!output VIEW_CLASS]* [!output CHILD_FRAME_CLASS]::GetRightPane()
{
	CWnd* pWnd = m_wndSplitter.GetPane(0, 1);
	[!output VIEW_CLASS]* pView = DYNAMIC_DOWNCAST([!output VIEW_CLASS], pWnd);
	return pView;
}

void [!output CHILD_FRAME_CLASS]::OnUpdateViewStyles(CCmdUI* pCmdUI)
{
	if (!pCmdUI)
		return;

	// TODO: настройте или расширьте этот код для обработки вариантов выбора в меню "Вид".
	[!output VIEW_CLASS]* pView = GetRightPane(); 

	// если правая область не была создана или не является представлением, отключите команды в этом диапазоне
	if (pView == NULL)
		pCmdUI->Enable(FALSE);
	else
	{
		DWORD dwStyle = pView->GetStyle() & LVS_TYPEMASK;
		// если команда - ID_VIEW_LINEUP, включите команду,
		// когда используется режим LVS_ICON или LVS_SMALLICON
		if (pCmdUI->m_nID == ID_VIEW_LINEUP)
		{
			if (dwStyle == LVS_ICON || dwStyle == LVS_SMALLICON)
				pCmdUI->Enable();
			else
				pCmdUI->Enable(FALSE);
		}
		else
		{
			// в противном случае используйте точки для отражения стиля представления
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

void [!output CHILD_FRAME_CLASS]::OnViewStyle(UINT nCommandID)
{
	// TODO: настройте или расширьте этот код для обработки вариантов выбора в меню "Вид".
	[!output VIEW_CLASS]* pView = GetRightPane();

	// если правая область была создана и является [!output VIEW_CLASS], обработайте команды меню...
	if (pView != NULL)
	{
		int nStyle = -1;

		switch (nCommandID)
		{
		case ID_VIEW_LINEUP:
			{
				// получите элементы управления списком для привязке к сетке
				CListCtrl& refListCtrl = pView->GetListCtrl();
				refListCtrl.Arrange(LVA_SNAPTOGRID);
			}
			break;

		// другие команды изменяют стиль элемента управления списком
		case ID_VIEW_DETAILS:
			nStyle = LVS_REPORT;
			break;

		case ID_VIEW_SMALLICON:
			nStyle = LVS_SMALLICON;
			break;

		case ID_VIEW_LARGEICON:
			nStyle = LVS_ICON;
			break;

		case ID_VIEW_LIST:
			nStyle = LVS_LIST;
			break;
		}

		// изменить стиль; окно будет перекрашено автоматически
		if (nStyle != -1)
			pView->ModifyStyle(LVS_TYPEMASK, nStyle);
	}
}
[!endif]
[!endif]
[!if !DOCVIEW]
void [!output CHILD_FRAME_CLASS]::OnFileClose() 
{
	// Чтобы закрыть эту рамку, просто отправьте событие WM_CLOSE, которое эквивалентно
	// выбору команды "Закрыть" в системном меню.
	SendMessage(WM_CLOSE);
}

int [!output CHILD_FRAME_CLASS]::OnCreate(LPCREATESTRUCT lpCreateStruct) 
{
	if ([!output CHILD_FRAME_BASE_CLASS]::OnCreate(lpCreateStruct) == -1)
		return -1;
	
	// создать представление для размещения рабочей области рамки
	if (!m_wndView.Create(NULL, NULL, AFX_WS_DEFAULT_VIEW, 
		CRect(0, 0, 0, 0), this, AFX_IDW_PANE_FIRST, NULL))
	{
		TRACE0("Не удалось создать окно представлений\n");
		return -1;
	}

	return 0;
}

void [!output CHILD_FRAME_CLASS]::OnSetFocus(CWnd* pOldWnd) 
{
	[!output CHILD_FRAME_BASE_CLASS]::OnSetFocus(pOldWnd);

	m_wndView.SetFocus();
}

BOOL [!output CHILD_FRAME_CLASS]::OnCmdMsg(UINT nID, int nCode, void* pExtra, AFX_CMDHANDLERINFO* pHandlerInfo) 
{
	// разрешить ошибки в представлении при выполнении команды
	if (m_wndView.OnCmdMsg(nID, nCode, pExtra, pHandlerInfo))
		return TRUE;
	
	// в противном случае выполняется обработка по умолчанию
	return [!output CHILD_FRAME_BASE_CLASS]::OnCmdMsg(nID, nCode, pExtra, pHandlerInfo);
}
[!endif]
[!if PRINTING]
[!if RIBBON_TOOLBAR]

void [!output CHILD_FRAME_CLASS]::OnFilePrint()
{
	if (m_dockManager.IsPrintPreviewValid())
	{
		PostMessage(WM_COMMAND, AFX_ID_PREVIEW_PRINT);
	}
}

void [!output CHILD_FRAME_CLASS]::OnFilePrintPreview()
{
	if (m_dockManager.IsPrintPreviewValid())
	{
		PostMessage(WM_COMMAND, AFX_ID_PREVIEW_CLOSE);  // принудительное закрытие режима "Предварительный просмотр"
	}
}

void [!output CHILD_FRAME_CLASS]::OnUpdateFilePrintPreview(CCmdUI* pCmdUI)
{
	pCmdUI->SetCheck(m_dockManager.IsPrintPreviewValid());
}
[!endif]
[!endif]
