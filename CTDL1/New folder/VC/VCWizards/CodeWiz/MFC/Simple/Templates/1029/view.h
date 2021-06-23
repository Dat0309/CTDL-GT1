#pragma once


// [!output CLASS_NAME] view

class [!output CLASS_NAME] : public [!output BASE_CLASS]
{
	DECLARE_DYNCREATE([!output CLASS_NAME])

protected:
	[!output CLASS_NAME]();           // protected constructor used by dynamic creation
	virtual ~[!output CLASS_NAME]();

public:
[!if AUTOMATION || CREATABLE]
	virtual void OnFinalRelease();
[!endif]
[!if CVIEW]
	virtual void OnDraw(CDC* pDC);      // overridden to draw this view
[!endif]
#ifdef _DEBUG
	virtual void AssertValid() const;
#ifndef _WIN32_WCE
	virtual void Dump(CDumpContext& dc) const;
#endif
#endif

protected:
	DECLARE_MESSAGE_MAP()
[!if CREATABLE]
	DECLARE_OLECREATE([!output CLASS_NAME])
[!endif]
[!if AUTOMATION || CREATABLE]
	DECLARE_DISPATCH_MAP()
	DECLARE_INTERFACE_MAP()
[!endif]
};


