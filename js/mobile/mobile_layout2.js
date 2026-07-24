/**
 * mobile_layout2.js — TAV Virtual Tour · Mobile Layout 2 Controller
 * ============================================================
 * Premium mobile-first UI inspired by Desktop Layout 5 (Neo)
 *
 * Architecture:
 *   - Reads ALL data from window.TAV_CORE (Shared Core)
 *   - Never declares its own scene data or audio logic
 *   - Fully self-contained DOM (prefix: ml2-)
 *   - Exposes: window.MobileLayout2 = { init, destroy }
 *
 * Features:
 *   ① Floating bottom dock (5 tabs + center FAB)
 *   ② Scene browser (full bottom sheet, category filters, grid)
 *   ③ Mini map (floating collapsible card)
 *   ④ Compass (floating top-right, syncs with pano pan)
 *   ⑤ More tools sheet (hotspots, share, info, region, layout switch)
 *   ⑥ Touch interactions (ripple, scale, glow pulse)
 *   ⑦ Active scene tracking via TAV_CORE.onSceneChange
 * ============================================================
 */

(function () {
  'use strict';

  // ── Internal state ────────────────────────────────────────
  let _overlay      = null;
  // Force absolute height to fix mobile viewport bugs
  function _fixHeight() {
    if (_overlay) {
      _overlay.style.height = '100%';
      _overlay.style.height = '100dvh';
    }
  }
  let _activeSheet  = null;
  let _syncInterval = null;
  let _activeScene  = null;
  let _isHotspotsVisible = true;
  let _mapZoom = 1;
  let _mapX    = -20;
  let _mapY    = -20;
  let _mapDragging    = false;
  let _mapDragStartX  = 0;
  let _mapDragStartY  = 0;
  let _minimapOpen    = false;
  let _galleryOpen    = false;

  // ── SVG icons ─────────────────────────────────────────────
  const ICONS = {
    scenes:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>`,
    map:       `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/></svg>`,
    gallery:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>`,
    audio:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`,
    audioMute: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="1" y1="1" x2="23" y2="23"/><path d="M9 9v9"/><path d="M9 5.732L21 3.268M21 17.732v-2.464"/></svg>`,
    more:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 15a3 3 0 100-6 3 3 0 000 6z"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg>`,
    close:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
    hotspot:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>`,
    share:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>`,
    info:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4" stroke-linecap="round"/><circle cx="12" cy="8" r="1" fill="currentColor" stroke="none"/></svg>`,
    region:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"/></svg>`,
    contact:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.63a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .91h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>`,
    autorotate:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>`,
    fullscreen:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3"/></svg>`,
    layout:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>`,
  };

  // ── DOM Builder ───────────────────────────────────────────
  function buildDOM() {
    const core   = window.TAV_CORE;
    const scenes  = core.scenes;

    // ─ Compass SVG
    const compassSVG = `
      <svg class="ml2-compass-dial" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="44" class="ml2-compass-ring"/>
        <g id="ml2-compass-needle" style="transform-origin:50px 50px; transition:transform 0.15s linear;">
          <polygon class="ml2-compass-north" points="50,15 58,50 50,55 42,50"/>
          <polygon class="ml2-compass-south" points="50,85 58,50 50,55 42,50"/>
        </g>
        <text x="50" y="10" text-anchor="middle" fill="#7C3AED" font-size="10" font-weight="800" font-family="Inter,sans-serif">N</text>
      </svg>`;

    // ─ Scene cards HTML
    const categories = core.getCategories();
    const allSceneCards = scenes.map(s => `
      <div class="ml2-scene-card ml2-interactive" data-action="${s.action}" data-node="${s.action}" data-category="${s.category}">
        ${s.thumb
          ? `<img class="ml2-scene-thumb" src="${s.thumb}" alt="${s.title}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
          : ''}
        <div class="ml2-scene-thumb-placeholder" style="${s.thumb ? 'display:none' : ''}">🏠</div>
        <div class="ml2-scene-info">
          <div class="ml2-scene-name">${s.title}</div>
          <div class="ml2-scene-sub">${s.sub}</div>
        </div>
      </div>`).join('');

    // ─ Category filter pills
    const catPills = ['ALL', ...categories].map((cat, i) => `
      <button class="ml2-cat-pill ml2-interactive ${i === 0 ? 'ml2-active' : ''}" data-cat="${cat}">${cat}</button>
    `).join('');

    // ─ Tools sheet items
    const toolItems = [
      { action: 'hotspots',   icon: ICONS.hotspot,    label: 'Điểm chạm',   id: 'ml2-tool-hotspot' },
      { action: 'gallery',    icon: ICONS.gallery,    label: 'Thư viện',    id: 'ml2-tool-gallery' },
      { action: 'share',      icon: ICONS.share,      label: 'Chia sẻ',     id: 'ml2-tool-share' },
      { action: 'info',       icon: ICONS.info,       label: 'Thông tin',   id: 'ml2-tool-info' },
      { action: 'region',     icon: ICONS.region,     label: 'L.Kết Vùng',  id: 'ml2-tool-region' },
      { action: 'contact',    icon: ICONS.contact,    label: 'Liên hệ',     id: 'ml2-tool-contact' },
      { action: 'fullscreen', icon: ICONS.fullscreen, label: 'Toàn màn',    id: 'ml2-tool-fullscreen' },
    ].map(t => `
      <div class="ml2-tool-item ml2-interactive ${t.action === 'hotspots' ? 'ml2-tool-active active active-tool' : ''}" data-action="${t.action}" id="${t.id}">
        <div class="ml2-ripple-container"></div>
        ${t.icon}
        <span class="ml2-tool-label">${t.label}</span>
      </div>`).join('');

    // ─ Full HTML
    return `
      <!-- ① Top Strip: Logo + Compass -->
      <div class="ml2-top-strip">
        <div class="ml2-logo-pill ml2-interactive" id="ml2-logo">
          <div>
            <div class="ml2-logo-title">TAV</div>
            <div class="ml2-logo-sub">V I L L A</div>
          </div>
          <div class="ml2-logo-divider"></div>
          <div class="ml2-layout-badge ml2-interactive" id="ml2-layout-badge-top">
            ${ICONS.layout}
            <span>ML2</span>
          </div>
        </div>
        <div class="ml2-compass ml2-interactive" id="ml2-compass" title="Nhấn để reset hướng nhìn">
          ${compassSVG}
        </div>
      </div>

      <!-- ② Scene change toast -->
      <div class="ml2-scene-toast" id="ml2-scene-toast"></div>

      <!-- ③ Minimap card -->
      <div class="ml2-minimap-card" id="ml2-minimap-card">
        <div class="ml2-minimap-header">
          <span class="ml2-minimap-label">Mini Map</span>
          <div class="ml2-minimap-close-btn ml2-interactive" id="ml2-minimap-close">${ICONS.close}</div>
        </div>
        <div class="ml2-minimap-viewport" id="ml2-minimap-viewport">
          <img src="image/Map_optimized.jpg" id="ml2-minimap-img" class="ml2-minimap-img" alt="Map">
          <div class="ml2-minimap-radar" id="ml2-minimap-radar">
            <div class="ml2-minimap-cone" id="ml2-minimap-cone"></div>
            <div class="ml2-minimap-dot"></div>
          </div>
        </div>
        <div class="ml2-minimap-zoom">
          <button class="ml2-minimap-zoom-btn ml2-interactive" id="ml2-zoom-in">+</button>
          <button class="ml2-minimap-zoom-btn ml2-interactive" id="ml2-zoom-out">−</button>
        </div>
      </div>



      <!-- ⑤ Floating Bottom Dock -->
      <nav class="ml2-dock ml2-interactive" id="ml2-dock" role="navigation" aria-label="Main navigation">
        <!-- Tab: Scenes -->
        <button class="ml2-dock-tab ml2-interactive" id="ml2-tab-scenes" aria-label="Browse Scenes">
          <div class="ml2-ripple-container"></div>
          ${ICONS.scenes}
          <span>Cảnh</span>
        </button>
        <!-- Tab: Map -->
        <button class="ml2-dock-tab ml2-interactive" id="ml2-tab-map" aria-label="Mini Map">
          <div class="ml2-ripple-container"></div>
          ${ICONS.map}
          <span>Bản đồ</span>
        </button>
        <!-- Center FAB -->
        <button class="ml2-dock-fab ml2-interactive" id="ml2-fab" aria-label="Open menu">
          <div class="ml2-ripple-container"></div>
          ${ICONS.more}
        </button>
        <!-- Tab: Gallery -->
        <button class="ml2-dock-tab ml2-interactive" id="ml2-tab-gallery" aria-label="Gallery">
          <div class="ml2-ripple-container"></div>
          ${ICONS.gallery}
          <span>Hình ảnh</span>
        </button>
        <!-- Tab: Audio -->
        <button class="ml2-dock-tab ml2-interactive" id="ml2-tab-audio" aria-label="Audio">
          <div class="ml2-ripple-container"></div>
          <span id="ml2-audio-icon">${ICONS.audio}</span>
          <span id="ml2-audio-label">Âm nhạc</span>
        </button>
      </nav>


      <!-- ⑥ Backdrop -->
      <div class="ml2-backdrop" id="ml2-backdrop"></div>

      <!-- ⑦ Scene Browser Sheet -->
      <div class="ml2-scene-sheet" id="ml2-scene-sheet" role="dialog" aria-label="Browse Scenes">
        <div class="ml2-sheet-handle" id="ml2-scene-handle"></div>
        <div class="ml2-sheet-header">
          <span class="ml2-sheet-title">Chọn Cảnh</span>
          <div class="ml2-sheet-close ml2-interactive" id="ml2-scene-close">${ICONS.close}</div>
        </div>
        <div class="ml2-category-pills">
          ${catPills}
        </div>
        <div class="ml2-scene-grid" id="ml2-scene-grid">
          ${allSceneCards}
        </div>
      </div>

      <!-- ⑧ Compact Tools Popup -->
      <div class="ml2-tools-popup" id="ml2-tools-sheet" role="dialog" aria-label="Tools">
        <div class="ml2-tools-grid">
          ${toolItems}
        </div>
        <div class="ml2-layout-switcher-row">
          <span class="ml2-layout-switcher-label">Giao di\u1ec7n:</span>
          <div class="ml2-layout-pills">
            <button class="ml2-layout-pill-btn ml2-interactive" id="ml2-switch-to-l1">L1</button>
            <button class="ml2-layout-pill-btn ml2-active ml2-interactive" id="ml2-switch-to-l2">L2</button>
            <button class="ml2-layout-pill-btn ml2-interactive" id="ml2-switch-to-l3">L3</button>
            <button class="ml2-layout-pill-btn ml2-interactive" id="ml2-switch-to-l4">L4</button>
            <button class="ml2-layout-pill-btn ml2-interactive" id="ml2-switch-to-l5">L5</button>
            <button class="ml2-layout-pill-btn ml2-interactive" id="ml2-switch-to-l6">L6</button>
          </div>
        </div>
      </div>
    `;
  }

  // ── Ripple effect ─────────────────────────────────────────
  function addRipple(el, e) {
    const container = el.querySelector('.ml2-ripple-container');
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = (e.clientX || (e.touches && e.touches[0].clientX) || rect.left + rect.width / 2) - rect.left;
    const y = (e.clientY || (e.touches && e.touches[0].clientY) || rect.top + rect.height / 2) - rect.top;
    const ripple = document.createElement('div');
    ripple.className = 'ml2-ripple';
    ripple.style.cssText = `left:${x}px;top:${y}px;width:${rect.width}px;height:${rect.width}px;margin-left:-${rect.width/2}px;margin-top:-${rect.width/2}px`;
    container.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  }

  function openSheet(sheetId) {
    closeAllSheets();
    const sheet = document.getElementById(sheetId);
    if (!sheet) return;
    sheet.classList.add('ml2-open');
    
    // Do not show backdrop for tools popup as it's a compact floating menu now
    if (sheetId !== 'ml2-tools-sheet') {
      document.getElementById('ml2-backdrop').classList.add('ml2-open');
    }
    
    _activeSheet = sheetId;

    // Drag-to-close
    const handle = sheet.querySelector('.ml2-sheet-handle');
    if (handle) _attachDragClose(sheet, handle);

    // Scroll active scene card into view if opening the scene sheet
    if (sheetId === 'ml2-scene-sheet') {
      setTimeout(() => {
        const activeCard = sheet.querySelector('.ml2-active-scene');
        if (activeCard) {
          activeCard.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
        }
      }, 150);
    }
  }

  function closeAllSheets() {
    ['ml2-scene-sheet', 'ml2-tools-sheet'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.remove('ml2-open');
    });
    const bd = document.getElementById('ml2-backdrop');
    if (bd) bd.classList.remove('ml2-open');
    _activeSheet = null;
  }

  function _attachDragClose(sheet, handle) {
    let startY = 0;
    const onTouchStart = e => { startY = e.touches[0].clientY; };
    const onTouchMove  = e => {
      const delta = e.touches[0].clientY - startY;
      if (delta > 0) sheet.style.transform = `translateY(${delta}px)`;
    };
    const onTouchEnd   = e => {
      sheet.style.transform = '';
      if (e.changedTouches[0].clientY - startY > 60) closeAllSheets();
      handle.removeEventListener('touchstart', onTouchStart);
      handle.removeEventListener('touchmove', onTouchMove);
      handle.removeEventListener('touchend', onTouchEnd);
    };
    handle.addEventListener('touchstart', onTouchStart, { passive: true });
    handle.addEventListener('touchmove', onTouchMove, { passive: true });
    handle.addEventListener('touchend', onTouchEnd);
  }

  // ── Scene toast ───────────────────────────────────────────
  let _toastTimer = null;
  function showSceneToast(title) {
    const toast = document.getElementById('ml2-scene-toast');
    if (!toast) return;
    toast.textContent = title;
    toast.classList.add('ml2-visible');
    clearTimeout(_toastTimer);
    _toastTimer = setTimeout(() => toast.classList.remove('ml2-visible'), 2500);
  }

  // ── Minimap ───────────────────────────────────────────────
  function toggleMinimap() {
    _minimapOpen = !_minimapOpen;
    const card = document.getElementById('ml2-minimap-card');
    if (card) card.classList.toggle('ml2-open', _minimapOpen);
    const tab = document.getElementById('ml2-tab-map');
    if (tab) tab.classList.toggle('ml2-active', _minimapOpen);
  }

  function updateMinimapTransform() {
    const img = document.getElementById('ml2-minimap-img');
    if (img) img.style.transform = `translate(${_mapX}px, ${_mapY}px) scale(${_mapZoom})`;
  }

  function initMinimapDrag() {
    const vp = document.getElementById('ml2-minimap-viewport');
    if (!vp) return;

    vp.addEventListener('touchstart', e => {
      _mapDragging   = true;
      _mapDragStartX = e.touches[0].clientX - _mapX;
      _mapDragStartY = e.touches[0].clientY - _mapY;
    }, { passive: true });

    vp.addEventListener('touchmove', e => {
      if (!_mapDragging) return;
      _mapX = e.touches[0].clientX - _mapDragStartX;
      _mapY = e.touches[0].clientY - _mapDragStartY;
      updateMinimapTransform();
    }, { passive: true });

    vp.addEventListener('touchend', () => { _mapDragging = false; });
  }

  // ── Category filter ───────────────────────────────────────
  function filterScenes(cat) {
    const cards = document.querySelectorAll('#ml2-scene-grid .ml2-scene-card');
    cards.forEach(card => {
      const match = cat === 'ALL' || card.dataset.category === cat;
      card.style.display = match ? '' : 'none';
    });
    document.querySelectorAll('.ml2-cat-pill').forEach(p => {
      p.classList.toggle('ml2-active', p.dataset.cat === cat);
    });
  }


  // ── Audio toggle ──────────────────────────────────────────
  function syncAudioButton() {
    const isMuted = window.TAV_CORE.isMusicMuted;
    const iconEl  = document.getElementById('ml2-audio-icon');
    const labelEl = document.getElementById('ml2-audio-label');
    const tab     = document.getElementById('ml2-tab-audio');
    if (iconEl)  iconEl.innerHTML   = isMuted ? ICONS.audioMute : ICONS.audio;
    if (labelEl) labelEl.textContent = isMuted ? 'Tắt nhạc'   : 'Âm nhạc';
    if (tab)     tab.classList.toggle('ml2-active', !isMuted);
  }

  // ── Scene sync ────────────────────────────────────────────
  function syncActiveScene(nodeId) {
    if (!nodeId || nodeId === _activeScene) return;
    _activeScene = nodeId;

    // Update scene grid active state
    document.querySelectorAll('#ml2-scene-grid .ml2-scene-card').forEach(card => {
      const isActive = card.dataset.node === nodeId;
      card.classList.toggle('ml2-active-scene', isActive);
      if (isActive) {
        // Only scroll into view if the scene sheet is open to prevent page layout shifting/scrolling on load
        const sheet = document.getElementById('ml2-scene-sheet');
        if (sheet && sheet.classList.contains('ml2-open')) {
          card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
        }
        const scene = window.TAV_CORE.getSceneById(nodeId);
        if (scene) showSceneToast(scene.title);
      }
    });
  }

  // ── Compass sync ──────────────────────────────────────────
  function syncCompass(pan) {
    const needle = document.getElementById('ml2-compass-needle');
    if (needle) needle.style.transform = `rotate(${-pan}deg)`;
    const cone = document.getElementById('ml2-minimap-cone');
    if (cone) cone.style.transform = `translate(-50%, -100%) rotate(${pan}deg)`;
  }

  // ── pano polling ──────────────────────────────────────────
  function startSync() {
    _syncInterval = setInterval(() => {
      const pano = window.TAV_CORE.getPano();
      if (!pano) return;
      if (typeof pano.getPan  === 'function') syncCompass(pano.getPan());
      if (typeof pano.getCurrentNode === 'function') syncActiveScene(pano.getCurrentNode());
    }, 100);
  }

  // ── Action dispatcher ─────────────────────────────────────
  function dispatch(action, el, event) {
    const core = window.TAV_CORE;

    // Scene navigation
    if (action.startsWith('node') || action.startsWith('architecture-')) {
      core.navigateTo(action);
      closeAllSheets();
      return;
    }

    switch (action) {
      case 'autorotate': {
        let isAct = false;
        if (typeof window.toggleCustomAutorotate === 'function') {
          isAct = window.toggleCustomAutorotate();
        } else if (core) {
          core.navigateTo('autorotate');
          isAct = !!window.customAutoRotateActive;
        }
        showToast(isAct ? "Xoay tự động: Bật" : "Xoay tự động: Tắt");
        closeAllSheets();
        break;
      }

      case 'fullscreen':
        core.navigateTo('fullscreen');
        closeAllSheets();
        break;

      case 'gallery':
        closeAllSheets();
        if (typeof window.openGlobalPanoramaGallery === 'function') {
          window.openGlobalPanoramaGallery();
        } else {
          // Fallback if the global function isn't ready
          const galleryModal = document.getElementById('image-gallery-modal');
          if (galleryModal) galleryModal.classList.add('active');
        }
        break;

      case 'hotspots': {
        const isHidden = document.body.classList.contains('hide-hotspots');
        const newVisible = isHidden;
        document.body.classList.toggle('hide-hotspots', !newVisible);
        
        if (window.pano && typeof window.pano.setPointHotspotsVisible === 'function') {
          window.pano.setPointHotspotsVisible(newVisible);
        }
        
        const hotspots = document.querySelectorAll(".hologram-marker-container, .hs-container");
        hotspots.forEach(hs => {
          hs.style.visibility = newVisible ? "visible" : "hidden";
          hs.style.opacity = newVisible ? "" : "0";
        });
        
        if (el) el.classList.toggle('ml2-tool-active', newVisible);
        
        document.querySelectorAll('[data-action="hotspots"]').forEach(b => {
          if (b !== el) {
            b.classList.toggle('active', newVisible);
            b.classList.toggle('active-tool', newVisible);
          }
        });
        break;
      }

      case 'share':
        closeAllSheets();
        if (navigator.share) {
          navigator.share({ title: 'TAV Villa Virtual Tour', url: window.location.href })
            .catch(() => _fallbackShare());
        } else {
          _fallbackShare();
        }
        break;

      case 'info': {
        closeAllSheets();
        const infoModal = document.getElementById('project-info-modal');
        if (infoModal) infoModal.classList.add('active');
        break;
      }

      case 'region': {
        closeAllSheets();
        const regionPage = document.getElementById('region-page');
        if (regionPage) {
          document.body.classList.add('region-mode-active');
          document.querySelector('.region-hamburger')?.classList.remove('open');
          document.getElementById('region-menu-collapsible')?.classList.remove('open');
        }
        break;
      }

      case 'contact':
        closeAllSheets();
        window.open('https://tav.vn/', '_blank');
        break;

      case 'audio':
        core.toggleMusic();
        syncAudioButton();
        if (el) addRipple(el, event || {});
        break;
    }
  }

  function _fallbackShare() {
    const menu = document.getElementById('social-share-menu');
    if (menu) {
      menu.style.bottom = '50%';
      menu.style.left = '50%';
      menu.style.transform = 'translate(-50%, 50%)';
      menu.classList.add('active');
    }
  }

  // ── Event binding ─────────────────────────────────────────
  function bindEvents() {
    const core = window.TAV_CORE;

    // Backdrop click → close sheets
    document.getElementById('ml2-backdrop').addEventListener('click', closeAllSheets);

    // Click outside to close tools popup (since it has no backdrop)
    document.addEventListener('click', e => {
      if (_activeSheet === 'ml2-tools-sheet') {
        if (!e.target.closest('.ml2-tools-popup') && !e.target.closest('#ml2-fab')) {
          closeAllSheets();
          document.getElementById('ml2-fab').classList.remove('ml2-open');
        }
      }
    });

    // Compass → reset pan
    document.getElementById('ml2-compass').addEventListener('click', () => {
      const pano = core.getPano();
      if (pano && typeof pano.setPan === 'function') pano.setPan(0);
      document.getElementById('ml2-compass').classList.add('ml2-pulse');
      setTimeout(() => document.getElementById('ml2-compass').classList.remove('ml2-pulse'), 700);
    });

    // Logo badge → switch layout
    document.getElementById('ml2-layout-badge-top').addEventListener('click', () => {
      if (typeof window.switchMobileLayout === 'function') window.switchMobileLayout('1');
    });

    // Dock: Scenes tab
    const tabScenes = document.getElementById('ml2-tab-scenes');
    tabScenes.addEventListener('click', e => {
      addRipple(tabScenes, e);
      if (_activeSheet === 'ml2-scene-sheet') closeAllSheets();
      else openSheet('ml2-scene-sheet');
    });

    // Dock: Map tab
    const tabMap = document.getElementById('ml2-tab-map');
    tabMap.addEventListener('click', e => {
      addRipple(tabMap, e);
      toggleMinimap();
    });

    // Dock: FAB (center)
    const fab = document.getElementById('ml2-fab');
    fab.addEventListener('click', e => {
      addRipple(fab, e);
      fab.classList.toggle('ml2-open');
      if (_activeSheet === 'ml2-tools-sheet') closeAllSheets();
      else openSheet('ml2-tools-sheet');
    });

    // Dock: Gallery tab
    const galleryBtn = document.getElementById('ml2-tab-gallery');
    if (galleryBtn) {
      galleryBtn.addEventListener('click', e => {
        addRipple(galleryBtn, e);
        dispatch('gallery', galleryBtn, e);
      });
    }



    // Dock: Audio tab
    const tabAudio = document.getElementById('ml2-tab-audio');
    tabAudio.addEventListener('click', e => {
      addRipple(tabAudio, e);
      dispatch('audio', tabAudio, e);
    });

    // Scene sheet close
    document.getElementById('ml2-scene-close').addEventListener('click', closeAllSheets);



    // Category filter pills
    document.querySelectorAll('.ml2-cat-pill').forEach(pill => {
      pill.addEventListener('click', () => filterScenes(pill.dataset.cat));
    });

    // Scene cards
    document.getElementById('ml2-scene-grid').addEventListener('click', e => {
      const card = e.target.closest('.ml2-scene-card');
      if (!card) return;
      addRipple(card, e);
      dispatch(card.dataset.action, card, e);
    });

    // Tool items
    document.querySelectorAll('.ml2-tool-item').forEach(item => {
      item.addEventListener('click', e => {
        e.stopPropagation();
        addRipple(item, e);
        dispatch(item.dataset.action, item, e);
      });
    });

    // Minimap close
    document.getElementById('ml2-minimap-close').addEventListener('click', () => {
      _minimapOpen = false;
      document.getElementById('ml2-minimap-card').classList.remove('ml2-open');
      document.getElementById('ml2-tab-map').classList.remove('ml2-active');
    });

    // Minimap zoom
    document.getElementById('ml2-zoom-in').addEventListener('click', () => {
      _mapZoom = Math.min(3, _mapZoom + 0.25);
      updateMinimapTransform();
    });
    document.getElementById('ml2-zoom-out').addEventListener('click', () => {
      _mapZoom = Math.max(0.5, _mapZoom - 0.25);
      updateMinimapTransform();
    });

    // Layout switcher in tools sheet
    document.getElementById('ml2-switch-to-l1').addEventListener('click', () => {
      if (typeof window.switchMobileLayout === 'function') window.switchMobileLayout('1');
    });
    document.getElementById('ml2-switch-to-l2').addEventListener('click', () => {
      // Already on L2 — pulse to indicate active
      const btn = document.getElementById('ml2-switch-to-l2');
      btn.style.animation = 'none';
      setTimeout(() => { btn.style.animation = ''; }, 10);
    });
    document.getElementById('ml2-switch-to-l3')?.addEventListener('click', () => {
      if (typeof window.switchMobileLayout === 'function') window.switchMobileLayout('3');
    });
    document.getElementById('ml2-switch-to-l4')?.addEventListener('click', () => {
      if (typeof window.switchMobileLayout === 'function') window.switchMobileLayout('4');
    });
    document.getElementById('ml2-switch-to-l5')?.addEventListener('click', () => {
      if (typeof window.switchMobileLayout === 'function') window.switchMobileLayout('5');
    });
    document.getElementById('ml2-switch-to-l6')?.addEventListener('click', () => {
      if (typeof window.switchMobileLayout === 'function') window.switchMobileLayout('6');
    });

    // TAV_CORE scene change subscription
    core.onSceneChange(nodeId => syncActiveScene(nodeId));

    // Hotspot touch area fix
    const cssInject = document.createElement('style');
    cssInject.id    = 'ml2-hotspot-fix';
    cssInject.innerHTML = `.hologram-marker-container, .ggnode { padding: 15px !important; margin: -15px !important; background-clip: content-box !important; cursor: pointer !important; }`;
    document.head.appendChild(cssInject);
  }

  // ── Public API ────────────────────────────────────────────
  const MobileLayout2 = {

    init() {
      if (_overlay) { console.warn('[ML2] Already initialized'); return; }
      if (!window.TAV_CORE) { console.error('[ML2] TAV_CORE not loaded — aborting'); return; }

      // Reset scroll to top to prevent layout shifting
      window.scrollTo(0, 0);

      // Build and mount overlay
      _overlay    = document.createElement('div');
      _overlay.id = 'ml2-overlay';
      _overlay.innerHTML = buildDOM();
      document.body.appendChild(_overlay);

      _fixHeight();
      window.addEventListener('resize', _fixHeight);
      window.addEventListener('orientationchange', _fixHeight);

      // Initialize subsystems
      initMinimapDrag();
      bindEvents();
      startSync();
      syncAudioButton();

      // Hide desktop UI on mobile
      _hideDesktopUI();

      console.log('[ML2] Mobile Layout 2 initialized ✓');
    },

    destroy() {
      if (!_overlay) return;
      clearInterval(_syncInterval);
      _syncInterval = null;

      const fix = document.getElementById('ml2-hotspot-fix');
      if (fix) fix.remove();

      _overlay.remove();
      _overlay      = null;
      window.removeEventListener('resize', _fixHeight);
      window.removeEventListener('orientationchange', _fixHeight);
      _activeSheet  = null;
      _activeScene  = null;
      _minimapOpen  = false;
      _galleryOpen  = false;
      _mapZoom = 1; _mapX = -20; _mapY = -20;

      console.log('[ML2] Mobile Layout 2 destroyed');
    }
  };

  // ── Hide Desktop UI on mobile ─────────────────────────────
  function _hideDesktopUI() {
    const selectors = [
      '#modern-ui-overlay',
      '#ui-wrapper','#minimap-widget','#compass-widget',
      '.layout-switcher-wrapper','#layout-switcher-wrapper','.layout-switcher-trigger',
      '.bottom-nav-container','.vertical-tool-stack','.sidebar-container',
      '.gradient-floating-logo','.cmd-top-ribbon','.cmd-scene-explorer',
      '.cmd-spatial-control','#cmd-top-ribbon','#cmd-node-label','#cmd-scene-name',
      '#cmd-coord-display','#cmd-pan-val','#cmd-tilt-val','#cmd-scene-explorer',
      '#cmd-explorer-collapse-header','#cmd-explorer-collapse','#cmd-explorer-body',
      '#cmd-explorer-list','#cmd-spatial-control','#cmd-music-tile','#cmd-hotspot-tile',
      '.cmd-right-nav','.cmd-left-tools','.cmd-bottom-dock','.horizon-top-nav',
      '.horizon-bottom-nav','.aurora-glass-nav','.aurora-glass-toolbar',
      '#vision-left-dock','#vision-right-dock','.blueprint-floating-gallery-container',
      '#blueprint-gallery-container','#blueprint-gallery-panel',
      '.premium-carousel-container','.premium-scene-browser','#premium-scene-browser',
      '.layout-floating-logo','.gradient-quick-actions','.quick-nav-panel',
      '.bottom-nav-bar','.futuristic-settings-group','.neo-unified-trigger',
      '.aurora-nav-pin-btn','.aurora-tool-pin-btn','.compass-widget','.horizon-dock',
      '.prism-nav-wrapper','.prism-tool-container','.nexus-nav-wrapper',
      '.nexus-tool-container','.monarch-nav-wrapper','.monarch-command-panel',
      '.minimap-widget','.blueprint-top-ribbon','.rgl-neo-nav-wrapper',
      '.rgl-neo-tools-system','.blueprint-layout-switcher'
    ];
    const style    = document.createElement('style');
    style.id       = 'ml2-desktop-hide';
    style.innerHTML = `
      @media screen and (max-width: 1024px) {
        ${selectors.join(', ')} { display: none !important; }
        body.layout-classic, body.layout-futuristic, body.layout-neo, body.layout-gradient,
        body.layout-aurora, body.layout-horizon, body.layout-prism, body.layout-nexus,
        body.layout-monarch, body.layout-regal, body.layout-command {
          background: #000 !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // ── Export ────────────────────────────────────────────────
  window.MobileLayout2 = MobileLayout2;
  console.log('[ML2] Mobile Layout 2 module loaded');

})();
