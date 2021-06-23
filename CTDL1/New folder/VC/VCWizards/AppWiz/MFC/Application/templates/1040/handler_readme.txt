========================================================================
    LIBRERIA ATL (ACTIVE TEMPLATE LIBRARY): cenni preliminari sul progetto [!output PROJECT_NAME]
========================================================================

La Creazione guidata applicazione ha creato questo progetto [!output PROJECT_NAME] come punto di partenza per la scrittura di una libreria a collegamento dinamico (DLL).

Questo file contiene un riepilogo del contenuto di ciascun file che fa parte del progetto.

[!output PROJECT_NAME].vcxproj
    File di progetto principale per i progetti VC++ generati tramite una creazione guidata applicazione. Contiene informazioni sulla versione di Visual C++ che ha generato il file e informazioni sulle piattaforme, le configurazioni e le caratteristiche del progetto selezionate con la Creazione guidata applicazione.

[!output PROJECT_NAME].vcxproj.filters
    File dei filtri per i progetti VC++ generati tramite una Creazione guidata applicazione. Contiene informazioni sull'associazione tra i file del progetto e i filtri. Tale associazione viene utilizzata nell'IDE per la visualizzazione di raggruppamenti di file con estensioni simili in un nodo specifico, ad esempio: i file con estensione cpp sono associati al filtro "File di origine".

[!output SAFE_IDL_NAME].idl
    Questo file contiene le definizioni IDL della libreria dei tipi, delle interfacce e delle coclassi definite nel progetto.
    Questo file verrà elaborato dal compilatore MIDL per generare:
        Definizioni di interfaccia C++ e dichiarazioni GUID ([!output SAFE_IDL_NAME].h)
        Definizioni GUID                                ([!output SAFE_IDL_NAME]_i.c)
        Libreria dei tipi                                  ([!output SAFE_IDL_NAME].tlb)
        Codice di marshalling                            ([!output SAFE_IDL_NAME]_p.c e dlldata.c)

[!output SAFE_IDL_NAME].h
    Questo file contiene le definizioni di interfaccia C++ e le dichiarazioni GUID degli elementi definiti in [!output SAFE_IDL_NAME].idl. Verrà rigenerato dal MIDL durante la compilazione.

[!output PROJECT_NAME].cpp
    Questo file contiene la mappa di oggetti e l'implementazione delle esportazioni di DLL.

[!output PROJECT_NAME].rc
    Elenco di tutte le risorse Microsoft Windows utilizzate dal programma.

[!if DLL_APP]
[!output PROJECT_NAME].def
    Questo file di definizione di moduli fornisce il linker con le informazioni sulle esportazioni richieste dalla DLL. Contiene esportazioni per:
        DllGetClassObject
        DllCanUnloadNow
        DllRegisterServer
        DllUnregisterServer
        DllInstall
[!endif]

/////////////////////////////////////////////////////////////////////////////
Altri file standard:

StdAfx.h, StdAfx.cpp
    Tali file vengono utilizzati per generare il file di intestazione precompilato [!output PROJECT_NAME].pch e il file dei tipi precompilato StdAfx.obj.

Resource.h
    File di intestazione standard che definisce gli ID di risorsa.

/////////////////////////////////////////////////////////////////////////////
Altre note:

	L'opzione di supporto MFC compila le librerie Microsoft Foundation Class nello scheletro di applicazione in uso, rendendo disponibili le classi, gli oggetti e le funzioni MFC.
/////////////////////////////////////////////////////////////////////////////
