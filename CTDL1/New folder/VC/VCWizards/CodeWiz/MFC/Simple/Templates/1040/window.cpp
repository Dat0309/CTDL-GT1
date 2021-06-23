// [!output IMPL_FILE] : file di implementazione
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
#ifndef _WIN32_WCE // [!output BASE_CLASS] non è supportato per Windows CE.
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
	
	// Per tenere in esecuzione l'applicazione finché rimane attivo un 
	//	oggetto di automazione OLE, il costruttore chiama AfxOleLockApp.
	
	AfxOleLockApp();
[!endif]
}

[!output CLASS_NAME]::~[!output CLASS_NAME]()
{
[!if CREATABLE]
	// Per terminare l'applicazione dopo che sono stati creati tutti gli oggetti
	// 	tramite l'automazione OLE, il distruttore chiama AfxOleUnlockApp.
	
	AfxOleUnlockApp();
[!endif]
}
[!if AUTOMATION || CREATABLE]

void [!output CLASS_NAME]::OnFinalRelease()
{
	// Quando viene rilasciato l'ultimo riferimento a un  oggetto di automazione,
	// viene chiamato OnFinalRelease.  La classe base eliminerà
	// automaticamente l'oggetto.  Eseguire le operazioni di pulizia necessarie per
	// l'oggetto prima di chiamare la classe base.

	[!output BASE_CLASS]::OnFinalRelease();
}
[!endif]


BEGIN_MESSAGE_MAP([!output CLASS_NAME], [!output BASE_CLASS])
END_MESSAGE_MAP()

[!if AUTOMATION || CREATABLE]

BEGIN_DISPATCH_MAP([!output CLASS_NAME], [!output BASE_CLASS])
END_DISPATCH_MAP()

// Nota: viene aggiunto il supporto per IID_I[!output CLASS_NAME_ROOT] in modo da supportare l'associazione indipendente dai tipi
//  da VBA.  Questo IID deve corrispondere al GUID connesso 
//  all'interfaccia dispatch contenuta nel file IDL.

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


// gestori di messaggi [!output CLASS_NAME]

[!if CCONTROLBAR]
void [!output CLASS_NAME]::OnUpdateCmdUI(CFrameWnd* /*pTarget*/, BOOL /*bDisableIfNoHndler*/)
{
}
[!endif]

[!if CCOLORDIALOG || CFONTDIALOG || CPAGESETUPDIALOG || CPRINTDIALOG]
#endif // !_WIN32_WCE
[!endif]
