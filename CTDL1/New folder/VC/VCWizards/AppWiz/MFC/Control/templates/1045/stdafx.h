#pragma once

// stdafx.h: do³¹cz plik do standardowych systemowych plików do³¹czanych,
// lub okreœlony projekt zawiera pliki, które s¹ czêsto u¿ywane,
// ale s¹ rzadko zmieniane

#ifndef VC_EXTRALEAN
#define VC_EXTRALEAN            // Wyklucz rzadko u¿ywane rzeczy z nag³ówków systemu Windows
#endif

#include "targetver.h"

#define _ATL_CSTRING_EXPLICIT_CONSTRUCTORS      // niektóre konstruktory CString bêd¹ jawne
#define _ATL_NO_AUTOMATIC_NAMESPACE             // unikaj konfliktów nazw klas

#include <afxctl.h>         // Obs³uga MFC dla formantów ActiveX
#include <afxext.h>         // Rozszerzenia MFC
#ifndef _AFX_NO_OLE_SUPPORT
#include <afxdtctl.h>           // Obs³uga MFC dla Formantów standardowych programu Internet Explorer 4
#endif
#ifndef _AFX_NO_AFXCMN_SUPPORT
#include <afxcmn.h>                     // Obs³uga MFC dla Formantów standardowych systemu Windows
#endif // _AFX_NO_AFXCMN_SUPPORT

// Usuñ dwa poni¿sze do³¹czenia, jeœli nie chcesz u¿ywaæ MFC
//  klasy bazy danych
#ifndef _WIN64

#ifndef _AFX_NO_DB_SUPPORT
#include <afxdb.h>                      // klasy bazy danych ODBC MFC
#endif // _AFX_NO_DB_SUPPORT

#ifndef _AFX_NO_DAO_SUPPORT
#include <afxdao.h>                     // klasy bazy danych DAO MFC
#endif // _AFX_NO_DAO_SUPPORT

#endif // _WIN64

