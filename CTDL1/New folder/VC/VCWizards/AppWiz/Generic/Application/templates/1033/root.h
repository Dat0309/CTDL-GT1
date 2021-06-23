[!if DLL_APP]
// The following ifdef block is the standard way of creating macros which make exporting 
// from a DLL simpler. All files within this DLL are compiled with the [!output UPPER_CASE_SAFE_PROJECT_IDENTIFIER_NAME]_EXPORTS
// symbol defined on the command line. This symbol should not be defined on any project
// that uses this DLL. This way any other project whose source files include this file see 
// [!output UPPER_CASE_SAFE_PROJECT_IDENTIFIER_NAME]_API functions as being imported from a DLL, whereas this DLL sees symbols
// defined with this macro as being exported.
#ifdef [!output UPPER_CASE_SAFE_PROJECT_IDENTIFIER_NAME]_EXPORTS
#define [!output UPPER_CASE_SAFE_PROJECT_IDENTIFIER_NAME]_API __declspec(dllexport)
#else
#define [!output UPPER_CASE_SAFE_PROJECT_IDENTIFIER_NAME]_API __declspec(dllimport)
#endif

// This class is exported from the [!output PROJECT_NAME].dll
class [!output UPPER_CASE_SAFE_PROJECT_IDENTIFIER_NAME]_API C[!output SAFE_PROJECT_IDENTIFIER_NAME] {
public:
	C[!output SAFE_PROJECT_IDENTIFIER_NAME](void);
	// TODO: add your methods here.
};

extern [!output UPPER_CASE_SAFE_PROJECT_IDENTIFIER_NAME]_API int n[!output SAFE_PROJECT_IDENTIFIER_NAME];

[!output UPPER_CASE_SAFE_PROJECT_IDENTIFIER_NAME]_API int fn[!output SAFE_PROJECT_IDENTIFIER_NAME](void);
[!else]
#pragma once

#include "resource.h"
[!endif]
