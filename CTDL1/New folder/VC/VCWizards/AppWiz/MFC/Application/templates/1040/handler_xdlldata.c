// wrapper per dlldata.c

#define REGISTER_PROXY_DLL //DllRegisterServer e così via.

#define _WIN32_WINNT 0x0500	//per WinNT 4.0 o Win95 con DCOM
#define USE_STUBLESS_PROXY	//definito solo con opzione MIDL /Oicf

#pragma comment(lib, "rpcns4.lib")
#pragma comment(lib, "rpcrt4.lib")

#define ENTRY_PREFIX	Prx

#include "dlldata.c"
#include "[!output SAFE_IDL_NAME]_p.c"
