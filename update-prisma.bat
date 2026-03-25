@echo off
echo Stopping any Node processes...
taskkill /F /IM node.exe 2>nul
timeout /t 2 /nobreak >nul

echo.
echo Generating Prisma Client...
npx prisma generate

echo.
echo Pushing schema to database...
npx prisma db push

echo.
echo Done! You can now restart your dev server.
pause
