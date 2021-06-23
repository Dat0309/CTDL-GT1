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

// [!output SERVER_ITEM_HEADER] : interface de la classe [!output SERVER_ITEM_CLASS]
//

#pragma once

class [!output SERVER_ITEM_CLASS] : public [!output SERVER_ITEM_BASE_CLASS]
{
	DECLARE_DYNAMIC([!output SERVER_ITEM_CLASS])

// Constructeurs
public:
	[!output SERVER_ITEM_CLASS]([!output DOC_CLASS]* pContainerDoc);

// Attributs
	[!output DOC_CLASS]* GetDocument() const
		{ return reinterpret_cast<[!output DOC_CLASS]*>([!output SERVER_ITEM_BASE_CLASS]::GetDocument()); }

// Substitutions
	public:
	virtual BOOL OnDraw(CDC* pDC, CSize& rSize);
	virtual BOOL OnGetExtent(DVASPECT dwDrawAspect, CSize& rSize);

// Implémentation
public:
	~[!output SERVER_ITEM_CLASS]();
#ifdef _DEBUG
	virtual void AssertValid() const;
	virtual void Dump(CDumpContext& dc) const;
#endif

protected:
	virtual void Serialize(CArchive& ar);   // substitué pour le document d'E/S
};

