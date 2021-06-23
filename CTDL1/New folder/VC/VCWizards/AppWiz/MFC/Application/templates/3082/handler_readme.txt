========================================================================
    ACTIVE TEMPLATE LIBRARY: [!output PROJECT_NAME] Información general del proyecto
========================================================================

AppWizard ha creado este proyecto [!output PROJECT_NAME] para que lo use como punto de partida para escribir su biblioteca de vínculos dinámicos (DLL).

Este archivo contiene un resumen de lo que encontrará en cada uno de los archivos que constituyen el proyecto.

[!output PROJECT_NAME].vcxproj
    Éste es el archivo de proyecto principal para los proyectos de VC++ generados mediante un Asistente para aplicaciones. Contiene información acerca de la versión de Visual C++ con la que se generó el archivo, así como información acerca de las plataformas, configuraciones y características del proyecto seleccionadas en el Asistente para aplicaciones.

[!output PROJECT_NAME].vcxproj.filters
    Éste es el archivo de filtros para los proyectos de VC++ generados mediante un asistente para aplicaciones. Contiene información acerca de la asociación entre los archivos del proyecto y los filtros. Esta asociación se usa en el IDE para mostrar la agrupación de archivos con extensiones similares bajo un nodo específico (por ejemplo, los archivos ".cpp" se asocian con el filtro"Archivos de código fuente").

[!output SAFE_IDL_NAME].idl
    Este archivo contiene las definiciones IDL de la biblioteca de tipos, las interfaces y las coclases definidas en el proyecto.
    El compilador MIDL procesará este archivo para generar:
        Definiciones de la interfaz de C++ y declaraciones GUID ([!output SAFE_IDL_NAME].h)
        Definiciones de GUID                                ([!output SAFE_IDL_NAME]_i.c)
        Una biblioteca de tipos                                  ([!output SAFE_IDL_NAME].tlb)
        Código de cálculo de referencias                                 ([!output SAFE_IDL_NAME]_p.c y dlldata.c)

[!output SAFE_IDL_NAME].h
    Este archivo contiene las definiciones de la interfaz de C++ y las declaraciones GUID de los elementos definidos en [!output SAFE_IDL_NAME].idl. MIDL vuelve a generar este archivo durante la compilación.

[!output PROJECT_NAME].cpp
    Este archivo contiene el mapa de objetos y la implementación de las exportaciones de los archivos DLL.

[!output PROJECT_NAME].rc
    Esta es una lista de todos los recursos de Microsoft Windows que usa el programa.

[!if DLL_APP]
[!output PROJECT_NAME].def
    Este archivo de definición de módulo proporciona al vinculador información acerca de las exportaciones necesarias para el archivo DLL. Contiene exportaciones para:
        DllGetClassObject
        DllCanUnloadNow
        DllRegisterServer
        DllUnregisterServer
        DllInstall
[!endif]

/////////////////////////////////////////////////////////////////////////////
Otros archivos estándar:

StdAfx.h, StdAfx.cpp
    Estos archivos se usan para compilar un archivo de encabezado precompilado (PCH) denominado [!output PROJECT_NAME].pch y un archivo de tipos precompilados llamado StdAfx.obj.

Resource.h
    Éste es el archivo de encabezado estándar que define identificadores de recurso.

/////////////////////////////////////////////////////////////////////////////
Otras notas:

	La opción de compatibilidad MFC compila las bibliotecas MFC (Microsoft Foundation Class) en la aplicación esqueleto, poniendo a su disposición las clases, los objetos y las funciones MFC.
/////////////////////////////////////////////////////////////////////////////
