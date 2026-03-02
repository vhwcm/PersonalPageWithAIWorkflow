[![Deploy to DINF](https://github.com/vhwcm/paginaPessoal/actions/workflows/deploy.yml/badge.svg)](https://github.com/vhwcm/paginaPessoal/actions/workflows/deploy.yml)
[![Auto-Translate](https://github.com/vhwcm/paginaPessoal/actions/workflows/auto-translate.yml/badge.svg)](https://github.com/vhwcm/paginaPessoal/actions/workflows/auto-translate.yml)
![i18n](https://img.shields.io/badge/i18n-automatic-blueviolet)
![LLM](https://img.shields.io/badge/AI-Gemini%20API-ffb400)

Este repositório contém o código-fonte da minha página pessoal hospedada no Departamento de Informática (DInf) da UFPR.

## Funcionalidades

- **Deploy Automático:**

  - Todo push na branch `main` dispara um workflow do GitHub Actions que publica a versão mais recente do site no servidor do DInf.

- **Internacionalização (i18n):**

  - Todo o conteúdo do site é traduzível usando arquivos JSON na pasta `locales/` (`pt.json` para português, `en.json` para inglês).

- **Tradução Automática com IA:**
  - Sempre que você adiciona ou altera uma chave em `locales/pt.json`, uma Action usa a IA Gemini do Google para traduzir automaticamente para o inglês e atualizar o `locales/en.json`.
  - Não é necessário traduzir manualmente!

## Como funciona

- **Deploy:**

  - Usa [appleboy/scp-action](https://github.com/appleboy/scp-action) e [appleboy/ssh-action](https://github.com/appleboy/ssh-action) para copiar os arquivos com segurança para o servidor do DInf e (opcionalmente) corrigir permissões.

- **Auto-tradução:**
  - Usa a [API Gemini do Google](https://aistudio.google.com/app/apikey) via um script Python em `.github/scripts/auto_translate.py`.
  - Só traduz chaves novas ou alteradas, preservando traduções já existentes.

## Segredos & Configuração

- Todas as informações sensíveis (credenciais do servidor, chave da Gemini) ficam em secrets do GitHub e **nunca** são commitadas no repositório.
- Veja `.env.example` para as variáveis necessárias.

## Estrutura

- `index.html`, `styles.css`, `script.js` – Arquivos principais do site
- `locales/` – Arquivos de tradução
- `.github/workflows/` – Workflows do GitHub Actions para deploy e tradução
- `.github/scripts/auto_translate.py` – Script de tradução automática

## Site Online

Acesse: [https://www.inf.ufpr.br/vhwcm](https://www.inf.ufpr.br/vhwcm24)
![Uploading image.png…]()
