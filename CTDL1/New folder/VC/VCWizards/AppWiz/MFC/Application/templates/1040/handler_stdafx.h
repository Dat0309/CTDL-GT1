// stdafx.h: file di inclusione per file di sistema standard
// o file specifici del progetto utilizzati di frequente,
// ma raramente sottoposti a modifiche

#pragma once

#ifndef STRICT
#define STRICT
#endif

#include "targetver.h"

#define _ATL_APARTMENT_THREADED
#define _ATL_NO_AUTOMATIC_NAMESPACE

#define _ATL_CSTRING_EXPLICIT_CONSTRUCTORS	// alcuni costruttori CString saranno espliciti

#ifdef _MANAGED
#error I gestori dei tipi di file non possono essere compilati come assembly gestiti.  Impostare le opzioni CLR affinché non sia disponibile supporto CLR nelle proprietà dei progetti.
#endif

#ifndef _UNICODE
#error I gestori dei tipi di file devono essere compilati in Unicode.  Impostare l'opzione Set di caratteri su Unicode nelle proprietà dei progetti.
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
#include <afxdisp.h>        // Classi di automazione MFC
#endif // _AFX_NO_OLE_SUPPORT

#define ATL_NO_ASSERT_ON_DESTROY_NONEXISTENT_WINDOW

#include "resource.h"
[!if FULL_SERVER || MINI_SERVER]
#include "..\[!output BASE_PROJECT_NAME]\resource.h"
[!endif]
#include <atlbase.h>
#include <atlcom.h>
#include <atlctl.h>
