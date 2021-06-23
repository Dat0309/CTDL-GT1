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

// [!output TREE_VIEW_HEADER] : interfaccia della classe [!output TREE_VIEW_CLASS]
//


#pragma once

class [!output DOC_CLASS];

class [!output TREE_VIEW_CLASS] : public CTreeView
{
protected: // creare solo da serializzazione.
	[!output TREE_VIEW_CLASS]();
	DECLARE_DYNCREATE([!output TREE_VIEW_CLASS])

// Attributi
public:
	[!output DOC_CLASS]* GetDocument();

// Operazioni
public:

// Sostituzioni
	public:
	virtual BOOL PreCreateWindow(CREATESTRUCT& cs);
	protected:
[!if PRINTING]
	virtual BOOL OnPreparePrinting(CPrintInfo* pInfo);
	virtual void OnBeginPrinting(CDC* pDC, CPrintInfo* pInfo);
	virtual void OnEndPrinting(CDC* pDC, CPrintInfo* pInfo);
	virtual void OnDraw(CDC* pDC);
[!endif]
	virtual void OnInitialUpdate(); // richiamato la prima volta dopo la costruzione

// Implementazione
public:
	virtual ~[!output TREE_VIEW_CLASS]();
#ifdef _DEBUG
	virtual void AssertValid() const;
	virtual void Dump(CDumpContext& dc) const;
#endif

protected:

// Funzioni generate per la mappa dei messaggi
protected:
	DECLARE_MESSAGE_MAP()
};

#ifndef _DEBUG  // versione di debug in [!output TREE_VIEW_IMPL]
inline [!output DOC_CLASS]* [!output TREE_VIEW_CLASS]::GetDocument()
   { return reinterpret_cast<[!output DOC_CLASS]*>(m_pDocument); }
#endif

