/* js/mobile/mobile_layout6.js — TAV Virtual Tour · Mobile Layout 6 "Aurora Glass" */
/* =========================================================================================
   Design DNA  : Desktop Layout 5 "Aurora" (Neon Glow, Dynamic Glassmorphism, Deep Space Navy)
   Theme       : Electric Cyan / Neon Purple / Aurora Pink / Emerald Glass
   Module      : window.MobileLayout6 { init, destroy }
   Data source : window.TAV_CORE (shared_core.js) — no data duplication
   ========================================================================================= */

(function () {
  'use strict';

  // ── State ────────────────────────────────────────────────────────────
  let _initialized     = false;
  let _toastTimer       = null;
  let _activeCategory   = '';
  let _isHotspotsVis    = true;
  let _isMapOpen        = false;
  let _mapZoom          = 1;
  let _mapX             = 0;
  let _mapY             = 0;
  let _mapDragging      = false;
  let _mapDragSX        = 0;
  let _mapDragSY        = 0;
  let _compassRaf       = null;

  // ── SVG Icon Library ─────────────────────────────────────────────────
  const I = {
    menu:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><line x1="3" y1="6" x2="21" y2="6" stroke-linecap="round"/><line x1="3" y1="12" x2="21" y2="12" stroke-linecap="round"/><line x1="3" y1="18" x2="21" y2="18" stroke-linecap="round"/></svg>`,
    home:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 21V12h6v9" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    map:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></svg>`,
    settings: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>`,
    music:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`,
    eye:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
    rotate:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>`,
    fullscr:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3"/></svg>`,
    share:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>`,
    info:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
    region:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
    gallery:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>`,
    close:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
    fb:       `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 8H7v3h2v9h4v-9h3.6l.4-3H13V6c0-.5.5-1 1-1h3V2h-3a5 5 0 00-5 5v1z"/></svg>`,
    ig:       `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`,
    zalo:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>`,
  };

  // ── DOM Builder ──────────────────────────────────────────────────────
  function buildDOM() {
    const { config, scenes } = window.TAV_CORE;
    const cats    = window.TAV_CORE.getCategories();
    const isMuted = window.TAV_CORE.isMusicMuted;

    _activeCategory = cats[0] || '';

    const carouselItems = scenes.map(s => `
      <div class="ml6-carousel-item ml6-interactive" data-action="${s.action}" data-node="${s.action}">
        <div class="ml6-carousel-active-pip"></div>
        <img src="${s.thumb}" alt="${s.title}" onerror="this.src='preview.jpg'">
        <div class="ml6-carousel-item-title">${s.title}</div>
      </div>
    `).join('');

    const catTabs = cats.map((c, i) =>
      `<button class="ml6-cat-tab${i === 0 ? ' ml6-active' : ''} ml6-interactive" data-cat="${c}">${c}</button>`
    ).join('');

    const hotspotsLabel = "Hotspots";
    const rotateLabel   = "Xoay T\u1ef1 \u0110\u1ed9ng";
    const fullscrLabel  = "To\u00e0n M\u00e0n H\u00ecnh";
    const galleryLabel  = "Th\u01b0 Vi\u1ec7n";
    const shareLabel    = "Chia S\u1ebb";
    const infoLabel     = "Th\u00f4ng Tin";
    const regionLabel   = "Li\u00ean K\u1ebft V\u00f9ng";

    const toolBtns = [
      { action: 'hotspots',   icon: I.eye,     label: hotspotsLabel,   active: _isHotspotsVis },
      { action: 'gallery',    icon: I.gallery, label: galleryLabel,    active: false },
      { action: 'fullscreen', icon: I.fullscr, label: fullscrLabel,    active: false },
      { action: 'share',      icon: I.share,   label: shareLabel,      active: false },
      { action: 'info',       icon: I.info,    label: infoLabel,       active: false },
      { action: 'region',     icon: I.region,  label: regionLabel,     active: false },
    ].map(b => `
      <button class="ml6-tp-btn ml6-interactive ml6-ripple-host${b.active ? ' ml6-active-tool' : ''}" data-action="${b.action}">
        ${b.icon}<span>${b.label}</span>
      </button>
    `).join('');

    const textCanh = "C\u1ea3nh";
    const textThuVien = "Th\u01b0 Vi\u1ec7n";
    const textBanDo = "B\u1ea3n \u0110\u1ed3";
    const textCaiDat = "C\u00e0i \u0110\u1eb7t";
    const textNhac = "Nh\u1ea1c";
    const textDanhmuc = "Danh M\u1ee5c C\u1ea3nh";
    const textResetView = "\u0110\u1eb7t l\u1ea1i h\u01b0\u1edbng nh\u00ecn";

    return `
      <!-- Top Strip -->
      <div class="ml6-top-strip ml6-interactive">
        <div class="ml6-compass ml6-interactive" id="ml6-compass" title="${textResetView}">
          <svg class="ml6-compass-dial" viewBox="0 0 100 100">
            <circle class="ml6-compass-ring" cx="50" cy="50" r="46"/>
            <polygon class="ml6-compass-north" points="50,18 58,50 50,60 42,50"/>
            <polygon class="ml6-compass-south" points="50,82 58,50 50,60 42,50"/>
            <circle fill="rgba(0,217,255,0.2)" cx="50" cy="50" r="6"/>
          </svg>
        </div>

        <div class="ml6-logo-pill ml6-interactive" id="ml6-logo-btn">
          <div class="ml6-logo-dot"></div>
          <div>
            <div class="ml6-logo-text">${config.projectTitle.top}</div>
            <div class="ml6-logo-sub">${config.projectTitle.sub}</div>
          </div>
        </div>
      </div>

      <!-- Mini Map Card -->
      <div class="ml6-minimap-card ml6-interactive" id="ml6-minimap-card">
        <div class="ml6-minimap-header">
          <span class="ml6-minimap-title">${textBanDo}</span>
          <button class="ml6-minimap-close ml6-interactive" id="ml6-map-close">${I.close}</button>
        </div>
        <div class="ml6-minimap-viewport" id="ml6-minimap-viewport">
          <img src="image/Map_optimized.jpg" id="ml6-minimap-img" alt="Map" class="ml6-minimap-img">
          <div id="ml6-minimap-radar" class="ml6-minimap-radar">
            <div class="ml6-minimap-cone" id="ml6-minimap-cone"></div>
            <div class="ml6-minimap-dot"></div>
          </div>
        </div>
        <div class="ml6-minimap-zoom">
          <button class="ml6-minimap-zoom-btn ml6-interactive" id="ml6-zoom-in">+</button>
          <button class="ml6-minimap-zoom-btn ml6-interactive" id="ml6-zoom-out">−</button>
        </div>
      </div>

      <!-- Settings / Action Sheet -->
      <div class="ml6-settings-sheet ml6-interactive" id="ml6-settings-sheet" role="dialog" aria-label="C\u00f4ng C\u1ee5">
        <div class="ml6-tp-grid">
          ${toolBtns}
        </div>
        <div class="ml6-tp-divider"></div>
        <div class="ml6-tp-footer">
          <div class="ml6-tp-socials">
            <a href="${config.social.facebook}" target="_blank" class="ml6-tp-social ml6-interactive" title="Facebook">${I.fb}</a>
            <a href="${config.social.instagram}" target="_blank" class="ml6-tp-social ml6-interactive" title="Instagram">${I.ig}</a>
            <a href="${config.social.zalo}" target="_blank" class="ml6-tp-social ml6-interactive" title="Zalo">${I.zalo}</a>
          </div>
          <div class="ml6-tp-switch-row">
            <button class="ml6-tp-sw ml6-interactive" data-layout-switch="1">L1</button>
            <button class="ml6-tp-sw ml6-interactive" data-layout-switch="2">L2</button>
            <button class="ml6-tp-sw ml6-interactive" data-layout-switch="3">L3</button>
            <button class="ml6-tp-sw ml6-interactive" data-layout-switch="4">L4</button>
            <button class="ml6-tp-sw ml6-interactive" data-layout-switch="5">L5</button>
            <button class="ml6-tp-sw ml6-tp-sw-active ml6-interactive" data-layout-switch="6">L6</button>
          </div>
        </div>
      </div>

      <!-- Floating Bottom Dock (5-Item Symmetrical Layout) -->
      <nav class="ml6-dock ml6-interactive" id="ml6-dock">
        <button class="ml6-dock-tab ml6-interactive" id="ml6-tab-menu" aria-label="${textCanh}">
          ${I.menu}<span>${textCanh}</span>
        </button>
        <button class="ml6-dock-tab ml6-interactive${_isMapOpen ? ' ml6-active' : ''}" id="ml6-tab-map" aria-label="${textBanDo}">
          ${I.map}<span>${textBanDo}</span>
        </button>
        <button class="ml6-fab ml6-interactive" id="ml6-fab" aria-label="Về Cảnh Đầu">
          ${I.home}
        </button>
        <button class="ml6-dock-tab ml6-interactive" id="ml6-tab-settings" aria-label="${textCaiDat}">
          ${I.settings}<span>${textCaiDat}</span>
        </button>
        <button class="ml6-dock-tab ml6-interactive${!isMuted ? ' ml6-active' : ''}" id="ml6-tab-audio" aria-label="${textNhac}">
          ${I.music}<span>${textNhac}</span>
        </button>
      </nav>

      <!-- Backdrop -->
      <div class="ml6-backdrop ml6-interactive" id="ml6-backdrop"></div>

      <!-- Navigation Drawer Sheet -->
      <div class="ml6-sheet ml6-interactive" id="ml6-nav-sheet" role="dialog" aria-label="${textDanhmuc}">
        <div class="ml6-sheet-handle"></div>
        <div class="ml6-sheet-header">
          <span class="ml6-sheet-title">${textDanhmuc}</span>
          <button class="ml6-sheet-close ml6-interactive" id="ml6-nav-close">${I.close}</button>
        </div>
        <div class="ml6-sheet-body">
          <div class="ml6-cat-tabs" id="ml6-cat-tabs">${catTabs}</div>
          <div class="ml6-scene-grid" id="ml6-scene-grid"></div>
        </div>
      </div>

      <!-- Toast Notification -->
      <div class="ml6-toast" id="ml6-toast"></div>
    `;
  }

  // ── Helper: Ripple Animation ─────────────────────────────────────────
  function triggerRipple(el, e) {
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'ml6-ripple';
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
    const toast = document.getElementById('ml6-toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('ml6-show');
    if (_toastTimer) clearTimeout(_toastTimer);
    _toastTimer = setTimeout(() => toast.classList.remove('ml6-show'), 2200);
  }

  // ── Scene Grid Builder ──────────────────────────────────────────────
  function buildSceneGrid(catName) {
    const grid = document.getElementById('ml6-scene-grid');
    if (!grid) return;
    const scenes = window.TAV_CORE.getScenesByCategory(catName);
    const currentAction = window.TAV_CORE.currentScene ? window.TAV_CORE.currentScene.action : '';

    grid.innerHTML = scenes.map(s => `
      <div class="ml6-scene-card ml6-interactive${s.action === currentAction ? ' active' : ''}" data-action="${s.action}">
        <img src="${s.thumb}" alt="${s.title}" loading="lazy" onerror="this.src='preview.jpg'">
        <div class="ml6-scene-card-title">${s.title}</div>
      </div>
    `).join('');
  }

  // ── Sheet & Panel Control (Strict Mutual Exclusion) ────────────────
  function openSheet(sheetId) {
    closeAllSheets();
    const sheet = document.getElementById(sheetId);
    const backdrop = document.getElementById('ml6-backdrop');
    if (sheet) sheet.classList.add('ml6-open');
    if (backdrop) backdrop.classList.add('ml6-open');
    if (sheetId === 'ml6-nav-sheet') buildSceneGrid(_activeCategory);
  }

  function closeAllSheets() {
    _isMapOpen = false;
    document.querySelectorAll('.ml6-sheet, .ml6-settings-sheet, .ml6-minimap-card').forEach(s => s.classList.remove('ml6-open'));
    const backdrop = document.getElementById('ml6-backdrop');
    if (backdrop) backdrop.classList.remove('ml6-open');
    const tabMenu = document.getElementById('ml6-tab-menu');
    const tabSettings = document.getElementById('ml6-tab-settings');
    const tabMap = document.getElementById('ml6-tab-map');
    if (tabMenu) tabMenu.classList.remove('ml6-active');
    if (tabSettings) tabSettings.classList.remove('ml6-active');
    if (tabMap) tabMap.classList.remove('ml6-active');
  }

  function toggleMinimap(forceState) {
    const nextState = forceState !== undefined ? forceState : !_isMapOpen;
    closeAllSheets();
    _isMapOpen = nextState;
    const card = document.getElementById('ml6-minimap-card');
    const tabMap = document.getElementById('ml6-tab-map');
    const backdrop = document.getElementById('ml6-backdrop');
    if (card) card.classList.toggle('ml6-open', _isMapOpen);
    if (tabMap) tabMap.classList.toggle('ml6-active', _isMapOpen);
    // Keep main screen 100% bright and interactive (no backdrop blur overlay)
    if (backdrop) backdrop.classList.remove('ml6-open');
    if (_isMapOpen) showToast("Bản Đồ");
  }

  function isToolPanelOpen() {
    const sheet = document.getElementById('ml6-settings-sheet');
    return sheet ? sheet.classList.contains('ml6-open') : false;
  }

  function openToolPanel() {
    closeAllSheets();
    const sheet = document.getElementById('ml6-settings-sheet');
    const tabSettings = document.getElementById('ml6-tab-settings');
    const backdrop = document.getElementById('ml6-backdrop');
    if (sheet) sheet.classList.add('ml6-open');
    if (tabSettings) tabSettings.classList.add('ml6-active');
    if (backdrop) backdrop.classList.add('ml6-open');
  }

  function closeToolPanel() {
    const sheet = document.getElementById('ml6-settings-sheet');
    const tabSettings = document.getElementById('ml6-tab-settings');
    const backdrop = document.getElementById('ml6-backdrop');
    if (sheet) sheet.classList.remove('ml6-open');
    if (tabSettings) tabSettings.classList.remove('ml6-active');
    if (backdrop) backdrop.classList.remove('ml6-open');
  }

  // ── Sync Active State ────────────────────────────────────────────────
  function syncActiveScene(action) {
    if (!action) return;
    document.querySelectorAll('.ml6-carousel-item').forEach(item => {
      const isCurrent = item.dataset.action === action;
      item.classList.toggle('active', isCurrent);
      if (isCurrent) {
        const track = document.getElementById('ml6-carousel-track');
        if (track) {
          const targetLeft = item.offsetLeft - (track.clientWidth / 2) + (item.offsetWidth / 2);
          track.scrollTo({ left: targetLeft, behavior: 'smooth' });
        }
      }
    });

    document.querySelectorAll('.ml6-scene-card').forEach(card => {
      card.classList.toggle('active', card.dataset.action === action);
    });
  }

  function syncAudioBtn() {
    const btn = document.getElementById('ml6-tab-audio');
    if (!btn) return;
    const isMuted = window.TAV_CORE.isMusicMuted;
    btn.classList.toggle('ml6-active', !isMuted);
  }

  // ── Compass Synchronizer ─────────────────────────────────────────────
  function startCompassSync() {
    const update = () => {
      const dial = document.querySelector('.ml6-compass-dial');
      if (dial) {
        const angle = window.TAV_CORE.getCompassAngle();
        dial.style.transform = `rotate(${angle}deg)`;
      }

      const cone = document.getElementById('ml6-minimap-cone');
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
    const overlay = document.getElementById('ml6-overlay');
    if (!overlay) return;

    // ── Compass tap → Reset View
    const compass = document.getElementById('ml6-compass');
    if (compass) {
      compass.addEventListener('click', e => {
        triggerRipple(compass, e);
        window.TAV_CORE.resetView();
        showToast("\u0110\u1eb7t l\u1ea1i h\u01b0\u1edbng nh\u00ecn");
      });
    }

    // ── Logo pill → Reset to Home
    const logoBtn = document.getElementById('ml6-logo-btn');
    if (logoBtn) {
      logoBtn.addEventListener('click', e => {
        triggerRipple(logoBtn, e);
        window.TAV_CORE.navigateTo('node1');
        showToast("V\u1ec1 C\u1ea3nh \u0110\u1ea7u");
      });
    }

    // ── Carousel track tap & gesture snap
    const carouselTrack = document.getElementById('ml6-carousel-track');
    if (carouselTrack) {
      carouselTrack.addEventListener('click', e => {
        const item = e.target.closest('.ml6-carousel-item');
        if (!item || !item.dataset.action) return;
        triggerRipple(item, e);
        window.TAV_CORE.navigateTo(item.dataset.action);
      });
    }

    // ── Dock: Scenes Menu
    const tabMenu = document.getElementById('ml6-tab-menu');
    if (tabMenu) tabMenu.addEventListener('click', e => {
      triggerRipple(tabMenu, e);
      if (document.getElementById('ml6-nav-sheet')?.classList.contains('ml6-open')) {
        closeAllSheets();
        return;
      }
      openSheet('ml6-nav-sheet');
      tabMenu.classList.add('ml6-active');
    });

    // ── Dock: Gallery
    const tabGallery = document.getElementById('ml6-tab-gallery');
    if (tabGallery) tabGallery.addEventListener('click', e => {
      triggerRipple(tabGallery, e);
      closeAllSheets();
      if (typeof window.openGlobalPanoramaGallery === 'function') {
        window.openGlobalPanoramaGallery();
      } else {
        const galleryModal = document.getElementById('image-gallery-modal');
        if (galleryModal) galleryModal.classList.add('active');
      }
    });

    // ── Dock: Map
    const tabMap = document.getElementById('ml6-tab-map');
    if (tabMap) tabMap.addEventListener('click', e => {
      triggerRipple(tabMap, e);
      toggleMinimap();
    });

    // ── Dock: FAB Home
    const fabBtn = document.getElementById('ml6-fab');
    if (fabBtn) fabBtn.addEventListener('click', e => {
      triggerRipple(fabBtn, e);
      window.TAV_CORE.navigateTo('node1');
      fabBtn.classList.add('ml6-pulse');
      setTimeout(() => fabBtn.classList.remove('ml6-pulse'), 500);
      showToast("V\u1ec1 C\u1ea3nh \u0110\u1ea7u");
    });

    // ── Dock: Settings / Tools
    const tabSettings = document.getElementById('ml6-tab-settings');
    if (tabSettings) tabSettings.addEventListener('click', e => {
      triggerRipple(tabSettings, e);
      if (isToolPanelOpen()) {
        closeToolPanel();
      } else {
        openToolPanel();
      }
    });

    // ── Dock: Audio
    const tabAudio = document.getElementById('ml6-tab-audio');
    if (tabAudio) tabAudio.addEventListener('click', e => {
      triggerRipple(tabAudio, e);
      window.TAV_CORE.toggleMusic();
      syncAudioBtn();
      const toastAudio = window.TAV_CORE.isMusicMuted ? "Nh\u1ea1c: T\u1eaft" : "Nh\u1ea1c: B\u1eadt";
      showToast(toastAudio);
    });

    // ── Backdrop & Close buttons
    const backdrop = document.getElementById('ml6-backdrop');
    if (backdrop) backdrop.addEventListener('click', () => closeAllSheets());

    const navClose = document.getElementById('ml6-nav-close');
    if (navClose) navClose.addEventListener('click', () => closeAllSheets());

    const mapClose = document.getElementById('ml6-map-close');
    if (mapClose) mapClose.addEventListener('click', () => toggleMinimap());

    // ── Mini-Map Engine (Touch Drag/Pan & Hotspot Pins)
    const mapViewport = document.getElementById('ml6-minimap-viewport');
    if (mapViewport && window.MobileMinimapEngine) {
      const mapCtrl = window.MobileMinimapEngine.setupMap(mapViewport);
      document.getElementById('ml6-zoom-in')?.addEventListener('click', (e) => { e.stopPropagation(); mapCtrl?.zoomIn(); });
      document.getElementById('ml6-zoom-out')?.addEventListener('click', (e) => { e.stopPropagation(); mapCtrl?.zoomOut(); });
    }

    // ── Category Tabs
    const catTabsEl = document.getElementById('ml6-cat-tabs');
    if (catTabsEl) catTabsEl.addEventListener('click', e => {
      const btn = e.target.closest('.ml6-cat-tab');
      if (!btn) return;
      triggerRipple(btn, e);
      _activeCategory = btn.dataset.cat;
      document.querySelectorAll('.ml6-cat-tab').forEach(b => b.classList.remove('ml6-active'));
      btn.classList.add('ml6-active');
      buildSceneGrid(_activeCategory);
    });

    // ── Scene Grid Tap
    const sceneGrid = document.getElementById('ml6-scene-grid');
    if (sceneGrid) sceneGrid.addEventListener('click', e => {
      const card = e.target.closest('.ml6-scene-card');
      if (!card || !card.dataset.action) return;
      triggerRipple(card, e);
      window.TAV_CORE.navigateTo(card.dataset.action);
      const scene = window.TAV_CORE.scenes.find(s => s.action === card.dataset.action);
      if (scene) showToast(scene.title);
      setTimeout(() => closeAllSheets(), 220);
    });

    // ── Tool Panel Grid Actions
    const toolPanel = document.getElementById('ml6-settings-sheet');
    if (toolPanel) {
      toolPanel.addEventListener('click', e => {
        const btn = e.target.closest('.ml6-tp-btn');
        if (!btn) return;
        triggerRipple(btn, e);
        const action = btn.dataset.action;

        if (action === 'hotspots') {
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
          document.querySelectorAll('[data-action="hotspots"]').forEach(b =>
            b.classList.toggle('ml6-active-tool', _isHotspotsVis)
          );
          showToast(_isHotspotsVis ? "Hotspot: Bật" : "Hotspot: Tắt");

        } else if (action === 'gallery') {
          if (typeof window.openGlobalPanoramaGallery === 'function') {
            window.openGlobalPanoramaGallery();
          } else {
            const galleryModal = document.getElementById('image-gallery-modal');
            if (galleryModal) galleryModal.classList.add('active');
          }

        } else if (action === 'autorotate') {
          let isActive = false;
          if (typeof window.toggleCustomAutorotate === 'function') {
            isActive = window.toggleCustomAutorotate();
          } else if (window.TAV_CORE) {
            window.TAV_CORE.navigateTo('autorotate');
          }
          showToast(isActive ? "Xoay tự động: Bật" : "Xoay tự động: Tắt");

        } else if (action === 'fullscreen') {
          if (window.TAV_CORE) window.TAV_CORE.navigateTo('fullscreen');

        } else if (action === 'share') {
          if (navigator.share) {
            navigator.share({ title: 'TAV VILLA Virtual Tour', url: window.location.href }).catch(() => {});
          } else if (navigator.clipboard) {
            navigator.clipboard.writeText(window.location.href).then(() => showToast("\u0110\u00e3 sao ch\u00e9p li\u00ean k\u1ebft"));
          }

        } else if (action === 'info') {
          closeToolPanel();
          showToast('TAV VILLA — Virtual Tour Aurora');
          const infoModal = document.getElementById('infoModal') || document.getElementById('info-modal') || document.querySelector('.info-modal') || document.querySelector('.modern-modal');
          if (infoModal) {
            infoModal.classList.add('active');
            infoModal.style.display = 'flex';
            infoModal.style.zIndex = '10000';
          }

        } else if (action === 'region') {
          closeToolPanel();
          const regionPage = document.getElementById('region-page');
          if (regionPage) {
            document.body.classList.add('region-mode-active');
            document.querySelector('.region-hamburger')?.classList.remove('open');
            document.getElementById('region-menu-collapsible')?.classList.remove('open');
          }
        }

        // CRITICAL UX: Automatically retract tool panel so main screen is un-obscured!
        setTimeout(() => closeToolPanel(), 180);
      });
    }

    // ── Layout Switcher Buttons
    overlay.addEventListener('click', e => {
      const pill = e.target.closest('[data-layout-switch]');
      if (!pill) return;
      triggerRipple(pill, e);
      const targetLayout = pill.dataset.layoutSwitch;
      if (targetLayout && typeof window.switchMobileLayout === 'function') {
        closeAllSheets();
        window.switchMobileLayout(targetLayout);
      }
    });

    // ── Minimap Zoom Buttons
    const zoomIn = document.getElementById('ml6-zoom-in');
    if (zoomIn) zoomIn.addEventListener('click', () => {
      _mapZoom = Math.min(2.5, _mapZoom + 0.3);
      const img = document.getElementById('ml6-minimap-img');
      if (img) img.style.transform = `scale(${_mapZoom}) translate(${_mapX}px, ${_mapY}px)`;
    });

    const zoomOut = document.getElementById('ml6-zoom-out');
    if (zoomOut) zoomOut.addEventListener('click', () => {
      _mapZoom = Math.max(1, _mapZoom - 0.3);
      const img = document.getElementById('ml6-minimap-img');
      if (img) img.style.transform = `scale(${_mapZoom}) translate(${_mapX}px, ${_mapY}px)`;
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
  window.MobileLayout6 = {
    init: function () {
      if (_initialized) return;
      if (!window.TAV_CORE) {
        console.error('[MobileLayout6] TAV_CORE is not available!');
        return;
      }

      // Hide desktop & other mobile overlays
      const desktopHideStyle = document.createElement('style');
      desktopHideStyle.id = 'ml6-desktop-hide';
      desktopHideStyle.textContent = `
        html body #modern-ui-container, html body #modern-ui-overlay,
        html body .prism-nav-container, html body .prism-dock, html body .prism-header-pill,
        html body .prism-bottom-dock, html body .modern-header-pill, html body #modern-dock-container,
        html body .prism-dock-container, html body .prism-nav-wrapper, html body .prism-tool-container,
        html body .prism-dock-item, html body .prism-nav-item, html body #sidebar-container, html body #horizontal-nav-bar,
        html body #command-bottom-ribbon, html body .modern-ui-sidebar, html body .v-rail-container, html body .bottom-nav-container,
        html body .aurora-nav-container, html body .aurora-tool-panel, html body .pc-container,
        html body #mobile-ui-overlay, html body #ml2-overlay, html body #ml3-overlay, html body #ml4-overlay, html body #ml5-overlay,
        html body #compass-widget, html body .compass-widget, html body #mob-compass, html body #ml2-compass, html body #ml3-compass, html body #ml4-compass, html body #ml5-compass,
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
      overlay.id = 'ml6-overlay';
      overlay.innerHTML = buildDOM();
      document.body.appendChild(overlay);

      setupEventListeners();
      startCompassSync();

      // Initial active state sync
      if (window.TAV_CORE.currentScene) {
        syncActiveScene(window.TAV_CORE.currentScene.action);
      }

      _initialized = true;
      console.log('[MobileLayout6] Initialized — Aurora Glass theme');
    },

    destroy: function () {
      stopCompassSync();
      if (_toastTimer) clearTimeout(_toastTimer);
      document.querySelectorAll('#ml6-overlay').forEach(el => el.remove());
      document.querySelectorAll('#ml6-desktop-hide').forEach(el => el.remove());
      _initialized = false;
      console.log('[MobileLayout6] Destroyed');
    }
  };

})();
