#pragma once

#ifdef _WIN32_WCE
#error "CMDIChildWnd is not supported for Windows CE."
#endif 

// [!output CLASS_NAME] frame with splitter

class [!output CLASS_NAME] : public [!output BASE_CLASS_SAFE]
{
	DECLARE_DYNCREATE([!output CLASS_NAME])
protected:
	[!output CLASS_NAME]();           // protected constructor used by dynamic creation
	virtual ~[!output CLASS_NAME]();

	CSplitterWnd m_wndSplitter;
[!if AUTOMATION || CREATABLE]

public:
	virtual void OnFinalRelease();
[!endif]

protected:
	virtual BOOL OnCreateClient(LPCREATESTRUCT lpcs, CCreateContext* pContext);

	DECLARE_MESSAGE_MAP()
[!if CREATABLE]
	DECLARE_OLECREATE([!output CLASS_NAME])
[!endif]
[!if AUTOMATION || CREATABLE]
	DECLARE_DISPATCH_MAP()
	DECLARE_INTERFACE_MAP()
[!endif]
};


