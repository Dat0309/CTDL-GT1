#pragma once

// [!output CONTROL_HEADER] : Declaração da classe de Controle ActiveX [!output CONTROL_CLASS].


// [!output CONTROL_CLASS] : Olhe [!output CONTROL_IMPL] para implementação.

class [!output CONTROL_CLASS] : public COleControl
{
	DECLARE_DYNCREATE([!output CONTROL_CLASS])

// Construtor
public:
	[!output CONTROL_CLASS]();

// Substitui
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

// Implementação
protected:
	~[!output CONTROL_CLASS]();

[!if RUNTIME_LICENSE]
	BEGIN_OLEFACTORY([!output CONTROL_CLASS])        // Fábrica de classes e GUID
		virtual BOOL VerifyUserLicense();
		virtual BOOL GetLicenseKey(DWORD, BSTR *);
	END_OLEFACTORY([!output CONTROL_CLASS])

[!else]
	DECLARE_OLECREATE_EX([!output CONTROL_CLASS])    // Fábrica de classes e GUID
[!endif]
	DECLARE_OLETYPELIB([!output CONTROL_CLASS])      // GetTypeInfo
	DECLARE_PROPPAGEIDS([!output CONTROL_CLASS])     // IDs de páginas de propriedades
	DECLARE_OLECTLTYPE([!output CONTROL_CLASS])		// Digite nome e status misc

[!if SUBCLASS_WINDOW]
	// Suporte a controle de uma sub-classe
	BOOL IsSubclassedControl();
	LRESULT OnOcmCommand(WPARAM wParam, LPARAM lParam);

[!endif]
// Mapas de Mensagens
	DECLARE_MESSAGE_MAP()

// Mapas de Envios
	DECLARE_DISPATCH_MAP()
[!if ABOUT_BOX]

	afx_msg void AboutBox();
[!endif]

// Mapa de Eventos
	DECLARE_EVENT_MAP()

// IDs envios e eventos
public:
	enum {
	};
};

