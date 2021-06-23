// [!output IMPL_FILE]: plik implementacji
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

[!if CCOLORDIALOG || CFONTDIALOG || CPAGESETUPDIALOG || CPRINTDIALOG]
#ifndef _WIN32_WCE // [!output BASE_CLASS] nie jest obs³ugiwane w systemie Windows CE.
[!endif]

// [!output CLASS_NAME]

[!if CREATABLE]
IMPLEMENT_DYNCREATE([!output CLASS_NAME], [!output BASE_CLASS])
[!else]
IMPLEMENT_DYNAMIC([!output CLASS_NAME], [!output BASE_CLASS])
[!endif]

[!if CCOLORDIALOG]
[!output CLASS_NAME]::[!output CLASS_NAME](COLORREF clrInit, DWORD dwFlags, CWnd* pParentWnd) :
	CColorDialog(clrInit, dwFlags, pParentWnd)
[!else]
[!if CFILEDIALOG]
[!output CLASS_NAME]::[!output CLASS_NAME](BOOL bOpenFileDialog, LPCTSTR lpszDefExt, LPCTSTR lpszFileName,
		DWORD dwFlags, LPCTSTR lpszFilter, CWnd* pParentWnd) :
		CFileDialog(bOpenFileDialog, lpszDefExt, lpszFileName, dwFlags, lpszFilter, pParentWnd)
[!else]
[!if CFONTDIALOG]
[!output CLASS_NAME]::[!output CLASS_NAME](LPLOGFONT lplfInitial, DWORD dwFlags, CDC* pdcPrinter, CWnd* pParentWnd) : 
	CFontDialog(lplfInitial, dwFlags, pdcPrinter, pParentWnd)
[!else]
[!if CPAGESETUPDIALOG]
[!output CLASS_NAME]::[!output CLASS_NAME](DWORD dwFlags /*= PSD_MARGINS | PSD_INWININIINTLMEASURE*/,
		CWnd* pParentWnd /*= NULL*/) :
		CPageSetupDialog(dwFlags, pParentWnd)
[!else]
[!if CPRINTDIALOG]
[!output CLASS_NAME]::[!output CLASS_NAME](BOOL bPrintSetupOnly, DWORD dwFlags, CWnd* pParentWnd) :
	CPrintDialog(bPrintSetupOnly, dwFlags, pParentWnd)
[!else]
[!if CVSTOOLSLISTBOX]
[!output CLASS_NAME]::[!output CLASS_NAME](CMFCToolBarsToolsPropertyPage* pParent) :
	CVSToolsListBox(pParent)
[!else]
[!output CLASS_NAME]::[!output CLASS_NAME]()
[!endif]
[!endif]
[!endif]
[!endif]
[!endif]
[!endif]
{
[!if ACCESSIBILITY]
#ifndef _WIN32_WCE
	EnableActiveAccessibility();
#endif
[!endif]

[!if AUTOMATION || CREATABLE]
	EnableAutomation();
[!endif]
[!if CREATABLE]
	
	// Aby aplikacja by³a uruchomiona tak d³ugo, jak obiekt automatyzacji OLE 
	//	jest aktywny, konstruktor wywo³uje metodê AfxOleLockApp.
	
	AfxOleLockApp();
[!endif]
}

[!output CLASS_NAME]::~[!output CLASS_NAME]()
{
[!if CREATABLE]
	// Aby zakoñczyæ aplikacjê, gdy wszystkie obiekty stworzone za pomoc¹
	// 	automatyzacji OLE, destruktor wywo³a metodê AfxOleUnlockApp.
	
	AfxOleUnlockApp();
[!endif]
}
[!if AUTOMATION || CREATABLE]

void [!output CLASS_NAME]::OnFinalRelease()
{
	// Gdy ostatnie odwo³anie do obiektu automatyzacji zostanie zwolnione,
	// wywo³ywana jest metoda OnFinalRelease.  Klasa podstawowa zostanie automatycznie
	// usuwa obiekt.  Dodaj dodatkowe oczyszczanie wymagane dla
	// obiektu, przed wywo³aniem klasy podstawowej.

	[!output BASE_CLASS]::OnFinalRelease();
}
[!endif]


BEGIN_MESSAGE_MAP([!output CLASS_NAME], [!output BASE_CLASS])
END_MESSAGE_MAP()

[!if AUTOMATION || CREATABLE]

BEGIN_DISPATCH_MAP([!output CLASS_NAME], [!output BASE_CLASS])
END_DISPATCH_MAP()

// Uwaga: Zosta³a dodana obs³uga IID_I[!output CLASS_NAME_ROOT], aby umo¿liwiæ wi¹zanie bezpieczne pod wzglêdem typu
//  z jêzyka VBA.  Identyfikator IID musi byæ zgodny z identyfikatorem GUID, który jest do³¹czony do 
//  instrukcji dispinterface w pliku .IDL.

// {[!output DISPIID_REGISTRY_FORMAT]}
static const IID IID_I[!output CLASS_NAME_ROOT] =
[!output DISPIID_STATIC_CONST_GUID_FORMAT];

BEGIN_INTERFACE_MAP([!output CLASS_NAME], [!output BASE_CLASS])
	INTERFACE_PART([!output CLASS_NAME], IID_I[!output CLASS_NAME_ROOT], Dispatch)
END_INTERFACE_MAP()
[!endif]
[!if CREATABLE]

// {[!output CLSID_REGISTRY_FORMAT]}
IMPLEMENT_OLECREATE([!output CLASS_NAME], "[!output TYPEID]", [!output CLSID_IMPLEMENT_OLECREATE_FORMAT])
[!endif]


// Obs³ugi wiadomoœci [!output CLASS_NAME]

[!if CCONTROLBAR]
void [!output CLASS_NAME]::OnUpdateCmdUI(CFrameWnd* /*pTarget*/, BOOL /*bDisableIfNoHndler*/)
{
}
[!endif]

[!if CCOLORDIALOG || CFONTDIALOG || CPAGESETUPDIALOG || CPRINTDIALOG]
#endif // !_WIN32_WCE
[!endif]
