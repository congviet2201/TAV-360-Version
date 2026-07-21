function initMobileUI() {
  if (window.innerWidth > 1024) return;

  // ── Retry if TAV_CORE not ready yet (shared_core.js may still be parsing) ──
  if (!window.TAV_CORE) {
    var _retries = (window._mobileUIRetries || 0) + 1;
    window._mobileUIRetries = _retries;
    if (_retries < 20) {
      setTimeout(initMobileUI, 150);
    } else {
      console.error('[Mobile UI] TAV_CORE never became available after 3s. Aborting.');
    }
    return;
  }
  window._mobileUIRetries = 0;
  
  // ── Hide ALL Desktop UIs ──
  // CRITICAL: #modern-ui-overlay is the outermost Desktop wrapper.
  // Without hiding it, body.layout-XX classes make desktop CSS fire on mobile.
  const desktopSelectors = [
    '#modern-ui-overlay',          // ← THE FIX: hide the entire Desktop wrapper
    '#ui-wrapper', '#minimap-widget', '#compass-widget',
    '.layout-switcher-wrapper', '#layout-switcher-wrapper', '.layout-switcher-trigger',
    '.bottom-nav-container', '.vertical-tool-stack', '.sidebar-container',
    '.gradient-floating-logo', '.cmd-top-ribbon', '.cmd-scene-explorer', '.cmd-spatial-control',
    '#cmd-top-ribbon', '#cmd-node-label', '#cmd-scene-name', '#cmd-coord-display',
    '#cmd-pan-val', '#cmd-tilt-val', '#cmd-scene-explorer', '#cmd-explorer-collapse-header',
    '#cmd-explorer-collapse', '#cmd-explorer-body', '#cmd-explorer-list',
    '#cmd-spatial-control', '#cmd-music-tile', '#cmd-hotspot-tile',
    '.cmd-right-nav', '.cmd-left-tools', '.cmd-bottom-dock',
    '.horizon-top-nav', '.horizon-bottom-nav', '.aurora-glass-nav', '.aurora-glass-toolbar',
    '#vision-left-dock', '#vision-right-dock',
    '.blueprint-floating-gallery-container', '#blueprint-gallery-container', '#blueprint-gallery-panel',
    '.premium-carousel-container', '.premium-scene-browser', '#premium-scene-browser',
    '.layout-floating-logo', '.gradient-quick-actions', '.quick-nav-panel', '.bottom-nav-bar',
    '.futuristic-settings-group', '.neo-unified-trigger',
    '.aurora-nav-pin-btn', '.aurora-tool-pin-btn', '.compass-widget', '.horizon-dock',
    '.prism-nav-wrapper', '.prism-tool-container', '.nexus-nav-wrapper', '.nexus-tool-container',
    '.monarch-nav-wrapper', '.monarch-command-panel', '.minimap-widget',
    '.blueprint-top-ribbon', '.rgl-neo-nav-wrapper', '.rgl-neo-tools-system', '.blueprint-layout-switcher'
  ];

  const cssHide = document.createElement('style');
  cssHide.id = 'ml1-desktop-hide';
  // 1. Hide all desktop component selectors
  // 2. Strip layout body classes so desktop CSS rules don't fire on mobile
  cssHide.innerHTML = `
    @media screen and (max-width: 1024px) {
      ${desktopSelectors.join(', ')} { display: none !important; }
      body.layout-classic, body.layout-futuristic, body.layout-neo, body.layout-gradient,
      body.layout-aurora, body.layout-horizon, body.layout-prism, body.layout-nexus,
      body.layout-monarch, body.layout-regal, body.layout-command {
        /* Reset desktop layout body class visual effects on mobile */
        background: #000 !important;
      }
    }
  `;
  document.head.appendChild(cssHide);

  // ── Scene data from Shared Core ──
  const scenes = window.TAV_CORE.scenes;
  window.TAV_SCENES = scenes; // backward-compat alias


  let isHotspotsHidden = false;

  // Build carousel from Shared Core scenes
  let carouselHTML = scenes.map(scene => `
    <div class="mob-carousel-item" data-action="${scene.action}" data-node="${scene.action}">
      <img src="${scene.thumb}" alt="${scene.title}" onerror="this.src='preview.jpg'">
      <div class="mob-carousel-text">
        <div class="mob-carousel-title">${scene.title}</div>
      </div>
    </div>
  `).join('');

  const mobileUI = document.createElement('div');
  mobileUI.id = 'mobile-ui-overlay';

  mobileUI.innerHTML = `
    <!-- HEADER (Compass & Minimap) -->
    <div class="mob-header">
      <div class="mob-compass" id="mob-compass" onclick="if(window.pano) window.pano.setPan(0)">
        <svg viewBox="0 0 100 100" width="24" height="24"><circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="6"/><polygon points="50,15 65,50 50,85 35,50" fill="rgba(255,255,255,0.8)"/><polygon points="50,15 65,50 50,50 35,50" fill="#ff3366"/></svg>
      </div>
      <div class="mob-minimap" id="mob-minimap-toggle">
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="#00f2fe" stroke-width="2" fill="none"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon></svg>
      </div>
    </div>
    
    <!-- MINIMAP PANEL -->
    <div class="mob-minimap-panel" id="mob-minimap-panel">
      <!-- Real minimap container hooked to pano data -->
      <div id="mob-real-minimap" style="width: 100%; height: 100%; position: relative; overflow: hidden;">
        <img src="image/Map_optimized.jpg" id="mob-minimap-img" alt="Map" style="position: absolute; width: 200%; max-width: none; transition: transform 0.1s linear; transform-origin: top left;">
        <div id="mob-minimap-radar" style="position: absolute; top: 50%; left: 50%; width: 0; height: 0; z-index: 10;">
            <div id="mob-minimap-cone" style="position: absolute; width: 0; height: 0; border-left: 20px solid transparent; border-right: 20px solid transparent; border-top: 40px solid rgba(0, 242, 254, 0.4); transform-origin: bottom center; transform: translate(-50%, -100%);"></div>
            <div style="position: absolute; width: 12px; height: 12px; background: var(--m-primary); border-radius: 50%; transform: translate(-50%, -50%); box-shadow: 0 0 10px var(--m-primary);"></div>
        </div>
      </div>
      <div class="mob-minimap-zoom-ctrl">
        <button id="mob-zoom-in">+</button>
        <button id="mob-zoom-out">-</button>
      </div>
    </div>

    <!-- CAROUSEL SCENE NAVIGATION -->
    <div class="mob-carousel-container">
      <button class="mob-carousel-btn prev" id="mob-carousel-prev"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 19l-7-7 7-7" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
      <div class="mob-carousel" id="mob-carousel">${carouselHTML}</div>
      <button class="mob-carousel-btn next" id="mob-carousel-next"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
      <button class="mob-carousel-expand" id="mob-carousel-expand">
        <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
      </button>
    </div>

    <!-- FLOATING BOTTOM TOOLBAR -->
    <nav class="mob-toolbar">
      <button class="mob-tool-btn" data-action="gallery">
        <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="2" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
          <span>Thư viện</span>
      </button>
      <button class="mob-tool-btn" data-action="region">
        <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="2" fill="none"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>
          <span>L.Kết Vùng</span>
      </button>
      <button class="mob-tool-btn" data-action="autorotate">
        <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="2" fill="none"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>
          <span>Tự xoay</span>
      </button>
      <button class="mob-tool-btn" id="mob-more-btn">
        <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="2" fill="none"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
          <span>Công Cụ</span>
      </button>
    </nav>

    <!-- MORE & NAVIGATION BOTTOM SHEETS -->
    <div class="mob-overlay" id="mob-overlay"></div>
    
    <div class="mob-side-panel" id="mob-more-sheet">
      <div class="mob-sheet-handle"></div>
          <div class="mob-sheet-title">Công Cụ (More)</div>
      <div class="mob-tools-grid">
        <button class="mob-grid-tool active active-tool" data-action="music" id="mob-music-btn"> Âm nhạc </button>
        <button class="mob-grid-tool active active-tool" data-action="hotspots" id="mob-hotspot-btn"> Điểm chạm </button>
        <button class="mob-grid-tool" data-action="share"> Chia sẻ </button>
        <button class="mob-grid-tool" data-action="contact"> Liên hệ </button>
        <button class="mob-grid-tool" data-action="info"> Thông tin </button>
        <button class="mob-grid-tool" style="color: #00f2fe; border-color: rgba(0,242,254,0.4);" onclick="if(window.switchMobileLayout) window.switchMobileLayout('2')"> Giao diện 2 </button>
      </div>
    </div>

    <div class="mob-side-panel" id="mob-nav-sheet">
      <div class="mob-sheet-handle"></div>
          <div class="mob-sheet-title">Tất cả Cảnh (Navigation)</div>
      <div class="mob-menu-list" id="mob-menu-list"></div>
    </div>
  `;

  document.body.appendChild(mobileUI);

  // Generate Menu List from Shared Core scenes
  const categories = [...new Set(scenes.map(s => s.category))];
  const menuList = document.getElementById('mob-menu-list');
  categories.forEach(cat => {
    let groupHTML = `<div class="mob-menu-group"><div class="mob-menu-group-title">${cat}</div>`;
    window.TAV_SCENES.filter(s => s.category === cat).forEach(n => {
      groupHTML += `<button class="mob-menu-item" data-action="${n.action}">${n.title}</button>`;
    });
    groupHTML += `</div>`;
    menuList.innerHTML += groupHTML;
  });

  // Hotspots optimization injection
  const cssInject = document.createElement("style");
  cssInject.innerHTML = `
    .hologram-marker-container, .ggnode { padding: 15px !important; margin: -15px !important; background-clip: content-box !important; cursor: pointer !important; }
  `;
  document.head.appendChild(cssInject);

  // Bottom Sheet Logic (with Drag to close)
  let activeSheet = null;
  let startY = 0;
  const overlay = document.getElementById("mob-overlay");
  
  const toggleSheet = (sheetId) => {
    const sheet = document.getElementById(sheetId);
    if (activeSheet === sheet) {
      sheet.classList.remove("open");
      overlay.classList.remove("open");
      activeSheet = null;
    } else {
      if (activeSheet) activeSheet.classList.remove("open");
      sheet.classList.add("open");
      overlay.classList.add("open");
      overlay.classList.add("transparent-bg"); activeSheet = sheet;
    }
  };

  overlay.addEventListener("click", () => {
    if (activeSheet) toggleSheet(activeSheet.id);
  });

  document.querySelectorAll('.mob-bottom-sheet').forEach(sheet => {
    const handle = sheet.querySelector('.mob-sheet-handle');
    handle.addEventListener('touchstart', e => startY = e.touches[0].clientY);
    handle.addEventListener('touchmove', e => {
      const delta = e.touches[0].clientY - startY;
      if (delta > 0) sheet.style.transform = `translateY(${delta}px)`;
    });
    handle.addEventListener('touchend', e => {
      sheet.style.transform = '';
      if (e.changedTouches[0].clientY - startY > 50) toggleSheet(sheet.id);
    });
  });

  document.getElementById("mob-more-btn").addEventListener("click", () => toggleSheet("mob-more-sheet"));
  document.getElementById("mob-carousel-expand").addEventListener("click", () => toggleSheet("mob-nav-sheet"));
  
  // Minimap
  document.getElementById("mob-minimap-toggle").addEventListener("click", () => {
    document.getElementById("mob-minimap-panel").classList.toggle("open");
  });

  let mapZoom = 1;
  let mapX = -20;
  let mapY = -20;
  const mapImg = document.getElementById("mob-minimap-img");
  
  document.getElementById("mob-zoom-in").addEventListener("click", () => { mapZoom += 0.2; updateMap(); });
  document.getElementById("mob-zoom-out").addEventListener("click", () => { mapZoom = Math.max(0.5, mapZoom - 0.2); updateMap(); });

  let isDraggingMap = false, startMx = 0, startMy = 0;
  const realMinimap = document.getElementById("mob-real-minimap");
  realMinimap.addEventListener("touchstart", (e) => {
    isDraggingMap = true;
    startMx = e.touches[0].clientX - mapX;
    startMy = e.touches[0].clientY - mapY;
  });
  realMinimap.addEventListener("touchmove", (e) => {
    if(!isDraggingMap) return;
    mapX = e.touches[0].clientX - startMx;
    mapY = e.touches[0].clientY - startMy;
    updateMap();
  });
  realMinimap.addEventListener("touchend", () => { isDraggingMap = false; });

  function updateMap() {
    mapImg.style.transform = `translate(${mapX}px, ${mapY}px) scale(${mapZoom})`;
  }

  // Carousel Controls
  const carousel = document.getElementById("mob-carousel");
  document.getElementById("mob-carousel-prev").addEventListener("click", () => carousel.scrollBy({ left: -100, behavior: 'smooth' }));
  document.getElementById("mob-carousel-next").addEventListener("click", () => carousel.scrollBy({ left: 100, behavior: 'smooth' }));

  // Tool Actions
  document.querySelectorAll("[data-action]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const action = btn.getAttribute("data-action");
      if (activeSheet) toggleSheet(activeSheet.id);
      
      if (action.startsWith("node") || action.startsWith("architecture-")) {
        if (window.pano) window.pano.openNext(`{${action}}`);
      } else {
        switch(action) {
          case 'autorotate':
            window.TAV_CORE.navigateTo('autorotate');
            break;
          case 'gallery': {
            if (typeof window.openGlobalPanoramaGallery === 'function') {
              window.openGlobalPanoramaGallery();
            } else {
              const galleryBtn = document.querySelector('[data-action="images"]:not(.mob-grid-tool):not(.mob-tool-btn)');
              if (galleryBtn) galleryBtn.click();
            }
            break;
          }
          case 'region': {
            const regionBtn = document.querySelector('[data-action="region-page"]:not(.mob-grid-tool):not(.mob-tool-btn)');
            if (regionBtn) regionBtn.click();
            break;
          }
          case 'contact': {
            window.open('https://tav.vn/', '_blank');
            break;
          }
          case 'share': {
            if (navigator.share) {
              navigator.share({ title: 'TAV Virtual Tour', url: window.location.href }).catch(() => {});
            }
            break;
          }
          case 'info': {
            const infoModal = document.getElementById('project-info-modal');
            if (infoModal) infoModal.classList.add('active');
            break;
          }
          case 'hotspots': {
            const hs = document.querySelectorAll(".hologram-marker-container, .hs-container");
            const isHidden = document.body.classList.contains('hide-hotspots');
            const newVisible = isHidden;
            document.body.classList.toggle('hide-hotspots', !newVisible);
            if (window.pano && typeof window.pano.setPointHotspotsVisible === 'function') {
              window.pano.setPointHotspotsVisible(newVisible);
            }
            hs.forEach(h => {
              h.style.visibility = newVisible ? "visible" : "hidden";
              h.style.opacity = newVisible ? "" : "0";
            });
            document.querySelectorAll('[data-action="hotspots"]').forEach(b => {
              b.classList.toggle('active', newVisible);
              b.classList.toggle('active-tool', newVisible);
            });
            break;
          }
          case 'music':
            window.TAV_CORE.toggleMusic();
            document.querySelectorAll('[data-action="music"]').forEach(b => {
              b.classList.toggle('active',      !window.TAV_CORE.isMusicMuted);
              b.classList.toggle('active-tool', !window.TAV_CORE.isMusicMuted);
            });
            break;
        }
      }
    });
  });

  // Pano Sync
  setInterval(() => {
    if (!window.pano) return;
    const pan = window.pano.getPan();
    const compass = document.getElementById("mob-compass");
    if (compass) compass.style.transform = `rotate(${-pan}deg)`;
    const radar = document.getElementById("mob-minimap-cone");
    if (radar) radar.style.transform = `translate(-50%, -100%) rotate(${pan}deg)`;

    if (typeof window.pano.getCurrentNode === "function") {
      const activeNode = window.pano.getCurrentNode();
      document.querySelectorAll(".mob-carousel-item").forEach(item => {
        if (item.getAttribute("data-node") === activeNode) {
          if (!item.classList.contains("active")) {
            item.classList.add("active");
            item.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
          }
        } else {
          item.classList.remove("active");
        }
      });
    }
  }, 100);
}

if (document.readyState === "loading") { document.addEventListener("DOMContentLoaded", initMobileUI); } else { initMobileUI(); }

// ============================================================

// MOBILE LAYOUT ORCHESTRATOR
// Manages switching between Mobile Layout 1 and Mobile Layout 2.
// Only active on mobile (≤1024px).
// ============================================================
(function () {
  'use strict';

  // Only run on mobile viewports
  if (window.innerWidth > 1024) {
    // Re-check on resize (e.g. developer tools)
    window.addEventListener('resize', () => {
      if (window.innerWidth <= 1024 && !window._mobileOrchestratorInit) {
        initOrchestrator();
      }
    }, { once: true });
    return;
  }

  function initOrchestrator() {
    if (window._mobileOrchestratorInit) return;
    window._mobileOrchestratorInit = true;

    // Read saved preference (default: '1')
    const savedLayout = localStorage.getItem('tav-mobile-layout') || '1';

    // The orchestrator switches layouts on demand
    window.switchMobileLayout = function (layoutId) {
      const id = String(layoutId);
      if (id === localStorage.getItem('tav-mobile-layout')) return; // already active

      localStorage.setItem('tav-mobile-layout', id);

      // Destroy current active layout
      if (id === '2') {
        // Switching TO Layout 2 — destroy Layout 1 overlay if present
        const l1 = document.getElementById('mobile-ui-overlay');
        if (l1) l1.remove();
        const l1hide = document.getElementById('ml1-desktop-hide');
        if (l1hide) l1hide.remove();

        // Init Layout 2
        if (window.MobileLayout2) {
          window.MobileLayout2.init();
        } else {
          console.warn('[Orchestrator] MobileLayout2 module not loaded yet');
        }
      } else {
        // Switching TO Layout 1 — destroy Layout 2 overlay if present
        if (window.MobileLayout2) window.MobileLayout2.destroy();
        const l2hide = document.getElementById('ml2-desktop-hide');
        if (l2hide) l2hide.remove();
        const l2hotfix = document.getElementById('ml2-hotspot-fix');
        if (l2hotfix) l2hotfix.remove();

        // Init Layout 1 (re-run initMobileUI)
        if (typeof initMobileUI === 'function') initMobileUI();
      }

      console.log('[Orchestrator] Switched to Mobile Layout', id);
    };

    // Boot the saved layout
    if (savedLayout === '2') {
      // Wait briefly for ML2 module to register
      const tryBootL2 = (attempts) => {
        if (window.MobileLayout2) {
          // Layout 2: don't run initMobileUI, just init ML2
          window.MobileLayout2.init();
        } else if (attempts > 0) {
          setTimeout(() => tryBootL2(attempts - 1), 200);
        } else {
          // Fallback to Layout 1
          console.warn('[Orchestrator] ML2 not found, falling back to Layout 1');
          localStorage.setItem('tav-mobile-layout', '1');
        }
      };
      // initMobileUI was already called above by the original bootstrap —
      // destroy its output and switch to L2
      setTimeout(() => {
        const l1 = document.getElementById('mobile-ui-overlay');
        if (l1) l1.remove();
        tryBootL2(10);
      }, 300);
    }
    // Layout 1: initMobileUI already ran — nothing else needed

    console.log('[Orchestrator] Mobile Layout Orchestrator ready (layout:', savedLayout, ')');
  }

  // Wait for DOMContentLoaded before orchestrating
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(initOrchestrator, 100));
  } else {
    setTimeout(initOrchestrator, 100);
  }

})();
