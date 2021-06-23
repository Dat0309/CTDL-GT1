// stdafx.h: archivo de inclusión de los archivos de inclusión estándar del sistema,
// o archivos de inclusión específicos de un proyecto utilizados frecuentemente,
//pero rara vez modificados

#pragma once

#ifndef STRICT
#define STRICT
#endif

#include "targetver.h"

#define _ATL_APARTMENT_THREADED
#define _ATL_NO_AUTOMATIC_NAMESPACE

#define _ATL_CSTRING_EXPLICIT_CONSTRUCTORS	// Algunos constructores CString serán explícitos

#ifdef _MANAGED
#error Los controladores de tipo de archivo no se pueden compilar como ensamblados administrados.  Establezca las opciones de Common Language Runtime para que no haya compatibilidad con CLR en las propiedades del proyecto.
#endif

#ifndef _UNICODE
#error Los controladores de tipo de archivo se deben compilar como Unicode.  Establezca la opción Juego de caracteres en Unicode en las propiedades del proyecto.
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
#include <afxdisp.h>        // Clases de automatización de MFC
#endif // _AFX_NO_OLE_SUPPORT

#define ATL_NO_ASSERT_ON_DESTROY_NONEXISTENT_WINDOW

#include "resource.h"
[!if FULL_SERVER || MINI_SERVER]
#include "..\[!output BASE_PROJECT_NAME]\resource.h"
[!endif]
#include <atlbase.h>
#include <atlcom.h>
#include <atlctl.h>
