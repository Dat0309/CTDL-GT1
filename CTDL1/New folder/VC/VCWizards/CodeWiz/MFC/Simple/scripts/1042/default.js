// Copyright (c) Microsoft Corporation. All rights reserved.
// Script for MFC Add Simple Class

function OnPrep(selProj, selObj)
{
	var L_WizardDialogTitle_Text = "MFC 클래스 마법사";
	return PrepCodeWizard(selProj, L_WizardDialogTitle_Text);
}

function FindInitInstance()
{
    var oClasses = wizard.ProjectObject.CodeModel.GetClassesDerivedFrom("CWinApp");
    if (oClasses != null)
    {
        for (var nCntr = 1; nCntr <= oClasses.Count; nCntr++)
        {
            var oInitInstance = oClasses(nCntr).Functions.Find("InitInstance");
            if (oInitInstance)
                return oInitInstance;
        }
    }
    return false;
}

function OnFinish(selProj, selObj)
{
    var oCM;
    try
    {
        oCM = selProj.CodeModel;

        var strClassName = wizard.FindSymbol("CLASS_NAME");

        var L_TransactionName_Text = "MFC 단순 클래스 추가 ";
        oCM.StartTransaction(L_TransactionName_Text + strClassName);

        var strProjectPath = wizard.FindSymbol("PROJECT_PATH");
        var strTemplatePath = wizard.FindSymbol("TEMPLATES_PATH");
        var strIncludeHeader = wizard.FindSymbol("INCLUDE_HEADER");
        var strHeaderFile = wizard.FindSymbol("HEADER_FILE");
        var strImplFile = wizard.FindSymbol("IMPL_FILE");
        var strDialogID = wizard.FindSymbol("IDD_DIALOG");
        var strTemplateHeader = wizard.FindSymbol("TEMPLATE_HEADER");
        var strTemplateImpl = wizard.FindSymbol("TEMPLATE_IMPL");
        var strHTMLID = wizard.FindSymbol("HTML_ID");
        var strHTMLFile = wizard.FindSymbol("HTML_FILE");
        var strBaseClass = wizard.FindSymbol("BASE_CLASS");
        var bGenDocTemplate = wizard.FindSymbol("GEN_DOCTEMPLATE");
        var bMDI = wizard.FindSymbol("MDI_APP");
        var strDocumentClass = wizard.FindSymbol("DOCUMENT_CLASS");
        var strFrameClass = wizard.FindSymbol("FRAME_CLASS");
        var bAccessibility = wizard.FindSymbol("ACCESSIBILITY");
        var strProjectCPP = GetProjectFile(selProj, "CPP", false, true);

        var bDevice = IsDeviceProject(selProj);

        if (strIncludeHeader != "")
        {
            if (!DoesIncludeExist(selProj, strIncludeHeader, "stdafx.h"))
                oCM.AddInclude(strIncludeHeader, "stdafx.h", vsCMAddPositionEnd);
        }

        var strProjectRC = GetProjectFile(selProj, "RC", true);
        var oResHelper = wizard.ResourceHelper;

        if (wizard.FindSymbol("CREATE_DIALOG"))
        {
            SetResDlgFont();

            var strRCTemplFile = strTemplatePath;
            if (!bDevice)
            {
                if (strBaseClass == "CDHtmlDialog")
                    strRCTemplFile += "\\dhtmldlg.rc";
                else if (strBaseClass == "CFormView")
                    strRCTemplFile += "\\formview.rc";
                else
                    strRCTemplFile += "\\dialog.rc";

                oResHelper.OpenResourceFile(strProjectRC);
                var strTemporaryResourceFile = RenderToTemporaryResourceFile(strRCTemplFile);
                var strSymbolValue = oResHelper.AddResource(strDialogID, strTemporaryResourceFile, "DIALOG");
                if (strSymbolValue == null) return;
                oResHelper.CloseResourceFile();
            }
            else
            {
                var configs = selProj.Object.Configurations;
                var completedResourceFiles = new Array();

                var ProjWiz = new ActiveXObject("ProjWiz.SDProjWiz2.4");

                for (var nCntr = 1; nCntr <= configs.Count; nCntr++)
                {
                    var config = configs.Item(nCntr);
                    var strCurrentResource = GetDeviceResourceFileForConfig(config);

                    if (completedResourceFiles.join(";").indexOf(strCurrentResource) == -1)
                    {
                        var platformName = config.Platform.Name;
                        var symbol = ProjWiz.GetBaseNativePlatformProperty(platformName, "UISymbol");
                        var strPlatformRCTemplFile = strRCTemplFile;

                        if (symbol == "POCKETPC2003_UI_MODEL")
                        {
                            if (strBaseClass == "CFormView")
                                strPlatformRCTemplFile += "\\formviewppc.rc";
                            else
                                strPlatformRCTemplFile += "\\dialogppc.rc";
                        }
                        else if (symbol == "SMARTPHONE2003_UI_MODEL")
                        {
                            if (strBaseClass == "CFormView")
                                strPlatformRCTemplFile += "\\formviewsp.rc";
                            else
                                strPlatformRCTemplFile += "\\dialogsp.rc";
                        }
                        else
                        {
                            if (strBaseClass == "CFormView")
                                strPlatformRCTemplFile += "\\formview.rc";
                            else
                                strPlatformRCTemplFile += "\\dialog.rc";
                        }

                        oResHelper.OpenResourceFile(strCurrentResource);
                        var strTemporaryResourceFile = RenderToTemporaryResourceFile(strPlatformRCTemplFile);
                        var strSymbolValue = oResHelper.AddResource(strDialogID, strTemporaryResourceFile, "DIALOG");
                        oResHelper.CloseResourceFile();
                        completedResourceFiles.push(strCurrentResource);
                    }
                }
            }

            wizard.AddSymbol("IDD_DIALOG", strSymbolValue.split("=").shift());
        }

        if (strBaseClass == "CDHtmlDialog")
        {
            RenderAddTemplate(wizard, "dhtmldlg.htm", strHTMLFile, selObj, false);
            oResHelper.OpenResourceFile(strProjectRC);
            var strSymbolValue = oResHelper.AddResource(strHTMLID, strProjectPath + strHTMLFile, "HTML");
            if (strSymbolValue == null) return;
            oResHelper.CloseResourceFile();
            wizard.AddSymbol("HTML_ID", strSymbolValue.split("=").shift());
        }

        RenderAddTemplate(wizard, strTemplateHeader, strHeaderFile, selObj, true);
        RenderAddTemplate(wizard, strTemplateImpl, strImplFile, selObj, false);

        // look for InitInstance
        var oInitInstance = false;
        if ((strBaseClass == "CFormView" && bGenDocTemplate) || bAccessibility)
            oInitInstance = FindInitInstance();

        // insert AfxOleInit()
        if (bAccessibility && oInitInstance)
        {
            var strBody = oInitInstance.BodyText;
            if (-1 == strBody.indexOf("AfxOleInit"))
            {
                oInitInstance.StartPointOf(vsCMPartBody, vsCMWhereDefinition).CreateEditPoint().Insert("\tAfxOleInit();\r\n");
                oCM.Synchronize();
            }
        }

        if (strBaseClass == "CFormView" && bGenDocTemplate)
        {
            var strMainFrameCaption = wizard.FindSymbol("DOCUMENT_MAIN_FRAME_CAPTION");
            var strFileNewNameShort = wizard.FindSymbol("DOCUMENT_FILE_NEW_NAME_SHORT");
            var strTypeName = wizard.FindSymbol("DOCUMENT_TYPE_NAME");
            var strFilterName = wizard.FindSymbol("DOCUMENT_FILTER_NAME");
            var strFileExt = wizard.FindSymbol("DOCUMENT_FILE_EXTENSION");
            var strFileTypeID = wizard.FindSymbol("DOCUMENT_FILE_TYPE_ID");
            var strFileNewNameLong = wizard.FindSymbol("DOCUMENT_FILE_NEW_NAME_LONG");
            var strTemp = strMainFrameCaption + "\\n" + strFileNewNameShort + "\\n" + strTypeName + "\\n" + strFilterName + "\\n." + strFileExt + "\\n" + strFileTypeID + "\\n" + strFileNewNameLong;

            var strID = CreateSafeName(strClassName).toUpperCase();
            if (strID.charAt(0) == "C")
                strID = strID.substr(1);
            strID = "IDR_" + strID + "_TMPL";

            if (!bDevice)
            {
                oResHelper.OpenResourceFile(strProjectRC);

                var strIconFile;
                if (strClassName.charAt(0) == "C" || strClassName.charAt(0) == "c")
                    strIconFile = strClassName.substr(1) + ".ico";
                else
                    strIconFile = strClassName + ".ico";
                strIconFile = GetUniqueFileName(strProjectPath, strIconFile);
                wizard.RenderTemplate(strTemplatePath + "\\formview.ico", strProjectPath + "res\\" + strIconFile, true); //don't process ico file
                var strSymbolValue = oResHelper.AddResource(strID, strProjectPath + "res\\" + strIconFile, "ICON", "", true);
                if (strSymbolValue == null) return;
                strID = strSymbolValue.split("=").shift();

                var strSymbolValue2 = oResHelper.AddResource(strID, strTemp, "STRING", "", true);
                if (strSymbolValue2 == null) return;

                if (bMDI)
                    strSymbolValue2 = oResHelper.AddResource(strID, strTemplatePath + "\\formviewmdi.rc", "MENU", "#include <afxres.h>", true);
                else
                    strSymbolValue2 = oResHelper.AddResource(strID, strTemplatePath + "\\formviewsdi.rc", "MENU", "#include <afxres.h>", true);
                if (strSymbolValue2 == null) return;

                oResHelper.CloseResourceFile();
            }
            else
            {
                var configs = selProj.Object.Configurations;
                var completedResourceFiles = new Array();

                var ProjWiz = new ActiveXObject("ProjWiz.SDProjWiz2.4");

                for (var nCntr = 1; nCntr <= configs.Count; nCntr++)
                {
                    var config = configs.Item(nCntr);
                    var strCurrentResource = GetDeviceResourceFileForConfig(config);

                    if (completedResourceFiles.join(";").indexOf(strCurrentResource) == -1)
                    {
                        var platformName = config.Platform.Name;
                        var symbol = ProjWiz.GetBaseNativePlatformProperty(platformName, "UISymbol");

                        oResHelper.OpenResourceFile(strCurrentResource);

                        var strIconFile;
                        if (strClassName.charAt(0) == "C" || strClassName.charAt(0) == "c")
                            strIconFile = strClassName.substr(1) + ".ico";
                        else
                            strIconFile = strClassName + ".ico";
                        strIconFile = GetUniqueFileName(strProjectPath, strIconFile);
                        wizard.RenderTemplate(strTemplatePath + "\\formview.ico", strProjectPath + "res\\" + strIconFile, true); //don't process ico file
                        var strSymbolValue = oResHelper.AddResource(strID, strProjectPath + "res\\" + strIconFile, "ICON", "", true);
                        if (strSymbolValue == null) return;
                        strID = strSymbolValue.split("=").shift();

                        var strSymbolValue2 = oResHelper.AddResource(strID, strTemp, "STRING", "", true);
                        if (strSymbolValue == null) return;

                        // We won't add MENU resource for Pocket PC and Smartphone apps since they would also need the 
                        // corresponding RCDATA resource in order to work. RCDATA resource would be mangled by resource editor 
                        // into unreadable hexadecimal data if we put it into .rc file instead of .rc2 file. So we inclined NOT
                        // to add MENU resource unless it's Windows CE apps.
                        if (symbol == "STANDARDSHELL_UI_MODEL")
                        {
                            oResHelper.AddResource(strID, strTemplatePath + "\\formviewsdi.rc", "MENU", "#include <afxres.h>", true);
                        }
                        if (strSymbolValue2 == null) return;

                        oResHelper.CloseResourceFile();
                        completedResourceFiles.push(strCurrentResource);
                    }
                }
            }

            if (oInitInstance)
            {
                if (!DoesIncludeExist(selProj, strHeaderFile, strProjectCPP))
                    oCM.AddInclude('"' + strHeaderFile + '"', strProjectCPP, vsCMAddPositionEnd);

                var strInsert = "\t{\r\n";
                if (bMDI)
                    strInsert += "\t\tCMultiDocTemplate* pNewDocTemplate = new CMultiDocTemplate(\r\n";
                else
                    strInsert += "\t\tCSingleDocTemplate* pNewDocTemplate = new CSingleDocTemplate(\r\n";
                strInsert += "\t\t\t" + strID + ",\r\n";
                strInsert += "\t\t\tRUNTIME_CLASS(" + strDocumentClass + "),\r\n";
                strInsert += "\t\t\tRUNTIME_CLASS(" + strFrameClass + "),\r\n";
                strInsert += "\t\t\tRUNTIME_CLASS(" + strClassName + "));\r\n";
                strInsert += "\t\tAddDocTemplate(pNewDocTemplate);\r\n";
                strInsert += "\t}\r\n\r\n";
                oInitInstance.StartPointOf(vsCMPartBody, vsCMWhereDefinition).CreateEditPoint().Insert(strInsert);
                oCM.Synchronize();
            }
        }

        if (wizard.FindSymbol("AUTOMATION") || wizard.FindSymbol("CREATABLE"))
        {
            var strProjectIDL = GetProjectFile(selProj, "IDL");
            if (!strProjectIDL || strProjectIDL.length == 0)
                strProjectIDL = GetProjectFile(selProj, "ODL");
            if (strProjectIDL.length)
            {
                // Add #include "olectl.h" to strProject.idl
                if (!DoesIncludeExist(selProj, '"olectl.h"', strProjectIDL))
                    oCM.AddInclude('"olectl.h"', strProjectIDL, vsCMAddPositionEnd);

                // Render coclass.idl and insert into strProject.idl
                AddCoclassFromFile(oCM, "coclass.idl");
            }
        }


        oCM.CommitTransaction();

        var newClass = oCM.Classes.Find(strClassName);
        if(newClass)
            newClass.StartPoint.TryToShow(vsPaneShowTop);

    }
    catch (e)
    {
        if (oCM)
            oCM.AbortTransaction();

        if (e.description.length != 0)
            SetErrorInfo(e);
        return e.number
    }
}

// SIG // Begin signature block
// SIG // MIIanQYJKoZIhvcNAQcCoIIajjCCGooCAQExCzAJBgUr
// SIG // DgMCGgUAMGcGCisGAQQBgjcCAQSgWTBXMDIGCisGAQQB
// SIG // gjcCAR4wJAIBAQQQEODJBs441BGiowAQS9NQkAIBAAIB
// SIG // AAIBAAIBAAIBADAhMAkGBSsOAwIaBQAEFLVJa6hedoBs
// SIG // FLUwuJMYpi9hOJnGoIIVgjCCBMMwggOroAMCAQICEzMA
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
// SIG // BgEEAYI3AgEVMCMGCSqGSIb3DQEJBDEWBBTzwrIjFE3y
// SIG // +WmL8B/mTknP4e2qCjBABgorBgEEAYI3AgEMMTIwMKAW
// SIG // gBQAZABlAGYAYQB1AGwAdAAuAGoAc6EWgBRodHRwOi8v
// SIG // bWljcm9zb2Z0LmNvbTANBgkqhkiG9w0BAQEFAASCAQCa
// SIG // 6+lLScao/hzQ8eU00UC3jOEDTuAbHrfLjwR51Uysg65W
// SIG // wL+kqdpr0aFLUJMZL+6VzhskEmngGUole1qS8pbCcCBA
// SIG // QBB5oiuKKAFXBG3YRAP6K7JWMYYwczUKxviK/Fajyfb5
// SIG // Fqr/AwrZoHM595laURek2Rjxh64WmbXpyD+p9XJ3mzjV
// SIG // lOgbLEmQd2chfdknSgpOyiuoLmutGyh/W+RiInNEBT+P
// SIG // PVOKAYhdD6VWQ2Hlaxrotb1lsbfpr+gLWpzbnYOWTRy2
// SIG // yN/gsiT5lfHlzzu90e+wUO8H9fkABuNCOODIFvc/ZkKl
// SIG // +Ws4x0NjAHQziDVAbQNwOjyeoUe8h75XoYICKDCCAiQG
// SIG // CSqGSIb3DQEJBjGCAhUwggIRAgEBMIGOMHcxCzAJBgNV
// SIG // BAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYD
// SIG // VQQHEwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQg
// SIG // Q29ycG9yYXRpb24xITAfBgNVBAMTGE1pY3Jvc29mdCBU
// SIG // aW1lLVN0YW1wIFBDQQITMwAAADQkMUDJoMF5jQAAAAAA
// SIG // NDAJBgUrDgMCGgUAoF0wGAYJKoZIhvcNAQkDMQsGCSqG
// SIG // SIb3DQEHATAcBgkqhkiG9w0BCQUxDxcNMTMxMDA1MDk1
// SIG // NjAzWjAjBgkqhkiG9w0BCQQxFgQU3qZvOEka0pT6BC4V
// SIG // wT946M124CowDQYJKoZIhvcNAQEFBQAEggEAhc56wwvP
// SIG // rSCJ3kmccusA4Z22MqI0eyG7r3kj4wM1vVAYOSs8cT9J
// SIG // qxWDLOIUKccI2Vsivs/OaC1+EZwIVXhCI4S3bz2YwC2R
// SIG // xTqzQ50wiR0ou2lZWwY7rUSpv5h17hUdiakmbcFte+lM
// SIG // SVdoU0dYm0ro8TQUeS5bZ0UKGVxyESQg6LC4zmRYS0pF
// SIG // bO7+q9g1ecPPHjxcTkN2Btd6yQQ3DNiZ+vBzPFolWk5i
// SIG // HsWka8TDhRq6oxfNMxKkZFOz7/qVEt2FWTM/wDjJhFdT
// SIG // OYf3BF65h7gC2JuiVYG6eNbPQKR9kDKHbou8BiYYRWFY
// SIG // oK8dFSTnvIVFXaCWYNJHbmBP4A==
// SIG // End signature block
