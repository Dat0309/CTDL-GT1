//
// Copyright (c) Microsoft Corporation 2001-2002. All rights reserved.
//

var vsViewKindPrimary           = "{00000000-0000-0000-0000-000000000000}";
var vsViewKindDebugging         = "{7651A700-06E5-11D1-8EBD-00A0C90F26EA}";
var vsViewKindCode              = "{7651A701-06E5-11D1-8EBD-00A0C90F26EA}";
var vsViewKindDesigner          = "{7651A702-06E5-11D1-8EBD-00A0C90F26EA}";
var vsViewKindTextView          = "{7651A703-06E5-11D1-8EBD-00A0C90F26EA}";
var vsWindowKindSolutionExplorer= "{3AE79031-E1BC-11D0-8F78-00A0C9110057}";

var GUID_ItemType_PhysicalFolder= "{6BB5F8EF-4483-11D3-8BCF-00C04F8EC28C}";
var GUID_ItemType_VirtualFolder = "{6BB5F8F0-4483-11D3-8BCF-00C04F8EC28C}";
var GUID_ItemType_PhysicalFile  = "{6BB5F8EE-4483-11D3-8BCF-00C04F8EC28C}";

var vsWizardAddSubProject       = "{0F90E1D2-4999-11D1-B6D1-00A0C90F2744}";


function CreateVSProject(strProjectName, strProjectExt, strProjectPath, strTemplateFile)
{
    var solution = dte.Solution;
    var strSolutionName = "";

    if (wizard.FindSymbol("CLOSE_SOLUTION"))
    {
        solution.Close();
        strSolutionName = wizard.FindSymbol("VS_SOLUTION_NAME");
        if (strSolutionName.length)
        {
            var strSolutionPath = strProjectPath.substr(0, strProjectPath.length - strProjectName.length);
            solution.Create(strSolutionPath, strSolutionName);
        }
    }

    var strProjectFile = strProjectName + strProjectExt;

    var oTarget = wizard.FindSymbol("TARGET");
    var project;

    if (wizard.FindSymbol("WIZARD_TYPE") == vsWizardAddSubProject)
    {
        var prjItem = oTarget.AddFromTemplate(strTemplateFile, strProjectPath+"\\"+strProjectFile);
        project = prjItem.SubProject;
    }
    else
    {
        project = oTarget.AddFromTemplate(strTemplateFile, strProjectPath, strProjectFile);
    }
    return project;
}

function AddFileToVSProject(strItemName, selProj, selObj, strTemplateFile, bValidate)
{
    fso = new ActiveXObject("Scripting.FileSystemObject");
    AddBaseNameToWizard("SAFE_ITEM_NAME", strItemName, ".");

    if( bValidate )
    {
        var strSafeName = wizard.FindSymbol( "SAFE_ITEM_NAME" );
        if( !wizard.ValidateCLRIdentifier( strSafeName, false ))
        {
            strSafeName = "_" + strSafeName;
            wizard.AddSymbol("SAFE_ITEM_NAME", strSafeName);
        }
    }

    var isReferenceExpanded;
    if(selProj != null) 
        isReferenceExpanded = IsReferenceExpanded(selProj);

    // Get project item for selObj collection
    var folder = selObj.parent;

    var strURL = folder.Properties("URL").Value;
    if (strURL.length > 0) //if a web project
        var strProjectPath = folder.Properties("LocalPath");
    else
        var strProjectPath = folder.Properties("FullPath");

    var strItemFile = strProjectPath + strItemName;

    var fsoTemporaryFolder = 2;
    var tFolder = fso.GetSpecialFolder(fsoTemporaryFolder);
    var strTempName = fso.GetTempName();
    var strTempFile = tFolder.Path + "\\" + strTempName;
    SafeDeleteFile(fso, strTempFile);
    
    wizard.RenderTemplate(strTemplateFile, strTempFile, false);
    var item = folder.ProjectItems.AddFromTemplate(strTempFile, strItemName );
    SafeDeleteFile(fso, strTempFile);

    if(selProj != null)
    {
        if(isReferenceExpanded == true)
 	    ExpandReferencesNode(selProj);
        else
            CollapseReferencesNode(selProj);
    }

    return item;
}

function AddDependentFileToVSProject(strItemName, projectItem, strTemplateFilePath)
{
    fso = new ActiveXObject("Scripting.FileSystemObject");
    
    var fsoTemporaryFolder = 2;
    var tFolder = fso.GetSpecialFolder(fsoTemporaryFolder);
    var strTempName = fso.GetTempName();
    var strTempFile = tFolder.Path + "\\" + strTempName;
    SafeDeleteFile(fso, strTempFile);
    
    wizard.RenderTemplate(strTemplateFilePath, strTempFile, false);
    var item = projectItem.ProjectItems.AddFromTemplate(strTempFile, strItemName);
    SafeDeleteFile(fso, strTempFile);
    
    return item;
}

function AddBaseNameToWizard( strName, strValue, strDelim )
{
    var strLegalItemName;
    var nIndex = strValue.lastIndexOf(strDelim);
    if( nIndex > 0 )
        strLegalItemName = strValue.substr(0, nIndex);
    else
        strLegalItemName = strValue;
    wizard.AddSymbol(strName, CreateLegalIdentifier(strLegalItemName));
}

function SafeDeleteFile( fso, strFilespec )
{
	if (fso.FileExists(strFilespec))
	{
		var tmpFile = fso.GetFile(strFilespec);
		tmpFile.Delete();
	}
}

function GetDependentFileName(strMainFileName, strMainExtension, strDependentExtension)
{
    var strDependentFileName = strMainFileName;
    
    // If main file name is Something.vb, the dependent file name will be Something.resx
    // Otherwise, if main file name is Something.ext, the dependent file name will be Something.ext.resx.
    
    if (strMainFileName.toLowerCase().lastIndexOf(strMainExtension.toLowerCase()) == 
        strMainFileName.length - strMainExtension.length)
    {
        strDependentFileName = strMainFileName.substring(0, strMainFileName.length - strMainExtension.length) +
            strDependentExtension;
    }
    else 
    {
        strDependentFileName = strMainFileName + strDependentExtension;
    }
    
    return strDependentFileName;
}

function CreateLegalIdentifier(strName)
{
    var nLen = strName.length;
    var strLegalName = "";
    var cChar = strName.charAt(0);
    switch(cChar)
    {
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
            strLegalName += "_";
            break;
    }
    for (nCntr = 0; nCntr < nLen; nCntr++)
    {
        cChar = strName.charAt(nCntr);
        switch(cChar)
        {
            case " ":
            case "~":
            case "&":
            case "'":
            case "#":
            case "!":
            case "@":
            case "$":
            case "%":
            case "^":
            case "(":
            case ")":
            case "-":
            case "+":
            case "=":
            case "{":
            case "}":
            case "[":
            case "]":
            case ";":
            case ",":
            case "`":
            case ".":
                strLegalName += "_";
                break;
            default:
                strLegalName += cChar;
                break;
        }
    }
    return strLegalName;
}

function ReplaceDots(strName)
{
    var nLen = strName.length;
    var strLegalName = "";
    for (nCntr = 0; nCntr < nLen; nCntr++)
    {
        var cChar = strName.charAt(nCntr);
        if (cChar == ".")
                strLegalName += "_";
        else
                strLegalName += cChar;
    }
    return strLegalName;
}


function AddNamespaceSymbolToWizard(dtex, wizardx, selObj) 
{
    var parent = selObj.Parent;
    var kind = parent.Kind;
    if(kind == GUID_ItemType_PhysicalFolder)
    {
        wizardx.AddSymbol("NAMESPACE", parent.Properties("DefaultNamespace").Value);
    }
    else
    {
        wizardx.AddSymbol("NAMESPACE", parent.Properties("RootNamespace").Value);
    }
}


function AddDefaultClientScriptToWizard(dtex, wizardx, selProj)
{
    var prjScriptLang = selProj.Properties("DefaultClientScript").Value;
    // 0 = JScript
    // 1 = VBScript
    if(prjScriptLang == 0)
    {
        wizardx.AddSymbol("DEFAULT_CLIENT_SCRIPT", "JavaScript");
    }
    else
    {
        wizardx.AddSymbol("DEFAULT_CLIENT_SCRIPT", "VBScript");
    }
}

function AddDefaultTargetSchemaToWizard(dtex, wizardx, selProj)
{
    var prjTargetSchema = selProj.Properties("DefaultTargetSchema").Value;
    // 0 = IE3/Nav4
    // 1 = IE5
    // 2 = Nav4
    if(prjTargetSchema == 0)
    {
        wizardx.AddSymbol("DEFAULT_TARGET_SCHEMA", "http://schemas.microsoft.com/intellisense/ie3-2nav3-0");
    }
    else if( prjTargetSchema == 1)
    {
        wizardx.AddSymbol("DEFAULT_TARGET_SCHEMA", "http://schemas.microsoft.com/intellisense/ie5");
    }
    else
    {
        wizardx.AddSymbol("DEFAULT_TARGET_SCHEMA", "http://schemas.microsoft.com/intellisense/nav4-0");
    }
}

function AddDefaultDefaultHTMLPageLayoutToWizard(dtex, wizardx, selProj)
{
    var prjPageLayout = selProj.Properties("DefaultHTMLPageLayout").Value;
    // 0 = FlowLayout
    // 1 = GridLayout
    if(prjPageLayout == 0)
    {
        wizardx.AddSymbol("DEFAULT_HTML_LAYOUT", "FlowLayout");
    }
    else
    {
        wizardx.AddSymbol("DEFAULT_HTML_LAYOUT", "GridLayout");
    }
}
function AddDefaultWebFormsPropertiesToWizard(dtex, wizardx, selProj)
{
    AddDefaultClientScriptToWizard(dtex, wizardx, selProj);
    AddDefaultTargetSchemaToWizard(dtex, wizardx, selProj);
    AddDefaultDefaultHTMLPageLayoutToWizard(dtex, wizardx, selProj);
}


function IsReferenceExpanded(oProj)
{
    UIItem = GetUIReferencesNode(oProj);
    if( UIItem != null )
        return UIItem.Expanded;
}		

function ExpandReferencesNode(oProj)
{
    UIItem = GetUIReferencesNode(oProj);
    if( UIItem != null )
        UIItem.Expanded = true;
}

function CollapseReferencesNode(oProj)
{
    UIItem = GetUIReferencesNode(oProj);
    if( UIItem != null )
        UIItem.Expanded = false;
}

function GetUIReferencesNode(oProj)
{
    var L_strREferencesNode_Text = "References"; // This string needs to be localized
    var UIItemX = null;

    UIItemX = GetUIItem( oProj, L_strREferencesNode_Text);
    if( UIItemX )
        return UIItemX.UIHierarchyItems;
    else
        return null;
}

//
// Return the parent of the input hierarchy item. The parent may be a folder, 
// or a superproject or the solution.
//
function getParent(obj)
{
    var parent = obj.Collection.parent;
    //
    // is obj a project ?
    //
    if( parent == dte )
    {
        //
        // is obj a sub-project ?
        //
        if( IsSubProject(obj) )
        {                
            parent = obj.ParentProjectItem.Collection.parent;
        }
        else
        {
            //
            // obj is a top-level project
            //
            parent = null;
        }
    }
    return parent;    
}

function IsSubProject(oProj)
{
    try
    {
        var Parent = oProj.ParentProjectItem;
        if(Parent)
            return true;
        return false;
    }
    catch(e)
    {
        return false;
    }
}

//
// get the UIHierarchyItem for the projectitem, sName. 
// If sName is empty, returns the UIHierarchyItem for the project
//
function GetUIItem( oProj, sName )
{
    try
    {
        if( sName != "" )
        {
            sSaveName = sName;
            sName = oProj.Name + "\\" + sSaveName;
        }
        else
        {
            sName = oProj.Name;
        }

        var parent = getParent( oProj );

        while( parent != null )
        {
            sSaveName = sName;
            sName = parent.Name + "\\" + sSaveName;
            parent = getParent( parent );

        }

        //
        // we have arrived at the top of the soltuion explorer hierarchy - return the sName index into the solution's UIHierarchyItem collection
        //
        var strSolutionName = dte.Solution.Properties("Name");
        var vsHierObject = dte.Windows.Item(vsWindowKindSolutionExplorer).Object;   
        return vsHierObject.GetItem( strSolutionName + "\\" + sName );
    }	
    catch(e)
    {
        return null;
    }
}

//
// Finds the file already exist on the project
//
function DoesFileExistInProj(oProj, sName )
{
    try
    {
        return oProj.ProjectItems.Item(sName);

    }	
    catch(e)
    {
        return null;
    }
}

function SetErrorInfo(error)
{
    if(error.description.length > 0)
    {
        wizard.SetErrorInfo(error.description, error.number & 0xFFFFFFFF);
    }
}

function ReportError( strErr )
{
    if( dte.SuppressUI == false )
    {
        wizard.ReportError(strErr);
    }
}

function ProjectIsARootWeb(strProjectPath)
{
    // Returns true if strProjectPath is a root web. Is does this by counting
    // the forward slashes. Web roots are of the form: http://server. Assuming
    // no trailing slash, a web root will have 2 forward slashes, non webroots will
    // have 3 or more slashes. 
    var nCntr = 0;
    var cSlashes = 0;
    var nLen = strProjectPath.length - 1;   // Ignore last character
    for (nCntr = 0; nCntr < nLen; nCntr++)
    {
        // Count the forward slashes
        if(strProjectPath.charAt(nCntr) == "/")
            cSlashes++;
    }
    
    if(cSlashes == 2)
        return true;
    return false;
}

// SIG // Begin signature block
// SIG // MIIamwYJKoZIhvcNAQcCoIIajDCCGogCAQExCzAJBgUr
// SIG // DgMCGgUAMGcGCisGAQQBgjcCAQSgWTBXMDIGCisGAQQB
// SIG // gjcCAR4wJAIBAQQQEODJBs441BGiowAQS9NQkAIBAAIB
// SIG // AAIBAAIBAAIBADAhMAkGBSsOAwIaBQAEFISZU8V51ohq
// SIG // olQsjxKxuC9fEXcsoIIVgjCCBMMwggOroAMCAQICEzMA
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
// SIG // L54/LlUWa8kTo/0xggSFMIIEgQIBATCBkDB5MQswCQYD
// SIG // VQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4G
// SIG // A1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0
// SIG // IENvcnBvcmF0aW9uMSMwIQYDVQQDExpNaWNyb3NvZnQg
// SIG // Q29kZSBTaWduaW5nIFBDQQITMwAAALARrwqL0Duf3QAB
// SIG // AAAAsDAJBgUrDgMCGgUAoIGeMBkGCSqGSIb3DQEJAzEM
// SIG // BgorBgEEAYI3AgEEMBwGCisGAQQBgjcCAQsxDjAMBgor
// SIG // BgEEAYI3AgEVMCMGCSqGSIb3DQEJBDEWBBR/vveoG4pK
// SIG // PSIsyg8MN6t9RQIORDA+BgorBgEEAYI3AgEMMTAwLqAU
// SIG // gBIAYwBvAG0AbQBvAG4ALgBqAHOhFoAUaHR0cDovL21p
// SIG // Y3Jvc29mdC5jb20wDQYJKoZIhvcNAQEBBQAEggEAvNAI
// SIG // YCQ2agtbxlY2xXleEb53tub9uFXBYSSh76yYZ0abcZq2
// SIG // ye9kllhKdZr99hjOnHmGVHoLILFGeORG6X/M95ePRFE1
// SIG // 490/7T7RaXoVMbYxnmZa8/jIYRP9uOcJHK/vu+pUSNo7
// SIG // FA8X/IHkI3Q86gEVTooUQt5kAIiP2DXspBZvNEVx670H
// SIG // sPXEjA/A4nrmuDammQpuoSbp3Uil+2fRe05QxjEjtoSv
// SIG // GYozJUC3/P4+Q18yT81WI9oN2INzgJPwOLY3MxglOIXe
// SIG // qlR4AZptTy8L+81bmlbv4YSlJKXiywq49zzJV7hYmMAN
// SIG // zLUnGOaK6x1SEzKL2dRjBkBt9jy8qKGCAigwggIkBgkq
// SIG // hkiG9w0BCQYxggIVMIICEQIBATCBjjB3MQswCQYDVQQG
// SIG // EwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UE
// SIG // BxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENv
// SIG // cnBvcmF0aW9uMSEwHwYDVQQDExhNaWNyb3NvZnQgVGlt
// SIG // ZS1TdGFtcCBQQ0ECEzMAAAA0JDFAyaDBeY0AAAAAADQw
// SIG // CQYFKw4DAhoFAKBdMBgGCSqGSIb3DQEJAzELBgkqhkiG
// SIG // 9w0BBwEwHAYJKoZIhvcNAQkFMQ8XDTEzMTAwNTA4NTQx
// SIG // OVowIwYJKoZIhvcNAQkEMRYEFMSXB3+WRrDRFmPZmUWM
// SIG // 53TQC21VMA0GCSqGSIb3DQEBBQUABIIBAFo2orJM6lF3
// SIG // IDGYr51ew0V7IBmwZvEjxZQOBF1BGLanMybRjgULJbZm
// SIG // ncKA5yT0B6XnrGd8Z3fqw7BZRStya+yC97bfNxRj4cbX
// SIG // 54ID5MqTa7Tj34DO/E3erXrMQkfd4k73+DuvrAz1WGxI
// SIG // s0wGG+eCx2Hu1V5acmZBG6xfDBiiWI19AUdPMULzlxIb
// SIG // 0EW5SnyPKTLUK/TE2H4seKXDY7wEW2aZ5dhEE5OTyKAN
// SIG // nEnnFCBgDzz2DotCQJa+y81JeHFbq89EmSCDowyaYzsj
// SIG // 04aeineWk6OOb9ttvmWCf/is1mhrMUrht1R+pAygPFUf
// SIG // 0e8xhRr5BE6WCKsG5EecrNg=
// SIG // End signature block
