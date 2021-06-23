#pragma once

// stdafx.h : arquivo de inclus�o para inclus�es do sistema padr�es,
// ou inclus�es espec�ficas do projeto que s�o utilizadas frequentemente,
// mas modificadas raramente

#ifndef VC_EXTRALEAN
#define VC_EXTRALEAN            // Remova itens raramente utilizados dos cabe�alhos Windows
#endif

#include "targetver.h"

#define _ATL_CSTRING_EXPLICIT_CONSTRUCTORS      // alguns construtores CString ser�o expl�citos
#define _ATL_NO_AUTOMATIC_NAMESPACE             // evite conflitos de nome de classe

#include <afxctl.h>         // Suporte MFC para Controles ActiveX
#include <afxext.h>         // Extens�es MFC
#ifndef _AFX_NO_OLE_SUPPORT
#include <afxdtctl.h>           // Suporte MFC para Controles Comuns do Internet Explorer 4
#endif
#ifndef _AFX_NO_AFXCMN_SUPPORT
#include <afxcmn.h>                     // Suporte MFC para Controles Comuns Windows
#endif // _AFX_NO_AFXCMN_SUPPORT

// Apague as duas inclus�es abaixo se voc� n�o deseja utilizar classes de
//  banco de dados MFC
#ifndef _WIN64

#ifndef _AFX_NO_DB_SUPPORT
#include <afxdb.h>                      // Classes de Banco de Dados MFC ODBC
#endif // _AFX_NO_DB_SUPPORT

#ifndef _AFX_NO_DAO_SUPPORT
#include <afxdao.h>                     // Classes de Banco de Dados MFC DAO
#endif // _AFX_NO_DAO_SUPPORT

#endif // _WIN64

