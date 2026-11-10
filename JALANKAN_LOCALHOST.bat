@echo off
title SmartHealth RSUD Dr. H. Abdul Moeloek Provinsi Lampung - Localhost Server
cls
echo ====================================================================
echo   SmartHealth - Sistem Antrean & EMR Terpadu RSUDAM Provinsi Lampung
echo ====================================================================
echo.
echo Menjalankan Web Server Localhost...
echo Halaman akan otomatis terbuka di browser Anda (http://localhost:8080).
echo.
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0server.ps1"
pause

