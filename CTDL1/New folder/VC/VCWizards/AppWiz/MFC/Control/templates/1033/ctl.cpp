// [!output CONTROL_IMPL] : Implementation of the [!output CONTROL_CLASS] ActiveX Control class.

#include "stdafx.h"
#include "[!output PROJECT_NAME].h"
#include "[!output CONTROL_HEADER]"
#include "[!output PROPERTY_PAGE_HEADER]"
#include "afxdialogex.h"

#ifdef _DEBUG
#define new DEBUG_NEW
#endif

IMPLEMENT_DYNCREATE([!output CONTROL_CLASS], COleControl)

// Message map

BEGIN_MESSAGE_MAP([!output CONTROL_CLASS], COleControl)
[!if SUBCLASS_WINDOW]
	ON_MESSAGE(OCM_COMMAND, &[!output CONTROL_CLASS]::OnOcmCommand)
[!endif]
[!if INSERTABLE]
	ON_OLEVERB(AFX_IDS_VERB_EDIT, OnEdit)
[!endif]
	ON_OLEVERB(AFX_IDS_VERB_PROPERTIES, OnProperties)
END_MESSAGE_MAP()

// Dispatch map

BEGIN_DISPATCH_MAP([!output CONTROL_CLASS], COleControl)
[!if ASYNC_PROPERTY_LOAD]
	DISP_STOCKPROP_READYSTATE()
[!endif]
[!if ABOUT_BOX]
	DISP_FUNCTION_ID([!output CONTROL_CLASS], "AboutBox", DISPID_ABOUTBOX, AboutBox, VT_EMPTY, VTS_NONE)
[!endif]
END_DISPATCH_MAP()

// Event map

BEGIN_EVENT_MAP([!output CONTROL_CLASS], COleControl)
[!if ASYNC_PROPERTY_LOAD]
	EVENT_STOCK_READYSTATECHANGE()
[!endif]
END_EVENT_MAP()

// Property pages

// TODO: Add more property pages as needed.  Remember to increase the count!
BEGIN_PROPPAGEIDS([!output CONTROL_CLASS], 1)
	PROPPAGEID([!output PROPERTY_PAGE_CLASS]::guid)
END_PROPPAGEIDS([!output CONTROL_CLASS])

// Initialize class factory and guid

[!if CONTROL_TYPE_ID_SET]
IMPLEMENT_OLECREATE_EX([!output CONTROL_CLASS], "[!output CONTROL_TYPE_ID]",
	[!output CONTROL_CLSID_IMPLEMENT_OLECREATE_FORMAT])
[!else]
IMPLEMENT_OLECREATE_NOREGNAME([!output CONTROL_CLASS],
	[!output CONTROL_CLSID_IMPLEMENT_OLECREATE_FORMAT])
[!endif]

// Type library ID and version

IMPLEMENT_OLETYPELIB([!output CONTROL_CLASS], _tlid, _wVerMajor, _wVerMinor)

// Interface IDs

const IID IID_D[!output SAFE_PROJECT_IDENTIFIER_NAME] = [!output PRIMARY_IID_STATIC_CONST_GUID_FORMAT];
const IID IID_D[!output SAFE_PROJECT_IDENTIFIER_NAME]Events = [!output EVENT_IID_STATIC_CONST_GUID_FORMAT];

// Control type information

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
// Adds or removes system registry entries for [!output CONTROL_CLASS]

BOOL [!output CONTROL_CLASS]::[!output CONTROL_CLASS]Factory::UpdateRegistry(BOOL bRegister)
{
	// TODO: Verify that your control follows apartment-model threading rules.
	// Refer to MFC TechNote 64 for more information.
	// If your control does not conform to the apartment-model rules, then
	// you must modify the code below, changing the 6th parameter from
[!if INSERTABLE]
	// afxRegInsertable | afxRegApartmentThreading to afxRegInsertable.
[!else]
	// afxRegApartmentThreading to 0.
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

// Licensing strings

static const TCHAR _szLicFileName[] = _T("[!output PROJECT_NAME].lic");
static const WCHAR _szLicString[] = L"Copyright (c) [!output YEAR] [!output COMPANY_NAME]";

// [!output CONTROL_CLASS]::[!output CONTROL_CLASS]Factory::VerifyUserLicense -
// Checks for existence of a user license

BOOL [!output CONTROL_CLASS]::[!output CONTROL_CLASS]Factory::VerifyUserLicense()
{
	return AfxVerifyLicFile(AfxGetInstanceHandle(), _szLicFileName,
		_szLicString);
}

// [!output CONTROL_CLASS]::[!output CONTROL_CLASS]Factory::GetLicenseKey -
// Returns a runtime licensing key

BOOL [!output CONTROL_CLASS]::[!output CONTROL_CLASS]Factory::GetLicenseKey(DWORD dwReserved,
	BSTR *pbstrKey)
{
	if (pbstrKey == NULL)
		return FALSE;

	*pbstrKey = SysAllocString(_szLicString);
	return (*pbstrKey != NULL);
}

[!endif]

// [!output CONTROL_CLASS]::[!output CONTROL_CLASS] - Constructor

[!output CONTROL_CLASS]::[!output CONTROL_CLASS]()
{
	InitializeIIDs(&IID_D[!output SAFE_PROJECT_IDENTIFIER_NAME], &IID_D[!output SAFE_PROJECT_IDENTIFIER_NAME]Events);
[!if SIMPLE_FRAME]

	EnableSimpleFrame();
[!endif]
[!if ASYNC_PROPERTY_LOAD]

	m_lReadyState = READYSTATE_LOADING;
	// TODO: Call InternalSetReadyState when the readystate changes.
[!endif]
	// TODO: Initialize your control's instance data here.
}

// [!output CONTROL_CLASS]::~[!output CONTROL_CLASS] - Destructor

[!output CONTROL_CLASS]::~[!output CONTROL_CLASS]()
{
	// TODO: Cleanup your control's instance data here.
}

// [!output CONTROL_CLASS]::OnDraw - Drawing function

void [!output CONTROL_CLASS]::OnDraw(
			CDC* pdc, const CRect& rcBounds, const CRect& /* rcInvalid */)
{
	if (!pdc)
		return;

[!if SUBCLASS_WINDOW]
	DoSuperclassPaint(pdc, rcBounds);
[!else]
	// TODO: Replace the following code with your own drawing code.
	pdc->FillRect(rcBounds, CBrush::FromHandle((HBRUSH)GetStockObject(WHITE_BRUSH)));
	pdc->Ellipse(rcBounds);
[!endif]
[!if OPTIMIZED_DRAW]

	if (!IsOptimizedDraw())
	{
		// The container does not support optimized drawing.

		// TODO: if you selected any GDI objects into the device context *pdc,
		//		restore the previously-selected objects here.
	}
[!endif]
}

// [!output CONTROL_CLASS]::DoPropExchange - Persistence support

void [!output CONTROL_CLASS]::DoPropExchange(CPropExchange* pPX)
{
	ExchangeVersion(pPX, MAKELONG(_wVerMinor, _wVerMajor));
	COleControl::DoPropExchange(pPX);

	// TODO: Call PX_ functions for each persistent custom property.
}

[!if WINDOWLESS || UNCLIPPED_DEVICE_CONTEXT || FLICKER_FREE || MOUSE_NOTIFICATIONS || OPTIMIZED_DRAW]

// [!output CONTROL_CLASS]::GetControlFlags -
// Flags to customize MFC's implementation of ActiveX controls.
//
DWORD [!output CONTROL_CLASS]::GetControlFlags()
{
	DWORD dwFlags = COleControl::GetControlFlags();

[!if UNCLIPPED_DEVICE_CONTEXT]
	// The control's output is not being clipped.
	// The control guarantees that it will not paint outside its
	// client rectangle.
	dwFlags &= ~clipPaintDC;
[!endif]
[!if WINDOWLESS]

	// The control can activate without creating a window.
	// TODO: when writing the control's message handlers, avoid using
	//		the m_hWnd member variable without first checking that its
	//		value is non-NULL.
	dwFlags |= windowlessActivate;
[!endif]
[!if FLICKER_FREE]

	// The control will not be redrawn when making the transition
	// between the active and inactivate state.
	dwFlags |= noFlickerActivate;
[!endif]
[!if MOUSE_NOTIFICATIONS]

	// The control can receive mouse notifications when inactive.
	// TODO: if you write handlers for WM_SETCURSOR and WM_MOUSEMOVE,
	//		avoid using the m_hWnd member variable without first
	//		checking that its value is non-NULL.
	dwFlags |= pointerInactive;
[!endif]
[!if OPTIMIZED_DRAW]

	// The control can optimize its OnDraw method, by not restoring
	// the original GDI objects in the device context.
	dwFlags |= canOptimizeDraw;
[!endif]
	return dwFlags;
}

[!endif]

// [!output CONTROL_CLASS]::OnResetState - Reset control to default state

void [!output CONTROL_CLASS]::OnResetState()
{
	COleControl::OnResetState();  // Resets defaults found in DoPropExchange

	// TODO: Reset any other control state here.
}

[!if ABOUT_BOX]

// [!output CONTROL_CLASS]::AboutBox - Display an "About" box to the user

void [!output CONTROL_CLASS]::AboutBox()
{
	CDialogEx dlgAbout(IDD_ABOUTBOX_[!output UPPER_CASE_SAFE_PROJECT_IDENTIFIER_NAME]);
	dlgAbout.DoModal();
}

[!endif]
[!if SUBCLASS_WINDOW]

// [!output CONTROL_CLASS]::PreCreateWindow - Modify parameters for CreateWindowEx

BOOL [!output CONTROL_CLASS]::PreCreateWindow(CREATESTRUCT& cs)
{
[!if SUBCLASS_WINDOW]
	cs.lpszClass = _T("[!output WINDOW_CLASS]");
[!else]
	// TODO: Fill in the name of the window class to be subclassed.
	cs.lpszClass = _T("");
[!endif]
	return COleControl::PreCreateWindow(cs);
}

// [!output CONTROL_CLASS]::IsSubclassedControl - This is a subclassed control

BOOL [!output CONTROL_CLASS]::IsSubclassedControl()
{
	return TRUE;
}

// [!output CONTROL_CLASS]::OnOcmCommand - Handle command messages

LRESULT [!output CONTROL_CLASS]::OnOcmCommand(WPARAM wParam, LPARAM lParam)
{
	WORD wNotifyCode = HIWORD(wParam);

	// TODO: Switch on wNotifyCode here.

	return 0;
}

[!endif]

// [!output CONTROL_CLASS] message handlers
