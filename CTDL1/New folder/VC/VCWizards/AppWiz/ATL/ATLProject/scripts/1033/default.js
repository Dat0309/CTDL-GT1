// Copyright (c) Microsoft Corporation. All rights reserved.

// Called by PREPROCESS_FUNCTION in VC7\VCProjects\ATLWiz.vsz
function CheckATLProjectName(selProj, selObj)
{
	var strProjectName = wizard.FindSymbol("PROJECT_NAME");
	if (strProjectName.toLowerCase() == "compreg")
	{
		var L_NameNotAllowed_Text = "This project name is not allowed. Please chose another one."
		wizard.ReportError(L_NameNotAllowed_Text);
		return false;
	}
	return true;
}

function OnFinish(selProj, selObj)
{
	try
	{
		var strTemplatePath	= wizard.FindSymbol("TEMPLATES_PATH");
		var strProjectPath	= wizard.FindSymbol("PROJECT_PATH");
		var strProjectName	= wizard.FindSymbol("PROJECT_NAME");

		wizard.AddSymbol("RC_FILE_NAME",CreateSafeRCFileName(strProjectName)+".rc");
		wizard.AddSymbol("SAFE_PROJECT_APPID_NAME", wizard.FindSymbol("SAFE_PROJECT_IDENTIFIER_NAME"));
		wizard.AddSymbol("SAFE_IDL_NAME", CreateASCIIName(wizard.FindSymbol("PROJECT_NAME")));
		selProj = CreateProject(strProjectName, strProjectPath);

		AddConfigurations(selProj, strProjectName);

		SetupFilters(selProj);
		selProj.Object.keyword = "AtlProj";

		AddFilesToProjectWithInfFile(selProj, strProjectName);

		var L_strGenerated_Text = "Generated Files";
		var strIdlName = wizard.FindSymbol("SAFE_IDL_NAME");

		var strMIDLHeader = strProjectPath + "\\" + strIdlName + "_i.h";
		wizard.RenderTemplate(strTemplatePath + "\\root_i.h", strMIDLHeader, true);

		var strMIDL_IFile = strProjectPath + "\\" + strIdlName + "_i.c";
		wizard.RenderTemplate(strTemplatePath + "\\root_i.c", strMIDL_IFile, true);

		var oGeneratedFiles = selProj.Object.AddFilter(L_strGenerated_Text);
		if (oGeneratedFiles)
		{
			oGeneratedFiles.SourceControlFiles = false;
			oGeneratedFiles.AddFile(strMIDLHeader);
			oGeneratedFiles.AddFile(strMIDL_IFile);
		}
		else
		{
			selProj.Object.AddFile(strMIDLHeader);
			selProj.Object.AddFile(strMIDL_IFile);
		}

		if (!wizard.FindSymbol("GENERATE_ATL_DOCUMENT"))
		{
			// Add existing items (links) from MFC project handlers are being added for.
			// Add the document h/cpp, view h.cpp, and cntritem h/cpp (if exist).
			oFSO = new ActiveXObject("Scripting.FileSystemObject");

			var strMFCDocHeader = wizard.FindSymbol("DOCUMENT_HEADER_FILENAME_TRIMMED");
			if (strMFCDocHeader != "")
			{
				var strFile;

				strFile = oFSO.GetAbsolutePathName(strProjectPath + "\\" + strMFCDocHeader);
				if (oFSO.FileExists(strFile) && selProj.Object.CanAddFile(strMFCDocHeader))
				{
					selProj.Object.AddFile(strMFCDocHeader);
				}

				var strMFCDocImpl = strMFCDocHeader.substring(0, strMFCDocHeader.length - 1) + "cpp";
				strFile = oFSO.GetAbsolutePathName(strProjectPath + "\\" + strMFCDocImpl);
				if (oFSO.FileExists(strFile) && selProj.Object.CanAddFile(strMFCDocImpl))
				{
					selProj.Object.AddFile(strMFCDocImpl);
				}

				var strMFCViewHeader = wizard.FindSymbol("VIEW_HEADER_FILENAME_TRIMMED");
				if (strMFCViewHeader != "")
				{
					strFile = oFSO.GetAbsolutePathName(strProjectPath + "\\" + strMFCViewHeader);
					if (oFSO.FileExists(strFile) && selProj.Object.CanAddFile(strMFCViewHeader))
					{
						selProj.Object.AddFile(strMFCViewHeader);
					}

					var strMFCViewImpl = strMFCViewHeader.substring(0, strMFCViewHeader.length - 1) + "cpp";
					strFile = oFSO.GetAbsolutePathName(strProjectPath + "\\" + strMFCViewImpl);
					if (oFSO.FileExists(strFile) && selProj.Object.CanAddFile(strMFCViewImpl))
					{
						selProj.Object.AddFile(strMFCViewImpl);
					}
				}

				var nLength = strMFCDocHeader.length;
				var nEndIndex = nLength - 1;
				while (nEndIndex > 0 && (strMFCDocHeader.charAt(nEndIndex) != '\\'))
				{
					nEndIndex--;
				}

				var strMFCCntrHeader = strMFCDocHeader.substring(0, nEndIndex + 1) + "CntrItem.h";
				strFile = oFSO.GetAbsolutePathName(strProjectPath + "\\" + strMFCCntrHeader);
				if (oFSO.FileExists(strFile) && selProj.Object.CanAddFile(strMFCCntrHeader))
				{
					selProj.Object.AddFile(strMFCCntrHeader);

					var strMFCCntrImpl = strMFCDocHeader.substring(0, nEndIndex + 1) + "CntrItem.cpp";
					strFile = oFSO.GetAbsolutePathName(strProjectPath + "\\" + strMFCCntrImpl);
					if (oFSO.FileExists(strFile) && selProj.Object.CanAddFile(strMFCCntrImpl))
					{
						selProj.Object.AddFile(strMFCCntrImpl);
					}
				}
			}
		}

		// Set special flags on the MIDL-generated .c file
		var projfile = selProj.Object.Files(strIdlName + "_i.c");
		if (projfile != null) {
			projfile = projfile.Object;
			SetFileProperties(projfile, strIdlName + "_i.c");
		}

		SetPchSettings(selProj, strProjectName);

		var Sdl = wizard.FindSymbol("SDL_CHECK");

		if (Sdl) 
		{
			EnableSDLCheckSettings(selProj);
		}

		selProj.Object.Save();

		var bMergeProxy = wizard.FindSymbol("MERGE_PROXY_STUB");
		if (!bMergeProxy)
		{
			var strDefFile = strProjectPath + "\\" + strProjectName + "ps.def";
			var str_PFile;
			var str_IFile;

			str_PFile = strProjectPath + "\\" + strIdlName + "_p.c";
			str_IFile = strProjectPath + "\\" + strIdlName + "_i.c";

			strProjectName += "PS";
			wizard.AddSymbol("CLOSE_SOLUTION", false);
			var oPSProj = CreateProject(strProjectName, strProjectPath);

			SetPSConfigurations(oPSProj, selProj);

			var strSrcFilter = wizard.FindSymbol("SOURCE_FILTER");
			var L_Source_Text = "Source Files";
			var group = oPSProj.Object.AddFilter(L_Source_Text);
			group.Filter = strSrcFilter;

			oPSProj.Object.keyword = "AtlPSProj";

			wizard.RenderTemplate(strTemplatePath + "\\rootps.def", strDefFile);
			oPSProj.Object.AddFile(strDefFile);
			var oGeneratedFiles = oPSProj.Object.AddFilter(L_strGenerated_Text);
			if (oGeneratedFiles)
			{
				oGeneratedFiles.SourceControlFiles = false;
				oGeneratedFiles.AddFile(str_IFile);
				oGeneratedFiles.AddFile(str_PFile);
				oGeneratedFiles.AddFile(strProjectPath + "\\dlldata.c");
			}
			else
			{
				oPSProj.Object.AddFile(str_IFile);
				oPSProj.Object.AddFile(str_PFile);
				oPSProj.Object.AddFile(strProjectPath + "\\dlldata.c");
			}
			// Set special flags on the MIDL-generated .c file
			var projfile = selProj.Object.Files(strIdlName + "_p.c");
			if (projfile != null) {
				projfile = projfile.Object;
				SetFileProperties(projfile, strIdlName + "_p.c");
			}
			projfile = selProj.Object.Files(strIdlName + "_c.c");
			if (projfile != null) {
				projfile = projfile.Object;
				SetFileProperties(projfile, strIdlName + "_c.c");
			}
			projfile = selProj.Object.Files("dlldata.c");
			if (projfile != null) {
				projfile = projfile.Object;
				SetFileProperties(projfile, "dlldata.c");
			}

			oPSProj.Object.Save();
		}

		// expand main project node, highlight it
		//
		strProjectName	= wizard.FindSymbol("PROJECT_NAME");
		var oHier = wizard.dte.Windows.Item(vsWindowKindSolutionExplorer).Object;
		var oHISolution = oHier.UIHierarchyItems(1);
		var oHIProjMain;
		for (nHI=1; nHI<=oHISolution.UIHierarchyItems.Count; nHI++)
		{
			if ( oHISolution.UIHierarchyItems(nHI).name == strProjectName )
			{
				oHIProjMain = oHISolution.UIHierarchyItems(nHI);
				break;
			}
		}
		if (oHIProjMain)
		{
			oHIProjMain.UIHierarchyItems.Expanded = true;
			oHIProjMain.Select(vsUISelectionTypeSelect);
		}
	}
	catch(e)
	{
		if (e.description.length != 0)
			SetErrorInfo(e);
		return e.number
	}
}

function SetFileProperties(projfile, strName)
{
	if (strName == "dllmain.cpp" || strName.substr(strName.length-2,strName.length) == ".c") {
		var Configs = projfile.Object.FileConfigurations;
		for(var i=1;i<=Configs.Count;++i) {
			var Config = Configs(i);
			var CLTool = Config.Tool;
			CLTool.CompileAsManaged = 0; // Force no /CLR
			CLTool.UsePrecompiledHeader  = 0; // No pre-compiled headers
		}
	}
}

function GetTargetName(strName, strProjectName, strResPath, strHelpPath)
{
	try
	{
		var strTarget = strName;

		if (strName.substr(0, 4) == "root")
		{
			if (strName == "root.idl")
			{
				var strProjectName = wizard.FindSymbol("SAFE_IDL_NAME");
				strTarget = strProjectName + ".idl";
			}
			else if (strName == "root.rc")
			{
				strTarget = wizard.FindSymbol("RC_FILE_NAME");
			}
			else
			{
				strTarget = strProjectName + strName.substr(4);
			}

			return strTarget;
		}

		switch (strName)
		{
			case "readme.txt":
				strTarget = "ReadMe.txt";
				break;
			case "resource.h":
				strTarget = "Resource.h";
				break;
			case "document.cpp":
				strTarget = wizard.FindSymbol("DOCUMENT_IMPL_FILENAME_TRIMMED");
				break;
			case "document.h":
				strTarget = wizard.FindSymbol("DOCUMENT_HEADER_FILENAME_TRIMMED");
				break;
			case "Preview.h":
				strTarget = "PreviewHandler.h";
				break;
			case "Preview.rgs":
				strTarget = "PreviewHandler.rgs";
				break;
			case "Thumbnail.h":
				strTarget = "ThumbnailHandler.h";
				break;
			case "Thumbnail.rgs":
				strTarget = "ThumbnailHandler.rgs";
				break;
			case "Search.h":
				strTarget = "FilterHandler.h";
				break;
			case "Search.rgs":
				strTarget = "FilterHandler.rgs";
				break;
			default:
				break;
		}

		return strTarget;
	}
	catch(e)
	{
		throw e;
	}
}

function SetPSConfigurations(oProj, oMainProj)
{
	try
	{
		oConfigs = oProj.Object.Configurations;
		bSupportComPlus = wizard.FindSymbol("SUPPORT_COMPLUS");

		for (var nCntr = 1; nCntr <= oConfigs.Count; nCntr++)
		{
			var oConfig = oConfigs(nCntr);
			var bDebug = false;
			if (-1 != oConfig.Name.indexOf("Debug"))
				bDebug = true;

			oConfig.IntermediateDirectory = "$(Configuration)PS\\";
			oConfig.ConfigurationType = typeDynamicLibrary;
			oConfig.CharacterSet = charSetUNICODE;
			var oCLTool = oConfig.Tools("VCCLCompilerTool");

			var strDefines = oCLTool.PreprocessorDefinitions;
			if (strDefines != "") strDefines += ";";
			strDefines += GetPlatformDefine(oConfig);
			strDefines += "REGISTER_PROXY_DLL";
			if (bDebug)
			{
				strDefines += ";_DEBUG";
			}
			else
			{
				strDefines += ";NDEBUG";
				oCLTool.Optimization = optimizeMaxSpeed;
			}
			oCLTool.PreprocessorDefinitions = strDefines;

			var oLinkTool = oConfig.Tools("VCLinkerTool");
			oLinkTool.AdditionalDependencies = "kernel32.lib rpcns4.lib rpcrt4.lib oleaut32.lib uuid.lib";

			if (bSupportComPlus)
				oLinkTool.AdditionalDependencies += " ole32.lib advapi32.lib comsvcs.lib";

			oLinkTool.ModuleDefinitionFile = oProj.Name + ".def";

			if (!bDebug)
			{
				oLinkTool.EnableCOMDATFolding = optFolding;
				oLinkTool.OptimizeReferences = optReferences;
			}

			oLinkTool.RegisterOutput = true;

			var oPreBuildTool = oConfig.Tools("VCPreBuildEventTool");
			var strCommand = "if exist dlldata.c goto :END\r\n";
			var L_Echo1_Text = "echo Error: MIDL will not generate DLLDATA.C unless you have at least 1 interface in the main project.\r\n";
			strCommand += L_Echo1_Text;
			strCommand += "Exit 1\r\n";
			strCommand += ":END\r\n";
			oPreBuildTool.CommandLine = strCommand;
			var L_Echo2_Text = "Checking for required files";
			oPreBuildTool.Description = L_Echo2_Text;
		}

		// exclude from Solution build
		var oSolBuild = dte.Solution.SolutionBuild;
		var oSolConfigs = oSolBuild.SolutionConfigurations;
		for (var nCntr = 1; nCntr <= oSolConfigs.Count; nCntr++)
		{
			var oSolContexts = oSolConfigs(nCntr).SolutionContexts;
			for (var nCntr2 = 1; nCntr2 <= oSolContexts.Count; nCntr2++)
			{
				var oSolContext = oSolContexts(nCntr2);
				if (oSolContext.ProjectName == oProj.UniqueName)
					oSolContext.ShouldBuild = false;
			}
		}

		// add main project to build dependency list
	    oSolBuild.BuildDependencies(oProj.UniqueName).AddProject(oMainProj.UniqueName);
	}
	catch(e)
	{
		throw e;
	}
}

var nNumConfigs = 2;

var astrConfigName = new Array();
astrConfigName[0] = "Debug";
astrConfigName[1] = "Release";

var astrConfigDir = new Array();
astrConfigDir[0] = "Debug";
astrConfigDir[1] = "Release";

var astrDefines = new Array();
astrDefines[0] = "_WINDOWS;_DEBUG";
astrDefines[1] = "_WINDOWS;NDEBUG";

var anCRT = new Array();
anCRT[0] = rtMultiThreadedDebugDLL;
anCRT[1] = rtMultiThreadedDLL;

function AddConfigurations(proj, strProjectName)
{
	try
	{
		var nCntr;
		for (nCntr = 0; nCntr < nNumConfigs; nCntr++)
		{
			var strIdlName = wizard.FindSymbol("SAFE_IDL_NAME");
			// check if Debug
			var bDebug = false;
			if (-1 != astrConfigName[nCntr].search("Debug"))
				bDebug = true;

			var config = proj.Object.Configurations(astrConfigName[nCntr]);

			// add configuration if it doesn't exist
			if (!config)
			{
				proj.Object.AddConfiguration(astrConfigName[nCntr]);
				config = proj.Object.Configurations(astrConfigName[nCntr]);
			}

			// set configuration type
			var bAppTypeDLL = wizard.FindSymbol("DLL_APP");
			if (bAppTypeDLL)
				config.ConfigurationType = typeDynamicLibrary;

			config.CharacterSet = charSetUNICODE;

			// Compiler settings
			var CLTool = config.Tools("VCCLCompilerTool");
			CLTool.UsePrecompiledHeader = pchUseUsingSpecific;
			CLTool.WarningLevel = WarningLevel_3;
			if (bDebug)
			{
				CLTool.Optimization = optimizeDisabled;
			}
			else
			{
				CLTool.Optimization = optimizeMaxSpeed;
			}

			var bMFC = wizard.FindSymbol("SUPPORT_MFC");
			var bMergeProxy = wizard.FindSymbol("MERGE_PROXY_STUB");
			var bSupportComPlus	= wizard.FindSymbol("SUPPORT_COMPLUS");
			var bSupportComponentRegistrar = wizard.FindSymbol("SUPPORT_COMPONENT_REGISTRAR");

			var strDefines = CLTool.PreprocessorDefinitions;
			if (strDefines != "") strDefines += ";";
			strDefines += GetPlatformDefine(config);
			strDefines += astrDefines[nCntr];
			if (bAppTypeDLL)
				strDefines += ";_USRDLL";
			if (bMFC)
				config.UseOfMFC = useMfcDynamic;
			if (bMergeProxy && bSupportComponentRegistrar)
				strDefines += ";_MERGE_PROXYSTUB";
			CLTool.PreprocessorDefinitions = strDefines;

			// MIDL settings
			var MidlTool = config.Tools("VCMidlTool");
			MidlTool.MkTypLibCompatible = false;
			if (IsPlatformWin32(config))
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

			if (bAppTypeDLL)
			{
				var strDefFile = ".\\" + strProjectName + ".def";
				LinkTool.ModuleDefinitionFile = strDefFile;
			}
			if (bSupportComPlus)
				LinkTool.AdditionalDependencies += " comsvcs.lib";

			LinkTool.GenerateDebugInformation = true;
			if (bDebug)
				LinkTool.LinkIncremental = linkIncrementalYes;
			else
			{
				LinkTool.LinkIncremental = linkIncrementalNo;
				LinkTool.EnableCOMDATFolding = optFolding;
				LinkTool.OptimizeReferences = optReferences;
			}


			LinkTool.RegisterOutput = true;

			if (bAppTypeDLL)
			{
				if (wizard.FindSymbol("SEARCH_HANDLER"))
				{
					var PostBuildTool = config.Tools("VCPostBuildEventTool");
					var L_SettingPermissions_Text = "Setting permissions on handler DLL (to enable load by SearchFilterHost.exe)...";
					
					var strGroupName = "";
					// Get the localized name of the group "Users" using WMI
					var oWMIService = GetObject("winmgmts:{impersonationLevel=impersonate}");
					var oResultSet = oWMIService.ExecQuery("Select * from Win32_Group Where LocalAccount = TRUE And SID = 'S-1-5-32-545'");
					var resultEnumerator = new Enumerator(oResultSet);
					if (!resultEnumerator.atEnd())
					{
						var oGroup = resultEnumerator.item();
						strGroupName = oGroup.Name;
						PostBuildTool.CommandLine = "cacls.exe \"$(TargetPath)\" /G " + strGroupName + ":r /E";
					}
					else
					{
						var L_SettingPermissionsFailure_Text = "Unable to set permissions on handler DLL (to enable load by SearchFilterHost.exe).";
						wizard.ReportError(L_SettingPermissionsFailure_Text);
					}
				}
			}
		}
	}
	catch(e)
	{
		throw e;
	}
}

function SetPchSettings(proj, strProjectName)
{
	try
	{
		var files = proj.Object.Files;
		var fStdafx = files("StdAfx.cpp");

		var nCntr;
		for (nCntr = 0; nCntr < nNumConfigs; nCntr++)
		{
			var config = fStdafx.FileConfigurations(astrConfigName[nCntr]);
			config.Tool.UsePrecompiledHeader = pchCreateUsingSpecific;

			var strIdlName = wizard.FindSymbol("SAFE_IDL_NAME");
			var fProject_i = files(strIdlName + "_i.c");
			config = fProject_i.FileConfigurations(astrConfigName[nCntr]);
			config.Tool.UsePrecompiledHeader = pchNone;

			if (wizard.FindSymbol("MERGE_PROXY_STUB"))
			{
				file = files("xdlldata.c");
				config = file.FileConfigurations(astrConfigName[nCntr]);
				config.Tool.UsePrecompiledHeader = pchNone;
			}
		}
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
// SIG // AAIBAAIBAAIBADAhMAkGBSsOAwIaBQAEFHLpQgyd0I0o
// SIG // iYLj+yj75g6qiYzloIIVgjCCBMMwggOroAMCAQICEzMA
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
// SIG // BgEEAYI3AgEVMCMGCSqGSIb3DQEJBDEWBBRVov85gwzl
// SIG // +GdE9lyw7xHbAyNgnjBABgorBgEEAYI3AgEMMTIwMKAW
// SIG // gBQAZABlAGYAYQB1AGwAdAAuAGoAc6EWgBRodHRwOi8v
// SIG // bWljcm9zb2Z0LmNvbTANBgkqhkiG9w0BAQEFAASCAQDB
// SIG // ixL60UBos0z/w7pD7ridER0iQr4T01sCwJGbP7R2nNUO
// SIG // E1ocB9u+t3anNWcKzhoByyHfL4ELIQ+BpulNMWrhW7PN
// SIG // A4cGekQaOTKtwUp60vZueyCnFEJkjDGkCNoNI8uSvVYM
// SIG // ibSTjmoNfrfc4hs8wzN5caolaLiCzsfIuBf3NKjK7syx
// SIG // fLLzwWgHX7VoY8UeeXUxaolfw28DdlbDA7PeRY1uDKmP
// SIG // be4ZL4/1bE2U+xWfZjkEVCn4upl6hMuKxRIMRWsjRxom
// SIG // pqGaiBMRVw+zlipTqxL8KGjB+XAVQ9wyVcWKrvupndVs
// SIG // bvrFMH6CrQsoE6OkAUzNaFaAhwTnnRZeoYICKDCCAiQG
// SIG // CSqGSIb3DQEJBjGCAhUwggIRAgEBMIGOMHcxCzAJBgNV
// SIG // BAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYD
// SIG // VQQHEwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQg
// SIG // Q29ycG9yYXRpb24xITAfBgNVBAMTGE1pY3Jvc29mdCBU
// SIG // aW1lLVN0YW1wIFBDQQITMwAAADPlJ4ajDkoqgAAAAAAA
// SIG // MzAJBgUrDgMCGgUAoF0wGAYJKoZIhvcNAQkDMQsGCSqG
// SIG // SIb3DQEHATAcBgkqhkiG9w0BCQUxDxcNMTMxMDA1MDkw
// SIG // NTA3WjAjBgkqhkiG9w0BCQQxFgQUbc4BrUJOHKkLWm8T
// SIG // 4W9v6TIb80owDQYJKoZIhvcNAQEFBQAEggEAZQJvdqC2
// SIG // FVCeIDbbizazqpIsgc9ou0ZLZr8AweN/Hz1uQsFQrIGp
// SIG // exg13MDN+iOFMgtxAwGYx4Auv9J7vFL2XxERoCS/9L1D
// SIG // x0b80i7BBNtPxJgMGXLrpyWlRu4UdzOG/R0Fb8agEWyH
// SIG // gJB/Xyn6q1ciKzLd1liVLRQ2le/ajjrE1smc+naNFLwl
// SIG // ri9zTlR6sQ0LV0A1RJ7XESD+L1lgZjz70yKJNjmL9tMO
// SIG // ztMgtC6BUC/z1YOGrYD6XFnSUAR8U432qzaRnfyWhjDK
// SIG // YOCJPPi+PES0ylCtzb1i4LB0csggsXz5LtAg3ZMnFndN
// SIG // OhF5fsm5k/kmoMX9OIXTqV8eBg==
// SIG // End signature block
