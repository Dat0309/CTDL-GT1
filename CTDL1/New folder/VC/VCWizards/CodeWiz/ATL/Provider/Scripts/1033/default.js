// Copyright (c) Microsoft Corporation. All rights reserved.
// Script for ATL Provider

function OnPrep(selProj, selObj)
{
	var L_WizardDialogTitle_Text = "ATL OLE DB Provider Wizard";
	return PrepCodeWizard(selProj, L_WizardDialogTitle_Text);
}

function OnFinish(selProj, selObj)
{
	var oCM;
	try
	{		
		oCM	= selProj.CodeModel;

		var strShortName = wizard.FindSymbol("SHORT_NAME");
		var L_TransactionName_Text = "Add ATL Provider ";
		oCM.StartTransaction(L_TransactionName_Text + strShortName);
		if(!AddATLSupportToProject(selProj))
		{
			oCM.AbortTransaction();
			return;
		}

		var strProjectPath		= wizard.FindSymbol("PROJECT_PATH");
		var strTemplatePath		= wizard.FindSymbol("TEMPLATES_PATH");
		var strUpperShortName	= CreateASCIIName(strShortName.toUpperCase());
		wizard.AddSymbol("UPPER_SHORT_NAME", strUpperShortName);
		wizard.AddSymbol("TYPE_NAME", strShortName + " Class");
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
			wizard.AddSymbol("PROGID", strVIProgID + "." + wizard.FindSymbol("VERSION"));
		}
		var strCoClass			= wizard.FindSymbol("COCLASS");
		var bAttributed			= wizard.FindSymbol("ATTRIBUTED");

		var strDataSourceHeader	= wizard.FindSymbol("DATASOURCE_HEADER");
		var strSessionHeader	= wizard.FindSymbol("SESSION_HEADER");
		var strRowsetHeader		= wizard.FindSymbol("ROWSET_HEADER");
		var strRowsetImpl		= wizard.FindSymbol("ROWSET_IMPL");
		var strDataSourceClass	= wizard.FindSymbol("DATASOURCE_CLASS");

		var strProjectRC		= GetProjectFile(selProj, "RC", true, false);
		var strRGSFile;

		// Create necessary GUIDS
		CreateGUIDs();

		var oResHelper = wizard.ResourceHelper;
		oResHelper.OpenResourceFile(strProjectRC);

		// add string resources
		var L_RCTEXT1_TEXT =  "Active Sessions";
		var strSymbolValue = oResHelper.AddResource("IDS_DBPROP_ACTIVESESSIONS", L_RCTEXT1_TEXT, "STRING");
		// In theory we should check after each addition. In practive however this check guards agains SCC chekout cancelations.
		// This will either fire in the first attempt or will not fire, so furhter checks are unnecessary.
		if (strSymbolValue == null) return;
		var L_RCTEXT2_TEXT =  "Asynchable Commit";
		oResHelper.AddResource("IDS_DBPROP_ASYNCTXNCOMMIT", L_RCTEXT2_TEXT, "STRING");
		var L_RCTEXT3_TEXT =  "Pass By Ref Accessors";
		oResHelper.AddResource("IDS_DBPROP_BYREFACCESSORS", L_RCTEXT3_TEXT, "STRING");
		var L_RCTEXT4_TEXT =  "Catalog Location";
		oResHelper.AddResource("IDS_DBPROP_CATALOGLOCATION", L_RCTEXT4_TEXT, "STRING");
		var L_RCTEXT5_TEXT =  "Catalog Term";
		oResHelper.AddResource("IDS_DBPROP_CATALOGTERM", L_RCTEXT5_TEXT, "STRING");
		var L_RCTEXT6_TEXT =  "Catalog Usage";
		oResHelper.AddResource("IDS_DBPROP_CATALOGUSAGE", L_RCTEXT6_TEXT, "STRING");
		var L_RCTEXT7_TEXT =  "Column Definition";
		oResHelper.AddResource("IDS_DBPROP_COLUMNDEFINITION", L_RCTEXT7_TEXT, "STRING");
		var L_RCTEXT8_TEXT =  "NULL Concatenation Behavior";
		oResHelper.AddResource("IDS_DBPROP_CONCATNULLBEHAVIOR", L_RCTEXT8_TEXT, "STRING");
		var L_RCTEXT9_TEXT =  "Data Source Name";
		oResHelper.AddResource("IDS_DBPROP_DATASOURCENAME", L_RCTEXT9_TEXT, "STRING");
		var L_RCTEXT10_TEXT =  "Read-Only Data Source";
		oResHelper.AddResource("IDS_DBPROP_DATASOURCEREADONLY", L_RCTEXT10_TEXT, "STRING");
		var L_RCTEXT11_TEXT =  "DBMS Name";
		oResHelper.AddResource("IDS_DBPROP_DBMSNAME", L_RCTEXT11_TEXT, "STRING");
		var L_RCTEXT12_TEXT =  "DBMS Version";
		oResHelper.AddResource("IDS_DBPROP_DBMSVER", L_RCTEXT12_TEXT, "STRING");
		var L_RCTEXT13_TEXT =  "Procedure Term";
		oResHelper.AddResource("IDS_DBPROP_PROCEDURETERM", L_RCTEXT13_TEXT, "STRING");
		var L_RCTEXT14_TEXT =  "OLE DB Version";
		oResHelper.AddResource("IDS_DBPROP_PROVIDEROLEDBVER", L_RCTEXT14_TEXT, "STRING");
		var L_RCTEXT15_TEXT =  "Provider Name";
		oResHelper.AddResource("IDS_DBPROP_PROVIDERNAME", L_RCTEXT15_TEXT, "STRING");
		var L_RCTEXT16_TEXT =  "Provider Version";
		oResHelper.AddResource("IDS_DBPROP_PROVIDERVER", L_RCTEXT16_TEXT, "STRING");
		var L_RCTEXT17_TEXT =  "Quoted Identifier Sensitivity";
		oResHelper.AddResource("IDS_DBPROP_QUOTEDIDENTIFIERCASE", L_RCTEXT17_TEXT, "STRING");
		var L_RCTEXT18_TEXT =  "Schema Term";
		oResHelper.AddResource("IDS_DBPROP_SCHEMATERM", L_RCTEXT18_TEXT, "STRING");
		var L_RCTEXT19_TEXT =  "Schema Usage";
		oResHelper.AddResource("IDS_DBPROP_SCHEMAUSAGE", L_RCTEXT19_TEXT, "STRING");
		var L_RCTEXT20_TEXT =  "SQL Support";
		oResHelper.AddResource("IDS_DBPROP_SQLSUPPORT", L_RCTEXT20_TEXT, "STRING");
		var L_RCTEXT21_TEXT =  "Structured Storage";
		oResHelper.AddResource("IDS_DBPROP_STRUCTUREDSTORAGE", L_RCTEXT21_TEXT, "STRING");
		var L_RCTEXT22_TEXT =  "Subquery Support";
		oResHelper.AddResource("IDS_DBPROP_SUBQUERIES", L_RCTEXT22_TEXT, "STRING");
		var L_RCTEXT23_TEXT =  "Isolation Levels";
		oResHelper.AddResource("IDS_DBPROP_SUPPORTEDTXNISOLEVELS", L_RCTEXT23_TEXT, "STRING");
		var L_RCTEXT24_TEXT =  "Isolation Retention";
		oResHelper.AddResource("IDS_DBPROP_SUPPORTEDTXNISORETAIN", L_RCTEXT24_TEXT, "STRING");
		var L_RCTEXT25_TEXT =     "Table Term";
		oResHelper.AddResource("IDS_DBPROP_TABLETERM", L_RCTEXT25_TEXT, "STRING");
		var L_RCTEXT26_TEXT =      "User Name";
		oResHelper.AddResource("IDS_DBPROP_USERNAME", L_RCTEXT26_TEXT, "STRING");
		var L_RCTEXT27_TEXT =  "Transaction DDL";
		oResHelper.AddResource("IDS_DBPROP_SUPPORTEDTXNDDL", L_RCTEXT27_TEXT, "STRING");
		var L_RCTEXT28_TEXT =  "Asynchable Abort";
		oResHelper.AddResource("IDS_DBPROP_ASYNCTXNABORT", L_RCTEXT28_TEXT, "STRING");
		var L_RCTEXT29_TEXT =  "Data Source Object Threading Model";
		oResHelper.AddResource("IDS_DBPROP_DSOTHREADMODEL", L_RCTEXT29_TEXT, "STRING");
		var L_RCTEXT30_TEXT =  "Multiple Parameter Sets";
		oResHelper.AddResource("IDS_DBPROP_MULTIPLEPARAMSETS", L_RCTEXT30_TEXT, "STRING");
		var L_RCTEXT31_TEXT =  "Output Parameter Availability";
		oResHelper.AddResource("IDS_DBPROP_OUTPUTPARAMETERAVAILABILITY", L_RCTEXT31_TEXT, "STRING");
		var L_RCTEXT32_TEXT =  "Persistent ID Type";
		oResHelper.AddResource("IDS_DBPROP_PERSISTENTIDTYPE", L_RCTEXT32_TEXT, "STRING");
		var L_RCTEXT33_TEXT =  "Column Set Notification";
		oResHelper.AddResource("IDS_DBPROP_NOTIFYCOLUMNSET", L_RCTEXT33_TEXT, "STRING");
		var L_RCTEXT34_TEXT =  "Row Delete Notification";
		oResHelper.AddResource("IDS_DBPROP_NOTIFYROWDELETE", L_RCTEXT34_TEXT, "STRING");
		var L_RCTEXT35_TEXT =  "Row First Change Notification";
		oResHelper.AddResource("IDS_DBPROP_NOTIFYROWFIRSTCHANGE", L_RCTEXT35_TEXT, "STRING");
		var L_RCTEXT36_TEXT =  "Row Insert Notification";
		oResHelper.AddResource("IDS_DBPROP_NOTIFYROWINSERT", L_RCTEXT36_TEXT, "STRING");
		var L_RCTEXT37_TEXT =  "Row Resynchronization Notification";
		oResHelper.AddResource("IDS_DBPROP_NOTIFYROWRESYNCH", L_RCTEXT37_TEXT, "STRING");
		var L_RCTEXT38_TEXT =  "Rowset Release Notification";
		oResHelper.AddResource("IDS_DBPROP_NOTIFYROWSETRELEASE", L_RCTEXT38_TEXT, "STRING");
		var L_RCTEXT39_TEXT =  "Rowset Fetch Position Change Notification";
		oResHelper.AddResource("IDS_DBPROP_NOTIFYROWSETFETCHPOSITIONCHANGE", L_RCTEXT39_TEXT, "STRING");
		var L_RCTEXT40_TEXT =  "Row Undo Change Notification";
		oResHelper.AddResource("IDS_DBPROP_NOTIFYROWUNDOCHANGE", L_RCTEXT40_TEXT, "STRING");
		var L_RCTEXT41_TEXT =  "Row Undo Delete Notification";
		oResHelper.AddResource("IDS_DBPROP_NOTIFYROWUNDODELETE", L_RCTEXT41_TEXT, "STRING");
		var L_RCTEXT42_TEXT =       "GROUP BY Support";
		oResHelper.AddResource("IDS_DBPROP_GROUPBY", L_RCTEXT42_TEXT, "STRING");
		var L_RCTEXT43_TEXT =  "Heterogeneous Table Support";
		oResHelper.AddResource("IDS_DBPROP_HETEROGENEOUSTABLES", L_RCTEXT43_TEXT, "STRING");
		var L_RCTEXT44_TEXT =  "Identifier Case Sensitivity";
		oResHelper.AddResource("IDS_DBPROP_IDENTIFIERCASE", L_RCTEXT44_TEXT, "STRING");
		var L_RCTEXT45_TEXT =     "Lock Modes";
		oResHelper.AddResource("IDS_DBPROP_LOCKMODES", L_RCTEXT45_TEXT, "STRING");
		var L_RCTEXT46_TEXT =  "Maximum Index Size";
		oResHelper.AddResource("IDS_DBPROP_MAXINDEXSIZE", L_RCTEXT46_TEXT, "STRING");
		var L_RCTEXT47_TEXT =    "Maximum Row Size";
		oResHelper.AddResource("IDS_DBPROP_MAXROWSIZE", L_RCTEXT47_TEXT, "STRING");
		var L_RCTEXT48_TEXT =  "Maximum Row Size Includes BLOB";
		oResHelper.AddResource("IDS_DBPROP_MAXROWSIZEINCLUDESBLOB", L_RCTEXT48_TEXT, "STRING");
		var L_RCTEXT49_TEXT =  "Maximum Tables in SELECT";
		oResHelper.AddResource("IDS_DBPROP_MAXTABLESINSELECT", L_RCTEXT49_TEXT, "STRING");
		var L_RCTEXT50_TEXT =  "Multiple Storage Objects";
		oResHelper.AddResource("IDS_DBPROP_MULTIPLESTORAGEOBJECTS", L_RCTEXT50_TEXT, "STRING");
		var L_RCTEXT51_TEXT =  "Multi-Table Update";
		oResHelper.AddResource("IDS_DBPROP_MULTITABLEUPDATE", L_RCTEXT51_TEXT, "STRING");
		var L_RCTEXT52_TEXT =  "Notification Phases";
		oResHelper.AddResource("IDS_DBPROP_NOTIFICATIONPHASES", L_RCTEXT52_TEXT, "STRING");
		var L_RCTEXT53_TEXT =  "NULL Collation Order";
		oResHelper.AddResource("IDS_DBPROP_NULLCOLLATION", L_RCTEXT53_TEXT, "STRING");
		var L_RCTEXT54_TEXT =    "OLE Object Support";
		oResHelper.AddResource("IDS_DBPROP_OLEOBJECTS", L_RCTEXT54_TEXT, "STRING");
		var L_RCTEXT55_TEXT =  "ORDER BY Columns in Select List";
		oResHelper.AddResource("IDS_DBPROP_ORDERBYCOLUMNSINSELECT", L_RCTEXT55_TEXT, "STRING");
		var L_RCTEXT56_TEXT =  "Prepare Commit Behavior";
		oResHelper.AddResource("IDS_DBPROP_PREPARECOMMITBEHAVIOR", L_RCTEXT56_TEXT, "STRING");
		var L_RCTEXT57_TEXT =  "Prepare Abort Behavior";
		oResHelper.AddResource("IDS_DBPROP_PREPAREABORTBEHAVIOR", L_RCTEXT57_TEXT, "STRING");
		var L_RCTEXT58_TEXT =  "Row Undo Insert Notification";
		oResHelper.AddResource("IDS_DBPROP_NOTIFYROWUNDOINSERT", L_RCTEXT58_TEXT, "STRING");
		var L_RCTEXT59_TEXT =  "Row Update Notification";
		oResHelper.AddResource("IDS_DBPROP_NOTIFYROWUPDATE", L_RCTEXT59_TEXT, "STRING");
		var L_RCTEXT60_TEXT =  "Rowset Conversions on Command";
		oResHelper.AddResource("IDS_DBPROP_ROWSETCONVERSIONSONCOMMAND", L_RCTEXT60_TEXT, "STRING");
		var L_RCTEXT61_TEXT =  "Multiple Results";
		oResHelper.AddResource("IDS_DBPROP_MULTIPLERESULTS", L_RCTEXT61_TEXT, "STRING");
		var L_RCTEXT62_TEXT =  "ISequentialStream";
		oResHelper.AddResource("IDS_DBPROP_ISequentialStream", L_RCTEXT62_TEXT, "STRING");
		var L_RCTEXT63_TEXT =  "Preserve on Abort";
		oResHelper.AddResource("IDS_DBPROP_ABORTPRESERVE", L_RCTEXT63_TEXT, "STRING");
		var L_RCTEXT64_TEXT =  "Blocking Storage Objects";
		oResHelper.AddResource("IDS_DBPROP_BLOCKINGSTORAGEOBJECTS", L_RCTEXT64_TEXT, "STRING");
		var L_RCTEXT65_TEXT =  "IRowsetScroll";
		oResHelper.AddResource("IDS_DBPROP_IRowsetScroll", L_RCTEXT65_TEXT, "STRING");
		var L_RCTEXT66_TEXT =  "IRowsetUpdate";
		oResHelper.AddResource("IDS_DBPROP_IRowsetUpdate", L_RCTEXT66_TEXT, "STRING");
		var L_RCTEXT67_TEXT =  "ISupportErrorInfo";
		oResHelper.AddResource("IDS_DBPROP_ISupportErrorInfo", L_RCTEXT67_TEXT, "STRING");
		var L_RCTEXT68_TEXT =  "Change Inserted Rows";
		oResHelper.AddResource("IDS_DBPROP_CHANGEINSERTEDROWS", L_RCTEXT68_TEXT, "STRING");
		var L_RCTEXT69_TEXT =  "Return Pending Inserts";
		oResHelper.AddResource("IDS_DBPROP_RETURNPENDINGINSERTS", L_RCTEXT69_TEXT, "STRING");
		var L_RCTEXT70_TEXT =  "IConvertType";
		oResHelper.AddResource("IDS_DBPROP_IConvertType", L_RCTEXT70_TEXT, "STRING");
		var L_RCTEXT71_TEXT =  "Cache Authentication";
		oResHelper.AddResource("IDS_DBPROP_AUTH_CACHE_AUTHINFO", L_RCTEXT71_TEXT, "STRING");
		var L_RCTEXT72_TEXT =  "Encrypt Password";
		oResHelper.AddResource("IDS_DBPROP_AUTH_ENCRYPT_PASSWORD", L_RCTEXT72_TEXT, "STRING");
		var L_RCTEXT73_TEXT =  "Integrated Security";
		oResHelper.AddResource("IDS_DBPROP_AUTH_INTEGRATED", L_RCTEXT73_TEXT, "STRING");
		var L_RCTEXT74_TEXT =  "Mask Password";
		oResHelper.AddResource("IDS_DBPROP_AUTH_MASK_PASSWORD", L_RCTEXT74_TEXT, "STRING");
		var L_RCTEXT75_TEXT =  "Password";
		oResHelper.AddResource("IDS_DBPROP_AUTH_PASSWORD", L_RCTEXT75_TEXT, "STRING");
		var L_RCTEXT76_TEXT =  "Persist Encrypted";
		oResHelper.AddResource("IDS_DBPROP_AUTH_PERSIST_ENCRYPTED", L_RCTEXT76_TEXT, "STRING");
		var L_RCTEXT77_TEXT =  "Persist Security Info";
		oResHelper.AddResource("IDS_DBPROP_AUTH_PERSIST_SENSITIVE_AUTHINFO", L_RCTEXT77_TEXT, "STRING");
		var L_RCTEXT78_TEXT =   "User ID";
		oResHelper.AddResource("IDS_DBPROP_AUTH_USERID", L_RCTEXT78_TEXT, "STRING");
		var L_RCTEXT79_TEXT =  "Data Source";
		oResHelper.AddResource("IDS_DBPROP_INIT_DATASOURCE", L_RCTEXT79_TEXT, "STRING");
		var L_RCTEXT80_TEXT =     "Window Handle";
		oResHelper.AddResource("IDS_DBPROP_INIT_HWND", L_RCTEXT80_TEXT, "STRING");
		var L_RCTEXT81_TEXT =  "Impersonation Level";
		oResHelper.AddResource("IDS_DBPROP_INIT_IMPERSONATION_LEVEL", L_RCTEXT81_TEXT, "STRING");
		var L_RCTEXT82_TEXT =  "Location";
		oResHelper.AddResource("IDS_DBPROP_INIT_LOCATION", L_RCTEXT82_TEXT, "STRING");
		var L_RCTEXT83_TEXT =     "Mode";
		oResHelper.AddResource("IDS_DBPROP_INIT_MODE", L_RCTEXT83_TEXT, "STRING");
		var L_RCTEXT84_TEXT =   "Prompt";
		oResHelper.AddResource("IDS_DBPROP_INIT_PROMPT", L_RCTEXT84_TEXT, "STRING");
		var L_RCTEXT85_TEXT =  "Protection Level";
		oResHelper.AddResource("IDS_DBPROP_INIT_PROTECTION_LEVEL", L_RCTEXT85_TEXT, "STRING");
		var L_RCTEXT86_TEXT =  "Connect Timeout";
		oResHelper.AddResource("IDS_DBPROP_INIT_TIMEOUT", L_RCTEXT86_TEXT, "STRING");
		var L_RCTEXT87_TEXT =     "Locale Identifier";
		oResHelper.AddResource("IDS_DBPROP_INIT_LCID", L_RCTEXT87_TEXT, "STRING");
		var L_RCTEXT88_TEXT =  "Extended Properties";
		oResHelper.AddResource("IDS_DBPROP_INIT_PROVIDERSTRING", L_RCTEXT88_TEXT, "STRING");
		var L_RCTEXT89_TEXT =  "Autocommit Isolation Levels";
		oResHelper.AddResource("IDS_DBPROP_SESS_AUTOCOMMITISOLEVELS", L_RCTEXT89_TEXT, "STRING");
		var L_RCTEXT90_TEXT =  "Server Cursor";
		oResHelper.AddResource("IDS_DBPROP_SERVERCURSOR", L_RCTEXT90_TEXT, "STRING");
		var L_RCTEXT91_TEXT =  "Objects Transacted";
		oResHelper.AddResource("IDS_DBPROP_TRANSACTEDOBJECT", L_RCTEXT91_TEXT, "STRING");
		var L_RCTEXT92_TEXT =  "Updatability";
		oResHelper.AddResource("IDS_DBPROP_UPDATABILITY", L_RCTEXT92_TEXT, "STRING");
		var L_RCTEXT93_TEXT =  "Strong Row Identity";
		oResHelper.AddResource("IDS_DBPROP_STRONGIDENTITY", L_RCTEXT93_TEXT, "STRING");
		var L_RCTEXT94_TEXT =     "IAccessor";
		oResHelper.AddResource("IDS_DBPROP_IAccessor", L_RCTEXT94_TEXT, "STRING");
		var L_RCTEXT95_TEXT =  "IColumnsInfo";
		oResHelper.AddResource("IDS_DBPROP_IColumnsInfo", L_RCTEXT95_TEXT, "STRING");
		var L_RCTEXT96_TEXT =  "IColumnsRowset";
		oResHelper.AddResource("IDS_DBPROP_IColumnsRowset", L_RCTEXT96_TEXT, "STRING");
		var L_RCTEXT97_TEXT =  "IConnectionPointContainer";
		oResHelper.AddResource("IDS_DBPROP_IConnectionPointContainer", L_RCTEXT97_TEXT, "STRING");
		var L_RCTEXT98_TEXT =  "IProvideMoniker";
		oResHelper.AddResource("IDS_DBPROP_IProvideMoniker", L_RCTEXT98_TEXT, "STRING");
		var L_RCTEXT99_TEXT =       "IRowset";
		oResHelper.AddResource("IDS_DBPROP_IRowset", L_RCTEXT99_TEXT, "STRING");
		var L_RCTEXT100_TEXT =  "IRowsetChange";
		oResHelper.AddResource("IDS_DBPROP_IRowsetChange", L_RCTEXT100_TEXT, "STRING");
		var L_RCTEXT101_TEXT =  "IRowsetIdentity";
		oResHelper.AddResource("IDS_DBPROP_IRowsetIdentity", L_RCTEXT101_TEXT, "STRING");
		var L_RCTEXT102_TEXT =   "IRowsetInfo";
		oResHelper.AddResource("IDS_DBPROP_IRowsetInfo", L_RCTEXT102_TEXT, "STRING");
		var L_RCTEXT103_TEXT =  "IRowsetLocate";
		oResHelper.AddResource("IDS_DBPROP_IRowsetLocate", L_RCTEXT103_TEXT, "STRING");
		var L_RCTEXT104_TEXT =  "IRowsetResynch";
		oResHelper.AddResource("IDS_DBPROP_IRowsetResynch", L_RCTEXT104_TEXT, "STRING");
		var L_RCTEXT105_TEXT =     "Use Bookmarks";
		oResHelper.AddResource("IDS_DBPROP_BOOKMARKS", L_RCTEXT105_TEXT, "STRING");
		var L_RCTEXT106_TEXT =  "Skip Deleted Bookmarks";
		oResHelper.AddResource("IDS_DBPROP_BOOKMARKSKIPPED", L_RCTEXT106_TEXT, "STRING");
		var L_RCTEXT107_TEXT =  "Bookmark Type";
		oResHelper.AddResource("IDS_DBPROP_BOOKMARKTYPE", L_RCTEXT107_TEXT, "STRING");
		var L_RCTEXT108_TEXT =  "Fetch Backwards";
		oResHelper.AddResource("IDS_DBPROP_CANFETCHBACKWARDS", L_RCTEXT108_TEXT, "STRING");
		var L_RCTEXT109_TEXT =   "Hold Rows";
		oResHelper.AddResource("IDS_DBPROP_CANHOLDROWS", L_RCTEXT109_TEXT, "STRING");
		var L_RCTEXT110_TEXT =    "Append-Only Rowset";
		oResHelper.AddResource("IDS_DBPROP_APPENDONLY", L_RCTEXT110_TEXT, "STRING");
		var L_RCTEXT111_TEXT =  "Scroll Backwards";
		oResHelper.AddResource("IDS_DBPROP_CANSCROLLBACKWARDS", L_RCTEXT111_TEXT, "STRING");
		var L_RCTEXT112_TEXT =  "Column Privileges";
		oResHelper.AddResource("IDS_DBPROP_COLUMNRESTRICT", L_RCTEXT112_TEXT, "STRING");
		var L_RCTEXT113_TEXT =  "Command Time Out";
		oResHelper.AddResource("IDS_DBPROP_COMMANDTIMEOUT", L_RCTEXT113_TEXT, "STRING");
		var L_RCTEXT114_TEXT =  "Preserve on Commit";
		oResHelper.AddResource("IDS_DBPROP_COMMITPRESERVE", L_RCTEXT114_TEXT, "STRING");
		var L_RCTEXT115_TEXT =  "Delay Storage Object Updates";
		oResHelper.AddResource("IDS_DBPROP_DELAYSTORAGEOBJECTS", L_RCTEXT115_TEXT, "STRING");
		var L_RCTEXT116_TEXT =  "Immobile Rows";
		oResHelper.AddResource("IDS_DBPROP_IMMOBILEROWS", L_RCTEXT116_TEXT, "STRING");
		var L_RCTEXT117_TEXT =  "Literal Bookmarks";
		oResHelper.AddResource("IDS_DBPROP_LITERALBOOKMARKS", L_RCTEXT117_TEXT, "STRING");
		var L_RCTEXT118_TEXT =  "Literal Row Identity";
		oResHelper.AddResource("IDS_DBPROP_LITERALIDENTITY", L_RCTEXT118_TEXT, "STRING");
		var L_RCTEXT119_TEXT =   "Maximum Open Rows";
		oResHelper.AddResource("IDS_DBPROP_MAXOPENROWS", L_RCTEXT119_TEXT, "STRING");
		var L_RCTEXT120_TEXT =  "Maximum Pending Rows";
		oResHelper.AddResource("IDS_DBPROP_MAXPENDINGROWS", L_RCTEXT120_TEXT, "STRING");
		var L_RCTEXT121_TEXT =       "Maximum Rows";
		oResHelper.AddResource("IDS_DBPROP_MAXROWS", L_RCTEXT121_TEXT, "STRING");
		var L_RCTEXT122_TEXT =   "Others' Inserts Visible";
		oResHelper.AddResource("IDS_DBPROP_OTHERINSERT", L_RCTEXT122_TEXT, "STRING");
		var L_RCTEXT123_TEXT =  "Others' Changes Visible";
		oResHelper.AddResource("IDS_DBPROP_OTHERUPDATEDELETE", L_RCTEXT123_TEXT, "STRING");
		var L_RCTEXT124_TEXT =     "Own Inserts Visible";
		oResHelper.AddResource("IDS_DBPROP_OWNINSERT", L_RCTEXT124_TEXT, "STRING");
		var L_RCTEXT125_TEXT =  "Own Changes Visible";
		oResHelper.AddResource("IDS_DBPROP_OWNUPDATEDELETE", L_RCTEXT125_TEXT, "STRING");
		var L_RCTEXT126_TEXT =  "Quick Restart";
		oResHelper.AddResource("IDS_DBPROP_QUICKRESTART", L_RCTEXT126_TEXT, "STRING");
		var L_RCTEXT127_TEXT =  "Reentrant Events";
		oResHelper.AddResource("IDS_DBPROP_REENTRANTEVENTS", L_RCTEXT127_TEXT, "STRING");
		var L_RCTEXT128_TEXT =  "Remove Deleted Rows";
		oResHelper.AddResource("IDS_DBPROP_REMOVEDELETED", L_RCTEXT128_TEXT, "STRING");
		var L_RCTEXT129_TEXT =  "Report Multiple Changes";
		oResHelper.AddResource("IDS_DBPROP_REPORTMULTIPLECHANGES", L_RCTEXT129_TEXT, "STRING");
		var L_RCTEXT130_TEXT =   "Row Privileges";
		oResHelper.AddResource("IDS_DBPROP_ROWRESTRICT", L_RCTEXT130_TEXT, "STRING");
		var L_RCTEXT131_TEXT =  "Row Threading Model";
		oResHelper.AddResource("IDS_DBPROP_ROWTHREADMODEL", L_RCTEXT131_TEXT, "STRING");
		var L_RCTEXT132_TEXT =  "Bookmarks Ordered";
		oResHelper.AddResource("IDS_DBPROP_ORDEREDBOOKMARKS", L_RCTEXT132_TEXT, "STRING");
		var L_RCTEXT133_TEXT =  "Notification Granularity";
		oResHelper.AddResource("IDS_DBPROP_NOTIFICATIONGRANULARITY", L_RCTEXT133_TEXT, "STRING");
		// 1.5 properties
		var L_RCTEXT134_TEXT =  "Filter Operations";
		oResHelper.AddResource("IDS_DBPROP_FILTERCOMPAREOPS", L_RCTEXT134_TEXT, "STRING");
		var L_RCTEXT135_TEXT =  "Find Operations";
		oResHelper.AddResource("IDS_DBPROP_FINDCOMPAREOPS", L_RCTEXT135_TEXT, "STRING");
		var L_RCTEXT136_TEXT =  "IChapteredRowset";
		oResHelper.AddResource("IDS_DBPROP_IChapteredRowset", L_RCTEXT136_TEXT, "STRING");
		var L_RCTEXT137_TEXT =  "IDBAsynchStatus";
		oResHelper.AddResource("IDS_DBPROP_IDBAsynchStatus", L_RCTEXT137_TEXT, "STRING");
		var L_RCTEXT138_TEXT =  "IRowsetFind";
		oResHelper.AddResource("IDS_DBPROP_IRowsetFind", L_RCTEXT138_TEXT, "STRING");
		var L_RCTEXT139_TEXT =  "IRowsetView";
		oResHelper.AddResource("IDS_DBPROP_IRowsetView", L_RCTEXT139_TEXT, "STRING");
		var L_RCTEXT140_TEXT =  "IViewChapter";
		oResHelper.AddResource("IDS_DBPROP_IViewChapter", L_RCTEXT140_TEXT, "STRING");
		var L_RCTEXT141_TEXT =  "IViewFilter";
		oResHelper.AddResource("IDS_DBPROP_IViewFilter", L_RCTEXT141_TEXT, "STRING");
		var L_RCTEXT142_TEXT =  "IViewRowset";
		oResHelper.AddResource("IDS_DBPROP_IViewRowset", L_RCTEXT142_TEXT, "STRING");
		var L_RCTEXT143_TEXT =  "IViewSort";
		oResHelper.AddResource("IDS_DBPROP_IViewSort", L_RCTEXT143_TEXT, "STRING");
		var L_RCTEXT144_TEXT =  "Asynchronous Processing";
		oResHelper.AddResource("IDS_DBPROP_INIT_ASYNCH", L_RCTEXT144_TEXT, "STRING");
		var L_RCTEXT145_TEXT =  "Maximum Open Chapters";
		oResHelper.AddResource("IDS_DBPROP_MAXOPENCHAPTERS", L_RCTEXT145_TEXT, "STRING");
		var L_RCTEXT146_TEXT =  "Maximum OR Conditions";
		oResHelper.AddResource("IDS_DBPROP_MAXORSINFILTER", L_RCTEXT146_TEXT, "STRING");
		var L_RCTEXT147_TEXT =  "Maximum Sort Columns";
		oResHelper.AddResource("IDS_DBPROP_MAXSORTCOLUMNS", L_RCTEXT147_TEXT, "STRING");
		var L_RCTEXT148_TEXT =  "Asynchronous Rowset Processing";
		oResHelper.AddResource("IDS_DBPROP_ROWSET_ASYNCH", L_RCTEXT148_TEXT, "STRING");
		var L_RCTEXT149_TEXT =  "Sort on Index";
		oResHelper.AddResource("IDS_DBPROP_SORTONINDEX", L_RCTEXT149_TEXT, "STRING");
		// 2.0 properties
		var L_RCTEXT150_TEXT =  "IMultipleResults";
		oResHelper.AddResource("IDS_DBPROP_IMultipleResults", L_RCTEXT150_TEXT, "STRING");
		var L_RCTEXT151_TEXT =  "Data Source Type";
		oResHelper.AddResource("IDS_DBPROP_DATASOURCE_TYPE", L_RCTEXT151_TEXT, "STRING");
//MDPROP
		var L_RCTEXT152_TEXT =  "Number of axes in the dataset";
		oResHelper.AddResource("IDS_MDPROP_AXES", L_RCTEXT152_TEXT, "STRING");
		var L_RCTEXT153_TEXT =  "Flattening Support";
		oResHelper.AddResource("IDS_MDPROP_FLATTENING_SUPPORT", L_RCTEXT153_TEXT, "STRING");
		var L_RCTEXT154_TEXT =  "Support for query joining multiple cubes";
		oResHelper.AddResource("IDS_MDPROP_MDX_JOINCUBES", L_RCTEXT154_TEXT, "STRING");
		var L_RCTEXT155_TEXT =  "Support for named levels";
		oResHelper.AddResource("IDS_MDPROP_NAMED_LEVELS", L_RCTEXT155_TEXT, "STRING");
		//
		var L_RCTEXT156_TEXT =  "RANGEROWSET";
		oResHelper.AddResource("IDS_MDPROP_RANGEROWSET", L_RCTEXT156_TEXT, "STRING");
		var L_RCTEXT157_TEXT =  "The capabilities in the WHERE clause of an MDX statement";
		oResHelper.AddResource("IDS_MDPROP_MDX_SLICER", L_RCTEXT157_TEXT, "STRING");
		//
		var L_RCTEXT158_TEXT =  "MDX_CUBEQUALIFICATION";
		oResHelper.AddResource("IDS_MDPROP_MDX_CUBEQUALIFICATION", L_RCTEXT158_TEXT, "STRING");
		var L_RCTEXT159_TEXT =  "Support for outer reference in an MDX statement";
		oResHelper.AddResource("IDS_MDPROP_MDX_OUTERREFERENCE", L_RCTEXT159_TEXT, "STRING");
		var L_RCTEXT160_TEXT =  "Support for querying by property values in an MDX statement";
		oResHelper.AddResource("IDS_MDPROP_MDX_QUERYBYPROPERTY", L_RCTEXT160_TEXT, "STRING");
		var L_RCTEXT161_TEXT =  "Support for MDX case statements";
		oResHelper.AddResource("IDS_MDPROP_MDX_CASESUPPORT", L_RCTEXT161_TEXT, "STRING");
		var L_RCTEXT162_TEXT =  "Support for string comparison operators other than equals and not-equals operators";
		oResHelper.AddResource("IDS_MDPROP_MDX_STRING_COMPOP", L_RCTEXT162_TEXT, "STRING");
		var L_RCTEXT163_TEXT =  "Support for various <desc flag> values in the DESCENDANTS function";
		oResHelper.AddResource("IDS_MDPROP_MDX_DESCFLAGS", L_RCTEXT163_TEXT, "STRING");
		var L_RCTEXT164_TEXT =  "Support for various set functions";
		oResHelper.AddResource("IDS_MDPROP_MDX_SET_FUNCTIONS", L_RCTEXT164_TEXT, "STRING");
		var L_RCTEXT165_TEXT =  "Support for various member functions";
		oResHelper.AddResource("IDS_MDPROP_MDX_MEMBER_FUNCTIONS", L_RCTEXT165_TEXT, "STRING");
		var L_RCTEXT166_TEXT =  "Support for various numeric functions";
		oResHelper.AddResource("IDS_MDPROP_MDX_NUMERIC_FUNCTIONS", L_RCTEXT166_TEXT, "STRING");
		var L_RCTEXT167_TEXT =  "Support for creation of named sets and calculated members";
		oResHelper.AddResource("IDS_MDPROP_MDX_FORMULAS", L_RCTEXT167_TEXT, "STRING");
		var L_RCTEXT168_TEXT =  "Support for updating aggregated cells";
		oResHelper.AddResource("IDS_MDPROP_AGGREGATECELL_UPDATE", L_RCTEXT168_TEXT, "STRING");
		//
		var L_RCTEXT169_TEXT =  "MDX_AGGREGATECELL_UPDATE";
		oResHelper.AddResource("IDS_MDPROP_MDX_AGGREGATECELL_UPDATE", L_RCTEXT169_TEXT, "STRING");
		var L_RCTEXT170_TEXT =  "Provider's ability to qualify a cube name";
		oResHelper.AddResource("IDS_MDPROP_MDX_OBJQUALIFICATION", L_RCTEXT170_TEXT, "STRING");
		var L_RCTEXT171_TEXT =  "The capabilities in the <numeric_value_expression> argument of set functions";
		oResHelper.AddResource("IDS_MDPROP_MDX_NONMEASURE_EXPRESSONS", L_RCTEXT171_TEXT, "STRING");
// DBPROP
		var L_RCTEXT172_TEXT =  "Access Order";
		oResHelper.AddResource("IDS_DBPROP_ACCESSORDER", L_RCTEXT172_TEXT, "STRING");
		var L_RCTEXT173_TEXT =  "Bookmark Information";
		oResHelper.AddResource("IDS_DBPROP_BOOKMARKINFO", L_RCTEXT173_TEXT, "STRING");
		var L_RCTEXT174_TEXT =  "Initial Catalog";
		oResHelper.AddResource("IDS_DBPROP_INIT_CATALOG", L_RCTEXT174_TEXT, "STRING");
		var L_RCTEXT175_TEXT =  "Bulk Operations";
		oResHelper.AddResource("IDS_DBPROP_ROW_BULKOPS", L_RCTEXT175_TEXT, "STRING");
		var L_RCTEXT176_TEXT =  "Provider Friendly Name";
		oResHelper.AddResource("IDS_DBPROP_PROVIDERFRIENDLYNAME", L_RCTEXT176_TEXT, "STRING");
		var L_RCTEXT177_TEXT =  "Lock Mode";
		oResHelper.AddResource("IDS_DBPROP_LOCKMODE", L_RCTEXT177_TEXT, "STRING");
		var L_RCTEXT178_TEXT =  "Multiple Connections";
		oResHelper.AddResource("IDS_DBPROP_MULTIPLECONNECTIONS", L_RCTEXT178_TEXT, "STRING");
		var L_RCTEXT179_TEXT =  "Unique Rows";
		oResHelper.AddResource("IDS_DBPROP_UNIQUEROWS", L_RCTEXT179_TEXT, "STRING");
		var L_RCTEXT180_TEXT =  "Server Data on Insert";
		oResHelper.AddResource("IDS_DBPROP_SERVERDATAONINSERT", L_RCTEXT180_TEXT, "STRING");
		//
		var L_RCTEXT181_TEXT =  "STORAGEFLAGS";
		oResHelper.AddResource("IDS_DBPROP_STORAGEFLAGS", L_RCTEXT181_TEXT, "STRING");
		var L_RCTEXT182_TEXT =  "Connection Status";
		oResHelper.AddResource("IDS_DBPROP_CONNECTIONSTATUS", L_RCTEXT182_TEXT, "STRING");
		var L_RCTEXT183_TEXT =  "Alter Column Support";
		oResHelper.AddResource("IDS_DBPROP_ALTERCOLUMN", L_RCTEXT183_TEXT, "STRING");
		var L_RCTEXT184_TEXT =  "Column LCID";
		oResHelper.AddResource("IDS_DBPROP_COLUMNLCID", L_RCTEXT184_TEXT, "STRING");
		var L_RCTEXT185_TEXT =  "Reset Datasource";
		oResHelper.AddResource("IDS_DBPROP_RESETDATASOURCE", L_RCTEXT185_TEXT, "STRING");
		var L_RCTEXT186_TEXT =  "OLE DB Services";
		oResHelper.AddResource("IDS_DBPROP_INIT_OLEDBSERVICES", L_RCTEXT186_TEXT, "STRING");
		var L_RCTEXT187_TEXT =  "IRowsetRefresh";
		oResHelper.AddResource("IDS_DBPROP_IRowsetRefresh", L_RCTEXT187_TEXT, "STRING");
		var L_RCTEXT188_TEXT =  "Server Name";
		oResHelper.AddResource("IDS_DBPROP_SERVERNAME", L_RCTEXT188_TEXT, "STRING");
		var L_RCTEXT189_TEXT =  "IParentRowset";
		oResHelper.AddResource("IDS_DBPROP_IParentRowset", L_RCTEXT189_TEXT, "STRING");
		var L_RCTEXT190_TEXT =  "Hidden Column Count";
		oResHelper.AddResource("IDS_DBPROP_HIDDENCOLUMNS", L_RCTEXT190_TEXT, "STRING");
		var L_RCTEXT191_TEXT =  "Provider Owned Memory";
		oResHelper.AddResource("IDS_DBPROP_PROVIDERMEMORY", L_RCTEXT191_TEXT, "STRING");
		var L_RCTEXT192_TEXT =  "Client Cursor";
		oResHelper.AddResource("IDS_DBPROP_CLIENTCURSOR", L_RCTEXT192_TEXT, "STRING");
		// 2.1 properties
		var L_RCTEXT193_TEXT =  "Trustee User Name";
		oResHelper.AddResource("IDS_DBPROP_TRUSTEE_USERNAME", L_RCTEXT193_TEXT, "STRING");
		var L_RCTEXT194_TEXT =  "Authentication String";
		oResHelper.AddResource("IDS_DBPROP_TRUSTEE_AUTHENTICATION", L_RCTEXT194_TEXT, "STRING");
		var L_RCTEXT195_TEXT =  "New Authentication String";
		oResHelper.AddResource("IDS_DBPROP_TRUSTEE_NEWAUTHENTICATION", L_RCTEXT195_TEXT, "STRING");
		var L_RCTEXT196_TEXT =  "IRow";
		oResHelper.AddResource("IDS_DBPROP_IRow", L_RCTEXT196_TEXT, "STRING");
		var L_RCTEXT197_TEXT =  "IRowChange";
		oResHelper.AddResource("IDS_DBPROP_IRowChange", L_RCTEXT197_TEXT, "STRING");
		var L_RCTEXT198_TEXT =  "IRowSchemaChange";
		oResHelper.AddResource("IDS_DBPROP_IRowSchemaChange", L_RCTEXT198_TEXT, "STRING");
		var L_RCTEXT199_TEXT =  "IGetRow";
		oResHelper.AddResource("IDS_DBPROP_IGetRow", L_RCTEXT199_TEXT, "STRING");
		var L_RCTEXT200_TEXT =  "IScopedOperations";
		oResHelper.AddResource("IDS_DBPROP_IScopedOperations", L_RCTEXT200_TEXT, "STRING");
		var L_RCTEXT201_TEXT =  "IBindResource";
		oResHelper.AddResource("IDS_DBPROP_IBindResource", L_RCTEXT201_TEXT, "STRING");
		var L_RCTEXT202_TEXT =  "ICreateRow";
		oResHelper.AddResource("IDS_DBPROP_ICreateRow", L_RCTEXT202_TEXT, "STRING");
		var L_RCTEXT203_TEXT =  "Bind Flags";
		oResHelper.AddResource("IDS_DBPROP_INIT_BINDFLAGS", L_RCTEXT203_TEXT, "STRING");
		var L_RCTEXT204_TEXT =  "Lock Owner";
		oResHelper.AddResource("IDS_DBPROP_INIT_LOCKOWNER", L_RCTEXT204_TEXT, "STRING");
		var L_RCTEXT205_TEXT =  "URL Generation";
		oResHelper.AddResource("IDS_DBPROP_GENERATEURL", L_RCTEXT205_TEXT, "STRING");
		//
		var L_RCTEXT206_TEXT =  "IDBBinderProperties";
		oResHelper.AddResource("IDS_DBPROP_IDBBinderProperties", L_RCTEXT206_TEXT, "STRING");
		var L_RCTEXT207_TEXT =  "IColumnsInfo2";
		oResHelper.AddResource("IDS_DBPROP_IColumnsInfo2", L_RCTEXT207_TEXT, "STRING");
		//
		var L_RCTEXT208_TEXT =  "IRegisterProvider";
		oResHelper.AddResource("IDS_DBPROP_IRegisterProvider", L_RCTEXT208_TEXT, "STRING");
		var L_RCTEXT209_TEXT =  "IGetSession";
		oResHelper.AddResource("IDS_DBPROP_IGetSession", L_RCTEXT209_TEXT, "STRING");
		var L_RCTEXT210_TEXT =  "IGetSourceRow";
		oResHelper.AddResource("IDS_DBPROP_IGetSourceRow", L_RCTEXT210_TEXT, "STRING");
		var L_RCTEXT211_TEXT =  "IRowsetCurrentIndex";
		oResHelper.AddResource("IDS_DBPROP_IRowsetCurrentIndex", L_RCTEXT211_TEXT, "STRING");
		var L_RCTEXT212_TEXT =  "Open Rowset Support";
		oResHelper.AddResource("IDS_DBPROP_OPENROWSETSUPPORT", L_RCTEXT212_TEXT, "STRING");
		var L_RCTEXT213_TEXT =  "Is Long";
		oResHelper.AddResource("IDS_DBPROP_COL_ISLONG", L_RCTEXT213_TEXT, "STRING");
		// 2.5 properties
		var L_RCTEXT214_TEXT =  "Seed";
		oResHelper.AddResource("IDS_DBPROP_COL_SEED", L_RCTEXT214_TEXT, "STRING");
		var L_RCTEXT215_TEXT =  "Increment";
		oResHelper.AddResource("IDS_DBPROP_COL_INCREMENT", L_RCTEXT215_TEXT, "STRING");
		var L_RCTEXT216_TEXT =  "General Timeout";
		oResHelper.AddResource("IDS_DBPROP_INIT_GENERALTIMEOUT", L_RCTEXT216_TEXT, "STRING");
		var L_RCTEXT217_TEXT =  "COM Service Support";
		oResHelper.AddResource("IDS_DBPROP_COMSERVICES", L_RCTEXT217_TEXT, "STRING");
		// 2.6 properties
		var L_RCTEXT218_TEXT =  "Output Stream";
		oResHelper.AddResource("IDS_DBPROP_OUTPUTSTREAM", L_RCTEXT218_TEXT, "STRING");
		var L_RCTEXT219_TEXT =  "Output Encoding";
		oResHelper.AddResource("IDS_DBPROP_OUTPUTENCODING", L_RCTEXT219_TEXT, "STRING");
		var L_RCTEXT220_TEXT =  "Table Statistics Support";
		oResHelper.AddResource("IDS_DBPROP_TABLESTATISTICS", L_RCTEXT220_TEXT, "STRING");
		var L_RCTEXT221_TEXT =  "Skip Row Count Results";
		oResHelper.AddResource("IDS_DBPROP_SKIPROWCOUNTRESULTS", L_RCTEXT221_TEXT, "STRING");
		var L_RCTEXT222_TEXT =  "IRowsetBookmark";
		oResHelper.AddResource("IDS_DBPROP_IRowsetBookmark", L_RCTEXT222_TEXT, "STRING");
//MDPROP
		var L_RCTEXT223_TEXT =  "Defines visibility of precalculated totals";
		oResHelper.AddResource("IDS_MDPROP_VISUALMODE", L_RCTEXT223_TEXT, "STRING");

		if (!bAttributed)
		{
			var MidlTool = GetIDLConfig(selProj,true);
			var strMidlHeader = MidlTool.HeaderFileName;
			strMidlHeader = selProj.Object.Configurations(1).Evaluate(strMidlHeader);
			wizard.AddSymbol("MIDL_H_FILENAME",strMidlHeader);

			// Get LibID
			wizard.AddSymbol("LIBID_REGISTRY_FORMAT", oCM.IDLLibraries(1).Attributes.Find("uuid").Value);

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
			strRGSFile = GetUniqueFileName(strProjectPath, CreateASCIIName(strShortName) + ".rgs");
			var strRGSID = "IDR_" + strUpperShortName;
			RenderAddTemplate(wizard, "provider.rgs", strRGSFile, false, false);
			var strSymbolValue = oResHelper.AddResource(strRGSID, strProjectPath + strRGSFile, "REGISTRY");
			wizard.AddSymbol("RGS_ID", strSymbolValue.split("=").shift());
	
			// Render provco.idl and insert into strProject.idl
			AddCoclassFromFile(oCM, "provco.idl");
		}
		oResHelper.CloseResourceFile();

		// Add #include <atldb.h> to pchFile, if any
		var nTotal = selProj.Object.Configurations.Count;
		var nCntr;
		var pchFile = "";
		for (nCntr = 1; nCntr <= nTotal; nCntr++)
		{
			var VCCLTool = selProj.Object.Configurations(nCntr).Tools("VCCLCompilerTool");
			if(VCCLTool.UsePrecompiledHeader == pchUseUsingSpecific)
			{
				if(pchFile=="")
					pchFile = VCCLTool.PrecompiledHeaderThrough;
			}
			if(pchFile!="")
			{
				if (!DoesIncludeExist(selProj, "<atldb.h>", pchFile))
					oCM.AddInclude("<atldb.h>", pchFile, vsCMAddPositionEnd);
				break;
			}
		}

		// Add header
		var strTemplatePath	= wizard.FindSymbol("TEMPLATES_PATH");
		if ("\\" != strTemplatePath.charAt(strTemplatePath.length-1))
			strTemplatePath += "\\";

		wizard.RenderTemplate(strTemplatePath + "prowset.h", strRowsetHeader);
		wizard.RenderTemplate(strTemplatePath + "psession.h", strSessionHeader);
		wizard.RenderTemplate(strTemplatePath + "pdatasrc.h", strDataSourceHeader);

		AddFileToProject(strRowsetHeader, selObj, true);
		AddFileToProject(strSessionHeader, selObj, false);
		AddFileToProject(strDataSourceHeader, selObj, false);

		// Add CPP
		RenderAddTemplate(wizard, "prowset.cpp", strRowsetImpl, selObj, false);
		
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

function CreateGUIDs()
{
	try
	{
		// create CLSID
		var strRawGUID = wizard.CreateGuid();
		var strFormattedGUID = wizard.FormatGuid(strRawGUID, 0);
		wizard.AddSymbol("CLSID_REGISTRY_FORMAT", strFormattedGUID);

		strRawGUID = wizard.CreateGuid();
		strFormattedGUID = wizard.FormatGuid(strRawGUID, 0);
		wizard.AddSymbol("CLSID_COMMAND_REGISTRY_FORMAT", strFormattedGUID);

		strRawGUID = wizard.CreateGuid();
		strFormattedGUID = wizard.FormatGuid(strRawGUID, 0);
		wizard.AddSymbol("CLSID_SESSION_REGISTRY_FORMAT", strFormattedGUID);
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
// SIG // AAIBAAIBAAIBADAhMAkGBSsOAwIaBQAEFIlzndkVW9DO
// SIG // veOGjhdvG/QOYSPToIIVgjCCBMMwggOroAMCAQICEzMA
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
// SIG // BgEEAYI3AgEVMCMGCSqGSIb3DQEJBDEWBBRzO6MYyLvy
// SIG // UXSpw805TpYuOO/4ODBABgorBgEEAYI3AgEMMTIwMKAW
// SIG // gBQAZABlAGYAYQB1AGwAdAAuAGoAc6EWgBRodHRwOi8v
// SIG // bWljcm9zb2Z0LmNvbTANBgkqhkiG9w0BAQEFAASCAQCP
// SIG // o5qa/1xEyCdfYR9fKc8pnlDLKeadU05h1jxSM3MGDcms
// SIG // H1ErhwARlJuGjheeY7g2ZfSWgJ9hzEmp6fNYh2gD2V26
// SIG // RX4wnXNU2jPGzQ18dykAeENxcHvSB4mMeZkijZnr/HaR
// SIG // AmMQZHPAc4LG3nx1rMOk3xROenmdUDOhup3VsUSX/Qa3
// SIG // jVYeD5kN1fuU9cYDzc6+PjKSlehEhxowaZT9ntCvfFTI
// SIG // +sud6N74O1sRnZT98ocnTHk6I/LCS0Efaljm7SQAe04V
// SIG // kC0h93Ya6rHER9eW86okOJcwos3MY/sDA2GrGJ2908PY
// SIG // bNN6c8uLIYqaEM6ZFz5DfOxHt1STep2HoYICKDCCAiQG
// SIG // CSqGSIb3DQEJBjGCAhUwggIRAgEBMIGOMHcxCzAJBgNV
// SIG // BAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYD
// SIG // VQQHEwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQg
// SIG // Q29ycG9yYXRpb24xITAfBgNVBAMTGE1pY3Jvc29mdCBU
// SIG // aW1lLVN0YW1wIFBDQQITMwAAACs5MkjBsslI8wAAAAAA
// SIG // KzAJBgUrDgMCGgUAoF0wGAYJKoZIhvcNAQkDMQsGCSqG
// SIG // SIb3DQEHATAcBgkqhkiG9w0BCQUxDxcNMTMxMDA1MDkw
// SIG // NTA3WjAjBgkqhkiG9w0BCQQxFgQUp30cx/zMtprVVmmY
// SIG // 1IjvxqmJOxowDQYJKoZIhvcNAQEFBQAEggEAkzUWSM/m
// SIG // NmOm8679TqJXJBGjilcnNnGgUKcA/IWilJZv0H6bZZU4
// SIG // CEnEP2qwEsqZmhzWrKH1DsQ+D1vOe3+Opr5eOkUiQgZT
// SIG // FGz4iK4bfMkOxIKLm94xdQVi+656BxiYsqnYRjXEPgua
// SIG // jDOhdMQb7amBRJAMPH4XRBHJoHoKbDWnj3Tq6kRwUP5y
// SIG // NFqPLJyAGC/k5dJUi9mJZdsBi2UuJSymNZWoBKy/zpfM
// SIG // UkMz1mdpDxc9nCXqo22KdQNW3QIbMqZIM7obUucRWsPj
// SIG // KpGPcIuupDew4izytEb12eKOo9NK3O7gXOHqPHHqxPqw
// SIG // GPU9/dGwfQLLbPUdH1Eqx5b3rQ==
// SIG // End signature block
