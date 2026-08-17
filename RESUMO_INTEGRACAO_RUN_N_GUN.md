# Resumo da Integração: Run & Gun (Trabalho de Programação 2 - UFPR)

## 1. Compreensão Técnica do Projeto (/home/exati/Run_n_Gun-Trab_prog2)
O projeto consiste em um jogo arcade completo de ação, tiro e plataforma 2D desenvolvido em **C puro (C99)** com a biblioteca **Allegro 5** para a disciplina de Programação 2 na UFPR (Ciência da Computação).

### Principais Componentes Identificados:
- **Máquina de Estados Finitos (FSM - `game.c`)**: Gerencia o ciclo completo do jogo com estados para Menu, Gameplay 60 FPS, Pausa, Game Over, Modo Livre, Loja de Personagens e Conclusão de Fases.
- **Motor de Física e Colisão (`GameLogic.c`)**: Gravidade contínua, detecção de colisões por Bounding Box (AABB) em plataformas estáticas e móveis, pulo e movimentação com inércia.
- **Sistema Balístico & Projéteis (`Pistol.c`, `Bullet.c`)**: Controle dinâmico de trajetória, velocidade, alcance, tempo de recarga e cálculo de dano.
- **6 Classes Jogáveis (`Character.c`, `configs.h`)**: Samurai, Gangster, Pedro, Raider, Sniper e Soldier, com spritesheets dedicados e parâmetros balanceados.
- **IA de Inimigos e Chefões (`Enemy.c`)**: Inimigos comuns (Skeleton Archer, Minotauro) e 3 Chefões (Carnívora, Bruto, Page) com padrões de perseguição e ataque.
- **Sistema de Persistência e Economia (`Save.c`)**: Serialização em disco (`save.dat` / `save.txt`) para moedas, recordes e personagens desbloqueados na loja.
- **Áudio Multicanal e Controles (`Joystick.c`, `Sprites.c`, `Map.c`)**: Suporte a joystick/gamepad e teclado, trilhas e múltiplos efeitos sonoros em tempo real com Allegro Audio.

---

## 2. Alterações Realizadas no Portfólio

### 1. `projetos/index.html`
- Adição da seção completa de apresentação do projeto **Run & Gun: 2D Retro Arcade Platformer** (`#run-n-gun`).
- Inclusão do frame interativo com a captura do jogo em alta definição (`assets/run_n_gun_showcase.jpg`).
- Grade de estatísticas (6 Classes, 5 Inimigos/Chefes, Física Própria, C99 & Allegro 5).
- Detalhamento de Visão Geral, 4 Pilares Arquiteturais (FSM, Física/Balística, Gestão de Memória, Persistência), Stack Tecnológica e Destaques de Engenharia.

### 2. `projetos/locales/pt.json` e `projetos/locales/en.json`
- Inclusão de todas as chaves de internacionalização completas (`project_rungun`) em Português e Inglês.

### 3. `projetos/script.js`
- Atualização do manipulador de modal de imagem para que todas as capturas de tela dos projetos possam ser ampliadas dinamicamente via clique.

### 4. `projetos/assets/run_n_gun_showcase.jpg`
- Criação e integração do ativo visual demonstrativo do jogo com interface e ação 2D retrô.
