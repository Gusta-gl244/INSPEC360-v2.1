#!/bin/bash

# Script para construir INSPEC360 localmente
# Simula o que o Render fará

echo "🔨 Construindo INSPEC360..."

# Instalar dependências do frontend
echo "📦 Instalando dependências do frontend..."
npm install

# Construir frontend
echo "🏗️  Construindo frontend..."
npm run build

if [ ! -d "dist" ]; then
  echo "❌ Erro: dist/ não foi criado"
  exit 1
fi

echo "✅ Frontend construído em: ./dist"

# Instalar e inicializar backend
echo "📦 Instalando dependências do backend..."
cd backend
npm install

echo "🗄️  Inicializando banco de dados..."
npm run init-db

cd ..

echo "✅ Build completo!"
echo ""
echo "Para testar localmente:"
echo "  1. Terminal 1: cd backend && npm start"
echo "  2. Terminal 2: npm run dev"
echo "  3. Abrir: http://localhost:5173"
