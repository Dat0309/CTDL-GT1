#pragma once

#ifdef _WIN32_WCE
#error "Windows CE에서는 CMDIChildWnd가 지원되지 않습니다."
#endif 

// 분할자가 있는 [!output CLASS_NAME] 프레임입니다.

class [!output CLASS_NAME] : public [!output BASE_CLASS_SAFE]
{
	DECLARE_DYNCREATE([!output CLASS_NAME])
protected:
	[!output CLASS_NAME]();           // 동적 만들기에 사용되는 protected 생성자입니다.
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


