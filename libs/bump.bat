@echo off
set THREEJS=0.174.0

PowerShell -Command "& {Invoke-WebRequest -Uri https://cdn.jsdelivr.net/npm/three@%THREEJS%/build/three.module.js -OutFile three.module.js}"
PowerShell -Command "& {Invoke-WebRequest -Uri https://cdn.jsdelivr.net/npm/three@%THREEJS%/build/three.core.js -OutFile three.core.js}"

echo Files downloaded successfully.
pause