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
    logoImage: 'image/logo_base.png',
    logoTitle: 'VR360 TOUR',
    logoSub: 'LUXURY RESIDENCE',
    eyebrowText: '• EXCLUSIVE VIRTUAL EXPERIENCE •',
    mainTitle: 'VR360 TOUR',
    subtitle: 'TRẢI NGHIỆM CÁC VERSION SA BÀN 360° CAO CẤP',
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

    // Build Languages HTML dynamically based on stored active language
    const activeLang = window.currentLang || localStorage.getItem('tav_language') || 'vi';
    const dict = (window.I18N_DICTIONARY && window.I18N_DICTIONARY[activeLang]) || {};
    const langBtnsHtml = config.languages.map(lang => 
      `<button type="button" class="landing-lang-btn ${lang.code === activeLang ? 'active' : ''}" data-lang="${lang.code}">${lang.label}</button>`
    ).join('');

    const welcomeText = dict.landing_welcome || 'CHÀO MỪNG BẠN ĐẾN VỚI TAV';
    const eyebrow = dict.landing_eyebrow || config.eyebrowText;
    const rawSubtitle = dict.landing_subtitle || config.subtitle || '';
    const subtitleText = rawSubtitle.replace(/(SA BÀN 360°|SA BÀN)/gi, '<span class="landing-nowrap">$1</span>');
    const ctaLabel = dict.landing_cta || config.ctaText;
    const hintText = dict.landing_hint || config.scrollHintText;

    overlay.innerHTML = `
      <!-- Full-screen Hero Background -->
      <div class="landing-hero-bg" style="background-image: url('${config.heroImage}');"></div>
      
      <!-- Subtle Dark Overlay Gradient -->
      <div class="landing-dark-overlay"></div>

      <!-- Top Bar: Welcome Banner & Logo & Language Selector -->
      <header class="landing-top-bar">
        <div class="landing-header-welcome-title">${welcomeText}</div>
        <div class="landing-top-bar-inner">
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
        </div>
      </header>

      <!-- Center Content Area -->
      <main class="landing-center-content">
        <div class="landing-eyebrow">${eyebrow}</div>

        <!-- Luxury Brand Box with Animated Orange-White Running Border & Split Center Logo -->
        <div class="landing-brand-card">
          <!-- Running Light Traces (Orange & White Border Animation) -->
          <div class="landing-running-border-box">
            <span class="landing-border-line b-top"></span>
            <span class="landing-border-line b-right"></span>
            <span class="landing-border-line b-bottom"></span>
            <span class="landing-border-line b-left"></span>
          </div>

          <!-- CENTER LOGO CONTAINER USING VIDEO LOGO TAV PANOTOUR -->
          <div class="landing-center-logo-wrap">
            <div class="landing-logo-glow-bg"></div>
            <div class="landing-logo-video-box">
              <video 
                class="landing-logo-video" 
                autoplay 
                loop 
                muted 
                playsinline 
                webkit-playsinline 
                preload="auto"
                aria-label="LOGO TAV PANOTOUR 3 Video Animation">
                <source src="video%20logo/LOGO%20TAV%20PANOTOUR%203/LOGO%20TAV%20PANOTOUR%203.webm" type="video/webm">
                <source src="video%20logo/LOGO%20TAV%20PANOTOUR%203/LOGO%20TAV%20PANOTOUR%203.mp4" type="video/mp4">
              </video>
            </div>
          </div>

          <h1 class="landing-title">${config.mainTitle}</h1>
          <p class="landing-subtitle">${subtitleText}</p>
        </div>
        
        <button type="button" id="landing-cta-btn" class="landing-cta-btn" aria-label="${ctaLabel}">
          <span>${ctaLabel}</span>
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
        <span class="landing-hint-text">${hintText}</span>
      </div>

      <!-- Bottom-Right Powered By TAV Copyright Watermark -->
      <div id="tav-copyright-watermark" class="tav-copyright-watermark tav-landing-watermark">
        <span class="tav-watermark-powered">Powered By</span>
        <div class="tav-watermark-logo-box">
          <img src="image/logo_base.png" alt="TAV Logo" class="tav-watermark-img" onerror="this.src='image/LOGO.png'" />
        </div>
        <div class="tav-watermark-info">
          <span class="tav-watermark-title">TAV</span>
          <span class="tav-watermark-subtitle">T Architect &amp; Visualization</span>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    // Attach Event Listeners
    attachLandingEvents(overlay);

    // Sync initial language text
    if (window.switchLanguage) {
      window.switchLanguage(activeLang);
    }
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

    // Robust Auto-play & Display Engine for Video Logo
    const logoVideo = overlay.querySelector('.landing-logo-video');
    if (logoVideo) {
      logoVideo.muted = true;
      logoVideo.defaultMuted = true;
      logoVideo.setAttribute('muted', '');
      logoVideo.setAttribute('playsinline', '');

      const attemptPlay = () => {
        const p = logoVideo.play();
        if (p && typeof p.then === 'function') {
          p.then(() => {
            logoVideo.style.opacity = '1';
            logoVideo.style.visibility = 'visible';
          }).catch(err => {
            console.warn('Logo video autoplay deferred, attaching touch/click listener:', err);
            const forcePlay = () => {
              logoVideo.play().then(() => {
                logoVideo.style.opacity = '1';
                logoVideo.style.visibility = 'visible';
              }).catch(() => {});
            };
            window.addEventListener('click', forcePlay, { once: true });
            window.addEventListener('touchstart', forcePlay, { once: true });
          });
        }
      };

      attemptPlay();
    }
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
