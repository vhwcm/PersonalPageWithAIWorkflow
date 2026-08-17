document.addEventListener('DOMContentLoaded', () => {
    const fallbackTranslations = {
        pt: {
            nav: {
                menu_label: "Navegação",
                menu_portfolio: "Portfólio & Pesquisa",
                home: "Início",
                about: "Sobre",
                experience: "Experiência",
                skills: "Habilidades",
                interests: "Interesses",
                projects: "Projetos",
                research: "Pesquisa",
                send_email: "Enviar E-mail",
                send_email_title: "Enviar E-mail",
                test: "teste para checkar se irá ser traduzido automaticamente"
            },
            hero: {
                subtitle: "Olá, eu sou",
                description: "Desenvolvedor de Sistemas | Graduando em Ciência da Computação na UFPR",
                cta: {
                    about: "Sobre Mim",
                    projects: "Projetos",
                    research: "Pesquisa"
                }
            },
            about: {
                title: "Sobre Mim",
                p1: "Estudante de Ciência da Computação na UFPR e Desenvolvedor de Software (ou, como gosto de chamar, Artesão de Sistemas). Desenvolvedor de Sistemas e ex-diretor da Ecomp, empresa júnior de computação da universidade.",
                p2: "Trabalho com engenharia de performance, arquitetura e design de sistemas. Tenho experiência com metodologias ágeis, containers, servidores Linux, CI/CD, RAG, Arquitetura Distribuida e Programação Agêntica.",
                p3: "Fã dos livros <b>Extreme Programming Explained</b> e <b>The Pragmatic Programmer</b>."
            },
            experience: {
                title: "Experiência Profissional",
                exati: {
                    role: "Estagiário em Desenvolvimento Full Stack",
                    period: "Agosto 2025 - Presente",
                    desc1: "Desenvolvimento de interfaces modernas e responsivas utilizando <strong>Vue.js</strong>.",
                    desc2: "Implementação e manutenção de serviços backend robustos em <strong>Java</strong>.",
                    desc3: "Integração eficiente entre frontend e backend via APIs REST.",
                    desc4: "Atuação em equipe ágil utilizando metodologia <strong>Scrum</strong>."
                },
                ecomp_director: {
                    role: "Diretor",
                    period: "Janeiro 2025 - Julho 2025",
                    desc1: "Liderança estratégica e definição de <strong>OKRs</strong> para alinhamento de metas da organização.",
                    desc2: "Implantação de metodologias ágeis (Scrum) para otimização de processos internos.",
                    desc3: "Reformulação completa da gamificação interna para aumentar o engajamento dos membros.",
                    desc4: "Gestão financeira estratégica para proteção do capital contra inflação.",
                    desc5: "Liderança no processo de transformação da Ecomp em projeto de extensão universitária."
                },
                ecomp_developer: {
                    role: "Desenvolvedor Web",
                    period: "Outubro 2024 - Julho 2025",
                    desc1: "Desenvolvimento de soluções web completas para clientes reais.",
                    desc2: "Aplicação prática de stack moderna: <strong>Vue.js, Nuxt.js, Node.js</strong>.",
                    desc3: "Gerenciamento de ambiente e deploy utilizando <strong>Docker</strong> e servidores <strong>Linux</strong>."
                },
                pet: {
                    role: "Membro Extensionista e Pesquisador",
                    period: "Agosto 2024 - Novembro 2024",
                    intro: "Atuação em projetos de alto impacto social e acadêmico:",
                    desc1: "<strong>Informática para Imigrantes:</strong> Ensino de inclusão digital.",
                    desc2: "<strong>Maratona Competitiva:</strong> Organização e incentivo à programação.",
                    desc3: "<strong>SACI:</strong> Organização da Semana Acadêmica de Computação.",
                    desc4: "<strong>PET nas Escolas:</strong> Divulgação da computação no ensino básico."
                },
                monitor: {
                    role: "Monitor de Circuitos Digitais",
                    period: "Agosto 2024 - Novembro 2024",
                    desc1: "Suporte acadêmico aos alunos da disciplina de Circuitos Digitais.",
                    desc2: "Desenvolvimento de material didático de apoio.",
                    desc3: "Migração e modernização de exercícios para nova plataforma digital."
                }
            },
            skills: {
                title: "Habilidades Técnicas",
                data_structures: "Estrutura de Dados",
                algorithms: "Algoritmos",
                web_dev: "Desenvolvimento Web",
                cloud_computing: "Computação em Nuvem",
                cryptography: "Criptografia",
                system_architecture: "Arquitetura de Sistemas",
                system_design: "System Design",
                spec_driven_dev: "Spec Driven Development",
                performance_engineering: "Engenharia de Performance",
                ci_cd: "CI/CD",
                xp_programming: "XP programming",
                aws_services: "Serviços AWS",
                db_architecture: "Arquitetura de Banco de Dados",
                typescript: "TypeScript",
                sql: "SQL"
            },
            interests: {
                title: "Interesses Pessoais",
                investments: "Investimentos",
                chess: "Xadrez",
                reading: "Leitura",
                gym: "Academia",
                business: "Negócios",
                system_architecture: "Arquitetura de Sistemas",
                agile_vibe_coding: "Agile Vibe Coding"
            },
            tech_tags: {
                leadership: "Liderança",
                agile_methods: "Metodologias Ágeis",
                financial_management: "Gestão Financeira",
                teaching: "Ensino",
                university_extension: "Extensão Universitária",
                event_organization: "Organização de Eventos",
                digital_circuits: "Circuitos Digitais",
                didactics: "Didática",
                mentorship: "Mentoria"
            },
            arara: {
                items: [
                    "Você sabia? O Victor desenvolveu o AI RPG Engine com RAG em 4 níveis de memória!",
                    "Ele programa em Java e Vue.js no desenvolvimento de sistemas na Exati!",
                    "Ele criou um jogo retrô estilo Run 'N Gun inteiramente em C99 e Allegro 5!",
                    "O Victor foi Diretor na Ecomp, liderando equipes ágeis com OKRs e Scrum!",
                    "Ele construiu o Lunar Chat, um sistema de salas em tempo real com WebSockets!",
                    "O motor de RPG do Victor conta com mais de 250 testes automatizados em Pytest!",
                    "Ele desenvolveu o Nutri Assistente, uma plataforma completa em Laravel!",
                    "Como pesquisador no PET-UFPR, ele ensinou informática para imigrantes!",
                    "Ele estuda Ciência da Computação na Universidade Federal do Paraná (UFPR)!",
                    "O Victor arquitetou integração multi-provedor com Gemini, Grok, GPT e Ollama!",
                    "Ele aplicou Clean Architecture e princípios SOLID em projetos de missão crítica!",
                    "Ele publicou uma pesquisa acadêmica sobre o impacto das redes sociais nos estudos!",
                    "O Victor domina Docker, conteinerização e ambientes Linux para deploy!",
                    "No jogo em C99, ele implementou um motor de áudio e física com grade espacial!",
                    "Ele foi monitor de Circuitos Digitais e auxiliou dezenas de alunos na UFPR!",
                    "O Victor adora xadrez, estratégia e resolver desafios lógicos complexos!",
                    "Ele implementou persistência transacional com SQLite WAL e indexação vetorial!",
                    "Na Ecomp, ele desenvolveu aplicações completas com Nuxt.js e Node.js!",
                    "Ele organizou eventos acadêmicos e maratonas de programação competitiva!",
                    "O Victor é apaixonado por Engenharia de Software, IA Generativa e inovação!"
                ],
                close_label: "Fechar mensagem"
            },
            footer: {
                rights: "&copy; 2026 Victor Hugo Weigmann Chequer Maia. Todos os direitos reservados."
            }
        },
        en: {
            nav: {
                menu_label: "Navigation",
                menu_portfolio: "Portfolio & Research",
                home: "Home",
                about: "About",
                experience: "Experience",
                skills: "Skills",
                interests: "Interests",
                projects: "Projects",
                research: "Research",
                send_email: "Send Email",
                send_email_title: "Send Email"
            },
            hero: {
                subtitle: "Hello, I am",
                description: "Systems Developer | Computer Science Student at UFPR",
                cta: {
                    about: "About Me",
                    projects: "Projects",
                    research: "Research"
                }
            },
            about: {
                title: "About Me",
                p1: "Computer Science student at UFPR and Software Developer (or, as I like to say, Systems Craftsman). Systems Developer and former Director at Ecomp, the university's junior enterprise.",
                p2: "I work with performance engineering, system architecture, and design. The tools I master most are Node.js and Java with Spring Boot. I have experience with agile methodologies, containers, Linux servers, CI/CD, RAG, Distributed Architecture, and Agentic Programming.",
                p3: "I am a fan of the books <b>Extreme Programming Explained</b> and <b>The Pragmatic Programmer</b>."
            },
            experience: {
                title: "Professional Experience",
                exati: {
                    role: "Full Stack Development Intern",
                    period: "August 2025 - Present",
                    desc1: "Development of modern and responsive interfaces using <strong>Vue.js</strong>.",
                    desc2: "Implementation and maintenance of robust backend services in <strong>Java</strong>.",
                    desc3: "Efficient integration between frontend and backend via REST APIs.",
                    desc4: "Working in an agile team using <strong>Scrum</strong> methodology."
                },
                ecomp_director: {
                    role: "Director",
                    period: "January 2025 - July 2025",
                    desc1: "Strategic leadership and definition of <strong>OKRs</strong> for organizational goal alignment.",
                    desc2: "Implementation of agile methodologies (Scrum) to optimize internal processes.",
                    desc3: "Complete reformulation of internal gamification to increase member engagement.",
                    desc4: "Strategic financial management to protect capital against inflation.",
                    desc5: "Leadership in the process of transforming Ecomp into a university extension project."
                },
                ecomp_developer: {
                    role: "Web Developer",
                    period: "October 2024 - July 2025",
                    desc1: "Development of complete web solutions for real clients.",
                    desc2: "Practical application of modern stack: <strong>Vue.js, Nuxt.js, Node.js</strong>.",
                    desc3: "Environment management and deployment using <strong>Docker</strong> and <strong>Linux</strong> servers."
                },
                pet: {
                    role: "Extension Member and Researcher",
                    period: "August 2024 - November 2024",
                    intro: "Working on projects with high social and academic impact:",
                    desc1: "<strong>Informatics for Immigrants:</strong> Teaching digital inclusion.",
                    desc2: "<strong>Competitive Marathon:</strong> Organization and encouragement of programming.",
                    desc3: "<strong>SACI:</strong> Organization of the Computer Science Academic Week.",
                    desc4: "<strong>PET in Schools:</strong> Disseminating computing in basic education."
                },
                monitor: {
                    role: "Digital Circuits Monitor",
                    period: "August 2024 - November 2024",
                    desc1: "Academic support to students of the Digital Circuits discipline.",
                    desc2: "Development of supporting didactic material.",
                    desc3: "Migration and modernization of exercises to a new digital platform."
                }
            },
            skills: {
                title: "Technical Skills",
                data_structures: "Data Structures",
                algorithms: "Algorithms",
                web_dev: "Web Development",
                cloud_computing: "Cloud Computing",
                cryptography: "Cryptography",
                system_architecture: "System Architecture",
                system_design: "System Design",
                spec_driven_dev: "Spec Driven Development",
                performance_engineering: "Performance Engineering",
                ci_cd: "CI/CD",
                xp_programming: "XP programming",
                aws_services: "AWS Services",
                db_architecture: "Database Architecture",
                typescript: "TypeScript",
                sql: "SQL"
            },
            interests: {
                title: "Personal Interests",
                investments: "Investments",
                chess: "Chess",
                reading: "Reading",
                gym: "Gym",
                business: "Business",
                system_architecture: "System Architecture",
                agile_vibe_coding: "Agile Vibe Coding"
            },
            tech_tags: {
                leadership: "Leadership",
                agile_methods: "Agile Methods",
                financial_management: "Financial Management",
                teaching: "Teaching",
                university_extension: "University Extension",
                event_organization: "Event Organization",
                digital_circuits: "Digital Circuits",
                didactics: "Didactics",
                mentorship: "Mentorship"
            },
            arara: {
                items: [
                    "Did you know? Victor built the AI RPG Engine with a 4-tier cognitive memory RAG!",
                    "He engineers Java and Vue.js solutions in full-stack development at Exati!",
                    "He developed a complete retro Run 'N Gun arcade game in C99 and Allegro 5!",
                    "Victor served as Director at Ecomp, leading agile teams with OKRs and Scrum!",
                    "He engineered Lunar Chat, a real-time room chat system with WebSockets!",
                    "Victor's RPG engine is backed by over 250 automated Pytest test cases!",
                    "He built Nutri Assistente, a full-stack diet and nutrition platform with Laravel!",
                    "As a researcher at PET-UFPR, he taught digital literacy to immigrants!",
                    "He is pursuing Computer Science at the Federal University of Paraná (UFPR)!",
                    "Victor designed multi-provider AI fallback with Gemini, Grok, GPT, and Ollama!",
                    "He applies Clean Architecture and SOLID principles to mission-critical systems!",
                    "He published academic research analyzing social media impact on student focus!",
                    "Victor masters Docker, containerization, and Linux server environments!",
                    "In his C99 game, he built custom audio and spatial-hash collision physics!",
                    "He served as a Digital Circuits Teaching Assistant helping dozens of students!",
                    "Victor loves chess, strategy games, and tackling complex logic problems!",
                    "He implemented transactional SQLite WAL persistence with vector indexing!",
                    "At Ecomp, he built full-stack web solutions using Nuxt.js and Node.js!",
                    "He organized university academic events and competitive programming contests!",
                    "Victor is passionate about Software Engineering, Generative AI, and innovation!"
                ],
                close_label: "Close message"
            },
            footer: {
                rights: "&copy; 2026 Victor Hugo Weigmann Chequer Maia. All rights reserved."
            }
        }
    };

    const translationsCache = {};

    const getNestedValue = (obj, path) => {
        return path.split('.').reduce((prev, curr) => {
            return prev ? prev[curr] : null;
        }, obj);
    };

    const loadTranslations = async (lang) => {
        if (translationsCache[lang]) {
            return translationsCache[lang];
        }
        try {
            const response = await fetch(`./locales/${lang}.json`);
            if (!response.ok) {
                throw new Error(`Could not load translations for ${lang}`);
            }
            const translations = await response.json();
            translationsCache[lang] = translations;
            return translations;
        } catch (error) {
            const fallback = fallbackTranslations[lang] || fallbackTranslations.pt;
            translationsCache[lang] = fallback;
            return fallback;
        }
    };

    const parseHtmlTokens = (raw) => {
        const tokens = [];
        let i = 0;
        while (i < raw.length) {
            if (raw[i] === '<') {
                const end = raw.indexOf('>', i);
                if (end !== -1) {
                    tokens.push({ isTag: true, val: raw.slice(i, end + 1) });
                    i = end + 1;
                    continue;
                }
            }
            tokens.push({ isTag: false, val: raw[i] });
            i++;
        }
        return tokens;
    };

    const getTypingDelay = (char) => {
        if (char === '.' || char === '!' || char === '?') {
            return Math.floor(Math.random() * 160) + 320;
        }
        if (char === ',') {
            return Math.floor(Math.random() * 90) + 160;
        }
        if (char === ':' || char === ';') {
            return Math.floor(Math.random() * 80) + 140;
        }
        if (char === '(' || char === ')' || char === '"' || char === "'") {
            return Math.floor(Math.random() * 80) + 100;
        }
        if (char === ' ') {
            return Math.random() < 0.16 ? Math.floor(Math.random() * 60) + 90 : Math.floor(Math.random() * 25) + 35;
        }
        if (Math.random() < 0.035) {
            return Math.floor(Math.random() * 120) + 160;
        }
        return Math.floor(Math.random() * 32) + 24;
    };

    let aboutTypewriterTimeout = null;

    const startAboutTypewriter = (translations) => {
        if (!translations || !translations.about) return;
        const p1Elem = document.querySelector('[data-i18n="about.p1"]');
        const p2Elem = document.querySelector('[data-i18n="about.p2"]');
        const p3Elem = document.querySelector('[data-i18n="about.p3"]');
        if (!p1Elem || !p2Elem || !p3Elem) return;

        if (aboutTypewriterTimeout) {
            clearTimeout(aboutTypewriterTimeout);
            aboutTypewriterTimeout = null;
        }

        const paragraphs = [
            { elem: p1Elem, tokens: parseHtmlTokens(translations.about.p1 || '') },
            { elem: p2Elem, tokens: parseHtmlTokens(translations.about.p2 || '') },
            { elem: p3Elem, tokens: parseHtmlTokens(translations.about.p3 || '') }
        ];

        paragraphs.forEach(p => {
            p.elem.innerHTML = '';
        });

        let pIndex = 0;
        let tokenIndex = 0;
        let currentHtmlBuffer = '';
        const openTags = [];

        const cursorHtml = '<span class="typing-cursor" aria-hidden="true"></span>';

        const renderCurrent = (elem, html) => {
            let full = html;
            for (let i = openTags.length - 1; i >= 0; i--) {
                full += `</${openTags[i]}>`;
            }
            elem.innerHTML = full + cursorHtml;
        };

        const typeNext = () => {
            if (pIndex >= paragraphs.length) {
                return;
            }

            const current = paragraphs[pIndex];

            while (tokenIndex < current.tokens.length && current.tokens[tokenIndex].isTag) {
                const tagStr = current.tokens[tokenIndex].val;
                currentHtmlBuffer += tagStr;
                if (tagStr.startsWith('</')) {
                    const tagMatch = tagStr.match(/<\/([a-zA-Z0-9]+)>/);
                    if (tagMatch) {
                        const idx = openTags.lastIndexOf(tagMatch[1]);
                        if (idx !== -1) openTags.splice(idx, 1);
                    }
                } else if (!tagStr.endsWith('/>')) {
                    const tagMatch = tagStr.match(/<([a-zA-Z0-9]+)/);
                    if (tagMatch) openTags.push(tagMatch[1]);
                }
                tokenIndex++;
            }

            if (tokenIndex < current.tokens.length) {
                const char = current.tokens[tokenIndex].val;
                currentHtmlBuffer += char;
                renderCurrent(current.elem, currentHtmlBuffer);
                tokenIndex++;
                const delay = getTypingDelay(char);
                aboutTypewriterTimeout = setTimeout(typeNext, delay);
            } else {
                let finalHtml = currentHtmlBuffer;
                for (let i = openTags.length - 1; i >= 0; i--) {
                    finalHtml += `</${openTags[i]}>`;
                }
                if (pIndex === paragraphs.length - 1) {
                    current.elem.innerHTML = finalHtml + cursorHtml;
                } else {
                    current.elem.innerHTML = finalHtml;
                }

                pIndex++;
                tokenIndex = 0;
                currentHtmlBuffer = '';
                openTags.length = 0;

                if (pIndex < paragraphs.length) {
                    paragraphs[pIndex].elem.innerHTML = cursorHtml;
                    const paragraphPause = Math.floor(Math.random() * 200) + 450;
                    aboutTypewriterTimeout = setTimeout(typeNext, paragraphPause);
                }
            }
        };

        paragraphs[0].elem.innerHTML = cursorHtml;
        aboutTypewriterTimeout = setTimeout(typeNext, 300);
    };

    const skipAboutTypewriter = () => {
        const currentLang = localStorage.getItem('language') || 'pt';
        const cache = translationsCache[currentLang] || fallbackTranslations[currentLang] || fallbackTranslations.pt;
        if (cache && cache.about) {
            if (aboutTypewriterTimeout) {
                clearTimeout(aboutTypewriterTimeout);
                aboutTypewriterTimeout = null;
            }
            const p1Elem = document.querySelector('[data-i18n="about.p1"]');
            const p2Elem = document.querySelector('[data-i18n="about.p2"]');
            const p3Elem = document.querySelector('[data-i18n="about.p3"]');
            if (p1Elem) p1Elem.innerHTML = cache.about.p1 || '';
            if (p2Elem) p2Elem.innerHTML = cache.about.p2 || '';
            if (p3Elem) {
                p3Elem.innerHTML = (cache.about.p3 || '') + '<span class="typing-cursor" aria-hidden="true"></span>';
            }
        }
    };

    const updateLanguage = async (lang) => {
        const translations = await loadTranslations(lang);
        if (!translations) return;

        document.querySelectorAll('.lang-switch').forEach(sw => {
            sw.querySelectorAll('.lang-option').forEach(opt => {
                if (opt.dataset.lang === lang) {
                    opt.classList.add('active');
                    opt.style.color = 'var(--text-primary)';
                    opt.style.fontWeight = '700';
                } else {
                    opt.classList.remove('active');
                    opt.style.color = 'var(--text-secondary)';
                    opt.style.fontWeight = '400';
                }
            });
        });
        
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (key && key.startsWith('about.p')) return;
            const translation = getNestedValue(translations, key);
            
            if (translation) {
                if (translation.includes('<')) {
                    element.innerHTML = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });

        document.querySelectorAll('[data-i18n-attr]').forEach(element => {
            const attrMapping = element.getAttribute('data-i18n-attr').split(':');
            if (attrMapping.length === 2) {
                const attrName = attrMapping[0];
                const key = attrMapping[1];
                const translation = getNestedValue(translations, key);
                if (translation) {
                    element.setAttribute(attrName, translation);
                }
            }
        });

        localStorage.setItem('language', lang);
        startAboutTypewriter(translations);
        renderAraraFact();
    };

    const aboutCard = document.querySelector('.about-card-integrated');
    if (aboutCard) {
        aboutCard.addEventListener('click', skipAboutTypewriter);
    }

    const savedLang = localStorage.getItem('language') || 'pt';
    updateLanguage(savedLang);

    document.querySelectorAll('.lang-switch').forEach(sw => {
        sw.addEventListener('click', () => {
            const currentLang = localStorage.getItem('language') || 'pt';
            const newLang = currentLang === 'pt' ? 'en' : 'pt';
            updateLanguage(newLang);
        });
    });

    const araraFacts = {
        pt: [
            "Você sabia? O Victor desenvolveu o AI RPG Engine com RAG em 4 níveis de memória!",
            "Ele programa em Java e Vue.js no desenvolvimento de sistemas na Exati!",
            "Ele criou um jogo retrô estilo Run 'N Gun inteiramente em C99 e Allegro 5!",
            "O Victor foi Diretor na Ecomp, liderando equipes ágeis com OKRs e Scrum!",
            "Ele construiu o Lunar Chat, um sistema de salas em tempo real com WebSockets!",
            "O motor de RPG do Victor conta com mais de 250 testes automatizados em Pytest!",
            "Ele desenvolveu o Nutri Assistente, uma plataforma completa em Laravel!",
            "Como pesquisador no PET-UFPR, ele ensinou informática para imigrantes!",
            "Ele estuda Ciência da Computação na Universidade Federal do Paraná (UFPR)!",
            "O Victor arquitetou integração multi-provedor com Gemini, Grok, GPT e Ollama!",
            "Ele aplicou Clean Architecture e princípios SOLID em projetos de missão crítica!",
            "Ele publicou uma pesquisa acadêmica sobre o impacto das redes sociais nos estudos!",
            "O Victor domina Docker, conteinerização e ambientes Linux para deploy!",
            "No jogo em C99, ele implementou um motor de áudio e física com grade espacial!",
            "Ele foi monitor de Circuitos Digitais e auxiliou dezenas de alunos na UFPR!",
            "O Victor adora xadrez, estratégia e resolver desafios lógicos complexos!",
            "Ele implementou persistência transacional com SQLite WAL e indexação vetorial!",
            "Na Ecomp, ele desenvolveu aplicações completas com Nuxt.js e Node.js!",
            "Ele organizou eventos acadêmicos e maratonas de programação competitiva!",
            "O Victor é apaixonado por Engenharia de Software, IA Generativa e inovação!"
        ],
        en: [
            "Did you know? Victor built the AI RPG Engine with a 4-tier cognitive memory RAG!",
            "He engineers Java and Vue.js solutions in full-stack development at Exati!",
            "He developed a complete retro Run 'N Gun arcade game in C99 and Allegro 5!",
            "Victor served as Director at Ecomp, leading agile teams with OKRs and Scrum!",
            "He engineered Lunar Chat, a real-time room chat system with WebSockets!",
            "Victor's RPG engine is backed by over 250 automated Pytest test cases!",
            "He built Nutri Assistente, a full-stack diet and nutrition platform with Laravel!",
            "As a researcher at PET-UFPR, he taught digital literacy to immigrants!",
            "He is pursuing Computer Science at the Federal University of Paraná (UFPR)!",
            "Victor designed multi-provider AI fallback with Gemini, Grok, GPT, and Ollama!",
            "He applies Clean Architecture and SOLID principles to mission-critical systems!",
            "He published academic research analyzing social media impact on student focus!",
            "Victor masters Docker, containerization, and Linux server environments!",
            "In his C99 game, he built custom audio and spatial-hash collision physics!",
            "He served as a Digital Circuits Teaching Assistant helping dozens of students!",
            "Victor loves chess, strategy games, and tackling complex logic problems!",
            "He implemented transactional SQLite WAL persistence with vector indexing!",
            "At Ecomp, he built full-stack web solutions using Nuxt.js and Node.js!",
            "He organized university academic events and competitive programming contests!",
            "Victor is passionate about Software Engineering, Generative AI, and innovation!"
        ]
    };

    const araraCompanion = document.getElementById('arara-companion');
    const araraBubble = document.getElementById('arara-bubble');
    const araraText = document.getElementById('arara-text');
    const araraClose = document.getElementById('arara-bubble-close');

    let renderAraraFact = () => {};

    if (araraCompanion && araraBubble && araraText) {
        let messageIndex = 0;
        let isPaused = false;
        let isManuallyClosed = false;
        let intervalId = null;

        const getAraraItems = () => {
            const currentLang = localStorage.getItem('language') || 'pt';
            const cache = translationsCache[currentLang];
            if (cache && cache.arara && Array.isArray(cache.arara.items) && cache.arara.items.length > 0) {
                return cache.arara.items;
            }
            return araraFacts[currentLang] || araraFacts.pt;
        };

        renderAraraFact = () => {
            const items = getAraraItems();
            const msg = items[messageIndex % items.length];
            araraText.style.opacity = '0';
            araraText.style.transition = 'opacity 0.2s ease';
            setTimeout(() => {
                araraText.textContent = msg;
                araraText.style.opacity = '1';
            }, 200);
            if (!isManuallyClosed) {
                araraBubble.classList.add('is-visible');
            }
        };

        const showBubble = () => {
            araraBubble.classList.add('is-visible');
        };

        const hideBubble = () => {
            araraBubble.classList.remove('is-visible');
        };

        const nextMessage = () => {
            const items = getAraraItems();
            messageIndex = (messageIndex + 1) % items.length;
            renderAraraFact();
        };

        const startInterval = () => {
            if (intervalId) clearInterval(intervalId);
            intervalId = setInterval(() => {
                if (!isPaused && !isManuallyClosed) {
                    nextMessage();
                }
            }, 10000);
        };

        setTimeout(() => {
            renderAraraFact();
            showBubble();
            startInterval();
        }, 400);

        araraBubble.addEventListener('mouseenter', () => {
            isPaused = true;
        });

        araraBubble.addEventListener('mouseleave', () => {
            isPaused = false;
        });

        if (araraClose) {
            araraClose.addEventListener('click', (e) => {
                e.stopPropagation();
                isManuallyClosed = true;
                hideBubble();
            });
        }

        araraCompanion.addEventListener('click', (e) => {
            if (e.target.closest('#arara-bubble-close')) return;
            isManuallyClosed = false;
            araraCompanion.classList.remove('bounce');
            void araraCompanion.offsetWidth;
            araraCompanion.classList.add('bounce');
            nextMessage();
            showBubble();
            startInterval();
        });
    }

    const hamburgerBtn = document.getElementById('hamburger-btn');
    const sidebarCloseBtn = document.getElementById('sidebar-close-btn');
    const sidebarNav = document.getElementById('sidebar-nav');
    const sidebarOverlay = document.getElementById('sidebar-overlay');

    const openSidebar = () => {
        if (sidebarNav) sidebarNav.classList.add('active');
        if (sidebarOverlay) sidebarOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeSidebar = () => {
        if (sidebarNav) sidebarNav.classList.remove('active');
        if (sidebarOverlay) sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', openSidebar);
    }

    if (sidebarCloseBtn) {
        sidebarCloseBtn.addEventListener('click', closeSidebar);
    }

    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', closeSidebar);
    }

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 1024) {
                closeSidebar();
            }
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const isMobile = window.innerWidth < 1024;
                const headerOffset = isMobile ? 76 : 24;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(
        '.section h2, .about-grid, .timeline-item, .skill-card, .project-card, .interest-tag'
    );
    
    animatedElements.forEach((el) => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    const sections = document.querySelectorAll('section[id], .hero-right[id]');
    window.addEventListener('scroll', () => {
        let current = '';
        const isMobile = window.innerWidth < 1024;
        const offsetTrigger = isMobile ? 120 : 60;

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - offsetTrigger) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-links a').forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});
