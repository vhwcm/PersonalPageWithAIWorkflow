// Global variables for i18n
let translationsCache = {};

// Function to get nested object value by string path
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
        const response = await fetch(`locales/${lang}.json`);
        if (!response.ok) {
            throw new Error(`Could not load translations for ${lang}`);
        }
        const translations = await response.json();
        translationsCache[lang] = translations;
        console.log(`Loaded translations for ${lang}:`, translations);
        return translations;
    } catch (error) {
        console.error('Error loading translations:', error);
        return null;
    }
};

const updateLanguage = async (lang) => {
    console.log('Updating language to:', lang);
    const translations = await loadTranslations(lang);
    if (!translations) return;

    // Update switcher UI
    document.querySelectorAll('.lang-option').forEach(opt => {
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
    
    // Update all elements with data-i18n attribute
    const elements = document.querySelectorAll('[data-i18n]');
    console.log('Found elements with data-i18n:', elements.length);
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = getNestedValue(translations, key);
        if (translation) {
            if (element.tagName === 'INPUT' && element.type === 'text') {
                element.placeholder = translation;
            } else {
                element.textContent = translation;
            }
        }
    });
    if (typeof window.renderAraraFactPesquisa === 'function') {
        window.renderAraraFactPesquisa();
    }
};

// Global function to switch language
window.switchLanguage = async (lang) => {
    console.log('Switch language called with:', lang);
    await updateLanguage(lang);
    localStorage.setItem('preferredLanguage', lang);
};

document.addEventListener('DOMContentLoaded', () => {
    console.log('Script loaded');
    const langSwitch = document.getElementById('lang-switch');
    console.log('Language switch element:', langSwitch);

    // Load preferred language or default to Portuguese
    localStorage.removeItem('preferredLanguage'); // Clear any saved preference
    const preferredLanguage = 'pt';
    console.log('Preferred language:', preferredLanguage);
    updateLanguage(preferredLanguage);

    // Mobile Menu Toggle
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');

// Open mobile menu
    hamburgerMenu.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Close mobile menu
    mobileMenuClose.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Close mobile menu when a link is clicked
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !hamburgerMenu.contains(e.target)) {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Table of Contents Active State
    const tocLinks = document.querySelectorAll('.toc-link');
    const sections = document.querySelectorAll('section[id]');

    // Update active link on scroll
    function updateActiveLink() {
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                tocLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Smooth scroll for TOC links
    tocLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile menu smooth scroll
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();

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

    if (araraCompanion && araraBubble && araraText) {
        let messageIndex = 0;
        let isPaused = false;
        let isManuallyClosed = false;
        let intervalId = null;

        const getAraraItems = () => {
            const currentLang = localStorage.getItem('preferredLanguage') || 'pt';
            const cache = translationsCache[currentLang];
            if (cache && cache.arara && Array.isArray(cache.arara.items) && cache.arara.items.length > 0) {
                return cache.arara.items;
            }
            return araraFacts[currentLang] || araraFacts.pt;
        };

        const renderAraraFact = () => {
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

        window.renderAraraFactPesquisa = renderAraraFact;

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
});
