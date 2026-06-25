/* ============================================================
   MOI IDENTITÉ — Skills Section
   ============================================================
   Category-tabbed skill visualization with animated progress
   bars and percentage counters that activate on scroll.
   ============================================================ */

var MOI = window.MOI || {};

MOI.SkillsSection = (function () {
  'use strict';

  /* ── DOM refs ── */
  var container      = null;
  var tabsContainer  = null;
  var gridContainer  = null;
  var activeCategory = 'all';
  var hasAnimated    = false;

  /* ── Init ── */

  function init() {
    container     = document.getElementById('skills');
    tabsContainer = document.querySelector('[data-skill-tabs]');
    gridContainer = document.querySelector('[data-skill-grid]');

    if (!container || !gridContainer) return;

    render();
    initScrollObserver();

    document.addEventListener('languageChanged', onLanguageChanged);
  }

  /* ── Render ── */

  function render() {
    renderTabs();
    renderSkills();

    if (typeof MOI.App !== 'undefined') MOI.App.refreshIcons();
  }

  function renderTabs() {
    if (!tabsContainer) return;

    var catLabels = MOI.LanguageManager.getText('skillCategories') || {};
    var categories = ['all', 'Frontend', 'Backend', 'Tools', 'Soft Skills'];

    var html = '';
    categories.forEach(function (cat) {
      var label = catLabels[cat] || cat;
      var activeClass = (cat === activeCategory) ? ' active' : '';
      html += '<button class="skill-tab' + activeClass + '" '
            + 'data-category="' + cat + '" type="button">'
            + escapeHtml(label)
            + '</button>';
    });

    tabsContainer.innerHTML = html;

    // Attach click handlers
    tabsContainer.addEventListener('click', function (e) {
      var tab = e.target.closest('.skill-tab');
      if (!tab) return;

      var category = tab.getAttribute('data-category');
      if (category === activeCategory) return;

      activeCategory = category;

      // Update active state on tabs
      tabsContainer.querySelectorAll('.skill-tab').forEach(function (t) {
        t.classList.toggle('active', t.getAttribute('data-category') === activeCategory);
      });

      filterSkills(category);
    });
  }

  function renderSkills() {
    if (!gridContainer) return;

    var skills = MOI.LanguageManager.getText('skills');
    if (!Array.isArray(skills)) return;

    var html = '';

    skills.forEach(function (skill, i) {
      // determine icon modifier class
      var iconMod = '';
      if (skill.category === 'Frontend') iconMod = 'skills__item-icon--frontend';
      else if (skill.category === 'Backend') iconMod = 'skills__item-icon--backend';
      else if (skill.category === 'Tools') iconMod = 'skills__item-icon--tools';
      else if (skill.category === 'Soft Skills') iconMod = 'skills__item-icon--soft';

      html += ''
        + '<div class="skills__item animate-on-scroll" '
        +   'data-category="' + escapeHtml(skill.category) + '" '
        +   'data-animate-delay="' + (i * 60) + '">'
        +   '<div class="skills__item-icon ' + iconMod + '">'
        +     '<i data-lucide="' + escapeHtml(skill.icon) + '"></i>'
        +   '</div>'
        +   '<div class="skills__item-info">'
        +     '<div class="progress-bar__header">'
        +       '<span class="skills__item-name">' + escapeHtml(skill.name) + '</span>'
        +       '<span class="skills__item-level" data-target="' + skill.level + '">0%</span>'
        +     '</div>'
        +     '<div class="progress-bar progress-bar--slim">'
        +       '<div class="progress-bar__track">'
        +         '<div class="progress-bar__fill" data-width="' + skill.level + '" style="width: 0%"></div>'
        +       '</div>'
        +     '</div>'
        +   '</div>'
        + '</div>';
    });

    gridContainer.innerHTML = html;

    // Apply current filter
    filterSkills(activeCategory);
  }

  /* ── Filter ── */

  function filterSkills(category) {
    if (!gridContainer) return;

    var items = gridContainer.querySelectorAll('.skills__item');

    if (typeof gsap !== 'undefined') {
      // GSAP stagger animation
      gsap.to(items, {
        opacity: 0,
        y: 10,
        duration: 0.2,
        stagger: 0.02,
        onComplete: function () {
          items.forEach(function (item) {
            var cat = item.getAttribute('data-category');
            item.style.display = (category === 'all' || cat === category) ? '' : 'none';
          });

          var visible = gridContainer.querySelectorAll('.skills__item[style=""], .skills__item:not([style])');
          // filter to only currently displayed ones
          var showing = [];
          items.forEach(function (item) {
            if (item.style.display !== 'none') showing.push(item);
          });

          gsap.to(showing, {
            opacity: 1,
            y: 0,
            duration: 0.35,
            stagger: 0.04,
            ease: 'power2.out'
          });

          // Re-animate progress bars for visible items
          if (hasAnimated) animateBars();
        }
      });
    } else {
      // No GSAP fallback
      items.forEach(function (item) {
        var cat = item.getAttribute('data-category');
        item.style.display = (category === 'all' || cat === category) ? '' : 'none';
      });
    }
  }

  /* ── Scroll-triggered bar animation ── */

  function initScrollObserver() {
    if (!container) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true;
          animateBars();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    observer.observe(container);
  }

  function animateBars() {
    if (!gridContainer) return;

    var bars     = gridContainer.querySelectorAll('.progress-bar__fill');
    var counters = gridContainer.querySelectorAll('.skills__item-level');

    bars.forEach(function (bar, i) {
      var target = parseInt(bar.getAttribute('data-width'), 10) || 0;

      // Only animate bars that are visible (not filtered out)
      var item = bar.closest('.skills__item');
      if (item && item.style.display === 'none') return;

      if (typeof gsap !== 'undefined') {
        gsap.to(bar, {
          width: target + '%',
          duration: 1.2,
          delay: i * 0.06,
          ease: 'power2.out'
        });
      } else {
        bar.style.transition = 'width 1.2s ease';
        bar.style.width = target + '%';
      }
    });

    // Counter animation
    counters.forEach(function (counter, i) {
      var target = parseInt(counter.getAttribute('data-target'), 10) || 0;

      // Only animate counters that are visible
      var item = counter.closest('.skills__item');
      if (item && item.style.display === 'none') return;

      animateCounter(counter, 0, target, 1200 + i * 50);
    });
  }

  function animateCounter(el, from, to, duration) {
    var start  = performance.now();
    var diff   = to - from;

    function step(now) {
      var elapsed  = now - start;
      var progress = Math.min(elapsed / duration, 1);
      // Ease out quad
      var eased = 1 - (1 - progress) * (1 - progress);
      var current = Math.round(from + diff * eased);
      el.textContent = current + '%';
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  /* ── Language change ── */

  function onLanguageChanged() {
    render();
    if (hasAnimated) {
      // Immediately animate bars after re-render
      setTimeout(animateBars, 50);
    }
  }

  /* ── Util ── */

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  /* ── Expose ── */
  return {
    init: init,
    render: render
  };

})();
