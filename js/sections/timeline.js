/* ============================================================
   MOI IDENTITÉ — Timeline Section  (Education & Experience)
   ============================================================
   Dynamically renders timeline items from PORTFOLIO_DATA,
   animates line-drawing and card reveals on scroll, and
   supports expand/collapse for details.
   ============================================================ */

var MOI = window.MOI || {};

MOI.TimelineSection = (function () {
  'use strict';

  /* ── DOM refs ── */
  var educationContainer  = null;
  var experienceContainer = null;

  /* ── Init ── */

  function init() {
    educationContainer  = document.querySelector('[data-timeline="education"]');
    experienceContainer = document.querySelector('[data-timeline="experience"]');

    render();
    initAnimations();

    // React to language changes
    document.addEventListener('languageChanged', onLanguageChanged);
  }

  /* ── Render ── */

  function render() {
    renderEducation();
    renderExperience();

    // Re-init Lucide icons after DOM update
    if (typeof MOI.App !== 'undefined') MOI.App.refreshIcons();
  }

  function renderEducation() {
    if (!educationContainer) return;

    var data = MOI.LanguageManager.getText('education');
    if (!Array.isArray(data)) return;

    var html = '<div class="timeline-line"></div>';

    data.forEach(function (item, i) {
      html += buildTimelineCard({
        title: item.degree,
        subtitle: item.institution,
        period: item.year,
        description: item.description,
        badge: item.gpa,
        index: i,
        icon: 'graduation-cap'
      });
    });

    educationContainer.innerHTML = html;
    attachExpandHandlers(educationContainer);
  }

  function renderExperience() {
    if (!experienceContainer) return;

    var data = MOI.LanguageManager.getText('experience');
    if (!Array.isArray(data)) return;

    var html = '<div class="timeline-line"></div>';

    data.forEach(function (item, i) {
      var detailsHtml = '';

      // Tech stack
      if (item.techStack && item.techStack.length) {
        detailsHtml += '<div class="timeline-tech">';
        item.techStack.forEach(function (tech) {
          detailsHtml += '<span class="tech-tag">' + escapeHtml(tech) + '</span>';
        });
        detailsHtml += '</div>';
      }

      // Achievements
      if (item.achievements && item.achievements.length) {
        detailsHtml += '<ul class="timeline-achievements">';
        item.achievements.forEach(function (a) {
          detailsHtml += '<li>' + escapeHtml(a) + '</li>';
        });
        detailsHtml += '</ul>';
      }

      html += buildTimelineCard({
        title: item.role,
        subtitle: item.company,
        period: item.period,
        description: item.description,
        details: detailsHtml,
        index: i,
        icon: 'briefcase'
      });
    });

    experienceContainer.innerHTML = html;
    attachExpandHandlers(experienceContainer);
  }

  /* ── Card builder ── */

  function buildTimelineCard(opts) {
    var uiData = MOI.LanguageManager.getText('ui') || {};
    var moreLabel = uiData.moreDetails || 'More Details';
    var lessLabel = uiData.lessDetails || 'Less Details';

    var hasDetails = (opts.details && opts.details.length > 0) || (opts.badge && opts.badge.length > 0);

    var card = ''
      + '<div class="timeline-item animate-on-scroll" data-animate-delay="' + (opts.index * 150) + '">'
      +   '<div class="timeline-marker">'
      +     '<i data-lucide="' + (opts.icon || 'circle') + '"></i>'
      +   '</div>'
      +   '<div class="timeline-card">'
      +     '<div class="timeline-card-header">'
      +       '<span class="timeline-period">' + escapeHtml(opts.period || '') + '</span>'
      +       (opts.badge ? '<span class="timeline-badge">' + escapeHtml(opts.badge) + '</span>' : '')
      +     '</div>'
      +     '<h3 class="timeline-title">' + escapeHtml(opts.title || '') + '</h3>'
      +     '<p class="timeline-subtitle">' + escapeHtml(opts.subtitle || '') + '</p>'
      +     '<p class="timeline-description">' + escapeHtml(opts.description || '') + '</p>';

    if (hasDetails) {
      card += '<div class="timeline-details collapsed">'
            +   (opts.details || '')
            + '</div>'
            + '<button class="timeline-expand-btn" type="button"'
            +   ' aria-expanded="false"'
            +   ' data-more="' + escapeHtml(moreLabel) + '"'
            +   ' data-less="' + escapeHtml(lessLabel) + '">'
            +   '<span>' + escapeHtml(moreLabel) + '</span>'
            +   ' <i data-lucide="chevron-down"></i>'
            + '</button>';
    }

    card +=   '</div>' // .timeline-card
          + '</div>';  // .timeline-item

    return card;
  }

  /* ── Expand / Collapse ── */

  function attachExpandHandlers(container) {
    if (!container) return;

    container.addEventListener('click', function (e) {
      var btn = e.target.closest('.timeline-expand-btn');
      if (!btn) return;

      var card    = btn.closest('.timeline-card');
      var details = card ? card.querySelector('.timeline-details') : null;
      if (!details) return;

      var isCollapsed = details.classList.contains('collapsed');
      var label       = btn.querySelector('span');
      var moreText    = btn.getAttribute('data-more');
      var lessText    = btn.getAttribute('data-less');

      if (isCollapsed) {
        details.classList.remove('collapsed');
        details.classList.add('expanded');
        btn.setAttribute('aria-expanded', 'true');
        if (label) label.textContent = lessText;

        // GSAP slide open
        if (typeof gsap !== 'undefined') {
          gsap.from(details, {
            height: 0,
            opacity: 0,
            duration: 0.4,
            ease: 'power2.out'
          });
        }
      } else {
        details.classList.remove('expanded');
        details.classList.add('collapsed');
        btn.setAttribute('aria-expanded', 'false');
        if (label) label.textContent = moreText;
      }
    });
  }

  /* ── Scroll animations ── */

  function initAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    // Animate the timeline line on scroll
    var lines = document.querySelectorAll('.timeline-line');
    lines.forEach(function (line) {
      gsap.from(line, {
        scaleY: 0,
        transformOrigin: 'top center',
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: line.parentElement,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1
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
