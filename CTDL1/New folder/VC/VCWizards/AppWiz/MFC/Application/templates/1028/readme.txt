================================================================================
    MFC 程式庫：[!output PROJECT_NAME] 專案概觀
===============================================================================

應用程式精靈已經為您建立了這個 [!output PROJECT_NAME] 應用程式。這個應用程式不僅示範了使用 MFC 的基本概念，也是您撰寫應用程式的起點。

這個檔案包含一份摘要，簡要說明構成 [!output PROJECT_NAME] 應用程式的
所有檔案，它們個別的內容。

[!output PROJECT_NAME].vcxproj
    這是使用應用程式精靈所產生之 VC++ 專案的主要專案檔。它含有產生該檔案之 Visual C++ 的版本資訊，以及有關使用應用程式精靈所選取之平台、組態和專案功能的資訊。

[!output PROJECT_NAME].vcxproj.filters
    這是使用應用程式精靈所產生之 VC++ 專案的篩選檔。檔案中含有您專案中檔案與篩選器之間關聯的相關資訊。這項關聯用於 IDE 中以顯示特定節點下具有類似副檔名之檔案的群組 (例如，".cpp" 檔案會與 "Source Files" 篩選器相關聯)。

[!output APP_HEADER]
    這是應用程式的主要標頭檔。
    它包含了特定標頭 (包括 Resource.h)，並宣告 [!output APP_CLASS] 應用程式類別。

[!output APP_IMPL]
    這是含有應用程式類別 [!output APP_CLASS] 的主要應用程式原始程式檔。

[!output RC_FILE_NAME]
    這是程式所用的所有 Microsoft Windows 資源的列表。它含有儲存在 RES 子目錄中的圖示、點陣圖和游標。您可以直接在 Microsoft Visual C++ 內編輯這個檔案。您的專案資源是在 [!output LCID]。

res\[!output PROJECT_NAME].ico
    這是用來做為應用程式圖示的圖示檔。這個圖示是包含在主要資源檔 [!output PROJECT_NAME].rc 中。

res\[!output RC2_FILE_NAME].rc2
    這個檔案包含 Microsoft Visual C++ 無法編輯的資源。您應該將所有資源編輯器無法編輯的資源放到這個檔案。
[!if CONTAINER_SERVER || FULL_SERVER || MINI_SERVER || AUTOMATION || HAS_SUFFIX]
[!if !HTML_EDITVIEW]

[!output PROJECT_NAME].reg
    這是範例 .reg 檔案，說明架構將為您設定的登錄設定類型。您可以將這個當做 .reg
[!if APP_TYPE_DLG]
    檔案，與應用程式一起執行。
[!else]
    檔案，與應用程式一起執行，或者乾脆將它刪除，然後依賴預設的 RegisterShellFileTypes 登錄。
[!endif]

[!if AUTOMATION]
[!output SAFE_IDL_NAME].idl
    這個檔案含有您的應用程式型別程式庫的介面描述語言原始程式碼。
[!endif]
[!endif]
[!endif]

[!if !APP_TYPE_DLG]
/////////////////////////////////////////////////////////////////////////////

對於主框架視窗：
[!if PROJECT_STYLE_EXPLORER]
    Windows 檔案總管樣式：專案包括類似 Windows 檔案總管的介面且具有兩個框架。
[!else]
    專案包括標準 MFC 介面。
[!endif]

[!output MAIN_FRAME_HEADER], [!output MAIN_FRAME_IMPL]
    這些檔案包含了框架類別 [!output MAIN_FRAME_CLASS]，其衍生自
[!if APP_TYPE_MDI || APP_TYPE_TABBED_MDI]
[!if APP_TYPE_MDI]
    CMDIFrameWnd 並控制所有 MDI 框架功能。
[!else]
    CMDITabbedFrameWnd 並控制所有 MDI 框架功能。
[!endif]
[!else]
    CFrameWnd 並控制所有 SDI 框架功能。
[!endif]
[!if PROJECT_STYLE_EXPLORER]

[!output TREE_VIEW_HEADER], [!output TREE_VIEW_IMPL]
    這些檔案包含了衍生自 CTreeView 的左框架類別 [!output TREE_VIEW_CLASS]。
[!endif]

[!if DOCKING_TOOLBAR || TOOLBAR_STYLE_REBAR || MENUBAR_TOOLBAR || RIBBON_TOOLBAR]
res\Toolbar.bmp
    這個點陣圖檔案是用來建立工具列的並排影像。
    初始工具列和狀態列會在 [!output MAIN_FRAME_CLASS] 類別中建構。請使用資源編輯器編輯這個工具列點陣圖，並更新 [!output PROJECT_NAME].rc 中的 IDR_MAINFRAME TOOLBAR 陣列，以加入工具列按鈕。
[!if MINI_SERVER || FULL_SERVER || CONTAINER_SERVER]

res\IToolbar.bmp
    當您的伺服器應用程式在另一個容器內就地啟用 (In-Place Activate) 時，這個點陣圖檔案可用來建立工具列的並排影像。這個工具列會在 [!output INPLACE_FRAME_CLASS] 類別中建構。這個點陣圖與 res\Toolbar.bmp 中的點陣圖類似，不同的是它移除了許多非伺服器命令。

[!endif]
[!endif]
[!if APP_TYPE_MDI || APP_TYPE_TABBED_MDI]
/////////////////////////////////////////////////////////////////////////////

對於子框架視窗：

ChildFrm.h, ChildFrm.cpp
    這些檔案會定義並實作 [!output CHILD_FRAME_CLASS] 類別，該類別支援 MDI 應用程式中的子視窗。

[!endif]
/////////////////////////////////////////////////////////////////////////////

[!if DOCVIEW]
[!if !DB_VIEW_NO_FILE]
應用程式精靈會建立一個文件類型及一個檢視表：

[!output DOC_HEADER]、[!output DOC_IMPL] - 文件
    這些檔案包含您的 [!output DOC_CLASS] 類別。編輯這些檔案，可加入您的特殊文件類型並實作檔案儲存和載入 (透過 [!output DOC_CLASS]::Serialize)。
[!if HAS_SUFFIX && !HTML_EDITVIEW]
    文件將具有下列字串：
        副檔名：      [!output FILE_EXTENSION]
        檔案類型 ID：        [!output FILE_TYPE_ID]
        主框架標題：  [!output MAIN_FRAME_CAPTION]
        文件類型名稱：       [!output DOC_TYPE_NAME]
        篩選條件名稱：         [!output FILTER_NAME]
        檔案新簡短名稱： [!output FILE_NEW_NAME_SHORT]
        檔案類型完整名稱： [!output FILE_NEW_NAME_LONG]
[!endif]
[!else]
應用程式精靈會建立一個檢視表：
[!endif]

[!output VIEW_HEADER]、[!output VIEW_IMPL] - 文件的檢視表
    這些檔案包含您的 [!output VIEW_CLASS] 類別。
[!if !DB_VIEW_NO_FILE]
    [!output VIEW_CLASS] 物件是用來檢視 [!output DOC_CLASS] 物件。
[!endif]

[!if APP_TYPE_MDI || APP_TYPE_TABBED_MDI]
res\[!output PROJECT_NAME]Doc.ico
    這是用來做為 [!output DOC_CLASS] 類別之 MDI 子視窗圖示的圖示檔。這個圖示是包含在主要資源檔 [!output PROJECT_NAME].rc 中。
[!endif]

[!endif]

[!if DB_VIEW_NO_FILE || DB_VIEW_WITH_FILE]
/////////////////////////////////////////////////////////////////////////////

資料庫支援：

[!output ROWSET_HEADER], [!output ROWSET_IMPL]
    這些檔案包含您的 [!output ROWSET_CLASS] 類別。這個類別可用來存取您在精靈中選取的資料來源。
[!if DB_VIEW_NO_FILE]
    將不會新增任何序列化支援。
[!else]
    已新增序列化支援。
[!endif]
[!endif]
[!if CONTAINER || FULL_SERVER || MINI_SERVER || CONTAINER_SERVER]
/////////////////////////////////////////////////////////////////////////////

此外，應用程式精靈也建立了 OLE 的特定類別

[!if CONTAINER || CONTAINER_SERVER]
[!output CONTAINER_ITEM_HEADER], [!output CONTAINER_ITEM_IMPL]
    這些檔案包含您的 [!output CONTAINER_ITEM_CLASS] 類別。這個類別可用來操作 OLE 物件。OLE 物件通常是由您的 [!output VIEW_CLASS] 類別顯示並序列化為 [!output DOC_CLASS] 類別的一部分。
[!if ACTIVE_DOC_CONTAINER]
    程式中的支援可將主動式文件包含在它的框架內。
[!endif]
[!endif]
[!if MINI_SERVER || FULL_SERVER || CONTAINER_SERVER]

[!output SERVER_ITEM_HEADER], [!output SERVER_ITEM_IMPL]
    這些檔案包含您的 [!output SERVER_ITEM_CLASS]。這個類別可用來將您的 [!output DOC_CLASS] 類別連接到 OLE 系統，並選擇性提供文件的連結。
[!if ACTIVE_DOC_SERVER]
    專案具有建立並管理主動式文件的支援。
[!endif]

[!output INPLACE_FRAME_HEADER], [!output INPLACE_FRAME_IMPL]
    這些檔案包含您的 [!output INPLACE_FRAME_CLASS]。這個類別衍生自 COleIPFrameWnd 並控制就地啟用 (In-Place Activate) 期間的所有框架功能。
[!endif]

[!if SUPPORT_COMPOUND_FILES]
    專案具有對複合檔案的支援。複合檔案格式會將包含一個或多個 Automation 物件的文件儲存到一個檔案，並且仍允許個別物件存取檔案。
[!endif]
[!endif]
[!else]

/////////////////////////////////////////////////////////////////////////////

[!if AUTOMATION]
應用程式精靈會建立一個對話方塊類別及一個 Automation Proxy 類別：
[!else]
應用程式精靈會建立一個對話方塊類別：
[!endif]

[!output DIALOG_HEADER]、[!output DIALOG_IMPL] - 對話方塊
    這些檔案包含您的 [!output DIALOG_CLASS] 類別。這個類別會定義應用程式主對話方塊的行為。對話方塊的範本是在可於 Microsoft Visual C++ 編輯的 [!output PROJECT_NAME].rc 中。
[!if AUTOMATION]

[!output DIALOG_AUTO_PROXY_HEADER]、[!output DIALOG_AUTO_PROXY_IMPL] - Automation 物件
    這些檔案包含您的 [!output DIALOG_AUTO_PROXY_CLASS] 類別。這個類別是對話方塊的 Automation Proxy 類別，因為它會處理如何公開 Automation 控制程式可用來存取對話方塊的 Automation 方法和屬性。這些方法和屬性並非直接從對話方塊類別公開，因為在強制回應對話方塊的 MFC 應用程式中，能更加完整且簡單地將 Automation 物件與使用者介面區隔開來。
[!endif]
[!endif]

[!if ACTIVEX_CONTROLS || PRINTING || SPLITTER || MAPI || SOCKETS]
/////////////////////////////////////////////////////////////////////////////

其他功能：
[!if ACTIVEX_CONTROLS]

ActiveX 控制項
    應用程式包括使用 ActiveX 控制項的支援。
[!endif]
[!if PRINTING]

列印和預覽列印支援
    應用程式精靈藉由從 MFC 程式庫呼叫 CView 類別中的成員函式，產生處理列印、列印設定與列印預覽命令的程式碼。
[!endif]
[!if DB_SUPPORT_HEADER_ONLY && !APP_TYPE_DLG]

資料庫支援
    應用程式精靈已為您的程式新增基本層級的資料庫支援。只包含所需的檔案。
[!endif]
[!if SPLITTER && !APP_TYPE_DLG]

分隔視窗
    應用程式精靈已為您的應用程式文件新增分隔視窗的支援。
[!endif]
[!if MAPI]

MAPI 支援
    產生的專案包含建立、操作、傳輸和儲存郵件訊息所需的程式碼。
[!endif]
[!if SOCKETS]

Windows Sockets
    應用程式具備透過 TCP/IP 網路建立通訊的支援。
[!endif]

[!endif]
/////////////////////////////////////////////////////////////////////////////

其他標準檔案：

StdAfx.h, StdAfx.cpp
    這些檔案是用來建置名為 [!output PROJECT_NAME].pch 的先行編譯標頭 (PCH) 檔，以及名為 StdAfx.obj 的先行編譯型別檔。

Resource.h
    這是標準標頭檔，它定義新的資源 ID。Microsoft Visual C++ 會讀取和更新這個檔案。

[!if MANIFEST]
[!output PROJECT_NAME].manifest
	Windows XP 會使用應用程式資訊清單檔案來描述特定並存組件版本的應用程式相依性。載入器會使用這項資訊載入組件快取中的適當組件，或應用程式中的私用組件。應用程式資訊清單可能隨附用於轉散發，做為與應用程式可執行檔相同資料夾中所安裝的外部 .manifest 檔案，或是以資源的形式隨附在可執行檔中。
[!endif]
/////////////////////////////////////////////////////////////////////////////

其他注意事項:

應用程式精靈使用 "TODO:" 來指示您應該加入或自訂的原始程式碼部分。
[!if APP_TYPE_MDI || APP_TYPE_TABBED_MDI || APP_TYPE_SDI || APP_TYPE_DLG || APP_TYPE_MTLD]

如果您的應用程式使用 MFC 的共用 DLL，您將需要轉散發 MFC DLL。如果您的應用程式採用不同於作業系統地區設定的語言，您還必須轉散發對應的當地語系化資源 mfc110XXX.DLL。
如需這兩個主題的詳細資訊，請參閱 MSDN 文件中轉散發 Visual C++ 應用程式的章節。
[!endif]

/////////////////////////////////////////////////////////////////////////////
