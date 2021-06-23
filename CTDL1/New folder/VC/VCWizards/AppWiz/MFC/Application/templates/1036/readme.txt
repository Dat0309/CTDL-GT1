================================================================================
    BIBLIOTHÈQUE MFC (MICROSOFT FOUNDATION CLASS) : Vue d'ensemble du projet [!output PROJECT_NAME]
===============================================================================

L'Assistant Application a créé cette application [!output PROJECT_NAME] pour vous. Cette application décrit non seulement les bases de l'utilisation de Microsoft Foundation Classes, mais est également un point de départ pour l'écriture de votre application.

Ce fichier contient un résumé du contenu de chacun des fichiers qui constituent votre application [!output PROJECT_NAME].

[!output PROJECT_NAME].vcxproj
    Il s'agit du fichier projet principal pour les projets VC++ générés à l'aide d'un Assistant Application. Il contient des informations sur la version de Visual C++ utilisée pour générer le fichier ainsi que des informations relatives aux plateformes, configurations et fonctionnalités du projet que vous avez sélectionnées dans l'Assistant Application.

[!output PROJECT_NAME].vcxproj.filters
    Il s'agit du fichier de filtres pour les projets VC++ générés à l'aide d'un Assistant Application. Il contient des informations sur l'association entre les fichiers de votre projet et les filtres. Cette association est utilisée dans l'IDE pour afficher le regroupement des fichiers qui ont des extensions similaires sous un nœud spécifique (par exemple, les fichiers ".cpp" sont associés au filtre "Fichiers sources").

[!output APP_HEADER]
    Il s'agit du fichier d'en-tête principal pour l'application.
    Il comprend d'autres en-têtes spécifiques au projet (notamment Resource.h) et déclare la classe d'application [!output APP_CLASS].

[!output APP_IMPL]
    Il s'agit du fichier source principal de l'application qui contient la classe d'application [!output APP_CLASS].

[!output RC_FILE_NAME]
    Il s'agit de la liste de toutes les ressources Microsoft Windows utilisées par le programme. Il inclut les icônes, les bitmaps et les curseurs qui sont stockés dans le sous-répertoire RES. Ce fichier peut être directement modifié dans Microsoft Visual C++. Les ressources de votre projet se trouvent dans [!output LCID].

res\[!output PROJECT_NAME].ico
    Il s'agit d'un fichier icône, qui est utilisé comme icône de l'application. Cette icône est incluse par le fichier de ressources principal [!output PROJECT_NAME].rc.

res\[!output RC2_FILE_NAME].rc2
    Ce fichier contient les ressources qui ne sont pas modifiées par Microsoft Visual C++. Vous devez placer toutes les ressources non modifiables par l'éditeur de ressources dans ce fichier.
[!if CONTAINER_SERVER || FULL_SERVER || MINI_SERVER || AUTOMATION || HAS_SUFFIX]
[!if !HTML_EDITVIEW]

[!output PROJECT_NAME].reg
    Il s'agit d'un exemple de fichier.reg qui vous indique le genre de paramètres d'inscription que l'infrastructure définira pour vous. Utilisez-le en tant que fichier .reg
[!if APP_TYPE_DLG]
    à joindre à votre application.
[!else]
    à joindre à votre application ou le supprimer et utiliser l'inscription par défaut RegisterShellFileTypes.
[!endif]

[!if AUTOMATION]
[!output SAFE_IDL_NAME].idl
    Ce fichier contient le code source IDL (Interface Definition Language) pour la bibliothèque de types de votre application.
[!endif]
[!endif]
[!endif]

[!if !APP_TYPE_DLG]
/////////////////////////////////////////////////////////////////////////////

Pour la fenêtre frame principale :
[!if PROJECT_STYLE_EXPLORER]
    Style Explorateur Windows : le projet inclura une interface de type Windows Explorer avec deux frames.
[!else]
    Le projet inclut une interface MFC standard.
[!endif]

[!output MAIN_FRAME_HEADER], [!output MAIN_FRAME_IMPL]
    Ces fichiers contiennent la classe frame [!output MAIN_FRAME_CLASS], qui est dérivée de
[!if APP_TYPE_MDI || APP_TYPE_TABBED_MDI]
[!if APP_TYPE_MDI]
    CMDIFrameWnd et contrôle toutes les fonctionnalités frame MDI.
[!else]
    CMDITabbedFrameWnd et contrôle toutes les fonctionnalités frame MDI.
[!endif]
[!else]
    CFrameWnd et contrôle toutes les fonctionnalités frame SDI.
[!endif]
[!if PROJECT_STYLE_EXPLORER]

[!output TREE_VIEW_HEADER], [!output TREE_VIEW_IMPL]
    Ces fichiers contiennent la classe frame de gauche [!output TREE_VIEW_CLASS], qui est dérivée de CTreeView.
[!endif]

[!if DOCKING_TOOLBAR || TOOLBAR_STYLE_REBAR || MENUBAR_TOOLBAR || RIBBON_TOOLBAR]
res\Toolbar.bmp
    Ce fichier bitmap est utilisé pour créer des images en mosaïque pour la barre d'outils.
    La barre d'outils et la barre d'état initiales sont construites dans la classe [!output MAIN_FRAME_CLASS]. Modifiez cette bitmap de barre d'outils à l'aide de l'éditeur de ressources et mettez à jour le tableau IDR_MAINFRAME TOOLBAR dans [!output PROJECT_NAME].rc de façon à ajouter des boutons de barre d'outils.
[!if MINI_SERVER || FULL_SERVER || CONTAINER_SERVER]

res\IToolbar.bmp
    Ce fichier bitmap est utilisé pour créer des images en mosaïque pour la barre d'outils lorsque votre application serveur est activée sur place dans un autre conteneur. Cette barre d'outils est construite dans la classe [!output INPLACE_FRAME_CLASS]. Cette bitmap est semblable à la bitmap située dans res\Toolbar.bmp, à ceci près que de nombreuses commandes non-serveur ont été supprimées.

[!endif]
[!endif]
[!if APP_TYPE_MDI || APP_TYPE_TABBED_MDI]
/////////////////////////////////////////////////////////////////////////////

Pour la fenêtre frame enfant :

ChildFrm.h, ChildFrm.cpp
    Ces fichiers définissent et implémentent la classe [!output CHILD_FRAME_CLASS], qui prend en charge les fenêtres enfants dans une application MDI.

[!endif]
/////////////////////////////////////////////////////////////////////////////

[!if DOCVIEW]
[!if !DB_VIEW_NO_FILE]
L'Assistant Application crée un type de document et une vue :

[!output DOC_HEADER], [!output DOC_IMPL] - le document
    Ces fichiers contiennent votre classe [!output DOC_CLASS]. Modifiez ces fichiers pour ajouter vos données spéciales de document et implémenter l'enregistrement et le chargement de fichier (via [!output DOC_CLASS]::Serialize).
[!if HAS_SUFFIX && !HTML_EDITVIEW]
    Le document contiendra les chaînes suivantes :
        Extension de fichier :      [!output FILE_EXTENSION]
        ID de type de fichier :        [!output FILE_TYPE_ID]
        Titre du frame principal :  [!output MAIN_FRAME_CAPTION]
        Nom du type de document :       [!output DOC_TYPE_NAME]
        Nom du filtre :         [!output FILTER_NAME]
        Nom court de nouveau fichier : [!output FILE_NEW_NAME_SHORT]
        Nom long du type de fichier : [!output FILE_NEW_NAME_LONG]
[!endif]
[!else]
L'Assistant Application crée une vue :
[!endif]

[!output VIEW_HEADER], [!output VIEW_IMPL] - la vue du document
    Ces fichiers contiennent votre classe [!output VIEW_CLASS].
[!if !DB_VIEW_NO_FILE]
    Les objets [!output VIEW_CLASS] sont utilisés pour afficher les objets [!output DOC_CLASS].
[!endif]

[!if APP_TYPE_MDI || APP_TYPE_TABBED_MDI]
res\[!output PROJECT_NAME]Doc.ico
    Il s'agit d'un fichier icône, qui est utilisé comme icône pour les fenêtres enfants MDI de la classe [!output DOC_CLASS]. Cette icône est incluse par le fichier de ressources principal [!output PROJECT_NAME].rc.
[!endif]

[!endif]

[!if DB_VIEW_NO_FILE || DB_VIEW_WITH_FILE]
/////////////////////////////////////////////////////////////////////////////

Prise en charge des bases de données :

[!output ROWSET_HEADER], [!output ROWSET_IMPL]
    Ces fichiers contiennent votre classe [!output ROWSET_CLASS]. Cette classe est utilisée pour accéder à la source de données que vous avez sélectionnée dans l'Assistant.
[!if DB_VIEW_NO_FILE]
    Aucune prise en charge de la sérialisation ne sera ajoutée.
[!else]
    La prise en charge de la sérialisation a été ajoutée.
[!endif]
[!endif]
[!if CONTAINER || FULL_SERVER || MINI_SERVER || CONTAINER_SERVER]
/////////////////////////////////////////////////////////////////////////////

L'Assistant Application a aussi créé des classes spécifiques à OLE

[!if CONTAINER || CONTAINER_SERVER]
[!output CONTAINER_ITEM_HEADER], [!output CONTAINER_ITEM_IMPL]
    Ces fichiers contiennent votre classe [!output CONTAINER_ITEM_CLASS]. Cette classe permet de manipuler des objets OLE. Les objets OLE sont généralement affichés par votre classe [!output VIEW_CLASS] et sérialisés dans le cadre de votre classe [!output DOC_CLASS].
[!if ACTIVE_DOC_CONTAINER]
    Le programme inclut la prise en charge pour contenir des documents actifs dans son frame.
[!endif]
[!endif]
[!if MINI_SERVER || FULL_SERVER || CONTAINER_SERVER]

[!output SERVER_ITEM_HEADER], [!output SERVER_ITEM_IMPL]
    Ces fichiers contiennent votre classe [!output SERVER_ITEM_CLASS]. Cette classe permet de connecter votre classe [!output DOC_CLASS] au système OLE, et éventuellement de fournir des liens vers votre document.
[!if ACTIVE_DOC_SERVER]
    Le projet permet également de créer et de gérer des documents actifs.
[!endif]

[!output INPLACE_FRAME_HEADER], [!output INPLACE_FRAME_IMPL]
    Ces fichiers contiennent votre classe [!output INPLACE_FRAME_CLASS]. Cette classe est dérivée de COleIPFrameWnd et contrôle toutes les fonctionnalités frame pendant l'activation sur place.
[!endif]

[!if SUPPORT_COMPOUND_FILES]
    Le projet prend en charge les fichiers composés. Le format de fichier composé stocke un document qui contient un ou plusieurs objets Automation dans un fichier, tout en permettant l'accès pour les objets individuels.
[!endif]
[!endif]
[!else]

/////////////////////////////////////////////////////////////////////////////

[!if AUTOMATION]
L'Assistant Application crée une classe de boîte de dialogue et une classe de proxy Automation :
[!else]
L'Assistant Application crée une classe de boîte de dialogue :
[!endif]

[!output DIALOG_HEADER], [!output DIALOG_IMPL] - la boîte de dialogue
    Ces fichiers contiennent votre classe [!output DIALOG_CLASS]. Cette classe définit le comportement de la boîte de dialogue principale de votre application. Le modèle de la boîte de dialogue se trouve dans [!output PROJECT_NAME].rc, qui peut être modifié dans Microsoft Visual C++.
[!if AUTOMATION]

[!output DIALOG_AUTO_PROXY_HEADER], [!output DIALOG_AUTO_PROXY_IMPL] - l'objet Automation
    Ces fichiers contiennent votre classe [!output DIALOG_AUTO_PROXY_CLASS]. Cette classe est appelée classe de proxy Automation pour votre boîte de dialogue, car elle se charge d'exposer les méthodes et des propriétés d'Automation que les contrôleurs Automation peuvent utiliser pour accéder à votre boîte de dialogue. Ces méthodes et propriétés ne sont pas exposées directement à partir de la classe de boîte de dialogue, car dans le cas d'une application MFC basée sur une boîte de dialogue modale, il est plus efficace et facile de conserver l'objet Automation séparé de l'interface utilisateur.
[!endif]
[!endif]

[!if ACTIVEX_CONTROLS || PRINTING || SPLITTER || MAPI || SOCKETS]
/////////////////////////////////////////////////////////////////////////////

Autres fonctionnalités :
[!if ACTIVEX_CONTROLS]

Contrôles ActiveX
    L'application inclut la prise en charge pour l'utilisation des contrôles ActiveX.
[!endif]
[!if PRINTING]

Prise en charge de l'impression et de l'aperçu avant impression
    L'Assistant Application a généré le code pour gérer les commandes d'impression, de configuration de l'impression et d'aperçu avant impression en appelant les fonctions membres dans la classe CView à partir de la bibliothèque MFC.
[!endif]
[!if DB_SUPPORT_HEADER_ONLY && !APP_TYPE_DLG]

Prise en charge des bases de données
    L'Assistant Application a ajouté le niveau de base de prise en charge des bases de données pour votre programme. Seuls les fichiers nécessaires ont été inclus.
[!endif]
[!if SPLITTER && !APP_TYPE_DLG]

Fenêtre fractionnée
    L'Assistant Application a ajouté la prise en charge des fenêtres fractionnées pour les documents de votre application.
[!endif]
[!if MAPI]

Prise en charge MAPI
    Le projet généré contient le code nécessaire pour créer, manipuler, transférer et stocker les messages électroniques.
[!endif]
[!if SOCKETS]

Windows Sockets
    L'application prend en charge l'établissement de communications via des réseaux TCP/IP.
[!endif]

[!endif]
/////////////////////////////////////////////////////////////////////////////

Autres fichiers standard :

StdAfx.h, StdAfx.cpp
    Ces fichiers sont utilisés pour générer un fichier d'en-tête précompilé (PCH) [!output PROJECT_NAME].pch et un fichier de type précompilé nommé StdAfx.obj.

Resource.h
    Il s'agit du ficher d'en-tête standard, qui définit les nouveaux ID de ressources. Microsoft Visual C++ lit et met à jour ce fichier.

[!if MANIFEST]
[!output PROJECT_NAME].manifest
	Windows XP utilise les fichiers de manifeste d'application pour décrire la dépendance d'une application sur des versions spécifiques d'assemblys côte à côte. Le chargeur utilise ces informations pour charger l'assembly approprié à partir du cache d'assembly ou privé à partir de l'application. Le manifeste d'application peut être inclus pour une redistribution en tant que fichier .manifest installé dans le même dossier que l'exécutable de l'application. Il peut aussi être inclus dans l'exécutable sous la forme d'une ressource.
[!endif]
/////////////////////////////////////////////////////////////////////////////

Autres remarques :

L'Assistant Application utilise des commentaires "TODO:" pour indiquer les parties du code source où vous devrez ajouter ou modifier du code.
[!if APP_TYPE_MDI || APP_TYPE_TABBED_MDI || APP_TYPE_SDI || APP_TYPE_DLG || APP_TYPE_MTLD]

Si votre application utilise des MFC dans une DLL partagée, vous devez redistribuer les DLL MFC. Si la langue de votre application ne correspond pas aux paramètres régionaux du système d'exploitation, vous devrez également redistribuer les ressources localisées correspondantes mfc110XXX.DLL.
Pour plus d'informations sur ces deux rubriques, consultez la section sur la redistribution des applications Visual C++ dans la documentation MSDN.
[!endif]

/////////////////////////////////////////////////////////////////////////////
