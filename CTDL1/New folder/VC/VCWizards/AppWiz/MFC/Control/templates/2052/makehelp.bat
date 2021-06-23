@echo off
[!if HM_NOTE]

REM -- 请注意：OEM 字符集与 ANSI 字符集差异
REM -- 下面许多文件名在大多数编辑器中显示异常，因为它们需要
REM -- 包含在 OEM 字符集中才能使批处理文件工作正常，而不能包含在 ANSI 
REM -- 字符集中。输出窗口和编辑器窗口支持 ANSI 字符集。
REM -- 仅在输出窗口中显示的名称均保留
REM -- 在 ANSI 字符集中。

[!endif]
REM -- 首先，从 resource.h 创建映射文件
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
REM -- 为项目 [!output PROJECT_NAME] 创建帮助
start /wait hcw /C /E /M "[!output PROJECT_NAME_OEM].hpj"
echo.
