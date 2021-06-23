@echo off
[!if HM_NOTE]

REM -- 참고: OEM 문자 집합과 ANSI 문자 집합의 차이점
REM -- 아래에 있는 파일 이름 대부분이 대다수의 편집기에서 이상하게 나타나는데, 이는 
REM -- 배치 파일이 올바르게 작동되기 위해서는  
REM -- 파일 이름이 ANSI 문자 집합이 아니라 OEM 문자 집합에 있어야 하기 때문입니다. 출력 및 편집기 창에는 ANSI 문자 집합이 사용됩니다.  
REM -- 출력 창에만 이름이 보이는 경우는 
REM -- 이름이 ANSI 문자 집합에 남아있는 경우입니다.

[!endif]
REM -- 먼저, resource.h에서 맵 파일을 만듭니다.
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
REM -- 프로젝트 [!output PROJECT_NAME]에 대한 도움말을 만듭니다.
start /wait hcw /C /E /M "[!output PROJECT_NAME_OEM].hpj"
echo.
