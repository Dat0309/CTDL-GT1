========================================================================
    ACTIVEX CONTROL DLL：[!output PROJECT_NAME] 專案概觀
========================================================================

ControlWizard 已經針對 [!output PROJECT_NAME] ActiveX 控制項建立這個專案 (其中包含 1 個控制項)。

這個基本架構專案不僅示範了撰寫 ActiveX 控制項的基本概念，同時也是您撰寫
控制項特定功能的起點。

這個檔案包含一份摘要，簡要說明構成 [!output PROJECT_NAME] ActiveX 控制項
DLL 的所有檔案，它們個別的內容。

[!output PROJECT_NAME].vcxproj
    這是使用應用程式精靈所產生之 VC++ 專案的主要專案檔。它含有產生該檔案之 Visual C++ 的版本資訊，以及有關使用應用程式精靈所選取之平台、組態和專案功能的資訊。

[!output PROJECT_NAME].vcxproj.filters
    這是使用應用程式精靈所產生之 VC++ 專案的篩選檔。檔案中含有您專案中檔案與篩選器之間關聯的相關資訊。這項關聯用於 IDE 中以顯示特定節點下具有類似副檔名之檔案的群組 (例如，".cpp" 檔案會與 "Source Files" 篩選器相關聯)。

[!output PROJECT_NAME].h
    這是 ActiveX 控制項 DLL 的主要 Include 檔案。它包含了其他專案專用的 Include 檔，例如 resource.h。

[!output PROJECT_NAME].cpp
    這是含有 DLL 初始設定、終止和其他記錄之程式碼的主要原始程式檔。

[!output RC_FILE_NAME]
    這是專案所用的所有 Microsoft Windows 資源的列表。這個檔案可以直接用 Visual C++ 資源編輯器進行編輯。

[!output PROJECT_NAME].def
    這個檔案含有配合 Microsoft Windows 執行時必須提供之 ActiveX 控制項 DLL 的相關資訊。

[!output SAFE_IDL_NAME].idl
    這個檔案含有您的控制項型別程式庫的物件描述語言原始程式碼。

[!if ABOUT_BOX]
[!output PROJECT_NAME].ico
    這個檔案含有會出現在 [關於] 方塊中的圖示。這個圖示是包含在主要資源檔 [!output PROJECT_NAME].rc 中。

[!endif]
/////////////////////////////////////////////////////////////////////////////
[!output CONTROL_CLASS] control:

[!output CONTROL_HEADER]
    這個檔案含有 [!output CONTROL_CLASS] C++ 類別的宣告。

[!output CONTROL_IMPL]
    這個檔案含有 [!output CONTROL_CLASS] C++ 類別的實作。

[!output PROPERTY_PAGE_HEADER]
    這個檔案含有 [!output PROPERTY_PAGE_CLASS] C++ 類別的宣告。

[!output PROPERTY_PAGE_IMPL]
    這個檔案含有 [!output PROPERTY_PAGE_CLASS] C++ 類別的實作。

[!output CONTROL_CLASS].bmp
    這個檔案含有當 [!output CONTROL_CLASS] 控制項出現在工具板上時，容器用於表示該控制項的點陣圖。這個點陣圖是包含在主要資源檔 [!output PROJECT_NAME].rc 中。

[!if HELP_FILES]
/////////////////////////////////////////////////////////////////////////////
說明支援：

[!output PROJECT_NAME].hpj
    這個檔案是說明專案檔，說明編譯器用它來建立 ActiveX 控制項的說明檔。

*.bmp
    這些是 MFC 程式庫標準命令之標準說明檔主題所需的點陣圖檔。這些檔案位於 HLP 子目錄中。

[!output PROJECT_NAME].rtf
    這個檔案含有許多 ActiveX 控制項支援之通用屬性、事件和方法的標準說明主題。您可以編輯這個檔案，新增或移除其他的控制項特定主題。這個檔案位於 HLP 子目錄中。

[!endif]
[!if RUNTIME_LICENSE]
/////////////////////////////////////////////////////////////////////////////
授權支援：

[!output PROJECT_NAME].lic
    這是使用者授權檔。這個檔案必須與控制項的 DLL 放在同一個目錄，才能在設計階段環境中建立控制項的執行個體。通常，您會隨同控制項一起散發這個檔案，但是您的客戶不得散發它。

[!endif]
/////////////////////////////////////////////////////////////////////////////
其他標準檔案：

stdafx.h, stdafx.cpp
    這些檔案是用來建置名為 [!output PROJECT_NAME].pch 的先行編譯標頭 (PCH) 檔，以及名為 stdafx.obj 的先行編譯型別 (PCT) 檔。

resource.h
    這是標準標頭檔，它定義新的資源 ID。Visual C++ 資源編輯器會讀取和更新這個檔案。

/////////////////////////////////////////////////////////////////////////////
其他注意事項:

ControlWizard 使用 "TODO:" 來指示您應該加入或自訂的原始程式碼部分。

/////////////////////////////////////////////////////////////////////////////
