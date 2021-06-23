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

// [!output APP_IMPL] : 定義應用程式的類別行為。
//

#include "stdafx.h"
#include "afxwinappex.h"
#include "afxdialogex.h"
#include "[!output APP_HEADER]"
#include "[!output MAIN_FRAME_HEADER]"

[!if APP_TYPE_MDI]
#include "[!output CHILD_FRAME_HEADER]"
[!endif]
[!if MINI_SERVER || FULL_SERVER || CONTAINER_SERVER]
#include "[!output INPLACE_FRAME_HEADER]"
[!endif]
[!if OLEDB_RECORD_VIEW || ODBC_RECORD_VIEW]
#include "[!output ROWSET_HEADER]"
[!endif]
[!if DOCVIEW]
#include "[!output DOC_HEADER]"
[!if PROJECT_STYLE_EXPLORER]
#include "[!output TREE_VIEW_HEADER]"
[!else]
#include "[!output VIEW_HEADER]"
[!endif]
[!endif]

#ifdef _DEBUG
#define new DEBUG_NEW
#endif


// [!output APP_CLASS]

BEGIN_MESSAGE_MAP([!output APP_CLASS], [!output APP_BASE_CLASS])
	ON_COMMAND(ID_APP_ABOUT, &[!output APP_CLASS]::OnAppAbout)
[!if APP_TYPE_MTLD]
	ON_COMMAND(ID_FILE_NEW_FRAME, &[!output APP_CLASS]::OnFileNewFrame)
[!if DOCVIEW]
	ON_COMMAND(ID_FILE_NEW, &[!output APP_CLASS]::OnFileNew)
[!endif]
[!endif]
[!if !DOCVIEW]
[!if APP_TYPE_MDI]
	ON_COMMAND(ID_FILE_NEW, &[!output APP_CLASS]::OnFileNew)
[!endif]
[!endif]
[!if DOCVIEW]
[!if !DB_VIEW_NO_FILE]
	// 依據文件命令的標準檔案
[!if !APP_TYPE_MTLD]
	ON_COMMAND(ID_FILE_NEW, &[!output APP_BASE_CLASS]::OnFileNew)
[!endif]
	ON_COMMAND(ID_FILE_OPEN, &[!output APP_BASE_CLASS]::OnFileOpen)
[!endif]
[!endif]
[!if PRINTING && DOCVIEW]
	// 標準列印設定命令
	ON_COMMAND(ID_FILE_PRINT_SETUP, &[!output APP_BASE_CLASS]::OnFilePrintSetup)
[!endif]
END_MESSAGE_MAP()


// [!output APP_CLASS] 建構

[!output APP_CLASS]::[!output APP_CLASS]()
{
[!if MENUBAR_TOOLBAR || ADV_DOCKING_EXPLORER || ADV_DOCKING_OUTPUT || ADV_DOCKING_PROPERTIES || ADV_DOCKING_NAVIGATION]
	m_bHiColorIcons = TRUE;

[!endif]
[!if RESTART_MGR_SUPPORT]
	// 支援重新啟動管理員
[!if !RESTART_MGR_SUPPORT_RESTART && !RESTART_MGR_SUPPORT_RECOVERY]
	m_dwRestartManagerSupportFlags = AFX_RESTART_MANAGER_SUPPORT_RESTART;
[!endif]
[!if RESTART_MGR_SUPPORT_RESTART && !RESTART_MGR_SUPPORT_RECOVERY]
	m_dwRestartManagerSupportFlags = AFX_RESTART_MANAGER_SUPPORT_RESTART_ASPECTS;
[!endif]
[!if RESTART_MGR_SUPPORT_RECOVERY && !RESTART_MGR_SUPPORT_RESTART]
	m_dwRestartManagerSupportFlags = AFX_RESTART_MANAGER_SUPPORT_RECOVERY_ASPECTS;
[!endif]
[!if RESTART_MGR_SUPPORT_RECOVERY && RESTART_MGR_SUPPORT_RESTART]
	m_dwRestartManagerSupportFlags = AFX_RESTART_MANAGER_SUPPORT_ALL_ASPECTS;
[!endif]
#ifdef _MANAGED
	// 如果應用程式是使用 Common Language Runtime 支援 (/clr) 建置的: 
	//     1) 要使重新啟動管理員支援正常運作需要這個額外設定。
	//     2) 在專案中必須將參考加入至 System.Windows.Forms 才能進行建置。
	System::Windows::Forms::Application::SetUnhandledExceptionMode(System::Windows::Forms::UnhandledExceptionMode::ThrowException);
#endif

[!endif]
	// TODO:  以唯一的 ID 字串取代下面的應用程式 ID 字串; 建議的
	// 字串格式為 CompanyName.ProductName.SubProduct.VersionInformation
	SetAppID(_T("[!output PROJECT_NAME].AppID.NoVersion"));

	// TODO:  在此加入建構程式碼，
	// 將所有重要的初始設定加入 InitInstance 中
}
[!if ATL_SUPPORT]

// ATL 模組物件
CComModule _Module;
[!endif]

// 僅有的一個 [!output APP_CLASS] 物件

[!output APP_CLASS] theApp;
[!if MINI_SERVER || FULL_SERVER || CONTAINER_SERVER || AUTOMATION]
// 對您的應用程式產生統計上唯一的識別項，如果您想選擇特定的識別項，
// 可以變更此識別項

// {[!output APP_CLSID_REGISTRY_FORMAT]}
static const CLSID clsid =
[!output APP_CLSID_STATIC_CONST_GUID_FORMAT];
[!endif]

[!if AUTOMATION]
const GUID CDECL _tlid = [!output LIBID_STATIC_CONST_GUID_FORMAT];
const WORD _wVerMajor = 1;
const WORD _wVerMinor = 0;

[!endif]

// [!output APP_CLASS] 初始設定

BOOL [!output APP_CLASS]::InitInstance()
{
[!if MANIFEST]
	// 假如應用程式資訊清單指定使用 ComCtl32.dll 6 (含) 以後版本，
	// 來啟動視覺化樣式，在 Windows XP 上，則需要 InitCommonControls()。
	// 否則任何視窗的建立都將失敗。
	INITCOMMONCONTROLSEX InitCtrls;
	InitCtrls.dwSize = sizeof(InitCtrls);
	// 設定要包含所有您想要用於應用程式中的
	// 通用控制項類別。
	InitCtrls.dwICC = ICC_WIN95_CLASSES;
	InitCommonControlsEx(&InitCtrls);

[!endif]
	[!output APP_BASE_CLASS]::InitInstance();

[!if OLEDB]
	CoInitialize(NULL);
[!endif]
[!if SOCKETS]
	if (!AfxSocketInit())
	{
		AfxMessageBox(IDP_SOCKETS_INIT_FAILED);
		return FALSE;
	}
[!endif]

[!if CONTAINER || MINI_SERVER || FULL_SERVER || CONTAINER_SERVER || AUTOMATION || OLEDB || ACTIVEX_CONTROLS || ACCESSIBILITY || RIBBON_TOOLBAR]
	// 初始化 OLE 程式庫
	if (!AfxOleInit())
	{
		AfxMessageBox(IDP_OLE_INIT_FAILED);
		return FALSE;
	}

[!endif]
[!if ACTIVEX_CONTROLS]
	AfxEnableControlContainer();

[!endif]
[!if APP_TYPE_MDI && APP_TYPE_TABBED_MDI]
	EnableTaskbarInteraction();
[!else]
	EnableTaskbarInteraction(FALSE);
[!endif]

	// 需要有 AfxInitRichEdit2() 才能使用 RichEdit 控制項	
	// AfxInitRichEdit2();

	// 標準初始設定
	// 如果您不使用這些功能並且想減少
	// 最後完成的可執行檔大小，您可以
	// 從下列程式碼移除不需要的初始化常式，
	// 變更儲存設定值的登錄機碼
	// TODO:  您應該適度修改此字串
	// (例如，公司名稱或組織名稱)
	SetRegistryKey(_T("本機 AppWizard 所產生的應用程式"));
[!if DOCVIEW]
	LoadStdProfileSettings([!output MRU_SIZE]);  // 載入標準 INI 檔選項 (包含 MRU)
[!endif]

[!if MENUBAR_TOOLBAR || RIBBON_TOOLBAR]

	InitContextMenuManager();
[!if ADV_DOCKING_NAVIGATION]
	InitShellManager();
[!endif]

	InitKeyboardManager();

	InitTooltipManager();
	CMFCToolTipInfo ttParams;
	ttParams.m_bVislManagerTheme = TRUE;
	theApp.GetTooltipManager()->SetTooltipParams(AFX_TOOLTIP_TYPE_ALL,
		RUNTIME_CLASS(CMFCToolTipCtrl), &ttParams);
[!endif]
[!if !DOCVIEW]

	// 若要建立主視窗，此程式碼建立新的框架視窗物件，且將其設定為
	// 應用程式的主視窗物件
[!if  APP_TYPE_MDI]
	CMDIFrameWnd* pFrame = new [!output MAIN_FRAME_CLASS];
[!else]
[!if !DOCVIEW]
	CMainFrame* pFrame = new [!output MAIN_FRAME_CLASS];
[!else]
	CRuntimeClass* pClass = RUNTIME_CLASS(CMainFrame);
	CFrameWnd* pFrame = (CFrameWnd*) pClass->CreateObject();
	ASSERT_KINDOF(CFrameWnd, pFrame);
[!endif]
[!endif]
	if (!pFrame)
		return FALSE;
	m_pMainWnd = pFrame;
[!if APP_TYPE_SDI]
[!if DOCVIEW]
	// 載入框架，防止空內容
	CCreateContext context;
[!else]
	// 使用其資源建立並載入框架
[!endif]
	pFrame->LoadFrame(IDR_MAINFRAME,
		WS_OVERLAPPEDWINDOW | FWS_ADDTOTITLE, NULL,
[!if DOCVIEW]
		&context);
[!else]
		NULL);
[!endif]
[!else]
	// 建立主 MDI 框架視窗
	if (!pFrame->LoadFrame(IDR_MAINFRAME))
		return FALSE;
	// 嘗試載入共用的 MDI 功能表與快速鍵對應表
	// TODO:  加入其他成員變數並載入對
	//	其他您程式所需功能表類型的呼叫
	HINSTANCE hInst = AfxGetResourceHandle();
	m_hMDIMenu  = ::LoadMenu(hInst, MAKEINTRESOURCE(IDR_[!output SAFE_DOC_TYPE_NAME]TYPE));
	m_hMDIAccel = ::LoadAccelerators(hInst, MAKEINTRESOURCE(IDR_[!output SAFE_DOC_TYPE_NAME]TYPE));
[!endif]
[!else]

	// 登錄應用程式的文件範本。文件範本負責在文件、
	// 框架視窗與檢視間進行連接
[!if APP_TYPE_MDI]
	CMultiDocTemplate* pDocTemplate;
	pDocTemplate = new CMultiDocTemplate(IDR_[!output SAFE_DOC_TYPE_NAME]TYPE,
[!else]
[!if APP_TYPE_MTLD]
	CMultiDocTemplate* pDocTemplate;
	pDocTemplate = new CMultiDocTemplate(
		IDR_MAINFRAME,
[!else]
	CSingleDocTemplate* pDocTemplate;
	pDocTemplate = new CSingleDocTemplate(
		IDR_MAINFRAME,
[!endif]
[!endif]
		RUNTIME_CLASS([!output DOC_CLASS]),
[!if APP_TYPE_MDI]
		RUNTIME_CLASS([!output CHILD_FRAME_CLASS]), // 自訂 MDI 子框架
[!else]
		RUNTIME_CLASS([!output MAIN_FRAME_CLASS]),       // 主 SDI 框架視窗
[!endif]
[!if PROJECT_STYLE_EXPLORER]
		RUNTIME_CLASS([!output TREE_VIEW_CLASS]));
[!else]
		RUNTIME_CLASS([!output VIEW_CLASS]));
[!endif]
	if (!pDocTemplate)
		return FALSE;
[!if CONTAINER || CONTAINER_SERVER]
[!if APP_TYPE_MDI]
	pDocTemplate->SetContainerInfo(IDR_[!output SAFE_DOC_TYPE_NAME]TYPE_CNTR_IP);
[!else]
	pDocTemplate->SetContainerInfo(IDR_CNTR_INPLACE);
[!endif]
[!endif]
[!if MINI_SERVER || FULL_SERVER || CONTAINER_SERVER]
	pDocTemplate->SetServerInfo(
[!if APP_TYPE_MDI]
		IDR_[!output SAFE_DOC_TYPE_NAME]TYPE_SRVR_EMB, IDR_[!output SAFE_DOC_TYPE_NAME]TYPE_SRVR_IP,
[!else]
		IDR_SRVR_EMBEDDED, IDR_SRVR_INPLACE,
[!endif]
		RUNTIME_CLASS([!output INPLACE_FRAME_CLASS]));
[!endif]
[!if APP_TYPE_MTLD]
	m_pDocTemplate = pDocTemplate;
[!endif]
	AddDocTemplate(pDocTemplate);
[!if MINI_SERVER || FULL_SERVER || CONTAINER_SERVER || AUTOMATION]
	// 將 COleTemplateServer 連接至文件範本
	// COleTemplateServer 使用文件範本中所指定的資訊，
	// 建立新的文件做為要求 OLE 容器
	// 的代表
[!if APP_TYPE_MDI || APP_TYPE_MTLD]
	m_server.ConnectTemplate(clsid, pDocTemplate, FALSE);
	// 將所有 OLE 伺服器 Factory 登錄為執行中。這樣可以讓
	// OLE 程式庫自其他的應用程式建立物件
	COleTemplateServer::RegisterAll();
		// 注意:  MDI 應用程式不論命令列上的是否有 /Embedding 或 /Automation，
		// 會登錄所有的伺服器物件
[!else]
	m_server.ConnectTemplate(clsid, pDocTemplate, TRUE);
		// 注意:  SDI 應用程式只登錄命令列上有 /Embedding 或 /Automation
		// 的伺服器物件
[!endif]
[!endif]
[!endif]

[!if APP_TYPE_MDI && DOCVIEW]
	// 建立主 MDI 框架視窗
	[!output MAIN_FRAME_CLASS]* pMainFrame = new [!output MAIN_FRAME_CLASS];
	if (!pMainFrame || !pMainFrame->LoadFrame(IDR_MAINFRAME))
	{
		delete pMainFrame;
		return FALSE;
	}
	m_pMainWnd = pMainFrame;

[!if !MINI_SERVER]
[!if HAS_SUFFIX && !HTML_EDITVIEW]
	// 只有在 MDI 應用程式中有後置字元時，才呼叫 DragAcceptFiles
	// 這會立即發生在設定 m_pMainWnd 之後
	// 啟用拖放開啟
	m_pMainWnd->DragAcceptFiles();
[!endif]
[!endif]
[!endif]
[!if TOOLBAR_EXTCHAR_TRANSLATE]

	// 允許擴充字元做為功能表快速鍵
	CMFCToolBar::m_bExtCharTranslation = TRUE;
[!endif]
[!if DOCVIEW]

	// 剖析標準 Shell 命令、DDE、檔案開啟舊檔的命令列
	CCommandLineInfo cmdInfo;
	ParseCommandLine(cmdInfo);
[!endif]

[!if !MINI_SERVER]
[!if HAS_SUFFIX && !HTML_EDITVIEW]
	// 啟用 DDE 執行開啟
	EnableShellOpen();
	RegisterShellFileTypes(TRUE);
[!endif]
[!endif]

[!if MINI_SERVER || FULL_SERVER || CONTAINER_SERVER || AUTOMATION]
	// 已使用 /Embedding 或 /Automation 參數啟動應用程式。
	// 將應用程式當做 Automation 伺服器執行。
	if (cmdInfo.m_bRunEmbedded || cmdInfo.m_bRunAutomated)
	{
[!if !APP_TYPE_MDI && !APP_TYPE_MTLD]
		// 將所有 OLE 伺服器 Factory 登錄為執行中。這樣可以讓
		// OLE 程式庫自其他的應用程式建立物件
		COleTemplateServer::RegisterAll();

[!endif]
		// 不要顯示主要視窗
		return TRUE;
	}
	// 已使用 /Unregserver 或 /Unregister 參數啟動應用程式。解除登錄
	// 類型程式庫。其他解除登錄發生於 ProcessShellCommand()。
	else if (cmdInfo.m_nShellCommand == CCommandLineInfo::AppUnregister)
	{
[!if !MINI_SERVER]
[!if HAS_SUFFIX && !HTML_EDITVIEW]
		UnregisterShellFileTypes();
[!endif]
[!endif]
[!if MINI_SERVER || FULL_SERVER || CONTAINER_SERVER]
[!if ACTIVE_DOC_SERVER]
		m_server.UpdateRegistry(OAT_DOC_OBJECT_SERVER, NULL, NULL, FALSE);
[!else]
		m_server.UpdateRegistry(OAT_INPLACE_SERVER, NULL, NULL, FALSE);
[!endif]
[!else]
[!if AUTOMATION]
		m_server.UpdateRegistry(OAT_DISPATCH_OBJECT, NULL, NULL, FALSE);
[!endif]
[!endif]
[!if AUTOMATION]
		AfxOleUnregisterTypeLib(_tlid, _wVerMajor, _wVerMinor);
[!endif]
[!if MINI_SERVER]
		return FALSE;
[!endif]
	}
	// 已單獨或搭配其他參數 (如 /Register 或 /Regserver) 啟動應用程式。
	// 更新登錄項目，包括類型程式庫。
	else
	{
[!if MINI_SERVER || FULL_SERVER || CONTAINER_SERVER]
[!if ACTIVE_DOC_SERVER]
		m_server.UpdateRegistry(OAT_DOC_OBJECT_SERVER);
[!else]
		m_server.UpdateRegistry(OAT_INPLACE_SERVER);
[!endif]
[!else]
[!if AUTOMATION]
		m_server.UpdateRegistry(OAT_DISPATCH_OBJECT);
[!endif]
[!endif]
[!if AUTOMATION]
		COleObjectFactory::UpdateRegistryAll();
		AfxOleRegisterTypeLib(AfxGetInstanceHandle(), _tlid);
[!endif]
[!if MINI_SERVER]
		if (cmdInfo.m_nShellCommand == CCommandLineInfo::AppRegister)
			return FALSE;
[!endif]
	}
[!endif]

[!if MINI_SERVER]
	// 當單獨執行迷你伺服器時，更新登錄且指示使用者
	// 在容器中使用 [插入物件] 對話方塊以使用伺服器。
	// 迷你伺服器沒有獨立的使用者介面
	AfxMessageBox(IDP_USE_INSERT_OBJECT);
	return FALSE;
[!else]
[!if DOCVIEW]
	// 在命令列中指定的分派命令。如果已使用 
	// /RegServer、/Register、/Unregserver 或 /Unregister 啟動應用程式，將傳回 FALSE。
	if (!ProcessShellCommand(cmdInfo))
		return FALSE;
[!endif]
[!if APP_TYPE_MDI]
	// 已經初始設定主視窗，所以顯示並更新該視窗
[!if DOCVIEW]
[!if MAIN_FRAME_MAXIMIZED]
	pMainFrame->ShowWindow(SW_SHOWMAXIMIZED);
[!else]
[!if MAIN_FRAME_MINIMIZED]
	pMainFrame->ShowWindow(SW_SHOWMINIMIZED);
[!else]
[!if APP_TYPE_SDI || APP_TYPE_MTLD]
	pMainFrame->ShowWindow(SW_SHOW);
[!else]
	pMainFrame->ShowWindow(m_nCmdShow);
[!endif]
[!endif]
[!endif]
	pMainFrame->UpdateWindow();
[!else]
[!if MAIN_FRAME_MAXIMIZED]
	pFrame->ShowWindow(SW_SHOWMAXIMIZED);
[!else]
[!if MAIN_FRAME_MINIMIZED]
	pFrame->ShowWindow(SW_SHOWMINIMIZED);
[!else]
[!if APP_TYPE_SDI || APP_TYPE_MTLD]
	pFrame->ShowWindow(SW_SHOW);
[!else]
	pFrame->ShowWindow(m_nCmdShow);
[!endif]
[!endif]
[!endif]
	pFrame->UpdateWindow();
[!endif]
[!endif]

[!if APP_TYPE_SDI || APP_TYPE_MTLD]
	// 僅初始化一個視窗，所以顯示並更新該視窗
[!if DOCVIEW]
[!if MAIN_FRAME_MAXIMIZED]
	m_pMainWnd->ShowWindow(SW_SHOWMAXIMIZED);
[!else]
[!if MAIN_FRAME_MINIMIZED]
	m_pMainWnd->ShowWindow(SW_SHOWMINIMIZED);
[!else]
[!if APP_TYPE_SDI || APP_TYPE_MTLD]
	m_pMainWnd->ShowWindow(SW_SHOW);
[!else]
	m_pMainWnd->ShowWindow(m_nCmdShow);
[!endif]
[!endif]
[!endif]
	m_pMainWnd->UpdateWindow();
[!else]
[!if MAIN_FRAME_MAXIMIZED]
	pFrame->ShowWindow(SW_SHOWMAXIMIZED);
[!else]
[!if MAIN_FRAME_MINIMIZED]
	pFrame->ShowWindow(SW_SHOWMINIMIZED);
[!else]
[!if APP_TYPE_SDI || APP_TYPE_MTLD]
	pFrame->ShowWindow(SW_SHOW);
[!else]
	pFrame->ShowWindow(m_nCmdShow);
[!endif]
[!endif]
[!endif]
	pFrame->UpdateWindow();
[!endif]
[!if HAS_SUFFIX && !HTML_EDITVIEW]
	// 只有在 SDI 應用程式中有後置字元時，才呼叫 DragAcceptFiles
	// 這會發生於 ProcessShellCommand 之後
	// 啟用拖放開啟
	m_pMainWnd->DragAcceptFiles();
[!endif]
[!endif]
	return TRUE;
[!endif]
}

[!if CONTAINER || MINI_SERVER || FULL_SERVER || CONTAINER_SERVER || AUTOMATION || OLEDB || ACTIVEX_CONTROLS || ACCESSIBILITY || RIBBON_TOOLBAR || APP_TYPE_MDI || !DOCVIEW]
int [!output APP_CLASS]::ExitInstance()
{
	// TODO:  處理其他您已經加入的資源
[!if APP_TYPE_MDI]
[!if !DOCVIEW]
	if (m_hMDIMenu != NULL)
		FreeResource(m_hMDIMenu);
	if (m_hMDIAccel != NULL)
		FreeResource(m_hMDIAccel);

[!endif]
[!endif]
[!if CONTAINER || MINI_SERVER || FULL_SERVER || CONTAINER_SERVER || AUTOMATION || OLEDB || ACTIVEX_CONTROLS || ACCESSIBILITY || RIBBON_TOOLBAR]
	AfxOleTerm(FALSE);

[!endif]
[!if OLEDB]
	CoUninitialize();

[!endif]
	return [!output APP_BASE_CLASS]::ExitInstance();
}

[!endif]
// [!output APP_CLASS] 訊息處理常式

[!if !DOCVIEW]
[!if APP_TYPE_MDI]
void [!output APP_CLASS]::OnFileNew() 
{
[!if APP_TYPE_SDI]
	CString strUntitled;
	CFrameWnd* pFrameWnd = DYNAMIC_DOWNCAST(CFrameWnd, m_pMainWnd);
	if (pFrameWnd != NULL)
	{
		// TODO:  關閉並摧毀任何您從記憶體所取得
		// 有關特定檔案的資料。一旦完成，
		// 如果陳述式重設框架視窗的標題則執行下列
		if (strUntitled.LoadString(AFX_IDS_UNTITLED))
			pFrameWnd->UpdateFrameTitleForDocument(strUntitled);
		else
			pFrameWnd->UpdateFrameTitleForDocument(NULL);
	}
[!else]
	[!output MAIN_FRAME_CLASS]* pFrame = STATIC_DOWNCAST([!output MAIN_FRAME_CLASS], m_pMainWnd);
[!if APP_TYPE_TABBED_MDI]
	pFrame->LockWindowUpdate();
[!endif]
	// 建立新的 MDI 子視窗
	pFrame->CreateNewChild(
		RUNTIME_CLASS(CChildFrame), IDR_[!output SAFE_DOC_TYPE_NAME]TYPE, m_hMDIMenu, m_hMDIAccel);
[!if APP_TYPE_TABBED_MDI]
	pFrame->UnlockWindowUpdate();
[!endif]
[!endif]
}
[!endif]
[!endif]

// 對 App About 使用 CAboutDlg 對話方塊

class CAboutDlg : public CDialogEx
{
public:
	CAboutDlg();

// 對話方塊資料
	enum { IDD = IDD_ABOUTBOX };

protected:
	virtual void DoDataExchange(CDataExchange* pDX);    // DDX/DDV 支援

// 程式碼實作
protected:
	DECLARE_MESSAGE_MAP()
};

CAboutDlg::CAboutDlg() : CDialogEx(CAboutDlg::IDD)
{
[!if ACCESSIBILITY]
	EnableActiveAccessibility();
[!endif]
}

void CAboutDlg::DoDataExchange(CDataExchange* pDX)
{
	CDialogEx::DoDataExchange(pDX);
}

BEGIN_MESSAGE_MAP(CAboutDlg, CDialogEx)
END_MESSAGE_MAP()

// 執行對話方塊的應用程式命令
void [!output APP_CLASS]::OnAppAbout()
{
	CAboutDlg aboutDlg;
	aboutDlg.DoModal();
}
[!if MENUBAR_TOOLBAR || RIBBON_TOOLBAR]

// [!output APP_CLASS] 自訂載入/儲存方法

void [!output APP_CLASS]::PreLoadState()
{
	BOOL bNameValid;
	CString strName;
	bNameValid = strName.LoadString(IDS_EDIT_MENU);
	ASSERT(bNameValid);
	GetContextMenuManager()->AddMenu(strName, IDR_POPUP_EDIT);
[!if ADV_DOCKING_EXPLORER]
	bNameValid = strName.LoadString(IDS_EXPLORER);
	ASSERT(bNameValid);
	GetContextMenuManager()->AddMenu(strName, IDR_POPUP_EXPLORER);
[!endif]
}

void [!output APP_CLASS]::LoadCustomState()
{
}

void [!output APP_CLASS]::SaveCustomState()
{
}
[!endif]

// [!output APP_CLASS] 訊息處理常式

[!if APP_TYPE_MTLD]
[!if DOCVIEW]
void [!output APP_CLASS]::OnFileNewFrame() 
{
	ASSERT(m_pDocTemplate != NULL);

	CDocument* pDoc = NULL;
	CFrameWnd* pFrame = NULL;

	// 建立 m_pDocTemplate 成員所參考文件的
	//新執行個體。
	if (m_pDocTemplate != NULL)
		pDoc = m_pDocTemplate->CreateNewDocument();

	if (pDoc != NULL)
	{
		// 如果建立生效，對該文件執行建立
		// 新的框架。
		pFrame = m_pDocTemplate->CreateNewFrame(pDoc, NULL);
		if (pFrame != NULL)
		{
			// 設定標題，並初始設定文件。
			// 如果文件初始設定失敗，
			// 清除框架視窗與文件。

			m_pDocTemplate->SetDefaultTitle(pDoc);
			if (!pDoc->OnNewDocument())
			{
				pFrame->DestroyWindow();
				pFrame = NULL;
			}
			else
			{
				// 否則，更新框架
				m_pDocTemplate->InitialUpdateFrame(pFrame, pDoc, TRUE);
			}
		}
	}

	// 如果我們失敗，清除文件
	// 並向使用者顯示訊息。

	if (pFrame == NULL || pDoc == NULL)
	{
		delete pDoc;
		AfxMessageBox(AFX_IDP_FAILED_TO_CREATE_DOC);
	}
}

void [!output APP_CLASS]::OnFileNew() 
{
	CDocument* pDoc = NULL;
	CFrameWnd* pFrame;
	pFrame = DYNAMIC_DOWNCAST(CFrameWnd, CWnd::GetActiveWindow());
	
	if (pFrame != NULL)
		pDoc = pFrame->GetActiveDocument();

	if (pFrame == NULL || pDoc == NULL)
	{
		// 如果是第一份文件，建立成一般文件
		CWinApp::OnFileNew();
	}
	else
	{
		// 否則，檢視是否儲存已修改的部分，
		// 然後要求重新初始此文件。
		if (!pDoc->SaveModified())
			return;

		CDocTemplate* pTemplate = pDoc->GetDocTemplate();
		ASSERT(pTemplate != NULL);

		if (pTemplate != NULL)
			pTemplate->SetDefaultTitle(pDoc);
		pDoc->OnNewDocument();
	}
}
[!else]
void [!output APP_CLASS]::OnFileNewFrame() 
{
	CMainFrame* pFrame = new CMainFrame;
	pFrame->LoadFrame(IDR_MAINFRAME, WS_OVERLAPPEDWINDOW | FWS_ADDTOTITLE, 
					  NULL, NULL);
	pFrame->ShowWindow(SW_SHOW);
	pFrame->UpdateWindow();
	m_aryFrames.Add(pFrame->GetSafeHwnd());
}
[!endif]
[!endif]


