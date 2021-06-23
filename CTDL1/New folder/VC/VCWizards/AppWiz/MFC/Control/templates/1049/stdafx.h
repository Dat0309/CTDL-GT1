#pragma once

// stdafx.h: включаемый файл для стандартных системных включаемых файлов
// или включаемых файлов для конкретного проекта, которые часто используются,
// но не часто изменяются

#ifndef VC_EXTRALEAN
#define VC_EXTRALEAN            // Исключите редко используемые компоненты из заголовков Windows
#endif

#include "targetver.h"

#define _ATL_CSTRING_EXPLICIT_CONSTRUCTORS      // некоторые конструкторы CString будут явными
#define _ATL_NO_AUTOMATIC_NAMESPACE             // избегайте конфликтов имен классов

#include <afxctl.h>         // поддержка MFC для элементов управления ActiveX
#include <afxext.h>         // Расширения MFC
#ifndef _AFX_NO_OLE_SUPPORT
#include <afxdtctl.h>           // поддержка MFC для типовых элементов управления Internet Explorer 4
#endif
#ifndef _AFX_NO_AFXCMN_SUPPORT
#include <afxcmn.h>                     // поддержка MFC для типовых элементов управления Windows
#endif // _AFX_NO_AFXCMN_SUPPORT

// Удалите два приведенных ниже включения, если не хотите использовать
//  классы баз данных MFC
#ifndef _WIN64

#ifndef _AFX_NO_DB_SUPPORT
#include <afxdb.h>                      // классы баз данных MFC ODBC
#endif // _AFX_NO_DB_SUPPORT

#ifndef _AFX_NO_DAO_SUPPORT
#include <afxdao.h>                     // классы баз данных MFC DAO
#endif // _AFX_NO_DAO_SUPPORT

#endif // _WIN64

