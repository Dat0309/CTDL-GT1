========================================================================
    MFC 程式庫：[!output PROJECT_NAME] 專案概觀
========================================================================


AppWizard 已經為您建立了這個 [!output PROJECT_NAME] DLL。這個 DLL 不僅
示範了使用 MFC 的基本概念，也是您撰寫 DLL 的起點。

這個檔案包含一份摘要，簡要說明構成 [!output PROJECT_NAME] DLL 的
所有檔案，它們個別的內容。

[!output PROJECT_NAME].vcxproj
    這是使用應用程式精靈所產生之 VC++ 專案的主要專案檔。它含有產生該檔案之 Visual C++ 的版本資訊，以及有關使用應用程式精靈所選取之平台、組態和專案功能的資訊。

[!output PROJECT_NAME].vcxproj.filters
    這是使用應用程式精靈所產生之 VC++ 專案的篩選檔。檔案中含有您專案中檔案與篩選器之間關聯的相關資訊。這項關聯用於 IDE 中以顯示特定節點下具有類似副檔名之檔案的群組 (例如，".cpp" 檔案會與 "Source Files" 篩選器相關聯)。

[!if DLL_TYPE_EXTENSION]
[!output PROJECT_NAME].cpp
    這是含有 DllMain() 定義的主要 DLL 原始程式檔。
[!else]
[!output PROJECT_NAME].h
    這是 DLL 的主要標頭檔。它宣告了 [!output APP_CLASS] 類別。

[!output PROJECT_NAME].cpp
    這是主要 DLL 原始程式檔。它含有 [!output APP_CLASS] 類別。
[!if AUTOMATION]
    它也含有 inproc 伺服器所需的 OLE 進入點。
[!endif]
[!endif]
[!if AUTOMATION]

[!output SAFE_IDL_NAME].idl
    這個檔案含有您的 DLL 型別程式庫的物件描述語言原始程式碼。
[!endif]

[!output RC_FILE_NAME]
    這是程式所用的所有 Microsoft Windows 資源的列表。它含有儲存在 RES 子目錄中的圖示、點陣圖和游標。您可以直接在 Microsoft Visual C++ 內編輯這個檔案。

res\[!output RC2_FILE_NAME].rc2
    這個檔案包含 Microsoft Visual C++ 無法編輯的資源。您應該將所有資源編輯器無法編輯的資源放到這個檔案。

[!output PROJECT_NAME].def
    這個檔案含有配合 Microsoft Windows 執行時，必須提供之 DLL 的相關資訊。它定義了如 DLL 的名稱和描述這類參數。它也從 DLL 匯出函式。

/////////////////////////////////////////////////////////////////////////////
其他標準檔案：

StdAfx.h, StdAfx.cpp
    這些檔案是用來建置名為 [!output PROJECT_NAME].pch 的先行編譯標頭 (PCH) 檔，以及名為 StdAfx.obj 的先行編譯型別檔。

Resource.h
    這是標準標頭檔，它定義新的資源 ID。Microsoft Visual C++ 會讀取和更新這個檔案。

/////////////////////////////////////////////////////////////////////////////
其他注意事項:

AppWizard 使用 "TODO:" 來指示您應該加入或自訂的原始程式碼部分。

/////////////////////////////////////////////////////////////////////////////
