#pragma once

// stdafx.h : arquivo de inclusão para inclusões do sistema padrões,
// ou inclusões específicas do projeto que são utilizadas frequentemente,
// mas modificadas raramente

#ifndef VC_EXTRALEAN
#define VC_EXTRALEAN            // Remova itens raramente utilizados dos cabeçalhos Windows
#endif

#include "targetver.h"

#define _ATL_CSTRING_EXPLICIT_CONSTRUCTORS      // alguns construtores CString serão explícitos
#define _ATL_NO_AUTOMATIC_NAMESPACE             // evite conflitos de nome de classe

#include <afxctl.h>         // Suporte MFC para Controles ActiveX
#include <afxext.h>         // Extensões MFC
#ifndef _AFX_NO_OLE_SUPPORT
#include <afxdtctl.h>           // Suporte MFC para Controles Comuns do Internet Explorer 4
#endif
#ifndef _AFX_NO_AFXCMN_SUPPORT
#include <afxcmn.h>                     // Suporte MFC para Controles Comuns Windows
#endif // _AFX_NO_AFXCMN_SUPPORT

// Apague as duas inclusões abaixo se você não deseja utilizar classes de
//  banco de dados MFC
#ifndef _WIN64

#ifndef _AFX_NO_DB_SUPPORT
#include <afxdb.h>                      // Classes de Banco de Dados MFC ODBC
#endif // _AFX_NO_DB_SUPPORT

#ifndef _AFX_NO_DAO_SUPPORT
#include <afxdao.h>                     // Classes de Banco de Dados MFC DAO
#endif // _AFX_NO_DAO_SUPPORT

#endif // _WIN64

