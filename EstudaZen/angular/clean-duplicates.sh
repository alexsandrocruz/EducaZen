#!/bin/bash

# Script para limpar arquivos duplicados do repositório Angular
# EducaZen - Angular Cleanup Script

set -e  # Exit on error

echo "========================================="
echo "EducaZen - Limpeza de Arquivos Duplicados"
echo "========================================="
echo ""

# Verificar se estamos na pasta correta
if [ ! -f "angular.json" ]; then
    echo "❌ ERRO: Execute este script na pasta EstudaZen/angular"
    exit 1
fi

echo "📂 Diretório atual: $(pwd)"
echo ""

# Fazer backup do git status
echo "📋 Status do Git antes da limpeza:"
git status --short
echo ""

# Confirmar com o usuário
read -p "⚠️  Tem certeza que deseja remover os arquivos duplicados? (s/N) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Ss]$ ]]; then
    echo "❌ Operação cancelada."
    exit 1
fi

echo ""
echo "🧹 Iniciando limpeza..."
echo ""

# Contar arquivos a serem removidos
count=0

# Função para remover e contar
remove_if_exists() {
    if [ -e "$1" ]; then
        echo "  🗑️  Removendo: $1"
        rm -rf "$1"
        ((count++))
    fi
}

# Remover pastas duplicadas
echo "📁 Removendo pastas duplicadas..."
remove_if_exists "./src 2"
remove_if_exists "./app 2"
remove_if_exists "./e2e 2"
remove_if_exists "./scripts 2"
remove_if_exists "./.vscode 2"

# Remover arquivos de configuração duplicados
echo ""
echo "📄 Removendo arquivos de configuração duplicados..."
remove_if_exists "./.editorconfig 2"
remove_if_exists "./.editorconfig 4"
remove_if_exists "./.eslintrc 2.json"
remove_if_exists "./.eslintrc 3.json"
remove_if_exists "./.gitignore 2"
remove_if_exists "./.gitignore 3"
remove_if_exists "./.prettierrc 2"
remove_if_exists "./.prettierrc 3"

# Remover Dockerfiles duplicados
echo ""
echo "🐳 Removendo Dockerfiles duplicados..."
remove_if_exists "./Dockerfile 2"
remove_if_exists "./Dockerfile 2.local"
remove_if_exists "./Dockerfile 3"
remove_if_exists "./Dockerfile 4.local"

# Remover arquivos de documentação duplicados
echo ""
echo "📚 Removendo documentação duplicada..."
remove_if_exists "./README 2.md"
remove_if_exists "./README 3.md"

# Remover arquivos de build duplicados
echo ""
echo "⚙️  Removendo arquivos de build duplicados..."
remove_if_exists "./angular 2.json"
remove_if_exists "./dynamic-env 2.json"
remove_if_exists "./dynamic-env 4.json"
remove_if_exists "./karma.conf 2.js"
remove_if_exists "./karma.conf 3.js"
remove_if_exists "./nginx 2.conf"
remove_if_exists "./nginx 4.conf"
remove_if_exists "./package 2.json"
remove_if_exists "./package-lock 2.json"
remove_if_exists "./tsconfig 2.json"
remove_if_exists "./tsconfig 3.json"
remove_if_exists "./tsconfig.app 2.json"
remove_if_exists "./tsconfig.app 3.json"
remove_if_exists "./tsconfig.spec 2.json"
remove_if_exists "./tsconfig.spec 3.json"
remove_if_exists "./web 2.config"
remove_if_exists "./web 3.config"

# Remover scripts duplicados
echo ""
echo "🚀 Removendo scripts duplicados..."
remove_if_exists "./start 2.ps1"
remove_if_exists "./start 3.ps1"

echo ""
echo "========================================="
echo "✅ Limpeza concluída!"
echo "========================================="
echo ""
echo "📊 Total de itens removidos: $count"
echo ""

# Verificar status do Git após limpeza
echo "📋 Status do Git após limpeza:"
git status --short
echo ""

# Sugerir próximos passos
echo "🔧 Próximos passos sugeridos:"
echo "  1. Verificar se o projeto compila: npm install && npm run build"
echo "  2. Executar testes: npm test"
echo "  3. Commit das mudanças: git add . && git commit -m 'chore: remove duplicated files'"
echo ""
