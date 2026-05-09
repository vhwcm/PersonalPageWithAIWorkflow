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

    // Update active link on scroll
    window.addEventListener('scroll', updateActiveLink);

    // Initial call to set active link
    updateActiveLink();
});
