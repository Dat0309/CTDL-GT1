// Copyright (c) Microsoft Corporation. All rights reserved.
// Script for ATL Controls

function OnPrep(selProj, selObj)
{
	var L_WizardDialogTitle_Text = "ATL Control Wizard";
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
		
		// used only for device projects where platforms may not support DCOM.
		wizard.AddSymbol("SUPPORT_DCOM", false);
		wizard.AddSymbol("SUPPORT_NON_DCOM", false);

		var strShortName = wizard.FindSymbol("SHORT_NAME");
		var L_TRANSACTION_Text = "Add ATL Control ";
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

		var strProjectName		= wizard.FindSymbol("PROJECT_NAME");
		var strProjectPath		= wizard.FindSymbol("PROJECT_PATH");
		var strTemplatePath		= wizard.FindSymbol("TEMPLATES_PATH");
		var strUpperShortName	= CreateASCIIName(strShortName.toUpperCase());
		var strInterfaceName	= wizard.FindSymbol("INTERFACE_NAME");
		var strHTMLID 			= "IDH_" + strUpperShortName;
		var strDLGID  			= "IDD_" + strUpperShortName;
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
		var bConnectionPoint	= wizard.FindSymbol("CONNECTION_POINTS");
 		var strClassName		= wizard.FindSymbol("CLASS_NAME");
		var strHeaderFile		= wizard.FindSymbol("HEADER_FILE");
		var strImplFile			= wizard.FindSymbol("IMPL_FILE");
		var strCoClass			= wizard.FindSymbol("COCLASS");
		var bAttributed			= wizard.FindSymbol("ATTRIBUTED");

		var bHTMLCtl			= wizard.FindSymbol("HTML_CONTROL");
		var bCompositeCtl		= wizard.FindSymbol("COMPOSITE_CONTROL");

		var strProjectRC		= GetProjectFile(selProj, "RC", true, false);
		var strProjectIDL		= GetProjectFile(selProj, "IDL", false, false);

		if (strProjectRC == "")
		{
			var L_MissingResourceError = "Your have to add a resource file to your project before you can add ATL Controls to it";
			wizard.ReportError(L_MissingResourceError);
			return;
		}
		// Create necessary GUIDS
		CreateGUIDs();

		if (!bAttributed)
		{
			var MidlTool = GetIDLConfig(selProj,true);
			var strMidlHeader = MidlTool.HeaderFileName;
			strMidlHeader = selProj.Object.Configurations(1).Evaluate(strMidlHeader);
			wizard.AddSymbol("MIDL_H_FILENAME",strMidlHeader);
		}

		SetResDlgFont();

		if (!bDevice)
		{
			// open resource file
			var oResHelper = wizard.ResourceHelper;
			oResHelper.OpenResourceFile(strProjectRC);

			// Add Bitmap resource
			var strBitmapFile = GetUniqueFileName(strProjectPath, strShortName + ".bmp");
			var strBMPID = "IDB_" + strUpperShortName;
			wizard.RenderTemplate(strTemplatePath + "\\" + "toolbar.bmp", strProjectPath + strBitmapFile, true); //don't process bitmap
			var strNameAndID = oResHelper.AddResource(strBMPID, strProjectPath + strBitmapFile, "BITMAP");
			if (strNameAndID == null) return;
			var nEqualPos = strNameAndID.indexOf("=");
			var strSymbolName = strNameAndID.substr(0, nEqualPos);
			var strSymbolID = strNameAndID.substr(nEqualPos + 1);
			wizard.AddSymbol("IDR_BMPID_VALUE", strSymbolID);

			if (!bAttributed)
			{
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
				RenderAddTemplate(wizard, "control.rgs", strRGSFile, false, false);
				var strSymbolValue = oResHelper.AddResource(strRGSID, strProjectPath + strRGSFile, "REGISTRY");
				if (strSymbolValue == null) return;				
				wizard.AddSymbol("RGS_ID", strSymbolValue.split("=").shift());

				// Add connection point support
				if (bConnectionPoint)
					RenderAddTemplate(wizard, "connpt.h", "_" + strInterfaceName + "Events_CP.h", selObj, false);

				// Add #include "olectl.h" to strProject.idl
				if (!DoesIncludeExist(selProj, '"olectl.h"', strProjectIDL))
					oCM.AddInclude('"olectl.h"', strProjectIDL, vsCMAddPositionEnd);

				// Render ctlco.idl and insert into strProject.idl
				AddCoclassFromFile(oCM, "ctlco.idl");

				// Render ctlint.idl and insert into strProject.idl
				AddInterfaceFromFile(oCM, "ctlint.idl");

				SetMergeProxySymbol(selProj);
			}

			if (bHTMLCtl)
			{
				var strHTMLFile = GetUniqueFileName(strProjectPath, strShortName + "UI.htm");
				RenderAddTemplate(wizard, "HTMLCTL.htm", strHTMLFile, false, false);
				var strSymbolValue = oResHelper.AddResource(strHTMLID, strProjectPath + strHTMLFile, "HTML");
				if (strSymbolValue == null) return;								
				wizard.AddSymbol("IDH_HTMLID", strSymbolValue.split("=").shift());
			}

			if (bCompositeCtl)
			{				
				var strRCTemplFile = strTemplatePath + "\\cmposite.rc";
				var strTemporaryResourceFile = RenderToTemporaryResourceFile(strRCTemplFile);
				var strSymbolValue = oResHelper.AddResource(strDLGID, strTemporaryResourceFile, "DIALOG");
				if (strSymbolValue == null) return;				
				wizard.AddSymbol("IDD_DIALOGID", strSymbolValue.split("=").shift());
			}
			
			// Add header
			RenderAddTemplate(wizard, "control.h", strHeaderFile, selObj, true);	

			// Add HTML
			var strHTMLFile = GetUniqueFileName(strProjectPath, strShortName + ".htm");
			RenderAddTemplate(wizard, "default.htm", strHTMLFile, selObj, false);

			// Add CPP
			RenderAddTemplate(wizard, "control.cpp", strImplFile, selObj, false);

			// close resource file
			oResHelper.CloseResourceFile();
		}
		else
		{
		
			var bFirst = true;

			var oUuid;
			var oVersion;
			var aryMajorMinor;
			var strAppID;
			// add RGS file resource
			var strRGSFile = GetUniqueFileName(strProjectPath, CreateASCIIName(strShortName) + ".rgs");
			var strRGSDCOMFile = GetUniqueFileName(strProjectPath, CreateASCIIName(strShortName + "DCOM") + ".rgs");
			var strRGSID = "IDR_" + strUpperShortName;
			var strRGSDCOMID = "IDR_" + strUpperShortName + "DCOM";
			var strHTMLFile;
			var bDeviceDCOM = ProjectContainsDCOMPlatform(selProj)
			var bDeviceNonDCOM = ProjectContainsNonDCOMPlatform(selProj)

			if (!bAttributed)
			{
				// Get LibName
				wizard.AddSymbol("LIB_NAME", oCM.IDLLibraries(1).Name);

				// Get LibID
				oUuid = oCM.IDLLibraries(1).Attributes.Find("uuid");
				if (oUuid)
					wizard.AddSymbol("LIBID_REGISTRY_FORMAT", oUuid.Value);

				// Get typelib version
				oVersion = oCM.IDLLibraries(1).Attributes.Find("version");
				if (oVersion)
				{
					aryMajorMinor = oVersion.Value.split('.');
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
			}
			if (bHTMLCtl)
			{
				strHTMLFile = GetUniqueFileName(strProjectPath, strShortName + "UI.htm");
				RenderAddTemplate(wizard, "HTMLCTL.htm", strHTMLFile, false, false);
			}

			if (bDeviceNonDCOM)
			{
				wizard.AddSymbol("SUPPORT_NON_DCOM", true);
				RenderAddTemplate(wizard, "control.rgs", strRGSFile, false, false);
				wizard.AddSymbol("SUPPORT_NON_DCOM", false);

			}
			if (bDeviceDCOM)
			{
				wizard.AddSymbol("SUPPORT_DCOM", true);
				RenderAddTemplate(wizard, "control.rgs", strRGSDCOMFile, false, false);
				wizard.AddSymbol("SUPPORT_DCOM", false);	
			}

			var configs = selProj.Object.Configurations;
			var completedResourceFiles = new Array();
			AddDeviceSymbols(false);
			wizard.AddSymbol("SUPPORT_NON_DCOM", bDeviceNonDCOM);
			wizard.AddSymbol("SUPPORT_DCOM", bDeviceDCOM);

			var ProjWiz = new ActiveXObject("ProjWiz.SDProjWiz2.4");
			var oResHelper = wizard.ResourceHelper;

			for (var nCntr = 1; nCntr <= configs.Count; nCntr++)
			{
				var config = configs.Item(nCntr);
				var strCurrentResource = GetDeviceResourceFileForConfig(config);

				if (completedResourceFiles.join(";").indexOf(strCurrentResource) == -1)
				{
					// open resource file
					oResHelper.OpenResourceFile(strCurrentResource);

					if (!bAttributed)
					{
						// TODO: add checks that verify the RGS ID is the same across all .rc/.h files...
						// add RGS file resource
						if (bFirst)
						{
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
							// Add connection point support
							if (bConnectionPoint)
								RenderAddTemplate(wizard, "connpt.h", "_" + strInterfaceName + "Events_CP.h", selObj, false);

							// Add #include "olectl.h" to strProject.idl
							if (!DoesIncludeExist(selProj, '"olectl.h"', strProjectIDL))
								oCM.AddInclude('"olectl.h"', strProjectIDL, vsCMAddPositionEnd);

							// Render ctlco.idl and insert into strProject.idl
							AddCoclassFromFile(oCM, "ctlco.idl");

							// Render ctlint.idl and insert into strProject.idl
							AddInterfaceFromFile(oCM, "ctlint.idl");

							SetMergeProxySymbol(selProj);
						}
						else
						{
							// See above TODO
							if (bDeviceNonDCOM)
							{
							    var strSymbolValue = oResHelper.AddResource(strRGSID, strProjectPath + strRGSFile, "REGISTRY");
							    if (strSymbolValue == null) return;
							}
							if (bDeviceDCOM)
							{
							    var strSymbolValue = oResHelper.AddResource(strRGSDCOMID, strProjectPath + strRGSDCOMFile, "REGISTRY");
							    if (strSymbolValue == null) return;
							}		
						}

					}

					if (bHTMLCtl)
					{
						if (bFirst)
						{
							var strSymbolValue = oResHelper.AddResource(strHTMLID, strProjectPath + strHTMLFile, "HTML");
							if (strSymbolValue == null) return;				
							wizard.AddSymbol("IDH_HTMLID", strSymbolValue.split("=").shift());
						}
						else
						{
							// See above TODO
							var strSymbolValue = oResHelper.AddResource(strHTMLID, strProjectPath + strHTMLFile, "HTML");
							if (strSymbolValue == null) return;				
						}
					}

					var strCurrentSymbol = GetDeviceSymbolForConfig(config);
					wizard.AddSymbol(strCurrentSymbol, true);
					
					if (bCompositeCtl)
					{
						var platformName = config.Platform.Name;
						var symbol = ProjWiz.GetBaseNativePlatformProperty(platformName, "UISymbol");

						var strRCTemplFile = strTemplatePath;
						if (symbol == "POCKETPC2003_UI_MODEL")
						{
							 strRCTemplFile += "\\cmpositeppc.rc";
						}
						else if (symbol == "SMARTPHONE2003_UI_MODEL")
						{
							 strRCTemplFile += "\\cmpositesp.rc";
						}
						else
						{
							 strRCTemplFile += "\\cmpositece.rc";
						}
						
						var strTemporaryResourceFile =  RenderToTemporaryResourceFile(strRCTemplFile);
						if (bFirst)
						{
							var strSymbolValue = oResHelper.AddResource(strDLGID, strTemporaryResourceFile, "DIALOG");
							if (strSymbolValue == null) return;				
							wizard.AddSymbol("IDD_DIALOGID", strSymbolValue.split("=").shift());
						}
						else
						{
							// see above TODO
							var strSmybolValue = oResHelper.AddResource(strDLGID, strTemporaryResourceFile, "DIALOG");
							if (strSymbolValue == null) return;				
						}
					}
					// close resource file
					oResHelper.CloseResourceFile();
					completedResourceFiles.push(strCurrentResource);
				}				
				bFirst = false;
			}
            // Add header
			RenderAddTemplate(wizard, "control.h", strHeaderFile, selObj, true);	

			// Add HTML
			var strHTMLFile = GetUniqueFileName(strProjectPath, strShortName + ".htm");
			RenderAddTemplate(wizard, "default.htm", strHTMLFile, selObj, false);

			// Add CPP
			RenderAddTemplate(wizard, "control.cpp", strImplFile, selObj, false);
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

		// create connection point GUID
		var bConnectionPoint = wizard.FindSymbol("CONNECTION_POINTS");
		if (bConnectionPoint)
		{
			strRawGUID = wizard.CreateGuid();
			strFormattedGUID = wizard.FormatGuid(strRawGUID, 0);
			wizard.AddSymbol("CONNECTION_POINT_IID", strFormattedGUID);
		}

		// create GUID for HTML dispatch interface
		var bHTMLCtl = wizard.FindSymbol("HTML_CONTROL");
		if (bHTMLCtl)
		{
			strRawGUID = wizard.CreateGuid();
			strFormattedGUID = wizard.FormatGuid(strRawGUID, 0);
			wizard.AddSymbol("INTERFACEUI_IID", strFormattedGUID);
	
			// create GUID for HTML coclass
			var bAttributed = wizard.FindSymbol("ATTRIBUTED");
			if (bAttributed)
			{
				strRawGUID = wizard.CreateGuid();
				strFormattedGUID = wizard.FormatGuid(strRawGUID, 0);
				wizard.AddSymbol("OBJECT_UI_GUID", strFormattedGUID);				
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
// SIG // AAIBAAIBAAIBADAhMAkGBSsOAwIaBQAEFM+lIp+jKqgm
// SIG // Ryws40GjafikkD4ToIIVgjCCBMMwggOroAMCAQICEzMA
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
// SIG // BgEEAYI3AgEVMCMGCSqGSIb3DQEJBDEWBBR6OAyEGd2D
// SIG // 2GNi4zd/jBcOxrAoEDBABgorBgEEAYI3AgEMMTIwMKAW
// SIG // gBQAZABlAGYAYQB1AGwAdAAuAGoAc6EWgBRodHRwOi8v
// SIG // bWljcm9zb2Z0LmNvbTANBgkqhkiG9w0BAQEFAASCAQB/
// SIG // 9BhOFo218j0sj2j8EmEMuSk9doYV6zTrqHnPwRnJHbnI
// SIG // 0OtePBpag90T1+0I+56cwW9YAPLmwcVTUJoPajct5UFW
// SIG // 5QKXPiFBe2W2hxhwtmrQkMK2lHZPJ9/Dgy7RJBX4uM0L
// SIG // I7VBX6ex0gg0E65ekE+CDvnfjfBbRljMH2R6BXkVqJSl
// SIG // 170vu/dWNjXiF4jxiqB367KPaXHViLjGVwpQVFzUXPZv
// SIG // LG2MenJV5mwiHudnnQ1Pa+VpK17c2f2j8A0OMRuLpjNO
// SIG // +yvB08ejBJnwCsQnLl3W5qoL1JOE204Cbw6SdlyW453d
// SIG // 26H6stMm8zqSIvmZZTh4PoF5WJu02FU6oYICKDCCAiQG
// SIG // CSqGSIb3DQEJBjGCAhUwggIRAgEBMIGOMHcxCzAJBgNV
// SIG // BAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYD
// SIG // VQQHEwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQg
// SIG // Q29ycG9yYXRpb24xITAfBgNVBAMTGE1pY3Jvc29mdCBU
// SIG // aW1lLVN0YW1wIFBDQQITMwAAACs5MkjBsslI8wAAAAAA
// SIG // KzAJBgUrDgMCGgUAoF0wGAYJKoZIhvcNAQkDMQsGCSqG
// SIG // SIb3DQEHATAcBgkqhkiG9w0BCQUxDxcNMTMxMDA1MDkw
// SIG // NTA3WjAjBgkqhkiG9w0BCQQxFgQUTV6B1GoZaLd3wU/F
// SIG // FcZFwekbafcwDQYJKoZIhvcNAQEFBQAEggEAFLRDDKw7
// SIG // Ytt/YLimEMtCR0O8kf3G35yOUJs0kIO17EtaMbKQm6xh
// SIG // cCrMV3L6lNLrJyltwHS/5e9gvuop/6vn6/u+ZhSUShOo
// SIG // nohv+vW1myNdvSryJb8kiqfb2fpwBgcmHJwCxYA2GDTx
// SIG // +LeDNZv7k3/4H+E7x2960xIex5jWZYYnJmR1euBa3USY
// SIG // mmvwJGspoVlBParW2dw/nVh+6S4ZhdV1wBgLaRmrT1zK
// SIG // 7QwGIdN7SpfqqEjKvDyHf/WlFjN5yY7KDivl2x5ood73
// SIG // kGmo4gfpaYhU7W9mAxZyU5/r/4/boB1eVnvjrAMcQWrK
// SIG // ng6jBhTZPekSK8aoeJTg8FWOYg==
// SIG // End signature block
