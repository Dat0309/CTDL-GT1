// wrapper pour dlldata.c

#define REGISTER_PROXY_DLL //DllRegisterServer, etc.

#define _WIN32_WINNT 0x0500	//pour WinNT 4.0 ou Win95 avec DCOM
#define USE_STUBLESS_PROXY	//défini uniquement avec le commutateur MIDL /Oicf

#pragma comment(lib, "rpcns4.lib")
#pragma comment(lib, "rpcrt4.lib")

#define ENTRY_PREFIX	Prx

#include "dlldata.c"
#include "[!output SAFE_IDL_NAME]_p.c"
