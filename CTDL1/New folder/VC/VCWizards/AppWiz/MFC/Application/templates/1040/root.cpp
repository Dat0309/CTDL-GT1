[!if RIBBON_TOOLBAR]
// Questo codice sorgente degli esempi di MFC illustra l'utilizzo dell'interfaccia utente Microsoft Office Fluent di MFC 
// e viene fornito esclusivamente come riferimento in supplemento 
// al materiale di riferimento e alla documentazione in formato elettronico MFC 
// forniti con il software della libreria MFC C++.  
// Le condizioni di licenza per la copia, l'utilizzo o la distribuzione dell'interfaccia utente Microsoft Office Fluent sono disponibili separatamente.  
// Per ulteriori informazioni sul programma di licenza dell'interfaccia utente Microsoft Office Fluent, visitare il sito 
// http://go.microsoft.com/fwlink/?LinkId=238214.
//
// Copyright (C) Microsoft Corporation
// Tutti i diritti riservati.
[!endif]

// [!output APP_IMPL] : definisce i comportamenti delle classi per l'applicazione.
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
	// Comandi di documenti basati su file standard
[!if !APP_TYPE_MTLD]
	ON_COMMAND(ID_FILE_NEW, &[!output APP_BASE_CLASS]::OnFileNew)
[!endif]
	ON_COMMAND(ID_FILE_OPEN, &[!output APP_BASE_CLASS]::OnFileOpen)
[!endif]
[!endif]
[!if PRINTING && DOCVIEW]
	// Comando di stampa standard
	ON_COMMAND(ID_FILE_PRINT_SETUP, &[!output APP_BASE_CLASS]::OnFilePrintSetup)
[!endif]
END_MESSAGE_MAP()


// costruzione di [!output APP_CLASS]

[!output APP_CLASS]::[!output APP_CLASS]()
{
[!if MENUBAR_TOOLBAR || ADV_DOCKING_EXPLORER || ADV_DOCKING_OUTPUT || ADV_DOCKING_PROPERTIES || ADV_DOCKING_NAVIGATION]
	m_bHiColorIcons = TRUE;

[!endif]
[!if RESTART_MGR_SUPPORT]
	// supporto Gestione riavvio
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
	// Se l'applicazione è compilata mediante il supporto CLR (/clr):
	//     1) Questa ipostazione è necessaria per il corretto funzionamento del supporto di Gestione riavvio.
	//     2) Nel progetto è necessario aggiungere un riferimento a System.Windows.Forms per eseguire la compilazione.
	System::Windows::Forms::Application::SetUnhandledExceptionMode(System::Windows::Forms::UnhandledExceptionMode::ThrowException);
#endif

[!endif]
	// TODO: sostituire la stringa dell'ID applicazione seguente con una stringa di ID univoca; il formato consigliato
	// per la stringa è NomeSocietà.NomeProdotto.Sottoprodotto.Versione
	SetAppID(_T("[!output PROJECT_NAME].AppID.NoVersion"));

	// TODO: inserire qui il codice di costruzione.
	// Inserire l'inizializzazione significativa in InitInstance.
}
[!if ATL_SUPPORT]

// oggetto modulo ATL
CComModule _Module;
[!endif]

// L'unico e solo oggetto [!output APP_CLASS]

[!output APP_CLASS] theApp;
[!if MINI_SERVER || FULL_SERVER || CONTAINER_SERVER || AUTOMATION]
// Questo identificatore è stato generato per essere statisticamente univoco per l'applicazione.
// È possibile modificarlo se si preferisce scegliere un identificatore specifico.

// {[!output APP_CLSID_REGISTRY_FORMAT]}
static const CLSID clsid =
[!output APP_CLSID_STATIC_CONST_GUID_FORMAT];
[!endif]

[!if AUTOMATION]
const GUID CDECL _tlid = [!output LIBID_STATIC_CONST_GUID_FORMAT];
const WORD _wVerMajor = 1;
const WORD _wVerMinor = 0;

[!endif]

// Inizializzazione di [!output APP_CLASS]

BOOL [!output APP_CLASS]::InitInstance()
{
[!if MANIFEST]
	// InitCommonControlsEx() è necessario in Windows XP se nel manifesto
	// di un'applicazione è specificato l'utilizzo di ComCtl32.dll versione 6 o successiva per abilitare
	// gli stili visuali.  In caso contrario, non sarà possibile creare finestre.
	INITCOMMONCONTROLSEX InitCtrls;
	InitCtrls.dwSize = sizeof(InitCtrls);
	// Effettuare questa impostazione in modo da includere tutte le classi di controlli comuni da utilizzare
	// nell'applicazione.
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
	// Inizializzare le librerie OLE.
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

	// AfxInitRichEdit2() è necessario per utilizzare il controllo RichEdit	
	// AfxInitRichEdit2();

	// Inizializzazione standard
	// Se non si utilizzano queste funzionalità e si desidera ridurre la dimensione
	// dell'eseguibile finale, è necessario rimuovere dal seguente codice
	// le specifiche routine di inizializzazione che non sono necessarie.
	// Modificare la chiave del Registro di sistema in cui sono memorizzate le impostazioni
	// TODO: è necessario modificare questa stringa in modo appropriato,
	// inserendo ad esempio il nome della società o dell'organizzazione.
	SetRegistryKey(_T("Applicazioni locali generate tramite la Creazione guidata applicazioni"));
[!if DOCVIEW]
	LoadStdProfileSettings([!output MRU_SIZE]);  // Caricare le opzioni del file INI standard (inclusa MRU).
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

	// Per creare la finestra principale, il codice crea un nuovo oggetto della  finestra cornice,
	// quindi lo imposta come oggetto della finestra principale dell'applicazione.
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
	// caricare il frame in un contesto vuoto.
	CCreateContext context;
[!else]
	// creare e caricare il frame con le relative risorse.
[!endif]
	pFrame->LoadFrame(IDR_MAINFRAME,
		WS_OVERLAPPEDWINDOW | FWS_ADDTOTITLE, NULL,
[!if DOCVIEW]
		&context);
[!else]
		NULL);
[!endif]
[!else]
	// creare finestra cornice MDI principale.
	if (!pFrame->LoadFrame(IDR_MAINFRAME))
		return FALSE;
	// provare a caricare la tabella dei tasti di scelta rapida e i menu MDI condivisi.
	//TODO: aggiungere altre variabili dei membri e chiamate locali per
	//	altri tipi di menu che potrebbero essere necessari all'applicazione.
	HINSTANCE hInst = AfxGetResourceHandle();
	m_hMDIMenu  = ::LoadMenu(hInst, MAKEINTRESOURCE(IDR_[!output SAFE_DOC_TYPE_NAME]TYPE));
	m_hMDIAccel = ::LoadAccelerators(hInst, MAKEINTRESOURCE(IDR_[!output SAFE_DOC_TYPE_NAME]TYPE));
[!endif]
[!else]

	// Registrare i modelli di documenti dell'applicazione.  I modelli di documenti
	//  funzionano da connessione tra documenti, finestre cornice e viste.
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
		RUNTIME_CLASS([!output CHILD_FRAME_CLASS]), // frame MDI figlio personalizzato
[!else]
		RUNTIME_CLASS([!output MAIN_FRAME_CLASS]),       // finestra cornice SDI principale
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
	// Connettere COleTemplateServer al modello del documento.
	//  COleTemplateServer crea nuovi documenti per conto
	//  dei contenitori OLE richiedenti utilizzando informazioni
	//  specificate nel modello del documento.
[!if APP_TYPE_MDI || APP_TYPE_MTLD]
	m_server.ConnectTemplate(clsid, pDocTemplate, FALSE);
	// Registrare tutti i server factory OLE come se fossero in esecuzione.  Questo consente alle
	//  librerie OLE di creare oggetti da altre applicazioni
	COleTemplateServer::RegisterAll();
		// Nota: le applicazioni MDI registrano tutti gli oggetti server senza tener conto dell'opzione 
		//  /Embedding o /Automation nella riga di comando
[!else]
	m_server.ConnectTemplate(clsid, pDocTemplate, TRUE);
		// Nota: le applicazioni SDI registrano gli oggetti server solo se l'opzione /Embedding
		//   o /Automation è presente nella riga di comando.
[!endif]
[!endif]
[!endif]

[!if APP_TYPE_MDI && DOCVIEW]
	// creare finestra cornice MDI principale.
	[!output MAIN_FRAME_CLASS]* pMainFrame = new [!output MAIN_FRAME_CLASS];
	if (!pMainFrame || !pMainFrame->LoadFrame(IDR_MAINFRAME))
	{
		delete pMainFrame;
		return FALSE;
	}
	m_pMainWnd = pMainFrame;

[!if !MINI_SERVER]
[!if HAS_SUFFIX && !HTML_EDITVIEW]
	// richiamare DragAcceptFiles solo se è presente un suffisso.
	//  In un'applicazione MDI questo deve verificarsi immediatamente dopo l'impostazione di m_pMainWnd.
	// Abilitare il trascinamento della selezione.
	m_pMainWnd->DragAcceptFiles();
[!endif]
[!endif]
[!endif]
[!if TOOLBAR_EXTCHAR_TRANSLATE]

	// Consenti caratteri estesi come tasti di scelta rapida dei menu
	CMFCToolBar::m_bExtCharTranslation = TRUE;
[!endif]
[!if DOCVIEW]

	// Analizzare la riga di comando per i comandi shell standard, DDE, apri file
	CCommandLineInfo cmdInfo;
	ParseCommandLine(cmdInfo);
[!endif]

[!if !MINI_SERVER]
[!if HAS_SUFFIX && !HTML_EDITVIEW]
	// Abilitare apertura esecuzione DDE.
	EnableShellOpen();
	RegisterShellFileTypes(TRUE);
[!endif]
[!endif]

[!if MINI_SERVER || FULL_SERVER || CONTAINER_SERVER || AUTOMATION]
	// L'applicazione è stata avviata con l'opzione /Embedding o /Automation.
	// Eseguire l'applicazione come server di automazione.
	if (cmdInfo.m_bRunEmbedded || cmdInfo.m_bRunAutomated)
	{
[!if !APP_TYPE_MDI && !APP_TYPE_MTLD]
		// Registrare tutti i server OLE come in esecuzione.  Ciò consente alle
		//  librerie OLE di creare oggetti da altre applicazioni
		COleTemplateServer::RegisterAll();

[!endif]
		// Non visualizzare la finestra principale
		return TRUE;
	}
	// L'applicazione è stata avviata con l'opzione /Unregserver o /Unregister.  Annulla la registrazione della
	// libreria dei tipi.  Un altro annullamento della registrazione si verifica in ProcessShellCommand().
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
	// L'applicazione è stata avviata in modalità autonoma o con altre opzioni (ad esempio /Register
	// o /Regserver).  Aggiornare le voci del Registro di sistema, inclusa la libreria dei tipi.
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
	// Quando un server ridotto viene eseguito in modalità autonoma il Registro di sistema viene aggiornato e 
	//  all'utente viene chiesto di utilizzare il server tramite la finestra di dialogo Inserisci oggetto di un contenitore.
	//  I server ridotti non dispongono di interfacce utente autonome.
	AfxMessageBox(IDP_USE_INSERT_OBJECT);
	return FALSE;
[!else]
[!if DOCVIEW]
	// Invia i comandi specificati nella riga di comando.  Restituisce FALSE se
	// l'applicazione è stata avviata con l'opzione /RegServer, /Register, /Unregserver o /Unregister.
	if (!ProcessShellCommand(cmdInfo))
		return FALSE;
[!endif]
[!if APP_TYPE_MDI]
	// La finestra principale è stata inizializzata, quindi è possibile visualizzarla e aggiornarla.
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
	// L'unica e sola finestra è stata inizializzata, quindi è possibile visualizzarla e aggiornarla.
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
	// richiamare DragAcceptFiles solo se è presente un suffisso.
	//  In un'applicazione SDI questo deve verificarsi dopo ProcessShellCommand.
	// Abilitare il trascinamento della selezione.
	m_pMainWnd->DragAcceptFiles();
[!endif]
[!endif]
	return TRUE;
[!endif]
}

[!if CONTAINER || MINI_SERVER || FULL_SERVER || CONTAINER_SERVER || AUTOMATION || OLEDB || ACTIVEX_CONTROLS || ACCESSIBILITY || RIBBON_TOOLBAR || APP_TYPE_MDI || !DOCVIEW]
int [!output APP_CLASS]::ExitInstance()
{
	//TODO: gestire le altre risorse eventualmente aggiunte.
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
// gestori dei messaggi di [!output APP_CLASS]

[!if !DOCVIEW]
[!if APP_TYPE_MDI]
void [!output APP_CLASS]::OnFileNew() 
{
[!if APP_TYPE_SDI]
	CString strUntitled;
	CFrameWnd* pFrameWnd = DYNAMIC_DOWNCAST(CFrameWnd, m_pMainWnd);
	if (pFrameWnd != NULL)
	{
		//TODO: chiudere ed eliminare tutti i dati specifici del file che si trovano in
		// memoria. Al termine, eseguire la seguente istruzione if
		// per reimpostare il titolo della finestra cornice.
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
	// creare una nuova finestra MDI figlio.
	pFrame->CreateNewChild(
		RUNTIME_CLASS(CChildFrame), IDR_[!output SAFE_DOC_TYPE_NAME]TYPE, m_hMDIMenu, m_hMDIAccel);
[!if APP_TYPE_TABBED_MDI]
	pFrame->UnlockWindowUpdate();
[!endif]
[!endif]
}
[!endif]
[!endif]

// finestra di dialogo CAboutDlg utilizzata per visualizzare le informazioni sull'applicazione.

class CAboutDlg : public CDialogEx
{
public:
	CAboutDlg();

// Dati della finestra di dialogo
	enum { IDD = IDD_ABOUTBOX };

protected:
	virtual void DoDataExchange(CDataExchange* pDX);    // supporto DDX/DDV

// Implementazione
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

// comando dell'applicazione per eseguire la finestra di dialogo
void [!output APP_CLASS]::OnAppAbout()
{
	CAboutDlg aboutDlg;
	aboutDlg.DoModal();
}
[!if MENUBAR_TOOLBAR || RIBBON_TOOLBAR]

// Metodi di caricamento/salvataggio personalizzazione di [!output APP_CLASS]

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

// gestori dei messaggi di [!output APP_CLASS]

[!if APP_TYPE_MTLD]
[!if DOCVIEW]
void [!output APP_CLASS]::OnFileNewFrame() 
{
	ASSERT(m_pDocTemplate != NULL);

	CDocument* pDoc = NULL;
	CFrameWnd* pFrame = NULL;

	// creare una nuova istanza del documento a cui fa riferimento
	// il membro m_pDocTemplate.
	if (m_pDocTemplate != NULL)
		pDoc = m_pDocTemplate->CreateNewDocument();

	if (pDoc != NULL)
	{
		// Se la creazione è stata eseguita correttamente, utilizzare il comando di creazione dei frame
		// per tale documento.
		pFrame = m_pDocTemplate->CreateNewFrame(pDoc, NULL);
		if (pFrame != NULL)
		{
			// Impostare il titolo e inizializzare il documento.
			// Se l'inizializzazione del documento non viene eseguita, ripulire
			// la finestra cornice e il documento.

			m_pDocTemplate->SetDefaultTitle(pDoc);
			if (!pDoc->OnNewDocument())
			{
				pFrame->DestroyWindow();
				pFrame = NULL;
			}
			else
			{
				// Altrimenti, aggiornare il frame.
				m_pDocTemplate->InitialUpdateFrame(pFrame, pDoc, TRUE);
			}
		}
	}

	// Se l'operazione ha esito negativo, pulire il documento e mostrare un
	// messaggio all'utente.

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
		// se è il primo documento, crearlo come documento normale.
		CWinApp::OnFileNew();
	}
	else
	{
		// Altrimenti, verificare se è necessario salvare le modifiche, quindi 
		// chiedere la reinizializzazione del documento.
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


