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

// [!output ROWSET_IMPL] : implémentation de la classe [!output ROWSET_CLASS]
//

#include "stdafx.h"
#include "[!output APP_HEADER]"
#include "[!output ROWSET_HEADER]"

#ifdef _DEBUG
#define new DEBUG_NEW
#endif


// implémentation de [!output ROWSET_CLASS]

[!if ODBC]
[!output ROWSET_CLASS_ODBC_IMPL]
[!endif]
