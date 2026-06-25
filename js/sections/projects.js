/* ============================================================
   MOI IDENTITÉ — Projects Section
   ============================================================
   Dynamic project grid with category filtering, staggered
   GSAP animations, and interactive 3D card-tilt on hover.
   ============================================================ */

var MOI = window.MOI || {};

MOI.ProjectsSection = (function () {
  'use strict';

  /* ── DOM refs ── */
  var container       = null;
  var filterContainer = null;
  var gridContainer   = null;
  var activeFilter    = 'all';

  /* ── Init ── */

  function init() {
    container       = document.getElementById('projects');
    filterContainer = document.querySelector('[data-project-filters]');
    gridContainer   = document.querySelector('[data-project-grid]');

    if (!container || !gridContainer) return;

    render();

    document.addEventListener('languageChanged', onLanguageChanged);
  }

  /* ── Render ── */

  function render() {
    renderFilters();
    renderProjects();

    if (typeof MOI.App !== 'undefined') MOI.App.refreshIcons();
  }

  function renderFilters() {
    if (!filterContainer) return;

    var projects   = MOI.LanguageManager.getText('projects') || [];
    var filterLabels = MOI.LanguageManager.getText('projectFilters') || {};

    // Gather unique categories from data
    var categoriesSet = {};
    projects.forEach(function (p) {
      if (p.category) categoriesSet[p.category] = true;
    });
    var categories = ['all'].concat(Object.keys(categoriesSet));

    var html = '';
    categories.forEach(function (cat) {
      var label = filterLabels[cat] || cat;
      var activeClass = (cat === activeFilter) ? ' active' : '';
      html += '<button class="filter-btn' + activeClass + '" '
            + 'data-filter="' + escapeHtml(cat) + '" type="button">'
            + escapeHtml(label)
            + '</button>';
    });

    filterContainer.innerHTML = html;

    // Delegate click
    filterContainer.addEventListener('click', function (e) {
      var btn = e.target.closest('.filter-btn');
      if (!btn) return;

      var filter = btn.getAttribute('data-filter');
      if (filter === activeFilter) return;

      activeFilter = filter;

      filterContainer.querySelectorAll('.filter-btn').forEach(function (b) {
        b.classList.toggle('active', b.getAttribute('data-filter') === activeFilter);
      });

      filterProjects(filter);
    });
  }

  function renderProjects() {
    if (!gridContainer) return;

    var projects = MOI.LanguageManager.getText('projects');
    var uiData   = MOI.LanguageManager.getText('ui') || {};
    if (!Array.isArray(projects)) return;

    var html = '';

    projects.forEach(function (project, i) {
      // Create tags for tech stack
      var techHtml = '';
      if (project.techStack && project.techStack.length) {
        project.techStack.forEach(function (tech) {
          techHtml += '<span class="tag">' + escapeHtml(tech) + '</span>';
        });
      }

      // We'll use a placeholder image based on the category or a generic unsplash image
      var imgUrl = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop';
      if (project.category === 'Mobile') imgUrl = 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop';
      else if (project.category === 'Creative') imgUrl = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=400&fit=crop';
      else if (project.category === 'E-commerce') imgUrl = 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop';

      html += ''
        + '<div class="projects__card animate-on-scroll" '
        +   'data-category="' + escapeHtml(project.category) + '" '
        +   'data-animate-delay="' + (i * 100) + '">'
        +   '<div class="projects__card-image">'
        +     '<img src="' + imgUrl + '" alt="' + escapeHtml(project.title) + '" loading="lazy">'
        +     '<div class="projects__card-overlay">'
        +       '<a href="' + escapeHtml(project.liveUrl) + '" class="projects__card-overlay-link" aria-label="' + escapeHtml(uiData.viewProject || 'View Project') + '" target="_blank" rel="noopener">'
        +         '<i data-lucide="external-link"></i>'
        +         '<span>' + escapeHtml(uiData.liveDemo || 'Live Demo') + '</span>'
        +       '</a>'
        +       '<a href="' + escapeHtml(project.githubUrl) + '" class="projects__card-overlay-link" aria-label="' + escapeHtml(uiData.viewCode || 'Source Code') + '" target="_blank" rel="noopener">'
        +         '<i data-lucide="github"></i>'
        +         '<span>' + escapeHtml(uiData.sourceCode || 'Source Code') + '</span>'
        +       '</a>'
        +     '</div>'
        +   '</div>'
        +   '<div class="projects__card-body">'
        +     '<div class="projects__card-category">' + escapeHtml(project.category) + (project.featured ? ' &bull; ★ ' + escapeHtml(uiData.featured || 'Featured') : '') + '</div>'
        +     '<h3 class="projects__card-title">' + escapeHtml(project.title) + '</h3>'
        +     '<p class="projects__card-description">' + escapeHtml(project.description) + '</p>'
        +     '<div class="projects__card-tags">' + techHtml + '</div>'
        +   '</div>'
        + '</div>';
    });

    gridContainer.innerHTML = html;

    // Apply current filter
    filterProjects(activeFilter);

    // Attach tilt effect if needed
    initCardTilt();
  }

  /* ── Filter ── */

  function filterProjects(category) {
    if (!gridContainer) return;

    var cards = gridContainer.querySelectorAll('.projects__card');

    if (typeof gsap !== 'undefined') {
      gsap.to(cards, {
        opacity: 0,
        scale: 0.95,
        duration: 0.25,
        stagger: 0.03,
        onComplete: function () {
          cards.forEach(function (card) {
            var cat = card.getAttribute('data-category');
            card.style.display = (category === 'all' || cat === category) ? '' : 'none';
          });

          var visible = [];
          cards.forEach(function (card) {
            if (card.style.display !== 'none') visible.push(card);
          });

          gsap.fromTo(visible,
            { opacity: 0, scale: 0.95, y: 20 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.4,
              stagger: 0.06,
              ease: 'power2.out'
            }
          );
        }
      });
    } else {
      cards.forEach(function (card) {
        var cat = card.getAttribute('data-category');
        card.style.display = (category === 'all' || cat === category) ? '' : 'none';
      });
    }
  }

  /* ── Card Tilt Effect ── */

  function initCardTilt() {
    if (!gridContainer) return;

    gridContainer.addEventListener('mousemove', function (e) {
      var card = e.target.closest('.project-card');
      if (!card) return;

      var rect = card.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      var centerX = rect.width / 2;
      var centerY = rect.height / 2;

      // Max rotation in degrees
      var maxTilt = 8;
      var rotateY = ((x - centerX) / centerX) * maxTilt;
      var rotateX = ((centerY - y) / centerY) * maxTilt;

      var inner = card.querySelector('.project-card-inner');
      if (inner) {
        inner.style.transform =
          'perspective(600px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
      }
    });

    gridContainer.addEventListener('mouseleave', function (e) {
      var card = e.target.closest('.project-card');
      if (!card) return;

      var inner = card.querySelector('.project-card-inner');
      if (!inner) return;

      if (typeof gsap !== 'undefined') {
        gsap.to(inner, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.5,
          ease: 'power2.out',
          clearProps: 'transform'
        });
      } else {
        inner.style.transform = '';
      }
    }, true);

    // Also reset on individual card mouseleave
    var cards = gridContainer.querySelectorAll('.project-card');
    cards.forEach(function (card) {
      card.addEventListener('mouseleave', function () {
        var inner = card.querySelector('.project-card-inner');
        if (!inner) return;
        if (typeof gsap !== 'undefined') {
          gsap.to(inner, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.5,
            ease: 'power2.out',
            clearProps: 'transform'
          });
        } else {
          inner.style.transform = '';
        }
      });
    });
  }

  /* ── Language change ── */

  function onLanguageChanged() {
    render();
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
