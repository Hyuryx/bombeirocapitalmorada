@echo off
chcp 65001 > nul
cd /d "%~dp0"

where git >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    set "PATH=%PATH%;C:\Program Files\Git\cmd;C:\Program Files\Git\bin"
)

echo =========================================
echo    ENVIAR ATUALIZACOES PARA O GITHUB
echo    Versao Oficial (Atualizado: 09/10/2026)
echo =========================================
echo.

echo 1. Verificando alteracoes locais...
set FS=0
set AHEAD=0

git status --porcelain > "%temp%\git_status.tmp" 2>nul
for %%I in ("%temp%\git_status.tmp") do set FS=%%~zI
del "%temp%\git_status.tmp" 2>nul

git rev-list origin/main..HEAD > "%temp%\git_ahead.tmp" 2>nul
for %%I in ("%temp%\git_ahead.tmp") do set AHEAD=%%~zI
del "%temp%\git_ahead.tmp" 2>nul

if not defined FS set FS=0
if not defined AHEAD set AHEAD=0

if %FS% EQU 0 if %AHEAD% EQU 0 (
    echo.
    echo =========================================
    echo [INFORMACAO] Nenhuma alteracao nova foi encontrada para enviar.
    echo =========================================
    echo.
    pause
    exit /b 0
)

if %FS% GTR 0 (
    echo 2. Adicionando arquivos alterados...
    git add .
    echo.
    echo 3. Criando commit com a data e hora atual...
    for /f "tokens=2 delims==" %%a in ('wmic OS Get localdatetime /value') do set "dt=%%a"
    set "YY=%dt:~2,2%" & set "YYYY=%dt:~0,4%" & set "MM=%dt:~4,2%" & set "DD=%dt:~6,2%"
    set "HH=%dt:~8,2%" & set "Min=%dt:~10,2%" & set "Sec=%dt:~12,2%"
    
    git commit -m "Atualizacao automatica - %DD%/%MM%/%YYYY% as %HH%:%Min%"
) else (
    echo [INFORMACAO] Alteracoes ja salvas localmente, enviando...
)

echo.
echo 4. Baixando novidades da nuvem (git pull)...
git pull origin main --no-edit

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo =========================================
    echo [ERRO DE CONFLITO] O Git nao conseguiu juntar o codigo.
    echo Voce tem alteracoes conflitantes.
    echo =========================================
    echo.
    pause
    exit /b 1
)

echo.
echo 5. Enviando tudo para o GitHub e Vercel (git push)...
git push origin main

echo.
echo =========================================
if %ERRORLEVEL% EQU 0 (
    echo [SUCESSO] O site oficial esta sendo atualizado na Vercel!
) else (
    echo [ERRO] Ocorreu uma falha ao enviar.
)
echo =========================================
echo.
pause
