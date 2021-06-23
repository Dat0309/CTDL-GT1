// [!output CONTROL_IMPL]: Implementacja klasy [!output CONTROL_CLASS] formantu ActiveX.

#include "stdafx.h"
#include "[!output PROJECT_NAME].h"
#include "[!output CONTROL_HEADER]"
#include "[!output PROPERTY_PAGE_HEADER]"
#include "afxdialogex.h"

#ifdef _DEBUG
#define new DEBUG_NEW
#endif

IMPLEMENT_DYNCREATE([!output CONTROL_CLASS], COleControl)

// Mapa wiadomo�ci

BEGIN_MESSAGE_MAP([!output CONTROL_CLASS], COleControl)
[!if SUBCLASS_WINDOW]
	ON_MESSAGE(OCM_COMMAND, &[!output CONTROL_CLASS]::OnOcmCommand)
[!endif]
[!if INSERTABLE]
	ON_OLEVERB(AFX_IDS_VERB_EDIT, OnEdit)
[!endif]
	ON_OLEVERB(AFX_IDS_VERB_PROPERTIES, OnProperties)
END_MESSAGE_MAP()

// Mapa wysy�ania

BEGIN_DISPATCH_MAP([!output CONTROL_CLASS], COleControl)
[!if ASYNC_PROPERTY_LOAD]
	DISP_STOCKPROP_READYSTATE()
[!endif]
[!if ABOUT_BOX]
	DISP_FUNCTION_ID([!output CONTROL_CLASS], "AboutBox", DISPID_ABOUTBOX, AboutBox, VT_EMPTY, VTS_NONE)
[!endif]
END_DISPATCH_MAP()

// Mapa zdarze�

BEGIN_EVENT_MAP([!output CONTROL_CLASS], COleControl)
[!if ASYNC_PROPERTY_LOAD]
	EVENT_STOCK_READYSTATECHANGE()
[!endif]
END_EVENT_MAP()

// Strony w�a�ciwo�ci

// TODO: Dodaj wi�cej strony w�a�ciwo�ci w razie potrzeby.  Pami�taj, aby zwi�kszy� licznik!
BEGIN_PROPPAGEIDS([!output CONTROL_CLASS], 1)
	PROPPAGEID([!output PROPERTY_PAGE_CLASS]::guid)
END_PROPPAGEIDS([!output CONTROL_CLASS])

// Zainicjuj fabryk� klas i identyfikator GUID

[!if CONTROL_TYPE_ID_SET]
IMPLEMENT_OLECREATE_EX([!output CONTROL_CLASS], "[!output CONTROL_TYPE_ID]",
	[!output CONTROL_CLSID_IMPLEMENT_OLECREATE_FORMAT])
[!else]
IMPLEMENT_OLECREATE_NOREGNAME([!output CONTROL_CLASS],
	[!output CONTROL_CLSID_IMPLEMENT_OLECREATE_FORMAT])
[!endif]

// Identyfikator i wersja biblioteki typ�w

IMPLEMENT_OLETYPELIB([!output CONTROL_CLASS], _tlid, _wVerMajor, _wVerMinor)

// Identyfikatory interfejsu

const IID IID_D[!output SAFE_PROJECT_IDENTIFIER_NAME] = [!output PRIMARY_IID_STATIC_CONST_GUID_FORMAT];
const IID IID_D[!output SAFE_PROJECT_IDENTIFIER_NAME]Events = [!output EVENT_IID_STATIC_CONST_GUID_FORMAT];

// Informacje o typie formantu

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
// Dodaje lub usuwa z rejestru systemowego wpisy dotycz�ce [!output CONTROL_CLASS]

BOOL [!output CONTROL_CLASS]::[!output CONTROL_CLASS]Factory::UpdateRegistry(BOOL bRegister)
{
	// TODO: Sprawd�, czy formant jest zgodny z regu�ami modelu w�tkowo�ci typu apartment.
	// Aby uzyska� wi�cej informacji, zobacz uwag� MFC TechNote 64.
	// Je�li formant nie jest zgodny z regu�ami modelu typu apartment,
	// nale�y zmodyfikowa� kod poni�ej, zmieniaj�c 6. parametr z
[!if INSERTABLE]
	// afxRegInsertable | afxRegApartmentThreading na afxRegInsertable.
[!else]
	// afxRegApartmentThreading na 0.
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

// Ci�gi licencjonowania

static const TCHAR _szLicFileName[] = _T("[!output PROJECT_NAME].lic");
static const WCHAR _szLicString[] = L"Copyright (c) [!output YEAR] [!output COMPANY_NAME]";

// [!output CONTROL_CLASS]::[!output CONTROL_CLASS]Factory::VerifyUserLicense -
// Sprawdza, czy istnieje licencja u�ytkownika

BOOL [!output CONTROL_CLASS]::[!output CONTROL_CLASS]Factory::VerifyUserLicense()
{
	return AfxVerifyLicFile(AfxGetInstanceHandle(), _szLicFileName,
		_szLicString);
}

// [!output CONTROL_CLASS]::[!output CONTROL_CLASS]Factory::GetLicenseKey -
// Zwraca klucz licencji �rodowiska uruchomieniowego

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
	// TODO: Wywo�aj InternalSetReadyState, gdy readystate ulegnie zmianie.
[!endif]
	// TODO: W tym miejscu zainicjuj dane wyst�pienia formantu.
}

// [!output CONTROL_CLASS]::~[!output CONTROL_CLASS] - Destruktor

[!output CONTROL_CLASS]::~[!output CONTROL_CLASS]()
{
	// TODO: W tym miejscu wyczy�� dane wyst�pienia formantu.
}

// [!output CONTROL_CLASS]::OnDraw - Funkcja rysuj�ca

void [!output CONTROL_CLASS]::OnDraw(
			CDC* pdc, const CRect& rcBounds, const CRect& /* rcInvalid */)
{
	if (!pdc)
		return;

[!if SUBCLASS_WINDOW]
	DoSuperclassPaint(pdc, rcBounds);
[!else]
	// TODO: Zast�p nast�puj�cy kod swoim w�asnym kodem rysuj�cym.
	pdc->FillRect(rcBounds, CBrush::FromHandle((HBRUSH)GetStockObject(WHITE_BRUSH)));
	pdc->Ellipse(rcBounds);
[!endif]
[!if OPTIMIZED_DRAW]

	if (!IsOptimizedDraw())
	{
		// Kontener nie obs�uguje zoptymalizowanego rysowania.

		// TODO: je�li jakiekolwiek obiekty GDI zosta�y zaznaczone w kontek�cie urz�dzenia *pdc,
		//		w tym miejscu przywr�� wcze�niej wybrane obiekty.
	}
[!endif]
}

// [!output CONTROL_CLASS]::DoPropExchange - Wsparcie trwa�e

void [!output CONTROL_CLASS]::DoPropExchange(CPropExchange* pPX)
{
	ExchangeVersion(pPX, MAKELONG(_wVerMinor, _wVerMajor));
	COleControl::DoPropExchange(pPX);

	// TODO: Wywo�aj funkcje PX_ dla ka�dej trwa�ej w�a�ciwo�ci niestandardowej.
}

[!if WINDOWLESS || UNCLIPPED_DEVICE_CONTEXT || FLICKER_FREE || MOUSE_NOTIFICATIONS || OPTIMIZED_DRAW]

// [!output CONTROL_CLASS]::GetControlFlags -
// Flagi do dostosowywania implementacji MFC formant�w ActiveX.
//
DWORD [!output CONTROL_CLASS]::GetControlFlags()
{
	DWORD dwFlags = COleControl::GetControlFlags();

[!if UNCLIPPED_DEVICE_CONTEXT]
	// Wyj�cie formantu nie jest obcinane.
	// Formant gwarantuje, �e nie b�dzie mo�na malowa� poza obszarem prostok�ta
	// jego klienta.
	dwFlags &= ~clipPaintDC;
[!endif]
[!if WINDOWLESS]

	// Formant mo�e zosta� aktywowany bez tworzenia okna.
	// TODO: podczas pisania obs�ug komunikat�w formant�w, nale�y unika� u�ywania
	//		zmiennej cz�onkowskiej m_hWnd, bez wcze�niejszego sprawdzenia, �e jej
	//		warto�� jest r�na od NULL.
	dwFlags |= windowlessActivate;
[!endif]
[!if FLICKER_FREE]

	// Formant nie zostanie narysowany ponownie podczas wykonywania przej�cia
	// mi�dzy stanem aktywnym i nieaktywnym.
	dwFlags |= noFlickerActivate;
[!endif]
[!if MOUSE_NOTIFICATIONS]

	// Formant mo�e otrzymywa� powiadomienia myszy, gdy jest nieaktywny.
	// TODO: podczas pisania obs�ug dla WM_SETCURSOR i WM_MOUSEMOVE,
	//		unikaj u�ywania zmiennej cz�onkowskiej m_hWnd bez uprzedniego
	//		sprawdzanie, czy jej warto�� jest r�na od NULL.
	dwFlags |= pointerInactive;
[!endif]
[!if OPTIMIZED_DRAW]

	// Formant mo�e zoptymalizowa� swoj� metod� OnDraw, przez nieprzywracanie
	// oryginalne obiekty GDI w kontek�cie urz�dzenia.
	dwFlags |= canOptimizeDraw;
[!endif]
	return dwFlags;
}

[!endif]

// [!output CONTROL_CLASS]::OnResetState - Zresetuj formant do stanu domy�lnego

void [!output CONTROL_CLASS]::OnResetState()
{
	COleControl::OnResetState();  // Resetuje warto�ci domy�lne znalezione w DoPropExchange

	// TODO: W tym miejscu resetuj ka�dy inny stan formantu.
}

[!if ABOUT_BOX]

// [!output CONTROL_CLASS]::AboutBox - Wy�wietla u�ytkownikowi okno "Informacje o programie"

void [!output CONTROL_CLASS]::AboutBox()
{
	CDialogEx dlgAbout(IDD_ABOUTBOX_[!output UPPER_CASE_SAFE_PROJECT_IDENTIFIER_NAME]);
	dlgAbout.DoModal();
}

[!endif]
[!if SUBCLASS_WINDOW]

// [!output CONTROL_CLASS]::PreCreateWindow - Modyfikuje parametry dla CreateWindowEx

BOOL [!output CONTROL_CLASS]::PreCreateWindow(CREATESTRUCT& cs)
{
[!if SUBCLASS_WINDOW]
	cs.lpszClass = _T("[!output WINDOW_CLASS]");
[!else]
	// TODO: Wype�nij nazw� klasy okna do odziedziczenia.
	cs.lpszClass = _T("");
[!endif]
	return COleControl::PreCreateWindow(cs);
}

// [!output CONTROL_CLASS]::IsSubclassedControl - Formant b�d�cy podklas�

BOOL [!output CONTROL_CLASS]::IsSubclassedControl()
{
	return TRUE;
}

// [!output CONTROL_CLASS]::OnOcmCommand - Obs�uguje komunikaty polece�

LRESULT [!output CONTROL_CLASS]::OnOcmCommand(WPARAM wParam, LPARAM lParam)
{
	WORD wNotifyCode = HIWORD(wParam);

	// TODO: W tym miejscu w��cz wNotifyCode.

	return 0;
}

[!endif]

// Obs�ugi wiadomo�ci [!output CONTROL_CLASS]
