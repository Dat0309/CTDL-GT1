[!if RIBBON_TOOLBAR]
// In diesem MFC-Beispielquellcode wird die Verwendung der MFC Microsoft Office Fluent-Benutzeroberfläche 
// ("Fluent-Benutzeroberfläche") demonstriert. Der Beispielquellcode wird ausschließlich zu Referenzzwecken und als Ergänzung zur 
// Microsoft Foundation Classes-Referenz und zugehöriger elektronischer Dokumentation 
// bereitgestellt, die in der MFC C++-Bibliotheksoftware enthalten sind.  
// Lizenzbedingungen zum Kopieren, Verwenden oder Verteilen der Fluent-Benutzeroberfläche sind separat erhältlich.  
// Weitere Informationen zum Lizenzierungsprogramm für die Fluent-Benutzeroberfläche finden Sie unter 
// http://go.microsoft.com/fwlink/?LinkId=238214.
//
// Copyright (C) Microsoft Corporation
// Alle Rechte vorbehalten.
[!endif]

// stdafx.h: Includedatei für Standardsystem-Includedateien
// oder häufig verwendete, projektspezifische Includedateien,
// die nur selten geändert werden.

#pragma once

#ifndef VC_EXTRALEAN
#define VC_EXTRALEAN            // Selten verwendete Teile der Windows-Header ausschließen
#endif

#include "targetver.h"

#define _ATL_CSTRING_EXPLICIT_CONSTRUCTORS      // einige CString-Konstruktoren sind explizit
[!if NO_MFC_CONTROLS]
#define _AFX_NO_MFC_CONTROLS_IN_DIALOGS         // Unterstützung für MFC-Steuerelemente in Dialogfeldern entfernen
[!endif]

// Deaktiviert das Ausblenden einiger häufiger und oft ignorierter Warnungen durch MFC
#define _AFX_ALL_WARNINGS

#include <afxwin.h>         // MFC-Kern- und -Standardkomponenten
#include <afxext.h>         // MFC-Erweiterungen
[!if APP_TYPE_MTLD && !DOCVIEW]
#include <afxtempl.h>           // MFC-Auflistungsklassen
[!endif]
[!if TREE_VIEW || LIST_VIEW || PROJECT_STYLE_EXPLORER]
#include <afxcview.h>
[!endif]

[!if CONTAINER || MINI_SERVER || FULL_SERVER || CONTAINER_SERVER]
#include <afxole.h>         // MFC OLE-Klassen
[!if CONTAINER || CONTAINER_SERVER]
#include <afxodlgs.h>       // MFC OLE-Dialogfeldklassen
[!endif]
[!endif]

[!if AUTOMATION || ACTIVEX_CONTROLS]
#include <afxdisp.h>        // MFC-Automatisierungsklassen
[!endif]

[!if ACTIVE_DOC_SERVER]
#include <afxdocob.h>
[!endif]

[!if DB_SUPPORT_HEADER_ONLY || DB_VIEW_NO_FILE]
 // Hier ist minimale DB-Unterstützung erforderlich.  Keine Ansicht ausgewählt.
[!endif]
[!if DB_VIEW_WITH_FILE]
 // Hier DB-Unterstützung mit ausgewählter Ansicht.
[!endif]

#ifndef _AFX_NO_OLE_SUPPORT
#include <afxdtctl.h>           // MFC-Unterstützung für allgemeine Steuerelemente von Internet Explorer 4
#endif
#ifndef _AFX_NO_AFXCMN_SUPPORT
#include <afxcmn.h>             // MFC-Unterstützung für allgemeine Windows-Steuerelemente
#endif // _AFX_NO_AFXCMN_SUPPORT
[!if MENUBAR_TOOLBAR || RIBBON_TOOLBAR || USE_VISUAL_MANAGER]

#include <afxcontrolbars.h>     // MFC-Unterstützung für Menübänder und Steuerleisten
[!endif]

[!if HTML_VIEW || HTML_EDITVIEW]
#include <afxhtml.h>                    // MFC HTML-Ansichtunterstützung
[!endif]

[!if SOCKETS]
#include <afxsock.h>            // MFC-Socket-Erweiterungen
[!endif]

[!if RICH_EDIT_VIEW]
#include <afxrich.h>            // MFC-Rich-Edit-Klassen
[!endif]

[!if ATL_SUPPORT]
#include <atlbase.h>
extern CComModule _Module;
[!endif]

[!if OLEDB]
#include <atlbase.h>
#include <afxoledb.h>
#include <atlplus.h>
[!endif]
[!if DB_SUPPORT_OLEDB && DB_SUPPORT_HEADER_ONLY ]
#include <atlbase.h>
#include <afxoledb.h>
#include <atlplus.h>
[!endif]

[!if ODBC]
#include <afxdb.h>        // ODBC
[!endif]
[!if DB_SUPPORT_ODBC && DB_SUPPORT_HEADER_ONLY ]
#include <afxdb.h>        // ODBC
[!endif]

[!if HTML_DIALOG]
#include <afxdhtml.h>        // HTML-Dialogfelder
[!endif]

[!if APP_TYPE_DLG]
[!if AUTOMATION]
// Dieses Makro ist identisch mit IMPLEMENT_OLECREATE, außer dass es den Wert TRUE
// für den Parameter bMultiInstance des Konstruktors COleObjectFactory übergibt.
// Wir möchten für jedes Proxyobjekt der Automatisierung, das von
// Automatisierungscontrollern angefordert wird, eine eigene Instanz dieser Anwendung starten.
#ifndef IMPLEMENT_OLECREATE2
#define IMPLEMENT_OLECREATE2(class_name, external_name, l, w1, w2, b1, b2, b3, b4, b5, b6, b7, b8) \
        AFX_DATADEF COleObjectFactory class_name::factory(class_name::guid, \
                RUNTIME_CLASS(class_name), TRUE, _T(external_name)); \
        const AFX_DATADEF GUID class_name::guid = \
                { l, w1, w2, { b1, b2, b3, b4, b5, b6, b7, b8 } };
#endif // IMPLEMENT_OLECREATE2
[!endif]
[!endif]

[!if MANIFEST]
#ifdef _UNICODE
#if defined _M_IX86
#pragma comment(linker,"/manifestdependency:\"type='win32' name='Microsoft.Windows.Common-Controls' version='6.0.0.0' processorArchitecture='x86' publicKeyToken='6595b64144ccf1df' language='*'\"")
#elif defined _M_X64
#pragma comment(linker,"/manifestdependency:\"type='win32' name='Microsoft.Windows.Common-Controls' version='6.0.0.0' processorArchitecture='amd64' publicKeyToken='6595b64144ccf1df' language='*'\"")
#else
#pragma comment(linker,"/manifestdependency:\"type='win32' name='Microsoft.Windows.Common-Controls' version='6.0.0.0' processorArchitecture='*' publicKeyToken='6595b64144ccf1df' language='*'\"")
#endif
#endif
[!endif]


