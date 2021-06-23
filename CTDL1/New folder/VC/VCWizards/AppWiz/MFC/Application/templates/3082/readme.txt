================================================================================
    BIBLIOTECA MICROSOFT FOUNDATION CLASS: Información general del proyecto[!output PROJECT_NAME]
===============================================================================

El asistente para aplicaciones ha creado esta aplicación [!output PROJECT_NAME]. Esta aplicación no solo muestra las bases de la utilización de Microsoft Foundation Classes, también es un punto de partida para escribir la aplicación.

Este archivo contiene un resumen de lo que encontrará en cada uno de los archivos que constituyen la aplicación [!output PROJECT_NAME].

[!output PROJECT_NAME].vcxproj
    Este es el archivo de proyecto principal para los proyectos de VC++ generados mediante un asistente para aplicaciones. Contiene información acerca de la versión de Visual C++ con la que se generó el archivo, así como información acerca de las plataformas, configuraciones y características del proyecto seleccionadas en el asistente para aplicaciones.

[!output PROJECT_NAME].vcxproj.filters
    Éste es el archivo de filtros para los proyectos de VC++ generados mediante un asistente para aplicaciones. Contiene información acerca de la asociación entre los archivos del proyecto y los filtros. Esta asociación se usa en el IDE para mostrar la agrupación de archivos con extensiones similares bajo un nodo específico (por ejemplo, los archivos ".cpp" se asocian con el filtro"Archivos de código fuente").

[!output APP_HEADER]
    Este es el archivo de encabezado principal para la aplicación.
    Incluye otros encabezados específicos del proyecto (incluido Resource.h) y declara la clase de aplicación [!output APP_CLASS].

[!output APP_IMPL]
    Este es el archivo de código fuente de la aplicación principal que contiene la clase de aplicación [!output APP_CLASS].

[!output RC_FILE_NAME]
    Esta es una lista de todos los recursos de Microsoft Windows que usa el programa. Incluye los iconos, mapas de bits y cursores almacenados en el subdirectorio RES. Este archivo puede editarse directamente en Microsoft Visual C++. Los recursos del proyecto se encuentran en [!output LCID].

res\[!output PROJECT_NAME].ico
    Este es un archivo de icono, que se usa como el icono de la aplicación. Este icono está incluido en el archivo principal de recursos [!output PROJECT_NAME].rc.

res\[!output RC2_FILE_NAME].rc2
    Este archivo incluye recursos no editados por Microsoft Visual C++. Se deberían colocar en este archivo todos los recursos que no pueden editarse mediante el editor de recursos.
[!if CONTAINER_SERVER || FULL_SERVER || MINI_SERVER || AUTOMATION || HAS_SUFFIX]
[!if !HTML_EDITVIEW]

[!output PROJECT_NAME].reg
    Este es un archivo .reg de ejemplo que muestra el tipo de configuración de registro que establecerá el marco. Puede usarse como archivo .reg
[!if APP_TYPE_DLG]
    para utilizar con la aplicación.
[!else]
    para utilizar con la aplicación, o bien elimínelo y use el registro RegisterShellFileTypes predeterminado.
[!endif]

[!if AUTOMATION]
[!output SAFE_IDL_NAME].idl
    Este archivo contiene el código fuente del lenguaje de descripción de interfaces para la biblioteca de tipos de la aplicación.
[!endif]
[!endif]
[!endif]

[!if !APP_TYPE_DLG]
/////////////////////////////////////////////////////////////////////////////

Para la ventana de marco principal:
[!if PROJECT_STYLE_EXPLORER]
    Estilo Explorador de Windows: el proyecto incluirá una interfaz similar a la del Explorador de Windows, con dos marcos.
[!else]
    El proyecto incluye una interfaz de MFC estándar.
[!endif]

[!output MAIN_FRAME_HEADER], [!output MAIN_FRAME_IMPL]
    Estos archivos contienen la clase de marco [!output MAIN_FRAME_CLASS], que se deriva de
[!if APP_TYPE_MDI || APP_TYPE_TABBED_MDI]
[!if APP_TYPE_MDI]
    CMDIFrameWnd y controla todas las características del marco MDI.
[!else]
    CMDITabbedFrameWnd y controla todas las características del marco MDI.
[!endif]
[!else]
    CFrameWnd y controla todas las características del marco SDI.
[!endif]
[!if PROJECT_STYLE_EXPLORER]

[!output TREE_VIEW_HEADER], [!output TREE_VIEW_IMPL]
    Estos archivos contienen la clase de marco izquierdo [!output TREE_VIEW_CLASS], que se deriva de CTreeView.
[!endif]

[!if DOCKING_TOOLBAR || TOOLBAR_STYLE_REBAR || MENUBAR_TOOLBAR || RIBBON_TOOLBAR]
res\Toolbar.bmp
    Este archivo de mapa de bits se usa para crear imágenes en mosaico para la barra de herramientas.
    La barra de herramientas inicial y la barra de estado se crean en la clase [!output MAIN_FRAME_CLASS]. Edite este mapa de bits de la barra de herramientas con el editor de recursos y actualice la matriz IDR_MAINFRAME TOOLBAR en [!output PROJECT_NAME].rc para agregar botones de la barra de herramientas.
[!if MINI_SERVER || FULL_SERVER || CONTAINER_SERVER]

res\IToolbar.bmp
    Este archivo de mapa de bits se usa para crear imágenes en mosaico para la barra de herramientas cuando la aplicación del servidor se activa en contexto dentro de otro contenedor. Esta barra de herramientas se construye en la clase [!output INPLACE_FRAME_CLASS]. Este mapa de bits es similar al que aparece en res\Toolbar.bmp, con la diferencia de que se han quitado numerosos comandos que no son del servidor.

[!endif]
[!endif]
[!if APP_TYPE_MDI || APP_TYPE_TABBED_MDI]
/////////////////////////////////////////////////////////////////////////////

Para la ventana de marco secundaria:

ChildFrm.h, ChildFrm.cpp
    Estos archivos definen e implementan la clase [!output CHILD_FRAME_CLASS], que admite las ventanas secundarias en una aplicación MDI.

[!endif]
/////////////////////////////////////////////////////////////////////////////

[!if DOCVIEW]
[!if !DB_VIEW_NO_FILE]
El asistente para aplicaciones crea un tipo de documento y una vista:

[!output DOC_HEADER], [!output DOC_IMPL]: el documento
    Estos archivos contienen la clase [!output DOC_CLASS]. Edite estos archivos para agregar los datos de documentos especiales e implementar el guardado y la carga de archivos (mediante [!output DOC_CLASS]::Serialize).
[!if HAS_SUFFIX && !HTML_EDITVIEW]
    El documento tendrá las siguientes cadenas:
        Extensión de archivo:      [!output FILE_EXTENSION]
        Id. de tipo de archivo:        [!output FILE_TYPE_ID]
        Leyenda del marco principal:  [!output MAIN_FRAME_CAPTION]
        Nombre de tipo de documento:       [!output DOC_TYPE_NAME]
        Nombre de filtro:         [!output FILTER_NAME]
        Nuevo nombre corto del archivo: [!output FILE_NEW_NAME_SHORT]
        Nombre largo del tipo de archivo: [!output FILE_NEW_NAME_LONG]
[!endif]
[!else]
El asistente para aplicaciones crea una vista:
[!endif]

[!output VIEW_HEADER], [!output VIEW_IMPL]: la vista del documento
    Estos archivos contienen la clase [!output VIEW_CLASS].
[!if !DB_VIEW_NO_FILE]
    Los objetos [!output VIEW_CLASS] se usan para ver objetos [!output DOC_CLASS].
[!endif]

[!if APP_TYPE_MDI || APP_TYPE_TABBED_MDI]
res\[!output PROJECT_NAME]Doc.ico
    Este es un archivo de icono, que se usa como icono de las ventanas secundarias de MDI para la clase [!output DOC_CLASS]. Este icono está incluido en el archivo principal de recursos [!output PROJECT_NAME].rc.
[!endif]

[!endif]

[!if DB_VIEW_NO_FILE || DB_VIEW_WITH_FILE]
/////////////////////////////////////////////////////////////////////////////

Compatibilidad con bases de datos:

[!output ROWSET_HEADER], [!output ROWSET_IMPL]
    Estos archivos contienen la clase [!output ROWSET_CLASS]. Esta clase se usa para tener acceso al origen de datos que seleccionó en el asistente.
[!if DB_VIEW_NO_FILE]
    No se agregará compatibilidad con la serialización.
[!else]
    Se agregó compatibilidad con la serialización.
[!endif]
[!endif]
[!if CONTAINER || FULL_SERVER || MINI_SERVER || CONTAINER_SERVER]
/////////////////////////////////////////////////////////////////////////////

El asistente para aplicaciones también ha creado clases específicas de OLE

[!if CONTAINER || CONTAINER_SERVER]
[!output CONTAINER_ITEM_HEADER], [!output CONTAINER_ITEM_IMPL]
    Estos archivos contienen la clase [!output CONTAINER_ITEM_CLASS]. Esta clase se usa para manipular objetos OLE. Por lo general, los objetos OLE los muestra la clase [!output VIEW_CLASS] y se serializan como parte de la clase [!output DOC_CLASS].
[!if ACTIVE_DOC_CONTAINER]
    El programa incluye compatibilidad para contener documentos activos dentro de su marco.
[!endif]
[!endif]
[!if MINI_SERVER || FULL_SERVER || CONTAINER_SERVER]

[!output SERVER_ITEM_HEADER], [!output SERVER_ITEM_IMPL]
    Estos archivos contienen la clase [!output SERVER_ITEM_CLASS]. Esta clase se usa para conectar la clase [!output DOC_CLASS] al sistema OLE y, opcionalmente, proporcionar vínculos al documento.
[!if ACTIVE_DOC_SERVER]
    El proyecto admite la creación y administración de documentos activos.
[!endif]

[!output INPLACE_FRAME_HEADER], [!output INPLACE_FRAME_IMPL]
    Estos archivos contienen la clase [!output INPLACE_FRAME_CLASS]. La clase se deriva de COleIPFrameWnd y controla todas las características del marco durante la activación en contexto.
[!endif]

[!if SUPPORT_COMPOUND_FILES]
    El proyecto es compatible con los archivos compuestos. El formato de archivo compuesto almacena en un archivo un documento que contiene uno o varios objetos de automatización y sigue permitiendo el acceso a este para los objetos individuales.
[!endif]
[!endif]
[!else]

/////////////////////////////////////////////////////////////////////////////

[!if AUTOMATION]
El asistente para aplicaciones crea una clase de cuadro de diálogo y una clase de proxy de automatización:
[!else]
El asistente para aplicaciones crea una clase de cuadro de diálogo:
[!endif]

[!output DIALOG_HEADER], [!output DIALOG_IMPL]: el cuadro de diálogo
    Estos archivos contienen la clase [!output DIALOG_CLASS]. Esta clase define el comportamiento del cuadro de diálogo principal de la aplicación. La plantilla del cuadro de diálogo se encuentra en [!output PROJECT_NAME].rc, que puede editarse en Microsoft Visual C++.
[!if AUTOMATION]

[!output DIALOG_AUTO_PROXY_HEADER], [!output DIALOG_AUTO_PROXY_IMPL]: el objeto de automatización
    Estos archivos contienen la clase [!output DIALOG_AUTO_PROXY_CLASS]. Esta es la denominada clase de proxy de automatización para el cuadro de diálogo, ya que se encarga de exponer los métodos y propiedades de automatización que los controladores de automatización pueden usar para tener acceso al cuadro de diálogo. Estos métodos y propiedades no se exponen directamente desde la clase de cuadro de diálogo, ya que en el caso de una aplicación MFC basada en un cuadro de diálogo modal, es más apropiado y sencillo mantener el objeto de automatización separado de la interfaz de usuario.
[!endif]
[!endif]

[!if ACTIVEX_CONTROLS || PRINTING || SPLITTER || MAPI || SOCKETS]
/////////////////////////////////////////////////////////////////////////////

Otras características:
[!if ACTIVEX_CONTROLS]

Controles ActiveX
    La aplicación incluye compatibilidad para usar controles ActiveX.
[!endif]
[!if PRINTING]

Compatibilidad con impresión y vista previa de impresión
    El asistente para aplicaciones ha generado código que controlará los comandos de impresión, configuración de impresión y vista previa de impresión mediante la llamada a funciones miembro de la clase CView de la biblioteca MFC.
[!endif]
[!if DB_SUPPORT_HEADER_ONLY && !APP_TYPE_DLG]

Compatibilidad con bases de datos
    El asistente para aplicaciones ha agregado el nivel básico de compatibilidad con bases de datos para el programa. Solamente se han incluido los archivos necesarios.
[!endif]
[!if SPLITTER && !APP_TYPE_DLG]

Ventana dividida
    El asistente para aplicaciones ha agregado compatibilidad con las ventanas divisoras para los documentos de la aplicación.
[!endif]
[!if MAPI]

Compatibilidad con MAPI
    El proyecto generado contiene el código necesario para crear, manipular, transferir y almacenar mensajes de correo electrónico.
[!endif]
[!if SOCKETS]

Windows Sockets
    La aplicación es compatible con el establecimiento de comunicaciones a través de redes TCP/IP.
[!endif]

[!endif]
/////////////////////////////////////////////////////////////////////////////

Otros archivos estándar:

StdAfx.h, StdAfx.cpp
    Estos archivos se usan para compilar un archivo de encabezado precompilado (PCH) denominado [!output PROJECT_NAME].pch y un archivo de tipos precompilados llamado StdAfx.obj.

Resource.h
    Éste es el archivo de encabezado estándar, que define nuevos identificadores de recurso. Microsoft Visual C++ lee y actualiza este archivo.

[!if MANIFEST]
[!output PROJECT_NAME].manifest
	Windows XP usa los archivos del manifiesto de aplicación para describir la dependencia de una aplicación de versiones específicas de los ensamblados en paralelo. El cargador usa esta información para cargar el ensamblado adecuado de la memoria caché de ensamblados o de forma privada desde la aplicación. El manifiesto de aplicación puede incluirse para su redistribución como archivo .manifest externo que se instala en la misma carpeta que el ejecutable de la aplicación o puede incluirse en el ejecutable en forma de recurso.
[!endif]
/////////////////////////////////////////////////////////////////////////////

Otras notas:

El asistente para aplicaciones usa "TODO:" para indicar las partes del código fuente que debe agregar o personalizar.
[!if APP_TYPE_MDI || APP_TYPE_TABBED_MDI || APP_TYPE_SDI || APP_TYPE_DLG || APP_TYPE_MTLD]

Si la aplicación usa MFC en un archivo DLL compartido, deberá redistribuir los archivos DLL de MFC. Si la aplicación está en un idioma distinto al de la configuración regional del sistema operativo, también deberá redistribuir los recursos mfc110XXX.DLL localizados correspondientes.
Para obtener más información acerca de estos dos temas, vea la sección sobre cómo redistribuir las aplicaciones de Visual C++ en la documentación de MSDN.
[!endif]

/////////////////////////////////////////////////////////////////////////////
