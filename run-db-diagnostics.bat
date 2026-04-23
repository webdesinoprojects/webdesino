@echo off
REM Database Diagnostic Script - Windows
REM Run from project root directory
REM Usage: run-db-diagnostics.bat

echo.
echo ==========================================
echo  Database Diagnostics
echo ==========================================
echo.

if exist .env (
    echo ✓ Found .env file
) else (
    echo ✗ .env file not found
    echo   Please create .env with DATABASE_URL
    pause
    exit /b 1
)

echo.
echo Running comprehensive database checks...
echo.

call npm run diagnose:db

echo.
pause
