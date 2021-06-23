#pragma once

// [!output CONTROL_HEADER] : [!output CONTROL_CLASS] ActiveX 控制項類別的宣告。


// [!output CONTROL_CLASS] : 相關實作請參閱 [!output CONTROL_IMPL]。

class [!output CONTROL_CLASS] : public COleControl
{
	DECLARE_DYNCREATE([!output CONTROL_CLASS])

// 建構函式
public:
	[!output CONTROL_CLASS]();

// 覆寫
public:
	virtual void OnDraw(CDC* pdc, const CRect& rcBounds, const CRect& rcInvalid);
[!if SUBCLASS_WINDOW]
	virtual BOOL PreCreateWindow(CREATESTRUCT& cs);
[!endif]
	virtual void DoPropExchange(CPropExchange* pPX);
	virtual void OnResetState();
[!if WINDOWLESS || UNCLIPPED_DEVICE_CONTEXT || FLICKER_FREE || MOUSE_NOTIFICATIONS || OPTIMIZED_DRAW]
	virtual DWORD GetControlFlags();
[!endif]

// 程式碼實作
protected:
	~[!output CONTROL_CLASS]();

[!if RUNTIME_LICENSE]
	BEGIN_OLEFACTORY([!output CONTROL_CLASS])        // Class Factory 和 GUID
		virtual BOOL VerifyUserLicense();
		virtual BOOL GetLicenseKey(DWORD, BSTR *);
	END_OLEFACTORY([!output CONTROL_CLASS])

[!else]
	DECLARE_OLECREATE_EX([!output CONTROL_CLASS])    // Class Factory 和 GUID
[!endif]
	DECLARE_OLETYPELIB([!output CONTROL_CLASS])      // GetTypeInfo
	DECLARE_PROPPAGEIDS([!output CONTROL_CLASS])     // 屬性頁 ID
	DECLARE_OLECTLTYPE([!output CONTROL_CLASS])		// 類型名稱及其他狀態

[!if SUBCLASS_WINDOW]
	// 衍生子類別控制項支援
	BOOL IsSubclassedControl();
	LRESULT OnOcmCommand(WPARAM wParam, LPARAM lParam);

[!endif]
// 訊息對應
	DECLARE_MESSAGE_MAP()

// 分派對應
	DECLARE_DISPATCH_MAP()
[!if ABOUT_BOX]

	afx_msg void AboutBox();
[!endif]

// 事件對應
	DECLARE_EVENT_MAP()

// 分派和事件 ID
public:
	enum {
	};
};

