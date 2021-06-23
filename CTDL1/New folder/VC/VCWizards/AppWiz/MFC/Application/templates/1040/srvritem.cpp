[!if RIBBON_TOOLBAR]
// Questo codice sorgente degli esempi di MFC illustra l'utilizzo dell'interfaccia utente Microsoft Office Fluent di MFC 
// e viene fornito esclusivamente come riferimento in supplemento 
// al materiale di riferimento e alla documentazione in formato elettronico MFC 
// forniti con il software della libreria MFC C++.  
// Le condizioni di licenza per la copia, l'utilizzo o la distribuzione dell'interfaccia utente Microsoft Office Fluent sono disponibili separatamente.  
// Per ulteriori informazioni sul programma di licenza dell'interfaccia utente Microsoft Office Fluent, visitare il sito 
// http://go.microsoft.com/fwlink/?LinkId=238214.
//
// Copyright (C) Microsoft Corporation
// Tutti i diritti riservati.
[!endif]

// [!output SERVER_ITEM_IMPL] : implementazione della classe [!output SERVER_ITEM_CLASS]
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


// implementazione di [!output SERVER_ITEM_CLASS]

IMPLEMENT_DYNAMIC([!output SERVER_ITEM_CLASS], [!output SERVER_ITEM_BASE_CLASS])

[!output SERVER_ITEM_CLASS]::[!output SERVER_ITEM_CLASS]([!output DOC_CLASS]* pContainerDoc)
	: [!output SERVER_ITEM_BASE_CLASS](pContainerDoc, TRUE)
{
	// TODO: aggiungere qui il codice di costruzione unico
	//  (che consiste nell'aggiungere altri formati degli Appunti all'origine dati degli elementi).
}

[!output SERVER_ITEM_CLASS]::~[!output SERVER_ITEM_CLASS]()
{
	// TODO: aggiungere qui il codice di pulizia
}

void [!output SERVER_ITEM_CLASS]::Serialize(CArchive& ar)
{
	// [!output SERVER_ITEM_CLASS]::Serialize verrà richiamata dal framework se
	//  l'elemento è copiato negli Appunti.  Questa operazione può essere effettuata automaticamente
	//  tramite il callback OLE OnGetClipboardData.  L'operazione predefinita per
	//  l'elemento incorporato consiste nel delegare alla funzione Serialize del
	//  documento.  Se si dispone del supporto per i collegamenti, sarà possibile serializzare
	//  solo una parte del documento.

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
	// La maggior parte delle applicazioni, come questa, gestisce solo la creazione dell'aspetto contenutistico 
	//  dell'elemento.  Se si desidera supportare altri aspetti, ad esempio
	//  DVASPECT_THUMBNAIL (eseguendo l'override di OnDrawEx), sarà necessario
	//  modificare l'implementazione di OnGetExtent per poter 
	//  gestire tali aspetti.

	if (dwDrawAspect != DVASPECT_CONTENT)
		return [!output SERVER_ITEM_BASE_CLASS]::OnGetExtent(dwDrawAspect, rSize);

	// [!output SERVER_ITEM_CLASS]::OnGetExtent viene chiamato per ottenere l'ambito in 
	//  unità HIMETRIC dell'intero elemento.  L'implementazione
	//  restituisce un numero di unità hard-coded.

	// TODO: sostituire la dimensione arbitraria.

	rSize = CSize(3000, 3000);   // unità HIMETRIC 3000 x 3000

	return TRUE;
}

BOOL [!output SERVER_ITEM_CLASS]::OnDraw(CDC* pDC, CSize& rSize)
{
	if (!pDC)
		return FALSE;

	// Rimuovere l'elemento se si utilizza rSize.
	UNREFERENCED_PARAMETER(rSize);

	// TODO: impostare la modalità e l'ambito del mapping
	//  (L'ambito è in genere lo stesso della dimensione restituita da OnGetExtent).
	pDC->SetMapMode(MM_ANISOTROPIC);
	pDC->SetWindowOrg(0,0);
	pDC->SetWindowExt(3000, 3000);

	// TODO: aggiungere qui il codice per il disegno.  Se si desidera, specificare l'ambito HIMETRIC.
	//  Tutte le operazioni relative al disegno vengono effettuate nel contesto di dispositivo (pDC) del metafile.

[!if CONTAINER_SERVER]
	// TODO: disegnare anche oggetti [!output CONTAINER_ITEM_CLASS] incorporati.

[!endif]
[!if CONTAINER_SERVER]
	// Il seguente codice consente di disegnare il primo elemento in una posizione arbitraria.

	// TODO: rimuovere questo codice quando l'effettivo codice del disegno è completo.

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


// diagnostica di [!output SERVER_ITEM_CLASS]

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

