/* ============================================================
   MOI IDENTITÉ — Main Application Controller
   ============================================================
   Orchestrates all modules, handles global UI behaviors:
   preloader, navbar, smooth scroll, back-to-top, scroll
   animations, mobile menu, and active section tracking.
   ============================================================ */

var MOI = window.MOI || {};

MOI.App = (function () {
  'use strict';

  /* ── Cached DOM refs (populated in init) ── */
  var els = {};

  /* ── Init ── */

  function init() {
    cacheDOM();

    // Core managers
    MOI.ThemeManager.init();
    MOI.LanguageManager.init();

    // Global UI
    handlePreloader();
    initSmoothScroll();
    initNavbar();
    initActiveSection();
    initMobileMenu();
    initBackToTop();
    initModeToggle();

    // Section modules
    if (MOI.HeroSection)     MOI.HeroSection.init();
    if (MOI.TimelineSection) MOI.TimelineSection.init();
    if (MOI.SkillsSection)   MOI.SkillsSection.init();
    if (MOI.ProjectsSection) MOI.ProjectsSection.init();
    if (MOI.ContactSection)  MOI.ContactSection.init();
    if (MOI.CertsTestimonialsSection) MOI.CertsTestimonialsSection.init();

    // Initialize animations after dynamic content is added
    initScrollAnimations();

    // Render Lucide icons once after all dynamic content
    refreshIcons();

    // Optional: GSAP ScrollTrigger defaults
    initGSAPDefaults();
  }

  function cacheDOM() {
    els.preloader    = document.getElementById('preloader');
    els.navbar       = document.querySelector('.navbar');
    els.navLinks     = document.querySelectorAll('.nav-link[href^="#"]');
    els.mobileToggle = document.querySelector('[data-mobile-toggle]');
    els.mobileMenu   = document.querySelector('.nav-menu');
    els.backToTop    = document.querySelector('[data-back-to-top]');
    els.sections     = document.querySelectorAll('section[id]');
    els.modeToggle   = document.querySelector('[data-mode-toggle]');
  }

  /* ── 3D Mode Toggle ── */
  function initModeToggle() {
    if (!els.modeToggle) return;
    
    var icon3d = els.modeToggle.querySelector('.icon-3d');
    var icon2d = els.modeToggle.querySelector('.icon-2d');

    els.modeToggle.addEventListener('click', function() {
      document.body.classList.toggle('mode-3d');
      var is3d = document.body.classList.contains('mode-3d');
      
      if (is3d) {
        if (icon3d) icon3d.style.display = 'none';
        if (icon2d) icon2d.style.display = 'block';
      } else {
        if (icon3d) icon3d.style.display = 'block';
        if (icon2d) icon2d.style.display = 'none';
      }
    });
  }

  /* ── Preloader ── */

  function handlePreloader() {
    if (!els.preloader) return;

    var hide = function () {
      if (typeof gsap !== 'undefined') {
        gsap.to(els.preloader, {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.inOut',
          onComplete: function () {
            els.preloader.style.display = 'none';
            document.body.classList.remove('loading');
          }
        });
      } else {
        els.preloader.style.opacity = '0';
        setTimeout(function () {
          els.preloader.style.display = 'none';
          document.body.classList.remove('loading');
        }, 600);
      }
    };

    // Hide when window fully loads, OR after 2 s — whichever comes first
    var timer = setTimeout(hide, 2000);

    window.addEventListener('load', function () {
      clearTimeout(timer);
      hide();
    });
  }

  /* ── Smooth Scroll ── */

  function initSmoothScroll() {
    document.addEventListener('click', function (e) {
      var link = e.target.closest('a[href^="#"]');
      if (!link) return;

      var targetId = link.getAttribute('href');
      if (targetId === '#' || targetId.length < 2) return;

      var target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      var navHeight = els.navbar ? els.navbar.offsetHeight : 0;
      var top = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

      window.scrollTo({ top: top, behavior: 'smooth' });

      // Close mobile menu if open
      closeMobileMenu();
    });
  }

  /* ── Navbar ── */

  function initNavbar() {
    if (!els.navbar) return;

    var SCROLL_THRESHOLD = 50;

    var onScroll = throttle(function () {
      if (window.scrollY > SCROLL_THRESHOLD) {
        els.navbar.classList.add('scrolled');
      } else {
        els.navbar.classList.remove('scrolled');
      }
    }, 100);

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on init
  }

  /* ── Active Section ── */

  function initActiveSection() {
    if (!els.sections || els.sections.length === 0) return;

    var observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.getAttribute('id');
        setActiveNavLink(id);
      });
    }, observerOptions);

    els.sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  function setActiveNavLink(sectionId) {
    els.navLinks.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + sectionId) {
        link.classList.add('active');
      }
    });
  }

  /* ── Mobile Menu ── */

  function initMobileMenu() {
    if (!els.mobileToggle) return;

    els.mobileToggle.addEventListener('click', function () {
      var isOpen = els.mobileMenu && els.mobileMenu.classList.contains('open');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMobileMenu();
    });
  }

  function openMobileMenu() {
    if (!els.mobileMenu || !els.mobileToggle) return;
    els.mobileMenu.classList.add('open');
    els.mobileToggle.classList.add('active');
    els.mobileToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden'; // prevent background scroll
  }

  function closeMobileMenu() {
    if (!els.mobileMenu || !els.mobileToggle) return;
    els.mobileMenu.classList.remove('open');
    els.mobileToggle.classList.remove('active');
    els.mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  /* ── Back To Top ── */

  function initBackToTop() {
    if (!els.backToTop) return;

    var SHOW_THRESHOLD = 300;

    var onScroll = throttle(function () {
      if (window.scrollY > SHOW_THRESHOLD) {
        els.backToTop.classList.add('visible');
      } else {
        els.backToTop.classList.remove('visible');
      }
    }, 150);

    window.addEventListener('scroll', onScroll, { passive: true });

    els.backToTop.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── Scroll Animations ── */

  function initScrollAnimations() {
    var animateEls = document.querySelectorAll('.animate-on-scroll');
    if (animateEls.length === 0) return;

    var observerOptions = {
      root: null,
      rootMargin: '0px 0px -80px 0px',
      threshold: 0.1
    };

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');

          // Optional stagger delay via data attribute
          var delay = entry.target.getAttribute('data-animate-delay');
          if (delay) {
            entry.target.style.transitionDelay = delay + 'ms';
          }

          observer.unobserve(entry.target); // animate only once
        }
      });
    }, observerOptions);

    animateEls.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ── GSAP Defaults ── */

  function initGSAPDefaults() {
    if (typeof gsap === 'undefined') return;

    // Register ScrollTrigger if available
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      // Set sensible defaults
      ScrollTrigger.defaults({
        toggleActions: 'play none none reverse',
        start: 'top 85%'
      });
    }
  }

  /* ── Lucide icon refresh helper ── */

  function refreshIcons() {
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }

  /* ── Utility: throttle ── */

  function throttle(fn, wait) {
    var last = 0;
    var timer = null;
    return function () {
      var now = Date.now();
      var remaining = wait - (now - last);
      var context = this;
      var args = arguments;

      if (remaining <= 0) {
        if (timer) { clearTimeout(timer); timer = null; }
        last = now;
        fn.apply(context, args);
      } else if (!timer) {
        timer = setTimeout(function () {
          last = Date.now();
          timer = null;
          fn.apply(context, args);
        }, remaining);
      }
    };
  }

  /* ── Expose ── */
  return {
    init: init,
    refreshIcons: refreshIcons,
    closeMobileMenu: closeMobileMenu
  };

})();

/* ── Bootstrap on DOM ready ── */
document.addEventListener('DOMContentLoaded', function () {
  MOI.App.init();
});
