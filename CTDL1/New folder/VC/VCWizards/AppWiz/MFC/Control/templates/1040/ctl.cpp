// [!output CONTROL_IMPL] : implementazione della classe di controlli ActiveX [!output CONTROL_CLASS].

#include "stdafx.h"
#include "[!output PROJECT_NAME].h"
#include "[!output CONTROL_HEADER]"
#include "[!output PROPERTY_PAGE_HEADER]"
#include "afxdialogex.h"

#ifdef _DEBUG
#define new DEBUG_NEW
#endif

IMPLEMENT_DYNCREATE([!output CONTROL_CLASS], COleControl)

// Mappa messaggi

BEGIN_MESSAGE_MAP([!output CONTROL_CLASS], COleControl)
[!if SUBCLASS_WINDOW]
	ON_MESSAGE(OCM_COMMAND, &[!output CONTROL_CLASS]::OnOcmCommand)
[!endif]
[!if INSERTABLE]
	ON_OLEVERB(AFX_IDS_VERB_EDIT, OnEdit)
[!endif]
	ON_OLEVERB(AFX_IDS_VERB_PROPERTIES, OnProperties)
END_MESSAGE_MAP()

// Mappa di invio

BEGIN_DISPATCH_MAP([!output CONTROL_CLASS], COleControl)
[!if ASYNC_PROPERTY_LOAD]
	DISP_STOCKPROP_READYSTATE()
[!endif]
[!if ABOUT_BOX]
	DISP_FUNCTION_ID([!output CONTROL_CLASS], "AboutBox", DISPID_ABOUTBOX, AboutBox, VT_EMPTY, VTS_NONE)
[!endif]
END_DISPATCH_MAP()

// Mappa eventi

BEGIN_EVENT_MAP([!output CONTROL_CLASS], COleControl)
[!if ASYNC_PROPERTY_LOAD]
	EVENT_STOCK_READYSTATECHANGE()
[!endif]
END_EVENT_MAP()

// Pagine delle proprietà

// TODO: aggiungere le pagine delle proprietà necessarie.  Ricordare di aumentare il numero.
BEGIN_PROPPAGEIDS([!output CONTROL_CLASS], 1)
	PROPPAGEID([!output PROPERTY_PAGE_CLASS]::guid)
END_PROPPAGEIDS([!output CONTROL_CLASS])

// Inizializza class factory e GUID

[!if CONTROL_TYPE_ID_SET]
IMPLEMENT_OLECREATE_EX([!output CONTROL_CLASS], "[!output CONTROL_TYPE_ID]",
	[!output CONTROL_CLSID_IMPLEMENT_OLECREATE_FORMAT])
[!else]
IMPLEMENT_OLECREATE_NOREGNAME([!output CONTROL_CLASS],
	[!output CONTROL_CLSID_IMPLEMENT_OLECREATE_FORMAT])
[!endif]

// ID e versione della libreria dei tipi

IMPLEMENT_OLETYPELIB([!output CONTROL_CLASS], _tlid, _wVerMajor, _wVerMinor)

// ID di interfaccia

const IID IID_D[!output SAFE_PROJECT_IDENTIFIER_NAME] = [!output PRIMARY_IID_STATIC_CONST_GUID_FORMAT];
const IID IID_D[!output SAFE_PROJECT_IDENTIFIER_NAME]Events = [!output EVENT_IID_STATIC_CONST_GUID_FORMAT];

// Informazioni sui tipi di controlli

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
// Aggiunge o rimuove dal Registro di sistema le voci relative a [!output CONTROL_CLASS]

BOOL [!output CONTROL_CLASS]::[!output CONTROL_CLASS]Factory::UpdateRegistry(BOOL bRegister)
{
	// TODO: verificare che il controllo sia conforme alle regole del modello di threading Apartment.
	// Per ulteriori informazioni fare riferimento alla nota tecnica 64 di MFC.
	// Se il controllo non è conforme alle regole del modello di threading Apartment,
	// sarà necessario modificare il codice che segue, modificando il sesto parametro da
[!if INSERTABLE]
	// afxRegInsertable | afxRegApartmentThreading a afxRegInsertable.
[!else]
	// afxRegApartmentThreading in 0.
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

// Stringhe di licenza

static const TCHAR _szLicFileName[] = _T("[!output PROJECT_NAME].lic");
static const WCHAR _szLicString[] = L"Copyright (c) [!output YEAR] [!output COMPANY_NAME]";

// [!output CONTROL_CLASS]::[!output CONTROL_CLASS]Factory::VerifyUserLicense -
// Verifica l'esistenza di una licenza utente

BOOL [!output CONTROL_CLASS]::[!output CONTROL_CLASS]Factory::VerifyUserLicense()
{
	return AfxVerifyLicFile(AfxGetInstanceHandle(), _szLicFileName,
		_szLicString);
}

// [!output CONTROL_CLASS]::[!output CONTROL_CLASS]Factory::GetLicenseKey -
// Restituisce un codice di licenza runtime

BOOL [!output CONTROL_CLASS]::[!output CONTROL_CLASS]Factory::GetLicenseKey(DWORD dwReserved,
	BSTR *pbstrKey)
{
	if (pbstrKey == NULL)
		return FALSE;

	*pbstrKey = SysAllocString(_szLicString);
	return (*pbstrKey != NULL);
}

[!endif]

// [!output CONTROL_CLASS]::[!output CONTROL_CLASS] - Costruttore

[!output CONTROL_CLASS]::[!output CONTROL_CLASS]()
{
	InitializeIIDs(&IID_D[!output SAFE_PROJECT_IDENTIFIER_NAME], &IID_D[!output SAFE_PROJECT_IDENTIFIER_NAME]Events);
[!if SIMPLE_FRAME]

	EnableSimpleFrame();
[!endif]
[!if ASYNC_PROPERTY_LOAD]

	m_lReadyState = READYSTATE_LOADING;
	// TODO: chiamare InternalSetReadyState quando lo stato readystate cambia.
[!endif]
	// TODO: inizializzare qui i dati di istanza del controllo.
}

// [!output CONTROL_CLASS]::~[!output CONTROL_CLASS] - Distruttore

[!output CONTROL_CLASS]::~[!output CONTROL_CLASS]()
{
	// TODO: eseguire la pulizia dei dati di istanza del controllo.
}

// [!output CONTROL_CLASS]::OnDraw - Funzione di disegno

void [!output CONTROL_CLASS]::OnDraw(
			CDC* pdc, const CRect& rcBounds, const CRect& /* rcInvalid */)
{
	if (!pdc)
		return;

[!if SUBCLASS_WINDOW]
	DoSuperclassPaint(pdc, rcBounds);
[!else]
	// TODO: sostituire il codice seguente con un codice di disegno personalizzato.
	pdc->FillRect(rcBounds, CBrush::FromHandle((HBRUSH)GetStockObject(WHITE_BRUSH)));
	pdc->Ellipse(rcBounds);
[!endif]
[!if OPTIMIZED_DRAW]

	if (!IsOptimizedDraw())
	{
		// Il contenitore non supporta il disegno ottimizzato.

		// TODO: se è stato selezionato un oggetto GDI nel contesto di dispositivo *pdc,
		//		ripristinare qui gli oggetti selezionati in precedenza.
	}
[!endif]
}

// [!output CONTROL_CLASS]::DoPropExchange - Supporto della persistenza

void [!output CONTROL_CLASS]::DoPropExchange(CPropExchange* pPX)
{
	ExchangeVersion(pPX, MAKELONG(_wVerMinor, _wVerMajor));
	COleControl::DoPropExchange(pPX);

	// TODO: chiamare le funzioni PX_ per ciascuna proprietà personalizzata persistente.
}

[!if WINDOWLESS || UNCLIPPED_DEVICE_CONTEXT || FLICKER_FREE || MOUSE_NOTIFICATIONS || OPTIMIZED_DRAW]

// [!output CONTROL_CLASS]::GetControlFlags -
// Flag per la personalizzazione dell'implementazione MFC dei controlli ActiveX.
//
DWORD [!output CONTROL_CLASS]::GetControlFlags()
{
	DWORD dwFlags = COleControl::GetControlFlags();

[!if UNCLIPPED_DEVICE_CONTEXT]
	// L'output del controllo non verrà ritagliato.
	// Il controllo garantisce che non verrà disegnato al di fuori
	// del relativo rettangolo client.
	dwFlags &= ~clipPaintDC;
[!endif]
[!if WINDOWLESS]

	// Il controllo può essere attivato senza la creazione di una finestra.
	// TODO: durante la scrittura dei gestori dei messaggi del controllo, evitare di utilizzare
	//		la variabile membro m_hWnd senza verificare prima che il relativo
	//		valore sia diverso da NULL.
	dwFlags |= windowlessActivate;
[!endif]
[!if FLICKER_FREE]

	// Il controllo non verrà ridisegnato durante la transizione
	// tra lo stato attivo e lo stato inattivo.
	dwFlags |= noFlickerActivate;
[!endif]
[!if MOUSE_NOTIFICATIONS]

	// Il controllo può ricevere le notifiche del mouse quando inattivo.
	// TODO: se si scrivono i gestori per WM_SETCURSOR e WM_MOUSEMOVE,
	//		evitare di utilizzare la variabile membro m_hWnd senza verificare prima
	//		che il relativo valore sia diverso da NULL.
	dwFlags |= pointerInactive;
[!endif]
[!if OPTIMIZED_DRAW]

	// Il controllo può ottimizzare il proprio metodo OnDraw evitando di ripristinare
	// gli oggetti GDI originali nel contesto di dispositivo.
	dwFlags |= canOptimizeDraw;
[!endif]
	return dwFlags;
}

[!endif]

// [!output CONTROL_CLASS]::OnResetState - Reimposta lo stato predefinito del controllo

void [!output CONTROL_CLASS]::OnResetState()
{
	COleControl::OnResetState();  // Reimposta le impostazioni predefinite specificate in DoPropExchange

	// TODO: reimpostare qui lo stato di eventuali altri controlli.
}

[!if ABOUT_BOX]

// [!output CONTROL_CLASS]::AboutBox - Visualizza una finestra "Informazioni su"

void [!output CONTROL_CLASS]::AboutBox()
{
	CDialogEx dlgAbout(IDD_ABOUTBOX_[!output UPPER_CASE_SAFE_PROJECT_IDENTIFIER_NAME]);
	dlgAbout.DoModal();
}

[!endif]
[!if SUBCLASS_WINDOW]

// [!output CONTROL_CLASS]::PreCreateWindow - Modifica i parametri per CreateWindowEx

BOOL [!output CONTROL_CLASS]::PreCreateWindow(CREATESTRUCT& cs)
{
[!if SUBCLASS_WINDOW]
	cs.lpszClass = _T("[!output WINDOW_CLASS]");
[!else]
	// TODO: specificare il nome della classe di finestre da sottoclassare.
	cs.lpszClass = _T("");
[!endif]
	return COleControl::PreCreateWindow(cs);
}

// [!output CONTROL_CLASS]::IsSubclassedControl - Controllo sottoclassato

BOOL [!output CONTROL_CLASS]::IsSubclassedControl()
{
	return TRUE;
}

// [!output CONTROL_CLASS]::OnOcmCommand - Gestisce i messaggi di comando

LRESULT [!output CONTROL_CLASS]::OnOcmCommand(WPARAM wParam, LPARAM lParam)
{
	WORD wNotifyCode = HIWORD(wParam);

	// TODO: attivare wNotifyCode.

	return 0;
}

[!endif]

// Gestori di messaggi [!output CONTROL_CLASS]
