// [!output CONTROL_IMPL] : Implementierung der [!output CONTROL_CLASS]-ActiveX-Steuerelementklasse.

#include "stdafx.h"
#include "[!output PROJECT_NAME].h"
#include "[!output CONTROL_HEADER]"
#include "[!output PROPERTY_PAGE_HEADER]"
#include "afxdialogex.h"

#ifdef _DEBUG
#define new DEBUG_NEW
#endif

IMPLEMENT_DYNCREATE([!output CONTROL_CLASS], COleControl)

// Meldungszuordnung

BEGIN_MESSAGE_MAP([!output CONTROL_CLASS], COleControl)
[!if SUBCLASS_WINDOW]
	ON_MESSAGE(OCM_COMMAND, &[!output CONTROL_CLASS]::OnOcmCommand)
[!endif]
[!if INSERTABLE]
	ON_OLEVERB(AFX_IDS_VERB_EDIT, OnEdit)
[!endif]
	ON_OLEVERB(AFX_IDS_VERB_PROPERTIES, OnProperties)
END_MESSAGE_MAP()

// Dispatchzuordnung

BEGIN_DISPATCH_MAP([!output CONTROL_CLASS], COleControl)
[!if ASYNC_PROPERTY_LOAD]
	DISP_STOCKPROP_READYSTATE()
[!endif]
[!if ABOUT_BOX]
	DISP_FUNCTION_ID([!output CONTROL_CLASS], "AboutBox", DISPID_ABOUTBOX, AboutBox, VT_EMPTY, VTS_NONE)
[!endif]
END_DISPATCH_MAP()

// Ereigniszuordnung

BEGIN_EVENT_MAP([!output CONTROL_CLASS], COleControl)
[!if ASYNC_PROPERTY_LOAD]
	EVENT_STOCK_READYSTATECHANGE()
[!endif]
END_EVENT_MAP()

// Eigenschaftenseiten

// TODO: Mehr Eigenschaftenseiten einfügen, als erforderlich sind.  Nicht vergessen, den Zähler zu erhöhen!
BEGIN_PROPPAGEIDS([!output CONTROL_CLASS], 1)
	PROPPAGEID([!output PROPERTY_PAGE_CLASS]::guid)
END_PROPPAGEIDS([!output CONTROL_CLASS])

// Klassenfactory und GUID initialisieren

[!if CONTROL_TYPE_ID_SET]
IMPLEMENT_OLECREATE_EX([!output CONTROL_CLASS], "[!output CONTROL_TYPE_ID]",
	[!output CONTROL_CLSID_IMPLEMENT_OLECREATE_FORMAT])
[!else]
IMPLEMENT_OLECREATE_NOREGNAME([!output CONTROL_CLASS],
	[!output CONTROL_CLSID_IMPLEMENT_OLECREATE_FORMAT])
[!endif]

// ID und Version der Typbibliothek

IMPLEMENT_OLETYPELIB([!output CONTROL_CLASS], _tlid, _wVerMajor, _wVerMinor)

// Schnittstellen-IDs

const IID IID_D[!output SAFE_PROJECT_IDENTIFIER_NAME] = [!output PRIMARY_IID_STATIC_CONST_GUID_FORMAT];
const IID IID_D[!output SAFE_PROJECT_IDENTIFIER_NAME]Events = [!output EVENT_IID_STATIC_CONST_GUID_FORMAT];

// Informationen über den Steuerelementtyp

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
// Fügt Systemregistrierungseinträge für [!output CONTROL_CLASS] hinzu, oder entfernt sie.

BOOL [!output CONTROL_CLASS]::[!output CONTROL_CLASS]Factory::UpdateRegistry(BOOL bRegister)
{
	// TODO: Überprüfen, ob Ihr Steuerelement den Threadregeln nach dem Apartment-Modell entspricht.
	// Weitere Informationen finden Sie unter MFC TechNote 64.
	// Falls Ihr Steuerelement nicht den Regeln nach dem Apartment-Modell entspricht,
	// müssen Sie den nachfolgenden Code ändern, indem Sie den 6. Parameter von
[!if INSERTABLE]
	// afxRegInsertable | afxRegApartmentThreading in afxRegInsertable ändern.
[!else]
	// afxRegApartmentThreading in 0 ändern.
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

// Lizenzierungszeichenfolgen

static const TCHAR _szLicFileName[] = _T("[!output PROJECT_NAME].lic");
static const WCHAR _szLicString[] = L"Copyright (c) [!output YEAR] [!output COMPANY_NAME]";

// [!output CONTROL_CLASS]::[!output CONTROL_CLASS]Factory::VerifyUserLicense -
// Überprüft, ob eine Benutzerlizenz vorhanden ist.

BOOL [!output CONTROL_CLASS]::[!output CONTROL_CLASS]Factory::VerifyUserLicense()
{
	return AfxVerifyLicFile(AfxGetInstanceHandle(), _szLicFileName,
		_szLicString);
}

// [!output CONTROL_CLASS]::[!output CONTROL_CLASS]Factory::GetLicenseKey -
// Gibt einen Laufzeitlizenzierungsschlüssel zurück.

BOOL [!output CONTROL_CLASS]::[!output CONTROL_CLASS]Factory::GetLicenseKey(DWORD dwReserved,
	BSTR *pbstrKey)
{
	if (pbstrKey == NULL)
		return FALSE;

	*pbstrKey = SysAllocString(_szLicString);
	return (*pbstrKey != NULL);
}

[!endif]

// [!output CONTROL_CLASS]::[!output CONTROL_CLASS] - Konstruktor

[!output CONTROL_CLASS]::[!output CONTROL_CLASS]()
{
	InitializeIIDs(&IID_D[!output SAFE_PROJECT_IDENTIFIER_NAME], &IID_D[!output SAFE_PROJECT_IDENTIFIER_NAME]Events);
[!if SIMPLE_FRAME]

	EnableSimpleFrame();
[!endif]
[!if ASYNC_PROPERTY_LOAD]

	m_lReadyState = READYSTATE_LOADING;
	// TODO: InternalSetReadyState aufrufen, wenn sich der Bereitschaftszustand (readystate) ändert.
[!endif]
	// TODO: Daten der Steuerelementinstanz hier initialisieren.
}

// [!output CONTROL_CLASS]::~[!output CONTROL_CLASS] - Destruktor

[!output CONTROL_CLASS]::~[!output CONTROL_CLASS]()
{
	// TODO: Daten der Steuerelementinstanz hier bereinigen.
}

// [!output CONTROL_CLASS]::OnDraw - Zeichnungsfunktion

void [!output CONTROL_CLASS]::OnDraw(
			CDC* pdc, const CRect& rcBounds, const CRect& /* rcInvalid */)
{
	if (!pdc)
		return;

[!if SUBCLASS_WINDOW]
	DoSuperclassPaint(pdc, rcBounds);
[!else]
	// TODO: Folgenden Code durch eigene Zeichenfunktion ersetzen.
	pdc->FillRect(rcBounds, CBrush::FromHandle((HBRUSH)GetStockObject(WHITE_BRUSH)));
	pdc->Ellipse(rcBounds);
[!endif]
[!if OPTIMIZED_DRAW]

	if (!IsOptimizedDraw())
	{
		// Der Container unterstützt kein optimiertes Zeichnen.

		// TODO: Falls Sie GDI-Objekte im Gerätekontext *pdc ausgewählt haben,
		//		stellen Sie hier die zuvor ausgewählten Objekte wieder her.
	}
[!endif]
}

// [!output CONTROL_CLASS]::DoPropExchange - Beibehaltungsunterstützung

void [!output CONTROL_CLASS]::DoPropExchange(CPropExchange* pPX)
{
	ExchangeVersion(pPX, MAKELONG(_wVerMinor, _wVerMajor));
	COleControl::DoPropExchange(pPX);

	// TODO: PX_-Funktionen für jede persistente benutzerdefinierte Eigenschaft aufrufen.
}

[!if WINDOWLESS || UNCLIPPED_DEVICE_CONTEXT || FLICKER_FREE || MOUSE_NOTIFICATIONS || OPTIMIZED_DRAW]

// [!output CONTROL_CLASS]::GetControlFlags -
// Flags zum Anpassen der MFC-Implementierung von ActiveX-Steuerelementen.
//
DWORD [!output CONTROL_CLASS]::GetControlFlags()
{
	DWORD dwFlags = COleControl::GetControlFlags();

[!if UNCLIPPED_DEVICE_CONTEXT]
	// Die Ausgabe des Steuerelements wird nicht abgeschnitten.
	// Das Steuerelement stellt sicher, dass es nicht außerhalb des
	// Clientrechtecks zeichnet.
	dwFlags &= ~clipPaintDC;
[!endif]
[!if WINDOWLESS]

	// Das Steuerelement lässt sich aktivieren, ohne ein Fenster zu erstellen.
	// TODO: Beim Schreiben der Behandlungsroutine für Meldungen des Steuerelements
	//		zunächst prüfen, ob die Membervariable m_hWnd
	//		einen Wert ungleich NULL hat.
	dwFlags |= windowlessActivate;
[!endif]
[!if FLICKER_FREE]

	// Das Steuerelement wird nicht neu gezeichnet, wenn es zwischen
	// aktivem und inaktivem Zustand wechselt.
	dwFlags |= noFlickerActivate;
[!endif]
[!if MOUSE_NOTIFICATIONS]

	// Das Steuerelement kann Benachrichtigungen von der Maus erhalten, wenn es inaktiv ist.
	// TODO: Beim Schreiben von Handlern für WM_SETCURSOR und WM_MOUSEMOVE
	//		zunächst prüfen, ob die Membervariable m_hWnd
	//		einen Wert ungleich NULL hat.
	dwFlags |= pointerInactive;
[!endif]
[!if OPTIMIZED_DRAW]

	// Die OnDraw-Methode eines Steuerelements lässt sich optimieren, indem
	// die ursprünglichen GDI-Objekte für den Gerätekontext nicht wiederhergestellt werden.
	dwFlags |= canOptimizeDraw;
[!endif]
	return dwFlags;
}

[!endif]

// [!output CONTROL_CLASS]::OnResetState - Setzt das Steuerelement auf den Standardzustand zurück.

void [!output CONTROL_CLASS]::OnResetState()
{
	COleControl::OnResetState();  // Setzt die Standards zurück, die in DoPropExchange gefunden wurden.

	// TODO: Andere Steuerelementzustände hier zurücksetzen.
}

[!if ABOUT_BOX]

// [!output CONTROL_CLASS]::AboutBox - Zeigt ein Infofeld an.

void [!output CONTROL_CLASS]::AboutBox()
{
	CDialogEx dlgAbout(IDD_ABOUTBOX_[!output UPPER_CASE_SAFE_PROJECT_IDENTIFIER_NAME]);
	dlgAbout.DoModal();
}

[!endif]
[!if SUBCLASS_WINDOW]

// [!output CONTROL_CLASS]::PreCreateWindow - Ändert Parameter für CreateWindowEx.

BOOL [!output CONTROL_CLASS]::PreCreateWindow(CREATESTRUCT& cs)
{
[!if SUBCLASS_WINDOW]
	cs.lpszClass = _T("[!output WINDOW_CLASS]");
[!else]
	// TODO: Namen des Fensters eintragen, für das eine Unterklasse definiert werden soll.
	cs.lpszClass = _T("");
[!endif]
	return COleControl::PreCreateWindow(cs);
}

// [!output CONTROL_CLASS]::IsSubclassedControl - Dies ist ein Unterklassen-Steuerelement.

BOOL [!output CONTROL_CLASS]::IsSubclassedControl()
{
	return TRUE;
}

// [!output CONTROL_CLASS]::OnOcmCommand - Verarbeitet Befehlsmeldungen.

LRESULT [!output CONTROL_CLASS]::OnOcmCommand(WPARAM wParam, LPARAM lParam)
{
	WORD wNotifyCode = HIWORD(wParam);

	// TODO: Hier auf wNotifyCode schalten.

	return 0;
}

[!endif]

// [!output CONTROL_CLASS]-Meldungshandler
