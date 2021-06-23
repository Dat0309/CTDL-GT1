// [!output CONTROL_IMPL]: implementación de la clase del control ActiveX de [!output CONTROL_CLASS].

#include "stdafx.h"
#include "[!output PROJECT_NAME].h"
#include "[!output CONTROL_HEADER]"
#include "[!output PROPERTY_PAGE_HEADER]"
#include "afxdialogex.h"

#ifdef _DEBUG
#define new DEBUG_NEW
#endif

IMPLEMENT_DYNCREATE([!output CONTROL_CLASS], COleControl)

// Mapa de mensajes

BEGIN_MESSAGE_MAP([!output CONTROL_CLASS], COleControl)
[!if SUBCLASS_WINDOW]
	ON_MESSAGE(OCM_COMMAND, &[!output CONTROL_CLASS]::OnOcmCommand)
[!endif]
[!if INSERTABLE]
	ON_OLEVERB(AFX_IDS_VERB_EDIT, OnEdit)
[!endif]
	ON_OLEVERB(AFX_IDS_VERB_PROPERTIES, OnProperties)
END_MESSAGE_MAP()

// Mapa de envíos

BEGIN_DISPATCH_MAP([!output CONTROL_CLASS], COleControl)
[!if ASYNC_PROPERTY_LOAD]
	DISP_STOCKPROP_READYSTATE()
[!endif]
[!if ABOUT_BOX]
	DISP_FUNCTION_ID([!output CONTROL_CLASS], "AboutBox", DISPID_ABOUTBOX, AboutBox, VT_EMPTY, VTS_NONE)
[!endif]
END_DISPATCH_MAP()

// Mapa de eventos

BEGIN_EVENT_MAP([!output CONTROL_CLASS], COleControl)
[!if ASYNC_PROPERTY_LOAD]
	EVENT_STOCK_READYSTATECHANGE()
[!endif]
END_EVENT_MAP()

// Páginas de propiedades

// TODO: agregar más páginas de propiedades según se necesiten.  Acuérdese de incrementar el recuento.
BEGIN_PROPPAGEIDS([!output CONTROL_CLASS], 1)
	PROPPAGEID([!output PROPERTY_PAGE_CLASS]::guid)
END_PROPPAGEIDS([!output CONTROL_CLASS])

// Inicializar el generador de clases y el guid

[!if CONTROL_TYPE_ID_SET]
IMPLEMENT_OLECREATE_EX([!output CONTROL_CLASS], "[!output CONTROL_TYPE_ID]",
	[!output CONTROL_CLSID_IMPLEMENT_OLECREATE_FORMAT])
[!else]
IMPLEMENT_OLECREATE_NOREGNAME([!output CONTROL_CLASS],
	[!output CONTROL_CLSID_IMPLEMENT_OLECREATE_FORMAT])
[!endif]

// Id. y versión de la biblioteca de tipos

IMPLEMENT_OLETYPELIB([!output CONTROL_CLASS], _tlid, _wVerMajor, _wVerMinor)

// Identificadores de interfaz

const IID IID_D[!output SAFE_PROJECT_IDENTIFIER_NAME] = [!output PRIMARY_IID_STATIC_CONST_GUID_FORMAT];
const IID IID_D[!output SAFE_PROJECT_IDENTIFIER_NAME]Events = [!output EVENT_IID_STATIC_CONST_GUID_FORMAT];

// Información del tipo de control

static const DWORD _dw[!output SAFE_PROJECT_IDENTIFIER_NAME]OleMisc =
[!if SIMPLE_FRAME]
	OLEMISC_SIMPLEFRAME |
[!endif]
[!if INVISIBLE_AT_RUNTIME]
	OLEMISC_INVISIBLEATRUNTIME |
[!endif]
[!if ACTIVATE_WHEN_VISIBLE]
	OLEMISC_ACTIVATEWHENVISIBLE |
[!if MOUSE_NOTIFICATIONS]
	OLEMISC_IGNOREACTIVATEWHENVISIBLE |
[!endif]
[!endif]
	OLEMISC_SETCLIENTSITEFIRST |
	OLEMISC_INSIDEOUT |
	OLEMISC_CANTLINKINSIDE |
	OLEMISC_RECOMPOSEONRESIZE;

IMPLEMENT_OLECTLTYPE([!output CONTROL_CLASS], IDS_[!output UPPER_CASE_SAFE_PROJECT_IDENTIFIER_NAME], _dw[!output SAFE_PROJECT_IDENTIFIER_NAME]OleMisc)

// [!output CONTROL_CLASS]::[!output CONTROL_CLASS]Factory::UpdateRegistry -
// Agrega o quita entradas del Registro del sistema de [!output CONTROL_CLASS]

BOOL [!output CONTROL_CLASS]::[!output CONTROL_CLASS]Factory::UpdateRegistry(BOOL bRegister)
{
	// TODO: comprobar que el control cumple las normas de subprocesamiento de modelo apartamento.
	// Consulte la nota técnica 64 de MFC para obtener más información.
	// Si el control no cumple las normas de modelo apartamento,
	// modifique el siguiente código cambiando el sexto parámetro de
[!if INSERTABLE]
	// afxRegInsertable | afxRegApartmentThreading a afxRegInsertable.
[!else]
	// afxRegApartmentThreading a 0.
[!endif]

	if (bRegister)
		return AfxOleRegisterControlClass(
			AfxGetInstanceHandle(),
			m_clsid,
			m_lpszProgID,
			IDS_[!output UPPER_CASE_SAFE_PROJECT_IDENTIFIER_NAME],
			IDB_[!output UPPER_CASE_SAFE_PROJECT_IDENTIFIER_NAME],
[!if INSERTABLE]
			afxRegInsertable | afxRegApartmentThreading,
[!else]
			afxRegApartmentThreading,
[!endif]
			_dw[!output SAFE_PROJECT_IDENTIFIER_NAME]OleMisc,
			_tlid,
			_wVerMajor,
			_wVerMinor);
	else
		return AfxOleUnregisterClass(m_clsid, m_lpszProgID);
}

[!if RUNTIME_LICENSE]

// Cadenas del otorgamiento de licencia

static const TCHAR _szLicFileName[] = _T("[!output PROJECT_NAME].lic");
static const WCHAR _szLicString[] = L"Copyright (c) [!output YEAR] [!output COMPANY_NAME]";

// [!output CONTROL_CLASS]::[!output CONTROL_CLASS]Factory::VerifyUserLicense -
// Comprueba si existe una licencia para el usuario

BOOL [!output CONTROL_CLASS]::[!output CONTROL_CLASS]Factory::VerifyUserLicense()
{
	return AfxVerifyLicFile(AfxGetInstanceHandle(), _szLicFileName,
		_szLicString);
}

// [!output CONTROL_CLASS]::[!output CONTROL_CLASS]Factory::GetLicenseKey -
// Devuelve una clave de licencia en tiempo de ejecución

BOOL [!output CONTROL_CLASS]::[!output CONTROL_CLASS]Factory::GetLicenseKey(DWORD dwReserved,
	BSTR *pbstrKey)
{
	if (pbstrKey == NULL)
		return FALSE;

	*pbstrKey = SysAllocString(_szLicString);
	return (*pbstrKey != NULL);
}

[!endif]

// [!output CONTROL_CLASS]::[!output CONTROL_CLASS]: constructor

[!output CONTROL_CLASS]::[!output CONTROL_CLASS]()
{
	InitializeIIDs(&IID_D[!output SAFE_PROJECT_IDENTIFIER_NAME], &IID_D[!output SAFE_PROJECT_IDENTIFIER_NAME]Events);
[!if SIMPLE_FRAME]

	EnableSimpleFrame();
[!endif]
[!if ASYNC_PROPERTY_LOAD]

	m_lReadyState = READYSTATE_LOADING;
	// TODO: llamar a InternalSetReadyState cuando readystate cambie.
[!endif]
	// TODO: inicializar aquí los datos de instancias del control.
}

// [!output CONTROL_CLASS]::~[!output CONTROL_CLASS]: destructor

[!output CONTROL_CLASS]::~[!output CONTROL_CLASS]()
{
	// TODO: limpiar aquí los datos de instancias del control.
}

// [!output CONTROL_CLASS]::OnDraw: función para dibujar

void [!output CONTROL_CLASS]::OnDraw(
			CDC* pdc, const CRect& rcBounds, const CRect& /* rcInvalid */)
{
	if (!pdc)
		return;

[!if SUBCLASS_WINDOW]
	DoSuperclassPaint(pdc, rcBounds);
[!else]
	// TODO: reemplazar el siguiente código con el código de dibujo propio.
	pdc->FillRect(rcBounds, CBrush::FromHandle((HBRUSH)GetStockObject(WHITE_BRUSH)));
	pdc->Ellipse(rcBounds);
[!endif]
[!if OPTIMIZED_DRAW]

	if (!IsOptimizedDraw())
	{
		// El contenedor no admite dibujos optimizados.

		// TODO: si seleccionó cualquier objeto GDI en el contexto de dispositivo *pdc,
		//		restaure aquí los objetos seleccionados anteriormente.
	}
[!endif]
}

// [!output CONTROL_CLASS]::DoPropExchange:  compatible con la persistencia

void [!output CONTROL_CLASS]::DoPropExchange(CPropExchange* pPX)
{
	ExchangeVersion(pPX, MAKELONG(_wVerMinor, _wVerMajor));
	COleControl::DoPropExchange(pPX);

	// TODO: llamar a las funciones PX_ de las propiedades personalizadas persistentes.
}

[!if WINDOWLESS || UNCLIPPED_DEVICE_CONTEXT || FLICKER_FREE || MOUSE_NOTIFICATIONS || OPTIMIZED_DRAW]

// [!output CONTROL_CLASS]::GetControlFlags -
// Marcas para personalizar la implementación de los controles ActiveX de MFC.
//
DWORD [!output CONTROL_CLASS]::GetControlFlags()
{
	DWORD dwFlags = COleControl::GetControlFlags();

[!if UNCLIPPED_DEVICE_CONTEXT]
	// El resultado del control no se está recortando.
	// El control garantiza no dibujar fuera
	// de su rectángulo cliente.
	dwFlags &= ~clipPaintDC;
[!endif]
[!if WINDOWLESS]

	// Se puede activar el control sin crear una ventana.
	// TODO: al escribir los controladores de mensajes del control, evite utilizar
	//		la variable miembro m_hWnd sin antes comprobar que
	//		su valor no es NULL.
	dwFlags |= windowlessActivate;
[!endif]
[!if FLICKER_FREE]

	// No se volverá a dibujar el control al realizar la transición
	// entre estado activo e inactivo.
	dwFlags |= noFlickerActivate;
[!endif]
[!if MOUSE_NOTIFICATIONS]

	// El control recibe notificaciones del mouse cuando está inactivo.
	// TODO: al escribir controladores para WM_SETCURSOR y WM_MOUSEMOVE,
	//		evite utilizar la variable miembro m_hWnd sin antes comprobar
	//		que su valor no es NULL.
	dwFlags |= pointerInactive;
[!endif]
[!if OPTIMIZED_DRAW]

	// El control optimiza el método OnDraw evitando restaurar
	// los objetos GDI originales en el contexto del dispositivo.
	dwFlags |= canOptimizeDraw;
[!endif]
	return dwFlags;
}

[!endif]

// [!output CONTROL_CLASS]::OnResetState: restablecer el control al estado predeterminado

void [!output CONTROL_CLASS]::OnResetState()
{
	COleControl::OnResetState();  // Restablece los valores predeterminados de DoPropExchange

	// TODO: restablecer aquí cualquier otro estado del control.
}

[!if ABOUT_BOX]

// [!output CONTROL_CLASS]::AboutBox: mostrar un cuadro "Acerca de" al usuario

void [!output CONTROL_CLASS]::AboutBox()
{
	CDialogEx dlgAbout(IDD_ABOUTBOX_[!output UPPER_CASE_SAFE_PROJECT_IDENTIFIER_NAME]);
	dlgAbout.DoModal();
}

[!endif]
[!if SUBCLASS_WINDOW]

// [!output CONTROL_CLASS]::PreCreateWindow: modificar los parámetros de CreateWindowEx

BOOL [!output CONTROL_CLASS]::PreCreateWindow(CREATESTRUCT& cs)
{
[!if SUBCLASS_WINDOW]
	cs.lpszClass = _T("[!output WINDOW_CLASS]");
[!else]
	// TODO: proporcionar el nombre de la clase de ventana de la que se van a crear subclases.
	cs.lpszClass = _T("");
[!endif]
	return COleControl::PreCreateWindow(cs);
}

// [!output CONTROL_CLASS]::IsSubclassedControl: control del que se crean subclases

BOOL [!output CONTROL_CLASS]::IsSubclassedControl()
{
	return TRUE;
}

// [!output CONTROL_CLASS]::OnOcmCommand: controlar mensajes de comandos

LRESULT [!output CONTROL_CLASS]::OnOcmCommand(WPARAM wParam, LPARAM lParam)
{
	WORD wNotifyCode = HIWORD(wParam);

	// TODO: activar wNotifyCode aquí.

	return 0;
}

[!endif]

// Controladores de mensaje de [!output CONTROL_CLASS]
