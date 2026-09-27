@echo off
echo ===================================================
echo   Starting 4 PARK - Kotlin Ktor Application
echo ===================================================

where gradle >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo [INFO] Found Gradle in PATH. Running build and server...
    gradle run
) else (
    where gradlew >nul 2>nul
    if %ERRORLEVEL% EQU 0 (
        echo [INFO] Running with Gradle Wrapper...
        gradlew.bat run
    ) else (
        echo [NOTICE] Gradle is not found in your system PATH.
        echo Opening 4 PARK in your default browser...
        start "" "%~dp0index.html"
        echo.
        echo To run the Kotlin Ktor backend, install Gradle or open this folder in IntelliJ IDEA / Antigravity IDE.
    )
)
pause
