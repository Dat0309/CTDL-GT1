========================================================================
    BIBLIOTHÈQUE MFC (MICROSOFT FOUNDATION CLASS) : Vue d'ensemble du projet [!output PROJECT_NAME]
========================================================================


AppWizard a créé cette DLL [!output PROJECT_NAME] pour vous. Cette DLL décrit non seulement les bases de l'utilisation de Microsoft Foundation Classes, mais est également un point de départ pour l'écriture de votre DLL.

Ce fichier contient un résumé du contenu de chacun des fichiers qui constituent votre DLL [!output PROJECT_NAME].

[!output PROJECT_NAME].vcxproj
    Il s'agit du fichier projet principal pour les projets VC++ générés à l'aide d'un Assistant Application. Il contient des informations sur la version de Visual C++ utilisée pour générer le fichier ainsi que des informations relatives aux plateformes, configurations et fonctionnalités du projet que vous avez sélectionnées dans l'Assistant Application.

[!output PROJECT_NAME].vcxproj.filters
    Il s'agit du fichier de filtres pour les projets VC++ générés à l'aide d'un Assistant Application. Il contient des informations sur l'association entre les fichiers de votre projet et les filtres. Cette association est utilisée dans l'IDE pour afficher le regroupement des fichiers qui ont des extensions similaires sous un nœud spécifique (par exemple, les fichiers ".cpp" sont associés au filtre "Fichiers sources").

[!if DLL_TYPE_EXTENSION]
[!output PROJECT_NAME].cpp
    Il s'agit du fichier source DLL principal qui contient la définition de DllMain().
[!else]
[!output PROJECT_NAME].h
    Il s'agit du fichier d'en-tête principal pour la DLL. Il déclare la classe [!output APP_CLASS].

[!output PROJECT_NAME].cpp
    Il s'agit du fichier source principal de la DLL. Il contient la classe    [!output APP_CLASS].
[!if AUTOMATION]
    Il contient également les points d'entrée OLE requis des serveurs inproc.
[!endif]
[!endif]
[!if AUTOMATION]

[!output SAFE_IDL_NAME].idl
    Ce fichier contient le code source ODL (Object Description Language) pour la bibliothèque de types de votre DLL.
[!endif]

[!output RC_FILE_NAME]
    Il s'agit de la liste de toutes les ressources Microsoft Windows utilisées par le programme. Il inclut les icônes, les bitmaps et les curseurs qui sont stockés dans le sous-répertoire RES. Ce fichier peut être directement modifié dans Microsoft Visual C++.

res\[!output RC2_FILE_NAME].rc2
    Ce fichier contient les ressources qui ne sont pas modifiées par Microsoft Visual C++. Vous devez placer toutes les ressources non modifiables par l'éditeur de ressources dans ce fichier.

[!output PROJECT_NAME].def
    Ce fichier contient des informations relatives à la DLL du contrôle ActiveX qui doit être exécutée avec Microsoft Windows. Il définit les paramètres tels que le nom et la description de la DLL. Il exporte également les fonctions de la DLL.

/////////////////////////////////////////////////////////////////////////////
Autres fichiers standard :

StdAfx.h, StdAfx.cpp
    Ces fichiers sont utilisés pour générer un fichier d'en-tête précompilé (PCH) [!output PROJECT_NAME].pch et un fichier de type précompilé nommé StdAfx.obj.

Resource.h
    Il s'agit du ficher d'en-tête standard, qui définit les nouveaux ID de ressources. Microsoft Visual C++ lit et met à jour ce fichier.

/////////////////////////////////////////////////////////////////////////////
Autres remarques :

AppWizard utilise des commentaires "TODO:" pour indiquer les parties du code source où vous devrez ajouter ou modifier du code.

/////////////////////////////////////////////////////////////////////////////
