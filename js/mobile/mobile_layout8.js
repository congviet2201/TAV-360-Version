/* js/mobile/mobile_layout8.js — TAV Virtual Tour · Mobile Layout 8 (Desktop 7 Prism Mobile Reinterpretation) */
/* =========================================================================================
   Design DNA  : Derived strictly from Desktop Layout 7 "Prism" (Coral/Purple/Blue, Conic Border Spin, Dark Prism)
   Theme       : Coral Red / Vibrant Purple / Conic Prism Border Glow
   Module      : window.MobileLayout8 { init, destroy }
   Data source : window.TAV_CORE (shared_core.js) — no data duplication
   ========================================================================================= */

(function () {
  'use strict';

  // ── State ────────────────────────────────────────────────────────────
  let _initialized     = false;
  let _toastTimer       = null;
  let _activeCategory   = '';
  let _isCarouselOpen   = false;
  let _isMapOpen        = false;
  let _isToolsOpen      = false;
  let _isHotspotsVis    = true;
  let _compassRaf       = null;

  // ── SVG Icon Library (Desktop 7 Prism Style) ─────────────────────────
  const I = {
    compass:  `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,107,107,0.4)" stroke-width="4"/><polygon points="50,15 62,50 50,62 38,50" fill="#FF6B6B"/><polygon points="50,85 62,50 50,62 38,50" fill="#7C3AED"/><circle fill="rgba(255,107,107,0.4)" cx="50" cy="50" r="6"/></svg>`,
    scenes:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/></svg>`,
    map:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></svg>`,
    eye:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
    gallery:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>`,
    tools:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>`,
    music:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`,
    fullscr:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3"/></svg>`,
    info:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
    region:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
    close:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
    fb:       `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 8H7v3h2v9h4v-9h3.6l.4-3H13V6c0-.5.5-1 1-1h3V2h-3a5 5 0 00-5 5v1z"/></svg>`,
    ig:       `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`,
    zalo:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>`,
  };

  // ── DOM Builder (Derived directly from Desktop Layout 7 Prism) ──────
  function buildDOM() {
    const { config } = window.TAV_CORE;
    const cats       = window.TAV_CORE.getCategories();
    const isMuted    = window.TAV_CORE.isMusicMuted;

    _activeCategory = cats[0] || '';

    const catPills = cats.map((c, i) => `
      <button class="prism-m8-cat-pill${i === 0 ? ' active' : ''}" data-cat="${c}">
        <span>${c}</span>
      </button>
    `).join('');

    return `
      <!-- Top Ribbon Header (Logo Brand Pill & Compass Widget) -->
      <div class="prism-m8-top-ribbon">
        <div class="prism-m8-brand-pill" id="pm8-brand-btn">
          <div class="prism-m8-brand-dot"></div>
          <div class="prism-m8-brand-text-block">
            <div class="prism-m8-brand-title">${config.projectTitle.top}</div>
            <div class="prism-m8-brand-sub">${config.projectTitle.sub}</div>
          </div>
        </div>

        <div class="prism-m8-compass-badge" id="pm8-compass-btn" title="Đặt lại hướng nhìn">
          <div class="prism-m8-compass-svg" id="pm8-compass-dial">${I.compass}</div>
        </div>
      </div>

      <!-- Floating Prism Bottom Dock -->
      <nav class="prism-m8-dock" id="pm8-dock">
        <button class="prism-m8-dock-item" id="pm8-dock-scenes" aria-label="Cảnh">
          <div class="prism-m8-dock-icon-wrapper">${I.scenes}</div>
          <span>Cảnh</span>
        </button>
        <button class="prism-m8-dock-item${_isMapOpen ? ' active' : ''}" id="pm8-dock-map" aria-label="Bản Đồ">
          <div class="prism-m8-dock-icon-wrapper">${I.map}</div>
          <span>Bản Đồ</span>
        </button>
        <button class="prism-m8-dock-item ribbon-center${_isHotspotsVis ? ' active' : ''}" id="pm8-dock-hotspot" aria-label="Hotspot">
          <div class="prism-m8-dock-icon-wrapper">${I.eye}</div>
          <span>Hotspot</span>
        </button>
        <button class="prism-m8-dock-item" id="pm8-dock-gallery" aria-label="Thư Viện">
          <div class="prism-m8-dock-icon-wrapper">${I.gallery}</div>
          <span>Thư Viện</span>
        </button>
        <button class="prism-m8-dock-item" id="pm8-dock-tools" aria-label="Công Cụ">
          <div class="prism-m8-dock-icon-wrapper">${I.tools}</div>
          <span>Công Cụ</span>
        </button>
      </nav>

      <!-- Prism Carousel Scene Drawer Sheet -->
      <div class="prism-m8-carousel-sheet" id="pm8-carousel-sheet">
        <div class="prism-m8-cat-row" id="pm8-cat-row">
          ${catPills}
        </div>
        <div class="prism-m8-scene-track" id="pm8-scene-track"></div>
      </div>

      <!-- Mini Map Card -->
      <div class="prism-m8-map-card" id="pm8-map-card">
        <div class="prism-m8-map-header">
          <span class="prism-m8-map-title">Bản Đồ Virtual Tour</span>
          <button class="prism-m8-map-close" id="pm8-map-close">${I.close}</button>
        </div>
        <div class="prism-m8-map-viewport" id="pm8-map-viewport">
          <img src="image/Map_optimized.jpg" id="pm8-map-img" alt="Map" class="prism-m8-map-img">
          <div id="pm8-map-radar" style="position: absolute; top: 50%; left: 50%; width: 0; height: 0; z-index: 10;">
            <div id="pm8-map-cone" style="position: absolute; width: 0; height: 0; border-left: 18px solid transparent; border-right: 18px solid transparent; border-top: 36px solid rgba(255,107,107,0.5); transform-origin: bottom center; transform: translate(-50%, -100%);"></div>
            <div style="position: absolute; width: 10px; height: 10px; background: #FF6B6B; border-radius: 50%; transform: translate(-50%, -50%); box-shadow: 0 0 10px #FF6B6B;"></div>
          </div>
        </div>
        <div class="prism-m8-map-zoom">
          <button class="prism-m8-map-zoom-btn" id="pm8-zoom-in">+</button>
          <button class="prism-m8-map-zoom-btn" id="pm8-zoom-out">−</button>
        </div>
      </div>

      <!-- Prism Action Sheet Drawer -->
      <div class="prism-m8-tools-sheet" id="pm8-tools-sheet">
        <div class="prism-m8-tools-grid">
          <button class="prism-m8-action-tile" data-action="fullscreen">
            ${I.fullscr}<span>Toàn Màn Hình</span>
          </button>
          <button class="prism-m8-action-tile" data-action="info">
            ${I.info}<span>Thông Tin</span>
          </button>
          <button class="prism-m8-action-tile" data-action="region">
            ${I.region}<span>Liên Kết Vùng</span>
          </button>
          <button class="prism-m8-action-tile${!isMuted ? ' active' : ''}" data-action="audio">
            ${I.music}<span>Âm Nhạc</span>
          </button>
        </div>
        <div class="prism-m8-divider"></div>
        <div class="prism-m8-socials">
          <a href="${config.social.facebook}" target="_blank" class="prism-m8-social-btn" title="Facebook">${I.fb}</a>
          <a href="${config.social.instagram}" target="_blank" class="prism-m8-social-btn" title="Instagram">${I.ig}</a>
          <a href="${config.social.zalo}" target="_blank" class="prism-m8-social-btn" title="Zalo">${I.zalo}</a>
        </div>
        <div class="prism-m8-switch-row">
          <button class="prism-m8-sw-pill" data-layout-switch="1">L1</button>
          <button class="prism-m8-sw-pill" data-layout-switch="2">L2</button>
          <button class="prism-m8-sw-pill" data-layout-switch="3">L3</button>
          <button class="prism-m8-sw-pill" data-layout-switch="4">L4</button>
          <button class="prism-m8-sw-pill" data-layout-switch="5">L5</button>
          <button class="prism-m8-sw-pill" data-layout-switch="6">L6</button>
          <button class="prism-m8-sw-pill" data-layout-switch="7">L7</button>
          <button class="prism-m8-sw-pill active" data-layout-switch="8">L8</button>
          <button class="prism-m8-sw-pill" data-layout-switch="9">L9</button>
          <button class="prism-m8-sw-pill" data-layout-switch="10">L10</button>
        </div>
      </div>

      <!-- Backdrop Overlay -->
      <div class="prism-m8-backdrop" id="pm8-backdrop"></div>

      <!-- Toast Notification -->
      <div class="prism-m8-toast" id="pm8-toast"></div>
    `;
  }

  // ── Helper: Ripple Animation ─────────────────────────────────────────
  function triggerRipple(el, e) {
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'prism-m8-ripple';
    const diameter = Math.max(rect.width, rect.height);
    const radius = diameter / 2;
    const x = e ? (e.clientX - rect.left - radius) : (rect.width / 2 - radius);
    const y = e ? (e.clientY - rect.top - radius) : (rect.height / 2 - radius);
    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    el.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  }

  // ── Toast Notification ───────────────────────────────────────────────
  function showToast(msg) {
    const toast = document.getElementById('pm8-toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    if (_toastTimer) clearTimeout(_toastTimer);
    _toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
  }

  // ── Swiping Scene Track Builder ──────────────────────────────────────
  function buildSceneTrack(catName) {
    const track = document.getElementById('pm8-scene-track');
    if (!track) return;
    const scenes = window.TAV_CORE.getScenesByCategory(catName);
    const currentAction = window.TAV_CORE.currentScene ? window.TAV_CORE.currentScene.action : '';

    track.innerHTML = scenes.map(s => `
      <div class="prism-m8-scene-card${s.action === currentAction ? ' active' : ''}" data-action="${s.action}">
        <img src="${s.thumb}" alt="${s.title}" loading="lazy" onerror="this.src='preview.jpg'">
        <div class="prism-m8-scene-title">${s.title}</div>
      </div>
    `).join('');
  }

  // ── Sheet & Panel Control ───────────────────────────────────────────
  function closeAllPanels() {
    _isCarouselOpen = false;
    _isMapOpen      = false;
    _isToolsOpen    = false;

    document.getElementById('pm8-carousel-sheet')?.classList.remove('open');
    document.getElementById('pm8-map-card')?.classList.remove('open');
    document.getElementById('pm8-tools-sheet')?.classList.remove('open');
    document.getElementById('pm8-backdrop')?.classList.remove('open');

    document.querySelectorAll('#pm8-dock .prism-m8-dock-item').forEach(b => {
      if (b.id !== 'pm8-dock-hotspot') {
        b.classList.remove('active');
      }
    });
  }

  function toggleCarousel(catName) {
    if (_isCarouselOpen && (!catName || _activeCategory === catName)) {
      closeAllPanels();
      return;
    }

    closeAllPanels();
    if (catName) _activeCategory = catName;
    _isCarouselOpen = true;

    buildSceneTrack(_activeCategory);

    document.querySelectorAll('.prism-m8-cat-pill').forEach(b => {
      b.classList.toggle('active', b.dataset.cat === _activeCategory);
    });

    document.getElementById('pm8-carousel-sheet')?.classList.add('open');
    document.getElementById('pm8-dock-scenes')?.classList.add('active');
    document.getElementById('pm8-backdrop')?.classList.add('open');
  }

  function toggleMinimap(forceState) {
    const nextState = forceState !== undefined ? forceState : !_isMapOpen;
    closeAllPanels();
    _isMapOpen = nextState;

    const card = document.getElementById('pm8-map-card');
    const tabMap = document.getElementById('pm8-dock-map');
    if (card) card.classList.toggle('open', _isMapOpen);
    if (tabMap) tabMap.classList.toggle('active', _isMapOpen);
    if (_isMapOpen) showToast("Bản Đồ Virtual Tour");
  }

  function toggleToolsSheet() {
    if (_isToolsOpen) {
      closeAllPanels();
      return;
    }

    closeAllPanels();
    _isToolsOpen = true;

    document.getElementById('pm8-tools-sheet')?.classList.add('open');
    document.getElementById('pm8-dock-tools')?.classList.add('active');
    document.getElementById('pm8-backdrop')?.classList.add('open');
  }

  // ── Sync Active State ────────────────────────────────────────────────
  function syncActiveScene(action) {
    if (!action) return;
    document.querySelectorAll('.prism-m8-scene-card').forEach(card => {
      card.classList.toggle('active', card.dataset.action === action);
    });
  }

  function syncAudioBtn() {
    const btn = document.querySelector('.prism-m8-action-tile[data-action="audio"]');
    if (!btn) return;
    const isMuted = window.TAV_CORE.isMusicMuted;
    btn.classList.toggle('active', !isMuted);
  }

  // ── Compass Synchronizer ─────────────────────────────────────────────
  function startCompassSync() {
    const update = () => {
      const dial = document.getElementById('pm8-compass-dial');
      if (dial) {
        const angle = window.TAV_CORE.getCompassAngle();
        dial.style.transform = `rotate(${angle}deg)`;
      }

      const cone = document.getElementById('pm8-map-cone');
      if (cone) {
        const angle = window.TAV_CORE.getCompassAngle();
        cone.style.transform = `rotate(${angle}deg)`;
      }

      _compassRaf = requestAnimationFrame(update);
    };
    update();
  }

  function stopCompassSync() {
    if (_compassRaf) cancelAnimationFrame(_compassRaf);
  }

  // ── Setup Event Listeners ────────────────────────────────────────────
  function setupEventListeners() {
    const overlay = document.getElementById('ml8-overlay');
    if (!overlay) return;

    // ── Brand Pill → Home Scene
    const brandBtn = document.getElementById('pm8-brand-btn');
    if (brandBtn) {
      brandBtn.addEventListener('click', e => {
        triggerRipple(brandBtn, e);
        window.TAV_CORE.navigateTo('node1');
        showToast("Về Cảnh Đầu");
      });
    }

    // ── Compass Badge → Reset View
    const compassBtn = document.getElementById('pm8-compass-btn');
    if (compassBtn) {
      compassBtn.addEventListener('click', e => {
        triggerRipple(compassBtn, e);
        window.TAV_CORE.resetView();
        showToast("Đặt lại hướng nhìn");
      });
    }

    // ── Dock Action Items
    document.getElementById('pm8-dock-scenes')?.addEventListener('click', e => {
      triggerRipple(e.currentTarget, e);
      toggleCarousel();
    });

    document.getElementById('pm8-dock-map')?.addEventListener('click', e => {
      triggerRipple(e.currentTarget, e);
      toggleMinimap();
    });

    document.getElementById('pm8-dock-hotspot')?.addEventListener('click', e => {
      triggerRipple(e.currentTarget, e);
      _isHotspotsVis = !_isHotspotsVis;
      const pano = window.TAV_CORE ? window.TAV_CORE.getPano() : window.pano;
      document.body.classList.toggle('hide-hotspots', !_isHotspotsVis);
      if (pano && typeof pano.setPointHotspotsVisible === 'function') {
        pano.setPointHotspotsVisible(_isHotspotsVis);
      }
      document.querySelectorAll(".hologram-marker-container, .hs-container").forEach(hs => {
        hs.style.visibility = _isHotspotsVis ? "visible" : "hidden";
        hs.style.opacity = _isHotspotsVis ? "" : "0";
      });
      document.getElementById('pm8-dock-hotspot')?.classList.toggle('active', _isHotspotsVis);
      showToast(_isHotspotsVis ? "Hotspot: Bật" : "Hotspot: Tắt");
    });

    document.getElementById('pm8-dock-gallery')?.addEventListener('click', e => {
      triggerRipple(e.currentTarget, e);
      closeAllPanels();
      if (typeof window.openGlobalPanoramaGallery === 'function') {
        window.openGlobalPanoramaGallery();
      } else {
        const galleryModal = document.getElementById('image-gallery-modal');
        if (galleryModal) galleryModal.classList.add('active');
      }
    });

    document.getElementById('pm8-dock-tools')?.addEventListener('click', e => {
      triggerRipple(e.currentTarget, e);
      toggleToolsSheet();
    });

    // ── Category Pills in Carousel Sheet
    const catRow = document.getElementById('pm8-cat-row');
    if (catRow) {
      catRow.addEventListener('click', e => {
        const pill = e.target.closest('.prism-m8-cat-pill');
        if (!pill || !pill.dataset.cat) return;
        triggerRipple(pill, e);
        _activeCategory = pill.dataset.cat;
        document.querySelectorAll('.prism-m8-cat-pill').forEach(b => b.classList.remove('active'));
        pill.classList.add('active');
        buildSceneTrack(_activeCategory);
      });
    }

    // ── Scene Cards in Carousel Sheet Track
    const sceneTrack = document.getElementById('pm8-scene-track');
    if (sceneTrack) {
      sceneTrack.addEventListener('click', e => {
        const card = e.target.closest('.prism-m8-scene-card');
        if (!card || !card.dataset.action) return;
        triggerRipple(card, e);
        window.TAV_CORE.navigateTo(card.dataset.action);
        const scene = window.TAV_CORE.scenes.find(s => s.action === card.dataset.action);
        if (scene) showToast(scene.title);
        setTimeout(() => closeAllPanels(), 200);
      });
    }

    // ── Close Buttons & Backdrop
    document.getElementById('pm8-backdrop')?.addEventListener('click', () => closeAllPanels());
    document.getElementById('pm8-map-close')?.addEventListener('click', () => toggleMinimap(false));

    // ── Mini-Map Engine Integration
    const mapViewport = document.getElementById('pm8-map-viewport');
    if (mapViewport && window.MobileMinimapEngine) {
      const mapCtrl = window.MobileMinimapEngine.setupMap(mapViewport);
      document.getElementById('pm8-zoom-in')?.addEventListener('click', (e) => { e.stopPropagation(); mapCtrl?.zoomIn(); });
      document.getElementById('pm8-zoom-out')?.addEventListener('click', (e) => { e.stopPropagation(); mapCtrl?.zoomOut(); });
    }

    // ── Action Tiles in Tools Sheet
    const toolsSheet = document.getElementById('pm8-tools-sheet');
    if (toolsSheet) {
      toolsSheet.addEventListener('click', e => {
        const tile = e.target.closest('.prism-m8-action-tile');
        if (!tile) return;
        triggerRipple(tile, e);
        const action = tile.dataset.action;

        if (action === 'fullscreen') {
          if (window.TAV_CORE) window.TAV_CORE.navigateTo('fullscreen');

        } else if (action === 'info') {
          closeAllPanels();
          showToast('TAV VILLA — Virtual Tour Prism');
          const infoModal = document.getElementById('infoModal') || document.getElementById('info-modal') || document.querySelector('.info-modal') || document.querySelector('.modern-modal');
          if (infoModal) {
            infoModal.classList.add('active');
            infoModal.style.display = 'flex';
            infoModal.style.zIndex = '10000';
          }

        } else if (action === 'region') {
          closeAllPanels();
          const regionPage = document.getElementById('region-page');
          if (regionPage) {
            document.body.classList.add('region-mode-active');
            document.querySelector('.region-hamburger')?.classList.remove('open');
            document.getElementById('region-menu-collapsible')?.classList.remove('open');
          }

        } else if (action === 'audio') {
          window.TAV_CORE.toggleMusic();
          syncAudioBtn();
          showToast(window.TAV_CORE.isMusicMuted ? "Âm nhạc: Tắt" : "Âm nhạc: Bật");
        }

        if (action !== 'audio') setTimeout(() => closeAllPanels(), 200);
      });
    }

    // ── Layout Switcher Pills
    overlay.addEventListener('click', e => {
      const pill = e.target.closest('[data-layout-switch]');
      if (!pill) return;
      triggerRipple(pill, e);
      const targetLayout = pill.dataset.layoutSwitch;
      if (targetLayout && typeof window.switchMobileLayout === 'function') {
        closeAllPanels();
        window.switchMobileLayout(targetLayout);
      }
    });

    // ── Subscribe to Core Events
    window.TAV_CORE.on('scenechange', scene => {
      if (scene) syncActiveScene(scene.action);
    });

    window.TAV_CORE.on('musicchange', isMuted => {
      syncAudioBtn();
    });
  }

  // ── Module API ───────────────────────────────────────────────────────
  window.MobileLayout8 = {
    init: function () {
      if (_initialized) return;
      if (!window.TAV_CORE) {
        console.error('[MobileLayout8] TAV_CORE is not available!');
        return;
      }

      // Hide desktop & other mobile overlays
      const desktopHideStyle = document.createElement('style');
      desktopHideStyle.id = 'ml8-desktop-hide';
      desktopHideStyle.textContent = `
        html body #modern-ui-container, html body #modern-ui-overlay,
        html body .prism-nav-container, html body .prism-dock, html body .prism-header-pill,
        html body .prism-bottom-dock, html body .modern-header-pill, html body #modern-dock-container,
        html body .prism-dock-container, html body .prism-nav-wrapper, html body .prism-tool-container,
        html body .prism-dock-item, html body .prism-nav-item, html body #sidebar-container, html body #horizontal-nav-bar,
        html body #command-bottom-ribbon, html body .modern-ui-sidebar, html body .v-rail-container, html body .bottom-nav-container,
        html body .aurora-nav-container, html body .aurora-tool-panel, html body .pc-container,
        html body #mobile-ui-overlay, html body #ml2-overlay, html body #ml3-overlay, html body #ml4-overlay, html body #ml5-overlay, html body #ml6-overlay, html body #ml7-overlay,
        html body #compass-widget, html body .compass-widget, html body #mob-compass, html body #ml2-compass, html body #ml3-compass, html body #ml4-compass, html body #ml5-compass, html body #ml6-compass, html body #am7-compass-btn,
        html body #minimap-widget, html body .minimap-widget, html body .floorplan-container, html body #floorplan, html body .floorplan-widget {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          pointer-events: none !important;
        }
      `;
      document.head.appendChild(desktopHideStyle);

      // Create overlay element
      const overlay = document.createElement('div');
      overlay.id = 'ml8-overlay';
      overlay.innerHTML = buildDOM();
      document.body.appendChild(overlay);

      setupEventListeners();
      startCompassSync();

      // Initial active scene sync
      if (window.TAV_CORE.currentScene) {
        syncActiveScene(window.TAV_CORE.currentScene.action);
      }

      _initialized = true;
      console.log('[MobileLayout8] Initialized — Desktop 7 Prism Mobile Reinterpretation');
    },

    destroy: function () {
      stopCompassSync();
      if (_toastTimer) clearTimeout(_toastTimer);
      document.querySelectorAll('#ml8-overlay').forEach(el => el.remove());
      document.querySelectorAll('#ml8-desktop-hide').forEach(el => el.remove());
      _initialized = false;
      console.log('[MobileLayout8] Destroyed');
    }
  };

})();
