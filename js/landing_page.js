/* ==========================================================================
   LUXURY MINIMALIST LANDING PAGE (HOME SCREEN) CONTROLLER
   ========================================================================== */

(function () {
  'use strict';

  // ═════════════════════════════════════════════════════════════════════════
  // SINGLE SOURCE OF TRUTH CONFIGURATION
  // ═════════════════════════════════════════════════════════════════════════
  window.LANDING_CONFIG = {
    heroImage: 'image/GALLERY 04.jpg',
    logoImage: 'image/logo.png',
    logoTitle: 'TAV VILLA',
    logoSub: 'LUXURY RESIDENCE',
    eyebrowText: '• EXCLUSIVE VIRTUAL EXPERIENCE •',
    mainTitle: 'TAV Villa',
    subtitle: 'Premium 360° Virtual Tour Experience',
    ctaText: 'THAM QUAN DỰ ÁN',
    scrollHintText: 'Khám phá trải nghiệm 360°',
    transitionDurationMs: 800,
    languages: [
      { code: 'vi', label: 'VIE', active: true },
      { code: 'en', label: 'ENG', active: false }
    ]
  };

  // State tracking
  let isTransitioning = false;

  // ═════════════════════════════════════════════════════════════════════════
  // ASSET PRELOADER
  // ═════════════════════════════════════════════════════════════════════════
  function preloadLandingAssets() {
    const config = window.LANDING_CONFIG;
    if (config.heroImage) {
      const img = new Image();
      img.src = config.heroImage;
    }
  }

  // ═════════════════════════════════════════════════════════════════════════
  // DOM BUILDER & RENDERER
  // ═════════════════════════════════════════════════════════════════════════
  function buildLandingPage() {
    if (document.getElementById('landing-page-overlay')) return;

    const config = window.LANDING_CONFIG;
    const overlay = document.createElement('div');
    overlay.id = 'landing-page-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-label', 'Landing Page');

    // Build Languages HTML
    const langBtnsHtml = config.languages.map(lang => 
      `<button type="button" class="landing-lang-btn ${lang.active ? 'active' : ''}" data-lang="${lang.code}">${lang.label}</button>`
    ).join('');

    overlay.innerHTML = `
      <!-- Full-screen Hero Background -->
      <div class="landing-hero-bg" style="background-image: url('${config.heroImage}');"></div>
      
      <!-- Subtle Dark Overlay Gradient -->
      <div class="landing-dark-overlay"></div>

      <!-- Top Bar: Logo & Language Selector -->
      <header class="landing-top-bar">
        <div class="landing-logo-badge">
          <img src="${config.logoImage}" alt="${config.logoTitle}" class="landing-logo-img" onerror="this.style.display='none'; document.getElementById('landing-logo-fallback').style.display='flex';">
          <div id="landing-logo-fallback" class="landing-logo-text" style="${config.logoImage ? 'display:flex;' : 'display:flex;'}">
            <span class="landing-logo-title">${config.logoTitle}</span>
            <span class="landing-logo-sub">${config.logoSub}</span>
          </div>
        </div>

        <nav class="landing-lang-toggle" aria-label="Language Selector">
          ${langBtnsHtml}
        </nav>
      </header>

      <!-- Center Content Area -->
      <main class="landing-center-content">
        <div class="landing-eyebrow">${config.eyebrowText}</div>
        <h1 class="landing-title">${config.mainTitle}</h1>
        <p class="landing-subtitle">${config.subtitle}</p>
        
        <button type="button" id="landing-cta-btn" class="landing-cta-btn" aria-label="${config.ctaText}">
          <span>${config.ctaText}</span>
          <svg class="landing-cta-icon" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </main>

      <!-- Bottom Hint / Scroll Indicator -->
      <div class="landing-bottom-bar" id="landing-bottom-trigger">
        <div class="landing-mouse-icon">
          <div class="landing-mouse-wheel"></div>
        </div>
        <span class="landing-hint-text">${config.scrollHintText}</span>
      </div>
    `;

    document.body.appendChild(overlay);

    // Attach Event Listeners
    attachLandingEvents(overlay);
  }

  // ═════════════════════════════════════════════════════════════════════════
  // EVENT LISTENERS & CINEMATIC TRANSITION
  // ═════════════════════════════════════════════════════════════════════════
  function attachLandingEvents(overlay) {
    const ctaBtn = overlay.querySelector('#landing-cta-btn');
    const bottomTrigger = overlay.querySelector('#landing-bottom-trigger');
    const langBtns = overlay.querySelectorAll('.landing-lang-btn');

    // Primary CTA click -> Dismiss Landing Page with Cinematic Transition
    if (ctaBtn) {
      ctaBtn.addEventListener('click', dismissLandingPage);
    }
    if (bottomTrigger) {
      bottomTrigger.addEventListener('click', dismissLandingPage);
    }

    // Keyboard ENTER or SPACE on button
    overlay.addEventListener('keydown', (e) => {
      if ((e.key === 'Enter' || e.key === ' ') && !isTransitioning) {
        dismissLandingPage();
      }
    });

    // Language Toggle Listener (Reuse existing language switcher if available)
    langBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        langBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const lang = btn.getAttribute('data-lang');
        if (window.switchLanguage) {
          window.switchLanguage(lang);
        }
      });
    });
  }

  // Dismiss Landing Page with 800ms Cinematic Fade Transition
  function dismissLandingPage() {
    if (isTransitioning) return;
    isTransitioning = true;

    const overlay = document.getElementById('landing-page-overlay');
    if (!overlay) return;

    const config = window.LANDING_CONFIG;
    const duration = config.transitionDurationMs || 800;

    // 1. Add fade-out transition class
    overlay.classList.add('landing-fade-out');

    // 2. Mark session state
    window.isLandingDismissed = true;

    // 3. Smoothly unveil Pano2VR 360 tour beneath & remove landing page after transition
    setTimeout(() => {
      overlay.style.display = 'none';
      overlay.style.pointerEvents = 'none';

      // Trigger size recalculation for Pano2VR player
      if (window.pano && typeof window.pano.setViewerSize === 'function') {
        const container = document.getElementById('container');
        if (container) {
          window.pano.setViewerSize(container.offsetWidth, container.offsetHeight);
        }
      }

      console.log('✨ Landing Page dismissed. 360° Virtual Tour active.');

      // Trigger Welcome Tutorial Modal over the loaded 360° tour
      if (typeof window.showWelcomeTutorial === 'function') {
        window.showWelcomeTutorial();
      }
    }, duration);
  }

  // ═════════════════════════════════════════════════════════════════════════
  // INITIALIZATION ON PAGE LOAD / REFRESH
  // ═════════════════════════════════════════════════════════════════════════
  preloadLandingAssets();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildLandingPage);
  } else {
    buildLandingPage();
  }

})();
