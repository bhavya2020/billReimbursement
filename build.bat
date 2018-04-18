@echo off
:loop
start /wait cmd /c npm run build

goto loop
