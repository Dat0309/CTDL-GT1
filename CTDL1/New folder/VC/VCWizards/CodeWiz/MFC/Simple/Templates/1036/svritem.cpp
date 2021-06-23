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

[!if CREATABLE]
IMPLEMENT_DYNCREATE([!output CLASS_NAME], [!output BASE_CLASS])
[!else]
IMPLEMENT_DYNAMIC([!output CLASS_NAME], [!output BASE_CLASS])
[!endif]

[!output CLASS_NAME]::[!output CLASS_NAME](COleServerDoc* pServerDoc, BOOL bAutoDelete)
		: COleServerItem( pServerDoc, bAutoDelete)
{
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

BOOL [!output CLASS_NAME]::OnDraw(CDC* pDC, CSize& rSize)
{
	// Appelé par le framework pour rendre l'élément OLE dans un métafichier.
	// La représentation du métafichier de l'élément OLE est utilisée pour afficher l'élément 
	// dans l'application conteneur. Si l'application conteneur a été 
	// écrite avec la bibliothèque Microsoft Foundation Class, le métafichier est 
	// utilisé par la fonction membre Draw de l'objet COleClientItem correspondant.
	// Il n'existe pas d'implémentation par défaut. Vous devez substituer cette fonction pour dessiner
	// l'élément dans le contexte de périphérique spécifié. 
	ASSERT(FALSE);			// supprimez cet élément après la fin de TODO
	return TRUE;
}

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


// Diagnostics de [!output CLASS_NAME]

#ifdef _DEBUG
void [!output CLASS_NAME]::AssertValid() const
{
	[!output BASE_CLASS]::AssertValid();
}

#ifndef _WIN32_WCE
void [!output CLASS_NAME]::Dump(CDumpContext& dc) const
{
	[!output BASE_CLASS]::Dump(dc);
}
#endif
#endif //_DEBUG


// Sérialisation de [!output CLASS_NAME]

#ifndef _WIN32_WCE
void [!output CLASS_NAME]::Serialize(CArchive& ar)
{
	if (ar.IsStoring())
	{
		// TODO: ajoutez ici le code de stockage
	}
	else
	{
		// TODO: ajoutez ici le code de chargement
	}
}
#endif

// Commandes [!output CLASS_NAME]
