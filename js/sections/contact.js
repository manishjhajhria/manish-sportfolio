/* ============================================================
   MOI IDENTITÉ — Contact Section
   ============================================================
   Form validation, floating labels, submit-state animation,
   and success feedback. No backend — simulates submission.
   ============================================================ */

var MOI = window.MOI || {};

MOI.ContactSection = (function () {
  'use strict';

  /* ── DOM refs ── */
  var form         = null;
  var submitBtn    = null;
  var successMsg   = null;
  var fields       = {};

  /* ── Constants ── */
  var EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var MIN_MESSAGE_LENGTH = 10;

  /* ── Init ── */

  function init() {
    form       = document.getElementById('contact-form');
    successMsg = document.getElementById('contact-status');

    if (!form) return;

    submitBtn = document.getElementById('contact-submit');

    // Cache field references by name attribute
    fields = {
      name:    form.querySelector('[name="name"]'),
      email:   form.querySelector('[name="email"]'),
      subject: form.querySelector('[name="subject"]'),
      message: form.querySelector('[name="message"]')
    };

    initFloatingLabels();
    initValidation();
    form.addEventListener('submit', handleSubmit);

    document.addEventListener('languageChanged', onLanguageChanged);
  }

  /* ── Floating Labels ── */

  function initFloatingLabels() {
    var inputs = form.querySelectorAll('.contact__input, .contact__textarea');

    inputs.forEach(function (input) {
      // Set initial state
      toggleLabelState(input);

      input.addEventListener('focus', function () {
        var group = input.closest('.contact__input-group');
        if (group) group.classList.add('focused');
      });

      input.addEventListener('blur', function () {
        var group = input.closest('.contact__input-group');
        if (group) group.classList.remove('focused');
        toggleLabelState(input);
        validateField(input);
      });

      input.addEventListener('input', function () {
        toggleLabelState(input);
        // Clear error on typing
        if (input.value.trim().length > 0) {
          clearError(input);
        }
      });
    });
  }

  function toggleLabelState(input) {
    var group = input.closest('.contact__input-group');
    if (!group) return;

    if (input.value && input.value.trim().length > 0) {
      group.classList.add('has-value');
    } else {
      group.classList.remove('has-value');
    }
  }

  /* ── Validation ── */

  function initValidation() {
    // Real-time validation on blur is set up in initFloatingLabels
  }

  function validateField(input) {
    var fieldName = input.getAttribute('name');
    var value     = input.value.trim();
    var messages  = MOI.LanguageManager.getText('contact.validation') || {};

    clearError(input);

    // Required check
    if (!value) {
      showError(input, messages.required || 'This field is required');
      return false;
    }

    // Email format
    if (fieldName === 'email' && !EMAIL_REGEX.test(value)) {
      showError(input, messages.emailInvalid || 'Please enter a valid email address');
      return false;
    }

    // Message min length
    if (fieldName === 'message' && value.length < MIN_MESSAGE_LENGTH) {
      showError(input, messages.messageTooShort || 'Message must be at least 10 characters');
      return false;
    }

    return true;
  }

  function validateAll() {
    var allValid = true;
    var firstInvalid = null;

    Object.keys(fields).forEach(function (key) {
      var field = fields[key];
      if (!field) return;
      var valid = validateField(field);
      if (!valid && allValid) {
        allValid = false;
        firstInvalid = field;
      }
    });

    // Focus first invalid field
    if (firstInvalid) {
      firstInvalid.focus();
    }

    return allValid;
  }

  /* ── Error display ── */

  function showError(input, message) {
    var group = input.closest('.contact__input-group');
    if (!group) return;

    // Remove existing error
    clearError(input);

    group.classList.add('has-error');
    input.setAttribute('aria-invalid', 'true');

    var errorEl = document.createElement('span');
    errorEl.className = 'form-error';
    errorEl.setAttribute('role', 'alert');
    errorEl.textContent = message;

    group.appendChild(errorEl);

    // Subtle shake animation
    if (typeof gsap !== 'undefined') {
      gsap.fromTo(group,
        { x: -6 },
        { x: 0, duration: 0.4, ease: 'elastic.out(1, 0.3)' }
      );
    }
  }

  function clearError(input) {
    var group = input.closest('.contact__input-group');
    if (!group) return;

    group.classList.remove('has-error');
    input.removeAttribute('aria-invalid');

    var existing = group.querySelector('.form-error');
    if (existing) existing.remove();
  }

  /* ── Submit ── */

  function handleSubmit(e) {
    e.preventDefault();

    if (!validateAll()) return;

    // Set loading state
    setButtonState('sending');

    // Simulate network request (no real backend)
    setTimeout(function () {
      setButtonState('sent');
      showSuccessMessage();
      form.reset();

      // Reset floating labels
      Object.keys(fields).forEach(function (key) {
        if (fields[key]) toggleLabelState(fields[key]);
      });

      // Reset button after 3 seconds
      setTimeout(function () {
        setButtonState('default');
        hideSuccessMessage();
      }, 3000);
    }, 1500);
  }

  function setButtonState(state) {
    if (!submitBtn) return;

    var labels = MOI.LanguageManager.getText('contact.formLabels') || {};

    switch (state) {
      case 'sending':
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        submitBtn.innerHTML = '<span class="spinner"></span> ' + escapeHtml(labels.sending || 'Sending...');
        break;

      case 'sent':
        submitBtn.disabled = true;
        submitBtn.classList.remove('loading');
        submitBtn.classList.add('success');
        submitBtn.innerHTML = '<i data-lucide="check-circle"></i> ' + escapeHtml(labels.sent || 'Message Sent!');
        if (typeof MOI.App !== 'undefined') MOI.App.refreshIcons();
        break;

      default:
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading', 'success');
        submitBtn.innerHTML = '<i data-lucide="send"></i> ' + escapeHtml(labels.send || 'Send Message');
        if (typeof MOI.App !== 'undefined') MOI.App.refreshIcons();
    }
  }

  /* ── Success message ── */

  function showSuccessMessage() {
    if (!successMsg) return;

    successMsg.classList.add('visible');

    if (typeof gsap !== 'undefined') {
      gsap.fromTo(successMsg,
        { opacity: 0, y: 20, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: 'back.out(1.7)'
        }
      );

      // Checkmark draw animation (if SVG inside)
      var check = successMsg.querySelector('.checkmark-path');
      if (check) {
        var length = check.getTotalLength();
        gsap.fromTo(check,
          { strokeDasharray: length, strokeDashoffset: length },
          { strokeDashoffset: 0, duration: 0.8, delay: 0.3, ease: 'power2.out' }
        );
      }
    }
  }

  function hideSuccessMessage() {
    if (!successMsg) return;

    if (typeof gsap !== 'undefined') {
      gsap.to(successMsg, {
        opacity: 0,
        y: -10,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: function () {
          successMsg.classList.remove('visible');
        }
      });
    } else {
      successMsg.classList.remove('visible');
    }
  }

  /* ── Language change ── */

  function onLanguageChanged() {
    // Update submit button text
    setButtonState('default');

    // Update placeholders and labels via LanguageManager.updateDOM (data-lang-* attrs)
    // No full re-render needed — just the static labels update through data-lang-key
  }

  /* ── Util ── */

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  /* ── Expose ── */
  return {
    init: init
  };

})();
