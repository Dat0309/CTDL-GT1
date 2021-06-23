#pragma once

// [!output CONTROL_HEADER] : Declaration of the [!output CONTROL_CLASS] ActiveX Control class.


// [!output CONTROL_CLASS] : See [!output CONTROL_IMPL] for implementation.

class [!output CONTROL_CLASS] : public COleControl
{
	DECLARE_DYNCREATE([!output CONTROL_CLASS])

// Constructor
public:
	[!output CONTROL_CLASS]();

// Overrides
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

// Implementation
protected:
	~[!output CONTROL_CLASS]();

[!if RUNTIME_LICENSE]
	BEGIN_OLEFACTORY([!output CONTROL_CLASS])        // Class factory and guid
		virtual BOOL VerifyUserLicense();
		virtual BOOL GetLicenseKey(DWORD, BSTR *);
	END_OLEFACTORY([!output CONTROL_CLASS])

[!else]
	DECLARE_OLECREATE_EX([!output CONTROL_CLASS])    // Class factory and guid
[!endif]
	DECLARE_OLETYPELIB([!output CONTROL_CLASS])      // GetTypeInfo
	DECLARE_PROPPAGEIDS([!output CONTROL_CLASS])     // Property page IDs
	DECLARE_OLECTLTYPE([!output CONTROL_CLASS])		// Type name and misc status

[!if SUBCLASS_WINDOW]
	// Subclassed control support
	BOOL IsSubclassedControl();
	LRESULT OnOcmCommand(WPARAM wParam, LPARAM lParam);

[!endif]
// Message maps
	DECLARE_MESSAGE_MAP()

// Dispatch maps
	DECLARE_DISPATCH_MAP()
[!if ABOUT_BOX]

	afx_msg void AboutBox();
[!endif]

// Event maps
	DECLARE_EVENT_MAP()

// Dispatch and event IDs
public:
	enum {
	};
};

