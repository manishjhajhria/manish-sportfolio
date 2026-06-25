/* ============================================================
   MOI IDENTITÉ — Language Manager
   ============================================================
   Handles bilingual (EN ↔ FR) switching with localStorage
   persistence and reactive DOM updates via data-* attributes.
   ============================================================ */

var MOI = window.MOI || {};

MOI.LanguageManager = (function () {
  'use strict';

  /* ── State ── */
  var currentLang = 'en';
  var STORAGE_KEY = 'moi-lang';

  /* ── Helpers ── */

  /**
   * Resolve a dot-notation path against an object.
   * e.g. getText('personal.name') → PORTFOLIO_DATA[currentLang].personal.name
   */
  function resolvePath(obj, path) {
    if (!path) return undefined;
    var keys = path.split('.');
    var value = obj;
    for (var i = 0; i < keys.length; i++) {
      if (value == null) return undefined;
      value = value[keys[i]];
    }
    return value;
  }

  /* ── Public API ── */

  function init() {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved && (saved === 'en' || saved === 'fr')) {
      currentLang = saved;
    }
    applyLanguage();
  }

  function toggle() {
    currentLang = currentLang === 'en' ? 'fr' : 'en';
    localStorage.setItem(STORAGE_KEY, currentLang);
    applyLanguage();
  }

  function getLang() {
    return currentLang;
  }

  function setLang(lang) {
    if (lang !== 'en' && lang !== 'fr') return;
    currentLang = lang;
    localStorage.setItem(STORAGE_KEY, currentLang);
    applyLanguage();
  }

  /**
   * Return translated text for the given dot-notation path.
   */
  function getText(path) {
    if (typeof PORTFOLIO_DATA === 'undefined') return '';
    return resolvePath(PORTFOLIO_DATA[currentLang], path);
  }

  /**
   * Return the entire data block for the current language.
   */
  function getData() {
    if (typeof PORTFOLIO_DATA === 'undefined') return {};
    return PORTFOLIO_DATA[currentLang];
  }

  /* ── DOM update ── */

  function updateDOM() {
    // textContent binding
    var textEls = document.querySelectorAll('[data-lang-key]');
    textEls.forEach(function (el) {
      var key = el.getAttribute('data-lang-key');
      var text = getText(key);
      if (text !== undefined && typeof text === 'string') {
        el.textContent = text;
      }
    });

    // innerHTML binding
    var htmlEls = document.querySelectorAll('[data-lang-html]');
    htmlEls.forEach(function (el) {
      var key = el.getAttribute('data-lang-html');
      var html = getText(key);
      if (html !== undefined && typeof html === 'string') {
        el.innerHTML = html;
      }
    });

    // placeholder binding
    var placeholderEls = document.querySelectorAll('[data-lang-placeholder]');
    placeholderEls.forEach(function (el) {
      var key = el.getAttribute('data-lang-placeholder');
      var text = getText(key);
      if (text !== undefined && typeof text === 'string') {
        el.setAttribute('placeholder', text);
      }
    });

    // aria-label binding
    var ariaEls = document.querySelectorAll('[data-lang-aria]');
    ariaEls.forEach(function (el) {
      var key = el.getAttribute('data-lang-aria');
      var text = getText(key);
      if (text !== undefined && typeof text === 'string') {
        el.setAttribute('aria-label', text);
      }
    });

    // Update lang toggle button text
    updateToggleButton();

    // Update <html lang="...">
    document.documentElement.setAttribute('lang', currentLang);
  }

  function updateToggleButton() {
    var btn = document.querySelector('[data-lang-toggle]');
    if (btn) {
      // Show the OTHER language as the label (click to switch to it)
      btn.textContent = currentLang === 'en' ? 'FR' : 'EN';
      btn.setAttribute('aria-label',
        currentLang === 'en' ? 'Passer en français' : 'Switch to English'
      );
    }
  }

  function applyLanguage() {
    updateDOM();

    // Dispatch custom event so other modules can react
    var event;
    try {
      event = new CustomEvent('languageChanged', {
        detail: { lang: currentLang }
      });
    } catch (e) {
      // IE fallback
      event = document.createEvent('CustomEvent');
      event.initCustomEvent('languageChanged', true, true, { lang: currentLang });
    }
    document.dispatchEvent(event);
  }

  /* ── Expose ── */
  return {
    init: init,
    toggle: toggle,
    getLang: getLang,
    setLang: setLang,
    getText: getText,
    getData: getData,
    updateDOM: updateDOM,
    get currentLang() { return currentLang; }
  };

})();
