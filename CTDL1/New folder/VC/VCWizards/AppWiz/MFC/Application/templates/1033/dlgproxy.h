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

// [!output DIALOG_AUTO_PROXY_HEADER]: header file
//

#pragma once

class [!output DIALOG_CLASS];


// [!output DIALOG_AUTO_PROXY_CLASS] command target

class [!output DIALOG_AUTO_PROXY_CLASS] : public [!output DIALOG_AUTO_PROXY_BASE_CLASS]
{
	DECLARE_DYNCREATE([!output DIALOG_AUTO_PROXY_CLASS])

	[!output DIALOG_AUTO_PROXY_CLASS]();           // protected constructor used by dynamic creation

// Attributes
public:
	[!output DIALOG_CLASS]* m_pDialog;

// Operations
public:

// Overrides
	public:
	virtual void OnFinalRelease();

// Implementation
protected:
	virtual ~[!output DIALOG_AUTO_PROXY_CLASS]();

	// Generated message map functions

	DECLARE_MESSAGE_MAP()
	DECLARE_OLECREATE([!output DIALOG_AUTO_PROXY_CLASS])

	// Generated OLE dispatch map functions

	DECLARE_DISPATCH_MAP()
	DECLARE_INTERFACE_MAP()
};

