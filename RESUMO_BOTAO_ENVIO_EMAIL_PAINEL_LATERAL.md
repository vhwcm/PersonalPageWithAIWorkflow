# Resumo: Botão de Envio de E-mail no Painel Lateral

## Visão Geral
Foi adicionado um botão estilizado e dedicado para envio de e-mail (`mailto:vichwcm@gmail.com`) diretamente no painel lateral principal (`index.html`) e no painel lateral do catálogo de projetos (`projetos/index.html`).

---

## Modificações Realizadas

### 1. Painel Lateral Principal (`index.html`)
- Inclusão do botão de ação `.sidebar-email-btn` no rodapé da barra lateral (`.sidebar-footer`), acima dos controles de idioma e redes sociais.
- Configuração de atributos de acessibilidade e internacionalização (`data-i18n="nav.send_email"` e `data-i18n-attr="title:nav.send_email_title"`).

### 2. Estilização do Botão (`styles.css`)
- Aplicação de gradiente com tons azuis da paleta (`--accent-border`, `--accent-light`, `--accent-glow`).
- Efeito de micro-interação com hover elevatório (`translateY(-2px)`) e deslocamento do ícone de envio.

### 3. Painel Lateral de Projetos (`projetos/index.html` e `projetos/styles.css`)
- Inclusão do botão de contato `.catalog-email-btn` no rodapé do catálogo lateral de projetos com os mesmos padrões visuais e suporte a tradução bilíngue.

### 4. Dicionários de Internacionalização (`locales/pt.json`, `locales/en.json`, `projetos/locales/pt.json`, `projetos/locales/en.json`)
- Adicionadas as chaves `send_email` e `send_email_title` tanto em Português ("Enviar E-mail") quanto em Inglês ("Send Email").
