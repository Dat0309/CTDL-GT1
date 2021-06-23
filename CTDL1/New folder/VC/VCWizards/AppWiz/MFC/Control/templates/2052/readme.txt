========================================================================
    ACTIVEX 控件 DLL : [!output PROJECT_NAME] 项目概述
========================================================================

控件向导已为 [!output PROJECT_NAME] ActiveX 控件 DLL 创建此项目，其中包含一个控件。

此主干项目不仅演示了编写 ActiveX 控件的基本方法，而且还可以作为编写控件特定功能的起点。

本文件概要介绍组成 [!output PROJECT_NAME] ActiveX 控件 DLL 的每个文件的内容。

[!output PROJECT_NAME].vcxproj
    这是使用应用程序向导生成的 VC++ 项目的主项目文件，其中包含生成该文件的 Visual C++ 的版本信息，以及有关使用应用程序向导选择的平台、配置和项目功能的信息。

[!output PROJECT_NAME].vcxproj.filters
    这是使用“应用程序向导”生成的 VC++ 项目筛选器文件。它包含有关项目文件与筛选器之间的关联信息。在 IDE 中，通过这种关联，在特定节点下以分组形式显示具有相似扩展名的文件。例如，“.cpp”文件与“源文件”筛选器关联。

[!output PROJECT_NAME].h
    这是 ActiveX 控件 DLL 的主包含文件。其中包括其他项目特定的文件，如 resource.h。

[!output PROJECT_NAME].cpp
    这是包含 DLL 初始化、终止和其他簿记的代码的主源文件。

[!output RC_FILE_NAME]
    这是项目使用的 Microsoft Windows 资源的清单。此文件可以直接用 Visual C++ 资源编辑器进行编辑。

[!output PROJECT_NAME].def
    此文件包含关于在 Microsoft Windows 上运行所必需的 ActiveX 控件 DLL 的有关信息。

[!output SAFE_IDL_NAME].idl
    此文件包含控件类型库的对象描述语言源代码。

[!if ABOUT_BOX]
[!output PROJECT_NAME].ico
    此文件包含将出现在“关于”框中的图标。此图标包括在主资源文件 [!output PROJECT_NAME].rc 中。

[!endif]
/////////////////////////////////////////////////////////////////////////////
[!output CONTROL_CLASS] control:

[!output CONTROL_HEADER]
    此文件包含 [!output CONTROL_CLASS] C++ 类的声明。

[!output CONTROL_IMPL]
    此文件包含 [!output CONTROL_CLASS] C++ 类的实现。

[!output PROPERTY_PAGE_HEADER]
    此文件包含 [!output PROPERTY_PAGE_CLASS] C++ 类的声明。

[!output PROPERTY_PAGE_IMPL]
    此文件包含 [!output PROPERTY_PAGE_CLASS] C++ 类的实现。

[!output CONTROL_CLASS].bmp
    此文件包含一个位图，当 [!output CONTROL_CLASS] 控件出现在工具面板上时，容器将使用此位图来表示该控件。此位图包含在主资源文件 [!output PROJECT_NAME].rc 中。

[!if HELP_FILES]
/////////////////////////////////////////////////////////////////////////////
帮助支持：

[!output PROJECT_NAME].hpj
    此文件是一个帮助项目文件，帮助编译器可使用该文件来创建 ActiveX 控件的帮助文件。

*.bmp
    这些是 Microsoft 基础类库标准命令的标准帮助文件主题所需的位图文件。这些文件位于 HLP 子目录中。

[!output PROJECT_NAME].rtf
    此文件包含许多 ActiveX 控件都支持的公共属性、事件和方法的标准帮助主题。可对此文件进行编辑以添加或移除其他控件特定的主题。此文件位于 HLP 子目录中。

[!endif]
[!if RUNTIME_LICENSE]
/////////////////////////////////////////////////////////////////////////////
授权支持：

[!output PROJECT_NAME].lic
    这是用户许可证文件。此文件必须与控件 DLL 出现在相同目录中，这样才能允许在设计时环境中创建该控件的实例。通常您会将此文件与控件一同分发，但您的客户不会将其分发。

[!endif]
/////////////////////////////////////////////////////////////////////////////
其他标准文件:

stdafx.h, stdafx.cpp
    这些文件用于生成名为 [!output PROJECT_NAME].pch 的预编译头 (PCH) 文件和名为 stdafx.obj 的预编译类型 (PCT) 文件。

resource.h
    这是标准头文件，可用于定义新的资源 ID。Visual C++ 资源编辑器读取并更新此文件。

/////////////////////////////////////////////////////////////////////////////
其他注释:

控件向导使用“TODO:”来指示应添加或自定义的源代码部分。

/////////////////////////////////////////////////////////////////////////////
