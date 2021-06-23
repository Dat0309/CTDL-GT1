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

// [!output APP_IMPL] : 定义应用程序的类行为。
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
	// 基于文件的标准文档命令
[!if !APP_TYPE_MTLD]
	ON_COMMAND(ID_FILE_NEW, &[!output APP_BASE_CLASS]::OnFileNew)
[!endif]
	ON_COMMAND(ID_FILE_OPEN, &[!output APP_BASE_CLASS]::OnFileOpen)
[!endif]
[!endif]
[!if PRINTING && DOCVIEW]
	// 标准打印设置命令
	ON_COMMAND(ID_FILE_PRINT_SETUP, &[!output APP_BASE_CLASS]::OnFilePrintSetup)
[!endif]
END_MESSAGE_MAP()


// [!output APP_CLASS] 构造

[!output APP_CLASS]::[!output APP_CLASS]()
{
[!if MENUBAR_TOOLBAR || ADV_DOCKING_EXPLORER || ADV_DOCKING_OUTPUT || ADV_DOCKING_PROPERTIES || ADV_DOCKING_NAVIGATION]
	m_bHiColorIcons = TRUE;

[!endif]
[!if RESTART_MGR_SUPPORT]
	// 支持重新启动管理器
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
	// 如果应用程序是利用公共语言运行时支持(/clr)构建的，则: 
	//     1) 必须有此附加设置，“重新启动管理器”支持才能正常工作。
	//     2) 在您的项目中，您必须按照生成顺序向 System.Windows.Forms 添加引用。
	System::Windows::Forms::Application::SetUnhandledExceptionMode(System::Windows::Forms::UnhandledExceptionMode::ThrowException);
#endif

[!endif]
	// TODO:  将以下应用程序 ID 字符串替换为唯一的 ID 字符串；建议的字符串格式
	//为 CompanyName.ProductName.SubProduct.VersionInformation
	SetAppID(_T("[!output PROJECT_NAME].AppID.NoVersion"));

	// TODO:  在此处添加构造代码，
	// 将所有重要的初始化放置在 InitInstance 中
}
[!if ATL_SUPPORT]

// ATL 模块对象
CComModule _Module;
[!endif]

// 唯一的一个 [!output APP_CLASS] 对象

[!output APP_CLASS] theApp;
[!if MINI_SERVER || FULL_SERVER || CONTAINER_SERVER || AUTOMATION]
// 生成的此标识符在统计上对于您的应用程序是唯一的
// 如果您更愿选择一个特定的标识符，则可以更改它

// {[!output APP_CLSID_REGISTRY_FORMAT]}
static const CLSID clsid =
[!output APP_CLSID_STATIC_CONST_GUID_FORMAT];
[!endif]

[!if AUTOMATION]
const GUID CDECL _tlid = [!output LIBID_STATIC_CONST_GUID_FORMAT];
const WORD _wVerMajor = 1;
const WORD _wVerMinor = 0;

[!endif]

// [!output APP_CLASS] 初始化

BOOL [!output APP_CLASS]::InitInstance()
{
[!if MANIFEST]
	// 如果一个运行在 Windows XP 上的应用程序清单指定要
	// 使用 ComCtl32.dll 版本 6 或更高版本来启用可视化方式，
	//则需要 InitCommonControlsEx()。  否则，将无法创建窗口。
	INITCOMMONCONTROLSEX InitCtrls;
	InitCtrls.dwSize = sizeof(InitCtrls);
	// 将它设置为包括所有要在应用程序中使用的
	// 公共控件类。
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
	// 初始化 OLE 库
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

	// 使用 RichEdit 控件需要  AfxInitRichEdit2()	
	// AfxInitRichEdit2();

	// 标准初始化
	// 如果未使用这些功能并希望减小
	// 最终可执行文件的大小，则应移除下列
	// 不需要的特定初始化例程
	// 更改用于存储设置的注册表项
	// TODO:  应适当修改该字符串，
	// 例如修改为公司或组织名
	SetRegistryKey(_T("应用程序向导生成的本地应用程序"));
[!if DOCVIEW]
	LoadStdProfileSettings([!output MRU_SIZE]);  // 加载标准 INI 文件选项(包括 MRU)
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

	// 若要创建主窗口，此代码将创建新的框架窗口
	// 对象，然后将其设置为应用程序的主窗口对象
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
	// 在空白上下文中加载框架
	CCreateContext context;
[!else]
	// 创建并加载框架及其资源
[!endif]
	pFrame->LoadFrame(IDR_MAINFRAME,
		WS_OVERLAPPEDWINDOW | FWS_ADDTOTITLE, NULL,
[!if DOCVIEW]
		&context);
[!else]
		NULL);
[!endif]
[!else]
	// 创建主 MDI 框架窗口
	if (!pFrame->LoadFrame(IDR_MAINFRAME))
		return FALSE;
	// 试图加载共享 MDI 菜单和快捷键表
	//TODO:  添加附加成员变量，并加载对
	//	应用程序可能需要的附加菜单类型的调用
	HINSTANCE hInst = AfxGetResourceHandle();
	m_hMDIMenu  = ::LoadMenu(hInst, MAKEINTRESOURCE(IDR_[!output SAFE_DOC_TYPE_NAME]TYPE));
	m_hMDIAccel = ::LoadAccelerators(hInst, MAKEINTRESOURCE(IDR_[!output SAFE_DOC_TYPE_NAME]TYPE));
[!endif]
[!else]

	// 注册应用程序的文档模板。  文档模板
	// 将用作文档、框架窗口和视图之间的连接
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
		RUNTIME_CLASS([!output CHILD_FRAME_CLASS]), // 自定义 MDI 子框架
[!else]
		RUNTIME_CLASS([!output MAIN_FRAME_CLASS]),       // 主 SDI 框架窗口
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
	// 将 COleTemplateServer 连接到文档模板
	// COleTemplateServer 通过使用
	// 文档模板中指定的信息来为请求 OLE 容器
	// 创建新文档
[!if APP_TYPE_MDI || APP_TYPE_MTLD]
	m_server.ConnectTemplate(clsid, pDocTemplate, FALSE);
	// 将所有的 OLE 服务器工厂注册为正在运行。  这将启用
	//  OLE 库以从其他应用程序中创建对象
	COleTemplateServer::RegisterAll();
		// 注意:  MDI 应用程序将注册所有的服务器对象，而不管
		// 命令行上的 /Embedding 或 /Automation
[!else]
	m_server.ConnectTemplate(clsid, pDocTemplate, TRUE);
		// 注意:  仅当命令行中存在 /Embedding 或 /Automation 时，SDI 应用程序
		//   才注册服务器对象
[!endif]
[!endif]
[!endif]

[!if APP_TYPE_MDI && DOCVIEW]
	// 创建主 MDI 框架窗口
	[!output MAIN_FRAME_CLASS]* pMainFrame = new [!output MAIN_FRAME_CLASS];
	if (!pMainFrame || !pMainFrame->LoadFrame(IDR_MAINFRAME))
	{
		delete pMainFrame;
		return FALSE;
	}
	m_pMainWnd = pMainFrame;

[!if !MINI_SERVER]
[!if HAS_SUFFIX && !HTML_EDITVIEW]
	// 仅当具有后缀时才调用 DragAcceptFiles
	//  在 MDI 应用程序中，这应在设置 m_pMainWnd 之后立即发生
	// 启用拖/放
	m_pMainWnd->DragAcceptFiles();
[!endif]
[!endif]
[!endif]
[!if TOOLBAR_EXTCHAR_TRANSLATE]

	// 允许扩展字符作为菜单快捷键
	CMFCToolBar::m_bExtCharTranslation = TRUE;
[!endif]
[!if DOCVIEW]

	// 分析标准 shell 命令、DDE、打开文件操作的命令行
	CCommandLineInfo cmdInfo;
	ParseCommandLine(cmdInfo);
[!endif]

[!if !MINI_SERVER]
[!if HAS_SUFFIX && !HTML_EDITVIEW]
	// 启用“DDE 执行”
	EnableShellOpen();
	RegisterShellFileTypes(TRUE);
[!endif]
[!endif]

[!if MINI_SERVER || FULL_SERVER || CONTAINER_SERVER || AUTOMATION]
	// 应用程序是用 /Embedding 或 /Automation 开关启动的。
	//使应用程序作为自动化服务器运行。
	if (cmdInfo.m_bRunEmbedded || cmdInfo.m_bRunAutomated)
	{
[!if !APP_TYPE_MDI && !APP_TYPE_MTLD]
		// 将所有的 OLE 服务器工厂注册为正在运行。  这将启用
		//  OLE 库以从其他应用程序中创建对象
		COleTemplateServer::RegisterAll();

[!endif]
		// 不显示主窗口
		return TRUE;
	}
	// 使用 /Unregserver 或 /Unregister 开关启动应用程序。  注销
	// 类型库。  其他注销操作在 ProcessShellCommand() 中发生。
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
	// 应用程序是以独立方式或用其他开关(如 /Register
	// 或 /Regserver)启动的。  更新注册表项，包括类型库。
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
	// 当袖珍服务器独立运行时，注册表将被更新，同时将指示
	//  用户使用容器中的“插入对象”对话框来使用此服务器。
	//  袖珍服务器没有独立的用户界面
	AfxMessageBox(IDP_USE_INSERT_OBJECT);
	return FALSE;
[!else]
[!if DOCVIEW]
	// 调度在命令行中指定的命令。  如果
	// 用 /RegServer、/Register、/Unregserver 或 /Unregister 启动应用程序，则返回 FALSE。
	if (!ProcessShellCommand(cmdInfo))
		return FALSE;
[!endif]
[!if APP_TYPE_MDI]
	// 主窗口已初始化，因此显示它并对其进行更新
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
	// 唯一的一个窗口已初始化，因此显示它并对其进行更新
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
	// 仅当具有后缀时才调用 DragAcceptFiles
	//  在 SDI 应用程序中，这应在 ProcessShellCommand 之后发生
	// 启用拖/放
	m_pMainWnd->DragAcceptFiles();
[!endif]
[!endif]
	return TRUE;
[!endif]
}

[!if CONTAINER || MINI_SERVER || FULL_SERVER || CONTAINER_SERVER || AUTOMATION || OLEDB || ACTIVEX_CONTROLS || ACCESSIBILITY || RIBBON_TOOLBAR || APP_TYPE_MDI || !DOCVIEW]
int [!output APP_CLASS]::ExitInstance()
{
	//TODO:  处理可能已添加的附加资源
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
// [!output APP_CLASS] 消息处理程序

[!if !DOCVIEW]
[!if APP_TYPE_MDI]
void [!output APP_CLASS]::OnFileNew() 
{
[!if APP_TYPE_SDI]
	CString strUntitled;
	CFrameWnd* pFrameWnd = DYNAMIC_DOWNCAST(CFrameWnd, m_pMainWnd);
	if (pFrameWnd != NULL)
	{
		//TODO:  关闭并销毁保存在内存中的任何特定于文件的数据。
		// 完成以后，执行以下 If 语句
		// 来重置框架窗口的标题
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
	// 创建新的 MDI 子窗口
	pFrame->CreateNewChild(
		RUNTIME_CLASS(CChildFrame), IDR_[!output SAFE_DOC_TYPE_NAME]TYPE, m_hMDIMenu, m_hMDIAccel);
[!if APP_TYPE_TABBED_MDI]
	pFrame->UnlockWindowUpdate();
[!endif]
[!endif]
}
[!endif]
[!endif]

// 用于应用程序“关于”菜单项的 CAboutDlg 对话框

class CAboutDlg : public CDialogEx
{
public:
	CAboutDlg();

// 对话框数据
	enum { IDD = IDD_ABOUTBOX };

protected:
	virtual void DoDataExchange(CDataExchange* pDX);    // DDX/DDV 支持

// 实现
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

// 用于运行对话框的应用程序命令
void [!output APP_CLASS]::OnAppAbout()
{
	CAboutDlg aboutDlg;
	aboutDlg.DoModal();
}
[!if MENUBAR_TOOLBAR || RIBBON_TOOLBAR]

// [!output APP_CLASS] 自定义加载/保存方法

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

// [!output APP_CLASS] 消息处理程序

[!if APP_TYPE_MTLD]
[!if DOCVIEW]
void [!output APP_CLASS]::OnFileNewFrame() 
{
	ASSERT(m_pDocTemplate != NULL);

	CDocument* pDoc = NULL;
	CFrameWnd* pFrame = NULL;

	// 创建由 m_pDocTemplate 成员引用的文档
	//的新实例。
	if (m_pDocTemplate != NULL)
		pDoc = m_pDocTemplate->CreateNewDocument();

	if (pDoc != NULL)
	{
		// 如果创建操作正常，则使用它来创建
		// 该文档的新框架。
		pFrame = m_pDocTemplate->CreateNewFrame(pDoc, NULL);
		if (pFrame != NULL)
		{
			// 设置标题并初始化该文档。
			// 如果文档初始化失败，则清理
			// 此框架窗口和文档。

			m_pDocTemplate->SetDefaultTitle(pDoc);
			if (!pDoc->OnNewDocument())
			{
				pFrame->DestroyWindow();
				pFrame = NULL;
			}
			else
			{
				// 否则，将更新此框架
				m_pDocTemplate->InitialUpdateFrame(pFrame, pDoc, TRUE);
			}
		}
	}

	// 如果失败，则清理该文档，并向
	// 用户显示消息。

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
		// 如果这是第一个文档，则以普通方式创建
		CWinApp::OnFileNew();
	}
	else
	{
		// 否则，确定是否需要保存修改，
		// 然后要求文档自身进行重新初始化。
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


