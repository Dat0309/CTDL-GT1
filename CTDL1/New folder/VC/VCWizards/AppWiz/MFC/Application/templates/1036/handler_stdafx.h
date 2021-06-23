// stdafx.h : fichier Include pour les fichiers Include système standard,
// ou les fichiers Include spécifiques aux projets qui sont utilisés fréquemment,
// et sont rarement modifiés

#pragma once

#ifndef STRICT
#define STRICT
#endif

#include "targetver.h"

#define _ATL_APARTMENT_THREADED
#define _ATL_NO_AUTOMATIC_NAMESPACE

#define _ATL_CSTRING_EXPLICIT_CONSTRUCTORS	// certains constructeurs CString seront explicites

#ifdef _MANAGED
#error Les gestionnaires de types de fichiers ne peuvent pas être générés en tant qu'assemblys managés.  Définissez les options CLR à Aucun support CLR dans les propriétés du projet.
#endif

#ifndef _UNICODE
#error Les gestionnaires de types de fichiers doivent être Unicode.  Définissez l'option Jeu de caractères à Unicode dans les propriétés du projet.
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
#include <afxdisp.h>        // Classes MFC Automation
#endif // _AFX_NO_OLE_SUPPORT

#define ATL_NO_ASSERT_ON_DESTROY_NONEXISTENT_WINDOW

#include "resource.h"
[!if FULL_SERVER || MINI_SERVER]
#include "..\[!output BASE_PROJECT_NAME]\resource.h"
[!endif]
#include <atlbase.h>
#include <atlcom.h>
#include <atlctl.h>
