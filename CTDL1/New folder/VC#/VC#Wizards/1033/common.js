// (c) Microsoft Corporation
var vsViewKindPrimary                     = "{00000000-0000-0000-0000-000000000000}";
var vsViewKindDebugging                   = "{7651A700-06E5-11D1-8EBD-00A0C90F26EA}";
var vsViewKindCode                        = "{7651A701-06E5-11D1-8EBD-00A0C90F26EA}";
var vsViewKindDesigner                    = "{7651A702-06E5-11D1-8EBD-00A0C90F26EA}";
var vsViewKindTextView                    = "{7651A703-06E5-11D1-8EBD-00A0C90F26EA}";

var GUID_ItemType_PhysicalFolder          = "{6BB5F8EF-4483-11D3-8BCF-00C04F8EC28C}";
var GUID_ItemType_VirtualFolder           = "{6BB5F8F0-4483-11D3-8BCF-00C04F8EC28C}";
var GUID_ItemType_PhysicalFile            = "{6BB5F8EE-4483-11D3-8BCF-00C04F8EC28C}";

var GUID_Deployment_TemplatePath          = "{54435603-DBB4-11D2-8724-00A0C9A8B90C}";

var gbExceptionThrown = false;

    var vsCMFunctionConstructor = 1;

    var vsCMAddPositionInvalid = -3;
    var vsCMAddPositionDefault = -2;
    var vsCMAddPositionEnd = -1;
    var vsCMAddPositionStart = 0;
//
    var vsCMAccessPublic = 1;
    var vsCMAccessDefault = 32;
//
    var vsCMWhereInvalid = -1;
    var vsCMWhereDefault = 0;
    var vsCMWhereDeclaration = 1;
    var vsCMWhereDefinition = 2;
//
    var vsCMValidateFileExtNone = -1;
    var vsCMValidateFileExtCpp = 0;
    var vsCMValidateFileExtCppSource = 1;
    var vsCMValidateFileExtHtml = 2;
//
    var vsCMElementClass    = 1;
    var vsCMElementFunction = 2;
    var vsCMElementVariable = 3;
    var vsCMElementProperty = 4;
    var vsCMElementNamespace= 5;
    var vsCMElementInterface= 8;
    var vsCMElementStruct   = 11;   
    var vsCMElementUnion    = 12;
    var vsCMElementIDLCoClass=33;
    var vsCMElementVCBase   = 37;


// VS-specific HRESULT failure codes
//
    var OLE_E_PROMPTSAVECANCELLED = -2147221492;
    var VS_E_PROJECTALREADYEXISTS = -2147753952;
    var VS_E_PACKAGENOTLOADED = -2147753953;
    var VS_E_PROJECTNOTLOADED = -2147753954;
    var VS_E_SOLUTIONNOTOPEN = -2147753955;
    var VS_E_SOLUTIONALREADYOPEN = -2147753956;
    var VS_E_INCOMPATIBLEDOCDATA = -2147753962;
    var VS_E_UNSUPPORTEDFORMAT = -2147753963;
    var VS_E_WIZARDBACKBUTTONPRESS = -2147213313;
    var VS_E_WIZCANCEL = VS_E_WIZARDBACKBUTTONPRESS;

////////////////////////////////////////////////////////


/******************************************************************************
 Description: Sets the error info
  nErrNumber: Error code
  strErrDesc: Error description
******************************************************************************/
function SetErrorInfo(oErrorObj)
{
    var oWizard;
    try
    {
        oWizard = wizard;
    }
    catch(e)
    {
        oWizard = window.external;
    }

    try
    {
        var strErrorText = "";

        if(oErrorObj.description.length != 0)
        {
            strErrorText = oErrorObj.description;       
        }
        else
        {
            var strErrorDesc = GetRuntimeErrorDesc(oErrorObj.name);
            if (strErrorDesc.length != 0)
            {
                var L_strScriptRuntimeError_Text = " error occurred while running the script:\r\n\r\n";
                strErrorText = oErrorObj.name + L_strScriptRuntimeError_Text + strErrorDesc;
            }
        }

        oWizard.SetErrorInfo(strErrorText, oErrorObj.number & 0xFFFFFFFF);
    }
    catch(e)
    {
        var L_ErrSettingErrInfo_Text = "An error occurred while setting the error info.";
        oWizard.ReportError(L_ErrSettingErrInfo_Text);
    }
}


/******************************************************************************
         Description: Returns a description for the exception type given
 strRuntimeErrorName: The name of the type of exception occurred
 *****************************************************************************/
function GetRuntimeErrorDesc(strRuntimeErrorName)
{
    var L_strDesc_Text = "";
    switch(strRuntimeErrorName)
    {
        case "ConversionError":
            var L_ConversionError1_Text = "This error occurs whenever there is an attempt to convert";
            var L_ConversionError2_Text = "an object into something to which it cannot be converted.";
            L_strDesc_Text = L_ConversionError1_Text + "\r\n" + L_ConversionError2_Text;
            break;
        case "RangeError":
            var L_RangeError1_Text = "This error occurs when a function is supplied with an argument";
            var L_RangeError2_Text = "that has exceeded its allowable range. For example, this error occurs";
            var L_RangeError3_Text = "if you attempt to construct an Array object with a length that is not";
            var L_RangeError4_Text = "a valid positive integer.";
            L_strDesc_Text = L_RangeError1_Text + "\r\n" + L_RangeError2_Text + "\r\n" + L_RangeError3_Text + "\r\n" + L_RangeError4_Text;
            break;
        case "ReferenceError":
            var L_ReferenceError1_Text = "This error occurs when an invalid reference has been detected.";
            var L_ReferenceError2_Text = "This error will occur, for example, if an expected reference is null.";
            L_strDesc_Text = L_ReferenceError1_Text + "\r\n" + L_ReferenceError2_Text;
            break;
        case "RegExpError":
            var L_RegExpError1_Text = "This error occurs when a compilation error occurs with a regular";
            var L_RegExpError2_Text = "expression. Once the regular expression is compiled, however, this error";
            var L_RegExpError3_Text = "cannot occur. This example will occur, for example, when a regular";
            var L_RegExpError4_Text = "expression is declared with a pattern that has an invalid syntax, or flags";
            var L_RegExpError5_Text = "other than i, g, or m, or if it contains the same flag more than once.";
            L_strDesc_Text = L_RegExpError1_Text + "\r\n" + L_RegExpError2_Text + "\r\n" + L_RegExpError3_Text + "\r\n" + L_RegExpError4_Text + "\r\n" + L_RegExpError5_Text;
            break;
        case "SyntaxError":
            var L_SyntaxError1_Text = "This error occurs when source text is parsed and that source text does not";
            var L_SyntaxError2_Text = "follow correct syntax. This error will occur, for example, if the eval";
            var L_SyntaxError3_Text = "function is called with an argument that is not valid program text.";
            L_strDesc_Text = L_SyntaxError1_Text + "\r\n" + L_SyntaxError2_Text + "\r\n" + L_SyntaxError3_Text;
            break;
        case "TypeError":
            var L_TypeError1_Text = "This error occurs whenever the actual type of an operand does not match the";
            var L_TypeError2_Text = "expected type. An example of when this error occurs is a function call made on";
            var L_TypeError3_Text = "something that is not an object or does not support the call.";
            L_strDesc_Text = L_TypeError1_Text + "\r\n" + L_TypeError2_Text + "\r\n" + L_TypeError3_Text;
            break;
        case "URIError":
            var L_URIError1_Text = "This error occurs when an illegal Uniform Resource Indicator (URI) is detected.";
            var L_URIError2_Text = "For example, this is error occurs when an illegal character is found in a string";
            var L_URIError3_Text = "being encoded or decoded.";
            L_strDesc_Text = L_URIError1_Text + "\r\n" + L_URIError2_Text + "\r\n" + L_URIError3_Text;
            break;
        default:
            break;
    }
    return L_strDesc_Text;
}

/******************************************************************************
 Description: Creates the Templates.inf file.
              Templates.inf is created based on TemplatesInf.txt and contains
              a list of file names to be created by the wizard.
******************************************************************************/
function CreateInfFile()
{
    try
    {
        var oFSO, TemplatesFolder, TemplateFiles, strTemplate;
        oFSO = new ActiveXObject("Scripting.FileSystemObject");

        var TemporaryFolder = 2;
        var oFolder = oFSO.GetSpecialFolder(TemporaryFolder);

        var strTempFolder = oFSO.GetAbsolutePathName(oFolder.Path);
        var strWizTempFile = strTempFolder + "\\" + oFSO.GetTempName();

        var strTemplatePath = wizard.FindSymbol("TEMPLATES_PATH");
        var strInfFile = strTemplatePath + "\\Templates.inf";
        wizard.RenderTemplate(strInfFile, strWizTempFile);

        var oWizTempFile = oFSO.GetFile(strWizTempFile);
        return oWizTempFile;

    }
    catch(e)
    {   
        throw e;
    }
}

/******************************************************************************
 Description: Returns a unique file name
strDirectory: Directory to look for file name in
 strFileName: File name to check.  If unique, same file name is returned.  If 
              not unique, a number from 1-9999999 will be appended.  If not 
              passed in, a unique file name is returned via GetTempName.
******************************************************************************/
function GetUniqueFileName(strDirectory, strFileName)
{
    try
    {
        oFSO = new ActiveXObject("Scripting.FileSystemObject");
        if (!strFileName)
            return oFSO.GetTempName();

        if (strDirectory.length && strDirectory.charAt(strDirectory.length-1) != "\\")
            strDirectory += "\\";

        var strFullPath = strDirectory + strFileName;
        var strName = strFileName.substring(0, strFileName.lastIndexOf("."));
        var strExt = strFileName.substr(strFileName.lastIndexOf("."));

        var nCntr = 0;
        while (oFSO.FileExists(strFullPath))
        {
            nCntr++;
            strFullPath = strDirectory + strName + nCntr + strExt;
        }
        if (nCntr)
            return strName + nCntr + strExt;
        else
            return strFileName;
    }
    catch(e)
    {   
        throw e;
    }
}


/******************************************************************************
 Description: Deletes the file given
        oFSO: File System Object
     strFile: Name of the file to be deleted
******************************************************************************/
function DeleteFile(oFSO, strFile)
{
    try
    {
        if (oFSO.FileExists(strFile))
        {
            var oFile = oFSO.GetFile(strFile);
            oFile.Delete();
        }
    }
    catch(e)
    {   
        throw e;
    }
}

/******************************************************************************
Description: Returns the highest dispid from members of the given interface & 
             all its bases
  oInterface: Interface object
******************************************************************************/
function GetMaxID(oInterface)
{
    var currentMax = 0;
    try
    {
        var funcs = oInterface.Functions;
        if(funcs!=null)
        {
            var nTotal = funcs.Count;
            var nCntr;
            for (nCntr = 1; nCntr <= nTotal; nCntr++)
            {
                var id = funcs(nCntr).Attributes("id");
                if(id!=null)
                {
                    var idval = parseInt(id.Value);
                    if(idval>currentMax)
                        currentMax = idval;
                }
            }
        }
//REMOVE remove this and use Children collection above, if it's implemented
        funcs = oInterface.Variables;
        if(funcs!=null)
        {
            var nTotal = funcs.Count;
            var nCntr;
            for (nCntr = 1; nCntr <= nTotal; nCntr++)
            {
                var id = funcs(nCntr).Attributes("id");
                if(id!=null)
                {
                    var idval = parseInt(id.Value);
                    if(idval>currentMax)
                        currentMax = idval;
                }
            }
        }
        var nextBases = oInterface.Bases;
        var nTotal = nextBases.Count;
        var nCntr;
        for (nCntr = 1; nCntr <= nTotal; nCntr++)
        {
            var nextObject = nextBases(nCntr).Class;
            if(nextObject!=null && nextObject.Name != "IDispatch")
            {
                var idval = GetMaxID(nextObject);
                if(idval>currentMax)
                        currentMax = idval;
            }
        }
        return currentMax;
    }
    catch(e)
    {   
        throw e;
    }
}


/******************************************************************************
 Description: Generates a C++ friendly name
     strName: The old, unfriendly name
******************************************************************************/
function CreateSafeName(strName)
{
    try
    {
        var nLen = strName.length;
        var strSafeName = "";
        
        for (nCntr = 0; nCntr < nLen; nCntr++)
        {
            var cChar = strName.charAt(nCntr);
            if ((cChar >= 'A' && cChar <= 'Z') || (cChar >= 'a' && cChar <= 'z') || 
                    (cChar == '_') || (cChar >= '0' && cChar <= '9'))
            {
                // valid character, so add it
                strSafeName += cChar;
            }
            // otherwize, we skip it
        }
        if (strSafeName=="")
        {
            // if it's empty, we add My
            strSafeName = "My";
        }
        else if (strSafeName.charAt(0) >= '0' && strSafeName.charAt(0) <= '9')
        {
            // if it starts with a digit, we prepend My
            strSafeName = "My" + strSafeName;
        }
        return strSafeName;
    }
    catch(e)
    {   
        throw e;
    }
}


/******************************************************************************
 Description: Called from the wizards html script when 'Finish' is clicked. This
              function in turn calls the wizard control's Finish().
    document: HTML document object
******************************************************************************/
function OnWizFinish(document)
{
    document.body.style.cursor='wait';
    try
    {
        window.external.Finish(document, "ok"); 
    }
    catch(e)
    {
        document.body.style.cursor='default';
        if (e.description.length != 0)
            SetErrorInfo(e.description, e.number);
        return e.number;
    }
}

/******************************************************************************
 Description: Returns a Function object based on the given name
      oClass: Class object
 strFuncName: Name of the function
       oProj: Selected project
******************************************************************************/
function GetMemberFunction(oClass, strFuncName, oProj)
{
    try
    {
        var oFunctions;
        if (oClass)
            oFunctions = oClass.Functions;
        else
        {
            if (!oProj)
                return false;
            oFunctions = oProj.CodeModel.Functions;
        }

        for (var nCntr = 1; nCntr <= oFunctions.Count; nCntr++)
        {
            if (oFunctions(nCntr).Name == strFuncName)
                return oFunctions(nCntr);
        }
        return false;
    }
    catch(e)
    {   
        throw e;
    }
}


/*****************************************************************************
  The following section contains functions that are used by CSharp Projects
  and CSharp Additems. If you like to add a new function that is CSharp
  specific, please add it beyond this point of this file.

                            - CSHARP SECTION -
******************************************************************************/

/******************************************************************************
     Description: Creates a C# project
  strProjectName: Project Name
  strProjectPath: The path that the project will be created in
 strTemplateFile: Project template file e.g. "defualt.csproj"
******************************************************************************/
function CreateCSharpProject(strProjectName, strProjectPath, strTemplateFile)
{
    try
    {
        // Make sure user sees ui.
        dte.SuppressUI = false;
        var strProjTemplatePath = wizard.FindSymbol("PROJECT_TEMPLATE_PATH") + "\\";
        var strProjTemplate = strProjTemplatePath + strTemplateFile; 
        var Solution = dte.Solution;
        var strSolutionName = "";
        if (wizard.FindSymbol("CLOSE_SOLUTION"))
        {
            Solution.Close();
            strSolutionName = wizard.FindSymbol("VS_SOLUTION_NAME");
            if (strSolutionName.length)
            {

                var strSolutionPath = strProjectPath.substr(0, strProjectPath.length - strProjectName.length);
                Solution.Create(strSolutionPath, strSolutionName);
            }
        }

        strProjectNameWithExt = strProjectName + ".csproj";

        var oTarget = wizard.FindSymbol("TARGET");
        var oPrj;
        if (wizard.FindSymbol("WIZARD_TYPE") == vsWizardAddSubProject)  // vsWizardAddSubProject
        {
            var nPos = strProjectPath.search("http://");
            var prjItem
            if(nPos == 0)
                prjItem = oTarget.AddFromTemplate(strProjTemplate, strProjectPath + "/" + strProjectNameWithExt);    
            else
                prjItem = oTarget.AddFromTemplate(strProjTemplate, strProjectPath + "\\" + strProjectNameWithExt);
            oPrj = prjItem.SubProject;
        }
        else
        {
            oPrj = oTarget.AddFromTemplate(strProjTemplate, strProjectPath, strProjectNameWithExt);
        }
        var strNameSpace = "";
        strNameSpace = oPrj.Properties("RootNamespace").Value;
        wizard.AddSymbol("SAFE_NAMESPACE_NAME",  strNameSpace);

        return oPrj;
    }
    catch(e)
    {
        // propagate all errors back to the caller
        throw e;
    }
}

/******************************************************************************
     Description: 
           oProj: Project object
******************************************************************************/
function GetUIReferencesNode(oProj)
{
    var L_strReferencesNode_Text = "References"; // This string needs to be localized
    try
    {
        var UIItemX = GetUIItem(oProj, L_strReferencesNode_Text);
        return UIItemX.UIHierarchyItems;
    }
    catch(e)
    {
    }
}

/******************************************************************************
     Description: Returns the parent of the input hierarchy item. The parent 
                  may be a folder, or a superproject or the solution.
           oProj: Project object
******************************************************************************/
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
        if( obj.ParentProjectItem )
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

/******************************************************************************
 Description: Gets the UIHierarchyItem for the projectitem, sName. If 
              sName is empty, returns the UIHierarchyItem for the project.
       oProj: Project object
       sName: Project item name
******************************************************************************/
function GetUIItem( oProj, sName )
{
    // this functionality will not work properly for projects nested under
    // solution folders until automation support can be added in M2.

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

/******************************************************************************
 description: returns true if this path is a root web project
        strProjectPath: path to the web proj
******************************************************************************/
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

/******************************************************************************
 Description: 
       oProj: Project object
******************************************************************************/
function IsReferencesNodeExpanded(oProj)
{
    UIItem = GetUIReferencesNode(oProj);
    try
    {
        if (UIItem.Expanded == true)
            return true;
    }
    catch(e)
    {
    }
    
    return false;
}

/******************************************************************************
 Description: 
       oProj: Project object
******************************************************************************/
function CollapseReferencesNode(oProj)
{
    UIItem = GetUIReferencesNode(oProj);
    try
    {
        UIItem.Expanded = false;
    }
    catch(e)
    {
    }
}

/******************************************************************************
 Description: 
       oProj: Project object
******************************************************************************/
function GetCSharpReferenceManager(oProj)
{
    var VSProject = oProj.Object;
    var refmanager = VSProject.References;
    return refmanager;
}

/******************************************************************************
 Description: 
       oProj: Project object
******************************************************************************/
function AddReferencesForClass(oProj)
{
    var refmanager = GetCSharpReferenceManager(oProj);
    refmanager.Add("System");
    refmanager.Add("System.Data");
    refmanager.Add("System.XML");
    CollapseReferencesNode(oProj);
}

/******************************************************************************
 Description: 
       oProj: Project object
******************************************************************************/
function AddReferencesForComponent(oProj)
{
    var refmanager = GetCSharpReferenceManager(oProj);
    refmanager.Add("System");
    CollapseReferencesNode(oProj);
}

/******************************************************************************
 Description: 
       oProj: Project object
******************************************************************************/
function AddReferencesForInstaller(oProj)
{
    var refmanager = GetCSharpReferenceManager(oProj);
    refmanager.Add("System");
    refmanager.Add("System.Management");
    refmanager.Add("System.Configuration.Install");
    CollapseReferencesNode(oProj);
}

/******************************************************************************
 Description: 
       oProj: Project object
******************************************************************************/
function AddReferencesForControl(oProj)
{
    var refmanager = GetCSharpReferenceManager(oProj);
    refmanager.Add("System");
    refmanager.Add("System.Data");
    refmanager.Add("System.Drawing");
    refmanager.Add("System.Windows.Forms");
    refmanager.Add("System.XML");
    CollapseReferencesNode(oProj);
}

/******************************************************************************
 Description: 
       oProj: Project object
******************************************************************************/
function AddReferencesForWinForm(oProj)
{
    var refmanager = GetCSharpReferenceManager(oProj);
    refmanager.Add("System");
    refmanager.Add("System.Data");
    refmanager.Add("System.Drawing");
    refmanager.Add("System.Windows.Forms");
    refmanager.Add("System.XML");
    CollapseReferencesNode(oProj);
}

/******************************************************************************
 Description: 
       oProj: Project object
******************************************************************************/
function AddReferencesForWinService(oProj)
{
    var refmanager = GetCSharpReferenceManager(oProj);
    refmanager.Add("System");
    refmanager.Add("System.Data");
    refmanager.Add("System.ServiceProcess");
    refmanager.Add("System.XML");
    CollapseReferencesNode(oProj);
}

/******************************************************************************
 Description: 
       oProj: Project object
******************************************************************************/
function AddReferencesForWebService(oProj)
{
    var refmanager = GetCSharpReferenceManager(oProj);
    refmanager.Add("System");
    refmanager.Add("System.Data");
    refmanager.Add("System.Web");
    refmanager.Add("System.Web.Services");
    refmanager.Add("System.XML");
    CollapseReferencesNode(oProj);
}

/******************************************************************************
 Description: 
       oProj: Project object
******************************************************************************/
function AddReferencesForWebForm(oProj)
{
    var refmanager = GetCSharpReferenceManager(oProj);
    refmanager.Add("System");
    refmanager.Add("System.Drawing");
    refmanager.Add("System.Data");
    refmanager.Add("System.Web");
    refmanager.Add("System.XML");
    CollapseReferencesNode(oProj);
}

/******************************************************************************
 Description: 
       oProj: Project object
******************************************************************************/
function AddReferencesForWebControl(oProj)
{
    var refmanager = GetCSharpReferenceManager(oProj);
    refmanager.Add("System");
    refmanager.Add("System.Drawing");
    refmanager.Add("System.Web");
    CollapseReferencesNode(oProj);
}

/******************************************************************************
 Description: 
       oProj: Project object
    itemName:
******************************************************************************/
function SetStartupPage(oProj, itemName)
{
    var configs = new Enumerator(oProj.ConfigurationManager);
    for(;!configs.atEnd();configs.moveNext())
    {
        configs.item().Properties("StartPage").Value = itemName;
    }
}

/******************************************************************************
    Description: Adds all the files to the project based on the Templates.inf file.
          oProj: Project object
 strProjectName: Project name
 strProjectPath: Project path
        InfFile: Templates.inf file object
    AddItemFile: Wether the wizard is invoked from the Add Item Dialog or not
******************************************************************************/
function AddFilesToCSharpProject(oProj, strProjectName, strProjectPath, InfFile, AddItemFile)
{
    try
    {
        dte.SuppressUI = false;
        var projItems;
        if(AddItemFile)
            projItems = oProj;
        else
            projItems = oProj.ProjectItems;

        var strTemplatePath = wizard.FindSymbol("TEMPLATES_PATH");

        var strTpl = "";
        var strName = "";
        var strDependent = "";

        // if( Not a web project )
        if(strProjectPath.charAt(strProjectPath.length - 1) != "\\")
            strProjectPath += "\\"; 

        var strTextStream = InfFile.OpenAsTextStream(1, -2);
        
        while (!strTextStream.AtEndOfStream)
        {
            // Look to see if there is a dependency on another object.  The inf
            // file will show as:
            //
            // MasterObjectFileName;DependentObjectFileName
            strTpl = strTextStream.ReadLine();
            if (strTpl != "")
            {
                var sc = strTpl.indexOf(";");
                if (sc >= 0) 
                {
                    strName = strTpl.substr(0,sc);
                    if(sc < strTpl.length)
                    {
                        strDependent = strTpl.substr(sc+1);
                    }
                    else 
                    {
                        strDependent = "";
                    }
                }
                else
                {
                    strName = strTpl;
                    strDependent = "";
                }

                var strTarget = "";
                var strFile = "";
                strTarget = GetCSharpTargetName(strName, strProjectName);

                var fso;
                fso = new ActiveXObject("Scripting.FileSystemObject");
                var TemporaryFolder = 2;
                var tfolder = fso.GetSpecialFolder(TemporaryFolder);
                var strTempFolder = fso.GetAbsolutePathName(tfolder.Path);

                var strFile = strTempFolder + "\\" + fso.GetTempName();

                var strClassName = strTarget.split(".");
                wizard.AddSymbol("SAFE_CLASS_NAME", strClassName[0]);
                    wizard.AddSymbol("SAFE_ITEM_NAME", strClassName[0]);

                var strTemplate = strTemplatePath + "\\" + strName;
                var bCopyOnly = false;
                var strExt = strName.substr(strName.lastIndexOf("."));
                if(strExt==".bmp" || strExt==".ico" || strExt==".gif" || strExt==".rtf" || strExt==".css")
                    bCopyOnly = true;
                wizard.RenderTemplate(strTemplate, strFile, bCopyOnly, true);

                var projfile = projItems.AddFromTemplate(strFile, strTarget);
                SafeDeleteFile(fso, strFile);
                
                if(projfile)
                {
                    SetFileProperties(projfile, strName);
                    if (strDependent != "") 
                    {
                        // There is a dependent file.  Add this to the projfile we just added
                        var strDependentTarget = GetCSharpTargetName(strDependent, strProjectName);
                        
                        strTemplate = strTemplatePath + "\\" + strDependent;
                        strFile = strTempFolder + "\\" + fso.GetTempName();
                        strExt = strDependent.substr(strDependent.lastIndexOf("."));
                        if(strExt==".bmp" || strExt==".ico" || strExt==".gif" || strExt==".rtf" || strExt==".css")
                            bCopyOnly = true;
                        else
                            bCopyOnly = false;
                        wizard.RenderTemplate(strTemplate, strFile, bCopyOnly, true);
                        
                        var dependentItem = projfile.ProjectItems.AddFromTemplate(strFile, strDependentTarget);
                        SafeDeleteFile(fso, strFile);
                    }
                }

                var bOpen = false;
                if(AddItemFile)
                    bOpen = true;
                else if (DoOpenFile(strTarget))
                    bOpen = true;

                if(bOpen)
                {
                    var window = projfile.Open(vsViewKindPrimary);
                    window.visible = true;
                }
            }
        }
        strTextStream.Close();
    }
    catch(e)
    {
        strTextStream.Close();
        throw e;
    }
}

/******************************************************************************
    Description: Adds a designer file to the project.
          oProj: Project object
 strProjectName: Project name
 strProjectPath: Project path
strDesignerFile: Designer file name
    AddItemFile: Wether the wizard is invoked from the Add Item Dialog or not
******************************************************************************/
function AddDesignerFileToCSharpWebProject(oProj, strProjectName, strProjectPath, strDesignerFile, AddItemFile)
{
    dte.SuppressUI = false;
    var projItems;
    if(AddItemFile)
        projItems = oProj;
    else
        projItems = oProj.ProjectItems;

    var strTemplatePath = wizard.FindSymbol("TEMPLATES_PATH");

    var strTpl = "";
    var strName = "";

    if (strDesignerFile != "")
    {
        strName = strDesignerFile;
        var strTarget;
        if(!AddItemFile)
        {
            strTarget = GetCSharpTargetName(strName, strProjectName);
        }
        else
        {
            strTarget = wizard.FindSymbol("ITEM_NAME");
        }
        var strClassName = strTarget.split(".");
        wizard.AddSymbol("SAFE_CLASS_NAME", strClassName[0]);
        wizard.AddSymbol("SAFE_ITEM_NAME", strClassName[0]);

        var strTemplate = strTemplatePath + "\\" + strDesignerFile;
        var projfile = projItems.AddFromTemplate(strTemplate, strTarget);
        if(projfile)
            SetFileProperties(projfile, strName);

        var bOpen = false;
        if(AddItemFile)
            bOpen = true;
        else if (DoOpenFile(strTarget))
            bOpen = true;

        if(bOpen)
        {
            var window = projfile.Open(vsViewKindPrimary);
            if(window)
                window.visible = true;
        }
    }
}

/******************************************************************************
 Description: Validate the value of the wizard combo control as a CSharp type.
     oObject: The wizard editable combo control
******************************************************************************/
function ValidateWizComboCSharpType(oObject, strName)
{
    var bValid;
    if(typeof(strName) == "undefined")
        strName = oObject.id;
    if (oObject.ListIndex > -1)
    {
        bValid = true;
    }
    else if(""==oObject.value)
    {
        L_ValidateCSharpTypeEEmpty_Text = " cannot be empty.";
        window.external.ReportError(strName + L_ValidateCSharpTypeEEmpty_Text);
        bValid = false;
    }
    else if ( !window.external.ValidateCLRIdentifier(oObject.value) )
    {
        L_ValidateCSharpType_E_INVALID_TEXT = "Invalid ";
        L_PERIOD_TEXT = ".";
        window.external.ReportError(L_ValidateCSharpType_E_INVALID_TEXT + strName + L_PERIOD_TEXT); 
        bValid = false;
    }
    else
        bValid = true;
    return bValid;
}

/******************************************************************************
 Description: Validate the value of the control as a valid CSharp name.
     oObject: The reference to control
     strName: Control name used by message
******************************************************************************/
function ValidateCSharpName(oObject, strName)
{
    var bValid;
    if(typeof(strName) == "undefined")
        strName = oObject.id;

    if(""==oObject.value)
    {
        L_ValidateCSharpNameEEmpty_Text = " cannot be empty.";
        window.external.ReportError(strName + L_ValidateCSharpNameEEmpty_Text);
        bValid = false;
    }
    else if ( !window.external.ValidateCLRIdentifier(oObject.value) )
    {
        L_ValidateCSharpName_E_INVALID_TEXT = "Invalid ";
        L_PERIOD_TEXT = ".";
        window.external.ReportError(L_ValidateCSharpName_E_INVALID_TEXT + strName + L_PERIOD_TEXT); 
        bValid = false;
    }
    else
        bValid = true;
    return bValid;
}

/******************************************************************************
 Description: Gets the current selected project items from the selection 
                 object if it was passed from Solution Explorer.
     oObject: The wizard context object
******************************************************************************/
function SetTargetFullPath(oObject)
{
    var parent = oObject.Parent;
    var kind = parent.Kind;
    var strFilePath = "";
    var strNameSpace = "";
    if(kind == GUID_ItemType_PhysicalFolder || kind == GUID_ItemType_VirtualFolder)
    {
        strFilePath = parent.FileNames(1);
        strNameSpace = parent.Properties("DefaultNamespace").Value;
    }
    else
    {
        strFilePath =   wizard.FindSymbol("PROJECT_PATH");
        strNameSpace = parent.Properties("RootNamespace").Value;
    }
    wizard.AddSymbol("SAFE_NAMESPACE_NAME",  strNameSpace);
    wizard.AddSymbol("TARGET_FULLPATH",  strFilePath);
}

/******************************************************************************
 Description: Strip spaces from a string
       strin: The string (is in/out param)
******************************************************************************/
function TrimStr(str)
{
    var nLength = str.length;
    var nStartIndex = 0;
    var nEndIndex = nLength-1;

    while (nStartIndex < nLength && (str.charAt(nStartIndex) == ' ' || str.charAt(nStartIndex) == '\t'))
        nStartIndex++;
        
    while (nEndIndex > nStartIndex && (str.charAt(nEndIndex) == ' ' || str.charAt(nEndIndex) == '\t'))
        nEndIndex--;
    
    return str.substring(nStartIndex, nEndIndex+1);
}

/******************************************************************************
 Description: Open the file that contains the TextPoint, then move the cursor to the 
              TextPoint.
         oTP: The reference to TextPoint
******************************************************************************/
function ShowTextPoint(oTP)
{
    try
    {
        oTP.Parent.Parent.ProjectItem.Open(vsViewKindCode).Visible = true;
        var oSel = oTP.Parent.Selection;
        oSel.MoveToPoint(oTP);
        oSel.ActivePoint.TryToShow(vsPaneShowHow.vsPaneShowAsIs);
    }
    catch(e)
    {
        throw(e);
    }
}

/******************************************************************************
 Description: Add the default target schema. 
         
******************************************************************************/
function AddDefaultTargetSchemaToWizard(selProj)
{
    var prjTargetSchema = selProj.Properties("DefaultTargetSchema").Value;
    // 0 = IE3/Nav4
    // 1 = IE5
    // 2 = Nav4
    if(prjTargetSchema == 0)
    {
        wizard.AddSymbol("DEFAULT_TARGET_SCHEMA", "http://schemas.microsoft.com/intellisense/ie3-2nav3-0");
    }
    else if( prjTargetSchema == 2)
    {
        wizard.AddSymbol("DEFAULT_TARGET_SCHEMA", "http://schemas.microsoft.com/intellisense/nav4-0");
    }
    else
    {
        wizard.AddSymbol("DEFAULT_TARGET_SCHEMA", "http://schemas.microsoft.com/intellisense/ie5");
    }
}

/******************************************************************************
 Description: Delete file using file system object. 
******************************************************************************/
function SafeDeleteFile( fso, strFilespec )
{
    if (fso.FileExists(strFilespec))
    {
        var tmpFile = fso.GetFile(strFilespec);
        tmpFile.Delete();
    }
}

// SIG // Begin signature block
// SIG // MIIamwYJKoZIhvcNAQcCoIIajDCCGogCAQExCzAJBgUr
// SIG // DgMCGgUAMGcGCisGAQQBgjcCAQSgWTBXMDIGCisGAQQB
// SIG // gjcCAR4wJAIBAQQQEODJBs441BGiowAQS9NQkAIBAAIB
// SIG // AAIBAAIBAAIBADAhMAkGBSsOAwIaBQAEFO1gpDKxebIl
// SIG // oODxuc5fQxM57+thoIIVgjCCBMMwggOroAMCAQICEzMA
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
// SIG // BgEEAYI3AgEVMCMGCSqGSIb3DQEJBDEWBBSE/WXTorQd
// SIG // t3CF47tJ2EsHneCOEzA+BgorBgEEAYI3AgEMMTAwLqAU
// SIG // gBIAYwBvAG0AbQBvAG4ALgBqAHOhFoAUaHR0cDovL21p
// SIG // Y3Jvc29mdC5jb20wDQYJKoZIhvcNAQEBBQAEggEARZVy
// SIG // j/s97W0CAF9Z8AlKmw3C5uti1ejo0u3ccI6aV6pLPyEh
// SIG // nvfSX1QK1oiYuOO5p2XHRf53/mK+V2l5ZsbuxWrqOyAF
// SIG // sWrVdc7sDDrXN92EyHjxXirk2nOc1yVNUQepd6Ycu3UW
// SIG // WG5krrmWn8DRdHjVkfDXf6V8fagNNfbb5/B5EKoxgrhB
// SIG // pTg1R35wPXPySYm88NGrAoR6ZVFoSfERE30aebAr1A9g
// SIG // fGC77PF+YIsFRDlxGV+1LBmIc81pui53lIOA1lSS4V4q
// SIG // EraL5ZuVPPOAstUX4sTSnhLGiMudou78fltyUOr/k3jX
// SIG // IGobl5dTYu63+By1Ea+dty/MIRLPNaGCAigwggIkBgkq
// SIG // hkiG9w0BCQYxggIVMIICEQIBATCBjjB3MQswCQYDVQQG
// SIG // EwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UE
// SIG // BxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENv
// SIG // cnBvcmF0aW9uMSEwHwYDVQQDExhNaWNyb3NvZnQgVGlt
// SIG // ZS1TdGFtcCBQQ0ECEzMAAAA0JDFAyaDBeY0AAAAAADQw
// SIG // CQYFKw4DAhoFAKBdMBgGCSqGSIb3DQEJAzELBgkqhkiG
// SIG // 9w0BBwEwHAYJKoZIhvcNAQkFMQ8XDTEzMTAwNTA4NTQx
// SIG // OVowIwYJKoZIhvcNAQkEMRYEFDZ+UfQlpaq8E7FoLvI4
// SIG // 652WxNAvMA0GCSqGSIb3DQEBBQUABIIBAJDzlc48C4Ic
// SIG // rja+FtBnguMMxs0nYAH/crSrt/rCgVs4xQySsJqpt4xm
// SIG // ZapQP10B+oI6pSqbFE/LtwWXczM8JkUUf9g1SZ3jQz41
// SIG // IYnLkYI/6kwSdAnHxgGySQIPPB3ZO4O5CEDkw/ezprsL
// SIG // mRVAl/wt1ilP7Pa+vjM/HvGtIWgoiGJLkL6jRlWAAFeQ
// SIG // 2ZOaVpxVC/84WU2biVo1NTzVs/7C9BTmRyJ6pPfq62lW
// SIG // bbgoJNUN8KJ2/NIJ3DrlQhJ1EulQZoEmjtNxZIu11CVb
// SIG // R2NN5SQZKyqxMunTow/VNZSV9GVnY5C4dycsGBZfRpO8
// SIG // VIW6lu307mIbuZQzzOu5J4o=
// SIG // End signature block
