// [!output PROPERTY_PAGE_IMPL] : Implementierung der [!output PROPERTY_PAGE_CLASS]-Eigenschaftenseitenklasse.

#include "stdafx.h"
#include "[!output PROJECT_NAME].h"
#include "[!output PROPERTY_PAGE_HEADER]"

#ifdef _DEBUG
#define new DEBUG_NEW
#endif

IMPLEMENT_DYNCREATE([!output PROPERTY_PAGE_CLASS], COlePropertyPage)

// Meldungszuordnung

BEGIN_MESSAGE_MAP([!output PROPERTY_PAGE_CLASS], COlePropertyPage)
END_MESSAGE_MAP()

// Klassenfactory und GUID initialisieren

[!if PROPERTY_PAGE_TYPE_ID_SET]
IMPLEMENT_OLECREATE_EX([!output PROPERTY_PAGE_CLASS], "[!output PROPERTY_PAGE_TYPE_ID]",
	[!output PROPERTY_PAGE_CLSID_IMPLEMENT_OLECREATE_FORMAT])
[!else]
IMPLEMENT_OLECREATE_NOREGNAME([!output PROPERTY_PAGE_CLASS],
	[!output PROPERTY_PAGE_CLSID_IMPLEMENT_OLECREATE_FORMAT])
[!endif]

// [!output PROPERTY_PAGE_CLASS]::[!output PROPERTY_PAGE_CLASS]Factory::UpdateRegistry -
// Fügt Systemregistrierungseinträge für [!output PROPERTY_PAGE_CLASS] hinzu oder entfernt sie

BOOL [!output PROPERTY_PAGE_CLASS]::[!output PROPERTY_PAGE_CLASS]Factory::UpdateRegistry(BOOL bRegister)
{
	if (bRegister)
		return AfxOleRegisterPropertyPageClass(AfxGetInstanceHandle(),
			m_clsid, IDS_[!output UPPER_CASE_SAFE_PROJECT_IDENTIFIER_NAME]_PPG);
	else
		return AfxOleUnregisterClass(m_clsid, NULL);
}

// [!output PROPERTY_PAGE_CLASS]::[!output PROPERTY_PAGE_CLASS] - Konstruktor

[!output PROPERTY_PAGE_CLASS]::[!output PROPERTY_PAGE_CLASS]() :
	COlePropertyPage(IDD, IDS_[!output UPPER_CASE_SAFE_PROJECT_IDENTIFIER_NAME]_PPG_CAPTION)
{
[!if HELP_FILES]
	SetHelpInfo(_T("Namen, die im Steuerelement angezeigt werden"), _T("[!output PROJECT_NAME].HLP"), 0);
[!endif]
}

// [!output PROPERTY_PAGE_CLASS]::DoDataExchange - Verschiebt Daten zwischen der Seite und den Eigenschaften.

void [!output PROPERTY_PAGE_CLASS]::DoDataExchange(CDataExchange* pDX)
{
	DDP_PostProcessing(pDX);
}

// [!output PROPERTY_PAGE_CLASS]-Meldungshandler
