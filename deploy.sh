#!/bin/bash

# Script de deploy para o servidor DINF da UFPR
# Uso: ./deploy.sh

echo "🚀 Iniciando deploy para o DINF..."

# Configurações (carrega do .env se existir)
if [ -f .env ]; then
    source .env
fi

# Valores padrão se não estiverem no .env
HOST=${DINF_HOST:-ssh.inf.ufpr.br}
USERNAME=${DINF_USERNAME:-vhwcm}
REMOTE_DIR="public_html/"

# Envia os arquivos usando rsync (mais eficiente que scp)
echo "📦 Enviando arquivos..."
rsync -avz --progress \
    --exclude='.git/' \
    --exclude='.github/' \
    --exclude='.env' \
    --exclude='.env.example' \
    --exclude='deploy.sh' \
    --exclude='README.md' \
    --exclude='.gitignore' \
    index.html styles.css script.js locales/ \
    ${USERNAME}@${HOST}:${REMOTE_DIR}

# Verifica se deu certo
if [ $? -eq 0 ]; then
    echo "✅ Arquivos enviados com sucesso!"
    
    # Ajusta as permissões
    echo "🔧 Ajustando permissões..."
    ssh ${USERNAME}@${HOST} "chmod -R g=rX,o=rX ${REMOTE_DIR}"
    
    echo "✨ Deploy concluído!"
    echo "🌐 Seu site está em: https://www.inf.ufpr.br/${USERNAME}"
else
    echo "❌ Erro no deploy!"
    exit 1
fi
