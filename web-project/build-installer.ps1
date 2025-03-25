# Script PowerShell para construir o instalador da Lidy Estética

Write-Host "=============================================================" -ForegroundColor Cyan
Write-Host "      Construindo o instalador da Lidy Estética" -ForegroundColor Cyan
Write-Host "=============================================================" -ForegroundColor Cyan
Write-Host ""

# Garantir que estamos no diretório correto
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location -Path $scriptPath
Write-Host "Diretório atual: $($PWD.Path)" -ForegroundColor Yellow
Write-Host ""

# Limpar cache anterior
Write-Host "Limpando cache..." -ForegroundColor Green
if (Test-Path "node_modules\.cache") {
    Remove-Item -Path "node_modules\.cache" -Recurse -Force -ErrorAction SilentlyContinue
}
if (Test-Path "C:\Users\$env:USERNAME\AppData\Local\electron-builder\Cache\winCodeSign") {
    Remove-Item -Path "C:\Users\$env:USERNAME\AppData\Local\electron-builder\Cache\winCodeSign" -Recurse -Force -ErrorAction SilentlyContinue
}
Write-Host "Cache limpo com sucesso!" -ForegroundColor Green
Write-Host ""

# Instalar dependências necessárias
Write-Host "Instalando dependências..." -ForegroundColor Green
npm install terser --save-dev
if ($LASTEXITCODE -ne 0) {
    Write-Host "AVISO: Falha ao instalar terser. O build pode falhar." -ForegroundColor Yellow
    Write-Host ""
}
Write-Host "Dependências instaladas com sucesso!" -ForegroundColor Green
Write-Host ""

# Verificar o ícone
if (-not (Test-Path "src\assets\LOGO-LIDY.ico")) {
    Write-Host "AVISO: O arquivo de ícone não foi encontrado em src\assets\LOGO-LIDY.ico" -ForegroundColor Yellow
    Write-Host "AVISO: O instalador será criado sem o ícone personalizado." -ForegroundColor Yellow
    Write-Host ""
} else {
    Write-Host "Ícone encontrado: src\assets\LOGO-LIDY.ico" -ForegroundColor Green
    Write-Host ""
}

# Construir o projeto
Write-Host "Construindo o projeto..." -ForegroundColor Green
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERRO: Falha ao construir o projeto!" -ForegroundColor Red
    Write-Host ""
    pause
    exit 1
}
Write-Host ""

# Construir o instalador
Write-Host "Construindo o instalador..." -ForegroundColor Green
npx electron-builder --win --x64
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERRO: Falha ao construir o instalador!" -ForegroundColor Red
    Write-Host ""
    pause
    exit 1
}
Write-Host ""

# Verificar se o instalador foi criado
if (Test-Path "dist_electron\LidyEstetica-Setup-1.0.0.exe") {
    Write-Host "=============================================================" -ForegroundColor Green
    Write-Host "Instalador criado com sucesso!" -ForegroundColor Green
    Write-Host "Localização: dist_electron\LidyEstetica-Setup-1.0.0.exe" -ForegroundColor Green
    Write-Host "=============================================================" -ForegroundColor Green
} else {
    Write-Host "=============================================================" -ForegroundColor Red
    Write-Host "Falha ao criar o instalador. Verifique os erros acima." -ForegroundColor Red
    Write-Host "=============================================================" -ForegroundColor Red
}

Write-Host ""
pause 