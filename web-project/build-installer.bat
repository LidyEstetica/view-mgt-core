@echo off
echo =====================================================
echo Construindo o instalador da Lidy Estetica
echo =====================================================
echo.

REM Mudar para o diretório do script
cd /d "%~dp0"
echo Diretório atual: %CD%
echo.

REM Limpar cache anterior
echo Limpando cache...
rmdir /s /q "node_modules\.cache" 2>nul
rmdir /s /q "C:\Users\%USERNAME%\AppData\Local\electron-builder\Cache\winCodeSign" 2>nul
echo Cache limpo com sucesso!
echo.

REM Confirmar que o ambiente está pronto
echo Verificando dependências...
call npm list electron-builder --depth=0
if %ERRORLEVEL% NEQ 0 (
    echo Instalando dependências...
    call npm install
)
echo.

REM Verificar se o ícone existe
if not exist "src\assets\LOGO-LIDY.ico" (
    echo AVISO: O arquivo de ícone não foi encontrado em src\assets\LOGO-LIDY.ico
    echo AVISO: O instalador será criado sem o ícone personalizado.
    echo.
)

REM Construir o projeto
echo Construindo o projeto...
call npm run build
echo.

REM Construir o instalador
echo Construindo o instalador...
call electron-builder --win --x64
echo.

echo Verificando se o instalador foi criado...
if exist "dist_electron\LidyEstetica-Setup-1.0.0.exe" (
    echo =====================================================
    echo Instalador criado com sucesso!
    echo Localização: dist_electron\LidyEstetica-Setup-1.0.0.exe
    echo =====================================================
) else (
    echo =====================================================
    echo Falha ao criar o instalador. Verifique os erros acima.
    echo =====================================================
)

echo.
pause 