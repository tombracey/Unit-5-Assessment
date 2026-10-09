@echo off

REM Database
docker compose up -d

REM Backend
cd backend
call npm install
call npm run build
start "backend" cmd /c "npm start"
cd ..

REM Frontend
cd frontend
call npm install
call npm start