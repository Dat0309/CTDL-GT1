@echo off
[!if HM_NOTE]

REM -- 請注意：OEM 與 ANSI 字元集的差異
REM -- 大多數編輯器可能無法辨識下面許多檔案名稱，因為它們必須
REM -- 在 OEM 字元集中，而非 ANSI 字元集，如此，批次
REM -- 檔案才能正確運作。輸出與編輯器視窗可以搭配 ANSI 字元集使用。
REM -- Where 名稱只出現在輸出視窗中，它們已保留在
REM -- ANSI 字元集。

[!endif]
REM -- 首先，從 resource.h 製作對應檔
echo // MAKEHELP.BAT generated Help Map file.Used by [!output PROJECT_NAME].HPJ.> "hlp\[!output HM_FILE_OEM].hm"
echo.>>hlp\[!output HM_FILE_OEM].hm
echo // Commands (ID_* and IDM_*) >> "hlp\[!output HM_FILE_OEM].hm"
makehm ID_,HID_,0x10000 IDM_,HIDM_,0x10000 resource.h >> "hlp\[!output HM_FILE_OEM].hm"
echo.>> "hlp\[!output HM_FILE_OEM].hm"
echo // Prompts (IDP_*) >> "hlp\[!output HM_FILE_OEM].hm"
makehm IDP_,HIDP_,0x30000 resource.h >> "hlp\[!output HM_FILE_OEM].hm"
echo.>> "hlp\[!output HM_FILE_OEM].hm"
echo // Resources (IDR_*) >> "hlp\[!output HM_FILE_OEM].hm"
makehm IDR_,HIDR_,0x20000 resource.h >> "hlp\[!output HM_FILE_OEM].hm"
echo.>> "hlp\[!output HM_FILE_OEM].hm"
echo // Dialogs (IDD_*) >> "hlp\[!output HM_FILE_OEM].hm"
makehm IDD_,HIDD_,0x20000 resource.h >> "hlp\[!output HM_FILE_OEM].hm"
echo.>> "hlp\[!output HM_FILE_OEM].hm"
echo // Frame Controls (IDW_*) >> "hlp\[!output HM_FILE_OEM].hm"
makehm IDW_,HIDW_,0x50000 resource.h >> "hlp\[!output HM_FILE_OEM].hm"
REM -- 製作專案 [!output PROJECT_NAME] 的說明
start /wait hcw /C /E /M "[!output PROJECT_NAME_OEM].hpj"
echo.
