========================================================================
    ACTIVEX CONTROL DLL : [!output PROJECT_NAME] Project Overview
========================================================================

ControlWizard has created this project for your [!output PROJECT_NAME] ActiveX Control
DLL, which contains 1 control.

This skeleton project not only demonstrates the basics of writing an
ActiveX Control, but is also a starting point for writing the specific
features of your control.

This file contains a summary of what you will find in each of the files
that make up your [!output PROJECT_NAME] ActiveX Control DLL.

[!output PROJECT_NAME].vcxproj
    This is the main project file for VC++ projects generated using an
    Application Wizard. It contains information about the version of
    Visual C++ that generated the file, and information about the platforms,
    configurations, and project features selected with the Application Wizard.

[!output PROJECT_NAME].vcxproj.filters
    This is the filters file for VC++ projects generated using an Application Wizard. 
    It contains information about the association between the files in your project 
    and the filters. This association is used in the IDE to show grouping of files with
    similar extensions under a specific node (for e.g. ".cpp" files are associated with the
    "Source Files" filter).

[!output PROJECT_NAME].h
    This is the main include file for the ActiveX Control DLL.  It
    includes other project-specific includes such as resource.h.

[!output PROJECT_NAME].cpp
    This is the main source file that contains code for DLL initialization,
    termination and other bookkeeping.

[!output RC_FILE_NAME]
    This is a listing of the Microsoft Windows resources that the project
    uses.  This file can be directly edited with the Visual C++ resource
    editor.

[!output PROJECT_NAME].def
    This file contains information about the ActiveX Control DLL that
    must be provided to run with Microsoft Windows.

[!output SAFE_IDL_NAME].idl
    This file contains the Object Description Language source code for the
    type library of your control.

[!if ABOUT_BOX]
[!output PROJECT_NAME].ico
    This file contains an icon that will appear in the About box.  This icon
    is included by the main resource file [!output PROJECT_NAME].rc.

[!endif]
/////////////////////////////////////////////////////////////////////////////
[!output CONTROL_CLASS] control:

[!output CONTROL_HEADER]
    This file contains the declaration of the [!output CONTROL_CLASS] C++ class.

[!output CONTROL_IMPL]
    This file contains the implementation of the [!output CONTROL_CLASS] C++ class.

[!output PROPERTY_PAGE_HEADER]
    This file contains the declaration of the [!output PROPERTY_PAGE_CLASS] C++ class.

[!output PROPERTY_PAGE_IMPL]
    This file contains the implementation of the [!output PROPERTY_PAGE_CLASS] C++ class.

[!output CONTROL_CLASS].bmp
    This file contains a bitmap that a container will use to represent the
    [!output CONTROL_CLASS] control when it appears on a tool palette.  This bitmap
    is included by the main resource file [!output PROJECT_NAME].rc.

[!if HELP_FILES]
/////////////////////////////////////////////////////////////////////////////
Help Support:

[!output PROJECT_NAME].hpj
    This file is the Help Project file used by the Help compiler to create
    your ActiveX Control's Help file.

*.bmp
    These are bitmap files required by the standard Help file topics for
    Microsoft Foundation Class Library standard commands.  These files are
    located in the HLP subdirectory.

[!output PROJECT_NAME].rtf
    This file contains the standard help topics for the common properties,
    events and methods supported by many ActiveX Controls.  You can edit
    this to add or remove additional control specific topics.  This file is
    located in the HLP subdirectory.

[!endif]
[!if RUNTIME_LICENSE]
/////////////////////////////////////////////////////////////////////////////
Licensing support:

[!output PROJECT_NAME].lic
    This is the user license file.  This file must be present in the same
    directory as the control's DLL to allow an instance of the control to be
    created in a design-time environment.  Typically, you will distribute
    this file with your control, but your customers will not distribute it.

[!endif]
/////////////////////////////////////////////////////////////////////////////
Other standard files:

stdafx.h, stdafx.cpp
    These files are used to build a precompiled header (PCH) file
    named [!output PROJECT_NAME].pch and a precompiled types (PCT) file named stdafx.obj.

resource.h
    This is the standard header file, which defines new resource IDs.
    The Visual C++ resource editor reads and updates this file.

/////////////////////////////////////////////////////////////////////////////
Other notes:

ControlWizard uses "TODO:" to indicate parts of the source code you
should add to or customize.

/////////////////////////////////////////////////////////////////////////////
