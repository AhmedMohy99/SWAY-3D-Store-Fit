@echo off
echo.
echo ========================================
echo SWAY 3D Virtual Fitting Room - Setup
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed.
    echo Please install Node.js from: https://nodejs.org/
    pause
    exit /b 1
)

echo [OK] Node.js is installed
node -v
echo [OK] npm version:
npm -v
echo.

REM Navigate to project directory
cd /d "%~dp0"

REM Install dependencies
echo Installing dependencies...
echo This may take a few minutes...
echo.
call npm install

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo [SUCCESS] Installation complete!
    echo ========================================
    echo.
    echo Your SWAY 3D Fitting Room is ready!
    echo.
    echo To start the development server:
    echo   npm run dev
    echo.
    echo Then open your browser to:
    echo   http://localhost:3000
    echo.
) else (
    echo.
    echo [ERROR] Installation failed.
    echo Please check the error messages above.
    echo.
)

pause
