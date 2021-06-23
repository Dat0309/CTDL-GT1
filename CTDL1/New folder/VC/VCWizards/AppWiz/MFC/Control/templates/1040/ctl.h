#pragma once

// [!output CONTROL_HEADER] : dichiarazione della classe di controlli ActiveX [!output CONTROL_CLASS].


// [!output CONTROL_CLASS] : vedere [!output CONTROL_IMPL] per l'implementazione.

class [!output CONTROL_CLASS] : public COleControl
{
	DECLARE_DYNCREATE([!output CONTROL_CLASS])

// Costruttore
public:
	[!output CONTROL_CLASS]();

// Override
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

// Implementazione
protected:
	~[!output CONTROL_CLASS]();

[!if RUNTIME_LICENSE]
	BEGIN_OLEFACTORY([!output CONTROL_CLASS])        // Class factory e GUID
		virtual BOOL VerifyUserLicense();
		virtual BOOL GetLicenseKey(DWORD, BSTR *);
	END_OLEFACTORY([!output CONTROL_CLASS])

[!else]
	DECLARE_OLECREATE_EX([!output CONTROL_CLASS])    // Class factory e GUID
[!endif]
	DECLARE_OLETYPELIB([!output CONTROL_CLASS])      // GetTypeInfo
	DECLARE_PROPPAGEIDS([!output CONTROL_CLASS])     // ID di pagine delle proprietà
	DECLARE_OLECTLTYPE([!output CONTROL_CLASS])		// Nome tipo e stato altre funzionalità

[!if SUBCLASS_WINDOW]
	// Supporto controlli sottoclassati
	BOOL IsSubclassedControl();
	LRESULT OnOcmCommand(WPARAM wParam, LPARAM lParam);

[!endif]
// Mappe messaggi
	DECLARE_MESSAGE_MAP()

// Mappe di invio
	DECLARE_DISPATCH_MAP()
[!if ABOUT_BOX]

	afx_msg void AboutBox();
[!endif]

// Mappe eventi
	DECLARE_EVENT_MAP()

// ID di invio ed eventi
public:
	enum {
	};
};

