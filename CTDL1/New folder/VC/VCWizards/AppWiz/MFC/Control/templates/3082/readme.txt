========================================================================
    DLL DE CONTROLES ACTIVEX: [!output PROJECT_NAME] Información general del proyecto
========================================================================

El asistente para controles ha creado este proyecto para la DLL de controles ActiveX [!output PROJECT_NAME], que contiene un control.

Este proyecto esqueleto no sólo muestra las bases de escritura de un control ActiveX, también es un punto de partida para escribir las características específicas del control.

Este archivo contiene un resumen de lo que encontrará en todos los archivos que constituyen el archivo DLL del control ActiveX [!output PROJECT_NAME].

[!output PROJECT_NAME].vcxproj
    Éste es el archivo de proyecto principal para los proyectos de VC++ generados mediante un Asistente para aplicaciones. Contiene información acerca de la versión de Visual C++ con la que se generó el archivo, así como información acerca de las plataformas, configuraciones y características del proyecto seleccionadas en el Asistente para aplicaciones.

[!output PROJECT_NAME].vcxproj.filters
    Éste es el archivo de filtros para los proyectos de VC++ generados mediante un asistente para aplicaciones. Contiene información acerca de la asociación entre los archivos del proyecto y los filtros. Esta asociación se usa en el IDE para mostrar la agrupación de archivos con extensiones similares bajo un nodo específico (por ejemplo, los archivos ".cpp" se asocian con el filtro"Archivos de código fuente").

[!output PROJECT_NAME].h
    Éste es el archivo de inclusión principal para el DLL del control de ActiveX. Incluye otros archivos de inclusión específicos del proyecto como resource.h.

[!output PROJECT_NAME].cpp
    Este es el archivo de código fuente principal que contiene código para la inicialización, finalización y otros registros de archivos DLL.

[!output RC_FILE_NAME]
    Esta es una lista de los recursos de Microsoft Windows que usa el proyecto. Este archivo puede editarse directamente con el editor de recursos de Visual C++.

[!output PROJECT_NAME].def
    Este archivo contiene información acerca del archivo DLL del control ActiveX que se debe proporcionar para ejecutarlo con Microsoft Windows.

[!output SAFE_IDL_NAME].idl
    Este archivo contiene el código fuente del lenguaje de descripción de objetos para la biblioteca de tipos del control.

[!if ABOUT_BOX]
[!output PROJECT_NAME].ico
    Este archivo contiene un icono que aparecerá en el cuadro de diálogo Acerca de. Este icono está incluido en el archivo principal de recursos [!output PROJECT_NAME].rc.

[!endif]
/////////////////////////////////////////////////////////////////////////////
[!output CONTROL_CLASS] control:

[!output CONTROL_HEADER]
    Este archivo contiene la declaración de la clase de C++ [!output CONTROL_CLASS].

[!output CONTROL_IMPL]
    Este archivo contiene la implementación de la clase de C++ [!output CONTROL_CLASS].

[!output PROPERTY_PAGE_HEADER]
    Este archivo contiene la declaración de la clase de C++ [!output PROPERTY_PAGE_CLASS].

[!output PROPERTY_PAGE_IMPL]
    Este archivo contiene la implementación de la clase de C++ [!output PROPERTY_PAGE_CLASS].

[!output CONTROL_CLASS].bmp
    Este archivo contiene un mapa de bits que usará un contenedor para representar el control [!output CONTROL_CLASS] cuando aparece en una paleta de herramientas. Este mapa de bits está incluido en el archivo de recursos principal [!output PROJECT_NAME].rc.

[!if HELP_FILES]
/////////////////////////////////////////////////////////////////////////////
Compatibilidad con la Ayuda:

[!output PROJECT_NAME].hpj
    Este es el archivo del proyecto de Ayuda que usó el compilador de Ayuda para crear el archivo de Ayuda del control ActiveX.

*.bmp
    Estos son archivos de mapa de bits necesarios para los temas de archivos de Ayuda estándar para los comandos estándar de la biblioteca MFC (Microsoft Foundation Class). Estos archivos están ubicados en el subdirectorio HLP.

[!output PROJECT_NAME].rtf
    Este archivo contiene los temas de Ayuda estándar para las propiedades, eventos y métodos comunes compatibles con diversos controles ActiveX. Puede editarlo para agregar o quitar temas específicos de controles adicionales. Este archivo está ubicado en el subdirectorio HLP.

[!endif]
[!if RUNTIME_LICENSE]
/////////////////////////////////////////////////////////////////////////////
Concesión de licencia:

[!output PROJECT_NAME].lic
    Archivo de licencia del usuario. Este archivo debe ubicarse en el mismo directorio que el archivo DLL del control para poder crear una instancia del mismo en un entorno en tiempo de diseño. Por lo general, usted distribuye este archivo con su control, pero sus clientes no lo distribuyen.

[!endif]
/////////////////////////////////////////////////////////////////////////////
Otros archivos estándar:

stdafx.h, stdafx.cpp
    Estos archivos se usan para compilar un archivo de encabezado precompilado (PCH) denominado [!output PROJECT_NAME].pch y un archivo de tipos precompilados (PCT) llamado stdafx.obj.

resource.h
    Éste es el archivo de encabezado estándar, que define nuevos identificadores de recurso. El editor de recursos de Visual C++ lee y actualiza este archivo.

/////////////////////////////////////////////////////////////////////////////
Otras notas:

El asistente para controles utiliza "TODO:" para indicar las partes del código fuente que tendría que agregar o personalizar.

/////////////////////////////////////////////////////////////////////////////
