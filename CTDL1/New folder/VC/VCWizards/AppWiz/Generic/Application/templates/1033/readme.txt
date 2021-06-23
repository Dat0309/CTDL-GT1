[!if CONSOLE_APP]
========================================================================
    CONSOLE APPLICATION : [!output PROJECT_NAME] Project Overview
========================================================================

AppWizard has created this [!output PROJECT_NAME] application for you.
[!endif]
[!if DLL_APP]
========================================================================
    DYNAMIC LINK LIBRARY : [!output PROJECT_NAME] Project Overview
========================================================================

AppWizard has created this [!output PROJECT_NAME] DLL for you.
[!endif]
[!if LIB_APP]
========================================================================
    STATIC LIBRARY : [!output PROJECT_NAME] Project Overview
========================================================================

AppWizard has created this [!output PROJECT_NAME] library project for you.
[!endif]
[!if WIN_APP]
========================================================================
    WIN32 APPLICATION : [!output PROJECT_NAME] Project Overview
========================================================================

AppWizard has created this [!output PROJECT_NAME] application for you.
[!endif]

[!if !LIB_APP]
This file contains a summary of what you will find in each of the files that
make up your [!output PROJECT_NAME] application.
[!else]
[!if PRE_COMPILED_HEADER]
This file contains a summary of what you will find in each of the files that
make up your [!output PROJECT_NAME] application.
[!else]
No source files were created as part of your project.
[!endif]
[!endif]


[!output PROJECT_NAME].vcxproj
    This is the main project file for VC++ projects generated using an Application Wizard.
    It contains information about the version of Visual C++ that generated the file, and
    information about the platforms, configurations, and project features selected with the
    Application Wizard.

[!output PROJECT_NAME].vcxproj.filters
    This is the filters file for VC++ projects generated using an Application Wizard. 
    It contains information about the association between the files in your project 
    and the filters. This association is used in the IDE to show grouping of files with
    similar extensions under a specific node (for e.g. ".cpp" files are associated with the
    "Source Files" filter).

[!if !EMPTY_PROJECT && !LIB_APP]
[!output PROJECT_NAME].cpp
[!if DLL_APP]
    This is the main DLL source file.
[!else]
    This is the main application source file.
[!endif]
[!if DLL_APP && !EXPORT_SYMBOLS]

	When created, this DLL does not export any symbols. As a result, it
	will not produce a .lib file when it is built. If you wish this project
	to be a project dependency of some other project, you will either need to
	add code to export some symbols from the DLL so that an export library
	will be produced, or you can set the Ignore Input Library property to Yes
	on the General propert page of the Linker folder in the project's Property
	Pages dialog box.
[!endif]
[!if WIN_APP || SUPPORT_MFC]

/////////////////////////////////////////////////////////////////////////////
AppWizard has created the following resources:

[!output RC_FILE_NAME]
    This is a listing of all of the Microsoft Windows resources that the
    program uses.  It includes the icons, bitmaps, and cursors that are stored
    in the RES subdirectory.  This file can be directly edited in Microsoft
    Visual C++.

Resource.h
    This is the standard header file, which defines new resource IDs.
    Microsoft Visual C++ reads and updates this file.
[!endif]
[!if WIN_APP]

[!output PROJECT_NAME].ico
    This is an icon file, which is used as the application's icon (32x32).
    This icon is included by the main resource file [!output RC_FILE_NAME].

small.ico
    This is an icon file, which contains a smaller version (16x16)
    of the application's icon. This icon is included by the main resource
    file [!output RC_FILE_NAME].
[!endif]

/////////////////////////////////////////////////////////////////////////////
Other standard files:

StdAfx.h, StdAfx.cpp
    These files are used to build a precompiled header (PCH) file
    named [!output PROJECT_NAME].pch and a precompiled types file named StdAfx.obj.

[!endif]
[!if LIB_APP]
[!if PRE_COMPILED_HEADER]

/////////////////////////////////////////////////////////////////////////////

StdAfx.h, StdAfx.cpp
    These files are used to build a precompiled header (PCH) file
    named [!output PROJECT_NAME].pch and a precompiled types file named StdAfx.obj.

[!endif]
[!if SUPPORT_MFC]
/////////////////////////////////////////////////////////////////////////////
The compiler and linker switches have been modified to support MFC. Using the
MFC ClassWizard with this project requires that you add several files to the
project, including "resource.h", "[!output RC_FILE_NAME]" and a "[!output PROJECT_NAME].h" that
includes resource.h. If you add an rc file to a static library, you may
experience difficulties due to the limitation that only one rc file may be
present in a Dll or Exe. This problem may be overcome by including the
library's .rc file into the parent project's .rc file.

[!endif]
[!endif]
/////////////////////////////////////////////////////////////////////////////
Other notes:

AppWizard uses "TODO:" comments to indicate parts of the source code you
should add to or customize.

/////////////////////////////////////////////////////////////////////////////
