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

// [!output CONTAINER_ITEM_IMPL] : implémentation de la classe [!output CONTAINER_ITEM_CLASS]
//

#include "stdafx.h"
#include "[!output APP_HEADER]"

[!if OLEDB_RECORD_VIEW || ODBC_RECORD_VIEW]
#include "[!output ROWSET_HEADER]"
[!endif]
#include "[!output DOC_HEADER]"
#include "[!output VIEW_HEADER]"
#include "[!output CONTAINER_ITEM_HEADER]"

#ifdef _DEBUG
#define new DEBUG_NEW
#endif


// implémentation de [!output CONTAINER_ITEM_CLASS]

IMPLEMENT_SERIAL([!output CONTAINER_ITEM_CLASS], [!output CONTAINER_ITEM_BASE_CLASS], 0)

[!if RICH_EDIT_VIEW]
[!output CONTAINER_ITEM_CLASS]::[!output CONTAINER_ITEM_CLASS](REOBJECT* preo, [!output DOC_CLASS]* pContainer)
	: [!output CONTAINER_ITEM_BASE_CLASS](preo, pContainer)
[!else]
[!output CONTAINER_ITEM_CLASS]::[!output CONTAINER_ITEM_CLASS]([!output DOC_CLASS]* pContainer)
	: [!output CONTAINER_ITEM_BASE_CLASS](pContainer)
[!endif]
{
	// TODO: ajoutez ici le code d'une construction unique
}

[!output CONTAINER_ITEM_CLASS]::~[!output CONTAINER_ITEM_CLASS]()
{
	// TODO: ajoutez ici le code de nettoyage
}
[!if !RICH_EDIT_VIEW]

void [!output CONTAINER_ITEM_CLASS]::OnChange(OLE_NOTIFICATION nCode, DWORD dwParam)
{
	ASSERT_VALID(this);

	[!output CONTAINER_ITEM_BASE_CLASS]::OnChange(nCode, dwParam);

	// Lorsqu'un élément est en cours de modification (soit sur place soit entièrement ouvert),
	//  il envoie des notifications OnChange relatives aux modifications de l'état
	//  de l'élément ou de l'apparence de son contenu.

	// TODO: rendez l'élément non valide en appelant UpdateAllViews
	//  (avec des indicateurs appropriés à votre application)

	GetDocument()->UpdateAllViews(NULL);
		// mettre à jour uniquement TOUTES les vues, pas les indicateurs
}

BOOL [!output CONTAINER_ITEM_CLASS]::OnChangeItemPosition(const CRect& rectPos)
{
	ASSERT_VALID(this);

	// Lors d'une activation sur place, [!output CONTAINER_ITEM_CLASS]::OnChangeItemPosition
	//  est appelé par le serveur pour modifier la position de la fenêtre
	//  sur place.  En règle générale, cela est dû à un changement des données
	//  du document serveur, modifiant ainsi l'étendue, ou bien à
	//  un redimensionnement sur place.
	//
	// Par défaut ici, la classe de base est appelée, laquelle va appeler
	//  [!output CONTAINER_ITEM_BASE_CLASS]::SetItemRects pour déplacer l'élément
	//  à sa nouvelle position.

	if (![!output CONTAINER_ITEM_BASE_CLASS]::OnChangeItemPosition(rectPos))
		return FALSE;

	// TODO: mettez à jour tout cache associé à l'étendue ou au rectangle de l'élément

	return TRUE;
}

BOOL [!output CONTAINER_ITEM_CLASS]::OnShowControlBars(CFrameWnd* pFrameWnd, BOOL bShow)
{
[!if APP_TYPE_MDI]
	CMDIFrameWndEx* pMainFrame = DYNAMIC_DOWNCAST(CMDIFrameWndEx, pFrameWnd);
[!else]
	CFrameWndEx* pMainFrame = DYNAMIC_DOWNCAST(CFrameWndEx, pFrameWnd);
[!endif]

	if (pMainFrame != NULL)
	{
		ASSERT_VALID(pMainFrame);
		return pMainFrame->OnShowPanes(bShow);
	}

	return FALSE;
}

[!if !ACTIVE_DOC_CONTAINER]
void [!output CONTAINER_ITEM_CLASS]::OnGetItemPosition(CRect& rPosition)
{
	ASSERT_VALID(this);

	// Lors d'une activation sur place, [!output CONTAINER_ITEM_CLASS]::OnGetItemPosition
	//  sera appelé pour déterminer l'emplacement de cet élément.  En règle générale, 
	//  ce rectangle reflète la position actuelle de l'élément par rapport à la 
	//  vue utilisée pour l'activation.  Vous pouvez obtenir la vue en appelant 
	//  [!output CONTAINER_ITEM_CLASS]::GetActiveView.

	// TODO: retournez un rectangle correct (en pixels) dans rPosition

	CSize size;
	rPosition.SetRectEmpty();
	if (GetExtent(&size, m_nDrawAspect))
	{
		[!output VIEW_CLASS]* pView = GetActiveView();
		ASSERT_VALID(pView);
		if (!pView)
			return;
		CDC *pDC = pView->GetDC();
		ASSERT(pDC);
		if (!pDC)
			return;
		pDC->HIMETRICtoLP(&size);
		rPosition.SetRect(10, 10, size.cx + 10, size.cy + 10);
	}
	else
		rPosition.SetRect(10, 10, 210, 210);
}
[!endif]

void [!output CONTAINER_ITEM_CLASS]::OnActivate()
{
[!if !ACTIVE_DOC_CONTAINER]
    // Autoriser un seul élément activé sur place par frame
    [!output VIEW_CLASS]* pView = GetActiveView();
    ASSERT_VALID(pView);
	if (!pView)
		return;
    COleClientItem* pItem = GetDocument()->GetInPlaceActiveItem(pView);
    if (pItem != NULL && pItem != this)
        pItem->Close();
    
    [!output CONTAINER_ITEM_BASE_CLASS]::OnActivate();
[!endif]
}

void [!output CONTAINER_ITEM_CLASS]::OnDeactivateUI(BOOL bUndoable)
{
	[!output CONTAINER_ITEM_BASE_CLASS]::OnDeactivateUI(bUndoable);

    DWORD dwMisc = 0;
    m_lpObject->GetMiscStatus(GetDrawAspect(), &dwMisc);
    if (dwMisc & OLEMISC_INSIDEOUT)
        DoVerb(OLEIVERB_HIDE, NULL);
}

void [!output CONTAINER_ITEM_CLASS]::Serialize(CArchive& ar)
{
	ASSERT_VALID(this);

	// Appeler d'abord la classe de base pour lire les données de [!output CONTAINER_ITEM_BASE_CLASS].
	// Dans la mesure où cela configure le pointeur m_pDocument retourné par
	//  [!output CONTAINER_ITEM_CLASS]::GetDocument, il est préférable d'appeler
	//  en premier la classe de base Serialize.
	[!output CONTAINER_ITEM_BASE_CLASS]::Serialize(ar);

	// enregistrer/extraire maintenant les données spécifiques à [!output CONTAINER_ITEM_CLASS]
	if (ar.IsStoring())
	{
		// TODO: ajoutez ici le code de stockage
	}
	else
	{
		// TODO: ajoutez ici le code de chargement
	}
}
[!if CONTAINER_SERVER]

BOOL [!output CONTAINER_ITEM_CLASS]::CanActivate()
{
	// La modification sur place alors que le serveur est lui-même modifié sur place
	//  ne fonctionne pas et n'est pas prise en charge.  L'activation sur place
	//  doit donc être désactivée dans ce cas.
	[!output DOC_CLASS]* pDoc = GetDocument();
	ASSERT_VALID(pDoc);
	if (!pDoc)
		return FALSE;
	ASSERT_KINDOF(COleServerDoc, pDoc);
	if (!pDoc->IsKindOf(RUNTIME_CLASS(COleServerDoc)))
	{
		return FALSE;
	}
	if (pDoc->IsInPlaceActive())
		return FALSE;

	// sinon, le comportement par défaut est utilisé
	return COleClientItem::CanActivate();
}
[!endif]
[!endif]


// diagnostics pour [!output CONTAINER_ITEM_CLASS]

#ifdef _DEBUG
void [!output CONTAINER_ITEM_CLASS]::AssertValid() const
{
	[!output CONTAINER_ITEM_BASE_CLASS]::AssertValid();
}

void [!output CONTAINER_ITEM_CLASS]::Dump(CDumpContext& dc) const
{
	[!output CONTAINER_ITEM_BASE_CLASS]::Dump(dc);
}
#endif

