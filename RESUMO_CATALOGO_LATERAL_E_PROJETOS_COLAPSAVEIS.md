# Resumo das Alterações: Catálogo Lateral, Projetos Colapsáveis e Ajustes de Mídia

## 1. Objetivo da Implementação
Atender à solicitação de aprimoramento da página de projetos (`projetos/index.html`), implementando:
1. **Catálogo Lateral de Projetos**: Navegação rápida com *scrollspy*, links diretos, botões de ação e visual responsivo.
2. **Cards Colapsáveis (Accordion)**: Todos os projetos iniciam **100% colapsados por padrão**, exibindo a miniatura, título, badge e resumo, com expansão suave sob demanda (ou via catálogo/botão "Expandir Todos").
3. **Reordenação dos Projetos**: Posicionamento do projeto **Nutri Assistente** como o último projeto da listagem.
4. **Link do Repositório do AI RPG Engine**: Integração do link direto para o repositório no GitHub (`https://github.com/vhwcm/AI_RPG_GAME`).
5. **Asset Real do Run & Gun**: Substituição da imagem pela 2ª imagem oficial do README do repositório (`run_n_gun_readme_2.png`).

---

## 2. Arquivos Modificados

- [projetos/index.html](file:///home/exati/PersonalPageWithAIWorkflow/projetos/index.html):
  - Inclusão do container `<div class="projects-layout">` dividindo a página entre a barra lateral (`<aside class="catalog-sidebar">`) e o fluxo de projetos (`<div class="projects-feed">`).
  - Estruturação do catálogo com botões de "Expandir Todos" e "Recolher Todos", itens navegáveis com tags de tecnologia e link para "Voltar ao Topo".
  - Configuração de todos os cards para iniciarem no estado colapsado (`.card-main.is-collapsed` com `aria-expanded="false"`).
  - Adição do botão GitHub para o **AI RPG Engine** (`https://github.com/vhwcm/AI_RPG_GAME`).
  - Atualização do thumbnail e screenshot do **Run & Gun** utilizando a segunda captura real do README (`assets/run_n_gun_readme_2.png`).
  - Reordenação das seções:
    1. AI RPG Engine: Aetheria (`#rpg-engine`)
    2. Run & Gun: 2D Retro Arcade Platformer (`#run-n-gun`)
    3. Lunar Chat: Real-Time Multi-Room Web Messaging (`#lunar-chat`)
    4. Nutri Assistente: Plataforma de Cálculos Nutricionais & Acompanhamento (`#nutri-assistente`)

- [projetos/styles.css](file:///home/exati/PersonalPageWithAIWorkflow/projetos/styles.css):
  - Definição do layout em grid (`290px 1fr`) com suporte *sticky* para o catálogo lateral.
  - Estilização completa do catálogo: *glassmorphism*, bordas com brilho suave, indicador do projeto ativo e botões de ação.
  - Animação e transição suave para colapso e expansão (`max-height`, `opacity`, rotação de chevron e botão de rodapé nos cards).
  - Adaptação responsiva para telas móveis e tablets (catálogo torna-se uma barra deslizante horizontal superior e cards ajustam-se verticalmente).

- [projetos/script.js](file:///home/exati/PersonalPageWithAIWorkflow/projetos/script.js):
  - Controle de estado de expansão/colapso individual e em lote (Expandir Todos / Recolher Todos).
  - Integração da navegação do catálogo: ao clicar em um projeto no catálogo, ele é expandido automaticamente e o scroll suave o posiciona na tela.
  - Implementação de *ScrollSpy* via `IntersectionObserver` para destacar automaticamente no catálogo o projeto em visualização.
  - Manutenção e sincronização do sistema de internacionalização (PT/EN) e do modal de zoom em imagens.

- [projetos/locales/pt.json](file:///home/exati/PersonalPageWithAIWorkflow/projetos/locales/pt.json) & [projetos/locales/en.json](file:///home/exati/PersonalPageWithAIWorkflow/projetos/locales/en.json):
  - Adição das chaves de tradução do catálogo (`catalog.title`, `catalog.subtitle`, `catalog.expand_all`, `catalog.collapse_all`, `catalog.view_details`, `catalog.hide_details`, `catalog.back_to_top` e tags).

---

## 3. Fluxo de Interação
```
[Carregamento da Página]
   └── Todos os Projetos Iniciam Colapsados (Visual limpo, compacto e com thumbnails reais)

[Catálogo Lateral]
   ├── Clicar em Item -> Expande Card Alvo Automaticamente -> Scroll Suave até o Projeto
   ├── "Expandir Todos" -> Abre todos os cards simultaneamente
   └── "Recolher Todos" -> Fecha todos os cards para visualização compacta

[Card de Projeto]
   ├── [Modo Colapsado] -> Thumbnail + Título + Status/Badge + Links GitHub + Breve Descrição + Botão "Ver Detalhes"
   └── [Modo Expandido]  -> Revela Screenshots Reais + Stats Grid + Visão Geral + Pilares + Stack + Destaques + Botão de Recolher no Rodapé
```
