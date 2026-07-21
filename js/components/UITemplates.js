// UITemplates.js - Centralized HTML Templates
// Automatically extracted from modern_ui.js

window.TAVTemplates = window.TAVTemplates || {};

(function() {
  window.layoutSwitcherHTML = `
    <div class="layout-switcher-wrapper" id="layout-switcher-wrapper">
      <div class="layout-switcher-trigger" style="width: auto; padding: 0 15px; border-radius: 20px; font-weight: 600; font-size: 14px; white-space: nowrap; font-family: 'Inter', sans-serif; letter-spacing: 0.5px; background: var(--primary-color, rgba(0,0,0,0.5)); border: 1px solid rgba(255,255,255,0.2);">
        TAV Version
      </div>
      <div class="layout-switcher-pill" id="layout-switcher">
        <div class="switcher-segment" id="opt-layout-classic"    data-layout="classic"    title="Layout 01 — Cổ Điển"><span class="sw-num">01</span> Cổ Điển</div>
        <div class="switcher-segment" id="opt-layout-futuristic" data-layout="futuristic" title="Layout 02 — Tương Lai"><span class="sw-num">02</span> Tương Lai</div>
        <div class="switcher-segment" id="opt-layout-neo"        data-layout="neo"        title="Layout 03 — Neo"><span class="sw-num">03</span> Neo</div>
        <div class="switcher-segment" id="opt-layout-gradient"   data-layout="gradient"   title="Layout 04 — Gradient"><span class="sw-num">04</span> Gradient</div>
        <div class="switcher-segment" id="opt-layout-aurora"     data-layout="aurora"     title="Layout 05 — Aurora"><span class="sw-num">05</span> Aurora</div>
        <div class="switcher-segment" id="opt-layout-horizon"    data-layout="horizon"    title="Layout 06 — Horizon"><span class="sw-num">06</span> Horizon</div>
        <div class="switcher-segment" id="opt-layout-prism"      data-layout="prism"      title="Layout 07 — Prism"><span class="sw-num">07</span> Prism</div>
        <div class="switcher-segment" id="opt-layout-nexus"      data-layout="nexus"      title="Layout 08 — Nexus"><span class="sw-num">08</span> Nexus</div>
        <div class="switcher-segment" id="opt-layout-monarch"    data-layout="monarch"    title="Layout 09 — Monarch"><span class="sw-num">09</span> Monarch</div>
        <div class="switcher-segment" id="opt-layout-regal"      data-layout="regal"      title="Layout 10 — Regal"><span class="sw-num">10</span> Regal</div>
        <div class="switcher-segment" id="opt-layout-command"    data-layout="command"    title="Layout 11 — Command"><span class="sw-num">11</span> Command</div>
        <div class="switcher-slider" id="switcher-slider"></div>
      </div>
    </div>
  `;

  // ==========================================
  // LAYOUT #11 — COMMAND: DIGITAL TWIN CONTROL CENTER
  // ==========================================

  window.cmdTopRibbonHTML = `
    <div class="cmd-top-ribbon" id="cmd-top-ribbon">
      <div class="cmd-ribbon-left">
        <div class="cmd-brand">
          <span class="cmd-brand-accent">TAV</span>
          <span class="cmd-brand-main">VILLA</span>
        </div>
        <div class="cmd-separator"></div>
        <div class="cmd-status-pill">
          <span class="cmd-pulse-dot"></span>
          <span>LIVE SPATIAL DATA</span>
        </div>
      </div>
      <div class="cmd-ribbon-center">
        <div class="cmd-node-label" id="cmd-node-label">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>
          <span id="cmd-scene-name">Top View</span>
        </div>
      </div>
      <div class="cmd-ribbon-right">
        <div class="cmd-coord-display" id="cmd-coord-display">
          <span class="cmd-coord-label">PAN</span>
          <span class="cmd-coord-val" id="cmd-pan-val">0°</span>
          <span class="cmd-coord-label">TILT</span>
          <span class="cmd-coord-val" id="cmd-tilt-val">0°</span>
        </div>
        <button class="cmd-ribbon-btn" data-action="fullscreen" title="Fullscreen">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3"/></svg>
        </button>
          <button class="cmd-ribbon-btn" data-action="autorotate" title="Tự động xoay">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/></svg>
          </button>
      </div>
    </div>
  `;

  window.cmdSceneExplorerHTML = `
    <!-- Left Sidebar: Scene Explorer -->
    <div class="cmd-scene-explorer collapsed" id="cmd-scene-explorer">
      <div class="cmd-panel-header" id="cmd-explorer-collapse-header">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>
        <span>SCENE EXPLORER</span>
        <button class="cmd-collapse-btn" id="cmd-explorer-collapse">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
      </div>
      <div class="cmd-explorer-body" id="cmd-explorer-body">
        <div class="cmd-explorer-list" id="cmd-explorer-list">
          <!-- scene items will be mapped here dynamically -->
        </div>
      </div>
    </div>
  `;

  window.premiumCarouselHTML = `
    <div id="premium-scene-carousel" class="premium-carousel-container">
      <button class="premium-carousel-nav prev" id="pc-prev" aria-label="Previous Scene">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      
      <div class="premium-carousel-track" id="pc-track">
        <!-- Cards injected dynamically -->
      </div>
      
      <button class="premium-carousel-nav next" id="pc-next" aria-label="Next Scene">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
      </button>

      <div class="pc-category-selector" id="pc-category-selector">
        <div class="pc-category-active" id="pc-category-active">
          <span id="pc-category-label">Category</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
        <div class="pc-category-dropdown" id="pc-category-dropdown">
          <!-- Categories injected dynamically -->
        </div>
      </div>
    </div>

    <!-- Floating Expand Mode (Scene Browser) -->
    <div id="premium-scene-browser" class="premium-scene-browser">
      <div class="psb-overlay" id="psb-overlay"></div>
      <div class="psb-modal">
        <div class="psb-header">
          <h2>All Views</h2>
          <div class="psb-search-wrapper">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" id="psb-search" placeholder="Search scenes..." />
          </div>
          <button class="psb-close" id="psb-close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div class="psb-filters" id="psb-filters">
          <!-- Filter pills injected dynamically -->
        </div>
        <div class="psb-grid" id="psb-grid">
          <!-- Thumbnails injected dynamically -->
        </div>
      </div>
    </div>
  `;

  window.cmdSpatialControlHTML = `
    <div class="cmd-spatial-control" id="cmd-spatial-control">
      <div class="cmd-ctrl-tile" data-action="info" title="Thông tin dự án">
        <div class="cmd-ctrl-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.8"/><path d="M12 16v-4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="12" cy="8" r="1.5" fill="currentColor"/></svg></div>
        <div class="cmd-ctrl-label">INFO</div>
        <div class="cmd-ctrl-glow"></div>
      </div>
      <div class="cmd-ctrl-tile" data-action="images" title="Th\u01b0 vi\u1ec7n h\u00ecnh \u1ea3nh">
        <div class="cmd-ctrl-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg></div>
        <div class="cmd-ctrl-label">GALLERY</div>
        <div class="cmd-ctrl-glow"></div>
      </div>
      <div class="cmd-ctrl-tile active" data-action="music" id="cmd-music-tile" title="Nh\u1ea1c n\u1ec1n">
        <div class="cmd-ctrl-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg></div>
        <div class="cmd-ctrl-label">AUDIO</div>
        <div class="cmd-ctrl-glow"></div>
      </div>
      <div class="cmd-ctrl-tile active" data-action="hotspots" id="cmd-hotspot-tile" title="Hi\u1ec7n/\u1ea8n Hotspot">
        <div class="cmd-ctrl-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg></div>
        <div class="cmd-ctrl-label">NODES</div>
        <div class="cmd-ctrl-glow"></div>
      </div>
      <div class="cmd-ctrl-tile" data-action="share" title="Chia s\u1ebb">
        <div class="cmd-ctrl-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg></div>
        <div class="cmd-ctrl-label">SHARE</div>
        <div class="cmd-ctrl-glow"></div>
      </div>
      <div class="cmd-ctrl-tile" data-action="call" title="Li\u00ean h\u1ec7">
        <div class="cmd-ctrl-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.63a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .91h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 15.92z"/></svg></div>
        <div class="cmd-ctrl-label">CONTACT</div>
        <div class="cmd-ctrl-glow"></div>
      </div>
    </div>
  `;

  window.cmdTimelineHTML = "";

  // ==========================================
  // OPTION 4: GRADIENT LAYOUT TEMPLATES
  // ==========================================

  window.gradientTopTitleHTML = `
    <div class="layout-floating-logo gradient-floating-logo" style="position: absolute; top: 20px; left: 20px; z-index: 1000; display: flex; flex-direction: column; align-items: flex-start; pointer-events: none;">
      <div class="logo-script-top" style="font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 700; letter-spacing: 2px; color: #fff; text-shadow: 0 2px 10px rgba(255,255,255,0.5);">${PROJECT_CONTENT.projectTitle.top}</div>
      <div class="logo-script-wave" style="width: 40px; height: 2px; background: linear-gradient(90deg, #FF6B6B, #4ECDC4); margin: 5px 0; box-shadow: 0 1px 3px rgba(0,0,0,0.5);"></div>
      <div class="logo-script-sub" style="font-family: 'Montserrat', sans-serif; font-size: 11px; letter-spacing: 4px; color: rgba(255,255,255,0.8); text-transform: uppercase;">${PROJECT_CONTENT.projectTitle.sub}</div>
    </div>
`;

  window.gradientQuickActionsHTML = `
    <div class="gradient-quick-actions">
      <div class="quick-action-btn" data-action="fullscreen">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
      </div>
    </div>
  `;

  window.gradientRightNavHTML = `<div class="v-rail-container left-rail" id="gradient-left-rail">
      <div class="v-rail-trigger" id="gradient-left-trigger" title="Mở menu">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
      </div>
      <div class="v-rail-content" id="vision-left-dock">
        <!-- Logo inside Menu -->
        <div class="gradient-menu-logo">
          <div class="project-name">${PROJECT_CONTENT.projectTitle.top}</div>
          <div class="project-subtitle">${PROJECT_CONTENT.projectTitle.sub}</div>
        </div>
        <!-- Top View -->
        <div class="vision-icon-wrapper" data-id="topview" data-pano-node="${PROJECT_CONTENT.navItems.topview.node}">
          <div class="vision-icon" title="Top View">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
          </div>
          <span>${PROJECT_CONTENT.navItems.topview.label}</span>
        </div>
        <!-- Bird View -->
        <div class="vision-icon-wrapper" data-id="birdview">
          <div class="vision-icon" title="Bird View">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9M12 4h9M3 12l3-3 3 3M6 9v11M3 20h6"></path></svg>
          </div>
          <span>${PROJECT_CONTENT.navItems.birdview.label}</span>
          <div class="vision-submenu">
              ${generateSubmenuHTML(PROJECT_CONTENT.navItems.birdview.submenu, 'v-sub-item')}
            </div>
        </div>
        <!-- Navigation Amenities -->
        <div class="vision-icon-wrapper" data-id="amenities">
          <div class="vision-icon" title="Tiện ích">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 12l10 5 10-5"></path><path d="M2 17l10 5 10-5"></path></svg>
          </div>
          <span>${PROJECT_CONTENT.navItems.amenities.label}</span>
          <div class="vision-submenu">
              ${generateSubmenuHTML(PROJECT_CONTENT.navItems.amenities.submenu, 'v-sub-item')}
            </div>
        </div>
        <!-- Navigation Architecture -->
        <div class="vision-icon-wrapper" data-id="architecture">
          <div class="vision-icon" title="Kiến trúc">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21V8l9-6 9 6v13"></path><path d="M9 21v-6h6v6"></path><path d="M14 3v-1h3v4"></path></svg>
          </div>
          <span>${PROJECT_CONTENT.navItems.architecture.label}</span>
          <div class="vision-submenu">
              ${generateSubmenuHTML(PROJECT_CONTENT.navItems.architecture.submenu, 'v-sub-item')}
            </div>
        </div>
        <!-- Navigation Interior -->
        <div class="vision-icon-wrapper" data-id="interior">
          <div class="vision-icon" title="Nội thất">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"></rect><path d="M8 21h8"></path><path d="M12 17v4"></path><path d="M7 8h4M7 11h6"></path></svg>
          </div>
          <span>${PROJECT_CONTENT.navItems.interior.label}</span>
          <div class="vision-submenu">
              ${generateSubmenuHTML(PROJECT_CONTENT.navItems.interior.submenu, 'v-sub-item')}
            </div>
        </div>
        <!-- Navigation Surrounding (Liên kết vùng) -->
        <div class="vision-icon-wrapper" data-id="surrounding" data-action="region-page">
          <div class="vision-icon" title="Liên kết vùng">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"></path><path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"></path></svg>
          </div>
          <span>${PROJECT_CONTENT.navItems.surrounding.label}</span>
        </div>
      </div>
    </div>
  `;

  window.gradientLeftToolbarHTML = `<div class="v-rail-container right-rail" id="gradient-right-rail">
      <div class="v-rail-trigger" id="gradient-right-trigger">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
      </div>
      <div class="v-rail-content" id="vision-right-dock">
        <!-- Tool Info -->
        <div class="vision-icon-wrapper" data-action="info">
          <div class="vision-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
          </div>
        </div>
        <!-- Tool Music -->
        <div class="vision-icon-wrapper" data-action="music">
          <div class="vision-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>
          </div>
        </div>
        <!-- Tool Images -->
        <div class="vision-icon-wrapper" data-action="images">
          <div class="vision-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
          </div>
        </div>
        <!-- Tool Hotspots -->
        <div class="vision-icon-wrapper" data-action="hotspots">
          <div class="vision-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"></path><circle cx="12" cy="9" r="2.5"></circle></svg>
          </div>
        </div>
        <!-- Tool Share -->
        <div class="vision-icon-wrapper has-children">
          <div class="vision-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
          </div>
          <div class="vision-submenu">
            <a href="https://www.facebook.com/profile.php?id=100068490675716" target="_blank" class="v-sub-item">Facebook</a>
            <a href="https://zalo.me/0776469999" target="_blank" class="v-sub-item">Zalo</a>
          </div>
        </div>
        <!-- Tool Call -->
        <div class="vision-icon-wrapper" data-action="call">
          <div class="vision-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"></path></svg>
          </div>
        </div>
        <!-- Tool Fullscreen -->
        <div class="vision-icon-wrapper" data-action="fullscreen">
          <div class="vision-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg>
          </div>
        </div>
          </div>
        </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // ==========================================
  // OPTION A: CLASSIC LAYOUT TEMPLATES
  // ==========================================

  // Toolbar HTML - used by BOTH layouts (icon-only, tooltip on hover)
  window.toolbarButtonsHTML = `
        <!-- 1. Project Information -->
        <div class="tool-button" data-action="info" id="btn-info">
          <svg class="tool-icon" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
            <path d="M12 16v-4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <circle cx="12" cy="8" r="1" fill="currentColor"/>
          </svg>
          <div class="tool-tooltip">Thông Tin Dự Án</div>
        </div>
        <!-- 2. Music On/Off -->
        <div class="tool-button" data-action="music" id="btn-music">
          <svg class="tool-icon" viewBox="0 0 24 24" fill="none">
            <path d="M9 18V5l12-2v13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="6" cy="18" r="3" stroke="currentColor" stroke-width="2"/>
            <circle cx="18" cy="16" r="3" stroke="currentColor" stroke-width="2"/>
          </svg>
          <div class="tool-tooltip">Nhạc Nền</div>
        </div>
        <!-- 3. Show/Hide Images -->
        <div class="tool-button" data-action="images" id="btn-images">
          <svg class="tool-icon" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" stroke-width="2"/>
            <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" stroke-width="1.5"/>
            <path d="M21 15l-5-5L5 21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <div class="tool-tooltip">Hình Ảnh</div>
        </div>
        <!-- 4. Show/Hide Hotspots -->
        <div class="tool-button" data-action="hotspots" id="btn-hotspots">
          <svg class="tool-icon" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="2.5" fill="currentColor"/>
            <circle cx="12" cy="12" r="5.5" stroke="currentColor" stroke-width="1.5"/>
            <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1" stroke-dasharray="2 2"/>
            <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
          <div class="tool-tooltip">Điểm Điều Hướng</div>
        </div>
        <!-- 5. Share -->
        <div class="tool-button" data-action="share" id="btn-share">
          <svg class="tool-icon" viewBox="0 0 24 24" fill="none">
            <circle cx="18" cy="5" r="3" stroke="currentColor" stroke-width="2"/>
            <circle cx="6" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
            <circle cx="18" cy="19" r="3" stroke="currentColor" stroke-width="2"/>
            <path d="M8.59 13.51L15.42 17.49M15.41 6.51L8.59 10.49" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <div class="tool-tooltip">Chia Sẻ</div>
        </div>
        <!-- 6. Call for Consultation -->
        <div class="tool-button" data-action="call" id="btn-call">
          <svg class="tool-icon" viewBox="0 0 24 24" fill="none">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 015 12a19.79 19.79 0 01-3.07-8.67A2 2 0 013.92 1.5h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <div class="tool-tooltip">Tư Vấn</div>
        </div>
          
          
        <!-- 7. Social Links (with sub-dropdown) -->
        <div class="tool-button has-dropdown" data-action="social" id="btn-social">
          <svg class="tool-icon" viewBox="0 0 24 24" fill="none">
            <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <div class="tool-tooltip">Mạng Xã Hội</div>
          <div class="social-dropdown" id="social-dropdown">
            <a href="https://www.facebook.com/profile.php?id=100068490675716" target="_blank" class="social-link" data-social="facebook">
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              <span>Facebook</span>
            </a>
            <a href="https://www.instagram.com/tav.visualization?fbclid=IwY2xjawTGyFdleHRuA2FlbQIxMABicmlkETF6WFNQUG5pVHdyaTMzYXZzc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHnfmDGTf1jMMqXi9hVWtOqCfWiEucmX8Skbl4uXpKa6AEDbPpxaGRLa3qH4U_aem_aCheCes_KVmYiFV-DyesRw" target="_blank" class="social-link" data-social="instagram">
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98C23.986 15.668 24 15.259 24 12c0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              <span>Instagram</span>
            </a>
            <a href="https://zalo.me/0776469999" target="_blank" class="social-link" data-social="zalo">
              <svg viewBox="0 0 40 40" fill="currentColor" width="16" height="16"><path d="M20 0C8.955 0 0 8.954 0 20c0 11.045 8.955 20 20 20s20-8.955 20-20C40 8.954 31.045 0 20 0zm9.09 28.182c-1.091 1.09-2.273 1.636-3.636 1.636-.727 0-1.454-.182-2.09-.455l-5.91 2.364.91-5.273c-1.636-1.454-2.637-3.545-2.637-5.818 0-4.364 3.546-7.909 7.91-7.909 4.363 0 7.909 3.545 7.909 7.909 0 2.909-1.546 5.454-4 6.909l1.544 .637z"/></svg>
              <span>Zalo</span>
            </a>
          </div>
        </div>
  `;

  // Quick Navigation Panel for Classic Layout
  window.quickNavClassicHTML = `
    <div class="quick-nav-panel collapsed" id="quick-nav-panel">
      <div class="quick-nav-toggle" id="quick-nav-toggle" title="Quick Navigation">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
          <circle cx="12" cy="12" r="10"></circle>
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
        </svg>
      </div>
      <div class="quick-nav-content">
        <div class="quick-nav-list" id="quick-nav-list">
          <!-- TOP VIEW -->
          <div class="quick-nav-category">
            <div class="quick-nav-cat-header">
              <span class="cat-icon">🛰</span><span class="cat-title">TOP VIEW</span><span class="cat-arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </span>
            </div>
            <div class="quick-nav-cat-body">
              <div class="quick-nav-item" data-pano-node="node1">
                <div class="qn-name">Top View</div>
                <div class="qn-active-indicator"></div>
              </div>
              <div class="quick-nav-item" data-pano-node="node2">
                <div class="qn-name">Top Bird View</div>
                <div class="qn-active-indicator"></div>
              </div>
              <div class="quick-nav-item" data-pano-node="node3">
                <div class="qn-name">Top view night</div>
                <div class="qn-active-indicator"></div>
              </div>
            </div>
          </div>
          <!-- AMENITIES -->
          <div class="quick-nav-category">
            <div class="quick-nav-cat-header">
              <span class="cat-icon">🌳</span><span class="cat-title">TIỆN ÍCH</span><span class="cat-arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </span>
            </div>
            <div class="quick-nav-cat-body">
              <div class="quick-nav-item" data-pano-node="node4">
                <div class="qn-name">Park</div>
                <div class="qn-active-indicator"></div>
              </div>
              <div class="quick-nav-item" data-pano-node="node5">
                <div class="qn-name">Street</div>
                <div class="qn-active-indicator"></div>
              </div>
              <div class="quick-nav-item" data-pano-node="node6">
                <div class="qn-name">Park 02</div>
                <div class="qn-active-indicator"></div>
              </div>
            </div>
          </div>
          <!-- INTERIOR -->
          <div class="quick-nav-category">
            <div class="quick-nav-cat-header">
              <span class="cat-icon">🏠</span><span class="cat-title">NỘI THẤT</span><span class="cat-arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </span>
            </div>
            <div class="quick-nav-cat-body">
              <div class="quick-nav-item" data-pano-node="node7">
                <div class="qn-name">Living 2</div>
                <div class="qn-active-indicator"></div>
              </div>
              <div class="quick-nav-item" data-pano-node="node8">
                <div class="qn-name">Living</div>
                <div class="qn-active-indicator"></div>
              </div>
              <div class="quick-nav-item" data-pano-node="node9">
                <div class="qn-name">Thông Tầng</div>
                <div class="qn-active-indicator"></div>
              </div>
              <div class="quick-nav-item" data-pano-node="node10">
                <div class="qn-name">Balcony</div>
                <div class="qn-active-indicator"></div>
              </div>
              <div class="quick-nav-item" data-pano-node="node11">
                <div class="qn-name">WC</div>
                <div class="qn-active-indicator"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Right Tool Stack (Settings Panel) with gear integrated at the bottom
  window.verticalToolStackClassicHTML = `
    <div class="vertical-tool-stack" id="right-tool-stack">
      <!-- Sub-stack containing real toolbar tools -->
      <div class="tool-buttons-sub-stack" id="tool-sub-stack">
        ${toolbarButtonsHTML}
      </div>

      <!-- Settings Toggle Button (Primary Trigger at the bottom of the stack) -->
      <div class="settings-toggle-btn" id="btn-settings-toggle" title="Cài đặt hệ thống">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="currentColor" stroke-width="2"/>
        </svg>
      </div>
    </div>
  `;

  // Classic Bottom Navigation Bar HTML
  window.bottomNavClassicHTML = `<div class="bottom-nav-container">
      <div class="bottom-nav-bar" id="bottom-main-nav">
        <!-- Active Back Glow element -->
        <div class="active-nav-glow" id="nav-glow"></div>

        <!-- 1. TOP VIEW — node1 only -->
        <div class="nav-item" data-id="topview" id="nav-topview" data-pano-node="node1">
            <svg viewBox="0 0 24 24" fill="none">
              <rect x="2" y="3" width="20" height="14" rx="2" stroke-linecap="round" stroke-linejoin="round"></rect>
              <line x1="8" y1="21" x2="16" y2="21" stroke-linecap="round" stroke-linejoin="round"></line>
              <line x1="12" y1="17" x2="12" y2="21" stroke-linecap="round" stroke-linejoin="round"></line>
            </svg>
            <span>Top View</span>
          </div>

        <!-- 2. BIRD VIEW -->
        <div class="nav-item" data-id="birdview" id="nav-birdview">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 8l7-5 7 5"></path>
            <path d="M5 8v10a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1V8"></path>
            <path d="M12 3v5"></path>
          </svg>
          <span>${PROJECT_CONTENT.navItems.birdview.label}</span>
          <!-- Submenu -->
          <div class="nav-submenu">
              ${generateSubmenuHTML(PROJECT_CONTENT.navItems.birdview.submenu, 'submenu-item')}
            </div>
        </div>

        <!-- 3. TIỆN ÍCH -->
        <div class="nav-item" data-id="amenities" id="nav-amenities">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7l10 5 10-5-10-5z" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M2 12l10 5 10-5" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M2 17l10 5 10-5" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg>
          <span>${PROJECT_CONTENT.navItems.amenities.label}</span>
          <!-- Submenu -->
          <div class="nav-submenu">
              ${generateSubmenuHTML(PROJECT_CONTENT.navItems.amenities.submenu, 'submenu-item')}
            </div>
        </div>

        <!-- 4. TAV VILLA (Center logo-node with compact Mega Menu) -->
        <div class="nav-item center-logo-node" data-id="latien-brand" id="nav-logo">
          <div class="logo-script-top">${PROJECT_CONTENT.projectTitle.top}</div>
          <div class="logo-script-wave"></div>
          <div class="logo-script-sub">${PROJECT_CONTENT.projectTitle.sub}</div>


        </div>

        <!-- 5. KIẾN TRÚC -->
        <div class="nav-item" data-id="architecture" id="nav-architecture">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M3 21V8l9-6 9 6v13" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"></path>
            <path d="M9 21v-6h6v6" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"></path>
            <path d="M14 3v-1h3v4" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"></path>
          </svg>
          <span>${PROJECT_CONTENT.navItems.architecture.label}</span>
          <!-- Submenu -->
          <div class="nav-submenu">
              ${generateSubmenuHTML(PROJECT_CONTENT.navItems.architecture.submenu, 'submenu-item')}
            </div>
        </div>

        <!-- 6. NỘI THẤT (Interior) -->
        <div class="nav-item" data-id="interior" id="nav-interior">
          <svg viewBox="0 0 24 24" fill="none">
            <rect x="2" y="3" width="20" height="14" rx="2" stroke-linecap="round" stroke-linejoin="round"></rect>
            <path d="M8 21h8" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M12 17v4" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M7 8h4M7 11h6" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg>
          <span>${PROJECT_CONTENT.navItems.interior.label}</span>
          <!-- Submenu -->
          <div class="nav-submenu">
              ${generateSubmenuHTML(PROJECT_CONTENT.navItems.interior.submenu, 'submenu-item')}
            </div>
        </div>

        <!-- 7. LIÊN KẾT VÙNG (Liên kết vùng) -->
        <div class="nav-item" data-id="surrounding" id="nav-surrounding" data-action="region-page">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"></path><path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"></path>
          </svg>
          <span>${PROJECT_CONTENT.navItems.surrounding.label}</span>
        </div>
      </div>
    </div>
  `;

  // ==========================================
  // OPTION B: FUTURISTIC LAYOUT TEMPLATES
  // ==========================================

  // Independent settings gear and vertical tool stack top right (wrapped for smooth hover/dropdown)
  // Independent settings gear and vertical tool stack top right (wrapped for smooth hover/dropdown)
  window.settingsToggleFuturisticHTML = `
    <div class="futuristic-settings-group" id="futuristic-settings-group">
      <!-- Sub-stack containing real toolbar tools (now ABOVE the gear like layout 1) -->
      <div class="tool-buttons-sub-stack" id="tool-sub-stack">
        ${toolbarButtonsHTML}
      </div>

      <!-- Settings Toggle Button (Primary Trigger at the bottom of the stack) -->
      <div class="settings-toggle-btn" id="btn-settings-toggle" title="Cài đặt hệ thống">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="currentColor" stroke-width="2"/>
        </svg>
      </div>
    </div>
  `;

  window.verticalToolStackFuturisticHTML = "";

  window.sidebarNavFuturisticHTML = `<div class="sidebar-container" id="sidebar-container">
      <div class="sidebar-toggle-btn" id="btn-sidebar-toggle" title="Mở rộng menu">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 5l7 7-7 7" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
      </div>
      <div class="sidebar-content">
                <div class="sidebar-nav-list" id="sidebar-main-nav">
          <!-- Active Back Glow element -->
          <div class="active-nav-glow" id="nav-glow"></div>
          <!-- TAV VILLA Logo Button -->
          <div class="nav-item center-logo-node" data-id="latien-brand" id="nav-logo" style="display: flex; flex-direction: column; align-items: center; margin-bottom: 20px; padding: 10px 0; background: transparent; border: none; box-shadow: none;">
            <div class="logo-script-top">${PROJECT_CONTENT.projectTitle.top}</div>
            <div class="logo-script-wave"></div>
            <div class="logo-script-sub">${PROJECT_CONTENT.projectTitle.sub}</div>
          </div>


          <!-- 1. TOP VIEW -->
          <div class="nav-item" data-id="topview" id="nav-topview" data-pano-node="${PROJECT_CONTENT.navItems.topview.node}">
            <svg viewBox="0 0 24 24" fill="none">
              <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" stroke-linecap="round" stroke-linejoin="round"></polygon>
              <line x1="8" y1="2" x2="8" y2="18" stroke-linecap="round" stroke-linejoin="round"></line>
              <line x1="16" y1="6" x2="16" y2="22" stroke-linecap="round" stroke-linejoin="round"></line>
            </svg>
            <span>${PROJECT_CONTENT.navItems.topview.label}</span>
          </div>

          <!-- 2. BIRD VIEW -->
          <div class="nav-item" data-id="birdview" id="nav-birdview">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke-linecap="round" stroke-linejoin="round"></path>
              <circle cx="12" cy="12" r="3" stroke-linecap="round" stroke-linejoin="round"></circle>
            </svg>
            <span>${PROJECT_CONTENT.navItems.birdview.label}</span>
            <!-- Submenu -->
            <div class="nav-submenu">
              ${generateSubmenuHTML(PROJECT_CONTENT.navItems.birdview.submenu, 'submenu-item')}
            </div>
          </div>

          <!-- 3. TIỆN ÍCH -->
          <div class="nav-item" data-id="amenities" id="nav-amenities">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5z" stroke-linecap="round" stroke-linejoin="round"></path>
              <path d="M2 12l10 5 10-5" stroke-linecap="round" stroke-linejoin="round"></path>
              <path d="M2 17l10 5 10-5" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
            <span>${PROJECT_CONTENT.navItems.amenities.label}</span>
            <!-- Submenu -->
            <div class="nav-submenu">
              ${generateSubmenuHTML(PROJECT_CONTENT.navItems.amenities.submenu, 'submenu-item')}
            </div>
          </div><!-- 5. KIẾN TRÚC -->
          <div class="nav-item" data-id="architecture" id="nav-architecture">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M3 21V8l9-6 9 6v13" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"></path>
              <path d="M9 21v-6h6v6" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"></path>
              <path d="M14 3v-1h3v4" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"></path>
            </svg>
            <span>${PROJECT_CONTENT.navItems.architecture.label}</span>
            <!-- Submenu -->
            <div class="nav-submenu">
              ${generateSubmenuHTML(PROJECT_CONTENT.navItems.architecture.submenu, 'submenu-item')}
            </div>
          </div>

          <!-- 6. NỘI THẤT (Interior) -->
          <div class="nav-item" data-id="interior" id="nav-interior">
            <svg viewBox="0 0 24 24" fill="none">
              <rect x="2" y="3" width="20" height="14" rx="2" stroke-linecap="round" stroke-linejoin="round"></rect>
              <path d="M8 21h8" stroke-linecap="round" stroke-linejoin="round"></path>
              <path d="M12 17v4" stroke-linecap="round" stroke-linejoin="round"></path>
              <path d="M7 8h4M7 11h6" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
            <span>${PROJECT_CONTENT.navItems.interior.label}</span>
          <!-- Submenu -->
          <div class="nav-submenu">
              ${generateSubmenuHTML(PROJECT_CONTENT.navItems.interior.submenu, 'submenu-item')}
            </div>

            
          </div>

          <!-- 7. LIÊN KẾT VÙNG (Liên kết vùng) -->
          <div class="nav-item" data-id="surrounding" id="nav-surrounding" data-action="region-page">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"></path><path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"></path>
            </svg>
            <span>${PROJECT_CONTENT.navItems.surrounding.label}</span>
          </div>
        </div>
      </div>
    </div>
  `;

  // ==========================================
  // OPTION 3: NEO LAYOUT TEMPLATES
  // ==========================================

  window.neoTopTitleHTML = `
    <div class="layout-floating-logo">
      <div class="logo-script-top">TAV</div>
      <div class="logo-script-wave"></div>
      <div class="logo-script-sub">V I L L A</div>
    </div>
  `;

  // The Unified Control Panel containing both Navigation and Toolbar
  window.neoLeftNavHTML = `<div class="neo-unified-container collapsed" id="neo-unified-container">
      <!-- Unified three-dot button (...) -->
      <div class="neo-unified-trigger" id="neo-unified-trigger" title="Mở menu">
        <svg viewBox="0 0 24 24" fill="none">
          <circle cx="6" cy="12" r="2" fill="currentColor"></circle>
          <circle cx="12" cy="12" r="2" fill="currentColor"></circle>
          <circle cx="18" cy="12" r="2" fill="currentColor"></circle>
        </svg>
      </div>
      <!-- Navigation Panel: RIGHT -> LEFT -->
      <div class="neo-nav-panel" id="neo-nav-panel">
        <!-- Top View Group -->
        <div class="neo-nav-item-group" data-id="topview">
          <div class="neo-nav-card" data-id="topview" id="nav-neo-topview" data-pano-node="${PROJECT_CONTENT.navItems.topview.node}">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill="currentColor">
              <path d="M400 160V128H480C488.8 128 496 120.8 496 112V80C496 71.16 488.8 64 480 64H381.7L329.1 11.4C325 7.27 319.4 4.965 313.5 4.965H160C142.3 4.965 128 19.29 128 36.97V64H32C14.33 64 0 78.33 0 96V128C0 145.7 14.33 160 32 160H400zM616 192H24C10.75 192 0 202.7 0 216V232C0 245.3 10.75 256 24 256H55.45C58.33 283.6 81.65 304 110.1 304H168C198.9 304 224 278.9 224 248V240C224 231.2 231.2 224 240 224H400C408.8 224 416 231.2 416 240V248C416 278.9 441.1 304 472 304H529.9C558.4 304 581.7 283.6 584.6 256H616C629.3 256 640 245.3 640 232V216C640 202.7 629.3 192 616 192zM128 448H512C520.8 448 528 440.8 528 432V400C528 391.2 520.8 384 512 384H128C119.2 384 112 391.2 112 400V432C112 440.8 119.2 448 128 448z"/>
            </svg>
            <span>${PROJECT_CONTENT.navItems.topview.label}</span>
          </div>
        </div>
        <!-- Bird View Group -->
        <div class="neo-nav-item-group" data-id="birdview">
          <div class="neo-nav-card" data-id="birdview" id="nav-neo-birdview">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill="currentColor">
              <path d="M400 160V128H480C488.8 128 496 120.8 496 112V80C496 71.16 488.8 64 480 64H381.7L329.1 11.4C325 7.27 319.4 4.965 313.5 4.965H160C142.3 4.965 128 19.29 128 36.97V64H32C14.33 64 0 78.33 0 96V128C0 145.7 14.33 160 32 160H400zM616 192H24C10.75 192 0 202.7 0 216V232C0 245.3 10.75 256 24 256H55.45C58.33 283.6 81.65 304 110.1 304H168C198.9 304 224 278.9 224 248V240C224 231.2 231.2 224 240 224H400C408.8 224 416 231.2 416 240V248C416 278.9 441.1 304 472 304H529.9C558.4 304 581.7 283.6 584.6 256H616C629.3 256 640 245.3 640 232V216C640 202.7 629.3 192 616 192zM128 448H512C520.8 448 528 440.8 528 432V400C528 391.2 520.8 384 512 384H128C119.2 384 112 391.2 112 400V432C112 440.8 119.2 448 128 448z"/>
            </svg>
            <span>${PROJECT_CONTENT.navItems.birdview.label}</span>
          </div>
          <div class="neo-submenu-tree">
              ${generateSubmenuHTML(PROJECT_CONTENT.navItems.birdview.submenu, 'submenu-item')}
            </div>
        </div>
        <!-- Amenities Group -->
        <div class="neo-nav-item-group" data-id="amenities">
          <div class="neo-nav-card" data-id="amenities" id="nav-neo-amenities">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5z" stroke-linecap="round" stroke-linejoin="round"></path>
              <path d="M2 12l10 5 10-5" stroke-linecap="round" stroke-linejoin="round"></path>
              <path d="M2 17l10 5 10-5" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
            <span>${PROJECT_CONTENT.navItems.amenities.label}</span>
          </div>
          <div class="neo-submenu-tree">
              ${generateSubmenuHTML(PROJECT_CONTENT.navItems.amenities.submenu, 'submenu-item')}
            </div>
        </div>
        <!-- Architecture Group -->
        <div class="neo-nav-item-group" data-id="architecture">
          <div class="neo-nav-card" data-id="architecture" id="nav-neo-architecture">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M3 21V8l9-6 9 6v13" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"></path>
              <path d="M9 21v-6h6v6" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"></path>
              <path d="M14 3v-1h3v4" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"></path>
            </svg>
            <span>${PROJECT_CONTENT.navItems.architecture.label}</span>
          </div>
          <div class="neo-submenu-tree">
              ${generateSubmenuHTML(PROJECT_CONTENT.navItems.architecture.submenu, 'submenu-item')}
            </div>
        </div>
        <!-- Interior Group -->
        <div class="neo-nav-item-group" data-id="interior">
          <div class="neo-nav-card" data-id="interior" id="nav-neo-interior">
            <svg viewBox="0 0 24 24" fill="none">
              <rect x="2" y="3" width="20" height="14" rx="2" stroke-linecap="round" stroke-linejoin="round"></rect>
              <path d="M8 21h8" stroke-linecap="round" stroke-linejoin="round"></path>
              <path d="M12 17v4" stroke-linecap="round" stroke-linejoin="round"></path>
              <path d="M7 8h4M7 11h6" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
            <span>${PROJECT_CONTENT.navItems.interior.label}</span>
          </div>
          <div class="neo-submenu-tree">
              ${generateSubmenuHTML(PROJECT_CONTENT.navItems.interior.submenu, 'submenu-item')}
            </div>
        </div>
        <!-- Liên kết vùng Group -->
        <div class="neo-nav-item-group" data-id="surrounding">
          <div class="neo-nav-card" data-id="surrounding" id="nav-neo-logo" data-action="region-page">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"></path><path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"></path>
            </svg>
            <span>${PROJECT_CONTENT.navItems.surrounding.label}</span>
          </div>
        </div>
      </div>
      <!-- Toolbar: TOP -> BOTTOM -->
      <div class="neo-toolbar" id="neo-toolbar">
        <!-- Project Information (First as requested) -->
        <div class="neo-dock-item" data-action="info">
          <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"></circle><path d="M12 16v-4M12 8h.01" stroke="currentColor" stroke-width="2"></path></svg>
          <div class="neo-tooltip">Thông Tin Dự Án</div>
        </div>
        <!-- Music -->
        <div class="neo-dock-item" data-action="music">
          <svg viewBox="0 0 24 24" fill="none"><path d="M9 18V5l12-2v13" stroke="currentColor" stroke-width="2"></path><circle cx="6" cy="18" r="3" stroke="currentColor" stroke-width="2"></circle><circle cx="18" cy="16" r="3" stroke="currentColor" stroke-width="2"></circle></svg>
          <div class="neo-tooltip">Nhạc Nền</div>
        </div>
        <!-- Images -->
        <div class="neo-dock-item" data-action="images">
          <svg viewBox="0 0 24 24" fill="none"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" stroke-width="2"></path><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"></circle></svg>
          <div class="neo-tooltip">Hình Ảnh</div>
        </div>
        <!-- Hotspots -->
        <div class="neo-dock-item" data-action="hotspots">
          <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" stroke-dasharray="4 4"></circle><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"></circle></svg>
          <div class="neo-tooltip">Ẩn/Hiện Hotspots</div>
        </div>
        <!-- Share -->
        <div class="neo-dock-item has-children" id="neo-share-parent">
          <svg viewBox="0 0 24 24" fill="none"><path d="M18 8A3 3 0 1018 2a3 3 0 000 6zM6 15a3 3 0 100-6 3 3 0 000 6zM18 22a3 3 0 100-6 3 3 0 000 6zM8.59 13.51l6.83 3.98M15.41 6.51L8.59 10.49" stroke="currentColor" stroke-width="2"></path></svg>
          <div class="neo-tooltip">Chia Sẻ</div>
          <div class="neo-dock-submenu flex-col">
            <a href="https://www.facebook.com/profile.php?id=100068490675716" target="_blank" class="dock-share-btn facebook">Facebook</a>
            <a href="https://zalo.me/0776469999" target="_blank" class="dock-share-btn zalo">Zalo</a>
          </div>
        </div>
        <!-- Call -->
        <div class="neo-dock-item" data-action="call">
          <svg viewBox="0 0 24 24" fill="none"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" stroke="currentColor" stroke-width="2"></path></svg>
          <div class="neo-tooltip">Tư Vấn</div>
        </div>
        <!-- Fullscreen -->
        <div class="neo-dock-item" data-action="fullscreen">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
          </svg>
          <div class="neo-tooltip">Toàn Màn Hình</div>
        </div>
          </div>
          </div>
      </div>
    </div>
  `;

  // Right quick panel has been removed from Neo layout to prevent duplication with the bottom dock
  window.neoRightQuickPanelHTML = ``;

  // Bottom dock is merged into the unified container
  window.neoBottomDockHTML = ``;

  // ==========================================
  // OPTION 5: AURORA LAYOUT TEMPLATES
  // ==========================================

  window.auroraLeftNavHTML = `<div class="aurora-nav-container collapsed" id="aurora-nav-container">
      <div class="aurora-nav-pin-btn" id="aurora-nav-pin-btn" title="Ghim thanh điều hướng">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="17" x2="12" y2="22"></line>
          <path d="M5 17h14v-1.76a2 2 0 0 0-.44-1.24l-2.78-3.5A2 2 0 0 1 15 9.26V5a3 3 0 0 0-6 0v4.26a2 2 0 0 1-.78 1.24l-2.78 3.5A2 2 0 0 0 5 15.24z"></path>
        </svg>
      </div>
      <div class="aurora-nav-list" id="aurora-main-nav">
        

        <!-- 1. TOP VIEW (Electric Cyan) -->
        <div class="aurora-nav-item-wrapper" data-id="topview">
          <div class="aurora-nav-item" data-id="topview" style="--accent-color: var(--aurora-cyan);" data-pano-node="${PROJECT_CONTENT.navItems.topview.node}">
            <div class="aurora-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                <polyline points="2 17 12 22 22 17"></polyline>
                <polyline points="2 12 12 17 22 12"></polyline>
              </svg>
            </div>
            <span class="aurora-nav-label">${PROJECT_CONTENT.navItems.topview.label}</span>
          </div>
        </div>

        <!-- 2. BIRD VIEW (Purple) -->
        <div class="aurora-nav-item-wrapper has-children" data-id="birdview">
          <div class="aurora-nav-item" data-id="birdview" style="--accent-color: var(--aurora-purple);">
            <div class="aurora-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 2L11 13"></path>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </div>
            <span class="aurora-nav-label">${PROJECT_CONTENT.navItems.birdview.label}</span>
            <svg class="aurora-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
          <div class="aurora-submenu">
              ${generateSubmenuHTML(PROJECT_CONTENT.navItems.birdview.submenu, 'aurora-submenu-item')}
            </div>
        </div>

        <!-- 3. AMENITIES (Emerald) -->
        <div class="aurora-nav-item-wrapper has-children" data-id="amenities">
          <div class="aurora-nav-item" data-id="amenities" style="--accent-color: var(--aurora-emerald);">
            <div class="aurora-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 9.8a7 7 0 0 1-9 8.2zM9 22v-2"></path>
              </svg>
            </div>
            <span class="aurora-nav-label">${PROJECT_CONTENT.navItems.amenities.label}</span>
            <svg class="aurora-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        <div class="aurora-submenu">
              ${generateSubmenuHTML(PROJECT_CONTENT.navItems.amenities.submenu, 'aurora-submenu-item')}
            </div></div>

        <!-- 4. ARCHITECTURE (Orange) -->
        <div class="aurora-nav-item-wrapper has-children" data-id="architecture">
          <div class="aurora-nav-item" data-id="architecture" style="--accent-color: var(--aurora-orange);">
            <div class="aurora-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="9" y1="3" x2="9" y2="21"></line>
                <line x1="15" y1="3" x2="15" y2="21"></line>
                <line x1="3" y1="9" x2="21" y2="9"></line>
                <line x1="3" y1="15" x2="21" y2="15"></line>
              </svg>
            </div>
            <span class="aurora-nav-label">${PROJECT_CONTENT.navItems.architecture.label}</span>
            <svg class="aurora-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        <div class="aurora-submenu">
              ${generateSubmenuHTML(PROJECT_CONTENT.navItems.architecture.submenu, 'aurora-submenu-item')}
            </div></div>

        <!-- 5. INTERIOR (Pink) -->
        <div class="aurora-nav-item-wrapper has-children" data-id="interior">
          <div class="aurora-nav-item" data-id="interior" style="--accent-color: var(--aurora-pink);">
            <div class="aurora-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M19 10V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v5m14 0a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2m14 0H5"></path>
                <line x1="6" y1="18" x2="6" y2="21"></line>
                <line x1="18" y1="18" x2="18" y2="21"></line>
              </svg>
            </div>
            <span class="aurora-nav-label">${PROJECT_CONTENT.navItems.interior.label}</span>
            <svg class="aurora-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
          <div class="aurora-submenu">
              ${generateSubmenuHTML(PROJECT_CONTENT.navItems.interior.submenu, 'aurora-submenu-item')}
            </div>
        </div>

        <!-- 6. LIÊN KẾT VÙNG (Electric Cyan) -->
        <div class="aurora-nav-item-wrapper" data-id="surrounding">
          <div class="aurora-nav-item" data-id="surrounding" data-action="region-page" style="--accent-color: var(--aurora-cyan);">
            <div class="aurora-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
            <span class="aurora-nav-label">${PROJECT_CONTENT.navItems.surrounding.label}</span>
          </div>
        </div>
      </div>
    </div>
  `;

  window.auroraRightToolHTML = `<div class="aurora-tool-panel collapsed" id="aurora-tool-panel">
      <!-- Pin trigger -->
      <div class="aurora-tool-pin-btn" id="aurora-tool-pin-btn" title="Ghim bảng công cụ">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="17" x2="12" y2="22"></line>
          <path d="M5 17h14v-1.76a2 2 0 0 0-.44-1.24l-2.78-3.5A2 2 0 0 1 15 9.26V5a3 3 0 0 0-6 0v4.26a2 2 0 0 1-.78 1.24l-2.78 3.5A2 2 0 0 0 5 15.24z"></path>
        </svg>
      </div>
      <div class="aurora-tool-list">
        <!-- Project Information (Purple) -->
        <div class="aurora-tool-item" data-action="info" title="Thông Tin Dự Án" style="--accent-color: var(--aurora-purple);">
          <div class="aurora-tool-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
          </div>
          <span class="aurora-tool-label">Thông Tin</span>
        </div>
        <!-- Music (Pink) -->
        <div class="aurora-tool-item" data-action="music" title="Nhạc Nền" style="--accent-color: var(--aurora-pink);">
          <div class="aurora-tool-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 18V5l12-2v13"></path>
              <circle cx="6" cy="18" r="3"></circle>
              <circle cx="18" cy="16" r="3"></circle>
            </svg>
          </div>
          <span class="aurora-tool-label">Nhạc Nền</span>
        </div>
        <!-- Images (Purple) -->
        <div class="aurora-tool-item" id="aurora-tool-images" title="Hình Ảnh" style="--accent-color: var(--aurora-purple);" data-action="images">
          <div class="aurora-tool-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
          </div>
          <span class="aurora-tool-label">Hình Ảnh</span>
        </div>
        <!-- Hotspots (Emerald) -->
        <div class="aurora-tool-item" data-action="hotspots" title="Ẩn/Hiện Hotspots" style="--accent-color: var(--aurora-emerald);">
          <div class="aurora-tool-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10" stroke-dasharray="4 4"></circle>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          </div>
          <span class="aurora-tool-label">Hotspots</span>
        </div>
        <!-- Share (Orange) -->
        <div class="aurora-tool-item has-submenu" id="aurora-tool-share" title="Chia Sẻ" style="--accent-color: var(--aurora-orange);">
          <div class="aurora-tool-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
              <polyline points="16 6 12 2 8 6"></polyline>
              <line x1="12" y1="2" x2="12" y2="15"></line>
            </svg>
          </div>
          <span class="aurora-tool-label">Chia Sẻ</span>
          <div class="aurora-tool-submenu flex-col">
            <a href="https://www.facebook.com/profile.php?id=100068490675716" target="_blank" class="aurora-share-btn facebook">Facebook</a>
            <a href="https://zalo.me/0776469999" target="_blank" class="aurora-share-btn zalo">Zalo</a>
          </div>
        </div>
        <!-- Call (Electric Cyan) -->
        <div class="aurora-tool-item" data-action="call" title="Tư Vấn" style="--accent-color: var(--aurora-cyan);">
          <div class="aurora-tool-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
          </div>
          <span class="aurora-tool-label">Tư Vấn</span>
        </div>
        <!-- Fullscreen (Electric Cyan) -->
        <div class="aurora-tool-item" data-action="fullscreen" title="Toàn Màn Hình" style="--accent-color: var(--aurora-cyan);">
          <div class="aurora-tool-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
            </svg>
          </div>
          <span class="aurora-tool-label">Toàn Màn Hình</span>
        </div>
          </div>
          <span class="aurora-tool-label">Xoay 360</span>
        </div>
          </div>
          <span class="aurora-tool-label">Xoay 360</span>
        </div>
      </div>
    </div>
  `;

  // Aurora Compass Widget
  window.auroraCompassHTML = `
    <div class="compass-widget aurora-compass" id="compass-widget">
      <div class="compass-outer-glow"></div>
      <div class="compass-dial" id="compass-dial">
        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <!-- Holographic Rings -->
          <circle cx="40" cy="40" r="38" fill="rgba(8, 17, 31, 0.5)" stroke="url(#auroraCompassGrad)" stroke-width="1.5"/>
          <circle cx="40" cy="40" r="32" stroke="rgba(0, 217, 255, 0.15)" stroke-width="1" stroke-dasharray="4 2"/>
          <circle cx="40" cy="40" r="26" stroke="rgba(139, 92, 246, 0.2)" stroke-width="1"/>
          
          <!-- Holographic Crosshair -->
          <line x1="40" y1="8" x2="40" y2="72" stroke="rgba(0, 217, 255, 0.1)" stroke-width="1"/>
          <line x1="8" y1="40" x2="72" y2="40" stroke="rgba(0, 217, 255, 0.1)" stroke-width="1"/>

          <!-- Dynamic Aurora Needle -->
          <g>
            <polygon points="40,8 44,40 40,36 36,40" fill="url(#auroraNeedleCyan)"/>
            <polygon points="40,72 44,40 40,44 36,40" fill="url(#auroraNeedlePink)"/>
          </g>
          
          <defs>
            <linearGradient id="auroraCompassGrad" x1="0" y1="0" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#00D9FF" />
              <stop offset="50%" stop-color="#8B5CF6" />
              <stop offset="100%" stop-color="#EC4899" />
            </linearGradient>
            <linearGradient id="auroraNeedleCyan" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#00D9FF" />
              <stop offset="100%" stop-color="#8B5CF6" />
            </linearGradient>
            <linearGradient id="auroraNeedlePink" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#EC4899" />
              <stop offset="100%" stop-color="#FF8A00" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div class="compass-cardinal n">B</div>
      <div class="compass-degree-display" id="compass-degree">0°</div>
    </div>
  `;

  // ==========================================
  // OPTION 6: HORIZON LAYOUT TEMPLATES
  // ==========================================

  window.horizonBottomDockHTML = `<div class="horizon-nav-container" id="horizon-nav-container">
      <div class="horizon-dock">
        <!-- 1. TOP VIEW -->
        <div class="horizon-nav-item-wrapper" data-id="topview">
          <div class="horizon-nav-item" data-id="topview" data-pano-node="${PROJECT_CONTENT.navItems.topview.node}">
            <span class="horizon-nav-label">${PROJECT_CONTENT.navItems.topview.label}</span>
          </div>
        </div>

        <!-- 2. BIRD VIEW -->
        <div class="horizon-nav-item-wrapper has-submenu" data-id="birdview">
          <div class="horizon-nav-item" data-id="birdview">
            <span class="horizon-nav-label">${PROJECT_CONTENT.navItems.birdview.label}</span>
          </div>
          <div class="horizon-submenu">
              ${generateSubmenuHTML(PROJECT_CONTENT.navItems.birdview.submenu, 'horizon-submenu-item')}
            </div>
        </div>

        <!-- 3. AMENITIES -->
        <div class="horizon-nav-item-wrapper has-submenu" data-id="amenities">
          <div class="horizon-nav-item" data-id="amenities">
            <span class="horizon-nav-label">${PROJECT_CONTENT.navItems.amenities.label}</span>
          </div>
          <div class="horizon-submenu">
              ${generateSubmenuHTML(PROJECT_CONTENT.navItems.amenities.submenu, 'horizon-submenu-item')}
            </div>
        </div>

        <!-- 4. ARCHITECTURE -->
        <div class="horizon-nav-item-wrapper has-submenu" data-id="architecture">
          <div class="horizon-nav-item" data-id="architecture">
            <span class="horizon-nav-label">${PROJECT_CONTENT.navItems.architecture.label}</span>
          </div>
          <div class="horizon-submenu">
              ${generateSubmenuHTML(PROJECT_CONTENT.navItems.architecture.submenu, 'horizon-submenu-item')}
            </div>
        </div>

        <!-- 5. INTERIOR -->
        <div class="horizon-nav-item-wrapper has-submenu" data-id="interior">
          <div class="horizon-nav-item" data-id="interior">
            <span class="horizon-nav-label">${PROJECT_CONTENT.navItems.interior.label}</span>
          </div>
          <div class="horizon-submenu">
              ${generateSubmenuHTML(PROJECT_CONTENT.navItems.interior.submenu, 'horizon-submenu-item')}
            </div>
        </div>

        <!-- 6. LIÊN KẾT VÙNG -->
        <div class="horizon-nav-item-wrapper" data-id="surrounding">
          <div class="horizon-nav-item" data-id="surrounding" data-action="region-page">
            <span class="horizon-nav-label">${PROJECT_CONTENT.navItems.surrounding.label}</span>
          </div>
        </div>
      </div>
    </div>
  `;

  window.horizonRightToolHTML = `<div class="horizon-tool-panel" id="horizon-tool-panel">
      <!-- Project Information -->
      <div class="horizon-tool-item" data-action="info" title="Thông Tin Dự Án">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
      </div>
      <!-- Music -->
      <div class="horizon-tool-item" data-action="music" title="Nhạc Nền">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 18V5l12-2v13"></path>
          <circle cx="6" cy="18" r="3"></circle>
          <circle cx="18" cy="16" r="3"></circle>
        </svg>
      </div>
      <!-- Images -->
      <div class="horizon-tool-item" id="horizon-tool-images" title="Hình Ảnh" data-action="images">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2"></rect>
          <circle cx="8.5" cy="8.5" r="1.5"></circle>
          <polyline points="21 15 16 10 5 21"></polyline>
        </svg>
      </div>
      <!-- Hotspots -->
      <div class="horizon-tool-item" data-action="hotspots" title="Ẩn/Hiện Hotspots">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10" stroke-dasharray="3 3"></circle>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>
      </div>
      <!-- Share -->
      <div class="horizon-tool-item has-submenu" id="horizon-tool-share" title="Chia Sẻ">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
          <polyline points="16 6 12 2 8 6"></polyline>
          <line x1="12" y1="2" x2="12" y2="15"></line>
        </svg>
        <div class="horizon-tool-submenu flex-col">
          <a href="https://www.facebook.com/profile.php?id=100068490675716" target="_blank" class="horizon-share-btn facebook">Facebook</a>
          <a href="https://zalo.me/0776469999" target="_blank" class="horizon-share-btn zalo">Zalo</a>
        </div>
      </div>
      <!-- Call -->
      <div class="horizon-tool-item" data-action="call" title="Tư Vấn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
      </div>
      <!-- Fullscreen -->
      <div class="horizon-tool-item" data-action="fullscreen" title="Toàn Màn Hình">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
        </svg>
      </div>
    </div>
  `;

  // Horizon Compass Widget
  window.horizonCompassHTML = `
    <div class="compass-widget horizon-compass" id="compass-widget">
      <div class="compass-outer-glow"></div>
      <div class="compass-dial" id="compass-dial">
        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <!-- Aircraft style dial -->
          <circle cx="40" cy="40" r="38" fill="rgba(10, 16, 32, 0.6)" stroke="#D8DEE9" stroke-width="1" />
          <line x1="20" y1="40" x2="35" y2="40" stroke="#8ED8FF" stroke-width="1.5" />
          <line x1="45" y1="40" x2="60" y2="40" stroke="#8ED8FF" stroke-width="1.5" />
          <circle cx="40" cy="40" r="2" fill="#F6C177" />
          
          <g stroke="rgba(216, 222, 233, 0.4)" stroke-width="1">
            <line x1="40" y1="2" x2="40" y2="6" />
            <line x1="40" y1="74" x2="40" y2="78" />
            <line x1="2" y1="40" x2="6" y2="40" />
            <line x1="74" y1="40" x2="78" y2="40" />
          </g>
          
          <g>
            <polygon points="40,6 43,24 37,24" fill="#F6C177" />
            <polygon points="40,74 43,56 37,56" fill="rgba(216, 222, 233, 0.3)" />
          </g>
        </svg>
      </div>
      <div class="compass-cardinal n">B</div>
      <div class="compass-degree-display" id="compass-degree">0°</div>
    </div>
  `;



  // OPTION 8: PRISM LAYOUT TEMPLATES
  window.prismNavHTML = `<div class="prism-nav-container" id="prism-nav-container">
      <div class="prism-nav-wrapper">
        <div class="prism-nav-list">
          <!-- BRAND LOGO -->
          <div class="prism-nav-item" data-id="latien-brand" style="position: fixed; top: 24px; left: 30px; display: flex; flex-direction: column; align-items: flex-start; justify-content: center; padding: 0; pointer-events: none; background: transparent; border: none; width: auto; height: auto; z-index: 2000; box-shadow: none; backdrop-filter: none; -webkit-backdrop-filter: none;">
            <div style="font-family: 'Playfair Display', serif; font-size: 24px; font-weight: 700; letter-spacing: 2px; color: #fff; text-shadow: 0 0 15px rgba(255,255,255,0.5);">${PROJECT_CONTENT.projectTitle.top}</div>
            <div style="width: 30px; height: 2px; background: linear-gradient(90deg, #fff, transparent); margin: 5px 0;"></div>
            <div style="font-family: 'Montserrat', sans-serif; font-size: 9px; letter-spacing: 4px; color: rgba(255,255,255,0.5); text-transform: uppercase;">${PROJECT_CONTENT.projectTitle.sub}</div>
          </div>


          <!-- Item 1: Top View -->
          <div class="prism-nav-item" data-id="topview" data-pano-node="${PROJECT_CONTENT.navItems.topview.node}">
            <div class="prism-nav-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </div>
            <span class="prism-nav-label">${PROJECT_CONTENT.navItems.topview.label}</span>
          </div>

          <!-- Item 2: Bird View (has submenu) -->
          <div class="prism-nav-item has-submenu" data-id="birdview">
            <div class="prism-nav-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <path d="M12 22V12"></path><path d="m12 12 8.7-5"></path><path d="m12 12-8.7-5"></path>
              </svg>
            </div>
            <span class="prism-nav-label">${PROJECT_CONTENT.navItems.birdview.label}</span>
            <div class="prism-submenu">
              ${generateSubmenuHTML(PROJECT_CONTENT.navItems.birdview.submenu, 'prism-submenu-item')}
            </div>
          </div>

          <!-- Item 3: Amenities -->
          <div class="prism-nav-item has-submenu" data-id="amenities">
            <div class="prism-nav-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m12 3-1.912 5.886H3.88l5.03 3.656L7.002 18.43 12 14.772l4.998 3.656-1.908-5.888 5.03-3.656h-6.208L12 3Z"></path>
              </svg>
            </div>
            <span class="prism-nav-label">${PROJECT_CONTENT.navItems.amenities.label}</span>
          <div class="prism-submenu">
              ${generateSubmenuHTML(PROJECT_CONTENT.navItems.amenities.submenu, 'prism-submenu-item')}
            </div></div>

          <!-- Item 4: Architecture -->
          <div class="prism-nav-item has-submenu" data-id="architecture">
            <div class="prism-nav-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"></path>
                <path d="m8 10 3 3 5-5"></path>
              </svg>
            </div>
            <span class="prism-nav-label">${PROJECT_CONTENT.navItems.architecture.label}</span>
          <div class="prism-submenu">
              ${generateSubmenuHTML(PROJECT_CONTENT.navItems.architecture.submenu, 'prism-submenu-item')}
            </div></div>

          <!-- Item 5: Interior (has submenu) -->
          <div class="prism-nav-item has-submenu" data-id="interior">
            <div class="prism-nav-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2"></rect>
                <path d="M9 3v18"></path><path d="M15 3v18"></path>
                <path d="M3 9h18"></path><path d="M3 15h18"></path>
              </svg>
            </div>
            <span class="prism-nav-label">${PROJECT_CONTENT.navItems.interior.label}</span>
            <div class="prism-submenu">
              ${generateSubmenuHTML(PROJECT_CONTENT.navItems.interior.submenu, 'prism-submenu-item')}
            </div>
          </div>

          <!-- Item 6: Liên kết vùng -->
          <div class="prism-nav-item" data-id="surrounding" data-action="region-page">
            <div class="prism-nav-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
            <span class="prism-nav-label">${PROJECT_CONTENT.navItems.surrounding.label}</span>
          </div>

        </div>
      </div>
    </div>
  `;

  window.prismRightToolHTML = `
    <div class="prism-tool-container" id="prism-tool-container">
      <div class="prism-tool-list">

        <div class="prism-tool-item" data-action="info">
          <div class="prism-tool-icon-wrapper">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
          </div>
          <span class="prism-tool-label">Thông Tin</span>
        </div>

        <div class="prism-tool-item" data-action="music">
          <div class="prism-tool-icon-wrapper">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
            </svg>
          </div>
          <span class="prism-tool-label">Nhạc</span>
        </div>

        <div class="prism-tool-item" data-action="images">
          <div class="prism-tool-icon-wrapper">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" /><path d="M20.4 14.5L16 10 5 21" />
            </svg>
          </div>
          <span class="prism-tool-label">Thư Viện</span>
        </div>

        <div class="prism-tool-item" data-action="hotspots">
          <div class="prism-tool-icon-wrapper">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="3" />
            </svg>
          </div>
          <span class="prism-tool-label">Hotspot</span>
        </div>

        <div class="prism-tool-item" data-action="share">
          <div class="prism-tool-icon-wrapper">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
          </div>
          <span class="prism-tool-label">Chia Sẻ</span>
        </div>

        <div class="prism-tool-item" data-action="call">
          <div class="prism-tool-icon-wrapper">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </div>
          <span class="prism-tool-label">Liên Hệ</span>
        </div>

        <div class="prism-tool-item" data-action="fullscreen">
          <div class="prism-tool-icon-wrapper">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m15 3 6 6M9 21l-6-6M21 3v6h-6M3 21v-6h6" />
            </svg>
          </div>
          <span class="prism-tool-label">Toàn Màn</span>
        </div>
          </div>
          <span class="prism-tool-label">Xoay 360</span>
        </div>
          </div>
          <span class="prism-tool-label">Xoay 360</span>
        </div>


      </div>
    </div>
  `;

  window.prismCompassHTML = `
    <div class="compass-widget prism-compass" id="compass-widget">
      <div class="compass-outer-glow"></div>
      <div class="compass-dial" id="compass-dial">
        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <!-- Inner card background -->
          <circle cx="40" cy="40" r="32" fill="#1F2937" stroke="rgba(255,255,255,0.05)" stroke-width="1.5"/>
          <!-- Dial border with purple/coral gradient -->
          <circle cx="40" cy="40" r="35" stroke="url(#prismCompassGrad)" stroke-width="1.5" stroke-dasharray="3 3"/>
          <!-- Minimal Ticks -->
          <line x1="40" y1="12" x2="40" y2="16" stroke="#7C3AED" stroke-width="2" stroke-linecap="round"/>
          <line x1="40" y1="64" x2="40" y2="68" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/>
          <line x1="12" y1="40" x2="16" y2="40" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/>
          <line x1="64" y1="40" x2="68" y2="40" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/>
          <!-- Minimal Colorful Needle -->
          <g>
            <!-- North needle: Purple / Coral gradient -->
            <polygon points="40,16 43,40 40,36 37,40" fill="url(#prismNeedleGradNorth)"/>
            <!-- South needle: Sleek grey -->
            <polygon points="40,64 43,40 40,44 37,40" fill="rgba(255, 255, 255, 0.15)"/>
          </g>
          <defs>
            <linearGradient id="prismCompassGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#FF6B6B" />
              <stop offset="100%" stop-color="#7C3AED" />
            </linearGradient>
            <linearGradient id="prismNeedleGradNorth" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#FF6B6B" />
              <stop offset="100%" stop-color="#7C3AED" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div class="compass-cardinal prism-n">B</div>
      <div class="compass-degree-display" id="compass-degree">0°</div>
    </div>
  `;

  // OPTION 9: NEXUS LAYOUT TEMPLATES
  window.nexusNavHTML = `<div class="nexus-nav-container" id="nexus-nav-container">
      <div class="nexus-nav-wrapper">
        <div class="nexus-nav-list">

          <!-- Item 1: Top View -->
          <div class="nexus-nav-item" data-id="topview" data-pano-node="${PROJECT_CONTENT.navItems.topview.node}">
            <div class="nexus-nav-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path>
                <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0Z"></path>
              </svg>
            </div>
            <span class="nexus-nav-label">${PROJECT_CONTENT.navItems.topview.label}</span>
            <span class="nexus-active-line"></span>
          </div>

          <!-- Item 2: Bird View -->
          <div class="nexus-nav-item has-submenu" data-id="birdview">
            <div class="nexus-nav-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                <line x1="12" y1="22.08" x2="12" y2="12"></line>
              </svg>
            </div>
            <span class="nexus-nav-label">${PROJECT_CONTENT.navItems.birdview.label}</span>
            <span class="nexus-active-line"></span>
            <div class="nexus-submenu">
              ${generateSubmenuHTML(PROJECT_CONTENT.navItems.birdview.submenu, 'nexus-submenu-item')}
            </div>
          </div>

          <!-- Item 3: Amenities -->
          <div class="nexus-nav-item" data-id="amenities">
            <div class="nexus-nav-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="m12 3-1.912 5.886H3.88l5.03 3.656L7.002 18.43 12 14.772l4.998 3.656-1.908-5.888 5.03-3.656h-6.208L12 3Z"></path>
              </svg>
            </div>
            <span class="nexus-nav-label">${PROJECT_CONTENT.navItems.amenities.label}</span>
            <span class="nexus-active-line"></span>
          <div class="nexus-submenu">
              ${generateSubmenuHTML(PROJECT_CONTENT.navItems.amenities.submenu, 'nexus-submenu-item')}
            </div></div>

          <!-- Item 4: Architecture -->
          <div class="nexus-nav-item" data-id="architecture">
            <div class="nexus-nav-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2"></rect>
                <path d="M9 3v18"></path>
                <path d="m15 9-6 6"></path>
                <path d="M15 15h3"></path>
                <path d="M15 9h3"></path>
              </svg>
            </div>
            <span class="nexus-nav-label">${PROJECT_CONTENT.navItems.architecture.label}</span>
            <span class="nexus-active-line"></span>
          <div class="nexus-submenu">
              ${generateSubmenuHTML(PROJECT_CONTENT.navItems.architecture.submenu, 'nexus-submenu-item')}
            </div></div>

          <!-- Item 5: Interior -->
          <div class="nexus-nav-item has-submenu" data-id="interior">
            <div class="nexus-nav-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 18v3h16v-3"></path>
                <path d="M4 10v4h16v-4"></path>
                <path d="M8 10V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v5"></path>
                <path d="M12 10V3"></path>
              </svg>
            </div>
            <span class="nexus-nav-label">${PROJECT_CONTENT.navItems.interior.label}</span>
            <span class="nexus-active-line"></span>
            <div class="nexus-submenu">
              ${generateSubmenuHTML(PROJECT_CONTENT.navItems.interior.submenu, 'nexus-submenu-item')}
            </div>
          </div>

          <!-- Item 6: Liên kết vùng -->
          <div class="nexus-nav-item" data-id="surrounding" data-action="region-page">
            <div class="nexus-nav-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M9 20 3 17V4l6 3 6-3 6 3v13z"></path>
                <path d="M9 7v13"></path>
                <path d="M15 4v13"></path>
              </svg>
            </div>
            <span class="nexus-nav-label">${PROJECT_CONTENT.navItems.surrounding.label}</span>
            <span class="nexus-active-line"></span>
          </div>

        </div>
      </div>
    </div>
  `;

  window.nexusRightToolHTML = `
    <div class="nexus-tool-container" id="nexus-tool-container">
      <div class="nexus-tool-list">

        <div class="nexus-tool-item" data-action="info">
          <div class="nexus-tool-icon-wrapper">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
          </div>
          <span class="nexus-tool-label">Thông Tin</span>
          <div class="nexus-tool-tooltip">Thông tin dự án</div>
        </div>

        <div class="nexus-tool-item" data-action="music">
          <div class="nexus-tool-icon-wrapper">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
          </div>
          <span class="nexus-tool-label">Nhạc</span>
          <div class="nexus-tool-tooltip">Nhạc nền</div>
        </div>

        <div class="nexus-tool-item" data-action="images">
          <div class="nexus-tool-icon-wrapper">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
              <circle cx="9" cy="9" r="2" />
            </svg>
          </div>
          <span class="nexus-tool-label">Thư Viện</span>
          <div class="nexus-tool-tooltip">Thư viện ảnh</div>
        </div>

        <div class="nexus-tool-item" data-action="hotspots">
          <div class="nexus-tool-icon-wrapper">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="m12 8-4 4 4 4 4-4-4-4Z" />
            </svg>
          </div>
          <span class="nexus-tool-label">Hotspot</span>
          <div class="nexus-tool-tooltip">Bật/tắt điểm nóng</div>
        </div>

        <div class="nexus-tool-item" data-action="share">
          <div class="nexus-tool-icon-wrapper">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
          </div>
          <span class="nexus-tool-label">Chia Sẻ</span>
          <div class="nexus-tool-tooltip">Chia sẻ dự án</div>
        </div>

        <div class="nexus-tool-item" data-action="call">
          <div class="nexus-tool-icon-wrapper">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </div>
          <span class="nexus-tool-label">Liên Hệ</span>
          <div class="nexus-tool-tooltip">Liên hệ hỗ trợ</div>
        </div>

        <div class="nexus-tool-item" data-action="fullscreen">
          <div class="nexus-tool-icon-wrapper">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="m8 3-5 5 5 5" />
              <path d="M3 8h18" />
              <path d="m16 21 5-5-5-5" />
            </svg>
          </div>
          <span class="nexus-tool-label">Toàn Màn</span>
          <div class="nexus-tool-tooltip">Toàn màn hình</div>
        </div>
          </div>
          <span class="nexus-tool-label">Xoay 360</span>
          <div class="nexus-tool-tooltip">Tự động xoay</div>
        </div>
          </div>
          <span class="nexus-tool-label">Xoay 360</span>
          <div class="nexus-tool-tooltip">Tự động xoay</div>
        </div>


      </div>
    </div>
  `;

  window.nexusCompassHTML = `
    <div class="compass-widget nexus-compass" id="compass-widget">
      <div class="compass-dial" id="compass-dial">
        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <circle cx="40" cy="40" r="36" stroke="rgba(255,255,255,0.06)" stroke-width="1" />
          <circle cx="40" cy="40" r="30" stroke="rgba(255,255,255,0.03)" stroke-width="1" />
          <!-- Dial lines -->
          <line x1="40" y1="8" x2="40" y2="14" stroke="rgba(255,255,255,0.4)" stroke-width="1"/>
          <line x1="40" y1="66" x2="40" y2="72" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>
          <line x1="8" y1="40" x2="14" y2="40" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>
          <line x1="66" y1="40" x2="72" y2="40" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>
          <!-- Needle: Lavender and Mint subtle gradient -->
          <g>
            <polygon points="40,16 42,40 40,38 38,40" fill="#5EEAD4" />
            <polygon points="40,64 42,40 40,42 38,40" fill="rgba(255,255,255,0.15)" />
          </g>
        </svg>
      </div>
      <div class="compass-cardinal nexus-n">B</div>
      <div class="compass-degree-display" id="compass-degree">0°</div>
    </div>
  `;

  // ==========================================
  // OPTION 10: MONARCH LAYOUT TEMPLATES
  // ==========================================
  window.monarchNavHTML = `<div class="monarch-nav-container" id="monarch-nav-container">
      <div class="monarch-nav-wrapper">
        <div class="monarch-nav-dock">
          ${['topview', 'birdview', 'amenities', 'architecture', 'interior'].map(id => {
            const item = PROJECT_CONTENT.navItems[id];
            if (item.submenu) {
                return `
          <div class="monarch-nav-item has-popover" data-id="${id}">
            <div class="monarch-nav-btn monarch-hover-sweep">
              <span class="monarch-nav-label">${item.label}</span>
            </div>
            <div class="monarch-popover">
              <div class="monarch-popover-title">${item.label.toUpperCase()}</div>
              <div class="monarch-popover-items">
                ${generateSubmenuHTML(item.submenu, 'monarch-popover-item monarch-hover-sweep')}
              </div>
            </div>
          </div>`;
            } else {
                return `
          <div class="monarch-nav-item" data-id="${id}" ${item.node ? `data-pano-node="${item.node}"` : ''}>
            <div class="monarch-nav-btn monarch-hover-sweep">
              <span class="monarch-nav-label">${item.label}</span>
            </div>
          </div>`;
            }
          }).join('')}
          <div class="monarch-nav-item" data-id="surrounding" data-action="region-page">
            <div class="monarch-nav-btn monarch-hover-sweep">
              <span class="monarch-nav-label">${PROJECT_CONTENT.navItems.surrounding.label}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  window.monarchCommandPanelHTML = `
    <div class="monarch-command-panel" id="monarch-command-panel">
      <div class="monarch-command-list">
        <div class="monarch-command-item monarch-hover-sweep" data-action="info">
          <span class="monarch-command-label">Thông tin</span>
          <div class="monarch-command-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
          </div>
        </div>

        <div class="monarch-command-item monarch-hover-sweep" data-action="music">
          <span class="monarch-command-label">Nhạc nền</span>
          <div class="monarch-command-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2">
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
          </div>
        </div>
        
        <div class="monarch-command-item monarch-hover-sweep" data-action="images">
          <span class="monarch-command-label">Hình ảnh</span>
          <div class="monarch-command-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
              <circle cx="9" cy="9" r="2" />
            </svg>
          </div>
        </div>
        
        <div class="monarch-command-item monarch-hover-sweep" data-action="hotspots">
          <span class="monarch-command-label">Điểm điều hướng</span>
          <div class="monarch-command-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2">
              <circle cx="12" cy="12" r="10" />
              <path d="m12 8-4 4 4 4 4-4-4-4Z" />
            </svg>
          </div>
        </div>
        
        <div class="monarch-command-item monarch-hover-sweep" data-action="share">
          <span class="monarch-command-label">Chia sẻ</span>
          <div class="monarch-command-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2">
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
          </div>
        </div>
        
        <div class="monarch-command-item monarch-hover-sweep" data-action="call">
          <span class="monarch-command-label">Liên hệ</span>
          <div class="monarch-command-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </div>
        </div>
        
        <div class="monarch-command-item monarch-hover-sweep" data-action="fullscreen">
          <span class="monarch-command-label">Toàn màn hình</span>
          <div class="monarch-command-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2">
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
            </svg>
          </div>
        </div>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg>
          </div>
        </div>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/></svg>
          </div>
        </div>
      </div>
    </div>
  `;

  window.monarchLayoutSelectorHTML = ``;

  window.monarchCompassHTML = `
    <div class="compass-widget monarch-compass" id="compass-widget">
      <div class="compass-dial" id="compass-dial">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <!-- Outer bezel watch ring -->
          <circle cx="50" cy="50" r="48" stroke="#C8A96B" stroke-width="1.5" fill="rgba(13,13,13,0.85)" />
          <circle cx="50" cy="50" r="44" stroke="rgba(200, 169, 107, 0.3)" stroke-width="1" />
          
          <!-- Bezel markers -->
          <line x1="50" y1="2" x2="50" y2="8" stroke="#C8A96B" stroke-width="1.5"/>
          <line x1="50" y1="92" x2="50" y2="98" stroke="#C8A96B" stroke-width="1"/>
          <line x1="2" y1="50" x2="8" y2="50" stroke="#C8A96B" stroke-width="1"/>
          <line x1="92" y1="50" x2="98" y2="50" stroke="#C8A96B" stroke-width="1"/>
          
          <!-- Subdivisions (chronograph style) -->
          <g stroke="rgba(228, 197, 144, 0.4)" stroke-width="0.5">
            <line x1="50" y1="5" x2="50" y2="10" transform="rotate(30 50 50)" />
            <line x1="50" y1="5" x2="50" y2="10" transform="rotate(60 50 50)" />
            <line x1="50" y1="5" x2="50" y2="10" transform="rotate(120 50 50)" />
            <line x1="50" y1="5" x2="50" y2="10" transform="rotate(150 50 50)" />
            <line x1="50" y1="5" x2="50" y2="10" transform="rotate(210 50 50)" />
            <line x1="50" y1="5" x2="50" y2="10" transform="rotate(240 50 50)" />
            <line x1="50" y1="5" x2="50" y2="10" transform="rotate(300 50 50)" />
            <line x1="50" y1="5" x2="50" y2="10" transform="rotate(330 50 50)" />
          </g>
          
          <!-- Watch needle -->
          <g>
            <polygon points="50,12 53,50 50,47 47,50" fill="#E4C590" />
            <polygon points="50,88 53,50 50,53 47,50" fill="rgba(255, 255, 255, 0.25)" />
            <circle cx="50" cy="50" r="3" fill="#C8A96B" />
          </g>
        </svg>
      </div>
      <div class="compass-cardinal monarch-n">B</div>
      <div class="compass-degree-display" id="compass-degree">0°</div>
    </div>
  `;

  window.monarchMinimapHTML = `
    <div class="minimap-widget monarch-minimap collapsed" id="minimap-widget">
      <div class="minimap-header" id="minimap-toggle-btn">
        <div class="minimap-header-title">
          <svg viewBox="0 0 24 24" fill="none" width="14" height="14">
            <path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3V6z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
            <path d="M9 3v15M15 6v15" stroke="currentColor" stroke-width="1.5"/>
          </svg>
          <span class="minimap-label">BLUEPRINT MAP</span>
        </div>
        <div class="minimap-header-actions">
          <button class="minimap-action-btn" id="minimap-resize-btn" title="Phóng to/Thu nhỏ bản đồ">
            <svg viewBox="0 0 24 24" fill="none" width="12" height="12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" class="expand-icon" />
              <path d="M4 14h6v6M20 10h-6V4M14 10l7-7M10 14l-7 7" class="shrink-icon" style="display:none;" />
            </svg>
          </button>
          <button class="minimap-action-btn" id="minimap-chevron-btn" title="Thu nhỏ/Mở rộng bản đồ">
            <svg class="minimap-chevron" viewBox="0 0 24 24" fill="none" width="12" height="12">
              <path d="M18 15l-6-6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
      <div class="minimap-body" id="minimap-body">
        <div class="minimap-canvas" id="minimap-canvas">
          <div id="minimap-zoom-wrapper" style="width:100%; height:100%; position:absolute; top:0; left:0; transform-origin:50% 50%; transition: transform 0.1s;">
            <img src="image/Map_optimized.jpg" alt="Bản đồ dự án" class="minimap-img" id="minimap-img">
            <!-- Viewcone rotation indicator -->
            <div class="minimap-viewcone" id="minimap-viewcone"></div>
            <!-- Position dot -->
            <div class="minimap-dot" id="minimap-dot"></div>
          </div>
        </div>
      </div>
    </div>
  `;

  // ==========================================
  // REGAL (LAYOUT 10 - ARCHITECT BLUEPRINT EDITION)
  // ==========================================

  window.regalHeaderHTML = `
    <div class="blueprint-top-ribbon">
      <div class="blueprint-ribbon-left">
        <div class="blueprint-logo">${PROJECT_CONTENT.projectTitle.top}</div>
        <div class="blueprint-ribbon-divider"></div>
        <div class="blueprint-project-sub">${PROJECT_CONTENT.projectTitle.sub}</div>
      </div>
      <div class="blueprint-ribbon-center">
        <div class="blueprint-view-title" id="regal-current-pano-title">Top View</div>
      </div>
      <div class="blueprint-ribbon-right"></div>
    </div>
  `;

    window.regalNavHTML = `
    <div class="rgl-neo-nav-wrapper" id="blueprint-nav-container">
      <div class="rgl-neo-nav-core" id="blueprint-nav-button" title="Menu">
        <div class="rgl-neo-core-ring"></div>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 22px; height: 22px;"><line x1="4" y1="7" x2="20" y2="7"/><line x1="8" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></svg>
      </div>
      
      <div class="rgl-neo-panel" id="blueprint-left-panel">
        <div class="rgl-neo-nav-grid">
          
          <div class="rgl-neo-nav-module" data-id="topview" data-pano-node="${PROJECT_CONTENT.navItems.topview.node}">
            <div class="rgl-neo-nav-indicator"></div>
            <span class="rgl-neo-nav-text">${PROJECT_CONTENT.navItems.topview.label}</span>
          </div>

          <div class="rgl-neo-nav-module has-submenu" data-id="birdview">
            <div class="rgl-neo-nav-header">
              <div class="rgl-neo-nav-indicator"></div>
              <span class="rgl-neo-nav-text">${PROJECT_CONTENT.navItems.birdview.label}</span>
              <span class="rgl-neo-chevron"><svg viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2" fill="none"/></svg></span>
            </div>
            <div class="rgl-neo-submenu">
               ${generateSubmenuHTML(PROJECT_CONTENT.navItems.birdview.submenu, 'rgl-neo-sub-item')}
            </div>
          </div>

          <div class="rgl-neo-nav-module has-submenu" data-id="amenities">
            <div class="rgl-neo-nav-header">
              <div class="rgl-neo-nav-indicator"></div>
              <span class="rgl-neo-nav-text">${PROJECT_CONTENT.navItems.amenities.label}</span>
              <span class="rgl-neo-chevron"><svg viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2" fill="none"/></svg></span>
            </div>
            <div class="rgl-neo-submenu">
               ${generateSubmenuHTML(PROJECT_CONTENT.navItems.amenities.submenu, 'rgl-neo-sub-item')}
            </div>
          </div>

          <div class="rgl-neo-nav-module has-submenu" data-id="architecture">
            <div class="rgl-neo-nav-header">
              <div class="rgl-neo-nav-indicator"></div>
              <span class="rgl-neo-nav-text">${PROJECT_CONTENT.navItems.architecture.label}</span>
              <span class="rgl-neo-chevron"><svg viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2" fill="none"/></svg></span>
            </div>
            <div class="rgl-neo-submenu">
               ${generateSubmenuHTML(PROJECT_CONTENT.navItems.architecture.submenu, 'rgl-neo-sub-item')}
            </div>
          </div>

          <div class="rgl-neo-nav-module has-submenu" data-id="interior">
            <div class="rgl-neo-nav-header">
              <div class="rgl-neo-nav-indicator"></div>
              <span class="rgl-neo-nav-text">${PROJECT_CONTENT.navItems.interior.label}</span>
              <span class="rgl-neo-chevron"><svg viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2" fill="none"/></svg></span>
            </div>
            <div class="rgl-neo-submenu">
               ${generateSubmenuHTML(PROJECT_CONTENT.navItems.interior.submenu, 'rgl-neo-sub-item')}
            </div>
          </div>

        </div>
      </div>
    </div>
  `;

    window.regalUtilityHTML = `
    <div class="rgl-neo-tools-system">
      <!-- Module 1: View -->
      <div class="rgl-neo-tool-module">
        <div class="rgl-neo-tool-btn" data-action="toggle-minimap" title="Bản đồ">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon><line x1="9" y1="3" x2="9" y2="18"></line><line x1="15" y1="6" x2="15" y2="21"></line></svg>
        </div>
        <div class="rgl-neo-tool-btn" data-action="images" title="Hình ảnh">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" /><circle cx="9" cy="9" r="2" /></svg>
        </div>
      </div>

      <!-- Module 2: Interactivity -->
      <div class="rgl-neo-tool-module">
        <div class="rgl-neo-tool-btn" data-action="hotspots" title="Điểm neo">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10" /><path d="m12 8-4 4 4 4 4-4-4-4Z" /></svg>
        </div>
        <div class="rgl-neo-tool-btn" data-action="music" title="Cài đặt / Nhạc">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></svg>
        </div>
      </div>

      <!-- Module 3: System -->
      <div class="rgl-neo-tool-module">
        <div class="rgl-neo-tool-btn" data-action="share" title="Chia sẻ MXH">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
        </div>
        <div class="rgl-neo-tool-btn" data-action="call" title="Liên hệ tư vấn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
        </div>
        <div class="rgl-neo-tool-btn" data-action="fullscreen" title="Toàn màn hình">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" /></svg>
        </div>
      </div>
    </div>
  `;

  window.regalGalleryHTML = `
    <div class="blueprint-floating-gallery-container" id="blueprint-gallery-container">
      <div class="blueprint-view-selector" id="blueprint-view-selector">
        <span class="blueprint-selector-text" id="blueprint-selector-text">VIEW</span>
        <svg class="blueprint-selector-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 15l-6-6-6 6" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
      <div class="blueprint-floating-panel" id="blueprint-gallery-panel">
        <div class="blueprint-gallery-nav prev" id="blueprint-gallery-prev"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 19l-7-7 7-7" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
        <div class="blueprint-floating-track-wrapper">
          <div class="blueprint-floating-track" id="blueprint-gallery-track">
            <div class="blueprint-gallery-item active" data-pano-node="node1"><div class="blueprint-thumb" style="background-image:url('image/thumbnails/thumb_PIN TOP.jpg'), url('image/PIN TOP.jpg')"></div><span class="blueprint-thumb-title">Top View</span></div>
            <div class="blueprint-gallery-item" data-pano-node="node2"><div class="blueprint-thumb" style="background-image:url('image/thumbnails/PIN BIRD.jpg')"></div><span class="blueprint-thumb-title">Bird View 1</span></div>
            <div class="blueprint-gallery-item" data-pano-node="node3"><div class="blueprint-thumb" style="background-image:url('image/thumbnails/PIN TOP NIGHT.jpg')"></div><span class="blueprint-thumb-title">Bird View 2</span></div>
            <div class="blueprint-gallery-item" data-pano-node="node4"><div class="blueprint-thumb" style="background-image:url('image/thumbnails/PIN PARK.jpg')"></div><span class="blueprint-thumb-title">Park</span></div>
            <div class="blueprint-gallery-item" data-pano-node="node5"><div class="blueprint-thumb" style="background-image:url('image/thumbnails/PIN STREET.jpg')"></div><span class="blueprint-thumb-title">Street</span></div>
            <div class="blueprint-gallery-item" data-pano-node="node6"><div class="blueprint-thumb" style="background-image:url('image/thumbnails/PIN PARK 02.jpg')"></div><span class="blueprint-thumb-title">Park 2</span></div>
            <div class="blueprint-gallery-item" data-pano-node="node7"><div class="blueprint-thumb" style="background-image:url('image/thumbnails/PIN LIVING 2.jpg')"></div><span class="blueprint-thumb-title">Living 2</span></div>
            <div class="blueprint-gallery-item" data-pano-node="node8"><div class="blueprint-thumb" style="background-image:url('image/thumbnails/PIN LIVING.jpg')"></div><span class="blueprint-thumb-title">Living 1</span></div>
            <div class="blueprint-gallery-item" data-pano-node="node9"><div class="blueprint-thumb" style="background-image:url('image/thumbnails/PIN THONG TANG.jpg')"></div><span class="blueprint-thumb-title">Thông Tầng</span></div>
            <div class="blueprint-gallery-item" data-pano-node="node10"><div class="blueprint-thumb" style="background-image:url('image/thumbnails/PIN BALCONY.jpg')"></div><span class="blueprint-thumb-title">Balcony</span></div>
            <div class="blueprint-gallery-item" data-pano-node="node11"><div class="blueprint-thumb" style="background-image:url('image/thumbnails/PIN WC.jpg')"></div><span class="blueprint-thumb-title">WC</span></div>
          </div>
        </div>
        <div class="blueprint-gallery-nav next" id="blueprint-gallery-next"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
      </div>
    </div>
  `;

  window.regalTimelineHTML = ``;

  window.regalSwitcherHTML = `
    <div class="blueprint-layout-switcher" id="regal-layout-switcher">
      <select class="blueprint-select-switcher" id="blueprint-switcher-select">
        <option value="classic">01 CLASSIC</option>
        <option value="futuristic">02 FUTURISTIC</option>
        <option value="neo">03 NEO</option>
        <option value="gradient">04 GRADIENT</option>
        <option value="aurora">05 AURORA</option>
        <option value="horizon">06 HORIZON</option>
        <option value="prism">07 PRISM</option>
        <option value="nexus">08 NEXUS</option>
        <option value="monarch">09 MONARCH</option>
        <option value="regal" selected>10 ARCHITECT</option>
        <option value="command">11 COMMAND</option>
      </select>
    </div>
  `;

  window.regalMinimapHTML = `
    <div class="minimap-widget blueprint-minimap collapsed" id="minimap-widget">
      <div class="minimap-header" id="minimap-toggle-btn">
        <div class="minimap-header-title">
          <span class="minimap-label">SITE PLAN</span>
        </div>
        <div class="minimap-controls">
          <button class="minimap-action-btn" id="minimap-resize-btn" title="Thu phóng bản đồ">
            <svg viewBox="0 0 24 24" fill="none" width="12" height="12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" class="expand-icon" />
              <path d="M4 14h6v6M20 10h-6V4M14 10l7-7M10 14l-7 7" class="shrink-icon" style="display:none;" />
            </svg>
          </button>
          <button class="minimap-action-btn" id="minimap-chevron-btn" title="Thu nhỏ/Mở rộng bản đồ">
            <svg class="minimap-chevron" viewBox="0 0 24 24" fill="none" width="12" height="12"><path d="M18 15l-6-6-6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
        </div>
      </div>
      <div class="minimap-body" id="minimap-body">
        <div class="minimap-canvas" id="minimap-canvas">
          <div id="minimap-zoom-wrapper" style="width:100%; height:100%; position:absolute; top:0; left:0; transform-origin:50% 50%; transition: transform 0.1s;">
            <img src="image/Map_optimized.jpg" alt="Bản đồ dự án" class="minimap-img" id="minimap-img">
            <div class="minimap-viewcone" id="minimap-viewcone"></div>
            <div class="minimap-dot" id="minimap-dot"></div>
          </div>
        </div>
      </div>
    </div>
  `;

  window.regalCompassHTML = `
    <div class="compass-widget blueprint-compass" id="compass-widget">
      <div class="compass-dial" id="compass-dial">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <circle cx="50" cy="50" r="48" stroke="#2A2A2A" stroke-width="0.5" fill="none" />
          <line x1="50" y1="5" x2="50" y2="95" stroke="#E5E4E0" stroke-width="0.5"/>
          <line x1="5" y1="50" x2="95" y2="50" stroke="#E5E4E0" stroke-width="0.5"/>
          <g>
            <polygon points="50,15 53,50 50,50 47,50" fill="#B87333" />
            <polygon points="50,85 53,50 50,50 47,50" fill="#2A2A2A" />
            <circle cx="50" cy="50" r="2" fill="#B87333" />
          </g>
        </svg>
      </div>
      <div class="compass-cardinal regal-n">N</div>
      <div class="compass-degree-display" id="compass-degree">0°</div>
    </div>
  `;

  // ==========================================
  // SHARED WIDGET TEMPLATES (both layouts)
  // ==========================================

  // Compass Widget - positioned bottom-left above layout switcher
  window.compassWidgetHTML = `
    <div class="compass-widget" id="compass-widget">
      <div class="compass-outer-ring"></div>
      <div class="compass-dial" id="compass-dial">
        <svg viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <!-- Background circle -->
          <circle cx="36" cy="36" r="30" fill="rgba(0,0,0,0.6)" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>
          <!-- Ticks -->
          <g stroke="rgba(255,255,255,0.4)" stroke-width="1.5">
            <line x1="36" y1="6" x2="36" y2="10" />
            <line x1="36" y1="62" x2="36" y2="66" />
            <line x1="6" y1="36" x2="10" y2="36" />
            <line x1="62" y1="36" x2="66" y2="36" />
          </g>
          <!-- Custom Needle -->
          <g>
            <!-- North half -->
            <polygon points="36,6 39.5,36 36,32 32.5,36" fill="url(#compassNeedleGrad)"/>
            <!-- South half -->
            <polygon points="36,66 39.5,36 36,40 32.5,36" fill="rgba(255,255,255,0.3)"/>
            <defs>
              <linearGradient id="compassNeedleGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#00f2fe" />
                <stop offset="100%" stop-color="#4facfe" />
              </linearGradient>
            </defs>
          </g>
        </svg>
      </div>
      <div class="compass-cardinal n">B</div>
      <div class="compass-degree-display" id="compass-degree">0°</div>
    </div>
  `;

  // Neo Compass Widget
  window.neoCompassHTML = `
    <div class="compass-widget neo-compass" id="compass-widget">
      <div class="compass-dial" id="compass-dial">
        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <circle cx="40" cy="40" r="38" fill="none" stroke="rgba(124, 58, 237, 0.35)" stroke-width="1.5"/>
          <!-- Glow needle for Neo -->
          <g>
            <polygon class="needle-north" points="40,8 44,40 40,35 36,40" fill="#7C3AED"/>
            <polygon class="needle-south" points="40,72 44,40 40,45 36,40" fill="rgba(30, 41, 59, 0.25)"/>
          </g>
        </svg>
      </div>
      <div class="compass-cardinal n">B</div>
      <div class="compass-degree-display" id="compass-degree">0°</div>
    </div>
  `;




  // Mini Map Widget - positioned bottom-right
  
  // Sync initial toolbar button states
  setTimeout(() => {
    // Sync hotspots initially to ON (visible)
    document.querySelectorAll('[data-action="hotspots"]').forEach(btn => {
      btn.classList.add("active", "active-tool");
    });
    
    document.querySelectorAll('[data-action="music"]').forEach(btn => {
      if (typeof window.isMusicMuted !== 'undefined') {
        btn.classList.toggle("active", !window.isMusicMuted);
        btn.classList.toggle("active-tool", !window.isMusicMuted);
      }
    });
    const hotspotsBtn = document.querySelector('.rgl-neo-tool-btn[data-action="hotspots"]');
    if (hotspotsBtn && typeof isHotspotsHidden !== 'undefined') {
       hotspotsBtn.classList.toggle("active", !isHotspotsHidden);
    }
  }, 100);

  window.minimapWidgetHTML = `
    <div class="minimap-widget collapsed" id="minimap-widget">
      <div class="minimap-header" id="minimap-toggle-btn">
        <div class="minimap-header-title">
          <svg viewBox="0 0 24 24" fill="none" width="14" height="14">
            <path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3V6z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
            <path d="M9 3v15M15 6v15" stroke="currentColor" stroke-width="1.5"/>
          </svg>
          <span class="minimap-label">BẢN ĐỒ</span>
        </div>
        <div class="minimap-header-actions">
          <button class="minimap-action-btn" id="minimap-resize-btn" title="Phóng to/Thu nhỏ bản đồ">
            <svg viewBox="0 0 24 24" fill="none" width="12" height="12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" class="expand-icon" />
              <path d="M4 14h6v6M20 10h-6V4M14 10l7-7M10 14l-7 7" class="shrink-icon" style="display:none;" />
            </svg>
          </button>
          <button class="minimap-action-btn" id="minimap-chevron-btn" title="Thu nhỏ/Mở rộng bản đồ">
            <svg class="minimap-chevron" viewBox="0 0 24 24" fill="none" width="12" height="12">
              <path d="M18 15l-6-6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
      <div class="minimap-body" id="minimap-body">
        <div class="minimap-canvas" id="minimap-canvas">
          <div id="minimap-zoom-wrapper" style="width:100%; height:100%; position:absolute; top:0; left:0; transform-origin:50% 50%; transition: transform 0.1s;">
            <img src="image/Map_optimized.jpg" alt="Bản đồ dự án" class="minimap-img" id="minimap-img">
            <!-- Viewcone rotation indicator -->
            <div class="minimap-viewcone" id="minimap-viewcone"></div>
            <!-- Position dot -->
            <div class="minimap-dot" id="minimap-dot"></div>
          </div>
        </div>
      </div>
    </div>
  `;

  // ==========================================
  // SHARED STATE & DATA STACKS
  // ==========================================

  // ==========================================
  // PREMIUM HOTSPOT SYSTEM — Data Layer
  // Active only in Layout #1 (Classic)
  // Hotspots exist ONLY in pin_top & pin_topnight
  // ==========================================



  // Minimap marker positions are now mathematically calculated based on Top View pan/tilt.

  // Track active hotspot
  let activeHotspotId = null;
  let currentHotspotElements = []; // [{el, pan, tilt, id}]

  // Safe localStorage helper (works on file:// protocol)
  function lsGet(key, fallback) {
    try { return localStorage.getItem(key) || fallback; } catch (e) { return fallback; }
  }
  function lsSet(key, value) {
    try { localStorage.setItem(key, value); } catch (e) {}
  }

  // System states (stored & persisted in localStorage)
  let layoutMode = lsGet("latien_layout_mode", "futuristic");
  let activeNavItemId = "";
  let activeSubmenuAction = "";
  let activePanoNode = lsGet("latien_active_node", "node1");
  let isSidebarExpanded = false; // state for collapsed sidebar in futuristic layout

  // Notification helper
  let notificationTimeout;
  function showNotification(text) {
    let container = document.getElementById("ui-notification");
    if (!container) {
      container = document.createElement("div");
      container.id = "ui-notification";
      container.style.cssText = `
        position: fixed;
        top: 24px;
        left: 50%;
        transform: translateX(-50%) translateY(-10px);
        background: rgba(8, 14, 24, 0.85);
        color: #00f2fe;
        border: 1px solid rgba(0, 242, 254, 0.3);
        padding: 10px 20px;
        border-radius: 8px;
        font-family: 'Share Tech Mono', monospace;
        font-size: 11px;
        letter-spacing: 1.5px;
        backdrop-filter: blur(12px);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5), 0 0 10px rgba(0, 242, 254, 0.15);
        z-index: 9999;
        opacity: 0;
        transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        pointer-events: none;
      `;
      document.body.appendChild(container);
    }
    // Update theme styling of notification dynamically
    if (layoutMode === "classic") {
      container.style.color = "#d4af37";
      container.style.borderColor = "rgba(212, 175, 55, 0.4)";
      container.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.3), 0 0 10px rgba(212, 175, 55, 0.2)";
      container.textContent = `HỆ THỐNG: ${text}`;
    } else if (layoutMode === "aurora") {
      container.style.color = "#EC4899";
      container.style.borderColor = "rgba(236, 72, 153, 0.4)";
      container.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.6), 0 0 15px rgba(236, 72, 153, 0.3)";
      container.textContent = `AURORA: ${text}`;
    } else if (layoutMode === "horizon") {
      container.style.color = "#F6C177";
      container.style.borderColor = "rgba(246, 193, 119, 0.4)";
      container.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.6), 0 0 15px rgba(246, 193, 119, 0.3)";
      container.textContent = `HORIZON: ${text}`;
    } else {
      container.style.color = "#00f2fe";
      container.style.borderColor = "rgba(0, 242, 254, 0.3)";
      container.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.5), 0 0 10px rgba(0, 242, 254, 0.15)";
      container.textContent = `SYSTEM: ${text}`;
    }

    container.style.opacity = "1";
    container.style.transform = "translateX(-50%) translateY(0)";

    clearTimeout(notificationTimeout);
    notificationTimeout = setTimeout(() => {
      container.style.opacity = "0";
      container.style.transform = "translateX(-50%) translateY(-10px)";
    }, 3000);
  }

  // ==========================================
  // LAYOUT SWAPPING LOGIC
  // ==========================================

  window.updateSwitcherUI = function updateSwitcherUI() {
    const classicSeg = document.getElementById("opt-layout-classic");
    const futuristicSeg = document.getElementById("opt-layout-futuristic");
    const neoSeg = document.getElementById("opt-layout-neo");
    const gradientSeg = document.getElementById("opt-layout-gradient");
    const auroraSeg = document.getElementById("opt-layout-aurora");
    const horizonSeg = document.getElementById("opt-layout-horizon");
    const prismSeg = document.getElementById("opt-layout-prism");
    const nexusSeg = document.getElementById("opt-layout-nexus");
    const monarchSeg = document.getElementById("opt-layout-monarch");
    const regalSeg = document.getElementById("opt-layout-regal");
    const slider = document.getElementById("switcher-slider");
    if (!classicSeg || !futuristicSeg || !neoSeg || !gradientSeg || !auroraSeg || !horizonSeg || !prismSeg || !nexusSeg || !slider) return;


    requestAnimationFrame(() => {
      let activeSeg = classicSeg;
      if (layoutMode === "futuristic") activeSeg = futuristicSeg;
      else if (layoutMode === "neo") activeSeg = neoSeg;
      else if (layoutMode === "gradient") activeSeg = gradientSeg;
      else if (layoutMode === "aurora") activeSeg = auroraSeg;
      else if (layoutMode === "horizon") activeSeg = horizonSeg;
      else if (layoutMode === "prism" && prismSeg) activeSeg = prismSeg;
      else if (layoutMode === "nexus" && nexusSeg) activeSeg = nexusSeg;
      else if (layoutMode === "monarch" && monarchSeg) activeSeg = monarchSeg;
      else if (layoutMode === "regal" && regalSeg) activeSeg = regalSeg;
      
      classicSeg.classList.toggle("active", layoutMode === "classic");
      futuristicSeg.classList.toggle("active", layoutMode === "futuristic");
      neoSeg.classList.toggle("active", layoutMode === "neo");
      gradientSeg.classList.toggle("active", layoutMode === "gradient");
      auroraSeg.classList.toggle("active", layoutMode === "aurora");
      horizonSeg.classList.toggle("active", layoutMode === "horizon");
      if (prismSeg) prismSeg.classList.toggle("active", layoutMode === "prism");
      if (nexusSeg) nexusSeg.classList.toggle("active", layoutMode === "nexus");
      if (monarchSeg) monarchSeg.classList.toggle("active", layoutMode === "monarch");
      if (regalSeg) regalSeg.classList.toggle("active", layoutMode === "regal");

      slider.style.width = `${activeSeg.offsetWidth}px`;
      slider.style.left  = `${activeSeg.offsetLeft}px`;
    });
  }

  // Position active nav glow backing elements
  function updateActiveGlow(activeItem) {
    const activeGlow = document.getElementById("nav-glow");
    if (!activeItem || !activeGlow) return;

    const rect = activeItem.getBoundingClientRect();
    const parentRect = activeItem.parentElement.getBoundingClientRect();

    if (layoutMode === "classic") {
      const leftOffset = rect.left - parentRect.left;
      activeGlow.style.opacity = "1";
      activeGlow.style.width = `${rect.width}px`;
      activeGlow.style.left = `${leftOffset}px`;
      activeGlow.style.height = "";
      activeGlow.style.top = "";
    } else {
      const topOffset = rect.top - parentRect.top;
      activeGlow.style.opacity = "1";
      activeGlow.style.height = `${rect.height}px`;
      activeGlow.style.top = `${topOffset}px`;
      activeGlow.style.width = "";
      activeGlow.style.left = "";
    }
  }

  // Inject structural templates and initialize event listeners for layout

    window.globalFloatingLogoHTML = `
      <div class="layout-floating-logo global-floating-logo" style="position: absolute; top: 20px; left: 20px; z-index: 1000; display: flex; flex-direction: column; align-items: flex-start; pointer-events: none;">
        <div class="logo-script-top" style="font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 700; letter-spacing: 2px; color: #fff; text-shadow: 0 2px 10px rgba(0,0,0,0.5);">${PROJECT_CONTENT.projectTitle.top}</div>
        <div class="logo-script-wave" style="width: 40px; height: 2px; background: #fff; margin: 5px 0; box-shadow: 0 1px 3px rgba(0,0,0,0.5);"></div>
        <div class="logo-script-sub" style="font-family: 'Montserrat', sans-serif; font-size: 11px; letter-spacing: 4px; color: rgba(255,255,255,0.8); text-transform: uppercase; text-shadow: 0 1px 3px rgba(0,0,0,0.5);">${PROJECT_CONTENT.projectTitle.sub}</div>
      </div>
    `;

window.globalModalsHTML = `
  <!-- 1. Project Information Modal -->
  
  <div class="global-modal-overlay" id="project-info-modal">
    <div class="global-modal-content project-info-expanded">
      <div class="modal-header">
        <h2>Thông Tin Dự Án TAV</h2>
        <div class="modal-close-btn" onclick="document.getElementById('project-info-modal').classList.remove('active')">&times;</div>
      </div>
      <div class="modal-body scrollable-modal-body">
        <section>
          <h3>Tổng Quan</h3>
          <p>Khu đô thị mới TAV mang đến chuẩn mực sống hoàn toàn mới với không gian xanh mát và hệ sinh thái tiện ích đẳng cấp quốc tế. Tọa lạc tại vị trí chiến lược, dự án là viên ngọc quý giữa lòng thành phố.</p>
        </section>
        <section>
          <h3>Tiện Ích Nội Khu</h3>
          <ul class="info-list">
            <li>Hồ bơi vô cực & Công viên sinh thái 10ha</li>
            <li>Trung tâm thương mại & Siêu thị 24/7</li>
            <li>Hệ thống phòng Gym, Spa tiêu chuẩn 5 sao</li>
            <li>Trường học quốc tế & Bệnh viện đa khoa</li>
          </ul>
        </section>
        <section>
          <h3>Kiến Trúc & Nội Thất</h3>
          <p>Sự kết hợp hoàn hảo giữa phong cách thiết kế hiện đại và sự tinh tế trong từng đường nét. Nội thất được nhập khẩu 100% từ các thương hiệu hàng đầu Châu Âu.</p>
        </section>
        <section>
          <h3>Kết Nối Xung Quanh</h3>
          <p>Cách trung tâm thành phố 15 phút di chuyển. Thuận tiện kết nối với các tuyến cao tốc huyết mạch và sân bay quốc tế.</p>
        </section>
        <section class="contact-section">
          <h3>Thông Tin Liên Hệ</h3>
          <p>Hotline: <strong>077 646 9999</strong></p>
          <p>Email: contact@latien.vn</p>
          <p>Website: www.latien.vn</p>
        </section>
      </div>
    </div>
  </div>

  <!-- 2. Image Gallery Panel -->
  <div class="global-modal-overlay" id="image-gallery-modal">
    <div class="global-modal-content gallery-content">
      <div class="modal-header">
        <h2>Thư Viện Ảnh 360</h2>
        <div class="modal-close-btn" onclick="document.querySelectorAll('#image-gallery-modal').forEach(m=>m.classList.remove('active'))">&times;</div>
      </div>
      <div class="modal-body gallery-grid">
        <div class="gallery-card" onclick="window.pano && window.pano.openNext('{node1}'); document.querySelectorAll('#image-gallery-modal').forEach(m=>m.classList.remove('active'))">
          <img src="image/GALLERY 01.jpg" alt="Top View" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'100%\\' height=\\'100px\\' style=\\'background:%23333\\'%3E%3C/svg%3E'" />
          <div class="card-title">Top View</div>
        </div>
        <div class="gallery-card" onclick="window.pano && window.pano.openNext('{node2}'); document.querySelectorAll('#image-gallery-modal').forEach(m=>m.classList.remove('active'))">
          <img src="image/GALLERY 02.jpg" alt="Bird View" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'100%\\' height=\\'100px\\' style=\\'background:%23333\\'%3E%3C/svg%3E'" />
          <div class="card-title">Bird View</div>
        </div>
        <div class="gallery-card" onclick="window.pano && window.pano.openNext('{node3}'); document.querySelectorAll('#image-gallery-modal').forEach(m=>m.classList.remove('active'))">
          <img src="image/GALLERY 03.jpg" alt="Biệt Thự" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100%\' height=\'100px\' style=\'background:%23333\'%3E%3C/svg%3E'" />
          <div class="card-title">Biệt Thự Song Lập</div>
        </div>
      </div>
    </div>
  </div>

  
  <!-- 4. Contact Modal -->
  <div class="global-modal-overlay" id="contact-info-modal">
    <div class="global-modal-content">
      <div class="modal-header">
        <h2>Liên Hệ Chuyên Viên</h2>
        <div class="modal-close-btn" onclick="document.getElementById('contact-info-modal').classList.remove('active')">&times;</div>
      </div>
      <div class="modal-body" style="text-align: center; padding: 20px 0;">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 48px; height: 48px; margin-bottom: 16px; color: #00f2fe;">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
        </svg>
        <h3 style="margin-bottom: 8px;">Hotline Kinh Doanh</h3>
        <a href="tel:0776469999" style="display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #00f2fe, #4facfe); color: #fff; text-decoration: none; border-radius: 24px; font-weight: bold; font-size: 18px; box-shadow: 0 4px 15px rgba(0,242,254,0.3);">077 646 9999</a>
        <p style="margin-top: 16px; font-size: 13px; color: #aaa;">Hỗ trợ tư vấn 24/7</p>
      </div>
    </div>
  </div>

  <!-- 3. Social Share Floating Menu -->
  <div class="social-share-menu" id="social-share-menu">
    <a href="https://www.facebook.com/profile.php?id=100068490675716" target="_blank" class="social-btn facebook"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></a>
    <a href="https://www.instagram.com/tav.visualization?fbclid=IwY2xjawTGyFdleHRuA2FlbQIxMABicmlkETF6WFNQUG5pVHdyaTMzYXZzc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHnfmDGTf1jMMqXi9hVWtOqCfWiEucmX8Skbl4uXpKa6AEDbPpxaGRLa3qH4U_aem_aCheCes_KVmYiFV-DyesRw" target="_blank" class="social-btn instagram"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98C23.986 15.668 24 15.259 24 12c0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg></a>
    <a href="https://zalo.me/0776469999" target="_blank" class="social-btn zalo"><svg viewBox="0 0 40 40" fill="currentColor"><path d="M20 0C8.955 0 0 8.954 0 20c0 11.045 8.955 20 20 20s20-8.955 20-20C40 8.954 31.045 0 20 0zm9.09 28.182c-1.091 1.09-2.273 1.636-3.636 1.636-.727 0-1.454-.182-2.09-.455l-5.91 2.364.91-5.273c-1.636-1.454-2.637-3.545-2.637-5.818 0-4.364 3.546-7.909 7.91-7.909 4.363 0 7.909 3.545 7.909 7.909 0 2.909-1.546 5.454-4 6.909l1.544 .637z"/></svg></a>
  </div>
`;
})();
