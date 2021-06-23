@echo off
[!if HM_NOTE]

REM -- REMARQUE : DIFFÉRENCES ENTRE LES JEUX DE CARACTÈRES OEM ET ANSI
REM -- Beaucoup des noms de fichiers ci-dessous ont une apparence étrange dans la plupart des éditeurs, car ils doivent utiliser 
REM -- le jeu de caractères OEM, et non le jeu de caractères ANSI, pour que les fichiers  
REM -- de commandes fonctionnent correctement. Les fenêtres de sortie et de l'éditeur utilisent le jeu de caractères ANSI.  
REM -- Lorsque les noms s'affichent seulement dans la fenêtre de sortie, ils utilisent toujours le 
REM -- jeu de caractères ANSI.

[!endif]
REM -- Créez d'abord un fichier de mappage à partir de resource.h
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
REM -- Créez de l'aide pour le projet [!output PROJECT_NAME]
start /wait hcw /C /E /M "[!output PROJECT_NAME_OEM].hpj"
echo.
