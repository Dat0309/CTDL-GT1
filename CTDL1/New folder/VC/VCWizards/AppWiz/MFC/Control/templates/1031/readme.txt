========================================================================
    ACTIVEX-STEUERELEMENT-DLL: [!output PROJECT_NAME]-Projektübersicht
========================================================================

Der Steuerelement-Assistent hat dieses Projekt für die [!output PROJECT_NAME]-ActiveX-Steuerelement-DLL
 erstellt, die ein Steuerelement enthält.

Dieses Projektgerüst veranschaulicht nicht nur die Grundlagen zum Schreiben
eines ActiveX-Steuerelements, sondern dient auch als Einstiegspunkt, um
bestimmte Funktionen des Steuerelements zu definieren.

Diese Datei enthält eine Zusammenfassung dessen, was sich in den Dateien
befindet, aus denen Ihre [!output PROJECT_NAME]–ActiveX-Steuerelement-DLL besteht.

[!output PROJECT_NAME].vcxproj
    Dies ist die Hauptprojektdatei für VC++-Projekte, die mit dem Anwendungs-Assistenten generiert werden. Sie enthält Informationen über die Version von Visual C++, mit der die Datei generiert wurde, sowie über die Plattformen, Konfigurationen und Projektfunktionen, die im Anwendungs-Assistenten ausgewählt wurden.

[!output PROJECT_NAME].vcxproj.filters
    Dies ist die Filterdatei für VC++-Projekte, die mithilfe eines Anwendungs-Assistenten erstellt werden. Sie enthält Informationen über die Zuordnung zwischen den Dateien im Projekt und den Filtern. Diese Zuordnung wird in der IDE zur Darstellung der Gruppierung von Dateien mit ähnlichen Erweiterungen unter einem bestimmten Knoten verwendet (z. B. sind CPP-Dateien dem Filter "Quelldateien" zugeordnet).

[!output PROJECT_NAME].h
    Dies ist die zentrale Includedatei für die ActiveX-Steuerelement-DLL. Sie enthält projektspezifische Includes, z. B. "resource.h".

[!output PROJECT_NAME].cpp
    Dies ist die Hauptquelldatei, die Code für DLL-Initialisierung, -Abbruch und weitere Buchhaltungsaufgaben enthält.

[!output RC_FILE_NAME]
    Dies ist eine Auflistung der vom Projekt verwendeten Microsoft Windows-Ressourcen. Diese Datei kann direkt mit dem Visual C++-Ressourcen-Editor bearbeitet werden.

[!output PROJECT_NAME].def
    Diese Datei enthält Informationen zur ActiveX Control-DLL, die mit Microsoft Windows ausgeführt werden muss.

[!output SAFE_IDL_NAME].idl
    Diese Datei enthält den Object Description Language-Quellcode für die Typbibliothek des Steuerelements.

[!if ABOUT_BOX]
[!output PROJECT_NAME].ico
    Diese Datei enthält ein Symbol, das im Dialogfeld "Info" angezeigt wird. Dieses Symbol ist in der Hauptressourcendatei [!output PROJECT_NAME].rc enthalten.

[!endif]
/////////////////////////////////////////////////////////////////////////////
[!output CONTROL_CLASS] control:

[!output CONTROL_HEADER]
    Diese Datei enthält die Deklaration der C++-Klasse [!output CONTROL_CLASS].

[!output CONTROL_IMPL]
    Diese Datei enthält die Implementierung der C++-Klasse [!output CONTROL_CLASS].

[!output PROPERTY_PAGE_HEADER]
    Diese Datei enthält die Deklaration der C++-Klasse [!output PROPERTY_PAGE_CLASS].

[!output PROPERTY_PAGE_IMPL]
    Diese Datei enthält die Implementierung der C++-Klasse [!output PROPERTY_PAGE_CLASS].

[!output CONTROL_CLASS].bmp
    Diese Datei enthält eine Bitmap, mit der ein Container das [!output CONTROL_CLASS]-Steuerelement darstellt, wenn es auf einer Toolpalette angezeigt wird. Diese Bitmap ist in der Hauptressourcendatei [!output PROJECT_NAME].rc enthalten.

[!if HELP_FILES]
/////////////////////////////////////////////////////////////////////////////
Hilfeunterstützung:

[!output PROJECT_NAME].hpj
    Bei dieser Datei handelt es sich um die Hilfeprojektdatei, die vom Hilfecompiler zum Erstellen der Hilfedatei des ActiveX-Steuerelements verwendet wird.

*.bmp
    Dies sind Bitmapdateien, die von den standardmäßigen Hilfedateithemen für die Standardbefehle der MFC-Bibliothek benötigt werden. Diese Dateien befinden sich im Unterverzeichnis "HLP".

[!output PROJECT_NAME].rtf
    Diese Datei enthält die Standardhilfethemen für die allgemeinen Eigenschaften, Ereignisse und Methoden, die von vielen ActiveX-Steuerelementen unterstützt werden. Diese kann zum Hinzufügen oder Entfernen zusätzlicher steuerelementspezifischer Themen bearbeitet werden. Diese Datei befindet sich im Unterverzeichnis "HLP".

[!endif]
[!if RUNTIME_LICENSE]
/////////////////////////////////////////////////////////////////////////////
Lizenzierungsunterstützung:

[!output PROJECT_NAME].lic
    Dies ist die Benutzerlizenzdatei. Diese Datei muss sich im selben Verzeichnis wie die DLL des Steuerelements befinden, um eine Instanz des Steuerelements in einer Designzeitumgebung zu erstellen. In der Regel verteilen Sie diese Datei mit dem Steuerelement, Ihre Kunden verteilen sie jedoch nicht.

[!endif]
/////////////////////////////////////////////////////////////////////////////
Andere Standarddateien:

stdafx.h, stdafx.cpp
    Mit diesen Dateien werden eine vorkompilierte Headerdatei (PCH) mit dem Namen [!output PROJECT_NAME].pch und eine vorkompilierte Typendatei (PCT) mit dem Namen stdafx.obj erstellt.

resource.h
    Dies ist die Standardheaderdatei, die neue Ressourcen-IDs definiert. Die Datei wird mit dem Ressourcen-Editor von Visual C++ gelesen und     aktualisiert.

/////////////////////////////////////////////////////////////////////////////
Weitere Hinweise:

Der Steuerelement-Assistent verwendet "TODO:", um auf Teile des Quellcodes
hinzuweisen, die Sie ergänzen oder anpassen sollten.

/////////////////////////////////////////////////////////////////////////////
