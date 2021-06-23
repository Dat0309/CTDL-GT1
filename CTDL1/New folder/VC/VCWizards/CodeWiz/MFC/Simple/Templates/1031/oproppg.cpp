// [!output IMPL_FILE]: Implementierungsdatei
//

#include "stdafx.h"
[!if PROJECT_NAME_HEADER]
#include "[!output PROJECT_NAME].h"
[!endif]
#include "[!output HEADER_FILE]"
[!if !MERGE_FILE]

#ifdef _DEBUG
#define new DEBUG_NEW
#endif
[!endif]


// [!output CLASS_NAME]-Dialogfeld

IMPLEMENT_DYNCREATE([!output CLASS_NAME], COlePropertyPage)



// Meldungszuordnung

BEGIN_MESSAGE_MAP([!output CLASS_NAME], COlePropertyPage)
END_MESSAGE_MAP()



// Klassenfactory und GUID initialisieren

// {[!output CLSID_REGISTRY_FORMAT]}
IMPLEMENT_OLECREATE_EX([!output CLASS_NAME], "[!output TYPEID]",
	[!output CLSID_IMPLEMENT_OLECREATE_FORMAT])



// [!output CLASS_NAME]::[!output CLASS_NAME]Factory::UpdateRegistry -
// Fügt Systemregistrierungseinträge für [!output CLASS_NAME] hinzu, oder entfernt sie.

BOOL [!output CLASS_NAME]::[!output CLASS_NAME]Factory::UpdateRegistry(BOOL bRegister)
{
	// TODO: Eine Zeichenfolgenressource für den Seitentyp definieren. "0" durch die ID ersetzen.

	if (bRegister)
		return AfxOleRegisterPropertyPageClass(AfxGetInstanceHandle(),
			m_clsid, 0);
	else
		return AfxOleUnregisterClass(m_clsid, NULL);
}



// [!output CLASS_NAME]::[!output CLASS_NAME] - Konstruktor

// TODO: Eine Zeichenfolgenressource für die Seitenbeschriftung definieren. "0" durch die ID ersetzen.

[!output CLASS_NAME]::[!output CLASS_NAME]() :
	COlePropertyPage(IDD, 0)
{
[!if ACCESSIBILITY]
#ifndef _WIN32_WCE
	EnableActiveAccessibility();
#endif
[!endif]

}



// [!output CLASS_NAME]::DoDataExchange - Verschiebt Daten zwischen der Seite und den Eigenschaften

void [!output CLASS_NAME]::DoDataExchange(CDataExchange* pDX)
{
	DDP_PostProcessing(pDX);
}



// [!output CLASS_NAME]-Meldungshandler
