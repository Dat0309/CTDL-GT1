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

	CScrollView::OnFinalRelease();
}
[!endif]


BEGIN_MESSAGE_MAP([!output CLASS_NAME], CScrollView)
END_MESSAGE_MAP()
[!if AUTOMATION || CREATABLE]

BEGIN_DISPATCH_MAP([!output CLASS_NAME], CScrollView)
END_DISPATCH_MAP()

// Remarque : Nous avons ajouté une prise en charge pour IID_I[!output CLASS_NAME_ROOT] afin de prendre en charge les liaisons de type sécurisé
//  à partir de VBA.  Cet IID doit correspondre au GUID qui est attaché à 
//  dispinterface dans le fichier .IDL.

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


// Dessin [!output CLASS_NAME]

void [!output CLASS_NAME]::OnInitialUpdate()
{
	CScrollView::OnInitialUpdate();

	CSize sizeTotal;
	// TODO: calculez la taille totale de cette vue
	sizeTotal.cx = sizeTotal.cy = 100;
	SetScrollSizes(MM_TEXT, sizeTotal);
}

void [!output CLASS_NAME]::OnDraw(CDC* pDC)
{
	CDocument* pDoc = GetDocument();
	// TODO: ajoutez ici le code de dessin
}


// Diagnostics de [!output CLASS_NAME]

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


// Gestionnaires de messages de [!output CLASS_NAME]
