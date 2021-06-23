// [!output IMPL_FILE] : fichier d'implémentation
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
#ifndef _WIN32_WCE // [!output BASE_CLASS] n'est pas pris en charge pour Windows CE.
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
	
	// Afin que l'application continue d'être exécutée tant qu'un objet OLE automation 
	//	est actif, le constructeur appelle AfxOleLockApp.
	
	AfxOleLockApp();
[!endif]
}

[!output CLASS_NAME]::~[!output CLASS_NAME]()
{
[!if CREATABLE]
	// Pour mettre fin à l'application lorsque tous les objets ont été créés
	// 	avec OLE automation, le destructeur appelle AfxOleUnlockApp.
	
	AfxOleUnlockApp();
[!endif]
}
[!if AUTOMATION || CREATABLE]

void [!output CLASS_NAME]::OnFinalRelease()
{
	// Lorsque la dernière référence pour un objet automation est libérée
	// OnFinalRelease est appelé.  La classe de base supprime automatiquement
	// l'objet.  Un nettoyage supplémentaire est requis pour votre
	// objet avant d'appeler la classe de base.

	[!output BASE_CLASS]::OnFinalRelease();
}
[!endif]


BEGIN_MESSAGE_MAP([!output CLASS_NAME], [!output BASE_CLASS])
END_MESSAGE_MAP()

[!if AUTOMATION || CREATABLE]

BEGIN_DISPATCH_MAP([!output CLASS_NAME], [!output BASE_CLASS])
END_DISPATCH_MAP()

// Remarque : Nous avons ajouté une prise en charge pour IID_I[!output CLASS_NAME_ROOT] afin de prendre en charge les liaisons de type sécurisé
//  à partir de VBA.  Cet IID doit correspondre au GUID qui est attaché à 
//  dispinterface dans le fichier .IDL.

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


// Gestionnaires de messages de [!output CLASS_NAME]

[!if CCONTROLBAR]
void [!output CLASS_NAME]::OnUpdateCmdUI(CFrameWnd* /*pTarget*/, BOOL /*bDisableIfNoHndler*/)
{
}
[!endif]

[!if CCOLORDIALOG || CFONTDIALOG || CPAGESETUPDIALOG || CPRINTDIALOG]
#endif // !_WIN32_WCE
[!endif]
