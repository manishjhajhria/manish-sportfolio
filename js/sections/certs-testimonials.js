/* ============================================================
   MOI IDENTITÉ — Certifications & Testimonials Renderer
   ============================================================
   Dynamically renders certification cards and testimonial
   carousel from PORTFOLIO_DATA. Re-renders on language change.
   ============================================================ */

var MOI = window.MOI || {};

MOI.CertsTestimonialsSection = (function () {
  'use strict';

  /* ── DOM refs ── */
  var certsGrid        = null;
  var testimonialsTrack = null;
  var testimonialsDots  = null;
  var prevBtn           = null;
  var nextBtn           = null;
  var currentSlide      = 0;
  var totalSlides       = 0;
  var autoPlayTimer     = null;

  /* ── Helpers ── */

  function escapeHtml(str) {
    if (!str) return '';
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  /* ── Init ── */

  function init() {
    certsGrid         = document.getElementById('certifications-grid');
    testimonialsTrack = document.getElementById('testimonials-track');
    testimonialsDots  = document.getElementById('testimonials-dots');
    prevBtn           = document.getElementById('testimonial-prev');
    nextBtn           = document.getElementById('testimonial-next');

    render();

    // Navigation
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);

    // Auto-play carousel
    startAutoPlay();

    document.addEventListener('languageChanged', function () {
      render();
    });
  }

  /* ── Render Certifications ── */

  function renderCertifications() {
    if (!certsGrid) return;

    var data = MOI.LanguageManager.getText('certifications');
    var uiText = MOI.LanguageManager.getText('ui') || {};
    if (!Array.isArray(data)) return;

    var html = '';

    data.forEach(function (cert, i) {
      html += '<div class="certifications__card animate-on-scroll stagger-' + (i + 1) + '">';
      html += '  <div class="certifications__ribbon"><i data-lucide="award"></i></div>';
      html += '  <div class="certifications__name">' + escapeHtml(cert.name) + '</div>';
      html += '  <div class="certifications__issuer">' + escapeHtml(cert.issuer) + '</div>';
      html += '  <div class="certifications__date">' + escapeHtml(cert.date) + '</div>';
      if (cert.credentialUrl && cert.credentialUrl !== '#') {
        html += '  <a href="' + escapeHtml(cert.credentialUrl) + '" class="certifications__link" target="_blank" rel="noopener">';
        html += '    <span>' + escapeHtml(uiText.viewCredential || 'View Credential') + '</span>';
        html += '    <i data-lucide="external-link"></i>';
        html += '  </a>';
      } else {
        html += '  <span class="certifications__link">';
        html += '    <span>' + escapeHtml(uiText.viewCredential || 'View Credential') + '</span>';
        html += '    <i data-lucide="external-link"></i>';
        html += '  </span>';
      }
      html += '</div>';
    });

    certsGrid.innerHTML = html;
  }

  /* ── Render Testimonials ── */

  function renderTestimonials() {
    if (!testimonialsTrack) return;

    var data = MOI.LanguageManager.getText('testimonials');
    if (!Array.isArray(data)) return;

    totalSlides = data.length;
    currentSlide = 0;

    var trackHtml = '';
    var dotsHtml = '';

    data.forEach(function (item, i) {
      trackHtml += '<div class="testimonials__slide">';
      trackHtml += '  <div class="testimonials__card">';
      trackHtml += '    <div class="testimonials__quote-icon"><i data-lucide="quote"></i></div>';
      trackHtml += '    <p class="testimonials__text">"' + escapeHtml(item.quote) + '"</p>';
      trackHtml += '    <div class="testimonials__author">';
      trackHtml += '      <div class="testimonials__author-name">' + escapeHtml(item.author) + '</div>';
      trackHtml += '      <div class="testimonials__author-role">' + escapeHtml(item.role) + ', ' + escapeHtml(item.company) + '</div>';
      trackHtml += '    </div>';
      trackHtml += '  </div>';
      trackHtml += '</div>';

      dotsHtml += '<button class="testimonials__dot' + (i === 0 ? ' active' : '') + '" data-slide="' + i + '" aria-label="Go to testimonial ' + (i + 1) + '"></button>';
    });

    testimonialsTrack.innerHTML = trackHtml;

    if (testimonialsDots) {
      testimonialsDots.innerHTML = dotsHtml;

      // Dot click handlers
      var dots = testimonialsDots.querySelectorAll('.testimonials__dot');
      dots.forEach(function (dot) {
        dot.addEventListener('click', function () {
          goToSlide(parseInt(dot.getAttribute('data-slide'), 10));
        });
      });
    }

    goToSlide(0);
  }

  /* ── Carousel Navigation ── */

  function goToSlide(index) {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;

    currentSlide = index;

    if (testimonialsTrack) {
      testimonialsTrack.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';
    }

    // Update dots
    if (testimonialsDots) {
      var dots = testimonialsDots.querySelectorAll('.testimonials__dot');
      dots.forEach(function (dot, i) {
        dot.classList.toggle('active', i === currentSlide);
      });
    }
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
    restartAutoPlay();
  }

  function prevSlide() {
    goToSlide(currentSlide - 1);
    restartAutoPlay();
  }

  function startAutoPlay() {
    if (autoPlayTimer) clearInterval(autoPlayTimer);
    autoPlayTimer = setInterval(function () {
      goToSlide(currentSlide + 1);
    }, 5000);
  }

  function restartAutoPlay() {
    if (autoPlayTimer) clearInterval(autoPlayTimer);
    startAutoPlay();
  }

  /* ── Combined Render ── */

  function render() {
    renderCertifications();
    renderTestimonials();

    if (typeof MOI.App !== 'undefined') MOI.App.refreshIcons();
  }

  /* ── Expose ── */
  return {
    init: init
  };

})();
