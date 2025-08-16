/**
 * Modern Portfolio JavaScript - Working Version
 * Author: Diluksha Perera
 * Features: ES6+, Modern APIs, Performance Optimized
 */

// Modern JavaScript with ES6+ features
class PortfolioPortfolio {
  constructor() {
    this.init();
  }

  init() {
    // Set default theme to dark
    this.setDefaultTheme();
    this.setupEventListeners();
    this.setupScrollEffects();
    this.setupThemeToggle();
    this.setupAnimations();
    this.initCounters(); // Add counter initialization
    this.initTypingAnimation(); // Add typing animation
    this.initOwlCarousel(); // Add Owl Carousel initialization
  }

  // Set default theme to dark
  setDefaultTheme() {
    // Check if theme is already set in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (!savedTheme) {
      // Set default theme to dark if no theme is saved
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    }
  }

  setupEventListeners() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

    // Mobile navigation toggle
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
      navbarToggler.addEventListener('click', () => {
        navbarCollapse.classList.toggle('show');
      });
    }

    // Close mobile menu when clicking on links
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
      link.addEventListener('click', () => {
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
          navbarCollapse.classList.remove('show');
        }
      });
    });

    // Back to top button
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
      backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
  }

  setupScrollEffects() {
    // Navbar scroll effects
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Add/remove navbar background
      if (scrollTop > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }

      // Back to top button visibility
      const backToTop = document.querySelector('.back-to-top');
      if (backToTop) {
        if (scrollTop > 300) {
          backToTop.classList.add('show');
        } else {
          backToTop.classList.remove('show');
        }
      }

      // Active navigation highlighting
      this.updateActiveNavItem(scrollTop);
      
      lastScrollTop = scrollTop;
    });
  }

  updateActiveNavItem(scrollTop) {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      
      if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  setupThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;

    // Set initial theme toggle state based on current theme
    this.updateThemeToggleState();

    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      
      // Update toggle button state
      this.updateThemeToggleState();
    });
  }

  // Update theme toggle button appearance
  updateThemeToggleState() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;

    const currentTheme = document.documentElement.getAttribute('data-theme');
    
    if (currentTheme === 'dark') {
      themeToggle.innerHTML = '<i class="fa fa-sun-o" aria-hidden="true"></i>';
      themeToggle.title = 'Switch to Light Theme';
    } else {
      themeToggle.innerHTML = '<i class="fa fa-moon-o" aria-hidden="true"></i>';
      themeToggle.title = 'Switch to Dark Theme';
    }
  }

  setupAnimations() {
    // Skill bar animations
    this.animateSkillBars();
    
    // Hover effects for cards
    this.setupCardHoverEffects();
    
    // Loading animations
    this.setupLoadingAnimations();
  }

  // Modern Typing Animation for Hero Subtitle
  initTypingAnimation() {
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (!heroSubtitle) return;

    const keywords = [
      'Associate Data Engineer',
      'GOLD - Microsoft Student Ambassador', 
      'Passionate Learner',
      'AI and ML Enthusiast'
    ];

    let currentKeywordIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100; // Base typing speed

    const typeWriter = () => {
      const currentKeyword = keywords[currentKeywordIndex];
      
      if (isDeleting) {
        // Deleting effect
        heroSubtitle.textContent = currentKeyword.substring(0, currentCharIndex - 1);
        currentCharIndex--;
        typingSpeed = 50; // Faster deletion
      } else {
        // Typing effect
        heroSubtitle.textContent = currentKeyword.substring(0, currentCharIndex + 1);
        currentCharIndex++;
        typingSpeed = 100; // Normal typing speed
      }

      // Handle typing completion
      if (!isDeleting && currentCharIndex === currentKeyword.length) {
        // Pause at the end of typing
        typingSpeed = 2000; // 2 second pause
        isDeleting = true;
      } else if (isDeleting && currentCharIndex === 0) {
        // Move to next keyword
        isDeleting = false;
        currentKeywordIndex = (currentKeywordIndex + 1) % keywords.length;
        typingSpeed = 500; // Pause before next keyword
      }

      setTimeout(typeWriter, typingSpeed);
    };

    // Start the typing animation
    typeWriter();
  }

  animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    if (skillBars.length > 0) {
      const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const skillBar = entry.target;
            const width = skillBar.style.width;
            
            // Reset width and animate
            skillBar.style.width = '0%';
            setTimeout(() => {
              skillBar.style.width = width;
            }, 100);
            
            skillObserver.unobserve(skillBar);
          }
        });
      }, { threshold: 0.5 });

      skillBars.forEach(bar => {
        skillObserver.observe(bar);
      });
    }
  }

  setupCardHoverEffects() {
    const cards = document.querySelectorAll('.expertise-card, .project-card, .event-card, .blog-card');
    
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
      });
    });
  }

  setupLoadingAnimations() {
    // Preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
      window.addEventListener('load', () => {
        preloader.style.opacity = '0';
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 300);
      });
    }
  }

  initCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    if (counters.length === 0) return;
    
    // Check if Intersection Observer is supported
    if ('IntersectionObserver' in window) {
      const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
      };

      const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.getAttribute('data-count'));
            if (!isNaN(target)) {
              this.animateCounter(counter, target);
              counterObserver.unobserve(counter);
            }
          }
        });
      }, observerOptions);

      counters.forEach(counter => {
        counterObserver.observe(counter);
      });
    } else {
      // Fallback for older browsers - animate all counters immediately
      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        if (!isNaN(target)) {
          this.animateCounter(counter, target);
        }
      });
    }
  }

  animateCounter(element, target) {
    let current = 0;
    const duration = 2000; // 2 seconds animation
    const steps = 60; // 60fps animation
    const increment = target / steps;
    const stepDuration = duration / steps;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current);
    }, stepDuration);
  }

  initOwlCarousel() {
    // Check if Owl Carousel is available
    if (typeof $.fn.owlCarousel === 'undefined') {
      console.log('Owl Carousel not loaded, using fallback display');
      return;
    }

    const achievementsCarousel = document.getElementById('achievements-carousel');
    if (!achievementsCarousel) return;

    $(achievementsCarousel).owlCarousel({
      loop: true,
      margin: 30, // Increased margin for better spacing
      nav: true,
      dots: true,
      autoplay: true,
      autoplayTimeout: 4000, // Reduced from 5000 to 4000 for faster scrolling
      autoplayHoverPause: true,
      autoplaySpeed: 1000, // Added smooth autoplay speed
      navSpeed: 600, // Added smooth navigation speed
      dotsSpeed: 600, // Added smooth dots transition
      navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
      smartSpeed: 1000, // Added smart speed for smooth transitions
      responsive: {
        0: {
          items: 1,
          margin: 15,
          autoplayTimeout: 3000 // Faster on mobile
        },
        600: {
          items: 2,
          margin: 20,
          autoplayTimeout: 3500
        },
        1000: {
          items: 3,
          margin: 30,
          autoplayTimeout: 4000
        }
      }
    });

    // Add pause on hover functionality
    $(achievementsCarousel).on('mouseenter', function() {
      $(this).trigger('stop.owl.autoplay');
    }).on('mouseleave', function() {
      $(this).trigger('play.owl.autoplay');
    });
  }
}

// Initialize when DOM is ready
const initPortfolio = () => {
  new PortfolioPortfolio();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPortfolio);
} else {
  initPortfolio();
}
