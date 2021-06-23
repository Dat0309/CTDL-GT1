================================================================================
    LIBRERIA MFC: cenni preliminari sul progetto [!output PROJECT_NAME]
===============================================================================

La Creazione guidata applicazione ha creato questa applicazione [!output PROJECT_NAME]. Tale applicazione illustra le nozioni fondamentali sull'utilizzo delle classi MFC (Microsoft Foundation Class) e costituisce un punto di partenza per la scrittura dell'applicazione.

Questo file contiene un riepilogo del contenuto di ciascun file che fa parte
dell'applicazione [!output PROJECT_NAME].

[!output PROJECT_NAME].vcxproj
    File di progetto principale per i progetti VC++ generati tramite una Creazione guidata applicazione. Contiene informazioni sulla versione di Visual C++ che ha generato il file e informazioni sulle piattaforme, le configurazioni e le caratteristiche del progetto selezionate con la Creazione guidata applicazione.

[!output PROJECT_NAME].vcxproj.filters
    File dei filtri per i progetti VC++ generati tramite una Creazione guidata applicazione. Contiene informazioni sull'associazione tra i file del progetto e i filtri. Tale associazione viene utilizzata nell'IDE per la visualizzazione di raggruppamenti di file con estensioni simili in un nodo specifico, ad esempio: i file con estensione cpp sono associati al filtro "File di origine".

[!output APP_HEADER]
    File di intestazione principale per l'applicazione.
    Include altre intestazioni specifiche del progetto, ad esempio resource.h, e dichiara la classe di applicazione [!output APP_CLASS].

[!output APP_IMPL]
    File di origine principale dell'applicazione contenente la classe di applicazione [!output APP_CLASS].

[!output RC_FILE_NAME]
    Elenco di tutte le risorse Microsoft Windows utilizzate dal programma. Include le icone, le bitmap e i cursori memorizzati nella sottodirectory RES. Questo file può essere modificato direttamente in Microsoft Visual C++. Le risorse del progetto sono in [!output LCID].

res\[!output PROJECT_NAME].ico
    File di icona utilizzato come icona dell'applicazione. Tale icona è inclusa dal file di risorse principale [!output PROJECT_NAME].rc.

res\[!output RC2_FILE_NAME].rc2
    File contenente le risorse che non vengono modificate da Microsoft Visual C++. Inserire in questo file tutte le risorse non modificabili dall'editor di risorse.
[!if CONTAINER_SERVER || FULL_SERVER || MINI_SERVER || AUTOMATION || HAS_SUFFIX]
[!if !HTML_EDITVIEW]

[!output PROJECT_NAME].reg
    Esempio di file reg che mostra il tipo di impostazioni di registrazione che verranno impostate dal framework. È possibile utilizzarlo come file reg
[!if APP_TYPE_DLG]
    insieme all'applicazione.
[!else]
    insieme all'applicazione oppure eliminarlo e utilizzare la registrazione predefinita RegisterShellFileTypes.
[!endif]

[!if AUTOMATION]
[!output SAFE_IDL_NAME].idl
    File contenente il codice sorgente IDL (Interface Description Language) per la libreria dei tipi dell'applicazione.
[!endif]
[!endif]
[!endif]

[!if !APP_TYPE_DLG]
/////////////////////////////////////////////////////////////////////////////

Per la finestra cornice principale:
[!if PROJECT_STYLE_EXPLORER]
    Stile Windows Explorer: il progetto includerà un'interfaccia simile a quella di Windows Explorer, con due frame.
[!else]
    Il progetto include un'interfaccia MFC standard.
[!endif]

[!output MAIN_FRAME_HEADER], [!output MAIN_FRAME_IMPL]
    Tali file contengono la classe di frame [!output MAIN_FRAME_CLASS], che è derivata da
[!if APP_TYPE_MDI || APP_TYPE_TABBED_MDI]
[!if APP_TYPE_MDI]
    CMDIFrameWnd e controlla tutte le funzionalità di frame MDI.
[!else]
    CMDITabbedFrameWnd e controlla tutte le funzionalità di frame MDI.
[!endif]
[!else]
    CFrameWnd e controlla tutte le funzionalità di frame SDI.
[!endif]
[!if PROJECT_STYLE_EXPLORER]

[!output TREE_VIEW_HEADER], [!output TREE_VIEW_IMPL]
    Tali file contengono la classe di frame sinistra [!output TREE_VIEW_CLASS], che è derivata da CTreeView.
[!endif]

[!if DOCKING_TOOLBAR || TOOLBAR_STYLE_REBAR || MENUBAR_TOOLBAR || RIBBON_TOOLBAR]
res\Toolbar.bmp
    Questo file di bitmap viene utilizzato per creare immagini affiancate per la barra degli strumenti.
    La barra di stato e la barra degli strumenti iniziali vengono costruite nella classe [!output MAIN_FRAME_CLASS]. Modificare questa bitmap della barra degli strumenti utilizzando l'editor delle risorse e aggiornare l'array IDR_MAINFRAME TOOLBAR in [!output PROJECT_NAME].rc per aggiungere i pulsanti della barra degli strumenti.
[!if MINI_SERVER || FULL_SERVER || CONTAINER_SERVER]

res\IToolbar.bmp
    Questo file di bitmap viene utilizzato per creare immagini affiancate per la barra degli strumenti quando l'applicazione server è attivata sul posto all'interno di un altro contenitore. Questa barra degli strumenti viene costruita nella classe [!output INPLACE_FRAME_CLASS]. Questa bitmap è simile alla bitmap in res\Toolbar.bmp ma molti comandi non server sono stati rimossi.

[!endif]
[!endif]
[!if APP_TYPE_MDI || APP_TYPE_TABBED_MDI]
/////////////////////////////////////////////////////////////////////////////

Per la finestra cornice figlio:

ChildFrm.h, ChildFrm.cpp
    Questi file definiscono e implementano la classe [!output CHILD_FRAME_CLASS] che supporta le finestre figlio in un 'applicazione MDI.

[!endif]
/////////////////////////////////////////////////////////////////////////////

[!if DOCVIEW]
[!if !DB_VIEW_NO_FILE]
La Creazione guidata applicazione crea un tipo di documento e una visualizzazione:

[!output DOC_HEADER], [!output DOC_IMPL] - il documento
    Questi file contengono la classe [!output DOC_CLASS]. Modificare questi file per aggiungere dati speciali del documento e implementare il salvataggio e il caricamento di file (tramite [!output DOC_CLASS]::Serialize).
[!if HAS_SUFFIX && !HTML_EDITVIEW]
    Nel documento saranno contenute le seguenti stringhe:
        Estensione file:      [!output FILE_EXTENSION]
        ID tipo file:        [!output FILE_TYPE_ID]
        Didascalia del frame principale:  [!output MAIN_FRAME_CAPTION]
        Nome tipo doc:       [!output DOC_TYPE_NAME]
        Nome filtro:         [!output FILTER_NAME]
        Nuovo nome file breve: [!output FILE_NEW_NAME_SHORT]
        Nome tipo file lungo: [!output FILE_NEW_NAME_LONG]
[!endif]
[!else]
La Creazione guidata applicazione crea una visualizzazione:
[!endif]

[!output VIEW_HEADER], [!output VIEW_IMPL] - la visualizzazione del documento
    Questi file contengono la classe [!output VIEW_CLASS].
[!if !DB_VIEW_NO_FILE]
    Gli oggetti [!output VIEW_CLASS] vengono utilizzati per visualizzare oggetti [!output DOC_CLASS].
[!endif]

[!if APP_TYPE_MDI || APP_TYPE_TABBED_MDI]
res\[!output PROJECT_NAME]Doc.ico
    File di icona utilizzato come icona delle finestre figlio MDI per la classe [!output DOC_CLASS]. Tale icona è inclusa dal file di risorse principale [!output PROJECT_NAME].rc.
[!endif]

[!endif]

[!if DB_VIEW_NO_FILE || DB_VIEW_WITH_FILE]
/////////////////////////////////////////////////////////////////////////////

Supporto database:

[!output ROWSET_HEADER], [!output ROWSET_IMPL]
    Questi file contengono la classe [!output ROWSET_CLASS]. Questa classe viene utilizzata per accedere all'origine dati selezionata nella procedura guidata.
[!if DB_VIEW_NO_FILE]
    Nessun supporto di serializzazione verrà aggiunto.
[!else]
    Il supporto di serializzazione è stato aggiunto.
[!endif]
[!endif]
[!if CONTAINER || FULL_SERVER || MINI_SERVER || CONTAINER_SERVER]
/////////////////////////////////////////////////////////////////////////////

La Creazione guidata applicazione ha creato anche le classi specifiche per OLE

[!if CONTAINER || CONTAINER_SERVER]
[!output CONTAINER_ITEM_HEADER], [!output CONTAINER_ITEM_IMPL]
    Questi file contengono la classe [!output CONTAINER_ITEM_CLASS]. Questa classe viene utilizzata per modificare gli oggetti OLE. Gli oggetti OLE vengono di solito visualizzati dalla classe [!output VIEW_CLASS] e serializzati con la classe [!output DOC_CLASS].
[!if ACTIVE_DOC_CONTAINER]
    Il programma include il supporto per contenere i documenti attivi all'interno del frame.
[!endif]
[!endif]
[!if MINI_SERVER || FULL_SERVER || CONTAINER_SERVER]

[!output SERVER_ITEM_HEADER], [!output SERVER_ITEM_IMPL]
    Questi file contengono la classe [!output SERVER_ITEM_CLASS]. Questa classe viene utilizzata per connettere la classe [!output DOC_CLASS] al sistema OLE e facoltativamente fornire i collegamenti al documento.
[!if ACTIVE_DOC_SERVER]
    Il progetto include il supporto per creare e gestire i documenti attivi.
[!endif]

[!output INPLACE_FRAME_HEADER], [!output INPLACE_FRAME_IMPL]
    Questi file contengono la classe [!output INPLACE_FRAME_CLASS]. Questa classe è derivata da COleIPFrameWnd e controlla tutte le funzionalità di frame durante l'attivazione sul posto.
[!endif]

[!if SUPPORT_COMPOUND_FILES]
    Il progetto include il supporto per i file compositi. Il formato file composito archivia un documento contenente uno o più oggetti di automazione in un unico file consentendo comunque l'accesso al file per i singoli oggetti.
[!endif]
[!endif]
[!else]

/////////////////////////////////////////////////////////////////////////////

[!if AUTOMATION]
La Creazione guidata applicazione crea una classe di finestra di dialogo e la classe proxy di automazione:
[!else]
La Creazione guidata applicazione crea una classe di finestra di dialogo:
[!endif]

[!output DIALOG_HEADER], [!output DIALOG_IMPL] - la finestra di dialogo
    Questi file contengono la classe [!output DIALOG_CLASS]. Questa classe definisce il comportamento della finestra di dialogo principale dell'applicazione. Il modello della finestra di dialogo è in [!output PROJECT_NAME].rc che può essere modificato in Microsoft Visual C++.
[!if AUTOMATION]

[!output DIALOG_AUTO_PROXY_HEADER], [!output DIALOG_AUTO_PROXY_IMPL] - l'oggetto di automazione
    Questi file contengono la classe [!output DIALOG_AUTO_PROXY_CLASS]. Questa classe è chiamata la classe proxy di automazione per la finestra di dialogo perché gestisce l'esposizione dei metodi e delle proprietà di automazione che i controller di automazione possono utilizzare per accedere alla finestra di dialogo. Questi metodi e queste proprietà non sono esposte direttamente dalla classe della finestra di dialogo perché nel caso di un'applicazione MFC di finestra di dialogo modale è più semplice e facile mantenere l'oggetto di automazione separato dall'interfaccia utente.
[!endif]
[!endif]

[!if ACTIVEX_CONTROLS || PRINTING || SPLITTER || MAPI || SOCKETS]
/////////////////////////////////////////////////////////////////////////////

Altre funzionalità:
[!if ACTIVEX_CONTROLS]

Controlli ActiveX
    L'applicazione include il supporto per utilizzare i controlli ActiveX.
[!endif]
[!if PRINTING]

Supporto Stampa e anteprima di stampa
    La Creazione guidata applicazione ha generato il codice per la gestione dei comandi Stampa, Imposta stampante e Anteprima di stampa chiamando le funzioni membro della classe CView dalla libreria MFC.
[!endif]
[!if DB_SUPPORT_HEADER_ONLY && !APP_TYPE_DLG]

Supporto database
    La Creazione guidata applicazione ha aggiunto al programma il livello di base del supporto per database. Sono stati inclusi solo i file necessari.
[!endif]
[!if SPLITTER && !APP_TYPE_DLG]

Finestra divisa
    La Creazione guidata applicazione ha aggiunto il supporto per le finestre con separatore per i documenti dell'applicazione.
[!endif]
[!if MAPI]

Supporto MAPI
    Il progetto generato contiene il codice necessario per creare, modificare, trasferire e archiviare messaggi di posta.
[!endif]
[!if SOCKETS]

Windows Sockets
    L'applicazione prevede il supporto per stabilire le comunicazioni in reti TCP/IP.
[!endif]

[!endif]
/////////////////////////////////////////////////////////////////////////////

Altri file standard:

StdAfx.h, StdAfx.cpp
    Tali file vengono utilizzati per generare il file di intestazione precompilato [!output PROJECT_NAME].pch e il file dei tipi precompilato StdAfx.obj.

Resource.h
    File di intestazione standard che definisce i nuovi ID risorse. Tale file viene letto e aggiornato da Microsoft Visual C++.

[!if MANIFEST]
[!output PROJECT_NAME].manifest
	I file manifesto dell'applicazione vengono utilizzati da Windows XP per descrivere una dipendenza delle applicazioni da specifiche versioni di assembly side-by-side. Tali informazioni vengono utilizzate dal caricatore per caricare l'assembly appropriato dalla cache degli assembly o privatamente dall'applicazione. Il manifesto dell'applicazione può essere incluso per la ridistribuzione come file manifest esterno installato nella stessa cartella dell'eseguibile dell'applicazione o incluso nell'eseguibile sotto forma di risorsa.
[!endif]
/////////////////////////////////////////////////////////////////////////////

Altre note:

La Creazione guidata applicazione utilizza "TODO:" per indicare le parti del codice sorgente da aggiungere o personalizzare.
[!if APP_TYPE_MDI || APP_TYPE_TABBED_MDI || APP_TYPE_SDI || APP_TYPE_DLG || APP_TYPE_MTLD]

Se l'applicazione utilizza MFC in una DLL condivisa, sarà necessario ridistribuire le DLL MFC. Se l'applicazione è un una lingua diversa da quella stabilita dalle impostazioni locali del sistema operativo, sarà inoltre necessario ridistribuire le corrispondenti risorse localizzate mfc110XXX.DLL.
Per ulteriori informazioni su entrambi gli argomenti, vedere la sezione relativa alla ridistribuzione delle applicazioni Visual C++ nella documentazione MSDN.
[!endif]

/////////////////////////////////////////////////////////////////////////////
