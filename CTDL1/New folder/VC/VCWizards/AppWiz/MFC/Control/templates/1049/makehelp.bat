@echo off
[!if HM_NOTE]

REM -- ПРИМЕЧАНИЕ. РАЗЛИЧИЯ МЕЖДУ КОДИРОВКАМИ OEM И ANSI
REM -- Многие имена файлов неверно отображаются в большинстве редакторов, поскольку 
REM -- для правильной работы файлов пакета эти имена должны указываться в кодировке OEM,  
REM -- а не в кодировке ANSI. Окна вывода и редактора работают с кодировкой ANSI.  
REM -- Если имена отображаются только в окне вывода, они оставлены в 
REM -- кодировке ANSI.

[!endif]
REM -- Сначала создайте файл сопоставления из файла resource.h
echo // MAKEHELP.BAT generated Help Map file.  Used by [!output PROJECT_NAME].HPJ. > "hlp\[!output HM_FILE_OEM].hm"
echo. >>hlp\[!output HM_FILE_OEM].hm
echo // Commands (ID_* and IDM_*) >> "hlp\[!output HM_FILE_OEM].hm"
makehm ID_,HID_,0x10000 IDM_,HIDM_,0x10000 resource.h >> "hlp\[!output HM_FILE_OEM].hm"
echo. >> "hlp\[!output HM_FILE_OEM].hm"
echo // Prompts (IDP_*) >> "hlp\[!output HM_FILE_OEM].hm"
makehm IDP_,HIDP_,0x30000 resource.h >> "hlp\[!output HM_FILE_OEM].hm"
echo. >> "hlp\[!output HM_FILE_OEM].hm"
echo // Resources (IDR_*) >> "hlp\[!output HM_FILE_OEM].hm"
makehm IDR_,HIDR_,0x20000 resource.h >> "hlp\[!output HM_FILE_OEM].hm"
echo. >> "hlp\[!output HM_FILE_OEM].hm"
echo // Dialogs (IDD_*) >> "hlp\[!output HM_FILE_OEM].hm"
makehm IDD_,HIDD_,0x20000 resource.h >> "hlp\[!output HM_FILE_OEM].hm"
echo. >> "hlp\[!output HM_FILE_OEM].hm"
echo // Frame Controls (IDW_*) >> "hlp\[!output HM_FILE_OEM].hm"
makehm IDW_,HIDW_,0x50000 resource.h >> "hlp\[!output HM_FILE_OEM].hm"
REM -- Создание справки для проекта [!output PROJECT_NAME]
start /wait hcw /C /E /M "[!output PROJECT_NAME_OEM].hpj"
echo.
