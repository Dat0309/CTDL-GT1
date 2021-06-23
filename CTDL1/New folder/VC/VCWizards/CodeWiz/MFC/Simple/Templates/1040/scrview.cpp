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


// [!output CLASS_NAME]

IMPLEMENT_DYNCREATE([!output CLASS_NAME], CScrollView)

[!output CLASS_NAME]::[!output CLASS_NAME]()
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

	CScrollView::OnFinalRelease();
}
[!endif]


BEGIN_MESSAGE_MAP([!output CLASS_NAME], CScrollView)
END_MESSAGE_MAP()
[!if AUTOMATION || CREATABLE]

BEGIN_DISPATCH_MAP([!output CLASS_NAME], CScrollView)
END_DISPATCH_MAP()

// Nota: viene aggiunto il supporto per IID_I[!output CLASS_NAME_ROOT] in modo da supportare l'associazione indipendente dai tipi
//  da VBA.  Questo IID deve corrispondere al GUID connesso 
//  all'interfaccia dispatch contenuta nel file IDL.

// {[!output DISPIID_REGISTRY_FORMAT]}
static const IID IID_I[!output CLASS_NAME_ROOT] =
[!output DISPIID_STATIC_CONST_GUID_FORMAT];

BEGIN_INTERFACE_MAP([!output CLASS_NAME], CScrollView)
	INTERFACE_PART([!output CLASS_NAME], IID_I[!output CLASS_NAME_ROOT], Dispatch)
END_INTERFACE_MAP()
[!endif]
[!if CREATABLE]

// {[!output CLSID_REGISTRY_FORMAT]}
IMPLEMENT_OLECREATE([!output CLASS_NAME], "[!output TYPEID]", [!output CLSID_IMPLEMENT_OLECREATE_FORMAT])
[!endif]


// disegno di [!output CLASS_NAME]

void [!output CLASS_NAME]::OnInitialUpdate()
{
	CScrollView::OnInitialUpdate();

	CSize sizeTotal;
	// TODO: calcolare la dimensione totale di questa visualizzazione
	sizeTotal.cx = sizeTotal.cy = 100;
	SetScrollSizes(MM_TEXT, sizeTotal);
}

void [!output CLASS_NAME]::OnDraw(CDC* pDC)
{
	CDocument* pDoc = GetDocument();
	// TODO: aggiungere qui il codice di disegno
}


// diagnostica di [!output CLASS_NAME]

#ifdef _DEBUG
void [!output CLASS_NAME]::AssertValid() const
{
	CScrollView::AssertValid();
}

#ifndef _WIN32_WCE
void [!output CLASS_NAME]::Dump(CDumpContext& dc) const
{
	CScrollView::Dump(dc);
}
#endif
#endif //_DEBUG


// gestori di messaggi [!output CLASS_NAME]
