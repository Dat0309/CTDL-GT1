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

// [!output WND_VIEW_HEADER] : interface of the [!output WND_VIEW_CLASS] class
//


#pragma once


// [!output WND_VIEW_CLASS] window

class [!output WND_VIEW_CLASS] : public [!output WND_VIEW_BASE_CLASS]
{
// Construction
public:
	[!output WND_VIEW_CLASS]();

// Attributes
public:

// Operations
public:

// Overrides
	protected:
	virtual BOOL PreCreateWindow(CREATESTRUCT& cs);

// Implementation
public:
	virtual ~[!output WND_VIEW_CLASS]();

	// Generated message map functions
protected:
	afx_msg void OnPaint();
	DECLARE_MESSAGE_MAP()
};

