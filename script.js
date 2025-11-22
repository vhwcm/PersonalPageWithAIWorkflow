      // Hamburger Menu
      const hamburger = document.getElementById("hamburger");
      const navLinks = document.getElementById("nav-links");

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
            hamburger.querySelector("i").classList.remove("fa-times");
            hamburger.querySelector("i").classList.add("fa-bars");
          }
        });
      });

      // Enhanced Header scroll effect (fixed)
      const header = document.getElementById("header");

      window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
          header.classList.add("scrolled");
        } else {
          header.classList.remove("scrolled");
        }
      });

      // Advanced Navigation Active State
      const sections = document.querySelectorAll("section[id]");
      const navLinksElements = document.querySelectorAll(".nav-links a");

      window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach((section) => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.clientHeight;
          if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute("id");
          }
        });

        navLinksElements.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
          }
        });
      });

      // Enhanced smooth scroll (fixed)
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute("href"));
          if (target) {
            target.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        });
      });

      // Intersection Observer for fade-in animations
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

      // Observe all fade-in elements
      document.querySelectorAll(".fade-in").forEach((el) => {
        observer.observe(el);
      });

      // Add floating particles animation
      function createParticles() {
        const particles = document.querySelector(".particles");

        setInterval(() => {
          const particle = document.createElement("div");
          particle.className = "particle";

          // Random properties
          const size = Math.random() * 4 + 1;
          const left = Math.random() * 100;
          const animationDuration = Math.random() * 10 + 10;

          particle.style.width = size + "px";
          particle.style.height = size + "px";
          particle.style.left = left + "%";
          particle.style.animationDuration = animationDuration + "s";

          particles.appendChild(particle);

          // Remove particle after animation
          setTimeout(() => {
            particle.remove();
          }, animationDuration * 1000);
        }, 2000);
      }

      // Initialize particles
      createParticles();

      // Professional fade-in for hero title (removed typing effect)
      setTimeout(() => {
        const heroTitle = document.querySelector(".hero-title");
        if (heroTitle) {
          heroTitle.style.opacity = "1";
          heroTitle.style.transform = "translateX(0)";
        }
      }, 800);

      // Add hover effects to skill cards (more subtle)
      document.querySelectorAll(".skill-card").forEach((card) => {
        card.addEventListener("mouseenter", () => {
          card.style.transform = "translateY(-6px) rotateY(2deg)";
        });

        card.addEventListener("mouseleave", () => {
          card.style.transform = "translateY(0) rotateY(0)";
        });
      });

      // Add glitch effect to logo on hover
      const logo = document.querySelector(".logo");
      if (logo) {
        logo.addEventListener("mouseenter", () => {
          logo.style.animation = "glitch 0.3s ease-in-out";
        });

        logo.addEventListener("animationend", () => {
          logo.style.animation = "";
        });
      }

      // Add CSS for glitch effect
      const style = document.createElement("style");
      style.textContent = `
        @keyframes subtleShimmer {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
      `;
      document.head.appendChild(style);
