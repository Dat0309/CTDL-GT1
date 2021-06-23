@echo off
[!if HM_NOTE]

REM -- NOTARE LE DIFFERENZE TRA SET DI CARATTERI OEM E ANSI
REM -- Molti nomi file riportati di seguito risultano insoliti nella maggioranza degli editor perché devono essere 
REM -- nel set di caratteri OEM e non nel set di caratteri ANSI per permettere ai  
REM -- file batch di funzionare correttamente. La finestra di output e dell'editor funzionano con il set di caratteri ANSI.  
REM -- Se i nomi vengono visualizzati solo nella finestra di output, significa che sono stati lasciati nel 
REM -- set di caratteri ANSI.

[!endif]
REM -- Per prima cosa creare il file di mappa da resource.h
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
REM -- Creare la Guida per il progetto [!output PROJECT_NAME]
start /wait hcw /C /E /M "[!output PROJECT_NAME_OEM].hpj"
echo.
