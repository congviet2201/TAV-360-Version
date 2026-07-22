/**
 * js/mobile/mobile_layout4.js — TAV Virtual Tour · Mobile Layout 4 Controller
 * ============================================================
 * World-Class Mobile UX Architect design.
 * Premium mobile-first UI inspired by Desktop Layout 2 (Futuristic/Neon)
 * Features:
 *   - Cyberpunk space dark & neon theme
 *   - Bottom Drawer Navigation with Desktop Layout 2 hierarchy
 *   - Swipeable Centered Horizontal Scene Navigation Strip (dynamic array rotation)
 *   - Floating collapsible Minimap with tech crosshair & radar cone sync
 *   - Branded magenta settings FAB opening compact systems toolkit popover
 *   - Standalone module matching TAV_CORE bindings.
 * ============================================================
 */

(function () {
  'use strict';

  // ── Internal state ────────────────────────────────────────
  let _overlay      = null;
  let _activeSheet  = null;
  let _syncInterval = null;
  let _activeScene  = null;
  let _activeCategory = null;
  let _isHotspotsVisible = true;
  let _minimapOpen    = false;
  let _mapZoom = 1;
  let _mapX    = -20;
  let _mapY    = -20;
  let _mapDragging    = false;
  let _mapDragStartX  = 0;
  let _mapDragStartY  = 0;
  let _stopCarouselLoop = null;

  // ── SVG icons ─────────────────────────────────────────────
  const ICONS = {
    menu:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>`,
    map:       `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/></svg>`,
    gallery:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>`,
    audio:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`,
    audioMute: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="1" y1="1" x2="23" y2="23"/><path d="M9 9v9"/><path d="M9 5.732L21 3.268M21 17.732v-2.464"/></svg>`,
    settings:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg>`,
    close:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
    hotspot:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>`,
    share:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>`,
    info:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><circle cx="12" cy="8" r="1" fill="currentColor" stroke="none"/></svg>`,
    region:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"/></svg>`,
    contact:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.63a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .91h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>`,
    autorotate:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>`,
    fullscreen:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3"/></svg>`,
    layout:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>`,
    arrowDown: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>`
  };

  // ── Force height on orientation resize ─────────────────────────────────────
  function _fixHeight() {
    if (_overlay) {
      _overlay.style.height = '100%';
      _overlay.style.height = '100dvh';
    }
  }

  // ── DOM Builder ───────────────────────────────────────────
  function buildDOM() {
    const core   = window.TAV_CORE;
    const config = core.config;
    const scenes = core.scenes;

    // ─ Compass SVG Dial
    const compassSVG = `
      <svg class="ml4-compass-dial" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="44" class="ml4-compass-ring"/>
        <g id="ml4-compass-needle" style="transform-origin:50px 50px; transition:transform 0.12s linear;">
          <polygon class="ml4-compass-north" points="50,15 57,50 50,55 43,50"/>
          <polygon class="ml4-compass-south" points="50,85 57,50 50,55 43,50"/>
        </g>
        <text x="50" y="9" text-anchor="middle" fill="#00f2fe" font-size="9" font-weight="900" font-family="'Share Tech Mono',sans-serif">N</text>
      </svg>`;

    // ─ Navigation list with scenes accordion
    const categoryKeys = Object.keys(config.navItems);
    let accordionHTML = '';

    categoryKeys.forEach((key, index) => {
      const item = config.navItems[key];
      if (key === 'surrounding') return; // skipped, loaded as region map sheet directly

      let subScenes = [];
      if (item.submenu) {
        subScenes = item.submenu.map(sub => {
          return scenes.find(s => s.action === sub.node || s.action === sub.action);
        }).filter(Boolean);
      } else if (item.node) {
        const scene = scenes.find(s => s.id === item.node);
        if (scene) subScenes.push(scene);
      }

      if (subScenes.length === 0) return;

      const categoryLabel = item.label || key;
      const gridItemsHTML = subScenes.map(s => `
        <div class="ml4-card ml4-interactive" data-action="${s.action}" data-node="${s.action}">
          ${s.thumb
            ? `<img src="${s.thumb}" alt="${s.title}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
            : ''}
          <div class="ml4-card-placeholder" style="${s.thumb ? 'display:none' : ''}">🏠</div>
          <div class="ml4-card-details">
            <span class="ml4-card-title">${s.title}</span>
            <span class="ml4-card-subtitle">${s.sub}</span>
          </div>
        </div>
      `).join('');

      accordionHTML += `
        <div class="ml4-accordion-group ${index === 0 ? 'ml4-expanded' : ''}" data-cat-id="${key}">
          <div class="ml4-accordion-header ml4-interactive">
            <span>${categoryLabel}</span>
            ${ICONS.arrowDown}
          </div>
          <div class="ml4-accordion-body">
            <div class="ml4-grid">
              ${gridItemsHTML}
            </div>
          </div>
        </div>
      `;
    });

    // ─ Settings / Action grid list (Cyber Theme)
    const settingsGridHTML = `
      <button class="ml4-setting-btn ml4-interactive ${ _isHotspotsVisible ? 'ml4-active-tool' : '' }" data-action="hotspots">
        ${ICONS.hotspot}
        <span>Điểm Chạm</span>
      </button>
      <button class="ml4-setting-btn ml4-interactive" data-action="autorotate">
        ${ICONS.autorotate}
        <span>Tự Xoay</span>
      </button>
      <button class="ml4-setting-btn ml4-interactive" data-action="fullscreen">
        ${ICONS.fullscreen}
        <span>Toàn Màn</span>
      </button>
      <button class="ml4-setting-btn ml4-interactive" data-action="share">
        ${ICONS.share}
        <span>Chia Sẻ</span>
      </button>
      <button class="ml4-setting-btn ml4-interactive" data-action="info">
        ${ICONS.info}
        <span>Thông Tin</span>
      </button>
      <button class="ml4-setting-btn ml4-interactive" data-action="region-page">
        ${ICONS.region}
        <span>L.Kết Vùng</span>
      </button>

      <!-- Social Row Dropdown -->
      <div class="ml4-social-row">
        <a href="${config.social.facebook}" target="_blank" class="ml4-social-btn ml4-interactive">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          Facebook
        </a>
        <a href="${config.social.instagram}" target="_blank" class="ml4-social-btn ml4-interactive">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98C23.986 15.668 24 15.259 24 12c0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
          Instagram
        </a>
        <a href="${config.social.zalo}" target="_blank" class="ml4-social-btn ml4-interactive">
          <svg viewBox="0 0 40 40" fill="currentColor"><path d="M20 0C8.955 0 0 8.954 0 20c0 11.045 8.955 20 20 20s20-8.955 20-20C40 8.954 31.045 0 20 0zm9.09 28.182c-1.091 1.09-2.273 1.636-3.636 1.636-.727 0-1.454-.182-2.09-.455l-5.91 2.364.91-5.273c-1.636-1.454-2.637-3.545-2.637-5.818 0-4.364 3.546-7.909 7.91-7.909 4.363 0 7.909 3.545 7.909 7.909 0 2.909-1.546 5.454-4 6.909l1.544 .637z"/></svg>
          Zalo
        </a>
      </div>

      <!-- Mobile layout switcher -->
      <div class="ml4-switcher-row">
        <span class="ml4-switcher-label">Giao Diện:</span>
        <div class="ml4-switcher-pills">
          <button class="ml4-switcher-pill ml4-interactive" data-layout-switch="1">L1</button>
          <button class="ml4-switcher-pill ml4-interactive" data-layout-switch="2">L2</button>
          <button class="ml4-switcher-pill ml4-interactive" data-layout-switch="3">L3</button>
          <button class="ml4-switcher-pill ml4-active ml4-interactive" data-layout-switch="4">L4</button>
          <button class="ml4-switcher-pill ml4-interactive" data-layout-switch="5">L5</button>
        </div>
      </div>
    `;

    return `
      <!-- ① Top Strip (Branding & Compass) -->
      <div class="ml4-top-strip">
        <div class="ml4-logo-pill ml4-interactive" id="ml4-logo-btn">
          <div>
            <div class="ml4-logo-title">${config.projectTitle.top}</div>
            <div class="ml4-logo-sub">${config.projectTitle.sub}</div>
          </div>
          <div class="ml4-layout-badge">
            ${ICONS.layout}
            <span>ML4</span>
          </div>
        </div>
        <div class="ml4-compass ml4-interactive" id="ml4-compass" title="Đặt lại hướng nhìn">
          ${compassSVG}
        </div>
      </div>

      <!-- ② Scene change toast notification -->
      <div class="ml4-toast" id="ml4-toast"></div>

      <!-- ③ Floating Minimap Card -->
      <div class="ml4-minimap-card" id="ml4-minimap-card">
        <div class="ml4-minimap-header">
          <span class="ml4-minimap-label">Bản đồ</span>
          <div class="ml4-minimap-close-btn ml4-interactive" id="ml4-minimap-close">${ICONS.close}</div>
        </div>
        <div class="ml4-minimap-viewport" id="ml4-minimap-viewport">
          <img src="image/Map_optimized.jpg" id="ml4-minimap-img" class="ml4-minimap-img" alt="Map">
          <div class="ml4-minimap-radar" id="ml4-minimap-radar">
            <div class="ml4-minimap-cone" id="ml4-minimap-cone"></div>
            <div class="ml4-minimap-dot" style="position: absolute; width: 8px; height: 8px; background: var(--ml4-neon-cyan); border-radius: 50%; transform: translate(-50%, -50%); box-shadow: 0 0 6px var(--ml4-neon-cyan);"></div>
          </div>
        </div>
        <div class="ml4-minimap-zoom">
          <button class="ml4-minimap-zoom-btn ml4-interactive" id="ml4-zoom-in">+</button>
          <button class="ml4-minimap-zoom-btn ml4-interactive" id="ml4-zoom-out">−</button>
        </div>
      </div>

      <!-- ④ Horizontal Scene Swipe Carousel -->
      <div class="ml4-carousel-strip" id="ml4-carousel-strip">
        <div class="ml4-carousel-track" id="ml4-carousel-track"></div>
      </div>

      <!-- ⑤ Floating Left Sidebar Dock -->
      <nav class="ml4-left-dock ml4-interactive" id="ml4-dock" role="navigation" aria-label="Main Navigation">
        <!-- Tab 1: Menu Sheets -->
        <button class="ml4-dock-tab ml4-interactive" id="ml4-tab-menu" aria-label="Danh Mục Cảnh">
          <div class="ml4-ripple-container"></div>
          ${ICONS.menu}
          <span>Cảnh</span>
        </button>
        <!-- Tab 2: Minimap Toggle -->
        <button class="ml4-dock-tab ml4-interactive" id="ml4-tab-map" aria-label="Bản Đồ">
          <div class="ml4-ripple-container"></div>
          ${ICONS.map}
          <span>Bản Đồ</span>
        </button>
        <!-- Tab 3: Gallery Toggle -->
        <button class="ml4-dock-tab ml4-interactive" id="ml4-tab-gallery" aria-label="Hình Ảnh Thư Viện">
          <div class="ml4-ripple-container"></div>
          ${ICONS.gallery}
          <span>Thư Viện</span>
        </button>
        <!-- Tab 4: Settings Toggle -->
        <button class="ml4-dock-tab ml4-interactive" id="ml4-tab-settings" aria-label="Cài Đặt Hệ Thống">
          <div class="ml4-ripple-container"></div>
          ${ICONS.settings}
          <span>Cài Đặt</span>
        </button>
        <!-- Tab 5: Music Toggle -->
        <button class="ml4-dock-tab ml4-interactive" id="ml4-tab-audio" aria-label="Âm Nhạc Nền">
          <div class="ml4-ripple-container"></div>
          <span id="ml4-audio-icon">${ICONS.audio}</span>
          <span id="ml4-audio-label">Nhạc</span>
        </button>
      </nav>

      <!-- ⑥ Backdrop -->
      <div class="ml4-backdrop" id="ml4-backdrop"></div>

      <!-- ⑦ Menu Sheet Drawer (DANH MỤC) -->
      <div class="ml4-sheet" id="ml4-nav-sheet" role="dialog" aria-label="Danh Mục Cảnh">
        <div class="ml4-sheet-handle" id="ml4-nav-handle"></div>
        <div class="ml4-sheet-header">
          <span class="ml4-sheet-title">Danh Mục Cảnh</span>
          <div class="ml4-sheet-close ml4-interactive" id="ml4-nav-close">${ICONS.close}</div>
        </div>
        <div class="ml4-nav-scroll">
          ${accordionHTML}
        </div>
      </div>

      <!-- ⑧ Settings Sheet (CÀI ĐẶT) -->
      <div class="ml4-sheet" id="ml4-settings-sheet" role="dialog" aria-label="Cài Đặt Hệ Thống">
        <div class="ml4-sheet-handle" id="ml4-settings-handle"></div>
        <div class="ml4-sheet-header">
          <span class="ml4-sheet-title">Cài Đặt Hệ Thống</span>
          <div class="ml4-sheet-close ml4-interactive" id="ml4-settings-close">${ICONS.close}</div>
        </div>
        <div class="ml4-settings-grid">
          ${settingsGridHTML}
        </div>
      </div>
    `;
  }

  // ── Touch Feedback: Ripple Effect ──────────────────────────────────
  function addRipple(el, e) {
    const container = el.querySelector('.ml4-ripple-container');
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = (e.clientX || (e.touches && e.touches[0].clientX) || rect.left + rect.width / 2) - rect.left;
    const y = (e.clientY || (e.touches && e.touches[0].clientY) || rect.top + rect.height / 2) - rect.top;
    const ripple = document.createElement('div');
    ripple.className = 'ml4-ripple';
    ripple.style.cssText = `left:${x}px;top:${y}px;width:${rect.width}px;height:${rect.width}px;margin-left:-${rect.width/2}px;margin-top:-${rect.width/2}px`;
    container.appendChild(ripple);
    setTimeout(() => ripple.remove(), 550);
  }

  // ── Sheet Control ──────────────────────────────────────────────────
  function openSheet(sheetId) {
    closeAllSheets();
    const sheet = document.getElementById(sheetId);
    if (!sheet) return;
    sheet.classList.add('ml4-open');
    
    const backdrop = document.getElementById('ml4-backdrop');
    if (backdrop) {
      backdrop.classList.add('ml4-open');
      if (sheetId === 'ml4-nav-sheet') {
        backdrop.classList.add('ml4-dim');
      } else {
        backdrop.classList.remove('ml4-dim');
      }
    }
    _activeSheet = sheetId;

    // Highlight active tab/FAB indicators
    if (sheetId === 'ml4-nav-sheet') {
      document.getElementById('ml4-tab-menu')?.classList.add('ml4-active');
    } else if (sheetId === 'ml4-settings-sheet') {
      document.getElementById('ml4-tab-settings')?.classList.add('ml4-active');
    }

    // Scroll active scene card into view if opening the navigation sheet
    if (sheetId === 'ml4-nav-sheet') {
      const activeCard = sheet.querySelector('.ml4-active-scene');
      if (activeCard) {
        const group = activeCard.closest('.ml4-accordion-group');
        if (group && !group.classList.contains('ml4-expanded')) {
          _expandAccordion(group);
        }
        setTimeout(() => {
          activeCard.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
        }, 300);
      }
    }

    // Drag-to-close handler
    const handle = sheet.querySelector('.ml4-sheet-handle');
    if (handle) _attachDragClose(sheet, handle);
  }

  function closeAllSheets() {
    ['ml4-nav-sheet', 'ml4-settings-sheet'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.remove('ml4-open');
    });
    const backdrop = document.getElementById('ml4-backdrop');
    if (backdrop) {
      backdrop.classList.remove('ml4-open');
      backdrop.classList.remove('ml4-dim');
    }
    document.getElementById('ml4-tab-menu')?.classList.remove('ml4-active');
    document.getElementById('ml4-tab-settings')?.classList.remove('ml4-active');
    _activeSheet = null;
  }

  function _attachDragClose(sheet, handle) {
    let startX = 0;
    const onTouchStart = e => { startX = e.touches[0].clientX; };
    const onTouchMove  = e => {
      const delta = e.touches[0].clientX - startX;
      if (delta < 0) sheet.style.transform = `translateX(${delta}px)`;
    };
    const onTouchEnd   = e => {
      sheet.style.transform = '';
      if (startX - e.changedTouches[0].clientX > 60) closeAllSheets();
      handle.removeEventListener('touchstart', onTouchStart);
      handle.removeEventListener('touchmove', onTouchMove);
      handle.removeEventListener('touchend', onTouchEnd);
    };
    handle.addEventListener('touchstart', onTouchStart, { passive: true });
    handle.addEventListener('touchmove', onTouchMove, { passive: true });
    handle.addEventListener('touchend', onTouchEnd);
  }

  // ── Accordion Toggle ───────────────────────────────────────────────
  function _expandAccordion(group) {
    document.querySelectorAll('.ml4-accordion-group').forEach(g => {
      if (g !== group) {
        g.classList.remove('ml4-expanded');
        g.querySelector('.ml4-accordion-body').style.maxHeight = '0px';
      }
    });
    group.classList.add('ml4-expanded');
    const body = group.querySelector('.ml4-accordion-body');
    body.style.maxHeight = '500px';
  }

  function toggleAccordion(group) {
    const isExpanded = group.classList.contains('ml4-expanded');
    if (isExpanded) {
      group.classList.remove('ml4-expanded');
      group.querySelector('.ml4-accordion-body').style.maxHeight = '0px';
    } else {
      _expandAccordion(group);
    }
  }

  // ── Swipe Carousel Builder — Custom Virtual Drag + Spring Physics ──────────────────
  function buildCarousel(category, activeNodeId) {
    if (!category) return;
    _activeCategory = category;

    const core = window.TAV_CORE;
    const catScenes = core.getScenesByCategory(category);
    const track = document.getElementById('ml4-carousel-track');
    const strip = document.getElementById('ml4-carousel-strip');
    if (!track || !strip) return;

    if (catScenes.length <= 1) {
      strip.classList.remove('ml4-visible');
      return;
    }

    // Stop any previous animation loop
    if (_stopCarouselLoop) { _stopCarouselLoop(); _stopCarouselLoop = null; }

    // Rotate the scenes array so the active scene is always exactly in the center
    let activeIdx = catScenes.findIndex(s => s.id === activeNodeId);
    if (activeIdx === -1) activeIdx = 0;
    const N = catScenes.length;
    const mid = Math.floor(N / 2);
    const rotatedScenes = [];
    for (let i = 0; i < N; i++) {
      rotatedScenes.push(catScenes[(activeIdx - mid + i + N) % N]);
    }

    track.innerHTML = rotatedScenes.map(s => `
      <div class="ml4-carousel-item ml4-interactive ${s.id === activeNodeId ? 'ml4-active-card' : ''}" data-action="${s.action}" data-node="${s.action}">
        <img src="${s.thumb}" alt="${s.title}" onerror="this.src='preview.jpg'">
        <div class="ml4-carousel-item-info">
          <div class="ml4-carousel-item-title">${s.title}</div>
        </div>
      </div>
    `).join('');

    strip.classList.add('ml4-visible');

    // ── Wait one frame for items to lay out, then boot physics engine ──────
    requestAnimationFrame(() => {
      const items      = Array.from(track.querySelectorAll('.ml4-carousel-item'));
      const ITEM_W     = 68;
      const GAP        = 12;
      const STEP       = ITEM_W + GAP;           // distance between item centers
      const stripW     = strip.clientWidth;
      const PADDING    = stripW / 2 - ITEM_W / 2; // centers first item
      const totalW     = PADDING * 2 + N * STEP - GAP;

      // Precompute each item's natural center X (layout positions)
      const itemCenters = items.map((_, i) => PADDING + i * STEP + ITEM_W / 2);

      // Position the track items absolutely so CSS flex isn't fighting us
      track.style.position = 'relative';
      track.style.width    = totalW + 'px';
      items.forEach((item, i) => {
        item.style.position = 'absolute';
        item.style.left     = (PADDING + i * STEP) + 'px';
        item.style.top      = '50%';
        item.style.transform = 'translateY(-50%)';
      });

      // ── Virtual scroll state ─────────────────────────────────────────────
      const maxOffset = PADDING + (N - 1) * STEP; // max virtual X of center item
      let offset    = PADDING + mid * STEP;        // start centered on active card
      let velX      = 0;
      let isDragging = false;
      let dragStartX = 0;
      let dragStartOffset = 0;
      let lastX    = 0;
      let lastTime = 0;
      let snapTarget = offset;
      let isSnapping = false;
      let rafId    = null;
      let killed   = false;

      // ── Render: apply 3D cylinder transforms to every item ───────────────
      const render = () => {
        const halfView = stripW / 2;
        items.forEach((item, i) => {
          const itemX    = itemCenters[i];        // item natural center in track space
          const dist     = itemX - offset;        // distance from camera focal point
          const absDist  = Math.abs(dist);
          const horizon  = stripW * 0.6;          // falloff range

          let t = 1 - Math.min(absDist / horizon, 1);
          t = t * t * (3 - 2 * t);               // smoothstep — S-curve, no harsh edges

          const scale    = 0.75 + t * 0.45;      // 0.75 → 1.20
          const rotY     = -(dist / horizon) * 52; // tilt towards center
          const transZ   = -(absDist / horizon) * 50;
          const transY   = (absDist / horizon) * 10;
          const opacity  = 0.35 + t * 0.65;
          const bright   = 0.55 + t * 0.6;

          // Screenspace X: offset the item so it stays in the strip viewport
          const screenX  = halfView + dist - ITEM_W / 2;

          item.style.left      = screenX + 'px';
          item.style.opacity   = opacity;
          item.style.zIndex    = Math.round(t * 10);
          item.style.transform = `translateY(-50%) scale(${scale}) rotateY(${rotY}deg) translate3d(0,${transY}px,${transZ}px)`;

          const img = item.querySelector('img');
          if (img) {
            img.style.filter = `brightness(${bright})`;
            if (item.classList.contains('ml4-active-card')) {
              img.style.borderColor = 'var(--ml4-neon-magenta)';
              img.style.boxShadow   = `0 0 ${Math.round(t * 10)}px rgba(196,91,138,0.35)`;
            } else {
              img.style.borderColor = `rgba(94,200,216,${(0.08 + t * 0.35).toFixed(2)})`;
              img.style.boxShadow   = `0 0 ${Math.round(t * 7)}px rgba(94,200,216,0.18)`;
            }
          }
        });
      };

      // ── Physics loop ─────────────────────────────────────────────────────
      const physicsLoop = () => {
        if (killed) return;
        rafId = requestAnimationFrame(physicsLoop);

        if (!isDragging) {
          if (isSnapping) {
            // Spring snap to nearest slot
            const diff = snapTarget - offset;
            if (Math.abs(diff) < 0.3 && Math.abs(velX) < 0.3) {
              offset = snapTarget;
              velX   = 0;
              isSnapping = false;
            } else {
              const spring = diff * 0.18;   // spring stiffness
              const damp   = -velX * 0.72;  // damping
              velX  += spring + damp;
              offset += velX;
            }
          } else {
            // Momentum glide after finger lifts
            velX *= 0.88;                   // friction — higher = more glide
            offset += velX;

            // Clamp to valid range
            offset = Math.min(Math.max(offset, PADDING), maxOffset);

            if (Math.abs(velX) < 0.4) {
              // Find nearest snap slot (nearest item center)
              let closest = itemCenters[0];
              let minD    = Infinity;
              itemCenters.forEach(c => {
                const d = Math.abs(c - offset);
                if (d < minD) { minD = d; closest = c; }
              });
              snapTarget = closest;
              isSnapping = true;
              velX = 0;
            }
          }
        }

        render();
      };

      physicsLoop();

      // ── Touch / Pointer handlers — tap vs drag detection ────────────────
      const TAP_THRESHOLD = 8; // px — less than this = tap, more = drag
      let touchMoved = false;

      const onPointerDown = (e) => {
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        isDragging      = false;   // becomes true only when threshold exceeded
        touchMoved      = false;
        isSnapping      = false;
        dragStartX      = clientX;
        dragStartOffset = offset;
        lastX           = clientX;
        lastTime        = performance.now();
        velX            = 0;
        // NOTE: do NOT preventDefault here — lets tap / click events through
      };

      const onPointerMove = (e) => {
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const movedPx = Math.abs(clientX - dragStartX);

        // Promote to drag only once threshold exceeded
        if (!isDragging && movedPx > TAP_THRESHOLD) {
          isDragging = true;
          touchMoved = true;
          track.classList.add('is-dragging');
        }
        if (!isDragging) return;

        const now = performance.now();
        const dt  = Math.max(now - lastTime, 1);

        const deltaX = clientX - dragStartX;
        offset = dragStartOffset - deltaX;

        // Rubber-band resistance at edges
        const clampedOffset = Math.min(Math.max(offset, PADDING), maxOffset);
        const excess = offset - clampedOffset;
        offset = clampedOffset + excess * 0.25;

        // Track velocity for momentum
        velX     = (clientX - lastX) / dt * -14;
        lastX    = clientX;
        lastTime = now;
        e.preventDefault(); // only block scroll when we know it's a drag
      };

      const onPointerUp = (e) => {
        const wasDragging = isDragging;
        isDragging = false;
        track.classList.remove('is-dragging');

        // ── TAP: finger lifted without significant movement ────────────────
        if (!wasDragging && !touchMoved) {
          const touch = e.changedTouches ? e.changedTouches[0] : e;
          const el = document.elementFromPoint(touch.clientX, touch.clientY);
          const card = el ? el.closest('.ml4-carousel-item') : null;
          if (card) {
            const action = card.dataset.action;
            if (action && window.TAV_CORE) {
              window.TAV_CORE.goToScene(action);
            }
          }
        }
        // else: let physics loop handle momentum glide
      };

      // Bind touch events — move is non-passive so we can preventDefault on drag
      track.addEventListener('touchstart',  onPointerDown,  { passive: true  });
      track.addEventListener('touchmove',   onPointerMove,  { passive: false });
      track.addEventListener('touchend',    onPointerUp,    { passive: true  });
      track.addEventListener('touchcancel', onPointerUp,    { passive: true  });
      // Mouse fallback for desktop testing
      track.addEventListener('mousedown',   onPointerDown,  { passive: true  });
      window.addEventListener('mousemove',  onPointerMove,  { passive: false });
      window.addEventListener('mouseup',    onPointerUp,    { passive: true  });

      // ── Store cleanup function ────────────────────────────────────────────
      _stopCarouselLoop = () => {
        killed = true;
        if (rafId) cancelAnimationFrame(rafId);
        track.removeEventListener('touchstart',  onPointerDown);
        track.removeEventListener('touchmove',   onPointerMove);
        track.removeEventListener('touchend',    onPointerUp);
        track.removeEventListener('touchcancel', onPointerUp);
        track.removeEventListener('mousedown',   onPointerDown);
        window.removeEventListener('mousemove',  onPointerMove);
        window.removeEventListener('mouseup',    onPointerUp);
      };

      // Initial render
      render();
    });
  }

  // ── Toast Notifications ────────────────────────────────────────────
  let _toastTimer = null;
  function showSceneToast(title) {
    const toast = document.getElementById('ml4-toast');
    if (!toast) return;
    toast.textContent = title;
    toast.classList.add('ml4-visible');
    clearTimeout(_toastTimer);
    _toastTimer = setTimeout(() => toast.classList.remove('ml4-visible'), 2400);
  }

  // ── Minimap ────────────────────────────────────────────────────────
  function toggleMinimap() {
    _minimapOpen = !_minimapOpen;
    const card = document.getElementById('ml4-minimap-card');
    if (card) card.classList.toggle('ml4-open', _minimapOpen);
    const tab = document.getElementById('ml4-tab-map');
    if (tab) tab.classList.toggle('ml4-active', _minimapOpen);
  }

  function updateMinimapTransform() {
    const img = document.getElementById('ml4-minimap-img');
    if (img) img.style.transform = `translate(${_mapX}px, ${_mapY}px) scale(${_mapZoom})`;
  }

  function initMinimapDrag() {
    const vp = document.getElementById('ml4-minimap-viewport');
    if (!vp) return;

    vp.addEventListener('touchstart', e => {
      _mapDragging   = true;
      _mapDragStartX = e.touches[0].clientX - _mapX;
      _mapDragStartY = e.touches[0].clientY - _mapY;
    }, { passive: true });

    vp.addEventListener('touchmove', e => {
      if (!_mapDragging) return;
      _mapX = e.touches[0].clientX - _mapDragStartX;
      _mapY = e.touches[0].clientY - _mapY;
      updateMinimapTransform();
    }, { passive: true });

    vp.addEventListener('touchend', () => { _mapDragging = false; });
  }

  // ── Audio Toggle Synchronization ───────────────────────────────────
  function syncAudioButton() {
    const isMuted = window.TAV_CORE.isMusicMuted;
    const iconEl  = document.getElementById('ml4-audio-icon');
    const tab     = document.getElementById('ml4-tab-audio');
    if (iconEl)  iconEl.innerHTML   = isMuted ? ICONS.audioMute : ICONS.audio;
    if (tab)     tab.classList.toggle('ml4-active', !isMuted);
  }

  // ── Scene Sync ─────────────────────────────────────────────────────
  function syncActiveScene(nodeId) {
    if (!nodeId || nodeId === _activeScene) return;
    _activeScene = nodeId;

    const core = window.TAV_CORE;
    const scene = core.getSceneById(nodeId);

    // Update Category Accordion selection grid
    document.querySelectorAll('#ml4-nav-sheet .ml4-card').forEach(card => {
      const isActive = card.dataset.node === nodeId;
      card.classList.toggle('ml4-active-scene', isActive);
    });

    if (scene) {
      showSceneToast(scene.title);
      // Synchronize horizontal swipe carousel
      buildCarousel(scene.category, nodeId);
    }
  }

  // ── Compass & Pano Sync ────────────────────────────────────────────
  function syncCompass(pan) {
    const needle = document.getElementById('ml4-compass-needle');
    if (needle) needle.style.transform = `rotate(${-pan}deg)`;
    const cone = document.getElementById('ml4-minimap-cone');
    if (cone) cone.style.transform = `translate(-50%, -100%) rotate(${pan}deg)`;
  }

  function startSync() {
    _syncInterval = setInterval(() => {
      const pano = window.TAV_CORE.getPano();
      if (!pano) return;
      if (typeof pano.getPan === 'function') syncCompass(pano.getPan());
      if (typeof pano.getCurrentNode === 'function') syncActiveScene(pano.getCurrentNode());
    }, 100);
  }

  // ── Dispatcher ─────────────────────────────────────────────────────
  function dispatch(action, el, event) {
    const core = window.TAV_CORE;

    if (action.startsWith('node') || action.startsWith('architecture-')) {
      core.navigateTo(action);
      closeAllSheets();
      return;
    }

    switch (action) {
      case 'autorotate':
        core.navigateTo('autorotate');
        closeAllSheets();
        break;

      case 'fullscreen':
        core.navigateTo('fullscreen');
        closeAllSheets();
        break;

      case 'gallery':
        closeAllSheets();
        if (typeof window.openGlobalPanoramaGallery === 'function') {
          window.openGlobalPanoramaGallery();
        } else {
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

        _isHotspotsVisible = newVisible;
        if (el) el.classList.toggle('ml4-active-tool', newVisible);

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

      case 'info':
        closeAllSheets();
        const infoModal = document.getElementById('project-info-modal');
        if (infoModal) infoModal.classList.add('active');
        break;

      case 'region-page': {
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

  // ── Event Binding ──────────────────────────────────────────────────
  function bindEvents() {
    const core = window.TAV_CORE;

    // Backdrop
    document.getElementById('ml4-backdrop').addEventListener('click', closeAllSheets);

    // Compass click -> Reset view
    document.getElementById('ml4-compass').addEventListener('click', () => {
      const pano = core.getPano();
      if (pano && typeof pano.setPan === 'function') pano.setPan(0);
      document.getElementById('ml4-compass').classList.add('ml4-pulse');
      setTimeout(() => document.getElementById('ml4-compass').classList.remove('ml4-pulse'), 800);
    });

    // Top Brand Logo (now toggles settings for accessibility)
    document.getElementById('ml4-logo-btn').addEventListener('click', () => {
      openSheet('ml4-settings-sheet');
    });

    // Tab Map
    const tabMap = document.getElementById('ml4-tab-map');
    tabMap.addEventListener('click', e => {
      addRipple(tabMap, e);
      toggleMinimap();
    });

    // Tab Gallery
    const tabGallery = document.getElementById('ml4-tab-gallery');
    tabGallery.addEventListener('click', e => {
      addRipple(tabGallery, e);
      dispatch('gallery', tabGallery, e);
    });

    // Tab Menu (Scene list trigger in vertical sidebar)
    const tabMenu = document.getElementById('ml4-tab-menu');
    if (tabMenu) {
      tabMenu.addEventListener('click', e => {
        addRipple(tabMenu, e);
        if (_activeSheet === 'ml4-nav-sheet') closeAllSheets();
        else openSheet('ml4-nav-sheet');
      });
    }

    // Tab Settings
    const tabSettings = document.getElementById('ml4-tab-settings');
    tabSettings.addEventListener('click', e => {
      addRipple(tabSettings, e);
      if (_activeSheet === 'ml4-settings-sheet') closeAllSheets();
      else openSheet('ml4-settings-sheet');
    });

    // Tab Audio
    const tabAudio = document.getElementById('ml4-tab-audio');
    tabAudio.addEventListener('click', e => {
      addRipple(tabAudio, e);
      dispatch('audio', tabAudio, e);
    });

    // Sheet close buttons
    document.getElementById('ml4-nav-close').addEventListener('click', closeAllSheets);
    document.getElementById('ml4-settings-close').addEventListener('click', closeAllSheets);

    // Accordions
    document.querySelectorAll('.ml4-accordion-header').forEach(header => {
      header.addEventListener('click', () => {
        const group = header.closest('.ml4-accordion-group');
        toggleAccordion(group);
      });
    });

    // Scene Grid click
    document.getElementById('ml4-nav-sheet').addEventListener('click', e => {
      const card = e.target.closest('.ml4-card');
      if (!card) return;
      addRipple(card, e);
      dispatch(card.dataset.action, card, e);
    });

    // Swipe Carousel click
    document.getElementById('ml4-carousel-track').addEventListener('click', e => {
      const card = e.target.closest('.ml4-carousel-item');
      if (!card) return;
      dispatch(card.dataset.action, card, e);
    });

    // Action Settings buttons
    document.querySelectorAll('.ml4-setting-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        addRipple(btn, e);
        dispatch(btn.dataset.action, btn, e);
      });
    });

    // Minimap buttons
    document.getElementById('ml4-minimap-close').addEventListener('click', () => {
      _minimapOpen = false;
      document.getElementById('ml4-minimap-card').classList.remove('ml4-open');
      document.getElementById('ml4-tab-map').classList.remove('ml4-active');
    });
    document.getElementById('ml4-zoom-in').addEventListener('click', () => {
      _mapZoom = Math.min(3, _mapZoom + 0.25);
      updateMinimapTransform();
    });
    document.getElementById('ml4-zoom-out').addEventListener('click', () => {
      _mapZoom = Math.max(0.5, _mapZoom - 0.25);
      updateMinimapTransform();
    });

    // Switcher segment click listeners
    document.querySelectorAll('[data-layout-switch]').forEach(btn => {
      btn.addEventListener('click', () => {
        const layoutId = btn.dataset.layoutSwitch;
        if (typeof window.switchMobileLayout === 'function') {
          window.switchMobileLayout(layoutId);
        }
      });
    });

    // Core scene change listener
    core.onSceneChange(nodeId => syncActiveScene(nodeId));
  }

  // ── Hide Desktop elements ─────────────────────────────────────────
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
    style.id       = 'ml4-desktop-hide';
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

  // ── Public API ────────────────────────────────────────────
  const MobileLayout4 = {

    init() {
      if (_overlay) { console.warn('[ML4] Already initialized'); return; }
      if (!window.TAV_CORE) { console.error('[ML4] TAV_CORE not loaded — aborting'); return; }

      window.scrollTo(0, 0);

      // Build and mount
      _overlay    = document.createElement('div');
      _overlay.id = 'ml4-overlay';
      _overlay.innerHTML = buildDOM();
      document.body.appendChild(_overlay);

      _fixHeight();
      window.addEventListener('resize', _fixHeight);
      window.addEventListener('orientationchange', _fixHeight);

      // Initialize
      initMinimapDrag();
      bindEvents();
      startSync();
      syncAudioButton();

      // Hide Desktop elements
      _hideDesktopUI();

      // Trigger initial scene setup
      const current = window.TAV_CORE.currentScene;
      if (current) syncActiveScene(current);

      console.log('[ML4] Mobile Layout 4 initialized ✓');
    },

    destroy() {
      if (!_overlay) return;
      clearInterval(_syncInterval);
      _syncInterval = null;

      if (_stopCarouselLoop) {
        _stopCarouselLoop();
        _stopCarouselLoop = null;
      }

      const hide = document.getElementById('ml4-desktop-hide');
      if (hide) hide.remove();

      _overlay.remove();
      _overlay      = null;
      window.removeEventListener('resize', _fixHeight);
      window.removeEventListener('orientationchange', _fixHeight);
      _activeSheet  = null;
      _activeScene  = null;
      _activeCategory = null;
      _minimapOpen  = false;
      _mapZoom = 1; _mapX = -20; _mapY = -20;

      console.log('[ML4] Mobile Layout 4 destroyed');
    }
  };

  // ── Export ────────────────────────────────────────────────
  window.MobileLayout4 = MobileLayout4;
  console.log('[ML4] Mobile Layout 4 module loaded');

})();
