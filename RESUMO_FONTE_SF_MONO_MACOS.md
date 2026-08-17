# Resumo Técnico: Integração da Fonte Mono do macOS (SF Mono)

## 1. Visão Geral
Toda a aplicação (página inicial, vitrine de projetos e artigo científico de pesquisa) foi atualizada para utilizar a família tipográfica monospace oficial do ecossistema macOS/Apple: **SF Mono** (com fallback nativo para `SFMono-Regular`, `ui-monospace`, `Menlo`, `Monaco` e monospace padrão).

## 2. Arquivos de Fonte Integrados
O pacote completo de arquivos OpenType (`.otf`) da **SF Mono** foi copiado para o diretório local `fonts/` para garantir disponibilidade autônoma e carregamento offline/deploy:
* `SF-Mono-Light.otf` e `SF-Mono-LightItalic.otf` (peso 300)
* `SF-Mono-Regular.otf` e `SF-Mono-RegularItalic.otf` (peso 400)
* `SF-Mono-Medium.otf` e `SF-Mono-MediumItalic.otf` (peso 500)
* `SF-Mono-Semibold.otf` e `SF-Mono-SemiboldItalic.otf` (peso 600)
* `SF-Mono-Bold.otf` e `SF-Mono-BoldItalic.otf` (peso 700)
* `SF-Mono-Heavy.otf` e `SF-Mono-HeavyItalic.otf` (peso 800)

## 3. Configuração CSS
* `theme.css`: Declaração de todas as regras `@font-face` com `font-display: swap` e redefinição dos tokens globais:
  * `--font-sans: 'SF Mono', SFMono-Regular, ui-monospace, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;`
  * `--font-mono: 'SF Mono', SFMono-Regular, ui-monospace, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;`
* `styles.css` e `projetos/styles.css`: Herança explícita para botões, inputs, modais e elementos estruturais.
* `pesquisa-redes-sociais/styles.css`: Atualização da tipografia editorial para SF Mono.

## 4. Arquivos Modificados
* [theme.css](file:///home/exati/PersonalPageWithAIWorkflow/theme.css)
* [styles.css](file:///home/exati/PersonalPageWithAIWorkflow/styles.css)
* [projetos/styles.css](file:///home/exati/PersonalPageWithAIWorkflow/projetos/styles.css)
* [pesquisa-redes-sociais/styles.css](file:///home/exati/PersonalPageWithAIWorkflow/pesquisa-redes-sociais/styles.css)
* Diretório `fonts/` com os 12 arquivos `.otf`.
