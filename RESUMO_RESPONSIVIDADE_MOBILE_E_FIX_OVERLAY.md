# Resumo Técnico: Resolução do Overflow Horizontal nos Cards de Projetos

## 1. Causa Raiz do Overflow
1. **Badges de Metadados Extensas (`.badge-tag`)**: O texto longo de badges em maiúsculas (ex: `PROJETO ACADÊMICO UFPR & ENGENHARIA EM C`) na fonte monospace fixa ultrapassava 350px sem quebra de linha (`white-space: nowrap`), forçando o `.project-meta` e o `.card-main` a se expandirem além dos 375px/390px da tela móvel.
2. **`margin-left: auto` no Link do GitHub**: Empurrava o link para a extrema direita na mesma linha forçando largura excessiva.
3. **Ausência de `max-width: 100%` e `box-sizing: border-box`**: Em contêineres e subcomponentes como `.projects-layout`, `.projects-feed`, `.card-main`, `.card-preview-header` e `.preview-info-box`.

---

## 2. Soluções Aplicadas

### Página de Projetos (`projetos/styles.css`)
- **Quebra e Contenção de Badges (`.badge-tag`)**:
  - `max-width: 100%; white-space: normal; word-break: break-word; line-height: 1.3;`.
  - Em telas móveis (`<= 768px`), padding e tamanho de fonte reduzidos para garantir acomodação perfeita dentro do fluxo.
- **Contenção Estrita de Largura (`width: 100%; max-width: 100%; box-sizing: border-box; overflow: hidden;`)**:
  - Aplicada em `.projects-layout`, `.projects-feed`, `.card-main`, `.card-preview-header` e `.preview-info-box`.
- **Botão de Alternância e Link GitHub no Mobile**:
  - `.github-link` com `margin-left: 0` no mobile para acompanhar o fluxo natural com wrap.
  - `.collapse-toggle-btn` e `.preview-action-box` ocupando 100% da largura em uma linha própria abaixo da descrição do projeto.

---

## 3. Arquivos Modificados
- [projetos/styles.css](file:///home/exati/PersonalPageWithAIWorkflow/projetos/styles.css)
- [styles.css](file:///home/exati/PersonalPageWithAIWorkflow/styles.css)
