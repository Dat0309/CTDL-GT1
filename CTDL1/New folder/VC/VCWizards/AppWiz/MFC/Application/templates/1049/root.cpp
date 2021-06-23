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

// [!output APP_IMPL] : Определяет поведение классов для приложения.
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
	// Стандартные команды по работе с файлами документов
[!if !APP_TYPE_MTLD]
	ON_COMMAND(ID_FILE_NEW, &[!output APP_BASE_CLASS]::OnFileNew)
[!endif]
	ON_COMMAND(ID_FILE_OPEN, &[!output APP_BASE_CLASS]::OnFileOpen)
[!endif]
[!endif]
[!if PRINTING && DOCVIEW]
	// Стандартная команда настройки печати
	ON_COMMAND(ID_FILE_PRINT_SETUP, &[!output APP_BASE_CLASS]::OnFilePrintSetup)
[!endif]
END_MESSAGE_MAP()


// создание [!output APP_CLASS]

[!output APP_CLASS]::[!output APP_CLASS]()
{
[!if MENUBAR_TOOLBAR || ADV_DOCKING_EXPLORER || ADV_DOCKING_OUTPUT || ADV_DOCKING_PROPERTIES || ADV_DOCKING_NAVIGATION]
	m_bHiColorIcons = TRUE;

[!endif]
[!if RESTART_MGR_SUPPORT]
	// поддержка диспетчера перезагрузки
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
	// Если приложение построено с поддержкой среды Common Language Runtime (/clr):
	//     1) Этот дополнительный параметр требуется для правильной поддержки работы диспетчера перезагрузки.
	//   2) В своем проекте для сборки необходимо добавить ссылку на System.Windows.Forms.
	System::Windows::Forms::Application::SetUnhandledExceptionMode(System::Windows::Forms::UnhandledExceptionMode::ThrowException);
#endif

[!endif]
	// TODO: замените ниже строку идентификатора приложения строкой уникального идентификатора; рекомендуемый
	// формат для строки: ИмяКомпании.ИмяПродукта.СубПродукт.СведенияОВерсии
	SetAppID(_T("[!output PROJECT_NAME].AppID.NoVersion"));

	// TODO: добавьте код создания,
	// Размещает весь важный код инициализации в InitInstance
}
[!if ATL_SUPPORT]

// Объект модуля ATL
CComModule _Module;
[!endif]

// Единственный объект [!output APP_CLASS]

[!output APP_CLASS] theApp;
[!if MINI_SERVER || FULL_SERVER || CONTAINER_SERVER || AUTOMATION]
// Этот идентификатор создан уникальным для вашего приложения
// Его можно изменить, если вы предпочитаете использовать какой-то определенный идентификатор

// {[!output APP_CLSID_REGISTRY_FORMAT]}
static const CLSID clsid =
[!output APP_CLSID_STATIC_CONST_GUID_FORMAT];
[!endif]

[!if AUTOMATION]
const GUID CDECL _tlid = [!output LIBID_STATIC_CONST_GUID_FORMAT];
const WORD _wVerMajor = 1;
const WORD _wVerMinor = 0;

[!endif]

// инициализация [!output APP_CLASS]

BOOL [!output APP_CLASS]::InitInstance()
{
[!if MANIFEST]
	// InitCommonControlsEx() требуются для Windows XP, если манифест
	// приложения использует ComCtl32.dll версии 6 или более поздней версии для включения
	// стилей отображения.  В противном случае будет возникать сбой при создании любого окна.
	INITCOMMONCONTROLSEX InitCtrls;
	InitCtrls.dwSize = sizeof(InitCtrls);
	// Выберите этот параметр для включения всех общих классов управления, которые необходимо использовать
	// в вашем приложении.
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
	// Инициализация библиотек OLE
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

	// Для использования элемента управления RichEdit требуется метод AfxInitRichEdit2()	
	// AfxInitRichEdit2();

	// Стандартная инициализация
	// Если эти возможности не используются и необходимо уменьшить размер
	// конечного исполняемого файла, необходимо удалить из следующего
	// конкретные процедуры инициализации, которые не требуются
	// Измените раздел реестра, в котором хранятся параметры
	// TODO: следует изменить эту строку на что-нибудь подходящее,
	// например на название организации
	SetRegistryKey(_T("Локальные приложения, созданные с помощью мастера приложений"));
[!if DOCVIEW]
	LoadStdProfileSettings([!output MRU_SIZE]);  // Загрузите стандартные параметры INI-файла (включая MRU)
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

	// Чтобы создать главное окно, этот код создает новый объект окна
	// рамки, а затем задает его как объект основного окна приложения
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
	// загрузите рамку в пустой контекст
	CCreateContext context;
[!else]
	// создайте и загрузите рамку с его ресурсами
[!endif]
	pFrame->LoadFrame(IDR_MAINFRAME,
		WS_OVERLAPPEDWINDOW | FWS_ADDTOTITLE, NULL,
[!if DOCVIEW]
		&context);
[!else]
		NULL);
[!endif]
[!else]
	// создайте главное окно рамки MDI
	if (!pFrame->LoadFrame(IDR_MAINFRAME))
		return FALSE;
	// попробуйте загрузить общее меню MDI и таблицу сочетаний клавиш
	//TODO: добавьте дополнительные переменные пользователей и загрузите вызовы для
	//	дополнительных типов меню, которые могут потребоваться в вашем приложении
	HINSTANCE hInst = AfxGetResourceHandle();
	m_hMDIMenu  = ::LoadMenu(hInst, MAKEINTRESOURCE(IDR_[!output SAFE_DOC_TYPE_NAME]TYPE));
	m_hMDIAccel = ::LoadAccelerators(hInst, MAKEINTRESOURCE(IDR_[!output SAFE_DOC_TYPE_NAME]TYPE));
[!endif]
[!else]

	// Зарегистрируйте шаблоны документов приложения.  Шаблоны документов
	//  выступают в роли посредника между документами, окнами рамок и представлениями
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
		RUNTIME_CLASS([!output CHILD_FRAME_CLASS]), // настраиваемая дочерняя рамка MDI
[!else]
		RUNTIME_CLASS([!output MAIN_FRAME_CLASS]),       // основное окно рамки SDI
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
	// Подключите COleTemplateServer к шаблону документа
	//  COleTemplateServer создает новые документы от имени
	//  контейнеров OLE, выполняющих запрос с помощью информации,
	//  указанной в шаблоне документа
[!if APP_TYPE_MDI || APP_TYPE_MTLD]
	m_server.ConnectTemplate(clsid, pDocTemplate, FALSE);
	// Зарегистрируйте все фабрики сервера OLE как работающие.  Это позволит
	//  библиотекам OLE создавать объекты из других приложений
	COleTemplateServer::RegisterAll();
		// Примечание. Приложения MDI регистрируют все объекты сервера вне зависимости от наличия параметра
		//  /Embedding или /Automation в командной строке
[!else]
	m_server.ConnectTemplate(clsid, pDocTemplate, TRUE);
		// Примечание. Приложения SDI регистрируют объекты сервера только в случае наличия параметра /Embedding
		//   или /Automation в командной строке
[!endif]
[!endif]
[!endif]

[!if APP_TYPE_MDI && DOCVIEW]
	// создайте главное окно рамки MDI
	[!output MAIN_FRAME_CLASS]* pMainFrame = new [!output MAIN_FRAME_CLASS];
	if (!pMainFrame || !pMainFrame->LoadFrame(IDR_MAINFRAME))
	{
		delete pMainFrame;
		return FALSE;
	}
	m_pMainWnd = pMainFrame;

[!if !MINI_SERVER]
[!if HAS_SUFFIX && !HTML_EDITVIEW]
	// вызов DragAcceptFiles только при наличии суффикса
	//  В приложении MDI это должно произойти сразу после задания m_pMainWnd
	// Включить открытие перетаскивания
	m_pMainWnd->DragAcceptFiles();
[!endif]
[!endif]
[!endif]
[!if TOOLBAR_EXTCHAR_TRANSLATE]

	// Разрешить использование расширенных символов в горячих клавишах меню
	CMFCToolBar::m_bExtCharTranslation = TRUE;
[!endif]
[!if DOCVIEW]

	// Синтаксический разбор командной строки на стандартные команды оболочки, DDE, открытие файлов
	CCommandLineInfo cmdInfo;
	ParseCommandLine(cmdInfo);
[!endif]

[!if !MINI_SERVER]
[!if HAS_SUFFIX && !HTML_EDITVIEW]
	// Включить открытие выполнения DDE
	EnableShellOpen();
	RegisterShellFileTypes(TRUE);
[!endif]
[!endif]

[!if MINI_SERVER || FULL_SERVER || CONTAINER_SERVER || AUTOMATION]
	// Приложение было запущено с параметром /Embedding или /Automation.
	// Запуск приложения как сервера автоматизации.
	if (cmdInfo.m_bRunEmbedded || cmdInfo.m_bRunAutomated)
	{
[!if !APP_TYPE_MDI && !APP_TYPE_MTLD]
		// Зарегистрируйте все фабрики сервера OLE как работающие.  Это позволит
		//  библиотекам OLE создавать объекты из других приложений
		COleTemplateServer::RegisterAll();

[!endif]
		// Не показывать главное окно
		return TRUE;
	}
	// Приложение было запущено с параметром /Register или /Unregister.  Отключите
	// библиотеку типов.  Иначе произойдет отмена регистрации в ProcessShellCommand().
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
	// Приложение было запущено отдельно или с другими параметрами (например, /Register
	// или /Regserver).  Обновите записи реестра, включая библиотеку типов.
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
	// При запуске изолированного мини-сервера обновляется реестр и
	//  пользователю выдаются инструкции по работе с диалоговым окном "Вставка объекта" в контейнер
	//  для использования сервера.  Мини-серверы не имеют изолированных пользовательских интерфейсов
	AfxMessageBox(IDP_USE_INSERT_OBJECT);
	return FALSE;
[!else]
[!if DOCVIEW]
	// Команды диспетчеризации, указанные в командной строке.  Значение FALSE будет возвращено, если
	// приложение было запущено с параметром /RegServer, /Register, /Unregserver или /Unregister.
	if (!ProcessShellCommand(cmdInfo))
		return FALSE;
[!endif]
[!if APP_TYPE_MDI]
	// Главное окно было инициализировано, поэтому отобразите и обновите его
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
	// Одно и только одно окно было инициализировано, поэтому отобразите и обновите его
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
	// вызов DragAcceptFiles только при наличии суффикса
	//  В приложении SDI это должно произойти после ProcessShellCommand
	// Включить открытие перетаскивания
	m_pMainWnd->DragAcceptFiles();
[!endif]
[!endif]
	return TRUE;
[!endif]
}

[!if CONTAINER || MINI_SERVER || FULL_SERVER || CONTAINER_SERVER || AUTOMATION || OLEDB || ACTIVEX_CONTROLS || ACCESSIBILITY || RIBBON_TOOLBAR || APP_TYPE_MDI || !DOCVIEW]
int [!output APP_CLASS]::ExitInstance()
{
	//TODO: обработайте дополнительные ресурсы, которые могли быть добавлены
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
// обработчики сообщений [!output APP_CLASS]

[!if !DOCVIEW]
[!if APP_TYPE_MDI]
void [!output APP_CLASS]::OnFileNew() 
{
[!if APP_TYPE_SDI]
	CString strUntitled;
	CFrameWnd* pFrameWnd = DYNAMIC_DOWNCAST(CFrameWnd, m_pMainWnd);
	if (pFrameWnd != NULL)
	{
		//TODO: закройте и удалите любые данные о файлах, имеющиеся
		// в памяти. После этого выполните следующую инструкцию
		// для сброса заголовка окна рамки
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
	// создайте новое дочернее окно MDI
	pFrame->CreateNewChild(
		RUNTIME_CLASS(CChildFrame), IDR_[!output SAFE_DOC_TYPE_NAME]TYPE, m_hMDIMenu, m_hMDIAccel);
[!if APP_TYPE_TABBED_MDI]
	pFrame->UnlockWindowUpdate();
[!endif]
[!endif]
}
[!endif]
[!endif]

// Диалоговое окно CAboutDlg используется для описания сведений о приложении

class CAboutDlg : public CDialogEx
{
public:
	CAboutDlg();

// Данные диалогового окна
	enum { IDD = IDD_ABOUTBOX };

protected:
	virtual void DoDataExchange(CDataExchange* pDX);    // поддержка DDX/DDV

// Реализация
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

// Команда приложения для запуска диалога
void [!output APP_CLASS]::OnAppAbout()
{
	CAboutDlg aboutDlg;
	aboutDlg.DoModal();
}
[!if MENUBAR_TOOLBAR || RIBBON_TOOLBAR]

// [!output APP_CLASS] настройка методов загрузки и сохранения

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

// обработчики сообщений [!output APP_CLASS]

[!if APP_TYPE_MTLD]
[!if DOCVIEW]
void [!output APP_CLASS]::OnFileNewFrame() 
{
	ASSERT(m_pDocTemplate != NULL);

	CDocument* pDoc = NULL;
	CFrameWnd* pFrame = NULL;

	// Создайте новый экземпляр документа, на который ссылается
	// член m_pDocTemplate.
	if (m_pDocTemplate != NULL)
		pDoc = m_pDocTemplate->CreateNewDocument();

	if (pDoc != NULL)
	{
		// если процедура создания работает, используйте ее для создания новой рамки
		// этого документа.
		pFrame = m_pDocTemplate->CreateNewFrame(pDoc, NULL);
		if (pFrame != NULL)
		{
			// Укажите заголовок и инициализируйте документ.
			// Если при инициализации документа произойдет сбой, очистите
			// окно рамки и документа.

			m_pDocTemplate->SetDefaultTitle(pDoc);
			if (!pDoc->OnNewDocument())
			{
				pFrame->DestroyWindow();
				pFrame = NULL;
			}
			else
			{
				// В противном случае обновите рамку
				m_pDocTemplate->InitialUpdateFrame(pFrame, pDoc, TRUE);
			}
		}
	}

	// В случае сбоя очистите документ и выведите
	// пользователю сообщение.

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
		// если это первый документ, создайте его как обычный
		CWinApp::OnFileNew();
	}
	else
	{
		// В противном случае проверьте, необходимо ли сохранить изменения, а затем
		// обратитесь к документу за его повторной инициализацией.
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


