========================================================================
    ACTIVE TEMPLATE LIBRARY : [!output PROJECT_NAME] 프로젝트 개요
========================================================================

응용 프로그램 마법사에서 만든 이 [!output PROJECT_NAME] 프로젝트는 DLL(동적 연결 라이브러리)를 작성하는 데 기초로
사용할 수 있습니다.

이 파일에는 프로젝트를 구성하는 각 파일에 대한 요약 설명이 포함되어 있습니다.

[!output PROJECT_NAME].vcxproj
    응용 프로그램 마법사를 사용하여 생성한 VC++ 프로젝트의 기본 프로젝트 파일입니다. 파일을 생성한 Visual C++ 버전에 대한 정보와 응용 프로그램 마법사를 사용하여 선택한 플랫폼, 구성 및 프로젝트 기능에 대한 정보가 포함되어 있습니다.

[!output PROJECT_NAME].vcxproj.filters
    응용 프로그램 마법사를 사용하여 생성된 VC++ 프로젝트의 필터 파일입니다. 이 파일에는 프로젝트의 파일과 필터 간의 연결 정보가 들어 있습니다. 이러한 연결은 특정 노드에서 유사한 확장명으로 그룹화된 파일을 표시하기 위해 IDE에서 사용됩니다. 예를 들어 ".cpp" 파일은 "소스 파일" 필터와 연결되어 있습니다.

[!output SAFE_IDL_NAME].idl
    이 파일에는 프로젝트에 정의된 형식 라이브러리, 인터페이스 및 보조 클래스에 대한 IDL 정의가 포함되어 있습니다.
    이 파일은 MIDL 컴파일러에 의해 처리되어 다음을 생성합니다.
        C++ 인터페이스 정의 및 GUID 선언([!output SAFE_IDL_NAME].h)
        GUID 정의                                ([!output SAFE_IDL_NAME]_i.c)
        형식 라이브러리                                   ([!output SAFE_IDL_NAME].tlb)
        마샬링 코드                                 ([!output SAFE_IDL_NAME]_p.c 및 dlldata.c)

[!output SAFE_IDL_NAME].h
    이 파일에는 [!output SAFE_IDL_NAME].idl에서 정의된 항목의 C++ 인터페이스 정의 및 GUID 선언이 포함되어 있습니다. 컴파일하는 동안 MIDL에 의해 다시 생성됩니다.

[!output PROJECT_NAME].cpp
    이 파일에는 오브젝트 맵이 들어 있으며 DLL 내보내기가 구현되어 있습니다.

[!output PROJECT_NAME].rc
    프로그램에서 사용하는 모든 Microsoft Windows 리소스의 목록입니다.

[!if DLL_APP]
[!output PROJECT_NAME].def
    이 모듈 정의 파일에서는 DLL에서 필요한 내보내기에 대한 정보를 링커에 제공합니다. 다음에 대한 내보내기가 포함되어 있습니다.
        DllGetClassObject
        DllCanUnloadNow
        DllRegisterServer
        DllUnregisterServer
        DllInstall
[!endif]

/////////////////////////////////////////////////////////////////////////////
기타 표준 파일:

StdAfx.h, StdAfx.cpp
    이 파일은 미리 컴파일된 헤더(PCH) 파일 [!output PROJECT_NAME].pch와 미리 컴파일된 형식(PCT) 파일 StdAfx.obj를 빌드하는 데 사용됩니다.

Resource.h
    리소스 ID를 정의하는 표준 헤더 파일입니다.

/////////////////////////////////////////////////////////////////////////////
기타 참고:

	MFC 지원 옵션에서는 Microsoft Foundation Class 라이브러리를 기초 응용 프로그램으로 빌드하여 MFC 클래스, 개체 및 함수를 사용할 수 있도록 합니다.
/////////////////////////////////////////////////////////////////////////////
