// stdafx.h : Includedatei für Standardsystem-Includedateien
// oder häufig verwendete projektspezifische Includedateien,
// die nur in unregelmäßigen Abständen geändert werden.

#pragma once

#ifndef STRICT
#define STRICT
#endif

#include "targetver.h"

#define _ATL_APARTMENT_THREADED
#define _ATL_NO_AUTOMATIC_NAMESPACE

#define _ATL_CSTRING_EXPLICIT_CONSTRUCTORS	// Einige CString-Konstruktoren sind explizit.

#ifdef _MANAGED
#error Dateityphandler können nicht als verwaltete Assemblys erstellt werden.  Legen Sie die Common Language Runtime-Optionen in den Projekteigenschaften auf "Keine Common Language Runtime-Unterstützung" fest.
#endif

#ifndef _UNICODE
#error Dateityphandler müssen in Unicode erstellt werden.  Legen Sie die Option "Zeichensatz" in den Projekteigenschaften auf "Unicode" fest.
#endif

#define SHARED_HANDLERS

#include <afxwin.h>
#include <afxext.h>
#include <afxole.h>
#include <afxodlgs.h>
#include <afxrich.h>
#include <afxhtml.h>
#include <afxcview.h>
#include <afxwinappex.h>
#include <afxframewndex.h>
#include <afxmdiframewndex.h>
[!if CONTAINER_SERVER || FULL_SERVER || MINI_SERVER]
#include <afxoleserverdocex.h>
[!endif]

#ifndef _AFX_NO_OLE_SUPPORT
#include <afxdisp.h>        // MFC-Automatisierungsklassen
#endif // _AFX_NO_OLE_SUPPORT

#define ATL_NO_ASSERT_ON_DESTROY_NONEXISTENT_WINDOW

#include "resource.h"
[!if FULL_SERVER || MINI_SERVER]
#include "..\[!output BASE_PROJECT_NAME]\resource.h"
[!endif]
#include <atlbase.h>
#include <atlcom.h>
#include <atlctl.h>
