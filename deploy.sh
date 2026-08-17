#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if [ -f "${SCRIPT_DIR}/.env" ]; then
    set -a
    source "${SCRIPT_DIR}/.env"
    set +a
fi

DINF_USER="${DINF_USER:-${DINF_USERNAME:-}}"
DINF_PASS="${DINF_PASS:-${DINF_PASSWORD:-}}"
DINF_HOST="${DINF_HOST:-ssh.inf.ufpr.br}"
DINF_PORT="${DINF_PORT:-22}"
REMOTE_PATH="${REMOTE_PATH:-/home/html/inf/${DINF_USER}}"
LOCAL_PATH="${LOCAL_PATH:-${SCRIPT_DIR}/}"

if [ -z "${DINF_USER}" ] || [ -z "${DINF_PASS}" ]; then
    echo "Erro: DINF_USER e DINF_PASS devem estar definidos no ambiente ou no arquivo .env."
    exit 1
fi

if ! command -v sshpass &> /dev/null; then
    echo "Erro: O utilitário 'sshpass' não foi encontrado."
    exit 1
fi

echo "==> Iniciando deploy para ${DINF_USER}@${DINF_HOST}:${REMOTE_PATH}..."

export SSHPASS="${DINF_PASS}"

sshpass -e rsync -avz --delete \
  -e "ssh -p ${DINF_PORT} -o StrictHostKeyChecking=no" \
  --exclude ".git" \
  --exclude ".github" \
  --exclude "node_modules" \
  --exclude ".DS_Store" \
  --exclude ".env*" \
  --exclude "deploy.sh" \
  "${LOCAL_PATH}" "${DINF_USER}@${DINF_HOST}:${REMOTE_PATH}/"

echo "==> Ajustando permissões remotas..."
sshpass -e ssh -p "${DINF_PORT}" -o StrictHostKeyChecking=no "${DINF_USER}@${DINF_HOST}" "chmod -R g=rX,o=rX ${REMOTE_PATH}"

echo "==> Deploy concluído com sucesso!"
echo "==> Acesse sua página em: https://www.inf.ufpr.br/${DINF_USER}/"
