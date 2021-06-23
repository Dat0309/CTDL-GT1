[!if RIBBON_TOOLBAR]
// This MFC Samples source code demonstrates using MFC Microsoft Office Fluent User Interface 
// (the "Fluent UI") and is provided only as referential material to supplement the 
// Microsoft Foundation Classes Reference and related electronic documentation 
// included with the MFC C++ library software.  
// License terms to copy, use or distribute the Fluent UI are available separately.  
// To learn more about our Fluent UI licensing program, please visit 
// http://go.microsoft.com/fwlink/?LinkId=238214.
//
// Copyright (C) Microsoft Corporation
// All rights reserved.
[!endif]

// [!output APP_HEADER] : main header file for the PROJECT_NAME application
//

#pragma once

#ifndef __AFXWIN_H__
	#error "include 'stdafx.h' before including this file for PCH"
#endif

#include "resource.h"		// main symbols


// [!output APP_CLASS]:
// See [!output APP_IMPL] for the implementation of this class
//

class [!output APP_CLASS] : public [!output APP_BASE_CLASS]
{
public:
	[!output APP_CLASS]();

// Overrides
public:
	virtual BOOL InitInstance();
[!if AUTOMATION || ACCESSIBILITY]
	virtual int ExitInstance();
[!endif]

// Implementation

	DECLARE_MESSAGE_MAP()
};

extern [!output APP_CLASS] theApp;