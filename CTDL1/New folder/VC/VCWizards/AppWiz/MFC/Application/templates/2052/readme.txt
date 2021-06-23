================================================================================
    MICROSOFT 基础类库 : [!output PROJECT_NAME] 项目概述
===============================================================================

应用程序向导已为您创建了此 [!output PROJECT_NAME] 应用程序。此应用程序不仅演示 Microsoft 基础类的基本使用方法，还可作为您编写应用程序的起点。

本文件概要介绍组成 [!output PROJECT_NAME] 应用程序的每个文件的内容。

[!output PROJECT_NAME].vcxproj
    这是使用应用程序向导生成的 VC++ 项目的主项目文件，其中包含生成该文件的 Visual C++ 的版本信息，以及有关使用应用程序向导选择的平台、配置和项目功能的信息。

[!output PROJECT_NAME].vcxproj.filters
    这是使用“应用程序向导”生成的 VC++ 项目筛选器文件。它包含有关项目文件与筛选器之间的关联信息。在 IDE 中，通过这种关联，在特定节点下以分组形式显示具有相似扩展名的文件。例如，“.cpp”文件与“源文件”筛选器关联。

[!output APP_HEADER]
    这是应用程序的主头文件。
    其中包括其他项目特定的标头（包括 Resource.h），并声明 [!output APP_CLASS] 应用程序类。

[!output APP_IMPL]
    这是包含应用程序类 [!output APP_CLASS] 的主应用程序源文件。

[!output RC_FILE_NAME]
    这是程序使用的所有 Microsoft Windows 资源的列表。它包括 RES 子目录中存储的图标、位图和光标。此文件可以直接在 Microsoft Visual C++ 中进行编辑。项目资源包含在 [!output LCID] 中。

res\[!output PROJECT_NAME].ico
    这是用作应用程序图标的图标文件。此图标包括在主资源文件 [!output PROJECT_NAME].rc 中。

res\[!output RC2_FILE_NAME].rc2
    此文件包含不在 Microsoft Visual C++ 中进行编辑的资源。您应该将不可由资源编辑器编辑的所有资源放在此文件中。
[!if CONTAINER_SERVER || FULL_SERVER || MINI_SERVER || AUTOMATION || HAS_SUFFIX]
[!if !HTML_EDITVIEW]

[!output PROJECT_NAME].reg
    这是一个示例 .reg 文件，显示框架将为您设置的注册设置类型。可以将此作为 .reg
[!if APP_TYPE_DLG]
    文件随应用程序一起使用。
[!else]
    文件随应用程序一起使用，或直接删除该文件并使用默认的 RegisterShellFileTypes 注册。
[!endif]

[!if AUTOMATION]
[!output SAFE_IDL_NAME].idl
    此文件包含应用程序类型库的接口描述语言源代码。
[!endif]
[!endif]
[!endif]

[!if !APP_TYPE_DLG]
/////////////////////////////////////////////////////////////////////////////

对于主框架窗口：
[!if PROJECT_STYLE_EXPLORER]
    Windows 资源管理器样式：该项目将包含一个与 Windows 资源管理器类似的接口，其中包含两个框架。
[!else]
    该项目包含一个标准的 MFC 接口。
[!endif]

[!output MAIN_FRAME_HEADER], [!output MAIN_FRAME_IMPL]
    这些文件中包含框架类 [!output MAIN_FRAME_CLASS]，该类派生自
[!if APP_TYPE_MDI || APP_TYPE_TABBED_MDI]
[!if APP_TYPE_MDI]
    CMDIFrameWnd 并控制所有 MDI 框架功能。
[!else]
    CMDITabbedFrameWnd 并控制所有 MDI 框架功能。
[!endif]
[!else]
    CFrameWnd 并控制所有 SDI 框架功能。
[!endif]
[!if PROJECT_STYLE_EXPLORER]

[!output TREE_VIEW_HEADER], [!output TREE_VIEW_IMPL]
    这些文件中包含从 CTreeView 派生的左框架类 [!output TREE_VIEW_CLASS]。
[!endif]

[!if DOCKING_TOOLBAR || TOOLBAR_STYLE_REBAR || MENUBAR_TOOLBAR || RIBBON_TOOLBAR]
res\Toolbar.bmp
    此位图文件用于为工具栏创建平铺图像。
    初始工具栏和状态栏在 [!output MAIN_FRAME_CLASS] 类中构造。使用资源编辑器编辑此工具栏位图，并更新 [!output PROJECT_NAME].rc 中的 IDR_MAINFRAME TOOLBAR 数组以添加工具栏按钮。
[!if MINI_SERVER || FULL_SERVER || CONTAINER_SERVER]

res\IToolbar.bmp
    当服务器应用程序在其他容器内就地激活时，此位图文件用于为工具栏创建平铺图像。此工具栏在 [!output INPLACE_FRAME_CLASS] 类中构造。此位图与 res\Toolbar.bmp 中的位图类似，不同之处在于此位图中删除了许多非服务器命令。

[!endif]
[!endif]
[!if APP_TYPE_MDI || APP_TYPE_TABBED_MDI]
/////////////////////////////////////////////////////////////////////////////

对于子框架窗口：

ChildFrm.h, ChildFrm.cpp
    这些文件定义并实现 [!output CHILD_FRAME_CLASS] 类，该类支持 MDI 应用程序中的子窗口。

[!endif]
/////////////////////////////////////////////////////////////////////////////

[!if DOCVIEW]
[!if !DB_VIEW_NO_FILE]
应用程序向导创建一种文档类型和一个视图：

[!output DOC_HEADER]、[!output DOC_IMPL] - 文档
    这些文件包含 [!output DOC_CLASS] 类。编辑这些文件以添加特殊文档数据并实现文件保存和加载（通过 [!output DOC_CLASS]::Serialize）。
[!if HAS_SUFFIX && !HTML_EDITVIEW]
    该文档将包含以下字符串：
        文件扩展名：      [!output FILE_EXTENSION]
        文件类型 ID：        [!output FILE_TYPE_ID]
        主框架标题：  [!output MAIN_FRAME_CAPTION]
        文档类型名称：       [!output DOC_TYPE_NAME]
        筛选器名称：         [!output FILTER_NAME]
        文件的新短名称：[!output FILE_NEW_NAME_SHORT]
        文件类型长名称：[!output FILE_NEW_NAME_LONG]
[!endif]
[!else]
应用程序向导创建一个视图：
[!endif]

[!output VIEW_HEADER]、[!output VIEW_IMPL] - 文档视图
    这些文件包含 [!output VIEW_CLASS] 类。
[!if !DB_VIEW_NO_FILE]
    [!output VIEW_CLASS] 对象用于查看 [!output DOC_CLASS] 对象。
[!endif]

[!if APP_TYPE_MDI || APP_TYPE_TABBED_MDI]
res\[!output PROJECT_NAME]Doc.ico
    这是一个图标文件，用作 [!output DOC_CLASS] 类的 MDI 子窗口的图标。此图标包括在主资源文件 [!output PROJECT_NAME].rc 中。
[!endif]

[!endif]

[!if DB_VIEW_NO_FILE || DB_VIEW_WITH_FILE]
/////////////////////////////////////////////////////////////////////////////

数据库支持：

[!output ROWSET_HEADER], [!output ROWSET_IMPL]
    这些文件包含 [!output ROWSET_CLASS] 类。此类用于访问在向导中选定的数据源。
[!if DB_VIEW_NO_FILE]
    不会添加任何序列化支持。
[!else]
    已添加序列化支持。
[!endif]
[!endif]
[!if CONTAINER || FULL_SERVER || MINI_SERVER || CONTAINER_SERVER]
/////////////////////////////////////////////////////////////////////////////

应用程序向导还创建了特定于 OLE 的类

[!if CONTAINER || CONTAINER_SERVER]
[!output CONTAINER_ITEM_HEADER], [!output CONTAINER_ITEM_IMPL]
    这些文件包含 [!output CONTAINER_ITEM_CLASS] 类。此类用于操作 OLE 对象。OLE 对象通常由 [!output VIEW_CLASS] 类显示，并作为 [!output DOC_CLASS] 类的一部分进行序列化。
[!if ACTIVE_DOC_CONTAINER]
    该程序支持在其框架内包含活动文档。
[!endif]
[!endif]
[!if MINI_SERVER || FULL_SERVER || CONTAINER_SERVER]

[!output SERVER_ITEM_HEADER], [!output SERVER_ITEM_IMPL]
    这些文件包含 [!output SERVER_ITEM_CLASS]。此类用于将 [!output DOC_CLASS] 类连接到 OLE 系统，还可以选择提供指向文档的链接。
[!if ACTIVE_DOC_SERVER]
    该项目包含对创建和管理活动文档的支持。
[!endif]

[!output INPLACE_FRAME_HEADER], [!output INPLACE_FRAME_IMPL]
    这些文件包含 [!output INPLACE_FRAME_CLASS]。此类派生自 COleIPFrameWnd 并在就地激活期间控制所有框架功能。
[!endif]

[!if SUPPORT_COMPOUND_FILES]
    该项目包含对复合文件的支持。复合文件格式将包含一个或多个自动化对象的文档存储在一个文件中，并且仍允许访问该文档中的各个对象。
[!endif]
[!endif]
[!else]

/////////////////////////////////////////////////////////////////////////////

[!if AUTOMATION]
应用程序向导创建一个对话框类和一个自动化代理类：
[!else]
应用程序向导创建一个对话框类：
[!endif]

[!output DIALOG_HEADER]、[!output DIALOG_IMPL] - 对话框
    这些文件包含 [!output DIALOG_CLASS] 类。此类定义应用程序的主对话框的行为。对话框模板包含在 [!output PROJECT_NAME].rc 中，该文件可以在 Microsoft Visual C++ 中编辑。
[!if AUTOMATION]

[!output DIALOG_AUTO_PROXY_HEADER]、[!output DIALOG_AUTO_PROXY_IMPL] - 自动化对象
    这些文件包含 [!output DIALOG_AUTO_PROXY_CLASS] 类。此类称为对话框的自动化代理类，因为它负责公开可供自动化控制器用于访问对话框的自动化方法和属性。这些方法和属性并不是直接从对话框类公开，因为对于基于模式对话框的 MFC 应用程序而言，将自动化对象与用户界面分离开来更加清晰便捷。
[!endif]
[!endif]

[!if ACTIVEX_CONTROLS || PRINTING || SPLITTER || MAPI || SOCKETS]
/////////////////////////////////////////////////////////////////////////////

其他功能：
[!if ACTIVEX_CONTROLS]

ActiveX 控件
    该应用程序包含对使用 ActiveX 控件的支持。
[!endif]
[!if PRINTING]

打印和打印预览支持
    应用程序向导通过从 MFC 库调用 CView 类中的成员函数生成代码，来处理打印、打印设置和打印预览命令。
[!endif]
[!if DB_SUPPORT_HEADER_ONLY && !APP_TYPE_DLG]

数据库支持
    应用程序向导已添加对程序的基本数据库支持。仅包含所需文件。
[!endif]
[!if SPLITTER && !APP_TYPE_DLG]

拆分窗口
    应用程序向导已添加对应用程序文档的拆分窗口的支持。
[!endif]
[!if MAPI]

MAPI 支持
    生成的项目包含创建、操作、传输和存储电子邮件所需的代码。
[!endif]
[!if SOCKETS]

Windows 套接字
    应用程序包含对通过 TCP/IP 网络建立通信的支持。
[!endif]

[!endif]
/////////////////////////////////////////////////////////////////////////////

其他标准文件:

StdAfx.h, StdAfx.cpp
    这些文件用于生成名为 [!output PROJECT_NAME].pch 的预编译头 (PCH) 文件和名为 StdAfx.obj 的预编译类型文件。

Resource.h
    这是标准头文件，可用于定义新的资源 ID。Microsoft Visual C++ 将读取并更新此文件。

[!if MANIFEST]
[!output PROJECT_NAME].manifest
	Windows XP 使用应用程序清单文件来描述特定版本的并行程序集的应用程序依赖项。加载程序使用这些信息来从程序集缓存中加载相应的程序集，并保护其不被应用程序访问。应用程序清单可能会包含在内，以作为与应用程序可执行文件安装在同一文件夹中的外部 .manifest 文件进行重新分发，它还可能以资源的形式包含在可执行文件中。
[!endif]
/////////////////////////////////////////////////////////////////////////////

其他注释:

应用程序向导使用“TODO:”来指示应添加或自定义的源代码部分。
[!if APP_TYPE_MDI || APP_TYPE_TABBED_MDI || APP_TYPE_SDI || APP_TYPE_DLG || APP_TYPE_MTLD]

如果应用程序使用共享 DLL 中的 MFC，您将需要重新分发 MFC DLL。如果应用程序所使用的语言与操作系统的区域设置不同，则还需要重新分发相应的本地化资源 mfc110XXX.DLL。
有关上述话题的更多信息，请参见 MSDN 文档中有关重新分发 Visual C++ 应用程序的部分。
[!endif]

/////////////////////////////////////////////////////////////////////////////
