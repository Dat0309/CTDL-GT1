#pragma once

#ifdef _WIN32_WCE
#error "Windows CE 不支援 CHtmlView。"
#endif 

// [!output CLASS_NAME] html 檢視

class [!output CLASS_NAME] : public CHtmlView
{
	DECLARE_DYNCREATE([!output CLASS_NAME])

protected:
	[!output CLASS_NAME]();           // 動態建立所使用的保護建構函式
	virtual ~[!output CLASS_NAME]();

public:
#ifdef _DEBUG
	virtual void AssertValid() const;
	virtual void Dump(CDumpContext& dc) const;
#endif
[!if AUTOMATION || CREATABLE]
	virtual void OnFinalRelease();
[!endif]

protected:
	virtual void DoDataExchange(CDataExchange* pDX);    // DDX/DDV 支援

	DECLARE_MESSAGE_MAP()
[!if CREATABLE]
	DECLARE_OLECREATE([!output CLASS_NAME])
[!endif]
[!if AUTOMATION || CREATABLE]
	DECLARE_DISPATCH_MAP()
	DECLARE_INTERFACE_MAP()
[!endif]
};


