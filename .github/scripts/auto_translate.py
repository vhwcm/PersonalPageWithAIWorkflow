#!/usr/bin/env python3
"""
Script de tradução automática PT → EN usando Google Gemini AI
"""
import json
import os
import google.generativeai as genai

GEMINI_API_KEY = os.environ.get('GEMINI_API_KEY')
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY não encontrada nas variáveis de ambiente")

genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-pro')

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

# Traduzir as chaves faltantes
translations = {}
for key in missing_keys:
    pt_text = get_value_by_path(pt_data, key)
    
    prompt = f"""Traduza o seguinte texto de Português Brasileiro para Inglês (contexto: website profissional).
Mantenha tags HTML se existirem.
Retorne APENAS a tradução, sem explicações ou aspas.

Texto PT: {pt_text}"""
    
    try:
        response = model.generate_content(prompt)
        en_text = response.text.strip()
        translations[key] = en_text
        print(f"{key}: '{pt_text}' → '{en_text}'")
    except Exception as e:
        print(f"Erro ao traduzir '{key}': {e}")
        translations[key] = pt_text  # Fallback: usa o texto em PT

# Atualizar en.json com as novas traduções
for key, value in translations.items():
    set_value_by_path(en_data, key, value)

# Salvar o arquivo atualizado
with open('locales/en.json', 'w', encoding='utf-8') as f:
    json.dump(en_data, f, ensure_ascii=False, indent=2)

print(f"\nArquivo 'locales/en.json' atualizado com {len(translations)} novas traduções!")
