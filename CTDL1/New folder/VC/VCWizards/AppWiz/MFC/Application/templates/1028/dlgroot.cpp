[!if RIBBON_TOOLBAR]
// 這個 MFC 範例原始程式碼會示範如何使用 MFC Microsoft Office Fluent 使用者介面
// (「Fluent UI」)，並且僅提供為參考資料，做為
// MFC 參考及 MFC C++ 程式庫軟體
// 隨附相關電子文件的補充。
// 關於 Fluent UI 之複製、使用或散發的授權條款則分別提供。
// 如需 Fluent UI 授權計劃的詳細資訊，請造訪 
// http://go.microsoft.com/fwlink/?LinkId=238214。
//
// Copyright (C) Microsoft Corporation
// 著作權所有，並保留一切權利。
[!endif]

// [!output APP_IMPL] : 定義應用程式的類別行為。
//

#include "stdafx.h"
#include "[!output APP_HEADER]"
#include "[!output DIALOG_HEADER]"

#ifdef _DEBUG
#define new DEBUG_NEW
#endif


// [!output APP_CLASS]

BEGIN_MESSAGE_MAP([!output APP_CLASS], [!output APP_BASE_CLASS])
	ON_COMMAND(ID_HELP, &CWinApp::OnHelp)
END_MESSAGE_MAP()


// [!output APP_CLASS] 建構

[!output APP_CLASS]::[!output APP_CLASS]()
{
[!if RESTART_MGR_SUPPORT]
	// 支援重新啟動管理員
	m_dwRestartManagerSupportFlags = AFX_RESTART_MANAGER_SUPPORT_RESTART;

[!endif]
	// TODO:  在此加入建構程式碼，
	// 將所有重要的初始設定加入 InitInstance 中
}


// 僅有的一個 [!output APP_CLASS] 物件

[!output APP_CLASS] theApp;

[!if AUTOMATION]
const GUID CDECL BASED_CODE _tlid =
		[!output LIBID_STATIC_CONST_GUID_FORMAT];
const WORD _wVerMajor = 1;
const WORD _wVerMinor = 0;

[!endif]

// [!output APP_CLASS] 初始設定

BOOL [!output APP_CLASS]::InitInstance()
{
[!if MANIFEST]
	// 假如應用程式資訊清單指定使用 ComCtl32.dll 6 (含) 以後版本，
	// 來啟動視覺化樣式，在 Windows XP 上，則需要 InitCommonControls()。
	// 否則任何視窗的建立都將失敗。
	INITCOMMONCONTROLSEX InitCtrls;
	InitCtrls.dwSize = sizeof(InitCtrls);
	// 設定要包含所有您想要用於應用程式中的
	// 通用控制項類別。
	InitCtrls.dwICC = ICC_WIN95_CLASSES;
	InitCommonControlsEx(&InitCtrls);

[!endif]
	[!output APP_BASE_CLASS]::InitInstance();

[!if SOCKETS]
	if (!AfxSocketInit())
	{
		AfxMessageBox(IDP_SOCKETS_INIT_FAILED);
		return FALSE;
	}

[!endif]

[!if AUTOMATION || ACCESSIBILITY]
	// 初始化 OLE 程式庫
	if (!AfxOleInit())
	{
		AfxMessageBox(IDP_OLE_INIT_FAILED);
		return FALSE;
	}

[!endif]
[!if ACTIVEX_CONTROLS]
	AfxEnableControlContainer();

[!endif]
[!if !NO_MFC_CONTROLS]
	// 建立殼層管理員，以防對話方塊包含
	// 任何殼層樹狀檢視或殼層清單檢視控制項。
	CShellManager *pShellManager = new CShellManager;

	// 啟動 [Windows 原生] 視覺化管理員可啟用 MFC 控制項中的主題
	CMFCVisualManager::SetDefaultManager(RUNTIME_CLASS(CMFCVisualManagerWindows));
[!endif]

	// 標準初始設定
	// 如果您不使用這些功能並且想減少
	// 最後完成的可執行檔大小，您可以
	// 從下列程式碼移除不需要的初始化常式，
	// 變更儲存設定值的登錄機碼
	// TODO:  您應該適度修改此字串
	// (例如，公司名稱或組織名稱)
	SetRegistryKey(_T("本機 AppWizard 所產生的應用程式"));
[!if AUTOMATION]
	// 剖析 Automation 或 reg/unreg 參數的命令列。
	CCommandLineInfo cmdInfo;
	ParseCommandLine(cmdInfo);

	// 已使用 /Embedding 或 /Automation 參數啟動應用程式。
	// 將應用程式當做 Automation 伺服器執行。
	if (cmdInfo.m_bRunEmbedded || cmdInfo.m_bRunAutomated)
	{
		// 經由 CoRegisterClassObject() 登錄類別因數。
		COleTemplateServer::RegisterAll();
	}
	// 已使用 /Unregserver 或 /Unregister 參數啟動應用程式。
	// 從登錄移除項目。
	else if (cmdInfo.m_nShellCommand == CCommandLineInfo::AppUnregister)
	{
		COleObjectFactory::UpdateRegistryAll(FALSE);
		AfxOleUnregisterTypeLib(_tlid, _wVerMajor, _wVerMinor);
		return FALSE;
	}
	// 已單獨或搭配其他參數 (如 /Register 或 /Regserver) 啟動應用程式。
	// 更新登錄項目，包括類型程式庫。
	else
	{
		COleObjectFactory::UpdateRegistryAll();
		AfxOleRegisterTypeLib(AfxGetInstanceHandle(), _tlid);
		if (cmdInfo.m_nShellCommand == CCommandLineInfo::AppRegister)
			return FALSE;
	}
[!endif]

	[!output DIALOG_CLASS] dlg;
	m_pMainWnd = &dlg;
	INT_PTR nResponse = dlg.DoModal();
	if (nResponse == IDOK)
	{
		// TODO:  在此放置於使用 [確定] 來停止使用對話方塊時
		// 處理的程式碼
	}
	else if (nResponse == IDCANCEL)
	{
		// TODO:  在此放置於使用 [取消] 來停止使用對話方塊時
		// 處理的程式碼
	}
	else if (nResponse == -1)
	{
		TRACE(traceAppMsg, 0, "警告: 對話方塊建立失敗，因此，應用程式意外終止。\n");
[!if !NO_MFC_CONTROLS]
		TRACE(traceAppMsg, 0, "警告: 如果您要在對話方塊上使用 MFC 控制項，則無法 #define _AFX_NO_MFC_CONTROLS_IN_DIALOGS。\n");
[!endif]
	}

[!if !NO_MFC_CONTROLS]
	// 刪除上面所建立的殼層管理員。
	if (pShellManager != NULL)
	{
		delete pShellManager;
	}
[!endif]

	// 因為已經關閉對話方塊，傳回 FALSE，所以我們會結束應用程式，
	// 而非提示開始應用程式的訊息。
	return FALSE;
}

[!if AUTOMATION || ACCESSIBILITY]
int [!output APP_CLASS]::ExitInstance()
{
	AfxOleTerm(FALSE);

	return [!output APP_BASE_CLASS]::ExitInstance();
}
[!endif]
