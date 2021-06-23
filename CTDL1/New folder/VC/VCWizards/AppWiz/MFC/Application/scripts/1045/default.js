// Copyright (c) Microsoft Corporation. All rights reserved.

function OnFinish(selProj, selObj)
{
	try
	{
		wizard.AddSymbol("SAFE_PROJECT_HELP_FILE_NAME", CreateSafeName(wizard.FindSymbol("PROJECT_NAME")));
		wizard.AddSymbol("RC2_FILE_NAME", CreateASCIIName(wizard.FindSymbol("PROJECT_NAME")));
		wizard.AddSymbol("RC_FILE_NAME",CreateSafeRCFileName(wizard.FindSymbol("PROJECT_NAME")) + ".rc");

		if(wizard.FindSymbol("AUTOMATION"))
			wizard.AddSymbol("SAFE_IDL_NAME", CreateASCIIName(wizard.FindSymbol("PROJECT_NAME")));
		var bOLEDB = wizard.FindSymbol("OLEDB");
		if (bOLEDB)
		{
			var strRowsetClass = wizard.FindSymbol("ROWSET_CLASS");
			var bAttributed = wizard.FindSymbol("ATTRIBUTED");
			var strCode = wizard.GetConsumerClass(strRowsetClass, bAttributed);
			wizard.AddSymbol("ROWSET_CLASS_CODE", strCode);
		}
		else
		{
			var bODBC = wizard.FindSymbol("ODBC");
			if (bODBC)
			{
				var strRowsetClass = wizard.FindSymbol("ROWSET_CLASS");
				var bSnapshot = wizard.FindSymbol("SNAPSHOT");
				var bBindAllColumns = wizard.FindSymbol("BIND_ALL_COLUMNS");
				var strCodeDecl = wizard.GetODBCConsumerClassDecl(bBindAllColumns, bSnapshot, strRowsetClass);
				var strCodeImpl = wizard.GetODBCConsumerClassImpl();
				wizard.AddSymbol("ROWSET_CLASS_ODBC_DECL", strCodeDecl);
				wizard.AddSymbol("ROWSET_CLASS_ODBC_IMPL", strCodeImpl);
			}
		}

		var strProjectPath = wizard.FindSymbol("PROJECT_PATH");
		var strProjectName = wizard.FindSymbol("PROJECT_NAME");

		selProj = CreateProject(strProjectName, strProjectPath);

		AddCommonConfig(selProj, strProjectName, /*unicode*/ true);
		AddSpecificConfig(selProj, strProjectName, strProjectPath);

		SetupFilters(selProj);

		var strDocTypeName = wizard.FindSymbol("DOC_TYPE_NAME"); 		
		if (strDocTypeName != "" )
		{
			wizard.AddSymbol("SAFE_DOC_TYPE_NAME", CreateSafeName(strDocTypeName));
		}
		
		selProj.Object.keyword = "MFCProj";

		SetResDlgFont();

		AddFilesToProjectWithInfFile(selProj, strProjectName);
		SetCommonPchSettings(selProj);

		var Sdl = wizard.FindSymbol("SDL_CHECK");

		if (Sdl) 
		{
			EnableSDLCheckSettings(selProj);
		}

		selProj.Object.Save();

		if (wizard.FindSymbol("APP_TYPE_DLG"))
		{
			var strDialogId = "IDD_" + wizard.FindSymbol("UPPER_CASE_SAFE_PROJECT_IDENTIFIER_NAME") + "_DIALOG";
			var oResHelper = wizard.ResourceHelper;
			oResHelper.OpenResourceFile(strProjectPath + "\\" + strProjectName + ".rc");
			oResHelper.OpenResourceInEditor("Dialog", strDialogId);
		}

		SetAllConfigCharset(selProj, /*unicode*/ true);

		// Create ATL project with preview/search/thumbnail handlers if requested
		if (wizard.FindSymbol("PREVIEW_HANDLER") || wizard.FindSymbol("SEARCH_HANDLER") || wizard.FindSymbol("THUMBNAIL_HANDLER"))
		{
			var strATLProjectName = strProjectName + "Handlers";
			var strATLProjectNameSafe = CreateASCIIName(strATLProjectName);
			wizard.AddSymbol("CLOSE_SOLUTION", false);
			oFSO = new ActiveXObject("Scripting.FileSystemObject");
			strATLProjectPath = oFSO.GetAbsolutePathName(strProjectPath + "\\..\\" + strATLProjectName);
			var strBaseProjectName = wizard.FindSymbol("PROJECT_NAME");
			wizard.AddSymbol("BASE_PROJECT_NAME", strBaseProjectName);
			wizard.AddSymbol("PROJECT_NAME", strATLProjectName);
			wizard.AddSymbol("PROJECT_PATH", strATLProjectPath);
			wizard.AddSymbol("LIB_NAME", strATLProjectName);
			wizard.AddSymbol("UPPER_CASE_SAFE_PROJECT_IDENTIFIER_NAME", (CreateSafeName(strATLProjectName)).toUpperCase());
			wizard.AddSymbol("SAFE_IDL_NAME", strATLProjectNameSafe);
			wizard.AddSymbol("SAFE_ATL_MODULE_NAME", CreateClassName(strATLProjectNameSafe, "Module"));
			wizard.AddSymbol("SAFE_MFC_APP_NAME", CreateClassName(strATLProjectNameSafe, "App"));
			CreateGuids();

			var oATLProj = CreateProject(strATLProjectName, strATLProjectPath);
			SetupFilters(oATLProj);
			oATLProj.Object.keyword = "AtlProj";
			AddFilesToProjectWithNamedInfFile(oATLProj, strATLProjectName, "Handler_Templates.inf");

			SetCommonPchSettings(oATLProj);
			SetATLConfigsType(oATLProj, typeDynamicLibrary);
			SetAllConfigCharset(oATLProj, true);
			SetATLConfigsToolSettings(oATLProj, strATLProjectName);
			SetATLConfigsMFC(oATLProj);
			SetFileSettings(oATLProj);

			var strMFCDocHeader = "..\\" + strBaseProjectName + "\\" + wizard.FindSymbol("DOC_HEADER");
			if (oATLProj.Object.CanAddFile(strMFCDocHeader))
			{
				oATLProj.Object.AddFile(strMFCDocHeader);
			}
			var strMFCDocImpl = "..\\" + strBaseProjectName + "\\" + wizard.FindSymbol("DOC_IMPL");
			if (oATLProj.Object.CanAddFile(strMFCDocImpl))
			{
				oATLProj.Object.AddFile(strMFCDocImpl);
			}

			if (wizard.FindSymbol("PREVIEW_HANDLER"))
			{
				var strMFCViewHeader = "..\\" + strBaseProjectName + "\\" + wizard.FindSymbol("VIEW_HEADER");
				if (oATLProj.Object.CanAddFile(strMFCViewHeader))
				{
					oATLProj.Object.AddFile(strMFCViewHeader);
				}
				var strMFCViewImpl = "..\\" + strBaseProjectName + "\\" + wizard.FindSymbol("VIEW_IMPL");
				if (oATLProj.Object.CanAddFile(strMFCViewImpl))
				{
					oATLProj.Object.AddFile(strMFCViewImpl);
				}
			}

			var strMFCCntrHeader = "..\\" + strBaseProjectName + "\\CntrItem.h";
			strFile = oFSO.GetAbsolutePathName(strATLProjectPath + "\\" + strMFCCntrHeader);
			if (oFSO.FileExists(strFile) && oATLProj.Object.CanAddFile(strMFCCntrHeader)) {
				oATLProj.Object.AddFile(strMFCCntrHeader);

				var strMFCCntrImpl = "..\\" + strBaseProjectName + "\\CntrItem.cpp";
				strFile = oFSO.GetAbsolutePathName(strATLProjectPath + "\\" + strMFCCntrImpl);
				if (oFSO.FileExists(strFile) && oATLProj.Object.CanAddFile(strMFCCntrImpl)) {
					oATLProj.Object.AddFile(strMFCCntrImpl);
				}
			}

			var strMFCSrvrHeader = "..\\" + strBaseProjectName + "\\SrvrItem.h";
			strFile = oFSO.GetAbsolutePathName(strATLProjectPath + "\\" + strMFCSrvrHeader);
			if (oFSO.FileExists(strFile) && oATLProj.Object.CanAddFile(strMFCSrvrHeader)) {
			    oATLProj.Object.AddFile(strMFCSrvrHeader);

			    var strMFCSrvrImpl = "..\\" + strBaseProjectName + "\\SrvrItem.cpp";
			    strFile = oFSO.GetAbsolutePathName(strATLProjectPath + "\\" + strMFCSrvrImpl);
			    if (oFSO.FileExists(strFile) && oATLProj.Object.CanAddFile(strMFCSrvrImpl)) {
			        oATLProj.Object.AddFile(strMFCSrvrImpl);
			    }
			}

			var L_strGenerated_Text = "Wygenerowane pliki";
			var strIdlName = wizard.FindSymbol("SAFE_IDL_NAME");
			var oGeneratedFiles = oATLProj.Object.AddFilter(L_strGenerated_Text);
			if (oGeneratedFiles)
			{
				oGeneratedFiles.SourceControlFiles = false;
				var files = oATLProj.Object.Files;
				var file;
				file = files(strIdlName + "_i.c");
				if (file.CanMove(oGeneratedFiles))
					file.Move(oGeneratedFiles);
				file = files(strIdlName + "_i.h");
				if (file.CanMove(oGeneratedFiles))
					file.Move(oGeneratedFiles);
			}

			oATLProj.Object.Save();
		}
	}
	catch(e)
	{
		if (e.description.length != 0)
			SetErrorInfo(e);
		return e.number
	}
}

function CreateGuids()
{
	strGuid = wizard.CreateGuid();
	strVal = wizard.FormatGuid(strGuid, 0);
	wizard.AddSymbol("LIBID_REGISTRY_FORMAT", strVal);
	strGuid = wizard.CreateGuid();
	strVal = wizard.FormatGuid(strGuid, 0);
	wizard.AddSymbol("CLSID_REGISTRY_FORMAT", strVal);
	strGuid = wizard.CreateGuid();
	strVal = wizard.FormatGuid(strGuid, 0);
	wizard.AddSymbol("APPID_REGISTRY_FORMAT", strVal);

	strGuid = wizard.CreateGuid();
	strVal = wizard.FormatGuid(strGuid, 0);
	wizard.AddSymbol("CLSID_PREVIEW", strVal);
	strGuid = wizard.CreateGuid();
	strVal = wizard.FormatGuid(strGuid, 0);
	wizard.AddSymbol("IID_PREVIEW", strVal);

	strGuid = wizard.CreateGuid();
	strVal = wizard.FormatGuid(strGuid, 0);
	wizard.AddSymbol("CLSID_THUMBNAIL", strVal);
	strGuid = wizard.CreateGuid();
	strVal = wizard.FormatGuid(strGuid, 0);
	wizard.AddSymbol("IID_THUMBNAIL", strVal);

	strGuid = wizard.CreateGuid();
	strVal = wizard.FormatGuid(strGuid, 0);
	wizard.AddSymbol("CLSID_SEARCH", strVal);
	strGuid = wizard.CreateGuid();
	strVal = wizard.FormatGuid(strGuid, 0);
	wizard.AddSymbol("IID_SEARCH", strVal);

	strGuid = wizard.CreateGuid();
	strVal = wizard.FormatGuid(strGuid, 0);
	wizard.AddSymbol("CLSID_PERSISTENT_HANDLER", strVal);
}

function SetFileProperties(projfile, strName)
{
	return false;
}

function CreateClassName(strPrefix, strPostfix)
{
	var strCandidate;
	strCandidate = "C" + strPrefix + strPostfix;
	return strCandidate;
}

function SetATLConfigsToolSettings(oProj, strProjectName)
{
	var oConfigs = oProj.Object.Configurations;
	for (var nCntr = 1; nCntr <= oConfigs.Count; nCntr++)
	{
		var config = oConfigs(nCntr);
		var bDebug = false;
		if (-1 != config.Name.indexOf("Debug"))
		{
			bDebug = true;
		}

		// MIDL settings
		var strIdlName = wizard.FindSymbol("SAFE_IDL_NAME");
		var MidlTool = config.Tools("VCMidlTool");
		MidlTool.MkTypLibCompatible = false;
		MidlTool.TargetEnvironment = midlTargetWin32;

		if (bDebug)
			MidlTool.PreprocessorDefinitions = "_DEBUG";
		else
			MidlTool.PreprocessorDefinitions = "NDEBUG";

		MidlTool.HeaderFileName = strIdlName + "_i.h";
		MidlTool.InterfaceIdentifierFileName = strIdlName + "_i.c";
		MidlTool.ProxyFileName = strIdlName + "_p.c";
		MidlTool.GenerateStublessProxies = true;
		MidlTool.TypeLibraryName = "$(IntDir)" + strIdlName + ".tlb";
		MidlTool.DLLDataFileName = "";

		// no /no_robust
		MidlTool.ValidateParameters = true;

		// Compiler settings
		var CLTool = config.Tools("VCCLCompilerTool");
		CLTool.UsePrecompiledHeader = pchUseUsingSpecific;
		CLTool.WarningLevel = WarningLevel_3;
		if (bDebug)
		{
			CLTool.Optimization = optimizeDisabled;
			CLTool.PreprocessorDefinitions = "WIN32;_WINDOWS;_DEBUG;_USRDLL";
		}
		else
		{
			CLTool.Optimization = optimizeMaxSpeed;
			CLTool.PreprocessorDefinitions = "WIN32;_WINDOWS;NDEBUG;_USRDLL";
		}

		// Resource settings
		var RCTool = config.Tools("VCResourceCompilerTool");
		RCTool.Culture = wizard.FindSymbol("LCID");
		RCTool.AdditionalIncludeDirectories = "$(IntDir)";
		if (bDebug)
			RCTool.PreprocessorDefinitions = "_DEBUG";
		else
			RCTool.PreprocessorDefinitions = "NDEBUG";

		// Linker settings
		var LinkTool = config.Tools("VCLinkerTool");
		LinkTool.SubSystem = subSystemWindows;
		LinkTool.IgnoreImportLibrary = true;

		var strDefFile = ".\\" + strProjectName + ".def";
		LinkTool.ModuleDefinitionFile = strDefFile;

		LinkTool.GenerateDebugInformation = true;
		if (bDebug)
		{
			LinkTool.LinkIncremental = linkIncrementalYes;
		}
		else
		{
			LinkTool.LinkIncremental = linkIncrementalNo;
			LinkTool.EnableCOMDATFolding = optFolding;
			LinkTool.OptimizeReferences = optReferences;
		}

		LinkTool.RegisterOutput = true;

		// Post-build step to set permissions on the DLL (if necessary)
		if (wizard.FindSymbol("SEARCH_HANDLER"))
		{
			var L_SettingPermissions_Text = "Ustawianie uprawnieñ do uchwytu DLL (aby w³¹czyæ ³adowanie przez SearchFilterHost.exe)...";

			var PostBuildTool = config.Tools("VCPostBuildEventTool");
			PostBuildTool.Description = L_SettingPermissions_Text;

			// Grant Read and Execute right to "Users" group.
			PostBuildTool.CommandLine = "icacls.exe \"$(TargetPath)\" /grant *S-1-5-32-545:RX";
		}
	}
}

function SetATLConfigsType(oProj, typeConfig)
{
	var oConfigs = oProj.Object.Configurations;
	for (var nCntr = 1; nCntr <= oConfigs.Count; nCntr++)
	{
		var config = oConfigs(nCntr);
		config.ConfigurationType = typeConfig;
	}
}

function SetATLConfigsMFC(oProj)
{
	var bDynamicMFC = wizard.FindSymbol("DYNAMIC_MFC");
	var oConfigs = oProj.Object.Configurations;
	for (var nCntr = 1; nCntr <= oConfigs.Count; nCntr++)
	{
		var config = oConfigs(nCntr);
		var bDebug = false;
		if (-1 != config.Name.indexOf("Debug"))
		{
			bDebug = true;
		}

		var CLTool = config.Tools("VCCLCompilerTool");

		if (bDynamicMFC)
		{
			config.UseOfMFC = useMfcDynamic;
		}
		else
		{
			config.UseOfMFC = useMfcStatic;
		}
	}
}

var nNumConfigs = 2;

var astrConfigName = new Array();
astrConfigName[0] = "Debug";
astrConfigName[1] = "Release";

function SetFileSettings(proj)
{
	try
	{
		var files = proj.Object.Files;

		var nCntr;
		for (nCntr = 0; nCntr < nNumConfigs; nCntr++)
		{
			var file;
			var strIdlName = wizard.FindSymbol("SAFE_IDL_NAME");

			file = files(strIdlName + "_i.c");
			config = file.FileConfigurations(astrConfigName[nCntr]);
			config.Tool.CompileAsManaged = 0; // no /CLR
			config.Tool.UsePrecompiledHeader = pchNone; // no PCH

			file = files("dllmain.cpp");
			config = file.FileConfigurations(astrConfigName[nCntr]);
			config.Tool.CompileAsManaged = 0; // no /CLR
			config.Tool.UsePrecompiledHeader = pchNone; // no PCH

			file = files("xdlldata.c");
			config = file.FileConfigurations(astrConfigName[nCntr]);
			config.Tool.CompileAsManaged = 0; // no /CLR
			config.Tool.UsePrecompiledHeader = pchNone; // no PCH
		}
	}
	catch (e) {
		throw e;
	}
}

function AddSpecificConfig(proj, strProjectName, strProjectPath)
{
	try
	{
		var bAutomation = wizard.FindSymbol("AUTOMATION");
		var bServer = wizard.FindSymbol("MINI_SERVER");
		var bDynamicMFC = wizard.FindSymbol("DYNAMIC_MFC");

		if (!bServer)
		{
			bServer = wizard.FindSymbol("FULL_SERVER");
			if (!bServer)
				bServer = wizard.FindSymbol("CONTAINER_SERVER");
		}
		var oConfigs = proj.Object.Configurations;
		for (var nCntr = 1; nCntr <= oConfigs.Count; nCntr++)
		{
			var config = oConfigs(nCntr);
			var bDebug = false;
			if (-1 != config.Name.indexOf("Debug"))
				bDebug = true;
			// Default to unicode
			config.CharacterSet = charSetUNICODE;

			var CLTool = config.Tools("VCCLCompilerTool");

			if (bDynamicMFC)
			{
				config.UseOfMFC = useMfcDynamic;
			}
			else
			{
				config.UseOfMFC = useMfcStatic;
			}
			var strDefines = CLTool.PreprocessorDefinitions;
			if (strDefines != "") strDefines += ";";
			strDefines += GetPlatformDefine(config);
			if(bDebug)
			{
				strDefines += "_WINDOWS;_DEBUG";
			}
			else
			{
				strDefines += "_WINDOWS;NDEBUG";
			}
			CLTool.PreprocessorDefinitions= strDefines;

			var LinkTool = config.Tools("VCLinkerTool");
			LinkTool.GenerateDebugInformation = true;

			LinkTool.LinkIncremental = (bDebug ? linkIncrementalYes : linkIncrementalNo);

			var bRibbon = wizard.FindSymbol("RIBBON_TOOLBAR");
			var bTabbedMDI = wizard.FindSymbol("APP_TYPE_TABBED_MDI");
			var bDBSupportHeaderOnly = wizard.FindSymbol("DB_SUPPORT_HEADER_ONLY");

			var bOLEDB = wizard.FindSymbol("OLEDB");
			var bSupportOLEDB = wizard.FindSymbol("DB_SUPPORT_OLEDB");
			if (bOLEDB || (bDBSupportHeaderOnly && bSupportOLEDB))
			{
				LinkTool.AdditionalDependencies = "msdasc.lib";
			}

			var bODBC = wizard.FindSymbol("ODBC");
			var bSupportODBC = wizard.FindSymbol("DB_SUPPORT_ODBC");
			if (bODBC || (bDBSupportHeaderOnly && bSupportODBC))
			{
				LinkTool.AdditionalDependencies = "odbc32.lib";
			}

			var MidlTool = config.Tools("VCMidlTool");
			MidlTool.MkTypLibCompatible = false;
			
			// no /no_robust
			MidlTool.ValidateParameters = true;
			MidlTool.PreprocessorDefinitions = (bDebug ? "_DEBUG" : "NDEBUG");

			if (bAutomation)
			{
				var strIdlName = wizard.FindSymbol("SAFE_IDL_NAME");
				MidlTool.TypeLibraryName = "$(IntDir)" + strIdlName + ".tlb";
				MidlTool.HeaderFileName = strIdlName + "_h.h";
			}

			var RCTool = config.Tools("VCResourceCompilerTool");
			RCTool.Culture = wizard.FindSymbol("LCID");
			RCTool.PreprocessorDefinitions = (bDebug ? "_DEBUG" : "NDEBUG");
			RCTool.AdditionalIncludeDirectories = "$(IntDir)";

			if (bServer || bAutomation)
			{
				LinkTool.RegisterOutput = true;
			}
		} //for
	}
	catch(e)
	{
		throw e;
	}
}

function GetTargetName(strName, strProjectName, strResPath, strHelpPath)
{
	try
	{
		var strTarget = strName;
		var strSafeProjHelpFileName = wizard.FindSymbol("SAFE_PROJECT_HELP_FILE_NAME");
		var strRC2FileName = wizard.FindSymbol("RC2_FILE_NAME");
		if (strName.substr(0, 4) == "root")
		{
			if (strName == "root.ico" || strName == "root.manifest")
			{
				strTarget = strResPath + "\\" + strProjectName + strName.substr(4);
			}
			else if (strName == "root.rc2")
			{
				strTarget = strResPath + "\\" + strRC2FileName + strName.substr(4);
			}
			else if (strName == "root.hpj" || strName == "root.cnt")
			{
				strTarget = strProjectName + strName.substr(4);
				strTarget = strHelpPath + "\\" + strTarget;
			}
			else if (strName == "root.hhc" || 
				strName == "root.hhk" || 
				strName == "root.hhp")
			{
				strTarget = strSafeProjHelpFileName + strName.substr(4);
				strTarget = strHelpPath + "\\" + strTarget;
			}
			else if (strName == "root.idl")
			{
				var strProjectName = wizard.FindSymbol("SAFE_IDL_NAME");
				strTarget = strProjectName + ".idl";
			}
			else
				strTarget = strProjectName + strName.substr(4);
			return strTarget;
		}
		if (strName.substr(0, 7) == "dlgroot")
		{
			var strExtension = strName.substr(7);

			if (strName == "dlgroot.cnt")
			{
				strTarget = strHelpPath + "\\" + strProjectName + strExtension;
			}
			else if (strName == "dlgroot.hhc")
			{
				strTarget = strHelpPath + "\\" + strSafeProjHelpFileName + strExtension;
			}
			else
			{
				strTarget = strProjectName + strExtension;
			}

			return strTarget;
		}

		switch (strName)
		{
			case "readme.txt":
				strTarget = "ReadMe.txt";
				break;
			case "all.rc":
			case "dlgall.rc":
				strTarget = wizard.FindSymbol("RC_FILE_NAME");
				break;
			case "dlgres.h":
			case "resource.h":
				strTarget = "Resource.h";
				break;
			case "dialog.h":
				strTarget = wizard.FindSymbol("DIALOG_HEADER");
				break;
			case "dialog.cpp":
				strTarget = wizard.FindSymbol("DIALOG_IMPL");
				break;
			case "dlgproxy.h":
				strTarget = wizard.FindSymbol("DIALOG_AUTO_PROXY_HEADER");
				break;
			case "dlgproxy.cpp":
				strTarget = wizard.FindSymbol("DIALOG_AUTO_PROXY_IMPL");
				break;
			case "frame.h":
				strTarget = wizard.FindSymbol("MAIN_FRAME_HEADER");
				break;
			case "frame.cpp":
				strTarget = wizard.FindSymbol("MAIN_FRAME_IMPL");
				break;
			case "childfrm.h":
				strTarget = wizard.FindSymbol("CHILD_FRAME_HEADER");
				break;
			case "childfrm.cpp":
				strTarget = wizard.FindSymbol("CHILD_FRAME_IMPL");
				break;
			case "doc.h":
				strTarget = wizard.FindSymbol("DOC_HEADER");
				break;
			case "doc.cpp":
				strTarget = wizard.FindSymbol("DOC_IMPL");
				break;
			case "view.h":
				strTarget = wizard.FindSymbol("VIEW_HEADER");
				break;
			case "view.cpp":
				strTarget = wizard.FindSymbol("VIEW_IMPL");
				break;
			case "wndview.h":
				strTarget = wizard.FindSymbol("WND_VIEW_HEADER");
				break;
			case "wndview.cpp":
				strTarget = wizard.FindSymbol("WND_VIEW_IMPL");
				break;
			case "treeview.h":
				strTarget = wizard.FindSymbol("TREE_VIEW_HEADER");
				break;
			case "treeview.cpp":
				strTarget = wizard.FindSymbol("TREE_VIEW_IMPL");
				break;
			case "recset.h":
				strTarget = wizard.FindSymbol("ROWSET_HEADER");
				break;
			case "recset.cpp":
				strTarget = wizard.FindSymbol("ROWSET_IMPL");
				break;
			case "srvritem.h":
				strTarget = wizard.FindSymbol("SERVER_ITEM_HEADER");
				break;
			case "srvritem.cpp":
				strTarget = wizard.FindSymbol("SERVER_ITEM_IMPL");
				break;
			case "ipframe.h":
				strTarget = wizard.FindSymbol("INPLACE_FRAME_HEADER");
				break;
			case "ipframe.cpp":
				strTarget = wizard.FindSymbol("INPLACE_FRAME_IMPL");
				break;
			case "cntritem.h":
				strTarget = wizard.FindSymbol("CONTAINER_ITEM_HEADER");
				break;
			case "cntritem.cpp":
				strTarget = wizard.FindSymbol("CONTAINER_ITEM_IMPL");
				break;
			case "viewtree.h":
				strTarget = "ViewTree.h";
				break;
			case "viewtree.cpp":
				strTarget = "ViewTree.cpp";
				break;
			case "classview.h":
				strTarget = "ClassView.h";
				break;
			case "classview.cpp":
				strTarget = "ClassView.cpp";
				break;
			case "fileview.h":
				strTarget = "FileView.h";
				break;
			case "fileview.cpp":
				strTarget = "FileView.cpp";
				break;
			case "outputwnd.h":
				strTarget = "OutputWnd.h";
				break;
			case "outputwnd.cpp":
				strTarget = "OutputWnd.cpp";
				break;
			case "propertieswnd.h":
				strTarget = "PropertiesWnd.h";
				break;
			case "propertieswnd.cpp":
				strTarget = "PropertiesWnd.cpp";
				break;
			case "calendarbar.h":
				strTarget = "CalendarBar.h";
				break;
			case "calendarbar.cpp":
				strTarget = "CalendarBar.cpp";
				break;
			case "userimages.bmp":
				strTarget = "UserImages.bmp";
				break;
			case "doc.ico":
				strTarget = strResPath + "\\" + strProjectName + "Doc.ico";
				break;
			case "file_view.ico":
			case "file_view_hc.ico":
			case "fileview.bmp":
			case "fileview_hc.bmp":
			case "class_view.ico":
			case "class_view_hc.ico":
			case "classview.bmp":
			case "classview_hc.bmp":
			case "output_wnd.ico":
			case "output_wnd_hc.ico":
			case "properties_wnd.ico":
			case "properties_wnd_hc.ico":
			case "properties.bmp":
			case "properties_hc.bmp":
			case "explorer.bmp":
			case "explorer_hc.bmp":
			case "sort.bmp":
			case "sort_hc.bmp":
			case "nav_large.bmp":
			case "nav_large_hc.bmp":
			case "pages.bmp":
			case "pages_hc.bmp":
			case "pages_small.bmp":
			case "pages_small_hc.bmp":
			case "menuimages.bmp":
			case "menuimages_hc.bmp":
			case "info.bmp":
				strTarget = strResPath + "\\" + strTarget;
				break;
			case "handler_stdafx.h":
				strTarget = "stdafx.h";
				break;
			case "handler_stdafx.cpp":
				strTarget = "stdafx.cpp";
				break;
			case "handler_dllmain.h":
				strTarget = "dllmain.h";
				break;
			case "handler_dllmain.cpp":
				strTarget = "dllmain.cpp";
				break;
			case "handler_readme.txt":
				strTarget = "ReadMe.txt";
				break;
			case "handler_resource.h":
				strTarget = "Resource.h";
				break;
			case "handler_root.cpp":
				strTarget = strProjectName + ".cpp";
				break;
			case "handler_root.def":
				strTarget = strProjectName + ".def";
				break;
			case "handler_root.idl":
				strTarget = CreateASCIIName(strProjectName) + ".idl";
				break;
			case "handler_root_i.c":
				strTarget = CreateASCIIName(strProjectName) + "_i.c";
				break;
			case "handler_root_i.h":
				strTarget = CreateASCIIName(strProjectName) + "_i.h";
				break;
			case "handler_root.rc":
				strTarget = strProjectName + ".rc";
				break;
			case "handler_root.rgs":
				strTarget = strProjectName + ".rgs";
				break;
			case "handler_preview.h":
				strTarget = "PreviewHandler.h";
				break;
			case "handler_preview.rgs":
				strTarget = "PreviewHandler.rgs";
				break;
			case "handler_search.h":
				strTarget = "FilterHandler.h";
				break;
			case "handler_search.rgs":
				strTarget = "FilterHandler.rgs";
				break;
			case "handler_thumbnail.h":
				strTarget = "ThumbnailHandler.h";
				break;
			case "handler_thumbnail.rgs":
				strTarget = "ThumbnailHandler.rgs";
				break;
			case "handler_targetver.h":
				strTarget = "targetver.h";
				break;
			case "handler_xdlldata.h":
				strTarget = "xdlldata.h";
				break;
			case "handler_xdlldata.c":
				strTarget = "xdlldata.c";
				break;
			default:
				break;
		}

		var strTemp = GetAdditionalPath(strTarget, strResPath, strHelpPath);


		strTarget = strTemp;
		return strTarget; 
	}
	catch(e)
	{
		throw e;
	}
}

function GetAdditionalPath(strName, strResPath, strHelpPath)
{
	try
	{
		var strFullName = strName;
		switch(strName)
		{
			case "buttons.bmp":
			case "filelarge.bmp":
			case "filesmall.bmp":
			case "main.bmp":
			case "writelarge.bmp":
			case "writesmall.bmp":
			case "ribbon.mfcribbon-ms":
				strFullName = strResPath + "\\" + strName;
				break;
			case "tbdh_.bmp":
			case "tbd__.bmp":
			case "tbrh_.bmp":
			case "tbr__.bmp":
			case "tbah_.bmp":
			case "tba__.bmp":
			case "tbedh.bmp":
			case "tbed_.bmp":
			case "tbeah.bmp":
			case "tbea_.bmp":
			case "tbndm.bmp":
			case "tbndmh.bmp":
			case "tbnds.bmp":
			case "tbndsh.bmp":
				strFullName = strResPath + "\\Toolbar.bmp";
				break;
			case "tbah_256.bmp":
			case "tba__256.bmp":
			case "tbdh_256.bmp":
			case "tbd__256.bmp":
			case "tbeah_256.bmp":
			case "tbea_256.bmp":
			case "tbedh_256.bmp":
			case "tbed_256.bmp":
			case "tbrh_256.bmp":
			case "tbr__256.bmp":
			case "tbndmh256.bmp":
			case "tbndm256.bmp":
			case "tbndsh256.bmp":
			case "tbnds256.bmp":
				strFullName = strResPath + "\\Toolbar256.bmp";
				break;
			case "tba_i.bmp":
			case "tbrhi.bmp":
			case "tbr_i.bmp":
			case "tbahi.bmp":
				strFullName = strResPath + "\\IToolbar.bmp";
				break;
			case "tba_i256.bmp":
			case "tbrhi256.bmp":
			case "tbr_i256.bmp":
			case "tbahi256.bmp":
				strFullName = strResPath + "\\IToolbar256.bmp";
				break;
			default:
				break;
		}
		return strFullName;
	}
	catch(e)
	{
		throw e;
	}
}
// SIG // Begin signature block
// SIG // MIIanQYJKoZIhvcNAQcCoIIajjCCGooCAQExCzAJBgUr
// SIG // DgMCGgUAMGcGCisGAQQBgjcCAQSgWTBXMDIGCisGAQQB
// SIG // gjcCAR4wJAIBAQQQEODJBs441BGiowAQS9NQkAIBAAIB
// SIG // AAIBAAIBAAIBADAhMAkGBSsOAwIaBQAEFGya7nOKpRMd
// SIG // carWwiTGYTjXgQLCoIIVgjCCBMMwggOroAMCAQICEzMA
// SIG // AAAz5SeGow5KKoAAAAAAADMwDQYJKoZIhvcNAQEFBQAw
// SIG // dzELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0
// SIG // b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1p
// SIG // Y3Jvc29mdCBDb3Jwb3JhdGlvbjEhMB8GA1UEAxMYTWlj
// SIG // cm9zb2Z0IFRpbWUtU3RhbXAgUENBMB4XDTEzMDMyNzIw
// SIG // MDgyM1oXDTE0MDYyNzIwMDgyM1owgbMxCzAJBgNVBAYT
// SIG // AlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQH
// SIG // EwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29y
// SIG // cG9yYXRpb24xDTALBgNVBAsTBE1PUFIxJzAlBgNVBAsT
// SIG // Hm5DaXBoZXIgRFNFIEVTTjpGNTI4LTM3NzctOEE3NjEl
// SIG // MCMGA1UEAxMcTWljcm9zb2Z0IFRpbWUtU3RhbXAgU2Vy
// SIG // dmljZTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoC
// SIG // ggEBAMreyhkPH5ZWgl/YQjLUCG22ncDC7Xw4q1gzrWuB
// SIG // ULiIIQpdr5ctkFrHwy6yTNRjdFj938WJVNALzP2chBF5
// SIG // rKMhIm0z4K7eJUBFkk4NYwgrizfdTwdq3CrPEFqPV12d
// SIG // PfoXYwLGcD67Iu1bsfcyuuRxvHn/+MvpVz90e+byfXxX
// SIG // WC+s0g6o2YjZQB86IkHiCSYCoMzlJc6MZ4PfRviFTcPa
// SIG // Zh7Hc347tHYXpqWgoHRVqOVgGEFiOMdlRqsEFmZW6vmm
// SIG // y0LPXVRkL4H4zzgADxBr4YMujT5I7ElWSuyaafTLDxD7
// SIG // BzRKYmwBjW7HIITKXNFjmR6OXewPpRZIqmveIS8CAwEA
// SIG // AaOCAQkwggEFMB0GA1UdDgQWBBQAWBs+7cXxBpO+MT02
// SIG // tKwLXTLwgTAfBgNVHSMEGDAWgBQjNPjZUkZwCu1A+3b7
// SIG // syuwwzWzDzBUBgNVHR8ETTBLMEmgR6BFhkNodHRwOi8v
// SIG // Y3JsLm1pY3Jvc29mdC5jb20vcGtpL2NybC9wcm9kdWN0
// SIG // cy9NaWNyb3NvZnRUaW1lU3RhbXBQQ0EuY3JsMFgGCCsG
// SIG // AQUFBwEBBEwwSjBIBggrBgEFBQcwAoY8aHR0cDovL3d3
// SIG // dy5taWNyb3NvZnQuY29tL3BraS9jZXJ0cy9NaWNyb3Nv
// SIG // ZnRUaW1lU3RhbXBQQ0EuY3J0MBMGA1UdJQQMMAoGCCsG
// SIG // AQUFBwMIMA0GCSqGSIb3DQEBBQUAA4IBAQAC/+OMA+rv
// SIG // fji5uXyfO1KDpPojONQDuGpZtergb4gD9G9RapU6dYXo
// SIG // HNwHxU6dG6jOJEcUJE81d7GcvCd7j11P/AaLl5f5KZv3
// SIG // QB1SgY52SAN+8psXt67ZWyKRYzsyXzX7xpE8zO8OmYA+
// SIG // BpE4E3oMTL4z27/trUHGfBskfBPcCvxLiiAFHQmJkTkH
// SIG // TiFO3mx8cLur8SCO+Jh4YNyLlM9lvpaQD6CchO1ctXxB
// SIG // oGEtvUNnZRoqgtSniln3MuOj58WNsiK7kijYsIxTj2hH
// SIG // R6HYAbDxYRXEF6Et4zpsT2+vPe7eKbBEy8OSZ7oAzg+O
// SIG // Ee/RAoIxSZSYnVFIeK0d1kC2MIIE7DCCA9SgAwIBAgIT
// SIG // MwAAALARrwqL0Duf3QABAAAAsDANBgkqhkiG9w0BAQUF
// SIG // ADB5MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGlu
// SIG // Z3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMV
// SIG // TWljcm9zb2Z0IENvcnBvcmF0aW9uMSMwIQYDVQQDExpN
// SIG // aWNyb3NvZnQgQ29kZSBTaWduaW5nIFBDQTAeFw0xMzAx
// SIG // MjQyMjMzMzlaFw0xNDA0MjQyMjMzMzlaMIGDMQswCQYD
// SIG // VQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4G
// SIG // A1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0
// SIG // IENvcnBvcmF0aW9uMQ0wCwYDVQQLEwRNT1BSMR4wHAYD
// SIG // VQQDExVNaWNyb3NvZnQgQ29ycG9yYXRpb24wggEiMA0G
// SIG // CSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDor1yiIA34
// SIG // KHy8BXt/re7rdqwoUz8620B9s44z5lc/pVEVNFSlz7SL
// SIG // qT+oN+EtUO01Fk7vTXrbE3aIsCzwWVyp6+HXKXXkG4Un
// SIG // m/P4LZ5BNisLQPu+O7q5XHWTFlJLyjPFN7Dz636o9UEV
// SIG // XAhlHSE38Cy6IgsQsRCddyKFhHxPuRuQsPWj/ov0DJpO
// SIG // oPXJCiHiquMBNkf9L4JqgQP1qTXclFed+0vUDoLbOI8S
// SIG // /uPWenSIZOFixCUuKq6dGB8OHrbCryS0DlC83hyTXEmm
// SIG // ebW22875cHsoAYS4KinPv6kFBeHgD3FN/a1cI4Mp68fF
// SIG // SsjoJ4TTfsZDC5UABbFPZXHFAgMBAAGjggFgMIIBXDAT
// SIG // BgNVHSUEDDAKBggrBgEFBQcDAzAdBgNVHQ4EFgQUWXGm
// SIG // WjNN2pgHgP+EHr6H+XIyQfIwUQYDVR0RBEowSKRGMEQx
// SIG // DTALBgNVBAsTBE1PUFIxMzAxBgNVBAUTKjMxNTk1KzRm
// SIG // YWYwYjcxLWFkMzctNGFhMy1hNjcxLTc2YmMwNTIzNDRh
// SIG // ZDAfBgNVHSMEGDAWgBTLEejK0rQWWAHJNy4zFha5TJoK
// SIG // HzBWBgNVHR8ETzBNMEugSaBHhkVodHRwOi8vY3JsLm1p
// SIG // Y3Jvc29mdC5jb20vcGtpL2NybC9wcm9kdWN0cy9NaWND
// SIG // b2RTaWdQQ0FfMDgtMzEtMjAxMC5jcmwwWgYIKwYBBQUH
// SIG // AQEETjBMMEoGCCsGAQUFBzAChj5odHRwOi8vd3d3Lm1p
// SIG // Y3Jvc29mdC5jb20vcGtpL2NlcnRzL01pY0NvZFNpZ1BD
// SIG // QV8wOC0zMS0yMDEwLmNydDANBgkqhkiG9w0BAQUFAAOC
// SIG // AQEAMdduKhJXM4HVncbr+TrURE0Inu5e32pbt3nPApy8
// SIG // dmiekKGcC8N/oozxTbqVOfsN4OGb9F0kDxuNiBU6fNut
// SIG // zrPJbLo5LEV9JBFUJjANDf9H6gMH5eRmXSx7nR2pEPoc
// SIG // sHTyT2lrnqkkhNrtlqDfc6TvahqsS2Ke8XzAFH9IzU2y
// SIG // RPnwPJNtQtjofOYXoJtoaAko+QKX7xEDumdSrcHps3Om
// SIG // 0mPNSuI+5PNO/f+h4LsCEztdIN5VP6OukEAxOHUoXgSp
// SIG // Rm3m9Xp5QL0fzehF1a7iXT71dcfmZmNgzNWahIeNJDD3
// SIG // 7zTQYx2xQmdKDku/Og7vtpU6pzjkJZIIpohmgjCCBbww
// SIG // ggOkoAMCAQICCmEzJhoAAAAAADEwDQYJKoZIhvcNAQEF
// SIG // BQAwXzETMBEGCgmSJomT8ixkARkWA2NvbTEZMBcGCgmS
// SIG // JomT8ixkARkWCW1pY3Jvc29mdDEtMCsGA1UEAxMkTWlj
// SIG // cm9zb2Z0IFJvb3QgQ2VydGlmaWNhdGUgQXV0aG9yaXR5
// SIG // MB4XDTEwMDgzMTIyMTkzMloXDTIwMDgzMTIyMjkzMlow
// SIG // eTELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0
// SIG // b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1p
// SIG // Y3Jvc29mdCBDb3Jwb3JhdGlvbjEjMCEGA1UEAxMaTWlj
// SIG // cm9zb2Z0IENvZGUgU2lnbmluZyBQQ0EwggEiMA0GCSqG
// SIG // SIb3DQEBAQUAA4IBDwAwggEKAoIBAQCycllcGTBkvx2a
// SIG // YCAgQpl2U2w+G9ZvzMvx6mv+lxYQ4N86dIMaty+gMuz/
// SIG // 3sJCTiPVcgDbNVcKicquIEn08GisTUuNpb15S3GbRwfa
// SIG // /SXfnXWIz6pzRH/XgdvzvfI2pMlcRdyvrT3gKGiXGqel
// SIG // cnNW8ReU5P01lHKg1nZfHndFg4U4FtBzWwW6Z1KNpbJp
// SIG // L9oZC/6SdCnidi9U3RQwWfjSjWL9y8lfRjFQuScT5EAw
// SIG // z3IpECgixzdOPaAyPZDNoTgGhVxOVoIoKgUyt0vXT2Pn
// SIG // 0i1i8UU956wIAPZGoZ7RW4wmU+h6qkryRs83PDietHdc
// SIG // pReejcsRj1Y8wawJXwPTAgMBAAGjggFeMIIBWjAPBgNV
// SIG // HRMBAf8EBTADAQH/MB0GA1UdDgQWBBTLEejK0rQWWAHJ
// SIG // Ny4zFha5TJoKHzALBgNVHQ8EBAMCAYYwEgYJKwYBBAGC
// SIG // NxUBBAUCAwEAATAjBgkrBgEEAYI3FQIEFgQU/dExTtMm
// SIG // ipXhmGA7qDFvpjy82C0wGQYJKwYBBAGCNxQCBAweCgBT
// SIG // AHUAYgBDAEEwHwYDVR0jBBgwFoAUDqyCYEBWJ5flJRP8
// SIG // KuEKU5VZ5KQwUAYDVR0fBEkwRzBFoEOgQYY/aHR0cDov
// SIG // L2NybC5taWNyb3NvZnQuY29tL3BraS9jcmwvcHJvZHVj
// SIG // dHMvbWljcm9zb2Z0cm9vdGNlcnQuY3JsMFQGCCsGAQUF
// SIG // BwEBBEgwRjBEBggrBgEFBQcwAoY4aHR0cDovL3d3dy5t
// SIG // aWNyb3NvZnQuY29tL3BraS9jZXJ0cy9NaWNyb3NvZnRS
// SIG // b290Q2VydC5jcnQwDQYJKoZIhvcNAQEFBQADggIBAFk5
// SIG // Pn8mRq/rb0CxMrVq6w4vbqhJ9+tfde1MOy3XQ60L/svp
// SIG // LTGjI8x8UJiAIV2sPS9MuqKoVpzjcLu4tPh5tUly9z7q
// SIG // QX/K4QwXaculnCAt+gtQxFbNLeNK0rxw56gNogOlVuC4
// SIG // iktX8pVCnPHz7+7jhh80PLhWmvBTI4UqpIIck+KUBx3y
// SIG // 4k74jKHK6BOlkU7IG9KPcpUqcW2bGvgc8FPWZ8wi/1wd
// SIG // zaKMvSeyeWNWRKJRzfnpo1hW3ZsCRUQvX/TartSCMm78
// SIG // pJUT5Otp56miLL7IKxAOZY6Z2/Wi+hImCWU4lPF6H0q7
// SIG // 0eFW6NB4lhhcyTUWX92THUmOLb6tNEQc7hAVGgBd3TVb
// SIG // Ic6YxwnuhQ6MT20OE049fClInHLR82zKwexwo1eSV32U
// SIG // jaAbSANa98+jZwp0pTbtLS8XyOZyNxL0b7E8Z4L5UrKN
// SIG // MxZlHg6K3RDeZPRvzkbU0xfpecQEtNP7LN8fip6sCvsT
// SIG // J0Ct5PnhqX9GuwdgR2VgQE6wQuxO7bN2edgKNAltHIAx
// SIG // H+IOVN3lofvlRxCtZJj/UBYufL8FIXrilUEnacOTj5XJ
// SIG // jdibIa4NXJzwoq6GaIMMai27dmsAHZat8hZ79haDJLmI
// SIG // z2qoRzEvmtzjcT3XAH5iR9HOiMm4GPoOco3Boz2vAkBq
// SIG // /2mbluIQqBC0N1AI1sM9MIIGBzCCA++gAwIBAgIKYRZo
// SIG // NAAAAAAAHDANBgkqhkiG9w0BAQUFADBfMRMwEQYKCZIm
// SIG // iZPyLGQBGRYDY29tMRkwFwYKCZImiZPyLGQBGRYJbWlj
// SIG // cm9zb2Z0MS0wKwYDVQQDEyRNaWNyb3NvZnQgUm9vdCBD
// SIG // ZXJ0aWZpY2F0ZSBBdXRob3JpdHkwHhcNMDcwNDAzMTI1
// SIG // MzA5WhcNMjEwNDAzMTMwMzA5WjB3MQswCQYDVQQGEwJV
// SIG // UzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMH
// SIG // UmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBv
// SIG // cmF0aW9uMSEwHwYDVQQDExhNaWNyb3NvZnQgVGltZS1T
// SIG // dGFtcCBQQ0EwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAw
// SIG // ggEKAoIBAQCfoWyx39tIkip8ay4Z4b3i48WZUSNQrc7d
// SIG // GE4kD+7Rp9FMrXQwIBHrB9VUlRVJlBtCkq6YXDAm2gBr
// SIG // 6Hu97IkHD/cOBJjwicwfyzMkh53y9GccLPx754gd6udO
// SIG // o6HBI1PKjfpFzwnQXq/QsEIEovmmbJNn1yjcRlOwhtDl
// SIG // KEYuJ6yGT1VSDOQDLPtqkJAwbofzWTCd+n7Wl7PoIZd+
// SIG // +NIT8wi3U21StEWQn0gASkdmEScpZqiX5NMGgUqi+YSn
// SIG // EUcUCYKfhO1VeP4Bmh1QCIUAEDBG7bfeI0a7xC1Un68e
// SIG // eEExd8yb3zuDk6FhArUdDbH895uyAc4iS1T/+QXDwiAL
// SIG // AgMBAAGjggGrMIIBpzAPBgNVHRMBAf8EBTADAQH/MB0G
// SIG // A1UdDgQWBBQjNPjZUkZwCu1A+3b7syuwwzWzDzALBgNV
// SIG // HQ8EBAMCAYYwEAYJKwYBBAGCNxUBBAMCAQAwgZgGA1Ud
// SIG // IwSBkDCBjYAUDqyCYEBWJ5flJRP8KuEKU5VZ5KShY6Rh
// SIG // MF8xEzARBgoJkiaJk/IsZAEZFgNjb20xGTAXBgoJkiaJ
// SIG // k/IsZAEZFgltaWNyb3NvZnQxLTArBgNVBAMTJE1pY3Jv
// SIG // c29mdCBSb290IENlcnRpZmljYXRlIEF1dGhvcml0eYIQ
// SIG // ea0WoUqgpa1Mc1j0BxMuZTBQBgNVHR8ESTBHMEWgQ6BB
// SIG // hj9odHRwOi8vY3JsLm1pY3Jvc29mdC5jb20vcGtpL2Ny
// SIG // bC9wcm9kdWN0cy9taWNyb3NvZnRyb290Y2VydC5jcmww
// SIG // VAYIKwYBBQUHAQEESDBGMEQGCCsGAQUFBzAChjhodHRw
// SIG // Oi8vd3d3Lm1pY3Jvc29mdC5jb20vcGtpL2NlcnRzL01p
// SIG // Y3Jvc29mdFJvb3RDZXJ0LmNydDATBgNVHSUEDDAKBggr
// SIG // BgEFBQcDCDANBgkqhkiG9w0BAQUFAAOCAgEAEJeKw1wD
// SIG // RDbd6bStd9vOeVFNAbEudHFbbQwTq86+e4+4LtQSooxt
// SIG // YrhXAstOIBNQmd16QOJXu69YmhzhHQGGrLt48ovQ7DsB
// SIG // 7uK+jwoFyI1I4vBTFd1Pq5Lk541q1YDB5pTyBi+FA+mR
// SIG // KiQicPv2/OR4mS4N9wficLwYTp2OawpylbihOZxnLcVR
// SIG // DupiXD8WmIsgP+IHGjL5zDFKdjE9K3ILyOpwPf+FChPf
// SIG // wgphjvDXuBfrTot/xTUrXqO/67x9C0J71FNyIe4wyrt4
// SIG // ZVxbARcKFA7S2hSY9Ty5ZlizLS/n+YWGzFFW6J1wlGys
// SIG // OUzU9nm/qhh6YinvopspNAZ3GmLJPR5tH4LwC8csu89D
// SIG // s+X57H2146SodDW4TsVxIxImdgs8UoxxWkZDFLyzs7BN
// SIG // Z8ifQv+AeSGAnhUwZuhCEl4ayJ4iIdBD6Svpu/RIzCzU
// SIG // 2DKATCYqSCRfWupW76bemZ3KOm+9gSd0BhHudiG/m4LB
// SIG // J1S2sWo9iaF2YbRuoROmv6pH8BJv/YoybLL+31HIjCPJ
// SIG // Zr2dHYcSZAI9La9Zj7jkIeW1sMpjtHhUBdRBLlCslLCl
// SIG // eKuzoJZ1GtmShxN1Ii8yqAhuoFuMJb+g74TKIdbrHk/J
// SIG // mu5J4PcBZW+JC33Iacjmbuqnl84xKf8OxVtc2E0bodj6
// SIG // L54/LlUWa8kTo/0xggSHMIIEgwIBATCBkDB5MQswCQYD
// SIG // VQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4G
// SIG // A1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0
// SIG // IENvcnBvcmF0aW9uMSMwIQYDVQQDExpNaWNyb3NvZnQg
// SIG // Q29kZSBTaWduaW5nIFBDQQITMwAAALARrwqL0Duf3QAB
// SIG // AAAAsDAJBgUrDgMCGgUAoIGgMBkGCSqGSIb3DQEJAzEM
// SIG // BgorBgEEAYI3AgEEMBwGCisGAQQBgjcCAQsxDjAMBgor
// SIG // BgEEAYI3AgEVMCMGCSqGSIb3DQEJBDEWBBSqGlRoIVp7
// SIG // +rMZAfOmmqBcQ7SRyzBABgorBgEEAYI3AgEMMTIwMKAW
// SIG // gBQAZABlAGYAYQB1AGwAdAAuAGoAc6EWgBRodHRwOi8v
// SIG // bWljcm9zb2Z0LmNvbTANBgkqhkiG9w0BAQEFAASCAQBS
// SIG // Zey6OnetB4pwCfSn82VTnhiW4dUna/PSSfqWgnNAPw1V
// SIG // 6L1GKbOWwUFfuvkBWjC0BUC2ywg570RwKKSgeHfzz8Rh
// SIG // 0YIBCoATATWPg6fdsSViE5OV6njLyIKjQjnx6GBHiF70
// SIG // vJ/E9slDSoqhrHi8pXTHVmFj5focJdb8L5yf7Q46zU0R
// SIG // V5IN5yVPK6SNCJ35pRQaralst4rinBMaF+RDQeBfFzcG
// SIG // 17qbDPF486Uc7kxisvET9HbQ99bGT/6ajEhmYhHoZXc+
// SIG // Sl0trT90+Ygk8kno0D+mzZPqJcTlLes6EFfkrIVP+0pL
// SIG // Jb2I/VzzwOjjsCE7wAbjtzG+Rkzh90gdoYICKDCCAiQG
// SIG // CSqGSIb3DQEJBjGCAhUwggIRAgEBMIGOMHcxCzAJBgNV
// SIG // BAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYD
// SIG // VQQHEwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQg
// SIG // Q29ycG9yYXRpb24xITAfBgNVBAMTGE1pY3Jvc29mdCBU
// SIG // aW1lLVN0YW1wIFBDQQITMwAAADPlJ4ajDkoqgAAAAAAA
// SIG // MzAJBgUrDgMCGgUAoF0wGAYJKoZIhvcNAQkDMQsGCSqG
// SIG // SIb3DQEHATAcBgkqhkiG9w0BCQUxDxcNMTMxMDA1MDk1
// SIG // NjA0WjAjBgkqhkiG9w0BCQQxFgQUMdkVXiFsRSBiHajw
// SIG // yCvC+rfvblAwDQYJKoZIhvcNAQEFBQAEggEAjEzJKHlf
// SIG // 3nS+eqfHnva5gAOsgj7JCg7wU+OXrvWQzW0wAv7jslVW
// SIG // mbRLyWU4FY0OlPq7vn+RJ8aCON2cGqCKUat4SkjIu3FX
// SIG // RkWYXlNnBd1GeIeAE0+DYVJTxjY26qBWwGDz1AKK39ZS
// SIG // Gf9u1HkKFim3Btf9RIhMhKYtyXbpCqgBgGXuB5InjMM5
// SIG // e1pmz8TPTNfGv8YMxMYKwnDH5ZuinKirLL64hfTAoese
// SIG // 8nocsm9m9MZNXU+5nZ2kygx1kt1AdEZ5h4Lz4KUg4Oa/
// SIG // iPgNKvI/tVXct/yBHjycWzoiJ24JALjTmC8Rnte4tR6v
// SIG // mo3xmpQLiCYhpgiMxYqlytLEvg==
// SIG // End signature block
