// stdafx.h : 자주 사용하지만 자주 변경되는 표준
// 시스템 포함 파일 및 프로젝트 관련 포함 파일이
// 들어 있는 포함 파일입니다.

#pragma once

#ifndef STRICT
#define STRICT
#endif

#include "targetver.h"

#define _ATL_APARTMENT_THREADED
#define _ATL_NO_AUTOMATIC_NAMESPACE

#define _ATL_CSTRING_EXPLICIT_CONSTRUCTORS	// 일부 CString 생성자는 명시적으로 선언됩니다.

#ifdef _MANAGED
#error 파일 형식 처리기를 관리되는 어셈블리로 만들 수 없습니다.  프로젝트 속성에서 CLR을 지원하지 않도록 공용 언어 런타임 옵션을 설정하십시오.
#endif

#ifndef _UNICODE
#error 파일 형식 처리기는 유니코드로 작성해야 합니다.  프로젝트 속성에서 유니코드에 대한 문자 집합 옵션을 설정하십시오.
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
#include <afxdisp.h>        // MFC 자동화 클래스입니다.
#endif // _AFX_NO_OLE_SUPPORT

#define ATL_NO_ASSERT_ON_DESTROY_NONEXISTENT_WINDOW

#include "resource.h"
[!if FULL_SERVER || MINI_SERVER]
#include "..\[!output BASE_PROJECT_NAME]\resource.h"
[!endif]
#include <atlbase.h>
#include <atlcom.h>
#include <atlctl.h>
