========================================================================
    AKTIVE VORLAGENBIBLIOTHEK: [!output PROJECT_NAME]-Projektübersicht
========================================================================

Der Anwendungs-Assistent hat dieses [!output PROJECT_NAME]-Projekt als Ausgangspunkt zum Schreiben der DLL (Dynamic Link Library) erstellt.

Diese Datei bietet eine Übersicht über den Inhalt der einzelnen Dateien, aus denen Ihr Projekt besteht.

[!output PROJECT_NAME].vcxproj
    Dies ist die Hauptprojektdatei für VC++-Projekte, die mit dem Anwendungs-Assistenten generiert werden. Sie enthält Informationen über die Version von Visual C++, mit der die Datei generiert wurde, sowie über die Plattformen, Konfigurationen und Projektfunktionen, die im Anwendungs-Assistenten ausgewählt wurden.

[!output PROJECT_NAME].vcxproj.filters
    Dies ist die Filterdatei für VC++-Projekte, die mithilfe eines Anwendungs-Assistenten erstellt werden. Sie enthält Informationen über die Zuordnung zwischen den Dateien im Projekt und den Filtern. Diese Zuordnung wird in der IDE zur Darstellung der Gruppierung von Dateien mit ähnlichen Erweiterungen unter einem bestimmten Knoten verwendet (z. B. sind CPP-Dateien dem Filter "Quelldateien" zugeordnet).

[!output SAFE_IDL_NAME].idl
    Diese Datei enthält die IDL-Definitionen der Typbibliothek, Schnittstellen und Co-Klassen, die im Projekt definiert sind.
    Diese Datei wird vom MIDL-Compiler verarbeitet, um Folgendes zu generieren:
        C++-Schnittstellendefinitionen und GUID-Deklarationen ([!output SAFE_IDL_NAME].h)
        GUID-Definitionen                                ([!output SAFE_IDL_NAME]_i.c)
        Eine Typbibliothek                                  ([!output SAFE_IDL_NAME].tlb)
        Marshallingcode                                 ([!output SAFE_IDL_NAME]_p.c und dlldata.c)

[!output SAFE_IDL_NAME].h
    Diese Datei enthält die C++-Schnittstellendefinitionen und GUID-Deklarationen der in [!output SAFE_IDL_NAME].idl definierten Elemente. Sie wird von MIDL während der Kompilierung erneut generiert.

[!output PROJECT_NAME].cpp
    Diese Datei enthält die Objekttabelle und die Implementierung der DLL-Exporte.

[!output PROJECT_NAME].rc
    Dies ist eine Auflistung aller vom Programm verwendeten Microsoft Windows-Ressourcen.

[!if DLL_APP]
[!output PROJECT_NAME].def
    Diese Moduldefinitionsdatei stellt dem Linker die für die DLL erforderlichen Informationen über die Exporte bereit. Sie enthält Exporte für:
        DllGetClassObject
        DllCanUnloadNow
        DllRegisterServer
        DllUnregisterServer
        DllInstall
[!endif]

/////////////////////////////////////////////////////////////////////////////
Andere Standarddateien:

StdAfx.h, StdAfx.cpp
    Mit diesen Dateien werden eine vorkompilierte Headerdatei (PCH) mit dem Namen [!output PROJECT_NAME].pch und eine vorkompilierte Typendatei mit dem Namen StdAfx.obj erstellt.

Resource.h
    Dies ist die Standardheaderdatei, die Ressourcen-IDs definiert.

/////////////////////////////////////////////////////////////////////////////
Weitere Hinweise:

	Die Option der MFC-Unterstützung erstellt die Microsoft Foundation Class-Bibliotheken im Anwendungsgerüst und macht so MFC-Klassen, Objekte sowie Funktionen verfügbar.
/////////////////////////////////////////////////////////////////////////////
