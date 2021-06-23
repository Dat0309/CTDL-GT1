#pragma once

// [!output CONTROL_HEADER]: declaración de la clase [!output CONTROL_CLASS] del control ActiveX.


// [!output CONTROL_CLASS]: consultar [!output CONTROL_IMPL] para realizar la implementación.

class [!output CONTROL_CLASS] : public COleControl
{
	DECLARE_DYNCREATE([!output CONTROL_CLASS])

// Constructor
public:
	[!output CONTROL_CLASS]();

// Reemplazos
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

// Implementación
protected:
	~[!output CONTROL_CLASS]();

[!if RUNTIME_LICENSE]
	BEGIN_OLEFACTORY([!output CONTROL_CLASS])        // Generador y guid de clases
		virtual BOOL VerifyUserLicense();
		virtual BOOL GetLicenseKey(DWORD, BSTR *);
	END_OLEFACTORY([!output CONTROL_CLASS])

[!else]
	DECLARE_OLECREATE_EX([!output CONTROL_CLASS])    // Generador y guid de clases
[!endif]
	DECLARE_OLETYPELIB([!output CONTROL_CLASS])      // GetTypeInfo
	DECLARE_PROPPAGEIDS([!output CONTROL_CLASS])     // Identificadores de la página de propiedades
	DECLARE_OLECTLTYPE([!output CONTROL_CLASS])		// Escribir el nombre y los diversos estados

[!if SUBCLASS_WINDOW]
	// Compatibilidad con controles de los que se crean subclases
	BOOL IsSubclassedControl();
	LRESULT OnOcmCommand(WPARAM wParam, LPARAM lParam);

[!endif]
// Mapas de mensajes
	DECLARE_MESSAGE_MAP()

// Mapas de envío
	DECLARE_DISPATCH_MAP()
[!if ABOUT_BOX]

	afx_msg void AboutBox();
[!endif]

// Mapas de eventos
	DECLARE_EVENT_MAP()

// Identificadores de envío y de eventos
public:
	enum {
	};
};

