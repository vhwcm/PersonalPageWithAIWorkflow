# Resumo de Integração: Nutri Assistente

## Objetivo
Adicionar o projeto acadêmico e inicial **Nutri Assistente** (`/home/exati/nutri_assistente`) à vitrine de projetos do portfólio (`projetos/index.html`), posicionando-o ao final da página e destacando expressamente seu contexto de desenvolvimento durante o **1º semestre da faculdade (CS50 Final Project)**, suas limitações e simplicidade de código de iniciante, bem como seu papel na evolução profissional.

---

## Arquivos Modificados e Criados

1. **Ativo Visual Copiado**:
   - `PersonalPageWithAIWorkflow/projetos/assets/nutri_assistente.png`: Captura de tela da interface do sistema copiada a partir do repositório original.

2. **Dicionários de Tradução**:
   - `PersonalPageWithAIWorkflow/projetos/locales/pt.json`: Adicionada a chave `project_nutri` com metadados, contexto de 1º semestre, visão geral honesta, pilares de cálculos (TMB/GET), stack e lições aprendidas.
   - `PersonalPageWithAIWorkflow/projetos/locales/en.json`: Adicionada a chave `project_nutri` com as respectivas traduções em inglês.

3. **Vitrine HTML (`projetos/index.html`)**:
   - Inserida a seção `<section class="project-showcase" id="nutri-assistente">` ao final da página (abaixo de *Run & Gun*).
   - Incluído o link do repositório remoto (`https://github.com/vhwcm/nutri_assistente`).
   - Integrado o frame de imagem com zoom interativo pelo modal nativo.

---

## Destaques e Contexto Apresentado

- **Posicionamento**: Terceiro projeto da vitrine, localizado ao fundo da página.
- **Badge & Status**: `Projeto Acadêmico Inicial (1º Semestre) & CS50 Final Project` / `1st Semester Project`.
- **Transparência Técnica**: O texto enfatiza explicitamente que foi o primeiro projeto web fullstack desenvolvido no início do curso universitário, com código simples e dívidas técnicas naturais da fase de aprendizado.
- **Competências Destacadas**: Resolução de um problema real de nutricionista, cálculos metabólicos (Harris-Benedict e DRI/IOM), fluxo com códigos de vínculo, renderização com Blade, ORM Eloquent e integração pioneira com APIs externas (ZeroBounce e Gemini).
