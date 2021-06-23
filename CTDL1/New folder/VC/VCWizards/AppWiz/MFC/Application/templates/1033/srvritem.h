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

// [!output SERVER_ITEM_HEADER] : interface of the [!output SERVER_ITEM_CLASS] class
//

#pragma once

class [!output SERVER_ITEM_CLASS] : public [!output SERVER_ITEM_BASE_CLASS]
{
	DECLARE_DYNAMIC([!output SERVER_ITEM_CLASS])

// Constructors
public:
	[!output SERVER_ITEM_CLASS]([!output DOC_CLASS]* pContainerDoc);

// Attributes
	[!output DOC_CLASS]* GetDocument() const
		{ return reinterpret_cast<[!output DOC_CLASS]*>([!output SERVER_ITEM_BASE_CLASS]::GetDocument()); }

// Overrides
	public:
	virtual BOOL OnDraw(CDC* pDC, CSize& rSize);
	virtual BOOL OnGetExtent(DVASPECT dwDrawAspect, CSize& rSize);

// Implementation
public:
	~[!output SERVER_ITEM_CLASS]();
#ifdef _DEBUG
	virtual void AssertValid() const;
	virtual void Dump(CDumpContext& dc) const;
#endif

protected:
	virtual void Serialize(CArchive& ar);   // overridden for document i/o
};

