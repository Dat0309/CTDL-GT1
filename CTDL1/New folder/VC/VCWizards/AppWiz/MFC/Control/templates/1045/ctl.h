#pragma once

// [!output CONTROL_HEADER]: Deklaracja klasy formantu ActiveX [!output CONTROL_CLASS].


// [!output CONTROL_CLASS]: Aby uzyska� implementacj�, zobacz [!output CONTROL_IMPL].

class [!output CONTROL_CLASS] : public COleControl
{
	DECLARE_DYNCREATE([!output CONTROL_CLASS])

// Konstruktor
public:
	[!output CONTROL_CLASS]();

// Zast�puje
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

// Implementacja
protected:
	~[!output CONTROL_CLASS]();

[!if RUNTIME_LICENSE]
	BEGIN_OLEFACTORY([!output CONTROL_CLASS])        // Fabryka klas i identyfikator GUID
		virtual BOOL VerifyUserLicense();
		virtual BOOL GetLicenseKey(DWORD, BSTR *);
	END_OLEFACTORY([!output CONTROL_CLASS])

[!else]
	DECLARE_OLECREATE_EX([!output CONTROL_CLASS])    // Fabryka klas i identyfikator GUID
[!endif]
	DECLARE_OLETYPELIB([!output CONTROL_CLASS])      // GetTypeInfo
	DECLARE_PROPPAGEIDS([!output CONTROL_CLASS])     // Identyfikatory stron w�a�ciwo�ci
	DECLARE_OLECTLTYPE([!output CONTROL_CLASS])		// Wpisz nazw� i stan r�nych

[!if SUBCLASS_WINDOW]
	// Obs�uga formant�w b�d�cych podklasami
	BOOL IsSubclassedControl();
	LRESULT OnOcmCommand(WPARAM wParam, LPARAM lParam);

[!endif]
// Mapy wiadomo�ci
	DECLARE_MESSAGE_MAP()

// Mapy wysy�ania
	DECLARE_DISPATCH_MAP()
[!if ABOUT_BOX]

	afx_msg void AboutBox();
[!endif]

// Mapy zdarze�
	DECLARE_EVENT_MAP()

// Identyfikatory wysy�ania i zdarzenia
public:
	enum {
	};
};

