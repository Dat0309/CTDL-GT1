@echo off
[!if HM_NOTE]

REM -- 注意: OEM 文字セットと ANSI 文字セットの違い
REM -- 以下のファイル名の多くは、ほとんどのエディターで正常に表示されません。
REM -- バッチ ファイルが正常に機能するためには、ファイル名は ANSI 文字セットではなく
REM -- OEM 文字セットにする必要があります。出力ウィンドウおよびエディター ウィンドウは、ANSI 文字セットで動作します。
REM -- ファイル名が出力ウィンドウでのみ表示される場合、ファイル名は
REM -- ANSI 文字セットになっています。

[!endif]
REM -- 最初に resource.h からマップ ファイルを作成します
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
REM -- プロジェクト [!output PROJECT_NAME] のヘルプを作成します
start /wait hcw /C /E /M "[!output PROJECT_NAME_OEM].hpj"
echo.
