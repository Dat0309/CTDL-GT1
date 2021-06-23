// [!output IMPL_FILE]: plik implementacji
//

#include "stdafx.h"
[!if PROJECT_NAME_HEADER]
#include "[!output PROJECT_NAME].h"
[!else]
#include "resource.h"
[!endif]
#include "[!output HEADER_FILE]"
[!if !MERGE_FILE]

#ifdef _DEBUG
#define new DEBUG_NEW
#endif
[!endif]


// [!output CLASS_NAME]

IMPLEMENT_DYNCREATE([!output CLASS_NAME], CFormView)

[!output CLASS_NAME]::[!output CLASS_NAME]()
	: CFormView([!output CLASS_NAME]::IDD)
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

	CFormView::OnFinalRelease();
}
[!endif]

void [!output CLASS_NAME]::DoDataExchange(CDataExchange* pDX)
{
	CFormView::DoDataExchange(pDX);
}

BEGIN_MESSAGE_MAP([!output CLASS_NAME], CFormView)
END_MESSAGE_MAP()
[!if AUTOMATION || CREATABLE]

BEGIN_DISPATCH_MAP([!output CLASS_NAME], CFormView)
END_DISPATCH_MAP()

// Uwaga: Zosta³a dodana obs³uga IID_I[!output CLASS_NAME_ROOT], aby umo¿liwiæ wi¹zanie bezpieczne pod wzglêdem typu
//  z jêzyka VBA.  Identyfikator IID musi byæ zgodny z identyfikatorem GUID, który jest do³¹czony do 
//  instrukcji dispinterface w pliku .IDL.

// {[!output DISPIID_REGISTRY_FORMAT]}
static const IID IID_I[!output CLASS_NAME_ROOT] =
[!output DISPIID_STATIC_CONST_GUID_FORMAT];

BEGIN_INTERFACE_MAP([!output CLASS_NAME], CFormView)
	INTERFACE_PART([!output CLASS_NAME], IID_I[!output CLASS_NAME_ROOT], Dispatch)
END_INTERFACE_MAP()
[!endif]
[!if CREATABLE]

// {[!output CLSID_REGISTRY_FORMAT]}
IMPLEMENT_OLECREATE([!output CLASS_NAME], "[!output TYPEID]", [!output CLSID_IMPLEMENT_OLECREATE_FORMAT])
[!endif]


// Diagnostyka [!output CLASS_NAME]

#ifdef _DEBUG
void [!output CLASS_NAME]::AssertValid() const
{
	CFormView::AssertValid();
}

#ifndef _WIN32_WCE
void [!output CLASS_NAME]::Dump(CDumpContext& dc) const
{
	CFormView::Dump(dc);
}
#endif
#endif //_DEBUG


// Obs³ugi wiadomoœci [!output CLASS_NAME]
