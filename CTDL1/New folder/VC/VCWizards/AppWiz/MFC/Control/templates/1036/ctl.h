#pragma once

// [!output CONTROL_HEADER] : déclaration de la classe du contrôle ActiveX [!output CONTROL_CLASS].


// [!output CONTROL_CLASS] : consultez [!output CONTROL_IMPL] pour l'implémentation.

class [!output CONTROL_CLASS] : public COleControl
{
	DECLARE_DYNCREATE([!output CONTROL_CLASS])

// Constructeur
public:
	[!output CONTROL_CLASS]();

// Substitutions
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

// Implémentation
protected:
	~[!output CONTROL_CLASS]();

[!if RUNTIME_LICENSE]
	BEGIN_OLEFACTORY([!output CONTROL_CLASS])        // Fabrique de classes et guid
		virtual BOOL VerifyUserLicense();
		virtual BOOL GetLicenseKey(DWORD, BSTR *);
	END_OLEFACTORY([!output CONTROL_CLASS])

[!else]
	DECLARE_OLECREATE_EX([!output CONTROL_CLASS])    // Fabrique de classes et guid
[!endif]
	DECLARE_OLETYPELIB([!output CONTROL_CLASS])      // GetTypeInfo
	DECLARE_PROPPAGEIDS([!output CONTROL_CLASS])     // ID de page de propriétés
	DECLARE_OLECTLTYPE([!output CONTROL_CLASS])		// Nom de type et état divers

[!if SUBCLASS_WINDOW]
	// Prise en charge du contrôle sous-classé
	BOOL IsSubclassedControl();
	LRESULT OnOcmCommand(WPARAM wParam, LPARAM lParam);

[!endif]
// Tables des messages
	DECLARE_MESSAGE_MAP()

// Tables de dispatch
	DECLARE_DISPATCH_MAP()
[!if ABOUT_BOX]

	afx_msg void AboutBox();
[!endif]

// Tables d'événements
	DECLARE_EVENT_MAP()

// ID de dispatch et d'événement
public:
	enum {
	};
};

