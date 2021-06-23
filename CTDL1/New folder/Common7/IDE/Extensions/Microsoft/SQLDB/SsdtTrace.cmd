@echo off
if "%~1"=="" goto usage
if "%~1"=="start" goto start
if "%~1"=="stop" goto stop
if "%~1"=="view" goto view

goto usage

:start

if "%~3"=="" goto usage
logman start MicrosoftDacFx -p {79F618AD-4B02-4D46-A525-F5A93C551DDD} 0x800 -o "%~2" -ets
logman start MicrosoftSsdt -p {77142e1c-50fe-42cc-8a75-00c27af955c0} 0x800 -o "%~3" -ets

goto end

:stop
logman stop MicrosoftDacFx -ets
logman stop MicrosoftSsdt -ets

goto end

:view

if "%2"=="" goto usage
tracerpt -l "%~2" -o "%~2.xml" -summary "%~2.summary.txt"

goto end


:usage

echo usage:
echo        %~nx0 start DacFx.etl Ssdt.etl
echo        %~nx0 stop
echo        %~nx0 view DacFxOrSsdt.etl

:end
