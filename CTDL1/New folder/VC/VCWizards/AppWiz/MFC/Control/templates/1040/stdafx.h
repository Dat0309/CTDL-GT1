#pragma once

// stdafx.h : file di inclusione per file di inclusione di sistema standard
// o file di inclusione specifici del progetto utilizzati di frequente, ma
// modificati raramente

#ifndef VC_EXTRALEAN
#define VC_EXTRALEAN            // Escludere gli elementi utilizzati di rado dalle intestazioni di Windows
#endif

#include "targetver.h"

#define _ATL_CSTRING_EXPLICIT_CONSTRUCTORS      // alcuni costruttori CString saranno espliciti
#define _ATL_NO_AUTOMATIC_NAMESPACE             // evitare conflitti tra nomi di classe

#include <afxctl.h>         // Supporto MFC per i controlli ActiveX
#include <afxext.h>         // Estensioni MFC
#ifndef _AFX_NO_OLE_SUPPORT
#include <afxdtctl.h>           // Supporto MFC per controlli comuni di Internet Explorer 4
#endif
#ifndef _AFX_NO_AFXCMN_SUPPORT
#include <afxcmn.h>                     // Supporto MFC per controlli comuni di Windows
#endif // _AFX_NO_AFXCMN_SUPPORT

// Eliminare le due inclusioni che seguono se non si desidera utilizzare le classi di
//  database MFC
#ifndef _WIN64

#ifndef _AFX_NO_DB_SUPPORT
#include <afxdb.h>                      // Classi di database ODBC MFC
#endif // _AFX_NO_DB_SUPPORT

#ifndef _AFX_NO_DAO_SUPPORT
#include <afxdao.h>                     // Classi di database DAO MFC
#endif // _AFX_NO_DAO_SUPPORT

#endif // _WIN64

