#pragma once

// stdafx.h: do��cz plik do standardowych systemowych plik�w do��czanych,
// lub okre�lony projekt zawiera pliki, kt�re s� cz�sto u�ywane,
// ale s� rzadko zmieniane

#ifndef VC_EXTRALEAN
#define VC_EXTRALEAN            // Wyklucz rzadko u�ywane rzeczy z nag��wk�w systemu Windows
#endif

#include "targetver.h"

#define _ATL_CSTRING_EXPLICIT_CONSTRUCTORS      // niekt�re konstruktory CString b�d� jawne
#define _ATL_NO_AUTOMATIC_NAMESPACE             // unikaj konflikt�w nazw klas

#include <afxctl.h>         // Obs�uga MFC dla formant�w ActiveX
#include <afxext.h>         // Rozszerzenia MFC
#ifndef _AFX_NO_OLE_SUPPORT
#include <afxdtctl.h>           // Obs�uga MFC dla Formant�w standardowych programu Internet Explorer 4
#endif
#ifndef _AFX_NO_AFXCMN_SUPPORT
#include <afxcmn.h>                     // Obs�uga MFC dla Formant�w standardowych systemu Windows
#endif // _AFX_NO_AFXCMN_SUPPORT

// Usu� dwa poni�sze do��czenia, je�li nie chcesz u�ywa� MFC
//  klasy bazy danych
#ifndef _WIN64

#ifndef _AFX_NO_DB_SUPPORT
#include <afxdb.h>                      // klasy bazy danych ODBC MFC
#endif // _AFX_NO_DB_SUPPORT

#ifndef _AFX_NO_DAO_SUPPORT
#include <afxdao.h>                     // klasy bazy danych DAO MFC
#endif // _AFX_NO_DAO_SUPPORT

#endif // _WIN64

