// Copyright (c) Microsoft Corporation. All rights reserved.
// Script for ATL COM+ 1.0 Object

function OnPrep(selProj, selObj)
{
	var L_WizardDialogTitle_Text = "ATL COM+ 1.0 Component Wizard";
	return PrepCodeWizard(selProj, L_WizardDialogTitle_Text);
}

function OnFinish(selProj, selObj)
{
	var oCM;
	try
	{
		oCM	= selProj.CodeModel;

		var strShortName = wizard.FindSymbol("SHORT_NAME");
		var L_TRANSACTION1_Text = "Add ATL COM+ 1.0 Object ";
		oCM.StartTransaction(L_TRANSACTION1_Text + strShortName);
		if(!AddATLSupportToProject(selProj))
		{
			oCM.AbortTransaction();
			return;
		}

		var bDLL;
		if (typeDynamicLibrary == selProj.Object.Configurations(1).ConfigurationType)
			bDLL = true;
		else
			bDLL = false;
		wizard.AddSymbol("DLL_APP", bDLL);

		var strProjectPath		= wizard.FindSymbol("PROJECT_PATH");
		var strTemplatePath		= wizard.FindSymbol("TEMPLATES_PATH");
		var strUpperShortName	= CreateASCIIName(strShortName.toUpperCase());
		wizard.AddSymbol("UPPER_SHORT_NAME", strUpperShortName);
		var strVIProgID			= wizard.FindSymbol("VERSION_INDEPENDENT_PROGID");
		if (strVIProgID == null || strVIProgID == "")
		{
			wizard.AddSymbol("PROGID_VALID", false);
			wizard.AddSymbol("VERSION_INDEPENDENT_PROGID","");
			wizard.AddSymbol("PROGID","");
		}
		else
		{
			wizard.AddSymbol("PROGID_VALID", true);
			wizard.AddSymbol("PROGID", strVIProgID.substr(0,37) + ".1");
		}
		var strClassName		= wizard.FindSymbol("CLASS_NAME");
		var strHeaderFile		= wizard.FindSymbol("HEADER_FILE");
		var strImplFile			= wizard.FindSymbol("IMPL_FILE");
		var strCoClass			= wizard.FindSymbol("COCLASS");
		var bAttributed			= wizard.FindSymbol("ATTRIBUTED");

		var strProjectRC	= GetProjectFile(selProj, "RC", true, false);
		var strProjectIDL 	= GetProjectFile(selProj, "IDL", false, false);			
		

		// Create necessary GUIDS
		CreateGUIDs();

		if (!bAttributed)
		{
			var MidlTool = GetIDLConfig(selProj,true);
			var strMidlHeader = MidlTool.HeaderFileName;
			strMidlHeader = selProj.Object.Configurations(1).Evaluate(strMidlHeader);
			wizard.AddSymbol("MIDL_H_FILENAME",strMidlHeader);

			// Get LibName
			wizard.AddSymbol("LIB_NAME", oCM.IDLLibraries(1).Name);

			// Get LibID
			var oUuid = oCM.IDLLibraries(1).Attributes.Find("uuid");
			if (oUuid)
				wizard.AddSymbol("LIBID_REGISTRY_FORMAT", oUuid.Value);

			// Get typelib version
			var oVersion = oCM.IDLLibraries(1).Attributes.Find("version");
			if (oVersion)
			{
				var aryMajorMinor = oVersion.Value.split('.');
				for (var nCntr=0; nCntr<aryMajorMinor.length; nCntr++)
				{
					if (nCntr == 0)
						wizard.AddSymbol("TYPELIB_VERSION_MAJOR", aryMajorMinor[nCntr]);
					else
						wizard.AddSymbol("TYPELIB_VERSION_MINOR", aryMajorMinor[nCntr]);
				}
			}

			// Get AppID
			var strAppID = wizard.GetAppID();
			if (strAppID.length > 0)
			{
				wizard.AddSymbol("APPID_EXIST", true);
				wizard.AddSymbol("APPID_REGISTRY_FORMAT", strAppID);
			}

			// add RGS file resource
			var strRGSFile = GetUniqueFileName(strProjectPath, CreateASCIIName(strShortName) + ".rgs");
			var strRGSID = "IDR_" + strUpperShortName;
			RenderAddTemplate(wizard, "mts.rgs", strRGSFile, false, false);

			var oResHelper = wizard.ResourceHelper;
			oResHelper.OpenResourceFile(strProjectRC);
			var strSymbolValue = oResHelper.AddResource(strRGSID, strProjectPath + strRGSFile, "REGISTRY");
			if (strSymbolValue == null) return;				
			wizard.AddSymbol("RGS_ID", strSymbolValue.split("=").shift());
			oResHelper.CloseResourceFile();

			var bTransaction = wizard.FindSymbol("TRANSACTION_SUPPORT");
			var bQueueable = wizard.FindSymbol("QUEUEABLE");

			if (bTransaction || bQueueable)
			{
				// Add #include "mtxattr.h" to strProject.idl
				if (!DoesIncludeExist(selProj, '"mtxattr.h"', strProjectIDL))
					oCM.AddInclude('"mtxattr.h"', strProjectIDL, vsCMAddPositionEnd);
			}

			// Render mtsco.idl and insert into strProject.idl
			AddCoclassFromFile(oCM, "mtsco.idl");

			// Render mtsint.idl and insert into strProject.idl
			AddInterfaceFromFile(oCM, "mtsint.idl");
			

			SetMergeProxySymbol(selProj);
		}

		// Add header
		RenderAddTemplate(wizard, "mts.h", strHeaderFile, selObj, true);

		// Add CPP
		RenderAddTemplate(wizard, "mts.cpp", strImplFile, selObj, false);

		// make sure comsvcs.lib is linked in
		var oConfigs = selProj.Object.Configurations;
		for (var nCntr = 1; nCntr <= oConfigs.Count; nCntr++)
		{
			var LinkTool = oConfigs(nCntr).Tools("VCLinkerTool");			
			var strLibs = LinkTool.AdditionalDependencies;
			if (-1 == strLibs.toUpperCase().indexOf("COMSVCS.LIB"))
				LinkTool.AdditionalDependencies += " comsvcs.lib";
		}

		oCM.CommitTransaction();
				
		var newClass = oCM.Classes.Find(strClassName);
		if(newClass)
			newClass.StartPoint.TryToShow(vsPaneShowTop);		
	}
	catch(e)
	{
		if (oCM)
			oCM.AbortTransaction();

		if (e.description.length != 0)
			SetErrorInfo(e);
		return e.number
	}
}

function CreateGUIDs()
{
	try
	{
		// create CLSID
		var strRawGUID = wizard.CreateGuid();
		var strFormattedGUID = wizard.FormatGuid(strRawGUID, 0);
		wizard.AddSymbol("CLSID_REGISTRY_FORMAT", strFormattedGUID);

		// create interface GUID
		strRawGUID = wizard.CreateGuid();
		strFormattedGUID = wizard.FormatGuid(strRawGUID, 0);
		wizard.AddSymbol("INTERFACE_IID", strFormattedGUID);
	}
	catch(e)
	{
		throw e;
	}
}

function CanAddMTSClass(oProj, selObj)
{
	try
	{
		var L_ErrMsg3_Text = "COM+ 1.0 classes can only be added to ATL DLL or MFC Regular DLL projects.";
		if (typeDynamicLibrary != oProj.Object.Configurations(1).ConfigurationType)
		{
			wizard.ReportError(L_ErrMsg3_Text);
			return false;
		}
		if (IsATLProject(oProj))
			return true;
		if (!IsMFCProject(oProj, true))
		{   
			wizard.ReportError(L_ErrMsg3_Text);
			return false;
		}
		return CanAddATLClass(oProj, selObj);
	}
	catch(e)
	{
		if (e.description.length != 0)
			SetErrorInfo(e);
		return e.number
	}
}

// SIG // Begin signature block
// SIG // MIIanQYJKoZIhvcNAQcCoIIajjCCGooCAQExCzAJBgUr
// SIG // DgMCGgUAMGcGCisGAQQBgjcCAQSgWTBXMDIGCisGAQQB
// SIG // gjcCAR4wJAIBAQQQEODJBs441BGiowAQS9NQkAIBAAIB
// SIG // AAIBAAIBAAIBADAhMAkGBSsOAwIaBQAEFPE0DU7ZqK4h
// SIG // R25vQNrwC8O6T03eoIIVgjCCBMMwggOroAMCAQICEzMA
// SIG // AAA0JDFAyaDBeY0AAAAAADQwDQYJKoZIhvcNAQEFBQAw
// SIG // dzELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0
// SIG // b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1p
// SIG // Y3Jvc29mdCBDb3Jwb3JhdGlvbjEhMB8GA1UEAxMYTWlj
// SIG // cm9zb2Z0IFRpbWUtU3RhbXAgUENBMB4XDTEzMDMyNzIw
// SIG // MDgyNVoXDTE0MDYyNzIwMDgyNVowgbMxCzAJBgNVBAYT
// SIG // AlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQH
// SIG // EwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29y
// SIG // cG9yYXRpb24xDTALBgNVBAsTBE1PUFIxJzAlBgNVBAsT
// SIG // Hm5DaXBoZXIgRFNFIEVTTjpCOEVDLTMwQTQtNzE0NDEl
// SIG // MCMGA1UEAxMcTWljcm9zb2Z0IFRpbWUtU3RhbXAgU2Vy
// SIG // dmljZTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoC
// SIG // ggEBAOUaB60KlizUtjRkyzQg8rwEWIKLtQncUtRwn+Jc
// SIG // LOf1aqT1ti6xgYZZAexJbCkEHvU4i1cY9cAyDe00kOzG
// SIG // ReW7igolqu+he4fY8XBnSs1q3OavBZE97QVw60HPq7El
// SIG // ZrurorcY+XgTeHXNizNcfe1nxO0D/SisWGDBe72AjTOT
// SIG // YWIIsY9REmWPQX7E1SXpLWZB00M0+peB+PyHoe05Uh/4
// SIG // 6T7/XoDJBjYH29u5asc3z4a1GktK1CXyx8iNr2FnitpT
// SIG // L/NMHoMsY8qgEFIRuoFYc0KE4zSy7uqTvkyC0H2WC09/
// SIG // L88QXRpFZqsC8V8kAEbBwVXSg3JCIoY6pL6TUAECAwEA
// SIG // AaOCAQkwggEFMB0GA1UdDgQWBBRfS0LeDLk4oNRmNo1W
// SIG // +3RZSWaBKzAfBgNVHSMEGDAWgBQjNPjZUkZwCu1A+3b7
// SIG // syuwwzWzDzBUBgNVHR8ETTBLMEmgR6BFhkNodHRwOi8v
// SIG // Y3JsLm1pY3Jvc29mdC5jb20vcGtpL2NybC9wcm9kdWN0
// SIG // cy9NaWNyb3NvZnRUaW1lU3RhbXBQQ0EuY3JsMFgGCCsG
// SIG // AQUFBwEBBEwwSjBIBggrBgEFBQcwAoY8aHR0cDovL3d3
// SIG // dy5taWNyb3NvZnQuY29tL3BraS9jZXJ0cy9NaWNyb3Nv
// SIG // ZnRUaW1lU3RhbXBQQ0EuY3J0MBMGA1UdJQQMMAoGCCsG
// SIG // AQUFBwMIMA0GCSqGSIb3DQEBBQUAA4IBAQAPQlCg1R6t
// SIG // Fz8fCqYrN4pnWC2xME8778JXaexl00zFUHLycyX25IQC
// SIG // xXUccVhDq/HJqo7fym9YPInnL816Nexm19Veuo6fV4aU
// SIG // EKDrUTetV/YneyNPGdjgbXYEJTBhEq2ljqMmtkjlU/JF
// SIG // TsW4iScQnanjzyPpeWyuk2g6GvMTxBS2ejqeQdqZVp7Q
// SIG // 0+AWlpByTK8B9yQG+xkrmLJVzHqf6JI6azF7gPMOnleL
// SIG // t+YFtjklmpeCKTaLOK6uixqs7ufsLr9LLqUHNYHzEyDq
// SIG // tEqTnr+cg1Z/rRUvXClxC5RnOPwwv2Xn9Tne6iLth4yr
// SIG // sju1AcKt4PyOJRUMIr6fDO0dMIIE7DCCA9SgAwIBAgIT
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
// SIG // BgEEAYI3AgEVMCMGCSqGSIb3DQEJBDEWBBTanEZWywxN
// SIG // jh8RD2mVmoLmeniEgTBABgorBgEEAYI3AgEMMTIwMKAW
// SIG // gBQAZABlAGYAYQB1AGwAdAAuAGoAc6EWgBRodHRwOi8v
// SIG // bWljcm9zb2Z0LmNvbTANBgkqhkiG9w0BAQEFAASCAQBN
// SIG // Uzn69rfVY/EhVfZESgRJO0IlgLjIgaSWf+awJ0zcU+8v
// SIG // PfTBMXRmXDa8xQHJiyyLfZeybKWzVq4Je10KbjZmwrtq
// SIG // iPFnvjyYfSJt6FcOyV2GstvgHvAChVbYucjuhzweK+ev
// SIG // H8JRjIEDxJSHTSc3GiUfg1kOuD1XSQ9Xc/8qNqHrCy5X
// SIG // jsQ/JqQb3tm7kPYpAs3R+bYuTevlaJlvs+/V8vdcdP/6
// SIG // Lv91xU1pxmJ/+TkAKwUuPOlRlDtstT7iJ4EMpfvhveP8
// SIG // DR3ik8FL3AaeyrGlTs/d5rXQ0Kegw7DH0i9TiYbTpDqm
// SIG // 6qSGWT8WwIpQ+o6scIZh6GsOQLJg5TAfoYICKDCCAiQG
// SIG // CSqGSIb3DQEJBjGCAhUwggIRAgEBMIGOMHcxCzAJBgNV
// SIG // BAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYD
// SIG // VQQHEwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQg
// SIG // Q29ycG9yYXRpb24xITAfBgNVBAMTGE1pY3Jvc29mdCBU
// SIG // aW1lLVN0YW1wIFBDQQITMwAAADQkMUDJoMF5jQAAAAAA
// SIG // NDAJBgUrDgMCGgUAoF0wGAYJKoZIhvcNAQkDMQsGCSqG
// SIG // SIb3DQEHATAcBgkqhkiG9w0BCQUxDxcNMTMxMDA1MDkw
// SIG // NTA3WjAjBgkqhkiG9w0BCQQxFgQUCWC+m5ar7MLnad+k
// SIG // Vvn/M+7o0bowDQYJKoZIhvcNAQEFBQAEggEAUIznlYYY
// SIG // mk2DyMcGxVg7iZHZUwaVA4Xz8N7CWIIChgUKv/TWaYn/
// SIG // CRIz2zbYLkF/w261lfjxJSjLpqU6k6RSIF9Mmfy55Hex
// SIG // Sk2htM2l0oSJKDwi7GT6YnhECiL4tBfi/OquHkAfAWGf
// SIG // qTi8fAwii7HDcbbkqYPVaVCURrguU4DOh1ytP/lQ1ui7
// SIG // KxHHi1EZFnLDHbdnUbNw+m5B2KYgScynQ/0194JUxamm
// SIG // 6Nq5Uxqqfo1GzwuxnpLAE/pUoMdgwf+2SC4kPtszN1pH
// SIG // CUvo4brjGgmXNNYaU4ux9b4YYsMZJMKz2l46v107FQoB
// SIG // JSX+Mf8Y6iw05cy+lVd1vpaMoQ==
// SIG // End signature block
