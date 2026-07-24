/**
 * js/mobile/mobile_layout3.js — TAV Virtual Tour · Mobile Layout 3 Controller
 * ============================================================
 * World-Class Mobile UX Architect design.
 * Premium mobile-first UI inspired by Desktop Layout 1 (Classic)
 * Features:
 *   - Glassmorphic Warm Pearl & Gold color scheme
 *   - Bottom Drawer Navigation with Desktop Layout 1 category hierarchy
 *   - Swipeable Horizontal Scene Navigation Strip above the dock
 *   - Floating collapsible Minimap with dynamic radar alignment
 *   - Expanding Action Sheet for System Controls (Hotspots, Music, Autorotate, Info, Share, Call, Social)
 *   - Independent, standalone controller inheriting from TAV_CORE.
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

  // ── Force absolute height to fix mobile viewport bugs ──────────────────────
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

    // ─ Compass SVG
    const compassSVG = `
      <svg class="ml3-compass-dial" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="44" class="ml3-compass-ring"/>
        <g id="ml3-compass-needle" style="transform-origin:50px 50px; transition:transform 0.12s linear;">
          <polygon class="ml3-compass-north" points="50,15 57,50 50,55 43,50"/>
          <polygon class="ml3-compass-south" points="50,85 57,50 50,55 43,50"/>
        </g>
        <text x="50" y="10" text-anchor="middle" fill="#d4af37" font-size="10" font-weight="900" font-family="Inter,sans-serif">N</text>
      </svg>`;

    // ─ Classic Category List with scene tree
    const categoryKeys = Object.keys(config.navItems);
    let accordionHTML = '';

    categoryKeys.forEach((key, index) => {
      const item = config.navItems[key];
      // Skip surrounding/region page from scene list as it links directly
      if (key === 'surrounding') return;

      let subScenes = [];
      if (item.submenu) {
        // Multi-scene category
        subScenes = item.submenu.map(sub => {
          return scenes.find(s => s.action === sub.node || s.action === sub.action);
        }).filter(Boolean);
      } else if (item.node) {
        // Single-scene category
        const scene = scenes.find(s => s.id === item.node);
        if (scene) subScenes.push(scene);
      }

      if (subScenes.length === 0) return;

      const categoryLabel = item.label || key;
      const gridItemsHTML = subScenes.map(s => `
        <div class="ml3-card ml3-interactive" data-action="${s.action}" data-node="${s.action}">
          ${s.thumb
            ? `<img src="${s.thumb}" alt="${s.title}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
            : ''}
          <div class="ml3-card-placeholder" style="${s.thumb ? 'display:none' : ''}">🏠</div>
          <div class="ml3-card-details">
            <span class="ml3-card-title">${s.title}</span>
            <span class="ml3-card-subtitle">${s.sub}</span>
          </div>
        </div>
      `).join('');

      accordionHTML += `
        <div class="ml3-accordion-group ${index === 0 ? 'ml3-expanded' : ''}" data-cat-id="${key}">
          <div class="ml3-accordion-header ml3-interactive">
            <span>${categoryLabel}</span>
            ${ICONS.arrowDown}
          </div>
          <div class="ml3-accordion-body">
            <div class="ml3-grid">
              ${gridItemsHTML}
            </div>
          </div>
        </div>
      `;
    });

    // ─ Settings / Action Sheet Items (Toolbar functions of L1)
    const settingsGridHTML = `
      <button class="ml3-setting-btn ml3-interactive ${ _isHotspotsVisible ? 'ml3-active-tool' : '' }" data-action="hotspots">
        ${ICONS.hotspot}
        <span>Điểm Chạm</span>
      </button>
      <button class="ml3-setting-btn ml3-interactive" data-action="fullscreen">
        ${ICONS.fullscreen}
        <span>Toàn Màn</span>
      </button>
      <button class="ml3-setting-btn ml3-interactive" data-action="share">
        ${ICONS.share}
        <span>Chia Sẻ</span>
      </button>
      <button class="ml3-setting-btn ml3-interactive" data-action="info">
        ${ICONS.info}
        <span>Thông Tin</span>
      </button>
      <button class="ml3-setting-btn ml3-interactive" data-action="region-page">
        ${ICONS.region}
        <span>L.Kết Vùng</span>
      </button>

      <!-- Social Row Dropdown from Layout 1 -->
      <div class="ml3-social-row">
        <a href="${config.social.facebook}" target="_blank" class="ml3-social-btn ml3-interactive">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          Facebook
        </a>
        <a href="${config.social.instagram}" target="_blank" class="ml3-social-btn ml3-interactive">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98C23.986 15.668 24 15.259 24 12c0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
          Instagram
        </a>
        <a href="${config.social.zalo}" target="_blank" class="ml3-social-btn ml3-interactive">
          <svg viewBox="0 0 40 40" fill="currentColor"><path d="M20 0C8.955 0 0 8.954 0 20c0 11.045 8.955 20 20 20s20-8.955 20-20C40 8.954 31.045 0 20 0zm9.09 28.182c-1.091 1.09-2.273 1.636-3.636 1.636-.727 0-1.454-.182-2.09-.455l-5.91 2.364.91-5.273c-1.636-1.454-2.637-3.545-2.637-5.818 0-4.364 3.546-7.909 7.91-7.909 4.363 0 7.909 3.545 7.909 7.909 0 2.909-1.546 5.454-4 6.909l1.544 .637z"/></svg>
          Zalo
        </a>
      </div>

      <!-- Mobile Layout Switcher -->
      <div class="ml3-switcher-row">
        <span class="ml3-switcher-label">Giao Diện:</span>
        <div class="ml3-switcher-pills">
          <button class="ml3-switcher-pill ml3-interactive" data-layout-switch="1">L1</button>
          <button class="ml3-switcher-pill ml3-interactive" data-layout-switch="2">L2</button>
          <button class="ml3-switcher-pill ml3-active ml3-interactive" data-layout-switch="3">L3</button>
          <button class="ml3-switcher-pill ml3-interactive" data-layout-switch="4">L4</button>
          <button class="ml3-switcher-pill ml3-interactive" data-layout-switch="5">L5</button>
          <button class="ml3-switcher-pill ml3-interactive" data-layout-switch="6">L6</button>
        </div>
      </div>
    `;

    return `
      <!-- ① Top Strip (Branding & Compass) -->
      <div class="ml3-top-strip">
        <div class="ml3-logo-pill ml3-interactive" id="ml3-logo-btn">
          <div>
            <div class="ml3-logo-title">${config.projectTitle.top}</div>
            <div class="ml3-logo-sub">${config.projectTitle.sub}</div>
          </div>
          <div class="ml3-layout-badge">
            ${ICONS.layout}
            <span>ML3</span>
          </div>
        </div>
        <div class="ml3-compass ml3-interactive" id="ml3-compass" title="Đặt lại hướng nhìn">
          ${compassSVG}
        </div>
      </div>

      <!-- ② Scene Change Toast Notifications -->
      <div class="ml3-toast" id="ml3-toast"></div>

      <!-- ③ Minimap Card (Collapsible, Floating) -->
      <div class="ml3-minimap-card" id="ml3-minimap-card">
        <div class="ml3-minimap-header">
          <span class="ml3-minimap-label">Bản đồ</span>
          <div class="ml3-minimap-close-btn ml3-interactive" id="ml3-minimap-close">${ICONS.close}</div>
        </div>
        <div class="ml3-minimap-viewport" id="ml3-minimap-viewport">
          <img src="image/Map_optimized.jpg" id="ml3-minimap-img" class="ml3-minimap-img" alt="Map">
          <div class="ml3-minimap-radar" id="ml3-minimap-radar">
            <div class="ml3-minimap-cone" id="ml3-minimap-cone"></div>
            <div class="ml3-minimap Dot" style="position: absolute; width: 8px; height: 8px; background: var(--ml3-primary); border-radius: 50%; transform: translate(-50%, -50%); box-shadow: 0 0 6px var(--ml3-primary);"></div>
          </div>
        </div>
        <div class="ml3-minimap-zoom">
          <button class="ml3-minimap-zoom-btn ml3-interactive" id="ml3-zoom-in">+</button>
          <button class="ml3-minimap-zoom-btn ml3-interactive" id="ml3-zoom-out">−</button>
        </div>
      </div>

      <!-- ④ Horizontal Scene Carousel Swipe Strip -->
      <div class="ml3-carousel-strip" id="ml3-carousel-strip">
        <div class="ml3-carousel-track" id="ml3-carousel-track"></div>
      </div>

      <!-- ⑤ Floating Bottom Nav Bar (Dock) -->
      <nav class="ml3-dock ml3-interactive" id="ml3-dock" role="navigation" aria-label="Main Navigation">
        <!-- Tab 1: Menu Sheets -->
        <button class="ml3-dock-tab ml3-interactive" id="ml3-tab-menu" aria-label="Danh Mục Cảnh">
          <div class="ml3-ripple-container"></div>
          ${ICONS.menu}
          <span>Cảnh</span>
        </button>
        <!-- Tab 2: Minimap Toggle -->
        <button class="ml3-dock-tab ml3-interactive" id="ml3-tab-map" aria-label="Bản Đồ">
          <div class="ml3-ripple-container"></div>
          ${ICONS.map}
          <span>Bản Đồ</span>
        </button>
        
        <!-- Center FAB (Settings/Toolbar Actions) -->
        <button class="ml3-dock-fab ml3-interactive" id="ml3-fab-btn" aria-label="Cài Đặt">
          <div class="ml3-ripple-container"></div>
          ${ICONS.settings}
        </button>

        <!-- Tab 4: Gallery Toggle -->
        <button class="ml3-dock-tab ml3-interactive" id="ml3-tab-gallery" aria-label="Hình Ảnh Thư Viện">
          <div class="ml3-ripple-container"></div>
          ${ICONS.gallery}
          <span>Thư Viện</span>
        </button>
        <!-- Tab 5: Music Toggle -->
        <button class="ml3-dock-tab ml3-interactive" id="ml3-tab-audio" aria-label="Âm Nhạc Nền">
          <div class="ml3-ripple-container"></div>
          <span id="ml3-audio-icon">${ICONS.audio}</span>
          <span id="ml3-audio-label">Âm Nhạc</span>
        </button>
      </nav>

      <!-- ⑥ Backdrop for Sheets -->
      <div class="ml3-backdrop" id="ml3-backdrop"></div>

      <!-- ⑦ Menu Sheet Drawer (DANH MỤC) -->
      <div class="ml3-sheet" id="ml3-nav-sheet" role="dialog" aria-label="Danh Mục Cảnh">
        <div class="ml3-sheet-handle" id="ml3-nav-handle"></div>
        <div class="ml3-sheet-header">
          <span class="ml3-sheet-title">Danh Mục Cảnh</span>
          <div class="ml3-sheet-close ml3-interactive" id="ml3-nav-close">${ICONS.close}</div>
        </div>
        <div class="ml3-nav-scroll">
          ${accordionHTML}
        </div>
      </div>

      <!-- ⑧ Settings Sheet (CÀI ĐẶT) -->
      <div class="ml3-sheet" id="ml3-settings-sheet" role="dialog" aria-label="Cài Đặt Hệ Thống">
        <div class="ml3-sheet-handle" id="ml3-settings-handle"></div>
        <div class="ml3-sheet-header">
          <span class="ml3-sheet-title">Cài Đặt Hệ Thống</span>
          <div class="ml3-sheet-close ml3-interactive" id="ml3-settings-close">${ICONS.close}</div>
        </div>
        <div class="ml3-settings-grid">
          ${settingsGridHTML}
        </div>
      </div>
    `;
  }

  // ── Touch Feedback: Ripple Effect ──────────────────────────────────
  function addRipple(el, e) {
    const container = el.querySelector('.ml3-ripple-container');
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = (e.clientX || (e.touches && e.touches[0].clientX) || rect.left + rect.width / 2) - rect.left;
    const y = (e.clientY || (e.touches && e.touches[0].clientY) || rect.top + rect.height / 2) - rect.top;
    const ripple = document.createElement('div');
    ripple.className = 'ml3-ripple';
    ripple.style.cssText = `left:${x}px;top:${y}px;width:${rect.width}px;height:${rect.width}px;margin-left:-${rect.width/2}px;margin-top:-${rect.width/2}px`;
    container.appendChild(ripple);
    setTimeout(() => ripple.remove(), 550);
  }

  // ── Sheet Control ──────────────────────────────────────────────────
  function openSheet(sheetId) {
    closeAllSheets();
    const sheet = document.getElementById(sheetId);
    if (!sheet) return;
    sheet.classList.add('ml3-open');
    
    const backdrop = document.getElementById('ml3-backdrop');
    if (backdrop) {
      backdrop.classList.add('ml3-open');
      if (sheetId === 'ml3-nav-sheet') {
        backdrop.classList.add('ml3-dim');
      } else {
        backdrop.classList.remove('ml3-dim');
      }
    }
    _activeSheet = sheetId;

    // Scroll active scene card into view if opening the navigation sheet
    if (sheetId === 'ml3-nav-sheet') {
      // Ensure the accordion group containing active scene is expanded
      const activeCard = sheet.querySelector('.ml3-active-scene');
      if (activeCard) {
        const group = activeCard.closest('.ml3-accordion-group');
        if (group && !group.classList.contains('ml3-expanded')) {
          _expandAccordion(group);
        }
        setTimeout(() => {
          activeCard.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
        }, 300);
      }
    }

    // Drag-to-close handler
    const handle = sheet.querySelector('.ml3-sheet-handle');
    if (handle) _attachDragClose(sheet, handle);
  }

  function closeAllSheets() {
    ['ml3-nav-sheet', 'ml3-settings-sheet'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.remove('ml3-open');
    });
    const backdrop = document.getElementById('ml3-backdrop');
    if (backdrop) {
      backdrop.classList.remove('ml3-open');
      backdrop.classList.remove('ml3-dim');
    }
    document.getElementById('ml3-fab-btn').classList.remove('ml3-open');
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
      if (e.changedTouches[0].clientY - startY > 75) closeAllSheets();
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
    // Collapse others
    document.querySelectorAll('.ml3-accordion-group').forEach(g => {
      if (g !== group) {
        g.classList.remove('ml3-expanded');
        g.querySelector('.ml3-accordion-body').style.maxHeight = '0px';
      }
    });
    // Expand target
    group.classList.add('ml3-expanded');
    const body = group.querySelector('.ml3-accordion-body');
    body.style.maxHeight = '500px';
  }

  function toggleAccordion(group) {
    const isExpanded = group.classList.contains('ml3-expanded');
    if (isExpanded) {
      group.classList.remove('ml3-expanded');
      group.querySelector('.ml3-accordion-body').style.maxHeight = '0px';
    } else {
      _expandAccordion(group);
    }
  }

  // ── Swipe Carousel Builder ─────────────────────────────────────────
  function buildCarousel(category, activeNodeId) {
    if (!category) return;
    _activeCategory = category;

    const core = window.TAV_CORE;
    const catScenes = core.getScenesByCategory(category);
    const track = document.getElementById('ml3-carousel-track');
    if (!track) return;

    if (catScenes.length <= 1) {
      document.getElementById('ml3-carousel-strip').classList.remove('ml3-visible');
      return;
    }

    // Find index of the active scene
    let activeIdx = catScenes.findIndex(s => s.id === activeNodeId);
    if (activeIdx === -1) activeIdx = 0;

    // Rotate the scenes array so the active scene is always exactly in the center
    const N = catScenes.length;
    const mid = Math.floor(N / 2);
    const rotatedScenes = [];
    for (let i = 0; i < N; i++) {
      const targetIdx = (activeIdx - mid + i + N) % N;
      rotatedScenes.push(catScenes[targetIdx]);
    }

    track.innerHTML = rotatedScenes.map(s => `
      <div class="ml3-carousel-item ml3-interactive ${s.id === activeNodeId ? 'ml3-active-card' : ''}" data-action="${s.action}" data-node="${s.action}">
        <img src="${s.thumb}" alt="${s.title}" onerror="this.src='preview.jpg'">
        <div class="ml3-carousel-item-info">
          <div class="ml3-carousel-item-title">${s.title}</div>
        </div>
      </div>
    `).join('');

    document.getElementById('ml3-carousel-strip').classList.add('ml3-visible');

    // Smoothly scroll the middle card (the active one) to the center of the track
    setTimeout(() => {
      const activeCard = track.querySelector('.ml3-active-card');
      if (activeCard) {
        track.style.scrollSnapType = 'none';
        const targetScrollLeft = activeCard.offsetLeft - (track.clientWidth / 2) + (activeCard.clientWidth / 2);
        track.scrollTo({ left: targetScrollLeft, behavior: 'smooth' });
        setTimeout(() => {
          if (track) track.style.scrollSnapType = 'x proximity';
        }, 300);
      }
    }, 100);
  }

  // ── Toast Notifications ────────────────────────────────────────────
  let _toastTimer = null;
  function showSceneToast(title) {
    const toast = document.getElementById('ml3-toast');
    if (!toast) return;
    toast.textContent = title;
    toast.classList.add('ml3-visible');
    clearTimeout(_toastTimer);
    _toastTimer = setTimeout(() => toast.classList.remove('ml3-visible'), 2400);
  }

  // ── Minimap ────────────────────────────────────────────────────────
  function toggleMinimap() {
    _minimapOpen = !_minimapOpen;
    const card = document.getElementById('ml3-minimap-card');
    if (card) card.classList.toggle('ml3-open', _minimapOpen);
    const tab = document.getElementById('ml3-tab-map');
    if (tab) tab.classList.toggle('ml3-active', _minimapOpen);
  }

  function updateMinimapTransform() {
    const img = document.getElementById('ml3-minimap-img');
    if (img) img.style.transform = `translate(${_mapX}px, ${_mapY}px) scale(${_mapZoom})`;
  }

  function initMinimapDrag() {
    const vp = document.getElementById('ml3-minimap-viewport');
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

  // ── Audio Toggle Synchronization ───────────────────────────────────
  function syncAudioButton() {
    const isMuted = window.TAV_CORE.isMusicMuted;
    const iconEl  = document.getElementById('ml3-audio-icon');
    const tab     = document.getElementById('ml3-tab-audio');
    if (iconEl)  iconEl.innerHTML   = isMuted ? ICONS.audioMute : ICONS.audio;
    if (tab)     tab.classList.toggle('ml3-active', !isMuted);
  }

  // ── Scene Sync ─────────────────────────────────────────────────────
  function syncActiveScene(nodeId) {
    if (!nodeId || nodeId === _activeScene) return;
    _activeScene = nodeId;

    const core = window.TAV_CORE;
    const scene = core.getSceneById(nodeId);

    // Update Category Accordion selection grid
    document.querySelectorAll('#ml3-nav-sheet .ml3-card').forEach(card => {
      const isActive = card.dataset.node === nodeId;
      card.classList.toggle('ml3-active-scene', isActive);
    });

    if (scene) {
      showSceneToast(scene.title);
      // Synchronize horizontal swipe carousel (always pass active node to center it)
      buildCarousel(scene.category, nodeId);
    }
  }

  // ── Compass & Pano Sync ────────────────────────────────────────────
  function syncCompass(pan) {
    const needle = document.getElementById('ml3-compass-needle');
    if (needle) needle.style.transform = `rotate(${-pan}deg)`;
    const cone = document.getElementById('ml3-minimap-cone');
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

    // Node navigation
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
        if (el) el.classList.toggle('ml3-active-tool', newVisible);

        // Sync other hotspot buttons
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

    // Backdrop Click
    document.getElementById('ml3-backdrop').addEventListener('click', closeAllSheets);

    // Compass click -> Reset view
    document.getElementById('ml3-compass').addEventListener('click', () => {
      const pano = core.getPano();
      if (pano && typeof pano.setPan === 'function') pano.setPan(0);
      document.getElementById('ml3-compass').classList.add('ml3-pulse');
      setTimeout(() => document.getElementById('ml3-compass').classList.remove('ml3-pulse'), 800);
    });

    // Top Brand Logo Badge -> opens Settings Sheet
    document.getElementById('ml3-logo-btn').addEventListener('click', () => {
      openSheet('ml3-settings-sheet');
    });

    // Tab: Menu
    const tabMenu = document.getElementById('ml3-tab-menu');
    tabMenu.addEventListener('click', e => {
      addRipple(tabMenu, e);
      if (_activeSheet === 'ml3-nav-sheet') closeAllSheets();
      else openSheet('ml3-nav-sheet');
    });

    // Tab: Map
    const tabMap = document.getElementById('ml3-tab-map');
    tabMap.addEventListener('click', e => {
      addRipple(tabMap, e);
      toggleMinimap();
    });

    // Tab: FAB Settings
    const fabBtn = document.getElementById('ml3-fab-btn');
    fabBtn.addEventListener('click', e => {
      addRipple(fabBtn, e);
      fabBtn.classList.toggle('ml3-open');
      if (_activeSheet === 'ml3-settings-sheet') closeAllSheets();
      else openSheet('ml3-settings-sheet');
    });

    // Tab: Gallery
    const tabGallery = document.getElementById('ml3-tab-gallery');
    tabGallery.addEventListener('click', e => {
      addRipple(tabGallery, e);
      dispatch('gallery', tabGallery, e);
    });

    // Tab: Audio
    const tabAudio = document.getElementById('ml3-tab-audio');
    tabAudio.addEventListener('click', e => {
      addRipple(tabAudio, e);
      dispatch('audio', tabAudio, e);
    });

    // Sheet close buttons
    document.getElementById('ml3-nav-close').addEventListener('click', closeAllSheets);
    document.getElementById('ml3-settings-close').addEventListener('click', closeAllSheets);

    // Accordion group headers
    document.querySelectorAll('.ml3-accordion-header').forEach(header => {
      header.addEventListener('click', () => {
        const group = header.closest('.ml3-accordion-group');
        toggleAccordion(group);
      });
    });

    // Navigation Menu Scene Cards Click
    document.getElementById('ml3-nav-sheet').addEventListener('click', e => {
      const card = e.target.closest('.ml3-card');
      if (!card) return;
      addRipple(card, e);
      dispatch(card.dataset.action, card, e);
    });

    // Swipe Carousel Cards Click
    document.getElementById('ml3-carousel-track').addEventListener('click', e => {
      const card = e.target.closest('.ml3-carousel-item');
      if (!card) return;
      dispatch(card.dataset.action, card, e);
    });

    // Action sheet settings items
    document.querySelectorAll('.ml3-setting-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        addRipple(btn, e);
        dispatch(btn.dataset.action, btn, e);
      });
    });

    // Minimap close zoom
    document.getElementById('ml3-minimap-close').addEventListener('click', () => {
      _minimapOpen = false;
      document.getElementById('ml3-minimap-card').classList.remove('ml3-open');
      document.getElementById('ml3-tab-map').classList.remove('ml3-active');
    });
    document.getElementById('ml3-zoom-in').addEventListener('click', () => {
      _mapZoom = Math.min(3, _mapZoom + 0.25);
      updateMinimapTransform();
    });
    document.getElementById('ml3-zoom-out').addEventListener('click', () => {
      _mapZoom = Math.max(0.5, _mapZoom - 0.25);
      updateMinimapTransform();
    });

    // Mobile layout switcher segment clicks
    document.querySelectorAll('[data-layout-switch]').forEach(btn => {
      btn.addEventListener('click', () => {
        const layoutId = btn.dataset.layoutSwitch;
        if (typeof window.switchMobileLayout === 'function') {
          window.switchMobileLayout(layoutId);
        }
      });
    });

    // TAV_CORE scene change callback
    core.onSceneChange(nodeId => syncActiveScene(nodeId));
  }

  // ── Hide Desktop UI elements on mobile ────────────────────────────
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
    style.id       = 'ml3-desktop-hide';
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
  const MobileLayout3 = {

    init() {
      if (_overlay) { console.warn('[ML3] Already initialized'); return; }
      if (!window.TAV_CORE) { console.error('[ML3] TAV_CORE not loaded — aborting'); return; }

      // Reset scroll to top to prevent layout shifting
      window.scrollTo(0, 0);

      // Build and mount overlay
      _overlay    = document.createElement('div');
      _overlay.id = 'ml3-overlay';
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

      // Trigger active scene display immediately
      const current = window.TAV_CORE.currentScene;
      if (current) syncActiveScene(current);

      console.log('[ML3] Mobile Layout 3 initialized ✓');
    },

    destroy() {
      if (!_overlay) return;
      clearInterval(_syncInterval);
      _syncInterval = null;

      const hide = document.getElementById('ml3-desktop-hide');
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

      console.log('[ML3] Mobile Layout 3 destroyed');
    }
  };

  // ── Export ────────────────────────────────────────────────
  window.MobileLayout3 = MobileLayout3;
  console.log('[ML3] Mobile Layout 3 module loaded');

})();
