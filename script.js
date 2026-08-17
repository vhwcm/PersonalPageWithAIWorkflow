document.addEventListener('DOMContentLoaded', () => {
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
            console.error('Error loading translations:', error);
            return null;
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
        renderAraraFact();
    };

    const savedLang = localStorage.getItem('language') || 'en';
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
