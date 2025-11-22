document.addEventListener('DOMContentLoaded', () => {
    // Internationalization (i18n)
    const translationsCache = {};

    const langSwitch = document.getElementById('lang-switch');
    const langText = langSwitch.querySelector('span');
    
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
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = getNestedValue(translations, key);
            
            if (translation) {
                // Check if the element contains HTML tags in the translation
                if (translation.includes('<')) {
                    element.innerHTML = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });

        // Save preference
        localStorage.setItem('language', lang);
    };

    // Initialize language
    const savedLang = localStorage.getItem('language') || 'pt';
    updateLanguage(savedLang);

    // Event Listener
    langSwitch.addEventListener('click', () => {
        const currentLang = localStorage.getItem('language') || 'pt';
        const newLang = currentLang === 'pt' ? 'en' : 'pt';
        updateLanguage(newLang);
    });

    // Hamburger Menu
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("nav-links");

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            const icon = hamburger.querySelector("i");
            if (icon.classList.contains("fa-bars")) {
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-times");
            } else {
                icon.classList.remove("fa-times");
                icon.classList.add("fa-bars");
            }
        });

        // Close menu when clicking on a link
        document.querySelectorAll(".nav-links a").forEach((link) => {
            link.addEventListener("click", () => {
                if (navLinks.classList.contains("active")) {
                    navLinks.classList.remove("active");
                    const icon = hamburger.querySelector("i");
                    icon.classList.remove("fa-times");
                    icon.classList.add("fa-bars");
                }
            });
        });
    }

    // Navbar Scroll Effect
    const navbar = document.querySelector(".navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.style.background = "rgba(5, 5, 5, 0.95)";
            navbar.style.boxShadow = "0 10px 30px -10px rgba(0, 0, 0, 0.5)";
        } else {
            navbar.style.background = "rgba(5, 5, 5, 0.8)";
            navbar.style.boxShadow = "none";
        }
    });

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            if (targetId === "#") return;
            
            const target = document.querySelector(targetId);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add fade-in class to elements we want to animate
    const animatedElements = document.querySelectorAll(
        ".section h2, .about-grid, .timeline-item, .skill-card, .project-card, .interest-tag"
    );
    
    animatedElements.forEach((el) => {
        el.classList.add("fade-in");
        observer.observe(el);
    });

    // Active Navigation Link
    const sections = document.querySelectorAll("section[id]");
    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 150) {
                current = section.getAttribute("id");
            }
        });

        document.querySelectorAll(".nav-links a").forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    });
});
