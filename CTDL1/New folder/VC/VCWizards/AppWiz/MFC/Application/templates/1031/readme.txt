================================================================================
    MICROSOFT FOUNDATION CLASS-BIBLIOTHEK: [!output PROJECT_NAME]-Projektübersicht
===============================================================================

Diese [!output PROJECT_NAME]-Anwendung wurde vom Anwendungs-Assistenten für Sie erstellt. Diese Anwendung zeigt nicht nur die Grundlagen der Verwendung von Microsoft Foundation Classes, sondern dient auch als Ausgangspunkt für das Schreiben Ihrer Anwendung.

Diese Datei bietet eine Übersicht über den Inhalt der einzelnen Dateien, aus
denen Ihre [!output PROJECT_NAME]-Anwendung besteht.

[!output PROJECT_NAME].vcxproj
    Dies ist die Hauptprojektdatei für VC++-Projekte, die mit dem Anwendungs-Assistenten generiert werden. Sie enthält Informationen über die Version von Visual C++, mit der die Datei generiert wurde, sowie über die Plattformen, Konfigurationen und Projektfunktionen, die im Anwendungs-Assistenten ausgewählt wurden.

[!output PROJECT_NAME].vcxproj.filters
    Dies ist die Filterdatei für VC++-Projekte, die mithilfe eines Anwendungs-Assistenten erstellt werden. Sie enthält Informationen über die Zuordnung zwischen den Dateien im Projekt und den Filtern. Diese Zuordnung wird in der IDE zur Darstellung der Gruppierung von Dateien mit ähnlichen Erweiterungen unter einem bestimmten Knoten verwendet (z. B. sind CPP-Dateien dem Filter "Quelldateien" zugeordnet).

[!output APP_HEADER]
    Dies ist die Hauptheaderdatei für die Anwendung.
    Sie enthält andere projektspezifische Header (einschließlich Resource.h) und deklariert die [!output APP_CLASS]-Anwendungsklasse.

[!output APP_IMPL]
    Dies ist die wichtigste Anwendungsquelldatei, die die Anwendungsklasse [!output APP_CLASS] enthält.

[!output RC_FILE_NAME]
    Dies ist eine Auflistung aller vom Programm verwendeten Microsoft Windows-Ressourcen. Sie enthält die Symbole, Bitmaps und Cursor, die im Unterverzeichnis "RES" gespeichert werden. Diese Datei kann direkt in Microsoft Visual C++ bearbeitet werden. Ihre Projektressourcen befinden sich in [!output LCID].

res\[!output PROJECT_NAME].ico
    Dies ist eine Symboldatei, die als Anwendungssymbol verwendet wird. Dieses Symbol ist in der Hauptressourcendatei [!output PROJECT_NAME].rc enthalten.

res\[!output RC2_FILE_NAME].rc2
    Diese Datei enthält Ressourcen, die nicht von Microsoft Visual C++ bearbeitet werden. Sie sollten alle Ressourcen, die nicht mit dem Ressourcen-Editor bearbeitet werden können, in dieser Datei platzieren.
[!if CONTAINER_SERVER || FULL_SERVER || MINI_SERVER || AUTOMATION || HAS_SUFFIX]
[!if !HTML_EDITVIEW]

[!output PROJECT_NAME].reg
    Dies ist eine Beispiel-REG-Datei, in der die Registrierungseinstellungen dargestellt sind, die vom Framework festgelegt werden. Sie können diese als REG-Datei
[!if APP_TYPE_DLG]
    für Ihre Anwendung verwenden.
[!else]
    für Ihre Anwendung verwenden oder die Datei einfach löschen und die Standard-RegisterShellFileTypes-Registrierung nutzen.
[!endif]

[!if AUTOMATION]
[!output SAFE_IDL_NAME].idl
    Diese Datei enthält den Quellcode in der Oberflächenbeschreibungssprache für die Typbibliothek Ihrer Anwendung.
[!endif]
[!endif]
[!endif]

[!if !APP_TYPE_DLG]
/////////////////////////////////////////////////////////////////////////////

Für das Hauptrahmenfenster:
[!if PROJECT_STYLE_EXPLORER]
    Windows Explorer-Stil: Das Projekt enthält eine Windows Explorer ähnliche Benutzeroberfläche mit zwei Rahmen.
[!else]
    Das Projekt enthält eine Standard-MFC-Schnittstelle.
[!endif]

[!output MAIN_FRAME_HEADER], [!output MAIN_FRAME_IMPL]
    Diese Dateien enthalten die [!output MAIN_FRAME_CLASS]-Rahmenklasse, die abgeleitet ist von
[!if APP_TYPE_MDI || APP_TYPE_TABBED_MDI]
[!if APP_TYPE_MDI]
    CMDIFrameWnd und alle MDI-Rahmenfunktionen steuert.
[!else]
    CMDITabbedFrameWnd und MDI-Rahmenfunktionen steuert.
[!endif]
[!else]
    CFrameWnd und alle SDI-Rahmenfunktionen steuert.
[!endif]
[!if PROJECT_STYLE_EXPLORER]

[!output TREE_VIEW_HEADER], [!output TREE_VIEW_IMPL]
    Diese Dateien enthalten die linke [!output TREE_VIEW_CLASS]-Rahmenklasse, die von CTreeView abgeleitet ist.
[!endif]

[!if DOCKING_TOOLBAR || TOOLBAR_STYLE_REBAR || MENUBAR_TOOLBAR || RIBBON_TOOLBAR]
res\Toolbar.bmp
    Diese Bitmapdatei wird zum Erstellen von Kachelbildern für die Symbolleiste verwendet.
    Die ursprüngliche Symbol- und Statusleiste werden in der [!output MAIN_FRAME_CLASS]-Klasse erstellt. Bearbeiten Sie diese Bitmapdatei für die Symbolleiste mit dem Ressourcen-Editor, und aktualisieren Sie das IDR_MAINFRAME TOOLBAR-Array in [!output PROJECT_NAME].rc, um Symbolleistenschaltflächen hinzuzufügen.
[!if MINI_SERVER || FULL_SERVER || CONTAINER_SERVER]

res\IToolbar.bmp
    Diese Bitmapdatei wird verwendet, um Kachelbilder für die Symbolleiste zu erstellen, wenn Ihre Serveranwendung ordnungsgemäß in einem anderen Container aktiviert ist. Diese Symbolleiste wird in der [!output INPLACE_FRAME_CLASS]-Klasse erstellt. Diese Bitmap ist mit der Bitmap in res\Toolbar.bmp identisch, außer dass viele Befehle entfernt wurden, die nicht für Server verwendet werden.

[!endif]
[!endif]
[!if APP_TYPE_MDI || APP_TYPE_TABBED_MDI]
/////////////////////////////////////////////////////////////////////////////

Für das untergeordnete Rahmenfenster:

ChildFrm.h, ChildFrm.cpp
    Diese Dateien definieren und implementieren die [!output CHILD_FRAME_CLASS]-Klasse, die die untergeordneten Fenster in einer MDI-Anwendung unterstützt.

[!endif]
/////////////////////////////////////////////////////////////////////////////

[!if DOCVIEW]
[!if !DB_VIEW_NO_FILE]
Der Anwendungs-Assistent erstellt einen Dokumententyp und eine Ansicht:

[!output DOC_HEADER], [!output DOC_IMPL] - das Dokument
    Diese Dateien enthalten Ihre [!output DOC_CLASS]-Klasse. Bearbeiten Sie diese Dateien, um Ihre speziellen Dokumentdaten hinzuzufügen sowie um das Speichern und Laden von Dateien zu implementieren (über [!output DOC_CLASS]::Serialize).
[!if HAS_SUFFIX && !HTML_EDITVIEW]
    Das Dokument verfügt über die folgenden Zeichenfolgen:
        Dateierweiterung:      [!output FILE_EXTENSION]
        Dateityp-ID:        [!output FILE_TYPE_ID]
        Hauptrahmenüberschrift:  [!output MAIN_FRAME_CAPTION]
        Dokumententypname:       [!output DOC_TYPE_NAME]
        Filtername:         [!output FILTER_NAME]
        Neuer Dateikurzname: [!output FILE_NEW_NAME_SHORT]
        Langer Dateitypname: [!output FILE_NEW_NAME_LONG]
[!endif]
[!else]
Der Anwendungs-Assistent erstellt eine Ansicht:
[!endif]

[!output VIEW_HEADER], [!output VIEW_IMPL] - die Ansicht des Dokuments
    Diese Dateien enthalten Ihre [!output VIEW_CLASS]-Klasse.
[!if !DB_VIEW_NO_FILE]
    [!output VIEW_CLASS]-Objekte werden verwendet, um [!output DOC_CLASS]-Objekte anzuzeigen.
[!endif]

[!if APP_TYPE_MDI || APP_TYPE_TABBED_MDI]
res\[!output PROJECT_NAME]Doc.ico
    Dies ist eine Symboldatei, die als Symbol für untergeordnete MDI-Fenster für die [!output DOC_CLASS]-Klasse verwendet wird. Dieses Symbol ist in der Hauptressourcendatei [!output PROJECT_NAME].rc enthalten.
[!endif]

[!endif]

[!if DB_VIEW_NO_FILE || DB_VIEW_WITH_FILE]
/////////////////////////////////////////////////////////////////////////////

Datenbankunterstützung:

[!output ROWSET_HEADER], [!output ROWSET_IMPL]
    Diese Dateien enthalten Ihre [!output ROWSET_CLASS]-Klasse. Diese Klasse wird für den Zugriff auf die Datenquelle verwendet, die Sie im Assistenten ausgewählt haben.
[!if DB_VIEW_NO_FILE]
    Es wird keine Serialisierungsunterstützung hinzugefügt.
[!else]
    Serialisierungsunterstützung wurde hinzugefügt.
[!endif]
[!endif]
[!if CONTAINER || FULL_SERVER || MINI_SERVER || CONTAINER_SERVER]
/////////////////////////////////////////////////////////////////////////////

Der Anwendungs-Assistent hat weiterhin OLE-spezifische Klassen erstellt.

[!if CONTAINER || CONTAINER_SERVER]
[!output CONTAINER_ITEM_HEADER], [!output CONTAINER_ITEM_IMPL]
    Diese Dateien enthalten Ihre [!output CONTAINER_ITEM_CLASS]-Klasse. Diese Klasse wird zur Änderung von OLE-Objekten verwendet. OLE-Objekte werden normalerweise von der [!output VIEW_CLASS]-Klasse angezeigt und als Teil der [!output DOC_CLASS]-Klasse serialisiert.
[!if ACTIVE_DOC_CONTAINER]
    Das Programm bietet Unterstützung für Active Documents innerhalb seines Rahmens.
[!endif]
[!endif]
[!if MINI_SERVER || FULL_SERVER || CONTAINER_SERVER]

[!output SERVER_ITEM_HEADER], [!output SERVER_ITEM_IMPL]
    Diese Dateien enthalten Ihre [!output SERVER_ITEM_CLASS]. Diese Klasse wird für die Verbindung der [!output DOC_CLASS]-Klasse mit dem OLE-System verwendet, und optional stellt sie Links zum Dokument bereit.
[!if ACTIVE_DOC_SERVER]
    Das Projekt unterstützt die Erstellung und Verwaltung von Active Documents.
[!endif]

[!output INPLACE_FRAME_HEADER], [!output INPLACE_FRAME_IMPL]
    Diese Dateien enthalten Ihre [!output INPLACE_FRAME_CLASS]. Diese Klasse ist von COleIPFrameWnd abgeleitet und steuert alle Rahmenfunktionen bei der direkten Aktivierung.
[!endif]

[!if SUPPORT_COMPOUND_FILES]
    Das Projekt unterstützt Compound-Dateien. Das Compound-Dateiformat speichert ein Dokument, das ein oder mehrere Automatisierungsobjekte enthält, in einer Datei und ermöglicht den einzelnen Objekten dabei trotzdem Zugriff.
[!endif]
[!endif]
[!else]

/////////////////////////////////////////////////////////////////////////////

[!if AUTOMATION]
Der Anwendungs-Assistent erstellt eine Dialogfeldklasse und Automatisierungsproxyklasse:
[!else]
Der Anwendungs-Assistent erstellt eine Dialogfeldklasse:
[!endif]

[!output DIALOG_HEADER], [!output DIALOG_IMPL] - das Dialogfeld
    Diese Dateien enthalten Ihre [!output DIALOG_CLASS]-Klasse. Diese Klasse definiert das Verhalten des Hauptdialogfelds der Anwendung. Die Vorlage für das Dialogfeld befindet sich in [!output PROJECT_NAME].rc und kann in Microsoft Visual C++ bearbeitet werden.
[!if AUTOMATION]

[!output DIALOG_AUTO_PROXY_HEADER], [!output DIALOG_AUTO_PROXY_IMPL] - das Automatisierungsobjekt
    Diese Dateien enthalten Ihre [!output DIALOG_AUTO_PROXY_CLASS]-Klasse. Diese Klasse wird Automatisierungsproxyklasse für das Dialogfeld genannt, da sie die Automatisierungsmethoden und -eigenschaften verfügbar macht, die Automatisierungscontroller für den Zugriff auf das Dialogfeld verwenden können. Diese Methoden und Eigenschaften werden nicht direkt von der Klasse verfügbar gemacht, da es im Falle einer modalen dialogfeldbasierten MFC-Anwendung einfacher und sauberer ist, das Automatisierungsobjekt von der Benutzeroberfläche zu trennen.
[!endif]
[!endif]

[!if ACTIVEX_CONTROLS || PRINTING || SPLITTER || MAPI || SOCKETS]
/////////////////////////////////////////////////////////////////////////////

Andere Funktionen:
[!if ACTIVEX_CONTROLS]

ActiveX-Steuerelemente
    Die Anwendung bietet Unterstützung für ActiveX-Steuerelemente.
[!endif]
[!if PRINTING]

Unterstützung für Drucken und Druckvorschau
    Der Anwendungs-Assistent hat Code zum Verarbeiten der Befehle zum Drucken, zur Druckereinrichtung und zur Druckvorschau generiert, indem Memberfunktionen in der CView-Klasse aus der MFC-Bibliothek aufgerufen wurden.
[!endif]
[!if DB_SUPPORT_HEADER_ONLY && !APP_TYPE_DLG]

Datenbankunterstützung
    Der Anwendungs-Assistent hat grundlegende Datenbankunterstützung für das Programm hinzugefügt. Es sind nur die benötigten Dateien enthalten.
[!endif]
[!if SPLITTER && !APP_TYPE_DLG]

Geteiltes Fenster
    Der Anwendungs-Assistent hat Unterstützung für Splitterfenster für die Anwendungsdokumente hinzugefügt.
[!endif]
[!if MAPI]

MAPI-Unterstützung
    Das erstellte Projekt enthält den Code, der notwendig ist, um E-Mail-Nachrichten zu erstellen, zu bearbeiten, zu übertragen und zu speichern.
[!endif]
[!if SOCKETS]

Windows-Sockets
    Die Anwendung unterstützt Kommunikation über TCP/IP-Netzwerke.
[!endif]

[!endif]
/////////////////////////////////////////////////////////////////////////////

Andere Standarddateien:

StdAfx.h, StdAfx.cpp
    Mit diesen Dateien werden eine vorkompilierte Headerdatei (PCH) mit dem Namen [!output PROJECT_NAME].pch und eine vorkompilierte Typendatei mit dem Namen StdAfx.obj erstellt.

Resource.h
    Dies ist die Standardheaderdatei, die neue Ressourcen-IDs definiert. Die Datei wird mit Microsoft Visual C++ gelesen und aktualisiert.

[!if MANIFEST]
[!output PROJECT_NAME].manifest
	Anwendungsmanifestdateien werden von Windows XP verwendet, um die Abhängigkeit einer Anwendung von bestimmten Versionen paralleler Assemblys zu beschreiben. Das Ladeprogramm verwendet diese Informationen, um die entsprechende Assembly aus dem Assemblycache oder privat von der Anwendung zu laden. Das Anwendungsmanifest kann zur Neuverteilung als externe .manifest-Datei einbezogen werden, die im selben Ordner wie die ausführbare Datei der Anwendung installiert ist, oder sie wird der ausführbaren Datei in Form einer Ressource hinzugefügt.
[!endif]
/////////////////////////////////////////////////////////////////////////////

Weitere Hinweise:

Der Anwendungs-Assistent weist Sie mit "TODO:"-Kommentaren auf Teile des Quellcodes hin, die Sie ergänzen oder anpassen sollten.
[!if APP_TYPE_MDI || APP_TYPE_TABBED_MDI || APP_TYPE_SDI || APP_TYPE_DLG || APP_TYPE_MTLD]

Wenn Ihre Anwendung MFC in einer gemeinsam genutzten DLL verwendet, müssen die MFC-DLLs mitverteilt werden. Wenn Ihre Anwendung eine andere Sprache als Systemsprache verwendet, müssen auch die entsprechende mfc110XXX.DLL für die lokalisierten Ressourcen mitverteilt werden.
Weitere Informationen zu diesen beiden Themen finden Sie im Abschnitt zur Neuverteilung von Visual C++-Anwendungen in der MSDN-Dokumentation.
[!endif]

/////////////////////////////////////////////////////////////////////////////
