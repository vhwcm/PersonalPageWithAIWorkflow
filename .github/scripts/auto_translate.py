#!/usr/bin/env python3
"""
Script de tradução automática PT → EN usando Google Gemini AI
"""
import json
import os 
import requests

GEMINI_API_KEY = os.environ.get('GEMINI_API_KEY')
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY não encontrada nas variáveis de ambiente")

# Carregar arquivos JSON
with open('locales/pt.json', 'r', encoding='utf-8') as f:
    pt_data = json.load(f)

with open('locales/en.json', 'r', encoding='utf-8') as f:
    en_data = json.load(f)

def get_nested_keys(data, parent_key=''):
    """Extrai todas as chaves aninhadas de um dicionário"""
    keys = []
    for k, v in data.items():
        new_key = f"{parent_key}.{k}" if parent_key else k
        if isinstance(v, dict):
            keys.extend(get_nested_keys(v, new_key))
        else:
            keys.append(new_key)
    return keys

def get_value_by_path(data, path):
    """Obtém valor usando path 'nav.home'"""
    keys = path.split('.')
    value = data
    for key in keys:
        value = value.get(key, None)
        if value is None:
            return None
    return value

def set_value_by_path(data, path, value):
    """Define valor usando path 'nav.home'"""
    keys = path.split('.')
    current = data
    for key in keys[:-1]:
        if key not in current:
            current[key] = {}
        current = current[key]
    current[keys[-1]] = value

# Encontrar chaves que existem em PT mas não em EN
pt_keys = set(get_nested_keys(pt_data))
en_keys = set(get_nested_keys(en_data))
missing_keys = pt_keys - en_keys

if not missing_keys:
    print("Nenhuma nova chave encontrada. EN está sincronizado com PT.")
    exit(0)

print(f"🔍 Encontradas {len(missing_keys)} chaves novas para traduzir:")
for key in missing_keys:
    print(f"  - {key}")

# Configurações da API
API_URL = "https://api.generativeai.google.com/v1beta2/models/text-bison:generate"
API_KEY = GEMINI_API_KEY  # Usar a chave de API da variável de ambiente

# Função para traduzir texto usando requisição HTTP
def traduzir_texto(texto_origem, idioma_destino="en"):
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "prompt": {
            "text": f"Traduza o seguinte texto para {idioma_destino}: {texto_origem}"
        }
    }

    response = requests.post(API_URL, headers=headers, data=json.dumps(payload))

    if response.status_code == 200:
        dados = response.json()
        return dados.get("candidates", [{}])[0].get("output", "")
    else:
        print(f"Erro na tradução: {response.status_code} - {response.text}")
        return None

# Traduzir as chaves faltantes
translations = {}
for key in missing_keys:
    pt_text = get_value_by_path(pt_data, key)
    
    en_text = traduzir_texto(pt_text)
    translations[key] = en_text
    print(f"{key}: '{pt_text}' → '{en_text}'")

# Atualizar en.json com as novas traduções
for key, value in translations.items():
    set_value_by_path(en_data, key, value)

# Salvar o arquivo atualizado
with open('locales/en.json', 'w', encoding='utf-8') as f:
    json.dump(en_data, f, ensure_ascii=False, indent=2)

print(f"\nArquivo 'locales/en.json' atualizado com {len(translations)} novas traduções!")
