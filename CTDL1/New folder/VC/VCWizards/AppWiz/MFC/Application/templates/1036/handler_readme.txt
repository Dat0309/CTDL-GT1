========================================================================
    ACTIVE TEMPLATE LIBRARY : Vue d'ensemble du projet [!output PROJECT_NAME]
========================================================================

AppWizard a créé ce projet [!output PROJECT_NAME] pour vous permettre de l'utiliser comme point de départ pour
l'écriture de votre bibliothèque de liens dynamiques (DLL).

Ce fichier contient un résumé du contenu de chacun des fichiers qui constituent votre projet.

[!output PROJECT_NAME].vcxproj
    Il s'agit du fichier projet principal pour les projets VC++ générés à l'aide d'un Assistant Application. Il contient des informations sur la version de Visual C++ utilisée pour générer le fichier ainsi que des informations relatives aux plateformes, configurations et fonctionnalités du projet que vous avez sélectionnées dans l'Assistant Application.

[!output PROJECT_NAME].vcxproj.filters
    Il s'agit du fichier de filtres pour les projets VC++ générés à l'aide d'un Assistant Application. Il contient des informations sur l'association entre les fichiers de votre projet et les filtres. Cette association est utilisée dans l'IDE pour afficher le regroupement des fichiers qui ont des extensions similaires sous un nœud spécifique (par exemple, les fichiers ".cpp" sont associés au filtre "Fichiers sources").

[!output SAFE_IDL_NAME].idl
    Ce fichier contient les définitions IDL de la bibliothèque de types, des interfaces et des co-classes définies dans votre projet.
    Ce fichier sera traité par le compilateur MIDL pour générer :
        des définitions d'interface C++ et des déclarations GUID ([!output SAFE_IDL_NAME].h)
        des définitions GUID                                ([!output SAFE_IDL_NAME]_i.c)
        une bibliothèque de types                                  ([!output SAFE_IDL_NAME].tlb)
        du code de marshaling                                 ([!output SAFE_IDL_NAME]_p.c et dlldata.c)

[!output SAFE_IDL_NAME].h
    Ce fichier contient les définitions d'interface C++ ainsi que les déclarations GUID des éléments définis dans le fichier [!output SAFE_IDL_NAME].idl. Il sera régénéré par MIDL lors de la compilation.

[!output PROJECT_NAME].cpp
    Ce fichier contient la table des objets et l'implémentation des exportations de votre DLL.

[!output PROJECT_NAME].rc
    Il s'agit de la liste de toutes les ressources Microsoft Windows utilisées par le programme.

[!if DLL_APP]
[!output PROJECT_NAME].def
    Ce fichier de définition de module fournit à l'éditeur de liens des informations sur les exportations requises par votre DLL. Il contient des exportations des éléments suivants :
        DllGetClassObject
        DllCanUnloadNow
        DllRegisterServer
        DllUnregisterServer
        DllInstall
[!endif]

/////////////////////////////////////////////////////////////////////////////
Autres fichiers standard :

StdAfx.h, StdAfx.cpp
    Ces fichiers sont utilisés pour générer un fichier d'en-tête précompilé (PCH) [!output PROJECT_NAME].pch et un fichier de type précompilé nommé StdAfx.obj.

Resource.h
    Il s'agit du ficher d'en-tête standard, qui définit les ID de ressources.

/////////////////////////////////////////////////////////////////////////////
Autres remarques :

	L'option de prise en charge des MFC génère les bibliothèques MFC (Microsoft Foundation Class) dans votre application squelette, mettant ainsi les classes, objets et fonctions des MFC à votre disposition.
/////////////////////////////////////////////////////////////////////////////
