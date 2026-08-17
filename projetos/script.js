let translationsCache = {};

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
    return null;
  }
};

const updateLanguage = async (lang) => {
  const translations = await loadTranslations(lang);
  if (!translations) return;

  document.querySelectorAll('.lang-option').forEach(opt => {
    if (opt.dataset.lang === lang) {
      opt.classList.add('active');
    } else {
      opt.classList.remove('active');
    }
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
  if (typeof renderAraraFact === 'function') {
    renderAraraFact();
  }
};

window.switchLanguage = async (lang) => {
  await updateLanguage(lang);
};

document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('language') || 'pt';
  updateLanguage(savedLang);

  const langSwitch = document.getElementById('lang-switch');
  if (langSwitch) {
    langSwitch.addEventListener('click', () => {
      const currentLang = localStorage.getItem('language') || 'pt';
      const newLang = currentLang === 'pt' ? 'en' : 'pt';
      updateLanguage(newLang);
    });
  }

  const projectArticles = document.querySelectorAll('.card-main');
  const catalogItems = document.querySelectorAll('.catalog-item');

  const setProjectExpanded = (card, expand) => {
    const header = card.querySelector('.card-preview-header');
    if (expand) {
      card.classList.add('is-expanded');
      card.classList.remove('is-collapsed');
      if (header) header.setAttribute('aria-expanded', 'true');
    } else {
      card.classList.remove('is-expanded');
      card.classList.add('is-collapsed');
      if (header) header.setAttribute('aria-expanded', 'false');
    }
  };

  projectArticles.forEach(card => {
    const header = card.querySelector('.card-preview-header');
    if (header) {
      header.addEventListener('click', (e) => {
        if (e.target.closest('a')) return;
        const isCurrentlyExpanded = card.classList.contains('is-expanded');
        setProjectExpanded(card, !isCurrentlyExpanded);
      });

      header.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          if (e.target.closest('a')) return;
          e.preventDefault();
          const isCurrentlyExpanded = card.classList.contains('is-expanded');
          setProjectExpanded(card, !isCurrentlyExpanded);
        }
      });
    }

    const footerBtn = card.querySelector('.collapse-footer-btn');
    if (footerBtn) {
      footerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        setProjectExpanded(card, false);
        const section = card.closest('.project-showcase');
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }
  });

  const btnExpandAll = document.getElementById('btn-expand-all');
  if (btnExpandAll) {
    btnExpandAll.addEventListener('click', () => {
      projectArticles.forEach(card => setProjectExpanded(card, true));
    });
  }

  const btnCollapseAll = document.getElementById('btn-collapse-all');
  if (btnCollapseAll) {
    btnCollapseAll.addEventListener('click', () => {
      projectArticles.forEach(card => setProjectExpanded(card, false));
    });
  }

  catalogItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = item.getAttribute('data-target');
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        const card = targetSection.querySelector('.card-main');
        if (card) {
          setProjectExpanded(card, true);
        }
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        catalogItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
      }
    });
  });

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        catalogItems.forEach(item => {
          if (item.getAttribute('data-target') === id) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  document.querySelectorAll('.project-showcase').forEach(sec => {
    sectionObserver.observe(sec);
  });

  const imageModal = document.getElementById('image-modal');
  const modalClose = document.getElementById('modal-close');
  const modalImg = imageModal ? imageModal.querySelector('img') : null;
  const screenshotFrames = document.querySelectorAll('.screenshot-frame');

  if (screenshotFrames.length > 0 && imageModal && modalImg) {
    screenshotFrames.forEach(frame => {
      frame.addEventListener('click', () => {
        const frameImg = frame.querySelector('img');
        if (frameImg) {
          modalImg.src = frameImg.src;
          modalImg.alt = frameImg.alt;
        }
        imageModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    const closeModal = () => {
      imageModal.classList.remove('active');
      document.body.style.overflow = '';
    };

    if (modalClose) {
      modalClose.addEventListener('click', closeModal);
    }

    imageModal.addEventListener('click', (e) => {
      if (e.target === imageModal) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && imageModal.classList.contains('active')) {
        closeModal();
      }
    });
  }

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
      const currentLang = localStorage.getItem('language') || 'pt';
      const cache = translationsCache[currentLang];
      if (cache && cache.arara && Array.isArray(cache.arara.items) && cache.arara.items.length > 0) {
        return cache.arara.items;
      }
      return araraFacts[currentLang] || araraFacts.pt;
    };

    window.renderAraraFact = () => {
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
      if (typeof window.renderAraraFact === 'function') {
        window.renderAraraFact();
      }
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
      if (typeof window.renderAraraFact === 'function') {
        window.renderAraraFact();
      }
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
