// Copyright (c) Microsoft Corporation. All rights reserved.
// Script for ATL Simple Object

function OnPrep(selProj, selObj)
{
	var L_WizardDialogTitle_Text = "ATL Simple Object Wizard";
	return PrepCodeWizard(selProj, L_WizardDialogTitle_Text);
}

function OnFinish(selProj, selObj)
{
	var oCM;
	try
	{
		oCM	= selProj.CodeModel;
		var bDevice = IsDeviceProject(selProj);
		wizard.AddSymbol("DEVICE", bDevice);
		AddDeviceSymbols(false);

		var strShortName = wizard.FindSymbol("SHORT_NAME");
		var L_TRANSACTION_Text = "Add ATL Simple Object ";
		oCM.StartTransaction(L_TRANSACTION_Text + strShortName);
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
		
		// used only for device projects where platforms may not support DCOM.
		wizard.AddSymbol("SUPPORT_DCOM", false);
		wizard.AddSymbol("SUPPORT_NON_DCOM", false);

		var isMFCProject = IsMFCProject(selProj, false);
		wizard.AddSymbol("MFC_SUPPORT", isMFCProject);


		var strProjectName		= wizard.FindSymbol("SAFE_PROJECT_IDENTIFIER_NAME");
		var strProjectPath		= wizard.FindSymbol("PROJECT_PATH");
		var strTemplatePath		= wizard.FindSymbol("TEMPLATES_PATH");
		var strUpperShortName		= CreateASCIIName(strShortName.toUpperCase());
		var strInterfaceName		= wizard.FindSymbol("INTERFACE_NAME");
		var strProjectIdlName   	= strProjectName + ".idl";
		
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
		var bConnectionPoint		= wizard.FindSymbol("CONNECTION_POINTS");
 		var strClassName		= wizard.FindSymbol("CLASS_NAME");
		var strHeaderFile		= wizard.FindSymbol("HEADER_FILE");
		var strImplFile			= wizard.FindSymbol("IMPL_FILE");
		var strCoClass			= wizard.FindSymbol("COCLASS");
		var bAttributed			= wizard.FindSymbol("ATTRIBUTED");

		var strProjectRC		= GetProjectFile(selProj, "RC", true, false);

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
			var strRGSDCOMFile = GetUniqueFileName(strProjectPath, CreateASCIIName(strShortName + "DCOM") + ".rgs");
			var strRGSID = "IDR_" + strUpperShortName;
			var strRGSDCOMID = "IDR_" + strUpperShortName + "DCOM";

			var bDeviceDCOM = ProjectContainsDCOMPlatform(selProj)
			var bDeviceNonDCOM = ProjectContainsNonDCOMPlatform(selProj)
			
			if (!bDevice)
			{
				RenderAddTemplate(wizard, "object.rgs", strRGSFile, false, false);
			}
			else
			{
				if (bDeviceDCOM)
				{
					wizard.AddSymbol("SUPPORT_DCOM", true);
					RenderAddTemplate(wizard, "object.rgs", strRGSDCOMFile, false, false);
					wizard.AddSymbol("SUPPORT_DCOM", false);
				}
				if (bDeviceNonDCOM)
				{
					wizard.AddSymbol("SUPPORT_NON_DCOM", true);
					RenderAddTemplate(wizard, "object.rgs", strRGSFile, false, false);
					wizard.AddSymbol("SUPPORT_NON_DCOM", false);
				} 
			}    

			wizard.AddSymbol("SUPPORT_DCOM", bDeviceDCOM);
			wizard.AddSymbol("SUPPORT_NON_DCOM", bDeviceNonDCOM);

			if (!bDevice)
			{
				var oResHelper = wizard.ResourceHelper;
				oResHelper.OpenResourceFile(strProjectRC);

				var strSymbolValue = oResHelper.AddResource(strRGSID, strProjectPath + strRGSFile, "REGISTRY");
				if (strSymbolValue == null) return;				
				wizard.AddSymbol("RGS_ID", strSymbolValue.split("=").shift());

				oResHelper.CloseResourceFile();
			}
			else
			{
				var completedResourceFiles = new Array();
				var configs = selProj.Object.Configurations;
				AddDeviceSymbols(false);

				var oResHelper = wizard.ResourceHelper;

				for (var nCntr = 1; nCntr <= configs.Count; nCntr++)
				{
					var config = configs.Item(nCntr);
					var strCurrentResource = GetDeviceResourceFileForConfig(config);
					
					if (completedResourceFiles.join(";").indexOf(strCurrentResource) == -1)
					{
						oResHelper.OpenResourceFile(strCurrentResource);
						if (bDeviceNonDCOM)
						{
							var strSymbolValue = oResHelper.AddResource(strRGSID, strProjectPath + strRGSFile, "REGISTRY");
							if (strSymbolValue == null) return;				
							wizard.AddSymbol("RGS_ID", strSymbolValue.split("=").shift());
						}
						if (bDeviceDCOM)
						{
							var strSymbolValue = oResHelper.AddResource(strRGSDCOMID, strProjectPath + strRGSDCOMFile, "REGISTRY");
							if (strSymbolValue == null) return;
							wizard.AddSymbol("RGSDCOM_ID", strSymbolValue.split("=").shift());
						}
						oResHelper.CloseResourceFile();
						completedResourceFiles.push(strCurrentResource);
					}
					
				}
			}

			// Add connection point support
			if (bConnectionPoint)
				RenderAddTemplate(wizard, "connpt.h", "_" + strInterfaceName + "Events_CP.h", selObj, false);

			// Render objco.idl and insert into strProject.idl
			AddCoclassFromFile(oCM, "objco.idl");

			// Render objint.idl and insert into strProject.idl
			AddInterfaceFromFile(oCM, "objint.idl");
			
			// Add required import statements
			AddImportStatements(oCM, selProj, strProjectIdlName);
			
			// Add (generate) ATL-based document definition and implementation if required, 
			// Add #define SHARED_HANDLERS to stdafx.h
			if (wizard.FindSymbol("ADD_HANDLER_SUPPORT"))
			{
				if (wizard.FindSymbol("HANDLER_GEN_ATL_DOC"))
				{
					var strAtlDocHeader = wizard.FindSymbol("HANDLER_ATL_DOC_HEADER_FILE_TRIMMED");
					var strAtlDocImpl = wizard.FindSymbol("HANDLER_ATL_DOC_IMPL_FILE_TRIMMED");

					// Add header
					RenderAddTemplate(wizard, "document.h", strAtlDocHeader, selObj, false);

					// Add CPP
					RenderAddTemplate(wizard, "document.cpp", strAtlDocImpl, selObj, false);
				}
				else if (wizard.FindSymbol("HANDLER_ATL_DOC_CLASS_NAME_SPECIFIED"))
				{
					// user specifies ATL-based doc class name only
					var strAtlDocName = wizard.FindSymbol("HANDLER_ATL_DOC_CLASS_NAME_TRIMMED");
					var elem = oCM.Classes.Find(strAtlDocName);

					// add #include if the class is defined
					if (elem != null)
					{
						var strAtlDocNameFromCM = elem.File.substr(elem.File.lastIndexOf("\\") + 1);
					}
				}
				else
				{
					// Add existing items (links) from MFC project handlers are being added for.
					// Add the document h/cpp, view h.cpp, and cntritem h/cpp (if exist).
					var strMFCDocHeader = wizard.FindSymbol("HANDLER_DOCUMENT_FILE_NAME_TRIMMED");
					if (strMFCDocHeader != "")
					{
						if (selProj.Object.CanAddFile(strMFCDocHeader))
						{
							selProj.Object.AddFile(strMFCDocHeader);
						}

						var strMFCDocImpl = strMFCDocHeader.substring(0, strMFCDocHeader.length - 1) + "cpp";
						if (selProj.Object.CanAddFile(strMFCDocImpl))
						{
							selProj.Object.AddFile(strMFCDocImpl);
						}

						var strMFCViewHeader = wizard.FindSymbol("HANDLER_VIEW_FILE_NAME_TRIMMED");
						if (strMFCViewHeader != "")
						{
							if (selProj.Object.CanAddFile(strMFCViewHeader))
							{
								selProj.Object.AddFile(strMFCViewHeader);
							}

							var strMFCViewImpl = strMFCViewHeader.substring(0, strMFCViewHeader.length - 1) + "cpp";
							if (selProj.Object.CanAddFile(strMFCViewImpl))
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
						if (selProj.Object.CanAddFile(strMFCCntrHeader))
						{
							selProj.Object.AddFile(strMFCCntrHeader);
						}

						var strMFCCntrImpl = strMFCDocHeader.substring(0, nEndIndex + 1) + "CntrItem.cpp";
						if (selProj.Object.CanAddFile(strMFCCntrImpl))
						{
							selProj.Object.AddFile(strMFCCntrImpl);
						}
					}
				}

				AddDefineSharedHandlersStatement(oCM);
			}

			SetMergeProxySymbol(selProj);
		}

		// Add header
		RenderAddTemplate(wizard, "object.h", strHeaderFile, selObj, true);

		// Add CPP
		RenderAddTemplate(wizard, "object.cpp", strImplFile, selObj, false);

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
		
		// create GUID for Search Persistent Handler registration (used in rgs)
		var bSearchHandler = wizard.FindSymbol("SEARCH_HANDLER");
		if (bSearchHandler)
		{
		    strRawGUID = wizard.CreateGuid();
		    strFormattedGUID = wizard.FormatGuid(strRawGUID, 0);
		    wizard.AddSymbol("CLSID_PERSISTENT_HANDLER", strFormattedGUID);
		}

		// create connection point GUID
		var bConnectionPoint = wizard.FindSymbol("CONNECTION_POINTS");
		if (bConnectionPoint)
		{
			strRawGUID = wizard.CreateGuid();
			strFormattedGUID = wizard.FormatGuid(strRawGUID, 0);
			wizard.AddSymbol("CONNECTION_POINT_IID", strFormattedGUID);
		}
	}
	catch(e)
	{
		throw e;
	}
}

function AddImportStatements(oCM, selProj, strProjectIdlName)
{
    var vcIDLImport;
    
	var bSearchHandler = wizard.FindSymbol("SEARCH_HANDLER");
	if (bSearchHandler)
	{
	    var i = 0;
        for (i = 1; i <= oCM.IDLImports.Count; i++)
        {
            vcIDLImport = oCM.IDLImports.Item(i);
            if (vcIDLImport.Name == "filter.idl")
            {
                return;
            }
        }
        
        oCM.AddIDLImport("\"filter.idl\"", strProjectIdlName, -1);
	}
	
    var bThumbnailProvider = wizard.FindSymbol("THUMBNAIL_PROVIDER_HANDLER");
    if (bThumbnailProvider)
    {
        var i = 0;
        for (i = 1; i <= oCM.IDLImports.Count; i++)
        {
            vcIDLImport = oCM.IDLImports.Item(i);
            if (vcIDLImport.Name == "thumbcache.idl")
            {
                return;
            }
        }
        
        oCM.AddIDLImport("\"thumbcache.idl\"", strProjectIdlName, -1);
    }
    
    var bRichPreviewHandler = wizard.FindSymbol("PREVIEW_HANDLER");
    if (bRichPreviewHandler)
    {
        var i = 0;
        for (i = 1; i <= oCM.IDLImports.Count; i++)
        {
            vcIDLImport = oCM.IDLImports.Item(i);
            if (vcIDLImport.Name == "shobjidl.idl")
            {
                return;
            }
        }
        
        oCM.AddIDLImport("\"shobjidl.idl\"", strProjectIdlName, -1);
    }
}
function AddDefineSharedHandlersStatement(oCM)
{
    if(oCM.Macros.Find("SHARED_HANDLERS") == null)
    {
        oCM.AddMacro("SHARED_HANDLERS", "stdafx.h", "", -1);
    }
}

// SIG // Begin signature block
// SIG // MIIanQYJKoZIhvcNAQcCoIIajjCCGooCAQExCzAJBgUr
// SIG // DgMCGgUAMGcGCisGAQQBgjcCAQSgWTBXMDIGCisGAQQB
// SIG // gjcCAR4wJAIBAQQQEODJBs441BGiowAQS9NQkAIBAAIB
// SIG // AAIBAAIBAAIBADAhMAkGBSsOAwIaBQAEFOaT58IHoptA
// SIG // 7jvxV5CCRQYDNm6loIIVgjCCBMMwggOroAMCAQICEzMA
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
// SIG // BgEEAYI3AgEVMCMGCSqGSIb3DQEJBDEWBBSbRbh3ULTE
// SIG // hhtdM2Lcol/NOomv4zBABgorBgEEAYI3AgEMMTIwMKAW
// SIG // gBQAZABlAGYAYQB1AGwAdAAuAGoAc6EWgBRodHRwOi8v
// SIG // bWljcm9zb2Z0LmNvbTANBgkqhkiG9w0BAQEFAASCAQAx
// SIG // gP0aZd+3Y34ZzzjgIwtRPLq7yGWHs2jfS/X9z7ON17Wo
// SIG // ycTS4CjiBNxswvFgt2scBQM41E9q1Jx9CSIlS04TY56g
// SIG // dhIZXiEU5tGfWfTlppubvDe6JEaJCnJn7Vs0IFLbzZu5
// SIG // xSguIRfcgEKdb53TEEjGTyLQ8iuoVNdB5L8U3u34dZqD
// SIG // H/hsmMPa9cWwUPPo53zFacrxsBvQb68xc+2iidgJwT3t
// SIG // pZkPQQq1vX7z9F7T9OuLAHQyWSp7hgE5va/gLM0odS1H
// SIG // 9iZEgMgCxVclB3SxPDjAxmY3f/s8t+albQ4dhcVohfhB
// SIG // P0EGYmawFXRgJvAZIGsfxNNKBdIJ7Dr/oYICKDCCAiQG
// SIG // CSqGSIb3DQEJBjGCAhUwggIRAgEBMIGOMHcxCzAJBgNV
// SIG // BAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYD
// SIG // VQQHEwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQg
// SIG // Q29ycG9yYXRpb24xITAfBgNVBAMTGE1pY3Jvc29mdCBU
// SIG // aW1lLVN0YW1wIFBDQQITMwAAADQkMUDJoMF5jQAAAAAA
// SIG // NDAJBgUrDgMCGgUAoF0wGAYJKoZIhvcNAQkDMQsGCSqG
// SIG // SIb3DQEHATAcBgkqhkiG9w0BCQUxDxcNMTMxMDA1MDkw
// SIG // NTA3WjAjBgkqhkiG9w0BCQQxFgQUqH3sNLEjOn6O+sJm
// SIG // 685of8eLnGAwDQYJKoZIhvcNAQEFBQAEggEATXKhK3ni
// SIG // POwPz2qHLe3CdwIHoE9Wgf1V9K+z0yQK44qpdyViQufn
// SIG // /zdotxTkgJbsAvHhEeQ4VG80Wq4ACNxNCvG9v5QahDL/
// SIG // 4VjI51McJtnRuBdLOGDbMYopqQZOCqNQmNu922PcUuJh
// SIG // ly/cZbNSnA0Nn/xh21y18XLD1kwLtzNrMuH+mnMH0oMj
// SIG // LVf281MyaLz2Lt3B+oPpzC626KymqIpTh5O9PrmIEwGo
// SIG // jFH6DvTUyT2jAOTV+zrZJyLkiWlkzazM+IafOTKFRh6d
// SIG // IBVrLobGtWOXZf61bhb+XGMqScOa5Kfuf8ngbC4hhOSp
// SIG // of460AycUSsYSDkQQ2OxxhBofg==
// SIG // End signature block
