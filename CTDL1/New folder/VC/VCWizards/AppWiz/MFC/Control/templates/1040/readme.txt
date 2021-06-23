========================================================================
    DLL DI CONTROLLI ACTIVEX: cenni preliminari sul progetto [!output PROJECT_NAME]
========================================================================

La creazione guidata controllo ha creato questo progetto per la DLL di controlli ActiveX [!output PROJECT_NAME],
contenente un controllo.

Questo scheletro di progetto illustra le nozioni fondamentali sulla scrittura di
un controllo ActiveX e costituisce un punto di partenza per la scrittura di
funzionalità specifiche del controllo.

Questo file contiene un riepilogo del contenuto di ciascun file che fa parte
della DLL di controlli ActiveX [!output PROJECT_NAME].

[!output PROJECT_NAME].vcxproj
    File di progetto principale per i progetti VC++ generati tramite una creazione guidata applicazione. Contiene informazioni sulla versione di Visual C++ che ha generato il file e informazioni sulle piattaforme, le configurazioni e le caratteristiche del progetto selezionate con la Creazione guidata applicazione.

[!output PROJECT_NAME].vcxproj.filters
    File dei filtri per i progetti VC++ generati tramite una Creazione guidata applicazione. Contiene informazioni sull'associazione tra i file del progetto e i filtri. Tale associazione viene utilizzata nell'IDE per la visualizzazione di raggruppamenti di file con estensioni simili in un nodo specifico, ad esempio: i file con estensione cpp sono associati al filtro "File di origine".

[!output PROJECT_NAME].h
    File di inclusione principale per la DLL del controllo ActiveX. Include altre istruzioni include specifiche del progetto, ad esempio resource.h.

[!output PROJECT_NAME].cpp
    File di origine principale contenente il codice per l'inizializzazione della DLL, la relativa terminazione e altre informazioni sulla gestione.

[!output RC_FILE_NAME]
    Elenco di tutte le risorse Microsoft Windows utilizzate dal progetto. Questo file può essere modificato direttamente nell'editor di risorse di Visual C++.

[!output PROJECT_NAME].def
    Questo file contiene informazioni sulla DLL del controllo ActiveX che deve essere fornita per l'esecuzione in Microsoft Windows.

[!output SAFE_IDL_NAME].idl
    File contenente il codice sorgente ODL (Object Description Language) per la libreria dei tipi del controllo.

[!if ABOUT_BOX]
[!output PROJECT_NAME].ico
    Questo file contiene un'icona che verrà visualizzata nella finestra Informazioni su.  Tale icona è inclusa dal file di risorse principale [!output PROJECT_NAME].rc.

[!endif]
/////////////////////////////////////////////////////////////////////////////
[!output CONTROL_CLASS] control:

[!output CONTROL_HEADER]
    Questo file contiene la dichiarazione della classe C++ [!output CONTROL_CLASS].

[!output CONTROL_IMPL]
    Questo file contiene l'implementazione della classe C++ [!output CONTROL_CLASS].

[!output PROPERTY_PAGE_HEADER]
    Questo file contiene la dichiarazione della classe C++ [!output PROPERTY_PAGE_CLASS].

[!output PROPERTY_PAGE_IMPL]
    Questo file contiene l'implementazione della classe C++ [!output PROPERTY_PAGE_CLASS].

[!output CONTROL_CLASS].bmp
    Questo file contiene una bitmap che verrà utilizzata da un contenitore per rappresentare il controllo [!output CONTROL_CLASS] quando viene visualizzato su una tavolozza degli strumenti. Questa bitmap è inclusa nel file di risorse principale [!output PROJECT_NAME].rc.

[!if HELP_FILES]
/////////////////////////////////////////////////////////////////////////////
Supporto per la Guida:

[!output PROJECT_NAME].hpj
    File di progetto della Guida utilizzato dall'apposito compilatore per creare il file della Guida del controllo ActiveX.

*.bmp
    File bitmap richiesti dagli argomenti standard dei file della Guida per i comandi standard della libreria MFC. Tali file si trovano nella sottodirectory HLP.

[!output PROJECT_NAME].rtf
    Questo file contiene gli argomenti standard per le proprietà, gli eventi e i metodi comuni supportati da numerosi controlli ActiveX. È possibile modificarlo per aggiungere o rimuovere ulteriori argomenti specifici del controllo. Il file si trova nella sottodirectory HLP.

[!endif]
[!if RUNTIME_LICENSE]
/////////////////////////////////////////////////////////////////////////////
Gestione delle licenze:

[!output PROJECT_NAME].lic
    File di licenza utente. Deve trovarsi nella stessa directory della DLL del controllo, in modo da consentire la creazione di un'istanza del controllo in un ambiente di progettazione. Il file di licenza viene in genere distribuito con il controllo dallo sviluppatore ad altri programmatori, i quali non lo distribuiscono con le proprie applicazioni.

[!endif]
/////////////////////////////////////////////////////////////////////////////
Altri file standard:

stdafx.h, stdafx.cpp
    Tali file vengono utilizzati per generare il file di intestazione precompilato [!output PROJECT_NAME].pch e il file dei tipi precompilato (PCT) stdafx.obj.

resource.h
    File di intestazione standard che definisce i nuovi ID risorse. Questo file viene letto e aggiornato dall'editor delle risorse di Visual C++.

/////////////////////////////////////////////////////////////////////////////
Altre note:

La creazione guidata controllo utilizza il prefisso "TODO:" per indicare le
parti del codice sorgente da aggiungere o personalizzare.

/////////////////////////////////////////////////////////////////////////////
