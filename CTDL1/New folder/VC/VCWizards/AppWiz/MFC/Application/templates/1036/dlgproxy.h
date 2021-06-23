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

// [!output DIALOG_AUTO_PROXY_HEADER] : fichier d'en-tête
//

#pragma once

class [!output DIALOG_CLASS];


// cible de la commande [!output DIALOG_AUTO_PROXY_CLASS]

class [!output DIALOG_AUTO_PROXY_CLASS] : public [!output DIALOG_AUTO_PROXY_BASE_CLASS]
{
	DECLARE_DYNCREATE([!output DIALOG_AUTO_PROXY_CLASS])

	[!output DIALOG_AUTO_PROXY_CLASS]();           // constructeur protégé utilisé par la création dynamique

// Attributs
public:
	[!output DIALOG_CLASS]* m_pDialog;

// Opérations
public:

// Substitutions
	public:
	virtual void OnFinalRelease();

// Implémentation
protected:
	virtual ~[!output DIALOG_AUTO_PROXY_CLASS]();

	// Fonctions générées de la table des messages

	DECLARE_MESSAGE_MAP()
	DECLARE_OLECREATE([!output DIALOG_AUTO_PROXY_CLASS])

	// Fonctions générées de la table de dispatch OLE

	DECLARE_DISPATCH_MAP()
	DECLARE_INTERFACE_MAP()
};

