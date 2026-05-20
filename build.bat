@echo off
REM Script para construir INSPEC360 localmente
REM Simula o que o Render fará

echo.
echo 🔨 Construindo INSPEC360...
echo.

REM Instalar dependências do frontend
echo 📦 Instalando dependências do frontend...
call npm install

if errorlevel 1 (
  echo ❌ Erro ao instalar dependências do frontend
  exit /b 1
)

REM Construir frontend
echo 🏗️  Construindo frontend...
call npm run build

if errorlevel 1 (
  echo ❌ Erro ao construir frontend
  exit /b 1
)

if not exist "dist" (
  echo ❌ Erro: dist/ não foi criado
  exit /b 1
)

echo ✅ Frontend construído em: dist/
echo.

REM Instalar e inicializar backend
echo 📦 Instalando dependências do backend...
cd backend
call npm install

if errorlevel 1 (
  echo ❌ Erro ao instalar dependências do backend
  cd ..
  exit /b 1
)

echo 🗄️  Inicializando banco de dados...
call npm run init-db

if errorlevel 1 (
  echo ⚠️  Aviso: npm run init-db pode ter falhado, mas continuando...
)

cd ..

echo.
echo ✅ Build completo!
echo.
echo Para testar localmente:
echo   1. Terminal 1: cd backend ^&^& npm start
echo   2. Terminal 2: npm run dev
echo   3. Abrir: http://localhost:5173
echo.
