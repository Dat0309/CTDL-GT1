// stdafx.h : include file for standard system include files,
// or project specific include files that are used frequently,
// but are changed infrequently

#pragma once

#ifndef STRICT
#define STRICT
#endif

#include "targetver.h"

[!if SERVICE_APP]
#define _ATL_FREE_THREADED
[!else]
#define _ATL_APARTMENT_THREADED
[!endif]

#define _ATL_NO_AUTOMATIC_NAMESPACE

#define _ATL_CSTRING_EXPLICIT_CONSTRUCTORS	// some CString constructors will be explicit

[!if PREVIEW_HANDLER || THUMBNAIL_HANDLER || SEARCH_HANDLER]
#ifdef _MANAGED
#error File type handlers cannot be built as managed assemblies.  Set the Common Language Runtime options to no CLR support in project properties.
#endif

#ifndef _UNICODE
#error File type handlers must be built Unicode.  Set the Character Set option to Unicode in project properties.
#endif

#define SHARED_HANDLERS

[!endif]
[!if SUPPORT_MFC]
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

#ifndef _AFX_NO_OLE_SUPPORT
#include <afxdisp.h>        // MFC Automation classes
#endif // _AFX_NO_OLE_SUPPORT
[!endif]
[!if SUPPORT_COMPLUS]

#include <comsvcs.h>
[!endif]

#define ATL_NO_ASSERT_ON_DESTROY_NONEXISTENT_WINDOW

#include "resource.h"
#include <atlbase.h>
#include <atlcom.h>
#include <atlctl.h>
