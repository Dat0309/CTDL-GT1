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

// [!output APP_HEADER] : file di intestazione principale per l'applicazione PROJECT_NAME
//

#pragma once

#ifndef __AFXWIN_H__
	#error "includere 'stdafx.h' prima di includere questo file per PCH"
#endif

#include "resource.h"		// simboli principali


// [!output APP_CLASS]:
// Vedere [!output APP_IMPL] per l'implementazione di questa classe
//

class [!output APP_CLASS] : public [!output APP_BASE_CLASS]
{
public:
	[!output APP_CLASS]();

// Override
public:
	virtual BOOL InitInstance();
[!if AUTOMATION || ACCESSIBILITY]
	virtual int ExitInstance();
[!endif]

// Implementazione

	DECLARE_MESSAGE_MAP()
};

extern [!output APP_CLASS] theApp;