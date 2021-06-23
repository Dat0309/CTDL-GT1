// dlldata.c의 래퍼입니다.

#define REGISTER_PROXY_DLL //DllRegisterServer 등입니다.

#define _WIN32_WINNT 0x0500	//WinNT 4.0 또는 DCOM이 지원되는 Win95용입니다.
#define USE_STUBLESS_PROXY	//MIDL 스위치 /Oicf로만 정의됩니다.

#pragma comment(lib, "rpcns4.lib")
#pragma comment(lib, "rpcrt4.lib")

#define ENTRY_PREFIX	Prx

#include "dlldata.c"
#include "[!output SAFE_IDL_NAME]_p.c"
