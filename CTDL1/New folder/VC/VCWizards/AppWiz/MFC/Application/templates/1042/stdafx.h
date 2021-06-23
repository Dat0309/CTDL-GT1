[!if RIBBON_TOOLBAR]
// 이 MFC 샘플 소스 코드는 MFC Microsoft Office Fluent 사용자 인터페이스("Fluent UI")를 
// 사용하는 방법을 보여 주며, MFC C++ 라이브러리 소프트웨어에 포함된 
// Microsoft Foundation Classes Reference 및 관련 전자 문서에 대해 
// 추가적으로 제공되는 내용입니다.  
// Fluent UI를 복사, 사용 또는 배포하는 데 대한 사용 약관은 별도로 제공됩니다.  
// Fluent UI 라이선싱 프로그램에 대한 자세한 내용은 
// http://go.microsoft.com/fwlink/?LinkId=238214.
//
// Copyright (C) Microsoft Corporation
// All rights reserved.
[!endif]

// stdafx.h : 자주 사용하지만 자주 변경되지는 않는
// 표준 시스템 포함 파일 및 프로젝트 관련 포함 파일이 
// 들어 있는 포함 파일입니다.

#pragma once

#ifndef VC_EXTRALEAN
#define VC_EXTRALEAN            // 거의 사용되지 않는 내용은 Windows 헤더에서 제외합니다.
#endif

#include "targetver.h"

#define _ATL_CSTRING_EXPLICIT_CONSTRUCTORS      // 일부 CString 생성자는 명시적으로 선언됩니다.
[!if NO_MFC_CONTROLS]
#define _AFX_NO_MFC_CONTROLS_IN_DIALOGS         // 대화 상자에서 MFC 컨트롤에 대한 지원을 제거합니다.
[!endif]

// MFC의 공통 부분과 무시 가능한 경고 메시지에 대한 숨기기를 해제합니다.
#define _AFX_ALL_WARNINGS

#include <afxwin.h>         // MFC 핵심 및 표준 구성 요소입니다.
#include <afxext.h>         // MFC 확장입니다.
[!if APP_TYPE_MTLD && !DOCVIEW]
#include <afxtempl.h>           // MFC 컬렉션 클래스입니다.
[!endif]
[!if TREE_VIEW || LIST_VIEW || PROJECT_STYLE_EXPLORER]
#include <afxcview.h>
[!endif]

[!if CONTAINER || MINI_SERVER || FULL_SERVER || CONTAINER_SERVER]
#include <afxole.h>         // MFC OLE 클래스입니다.
[!if CONTAINER || CONTAINER_SERVER]
#include <afxodlgs.h>       // MFC OLE 대화 상자 클래스입니다.
[!endif]
[!endif]

[!if AUTOMATION || ACTIVEX_CONTROLS]
#include <afxdisp.h>        // MFC 자동화 클래스입니다.
[!endif]

[!if ACTIVE_DOC_SERVER]
#include <afxdocob.h>
[!endif]

[!if DB_SUPPORT_HEADER_ONLY || DB_VIEW_NO_FILE]
 // 여기에서 최소한의 DB 지원을 요청합니다.  선택된 뷰가 없습니다.
[!endif]
[!if DB_VIEW_WITH_FILE]
 // 여기에서 뷰에 대한 DB 지원이 선택됩니다.
[!endif]

#ifndef _AFX_NO_OLE_SUPPORT
#include <afxdtctl.h>           // Internet Explorer 4 공용 컨트롤에 대한 MFC 지원입니다.
#endif
#ifndef _AFX_NO_AFXCMN_SUPPORT
#include <afxcmn.h>             // Windows 공용 컨트롤에 대한 MFC 지원입니다.
#endif // _AFX_NO_AFXCMN_SUPPORT
[!if MENUBAR_TOOLBAR || RIBBON_TOOLBAR || USE_VISUAL_MANAGER]

#include <afxcontrolbars.h>     // MFC의 리본 및 컨트롤 막대 지원
[!endif]

[!if HTML_VIEW || HTML_EDITVIEW]
#include <afxhtml.h>                    // MFC HTML 뷰 지원
[!endif]

[!if SOCKETS]
#include <afxsock.h>            // MFC 소켓 확장
[!endif]

[!if RICH_EDIT_VIEW]
#include <afxrich.h>            // MFC rich edit 클래스
[!endif]

[!if ATL_SUPPORT]
#include <atlbase.h>
extern CComModule _Module;
[!endif]

[!if OLEDB]
#include <atlbase.h>
#include <afxoledb.h>
#include <atlplus.h>
[!endif]
[!if DB_SUPPORT_OLEDB && DB_SUPPORT_HEADER_ONLY ]
#include <atlbase.h>
#include <afxoledb.h>
#include <atlplus.h>
[!endif]

[!if ODBC]
#include <afxdb.h>        // ODBC
[!endif]
[!if DB_SUPPORT_ODBC && DB_SUPPORT_HEADER_ONLY ]
#include <afxdb.h>        // ODBC
[!endif]

[!if HTML_DIALOG]
#include <afxdhtml.h>        // HTML 대화 상자
[!endif]

[!if APP_TYPE_DLG]
[!if AUTOMATION]
// 이 매크로는 COleObjectFactory 생성자에 대한 bMultiInstance 매개 변수에 TRUE를
// 전달하는 점만 제외하면 IMPLEMENT_OLECREATE와 같습니다.
// 자동화 컨트롤러에서 요청한 각 자동화 프록시 개체에 대해
// 이 응용 프로그램에 대한 별도의 인스턴스가 시작되도록 합니다.
#ifndef IMPLEMENT_OLECREATE2
#define IMPLEMENT_OLECREATE2(class_name, external_name, l, w1, w2, b1, b2, b3, b4, b5, b6, b7, b8) \
        AFX_DATADEF COleObjectFactory class_name::factory(class_name::guid, \
                RUNTIME_CLASS(class_name), TRUE, _T(external_name)); \
        const AFX_DATADEF GUID class_name::guid = \
                { l, w1, w2, { b1, b2, b3, b4, b5, b6, b7, b8 } };
#endif // IMPLEMENT_OLECREATE2
[!endif]
[!endif]

[!if MANIFEST]
#ifdef _UNICODE
#if defined _M_IX86
#pragma comment(linker,"/manifestdependency:\"type='win32' name='Microsoft.Windows.Common-Controls' version='6.0.0.0' processorArchitecture='x86' publicKeyToken='6595b64144ccf1df' language='*'\"")
#elif defined _M_X64
#pragma comment(linker,"/manifestdependency:\"type='win32' name='Microsoft.Windows.Common-Controls' version='6.0.0.0' processorArchitecture='amd64' publicKeyToken='6595b64144ccf1df' language='*'\"")
#else
#pragma comment(linker,"/manifestdependency:\"type='win32' name='Microsoft.Windows.Common-Controls' version='6.0.0.0' processorArchitecture='*' publicKeyToken='6595b64144ccf1df' language='*'\"")
#endif
#endif
[!endif]


