// Copyright (c) Microsoft Corporation. All rights reserved.
// Script for Add Property Wizard

var aryParamVT = new Array;
var aryParamTypeNames = new Array;
var aryParamAttribs = new Array;
var bEmbeddedIDL = false;

function OnPrep(selProj, selObj)
{
	var L_WizardDialogTitle_Text = "Add Propery Wizard";
	return PrepCodeWizard(selProj, L_WizardDialogTitle_Text);
}

function OnFinish(selProj, oInterface)
{
	var oCM;
	try
	{
		oCM	= selProj.CodeModel;
		oCM.Synchronize();

		var L_TRANSACTION_Text = "Add Property";
		oCM.StartTransaction(L_TRANSACTION_Text);

		if (typeDynamicLibrary == selProj.Object.Configurations(1).ConfigurationType)
			wizard.AddSymbol("DLL", true);
		else
			wizard.AddSymbol("DLL", false);

		var bMFC = wizard.FindSymbol("MFC_CLASS");

		// IDL changes
		//
		if (oInterface.Language==vsCMLanguageIDL)
		{
			bEmbeddedIDL = false;
		}
		else
		{
			bEmbeddedIDL = true;
		}

		var bIsManaged = oInterface.IsManaged;

		if (bIsManaged)
		{
			AddToManaged(oInterface, true);
		}
		else
		{
			InitParams(bMFC);
			var strAttributes = GetAttributes();

			if (bMFC)
				AddToIDLMFC(oInterface, strAttributes);
			else
			{
				AddToIDL(oInterface, strAttributes);
			}
		}

		// Class changes
		//

		var aryClasses = new Array();
		GetInterfaceClass(oCM, oInterface.Name, oInterface.FullName, aryClasses, true);
		for (var nIndex = 0; nIndex < aryClasses.length; nIndex++)
		{
			var oClass = aryClasses[nIndex];

			// same code for COleControl-derived class
			if (bMFC && oClass.IsDerivedFrom("CCmdTarget"))
				AddToClassMFC(oClass, selProj);
			// not CCmdTarget-derived
			else if (bIsManaged)
				AddToManaged(oClass, false);
			else
				AddToClass(oClass, selProj);
		}
		oCM.CommitTransaction();
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

function AddToClass(oClass, oProj)
{
	try
	{
		var strExternalName	= wizard.FindSymbol("EXTERNAL_NAME");
		var strType			= wizard.FindSymbol("TYPE");
		var strReturnType	= wizard.FindSymbol("RETURN_TYPE");
		var bGenerateGet	= wizard.FindSymbol("GENERATE_GET");
		var bGeneratePut	= wizard.FindSymbol("GENERATE_PUT");
		var bPropPutRef		= wizard.FindSymbol("PROPPUTREF");
		var nNumParams		= wizard.FindSymbol("NUM_PARAMETERS");

		// if derived from CComObjectRootEx or interface
		// add prototype and implementation
		var strCPP = oClass.Location(vsCMWhereDefault);
		strCPP = strCPP.substr(strCPP.lastIndexOf("\\")+1);
		strCPP = strCPP.substring(0, strCPP.lastIndexOf(".")+1) + "cpp";
		if (!oProj.Object.Files(strCPP))
			strCPP = "";

		var oGetFunction = false;
		var oPutFunction = false;

		var config = oProj.Object.Configurations(1);
		var MidlTool = config.Tools("VCMidlTool");
		var bDefaultUnsigned = (MidlTool.DefaultCharType==midlCharUnsigned);

		var strParams = "";
		for (nCntr = 0; nCntr < nNumParams; nCntr++)
		{
			if (nCntr > 0)
				strParams += ", ";
			if (aryParamTypeNames[nCntr].substr(0, 10) == "SAFEARRAY(")
			{
				strParams += "SAFEARRAY * " + aryParamTypeNames[nCntr].substr(aryParamTypeNames[nCntr].indexOf(')') + 2);
			}
			else
				strParams += AddUnsignedToChar(aryParamTypeNames[nCntr], bDefaultUnsigned)
		}
		if (strParams.length)
			strParams += ", ";


		strType = AddUnsignedToChar(strType, bDefaultUnsigned);
		strReturnType = AddUnsignedToChar(strReturnType, bDefaultUnsigned);

		if (bGenerateGet)
		{
			oGetFunction = oClass.AddFunction("get_" + strExternalName + "(" + strParams + strType + "* pVal)", vsCMFunctionComMethod, strReturnType, vsCMAddPositionEnd, vsCMAccessPublic, strCPP);
			if (oGetFunction)
				oGetFunction.BodyText = GetFunctionBodyForReturnType(strReturnType);
		}
		if (bGeneratePut)
		{
			if (bPropPutRef)
				oPutFunction = oClass.AddFunction("putref_" + strExternalName + "(" + strParams + strType + " newVal)", vsCMFunctionComMethod, strReturnType, vsCMAddPositionEnd, vsCMAccessPublic, strCPP);
			else
				oPutFunction = oClass.AddFunction("put_" + strExternalName + "(" + strParams + strType + " newVal)", vsCMFunctionComMethod, strReturnType, vsCMAddPositionEnd, vsCMAccessPublic, strCPP);
			if (oPutFunction)
				oPutFunction.BodyText = GetFunctionBodyForReturnType(strReturnType);
		}
	}
	catch(e)
	{
		throw e;
	}
}

function AddToClassMFC(oClass, oProj)
{
	try
	{
		var strExternalName			= wizard.FindSymbol("EXTERNAL_NAME");
		var strType					= wizard.FindSymbol("TYPE");
		var strTypeVT				= wizard.FindSymbol("TYPE_VT");
		var strVariableName			= wizard.FindSymbol("VARIABLE_NAME");
		var strNotificationFunction	= wizard.FindSymbol("NOTIFICATION_FUNCTION");
		var strGetFunction			= wizard.FindSymbol("GET_FUNCTION");
		var strSetFunction			= wizard.FindSymbol("SET_FUNCTION");
		var bStock					= wizard.FindSymbol("STOCK");
		var bMemberVariable			= wizard.FindSymbol("MEMBER_VARIABLE");
		var nNumParams				= wizard.FindSymbol("NUM_PARAMETERS");
		var bDefaultProperty		= wizard.FindSymbol("DEFAULT_PROPERTY");
		var strDispid				= wizard.FindSymbol("DISPID");

		var strClassName = oClass.Name;

		// add to Dispatch map
		var oMap = oClass.Maps.Find("DISPATCH");
		if (bStock)
		{
			oMap.AddEntry(wizard.FindSymbol("STOCK_MACRO"), vsCMAddPositionEnd);
		}
		else
		{
			var config = oProj.Object.Configurations(1);
			var MidlTool = config.Tools("VCMidlTool");
			var bDefaultUnsigned = (MidlTool.DefaultCharType==midlCharUnsigned);

			if (bMemberVariable)
			{
				// add to dispatch map
				var strMapItem;
				if (strNotificationFunction.length)
				{
					// add notification function
					var strCPP = oMap.Location(vsCMWhereDefault);
					strCPP = strCPP.substr(strCPP.lastIndexOf("\\")+1);
					var oFunction = oClass.AddFunction(strNotificationFunction, vsCMFunctionFunction, "void", vsCMAddPositionEnd, vsCMAccessProtected, strCPP);
					oFunction.BodyText = GetFunctionBodyForSet(oClass);
					strMapItem = "DISP_PROPERTY_NOTIFY_ID";
				}
				else
					strMapItem = "DISP_PROPERTY_ID";
				strMapItem += "(" + strClassName;
				strMapItem += ', "' + strExternalName + '"';
				strMapItem += ", dispid" + strExternalName;
				strMapItem += ", " + strVariableName;

				if (strNotificationFunction.length)
					strMapItem += ", " + strNotificationFunction;
				strMapItem += ", " + strTypeVT + ")";

				oMap.AddEntry(strMapItem, vsCMAddPositionEnd);

				// add member variable
				if (strType == "BSTR")
					oClass.AddVariable(strVariableName, "CString", vsCMAddPositionEnd, vsCMAccessProtected);
				else
				{
					strType = AddUnsignedToChar(strType, bDefaultUnsigned);
					oClass.AddVariable(strVariableName, strType, vsCMAddPositionEnd, vsCMAccessProtected);
				}
			}
			// Get/Set functions
			else
			{
				// add to dispatch map
				var strMapItem;
				if (nNumParams)
					strMapItem = "DISP_PROPERTY_PARAM_ID";
				else
					strMapItem = "DISP_PROPERTY_EX_ID";

				strMapItem += "(" + strClassName;
				strMapItem += ', "' + strExternalName + '"';
				strMapItem += ", dispid" + strExternalName;
				if (strGetFunction.length)
					strMapItem += ", " + strGetFunction;
				else
					strMapItem += ", GetNotSupported";
				if (strSetFunction.length)
					strMapItem += ", " + strSetFunction;
				else
					strMapItem += ", SetNotSupported";
				strMapItem += ", " + strTypeVT;

				if (nNumParams)
				{
					strMapItem += ",";
					for (nCntr = 0; nCntr < aryParamVT.length; nCntr++)
					{
							strMapItem += " " + aryParamVT[nCntr];
					}
				}
				strMapItem += ")";
				oMap.AddEntry(strMapItem, vsCMAddPositionEnd);


				// add Get and Set functions
				var strCPP = oMap.Location(vsCMWhereDefault);
				strCPP = strCPP.substr(strCPP.lastIndexOf("\\")+1);
				var oGetFunction = false;
				var oSetFunction = false;

				var strParams = "";
				for (nCntr = 0; nCntr < nNumParams; nCntr++)
				{
					if (nCntr > 0)
						strParams += ", ";
					if (aryParamTypeNames[nCntr].substr(0, 4) == "BSTR" &&
						aryParamTypeNames[nCntr].substr(0, 5) != "BSTR*" &&
						aryParamTypeNames[nCntr].substr(0, 6) != "BSTR *")
					{
						strParams += "LPCTSTR " + aryParamTypeNames[nCntr].substr(5);
					}
					else
						strParams += AddUnsignedToChar(aryParamTypeNames[nCntr], bDefaultUnsigned)
				}

				strType = AddUnsignedToChar(strType, bDefaultUnsigned);
				if (strGetFunction.length)
				{
					oGetFunction = oClass.AddFunction(strGetFunction + "(" + strParams + ")", vsCMFunctionFunction, strType, vsCMAddPositionEnd, vsCMAccessProtected, strCPP);
					if (oGetFunction)
						oGetFunction.BodyText = GetFunctionBodyForReturnType(strType);
				}
				if (strSetFunction.length)
				{
					if (strParams.length)
						strParams += ", ";
					if (strType == "BSTR")
						strType = "LPCTSTR";
					oSetFunction = oClass.AddFunction(strSetFunction + "(" + strParams + strType + " " + GetParamName(strType) + ")", vsCMFunctionFunction, "void", vsCMAddPositionEnd, vsCMAccessProtected, strCPP);
					if (oSetFunction)
						oSetFunction.BodyText = GetFunctionBodyForSet(oClass);
				}
			}

			// add dispidXXX in enum in Class.h
			var oEnum;
			if (oClass.Enums.Count)
				oEnum = oClass.Enums(1);
			else
				oEnum = oClass.AddEnum("", vsCMAddPositionEnd);

			var oEnumMember = oEnum.AddMember("dispid" + strExternalName, vsCMAddPositionEnd);
			oEnumMember.InitExpression = strDispid;

			if (bDefaultProperty)
			{
				var strMapItem = "DISP_DEFVALUE";
				strMapItem += "(" + strClassName;
				strMapItem += ', "' + strExternalName + '")';
				oMap.AddEntry(strMapItem, vsCMAddPositionEnd);
			}
		}
	}
	catch(e)
	{
		throw e;
	}
}

function AddToIDL(oInterface, strAttributes)
{
	try
	{
		var strExternalName		= wizard.FindSymbol("EXTERNAL_NAME");
		var strType				= wizard.FindSymbol("TYPE");
		var strReturnType		= wizard.FindSymbol("RETURN_TYPE");
		var bGenerateGet		= wizard.FindSymbol("GENERATE_GET");
		var bGeneratePut		= wizard.FindSymbol("GENERATE_PUT");
		var bPropPutRef			= wizard.FindSymbol("PROPPUTREF");
		var nNumParams			= wizard.FindSymbol("NUM_PARAMETERS");
		var strInterfaceType	= wizard.FindSymbol("INTERFACE_TYPE");
		var strDispid			= wizard.FindSymbol("DISPID");

		var oGetFunction = false;
		var oPutFunction = false;

		var strParams = "(";

		for (nCntr = 0; nCntr < nNumParams; nCntr++)
		{
			if (nCntr > 0)
				strParams += ", ";
			if (bEmbeddedIDL && aryParamTypeNames[nCntr].substr(0, 10) == "SAFEARRAY(")
			{
				strParams += "["
				if (aryParamAttribs[nCntr].length)
					strParams += aryParamAttribs[nCntr] + ", ";
				strParams += "satype(";
				strParams += aryParamTypeNames[nCntr].substring(10, aryParamTypeNames[nCntr].indexOf(')'));
				strParams += ")] ";
				strParams += "SAFEARRAY * " + aryParamTypeNames[nCntr].substr(aryParamTypeNames[nCntr].indexOf(')') + 2);
			}
			else
			{
				if (aryParamAttribs[nCntr].length)
					strParams += "[" + aryParamAttribs[nCntr] + "] ";
				strParams += aryParamTypeNames[nCntr];
			}
		}

		strParams += ")";

		if (strAttributes.length > 0)
			strAttributes = ', ' + strAttributes;

		if (bGenerateGet)
		{
			var strReturnType1;

			if (strInterfaceType == "dual" || strInterfaceType == "dispinterface")
				strReturnType1 = '	[propget, id(' + strDispid + ')' + strAttributes + '] HRESULT';
			else
				strReturnType1 = '	[propget' + strAttributes + '] ' + strReturnType;

			oGetFunction = oInterface.AddFunction(strExternalName + strParams, vsCMFunctionFunction, strReturnType1, vsCMAddPositionEnd, vsCMAccessDefault);
		}

		if (bGeneratePut)
		{
			var strReturnType1;
			var strPutType = "propput";
			if (bPropPutRef)
				strPutType = "propputref";

			if (strInterfaceType == "dual" || strInterfaceType == "dispinterface")
				strReturnType1 = '	[' + strPutType + ', id(' + strDispid + ')' + strAttributes + '] HRESULT';
			else
				strReturnType1 = '	[' + strPutType + strAttributes + '] ' + strReturnType;

			oPutFunction = oInterface.AddFunction(strExternalName + strParams, vsCMFunctionFunction, strReturnType1, vsCMAddPositionEnd, vsCMAccessDefault);
		}

		if (oGetFunction)
		{
			var strType1 = "[out, retval] " + strType + "*";
			oGetFunction.AddParameter("pVal", strType1, vsCMAddPositionEnd);
		}

		if (oPutFunction)
		{
			var strType1 = "[in] " + strType;
			oPutFunction.AddParameter("newVal", strType1, vsCMAddPositionEnd);
		}
	}
	catch(e)
	{
		throw e;
	}
}


function AddToManaged(oElement, bInterface)
{
	try
	{
		var strExternalName		= wizard.FindSymbol("EXTERNAL_NAME");
		var strType				= wizard.FindSymbol("TYPE");
		var bGenerateGet		= wizard.FindSymbol("GENERATE_GET");
		var bGeneratePut		= wizard.FindSymbol("GENERATE_PUT");

		var oGetFunction = false;
		var oPutFunction = false;
		var Kind = oElement.Kind;

		var strReturnType;

		if (bGenerateGet)
		{
			if (bInterface)
			{
				strReturnType = '__property ' + strType;
			}
			else
			{
				strReturnType = strType;
			}

			oGetFunction = oElement.AddFunction('get_' + strExternalName + '()',
				vsCMFunctionFunction, strReturnType, vsCMAddPositionEnd, vsCMAccessDefault);
		}

		if (bGeneratePut)
		{
			if (bInterface)
			{
				strReturnType = '__property void';
			}
			else
			{
				strReturnType = 'void';
			}

			oPutFunction = oElement.AddFunction('set_' + strExternalName + '(' + strType + ' newVal)',
				vsCMFunctionFunction, strReturnType, vsCMAddPositionEnd, vsCMAccessDefault);
		}
	}
	catch(e)
	{
		throw e;
	}
}


function AddToIDLMFC(oInterface, strAttributes)
{
	try
	{
		var strExternalName		= wizard.FindSymbol("EXTERNAL_NAME");
		var strType				= wizard.FindSymbol("TYPE");
		var bStock				= wizard.FindSymbol("STOCK");
		var bMemberVariable		= wizard.FindSymbol("MEMBER_VARIABLE");
		var nNumParams			= wizard.FindSymbol("NUM_PARAMETERS");
		var bDefaultProperty	= wizard.FindSymbol("DEFAULT_PROPERTY");
		var strDispid			= wizard.FindSymbol("DISPID");

		if (strAttributes.length > 0)
			strAttributes = ', ' + strAttributes;

		if (bStock)
		{
			var strType1 = "	[id(" + wizard.FindSymbol("STOCK_DISPID") + ")" + strAttributes + "] " + strType;
			oInterface.AddVariable(strExternalName, strType1, vsCMAddPositionEnd, vsCMAccessDefault);
			if (bDefaultProperty)
			{
				strType1 = "	[id(0)] " + strType;
				oInterface.AddVariable("_" + strExternalName, strType1, vsCMAddPositionEnd, vsCMAccessDefault);
			}
		}
		else
		{
			if (bMemberVariable)
			{
				var strType1 = "	[id(" + strDispid + ") " + strAttributes + "] " + strType;
				oInterface.AddVariable(strExternalName, strType1, vsCMAddPositionEnd, vsCMAccessDefault);
				if (bDefaultProperty)
				{
					strType1 = "	[id(0)] " + strType;
					oInterface.AddVariable("_" + strExternalName, strType1, vsCMAddPositionEnd, vsCMAccessDefault);
				}
			}
			else
			{
				if (nNumParams)
				{
					var oGetFunction = false;
					var oSetFunction = false;
					var oGetFunction2 = false;
					var oSetFunction2 = false;

					var strParams = "(";
					for (nCntr = 0; nCntr < nNumParams; nCntr++)
					{
						if (nCntr > 0)
							strParams += ", ";
						if (aryParamAttribs[nCntr].length)
							strParams += "[" + aryParamAttribs[nCntr] + "] ";
						strParams += aryParamTypeNames[nCntr];
					}
					strParams += ")";

					var strType1 = "	[id(" + strDispid + "), propget" + strAttributes + "] " + strType;
					oGetFunction = oInterface.AddFunction(strExternalName + strParams, vsCMFunctionFunction, strType1, vsCMAddPositionEnd, vsCMAccessDefault);
					if (bDefaultProperty)
					{
						strType1 = "	[id(0), propget" + strAttributes + "] " + strType;
						oGetFunction2 = oInterface.AddFunction("_" + strExternalName + strParams, vsCMFunctionFunction, strType1, vsCMAddPositionEnd, vsCMAccessDefault);
					}

					var strType1 = "	[id(" + strDispid + "), propput" + strAttributes + "] void";
					oSetFunction = oInterface.AddFunction(strExternalName + strParams, vsCMFunctionFunction, strType1, vsCMAddPositionEnd, vsCMAccessDefault);
					if (bDefaultProperty)
					{
						strType1 = "	[id(0), propput" + strAttributes + "] void";
						oSetFunction2 = oInterface.AddFunction("_" + strExternalName + strParams, vsCMFunctionFunction, strType1, vsCMAddPositionEnd, vsCMAccessDefault);
					}

					if (oSetFunction)
						oSetFunction.AddParameter(GetParamName(strType), strType, vsCMAddPositionEnd);
					if (oSetFunction2)
						oSetFunction2.AddParameter(GetParamName(strType), strType, vsCMAddPositionEnd);
				}
				else
				{
					var strType1 = "	[id(" + strDispid + ")" + strAttributes + "] " + strType;
					oInterface.AddVariable(strExternalName, strType1, vsCMAddPositionEnd, vsCMAccessDefault);
					if (bDefaultProperty)
					{
						strType1 = "	[id(0)" + strAttributes + "] " + strType;
						oInterface.AddVariable("_" + strExternalName, strType1, vsCMAddPositionEnd, vsCMAccessDefault);
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

function InitParams(bMFC)
{
	try
	{
		var nNumParams = wizard.FindSymbol("NUM_PARAMETERS");
		for (var nCntr = 0; nCntr < nNumParams; nCntr++)
		{
			if (bMFC)
				aryParamVT[nCntr] = wizard.FindSymbol("PARAM_VT_TYPE" + nCntr);

			aryParamTypeNames[nCntr] = wizard.FindSymbol("PARAM_TYPE_NAME" + nCntr);
			if (aryParamTypeNames[nCntr].substr(0, 12) == "OLE_TRISTATE")
				aryParamTypeNames[nCntr] = "enum " + aryParamTypeNames[nCntr];
			aryParamAttribs[nCntr] = wizard.FindSymbol("PARAM_ATTRIB" + nCntr);
		}

		var strType	= wizard.FindSymbol("TYPE");
		if (strType.substr(0, 12) == "OLE_TRISTATE")
		{
			strType = "enum " + strType;
			wizard.AddSymbol("TYPE", strType);
		}

		var strReturnType = wizard.FindSymbol("RETURN_TYPE");
		if (strReturnType.substr(0, 12) == "OLE_TRISTATE")
		{
			strReturnType = "enum " + strReturnType;
			wizard.AddSymbol("RETURN_TYPE", strReturnType);
		}
	}
	catch(e)
	{
		throw e;
	}
}

function GetAttributes()
{
	try
	{
		var strHelpString		= wizard.FindSymbol("HELP_STRING");
		var strHelpContext		= wizard.FindSymbol("HELP_CONTEXT");
		var bBindable			= wizard.FindSymbol("BINDABLE");
		var bDefaultBind		= wizard.FindSymbol("DEFAULT_BIND");
		var bDefaultCollElem	= wizard.FindSymbol("DEFAULT_COLLELEM");
		var bDisplayBind		= wizard.FindSymbol("DISPLAY_BIND");
		var bHidden				= wizard.FindSymbol("HIDDEN");
		var bImmediateBind		= wizard.FindSymbol("IMMEDIATE_BIND");
		var bLocal				= wizard.FindSymbol("LOCAL");
		var bNonBrowsable		= wizard.FindSymbol("NON_BROWSABLE");
		var bRequestEdit		= wizard.FindSymbol("REQUEST_EDIT");
		var bRestricted			= wizard.FindSymbol("RESTRICTED");
		var bSource				= wizard.FindSymbol("SOURCE");

		var strAttributes = "";

		if (strHelpString != "")
			strAttributes += ', helpstring("' + strHelpString + '")';

		if (strHelpContext != "")
			strAttributes += ', helpcontext(' + strHelpContext + ')';

		if (bBindable)
			strAttributes += ", bindable";

		if (bDefaultBind)
			strAttributes += ", defaultbind";

		if (bDefaultCollElem)
			strAttributes += ", defaultcollelem";

		if (bDisplayBind)
			strAttributes += ", displaybind";

		if (bHidden)
			strAttributes += ", hidden";

		if (bImmediateBind)
			strAttributes += ", immediatebind";

		if (bLocal)
			strAttributes += ", local";

		if (bNonBrowsable)
			strAttributes += ", nonbrowsable";

		if (bRequestEdit)
			strAttributes += ", requestedit";

		if (bRestricted)
			strAttributes += ", restricted";

		if (bSource)
			strAttributes += ", source";

		if (strAttributes.length > 1)
			strAttributes = strAttributes.substr(2);

		return strAttributes;
	}
	catch(e)
	{
		throw e;
	}
}

function GetParamName(strType)
{
	try
	{
		var strParamName = "newVal";
		if (-1 != strType.indexOf("**"))
			strParamName = "ppVal";
		else if  (-1 != strType.indexOf("*"))
			strParamName = "pVal";
		return strParamName;
	}
	catch(e)
	{
		throw e;
	}
}

function GetFunctionBodyForSet(oClass)
{
	try
	{
		var strBody = "";
		var bDLL = wizard.FindSymbol("DLL");

		if (bDLL)
			strBody = "AFX_MANAGE_STATE(AfxGetStaticModuleState());\r\n\r\n";
		else
			strBody = "AFX_MANAGE_STATE(AfxGetAppModuleState());\r\n\r\n";

		var L_Comment1_Text = "\57\57 TODO: Add your property handler code here\r\n";
		strBody += L_Comment1_Text;

		if (oClass.IsDerivedFrom("CDocument") || oClass.IsDerivedFrom("COleControl"))
			strBody += "\r\nSetModifiedFlag();\r\n";

		return strBody;
	}
	catch(e)
	{
		throw e;
	}
}

function GetFunctionBodyForReturnType(strReturnType)
{
	try
	{
		var strBody = "";
		var strComment;
		var bMFCProject = wizard.FindSymbol("MFC_PROJECT");
		if (bMFCProject)
		{
			var bDLL = wizard.FindSymbol("DLL");
			if (bDLL)
				strBody = "AFX_MANAGE_STATE(AfxGetStaticModuleState());\r\n\r\n";
			else
				strBody = "AFX_MANAGE_STATE(AfxGetAppModuleState());\r\n\r\n";
		}

		var bMFC = wizard.FindSymbol("MFC_CLASS");
		if (bMFC)
		{
			var L_Comment2_Text = "\57\57 TODO: Add your dispatch handler code here\r\n\r\n";
			strComment = L_Comment2_Text
		}
		else
		{
			var L_Comment3_Text = "\57\57 TODO: Add your implementation code here\r\n\r\n";
			strComment = L_Comment3_Text;
		}

		switch(strReturnType)
		{
			case "IDispatch*":
			case "IFontDisp*":
			case "IPictureDisp*":
			case "IUnknown*":
			case "OLE_HANDLE":
				strBody += strComment;
				strBody += "return NULL;\r\n";
				break;

			case "DATE":
				strBody += strComment;
				strBody += "return (DATE)0;\r\n";
				break;

			case "OLE_COLOR":
				strBody += strComment;
				strBody += "return RGB(0,0,0);\r\n";
				break;

			case "enum OLE_TRISTATE":
				strBody += strComment;
				strBody += "return (OLE_TRISTATE)0;\r\n";
				break;

			case "SCODE":
			case "HRESULT":
				strBody += strComment;
				strBody += "return S_OK;\r\n";
				break;

			case "BSTR":
				if (bMFC)
				{
					strBody += "CString strResult;\r\n\r\n";
					strBody += strComment;
					strBody += "return strResult.AllocSysString();\r\n";
				}
				else
				{
					strBody += strComment;
					strBody += "return NULL;\r\n";
				}
				break;

			case "CY":
				strBody += "CURRENCY cyResult = { 0, 0 };\r\n\r\n";
				strBody += strComment;
				strBody += "return cyResult;\r\n";
				break;

			case "VARIANT":
				strBody += "VARIANT vaResult;\r\n";
				strBody += "VariantInit(&vaResult);\r\n\r\n";
				strBody += strComment;
				strBody += "return vaResult;\r\n";
				break;

			case "VARIANT_BOOL":
				strBody += strComment;
				strBody += "return VARIANT_TRUE;\r\n";
				break;

			case "void":
				strBody += strComment.substr(0, strComment.length-2);
				break;

			default:
				strBody += strComment;
				strBody += "return 0;\r\n";
				break;
		}
		return strBody;
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
// SIG // AAIBAAIBAAIBADAhMAkGBSsOAwIaBQAEFD3hZU4V8v89
// SIG // 0a1wh7MzRaNyvJvhoIIVgjCCBMMwggOroAMCAQICEzMA
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
// SIG // BgEEAYI3AgEVMCMGCSqGSIb3DQEJBDEWBBQ4eWgkbhl2
// SIG // +ncYlgas+srY311tPDBABgorBgEEAYI3AgEMMTIwMKAW
// SIG // gBQAZABlAGYAYQB1AGwAdAAuAGoAc6EWgBRodHRwOi8v
// SIG // bWljcm9zb2Z0LmNvbTANBgkqhkiG9w0BAQEFAASCAQBl
// SIG // 3zBFcHcmVGOp1ixeq5W2puthJ80mgMpaYrs5Q6V/U8ll
// SIG // GR2J8sLhLq6VIm/A12jF6T5I89ruOjjLNIV1joy+nUV7
// SIG // GNWg14ockmyOQrkdfg82Q/biby/C7gHvjztYKHYpwxXM
// SIG // iEg9vBi1eN7iDqiNHFjlBorz/cKKtbxinpHg4WCRHcOV
// SIG // 6wgA6wceFQWvoxHhIq8l3gP3dMtwJ9RaZ1+jvXBxDnB/
// SIG // 1QK/lELjUE8wFmBIqSNRapz0XOi1Qs6fbvovZzEttHSL
// SIG // j4m2HPxBqH4S7gRvTvLjZn1QmXjhnpjdc+c2zzg0/aUx
// SIG // 5Cq+I2+LB90xLjYvuzOPgy6sf7vHdhEJoYICKDCCAiQG
// SIG // CSqGSIb3DQEJBjGCAhUwggIRAgEBMIGOMHcxCzAJBgNV
// SIG // BAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYD
// SIG // VQQHEwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQg
// SIG // Q29ycG9yYXRpb24xITAfBgNVBAMTGE1pY3Jvc29mdCBU
// SIG // aW1lLVN0YW1wIFBDQQITMwAAADQkMUDJoMF5jQAAAAAA
// SIG // NDAJBgUrDgMCGgUAoF0wGAYJKoZIhvcNAQkDMQsGCSqG
// SIG // SIb3DQEHATAcBgkqhkiG9w0BCQUxDxcNMTMxMDA1MDkw
// SIG // NTA3WjAjBgkqhkiG9w0BCQQxFgQU0fMXBRCL26s9yJ2j
// SIG // 2zlzwaYGUyQwDQYJKoZIhvcNAQEFBQAEggEAILmkK+Jk
// SIG // imNQrqH8ywPUSctS9hpkj48U+UeZPKE7xvC4UD2iKAuu
// SIG // GwpiAQJGptYuc288yNeiPC6zaWRWj2iCbVv32iLTCWtw
// SIG // yMW22ZGER+HM0caOMVANIFpI9jKfJ7eWeD2dvg4s6Dti
// SIG // /T8rd7svDJs7vYgijg1cPA4TqRTGA2jAQxHQBtCrVQry
// SIG // pEsv6uljL/tpXyt3Emvx1f8oxPwyRQb9DCCjV8q+wUA4
// SIG // 7MVBXtaNmpOXa9w3OwGUM9g+V7yXjvd/4IiQh79DGO0n
// SIG // uOh7+zFQUVSrWf85pGnSidYz1er7Aek6c+kaIoO3IRCc
// SIG // CbsDV7lzM/YwemHo+9xpAMtxEA==
// SIG // End signature block
