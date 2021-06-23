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

// [!output DIALOG_AUTO_PROXY_HEADER]: file di intestazione
//

#pragma once

class [!output DIALOG_CLASS];


// destinazione del comando di [!output DIALOG_AUTO_PROXY_CLASS] 

class [!output DIALOG_AUTO_PROXY_CLASS] : public [!output DIALOG_AUTO_PROXY_BASE_CLASS]
{
	DECLARE_DYNCREATE([!output DIALOG_AUTO_PROXY_CLASS])

	[!output DIALOG_AUTO_PROXY_CLASS]();           // costruttore protetto utilizzato dalla creazione dinamica

// Attributi
public:
	[!output DIALOG_CLASS]* m_pDialog;

// Operazioni
public:

// Sostituzioni
	public:
	virtual void OnFinalRelease();

// Implementazione
protected:
	virtual ~[!output DIALOG_AUTO_PROXY_CLASS]();

	// Funzioni generate per la mappa dei messaggi

	DECLARE_MESSAGE_MAP()
	DECLARE_OLECREATE([!output DIALOG_AUTO_PROXY_CLASS])

	// Funzioni generate per la mappa di invio OLE

	DECLARE_DISPATCH_MAP()
	DECLARE_INTERFACE_MAP()
};

