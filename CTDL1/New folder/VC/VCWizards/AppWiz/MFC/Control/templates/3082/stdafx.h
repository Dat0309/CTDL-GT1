#pragma once

// stdafx.h: archivo de inclusión de los archivos de inclusión estándar del sistema
// o archivos de inclusión específicos de un proyecto utilizados frecuentemente,
// pero rara vez modificados

#ifndef VC_EXTRALEAN
#define VC_EXTRALEAN            // Excluir material rara vez utilizado de encabezados de Windows
#endif

#include "targetver.h"

#define _ATL_CSTRING_EXPLICIT_CONSTRUCTORS      // Algunos constructores CString serán explícitos
#define _ATL_NO_AUTOMATIC_NAMESPACE             // Evitar conflictos de nombres de clase

#include <afxctl.h>         // Compatibilidad MFC para controles ActiveX
#include <afxext.h>         // Extensiones de MFC
#ifndef _AFX_NO_OLE_SUPPORT
#include <afxdtctl.h>           // Compatibilidad MFC para controles comunes de Internet Explorer 4
#endif
#ifndef _AFX_NO_AFXCMN_SUPPORT
#include <afxcmn.h>                     // Compatibilidad MFC para controles comunes de Windows
#endif // _AFX_NO_AFXCMN_SUPPORT

// Eliminar las dos inclusiones siguientes si no se desean utilizar
//  las clases de base de datos MFC
#ifndef _WIN64

#ifndef _AFX_NO_DB_SUPPORT
#include <afxdb.h>                      // Clases de bases de datos ODBC MFC
#endif // _AFX_NO_DB_SUPPORT

#ifndef _AFX_NO_DAO_SUPPORT
#include <afxdao.h>                     // Clases de bases de datos DAO MFC
#endif // _AFX_NO_DAO_SUPPORT

#endif // _WIN64

