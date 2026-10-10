@echo off
chcp 65001 > nul
cd /d "%~dp0"

where git >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    set "PATH=%PATH%;C:\Program Files\Git\cmd;C:\Program Files\Git\bin"
)

echo =========================================
echo    BAIXAR ATUALIZACOES DO GITHUB
echo    Versao Oficial (Atualizado: 09/10/2026)
echo =========================================
echo.

echo 1. Puxando as ultimas alteracoes da nuvem (git pull)...
git pull origin main

echo.
echo =========================================
if %ERRORLEVEL% EQU 0 (
    echo [SUCESSO] Seu projeto esta sincronizado com a ultima versao oficial!
) else (
    echo [ERRO] Falha ao baixar as atualizacoes.
    echo Pode haver alteracoes nao salvas no seu computador que conflitam.
)
echo =========================================
echo.
pause
