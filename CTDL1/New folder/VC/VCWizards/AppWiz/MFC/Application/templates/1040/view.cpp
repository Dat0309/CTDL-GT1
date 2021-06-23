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

// [!output VIEW_IMPL] : implementazione della classe [!output VIEW_CLASS]
//

#include "stdafx.h"
// SHARED_HANDLERS può essere definito in un'anteprima di implementazione del progetto ATL, nei gestori delle anteprime
// e della ricerca e consente di condividere il codice dei documenti con il progetto in questione.
#ifndef SHARED_HANDLERS
#include "[!output APP_HEADER]"
#endif

[!if OLEDB_RECORD_VIEW || ODBC_RECORD_VIEW]
#include "[!output ROWSET_HEADER]"
[!endif]
#include "[!output DOC_HEADER]"
[!if CONTAINER || CONTAINER_SERVER]
#include "[!output CONTAINER_ITEM_HEADER]"
#include "resource.h"
[!endif]
#include "[!output VIEW_HEADER]"

#ifdef _DEBUG
#define new DEBUG_NEW
#endif


// [!output VIEW_CLASS]

IMPLEMENT_DYNCREATE([!output VIEW_CLASS], [!output VIEW_BASE_CLASS])

BEGIN_MESSAGE_MAP([!output VIEW_CLASS], [!output VIEW_BASE_CLASS])
[!if PROJECT_STYLE_EXPLORER]
[!if LIST_VIEW]
	ON_WM_STYLECHANGED()
[!endif]
[!endif]
[!if CONTAINER || CONTAINER_SERVER]
	ON_WM_DESTROY()
[!if !RICH_EDIT_VIEW]
	ON_WM_SETFOCUS()
	ON_WM_SIZE()
	ON_COMMAND(ID_OLE_INSERT_NEW, &[!output VIEW_CLASS]::OnInsertObject)
	ON_COMMAND(ID_CANCEL_EDIT_CNTR, &[!output VIEW_CLASS]::OnCancelEditCntr)
	ON_COMMAND(ID_FILE_PRINT, &[!output VIEW_CLASS]::OnFilePrint)
[!else]
[!if PRINTING]
	// Comandi di stampa standard
	ON_COMMAND(ID_FILE_PRINT, &[!output VIEW_BASE_CLASS]::OnFilePrint)
[!endif]
[!endif]
[!else]
[!if PRINTING]
	// Comandi di stampa standard
	ON_COMMAND(ID_FILE_PRINT, &[!output VIEW_BASE_CLASS]::OnFilePrint)
[!endif]
[!endif]
[!if MINI_SERVER || FULL_SERVER || CONTAINER_SERVER]
	ON_COMMAND(ID_CANCEL_EDIT_SRVR, &[!output VIEW_CLASS]::OnCancelEditSrvr)
[!endif]
[!if PRINTING]
[!if !HTML_VIEW && !HTML_EDITVIEW && !ACTIVE_DOC_CONTAINER]
	ON_COMMAND(ID_FILE_PRINT_DIRECT, &[!output VIEW_BASE_CLASS]::OnFilePrint)
[!if MENUBAR_TOOLBAR || RIBBON_TOOLBAR]
	ON_COMMAND(ID_FILE_PRINT_PREVIEW, &[!output VIEW_CLASS]::OnFilePrintPreview)
[!else]
	ON_COMMAND(ID_FILE_PRINT_PREVIEW, &[!output VIEW_BASE_CLASS]::OnFilePrintPreview)
[!endif]
[!endif]
[!if ACTIVE_DOC_CONTAINER]
	ON_COMMAND(ID_FILE_PRINT_DIRECT, &[!output VIEW_BASE_CLASS]::OnFilePrint)
	ON_COMMAND(ID_FILE_PRINT_PREVIEW, &[!output VIEW_CLASS]::OnFilePrintPreview)
[!if !RICH_EDIT_VIEW]
	ON_UPDATE_COMMAND_UI(ID_FILE_PRINT_PREVIEW, &OnFilePrintPreviewUIUpdate)
[!endif]
[!endif]
[!endif]
[!if MENUBAR_TOOLBAR || RIBBON_TOOLBAR]
	ON_WM_CONTEXTMENU()
	ON_WM_RBUTTONUP()
[!endif]
END_MESSAGE_MAP()

[!if HTML_EDITVIEW]
BEGIN_DHTMLEDITING_CMDMAP([!output VIEW_CLASS])
	DHTMLEDITING_CMD_ENTRY(ID_EDIT_COPY, IDM_COPY)
	DHTMLEDITING_CMD_ENTRY(ID_EDIT_CUT, IDM_CUT)
	DHTMLEDITING_CMD_ENTRY(ID_EDIT_PASTE, IDM_PASTE)
	DHTMLEDITING_CMD_ENTRY(ID_EDIT_UNDO, IDM_UNDO)
END_DHTMLEDITING_CMDMAP()
[!endif]
// costruzione/eliminazione di [!output VIEW_CLASS]

[!output VIEW_CLASS]::[!output VIEW_CLASS]()
[!if FORM_VIEW || OLEDB_RECORD_VIEW || ODBC_RECORD_VIEW]
	: [!output VIEW_BASE_CLASS]([!output VIEW_CLASS]::IDD)
[!endif]
{
[!if ACCESSIBILITY]
	EnableActiveAccessibility();
[!endif]
[!if FORM_VIEW || OLEDB_RECORD_VIEW || ODBC_RECORD_VIEW]
[!if OLEDB_RECORD_VIEW || ODBC_RECORD_VIEW]
	m_pSet = NULL;
[!endif]
[!endif]
[!if CONTAINER || CONTAINER_SERVER]
[!if !RICH_EDIT_VIEW]
	m_pSelection = NULL;
[!endif]
[!endif]
	// TODO: aggiungere qui il codice di costruzione.

}

[!output VIEW_CLASS]::~[!output VIEW_CLASS]()
{
}
[!if FORM_VIEW || OLEDB_RECORD_VIEW || ODBC_RECORD_VIEW]

void [!output VIEW_CLASS]::DoDataExchange(CDataExchange* pDX)
{
	[!output VIEW_BASE_CLASS]::DoDataExchange(pDX);
[!if ODBC_RECORD_VIEW]
	// è possibile inserire qui le funzioni DDX_Field* per connettere i controlli ai campi del database, ad esempio
	// DDX_FieldText(pDX, IDC_MYEDITBOX, m_pSet->m_szColumn1, m_pSet);
	// DDX_FieldCheck(pDX, IDC_MYCHECKBOX, m_pSet->m_bColumn2, m_pSet);
	// Per ulteriori informazioni, vedere gli esempi MSDN e ODBC.
[!endif]
[!if OLEDB_RECORD_VIEW]
	// è possibile inserire le funzioni DDX_*, così come le chiamate API SetDlgItem*/GetDlgItem* per collegare il database alla visualizzazione.
	// ex. ::SetDlgItemText(m_hWnd, IDC_MYCONTROL, m_pSet->m_MyColumn);
	// Per ulteriori informazioni, vedere gli esempi MSDN e ODBC.
[!endif]
}
[!endif]

BOOL [!output VIEW_CLASS]::PreCreateWindow(CREATESTRUCT& cs)
{
	// TODO: modificare la classe o gli stili Window modificando
	//  la struttura CREATESTRUCT

[!if EDIT_VIEW]
	BOOL bPreCreated = CEditView::PreCreateWindow(cs);
	cs.style &= ~(ES_AUTOHSCROLL|WS_HSCROLL);	// Abilitare a capo automatico.

	return bPreCreated;
[!else]
	return [!output VIEW_BASE_CLASS]::PreCreateWindow(cs);
[!endif]
}
[!if !TREE_VIEW && !LIST_VIEW && !HTML_VIEW && !HTML_EDITVIEW && !RICH_EDIT_VIEW && !EDIT_VIEW && !FORM_VIEW && !OLEDB_RECORD_VIEW && !ODBC_RECORD_VIEW]

// disegno di [!output VIEW_CLASS]
[!if CONTAINER || CONTAINER_SERVER]
[!if !ACTIVE_DOC_CONTAINER]

void [!output VIEW_CLASS]::OnDraw(CDC* pDC)
{
	if (!pDC)
		return;

	[!output DOC_CLASS]* pDoc = GetDocument();
	ASSERT_VALID(pDoc);
	if (!pDoc)
		return;

	// TODO: aggiungere qui il codice di disegno per i dati nativi.
	// TODO: disegnare inoltre tutti gli elementi OLE nel documento.

	// Disegnare la selezione in una posizione arbitraria.  Questo codice deve essere
	//  rimosso una volta implementato il codice di disegno effettivo.  Questa posizione
	//  corrisponde esattamente al rettangolo restituito da [!output CONTAINER_ITEM_CLASS],
	//  per dare l'effetto di una modifica sul posto.

	// TODO: rimuovere questo codice al completamento del codice di disegno finale.
	if (m_pSelection != NULL)
	{
		CSize size;
		CRect rect(10, 10, 210, 210);
		
		if (m_pSelection->GetExtent(&size, m_pSelection->m_nDrawAspect))
		{
			pDC->HIMETRICtoLP(&size);
			rect.right = size.cx + 10;
			rect.bottom = size.cy + 10;
		}
		m_pSelection->Draw(pDC, rect);
	}
}
[!else]

void [!output VIEW_CLASS]::OnDraw(CDC* /*pDC*/)
{
	[!output DOC_CLASS]* pDoc = GetDocument();
	ASSERT_VALID(pDoc);
	if (!pDoc)
		return;

	// TODO: aggiungere qui il codice di disegno per i dati nativi.
}[!endif]
[!else]

void [!output VIEW_CLASS]::OnDraw(CDC* /*pDC*/)
{
	[!output DOC_CLASS]* pDoc = GetDocument();
	ASSERT_VALID(pDoc);
	if (!pDoc)
		return;

	// TODO: aggiungere qui il codice di disegno per i dati nativi.
}
[!endif]
[!endif] 
[!if PRINTING]
[!if TREE_VIEW || LIST_VIEW]


void [!output VIEW_CLASS]::OnDraw(CDC* /*pDC*/)
{
	[!output DOC_CLASS]* pDoc = GetDocument();
	ASSERT_VALID(pDoc);

	// TODO: aggiungere qui il codice di disegno per i dati nativi.
}

[!endif]
[!endif]
[!if SCROLL_VIEW || CONTAINER || CONTAINER_SERVER || OLEDB_RECORD_VIEW || LIST_VIEW || TREE_VIEW || FORM_VIEW || HTML_VIEW || ODBC_RECORD_VIEW]

void [!output VIEW_CLASS]::OnInitialUpdate()
{
[!if ODBC_RECORD_VIEW]
	m_pSet = &GetDocument()->[!output ROWSET_CLASS_VARIABLE_NAME];
[!endif]
[!if OLEDB_RECORD_VIEW]
	m_pSet = &GetDocument()->[!output ROWSET_CLASS_VARIABLE_NAME];
	{
		CWaitCursor wait;
		HRESULT hr = m_pSet->OpenAll();
		if (FAILED(hr))
		{
			// Impossibile aprire il recordset.  Se il recordset è una 
			// stored procedure, assicurarsi di aver inizializzato
			// correttamente i parametri di input prima di richiamare il metodo
			// OpenAll().

			AfxMessageBox(_T("Impossibile aprire il recordset."), MB_OK);
			// Disabilitare i comandi Record successivo e Record precedente,
			// in quanto il tentativo di modificare il record corrente senza un
			// rowset aperto causerà l'arresto del sistema.
			m_bOnFirstRecord = TRUE;
			m_bOnLastRecord = TRUE;
		}
		if( hr == DB_S_ENDOFROWSET )
		{
			// il rowset è vuoto (non contiene alcuna riga).
			AfxMessageBox(_T("Il recordset si è aperto ma non conteneva righe da restituire."), MB_OK);
			// Disabilitare i comandi Record successivo e Record precedente.
			m_bOnFirstRecord = TRUE;
			m_bOnLastRecord = TRUE;
		}
	}
[!endif]
	[!output VIEW_BASE_CLASS]::OnInitialUpdate();
[!if FORM_VIEW]
[!if APP_TYPE_SDI]
	GetParentFrame()->RecalcLayout();
[!endif]
	ResizeParentToFit();
[!endif]

[!if LIST_VIEW]

	// TODO: è possibile inserire elementi in ListView mediante accesso diretto al
	//  relativo controllo elenco tramite una chiamata a GetListCtrl().
[!if TREE_VIEW]

	// TODO: è possibile inserire elementi in TreeView mediante accesso diretto al
	//  relativo controllo di struttura ad albero tramite una chiamata a GetTreeCtrl().
[!if HTML_VIEW]
	// TODO: questo codice consente di accedere a un sito Web conosciuto.
	//  modificare il codice per accedere al sito desiderato.
[!endif]
[!endif]
[!endif]
[!if HTML_VIEW]
	Navigate2(_T("http://www.msdn.microsoft.com/visualc/"),NULL,NULL);
[!endif]
[!if CONTAINER || CONTAINER_SERVER]
[!if !RICH_EDIT_VIEW]

	// TODO: rimuovere il codice quando verrà scritto il codice del modello di selezione finale.
	m_pSelection = NULL;    // inizializzare la selezione.

[!endif]
[!if RICH_EDIT_VIEW]

	// Impostare i margini di stampa (720 twip = 1/2 pollice).
	SetMargins(CRect(720, 720, 720, 720));
[!endif]
[!endif]
[!if SCROLL_VIEW]
	CSize sizeTotal;
	// TODO: calcolare la dimensione totale di questa visualizzazione.
	sizeTotal.cx = sizeTotal.cy = 100;
	SetScrollSizes(MM_TEXT, sizeTotal);
[!endif]
}
[!endif]
[!if PRINTING]


// stampa di [!output VIEW_CLASS]

[!if ACTIVE_DOC_CONTAINER || MENUBAR_TOOLBAR || RIBBON_TOOLBAR]
[!if ACTIVE_DOC_CONTAINER && !RICH_EDIT_VIEW]
void [!output VIEW_CLASS]::OnFilePrintPreviewUIUpdate(CCmdUI* pCmdUI)
{
	if (!pCmdUI)
		return;

	if (m_pSelection != NULL)
	{
		DWORD dwStatus = 0;
		if (SUCCEEDED(m_pSelection->QueryCommand(OLECMDID_PRINTPREVIEW, &dwStatus)) &&
			dwStatus & OLECMDF_ENABLED)
		{
				pCmdUI->Enable(TRUE);
				return;
		}
	}
	pCmdUI->Enable(FALSE);
}
[!endif]

void [!output VIEW_CLASS]::OnFilePrintPreview()
{
[!if MENUBAR_TOOLBAR || RIBBON_TOOLBAR]
#ifndef SHARED_HANDLERS
	AFXPrintPreview(this);
#endif
[!else]
[!if !RICH_EDIT_VIEW]
	if (!m_pSelection)
		return;
	m_pSelection->ExecCommand(OLECMDID_PRINTPREVIEW);
[!else]
	[!output VIEW_BASE_CLASS]::OnFilePrintPreview();
[!endif]
[!endif]
}

[!endif]
[!if !HTML_VIEW && !HTML_EDITVIEW]
BOOL [!output VIEW_CLASS]::OnPreparePrinting(CPrintInfo* pInfo)
{
[!if EDIT_VIEW]
	// preparazione predefinita di CEditView
	return CEditView::OnPreparePrinting(pInfo);
[!else]
[!if ACTIVE_DOC_CONTAINER]
	if (!CView::DoPreparePrinting(pInfo))
		return FALSE;
	
	if (!COleDocObjectItem::OnPreparePrinting(this, pInfo))
		return FALSE;

	return TRUE;
[!else]
	// preparazione predefinita
	return DoPreparePrinting(pInfo);
[!endif]
[!endif]
}

[!if !RICH_EDIT_VIEW]
[!if EDIT_VIEW]
void [!output VIEW_CLASS]::OnBeginPrinting(CDC* pDC, CPrintInfo* pInfo)
[!else]
void [!output VIEW_CLASS]::OnBeginPrinting(CDC* /*pDC*/, CPrintInfo* /*pInfo*/)
[!endif]
{
[!if EDIT_VIEW]
	// Stampa iniziale CEditView predefinita
	CEditView::OnBeginPrinting(pDC, pInfo);
[!else]
	// TODO: inserire un'ulteriore inizializzazione prima della stampa.
[!endif]
}

[!if EDIT_VIEW]
void [!output VIEW_CLASS]::OnEndPrinting(CDC* pDC, CPrintInfo* pInfo)
[!else]
void [!output VIEW_CLASS]::OnEndPrinting(CDC* /*pDC*/, CPrintInfo* /*pInfo*/)
[!endif]
{
[!if EDIT_VIEW]
	// Stampa finale CEditView predefinita
	CEditView::OnEndPrinting(pDC, pInfo);
[!else]
	// TODO: aggiungere pulizia dopo la stampa.
[!endif]
}
[!endif]
[!endif]
[!if FORM_VIEW || ACTIVE_DOC_CONTAINER]

[!if ACTIVE_DOC_CONTAINER]
void [!output VIEW_CLASS]::OnPrint(CDC* pDC, CPrintInfo* pInfo)
[!else]
void [!output VIEW_CLASS]::OnPrint(CDC* pDC, CPrintInfo* /*pInfo*/)
[!endif]
{
	// TODO: aggiungere qui il codice di stampa personalizzato.
[!if ACTIVE_DOC_CONTAINER]
	if(pInfo->m_bDocObject)
		COleDocObjectItem::OnPrint(this, pInfo, TRUE);
	else
		CView::OnPrint(pDC, pInfo);
[!endif]
}
[!endif]
[!endif]
[!if CONTAINER || CONTAINER_SERVER]

void [!output VIEW_CLASS]::OnDestroy()
{
	// Disabilitare l'elemento durante la distruzione. È importante
	// quando viene utilizzata una visualizzazione con separatore.
   COleClientItem* pActiveItem = GetDocument()->GetInPlaceActiveItem(this);
   if (pActiveItem != NULL && pActiveItem->GetActiveView() == this)
   {
      pActiveItem->Deactivate();
      ASSERT(GetDocument()->GetInPlaceActiveItem(this) == NULL);
   }
   [!output VIEW_BASE_CLASS]::OnDestroy();
}

[!if !RICH_EDIT_VIEW]


// Supporto e comandi client OLE

BOOL [!output VIEW_CLASS]::IsSelected(const CObject* pDocItem) const
{
	// L'implementazione riportata di seguito è adeguata se la selezione effettuata comporta solo
	//  oggetti [!output CONTAINER_ITEM_CLASS].  Per gestire differenti meccanismi
	//  di selezione, è necessario sostituire l'implementazione.

	// TODO: implementare questa funzione che verifica la presenza di un elemento client OLE selezionato.

	return pDocItem == m_pSelection;
}

void [!output VIEW_CLASS]::OnInsertObject()
{
	// Richiamare la finestra di dialogo Inserisci oggetto per ottenere informazioni
	//  sul nuovo oggetto [!output CONTAINER_ITEM_CLASS].
	COleInsertDialog dlg;
[!if ACTIVE_DOC_CONTAINER]
	if (dlg.DoModal(COleInsertDialog::DocObjectsOnly) != IDOK)
		return;
[!else]
	if (dlg.DoModal() != IDOK)
		return;
[!endif]

	BeginWaitCursor();

	[!output CONTAINER_ITEM_CLASS]* pItem = NULL;
	TRY
	{
		// Creare un nuovo elemento connesso a questo documento.
		[!output DOC_CLASS]* pDoc = GetDocument();
		ASSERT_VALID(pDoc);
		pItem = new [!output CONTAINER_ITEM_CLASS](pDoc);
		ASSERT_VALID(pItem);

		// Inizializzare l'elemento in base ai dati della finestra di dialogo.
		if (!dlg.CreateItem(pItem))
			AfxThrowMemoryException();  // qualsiasi eccezione
		ASSERT_VALID(pItem);
		
[!if ACTIVE_DOC_CONTAINER]
		pItem->DoVerb(OLEIVERB_SHOW, this);
[!else]
        if (dlg.GetSelectionType() == COleInsertDialog::createNewItem)
			pItem->DoVerb(OLEIVERB_SHOW, this);
[!endif]

		ASSERT_VALID(pItem);
		// In qualità di progetto di interfaccia utente arbitrario, la selezione viene impostata
		//  sull'ultimo elemento inserito.

		// TODO: reimplementare la selezione in modo appropriato all'applicazione.
		m_pSelection = pItem;   // impostare la selezione sull'ultimo elemento inserito.
		pDoc->UpdateAllViews(NULL);
	}
	CATCH(CException, e)
	{
		if (pItem != NULL)
		{
			ASSERT_VALID(pItem);
			pItem->Delete();
		}
		AfxMessageBox(IDP_FAILED_TO_CREATE);
	}
	END_CATCH

	EndWaitCursor();
}

// Il seguente gestore di comandi fornisce l'interfaccia utente della
//  tastiera standard per annullare una sessione di modifica sul posto.  In questo caso,
//  il contenitore (non il server) provoca la disattivazione.
void [!output VIEW_CLASS]::OnCancelEditCntr()
{
	// Chiudere gli elementi attivi sul posto in questa visualizzazione.
	COleClientItem* pActiveItem = GetDocument()->GetInPlaceActiveItem(this);
	if (pActiveItem != NULL)
	{
		pActiveItem->Close();
	}
	ASSERT(GetDocument()->GetInPlaceActiveItem(this) == NULL);
}

// Quando un oggetto viene modificato sul posto è necessaria una particolare
//  gestione di OnSetFocus e OnSize per un contenitore.
void [!output VIEW_CLASS]::OnSetFocus(CWnd* pOldWnd)
{
	COleClientItem* pActiveItem = GetDocument()->GetInPlaceActiveItem(this);
	if (pActiveItem != NULL &&
		pActiveItem->GetItemState() == COleClientItem::activeUIState)
	{
		// è necessario impostare lo stato attivo su questo elemento se si trova nella stessa visualizzazione.
		CWnd* pWnd = pActiveItem->GetInPlaceWindow();
		if (pWnd != NULL)
		{
			pWnd->SetFocus();   // non richiamare la classe base.
			return;
		}
	}

	[!output VIEW_BASE_CLASS]::OnSetFocus(pOldWnd);
}

void [!output VIEW_CLASS]::OnSize(UINT nType, int cx, int cy)
{
	[!output VIEW_BASE_CLASS]::OnSize(nType, cx, cy);
	COleClientItem* pActiveItem = GetDocument()->GetInPlaceActiveItem(this);
	if (pActiveItem != NULL)
		pActiveItem->SetItemRects();
}

void [!output VIEW_CLASS]::OnFilePrint()
{
	//Per impostazione predefinita, è necessario che il documento attivo venga stampato
	//utilizzando IOleCommandTarget. Se non si desidera questa operazione
	//rimuovere la chiamata a COleDocObjectItem::DoDefaultPrinting.
	//Se per qualche motivo la chiamata non viene eseguita, verrà comunque tentata la stampa
	//dell'oggetto documento utilizzando l'interfaccia IPrint.
	CPrintInfo printInfo;
	ASSERT(printInfo.m_pPD != NULL); 
	if (S_OK == COleDocObjectItem::DoDefaultPrinting(this, &printInfo))
		return;
	
	CView::OnFilePrint();

}

[!endif]
[!endif]
[!if MENUBAR_TOOLBAR || RIBBON_TOOLBAR]

void [!output VIEW_CLASS]::OnRButtonUp(UINT /* nFlags */, CPoint point)
{
	ClientToScreen(&point);
	OnContextMenu(this, point);
}

void [!output VIEW_CLASS]::OnContextMenu(CWnd* /* pWnd */, CPoint point)
{
#ifndef SHARED_HANDLERS
	theApp.GetContextMenuManager()->ShowPopupMenu(IDR_POPUP_EDIT, point.x, point.y, this, TRUE);
#endif
}
[!endif]
[!if MINI_SERVER || FULL_SERVER || CONTAINER_SERVER]

// Supporto server OLE

// Il seguente gestore di comandi fornisce l'interfaccia utente della
//  tastiera standard per annullare una sessione di modifica sul posto.  In questo caso,
//  il contenitore (non il server) provoca la disattivazione.
void [!output VIEW_CLASS]::OnCancelEditSrvr()
{
	GetDocument()->OnDeactivateUI(FALSE);
}
[!endif]


// diagnostica di [!output VIEW_CLASS]

#ifdef _DEBUG
void [!output VIEW_CLASS]::AssertValid() const
{
	[!output VIEW_BASE_CLASS]::AssertValid();
}

void [!output VIEW_CLASS]::Dump(CDumpContext& dc) const
{
	[!output VIEW_BASE_CLASS]::Dump(dc);
}

[!output DOC_CLASS]* [!output VIEW_CLASS]::GetDocument() const // la versione non debug è inline.
{
	ASSERT(m_pDocument->IsKindOf(RUNTIME_CLASS([!output DOC_CLASS])));
	return ([!output DOC_CLASS]*)m_pDocument;
}
#endif //_DEBUG
[!if OLEDB_RECORD_VIEW]


// supporto database di [!output VIEW_CLASS]
CRowset<>* [!output VIEW_CLASS]::OnGetRowset()
{
	return m_pSet->GetRowsetBase();
}

[!endif]
[!if ODBC_RECORD_VIEW]


// supporto database di [!output VIEW_CLASS]
CRecordset* [!output VIEW_CLASS]::OnGetRecordset()
{
	return m_pSet;
}

[!endif]


// gestori di messaggi di [!output VIEW_CLASS]
[!if PROJECT_STYLE_EXPLORER]
[!if LIST_VIEW]
void [!output VIEW_CLASS]::OnStyleChanged(int nStyleType, LPSTYLESTRUCT lpStyleStruct)
{
	//TODO: aggiungere il codice per rispondere alla modifica apportata dall'utente allo stile di visualizzazione della finestra.	
	[!output VIEW_BASE_CLASS]::OnStyleChanged(nStyleType,lpStyleStruct);	
}
[!endif]
[!endif]
