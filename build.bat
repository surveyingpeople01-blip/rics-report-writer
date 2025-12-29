@echo off
echo ========================================
echo  RICS Report Writer - Build Script
echo ========================================
echo.

cd /d "%~dp0"

echo [1/3] Installing dependencies...
call npm install
if errorlevel 1 (
    echo ERROR: npm install failed
    pause
    exit /b 1
)

echo.
echo [2/3] Building production version...
call npm run build
if errorlevel 1 (
    echo ERROR: Build failed
    echo.
    echo Try these solutions:
    echo 1. Close VS Code and any programs using the files
    echo 2. Run this script as Administrator
    echo 3. Check BUILD_TROUBLESHOOTING.md for more help
    pause
    exit /b 1
)

echo.
echo [3/3] Verifying build...
if exist "dist\index.html" (
    echo SUCCESS! Build completed successfully.
    echo.
    echo The dist folder contains your deployable files:
    dir /b dist
    echo.
    echo Next steps:
    echo - For GitHub: Follow GITHUB_GUIDE.md
    echo - For Web Hosting: Upload dist folder contents to your server
) else (
    echo ERROR: Build completed but dist folder is missing
    echo Check BUILD_TROUBLESHOOTING.md for help
)

echo.
pause
