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

// [!output WND_VIEW_HEADER] : interface de la classe [!output WND_VIEW_CLASS]
//


#pragma once


// fenêtre [!output WND_VIEW_CLASS]

class [!output WND_VIEW_CLASS] : public [!output WND_VIEW_BASE_CLASS]
{
// Construction
public:
	[!output WND_VIEW_CLASS]();

// Attributs
public:

// Opérations
public:

// Substitutions
	protected:
	virtual BOOL PreCreateWindow(CREATESTRUCT& cs);

// Implémentation
public:
	virtual ~[!output WND_VIEW_CLASS]();

	// Fonctions générées de la table des messages
protected:
	afx_msg void OnPaint();
	DECLARE_MESSAGE_MAP()
};

