/* ================================================================
   RamanaAI.com — Shared JavaScript
   ================================================================ */

(function () {
  'use strict';

  /* ---- Mobile Nav Toggle ---- */
  function initNav() {
    const toggle = document.querySelector('.nav-toggle');
    const links  = document.querySelector('.nav-links');
    if (!toggle || !links) return;

    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!toggle.contains(e.target) && !links.contains(e.target)) {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on link click (mobile)
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => links.classList.remove('open'));
    });
  }

  /* ---- Active Nav Link ---- */
  function initActiveLink() {
    const page = location.pathname.split('/').pop() || 'index.htm';
    document.querySelectorAll('.nav-links a').forEach(a => {
      const href = a.getAttribute('href');
      if (href === page || (page === '' && href === 'index.htm')) {
        a.classList.add('active');
      }
    });
  }

  /* ---- Fade-in on Scroll ---- */
  function initFadeIn() {
    if (!window.IntersectionObserver) return;

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger siblings slightly
          const delay = (entry.target.dataset.delay || 0);
          setTimeout(() => entry.target.classList.add('visible'), +delay);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    // Auto-stagger children of fade-parent containers
    document.querySelectorAll('.fade-parent').forEach(parent => {
      parent.querySelectorAll(':scope > *').forEach((child, i) => {
        child.classList.add('fade-in');
        child.dataset.delay = i * 80;
      });
    });

    document.querySelectorAll('.fade-in').forEach(el => io.observe(el));
  }

  /* ---- Animated Counters ---- */
  function animateCounter(el) {
    const rawTarget = el.dataset.count;
    if (rawTarget === undefined) return;

    const isFloat   = rawTarget.includes('.');
    const target    = parseFloat(rawTarget);
    const suffix    = el.dataset.suffix || '';
    const duration  = 1800;
    const startTime = performance.now();

    function update(now) {
      const elapsed  = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3); // cubic ease-out
      const val      = isFloat
        ? (eased * target).toFixed(1)
        : Math.floor(eased * target);

      el.textContent = val + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  function initCounters() {
    if (!window.IntersectionObserver) return;

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });

    document.querySelectorAll('[data-count]').forEach(el => io.observe(el));
  }

  /* ---- Nav scroll shadow ---- */
  function initNavScroll() {
    const nav = document.querySelector('.nav');
    if (!nav) return;
    window.addEventListener('scroll', () => {
      nav.style.background = window.scrollY > 40
        ? 'rgba(11,18,32,0.97)'
        : 'rgba(11,18,32,0.85)';
    }, { passive: true });
  }

  /* ---- Init ---- */
  document.addEventListener('DOMContentLoaded', () => {
    initNav();
    initActiveLink();
    initFadeIn();
    initCounters();
    initNavScroll();
  });

})();
