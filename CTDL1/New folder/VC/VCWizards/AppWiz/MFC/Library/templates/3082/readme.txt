========================================================================
    BIBLIOTECA MICROSOFT FOUNDATION CLASS: Información general del proyecto[!output PROJECT_NAME]
========================================================================


AppWizard ha creado este archivo DLL [!output PROJECT_NAME]. Este archivo DLL no sólo muestra las bases de la utilización de Microsoft Foundation classes, también es un punto de partida para escribir el archivo DLL.

Este archivo contiene un resumen de lo que encontrará en todos los archivos que constituyen la aplicación DLL [!output PROJECT_NAME].

[!output PROJECT_NAME].vcxproj
    Éste es el archivo de proyecto principal para los proyectos de VC++ generados mediante un Asistente para aplicaciones. Contiene información acerca de la versión de Visual C++ con la que se generó el archivo, así como información acerca de las plataformas, configuraciones y características del proyecto seleccionadas en el Asistente para aplicaciones.

[!output PROJECT_NAME].vcxproj.filters
    Éste es el archivo de filtros para los proyectos de VC++ generados mediante un asistente para aplicaciones. Contiene información acerca de la asociación entre los archivos del proyecto y los filtros. Esta asociación se usa en el IDE para mostrar la agrupación de archivos con extensiones similares bajo un nodo específico (por ejemplo, los archivos ".cpp" se asocian con el filtro"Archivos de código fuente").

[!if DLL_TYPE_EXTENSION]
[!output PROJECT_NAME].cpp
    Este es el archivo de código fuente DLL principal que contiene la definición de DllMain().
[!else]
[!output PROJECT_NAME].h
    Éste es el archivo de encabezado principal para el archivo DLL. Declara la clase [!output APP_CLASS].

[!output PROJECT_NAME].cpp
    Este es el archivo de código fuente DLL principal. Contiene la clase [!output APP_CLASS].
[!if AUTOMATION]
    También contiene los puntos de entrada OLE necesarios para los servidores inproc.
[!endif]
[!endif]
[!if AUTOMATION]

[!output SAFE_IDL_NAME].idl
    Este archivo contiene el código fuente del lenguaje de descripción de objetos para la biblioteca de tipos del archivo DLL.
[!endif]

[!output RC_FILE_NAME]
    Esta es una lista de todos los recursos de Microsoft Windows que usa el programa. Incluye los iconos, mapas de bits y cursores almacenados en el subdirectorio RES. Este archivo puede editarse directamente en Microsoft Visual C++.

res\[!output RC2_FILE_NAME].rc2
    Este archivo incluye recursos no editados por Microsoft Visual C++. Se deberían colocar en este archivo todos los recursos que no pueden editarse mediante el editor de recursos.

[!output PROJECT_NAME].def
    Este archivo contiene información acerca del archivo DLL que se debe proporcionar para ejecutarlo con Microsoft Windows. Define parámetros como el nombre y la descripción del archivo DLL. También exporta funciones desde el archivo DLL.

/////////////////////////////////////////////////////////////////////////////
Otros archivos estándar:

StdAfx.h, StdAfx.cpp
    Estos archivos se usan para compilar un archivo de encabezado precompilado (PCH) denominado [!output PROJECT_NAME].pch y un archivo de tipos precompilados llamado StdAfx.obj.

Resource.h
    Éste es el archivo de encabezado estándar, que define nuevos identificadores de recurso. Microsoft Visual C++ lee y actualiza este archivo.

/////////////////////////////////////////////////////////////////////////////
Otras notas:

El asistente para aplicaciones usa "TODO:" para indicar las partes del código fuente que debe agregar o personalizar.

/////////////////////////////////////////////////////////////////////////////
