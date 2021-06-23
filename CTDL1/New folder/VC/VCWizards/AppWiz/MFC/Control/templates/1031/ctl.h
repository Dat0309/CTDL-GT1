#pragma once

// [!output CONTROL_HEADER] : Deklaration der [!output CONTROL_CLASS]-ActiveX-Steuerelementklasse.


// [!output CONTROL_CLASS] : Informationen zur Implementierung unter [!output CONTROL_IMPL].

class [!output CONTROL_CLASS] : public COleControl
{
	DECLARE_DYNCREATE([!output CONTROL_CLASS])

// Konstruktor
public:
	[!output CONTROL_CLASS]();

// Überschreibungen
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

// Implementierung
protected:
	~[!output CONTROL_CLASS]();

[!if RUNTIME_LICENSE]
	BEGIN_OLEFACTORY([!output CONTROL_CLASS])        // Klassenfactory und GUID
		virtual BOOL VerifyUserLicense();
		virtual BOOL GetLicenseKey(DWORD, BSTR *);
	END_OLEFACTORY([!output CONTROL_CLASS])

[!else]
	DECLARE_OLECREATE_EX([!output CONTROL_CLASS])    // Klassenfactory und GUID
[!endif]
	DECLARE_OLETYPELIB([!output CONTROL_CLASS])      // GetTypeInfo
	DECLARE_PROPPAGEIDS([!output CONTROL_CLASS])     // Eigenschaftenseiten-IDs
	DECLARE_OLECTLTYPE([!output CONTROL_CLASS])		// Typname und versch. Status

[!if SUBCLASS_WINDOW]
	// Unterstützung von Steuerelementen, die als Unterklassen definiert wurden
	BOOL IsSubclassedControl();
	LRESULT OnOcmCommand(WPARAM wParam, LPARAM lParam);

[!endif]
// Meldungszuordnungstabellen
	DECLARE_MESSAGE_MAP()

// Dispatchzuordnungen
	DECLARE_DISPATCH_MAP()
[!if ABOUT_BOX]

	afx_msg void AboutBox();
[!endif]

// Ereigniszuordnungen
	DECLARE_EVENT_MAP()

// Dispatch- und Ereignis-IDs
public:
	enum {
	};
};

