#!/bin/bash

echo "🚀 Iniciando deploy para o DINF..."

if [ -f .env ]; then
    source .env
fi

HOST=${DINF_HOST:-ssh.inf.ufpr.br}
USERNAME=${DINF_USERNAME:-vhwcm}
REMOTE_DIR="public_html/"

echo "📦 Enviando arquivos..."
rsync -avz --progress \
    --exclude='.git/' \
    --exclude='.github/' \
    --exclude='.env' \
    --exclude='.env.example' \
    --exclude='deploy.sh' \
    --exclude='README.md' \
    --exclude='.gitignore' \
    index.html styles.css script.js locales/ pesquisa-redes-sociais/ projetos/ \
    ${USERNAME}@${HOST}:${REMOTE_DIR}

if [ $? -eq 0 ]; then
    echo "✅ Arquivos enviados com sucesso!"
    echo "🔧 Ajustando permissões..."
    ssh ${USERNAME}@${HOST} "chmod -R g=rX,o=rX ${REMOTE_DIR}"
    echo "✨ Deploy concluído!"
    echo "🌐 Seu site está em: https://www.inf.ufpr.br/${USERNAME}"
else
    echo "❌ Erro no deploy!"
    exit 1
fi
