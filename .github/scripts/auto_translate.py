#!/usr/bin/env python3
import json
import os
import time
import google.generativeai as genai

# 1. Configuração e Diagnóstico
GEMINI_API_KEY = os.environ.get('GEMINI_API_KEY')
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY não encontrada!")

genai.configure(api_key=GEMINI_API_KEY)

def escolher_modelo():
    print("Buscando modelos disponíveis...")
    try:
        # Lista todos os modelos disponíveis
        modelos = list(genai.list_models())
        
        # Prioridade de escolha (do mais novo/rápido para o mais estável)
        preferencias = ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-pro']
        
        # 1. Tenta achar um dos preferidos na lista
        for pref in preferencias:
            for m in modelos:
                if pref in m.name and 'generateContent' in m.supported_generation_methods:
                    print(f"Modelo escolhido (por preferência): {m.name}")
                    return genai.GenerativeModel(m.name)

        # 2. Se não achar os preferidos, pega o primeiro que gera texto
        for m in modelos:
            if 'generateContent' in m.supported_generation_methods:
                print(f"Modelo escolhido (fallback): {m.name}")
                return genai.GenerativeModel(m.name)

    except Exception as e:
        print(f" Não foi possível listar modelos automaticamente: {e}")
    
    # 3. Última tentativa: Hardcoded
    print("Tentando forçar 'gemini-1.5-flash-latest'...")
    return genai.GenerativeModel('gemini-1.5-flash-latest')

# Inicializa o modelo escolhido
model = escolher_modelo()

# --- Funções Auxiliares ---

def get_nested_keys(data, parent_key=''):
    keys = []
    for k, v in data.items():
        new_key = f"{parent_key}.{k}" if parent_key else k
        if isinstance(v, dict):
            keys.extend(get_nested_keys(v, new_key))
        else:
            keys.append(new_key)
    return keys

def get_value_by_path(data, path):
    keys = path.split('.')
    value = data
    for key in keys:
        value = value.get(key)
        if value is None: return None
    return value

def set_value_by_path(data, path, value):
    keys = path.split('.')
    current = data
    for key in keys[:-1]:
        if key not in current: current[key] = {}
        current = current[key]
    current[keys[-1]] = value

def traduzir_texto(texto_origem):
    try:
        prompt = f"""Translate the following text from Portuguese (Brazil) to English. 
        Output ONLY the translation. Text: "{texto_origem}" """
        
        response = model.generate_content(prompt)
        return response.text.strip().replace('"', '').replace("'", "")
    except Exception as e:
        print(f"Erro na API: {e}")
        return None

# --- Execução Principal ---

print("Carregando arquivos de tradução...")
try:
    with open('locales/pt.json', 'r', encoding='utf-8') as f: pt_data = json.load(f)
except: 
    print("Erro ao abrir pt.json"); exit(1)

try:
    with open('locales/en.json', 'r', encoding='utf-8') as f: en_data = json.load(f)
except: en_data = {}

pt_keys = set(get_nested_keys(pt_data))
en_keys = set(get_nested_keys(en_data))
missing_keys = pt_keys - en_keys

if not missing_keys:
    print("Tudo sincronizado!")
    exit(0)

print(f"Traduzindo {len(missing_keys)} chaves...")

for key in missing_keys:
    pt_text = get_value_by_path(pt_data, key)
    time.sleep(1) # Evitar rate limit
    en_text = traduzir_texto(pt_text)
    
    if en_text:
        print(f"{key}: {en_text}")
        set_value_by_path(en_data, key, en_text)
    else:
        print(f"Falha em {key}")

with open('locales/en.json', 'w', encoding='utf-8') as f:
    json.dump(en_data, f, ensure_ascii=False, indent=2)