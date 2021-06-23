@echo off
[!if HM_NOTE]

REM: OBSERVAR LAS DIFERENCIAS ENTRE LOS JUEGOS DE CARACTERES OEM Y ANSI
REM: Muchos de los nombres de archivo siguientes no se visualizan correctamente en la mayoría de los editores, ya que debe usarse 
REM: el juego de caracteres OEM, no ANSI, para que los archivos  
REM: por lotes funcionen correctamente. Las ventanas de salida y del editor funcionan con el juego de caracteres ANSI.  
REM: Cuando los nombres solo se ven en la ventana de salida, es porque se han dejado en 
REM: el juego de caracteres ANSI.

[!endif]
REM: En primer lugar, crear el archivo de mapa a partir de resource.h
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
REM: Crear ayuda para el proyecto [!output PROJECT_NAME]
start /wait hcw /C /E /M "[!output PROJECT_NAME_OEM].hpj"
echo.
