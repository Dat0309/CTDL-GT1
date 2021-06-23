[!if RIBBON_TOOLBAR]
// Ce code source des exemples MFC illustre l'utilisation de l'interface utilisateur Microsoft Office Fluent MFC 
// (interface utilisateur "Fluent UI"). Il est fourni uniquement en tant que référence complémentaire du 
// Guide de référence Microsoft Foundation Classes et de la documentation électronique associée 
// inclus avec les logiciels de la bibliothèque MFC C++.  
// Les termes du contrat de licence pour la copie, l'utilisation ou la distribution de l'interface utilisateur Fluent sont disponibles séparément.  
// Pour en savoir plus sur notre programme de licence de l'interface utilisateur Fluent, visitez 
// http://go.microsoft.com/fwlink/?LinkId=238214.
//
// Copyright (C) Microsoft Corporation
// Tous droits réservés.
[!endif]

// [!output SERVER_ITEM_IMPL] : implémentation de la classe [!output SERVER_ITEM_CLASS]
//

#include "stdafx.h"
#include "[!output APP_HEADER]"

#include "[!output DOC_HEADER]"
#include "[!output SERVER_ITEM_HEADER]"
[!if CONTAINER_SERVER]
#include "[!output CONTAINER_ITEM_HEADER]"
[!endif]

#ifdef _DEBUG
#define new DEBUG_NEW
#endif


// implémentation de [!output SERVER_ITEM_CLASS]

IMPLEMENT_DYNAMIC([!output SERVER_ITEM_CLASS], [!output SERVER_ITEM_BASE_CLASS])

[!output SERVER_ITEM_CLASS]::[!output SERVER_ITEM_CLASS]([!output DOC_CLASS]* pContainerDoc)
	: [!output SERVER_ITEM_BASE_CLASS](pContainerDoc, TRUE)
{
	// TODO: ajoutez ici le code d'une construction unique
	//  (par exemple, en ajoutant d'autres formats de Presse-papiers dans la source de données de l'élément)
}

[!output SERVER_ITEM_CLASS]::~[!output SERVER_ITEM_CLASS]()
{
	// TODO: ajoutez ici le code de nettoyage
}

void [!output SERVER_ITEM_CLASS]::Serialize(CArchive& ar)
{
	// [!output SERVER_ITEM_CLASS]::Serialize sera appelé par l'infrastructure si
	//  l'élément est copié dans le Presse-papiers.  Cette action peut être automatisée
	//  via le rappel OLE de OnGetClipboardData.  Pour l'élément incorporé, il est conseillé
	//  de déléguer à la fonction Serialize
	//  du document.  Si votre application prend en charge les liens, vous pouvez ne sérialiser
	//  qu'une partie du document.

	if (!IsLinkedItem())
	{
		[!output DOC_CLASS]* pDoc = GetDocument();
		ASSERT_VALID(pDoc);
		if (pDoc)
			pDoc->Serialize(ar);
	}
}

BOOL [!output SERVER_ITEM_CLASS]::OnGetExtent(DVASPECT dwDrawAspect, CSize& rSize)
{
	// De nombreuses applications, telles que celle-ci, ne gèrent que le dessin de l'aspect du contenu
	//  de l'élément.  Pour prendre en charge d'autres aspects, par exemple
	//  DVASPECT_THUMBNAIL (par substitution de OnDrawEx), cette
	//  implémentation de OnGetExtent doit être modifiée afin de gérer les
	//  aspects supplémentaires.

	if (dwDrawAspect != DVASPECT_CONTENT)
		return [!output SERVER_ITEM_BASE_CLASS]::OnGetExtent(dwDrawAspect, rSize);

	// [!output SERVER_ITEM_CLASS]::OnGetExtent est appelé pour obtenir l'étendue, en
	//  unités HIMETRIC, de l'élément entier.  L'implémentation par défaut
	//  retourne ici un nombre d'unités codé de manière irréversible.

	// TODO: remplacez cette taille arbitraire

	rSize = CSize(3000, 3000);   // unités 3000 x 3000 (format HIMETRIC)

	return TRUE;
}

BOOL [!output SERVER_ITEM_CLASS]::OnDraw(CDC* pDC, CSize& rSize)
{
	if (!pDC)
		return FALSE;

	// Supprimez ceci si vous utilisez rSize
	UNREFERENCED_PARAMETER(rSize);

	// TODO: définissez le mode et l'étendue du mappage
	//  (l'étendue est généralement identique à la taille retournée par OnGetExtent)
	pDC->SetMapMode(MM_ANISOTROPIC);
	pDC->SetWindowOrg(0,0);
	pDC->SetWindowExt(3000, 3000);

	// TODO: ajoutez ici le code du dessin.  Renseignez si nécessaire l'étendue HIMETRIC.
	//  Tout le dessin prend place dans le contexte de périphérique de métafichier (pDC).

[!if CONTAINER_SERVER]
	// TODO: dessinez aussi les objets incorporés [!output CONTAINER_ITEM_CLASS].

[!endif]
[!if CONTAINER_SERVER]
	// Le code suivant dessine le premier élément à une position arbitraire.

	// TODO: supprimez ce code lorsque votre code de dessin final est complet

	[!output DOC_CLASS]* pDoc = GetDocument();
	ASSERT_VALID(pDoc);
	if (!pDoc)
		return FALSE;

	POSITION pos = pDoc->GetStartPosition();
	[!output CONTAINER_ITEM_CLASS]* pItem = DYNAMIC_DOWNCAST([!output CONTAINER_ITEM_CLASS], pDoc->GetNextClientItem(pos));
	if (pItem != NULL)
		pItem->Draw(pDC, CRect(10, 10, 1010, 1010));
[!endif]
	return TRUE;
}


// diagnostics pour [!output SERVER_ITEM_CLASS]

#ifdef _DEBUG
void [!output SERVER_ITEM_CLASS]::AssertValid() const
{
	[!output SERVER_ITEM_BASE_CLASS]::AssertValid();
}

void [!output SERVER_ITEM_CLASS]::Dump(CDumpContext& dc) const
{
	[!output SERVER_ITEM_BASE_CLASS]::Dump(dc);
}
#endif

