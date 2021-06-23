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
#include "[!output APP_HEADER]"
#include "[!output DIALOG_HEADER]"

#ifdef _DEBUG
#define new DEBUG_NEW
#endif


// [!output APP_CLASS]

BEGIN_MESSAGE_MAP([!output APP_CLASS], [!output APP_BASE_CLASS])
	ON_COMMAND(ID_HELP, &CWinApp::OnHelp)
END_MESSAGE_MAP()


// costruzione di [!output APP_CLASS]

[!output APP_CLASS]::[!output APP_CLASS]()
{
[!if RESTART_MGR_SUPPORT]
	// supporto Gestione riavvio
	m_dwRestartManagerSupportFlags = AFX_RESTART_MANAGER_SUPPORT_RESTART;

[!endif]
	// TODO: inserire qui il codice di costruzione.
	// Inserire l'inizializzazione significativa in InitInstance.
}


// L'unico e solo oggetto [!output APP_CLASS]

[!output APP_CLASS] theApp;

[!if AUTOMATION]
const GUID CDECL BASED_CODE _tlid =
		[!output LIBID_STATIC_CONST_GUID_FORMAT];
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

[!if SOCKETS]
	if (!AfxSocketInit())
	{
		AfxMessageBox(IDP_SOCKETS_INIT_FAILED);
		return FALSE;
	}

[!endif]

[!if AUTOMATION || ACCESSIBILITY]
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
[!if !NO_MFC_CONTROLS]
	// Creare il gestore della shell se la finestra di dialogo contiene
	// controlli della visualizzazione elenco o struttura ad albero della shell.
	CShellManager *pShellManager = new CShellManager;

	// Attiva gestore visualizzazione "Windows nativo" per abilitare i temi nei controlli MFC
	CMFCVisualManager::SetDefaultManager(RUNTIME_CLASS(CMFCVisualManagerWindows));
[!endif]

	// Inizializzazione standard
	// Se non si utilizzano queste funzionalità e si desidera ridurre la dimensione
	// dell'eseguibile finale, è necessario rimuovere dal seguente codice
	// le specifiche routine di inizializzazione che non sono necessarie.
	// Modificare la chiave del Registro di sistema in cui sono memorizzate le impostazioni
	// TODO: è necessario modificare questa stringa in modo appropriato,
	// inserendo ad esempio il nome della società o dell'organizzazione.
	SetRegistryKey(_T("Applicazioni locali generate tramite la Creazione guidata applicazioni"));
[!if AUTOMATION]
	// Analizzare la riga di comando per le opzioni di automazione o di registrazione e annullamento della registrazione.
	CCommandLineInfo cmdInfo;
	ParseCommandLine(cmdInfo);

	// L'applicazione è stata avviata con l'opzione /Embedding o /Automation.
	// Eseguire l'applicazione come server di automazione.
	if (cmdInfo.m_bRunEmbedded || cmdInfo.m_bRunAutomated)
	{
		// Registrare class factory tramite CoRegisterClassObject().
		COleTemplateServer::RegisterAll();
	}
	// L'applicazione è stata avviata con l'opzione /Unregserver o /Unregister.  Rimuovere
	// le voci dal Registro di sistema.
	else if (cmdInfo.m_nShellCommand == CCommandLineInfo::AppUnregister)
	{
		COleObjectFactory::UpdateRegistryAll(FALSE);
		AfxOleUnregisterTypeLib(_tlid, _wVerMajor, _wVerMinor);
		return FALSE;
	}
	// L'applicazione è stata avviata in modalità autonoma o con altre opzioni (ad esempio /Register
	// o /Regserver).  Aggiornare le voci del Registro di sistema, inclusa la libreria dei tipi.
	else
	{
		COleObjectFactory::UpdateRegistryAll();
		AfxOleRegisterTypeLib(AfxGetInstanceHandle(), _tlid);
		if (cmdInfo.m_nShellCommand == CCommandLineInfo::AppRegister)
			return FALSE;
	}
[!endif]

	[!output DIALOG_CLASS] dlg;
	m_pMainWnd = &dlg;
	INT_PTR nResponse = dlg.DoModal();
	if (nResponse == IDOK)
	{
		// TODO: inserire qui il codice per gestire la chiusura della finestra di dialogo 
		//  tramite il pulsante OK.
	}
	else if (nResponse == IDCANCEL)
	{
		// TODO: inserire qui il codice per gestire la chiusura della finestra di dialogo 
		//  tramite il pulsante Annulla.
	}
	else if (nResponse == -1)
	{
		TRACE(traceAppMsg, 0, "Avviso: creazione della finestra di dialogo non riuscita. L'applicazione verrà terminata in modo imprevisto.\n");
[!if !NO_MFC_CONTROLS]
		TRACE(traceAppMsg, 0, "Avviso: se si utilizzano i controlli MFC nella finestra di dialogo, non è possibile utilizzare #define _AFX_NO_MFC_CONTROLS_IN_DIALOGS.\n");
[!endif]
	}

[!if !NO_MFC_CONTROLS]
	// Eliminare il gestore della shell creato in precedenza.
	if (pShellManager != NULL)
	{
		delete pShellManager;
	}
[!endif]

	// Poiché la finestra di dialogo è stata chiusa, restituisce FALSE in modo che l'applicazione
	//  venga terminata, anziché avviare il message pump dell'applicazione.
	return FALSE;
}

[!if AUTOMATION || ACCESSIBILITY]
int [!output APP_CLASS]::ExitInstance()
{
	AfxOleTerm(FALSE);

	return [!output APP_BASE_CLASS]::ExitInstance();
}
[!endif]
