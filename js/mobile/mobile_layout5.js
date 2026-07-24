/* js/mobile/mobile_layout5.js — TAV Virtual Tour · Mobile Layout 5 */
/* ====================================================================
   Design DNA : Desktop Layout 3 "Neo"
   Theme       : Frosted Light Glass · Purple/Violet · Indigo · Emerald
   Module      : window.MobileLayout5  { init, destroy }
   Data source : window.TAV_CORE (shared_core.js) — no data duplication
   ==================================================================== */

(function () {
  'use strict';

  // ── State ────────────────────────────────────────────────────────────
  let _initialized = false;
  let _toastTimer  = null;
  let _activeCategory = '';
  let _isHotspotsVis  = true;
  let _isMapOpen      = false;
  let _mapZoom        = 1;
  let _mapX           = 0;
  let _mapY           = 0;
  let _mapDragging    = false;
  let _mapDragSX      = 0;
  let _mapDragSY      = 0;
  let _compassRaf     = null;

  // ── SVG Icon library ─────────────────────────────────────────────────
  const I = {
    menu:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><line x1="3" y1="6"  x2="21" y2="6" stroke-linecap="round"/><line x1="3" y1="12" x2="21" y2="12" stroke-linecap="round"/><line x1="3" y1="18" x2="21" y2="18" stroke-linecap="round"/></svg>`,
    home:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 21V12h6v9" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    map:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></svg>`,
    settings:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>`,
    music:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`,
    eye:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
    rotate:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>`,
    fullscr: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3"/></svg>`,
    share:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>`,
    info:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
    region:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
    close:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
    gallery: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>`,
    fb:      `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 8H7v3h2v9h4v-9h3.6l.4-3H13V6c0-.5.5-1 1-1h3V2h-3a5 5 0 00-5 5v1z"/></svg>`,
    ig:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`,
    zalo:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>`,
  };

  // ── DOM Builder ──────────────────────────────────────────────────────
  function buildDOM() {
    const { config, scenes } = window.TAV_CORE;
    const cats    = window.TAV_CORE.getCategories();
    const isMuted = window.TAV_CORE.isMusicMuted;

    _activeCategory = cats[0] || '';

    const carouselItems = scenes.map(s => `
      <div class="ml5-carousel-item ml5-interactive" data-action="${s.action}" data-node="${s.action}">
        <div class="ml5-carousel-active-pip"></div>
        <img src="${s.thumb}" alt="${s.title}" onerror="this.src='preview.jpg'">
        <div class="ml5-carousel-item-title">${s.title}</div>
      </div>
    `).join('');

    const catTabs = cats.map((c, i) =>
      `<button class="ml5-cat-tab${i === 0 ? ' ml5-active' : ''} ml5-interactive" data-cat="${c}">${c}</button>`
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
      <button class="ml5-tp-btn ml5-interactive ml5-ripple-host${b.active ? ' ml5-active-tool' : ''}" data-action="${b.action}">
        ${b.icon}<span>${b.label}</span>
      </button>
    `).join('');

    const textCanh = "C\u1ea3nh";
    const textBanDo = "B\u1ea3n \u0110\u1ed3";
    const textCaiDat = "C\u00e0i \u0110\u1eb7t";
    const textNhac = "Nh\u1ea1c";
    const textDanhmuc = "Danh M\u1ee5c C\u1ea3nh";
    const textResetView = "\u0110\u1eb7t l\u1ea1i h\u01b0\u1edbng nh\u00ecn";
    const textBanDoLKV = "B\u1ea3n \u0111\u1ed3 li\u00ean k\u1ebft v\u00f9ng";

    return `
      <!-- Top Strip -->
      <div class="ml5-top-strip ml5-interactive">
        <div class="ml5-compass ml5-interactive" id="ml5-compass" title="${textResetView}">
          <svg class="ml5-compass-dial" viewBox="0 0 100 100">
            <circle class="ml5-compass-ring" cx="50" cy="50" r="46"/>
            <polygon class="ml5-compass-north" points="50,18 58,50 50,60 42,50"/>
            <polygon class="ml5-compass-south" points="50,82 58,50 50,60 42,50"/>
            <circle fill="rgba(124,58,237,0.1)" cx="50" cy="50" r="6"/>
          </svg>
        </div>

        <div class="ml5-logo-pill ml5-interactive" id="ml5-logo-btn">
          <div class="ml5-logo-dot"></div>
          <div>
            <div class="ml5-logo-text">${config.projectTitle.top}</div>
            <div class="ml5-logo-sub">${config.projectTitle.sub}</div>
          </div>
          <div class="ml5-layout-badge">L5</div>
        </div>
      </div>

      <!-- Mini Map Card -->
      <div class="ml5-minimap-card ml5-interactive" id="ml5-minimap-card">
        <div class="ml5-minimap-header">
          <span class="ml5-minimap-title">${textBanDo}</span>
          <button class="ml5-minimap-close ml5-interactive" id="ml5-map-close">${I.close}</button>
        </div>
        <div class="ml5-minimap-viewport" id="ml5-minimap-viewport">
          <img src="image/Map_optimized.jpg" id="ml5-minimap-img" alt="Map" class="ml5-minimap-img">
          <div id="ml5-minimap-radar" class="ml5-minimap-radar">
            <div class="ml5-minimap-cone" id="ml5-minimap-cone"></div>
            <div class="ml5-minimap-dot"></div>
          </div>
        </div>
        <div class="ml5-minimap-zoom">
          <button class="ml5-minimap-zoom-btn ml5-interactive" id="ml5-zoom-in">+</button>
          <button class="ml5-minimap-zoom-btn ml5-interactive" id="ml5-zoom-out">−</button>
        </div>
      </div>

      <!-- Scene Carousel -->
      <div class="ml5-carousel-strip ml5-visible" id="ml5-carousel-strip">
        <div class="ml5-carousel-track ml5-interactive" id="ml5-carousel-track">
          ${carouselItems}
        </div>
      </div>

      <!-- Redesigned Compact Floating Tool Panel (no backdrop, panorama stays visible) -->
      <div class="ml5-tool-panel ml5-interactive" id="ml5-settings-sheet" role="dialog" aria-label="Công Cụ">
        <div class="ml5-tp-grid">
          ${toolBtns}
        </div>
        <div class="ml5-tp-divider"></div>
        <div class="ml5-tp-footer">
          <div class="ml5-tp-socials">
            <a href="${config.social.facebook}" target="_blank" class="ml5-tp-social ml5-interactive" title="Facebook">${I.fb}</a>
            <a href="${config.social.instagram}" target="_blank" class="ml5-tp-social ml5-interactive" title="Instagram">${I.ig}</a>
            <a href="${config.social.zalo}" target="_blank" class="ml5-tp-social ml5-interactive" title="Zalo">${I.zalo}</a>
          </div>
          <div class="ml5-tp-sep"></div>
          <div class="ml5-tp-switch-row">
            <button class="ml5-tp-sw ml5-interactive" data-layout-switch="1">L1</button>
            <button class="ml5-tp-sw ml5-interactive" data-layout-switch="2">L2</button>
            <button class="ml5-tp-sw ml5-interactive" data-layout-switch="3">L3</button>
            <button class="ml5-tp-sw ml5-interactive" data-layout-switch="4">L4</button>
            <button class="ml5-tp-sw ml5-tp-sw-active ml5-interactive" data-layout-switch="5">L5</button>
            <button class="ml5-tp-sw ml5-interactive" data-layout-switch="6">L6</button>
          </div>
        </div>
      </div>

      <!-- Floating Bottom Dock -->
      <nav class="ml5-dock ml5-interactive" id="ml5-dock">
        <button class="ml5-tab ml5-interactive" id="ml5-tab-menu" aria-label="${textCanh}">
          ${I.menu}<span>${textCanh}</span>
        </button>
        <button class="ml5-tab ml5-interactive${_isMapOpen ? ' ml5-active' : ''}" id="ml5-tab-map" aria-label="${textBanDo}">
          ${I.map}<span>${textBanDo}</span>
        </button>
        <button class="ml5-fab ml5-interactive" id="ml5-fab" aria-label="V\u1ec1 C\u1ea3nh \u0110\u1ea7u">
          ${I.home}
        </button>
        <button class="ml5-tab ml5-interactive" id="ml5-tab-settings" aria-label="${textCaiDat}">
          ${I.settings}<span>${textCaiDat}</span>
        </button>
        <button class="ml5-tab ml5-interactive${!isMuted ? ' ml5-active' : ''}" id="ml5-tab-audio" aria-label="${textNhac}">
          ${I.music}<span>${textNhac}</span>
        </button>
      </nav>

      <!-- Backdrop (nav & region sheets only — NOT for settings tool panel) -->
      <div class="ml5-backdrop ml5-interactive" id="ml5-backdrop"></div>

      <!-- Navigation Sheet -->
      <div class="ml5-sheet ml5-interactive" id="ml5-nav-sheet" role="dialog" aria-label="${textDanhmuc}">
        <div class="ml5-sheet-handle"></div>
        <div class="ml5-sheet-header">
          <span class="ml5-sheet-title">${textDanhmuc}</span>
          <button class="ml5-sheet-close ml5-interactive" id="ml5-nav-close">${I.close}</button>
        </div>
        <div class="ml5-sheet-body">
          <div class="ml5-cat-tabs" id="ml5-cat-tabs">${catTabs}</div>
          <div class="ml5-scene-grid" id="ml5-scene-grid"></div>
        </div>
      </div>



      <!-- Toast -->
      <div class="ml5-toast" id="ml5-toast"></div>
    `;
  }

  // ── Toast ────────────────────────────────────────────────────────────
  function showToast(msg) {
    const toast = document.getElementById('ml5-toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('ml5-visible');
    clearTimeout(_toastTimer);
    _toastTimer = setTimeout(() => toast.classList.remove('ml5-visible'), 2200);
  }

  // ── Ripple ───────────────────────────────────────────────────────────
  function triggerRipple(host, e) {
    if (!host) return;
    const rect = host.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
    const size = Math.max(rect.width, rect.height) * 1.4;
    const ripple = document.createElement('span');
    ripple.className = 'ml5-ripple';
    ripple.style.cssText = `width:${size}px;height:${size}px;left:${x - size / 2}px;top:${y - size / 2}px`;
    host.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
  }

  // ── Sheet helpers (nav-sheet only) ──────────────────────────────────
  const SHEET_IDS = ['ml5-nav-sheet'];

  function openSheet(id) {
    closeAllSheets(false);
    const el = document.getElementById(id);
    if (el) el.classList.add('ml5-open');
    const bd = document.getElementById('ml5-backdrop');
    if (bd) bd.classList.add('ml5-open');
  }

  function closeAllSheets(closeBackdrop = true) {
    SHEET_IDS.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.remove('ml5-open');
    });
    if (closeBackdrop) {
      const bd = document.getElementById('ml5-backdrop');
      if (bd) bd.classList.remove('ml5-open');
    }
    const tab = document.getElementById('ml5-tab-menu');
    if (tab) tab.classList.remove('ml5-active');
  }

  // ── Floating Tool Panel helpers (NO backdrop) ────────────────────────
  function openToolPanel() {
    const panel = document.getElementById('ml5-settings-sheet');
    if (panel) panel.classList.add('ml5-open');
    const tab = document.getElementById('ml5-tab-settings');
    if (tab) tab.classList.add('ml5-active');
    // Close nav sheet if open (no overlap)
    closeAllSheets(true);
  }

  function closeToolPanel() {
    const panel = document.getElementById('ml5-settings-sheet');
    if (panel) panel.classList.remove('ml5-open');
    const tab = document.getElementById('ml5-tab-settings');
    if (tab) tab.classList.remove('ml5-active');
  }

  function isToolPanelOpen() {
    return document.getElementById('ml5-settings-sheet')?.classList.contains('ml5-open') || false;
  }

  // ── Scene grid builder ───────────────────────────────────────────────
  function buildSceneGrid(category) {
    const grid = document.getElementById('ml5-scene-grid');
    if (!grid) return;
    const scenes  = window.TAV_CORE.getScenesByCategory(category);
    const current = window.TAV_CORE.currentScene;
    grid.innerHTML = scenes.map(s => `
      <div class="ml5-scene-card ml5-interactive ml5-ripple-host${s.id === current ? ' ml5-active-scene' : ''}"
           data-action="${s.action}" data-node="${s.action}">
        <img src="${s.thumb}" alt="${s.title}" onerror="this.src='preview.jpg'">
        <div class="ml5-scene-card-body">
          <div class="ml5-scene-card-title">${s.title}</div>
          <div class="ml5-scene-card-sub">${s.sub}</div>
        </div>
      </div>
    `).join('');
  }

  // ── Sync active scene across all UI ─────────────────────────────────
  function syncActiveScene(nodeId) {
    document.querySelectorAll('.ml5-carousel-item').forEach(el => {
      el.classList.toggle('ml5-active', el.dataset.node === nodeId);
    });
    document.querySelectorAll('.ml5-scene-card').forEach(el => {
      el.classList.toggle('ml5-active-scene', el.dataset.node === nodeId);
    });

    // Scroll active item to exact center of track
    const track      = document.getElementById('ml5-carousel-track');
    const activeItem = document.querySelector('.ml5-carousel-item.ml5-active');
    if (track && activeItem) {
      const trackW  = track.offsetWidth;
      const itemW   = activeItem.offsetWidth;
      const scrollL = activeItem.offsetLeft - (trackW / 2) + (itemW / 2);
      track.scrollTo({ left: scrollL, behavior: 'smooth' });
      if (window._ml5RefreshScales) window._ml5RefreshScales();
    }

    const scene = window.TAV_CORE.getSceneById(nodeId);
    if (scene) updateCompass(0);
  }

  // ── High-Performance Carousel Scale & Drag Physics ────────────────────
  function setupCarouselScales() {
    const track = document.getElementById('ml5-carousel-track');
    if (!track) return;

    const UNIT    = 80;
    const MAX_FAR = 2.4;
    let rafPending = false;
    let itemOffsets = [];
    let trackHalfW = 0;

    function cacheGeometry() {
      trackHalfW = track.clientWidth / 2;
      const items = track.querySelectorAll('.ml5-carousel-item');
      itemOffsets = [];
      items.forEach(item => {
        const itemCenter = item.offsetLeft + item.offsetWidth / 2;
        itemOffsets.push({
          el: item,
          centerBase: itemCenter - trackHalfW
        });
      });
    }

    function applyScales() {
      if (!itemOffsets.length || !trackHalfW) cacheGeometry();
      const scrollLeft = track.scrollLeft;
      const len = itemOffsets.length;

      for (let i = 0; i < len; i++) {
        const itemObj = itemOffsets[i];
        const dist = Math.abs(itemObj.centerBase - scrollLeft);
        const n = Math.min(dist / UNIT, MAX_FAR) / MAX_FAR;
        const st = n * n * (3 - 2 * n); // Smoothstep S-curve
        const scale = (1.0 - st * 0.28).toFixed(3);
        const opacity = (1.0 - st * 0.52).toFixed(3);

        itemObj.el.style.transform = `scale3d(${scale}, ${scale}, 1)`;
        itemObj.el.style.opacity   = opacity;
      }
      rafPending = false;
    }

    function onScroll() {
      if (!rafPending) {
        rafPending = true;
        requestAnimationFrame(applyScales);
      }
    }

    track.addEventListener('scroll', onScroll, { passive: true });

    if (window.ResizeObserver) {
      const ro = new ResizeObserver(() => {
        cacheGeometry();
        applyScales();
      });
      ro.observe(track);
    }

    window._ml5RefreshScales = () => {
      cacheGeometry();
      requestAnimationFrame(applyScales);
    };

    cacheGeometry();
    requestAnimationFrame(applyScales);

    // Setup smooth drag & momentum
    setupCarouselDrag(track);
  }

  function setupCarouselDrag(track) {
    if (!track) return;
    let isDown = false;
    let startX = 0;
    let startScrollLeft = 0;
    let velX = 0;
    let lastX = 0;
    let lastTime = 0;
    let momentumRaf = null;

    track.addEventListener('pointerdown', e => {
      if (e.button !== undefined && e.button !== 0) return;
      isDown = true;
      startX = e.clientX;
      startScrollLeft = track.scrollLeft;
      lastX = e.clientX;
      lastTime = performance.now();
      velX = 0;
      if (momentumRaf) cancelAnimationFrame(momentumRaf);
    }, { passive: true });

    track.addEventListener('pointermove', e => {
      if (!isDown) return;
      const x = e.clientX;
      const now = performance.now();
      const dx = x - startX;
      track.scrollLeft = startScrollLeft - dx;

      const dt = now - lastTime;
      if (dt > 0) {
        const currentVel = (x - lastX) / dt;
        velX = velX * 0.4 + currentVel * 0.6;
      }
      lastX = x;
      lastTime = now;
    }, { passive: true });

    const endDrag = () => {
      if (!isDown) return;
      isDown = false;
      if (momentumRaf) cancelAnimationFrame(momentumRaf);

      const item = track.querySelector('.ml5-carousel-item');
      const itemStep = item ? item.offsetWidth + 8 : 80;
      const deltaX = track.scrollLeft - startScrollLeft;

      let targetScroll = startScrollLeft;
      if (deltaX > 15 || velX < -0.1) {
        targetScroll = startScrollLeft + itemStep;
      } else if (deltaX < -15 || velX > 0.1) {
        targetScroll = startScrollLeft - itemStep;
      } else {
        smoothSnapToNearest(track);
        return;
      }
      track.scrollTo({ left: targetScroll, behavior: 'smooth' });
    };

    track.addEventListener('pointerup', endDrag, { passive: true });
    track.addEventListener('pointercancel', endDrag, { passive: true });
  }

  function smoothSnapToNearest(track) {
    if (!track) return;
    const items = track.querySelectorAll('.ml5-carousel-item');
    if (!items.length) return;

    const trackHalfW = track.clientWidth / 2;
    const scrollCenter = track.scrollLeft + trackHalfW;
    let closestItem = null;
    let minDistance = Infinity;

    items.forEach(item => {
      const itemCenter = item.offsetLeft + item.offsetWidth / 2;
      const dist = Math.abs(itemCenter - scrollCenter);
      if (dist < minDistance) {
        minDistance = dist;
        closestItem = item;
      }
    });

    if (closestItem) {
      const targetScrollLeft = closestItem.offsetLeft + closestItem.offsetWidth / 2 - trackHalfW;
      track.scrollTo({ left: targetScrollLeft, behavior: 'smooth' });
    }
  }

  // ── Compass ──────────────────────────────────────────────────────────
  function startCompassSync() {
    function tick() {
      const pano = window.TAV_CORE.getPano();
      if (pano && typeof pano.getPan === 'function') {
        const pan = pano.getPan() || 0;
        const dial = document.querySelector('#ml5-compass .ml5-compass-dial');
        if (dial) dial.style.transform = `rotate(${-pan}deg)`;
        const cone = document.getElementById('ml5-minimap-cone');
        if (cone) cone.style.transform = `translate(-50%, -100%) rotate(${pan}deg)`;
      }
      _compassRaf = requestAnimationFrame(tick);
    }
    tick();
  }

  function updateCompass(pan) {
    const dial = document.querySelector('#ml5-compass .ml5-compass-dial');
    if (dial) dial.style.transform = `rotate(${-pan}deg)`;
  }

  // ── Minimap ──────────────────────────────────────────────────────────
  function toggleMinimap(open) {
    _isMapOpen = open !== undefined ? open : !_isMapOpen;
    const card = document.getElementById('ml5-minimap-card');
    const tab  = document.getElementById('ml5-tab-map');
    if (card) card.classList.toggle('ml5-open', _isMapOpen);
    if (tab)  tab.classList.toggle('ml5-active', _isMapOpen);
  }

  function updateMinimapTransform() {
    const img = document.getElementById('ml5-minimap-img');
    if (img) img.style.transform = `translate(${_mapX}px, ${_mapY}px) scale(${_mapZoom})`;
  }

  function initMinimapDrag() {
    const vp = document.getElementById('ml5-minimap-viewport');
    if (!vp) return;
    vp.addEventListener('touchstart', e => {
      _mapDragging = true;
      _mapDragSX = e.touches[0].clientX - _mapX;
      _mapDragSY = e.touches[0].clientY - _mapY;
    }, { passive: true });
    vp.addEventListener('touchmove', e => {
      if (!_mapDragging) return;
      _mapX = e.touches[0].clientX - _mapDragSX;
      _mapY = e.touches[0].clientY - _mapDragSY;
      updateMinimapTransform();
    }, { passive: true });
    vp.addEventListener('touchend', () => { _mapDragging = false; }, { passive: true });
    const zi = document.getElementById('ml5-zoom-in');
    const zo = document.getElementById('ml5-zoom-out');
    if (zi) zi.addEventListener('click', () => { _mapZoom = Math.min(_mapZoom + 0.3, 3); updateMinimapTransform(); });
    if (zo) zo.addEventListener('click', () => { _mapZoom = Math.max(_mapZoom - 0.3, 0.7); updateMinimapTransform(); });
  }

  // ── Audio sync ───────────────────────────────────────────────────────
  function syncAudioBtn() {
    const tab = document.getElementById('ml5-tab-audio');
    if (!tab) return;
    tab.classList.toggle('ml5-active', !window.TAV_CORE.isMusicMuted);
  }

  // ── Desktop UI hide ──────────────────────────────────────────────────
  function hideDesktopUI() {
    let style = document.getElementById('ml5-desktop-hide');
    if (!style) {
      style = document.createElement('style');
      style.id = 'ml5-desktop-hide';
      style.innerHTML = `@media screen and (max-width: 1024px) {
        #modern-ui-container, #modern-ui-overlay, #ui-wrapper, #minimap-widget, #compass-widget,
        .layout-switcher-wrapper, .bottom-nav-container, .vertical-tool-stack,
        .sidebar-container, .gradient-floating-logo, .cmd-top-ribbon,
        .prism-nav-container, .prism-dock, .prism-header-pill, .prism-bottom-dock,
        .modern-header-pill, #modern-dock-container, .prism-dock-container,
        .prism-nav-wrapper, .prism-tool-container, .neo-unified-trigger,
        .blueprint-floating-gallery-container, #mobile-ui-overlay,
        #ml2-overlay, #ml3-overlay, #ml4-overlay, #ml6-overlay { display: none !important; }
      }`;
      document.head.appendChild(style);
    }
  }

  // ── Bind all events ──────────────────────────────────────────────────
  function bindEvents(overlay) {

    // ── Carousel: tap to navigate ──────────────────────────────────────
    const track = document.getElementById('ml5-carousel-track');
    if (track) {
      let _tapStartX = 0;
      let _tapMoved  = false;
      track.addEventListener('touchstart', e => {
        _tapStartX = e.touches[0].clientX;
        _tapMoved  = false;
      }, { passive: true });
      track.addEventListener('touchmove', e => {
        if (Math.abs(e.touches[0].clientX - _tapStartX) > 8) _tapMoved = true;
      }, { passive: true });
      track.addEventListener('touchend', e => {
        if (_tapMoved) return;
        const touch = e.changedTouches[0];
        const el    = document.elementFromPoint(touch.clientX, touch.clientY);
        const card  = el ? el.closest('.ml5-carousel-item') : null;
        if (card && card.dataset.action) {
          window.TAV_CORE.navigateTo(card.dataset.action);
          showToast(card.querySelector('.ml5-carousel-item-title')?.textContent || '');
          card.classList.add('ml5-pulse');
          card.addEventListener('animationend', () => card.classList.remove('ml5-pulse'), { once: true });
        }
      }, { passive: true });
      track.addEventListener('click', e => {
        const card = e.target.closest('.ml5-carousel-item');
        if (card && card.dataset.action) {
          window.TAV_CORE.navigateTo(card.dataset.action);
          showToast(card.querySelector('.ml5-carousel-item-title')?.textContent || '');
        }
      });
    }

    // ── Dock: Menu ────────────────────────────────────────────────────
    const tabMenu = document.getElementById('ml5-tab-menu');
    if (tabMenu) tabMenu.addEventListener('click', () => {
      const isOpen = document.getElementById('ml5-nav-sheet')?.classList.contains('ml5-open');
      if (isOpen) { closeAllSheets(); return; }
      closeToolPanel();
      buildSceneGrid(_activeCategory);
      openSheet('ml5-nav-sheet');
      tabMenu.classList.add('ml5-active');
    });

    // ── Dock: Map ─────────────────────────────────────────────────────
    const tabMap = document.getElementById('ml5-tab-map');
    if (tabMap) tabMap.addEventListener('click', () => toggleMinimap());

    // ── Dock: FAB home ────────────────────────────────────────────────
    const fabBtn = document.getElementById('ml5-fab');
    if (fabBtn) fabBtn.addEventListener('click', () => {
      window.TAV_CORE.navigateTo('node1');
      fabBtn.classList.add('ml5-pulse');
      fabBtn.addEventListener('animationend', () => fabBtn.classList.remove('ml5-pulse'), { once: true });
    });

    // ── Dock: Settings → floating tool panel (NO backdrop) ───────────
    const tabSettings = document.getElementById('ml5-tab-settings');
    if (tabSettings) tabSettings.addEventListener('click', () => {
      if (isToolPanelOpen()) { closeToolPanel(); return; }
      openToolPanel();
    });

    // ── Dock: Audio ───────────────────────────────────────────────────
    const tabAudio = document.getElementById('ml5-tab-audio');
    if (tabAudio) tabAudio.addEventListener('click', () => {
      window.TAV_CORE.toggleMusic();
      syncAudioBtn();
    });

    // ── Category chips ────────────────────────────────────────────────
    const catTabsEl = document.getElementById('ml5-cat-tabs');
    if (catTabsEl) catTabsEl.addEventListener('click', e => {
      const btn = e.target.closest('.ml5-cat-tab');
      if (!btn) return;
      _activeCategory = btn.dataset.cat;
      document.querySelectorAll('.ml5-cat-tab').forEach(b => b.classList.remove('ml5-active'));
      btn.classList.add('ml5-active');
      buildSceneGrid(_activeCategory);
    });

    // ── Scene grid tap ────────────────────────────────────────────────
    const sceneGrid = document.getElementById('ml5-scene-grid');
    if (sceneGrid) sceneGrid.addEventListener('click', e => {
      const card = e.target.closest('.ml5-scene-card');
      if (!card || !card.dataset.action) return;
      triggerRipple(card, e);
      window.TAV_CORE.navigateTo(card.dataset.action);
      const scene = window.TAV_CORE.scenes.find(s => s.action === card.dataset.action);
      if (scene) showToast(scene.title);
      setTimeout(() => closeAllSheets(), 250);
    });

    // ── Tool panel buttons ────────────────────────────────────────────
    const toolPanel = document.getElementById('ml5-settings-sheet');
    if (toolPanel) {
      toolPanel.addEventListener('click', e => {
        const btn = e.target.closest('.ml5-tp-btn');
        if (!btn) return;
        triggerRipple(btn, e);
        const action = btn.dataset.action;

        if (action === 'hotspots') {
          _isHotspotsVis = !_isHotspotsVis;
          const pano = window.TAV_CORE.getPano();
          document.body.classList.toggle('hide-hotspots', !_isHotspotsVis);
          if (pano && typeof pano.setPointHotspotsVisible === 'function') {
            pano.setPointHotspotsVisible(_isHotspotsVis);
          }
          const hotspots = document.querySelectorAll(".hologram-marker-container, .hs-container");
          hotspots.forEach(hs => {
            hs.style.visibility = _isHotspotsVis ? "visible" : "hidden";
            hs.style.opacity = _isHotspotsVis ? "" : "0";
          });

          document.querySelectorAll('[data-action="hotspots"]').forEach(b =>
            b.classList.toggle('ml5-active-tool', _isHotspotsVis)
          );
          
          const toastB = _isHotspotsVis ? "Hotspot: B\u1eadt" : "Hotspot: T\u1eaft";
          showToast(toastB);

        } else if (action === 'gallery') {
          closeToolPanel();
          if (typeof window.openGlobalPanoramaGallery === 'function') {
            window.openGlobalPanoramaGallery();
          } else {
            const galleryModal = document.getElementById('image-gallery-modal');
            if (galleryModal) galleryModal.classList.add('active');
          }

        } else if (action === 'autorotate') {
          let isAct = false;
          if (typeof window.toggleCustomAutorotate === 'function') {
            isAct = window.toggleCustomAutorotate();
          } else if (window.TAV_CORE) {
            window.TAV_CORE.navigateTo('autorotate');
            isAct = !!window.customAutoRotateActive;
          }
          showToast(isAct ? "Xoay tự động: Bật" : "Xoay tự động: Tắt");

        } else if (action === 'fullscreen') {
          window.TAV_CORE.navigateTo('fullscreen');

        } else if (action === 'share') {
          if (navigator.share) {
            navigator.share({ title: 'TAV VILLA Virtual Tour', url: window.location.href }).catch(() => {});
          } else if (navigator.clipboard) {
            navigator.clipboard.writeText(window.location.href).then(() => {
              const toastS = "\u00e3 sao ch\u00e9p li\u00ean k\u1ebft";
              showToast(toastS);
            });
          }

        } else if (action === 'info') {
          showToast('TAV VILLA — Virtual Tour');

        } else if (action === 'region') {
          closeToolPanel();
          const regionPage = document.getElementById('region-page');
          if (regionPage) {
            document.body.classList.add('region-mode-active');
            document.querySelector('.region-hamburger')?.classList.remove('open');
            document.getElementById('region-menu-collapsible')?.classList.remove('open');
          }
        }
      });
    }

    // ── Layout switcher (data-layout-switch on ml5-tp-sw buttons) ─────
    overlay.addEventListener('click', e => {
      const pill = e.target.closest('[data-layout-switch]');
      if (!pill) return;
      const lid = pill.dataset.layoutSwitch;
      if (lid && window.switchMobileLayout) window.switchMobileLayout(lid);
    });

    // ── Compass reset ─────────────────────────────────────────────────
    const compass = document.getElementById('ml5-compass');
    if (compass) compass.addEventListener('click', () => {
      const pano = window.TAV_CORE.getPano();
      if (pano && typeof pano.setPan === 'function') pano.setPan(0);
      compass.classList.add('ml5-pulse');
      compass.addEventListener('animationend', () => compass.classList.remove('ml5-pulse'), { once: true });
    });

    // ── Minimap close & Engine ────────────────────────────────────────
    const mapClose = document.getElementById('ml5-map-close');
    if (mapClose) mapClose.addEventListener('click', () => toggleMinimap(false));

    const mapViewport5 = document.getElementById('ml5-minimap-viewport');
    if (mapViewport5 && window.MobileMinimapEngine) {
      const mapCtrl5 = window.MobileMinimapEngine.setupMap(mapViewport5);
      document.getElementById('ml5-zoom-in')?.addEventListener('click', (e) => { e.stopPropagation(); mapCtrl5?.zoomIn(); });
      document.getElementById('ml5-zoom-out')?.addEventListener('click', (e) => { e.stopPropagation(); mapCtrl5?.zoomOut(); });
    }

    // ── Sheet close buttons ───────────────────────────────────────────
    ['ml5-nav-close'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('click', closeAllSheets);
    });

    // ── Backdrop closes nav/region sheets ─────────────────────────────
    const backdrop = document.getElementById('ml5-backdrop');
    if (backdrop) backdrop.addEventListener('click', closeAllSheets);

    // ── Logo pill → home ──────────────────────────────────────────────
    const logoPill = document.getElementById('ml5-logo-btn');
    if (logoPill) logoPill.addEventListener('click', () => window.TAV_CORE.navigateTo('node1'));

    // ── Ripple on ripple-host elements ────────────────────────────────
    overlay.addEventListener('touchstart', e => {
      const host = e.target.closest('.ml5-ripple-host');
      if (host) triggerRipple(host, e);
    }, { passive: true });
  }

  // ── Start scene sync ─────────────────────────────────────────────────
  function startSync() {
    window.TAV_CORE.onSceneChange(nodeId => syncActiveScene(nodeId));
    const cur = window.TAV_CORE.currentScene;
    if (cur) syncActiveScene(cur);
  }

  // ── Fix height (iOS safe area) ────────────────────────────────────────
  function fixHeight() {
    const ov = document.getElementById('ml5-overlay');
    if (ov) ov.style.height = window.innerHeight + 'px';
  }

  // ════════════════════════════════════════════════════════════════════
  //  PUBLIC API
  // ════════════════════════════════════════════════════════════════════
  window.MobileLayout5 = {

    init() {
      if (_initialized) return;
      if (!window.TAV_CORE) {
        console.error('[MobileLayout5] TAV_CORE not available');
        return;
      }
      _initialized = true;

      hideDesktopUI();

      const overlay = document.createElement('div');
      overlay.id = 'ml5-overlay';
      overlay.innerHTML = buildDOM();
      document.body.appendChild(overlay);

      fixHeight();
      window.addEventListener('resize', fixHeight);

      const cats = window.TAV_CORE.getCategories();
      if (cats.length) buildSceneGrid(cats[0]);

      initMinimapDrag();
      startCompassSync();
      bindEvents(overlay);
      startSync();
      syncAudioBtn();
      setupCarouselScales();

      console.log('[MobileLayout5] Initialized — Neo Light Glass theme');
    },

    destroy() {
      _initialized = false;
      if (_compassRaf) { cancelAnimationFrame(_compassRaf); _compassRaf = null; }
      if (_toastTimer) clearTimeout(_toastTimer);

      document.querySelectorAll('#ml5-overlay').forEach(el => el.remove());
      document.querySelectorAll('#ml5-desktop-hide').forEach(el => el.remove());

      window.removeEventListener('resize', fixHeight);
      window._ml5RefreshScales = null;

      _isMapOpen = false;
      _mapZoom   = 1;
      _mapX      = 0;
      _mapY      = 0;

      console.log('[MobileLayout5] Destroyed');
    }
  };

})();
