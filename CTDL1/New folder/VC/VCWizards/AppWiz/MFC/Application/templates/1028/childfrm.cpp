[!if RIBBON_TOOLBAR]
// 這個 MFC 範例原始程式碼會示範如何使用 MFC Microsoft Office Fluent 使用者介面
// (「Fluent UI」)，並且僅提供為參考資料，做為
// MFC 參考及 MFC C++ 程式庫軟體
// 隨附相關電子文件的補充。
// 關於 Fluent UI 之複製、使用或散發的授權條款則分別提供。
// 如需 Fluent UI 授權計劃的詳細資訊，請造訪 
// http://go.microsoft.com/fwlink/?LinkId=238214。
//
// Copyright (C) Microsoft Corporation
// 著作權所有，並保留一切權利。
[!endif]

// [!output CHILD_FRAME_IMPL] : [!output CHILD_FRAME_CLASS] 類別的實作
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

// [!output CHILD_FRAME_CLASS] 建構/解構

[!output CHILD_FRAME_CLASS]::[!output CHILD_FRAME_CLASS]()
{
[!if ACCESSIBILITY]
	EnableActiveAccessibility();
[!endif]
	// TODO:  在此加入成員初始化程式碼
}

[!output CHILD_FRAME_CLASS]::~[!output CHILD_FRAME_CLASS]()
{
}

[!if APP_TYPE_MDI && SPLITTER]
BOOL [!output CHILD_FRAME_CLASS]::OnCreateClient(LPCREATESTRUCT /*lpcs*/, CCreateContext* pContext)
{
[!if PROJECT_STYLE_EXPLORER]
	// 建立分割視窗
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
		2, 2,			// TODO:  調整資料列、資料行的編號
		CSize(10, 10),	// TODO:  調整最小的窗格大小
		pContext, WS_CHILD | WS_VISIBLE | SPLS_DYNAMIC_SPLIT);
[!else]
	return m_wndSplitter.Create(this,
		2, 2,			// TODO:  調整資料列、資料行的編號
		CSize(10, 10),	// TODO:  調整最小的窗格大小
		pContext);
[!endif]
[!endif]
}
[!else]
[!if PROJECT_STYLE_EXPLORER]
BOOL [!output CHILD_FRAME_CLASS]::OnCreateClient(LPCREATESTRUCT /*lpcs*/, CCreateContext* pContext)
{
	// 建立分割視窗
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
	// TODO:  在此經由修改 CREATESTRUCT cs 達到修改視窗類別或樣式的目的
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

// [!output CHILD_FRAME_CLASS] 診斷

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

// [!output CHILD_FRAME_CLASS] 訊息處理常式
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

	// TODO:  自訂或擴展此程式碼以處理 [檢視] 功能表上的選擇。
	[!output VIEW_CLASS]* pView = GetRightPane(); 

	// 如果尚未建立右窗格，或右窗格不是檢視，請停用我們範圍中的命令
	if (pView == NULL)
		pCmdUI->Enable(FALSE);
	else
	{
		DWORD dwStyle = pView->GetStyle() & LVS_TYPEMASK;
		// 如果命令是 ID_VIEW_LINEUP，則只有在位於
		// LVS_ICON 或 LVS_SMALLICON 模式時才能啟用
		if (pCmdUI->m_nID == ID_VIEW_LINEUP)
		{
			if (dwStyle == LVS_ICON || dwStyle == LVS_SMALLICON)
				pCmdUI->Enable();
			else
				pCmdUI->Enable(FALSE);
		}
		else
		{
			// 否則，使用點來反映檢視的樣式
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
	// TODO:  自訂或擴展此程式碼以處理 [檢視] 功能表上的選擇。
	[!output VIEW_CLASS]* pView = GetRightPane();

	// 如果已經建立右窗格，且是 [!output VIEW_CLASS]，則會處理功能表命令...
	if (pView != NULL)
	{
		int nStyle = -1;

		switch (nCommandID)
		{
		case ID_VIEW_LINEUP:
			{
				// 要求清單控制項貼齊格線
				CListCtrl& refListCtrl = pView->GetListCtrl();
				refListCtrl.Arrange(LVA_SNAPTOGRID);
			}
			break;

		// 其他命令變更清單控制項上的樣式
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

		// 變更樣式; 視窗會自動重新繪製
		if (nStyle != -1)
			pView->ModifyStyle(LVS_TYPEMASK, nStyle);
	}
}
[!endif]
[!endif]
[!if !DOCVIEW]
void [!output CHILD_FRAME_CLASS]::OnFileClose() 
{
	// 若要關閉框架，只需傳送 WM_CLOSE，
	// 這和從系統功能表選取關閉是一樣的。
	SendMessage(WM_CLOSE);
}

int [!output CHILD_FRAME_CLASS]::OnCreate(LPCREATESTRUCT lpCreateStruct) 
{
	if ([!output CHILD_FRAME_BASE_CLASS]::OnCreate(lpCreateStruct) == -1)
		return -1;
	
	// 建立佔領框架工作區的檢視
	if (!m_wndView.Create(NULL, NULL, AFX_WS_DEFAULT_VIEW, 
		CRect(0, 0, 0, 0), this, AFX_IDW_PANE_FIRST, NULL))
	{
		TRACE0("無法建立檢視視窗\n");
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
	// 讓檢視在命令有第一個萃取
	if (m_wndView.OnCmdMsg(nID, nCode, pExtra, pHandlerInfo))
		return TRUE;
	
	// 否則，執行預設的處理
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
		PostMessage(WM_COMMAND, AFX_ID_PREVIEW_CLOSE);  // 強制預覽列印模式關閉
	}
}

void [!output CHILD_FRAME_CLASS]::OnUpdateFilePrintPreview(CCmdUI* pCmdUI)
{
	pCmdUI->SetCheck(m_dockManager.IsPrintPreviewValid());
}
[!endif]
[!endif]
