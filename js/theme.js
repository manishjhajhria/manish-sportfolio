/* ============================================================
   MOI IDENTITÉ — Theme Manager
   ============================================================
   Handles light ↔ dark theming with localStorage persistence,
   system-preference detection, and GSAP-powered toggle icon
   animation.
   ============================================================ */

var MOI = window.MOI || {};

MOI.ThemeManager = (function () {
  'use strict';

  /* ── State ── */
  var currentTheme = 'dark';           // default
  var STORAGE_KEY  = 'moi-theme';
  var mediaQuery   = null;             // matchMedia reference

  /* ── Init ── */

  function init() {
    // 1. Check localStorage
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') {
      currentTheme = saved;
    } else {
      // 2. Fallback to system preference
      mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      currentTheme = mediaQuery.matches ? 'dark' : 'light';
    }

    applyTheme(currentTheme);
    updateToggleIcon();

    // 3. Listen for live system preference changes
    if (!mediaQuery) {
      mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    }
    try {
      mediaQuery.addEventListener('change', handleSystemChange);
    } catch (_) {
      // Safari < 14 fallback
      mediaQuery.addListener(handleSystemChange);
    }
  }

  /* ── System preference change ── */

  function handleSystemChange(e) {
    // Only react when user has NOT explicitly set a preference
    if (localStorage.getItem(STORAGE_KEY)) return;
    currentTheme = e.matches ? 'dark' : 'light';
    applyTheme(currentTheme);
    updateToggleIcon();
  }

  /* ── Toggle ── */

  function toggle() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem(STORAGE_KEY, currentTheme);
    applyTheme(currentTheme);
    animateToggleIcon();
  }

  /* ── Apply ── */

  function applyTheme(theme) {
    var html = document.documentElement;

    // Remove both, add current
    html.classList.remove('theme-light', 'theme-dark');
    html.classList.add('theme-' + theme);

    // Also set data-theme for CSS custom property selectors
    html.setAttribute('data-theme', theme);

    // Update meta theme-color for mobile browsers
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute('content', theme === 'dark' ? '#0a0a0f' : '#ffffff');
    }

    currentTheme = theme;
  }

  /* ── Icon management ── */

  function updateToggleIcon() {
    var btn = document.querySelector('[data-theme-toggle]');
    if (!btn) return;

    var iconName = currentTheme === 'dark' ? 'sun' : 'moon';
    btn.innerHTML = '<i data-lucide="' + iconName + '"></i>';
    btn.setAttribute('aria-label',
      currentTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
    );

    // Re-render Lucide icons inside the button
    if (typeof lucide !== 'undefined') {
      lucide.createIcons({ nodes: [btn] });
    }
  }

  function animateToggleIcon() {
    var btn = document.querySelector('[data-theme-toggle]');
    if (!btn) return;

    // GSAP rotation animation
    if (typeof gsap !== 'undefined') {
      gsap.fromTo(btn,
        { rotation: 0, scale: 0.5, opacity: 0.3 },
        {
          rotation: 360,
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: 'back.out(1.7)',
          onStart: function () {
            updateToggleIcon();
          }
        }
      );
    } else {
      updateToggleIcon();
    }
  }

  /* ── Getters ── */

  function getTheme() {
    return currentTheme;
  }

  /* ── Expose ── */
  return {
    init: init,
    toggle: toggle,
    applyTheme: applyTheme,
    getTheme: getTheme,
    get currentTheme() { return currentTheme; }
  };

})();
