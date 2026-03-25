@echo off
REM Script to seed all locations from JSON file

echo.
echo ===================================================
echo  WebDesino - Location Bulk Upload Script
echo ===================================================
echo.

REM Check if node_modules exists
if not exist "node_modules" (
  echo 📦 Installing dependencies...
  call npm install
  echo.
)

REM Check if Prisma client is generated
if not exist "lib\generated\prisma" (
  echo 🔧 Generating Prisma client...
  call npx prisma generate
  echo.
)

echo 🚀 Starting location upload...
echo.

REM Run the seed script
call npx ts-node --compiler-options {\"module\":\"CommonJS\"} scripts/seed-locations.ts

echo.
echo ===================================================
echo  Process Completed!
echo ===================================================
echo.
echo 📌 Next Steps:
echo 1. Go to Admin Panel -> Navigate to Locations section
echo 2. Use the State filter to view locations by state
echo 3. Each location has 5 assigned services
echo.

pause
