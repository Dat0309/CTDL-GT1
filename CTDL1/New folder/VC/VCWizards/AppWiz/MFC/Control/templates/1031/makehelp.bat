@echo off
[!if HM_NOTE]

REM -- HINWEIS: UNTERSCHIEDE ZWISCHEN OEM- UND ANSI-ZEICHENSATZ
REM -- Viele Dateinamen werden in den meisten Editoren fehlerhaft angezeigt, da sie 
REM -- den OEM- und nicht den ANSI-Zeichensatz aufweisen müssen, damit Batchdateien  
REM -- ordnungsgemäß ausgeführt werden. Der ANSI-Zeichensatz wird im Eingabe- und im Editorfenster richtig dargestellt.  
REM -- Wenn Namen nur im Ausgabefenster angezeigt werden, weisen sie noch den 
REM -- ANSI-Zeichensatz auf.

[!endif]
REM -- Erstellen Sie zunächst eine Zuordnungsdatei aus "resource.h"
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
REM -- Erstellen Sie Hilfe für Projekt [!output PROJECT_NAME]
start /wait hcw /C /E /M "[!output PROJECT_NAME_OEM].hpj"
echo.
