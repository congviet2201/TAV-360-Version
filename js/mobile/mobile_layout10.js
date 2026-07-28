/* js/mobile/mobile_layout10.js — TAV Virtual Tour · Mobile Layout 10 (Desktop 9 Horizon Mobile Reinterpretation) */
/* =========================================================================================
   Design DNA  : Derived strictly from Desktop Layout 9 "Horizon" (Warm Gold Accent, Horizon Line, Curved Glass Dock)
   Theme       : Warm Horizon Gold / Silver Grey / Luxury Warm Glassmorphism
   Module      : window.MobileLayout10 { init, destroy }
   Data source : window.TAV_CORE (shared_core.js) — no data duplication
   ========================================================================================= */

(function () {
  'use strict';

  // ── State ────────────────────────────────────────────────────────────
  let _initialized     = false;
  let _toastTimer       = null;
  let _activeCategory   = '';
  let _isSceneSheetOpen = false;
  let _isMapOpen        = false;
  let _isToolsOpen      = false;
  let _isHotspotsVis    = true;
  let _compassRaf       = null;

  // ── SVG Icon Library (Desktop 9 Horizon Style) ───────────────────────
  const I = {
    compass:  `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="none" stroke="rgba(246,193,119,0.4)" stroke-width="3"/><polygon points="50,15 62,50 50,62 38,50" fill="#F6C177"/><polygon points="50,85 62,50 50,62 38,50" fill="#8ED8FF"/><circle fill="rgba(246,193,119,0.4)" cx="50" cy="50" r="6"/></svg>`,
    scenes:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/></svg>`,
    map:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></svg>`,
    eye:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
    gallery:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>`,
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

  // ── DOM Builder (Derived directly from Desktop Layout 9 Horizon) ────
  function buildDOM() {
    const { config } = window.TAV_CORE;
    const cats       = window.TAV_CORE.getCategories();
    const isMuted    = window.TAV_CORE.isMusicMuted;

    _activeCategory = cats[0] || '';

    const catPills = cats.map((c, i) => `
      <button class="horizon-m10-cat-pill${i === 0 ? ' active' : ''}" data-cat="${c}">
        <span>${c}</span>
      </button>
    `).join('');

    return `
      <!-- Top Ribbon Header (Logo Brand Pill & Compass Widget) -->
      <div class="horizon-m10-top-ribbon">
        <div class="horizon-m10-brand-pill" id="hm10-brand-btn">
          <div class="horizon-m10-brand-dot"></div>
          <div class="horizon-m10-brand-text-block">
            <div class="horizon-m10-brand-title">${config.projectTitle.top}</div>
            <div class="horizon-m10-brand-sub">${config.projectTitle.sub}</div>
          </div>
        </div>

        <div class="horizon-m10-compass-badge" id="hm10-compass-btn" title="Đặt lại hướng nhìn">
          <div class="horizon-m10-compass-svg" id="hm10-compass-dial">${I.compass}</div>
        </div>
      </div>

      <!-- Command Console Bottom Dock (Layout 10 Theme) -->
      <nav class="horizon-m10-dock" id="hm10-dock">
        <button class="horizon-m10-dock-item" id="hm10-dock-scenes" aria-label="Cảnh">
          <div class="console-led"></div>
          <div class="horizon-m10-dock-icon-wrapper">${I.scenes}</div>
          <span>Cảnh</span>
        </button>
        <button class="horizon-m10-dock-item${_isMapOpen ? ' active' : ''}" id="hm10-dock-map" aria-label="Bản Đồ">
          <div class="console-led"></div>
          <div class="horizon-m10-dock-icon-wrapper">${I.map}</div>
          <span>Bản Đồ</span>
        </button>
        <button class="horizon-m10-dock-item${_isHotspotsVis ? ' active' : ''}" id="hm10-dock-hotspot" aria-label="Hotspot">
          <div class="console-led"></div>
          <div class="horizon-m10-dock-icon-wrapper">${I.eye}</div>
          <span>Hotspot</span>
        </button>
        <button class="horizon-m10-dock-item" id="hm10-dock-gallery" aria-label="Thư Viện">
          <div class="console-led"></div>
          <div class="horizon-m10-dock-icon-wrapper">${I.gallery}</div>
          <span>Thư Viện</span>
        </button>
        <button class="horizon-m10-dock-item" id="hm10-dock-tools" aria-label="Công Cụ">
          <div class="console-led"></div>
          <div class="horizon-m10-dock-icon-wrapper">${I.tools}</div>
          <span>Công Cụ</span>
        </button>
      </nav>

      <!-- Horizon Scene Browser Sheet -->
      <div class="horizon-m10-scene-sheet" id="hm10-scene-sheet">
        <div class="horizon-m10-cat-row" id="hm10-cat-row">
          ${catPills}
        </div>
        <div class="horizon-m10-scene-grid" id="hm10-scene-grid"></div>
      </div>

      <!-- Mini Map Card -->
      <div class="horizon-m10-map-card" id="hm10-map-card">
        <div class="horizon-m10-map-header">
          <span class="horizon-m10-map-title">Bản Đồ Virtual Tour</span>
          <button class="horizon-m10-map-close" id="hm10-map-close">${I.close}</button>
        </div>
        <div class="horizon-m10-map-viewport" id="hm10-map-viewport">
          <img src="image/Map_optimized.jpg" id="hm10-map-img" alt="Map" class="horizon-m10-map-img">
          <div id="hm10-map-radar" style="position: absolute; top: 50%; left: 50%; width: 0; height: 0; z-index: 10;">
            <div id="hm10-map-cone" style="position: absolute; width: 0; height: 0; border-left: 18px solid transparent; border-right: 18px solid transparent; border-top: 36px solid rgba(246,193,119,0.5); transform-origin: bottom center; transform: translate(-50%, -100%);"></div>
            <div style="position: absolute; width: 10px; height: 10px; background: #F6C177; border-radius: 50%; transform: translate(-50%, -50%); box-shadow: 0 0 10px #F6C177;"></div>
          </div>
        </div>
        <div class="horizon-m10-map-zoom">
          <button class="horizon-m10-map-zoom-btn" id="hm10-zoom-in">+</button>
          <button class="horizon-m10-map-zoom-btn" id="hm10-zoom-out">−</button>
        </div>
      </div>

      <!-- Horizon Tools Sheet Drawer -->
      <div class="horizon-m10-tools-sheet" id="hm10-tools-sheet">
        <div class="horizon-m10-tools-grid">
          <button class="horizon-m10-action-tile" data-action="fullscreen">
            ${I.fullscr}<span>Toàn Màn Hình</span>
          </button>
          <button class="horizon-m10-action-tile" data-action="info">
            ${I.info}<span>Thông Tin</span>
          </button>
          <button class="horizon-m10-action-tile" data-action="region">
            ${I.region}<span>Liên Kết Vùng</span>
          </button>
          <button class="horizon-m10-action-tile${!isMuted ? ' active' : ''}" data-action="audio">
            ${I.music}<span>Âm Nhạc</span>
          </button>
        </div>
        <div class="horizon-m10-divider"></div>
        <div class="horizon-m10-socials">
          <a href="${config.social.facebook}" target="_blank" class="horizon-m10-social-btn" title="Facebook">${I.fb}</a>
          <a href="${config.social.instagram}" target="_blank" class="horizon-m10-social-btn" title="Instagram">${I.ig}</a>
          <a href="${config.social.zalo}" target="_blank" class="horizon-m10-social-btn" title="Zalo">${I.zalo}</a>
        </div>
        <div class="horizon-m10-switch-row">
          <button class="horizon-m10-sw-pill" data-layout-switch="1">L1</button>
          <button class="horizon-m10-sw-pill" data-layout-switch="2">L2</button>
          <button class="horizon-m10-sw-pill" data-layout-switch="3">L3</button>
          <button class="horizon-m10-sw-pill" data-layout-switch="4">L4</button>
          <button class="horizon-m10-sw-pill" data-layout-switch="5">L5</button>
          <button class="horizon-m10-sw-pill" data-layout-switch="6">L6</button>
          <button class="horizon-m10-sw-pill" data-layout-switch="7">L7</button>
          <button class="horizon-m10-sw-pill" data-layout-switch="8">L8</button>
          <button class="horizon-m10-sw-pill" data-layout-switch="9">L9</button>
          <button class="horizon-m10-sw-pill active" data-layout-switch="10">L10</button>
        </div>
      </div>

      <!-- Backdrop Overlay -->
      <div class="horizon-m10-backdrop" id="hm10-backdrop"></div>

      <!-- Toast Notification -->
      <div class="horizon-m10-toast" id="hm10-toast"></div>
    `;
  }

  // ── Helper: Ripple Animation ─────────────────────────────────────────
  function triggerRipple(el, e) {
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'horizon-m10-ripple';
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
    const toast = document.getElementById('hm10-toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    if (_toastTimer) clearTimeout(_toastTimer);
    _toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
  }

  // ── Scene Grid Builder ───────────────────────────────────────────────
  function buildSceneGrid(catName) {
    const grid = document.getElementById('hm10-scene-grid');
    if (!grid) return;
    const scenes = window.TAV_CORE.getScenesByCategory(catName);
    const currentAction = window.TAV_CORE.currentScene ? window.TAV_CORE.currentScene.action : '';

    grid.innerHTML = scenes.map(s => `
      <div class="horizon-m10-scene-card${s.action === currentAction ? ' active' : ''}" data-action="${s.action}">
        <img src="${s.thumb}" alt="${s.title}" loading="lazy" onerror="this.src='preview.jpg'">
        <div class="horizon-m10-scene-title">${s.title}</div>
      </div>
    `).join('');
  }

  // ── Sheet & Panel Control ───────────────────────────────────────────
  function closeAllPanels() {
    _isSceneSheetOpen = false;
    _isMapOpen        = false;
    _isToolsOpen      = false;

    document.getElementById('hm10-scene-sheet')?.classList.remove('open');
    document.getElementById('hm10-map-card')?.classList.remove('open');
    document.getElementById('hm10-tools-sheet')?.classList.remove('open');
    document.getElementById('hm10-backdrop')?.classList.remove('open');

    document.querySelectorAll('#hm10-dock .horizon-m10-dock-item').forEach(b => {
      if (b.id !== 'hm10-dock-hotspot') {
        b.classList.remove('active');
      }
    });
  }

  function toggleSceneSheet(catName) {
    if (_isSceneSheetOpen && (!catName || _activeCategory === catName)) {
      closeAllPanels();
      return;
    }

    closeAllPanels();
    if (catName) _activeCategory = catName;
    _isSceneSheetOpen = true;

    buildSceneGrid(_activeCategory);

    document.querySelectorAll('.horizon-m10-cat-pill').forEach(b => {
      b.classList.toggle('active', b.dataset.cat === _activeCategory);
    });

    document.getElementById('hm10-scene-sheet')?.classList.add('open');
    document.getElementById('hm10-dock-scenes')?.classList.add('active');
    document.getElementById('hm10-backdrop')?.classList.add('open');
  }

  function toggleMinimap(forceState) {
    const nextState = forceState !== undefined ? forceState : !_isMapOpen;
    closeAllPanels();
    _isMapOpen = nextState;

    const card = document.getElementById('hm10-map-card');
    const tabMap = document.getElementById('hm10-dock-map');
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

    document.getElementById('hm10-tools-sheet')?.classList.add('open');
    document.getElementById('hm10-dock-tools')?.classList.add('active');
    document.getElementById('hm10-backdrop')?.classList.add('open');
  }

  // ── Sync Active State ────────────────────────────────────────────────
  function syncActiveScene(action) {
    if (!action) return;
    document.querySelectorAll('.horizon-m10-scene-card').forEach(card => {
      card.classList.toggle('active', card.dataset.action === action);
    });
  }

  function syncAudioBtn() {
    const btn = document.querySelector('.horizon-m10-action-tile[data-action="audio"]');
    if (!btn) return;
    const isMuted = window.TAV_CORE.isMusicMuted;
    btn.classList.toggle('active', !isMuted);
  }

  // ── Compass Synchronizer ─────────────────────────────────────────────
  function startCompassSync() {
    const update = () => {
      const dial = document.getElementById('hm10-compass-dial');
      if (dial) {
        const angle = window.TAV_CORE.getCompassAngle();
        dial.style.transform = `rotate(${angle}deg)`;
      }

      const cone = document.getElementById('hm10-map-cone');
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
    const overlay = document.getElementById('ml10-overlay');
    if (!overlay) return;

    // ── Brand Pill → Home Scene
    const brandBtn = document.getElementById('hm10-brand-btn');
    if (brandBtn) {
      brandBtn.addEventListener('click', e => {
        triggerRipple(brandBtn, e);
        window.TAV_CORE.navigateTo('node1');
        showToast("Về Cảnh Đầu");
      });
    }

    // ── Compass Badge → Reset View
    const compassBtn = document.getElementById('hm10-compass-btn');
    if (compassBtn) {
      compassBtn.addEventListener('click', e => {
        triggerRipple(compassBtn, e);
        window.TAV_CORE.resetView();
        showToast("Đặt lại hướng nhìn");
      });
    }

    // ── Dock Action Items
    document.getElementById('hm10-dock-scenes')?.addEventListener('click', e => {
      triggerRipple(e.currentTarget, e);
      toggleSceneSheet();
    });

    document.getElementById('hm10-dock-map')?.addEventListener('click', e => {
      triggerRipple(e.currentTarget, e);
      toggleMinimap();
    });

    document.getElementById('hm10-dock-hotspot')?.addEventListener('click', e => {
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
      document.getElementById('hm10-dock-hotspot')?.classList.toggle('active', _isHotspotsVis);
      showToast(_isHotspotsVis ? "Hotspot: Bật" : "Hotspot: Tắt");
    });

    document.getElementById('hm10-dock-gallery')?.addEventListener('click', e => {
      triggerRipple(e.currentTarget, e);
      closeAllPanels();
      if (typeof window.openGlobalPanoramaGallery === 'function') {
        window.openGlobalPanoramaGallery();
      } else {
        const galleryModal = document.getElementById('image-gallery-modal');
        if (galleryModal) galleryModal.classList.add('active');
      }
    });

    document.getElementById('hm10-dock-tools')?.addEventListener('click', e => {
      triggerRipple(e.currentTarget, e);
      toggleToolsSheet();
    });

    // ── Category Pills in Scene Sheet
    const catRow = document.getElementById('hm10-cat-row');
    if (catRow) {
      catRow.addEventListener('click', e => {
        const pill = e.target.closest('.horizon-m10-cat-pill');
        if (!pill || !pill.dataset.cat) return;
        triggerRipple(pill, e);
        _activeCategory = pill.dataset.cat;
        document.querySelectorAll('.horizon-m10-cat-pill').forEach(b => b.classList.remove('active'));
        pill.classList.add('active');
        buildSceneGrid(_activeCategory);
      });
    }

    // ── Scene Cards in Scene Sheet Grid
    const sceneGrid = document.getElementById('hm10-scene-grid');
    if (sceneGrid) {
      sceneGrid.addEventListener('click', e => {
        const card = e.target.closest('.horizon-m10-scene-card');
        if (!card || !card.dataset.action) return;
        triggerRipple(card, e);
        window.TAV_CORE.navigateTo(card.dataset.action);
        const scene = window.TAV_CORE.scenes.find(s => s.action === card.dataset.action);
        if (scene) showToast(scene.title);
        setTimeout(() => closeAllPanels(), 200);
      });
    }

    // ── Close Buttons & Backdrop
    document.getElementById('hm10-backdrop')?.addEventListener('click', () => closeAllPanels());
    document.getElementById('hm10-map-close')?.addEventListener('click', () => toggleMinimap(false));

    // ── Mini-Map Engine Integration
    const mapViewport = document.getElementById('hm10-map-viewport');
    if (mapViewport && window.MobileMinimapEngine) {
      const mapCtrl = window.MobileMinimapEngine.setupMap(mapViewport);
      document.getElementById('hm10-zoom-in')?.addEventListener('click', (e) => { e.stopPropagation(); mapCtrl?.zoomIn(); });
      document.getElementById('hm10-zoom-out')?.addEventListener('click', (e) => { e.stopPropagation(); mapCtrl?.zoomOut(); });
    }

    // ── Action Tiles in Tools Sheet
    const toolsSheet = document.getElementById('hm10-tools-sheet');
    if (toolsSheet) {
      toolsSheet.addEventListener('click', e => {
        const tile = e.target.closest('.horizon-m10-action-tile');
        if (!tile) return;
        triggerRipple(tile, e);
        const action = tile.dataset.action;

        if (action === 'fullscreen') {
          if (window.TAV_CORE) window.TAV_CORE.navigateTo('fullscreen');

        } else if (action === 'info') {
          closeAllPanels();
          showToast('TAV VILLA — Virtual Tour Horizon');
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
  window.MobileLayout10 = {
    init: function () {
      if (_initialized) return;
      if (!window.TAV_CORE) {
        console.error('[MobileLayout10] TAV_CORE is not available!');
        return;
      }

      // Hide desktop & other mobile overlays
      const desktopHideStyle = document.createElement('style');
      desktopHideStyle.id = 'ml10-desktop-hide';
      desktopHideStyle.textContent = `
        html body #modern-ui-container, html body #modern-ui-overlay,
        html body .prism-nav-container, html body .prism-dock, html body .prism-header-pill,
        html body .prism-bottom-dock, html body .modern-header-pill, html body #modern-dock-container,
        html body .prism-dock-container, html body .prism-nav-wrapper, html body .prism-tool-container,
        html body .prism-dock-item, html body .prism-nav-item, html body #sidebar-container, html body #horizontal-nav-bar,
        html body #command-bottom-ribbon, html body .modern-ui-sidebar, html body .v-rail-container, html body .bottom-nav-container,
        html body .aurora-nav-container, html body .aurora-tool-panel, html body .pc-container,
        html body #mobile-ui-overlay, html body #ml2-overlay, html body #ml3-overlay, html body #ml4-overlay, html body #ml5-overlay, html body #ml6-overlay, html body #ml7-overlay, html body #ml8-overlay, html body #ml9-overlay,
        html body #compass-widget, html body .compass-widget, html body #mob-compass, html body #ml2-compass, html body #ml3-compass, html body #ml4-compass, html body #ml5-compass, html body #ml6-compass, html body #am7-compass-btn, html body #pm8-compass-btn, html body #nm9-compass-btn,
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
      overlay.id = 'ml10-overlay';
      overlay.innerHTML = buildDOM();
      document.body.appendChild(overlay);

      setupEventListeners();
      startCompassSync();

      // Initial active scene sync
      if (window.TAV_CORE.currentScene) {
        syncActiveScene(window.TAV_CORE.currentScene.action);
      }

      _initialized = true;
      console.log('[MobileLayout10] Initialized — Desktop 9 Horizon Mobile Reinterpretation');
    },

    destroy: function () {
      stopCompassSync();
      if (_toastTimer) clearTimeout(_toastTimer);
      document.querySelectorAll('#ml10-overlay').forEach(el => el.remove());
      document.querySelectorAll('#ml10-desktop-hide').forEach(el => el.remove());
      _initialized = false;
      console.log('[MobileLayout10] Destroyed');
    }
  };

})();
