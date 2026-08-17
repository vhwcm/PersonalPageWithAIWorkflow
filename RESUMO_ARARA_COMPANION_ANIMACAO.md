# Resumo: Animação e Interação da Arara-Azul

## 1. Visão Geral
Implementação da animação contínua da Arara-Azul no canto inferior direito do portfólio e nas páginas de projetos, acompanhada de saudação carismática automática e interações reativas.

---

## 2. Estrutura do Sprite Sheet (14 Quadros)
* **Arquivo:** `Quadros_arara_azul.png` (1280x768px)
* **Grid:** 5 colunas × 3 linhas (256x256px por quadro)
* **Quadros Ativos:** 14 quadros sequenciais (Linha 1: 5, Linha 2: 5, Linha 3: 4)
* **Taxa de Reprodução:** 1.12s por ciclo (~12.5 fps com interpolação `steps(1)` direta)

---

## 3. Componentes Implementados

### CSS (`theme.css` e `pesquisa-redes-sociais/styles.css`)
* `.arara-companion`: Posicionamento fixo no canto inferior direito (`bottom: 24px; right: 24px`), flutuação suave (`arara-float`), suporte a responsividade mobile e clique.
* `.arara-sprite`: Recorte e ciclo dos 14 quadros via `@keyframes arara-flap`.
* `.arara-bubble`: Balão de fala estilo Glassmorphism posicionado sobre a arara, com cauda apontando para o personagem, animação de entrada elástica (`cubic-bezier`), botão de fechar e suporte a auto-ocultação.
* `@keyframes arara-bounce`: Animação de pulinho alegre disparada ao clicar no personagem.

### JavaScript (`script.js`, `projetos/script.js` e `pesquisa-redes-sociais/script.js`)
* **Ciclo Automático de 10 Segundos:** A arara alterna continuamente a cada 10 segundos entre 20 fatos, projetos e conquistas profissionais.
* **Pausa Inteligente ao Ler:** Ao passar o mouse (`mouseenter`) sobre o balão, o temporizador pausa temporariamente para leitura e retoma ao sair (`mouseleave`).
* **Interação Reativa ao Clique:** Clicar na arara aciona o pulinho alegre (`bounce`) e avança imediatamente para o próximo item da lista.
* **Internacionalização Dinâmica (i18n):** Lista completa de 20 mensagens em Português e Inglês com troca em tempo real ao mudar o idioma da página.
* **Controle Manual:** Botão de fechar (`×`) para recolher o balão quando desejado.

---

## 4. Lista das 20 Mensagens (Projetos & Experiência)
1. AI RPG Engine (RAG em 4 níveis de memória)
2. Experiência Full-Stack na Exati (Java e Vue.js)
3. Jogo retrô Run 'N Gun (C99 e Allegro 5)
4. Liderança e Diretoria na Ecomp (OKRs e Scrum)
5. Lunar Chat (Salas de chat em tempo real com WebSockets)
6. Qualidade de Software (+250 testes em Pytest no RPG Engine)
7. Nutri Assistente (Plataforma fullstack em Laravel)
8. Extensão e Inclusão Digital no PET-UFPR (Informática para Imigrantes)
9. Graduação em Ciência da Computação (UFPR)
10. Integração multi-provedores de IA (Gemini, Grok, GPT, Ollama)
11. Clean Architecture e princípios SOLID
12. Pesquisa acadêmica sobre impacto das redes sociais nos estudos
13. Domínio de Docker, conteinerização e deploy em Linux
14. Motor de física e colisão espacial no jogo em C99
15. Monitoria acadêmica de Circuitos Digitais na UFPR
16. Pensamento estratégico e resolução de problemas (Xadrez)
17. Persistência transacional com SQLite WAL e embeddings vetoriais
18. Desenvolvimento web moderno na Ecomp (Nuxt.js e Node.js)
19. Organização de eventos acadêmicos e maratonas de programação
20. Paixão por Engenharia de Software e IA Generativa

---

## 5. Arquivos Modificados
* [theme.css](file:///home/exati/PersonalPageWithAIWorkflow/theme.css)
* [index.html](file:///home/exati/PersonalPageWithAIWorkflow/index.html)
* [script.js](file:///home/exati/PersonalPageWithAIWorkflow/script.js)
* [projetos/index.html](file:///home/exati/PersonalPageWithAIWorkflow/projetos/index.html)
* [projetos/script.js](file:///home/exati/PersonalPageWithAIWorkflow/projetos/script.js)
* [pesquisa-redes-sociais/index.html](file:///home/exati/PersonalPageWithAIWorkflow/pesquisa-redes-sociais/index.html)
* [pesquisa-redes-sociais/styles.css](file:///home/exati/PersonalPageWithAIWorkflow/pesquisa-redes-sociais/styles.css)
* [pesquisa-redes-sociais/script.js](file:///home/exati/PersonalPageWithAIWorkflow/pesquisa-redes-sociais/script.js)
* [locales/pt.json](file:///home/exati/PersonalPageWithAIWorkflow/locales/pt.json)
* [locales/en.json](file:///home/exati/PersonalPageWithAIWorkflow/locales/en.json)
* [projetos/locales/pt.json](file:///home/exati/PersonalPageWithAIWorkflow/projetos/locales/pt.json)
* [projetos/locales/en.json](file:///home/exati/PersonalPageWithAIWorkflow/projetos/locales/en.json)
* [pesquisa-redes-sociais/locales/pt.json](file:///home/exati/PersonalPageWithAIWorkflow/pesquisa-redes-sociais/locales/pt.json)
* [pesquisa-redes-sociais/locales/en.json](file:///home/exati/PersonalPageWithAIWorkflow/pesquisa-redes-sociais/locales/en.json)

