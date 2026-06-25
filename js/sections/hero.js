/* ============================================================
   MOI IDENTITÉ — Hero Section
   ============================================================
   Typewriter tagline cycling, entrance animation, and optional
   mouse-parallax on decorative elements.
   ============================================================ */

var MOI = window.MOI || {};

MOI.HeroSection = (function () {
  'use strict';

  /* ── Config ── */
  var TYPING_SPEED   = 70;   // ms per character
  var DELETING_SPEED = 40;   // ms per character
  var PAUSE_BEFORE_DELETE = 2000; // ms
  var PAUSE_BEFORE_TYPE   = 500;  // ms

  /* ── State ── */
  var taglines       = [];
  var currentIndex   = 0;
  var charIndex       = 0;
  var isDeleting      = false;
  var typewriterEl    = null;
  var cursorEl        = null;
  var heroEl          = null;
  var timerId         = null;
  var parallaxEls     = [];

  /* ── Init ── */

  function init() {
    heroEl       = document.getElementById('hero');
    typewriterEl = document.querySelector('[data-typewriter]');
    cursorEl     = document.querySelector('.typewriter-cursor');

    if (!heroEl || !typewriterEl) return;

    loadTaglines();
    startTypewriter();
    playEntranceAnimation();
    initParallax();

    // React to language changes
    document.addEventListener('languageChanged', onLanguageChanged);
  }

  /* ── Taglines ── */

  function loadTaglines() {
    var data = MOI.LanguageManager.getText('personal.taglines');
    if (Array.isArray(data) && data.length > 0) {
      taglines = data;
    } else {
      taglines = ['I build digital experiences'];
    }
  }

  /* ── Typewriter ── */

  function startTypewriter() {
    stopTypewriter();
    currentIndex = 0;
    charIndex    = 0;
    isDeleting   = false;
    tick();
  }

  function stopTypewriter() {
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
    }
  }

  function tick() {
    var current = taglines[currentIndex] || '';
    var displayText;

    if (isDeleting) {
      charIndex--;
      displayText = current.substring(0, charIndex);
    } else {
      charIndex++;
      displayText = current.substring(0, charIndex);
    }

    if (typewriterEl) {
      typewriterEl.textContent = displayText;
    }

    // Determine next step
    var delay;

    if (!isDeleting && charIndex === current.length) {
      // Finished typing — pause then delete
      delay = PAUSE_BEFORE_DELETE;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      // Finished deleting — move to next tagline
      isDeleting = false;
      currentIndex = (currentIndex + 1) % taglines.length;
      delay = PAUSE_BEFORE_TYPE;
    } else {
      delay = isDeleting ? DELETING_SPEED : TYPING_SPEED;
    }

    timerId = setTimeout(tick, delay);
  }

  /* ── Entrance animation ── */

  function playEntranceAnimation() {
    if (typeof gsap === 'undefined') return;

    var tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Stagger hero children in
    var greeting    = heroEl.querySelector('.hero-greeting');
    var name        = heroEl.querySelector('.hero-name');
    var title       = heroEl.querySelector('.hero-title');
    var typeArea    = heroEl.querySelector('.hero-typewriter');
    var bio         = heroEl.querySelector('.hero-bio');
    var cta         = heroEl.querySelector('.hero-cta');
    var socials     = heroEl.querySelector('.hero-socials');
    var scrollHint  = heroEl.querySelector('.scroll-indicator');

    var targets = [greeting, name, title, typeArea, bio, cta, socials, scrollHint].filter(Boolean);

    tl.from(targets, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.12
    });
  }

  /* ── Mouse parallax ── */

  function initParallax() {
    parallaxEls = heroEl ? heroEl.querySelectorAll('[data-parallax]') : [];
    if (parallaxEls.length === 0) return;

    heroEl.addEventListener('mousemove', handleParallax);
  }

  function handleParallax(e) {
    var rect = heroEl.getBoundingClientRect();
    var x = (e.clientX - rect.left) / rect.width  - 0.5;  // –0.5 … +0.5
    var y = (e.clientY - rect.top)  / rect.height - 0.5;

    parallaxEls.forEach(function (el) {
      var speed = parseFloat(el.getAttribute('data-parallax')) || 20;
      var tx = x * speed;
      var ty = y * speed;

      if (typeof gsap !== 'undefined') {
        gsap.to(el, {
          x: tx,
          y: ty,
          duration: 0.6,
          ease: 'power2.out'
        });
      } else {
        el.style.transform = 'translate(' + tx + 'px, ' + ty + 'px)';
      }
    });
  }

  /* ── Language change handler ── */

  function onLanguageChanged() {
    loadTaglines();
    // Restart typewriter with new taglines
    stopTypewriter();
    charIndex   = 0;
    isDeleting  = false;
    currentIndex = 0;
    if (typewriterEl) typewriterEl.textContent = '';
    tick();
  }

  /* ── Expose ── */
  return {
    init: init
  };

})();
