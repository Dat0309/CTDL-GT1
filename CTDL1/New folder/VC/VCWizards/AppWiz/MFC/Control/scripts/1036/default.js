// Copyright (c) Microsoft Corporation. All rights reserved.

function OnFinish(selProj, selObj)
{
	try
	{
		var strProjectPath = wizard.FindSymbol("PROJECT_PATH");
		var strProjectName = wizard.FindSymbol("PROJECT_NAME");
		wizard.AddSymbol("SAFE_IDL_NAME", CreateASCIIName(wizard.FindSymbol("PROJECT_NAME")));
		wizard.AddSymbol("RC_FILE_NAME",CreateSafeRCFileName(wizard.FindSymbol("PROJECT_NAME")) + ".rc");

		selProj = CreateProject(strProjectName, strProjectPath);

		AddCommonConfig(selProj, strProjectName);
		AddSpecificConfig(selProj, strProjectName);
		selProj.Object.keyword = "MFCActiveXProj";

		SetupFilters(selProj);

		SetResDlgFont();

		AddFilesToProjectWithInfFile(selProj, strProjectName);
		SetCommonPchSettings(selProj);

		var Sdl = wizard.FindSymbol("SDL_CHECK");

		if (Sdl) 
		{
			EnableSDLCheckSettings(selProj);
		}

		selProj.Object.Save();
		
		AddHelpBuildSteps(selProj.Object, strProjectName);
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
	return false;
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
				strTarget = wizard.FindSymbol("RC_FILE_NAME");
			else
				strTarget = strProjectName + strName.substr(4);
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
			case "ctl.h":
				strTarget = wizard.FindSymbol("CONTROL_HEADER");
				break;
			case "ctl.cpp":
				strTarget = wizard.FindSymbol("CONTROL_IMPL");
				break;
			case "ppg.h":
				strTarget = wizard.FindSymbol("PROPERTY_PAGE_HEADER");
				break;
			case "ppg.cpp":
				strTarget = wizard.FindSymbol("PROPERTY_PAGE_IMPL");
				break;
			case "ctl.bmp":
				var strControlName = wizard.FindSymbol("SHORT_NAME");
				strTarget =  strControlName + "Ctrl.bmp";
				break;
			case "ctlcore.rtf":
				strTarget = strHelpPath + "\\" + strProjectName + ".rtf";
				break;
			case "bullet.bmp":
				strTarget = strHelpPath + "\\" + "Bullet.bmp";
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

function AddSpecificConfig(proj, strProjectName)
{
	try
	{
	var oConfigs = proj.Object.Configurations;
	for (var nCntr = 1; nCntr <= oConfigs.Count; nCntr++)
	{
		var config = oConfigs(nCntr);
		var bDebug = false;
		if (-1 != config.Name.indexOf("Debug"))
			bDebug = true;
	
		config.ConfigurationType = typeDynamicLibrary;
		config.UseOfMFC = useMfcDynamic;
		config.CharacterSet = charSetUNICODE;

		var CLTool = config.Tools("VCCLCompilerTool");
		var strDefines = CLTool.PreprocessorDefinitions;
		if (strDefines != "") strDefines += ";";
		strDefines += GetPlatformDefine(config);
		if(bDebug)
		{
			strDefines += "_WINDOWS;_DEBUG;_USRDLL";
		}			
		else
		{
			strDefines += "_WINDOWS;NDEBUG;_USRDLL";	
		}
		CLTool.PreprocessorDefinitions= strDefines;
		
		var MidlTool = config.Tools("VCMidlTool");
		var strIdlName = wizard.FindSymbol("SAFE_IDL_NAME");
		MidlTool.MkTypLibCompatible = false;
			
		// no /no_robust
		MidlTool.ValidateParameters = true;
		MidlTool.PreprocessorDefinitions = (bDebug ? "_DEBUG" : "NDEBUG");
		MidlTool.TypeLibraryName = "$(IntDir)" + strIdlName + ".tlb";
		MidlTool.HeaderFileName = "$(ProjectName)idl.h";

		var RCTool = config.Tools("VCResourceCompilerTool");
		RCTool.Culture = wizard.FindSymbol("LCID");
		RCTool.PreprocessorDefinitions = (bDebug ? "_DEBUG" : "NDEBUG");
		RCTool.AdditionalIncludeDirectories = "$(IntDir)";
		
		var LinkTool = config.Tools("VCLinkerTool");
		LinkTool.LinkIncremental = (bDebug ? linkIncrementalYes : linkIncrementalNo);
		
		LinkTool.GenerateDebugInformation = true;
		var strDefFile = ".\\" + strProjectName + ".def";
		LinkTool.ModuleDefinitionFile = strDefFile;
		LinkTool.OutputFile = "$(OutDir)$(ProjectName).ocx";
		var GeneralRule = config.Rules.Item("ConfigurationGeneral");
		GeneralRule.SetPropertyValue("TargetExt", ".ocx");

		LinkTool.RegisterOutput = true;

		if (wizard.FindSymbol("RUNTIME_LICENSE"))
		{
			var PostBuildTool = config.Tools("VCPostBuildEventTool");
			var L_CopyingRuntimeLicense1_Text = "Copie de la licence utilisateur";
			PostBuildTool.Description = L_CopyingRuntimeLicense1_Text;
			PostBuildTool.CommandLine = 'copy "' + strProjectName + '.lic" "$(OutDir)"';
		}
	} //for
	} //try
	catch(e)
	{
		throw e;
	}
}

function AddHelpBuildSteps(projObj, strProjectName)
{
	try
	{
		var bHelpFiles = wizard.FindSymbol("HELP_FILES");
		
		if (!bHelpFiles)
			return;
			
		var fileExt;
		var fileTool1 = "";
		var fileTool2 = "";
		var outFileExt;
		
		fileExt = ".hpj";
		fileTool = "makehelp.bat";

		fileTool1 = "start /wait hcw /C /E /M \"$(ProjectName).hpj\"";

		var strCodeTool = new Array();
		strCodeTool[0] = "echo // ";
		var L_CodeFragment1_Text = "Fichier de mappage d'aide généré. Utilisé par $(ProjectName).HPJ.";
		strCodeTool[0] += L_CodeFragment1_Text + " > \"hlp\\$(ProjectName).hm\"";
		strCodeTool[1] = "echo. >> \"hlp\\$(ProjectName).hm\"";
		strCodeTool[2] = "echo // ";
		var L_CodeFragment2_Text = "Commandes (ID_* et IDM_*)";
		strCodeTool[2] += L_CodeFragment2_Text + " >> \"hlp\\$(ProjectName).hm\"";
		strCodeTool[3] = "makehm ID_,HID_,0x10000 IDM_,HIDM_,0x10000 \"%(FullPath)\" >> \"hlp\\$(ProjectName).hm\"";
		strCodeTool[4] = "echo. >> \"hlp\\$(ProjectName).hm\"";
		strCodeTool[5] = "echo // ";
		var L_CodeFragment3_Text = "Demandes (IDP_*)";
		strCodeTool[5] += L_CodeFragment3_Text + " >> \"hlp\\$(ProjectName).hm\"";
		strCodeTool[6] = "makehm IDP_,HIDP_,0x30000 \"%(FullPath)\" >> \"hlp\\$(ProjectName).hm\"";
		strCodeTool[7] = "echo. >> \"hlp\\$(ProjectName).hm\"";
		strCodeTool[8] = "echo // ";
		var L_CodeFragment4_Text = "Ressources (IDR_*)";
		strCodeTool[8] += L_CodeFragment4_Text + " >> \"hlp\\$(ProjectName).hm\"";
		strCodeTool[9] = "makehm IDR_,HIDR_,0x20000 \"%(FullPath)\" >> \"hlp\\$(ProjectName).hm\"";
		strCodeTool[10] = "echo. >> \"hlp\\$(ProjectName).hm\"";
		strCodeTool[11] = "echo // ";
		var L_CodeFragment5_Text = "Boîtes de dialogue (IDD_*)";
		strCodeTool[11] += L_CodeFragment5_Text + " >> \"hlp\\$(ProjectName).hm\"";
		strCodeTool[12] = "makehm IDD_,HIDD_,0x20000 \"%(FullPath)\" >> \"hlp\\$(ProjectName).hm\"";
		strCodeTool[13] = "echo. >> \"hlp\\$(ProjectName).hm\"";
		strCodeTool[14] = "echo // ";
		var L_CodeFragment6_Text = "Contrôles Frame (IDW_*)";
		strCodeTool[14] += L_CodeFragment6_Text + " >> \"hlp\\$(ProjectName).hm\"";
		strCodeTool[15] = "makehm IDW_,HIDW_,0x50000 \"%(FullPath)\" >> \"hlp\\$(ProjectName).hm\"";
		for (var idx=0; idx<16; idx++)
			fileTool2 += strCodeTool[idx] + "\r\n";

		outFileExt = ".hlp";
		
		var fileObj1 = projObj.Files(strProjectName + fileExt);
		var fileObj2 = projObj.Files("resource.h");
		if (fileObj1 != null)
		{
			for (var i=1; i<=fileObj1.FileConfigurations.Count; i++)
			{
				var config = fileObj1.FileConfigurations.Item(i);
				if (config != null)
				{
					var CustomBuildTool = config.Tool;
					CustomBuildTool.AdditionalDependencies = ".\\hlp\\$(ProjectName).hm";
					CustomBuildTool.Outputs = ".\\$(ProjectName)" + outFileExt;
					CustomBuildTool.CommandLine = fileTool1;
					L_ToolDesc1_Text = "Création du fichier d'aide...";
					CustomBuildTool.Description = L_ToolDesc1_Text;
				}
			}
		}
		if (fileObj2 != null)
		{
			for (var i=1; i<=fileObj2.FileConfigurations.Count; i++)
			{
				var config = fileObj2.FileConfigurations.Item(i);
				if (config != null)
				{
					var CustomBuildTool = config.Tool;
					CustomBuildTool.Outputs = ".\\hlp\\$(ProjectName).hm";
					CustomBuildTool.CommandLine = fileTool2;
					L_ToolDesc2_Text = "Génération d'un fichier de mappage pour le compilateur d'aide...";
					CustomBuildTool.Description = L_ToolDesc2_Text;
				}
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
// SIG // AAIBAAIBAAIBADAhMAkGBSsOAwIaBQAEFGKSJjN/oMNe
// SIG // ruL4jmdzGDHlG6AAoIIVgjCCBMMwggOroAMCAQICEzMA
// SIG // AAArOTJIwbLJSPMAAAAAACswDQYJKoZIhvcNAQEFBQAw
// SIG // dzELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0
// SIG // b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1p
// SIG // Y3Jvc29mdCBDb3Jwb3JhdGlvbjEhMB8GA1UEAxMYTWlj
// SIG // cm9zb2Z0IFRpbWUtU3RhbXAgUENBMB4XDTEyMDkwNDIx
// SIG // MTIzNFoXDTEzMTIwNDIxMTIzNFowgbMxCzAJBgNVBAYT
// SIG // AlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQH
// SIG // EwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29y
// SIG // cG9yYXRpb24xDTALBgNVBAsTBE1PUFIxJzAlBgNVBAsT
// SIG // Hm5DaXBoZXIgRFNFIEVTTjpDMEY0LTMwODYtREVGODEl
// SIG // MCMGA1UEAxMcTWljcm9zb2Z0IFRpbWUtU3RhbXAgU2Vy
// SIG // dmljZTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoC
// SIG // ggEBAKa2MA4DZa5QWoZrhZ9IoR7JwO5eSQeF4HCWfL65
// SIG // X2JfBibTizm7GCKlLpKt2EuIOhqvm4OuyF45jMIyexZ4
// SIG // 7Tc4OvFi+2iCAmjs67tAirH+oSw2YmBwOWBiDvvGGDhv
// SIG // sJLWQA2Apg14izZrhoomFxj/sOtNurspE+ZcSI5wRjYm
// SIG // /jQ1qzTh99rYXOqZfTG3TR9X63zWlQ1mDB4OMhc+LNWA
// SIG // oc7r95iRAtzBX/04gPg5f11kyjdcO1FbXYVfzh4c+zS+
// SIG // X+UoVXBUnLjsfABVRlsomChWTOHxugkZloFIKjDI9zMg
// SIG // bOdpw7PUw07PMB431JhS1KkjRbKuXEFJT7RiaJMCAwEA
// SIG // AaOCAQkwggEFMB0GA1UdDgQWBBSlGDNTP5VgoUMW747G
// SIG // r9Irup5Y0DAfBgNVHSMEGDAWgBQjNPjZUkZwCu1A+3b7
// SIG // syuwwzWzDzBUBgNVHR8ETTBLMEmgR6BFhkNodHRwOi8v
// SIG // Y3JsLm1pY3Jvc29mdC5jb20vcGtpL2NybC9wcm9kdWN0
// SIG // cy9NaWNyb3NvZnRUaW1lU3RhbXBQQ0EuY3JsMFgGCCsG
// SIG // AQUFBwEBBEwwSjBIBggrBgEFBQcwAoY8aHR0cDovL3d3
// SIG // dy5taWNyb3NvZnQuY29tL3BraS9jZXJ0cy9NaWNyb3Nv
// SIG // ZnRUaW1lU3RhbXBQQ0EuY3J0MBMGA1UdJQQMMAoGCCsG
// SIG // AQUFBwMIMA0GCSqGSIb3DQEBBQUAA4IBAQB+zLB75S++
// SIG // 51a1z3PbqlLRFjnGtM361/4eZbXnSPObRogFZmomhl7+
// SIG // h1jcxmOOOID0CEZ8K3OxDr9BqsvHqpSkN/BkOeHF1fnO
// SIG // B86r5CXwaa7URuL+ZjI815fFMiH67holoF4MQiwRMzqC
// SIG // g/3tHbO+zpGkkSVxuatysJ6v5M8AYolwqbhKUIzuLyJk
// SIG // pajmTWuVLBx57KejMdqQYJCkbv6TAg0/LCQNxmomgVGD
// SIG // ShC7dWNEqmkIxgPr4s8L7VY67O9ypwoM9ADTIrivInKz
// SIG // 58ScCyiggMrj4dc5ZjDnRhcY5/qC+lkLeryoDf4c/wOL
// SIG // Y7JNEgIjTy2zhYQ74qFH6M8VMIIE7DCCA9SgAwIBAgIT
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
// SIG // BgEEAYI3AgEVMCMGCSqGSIb3DQEJBDEWBBRXAVdJ6ER5
// SIG // tlKnWsFuUdF+uBjVSTBABgorBgEEAYI3AgEMMTIwMKAW
// SIG // gBQAZABlAGYAYQB1AGwAdAAuAGoAc6EWgBRodHRwOi8v
// SIG // bWljcm9zb2Z0LmNvbTANBgkqhkiG9w0BAQEFAASCAQCb
// SIG // lYO1DFWNB/zJ+0NfxDAYrrgb62I+puucS2voYTp4e+rp
// SIG // evw9yNd5+sGV8n1D20YOlXMqJpfESFdrHxMn7OWVlqju
// SIG // gUvuVjc1LSht3N+P7/L1lFbBRFbUdwCq+vLmOSVZ+2hu
// SIG // SaSBumbQksAZp76lzLyVb8Z/xUEuUpGMTalo25s+9Gok
// SIG // lq9mkJU+3/ssGek+i86M/aFOnn8l7qmICIHcuJpDbM9v
// SIG // i+s5dNyg81vymsGK4LsF3K49SrtaimgmUvVQucYCZgbT
// SIG // iS5W6CneI4C/DSJY0v18Rg18z0g4iZbs7T1TbLTN7QdP
// SIG // lFW3XR6Slo9GB94uCmkKf3i874utHR0JoYICKDCCAiQG
// SIG // CSqGSIb3DQEJBjGCAhUwggIRAgEBMIGOMHcxCzAJBgNV
// SIG // BAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYD
// SIG // VQQHEwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQg
// SIG // Q29ycG9yYXRpb24xITAfBgNVBAMTGE1pY3Jvc29mdCBU
// SIG // aW1lLVN0YW1wIFBDQQITMwAAACs5MkjBsslI8wAAAAAA
// SIG // KzAJBgUrDgMCGgUAoF0wGAYJKoZIhvcNAQkDMQsGCSqG
// SIG // SIb3DQEHATAcBgkqhkiG9w0BCQUxDxcNMTMxMDA1MDk1
// SIG // NjE1WjAjBgkqhkiG9w0BCQQxFgQU6S9xlUAw7q76guaq
// SIG // vxXK+iYLbEEwDQYJKoZIhvcNAQEFBQAEggEAKWRaftrx
// SIG // H3VZcyKUoGiHGvGrK7LbLQJDPp8YImhJk5bSRGifYW0X
// SIG // UiHfZ8UR7+YnELd7zOTMPs459IIf8OYJyyCld+iszJEE
// SIG // mlvAZgrdE/J9mASzsmZftLHNv834Ele8JrVEkmRpCGnR
// SIG // X+iVNUMlWzjaxpTqbYeNb94rY/GI73KglycthNaCq6xP
// SIG // b3iaAKJgSrY7tBeLR8iobh8hYZhZGGw+3Z/Tb60WGCQl
// SIG // MJ5Af+iGUML0Wvw62/AfneQOTmRFoaLsykvdrhB9ym9a
// SIG // nyQT+Ye4JxIZjo0WLEe/Qz6e5mC4LcNwbBMe6ZZtyvpJ
// SIG // hlX1cGNCLu9JL4ozGVS38+cTMQ==
// SIG // End signature block
