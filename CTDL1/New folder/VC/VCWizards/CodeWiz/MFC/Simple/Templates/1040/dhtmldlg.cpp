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


// finestra di dialogo [!output CLASS_NAME]

IMPLEMENT_DYNCREATE([!output CLASS_NAME], CDHtmlDialog)

[!output CLASS_NAME]::[!output CLASS_NAME](CWnd* pParent /*=NULL*/)
	: CDHtmlDialog([!output CLASS_NAME]::IDD, [!output CLASS_NAME]::IDH, pParent)
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

	CDHtmlDialog::OnFinalRelease();
}
[!endif]

void [!output CLASS_NAME]::DoDataExchange(CDataExchange* pDX)
{
	CDHtmlDialog::DoDataExchange(pDX);
}

BOOL [!output CLASS_NAME]::OnInitDialog()
{
	CDHtmlDialog::OnInitDialog();
	return TRUE;  // restituisce TRUE a meno che non sia stato impostato lo stato attivo su un controllo
}

BEGIN_MESSAGE_MAP([!output CLASS_NAME], CDHtmlDialog)
END_MESSAGE_MAP()

BEGIN_DHTML_EVENT_MAP([!output CLASS_NAME])
	DHTML_EVENT_ONCLICK(_T("ButtonOK"), OnButtonOK)
	DHTML_EVENT_ONCLICK(_T("ButtonCancel"), OnButtonCancel)
END_DHTML_EVENT_MAP()

[!if AUTOMATION || CREATABLE]

BEGIN_DISPATCH_MAP([!output CLASS_NAME], CDHtmlDialog)
END_DISPATCH_MAP()

// Nota: viene aggiunto il supporto per IID_I[!output CLASS_NAME_ROOT] in modo da supportare l'associazione indipendente dai tipi
//  da VBA.  Questo IID deve corrispondere al GUID connesso
//  all'interfaccia dispatch contenuta nel file IDL.

// {[!output DISPIID_REGISTRY_FORMAT]}
static const IID IID_I[!output CLASS_NAME_ROOT] =
[!output DISPIID_STATIC_CONST_GUID_FORMAT];

BEGIN_INTERFACE_MAP([!output CLASS_NAME], CDHtmlDialog)
	INTERFACE_PART([!output CLASS_NAME], IID_I[!output CLASS_NAME_ROOT], Dispatch)
END_INTERFACE_MAP()
[!endif]
[!if CREATABLE]

// {[!output CLSID_REGISTRY_FORMAT]}
IMPLEMENT_OLECREATE([!output CLASS_NAME], "[!output TYPEID]", [!output CLSID_IMPLEMENT_OLECREATE_FORMAT])
[!endif]


// gestori di messaggi [!output CLASS_NAME]

HRESULT [!output CLASS_NAME]::OnButtonOK(IHTMLElement* /*pElement*/)
{
	OnOK();
	return S_OK;
}

HRESULT [!output CLASS_NAME]::OnButtonCancel(IHTMLElement* /*pElement*/)
{
	OnCancel();
	return S_OK;
}
