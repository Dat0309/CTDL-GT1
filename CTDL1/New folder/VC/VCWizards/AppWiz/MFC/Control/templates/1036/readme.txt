========================================================================
    DLL DE CONTRÔLE ACTIVEX : Vue d'ensemble du projet [!output PROJECT_NAME]
========================================================================

ControlWizard a créé ce projet pour votre DLL de contrôle ActiveX [!output PROJECT_NAME], qui contient 1 contrôle.

Ce squelette de projet décrit non seulement les bases de l'écriture d'un contrôle ActiveX, mais est également un point de départ pour l'écriture de fonctionnalités spécifiques à votre contrôle.

Ce fichier contient un résumé du contenu de chacun des fichiers qui constituent votre DLL de contrôle ActiveX [!output PROJECT_NAME].

[!output PROJECT_NAME].vcxproj
    Il s'agit du fichier projet principal pour les projets VC++ générés à l'aide d'un Assistant Application. Il contient des informations sur la version de Visual C++ utilisée pour générer le fichier ainsi que des informations relatives aux plateformes, configurations et fonctionnalités du projet que vous avez sélectionnées dans l'Assistant Application.

[!output PROJECT_NAME].vcxproj.filters
    Il s'agit du fichier de filtres pour les projets VC++ générés à l'aide d'un Assistant Application. Il contient des informations sur l'association entre les fichiers de votre projet et les filtres. Cette association est utilisée dans l'IDE pour afficher le regroupement des fichiers qui ont des extensions similaires sous un nœud spécifique (par exemple, les fichiers ".cpp" sont associés au filtre "Fichiers sources").

[!output PROJECT_NAME].h
    Il s'agit du fichier Include principal pour la DLL du contrôle ActiveX. Il comprend d'autres fichiers Include spécifiques au projet tels que resource.h.

[!output PROJECT_NAME].cpp
    Il s'agit du fichier source principal qui contient le code pour l'initialisation de la DLL, sa finalisation et d'autres opérations.

[!output RC_FILE_NAME]
    Il s'agit de la liste des ressources Microsoft Windows que le projet utilise. Ce fichier peut être modifié directement dans l'éditeur de ressources Visual C++.

[!output PROJECT_NAME].def
    Ce fichier contient des informations relatives à la DLL de contrôle ActiveX qui doit être exécutée avec Microsoft Windows.

[!output SAFE_IDL_NAME].idl
    Ce fichier contient le code source ODL (Object Description Language) pour la bibliothèque de types de votre contrôle.

[!if ABOUT_BOX]
[!output PROJECT_NAME].ico
    Ce fichier contient une icône qui s'affichera dans la boîte de dialogue À propos de. Cette icône est incluse par le fichier de ressources principal [!output PROJECT_NAME].rc.

[!endif]
/////////////////////////////////////////////////////////////////////////////
[!output CONTROL_CLASS] control:

[!output CONTROL_HEADER]
    Ce fichier contient la déclaration de la classe C++ [!output CONTROL_CLASS].

[!output CONTROL_IMPL]
    Ce fichier contient l'implémentation de la classe C++ [!output CONTROL_CLASS].

[!output PROPERTY_PAGE_HEADER]
    Ce fichier contient la déclaration de la classe C++ [!output PROPERTY_PAGE_CLASS].

[!output PROPERTY_PAGE_IMPL]
    Ce fichier contient l'implémentation de la classe C++ [!output PROPERTY_PAGE_CLASS].

[!output CONTROL_CLASS].bmp
    Ce fichier contient une bitmap qu'un conteneur utilisera pour représenter le contrôle [!output CONTROL_CLASS] lorsqu'il s'affiche dans une boîte à outils. Cette bitmap est incluse par le fichier de ressources principal [!output PROJECT_NAME].rc.

[!if HELP_FILES]
/////////////////////////////////////////////////////////////////////////////
Prise en charge de l'aide:

[!output PROJECT_NAME].hpj
    Il s'agit du fichier d'aide du projet utilisé par le compilateur d'aide pour créer votre fichier d'aide du contrôle ActiveX.

*.bmp
    Il s'agit de fichiers bitmap requis par le fichier des rubriques d'aide standard pour les commandes standard de la bibliothèque MFC (Microsoft Foundation Class). Ces fichiers se trouvent dans le sous-répertoire HLP.

[!output PROJECT_NAME].rtf
    Ce fichier contient les rubriques d'aide standard pour les propriétés, les événements et les méthodes communs pris en charge par de nombreux contrôles ActiveX. Vous pouvez le modifier pour ajouter ou supprimer des rubriques supplémentaires spécifiques au contrôle. Ce fichier se trouve dans le sous-répertoire HLP.

[!endif]
[!if RUNTIME_LICENSE]
/////////////////////////////////////////////////////////////////////////////
Prise en charge des licences:

[!output PROJECT_NAME].lic
    Il s'agit du fichier de licence utilisateur. Ce fichier doit être présent dans le même répertoire que la DLL du contrôle pour permettre la création d'une instance du contrôle dans un environnement au moment du design. En règle générale, vous distribuez ce fichier avec votre contrôle, mais vos clients ne le distribuent pas.

[!endif]
/////////////////////////////////////////////////////////////////////////////
Autres fichiers standard :

stdafx.h, stdafx.cpp
    Ces fichiers sont utilisés pour générer un fichier d'en-tête précompilé (PCH) nommé [!output PROJECT_NAME].pch et un fichier de type précompilé (PCT) nommé stdafx.obj.

resource.h
    Il s'agit du ficher d'en-tête standard, qui définit les nouveaux ID de ressources. L'éditeur de ressources Visual C++ lit et met à jour ce fichier.

/////////////////////////////////////////////////////////////////////////////
Autres remarques :

ControlWizard utilise des commentaires "TODO:" pour indiquer les parties du code source où vous devrez ajouter ou modifier du code.

/////////////////////////////////////////////////////////////////////////////
