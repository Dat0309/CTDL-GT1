// stdafx.h : arquivo de inclusão para inclusões do sistema padrões,
// ou inclusões específicas de projeto que são utilizadas frequentemente, mas
// são modificadas raramente

#pragma once

#ifndef VC_EXTRALEAN
#define VC_EXTRALEAN            // Remova itens raramente utilizados dos cabeçalhos Windows
#endif

#include "targetver.h"

#define _ATL_CSTRING_EXPLICIT_CONSTRUCTORS      // alguns construtores CString serão explícitos

#include <afxwin.h>         // componentes MFC principais e padrões
#include <afxext.h>         // Extensões MFC

#ifndef _AFX_NO_OLE_SUPPORT
#include <afxole.h>         // Classes OLE do MFC
#include <afxodlgs.h>       // Classes de diálogo OLE do MFC
#include <afxdisp.h>        // Classes de Automação MFC
#endif // _AFX_NO_OLE_SUPPORT

#ifndef _AFX_NO_DB_SUPPORT
#include <afxdb.h>                      // Classes de Banco de Dados MFC ODBC
#endif // _AFX_NO_DB_SUPPORT

#ifndef _AFX_NO_DAO_SUPPORT
#include <afxdao.h>                     // Classes de Banco de Dados MFC DAO
#endif // _AFX_NO_DAO_SUPPORT

#ifndef _AFX_NO_OLE_SUPPORT
#include <afxdtctl.h>           // Suporte MFC para Controles Comuns do Internet Explorer 4
#endif
#ifndef _AFX_NO_AFXCMN_SUPPORT
#include <afxcmn.h>                     // Suporte MFC para Controles Comuns Windows
#endif // _AFX_NO_AFXCMN_SUPPORT

[!if SOCKETS]
#include <afxsock.h>            // Extensões de soquete do MFC
[!endif]

