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

// [!output CONTAINER_ITEM_IMPL] : implementazione della classe [!output CONTAINER_ITEM_CLASS]
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


// implementazione di [!output CONTAINER_ITEM_CLASS]

IMPLEMENT_SERIAL([!output CONTAINER_ITEM_CLASS], [!output CONTAINER_ITEM_BASE_CLASS], 0)

[!if RICH_EDIT_VIEW]
[!output CONTAINER_ITEM_CLASS]::[!output CONTAINER_ITEM_CLASS](REOBJECT* preo, [!output DOC_CLASS]* pContainer)
	: [!output CONTAINER_ITEM_BASE_CLASS](preo, pContainer)
[!else]
[!output CONTAINER_ITEM_CLASS]::[!output CONTAINER_ITEM_CLASS]([!output DOC_CLASS]* pContainer)
	: [!output CONTAINER_ITEM_BASE_CLASS](pContainer)
[!endif]
{
	// TODO: aggiungere qui il codice di costruzione unico
}

[!output CONTAINER_ITEM_CLASS]::~[!output CONTAINER_ITEM_CLASS]()
{
	// TODO: aggiungere qui il codice di pulizia
}
[!if !RICH_EDIT_VIEW]

void [!output CONTAINER_ITEM_CLASS]::OnChange(OLE_NOTIFICATION nCode, DWORD dwParam)
{
	ASSERT_VALID(this);

	[!output CONTAINER_ITEM_BASE_CLASS]::OnChange(nCode, dwParam);

	// Quando viene modificato (sul posto o completamente aperto),
	//  un elemento invia notifiche OnChange per le modifiche apportate allo stato
	//  dell'elemento o all'aspetto visivo del contenuto.

	// TODO: invalidare l'elemento chiamando UpdateAllViews
	//  (con suggerimenti appropriati per l'applicazione)

	GetDocument()->UpdateAllViews(NULL);
		// aggiornare per il momento TUTTE le viste ma non i suggerimenti
}

BOOL [!output CONTAINER_ITEM_CLASS]::OnChangeItemPosition(const CRect& rectPos)
{
	ASSERT_VALID(this);

	// Durante l'attivazione sul posto [!output CONTAINER_ITEM_CLASS]::OnChangeItemPosition
	//  viene chiamato dal server per modificare la posizione della finestra
	//  sul posto.  In genere, ciò avviene quando l'estensione del documento
	//  server cambia in seguito alla modifica dei dati o come conseguenza
	//  del ridimensionamento sul posto.
	//
	// L'impostazione predefinita prevede di chiamare la classe base, che chiamerà
	//  [!output CONTAINER_ITEM_BASE_CLASS]::SetItemRects per spostare l'elemento
	//  nella nuova posizione.

	if (![!output CONTAINER_ITEM_BASE_CLASS]::OnChangeItemPosition(rectPos))
		return FALSE;

	// TODO: aggiornare qualunque cache contenente l'estensione o il rettangolo dell'elemento.

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

	// Durante l'attivazione sul posto, [!output CONTAINER_ITEM_CLASS]::OnGetItemPosition
	//  verrà chiamato per determinare la posizione di questo elemento.  In genere questo 
	//  rettangolo riflette la posizione corrente dell'elemento rispetto alla 
	//  visualizzazione usata per l'attivazione.  È possibile recuperare la visualizzazione chiamando 
	//  [!output CONTAINER_ITEM_CLASS]::GetActiveView.

	// TODO: restituire il rettangolo corretto (in pixel)  in rPosition.

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
    // Consenti un solo elemento di attivazione sul posto per frame
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

	// Chiamare prima la classe base per leggere nei dati [!output CONTAINER_ITEM_BASE_CLASS].
	// Poiché configura il puntatore m_pDocument restituito da
	//  [!output CONTAINER_ITEM_CLASS]::GetDocument, è opportuno chiamare
	//  prima la classe base Serialize.
	[!output CONTAINER_ITEM_BASE_CLASS]::Serialize(ar);

	// per il momento archiviare/recuperare dati specifici di [!output CONTAINER_ITEM_CLASS]
	if (ar.IsStoring())
	{
		// TODO: aggiungere qui il codice di archiviazione
	}
	else
	{
		// TODO: aggiungere qui il codice di caricamento
	}
}
[!if CONTAINER_SERVER]

BOOL [!output CONTAINER_ITEM_CLASS]::CanActivate()
{
	// La modifica sul posto durante la modifica sul posto dello stesso server
	//  non funziona in quanto non supportata.  Disabilitare l'attivazione sul posto
	//  in tal caso.
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

	// altrimenti, basarsi sul comportamento predefinito
	return COleClientItem::CanActivate();
}
[!endif]
[!endif]


// diagnostica di [!output CONTAINER_ITEM_CLASS]

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

