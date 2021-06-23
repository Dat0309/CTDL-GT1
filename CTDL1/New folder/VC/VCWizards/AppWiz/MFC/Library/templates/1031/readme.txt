========================================================================
    MICROSOFT FOUNDATION CLASS-BIBLIOTHEK: [!output PROJECT_NAME]-Projektübersicht
========================================================================


Diese [!output PROJECT_NAME]-DLL wurde vom Anwendungs-Assistenten für Sie erstellt. Diese DLL zeigt nicht nur die Grundlagen der Verwendung von
Microsoft Foundation Classes, sondern dient auch als Ausgangspunkt für das
Schreiben Ihrer DLL.

Diese Datei enthält eine Zusammenfassung dessen, was sich in den Dateien befindet, aus denen Ihre [!output PROJECT_NAME]–DLL besteht.

[!output PROJECT_NAME].vcxproj
    Dies ist die Hauptprojektdatei für VC++-Projekte, die mit dem Anwendungs-Assistenten generiert werden. Sie enthält Informationen über die Version von Visual C++, mit der die Datei generiert wurde, sowie über die Plattformen, Konfigurationen und Projektfunktionen, die im Anwendungs-Assistenten ausgewählt wurden.

[!output PROJECT_NAME].vcxproj.filters
    Dies ist die Filterdatei für VC++-Projekte, die mithilfe eines Anwendungs-Assistenten erstellt werden. Sie enthält Informationen über die Zuordnung zwischen den Dateien im Projekt und den Filtern. Diese Zuordnung wird in der IDE zur Darstellung der Gruppierung von Dateien mit ähnlichen Erweiterungen unter einem bestimmten Knoten verwendet (z. B. sind CPP-Dateien dem Filter "Quelldateien" zugeordnet).

[!if DLL_TYPE_EXTENSION]
[!output PROJECT_NAME].cpp
    Dies ist die DLL-Hauptquelldatei, die die Definition von DllMain() enthält.
[!else]
[!output PROJECT_NAME].h
    Dies ist die Hauptheaderdatei für die DLL. Sie deklariert die [!output APP_CLASS]-Klasse.

[!output PROJECT_NAME].cpp
    Dies ist die Hauptquelldatei der DLL. Sie enthält die [!output APP_CLASS]-Klasse.
[!if AUTOMATION]
    Die Datei enthält auch die OLE-Einstiegspunkte, die für Inproc-Server     erforderlich sind.
[!endif]
[!endif]
[!if AUTOMATION]

[!output SAFE_IDL_NAME].idl
    Diese Datei enthält den Object Description Language-Quellcode für die Typbibliothek der DLL.
[!endif]

[!output RC_FILE_NAME]
    Dies ist eine Auflistung aller vom Programm verwendeten Microsoft Windows-Ressourcen. Sie enthält die Symbole, Bitmaps und Cursor, die im Unterverzeichnis "RES" gespeichert werden. Diese Datei kann direkt in Microsoft Visual C++ bearbeitet werden.

res\[!output RC2_FILE_NAME].rc2
    Diese Datei enthält Ressourcen, die nicht von Microsoft Visual C++ bearbeitet werden. Sie sollten alle Ressourcen, die nicht mit dem Ressourcen-Editor bearbeitet werden können, in dieser Datei platzieren.

[!output PROJECT_NAME].def
    Diese Datei enthält Informationen zur DLL, die zum Ausführen von Microsoft Windows erforderlich sind. Sie definiert Parameter, beispielsweise den Namen und die Beschreibung der DLL. Außerdem exportiert sie Funktionen aus der DLL.

/////////////////////////////////////////////////////////////////////////////
Andere Standarddateien:

StdAfx.h, StdAfx.cpp
    Mit diesen Dateien werden eine vorkompilierte Headerdatei (PCH) mit dem Namen [!output PROJECT_NAME].pch und eine vorkompilierte Typendatei mit dem Namen StdAfx.obj erstellt.

Resource.h
    Dies ist die Standardheaderdatei, die neue Ressourcen-IDs definiert. Die Datei wird mit Microsoft Visual C++ gelesen und aktualisiert.

/////////////////////////////////////////////////////////////////////////////
Weitere Hinweise:

Der Anwendungs-Assistent weist Sie mit "TODO:" auf Teile des Quellcodes hin, die Sie ergänzen oder anpassen sollten.

/////////////////////////////////////////////////////////////////////////////
