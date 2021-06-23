// dlldata.c 杆ㄧΑ

#define REGISTER_PROXY_DLL //DllRegisterServer 单

#define _WIN32_WINNT 0x0500	//続ノ穎皌 DCOM  WinNT 4.0 ┪ Win95
#define USE_STUBLESS_PROXY	//度癸 MIDL 把计 /Oicf ﹚竡

#pragma comment(lib, "rpcns4.lib")
#pragma comment(lib, "rpcrt4.lib")

#define ENTRY_PREFIX	Prx

#include "dlldata.c"
#include "[!output SAFE_IDL_NAME]_p.c"
