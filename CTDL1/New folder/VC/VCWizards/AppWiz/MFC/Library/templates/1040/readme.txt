========================================================================
    LIBRERIA MFC: cenni preliminari sul progetto [!output PROJECT_NAME]
========================================================================


La Creazione guidata applicazione ha creato questa DLL [!output PROJECT_NAME]. Tale DLL illustra
le nozioni fondamentali sull'utilizzo delle classi MFC (Microsoft Foundation Class)
e costituisce un punto di partenza per la scrittura della DLL.

Questo file contiene un riepilogo del contenuto di ciascun file che fa parte
della DLL [!output PROJECT_NAME].

[!output PROJECT_NAME].vcxproj
    File di progetto principale per i progetti VC++ generati tramite una creazione guidata applicazione. Contiene informazioni sulla versione di Visual C++ che ha generato il file e informazioni sulle piattaforme, le configurazioni e le caratteristiche del progetto selezionate con la Creazione guidata applicazione.

[!output PROJECT_NAME].vcxproj.filters
    File dei filtri per i progetti VC++ generati tramite una Creazione guidata applicazione. Contiene informazioni sull'associazione tra i file del progetto e i filtri. Tale associazione viene utilizzata nell'IDE per la visualizzazione di raggruppamenti di file con estensioni simili in un nodo specifico, ad esempio: i file con estensione cpp sono associati al filtro "File di origine".

[!if DLL_TYPE_EXTENSION]
[!output PROJECT_NAME].cpp
    File di origine DLL principale contenente il codice per la definizione di DllMain().
[!else]
[!output PROJECT_NAME].h
    File di intestazione principale per la DLL. Dichiara la classe [!output APP_CLASS].

[!output PROJECT_NAME].cpp
    File di origine della DLL principale. Contiene la classe [!output APP_CLASS].
[!if AUTOMATION]
    Contiene inoltre i punti di ingresso OLE richiesti per i server inproc.
[!endif]
[!endif]
[!if AUTOMATION]

[!output SAFE_IDL_NAME].idl
    File contenente il codice sorgente ODL (Object Description Language) per la libreria dei tipi della DLL.
[!endif]

[!output RC_FILE_NAME]
    Elenco di tutte le risorse Microsoft Windows utilizzate dal programma. Include le icone, le bitmap e i cursori memorizzati nella sottodirectory RES. Questo file può essere modificato direttamente in Microsoft Visual C++.

res\[!output RC2_FILE_NAME].rc2
    File contenente le risorse che non vengono modificate da Microsoft Visual C++. Inserire in questo file tutte le risorse non modificabili dall'editor di risorse.

[!output PROJECT_NAME].def
    Questo file contiene informazioni sulla DLL che deve essere fornita per l'esecuzione in Microsoft Windows. Definisce parametri quali il nome e la descrizione della DLL. Consente inoltre di esportare funzioni dalla DLL.

/////////////////////////////////////////////////////////////////////////////
Altri file standard:

StdAfx.h, StdAfx.cpp
    Tali file vengono utilizzati per generare il file di intestazione precompilato [!output PROJECT_NAME].pch e il file dei tipi precompilato StdAfx.obj.

Resource.h
    File di intestazione standard che definisce i nuovi ID risorse. Tale file viene letto e aggiornato da Microsoft Visual C++.

/////////////////////////////////////////////////////////////////////////////
Altre note:

La Creazione guidata applicazione utilizza il prefisso "TODO:" per indicare le parti del codice sorgente da aggiungere o personalizzare.

/////////////////////////////////////////////////////////////////////////////
