#!/usr/bin/env python3
"""
Script de tradução automática PT -> EN usando Google Gemini AI (SDK Oficial)
"""
import json
import os
import google.generativeai as genai
import time

# Configuração da API
GEMINI_API_KEY = os.environ.get('GEMINI_API_KEY')
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY não encontrada nas variáveis de ambiente")

genai.configure(api_key=GEMINI_API_KEY)

# Usando o modelo Flash, que é ideal para tarefas de alta velocidade/volume como tradução
try:
    model = genai.GenerativeModel('gemini-1.5-flash-latest')
except:
    model = genai.GenerativeModel('gemini-pro')

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

def traduzir_texto(texto_origem):
    """Traduz usando o SDK oficial do Gemini"""
    try:
        # Prompt direto e objetivo para evitar conversa
        prompt = f"""You are a professional translator for software interfaces. 
        Translate the following text from Portuguese (Brazil) to English. 
        Output ONLY the translation, no explanations or quotes.
        
        Text: "{texto_origem}"
        """
        
        response = model.generate_content(prompt)
        
        # Limpeza básica caso o modelo coloque espaços extras ou quotes
        return response.text.strip().replace('"', '').replace("'", "")
        
    except Exception as e:
        print(f"Erro ao traduzir '{texto_origem}': {e}")
        return None

# --- Fluxo Principal ---

# Carregar arquivos
try:
    with open('locales/pt.json', 'r', encoding='utf-8') as f:
        pt_data = json.load(f)
except FileNotFoundError:
    print("Arquivo locales/pt.json não encontrado.")
    exit(1)

# Tenta abrir en.json, se não existir cria um dict vazio
try:
    with open('locales/en.json', 'r', encoding='utf-8') as f:
        en_data = json.load(f)
except FileNotFoundError:
    en_data = {}

# Encontrar chaves faltantes
pt_keys = set(get_nested_keys(pt_data))
en_keys = set(get_nested_keys(en_data))
missing_keys = pt_keys - en_keys

if not missing_keys:
    print("Nenhuma nova chave encontrada. EN está sincronizado com PT.")
    exit(0)

print(f"🔍 Encontradas {len(missing_keys)} chaves novas para traduzir:")
for key in missing_keys:
    print(f"  - {key}")

# Traduzir
translations = {}
for key in missing_keys:
    pt_text = get_value_by_path(pt_data, key)
    
    # Delay curto para evitar rate limit se tiver muitas chaves
    time.sleep(1) 
    
    en_text = traduzir_texto(pt_text)
    
    if en_text:
        translations[key] = en_text
        print(f"✅ {key}: '{pt_text}' -> '{en_text}'")
        set_value_by_path(en_data, key, en_text)
    else:
        print(f"❌ Falha na chave {key}")

# Salvar
with open('locales/en.json', 'w', encoding='utf-8') as f:
    json.dump(en_data, f, ensure_ascii=False, indent=2)

print(f"\nArquivo 'locales/en.json' atualizado com sucesso!")