// stdafx.h: do³¹cz plik do standardowych systemowych plików do³¹czanych,
// lub specyficzne dla projektu pliki do³¹czane, które s¹ czêsto wykorzystywane, ale
// s¹ rzadko zmieniane

#pragma once

#ifndef VC_EXTRALEAN
#define VC_EXTRALEAN            // Wyklucz rzadko u¿ywane rzeczy z nag³ówków systemu Windows
#endif

#include "targetver.h"

#define _ATL_CSTRING_EXPLICIT_CONSTRUCTORS      // niektóre konstruktory CString bêd¹ jawne

#include <afxwin.h>         // standardowe i rdzenne sk³adniki MFC
#include <afxext.h>         // Rozszerzenia MFC

#ifndef _AFX_NO_OLE_SUPPORT
#include <afxole.h>         // Klasy OLE MFC
#include <afxodlgs.h>       // Klasy okien dialogowych OLE MFC
#include <afxdisp.h>        // Klasy automatyzacji MFC
#endif // _AFX_NO_OLE_SUPPORT

#ifndef _AFX_NO_DB_SUPPORT
#include <afxdb.h>                      // klasy bazy danych ODBC MFC
#endif // _AFX_NO_DB_SUPPORT

#ifndef _AFX_NO_DAO_SUPPORT
#include <afxdao.h>                     // klasy bazy danych DAO MFC
#endif // _AFX_NO_DAO_SUPPORT

#ifndef _AFX_NO_OLE_SUPPORT
#include <afxdtctl.h>           // Obs³uga MFC dla Formantów standardowych programu Internet Explorer 4
#endif
#ifndef _AFX_NO_AFXCMN_SUPPORT
#include <afxcmn.h>                     // Obs³uga MFC dla Formantów standardowych systemu Windows
#endif // _AFX_NO_AFXCMN_SUPPORT

[!if SOCKETS]
#include <afxsock.h>            // Gniazda rozszerzeñ MFC
[!endif]

