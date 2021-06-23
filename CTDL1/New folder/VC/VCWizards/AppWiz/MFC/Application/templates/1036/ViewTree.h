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

#pragma once

/////////////////////////////////////////////////////////////////////////////
// Fenêtre de CViewTree

class CViewTree : public CTreeCtrl
{
// Construction
public:
	CViewTree();

// Substitutions
protected:
	virtual BOOL OnNotify(WPARAM wParam, LPARAM lParam, LRESULT* pResult);

// Implémentation
public:
	virtual ~CViewTree();

protected:
	DECLARE_MESSAGE_MAP()
};
