/* modern_ui.js - Combined Dual-Layout switcher (Classic Bottom Nav & Futuristic Left Sidebar) */

(function () {
  console.log("Modern UI Script: Initializing dual-layout switching system...");

  window.TAV_SCENES = [
    { id: "node1", title: "TOP VIEW DAY 1", sub: "Aerial · Day", category: "TOP VIEW", thumb: "image/thumbnails/thumb_PIN TOP.jpg", action: "node1" },
    { id: "node2", title: "BIRD VIEW 1", sub: "Drone · 80m", category: "BIRD VIEW", thumb: "image/thumbnails/PIN BIRD.jpg", action: "node2" },
    { id: "node3", title: "BIRD VIEW 2", sub: "Aerial · Dusk", category: "BIRD VIEW", thumb: "image/thumbnails/PIN TOP NIGHT.jpg", action: "node3" },
    { id: "node4", title: "TAV PARK", sub: "Amenity", category: "AMENITIES", thumb: "image/thumbnails/PIN PARK.jpg", action: "node4" },
    { id: "node5", title: "TAV STREET", sub: "Amenity", category: "AMENITIES", thumb: "image/thumbnails/PIN STREET.jpg", action: "node5" },
    { id: "node6", title: "TAV PARK 2", sub: "Amenity", category: "AMENITIES", thumb: "image/thumbnails/PIN PARK 02.jpg", action: "node6" },
    { id: "architecture-1", title: "KIẾN TRÚC 1", sub: "Exterior", category: "ARCHITECTURE", thumb: "", color: "#10ffa0", action: "architecture-1" },
    { id: "architecture-2", title: "KIẾN TRÚC 2", sub: "Exterior", category: "ARCHITECTURE", thumb: "", color: "#10ffa0", action: "architecture-2" },
    { id: "architecture-3", title: "KIẾN TRÚC 3", sub: "Exterior", category: "ARCHITECTURE", thumb: "", color: "#10ffa0", action: "architecture-3" },
    { id: "node7", title: "TAV LIVING 2", sub: "Interior", category: "INTERIOR", thumb: "image/thumbnails/PIN LIVING 2.jpg", action: "node7" },
    { id: "node8", title: "TAV LIVING 1", sub: "Interior", category: "INTERIOR", thumb: "image/thumbnails/PIN LIVING.jpg", action: "node8" },
    { id: "node9", title: "TAV THÔNG TẦNG", sub: "Interior", category: "INTERIOR", thumb: "image/thumbnails/PIN THONG TANG.jpg", action: "node9" },
    { id: "node10", title: "BALCONY", sub: "Interior", category: "INTERIOR", thumb: "image/thumbnails/PIN BALCONY.jpg", action: "node10" },
    { id: "node11", title: "TAV WC", sub: "Interior", category: "INTERIOR", thumb: "image/thumbnails/PIN WC.jpg", action: "node11" }
  ];

  // 1. Shared SVG Gradients definitions to inject
  const gradientDefs = `
    <svg style="position: absolute; width: 0; height: 0; overflow: hidden;" aria-hidden="true">
      <defs>
        <linearGradient id="bio-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#00f2fe" />
          <stop offset="100%" stop-color="#ff007f" />
        </linearGradient>
        <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ffffff" />
          <stop offset="25%" stop-color="#fdf0c2" />
          <stop offset="60%" stop-color="#e5c058" />
          <stop offset="100%" stop-color="#a8831e" />
        </linearGradient>
        <linearGradient id="cyan-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#e0ffff" />
          <stop offset="100%" stop-color="#00f2fe" />
        </linearGradient>
      </defs>
    </svg>
  `;

  // 1.1 Layout Switcher Widget HTML Template (Vietnamese labels)
  
// ==========================================
// MASTER CONTENT CONFIGURATION
// ==========================================
const PROJECT_CONTENT = {
  projectTitle: { top: "TAV", sub: "V I L L A" },
  navItems: {
    topview: {
      label: "Top View",
      node: "node1"
    },
    birdview: {
      label: "Bird View",
      submenu: [
        { node: "node2", label: "Bird View 1" },
        { node: "node3", label: "Bird View 2" }
      ]
    },
    amenities: {
      label: "Tiện ích",
      submenu: [
        { node: "node4", label: "TAV Park" },
        { node: "node5", label: "TAV Street" },
        { node: "node6", label: "TAV Park 2" }
      ]
    },
    architecture: {
      label: "Kiến Trúc",
      submenu: [
        { action: "architecture-1", label: "Kiến Trúc 1" },
        { action: "architecture-2", label: "Kiến Trúc 2" },
        { action: "architecture-3", label: "Kiến Trúc 3" }
      ]
    },
    interior: {
      label: "Nội Thất",
      submenu: [
        { node: "node7", label: "TAV Living 2" },
        { node: "node8", label: "TAV Living 1" },
        { node: "node9", label: "TAV Thông Tầng" },
        { node: "node10", label: "TAV Balcony" },
        { node: "node11", label: "TAV WC" }
      ]
    },
    surrounding: {
      label: "Liên kết vùng",
      action: "region-page"
    }
  }
};

function generateSubmenuHTML(items, itemClass) {
  return items.map(item => {
    const attr = item.node ? `data-pano-node="${item.node}"` : `data-action="${item.action}"`;
    return `<div class="${itemClass}" ${attr}>${item.label}</div>`;
  }).join('');
}

  const layoutSwitcherHTML = `
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

  const cmdTopRibbonHTML = `
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
          <span id="cmd-scene-name">TOP VIEW DAY 1</span>
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
      </div>
    </div>
  `;

  const cmdSceneExplorerHTML = `
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

  const premiumCarouselHTML = `
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

      <button class="premium-carousel-all-views" id="pc-all-views" aria-label="All Views">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>
      </button>
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

  const cmdSpatialControlHTML = `
    <div class="cmd-spatial-control" id="cmd-spatial-control">
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
      <div class="cmd-ctrl-tile" data-action="fullscreen" title="To\u00e0n m\u00e0n h\u00ecnh">
        <div class="cmd-ctrl-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3"/></svg></div>
        <div class="cmd-ctrl-label">EXPAND</div>
        <div class="cmd-ctrl-glow"></div>
      </div>
      <div class="cmd-ctrl-tile" data-action="call" title="Li\u00ean h\u1ec7">
        <div class="cmd-ctrl-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.63a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .91h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 15.92z"/></svg></div>
        <div class="cmd-ctrl-label">CONTACT</div>
        <div class="cmd-ctrl-glow"></div>
      </div>
    </div>
  `;

  const cmdTimelineHTML = "";

  // ==========================================
  // OPTION 4: GRADIENT LAYOUT TEMPLATES
  // ==========================================

  const gradientTopTitleHTML = `
    <div class="layout-floating-logo gradient-floating-logo" style="position: absolute; top: 20px; left: 20px; z-index: 1000; display: flex; flex-direction: column; align-items: flex-start; pointer-events: none;">
      <div class="logo-script-top" style="font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 700; letter-spacing: 2px; color: #fff; text-shadow: 0 2px 10px rgba(255,255,255,0.5);">${PROJECT_CONTENT.projectTitle.top}</div>
      <div class="logo-script-wave" style="width: 40px; height: 2px; background: linear-gradient(90deg, #FF6B6B, #4ECDC4); margin: 5px 0; box-shadow: 0 1px 3px rgba(0,0,0,0.5);"></div>
      <div class="logo-script-sub" style="font-family: 'Montserrat', sans-serif; font-size: 11px; letter-spacing: 4px; color: rgba(255,255,255,0.8); text-transform: uppercase;">${PROJECT_CONTENT.projectTitle.sub}</div>
    </div>
`;

  const gradientQuickActionsHTML = `
    <div class="gradient-quick-actions">
      <div class="quick-action-btn" data-action="fullscreen">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
      </div>
    </div>
  `;

  const gradientRightNavHTML = `<div class="v-rail-container left-rail" id="gradient-left-rail">
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

  const gradientLeftToolbarHTML = `<div class="v-rail-container right-rail" id="gradient-right-rail">
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
            <a href="https://facebook.com" target="_blank" class="v-sub-item">Facebook</a>
            <a href="https://zalo.me" target="_blank" class="v-sub-item">Zalo</a>
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
  `;

  // ==========================================
  // OPTION A: CLASSIC LAYOUT TEMPLATES
  // ==========================================

  // Toolbar HTML - used by BOTH layouts (icon-only, tooltip on hover)
  const toolbarButtonsHTML = `
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
            <a href="https://www.facebook.com" target="_blank" class="social-link" data-social="facebook">
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              <span>Facebook</span>
            </a>
            <a href="https://www.instagram.com" target="_blank" class="social-link" data-social="instagram">
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98C23.986 15.668 24 15.259 24 12c0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              <span>Instagram</span>
            </a>
            <a href="https://zalo.me" target="_blank" class="social-link" data-social="zalo">
              <svg viewBox="0 0 40 40" fill="currentColor" width="16" height="16"><path d="M20 0C8.955 0 0 8.954 0 20c0 11.045 8.955 20 20 20s20-8.955 20-20C40 8.954 31.045 0 20 0zm9.09 28.182c-1.091 1.09-2.273 1.636-3.636 1.636-.727 0-1.454-.182-2.09-.455l-5.91 2.364.91-5.273c-1.636-1.454-2.637-3.545-2.637-5.818 0-4.364 3.546-7.909 7.91-7.909 4.363 0 7.909 3.545 7.909 7.909 0 2.909-1.546 5.454-4 6.909l1.544 .637z"/></svg>
              <span>Zalo</span>
            </a>
          </div>
        </div>
  `;

  // Quick Navigation Panel for Classic Layout
  const quickNavClassicHTML = `
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
                <div class="qn-name">Top view day 1</div>
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
  const verticalToolStackClassicHTML = `
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
  const bottomNavClassicHTML = `<div class="bottom-nav-container">
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
  const settingsToggleFuturisticHTML = `
    <div class="futuristic-settings-group" id="futuristic-settings-group">
      <div class="settings-toggle-btn" id="btn-settings-toggle" title="Cài đặt hệ thống">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="currentColor" stroke-width="2"/>
        </svg>
      </div>
      <div class="vertical-tool-stack" id="right-tool-stack">
        <div class="tool-buttons-sub-stack" id="tool-sub-stack">
          ${toolbarButtonsHTML}
        </div>
      </div>
    </div>
  `;

  const verticalToolStackFuturisticHTML = "";

  const sidebarNavFuturisticHTML = `<div class="sidebar-container" id="sidebar-container">
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

  const neoTopTitleHTML = `
    <div class="layout-floating-logo">
      <div class="logo-script-top">TAV</div>
      <div class="logo-script-wave"></div>
      <div class="logo-script-sub">V I L L A</div>
    </div>
  `;

  // The Unified Control Panel containing both Navigation and Toolbar
  const neoLeftNavHTML = `<div class="neo-unified-container collapsed" id="neo-unified-container">
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
            <a href="https://facebook.com" target="_blank" class="dock-share-btn facebook">Facebook</a>
            <a href="https://zalo.me" target="_blank" class="dock-share-btn zalo">Zalo</a>
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
  `;

  // Right quick panel has been removed from Neo layout to prevent duplication with the bottom dock
  const neoRightQuickPanelHTML = ``;

  // Bottom dock is merged into the unified container
  const neoBottomDockHTML = ``;

  // ==========================================
  // OPTION 5: AURORA LAYOUT TEMPLATES
  // ==========================================

  const auroraLeftNavHTML = `<div class="aurora-nav-container collapsed" id="aurora-nav-container">
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

  const auroraRightToolHTML = `<div class="aurora-tool-panel collapsed" id="aurora-tool-panel">
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
            <a href="https://facebook.com" target="_blank" class="aurora-share-btn facebook">Facebook</a>
            <a href="https://zalo.me" target="_blank" class="aurora-share-btn zalo">Zalo</a>
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
    </div>
  `;

  // Aurora Compass Widget
  const auroraCompassHTML = `
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

  const horizonBottomDockHTML = `<div class="horizon-nav-container" id="horizon-nav-container">
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

  const horizonRightToolHTML = `<div class="horizon-tool-panel" id="horizon-tool-panel">
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
          <a href="https://facebook.com" target="_blank" class="horizon-share-btn facebook">Facebook</a>
          <a href="https://zalo.me" target="_blank" class="horizon-share-btn zalo">Zalo</a>
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
  const horizonCompassHTML = `
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
  const prismNavHTML = `<div class="prism-nav-container" id="prism-nav-container">
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

  const prismRightToolHTML = `
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
    </div>
  `;

  const prismCompassHTML = `
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
  const nexusNavHTML = `<div class="nexus-nav-container" id="nexus-nav-container">
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

  const nexusRightToolHTML = `
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
    </div>
  `;

  const nexusCompassHTML = `
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
  const monarchNavHTML = `<div class="monarch-nav-container" id="monarch-nav-container">
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

  const monarchCommandPanelHTML = `
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
      </div>
    </div>
  `;

  const monarchLayoutSelectorHTML = ``;

  const monarchCompassHTML = `
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

  const monarchMinimapHTML = `
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

  const regalHeaderHTML = `
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

    const regalNavHTML = `
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

    const regalUtilityHTML = `
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

  const regalGalleryHTML = `
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

  const regalTimelineHTML = ``;

  const regalSwitcherHTML = `
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

  const regalMinimapHTML = `
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

  const regalCompassHTML = `
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
  const compassWidgetHTML = `
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
  const neoCompassHTML = `
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
    const musicBtn = document.querySelector('.rgl-neo-tool-btn[data-action="music"]');
    if (musicBtn && typeof isMusicMuted !== 'undefined') {
       musicBtn.classList.toggle("active", !isMusicMuted);
    }
    const hotspotsBtn = document.querySelector('.rgl-neo-tool-btn[data-action="hotspots"]');
    if (hotspotsBtn && typeof isHotspotsHidden !== 'undefined') {
       hotspotsBtn.classList.toggle("active", !isHotspotsHidden);
    }
  }, 100);

  const minimapWidgetHTML = `
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

  function updateSwitcherUI() {
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

    const globalFloatingLogoHTML = `
      <div class="layout-floating-logo global-floating-logo" style="position: absolute; top: 20px; left: 20px; z-index: 1000; display: flex; flex-direction: column; align-items: flex-start; pointer-events: none;">
        <div class="logo-script-top" style="font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 700; letter-spacing: 2px; color: #fff; text-shadow: 0 2px 10px rgba(0,0,0,0.5);">${PROJECT_CONTENT.projectTitle.top}</div>
        <div class="logo-script-wave" style="width: 40px; height: 2px; background: #fff; margin: 5px 0; box-shadow: 0 1px 3px rgba(0,0,0,0.5);"></div>
        <div class="logo-script-sub" style="font-family: 'Montserrat', sans-serif; font-size: 11px; letter-spacing: 4px; color: rgba(255,255,255,0.8); text-transform: uppercase; text-shadow: 0 1px 3px rgba(0,0,0,0.5);">${PROJECT_CONTENT.projectTitle.sub}</div>
      </div>
    `;

  function injectLayoutComponents(handleSwitch) {
    const uiWrapper = document.querySelector(".modern-ui-overlay");
    if (!uiWrapper) return;

    // Remove old layout nodes (everything except switcher pill and gradient defs)
    const children = Array.from(uiWrapper.children);
    children.forEach(child => {
      if (
        child.id !== "layout-switcher-wrapper" && 
        child.id !== "layout-switcher" && 
        !child.innerHTML.includes("<defs>") &&
        !child.classList.contains("global-modal-overlay") &&
        child.id !== "social-share-menu"
      ) {
        uiWrapper.removeChild(child);
      }
    });

    // Render nodes based on mode
    if (layoutMode === "classic") {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = quickNavClassicHTML + verticalToolStackClassicHTML + bottomNavClassicHTML;
      while (tempDiv.firstChild) {
        uiWrapper.appendChild(tempDiv.firstChild);
      }
      setupClassicListeners();
    } else if (layoutMode === "futuristic") {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = settingsToggleFuturisticHTML + verticalToolStackFuturisticHTML + sidebarNavFuturisticHTML;
      while (tempDiv.firstChild) {
        uiWrapper.appendChild(tempDiv.firstChild);
      }
      setupFuturisticListeners();
    } else if (layoutMode === "neo") {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = neoTopTitleHTML + neoLeftNavHTML + neoBottomDockHTML;
      while (tempDiv.firstChild) {
        uiWrapper.appendChild(tempDiv.firstChild);
      }
      setupNeoListeners();
    } else if (layoutMode === "gradient") {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = gradientTopTitleHTML + gradientRightNavHTML + gradientLeftToolbarHTML;
      while (tempDiv.firstChild) {
        uiWrapper.appendChild(tempDiv.firstChild);
      }
      setupGradientListeners();
    } else if (layoutMode === "aurora") {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = auroraLeftNavHTML + auroraRightToolHTML;
      while (tempDiv.firstChild) {
        uiWrapper.appendChild(tempDiv.firstChild);
      }
      setupAuroraListeners();
    } else if (layoutMode === "horizon") {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = globalFloatingLogoHTML + horizonBottomDockHTML + horizonRightToolHTML;
      while (tempDiv.firstChild) {
        uiWrapper.appendChild(tempDiv.firstChild);
      }
      setupHorizonListeners();
    } else if (layoutMode === "prism") {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = prismNavHTML + prismRightToolHTML;
      while (tempDiv.firstChild) {
        uiWrapper.appendChild(tempDiv.firstChild);
      }
      setupPrismListeners();
    } else if (layoutMode === "nexus") {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = globalFloatingLogoHTML + nexusNavHTML + nexusRightToolHTML;
      while (tempDiv.firstChild) {
        uiWrapper.appendChild(tempDiv.firstChild);
      }
      setupNexusListeners();
    } else if (layoutMode === "monarch") {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = globalFloatingLogoHTML + monarchNavHTML + monarchCommandPanelHTML + monarchLayoutSelectorHTML;
      while (tempDiv.firstChild) {
        uiWrapper.appendChild(tempDiv.firstChild);
      }
      setupMonarchListeners(handleSwitch);
    } else if (layoutMode === "regal") {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = regalHeaderHTML + regalNavHTML + regalUtilityHTML + regalGalleryHTML + regalSwitcherHTML;
      while (tempDiv.firstChild) {
        uiWrapper.appendChild(tempDiv.firstChild);
      }
      setupRegalListeners(handleSwitch);
    } else if (layoutMode === "command") {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = cmdTopRibbonHTML + cmdSceneExplorerHTML + cmdSpatialControlHTML + premiumCarouselHTML;
      while (tempDiv.firstChild) {
        uiWrapper.appendChild(tempDiv.firstChild);
      }
      setupCommandListeners();
    }

    // Inject Minimap
    const oldMinimap = document.getElementById("minimap-widget");
    if (oldMinimap) {
      oldMinimap.remove();
    }
    const mapDiv = document.createElement("div");
    if (layoutMode === "monarch") {
      mapDiv.innerHTML = monarchMinimapHTML;
    } else if (layoutMode === "regal") {
      mapDiv.innerHTML = regalMinimapHTML;
    } else {
      mapDiv.innerHTML = minimapWidgetHTML;
    }
    if(mapDiv.firstElementChild) document.body.appendChild(mapDiv.firstElementChild);
    setupMinimapListeners();
    if (window.initMinimapPano) window.initMinimapPano();
    let minimapEl = document.getElementById("minimap-widget");
    if (minimapEl && (layoutMode === "prism" || layoutMode === "nexus" || layoutMode === "monarch" || layoutMode === "regal")) {
      minimapEl.classList.remove("collapsed");
    }

    // Inject Compass (recreate to ensure correct template style)
    const oldCompass = document.getElementById("compass-widget");
    if (oldCompass) {
      oldCompass.remove();
    }
    const compassDiv = document.createElement("div");
    if (layoutMode === "neo") {
      compassDiv.innerHTML = neoCompassHTML;
    } else if (layoutMode === "aurora") {
      compassDiv.innerHTML = auroraCompassHTML;
    } else if (layoutMode === "horizon") {
      compassDiv.innerHTML = horizonCompassHTML;
    } else if (layoutMode === "prism") {
      compassDiv.innerHTML = prismCompassHTML;
    } else if (layoutMode === "nexus") {
      compassDiv.innerHTML = nexusCompassHTML;
    } else if (layoutMode === "monarch") {
      compassDiv.innerHTML = monarchCompassHTML;
    } else if (layoutMode === "regal") {
      compassDiv.innerHTML = regalCompassHTML;
    } else if (layoutMode === "command") {
      compassDiv.innerHTML = compassWidgetHTML; // reuse standard compass, styled via CSS
    } else {
      compassDiv.innerHTML = compassWidgetHTML;
    }
    if(compassDiv.firstElementChild) document.body.appendChild(compassDiv.firstElementChild);

    // Restore selected active highlights
    restoreActiveStates();

    // Trigger smooth expansion for primary panels on load
    setTimeout(function() {
      // Classic & Futuristic Toolbar
      var rightToolStack = document.getElementById("right-tool-stack");
      if (rightToolStack) {
        rightToolStack.classList.add("expanded");
        rightToolStack.classList.add("pinned");
      }

      // Futuristic Sidebar
      var sidebarContainer = document.getElementById("sidebar-container");
      if (sidebarContainer && !sidebarContainer.classList.contains("expanded")) {
        sidebarContainer.classList.add("expanded");
        if (typeof isSidebarExpanded !== 'undefined') isSidebarExpanded = true;
      }

      // Gradient
      var leftRail = document.getElementById("gradient-left-rail");
      if (leftRail && !leftRail.classList.contains("pinned")) leftRail.classList.add("pinned");
      var rightRail = document.getElementById("gradient-right-rail");
      if (rightRail && !rightRail.classList.contains("pinned")) rightRail.classList.add("pinned");

      // Neo
      var neoContainer = document.getElementById("neo-unified-container");
      if (neoContainer) {
        neoContainer.classList.remove("collapsed");
        neoContainer.classList.add("active", "pinned");
      }

      // Aurora
      var auroraNav = document.getElementById("aurora-nav-container");
      if (auroraNav && auroraNav.classList.contains("collapsed")) auroraNav.classList.remove("collapsed");
      var auroraTool = document.getElementById("aurora-tool-panel");
      if (auroraTool && auroraTool.classList.contains("collapsed")) auroraTool.classList.remove("collapsed");

      // Regal
      var regalNav = document.getElementById("blueprint-nav-container");
      if (regalNav && !regalNav.classList.contains("pinned")) regalNav.classList.add("pinned");

      // Command
      var cmdExplorer = document.getElementById("cmd-scene-explorer");
      if (cmdExplorer && cmdExplorer.classList.contains("collapsed")) cmdExplorer.classList.remove("collapsed");
    }, 50);
  }

  // Restore navigation and submenu highlight states on rebuild
  function restoreActiveStates() {
    // 1. Restore main nav highlights
    const navItems = document.querySelectorAll(".nav-item, .aurora-nav-item, .horizon-nav-item, .prism-nav-item, .nexus-nav-item, .monarch-nav-item");
    let activeNavItem = null;
    navItems.forEach(item => {
      if (item.getAttribute("data-id") === activeNavItemId) {
        item.classList.add("active");
        activeNavItem = item;
      } else {
        item.classList.remove("active");
      }
    });

    // 2. Restore submenu active highlight — use unique data-action only
    const subItems = document.querySelectorAll(".submenu-item, .mega-card, .aurora-submenu-item, .horizon-submenu-item, .prism-submenu-item, .nexus-submenu-item, .monarch-popover-item");
    subItems.forEach(sub => {
      const action = sub.getAttribute("data-action");
      if (action && action === activeSubmenuAction) {
        sub.classList.add("active");
      } else {
        sub.classList.remove("active");
      }
    });

    // 3. Slide nav glow element
    if (activeNavItem) {
      setTimeout(() => {
        updateActiveGlow(activeNavItem);
      }, 50);
    }
  }

  // Shared Submenu and Mega-card clicks handler
  function handleSubmenuSelection(element) {
    const panoNode = element.getAttribute("data-pano-node");
    const action = element.getAttribute("data-action");

    let titleText = element.textContent.trim();
    if (element.classList.contains("mega-card")) {
      const cardTitle = element.querySelector(".mega-card-title");
      if (cardTitle) titleText = cardTitle.textContent.trim();
    }

    if (panoNode && window.pano) {
      console.log(`Navigating to Pano Node: ${panoNode}`);
      window.pano.openNext(`{${panoNode}}`);
      showNotification(`Đang chuyển đến: ${titleText}`);
    } else if (action) {
      showNotification(`Đang tải: ${titleText}`);
      console.log(`Submenu Action Triggered: ${action}`);
    }
  }

  // Bind Listeners for OPTION A: CLASSIC
  // NOTE: document-level "click" is only registered once globally (see injectUI)
  function setupClassicListeners() {
    const settingsToggle = document.getElementById("btn-settings-toggle");
    const rightToolStack = document.getElementById("right-tool-stack");
    const navItems = document.querySelectorAll(".nav-item");

    if (settingsToggle && rightToolStack) {
      settingsToggle.addEventListener("click", function (e) {
        e.stopPropagation();
        rightToolStack.classList.toggle("expanded");
        if (rightToolStack.classList.contains("expanded")) {
          showNotification("Bảng điều khiển đã mở rộng");
        }
      });
    }

    const toolButtons = document.querySelectorAll(".tool-button:not([style*='display:none'])");
    toolButtons.forEach(btn => {
      btn.addEventListener("click", function (e) {
        if (this.classList.contains("has-dropdown")) {
          e.stopPropagation();
          const dropdown = this.querySelector(".social-dropdown");
          if (dropdown) dropdown.classList.toggle("open");
          return;
        }
        
        e.stopPropagation();
        dispatchToolAction(this);
      });
    });

    // Close social dropdown on outside click (delegated to document click in injectUI)

    navItems.forEach(item => {
      item.addEventListener("click", function (e) {
        if (e.target.closest(".nav-submenu")) return;
        e.stopPropagation();

        const isOpen = this.classList.contains("is-open");
        navItems.forEach(n => {
          if (n !== this) n.classList.remove("is-open");
        });

        this.classList.toggle("is-open", !isOpen);

        navItems.forEach(n => n.classList.remove("active"));
        this.classList.add("active");
        activeNavItemId = this.getAttribute("data-id");
        lsSet("latien_active_nav", activeNavItemId);
        updateActiveGlow(this);

        // Route parent navigation if no submenu, or if it is interior or surrounding
        const hasSubmenu = this.querySelector(".nav-submenu") !== null;
        const id = this.getAttribute("data-id");
        if (!hasSubmenu || id === "surrounding") {
          routeNavigation(this);
        }
      });
    });

    const subMenuItems = document.querySelectorAll(".submenu-item, .mega-card");
    subMenuItems.forEach(subItem => {
      subItem.addEventListener("click", function (e) {
        e.stopPropagation();
        const siblings = this.parentElement.querySelectorAll(".submenu-item, .mega-card");
        siblings.forEach(s => s.classList.remove("active"));
        this.classList.add("active");

        activeSubmenuAction = this.getAttribute("data-action");
        activePanoNode = this.getAttribute("data-pano-node") || activePanoNode;
        lsSet("latien_active_submenu", activeSubmenuAction);
        lsSet("latien_active_node", activePanoNode);

        const parentNavItem = this.closest(".nav-item");
        // Do not close parentNavItem automatically so it behaves like other menus
        // if (parentNavItem) {
        //   parentNavItem.classList.remove("is-open");
        // }

        routeNavigation(this);
      });
    });

    // Quick Navigation Panel Logic
    const qnToggle = document.getElementById("quick-nav-toggle");
    const qnPanel = document.getElementById("quick-nav-panel");
    const qnSearch = document.getElementById("quick-nav-search-input");
    const qnCatHeaders = document.querySelectorAll(".quick-nav-cat-header");
    const qnItems = document.querySelectorAll(".quick-nav-item");

    if (qnToggle && qnPanel) {
      qnToggle.addEventListener("click", function(e) {
        e.stopPropagation();
        qnPanel.classList.toggle("collapsed");
      });

      // Prevent closing when clicking inside panel
      qnPanel.addEventListener("click", function(e) {
        e.stopPropagation();
      });
    }

    if (qnCatHeaders.length > 0) {
      qnCatHeaders.forEach(header => {
        header.addEventListener("click", function() {
          if (this.classList.contains("expanded")) {
            this.classList.remove("expanded");
            this.nextElementSibling.style.display = "none";
          } else {
            this.classList.add("expanded");
            this.nextElementSibling.style.display = "block";
          }
        });
      });
    }

    if (qnItems.length > 0) {
      qnItems.forEach(item => {
        item.addEventListener("click", function() {
          const node = this.getAttribute("data-pano-node");
          const pan = this.getAttribute("data-pan");
          const tilt = this.getAttribute("data-tilt");

          if (node && window.pano) {
            const isSameNode = window.pano.getCurrentNode() === node;
            if (!isSameNode) {
              window.pano.openNext(`{${node}}`);
            }
            
            if (pan !== null && tilt !== null) {
              setTimeout(() => {
                window.pano.moveTo(parseFloat(pan), parseFloat(tilt), window.pano.getFov(), 20);
              }, isSameNode ? 0 : 500);
            }

            if (window.innerWidth <= 768) {
              qnPanel.classList.add("collapsed");
            }
          }
        });
      });
    }
  }

  // Bind Listeners for OPTION B: FUTURISTIC
  // NOTE: document-level "click" is only registered once globally (see injectUI)
  function setupFuturisticListeners() {
    const settingsToggle = document.getElementById("btn-settings-toggle");
    const rightToolStack = document.getElementById("right-tool-stack");
    const sidebarContainer = document.getElementById("sidebar-container");
    const sidebarToggle = document.getElementById("btn-sidebar-toggle");
    const navItems = document.querySelectorAll(".nav-item");

    if (settingsToggle && rightToolStack) {
      let hoverTimeout;
      
      settingsToggle.addEventListener("click", function (e) {
        e.stopPropagation();
        rightToolStack.classList.toggle("pinned");
        if (rightToolStack.classList.contains("pinned")) {
          rightToolStack.classList.add("expanded");
          showNotification("Bảng điều khiển đã mở rộng");
        } else {
          rightToolStack.classList.remove("expanded");
        }
      });

      const settingsGroup = document.getElementById("futuristic-settings-group");
      if (settingsGroup) {
        settingsGroup.addEventListener("mouseenter", () => {
          clearTimeout(hoverTimeout);
          rightToolStack.classList.add("expanded");
        });
        settingsGroup.addEventListener("mouseleave", () => {
          hoverTimeout = setTimeout(() => {
            if (!rightToolStack.classList.contains("pinned")) {
              rightToolStack.classList.remove("expanded");
            }
          }, 300);
        });
      }
    }

    if (sidebarToggle && sidebarContainer) {
      // Sync visually to internal expanded states
      if (isSidebarExpanded) {
        sidebarContainer.classList.add("expanded");
        const pathEl = sidebarToggle.querySelector("path");
        if (pathEl) pathEl.setAttribute("d", "M15 19l-7-7 7-7");
      } else {
        sidebarContainer.classList.remove("expanded");
        const pathEl = sidebarToggle.querySelector("path");
        if (pathEl) pathEl.setAttribute("d", "M9 5l7 7-7 7");
      }

      sidebarToggle.addEventListener("click", function (e) {
        e.stopPropagation();
        sidebarContainer.classList.toggle("expanded");
        const isExpanded = sidebarContainer.classList.contains("expanded");
        isSidebarExpanded = isExpanded;
        const pathEl = sidebarToggle.querySelector("path");
        if (pathEl) pathEl.setAttribute("d", isExpanded ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7");
        showNotification(isExpanded ? "Đã mở rộng thanh điều hướng" : "Đã thu gọn thanh điều hướng");

        if (!isExpanded) {
          navItems.forEach(n => n.classList.remove("is-open"));
          sidebarContainer.classList.remove("submenu-open");
          sidebarContainer.classList.remove("mega-open");
        } else {
          const activeItem = document.querySelector(".nav-item.active");
          if (activeItem) updateActiveGlow(activeItem);
        }
      });
    }

    const toolButtons = document.querySelectorAll(".tool-button:not([style*='display:none'])");
    toolButtons.forEach(btn => {
      btn.addEventListener("click", function (e) {
        if (this.classList.contains("has-dropdown")) {
          e.stopPropagation();
          const dropdown = this.querySelector(".social-dropdown");
          if (dropdown) dropdown.classList.toggle("open");
          return;
        }
        e.stopPropagation();
        dispatchToolAction(this);
      });
    });

    navItems.forEach(item => {
      item.addEventListener("click", function (e) {
        if (e.target.closest(".nav-submenu")) return;
        e.stopPropagation();

        if (sidebarContainer && !sidebarContainer.classList.contains("expanded")) {
          sidebarContainer.classList.add("expanded");
          isSidebarExpanded = true;
          const pathEl = sidebarToggle ? sidebarToggle.querySelector("path") : null;
          if (pathEl) pathEl.setAttribute("d", "M15 19l-7-7 7-7");
        }

        const isOpen = this.classList.contains("is-open");
        navItems.forEach(n => {
          if (n !== this) n.classList.remove("is-open");
        });

        this.classList.toggle("is-open", !isOpen);

        const anyOpen = Array.from(navItems).some(n => n.classList.contains("is-open"));
        if (sidebarContainer) sidebarContainer.classList.toggle("submenu-open", anyOpen);

        const isMegaOpen = Array.from(navItems).some(n => n.classList.contains("is-open") && n.classList.contains("center-logo-node"));
        if (sidebarContainer) sidebarContainer.classList.toggle("mega-open", isMegaOpen);

        navItems.forEach(n => n.classList.remove("active"));
        this.classList.add("active");
        activeNavItemId = this.getAttribute("data-id");
        lsSet("latien_active_nav", activeNavItemId);
        updateActiveGlow(this);

        // Route parent navigation if no submenu, or if it is interior or surrounding
        const hasSubmenu = this.querySelector(".nav-submenu") !== null;
        const id = this.getAttribute("data-id");
        if (!hasSubmenu || id === "surrounding") {
          routeNavigation(this);
        }
      });
    });

    const subMenuItems = document.querySelectorAll(".submenu-item, .mega-card");
    subMenuItems.forEach(subItem => {
      subItem.addEventListener("click", function (e) {
        e.stopPropagation();
        const siblings = this.parentElement.querySelectorAll(".submenu-item, .mega-card");
        siblings.forEach(s => s.classList.remove("active"));
        this.classList.add("active");

        activeSubmenuAction = this.getAttribute("data-action");
        activePanoNode = this.getAttribute("data-pano-node") || activePanoNode;
        lsSet("latien_active_submenu", activeSubmenuAction);
        lsSet("latien_active_node", activePanoNode);

        const parentNavItem = this.closest(".nav-item");
        if (parentNavItem) {
          // parentNavItem.classList.remove("is-open");
          if (sidebarContainer) {
            // sidebarContainer.classList.remove("submenu-open");
            // sidebarContainer.classList.remove("mega-open");
          }
        }

        routeNavigation(this);
      });
    });
  }

  function setupGradientListeners() {
    const rails = document.querySelectorAll('.layout-gradient .v-rail-container');
    
    rails.forEach(rail => {
      let hoverTimeout;
      // Hover logic
      rail.addEventListener('mouseenter', () => {
        clearTimeout(hoverTimeout);
        rail.classList.add('hover-expanded');
      });
      rail.addEventListener('mouseleave', () => {
        hoverTimeout = setTimeout(() => {
          rail.classList.remove('hover-expanded');
        }, 200); // Đủ thời gian để di chuột sang submenu
      });
      
      // Trigger pinning
      const trigger = rail.querySelector('.v-rail-trigger');
      if (trigger) {
        trigger.addEventListener('click', (e) => {
          e.stopPropagation();
          rail.classList.toggle('pinned');
        });
      }
    });

    const iconWrappers = document.querySelectorAll('.layout-gradient .vision-icon-wrapper');
    
    iconWrappers.forEach(wrapper => {
      let submenuTimeout;
      // Hover logic for submenus
      wrapper.addEventListener('mouseenter', () => {
        clearTimeout(submenuTimeout);
        if (!wrapper.classList.contains('pinned')) wrapper.classList.add('hover-open');
      });
      wrapper.addEventListener('mouseleave', () => {
        submenuTimeout = setTimeout(() => {
          wrapper.classList.remove('hover-open');
        }, 200); // Đủ thời gian để di chuột sang submenu
      });
      
      // Click logic (for opening submenus or just clicking a tool)
      wrapper.addEventListener('click', (e) => {
        // If clicking a v-sub-item inside submenu → handle navigation
        const subItem = e.target.closest('.v-sub-item');
        if (subItem) {
          e.stopPropagation();
          // Active state
          const siblings = subItem.parentElement.querySelectorAll('.v-sub-item');
          siblings.forEach(s => s.classList.remove('active'));
          subItem.classList.add('active');
          // Navigate
          routeNavigation(subItem);
          // Close rail submenu after selection
          iconWrappers.forEach(n => n.classList.remove('pinned', 'hover-open'));
          return;
        }
        
        const hasSubmenu = wrapper.querySelector('.vision-submenu') !== null;
        const id = wrapper.getAttribute("data-id");
        
        if (hasSubmenu && id !== "interior") {
            const isPinned = wrapper.classList.contains('pinned');
            // Close all others
            iconWrappers.forEach(n => n.classList.remove('pinned', 'hover-open'));
            if (!isPinned) wrapper.classList.add('pinned');
        } else {
            // It has no submenu, or it is interior (where clicking parent triggers Interior page)
            iconWrappers.forEach(n => n.classList.remove('pinned', 'hover-open'));
            const action = wrapper.getAttribute("data-action");
            if (action && ["music", "hotspots", "info", "fullscreen", "call", "images", "share", "facebook", "instagram", "zalo"].includes(action)) {
              dispatchToolAction(wrapper);
            } else {
              routeNavigation(wrapper);
            }
        }
      });
    });

    // Click outside closes everything
    
// Global function so iframes can tell parent to navigate
window.openPanoramaFromIframe = function(nodeId) {
  if (window.pano) {
    window.pano.openNext('{' + nodeId + '}');
  }
  // Close the gallery modal
  document.body.classList.remove("topview-page-active");
  document.body.classList.remove("interior-page-active");
};

document.addEventListener('click', (e) => {
      if (!e.target.closest('.layout-gradient .vision-icon-wrapper')) {
        iconWrappers.forEach(n => n.classList.remove('pinned'));
      }
      if (!e.target.closest('.layout-gradient .v-rail-container')) {
        rails.forEach(rail => rail.classList.remove('pinned'));
      }
    });
  }

  function setupNeoListeners() {
    // Unified Control Button Logic
    const unifiedContainer = document.getElementById('neo-unified-container');
    const unifiedTrigger = document.getElementById('neo-unified-trigger');
    const navCards = document.querySelectorAll(".layout-neo .neo-nav-card");
    const itemGroups = document.querySelectorAll(".layout-neo .neo-nav-item-group");

    function closeAllSubmenus() {
      itemGroups.forEach(g => g.classList.remove("open"));
      navCards.forEach(c => {
        if (!c.classList.contains("pinned")) c.classList.remove("active");
      });
    }

    if (unifiedContainer && unifiedTrigger) {
      unifiedContainer.addEventListener('mouseenter', () => {
        if (!unifiedContainer.classList.contains('pinned')) {
          unifiedContainer.classList.remove('collapsed');
          unifiedContainer.classList.add('active');
        }
      });
      
      unifiedContainer.addEventListener('mouseleave', () => {
        if (!unifiedContainer.classList.contains('pinned')) {
          unifiedContainer.classList.add('collapsed');
          unifiedContainer.classList.remove('active');
          closeAllSubmenus();
        }
      });
      
      unifiedTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const isPinned = unifiedContainer.classList.contains('pinned');
        if (isPinned) {
          unifiedContainer.classList.remove('pinned', 'active');
          unifiedContainer.classList.add('collapsed');
          closeAllSubmenus();
          navCards.forEach(c => { c.classList.remove("pinned"); });
        } else {
          unifiedContainer.classList.add('pinned', 'active');
          unifiedContainer.classList.remove('collapsed');
        }
      });

      document.addEventListener('click', (e) => {
        if (!e.target.closest('#neo-unified-container')) {
          unifiedContainer.classList.remove('pinned', 'active');
          unifiedContainer.classList.add('collapsed');
          closeAllSubmenus();
          navCards.forEach(c => { c.classList.remove("pinned", "active"); });
        }
      });
    }

    navCards.forEach(card => {
      const group = card.closest('.neo-nav-item-group');

      card.addEventListener("mouseenter", () => {
        if (card.classList.contains("pinned")) return;
        
        // If there's a pinned card in the layout, don't auto-open others on hover
        const hasPinned = document.querySelector(".layout-neo .neo-nav-card.pinned");
        if (hasPinned) return;

        closeAllSubmenus();
        card.classList.add("active");
        if (group) group.classList.add("open");
      });

      card.addEventListener("mouseleave", () => {
        const hasPinned = document.querySelector(".layout-neo .neo-nav-card.pinned");
        if (!card.classList.contains("pinned") && !hasPinned) {
          card.classList.remove("active");
          if (group) group.classList.remove("open");
        }
      });

      card.addEventListener("click", (e) => {
        e.stopPropagation();
        const isPinnedCard = card.classList.contains("pinned");
        
        // Remove pinned class from other nav cards
        navCards.forEach(c => { if (c !== card) c.classList.remove("pinned"); });
        closeAllSubmenus();
        
        if (!isPinnedCard) {
          card.classList.add("pinned", "active");
          if (group) group.classList.add("open");
        } else {
          card.classList.remove("pinned", "active");
        }

        // Direct navigation if no submenu, or if it is interior or surrounding
        const hasSubmenu = group && group.querySelector(".neo-submenu-tree") !== null;
        const id = card.getAttribute("data-id");
        if (!hasSubmenu || id === "surrounding") {
          routeNavigation(card);
        }
      });
    });

    // Static sub-menu item selection logic
    const subItems = document.querySelectorAll(".layout-neo .submenu-item, .layout-neo .mega-card");
    subItems.forEach(item => {
      item.addEventListener("click", function (e2) {
        e2.stopPropagation();
        
        const submenuTree = this.closest('.neo-submenu-tree');
        if (submenuTree) {
          const siblings = submenuTree.querySelectorAll(".submenu-item, .mega-card");
          siblings.forEach(s => s.classList.remove("active"));
        }
        
        this.classList.add("active");
        
        // Close menu/submenus if not pinned
        if (unifiedContainer && !unifiedContainer.classList.contains("pinned")) {
          unifiedContainer.classList.remove("active", "pinned");
          unifiedContainer.classList.add("collapsed");
        }
        closeAllSubmenus();
        
        routeNavigation(this);
      });
    });

    const allTools = document.querySelectorAll(".neo-quick-btn, .neo-dock-item");
    allTools.forEach(btn => {
      if (btn.classList.contains("has-children")) {
        btn.addEventListener("mouseenter", () => {
          if (!btn.classList.contains("pinned")) btn.classList.add("hover-open");
        });
        btn.addEventListener("mouseleave", () => {
          btn.classList.remove("hover-open");
        });
        btn.addEventListener("click", (e) => {
          if (e.target.closest('.neo-dock-submenu')) return; // ignore clicks inside submenu
          e.stopPropagation();
          const isPinnedTool = btn.classList.contains("pinned");
          allTools.forEach(t => t.classList.remove("pinned", "hover-open"));
          if (!isPinnedTool) btn.classList.add("pinned");
        });
      } else {
        btn.addEventListener("click", function(e) {
          e.stopPropagation();
          if (typeof dispatchToolAction === "function") dispatchToolAction(this);
        });
      }
    });

    document.addEventListener("click", (e) => {
      if (!e.target.closest(".neo-dock-item")) {
        allTools.forEach(t => t.classList.remove("pinned"));
      }
    });
  }

  function setupAuroraListeners() {
    const navContainer = document.getElementById("aurora-nav-container");
    const navPinBtn = document.getElementById("aurora-nav-pin-btn");
    const navItems = document.querySelectorAll(".layout-aurora .aurora-nav-item");
    const submenuItems = document.querySelectorAll(".layout-aurora .aurora-submenu-item");
    
    if (navContainer) {
      navContainer.addEventListener("mouseenter", () => {
        navContainer.classList.remove("collapsed");
        navContainer.classList.add("expanded");
      });
      navContainer.addEventListener("mouseleave", () => {
        if (!navContainer.classList.contains("pinned")) {
          navContainer.classList.add("collapsed");
          navContainer.classList.remove("expanded");
          
          // Close all submenus on collapse
          const submenus = navContainer.querySelectorAll(".aurora-submenu.open");
          submenus.forEach(s => s.classList.remove("open"));
          const chevrons = navContainer.querySelectorAll(".aurora-chevron.rotate");
          chevrons.forEach(c => c.classList.remove("rotate"));
        }
      });
      
      // Expand on click as well
      navContainer.addEventListener("click", (e) => {
        if (navContainer.classList.contains("collapsed")) {
          e.stopPropagation();
          navContainer.classList.remove("collapsed");
          navContainer.classList.add("expanded");
        }
      });

      // Pin/unpin click
      if (navPinBtn) {
        navPinBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          const isPinned = navContainer.classList.contains("pinned");
          navContainer.classList.toggle("pinned", !isPinned);
          navPinBtn.classList.toggle("active", !isPinned);
          if (!isPinned) {
            showNotification("Đã ghim thanh điều hướng");
          } else {
            showNotification("Đã bỏ ghim thanh điều hướng");
          }
        });
      }
    }
    
    // Bind main nav item clicks
    navItems.forEach(item => {
      item.addEventListener("click", function(e) {
        e.stopPropagation();
        
        const parentWrapper = this.closest(".aurora-nav-item-wrapper");
        const hasChildren = parentWrapper && parentWrapper.classList.contains("has-children");
        
        if (hasChildren) {
          const submenu = parentWrapper.querySelector(".aurora-submenu");
          const chevron = this.querySelector(".aurora-chevron");
          if (submenu) {
            const isOpen = submenu.classList.contains("open");
            // Close other submenus first
            const openSubmenus = document.querySelectorAll(".layout-aurora .aurora-submenu.open");
            openSubmenus.forEach(s => {
              if (s !== submenu) s.classList.remove("open");
            });
            const rotatedChevrons = document.querySelectorAll(".layout-aurora .aurora-chevron.rotate");
            rotatedChevrons.forEach(c => {
              if (c !== chevron) c.classList.remove("rotate");
            });
            
            submenu.classList.toggle("open", !isOpen);
            if (chevron) chevron.classList.toggle("rotate", !isOpen);
          }
          return;
        }
        
        // If no children, select item and route navigation
        navItems.forEach(n => n.classList.remove("active"));
        submenuItems.forEach(s => s.classList.remove("active"));
        this.classList.add("active");
        
        activeNavItemId = parentWrapper.getAttribute("data-id");
        lsSet("latien_active_nav", activeNavItemId);
        
        routeNavigation(this);
      });
    });
    
    // Bind submenu item clicks
    submenuItems.forEach(subItem => {
      subItem.addEventListener("click", function(e) {
        e.stopPropagation();
        
        submenuItems.forEach(s => s.classList.remove("active"));
        this.classList.add("active");
        
        // Also highlight parent nav item
        const parentWrapper = this.closest(".aurora-nav-item-wrapper");
        if (parentWrapper) {
          const parentItem = parentWrapper.querySelector(".aurora-nav-item");
          if (parentItem) {
            navItems.forEach(n => n.classList.remove("active"));
            parentItem.classList.add("active");
          }
          activeNavItemId = parentWrapper.getAttribute("data-id");
          lsSet("latien_active_nav", activeNavItemId);
        }
        
        activeSubmenuAction = this.getAttribute("data-action");
        activePanoNode = this.getAttribute("data-pano-node") || activePanoNode;
        lsSet("latien_active_submenu", activeSubmenuAction);
        lsSet("latien_active_node", activePanoNode);
        
        routeNavigation(this);
      });
    });
    
    // TOOL PANEL listeners (right side)
    const toolPanel = document.getElementById("aurora-tool-panel");
    const pinBtn = document.getElementById("aurora-tool-pin-btn");
    const toolItems = document.querySelectorAll(".layout-aurora .aurora-tool-item");
    
    if (toolPanel) {
      // Expand on hover
      toolPanel.addEventListener("mouseenter", () => {
        toolPanel.classList.add("expanded");
      });
      toolPanel.addEventListener("mouseleave", () => {
        if (!toolPanel.classList.contains("pinned")) {
          toolPanel.classList.remove("expanded");
          // Close tool submenus
          const openSubmenus = toolPanel.querySelectorAll(".aurora-tool-submenu.open");
          openSubmenus.forEach(s => s.classList.remove("open"));
        }
      });
      
      // Pin/unpin click
      if (pinBtn) {
        pinBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          const isPinned = toolPanel.classList.contains("pinned");
          toolPanel.classList.toggle("pinned", !isPinned);
          pinBtn.classList.toggle("active", !isPinned);
          if (!isPinned) {
            showNotification("Đã ghim bảng công cụ");
          } else {
            showNotification("Đã bỏ ghim bảng công cụ");
          }
        });
      }
    }
    
    // Bind tool buttons click
    toolItems.forEach(btn => {
      btn.addEventListener("click", function(e) {
        const hasSub = this.classList.contains("has-submenu");
        if (hasSub) {
          e.stopPropagation();
          const submenu = this.querySelector(".aurora-tool-submenu");
          if (submenu) {
            const isOpen = submenu.classList.contains("open");
            // Close other tool submenus
            const openSubmenus = document.querySelectorAll(".layout-aurora .aurora-tool-submenu.open");
            openSubmenus.forEach(s => {
              if (s !== submenu) s.classList.remove("open");
            });
            submenu.classList.toggle("open", !isOpen);
          }
          return;
        }
        
        e.stopPropagation();
        dispatchToolAction(btn);
      });
    });
  }

  function setupHorizonListeners() {
    const navItems = document.querySelectorAll(".layout-horizon .horizon-nav-item");
    const submenuItems = document.querySelectorAll(".layout-horizon .horizon-submenu-item");
    const toolItems = document.querySelectorAll(".layout-horizon .horizon-tool-item");

    // Bind main nav items
    navItems.forEach(item => {
      item.addEventListener("click", function(e) {
        e.stopPropagation();

        const parentWrapper = this.closest(".horizon-nav-item-wrapper");
        const hasChildren = parentWrapper && parentWrapper.classList.contains("has-submenu");

        if (hasChildren) {
          const submenu = parentWrapper.querySelector(".horizon-submenu");
          if (submenu) {
            const isOpen = submenu.classList.contains("open");
            // Close other submenus first
            const openSubmenus = document.querySelectorAll(".layout-horizon .horizon-submenu.open");
            openSubmenus.forEach(s => { if (s !== submenu) s.classList.remove("open"); });
            submenu.classList.toggle("open", !isOpen);
          }
          return;
        }

        // If no children, select item and route navigation
        navItems.forEach(n => n.classList.remove("active"));
        submenuItems.forEach(s => s.classList.remove("active"));
        this.classList.add("active");

        activeNavItemId = parentWrapper.getAttribute("data-id");
        lsSet("latien_active_nav", activeNavItemId);

        routeNavigation(this);
      });
    });

    // Bind submenu item clicks
    submenuItems.forEach(subItem => {
      subItem.addEventListener("click", function(e) {
        e.stopPropagation();

        submenuItems.forEach(s => s.classList.remove("active"));
        this.classList.add("active");

        // Also highlight parent nav item
        const parentWrapper = this.closest(".horizon-nav-item-wrapper");
        if (parentWrapper) {
          const parentItem = parentWrapper.querySelector(".horizon-nav-item");
          if (parentItem) {
            navItems.forEach(n => n.classList.remove("active"));
            parentItem.classList.add("active");
          }
          activeNavItemId = parentWrapper.getAttribute("data-id");
          lsSet("latien_active_nav", activeNavItemId);
          
          // Close submenu
          const submenu = parentWrapper.querySelector(".horizon-submenu");
          if (submenu) submenu.classList.remove("open");
        }

        activeSubmenuAction = this.getAttribute("data-action");
        activePanoNode = this.getAttribute("data-pano-node") || activePanoNode;
        lsSet("latien_active_submenu", activeSubmenuAction);
        lsSet("latien_active_node", activePanoNode);

        routeNavigation(this);
      });
    });

    // Tool panel hover / toggle submenu
    toolItems.forEach(btn => {
      const hasSub = btn.classList.contains("has-submenu");
      if (hasSub) {
        btn.addEventListener("mouseenter", () => {
          const submenu = btn.querySelector(".horizon-tool-submenu");
          if (submenu) submenu.classList.add("open");
        });
        btn.addEventListener("mouseleave", () => {
          const submenu = btn.querySelector(".horizon-tool-submenu");
          if (submenu && !submenu.classList.contains("pinned")) {
            submenu.classList.remove("open");
          }
        });
        
        btn.addEventListener("click", function(e) {
          if (e.target.closest('.horizon-tool-submenu')) return; // ignore clicks inside submenu
          e.stopPropagation();
          const submenu = this.querySelector(".horizon-tool-submenu");
          if (submenu) {
            const isPinned = submenu.classList.contains("pinned");
            // Close other tool submenus
            const allToolSubs = document.querySelectorAll(".layout-horizon .horizon-tool-submenu");
            allToolSubs.forEach(s => {
              if (s !== submenu) {
                s.classList.remove("pinned");
                s.classList.remove("open");
              }
            });

            if (isPinned) {
              submenu.classList.remove("pinned");
              submenu.classList.remove("open");
            } else {
              submenu.classList.add("pinned");
              submenu.classList.add("open");
            }
          }
        });
      } else {
        btn.addEventListener("click", function(e) {
          e.stopPropagation();
          dispatchToolAction(btn); // Use parameter btn (not 'this' to be consistent and clean)
        });
      }
    });

    // Close open menus when clicking outside
    document.addEventListener("click", () => {
      const openSubmenus = document.querySelectorAll(".layout-horizon .horizon-submenu.open, .layout-horizon .horizon-tool-submenu.open");
      openSubmenus.forEach(s => {
        s.classList.remove("open");
        s.classList.remove("pinned");
      });
    });
  }



  // ==========================================
  // PRISM LAYOUT LISTENERS
  // ==========================================
  function setupPrismListeners() {
    const navItems     = document.querySelectorAll(".layout-prism .prism-nav-item");
    const submenuItems = document.querySelectorAll(".layout-prism .prism-submenu-item");
    const toolItems    = document.querySelectorAll(".layout-prism .prism-tool-item");

    // 1. Navigation items — toggle submenu or navigate
    navItems.forEach(item => {
      item.addEventListener("click", function(e) {
        if (this.classList.contains("has-submenu")) {
          e.stopPropagation();
          const wasOpen = this.classList.contains("open");
          navItems.forEach(n => n.classList.remove("open"));
          if (!wasOpen) this.classList.add("open");
          return;
        }
        navItems.forEach(n => n.classList.remove("active", "open"));
        submenuItems.forEach(s => s.classList.remove("active"));
        this.classList.add("active");
        activeNavItemId = this.getAttribute("data-id");
        lsSet("latien_active_nav", activeNavItemId);
        routeNavigation(this);
      });
    });

    // 2. Submenu item clicks
    submenuItems.forEach(sub => {
      sub.addEventListener("click", function(e) {
        e.stopPropagation();
        submenuItems.forEach(s => s.classList.remove("active"));
        this.classList.add("active");
        const parentNav = this.closest(".prism-nav-item");
        if (parentNav) {
          navItems.forEach(n => n.classList.remove("active", "open"));
          parentNav.classList.add("active");
          activeNavItemId = parentNav.getAttribute("data-id");
          lsSet("latien_active_nav", activeNavItemId);
        }
        activeSubmenuAction = this.getAttribute("data-action");
        activePanoNode      = this.getAttribute("data-pano-node") || activePanoNode;
        lsSet("latien_active_submenu", activeSubmenuAction);
        lsSet("latien_active_node",    activePanoNode);
        routeNavigation(this);
      });
    });

    // 3. Right Toolbar — click toggles global action; second click on same item unpins
    toolItems.forEach(tool => {
      tool.addEventListener("click", function(e) {
        e.stopPropagation();
        const isPinned = this.classList.contains("pinned");
        toolItems.forEach(t => t.classList.remove("pinned"));
        if (!isPinned) this.classList.add("pinned");
        dispatchToolAction(this);
      });
    });

    // 4. Outside click — close nav dropdowns and unpin toolbar
    document.addEventListener("click", function(e) {
      if (!e.target.closest(".prism-nav-item")) {
        navItems.forEach(n => n.classList.remove("open"));
      }
      if (!e.target.closest(".prism-tool-item")) {
        toolItems.forEach(t => t.classList.remove("pinned"));
      }
    });
  }

  // ==========================================
  // NEXUS LAYOUT LISTENERS
  // ==========================================
  function setupNexusListeners() {
    const navItems     = document.querySelectorAll(".layout-nexus .nexus-nav-item");
    const submenuItems = document.querySelectorAll(".layout-nexus .nexus-submenu-item");
    const toolItems    = document.querySelectorAll(".layout-nexus .nexus-tool-item");

    // 1. Navigation items — toggle submenu or navigate
    navItems.forEach(item => {
      item.addEventListener("click", function(e) {
        if (this.classList.contains("has-submenu")) {
          e.stopPropagation();
          const wasOpen = this.classList.contains("open");
          navItems.forEach(n => n.classList.remove("open"));
          if (!wasOpen) this.classList.add("open");
          return;
        }
        navItems.forEach(n => n.classList.remove("active", "open"));
        submenuItems.forEach(s => s.classList.remove("active"));
        this.classList.add("active");
        activeNavItemId = this.getAttribute("data-id");
        lsSet("latien_active_nav", activeNavItemId);
        routeNavigation(this);
      });
    });

    // 2. Submenu item clicks
    submenuItems.forEach(sub => {
      sub.addEventListener("click", function(e) {
        e.stopPropagation();
        submenuItems.forEach(s => s.classList.remove("active"));
        this.classList.add("active");
        const parentNav = this.closest(".nexus-nav-item");
        if (parentNav) {
          navItems.forEach(n => n.classList.remove("active", "open"));
          parentNav.classList.add("active");
          activeNavItemId = parentNav.getAttribute("data-id");
          lsSet("latien_active_nav", activeNavItemId);
        }
        activeSubmenuAction = this.getAttribute("data-action");
        activePanoNode      = this.getAttribute("data-pano-node") || activePanoNode;
        lsSet("latien_active_submenu", activeSubmenuAction);
        lsSet("latien_active_node",    activePanoNode);
        routeNavigation(this);
      });
    });

    // 3. Right Toolbar — click toggles global action; second click on same item unpins
    toolItems.forEach(tool => {
      tool.addEventListener("click", function(e) {
        e.stopPropagation();
        const isPinned = this.classList.contains("pinned");
        toolItems.forEach(t => t.classList.remove("pinned"));
        if (!isPinned) this.classList.add("pinned");
        dispatchToolAction(this);
      });
    });

    // 4. Outside click — close nav dropdowns and unpin toolbar
    document.addEventListener("click", function(e) {
      if (!e.target.closest(".nexus-nav-item")) {
        navItems.forEach(n => n.classList.remove("open"));
      }
      if (!e.target.closest(".nexus-tool-item")) {
        toolItems.forEach(t => t.classList.remove("pinned"));
      }
    });
  }

  // ==========================================
  // COMMAND LAYOUT LISTENERS (#11)
  // ==========================================
  function setupCommandListeners() {

    // ── 1. Explorer panel collapse/expand ─────────────────────────────────
    const explorerPanel = document.getElementById('cmd-scene-explorer');
    const panelHeader = explorerPanel ? explorerPanel.querySelector('.cmd-panel-header') : null;
    const sceneBtn = document.getElementById('cmd-scene-btn');
    
    if (explorerPanel) {
      if (panelHeader) {
        // Toggle on header click
        panelHeader.addEventListener('click', (e) => {
          e.stopPropagation();
          explorerPanel.classList.toggle('collapsed');
        });
      }

      if (sceneBtn) {
        // Toggle on button click
        sceneBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          explorerPanel.classList.toggle('collapsed');
        });
      }

      // Close when clicking outside the panel
      document.addEventListener('click', (e) => {
        if (layoutMode === 'command' && !explorerPanel.classList.contains('collapsed')) {
          if (!explorerPanel.contains(e.target) && (!sceneBtn || !sceneBtn.contains(e.target))) {
            explorerPanel.classList.add('collapsed');
          }
        }
      });
      
      // Prevent clicks inside the panel from closing it
      explorerPanel.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    }

    const explorerList = document.getElementById('cmd-explorer-list');
    if (explorerList && window.TAV_SCENES) {
      const categories = {};
      window.TAV_SCENES.forEach(s => {
        const cat = s.category || "OTHER";
        if (!categories[cat]) categories[cat] = [];
        categories[cat].push(s);
      });

      let html = '';
      
      const iconClasses = {
        "TOP VIEW": "cmd-cat-aerial",
        "BIRD VIEW": "cmd-cat-bird",
        "AMENITIES": "cmd-cat-amenities",
        "ARCHITECTURE": "cmd-cat-amenities",
        "INTERIOR": "cmd-cat-interior"
      };

      for (const catName in categories) {
        const iconClass = iconClasses[catName] || "cmd-cat-aerial";
        
        html += `
          <div class="cmd-category">
            <div class="cmd-cat-header">
              <div class="cmd-cat-icon ${iconClass}">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
              </div>
              <span>${catName}</span>
              <svg class="cmd-cat-arrow" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
            </div>
            <div class="cmd-cat-items">
        `;
        categories[catName].forEach(s => {
          let isRoute = s.action && s.action.startsWith('architecture-');
          let itemClass = isRoute ? "cmd-scene-item cmd-route-item" : "cmd-scene-item";
          
          html += `
            <div class="${itemClass}" data-pano-node="${s.action}">
              <div class="cmd-scene-thumb">
                ${s.thumb ? `<img src="${s.thumb}" alt="">` : `<div style="width:100%;height:100%;background-color:${s.color||'#333'};"></div>`}
              </div>
              <div class="cmd-scene-info">
                <div class="cmd-scene-title">${s.title}</div>
                <div class="cmd-scene-sub">${s.sub || ''}</div>
              </div>
            </div>
          `;
        });
        html += `
            </div>
          </div>
        `;
      }
      
      // Also add Liên kết vùng manually
      html += `
        <div class="cmd-category">
          <div class="cmd-cat-header">
            <div class="cmd-cat-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>
            </div>
            <span>LIÊN KẾT VÙNG</span>
            <svg class="cmd-cat-arrow" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
          <div class="cmd-cat-items">
            <div class="cmd-scene-item cmd-route-item" data-action="region-page">
              <div class="cmd-scene-thumb">
                <img src="image/NỀN.png" alt="">
              </div>
              <div class="cmd-scene-info">
                <div class="cmd-scene-title">LIÊN KẾT VÙNG</div>
                <div class="cmd-scene-sub">Bản đồ tiện ích</div>
              </div>
            </div>
          </div>
        </div>
      `;

      explorerList.innerHTML = html;
    }

    // ── 2. Category accordion expand/collapse ─────────────────────────────
    document.querySelectorAll('.cmd-cat-header').forEach(header => {
      // Open first two categories by default
      const cat = header.parentElement;
      const items = cat.querySelector('.cmd-cat-items');
      if (items) {
        // Do not expand by default
      }

      // Allow opening via click (for mobile/touch)
      header.addEventListener('click', () => {
        const cat = header.parentElement;
        const items = cat.querySelector('.cmd-cat-items');
        const isExpanded = cat.classList.contains('expanded');
        // Collapse all others first for accordion effect
        document.querySelectorAll('.cmd-category.expanded').forEach(c => {
          if (c !== cat) {
            c.classList.remove('expanded');
            const i = c.querySelector('.cmd-cat-items');
            if (i) i.style.maxHeight = '0';
          }
        });
        if (!isExpanded) {
          cat.classList.add('expanded');
          if (items) items.style.maxHeight = items.scrollHeight + 'px';
        } else {
          cat.classList.remove('expanded');
          if (items) items.style.maxHeight = '0';
        }
      });

      // Allow opening via hover
      cat.addEventListener('mouseenter', () => {
        const items = cat.querySelector('.cmd-cat-items');
        // Collapse all others
        document.querySelectorAll('.cmd-category.expanded').forEach(c => {
          if (c !== cat) {
            c.classList.remove('expanded');
            const i = c.querySelector('.cmd-cat-items');
            if (i) i.style.maxHeight = '0';
          }
        });
        cat.classList.add('expanded');
        if (items) items.style.maxHeight = items.scrollHeight + 'px';
      });
    });

    // ── 3. Scene items — navigate to panorama ─────────────────────────────
    document.querySelectorAll('.cmd-scene-item').forEach(item => {
      item.addEventListener('click', () => {
        const node = item.getAttribute('data-pano-node');
        if (node && window.pano) {
          window.pano.openNext(`{${node}}`);
          activePanoNode = node;
          lsSet('latien_active_node', node);
          // Update active state
          document.querySelectorAll('.cmd-scene-item').forEach(i => i.classList.remove('active'));
          item.classList.add('active');
          // Update timeline
          syncCommandTimeline(node);
          showNotification(`Đang chuyển đến: ${item.querySelector('.cmd-scene-title')?.textContent || node}`);
        }
      });
    });

    // ── 3b. Route items (Region page, architecture, etc.) ──────────────────
    document.querySelectorAll('.cmd-route-item').forEach(item => {
      item.addEventListener('click', (e) => {
        // e.stopPropagation() is not necessary because parent doesn't have conflicting click
        routeNavigation(item);
        if (item.classList.contains('cmd-scene-item')) {
          document.querySelectorAll('.cmd-scene-item').forEach(i => i.classList.remove('active'));
          item.classList.add('active');
        }
      });
    });

    // ── 4. Spatial control tiles (Hover & Click Effects) ──────────────────────────
    document.querySelectorAll('.cmd-ctrl-tile').forEach(tile => {
      // Click action
      tile.addEventListener('click', (e) => {
        e.stopPropagation();
        if (typeof dispatchToolAction === 'function') {
          dispatchToolAction(tile);
        }
      });
      
      // Magnetic hover effect
      tile.addEventListener('mousemove', (e) => {
        const rect = tile.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        tile.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px) scale(1.04)`;
      });
      tile.addEventListener('mouseleave', () => {
        tile.style.transform = '';
      });
    });

    // ── 5. Timeline node navigation ───────────────────────────────────────
    document.querySelectorAll('.cmd-tl-node').forEach(node => {
      node.addEventListener('click', () => {
        const panoNode = node.getAttribute('data-pano-node');
        if (panoNode && window.pano) {
          window.pano.openNext(`{${panoNode}}`);
          activePanoNode = panoNode;
          lsSet('latien_active_node', panoNode);
          syncCommandTimeline(panoNode);
          showNotification(`Đang chuyển đến: ${node.getAttribute('data-label') || panoNode}`);
        }
      });
    });
    // ── 5b. Timeline scrolling ────────────────────────────────────────────
    const tlTrack = document.getElementById('cmd-timeline-track');
    const btnLeft = document.getElementById('cmd-scroll-left');
    const btnRight = document.getElementById('cmd-scroll-right');
    
    if (tlTrack && btnLeft && btnRight) {
      const updateScrollBtns = () => {
        // If track is not scrollable, hide both
        if (tlTrack.scrollWidth <= tlTrack.clientWidth) {
          btnLeft.classList.add('hidden');
          btnRight.classList.add('hidden');
          return;
        }
        
        // Show/hide left button
        if (tlTrack.scrollLeft <= 10) {
          btnLeft.classList.add('hidden');
        } else {
          btnLeft.classList.remove('hidden');
        }
        
        // Show/hide right button
        if (tlTrack.scrollLeft + tlTrack.clientWidth >= tlTrack.scrollWidth - 10) {
          btnRight.classList.add('hidden');
        } else {
          btnRight.classList.remove('hidden');
        }
      };

      // Check on scroll and window resize
      tlTrack.addEventListener('scroll', updateScrollBtns);
      window.addEventListener('resize', updateScrollBtns);
      // Initial check (use a small timeout to let CSS render)
      setTimeout(updateScrollBtns, 200);

      btnLeft.addEventListener('click', () => {
        tlTrack.scrollBy({ left: -300, behavior: 'smooth' });
      });

      btnRight.addEventListener('click', () => {
        tlTrack.scrollBy({ left: 300, behavior: 'smooth' });
      });
    }

    // Note: fullscreen and tool actions are handled by the global [data-action] listener.

    // ── 7. Ribbon coordinate display — live pan/tilt ─────────────────────
    function updateCmdCoords() {
      if (layoutMode !== 'command' || !window.pano) return;
      try {
        const pan  = window.pano.getPan  ? Math.round(window.pano.getPan())  : 0;
        const tilt = window.pano.getTilt ? Math.round(window.pano.getTilt()) : 0;
        const panEl  = document.getElementById('cmd-pan-val');
        const tiltEl = document.getElementById('cmd-tilt-val');
        if (panEl)  panEl.textContent  = `${pan}°`;
        if (tiltEl) tiltEl.textContent = `${tilt}°`;
      } catch(e) {}
    }
    // Piggyback on animation frame — poll every 300ms
    let cmdCoordsInterval = setInterval(() => {
      if (layoutMode !== 'command') { clearInterval(cmdCoordsInterval); return; }
      updateCmdCoords();
    }, 200);

    // ── 8. Sync active state immediately ─────────────────────────────────
    if (activePanoNode) {
      syncCommandTimeline(activePanoNode);
      // Mark active scene item
      document.querySelectorAll('.cmd-scene-item').forEach(i => {
        i.classList.toggle('active', i.getAttribute('data-pano-node') === activePanoNode);
      });
    }

    // Initialize/Rebind Premium Carousel since DOM was just injected
    if (typeof window.initPremiumCarousel === 'function') {
      window.initPremiumCarousel();
    }
  }

  function syncCommandTimeline(nodeId) {
    // Update timeline nodes
    document.querySelectorAll('.cmd-tl-node').forEach(n => {
      n.classList.toggle('active', n.getAttribute('data-pano-node') === nodeId);
    });
    // Update explorer scene items
    document.querySelectorAll('.cmd-scene-item').forEach(item => {
      item.classList.toggle('active', item.getAttribute('data-pano-node') === nodeId);
    });
    // Update scene name in ribbon
    const sceneNameMap = {
      node1: 'TOP VIEW DAY 1', node2: 'BIRD VIEW 1', node3: 'BIRD VIEW 2',
      node4: 'TAV PARK', node5: 'TAV STREET', node6: 'TAV PARK 2',
      node7: 'TAV LIVING 2', node8: 'TAV LIVING 1', node9: 'TAV THÔNG TẦNG',
      node10: 'BALCONY', node11: 'TAV WC'
    };
    const nameEl = document.getElementById('cmd-scene-name');
    if (nameEl && sceneNameMap[nodeId]) nameEl.textContent = sceneNameMap[nodeId];
  }

  // ==========================================
  // MONARCH LAYOUT LISTENERS
  // ==========================================
  function setupRegalListeners(handleSwitch) {
    const navContainer = document.getElementById("blueprint-nav-container");
    const navButton = document.getElementById("blueprint-nav-button");
    if (navContainer && navButton) {
      navButton.addEventListener("click", (e) => {
        e.stopPropagation();
        navContainer.classList.toggle("pinned");
      });
      document.addEventListener("click", (e) => {
        if (!navContainer.contains(e.target)) {
          navContainer.classList.remove("pinned");
        }
      });
    }

    const navItems = document.querySelectorAll(".layout-regal .rgl-neo-nav-module");
    navItems.forEach(item => {
      const openSubmenu = (toggle = false) => {
        if (item.classList.contains("has-submenu")) {
          const submenu = item.querySelector(".rgl-neo-submenu");
          if (submenu) {
            if (toggle) {
              submenu.classList.toggle("open");
              item.classList.toggle("submenu-open");
            } else {
              submenu.classList.add("open");
              item.classList.add("submenu-open");
            }
            if (submenu.classList.contains("open")) {
              navItems.forEach(other => {
                if (other !== item && other.classList.contains("has-submenu")) {
                  const otherSub = other.querySelector(".rgl-neo-submenu");
                  if (otherSub) {
                    otherSub.classList.remove("open");
                    other.classList.remove("submenu-open");
                  }
                }
              });
            }
          }
        }
      };

      item.addEventListener("click", (e) => {
        if (e.target.closest(".rgl-neo-submenu")) return;
        if (item.classList.contains("has-submenu")) {
          openSubmenu(true);
        } else {
          routeNavigation(item);
          navItems.forEach(n => n.classList.remove("active"));
          item.classList.add("active");
        }
      });

      // Hover to open submenu
      item.addEventListener("mouseenter", () => {
        if (item.classList.contains("has-submenu")) {
          openSubmenu(false);
        }
      });
      
      item.addEventListener("mouseleave", () => {
        if (item.classList.contains("has-submenu")) {
          const submenu = item.querySelector(".rgl-neo-submenu");
          if (submenu) {
            submenu.classList.remove("open");
            item.classList.remove("submenu-open");
          }
        }
      });

    });

    const submenuItems = document.querySelectorAll(".layout-regal .rgl-neo-sub-item");
    submenuItems.forEach(item => {
      item.addEventListener("click", (e) => {
        e.stopPropagation();
        routeNavigation(item);
        
        submenuItems.forEach(n => n.classList.remove("active"));
        item.classList.add("active");

        const parentNav = item.closest(".rgl-neo-nav-module");
        if (parentNav) {
          navItems.forEach(n => n.classList.remove("active"));
          parentNav.classList.add("active");
        }
      });
    });

    const tools = document.querySelectorAll(".layout-regal .rgl-neo-tool-btn");
    tools.forEach(tool => {
      tool.addEventListener("click", (e) => {
        e.stopPropagation();
        const action = tool.dataset.action;
        if (action === "toggle-minimap") {
          const minimap = document.getElementById("minimap-widget");
          if (minimap) {
            minimap.classList.toggle("collapsed");
            tool.classList.toggle("active");
          }
        } else if (action === "layout-switcher") {
          const switcher = document.getElementById("layout-switcher");
          if (switcher) switcher.classList.toggle("open");
        } else {
          // Add toggle logic for specific tools to get the active effect
          
          // Just pulse for one-off actions, stateful actions are handled in dispatchToolAction
          const statefulActions = ['hotspots', 'music', 'fullscreen', 'toggle-minimap'];
          if (!statefulActions.includes(action)) {
            tool.classList.add("active");
            setTimeout(() => tool.classList.remove("active"), 300);
          }
  
          if (typeof dispatchToolAction === "function") {
            dispatchToolAction(tool);
          }
        }
      });
    });
  }

  function setupMonarchListeners(handleSwitch) {
    const navItems = document.querySelectorAll(".layout-monarch .monarch-nav-item, .layout-regal .monarch-nav-item");
    const popoverItems = document.querySelectorAll(".layout-monarch .monarch-popover-item, .layout-regal .monarch-popover-item");
    const toolItems = document.querySelectorAll(".layout-monarch .monarch-command-item, .layout-regal .monarch-command-item");
    const selectorItems = document.querySelectorAll(".layout-monarch .monarch-selector-item, .layout-regal .monarch-selector-item");

    // Highlight active layout selector item
    selectorItems.forEach(item => {
      const layout = item.getAttribute("data-layout");
      item.classList.toggle("active", layout === layoutMode);
    });

    // 1. Navigation dock items click handler
    navItems.forEach(item => {
      item.addEventListener("click", function(e) {
        // If user clicked inside the popover itself, handle selection instead
        if (e.target.closest(".monarch-popover")) {
          return;
        }

        const popover = this.querySelector(".monarch-popover");
        if (popover) {
          e.stopPropagation();
          const wasOpen = popover.classList.contains("open");
          
          // Close all popovers first
          document.querySelectorAll(".layout-monarch .monarch-popover, .layout-regal .monarch-popover").forEach(p => p.classList.remove("open"));
          
          if (!wasOpen) {
            popover.classList.add("open");
          }
          return;
        }

        // Otherwise (Top View, Interior, Liên kết vùng)
        // Close all popovers
        document.querySelectorAll(".layout-monarch .monarch-popover, .layout-regal .monarch-popover").forEach(p => p.classList.remove("open"));
        
        navItems.forEach(n => n.classList.remove("active"));
        popoverItems.forEach(p => p.classList.remove("active"));
        this.classList.add("active");
        activeNavItemId = this.getAttribute("data-id");
        lsSet("latien_active_nav", activeNavItemId);
        routeNavigation(this);
      });
    });

    // 2. Popover item click handler
    popoverItems.forEach(item => {
      item.addEventListener("click", function(e) {
        e.stopPropagation();
        popoverItems.forEach(p => p.classList.remove("active"));
        this.classList.add("active");

        // Close all popovers
        document.querySelectorAll(".layout-monarch .monarch-popover, .layout-regal .monarch-popover").forEach(p => p.classList.remove("open"));

        // Highlight parent nav item
        const parentNav = this.closest(".monarch-nav-item");
        if (parentNav) {
          navItems.forEach(n => n.classList.remove("active"));
          parentNav.classList.add("active");
          activeNavItemId = parentNav.getAttribute("data-id");
          lsSet("latien_active_nav", activeNavItemId);
        }

        activeSubmenuAction = this.getAttribute("data-action");
        activePanoNode = this.getAttribute("data-pano-node") || activePanoNode;
        lsSet("latien_active_submenu", activeSubmenuAction);
        lsSet("latien_active_node", activePanoNode);
        
        routeNavigation(this);
      });
    });

    // 3. Command panel items click handler
    toolItems.forEach(tool => {
      tool.addEventListener("click", function(e) {
        e.stopPropagation();
        const isPinned = this.classList.contains("pinned");
        toolItems.forEach(t => t.classList.remove("pinned"));
        if (!isPinned) this.classList.add("pinned");
        dispatchToolAction(this);
      });
    });

    // 4. Layout selector items click handler
    selectorItems.forEach(item => {
      item.addEventListener("click", function(e) {
        e.stopPropagation();
        const layoutTarget = this.getAttribute("data-layout");
        handleSwitch(layoutTarget);
      });
    });

    // 5. Close popovers when clicking anywhere else
    document.addEventListener("click", function(e) {
      if (!e.target.closest(".monarch-nav-item")) {
        document.querySelectorAll(".layout-monarch .monarch-popover, .layout-regal .monarch-popover").forEach(p => p.classList.remove("open"));
      }
    });
  }

  // ==========================================
  // TOOLBAR ACTION DISPATCHER
  // ==========================================

  // Per-tool state
  let isMusicMuted = false;
  let isImagesHidden = false;
  let isHotspotsHidden = false;

  function dispatchToolAction(btn) {
    const action = btn.getAttribute("data-action");
    btn.style.transform = "scale(0.88)";
    setTimeout(() => { btn.style.transform = ""; }, 150);

    switch (action) {
      case "music":
        isMusicMuted = !isMusicMuted;
        if (window.pano && typeof window.pano.setMute === "function") {
          window.pano.setMute(isMusicMuted);
        }
        btn.classList.toggle("active", !isMusicMuted);
        showNotification(isMusicMuted ? "Nhạc nền đã tắt" : "Nhạc nền đã bật");
        break;

      case "images":
        if (typeof window.openGlobalPanoramaGallery === "function") {
          window.openGlobalPanoramaGallery();
        }
        break;

      case "hotspots":
        isHotspotsHidden = !isHotspotsHidden;
        const hotspots = document.querySelectorAll(".hologram-marker-container, [class*='hotspot'], .hs-container");
        hotspots.forEach(hs => {
          hs.style.visibility = isHotspotsHidden ? "hidden" : "visible";
          hs.style.opacity = isHotspotsHidden ? "0" : "";
        });
        btn.classList.toggle("active", !isHotspotsHidden);
        showNotification(isHotspotsHidden ? "Điểm điều hướng đã ẩn" : "Điểm điều hướng đã hiện");
        break;

      case "share":
        const menu = document.getElementById('social-share-menu');
        if (menu) {
          const rect = btn.getBoundingClientRect();
          menu.style.bottom = (window.innerHeight - rect.top + 10) + 'px';
          menu.style.left = rect.left + 'px';
          menu.classList.toggle('active');
        }
        break;

      case "call":
        window.open('https://tav.vn/', '_blank');
        break;

      case "info":
        showProjectInfoPanel();
        break;

      case "facebook":
        window.open("https://www.facebook.com/search/top?q=t%20architect%20%26%20visualization%20company%20limited", "_blank");
        break;

      case "instagram":
        window.open("https://www.instagram.com", "_blank");
        break;

      case "zalo":
        window.open("https://zalo.me", "_blank");
        break;

      case "fullscreen":
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(err => {
            console.error("Error attempting to enable full-screen mode:", err.message);
          });
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          }
        }
        break;

      default:
        showNotification(`Tính năng: ${action}`);
        console.log(`Tool action: ${action}`);
    }
  }

  // Project info panel
  function showProjectInfoPanel() {
    let panel = document.getElementById("project-info-panel");
    if (panel) {
      panel.classList.toggle("visible");
      return;
    }
    panel = document.createElement("div");
    panel.id = "project-info-panel";
    panel.className = "project-info-panel";
    panel.innerHTML = `
      <div class="info-panel-header">
        <div class="info-panel-title">
          <div class="logo-script-top" style="font-size:14px;letter-spacing:2px;">TAV</div>
          <div class="logo-script-sub" style="font-size:7px;letter-spacing:3px;">V I L L A</div>
        </div>
        <div class="info-panel-close" id="info-panel-close">✕</div>
      </div>
      <div class="info-panel-body">
        <div class="info-row">
          <span class="info-label">VỊ TRÍ</span>
          <span class="info-value">Hồ Tràm, Bà Rịa - Vũng Tàu</span>
        </div>
        <div class="info-row">
          <span class="info-label">LOẠI HÌNH</span>
          <span class="info-value">Biệt thự nghỉ dưỡng ven biển</span>
        </div>
        <div class="info-row">
          <span class="info-label">DIỆN TÍCH</span>
          <span class="info-value">250 - 420 m² / căn</span>
        </div>
        <div class="info-row">
          <span class="info-label">SỐ LƯỢNG</span>
          <span class="info-value">99 căn biệt thự cao cấp</span>
        </div>
        <div class="info-row">
          <span class="info-label">CHỦ ĐẦU TƯ</span>
          <span class="info-value">TAV Investment Group</span>
        </div>
        <div class="info-row">
          <span class="info-label">TIỆN ÍCH</span>
          <span class="info-value">Clubhouse, Beach Bar, Spa, Marina</span>
        </div>
      </div>
    `;
    document.body.appendChild(panel);
    requestAnimationFrame(() => panel.classList.add("visible"));
    document.getElementById("info-panel-close").addEventListener("click", (e) => {
      e.stopPropagation();
      panel.classList.remove("visible");
    });
  }

  // ==========================================
  // COMPASS & MINIMAP SYNC
  // ==========================================

  let compassAnimFrame = null;
  let lastRawPan = null;
  let continuousPan = 0;

  function syncCompass() {
    if (!window.pano) return;
    try {
      const rawPan = window.pano.getPan ? window.pano.getPan() : 0;
      
      if (lastRawPan === null) {
        continuousPan = rawPan;
      } else {
        let dPan = rawPan - lastRawPan;
        if (dPan > 180) dPan -= 360;
        if (dPan < -180) dPan += 360;
        continuousPan += dPan;
      }
      lastRawPan = rawPan;

      const dial = document.getElementById("compass-dial");
      const degDisplay = document.getElementById("compass-degree");

      if (dial) {
        dial.style.transform = `rotate(${-continuousPan}deg)`;
      }
      if (degDisplay) {
        const normalizedDeg = ((continuousPan % 360) + 360) % 360;
        degDisplay.textContent = `${Math.round(normalizedDeg)}°`;
      }

      syncMinimap(continuousPan);

      // Premium hotspot depth/visibility (All Layouts)
      updateHotspotVisibility();
    } catch (e) {}
    compassAnimFrame = requestAnimationFrame(syncCompass);
  }

  let activeViewer = 'main';

  // ==========================================
  // MINIMAP VIEWCONE SYNC (static topview)
  // ==========================================
  function syncMinimap(pan) {
    if (!window.pano) return;
    try {
      const cone = document.getElementById("minimap-viewcone");
      const canvas = document.getElementById("minimap-canvas");
      if (cone) {
        // Rotate the viewcone and apply inverse scale to keep it original size.
        const zoom = canvas ? parseFloat(canvas.style.getPropertyValue('--mm-zoom')) || 1 : 1;
        cone.style.transform = `rotate(${-pan}deg) scale(${1 / zoom})`;
      }
    } catch (e) {}
  }

  function updateMinimapPosition(nodeId) {
    // No-op: dot is centered on the topview image
  }

  function populateMinimapMarkers() {
    // Disabled for 360 viewer
  }

  function updateResizeIcons(isMaximised) {
    const resizeBtn = document.getElementById("minimap-resize-btn");
    if (!resizeBtn) return;
    const expandIcon = resizeBtn.querySelector(".expand-icon");
    const shrinkIcon = resizeBtn.querySelector(".shrink-icon");
    if (expandIcon && shrinkIcon) {
      expandIcon.style.display = isMaximised ? "none" : "block";
      shrinkIcon.style.display = isMaximised ? "block" : "none";
    }
  }

  function setupMinimapListeners() {
    const toggleBtn = document.getElementById("minimap-toggle-btn");
    const resizeBtn = document.getElementById("minimap-resize-btn");
    const widget = document.getElementById("minimap-widget");
    const canvas = document.getElementById("minimap-canvas");
    if (!widget) return;

    if (toggleBtn) {
      toggleBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        
        // If it is in maximised state, minimize it back to small map first
        if (widget.classList.contains("maximap")) {
          widget.classList.remove("maximap");
          updateResizeIcons(false);
          return;
        }
        
        widget.classList.toggle("collapsed");
        const chevron = widget.querySelector(".minimap-chevron path");
        const isCollapsed = widget.classList.contains("collapsed");
        if (chevron) {
          chevron.setAttribute("d", isCollapsed ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6");
        }
      });
    }

    if (resizeBtn) {
      resizeBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        if (widget.classList.contains("collapsed")) {
          // If collapsed, expand it to small map first
          widget.classList.remove("collapsed");
          const chevron = widget.querySelector(".minimap-chevron path");
          if (chevron) chevron.setAttribute("d", "M6 9l6 6 6-6");
        }
        
        const isMax = widget.classList.toggle("maximap");
        updateResizeIcons(isMax);
      });
    }

    if (canvas) {
      canvas.addEventListener("click", function (e) {
        if (!widget.classList.contains("collapsed") && !widget.classList.contains("maximap")) {
          widget.classList.add("maximap");
          updateResizeIcons(true);
        }
      });

      // Mouse wheel zoom centered on cursor and panning
      const zoomWrapper = document.getElementById("minimap-zoom-wrapper");
      if (zoomWrapper) {
        let currentZoom = 1.0;
        let panX = 0;
        let panY = 0;
        const maxZoom = 4.0;
        const minZoom = 1.0;
        const step = 0.2;
        let isDragging = false;
        let startX = 0;
        let startY = 0;

        zoomWrapper.style.transformOrigin = '0 0';
        zoomWrapper.style.transition = 'none'; // Remove transition for instant drag response
        canvas.style.cursor = 'grab';

        function clampPan() {
          if (currentZoom <= 1.0) {
            panX = 0;
            panY = 0;
            return;
          }
          const rect = canvas.getBoundingClientRect();
          const minPanX = rect.width * (1 - currentZoom);
          const minPanY = rect.height * (1 - currentZoom);
          
          panX = Math.max(minPanX, Math.min(0, panX));
          panY = Math.max(minPanY, Math.min(0, panY));
        }

        canvas.addEventListener("wheel", function(e) {
          e.preventDefault();
          e.stopPropagation();

          if (widget.classList.contains("collapsed")) return;

          let newZoom = currentZoom;
          if (e.deltaY < 0) {
            newZoom = Math.min(maxZoom, currentZoom + step);
          } else {
            newZoom = Math.max(minZoom, currentZoom - step);
          }

          if (newZoom === currentZoom) return;

          const rect = canvas.getBoundingClientRect();
          const mouseX = e.clientX - rect.left;
          const mouseY = e.clientY - rect.top;

          // Math to keep mouse pointer at the exact same spot on the image
          panX = mouseX - (mouseX - panX) * (newZoom / currentZoom);
          panY = mouseY - (mouseY - panY) * (newZoom / currentZoom);

          currentZoom = newZoom;
          clampPan();
          
          zoomWrapper.style.transform = `translate(${panX}px, ${panY}px) scale(${currentZoom})`;
          
          // Pass zoom level to CSS for inverse scaling of markers
          canvas.style.setProperty('--mm-zoom', currentZoom);
        }, { passive: false });

        canvas.addEventListener("mousedown", (e) => {
          if (widget.classList.contains("collapsed") || currentZoom <= 1.0) return;
          e.preventDefault(); // Prevent native image drag/drop
          isDragging = true;
          startX = e.clientX - panX;
          startY = e.clientY - panY;
          canvas.style.cursor = 'grabbing';
        });

        window.addEventListener("mousemove", (e) => {
          if (!isDragging) return;
          panX = e.clientX - startX;
          panY = e.clientY - startY;
          clampPan();
          zoomWrapper.style.transform = `translate(${panX}px, ${panY}px) scale(${currentZoom})`;
        });

        window.addEventListener("mouseup", () => {
          if (isDragging) {
            isDragging = false;
            canvas.style.cursor = 'grab';
          }
        });
        
        // Touch support for mobile devices
        canvas.addEventListener("touchstart", (e) => {
          if (widget.classList.contains("collapsed") || e.touches.length !== 1 || currentZoom <= 1.0) return;
          e.preventDefault(); // Prevent scrolling the page
          isDragging = true;
          startX = e.touches[0].clientX - panX;
          startY = e.touches[0].clientY - panY;
        }, { passive: false });
        
        window.addEventListener("touchmove", (e) => {
          if (!isDragging || e.touches.length !== 1) return;
          panX = e.touches[0].clientX - startX;
          panY = e.touches[0].clientY - startY;
          clampPan();
          zoomWrapper.style.transform = `translate(${panX}px, ${panY}px) scale(${currentZoom})`;
        }, { passive: false });
        
        window.addEventListener("touchend", () => {
          isDragging = false;
        });
      }
    }
  }

  // ==========================================
  // CUSTOM PAGES & ROUTING
  // ==========================================

  let previousPanoNode = "node1";

  function openInteriorPage(panoIndex = 1) {
    if (window.pano && typeof window.pano.getCurrentNode === "function") {
      const cur = window.pano.getCurrentNode();
      if (cur && cur !== "node3" && cur !== "node4") {
        previousPanoNode = cur;
      }
    } else {
      previousPanoNode = activePanoNode || "node1";
    }

    document.body.classList.add("interior-mode-active");
    
    const targetNode = (panoIndex === 2) ? "node4" : "node3";
    if (window.pano) {
      window.pano.openNext(`{${targetNode}}`);
    }

    const btns = document.querySelectorAll("#interior-page .interior-switch-btn");
    btns.forEach(btn => {
      const pVal = parseInt(btn.getAttribute("data-pano"));
      btn.classList.toggle("active", pVal === panoIndex);
    });

    showNotification("Đã mở trang Thiết kế Nội thất");
  }

  function closeInteriorPage() {
    document.body.classList.remove("interior-mode-active");
    if (window.pano && previousPanoNode) {
      window.pano.openNext(`{${previousPanoNode}}`);
    }
    showNotification("Đã quay lại 360");
  }


  // Reusable Sidebar Menu Framework (Matching Region Page)
    function openClassicSidebarPage(pageId, title, itemsData) {
      if (window.pano && typeof window.pano.getCurrentNode === "function") {
        const cur = window.pano.getCurrentNode();
        if (cur) previousPanoNode = cur;
      } else {
        previousPanoNode = activePanoNode || "node1";
      }
  
      let pageDiv = document.getElementById(pageId);
      if (!pageDiv) {
        pageDiv = document.createElement("div");
        pageDiv.id = pageId;
        pageDiv.className = "custom-overlay-page";
        
        let listHTML = itemsData.map(item => `
          <li class="region-menu-item sidebar-pano-item" data-pano-node="${item.node}">
             ${item.title}
          </li>
        `).join("");
  
        pageDiv.innerHTML = `
          <div style="display: flex; flex-direction: row; width: 100%; height: 100%;">
            <div class="region-sidebar">
              <div class="sidebar-header">
                <h3>${title.toUpperCase()}</h3>
              </div>
              <ul class="region-menu-list">
                ${listHTML}
              </ul>
            </div>
            <!-- Empty transparent container so clicks pass through to Pano2VR -->
            <div class="region-map-container" style="background: transparent !important; flex: 1; pointer-events: none; border: none; box-shadow: none;">
            </div>
          </div>
        `;
        document.body.appendChild(pageDiv);
  
        // Add click listeners to items
        const items = pageDiv.querySelectorAll(".sidebar-pano-item");
        items.forEach(item => {
          item.addEventListener("click", function(e) {
            e.stopPropagation();
            // Highlight active
            items.forEach(li => li.classList.remove("active"));
            this.classList.add("active");

            const targetNode = this.getAttribute("data-pano-node");
            if (window.pano) {
              window.pano.openNext('{' + targetNode + '}');
            }
            closeClassicSidebarPage(pageId);
          });
        });
      }
  
      // Show page
      document.body.classList.add(pageId + "-active");
      
      // Update active state based on current panorama if possible
      if (window.pano && typeof window.pano.getCurrentNode === "function") {
         const current = window.pano.getCurrentNode();
         const items = pageDiv.querySelectorAll(".sidebar-pano-item");
         items.forEach(li => {
            if (li.getAttribute("data-pano-node") === current) {
                li.classList.add("active");
            } else {
                li.classList.remove("active");
            }
         });
      }
    }
  
    function closeClassicSidebarPage(pageId) {
      document.body.classList.remove(pageId + "-active");
    }
    
    function openRegionPage() {
    if (window.pano && typeof window.pano.getCurrentNode === "function") {
      const cur = window.pano.getCurrentNode();
      if (cur) {
        previousPanoNode = cur;
      }
    } else {
      previousPanoNode = activePanoNode || "node1";
    }

    document.body.classList.add("region-mode-active");
    showNotification("Đã mở trang Liên kết vùng");
  }

  function closeRegionPage() {
    document.body.classList.remove("region-mode-active");
    showNotification("Đã quay lại 360");
  }

  function setupInteriorPageListeners() {
    const btns = document.querySelectorAll("#interior-page .interior-switch-btn");
    btns.forEach(btn => {
      btn.addEventListener("click", function(e) {
        e.stopPropagation();
        const panoIndex = parseInt(this.getAttribute("data-pano"));
        btns.forEach(b => b.classList.remove("active"));
        this.classList.add("active");
        
        const targetNode = (panoIndex === 2) ? "node4" : "node3";
        if (window.pano) {
          window.pano.openNext(`{${targetNode}}`);
        }
      });
    });

    const backBtn = document.getElementById("interior-back-btn");
    if (backBtn) {
      backBtn.addEventListener("click", function(e) {
        e.stopPropagation();
        closeInteriorPage();
      });
    }
  }

  function setupRegionPageListeners() {
    const hamburger = document.getElementById("region-mobile-hamburger");
    const collapsible = document.getElementById("region-menu-collapsible");
    if (hamburger && collapsible) {
      hamburger.addEventListener("click", () => {
        collapsible.classList.toggle("open");
      });
    }

    const listItems = document.querySelectorAll("#region-page .region-layer-item");
    const layers = document.querySelectorAll("#region-page .region-map-layer");
    const globalToggle = document.getElementById("region-global-toggle");

    // Default ON state
    listItems.forEach(item => item.classList.add("active"));
    layers.forEach(layer => layer.classList.add("active"));

    const updateGlobalToggleState = () => {
      if (!globalToggle) return;
      const allActive = Array.from(listItems).every(item => item.classList.contains("active"));
      if (allActive) {
        globalToggle.textContent = "Ẩn tất cả";
        globalToggle.classList.add("active");
      } else {
        globalToggle.textContent = "Hiện tất cả";
        globalToggle.classList.remove("active");
      }
    };

    if (globalToggle) {
      globalToggle.addEventListener("click", function(e) {
        e.stopPropagation();
        const isCurrentlyAllActive = this.classList.contains("active");
        
        if (isCurrentlyAllActive) {
          // Turn OFF all
          listItems.forEach(item => item.classList.remove("active"));
          layers.forEach(layer => layer.classList.remove("active"));
        } else {
          // Turn ON all
          listItems.forEach(item => item.classList.add("active"));
          layers.forEach(layer => layer.classList.add("active"));
        }
        updateGlobalToggleState();
      });
    }

    listItems.forEach(item => {
      item.addEventListener("click", function(e) {
        e.stopPropagation();
        this.classList.toggle("active");
        
        const layerId = this.getAttribute("data-layer");
        const layerImg = document.querySelector(`.region-map-layer[data-layer-id="${layerId}"]`);
        if (layerImg) {
          layerImg.classList.toggle("active", this.classList.contains("active"));
        }
        updateGlobalToggleState();
      });
    });

    const backBtn = document.getElementById("region-back-btn");
    if (backBtn) {
      backBtn.addEventListener("click", function(e) {
        e.stopPropagation();
        closeRegionPage();
      });
    }
  }

  function routeNavigation(element) {
    const id = element.getAttribute("data-id");
    const action = element.getAttribute("data-action");
    const panoNode = element.getAttribute("data-pano-node");


    // 1. Check if it's Region Page
    if (id === "surrounding" || action === "region-page" || element.id === "nav-surrounding" || element.id === "nav-neo-logo") {
      openRegionPage();
      return;
    }

    // 2. Check if it's Interior Page
    if (id === "interior" || (action && action.startsWith("interior-"))) {
      let panoIndex = 1;
      if (action === "interior-2") panoIndex = 2;
      openInteriorPage(panoIndex);
      return;
    }

    // 3. Otherwise, normal panorama switching
    if (panoNode && window.pano) {
      window.pano.openNext(`{${panoNode}}`);
      let titleText = element.textContent.trim();
      if (element.classList.contains("mega-card")) {
        const cardTitle = element.querySelector(".mega-card-title");
        if (cardTitle) titleText = cardTitle.textContent.trim();
      }
      showNotification(`Đang chuyển đến: ${titleText}`);
    } else if (action) {
      let titleText = element.textContent.trim();
      showNotification(`Đang tải: ${titleText}`);
    }
  }

  // Setup outer containers and Layout switch click actions
  function injectUI() {
    // 1. Create outer wrapper container
    const uiWrapper = document.createElement("div");
    uiWrapper.id = "modern-ui-overlay";
    uiWrapper.className = `modern-ui-overlay layout-${layoutMode}`;
    uiWrapper.innerHTML = gradientDefs + (window.innerWidth <= 1024 ? "" : layoutSwitcherHTML);
    document.body.appendChild(uiWrapper);

    // Sync top-level body classes
    document.body.classList.remove("layout-classic", "layout-futuristic", "layout-neo", "layout-gradient", "layout-aurora", "layout-horizon", "layout-prism", "layout-nexus", "layout-monarch", "layout-regal", "layout-command");
    document.body.classList.add(`layout-${layoutMode}`);


    // Inject custom Interior Page and Region Page overlays if not already present
    if (!document.getElementById("interior-page")) {
      const interiorDiv = document.createElement("div");
      interiorDiv.id = "interior-page";
      interiorDiv.className = "custom-overlay-page";
      interiorDiv.innerHTML = `
        <button class="back-to-360-btn" id="interior-back-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          <span>Quay lại 360</span>
        </button>
        <div class="interior-switcher-container">
          <button class="interior-switch-btn active" data-pano="1">Panorama 1</button>
          <button class="interior-switch-btn" data-pano="2">Panorama 2</button>
        </div>
      `;
      document.body.appendChild(interiorDiv);
      setupInteriorPageListeners();
    }

    if (!document.getElementById("region-page")) {
      const regionDiv = document.createElement("div");
      regionDiv.id = "region-page";
      regionDiv.className = "custom-overlay-page";
      
      const isMobile = window.innerWidth <= 1024;
      const imgNen = isMobile ? "image/NỀN MB.png" : "image/NỀN.png";
      const imgGiaoThong = isMobile ? "image/CÁC TUYẾN GIAO THÔNG CHÍNH MB.png" : "image/CÁC TUYẾN GIAO THÔNG CHÍNH.png";
      const imgChuThich = isMobile ? "image/CHÚ THÍCH MB.png" : "image/CHÚ THÍCH.png";
      const imgHanhChinh = isMobile ? "image/TRUNG TÂM HÀNH CHÍNH MB.png" : "image/TRUNG TÂM HÀNH CHÍNH.png";
      const imgTheThao = isMobile ? "image/TRUNG TÂM THỂ THAO MB.png" : "image/TRUNG TÂM THỂ THAO.png";
      const imgTienIch = isMobile ? "image/TIỆN ÍCH KHÁC MB.png" : "image/TIỆN ÍCH KHÁC.png";

      regionDiv.innerHTML = `
        <div class="region-controls-panel">
          <div class="sidebar-header" style="display:flex; justify-content:space-between; align-items:center;">
            <h3>LIÊN KẾT VÙNG</h3>
            <button id="region-mobile-hamburger" class="region-mobile-hamburger">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </button>
          </div>
          <div id="region-menu-collapsible" class="region-menu-collapsible">
            <ul class="region-layer-list">
              <li class="region-layer-item" data-layer="giao-thong">
                <div class="region-layer-glow"></div>
                <span class="layer-indicator"></span> Các Tuyến Giao Thông
              </li>
              <li class="region-layer-item" data-layer="chu-thich">
                <div class="region-layer-glow"></div>
                <span class="layer-indicator"></span> Chú Thích
              </li>
              <li class="region-layer-item" data-layer="hanh-chinh">
                <div class="region-layer-glow"></div>
                <span class="layer-indicator"></span> Trung Tâm Hành Chính
              </li>
              <li class="region-layer-item" data-layer="the-thao">
                <div class="region-layer-glow"></div>
                <span class="layer-indicator"></span> Trung Tâm Thể Thao
              </li>
              <li class="region-layer-item" data-layer="tien-ich">
                <div class="region-layer-glow"></div>
                <span class="layer-indicator"></span> Tiện Ích Khác
              </li>
            </ul>
            <button id="region-global-toggle" class="region-global-btn active">Ẩn tất cả</button>
          </div>
          <button class="back-to-360-btn" id="region-back-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span>Quay lại 360</span>
          </button>
        </div>
        <div class="region-map-container">
          <div class="region-map-wrapper">
            <img src="${imgNen}" alt="Bản đồ liên kết vùng" class="region-map-base">
            <img src="${imgGiaoThong}" class="region-map-layer" data-layer-id="giao-thong">
            <img src="${imgChuThich}" class="region-map-layer" data-layer-id="chu-thich">
            <img src="${imgHanhChinh}" class="region-map-layer" data-layer-id="hanh-chinh">
            <img src="${imgTheThao}" class="region-map-layer" data-layer-id="the-thao">
            <img src="${imgTienIch}" class="region-map-layer" data-layer-id="tien-ich">
          </div>
        </div>
      `;
      document.body.appendChild(regionDiv);
      setupRegionPageListeners();
    }

    const handleSwitch = (newLayout) => {
      if (layoutMode === newLayout) return;

      // 1. Play fade-out animation
      uiWrapper.classList.add("switching");

      // 2. Record current active selections
      const activeNav = document.querySelector(".nav-item.active, .aurora-nav-item.active, .horizon-nav-item.active, .prism-nav-item.active, .nexus-nav-item.active, .monarch-nav-item.active, .regal-nav-item.active");
      if (activeNav) {
        activeNavItemId = activeNav.getAttribute("data-id");
        lsSet("latien_active_nav", activeNavItemId);
      }
      const activeSub = document.querySelector(".submenu-item.active, .mega-card.active, .aurora-submenu-item.active, .horizon-submenu-item.active, .prism-submenu-item.active, .nexus-submenu-item.active, .monarch-popover-item.active, .regal-submenu-item.active");
      if (activeSub) {
        activeSubmenuAction = activeSub.getAttribute("data-action") || activeSubmenuAction;
        activePanoNode = activeSub.getAttribute("data-pano-node") || activePanoNode;
        lsSet("latien_active_submenu", activeSubmenuAction);
        lsSet("latien_active_node", activePanoNode);
      }

      // 3. Swap UI layout dynamically after 300ms fadeout
      setTimeout(() => {
        layoutMode = newLayout;
        lsSet("latien_layout_mode", layoutMode);

        // Update body layout class namespaces
        document.body.classList.remove("layout-classic", "layout-futuristic", "layout-neo", "layout-gradient", "layout-aurora", "layout-horizon", "layout-prism", "layout-nexus", "layout-monarch", "layout-regal", "layout-command");
        document.body.classList.add(`layout-${layoutMode}`);

        // Update container class namespaces
        uiWrapper.className = `modern-ui-overlay layout-${layoutMode}`;

        // Re-inject layout structures and bind events
        injectLayoutComponents(handleSwitch);

        // Slide the switcher segments
        updateSwitcherUI();
        
        // Re-render hotspots if the layout affects their coordinates
        if (typeof window.reRenderHotspots === 'function') {
          window.reRenderHotspots();
        }

        // 4. Fade back in
        setTimeout(() => {
          uiWrapper.classList.remove("switching");
        }, 50);

        let notifMsg = "Đã chuyển sang Giao diện Neo";
        if (layoutMode === "classic") notifMsg = "Đã chuyển sang Giao diện Cổ điển";
        else if (layoutMode === "futuristic") notifMsg = "Đã chuyển sang Giao diện Tương lai";
        else if (layoutMode === "gradient") notifMsg = "Đã chuyển sang Giao diện Gradient";
        else if (layoutMode === "aurora") notifMsg = "Đã chuyển sang Giao diện Aurora";
        else if (layoutMode === "horizon") notifMsg = "Đã chuyển sang Giao diện Horizon";
        else if (layoutMode === "prism") notifMsg = "Đã chuyển sang Giao diện Prism";
        else if (layoutMode === "nexus") notifMsg = "Đã chuyển sang Giao diện Nexus";
        else if (layoutMode === "monarch") notifMsg = "Đã chuyển sang Giao diện Monarch";
        else if (layoutMode === "regal") notifMsg = "Đã chuyển sang Giao diện Regal";
        else if (layoutMode === "command") notifMsg = "Đã chuyển sang Giao diện Command";
        showNotification(notifMsg);

      }, 300);
    };

    // 2. Inject components for active layout mode
    injectLayoutComponents(handleSwitch);

     // 3. Setup Layout Switcher listeners
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

    if (classicSeg) classicSeg.addEventListener("click", () => handleSwitch("classic"));
    if (futuristicSeg) futuristicSeg.addEventListener("click", () => handleSwitch("futuristic"));
    if (neoSeg) neoSeg.addEventListener("click", () => handleSwitch("neo"));
    if (gradientSeg) gradientSeg.addEventListener("click", () => handleSwitch("gradient"));
    if (auroraSeg) auroraSeg.addEventListener("click", () => handleSwitch("aurora"));
    if (horizonSeg) horizonSeg.addEventListener("click", () => handleSwitch("horizon"));
    if (prismSeg) prismSeg.addEventListener("click", () => handleSwitch("prism"));
    if (nexusSeg) nexusSeg.addEventListener("click", () => handleSwitch("nexus"));
    if (monarchSeg) monarchSeg.addEventListener("click", () => handleSwitch("monarch"));
    if (regalSeg) regalSeg.addEventListener("click", () => handleSwitch("regal"));
    const commandSeg = document.getElementById("opt-layout-command");
    if (commandSeg) commandSeg.addEventListener("click", () => handleSwitch("command"));

    // 4. Initialize layout Switcher segments
    updateSwitcherUI();

    // -------------------------------------------------------
    // GLOBAL EVENT LISTENERS (registered ONCE, not per layout)
    // -------------------------------------------------------

    // Close submenus/panels when clicking outside any interactive UI element
    document.addEventListener("click", function (e) {
      // Close social dropdowns if click is outside the social button
      if (!e.target.closest(".tool-button.has-dropdown")) {
        const dropdowns = document.querySelectorAll(".social-dropdown.open");
        dropdowns.forEach(d => d.classList.remove("open"));
      }

      // Neo layout: close submenu panel
      if (layoutMode === "neo") {
        const submenuPanel = document.getElementById("neo-submenu-panel");
        if (submenuPanel && !submenuPanel.contains(e.target) && !e.target.closest(".neo-nav-card")) {
          submenuPanel.classList.remove("open");
        }
      }

      // Don't close if the click was on interactive UI
      if (e.target.closest(".modern-ui-overlay")) return;

      const navItems = document.querySelectorAll(".nav-item");
      navItems.forEach(n => n.classList.remove("is-open"));

      const rightToolStack = document.getElementById("right-tool-stack");
      if (rightToolStack) {
        rightToolStack.classList.remove("expanded");
        rightToolStack.classList.remove("pinned");
      }

      const sidebarContainer = document.getElementById("sidebar-container");
      if (sidebarContainer) {
        sidebarContainer.classList.remove("submenu-open");
        sidebarContainer.classList.remove("mega-open");
      }
    });

    // Also close on clicks INSIDE the overlay that don't hit nav items or submenus
    uiWrapper.addEventListener("click", function (e) {
      // Stop layout-switcher clicks from bubbling to document
      if (e.target.closest(".layout-switcher-wrapper")) {
        e.stopPropagation();
        return;
      }
      // Stop submenu clicks from bubbling and falsely triggering "close"
      if (e.target.closest(".nav-submenu")) {
        e.stopPropagation();
        return;
      }
    });

    // Glow reposition on window resize
    window.addEventListener("resize", () => {
      const activeItem = document.querySelector(".nav-item.active");
      if (activeItem) updateActiveGlow(activeItem);
      updateSwitcherUI();
    });

    // Inject global modals ONLY ONCE if not already present
    if (!document.getElementById("image-gallery-modal")) {
      document.body.insertAdjacentHTML("beforeend", globalModalsHTML);
    }
  }

  // ==========================================
  // PREMIUM HOTSPOT SYSTEM — Layout #1 Classic
  // ==========================================

  const ICON_INTERIOR = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`;
  const ICON_AMENITIES = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><circle cx="12" cy="8" r="4"/><path d="M12 12v8"/><path d="M8 16s1.5 2 4 2 4-2 4-2"/><path d="M6 20s2 2 6 2 6-2 6-2"/></svg>`;
  const ICON_HELICOPTER = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="M3 13h18"/><path d="M11 13V9"/><path d="M5 9h14"/><path d="M12 9V5"/><path d="M8 5h8"/><path d="M10 17h4"/><path d="M6 13c0 3 2 4 6 4s6-1 6-4"/><path d="M5 17h14"/></svg>`;

  function getHotspotIcon(category) {
    if (category === 'aerial') return ICON_HELICOPTER;
    return category === 'interior' ? ICON_INTERIOR : ICON_AMENITIES;
  }

  function createPremiumHotspot(pin) {
    const isBirdView = HOTSPOT_BIRD_VIEW_NODES.includes(activePanoNode);
    const isTopView  = HOTSPOT_TOP_VIEW_NODES.includes(activePanoNode);
    const isTopViewDay1 = activePanoNode === "node1";

    // ── Style classes ─────────────────────────────────────────────────────
    // TYPE A  → Top View Day 1 : hs-matterport-point (matterport ground marker)
    // TYPE B  → Top View Night : hs-aerial-point (glowing orb without label)
    // TYPE C  → Bird View      : hs-beacon (line-pin with always-visible label & icon)
    // TYPE D  → Interior / Amenities: hs-subtle (circle dot, soft pulse)
    let styleClass;
    if (isTopViewDay1) {
      styleClass = 'hs-matterport-point';
    } else if (isTopView) {
      styleClass = 'hs-aerial-point';
    } else if (isBirdView) {
      styleClass = 'hs-beacon';
    } else {
      styleClass = pin.category === 'aerial' ? 'hs-aerial' : 'hs-subtle';
    }

    const container = document.createElement('div');
    container.className = `hs-container hs-${pin.category} ${styleClass}`;
    container.id = `hs-${pin.id}`;
    container.setAttribute('aria-label', pin.title);
    container.setAttribute('tabindex', '0');
    container.setAttribute('role', 'button');

    if (isHotspotsHidden) {
      container.style.visibility = "hidden";
      container.style.opacity = "0";
    }

    if (pin.category === 'aerial') {
      // ══════════════════════════════════════════════════════════════════
      // ALL AERIAL HOTSPOTS (BIRD VIEW / TOP VIEW): Pure Helicopter Icon
      // ══════════════════════════════════════════════════════════════════
      container.innerHTML = `
        <div class="hs-scale-wrap">
          <div class="hs-pin-heli" style="display:flex; justify-content:center; align-items:center; width:28px; height:28px; background:linear-gradient(135deg, #00f2fe, #4facfe); border-radius:50%; box-shadow:0 0 12px rgba(0,242,254,0.8), inset 0 0 4px rgba(255,255,255,0.6); border:2px solid #fff; z-index:6; position:relative;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill="#ffffff" style="width:16px; height:16px;">
              <path d="M400 160V128H480C488.8 128 496 120.8 496 112V80C496 71.16 488.8 64 480 64H381.7L329.1 11.4C325 7.27 319.4 4.965 313.5 4.965H160C142.3 4.965 128 19.29 128 36.97V64H32C14.33 64 0 78.33 0 96V128C0 145.7 14.33 160 32 160H400zM616 192H24C10.75 192 0 202.7 0 216V232C0 245.3 10.75 256 24 256H55.45C58.33 283.6 81.65 304 110.1 304H168C198.9 304 224 278.9 224 248V240C224 231.2 231.2 224 240 224H400C408.8 224 416 231.2 416 240V248C416 278.9 441.1 304 472 304H529.9C558.4 304 581.7 283.6 584.6 256H616C629.3 256 640 245.3 640 232V216C640 202.7 629.3 192 616 192zM128 448H512C520.8 448 528 440.8 528 432V400C528 391.2 520.8 384 512 384H128C119.2 384 112 391.2 112 400V432C112 440.8 119.2 448 128 448z"/>
            </svg>
            <div class="hs-pulse-ring"></div>
          </div>
          <div class="hs-preview-card">
            <img src="${pin.thumb || 'preview.jpg'}" alt="${pin.title}" onerror="this.style.display='none'">
            <div class="hs-preview-content">
              <h4>${pin.title}</h4>
              <p>${pin.desc || 'Click to fly'}</p>
              <div class="hs-enter-btn">Click to Fly</div>
            </div>
          </div>
        </div>
      `;
    } else if (isTopViewDay1) {
      // ══════════════════════════════════════════════════════════════════
      // TYPE A — TOP VIEW DAY 1: Matterport-style Premium Ground Marker
      // ══════════════════════════════════════════════════════════════════
      const dotColorClass = pin.category === 'interior' ? 'hs-mp-blue'
                          : pin.category === 'amenities' ? 'hs-mp-green' : 'hs-mp-cyan';
      container.innerHTML = `
        <div class="hs-scale-wrap">
          <div class="hs-matterport-ground ${dotColorClass}">
            <div class="hs-mp-pulse"></div>
            <div class="hs-mp-inner"></div>
            <div class="hs-mp-ring"></div>
          </div>
          <div class="hs-mp-label">${pin.title}</div>
          <div class="hs-preview-card">
            <img src="${pin.thumb || 'preview.jpg'}" alt="${pin.title}" onerror="this.style.display='none'">
            <div class="hs-preview-content">
              <h4>${pin.title}</h4>
              <p>${pin.desc || 'Click to enter'}</p>
              <div class="hs-enter-btn">Click to Enter</div>
            </div>
          </div>
        </div>
      `;
    } else if (isTopView) {
      // ══════════════════════════════════════════════════════════════════
      // TYPE B — TOP VIEW NIGHT: Glowing orb without permanent text label
      // ══════════════════════════════════════════════════════════════════
      const orbClass = pin.category === 'interior' ? 'hs-orb-blue'
                     : pin.category === 'amenities' ? 'hs-orb-green' : 'hs-orb-cyan';
      container.innerHTML = `
        <div class="hs-scale-wrap">
          <div class="hs-glow-orb ${orbClass}">
            <div class="hs-orb-inner"></div>
            <div class="hs-orb-pulse"></div>
          </div>
          <div class="hs-preview-card">
            <img src="${pin.thumb || 'preview.jpg'}" alt="${pin.title}" onerror="this.style.display='none'">
            <div class="hs-preview-content">
              <h4>${pin.title}</h4>
              <p>${pin.desc || 'Click to enter'}</p>
              <div class="hs-enter-btn">Click to Enter</div>
            </div>
          </div>
        </div>
      `;
    } else if (isBirdView) {
      // ══════════════════════════════════════════════════════════════════
      // TYPE B — BIRD VIEW: Line-pin beacon with ALWAYS-VISIBLE label
      // ══════════════════════════════════════════════════════════════════
      const iconSvg = getHotspotIcon(pin.category);
      container.innerHTML = `
        <div class="hs-scale-wrap">
          <div class="hs-line-pin">
            <div class="hs-pin-text">
              <span class="hs-pin-icon">${iconSvg}</span>${pin.title}
            </div>
            <div class="hs-pin-line"></div>
            <div class="hs-pin-dot"></div>
          </div>
          <div class="hs-preview-card">
            <img src="${pin.thumb || 'preview.jpg'}" alt="${pin.title}" onerror="this.style.display='none'">
            <div class="hs-preview-content">
              <h4>${pin.title}</h4>
              <p>${pin.desc || 'Click to enter'}</p>
              <div class="hs-enter-btn">Click to Enter</div>
            </div>
          </div>
        </div>
      `;
    } else {
      // ══════════════════════════════════════════════════════════════════
      // TYPE C — INTERIOR / AMENITIES: Floor marker, soft pulse, small glow
      // ══════════════════════════════════════════════════════════════════
      container.innerHTML = `
        <div class="hs-scale-wrap">
          <div class="hs-circle">
            <div class="hs-circle-inner"></div>
            <div class="hs-pulse-soft"></div>
          </div>
          <div class="hs-subtle-hover">
            <div class="hs-subtle-title">${pin.title}</div>
            <div class="hs-subtle-enter">Click to Enter</div>
          </div>
        </div>
      `;
    }

    // Hover interactions
    container.addEventListener('mouseenter', () => {
      container.classList.add('hs-hovered');
    });
    container.addEventListener('mouseleave', () => {
      container.classList.remove('hs-hovered');
    });

    // Click — navigate
    const doNavigate = (e) => {
      e.stopPropagation();
      // Remove active from previous
      document.querySelectorAll('.hs-container.hs-active').forEach(el => el.classList.remove('hs-active'));
      container.classList.add('hs-active');
      activeHotspotId = pin.id;

      // Try matching mega-card first (keeps sidebar in sync)
      const megaCards = document.querySelectorAll('.mega-card');
      let found = false;
      megaCards.forEach(card => {
        if (!found && card.getAttribute('data-pano-node') === pin.nodeTarget) {
          found = true;
          card.click();
        }
      });
      if (!found && window.pano) {
        window.pano.openNext(`{${pin.nodeTarget}}`);
      }
    };
    container.addEventListener('click', doNavigate);
    container.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') doNavigate(e); });

    return container;
  }

  // Inject all hotspots for a given node
  function injectPremiumHotspots(nodeId) {
    if (!window.pano || typeof window.pano.addHotspot !== 'function') {
        console.error("[PremiumHotspot] window.pano or addHotspot is not available!");
        return;
    }
    currentHotspotElements = [];

    const defs = window.hotspotData[nodeId];
    if (!defs) {
        console.log(`[PremiumHotspot] No hotspot definitions found for node: ${nodeId}`);
        return;
    }

    console.log(`[PremiumHotspot] Found ${defs.length} hotspots for node ${nodeId}`);

    defs.forEach(pin => {
      let finalPan = pin.pan;
      let finalTilt = pin.tilt;
      const currentLayoutMode = lsGet("latien_layout_mode", "futuristic");
      if (currentLayoutMode === "classic") {
        if (pin.pan_classic !== undefined) finalPan = pin.pan_classic;
        if (pin.tilt_classic !== undefined) finalTilt = pin.tilt_classic;
      }
      const el = createPremiumHotspot(pin);
      window.pano.addHotspot(pin.id, finalPan, finalTilt, el);
      currentHotspotElements.push({ el, pan: finalPan, tilt: finalTilt, id: pin.id });
    });
    
    console.log(`[PremiumHotspot] Successfully injected ${currentHotspotElements.length} hotspots`);

    // After injecting, render minimap markers
    updateMinimapHotspots(nodeId);
  }

  // Update minimap overlay with hotspot markers (only in Classic layout)
  function updateMinimapHotspots(nodeId) {
    const canvas = document.getElementById('minimap-canvas');
    if (!canvas) return;
    const zoomWrapper = document.getElementById('minimap-zoom-wrapper') || canvas;

    // Remove old markers
    zoomWrapper.querySelectorAll('.mm-hs-marker').forEach(m => m.remove());
    canvas.querySelectorAll('.mm-hs-marker').forEach(m => m.remove());

    const isBirdView = window.HOTSPOT_BIRD_VIEW_NODES.includes(nodeId);
    const isTopView  = window.HOTSPOT_TOP_VIEW_NODES.includes(nodeId);
    let defsToShow = [];

    if (isBirdView) {
      // Bird View: show its own pins (navigation hub)
      defsToShow = window.hotspotData["node2"] || [];
    } else {
      // Top View & All Interiors: Always show the global navigation hotspots
      defsToShow = window.hotspotData["node1"] || [];
    }

    defsToShow.forEach(pin => {
      // Hardcoded manual coordinates based on the user's explicit drawn image dots
      const manualPositions = {
        "hs_street":    { x: 34.5, y: 45.0 },
        "hs_living2":   { x: 43.5, y: 45.5 },
        "hs_park":      { x: 48.5, y: 56.5 },
        "hs_wc":        { x: 59.0, y: 45.5 },
        "hs_living":    { x: 62.0, y: 57.0 },
        "hs_park2":     { x: 74.0, y: 42.5 },
        "hs_thongtang": { x: 86.5, y: 41.5 },
        "hs_birdview":  { x: 50, y: 20 },
        "hs_top":       { x: 50, y: 50 }
      };

      const lookupId = pin.id.replace(/_tv$/, '').replace(/_bv$/, '').replace(/_night$/, '');
      if (lookupId === 'hs_top' || lookupId === 'hs_topnight') return; // Do not render Aerial Top View shortcuts in minimap
      
      const pos = manualPositions[lookupId] || { x: 50, y: 50 };
      
      const posX = pos.x;
      const posY = pos.y;

      const marker = document.createElement('div');
      marker.className = `mm-luxury-hotspot`;
      
      // Highlight the active panorama
      if (pin.nodeTarget === nodeId || pin.id.replace(/_tv$/, '') === nodeId) {
        marker.classList.add('is-active');
      }

      // Add HTML structure with hover tooltip
      marker.innerHTML = `
        <div class="mm-tooltip">${pin.title}</div>
      `;

      marker.style.cssText += `left:${posX}%;top:${posY}%;`;

      marker.addEventListener('click', (e) => {
        e.stopPropagation();
        if (window.pano) window.pano.openNext(`{${pin.nodeTarget}}`);
      });

      zoomWrapper.appendChild(marker);
    });
  }

  // Update hotspot depth/visibility every rAF frame — called from syncCompass
  function updateHotspotVisibility() {
    if (!window.pano || currentHotspotElements.length === 0) return;
    try {
      const camPan  = window.pano.getPan()  || 0;
      const camTilt = window.pano.getTilt() || 0;
      const camFov  = window.pano.getFov()  || 90;

      let currentNode = '';
      try { currentNode = window.pano.getCurrentNode() || ''; } catch(e) {}

      const isTopView  = window.HOTSPOT_TOP_VIEW_NODES  && window.HOTSPOT_TOP_VIEW_NODES.includes(currentNode);
      const isBirdView = window.HOTSPOT_BIRD_VIEW_NODES && window.HOTSPOT_BIRD_VIEW_NODES.includes(currentNode);

      // Aspect ratio: assume 16:9 — horizontal FOV wider than vertical
      const hFov = camFov;            // horizontal field of view
      const vFov = camFov * (9 / 16); // vertical field of view approximation

      currentHotspotElements.forEach(({ el, pan, tilt }) => {
        // Angular distance from camera center to hotspot (wrap-around safe)
        let dPan = pan - camPan;
        while (dPan >  180) dPan -= 360;
        while (dPan < -180) dPan += 360;
        const dTilt = tilt - camTilt;

        if (isTopView) {
          // Top View (Nadir): camera rotates around vertical axis only.
          // All hotspots always remain visible regardless of pan.
          el.classList.add('hs-visible');
          el.style.opacity = '';
          return;
        }

        if (isBirdView) {
          // Bird View visibility zone:
          // Screen is divided into 6 equal columns — hotspots visible ONLY in the 2 center columns.
          // Center 2/6 = 1/3 of FOV → each side shows up to ±(FOV/6) from camera center.
          // A 15° smooth fade zone is applied just outside this boundary.
          const halfH = hFov / 6;       // ±FOV/6 from center (e.g. ±15° when FOV=90°)
          const halfV = vFov * 0.5;     // full vertical FOV kept as-is

          const FADE_ZONE = 15; // degrees of smooth fade beyond the boundary

          const absPan  = Math.abs(dPan);
          const absTilt = Math.abs(dTilt);

          // Fade factor: 0 = fully visible, 1 = fully hidden
          const fadePan  = Math.max(0, Math.min(1, (absPan  - halfH) / FADE_ZONE));
          const fadeTilt = Math.max(0, Math.min(1, (absTilt - halfV) / FADE_ZONE));

          // Take the worst axis — if either is outside the zone, start fading
          const fadeMax = Math.max(fadePan, fadeTilt);

          if (fadeMax >= 1) {
            // Fully outside — hidden
            el.classList.remove('hs-visible');
            el.style.opacity = '';
          } else if (fadeMax > 0) {
            // In fade zone — smooth transition
            el.classList.add('hs-visible');
            el.style.opacity = String(1 - fadeMax);
          } else {
            // Fully inside center zone — visible
            el.classList.add('hs-visible');
            el.style.opacity = '';
          }
          return;
        }

        // Interior / Amenities nodes: hide when hotspot is clearly off-screen
        const hideThreshold = 75;
        if (Math.abs(dPan) > hideThreshold || Math.abs(dTilt) > hideThreshold) {
          el.classList.remove('hs-visible');
          el.style.opacity = '';
        } else {
          el.classList.add('hs-visible');
          el.style.opacity = '';
        }
      });
    } catch (e) {}
  }

  // Legacy stub — kept for backward compat with other layouts calling createHologramMarker
  function createHologramMarker(pin) {
    const container = document.createElement('div');
    container.className = `hologram-marker-container ${pin.colorClass || ''}`;
    container.id = `marker-${pin.id}`;
    container.innerHTML = `<div class="hotspot-hitbox"></div><div class="hotspot-marker"></div><div class="hotspot-label">${pin.title}</div>`;
    container.addEventListener('click', (e) => {
      e.stopPropagation();
      if (window.pano) window.pano.openNext(`{${pin.nodeTarget}}`);
    });
    return container;
  }

  // Sync active state with pano node, respecting current active parent category
  function syncStateWithNode(nodeId) {
    activePanoNode = nodeId;
    lsSet("latien_active_node", nodeId);

    // Highlight mega-cards whose data-pano-node === nodeId
    const megaCards = document.querySelectorAll(".mega-card");
    megaCards.forEach(card => {
      const pNode = card.getAttribute("data-pano-node");
      if (pNode === nodeId) {
        const siblings = card.parentElement.querySelectorAll(".mega-card");
        siblings.forEach(s => s.classList.remove("active"));
        card.classList.add("active");

        const action = card.getAttribute("data-action");
        if (action) {
          activeSubmenuAction = action;
          lsSet("latien_active_submenu", action);
        }

        // Activate the parent nav item (latien-brand)
        const parentNav = card.closest(".nav-item");
        if (parentNav) {
          const navItems = document.querySelectorAll(".nav-item");
          navItems.forEach(n => n.classList.remove("active"));
          parentNav.classList.add("active");
          activeNavItemId = parentNav.getAttribute("data-id");
          lsSet("latien_active_nav", activeNavItemId);
          updateActiveGlow(parentNav);
        }
      }
    });

    // Sync Quick Navigation Panel active state
    const qnItems = document.querySelectorAll(".quick-nav-item");
    if (qnItems.length > 0) {
      qnItems.forEach(item => {
        if (item.getAttribute("data-pano-node") === nodeId) {
          item.classList.add("active");
          // Auto-expand the parent category so user can see which node is active
          const parentBody = item.closest(".quick-nav-cat-body");
          const parentHeader = parentBody ? parentBody.previousElementSibling : null;
          if (parentBody && parentHeader) {
            // Collapse all categories first
            document.querySelectorAll(".quick-nav-cat-body").forEach(b => b.style.display = "none");
            document.querySelectorAll(".quick-nav-cat-header").forEach(h => h.classList.remove("expanded"));
            // Open the active one
            parentBody.style.display = "block";
            parentHeader.classList.add("expanded");
          }
        } else {
          item.classList.remove("active");
        }
      });
    }

    // Sync Classic bottom nav submenu-item active state
    const subMenuItems = document.querySelectorAll(".layout-classic .submenu-item");
    subMenuItems.forEach(item => {
      if (item.getAttribute("data-pano-node") === nodeId) {
        item.classList.add("active");
        // Also mark parent nav-item as active
        const parentNav = item.closest(".nav-item");
        if (parentNav) {
          document.querySelectorAll(".layout-classic .nav-item").forEach(n => n.classList.remove("active"));
          parentNav.classList.add("active");
          updateActiveGlow(parentNav);
        }
      } else {
        item.classList.remove("active");
      }
    });

    // Sync Regal navigation
    const blueprintNavItems = document.querySelectorAll(".layout-regal .rgl-neo-nav-module, .layout-regal .rgl-neo-sub-item");
    blueprintNavItems.forEach(item => {
      if (item.getAttribute("data-pano-node") === nodeId) {
        item.classList.add("active");
        const parentNav = item.closest(".rgl-neo-nav-module");
        if (parentNav && parentNav !== item) {
          parentNav.classList.add("active");
        }
      } else {
        item.classList.remove("active");
      }
    });

    const regalTitleEl = document.getElementById("regal-current-pano-title");
    if (regalTitleEl) {
      const activeSubmenuItem = document.querySelector(".layout-regal .blueprint-submenu-item.active");
      const activeNavItem = document.querySelector(".layout-regal .blueprint-nav-item.active:not(.has-submenu) .blueprint-nav-text");
      
      let titleText = "";
      if (activeSubmenuItem) {
        titleText = activeSubmenuItem.textContent;
      } else if (activeNavItem) {
        titleText = activeNavItem.textContent;
      }
      
      regalTitleEl.textContent = titleText.replace('+', '').trim();
    }
  }

  function onNodeChange() {
    if (!window.pano) return;
    // Use correct Pano2VR API: getCurrentNode() not qd() (qd = getDFov)
    const currentNodeId = (typeof window.pano.getCurrentNode === 'function')
      ? window.pano.getCurrentNode()
      : window.pano.qd();
    
    console.log(`[PremiumHotspot] onNodeChange triggered. currentNodeId = ${currentNodeId}`);
    
    if (!currentNodeId) return;

    syncStateWithNode(currentNodeId);
    updateMinimapPosition(currentNodeId);

    // Clear old hotspots every node change
    currentHotspotElements = [];
    if (typeof window.pano.removeHotspots === 'function') {
      window.pano.removeHotspots();
    }

    // === PREMIUM HOTSPOT SYSTEM ===
    // Hotspots are now injected into ALL layouts
    const isPremiumLayout = true;
    
    if (isPremiumLayout) {
      console.log(`[PremiumHotspot] layoutMode = ${layoutMode}, HasHotspots = ${!!window.hotspotData[currentNodeId]}`);
      if (window.hotspotData && window.hotspotData[currentNodeId]) {
        console.log(`[PremiumHotspot] Injecting hotspots for node ${currentNodeId}`);
        injectPremiumHotspots(currentNodeId);
      }
    }
    
    // Always update minimap for all layouts to keep markers synchronized
    updateMinimapHotspots(currentNodeId);

    // Sync Command layout (#11) active states when node changes
    if (layoutMode === 'command') {
      syncCommandTimeline(currentNodeId);
    }
  }


  function initPanoHooks() {
    if (window.pano && typeof window.pano.addListener === 'function') {
      console.log("Pano2VR Player ready. Attaching event hooks...");
      window.pano.addListener("configloaded", onNodeChange);
      window.pano.addListener("changenode", onNodeChange);
      onNodeChange();
      
      // Start compass/minimap synchronization loop
      if (!compassAnimFrame) {
        syncCompass();
      }
    } else {
      setTimeout(initPanoHooks, 200);
    }
  }

// GLOBAL UI COMPONENTS & EVENT LISTENERS
// =========================================================

const globalModalsHTML = `
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
          <p>Hotline: <strong>090 123 4567</strong></p>
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
        <a href="tel:0901234567" style="display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #00f2fe, #4facfe); color: #fff; text-decoration: none; border-radius: 24px; font-weight: bold; font-size: 18px; box-shadow: 0 4px 15px rgba(0,242,254,0.3);">090 123 4567</a>
        <p style="margin-top: 16px; font-size: 13px; color: #aaa;">Hỗ trợ tư vấn 24/7</p>
      </div>
    </div>
  </div>

  <!-- 3. Social Share Floating Menu -->
  <div class="social-share-menu" id="social-share-menu">
    <a href="https://www.facebook.com" target="_blank" class="social-btn facebook"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></a>
    <a href="https://www.instagram.com" target="_blank" class="social-btn instagram"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98C23.986 15.668 24 15.259 24 12c0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg></a>
    <a href="https://zalo.me" target="_blank" class="social-btn zalo"><svg viewBox="0 0 40 40" fill="currentColor"><path d="M20 0C8.955 0 0 8.954 0 20c0 11.045 8.955 20 20 20s20-8.955 20-20C40 8.954 31.045 0 20 0zm9.09 28.182c-1.091 1.09-2.273 1.636-3.636 1.636-.727 0-1.454-.182-2.09-.455l-5.91 2.364.91-5.273c-1.636-1.454-2.637-3.545-2.637-5.818 0-4.364 3.546-7.909 7.91-7.909 4.363 0 7.909 3.545 7.909 7.909 0 2.909-1.546 5.454-4 6.909l1.544 .637z"/></svg></a>
  </div>
`;

document.addEventListener("DOMContentLoaded", function() {
  // Global modals are already injected by injectUI() during initialization.

  // Global Click Event Delegation
  document.addEventListener("click", function(e) {
    
    // 1. Fullscreen
    if (e.target.closest('[data-action="fullscreen"]')) {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
          console.error("Error attempting to enable full-screen mode:", err.message);
        });
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
      return;
    }

    // 2. Project Info
    if (e.target.closest('[data-action="info"]')) {
      const btn = e.target.closest('[data-action="info"]');
      if (btn) {
        btn.classList.add('active-tool');
        setTimeout(() => btn.classList.remove('active-tool'), 300);
      }
      const modal = document.getElementById('project-info-modal');
      if (modal) modal.classList.add('active');
      return;
    }

    // Hotspots Toggle
    if (e.target.closest('[data-action="hotspots"]')) {
      const btn = e.target.closest('[data-action="hotspots"]');
      btn.classList.toggle('active-tool');
      const isVisible = btn.classList.contains('active-tool');
      
      // CSS approach
      document.body.classList.toggle('hide-hotspots', !isVisible);
      
      // Pano2VR API approach
      if (window.pano) {
        if (typeof window.pano.setPointHotspotsVisible === 'function') {
           window.pano.setPointHotspotsVisible(isVisible);
        }
      }
      return;
    }

    // Music Toggle
    if (e.target.closest('[data-action="music"]')) {
      const btn = e.target.closest('[data-action="music"]');
      btn.classList.toggle('active-tool');
      const isPlaying = btn.classList.contains('active-tool');
      if (window.pano && typeof window.pano.setVolume === 'function') {
         window.pano.setVolume(isPlaying ? 1 : 0);
      }
      return;
    }


    // 3. Image Gallery
    if (e.target.closest('[data-action="images"]')) {
      if (typeof window.openGlobalPanoramaGallery === "function") {
        window.openGlobalPanoramaGallery();
      }
      return;
    }

    // 4. Social Share
    if (e.target.closest('[data-action="share"]')) {
      e.stopPropagation();
      const menu = document.getElementById('social-share-menu');
      if (menu) {
        const btn = e.target.closest('[data-action="share"]');
        const rect = btn.getBoundingClientRect();
        
        // Position menu near the button
        menu.style.bottom = (window.innerHeight - rect.top + 10) + 'px';
        menu.style.left = rect.left + 'px';
        
        menu.classList.toggle('active');
      }
      return;
    }

    // 7. Contact Info Call
    if (e.target.closest('[data-action="call"]')) {
      window.open('https://tav.vn/', '_blank');
      return;
    }

    // 5. Close Menus on outside click
    const shareMenu = document.getElementById('social-share-menu');
    if (shareMenu && shareMenu.classList.contains('active')) {
      shareMenu.classList.remove('active');
    }

    const qnPanel = document.getElementById("quick-nav-panel");
    if (qnPanel && !qnPanel.classList.contains("collapsed")) {
      qnPanel.classList.add("collapsed");
    }

    // 6. Close Submenus on outside click (Gradient & Neo & Classic & Futuristic)
    const navItems = document.querySelectorAll('.nav-item, .gradient-nav-item, .neo-nav-card');
    let clickedNav = false;
    navItems.forEach(item => {
      if (item.contains(e.target)) clickedNav = true;
    });

    if (!clickedNav) {
      document.querySelectorAll('.is-open').forEach(el => el.classList.remove('is-open'));
      const neoPanel = document.getElementById('neo-submenu-panel');
      if (neoPanel) neoPanel.classList.remove('open');
    }

    
    // Gradient Dock Submenu click toggle
    const dockParent = e.target.closest('.has-dock-submenu');
    if (dockParent && !e.target.closest('.dock-submenu')) {
      const wasOpen = dockParent.classList.contains('is-open');
      document.querySelectorAll('.has-dock-submenu').forEach(el => el.classList.remove('is-open'));
      if (!wasOpen) dockParent.classList.add('is-open');
    }
    
    // Close dock submenu if clicked outside
    if (!e.target.closest('.has-dock-submenu')) {
      document.querySelectorAll('.has-dock-submenu').forEach(el => el.classList.remove('is-open'));
    }

    // Gradient Nav Item toggle click logic
    const gradientItem = e.target.closest('.gradient-nav-item');
    if (gradientItem && !e.target.closest('.submenu-item')) {
      const wasOpen = gradientItem.classList.contains('is-open');
      document.querySelectorAll('.gradient-nav-item').forEach(el => el.classList.remove('is-open'));
      if (!wasOpen) gradientItem.classList.add('is-open');
    }
  });
})
    // Left Toolbar Hover & Pin Logic
    const toolbarTrigger = document.getElementById("gradient-toolbar-trigger");
    const toolbarWrapper = document.getElementById("gradient-toolbar-wrapper");
    if (toolbarTrigger && toolbarWrapper) {
      // Clean up old classes
      toolbarWrapper.classList.remove("collapsed");
      
      toolbarWrapper.addEventListener("mouseenter", () => {
        toolbarWrapper.classList.add("hover-open");
      });
      toolbarWrapper.addEventListener("mouseleave", () => {
        toolbarWrapper.classList.remove("hover-open");
      });
      toolbarTrigger.addEventListener("click", (e) => {
        e.stopPropagation(); // prevent document click from firing immediately
        toolbarWrapper.classList.toggle("pinned");
      });
    }
    ;


// ==========================================
// GLOBAL PANORAMA GALLERY MODAL
// ==========================================
const globalPanoramasList = [
  { id: 'gallery1', title: 'Gallery 01', src: 'image/GALLERY 01.jpg', thumb: 'image/thumbnails/GALLERY 01.jpg' },
  { id: 'gallery2', title: 'Gallery 02', src: 'image/GALLERY 02.jpg', thumb: 'image/thumbnails/GALLERY 02.jpg' },
  { id: 'gallery3', title: 'Gallery 03', src: 'image/GALLERY 03.jpg', thumb: 'image/thumbnails/GALLERY 03.jpg' },
  { id: 'gallery4', title: 'Gallery 04', src: 'image/GALLERY 04.jpg', thumb: 'image/thumbnails/GALLERY 04.jpg' },
  { id: 'gallery5', title: 'Gallery 05', src: 'image/GALLERY 05.jpg', thumb: 'image/thumbnails/GALLERY 05.jpg' },
  { id: 'gallery6', title: 'Gallery 06', src: 'image/GALLERY 06.jpg', thumb: 'image/thumbnails/GALLERY 06.jpg' },
  { id: 'gallery7', title: 'Gallery 07', src: 'image/GALLERY 07.jpg', thumb: 'image/thumbnails/GALLERY 07.jpg' },
  { id: 'gallery8', title: 'Gallery 08', src: 'image/GALLERY 08.jpg', thumb: 'image/thumbnails/GALLERY 08.jpg' }
];

let gpgCurrentIndex = 0;
let gpgAutoSlideInterval = null;
let gpgInactivityTimeout = null;

function initGlobalPanoramaGallery() {
  if (document.getElementById('global-pano-gallery')) return;
  
  const overlay = document.createElement('div');
  overlay.id = 'global-pano-gallery';
  overlay.className = 'global-pano-gallery-overlay';
  
  let slidesHTML = '';
  let thumbsHTML = '';
  
  globalPanoramasList.forEach((pano, index) => {
    slidesHTML += `
      <div class="gpg-slide" data-index="${index}">
        <img src="${pano.thumb}" data-src="${pano.src}" alt="${pano.title}" class="gpg-lazy-img">
        <div class="gpg-slide-overlay">
          <div class="gpg-slide-title">${pano.title}</div>
          <div class="gpg-slide-hint">Click để xem toàn màn hình</div>
        </div>
      </div>
    `;
    thumbsHTML += `
      <div class="gpg-thumb" data-index="${index}">
        <img src="${pano.thumb}" alt="${pano.title}" loading="lazy">
      </div>
    `;
  });

  overlay.innerHTML = `
    <div class="gpg-header">
      <div class="gpg-header-title">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
        Thư Viện Hình Ảnh
      </div>
      <div class="gpg-counter" id="gpg-counter">1 / ${globalPanoramasList.length}</div>
      <div class="gpg-close-btn" id="gpg-close">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 6L6 18M6 6l12 12"></path>
        </svg>
      </div>
    </div>
    
    <div class="gpg-main-view" id="gpg-main-view">
      <div class="gpg-slide-container" id="gpg-slide-container">
        ${slidesHTML}
      </div>
      <div class="gpg-nav-btn gpg-prev" id="gpg-prev">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M15 18l-6-6 6-6"></path>
        </svg>
      </div>
      <div class="gpg-nav-btn gpg-next" id="gpg-next">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 18l6-6-6-6"></path>
        </svg>
      </div>
    </div>
    
    <div class="gpg-thumbnails-wrapper">
      <div class="gpg-thumbnails" id="gpg-thumbnails">
        ${thumbsHTML}
      </div>
    </div>

    <!-- Fullscreen Lightbox -->
    <div class="gpg-lightbox" id="gpg-lightbox">
      <div class="gpg-lightbox-close" id="gpg-lightbox-close">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
      </div>
      <img class="gpg-lightbox-img" id="gpg-lightbox-img" src="" alt="">
    </div>
  `;
  
  document.body.appendChild(overlay);
  
  // Event Listeners
  document.getElementById('gpg-close').addEventListener('click', closeGlobalPanoramaGallery);
  
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeGlobalPanoramaGallery();
  });

  // Lightbox
  const lightbox = document.getElementById('gpg-lightbox');
  const lightboxImg = document.getElementById('gpg-lightbox-img');
  document.getElementById('gpg-lightbox-close').addEventListener('click', () => lightbox.classList.remove('active'));
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) lightbox.classList.remove('active'); });
  
  document.getElementById('gpg-prev').addEventListener('click', () => {
    navigateGlobalGallery(-1);
    resetGpgInactivity();
  });
  
  document.getElementById('gpg-next').addEventListener('click', () => {
    navigateGlobalGallery(1);
    resetGpgInactivity();
  });
  
  const thumbs = overlay.querySelectorAll('.gpg-thumb');
  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      goToGlobalGallerySlide(parseInt(thumb.getAttribute('data-index')));
      resetGpgInactivity();
    });
  });
  
  // Slide click → open fullscreen lightbox
  const slides = overlay.querySelectorAll('.gpg-slide');
  slides.forEach(slide => {
    slide.addEventListener('click', () => {
      const idx = parseInt(slide.getAttribute('data-index'));
      const src = globalPanoramasList[idx].src;
      const title = globalPanoramasList[idx].title;
      lightboxImg.src = src;
      lightboxImg.alt = title;
      lightbox.classList.add('active');
      stopGpgAutoSlide();
    });
  });
  
  // Swipe & Drag support
  const mainView = document.getElementById('gpg-main-view');
  let startX = 0;
  let currentX = 0;
  let isDragging = false;
  
  const touchStart = (e) => {
    startX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    isDragging = true;
    resetGpgInactivity();
  };
  
  const touchMove = (e) => {
    if (!isDragging) return;
    currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
  };
  
  const touchEnd = () => {
    if (!isDragging) return;
    isDragging = false;
    const diff = startX - currentX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) navigateGlobalGallery(1);
      else navigateGlobalGallery(-1);
    }
  };
  
  mainView.addEventListener('touchstart', touchStart, {passive: true});
  mainView.addEventListener('touchmove', touchMove, {passive: true});
  mainView.addEventListener('touchend', touchEnd);
  
  mainView.addEventListener('mousedown', touchStart);
  window.addEventListener('mousemove', touchMove);
  window.addEventListener('mouseup', touchEnd);
  
  document.addEventListener('keydown', handleGpgKeyboard);
}

function handleGpgKeyboard(e) {
  const overlay = document.getElementById('global-pano-gallery');
  if (!overlay || !overlay.classList.contains('active')) return;
  
  if (e.key === 'Escape') {
    closeGlobalPanoramaGallery();
  } else if (e.key === 'ArrowLeft') {
    navigateGlobalGallery(-1);
    resetGpgInactivity();
  } else if (e.key === 'ArrowRight') {
    navigateGlobalGallery(1);
    resetGpgInactivity();
  }
}

function updateGlobalGalleryUI() {
  const container = document.getElementById('gpg-slide-container');
  if (!container) return;
  
  // Slide transform
  container.style.transform = `translateX(-${gpgCurrentIndex * 100}%)`;

  // Update counter
  const counter = document.getElementById('gpg-counter');
  if (counter) counter.textContent = `${gpgCurrentIndex + 1} / ${globalPanoramasList.length}`;
  
  // Active slide class and Lazy Loading
  document.querySelectorAll('.gpg-slide').forEach((slide, idx) => {
    const isActive = idx === gpgCurrentIndex;
    slide.classList.toggle('active', isActive);
    
    // Lazy-load active and adjacent slides to prevent lag
    if (isActive || idx === (gpgCurrentIndex + 1) % globalPanoramasList.length || idx === (gpgCurrentIndex - 1 + globalPanoramasList.length) % globalPanoramasList.length) {
      const img = slide.querySelector('.gpg-lazy-img');
      if (img && img.dataset.src) {
        img.src = img.dataset.src;
        img.removeAttribute('data-src'); // Prevent re-loading
      }
    }
  });
  
  // Active thumb class
  const thumbsContainer = document.getElementById('gpg-thumbnails');
  document.querySelectorAll('.gpg-thumb').forEach((thumb, idx) => {
    thumb.classList.toggle('active', idx === gpgCurrentIndex);
    if (idx === gpgCurrentIndex && thumbsContainer) {
      const thumbRect = thumb.getBoundingClientRect();
      const containerRect = thumbsContainer.getBoundingClientRect();
      if (thumbRect.left < containerRect.left || thumbRect.right > containerRect.right) {
        thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  });
}

function navigateGlobalGallery(direction) {
  let nextIndex = gpgCurrentIndex + direction;
  if (nextIndex < 0) nextIndex = globalPanoramasList.length - 1;
  if (nextIndex >= globalPanoramasList.length) nextIndex = 0;
  goToGlobalGallerySlide(nextIndex);
}

function goToGlobalGallerySlide(index) {
  gpgCurrentIndex = index;
  updateGlobalGalleryUI();
}

function startGpgAutoSlide() {
  stopGpgAutoSlide();
  gpgAutoSlideInterval = setInterval(() => {
    navigateGlobalGallery(1);
  }, 4500);
}

function stopGpgAutoSlide() {
  if (gpgAutoSlideInterval) {
    clearInterval(gpgAutoSlideInterval);
    gpgAutoSlideInterval = null;
  }
}

function resetGpgInactivity() {
  stopGpgAutoSlide();
  if (gpgInactivityTimeout) clearTimeout(gpgInactivityTimeout);
  gpgInactivityTimeout = setTimeout(() => {
    startGpgAutoSlide();
  }, 5000);
}

window.openGlobalPanoramaGallery = function() {
  initGlobalPanoramaGallery();
  const overlay = document.getElementById('global-pano-gallery');
  if (overlay) {
    overlay.classList.add('active');
    goToGlobalGallerySlide(0);
    startGpgAutoSlide();
  }
};

function closeGlobalPanoramaGallery() {
  const overlay = document.getElementById('global-pano-gallery');
  if (overlay) {
    overlay.classList.remove('active');
    stopGpgAutoSlide();
  }
}

// =========================================================
// PREMIUM ADAPTIVE SCENE CAROUSEL
// =========================================================

class PremiumSceneCarousel {
  constructor() {
    this.scenes = window.TAV_SCENES || [];
    this.currentIndex = 0;
    this.isAnimating = false;
    
    // DOM Elements
    this.container = document.getElementById('premium-scene-carousel');
    this.track = document.getElementById('pc-track');
    this.prevBtn = document.getElementById('pc-prev');
    this.nextBtn = document.getElementById('pc-next');
    this.allViewsBtn = document.getElementById('pc-all-views');
    
    // Browser Modal Elements
    this.browserModal = document.getElementById('premium-scene-browser');
    this.browserOverlay = document.getElementById('psb-overlay');
    this.browserClose = document.getElementById('psb-close');
    this.browserGrid = document.getElementById('psb-grid');
    this.browserFilters = document.getElementById('psb-filters');
    this.browserSearch = document.getElementById('psb-search');
    
    if (!this.container || !this.track) return;
    
    this.init();
  }
  
  init() {
    this.renderCarousel();
    this.setupEventListeners();
    this.buildBrowser();
  }
  
  getWrappedIndex(index) {
    const len = this.scenes.length;
    return (index % len + len) % len;
  }
  
  renderCarousel() {
    this.track.innerHTML = '';
    
    // Render 5 cards to allow smooth sliding from off-screen
    const indices = [
      this.getWrappedIndex(this.currentIndex - 2),
      this.getWrappedIndex(this.currentIndex - 1),
      this.currentIndex,
      this.getWrappedIndex(this.currentIndex + 1),
      this.getWrappedIndex(this.currentIndex + 2)
    ];
    
    indices.forEach((sceneIndex, i) => {
      const scene = this.scenes[sceneIndex];
      // i=0 (far left), i=1 (left), i=2 (center), i=3 (right), i=4 (far right)
      let positionClass = 'pc-card-hidden';
      if (i === 1) positionClass = 'pc-card-prev';
      if (i === 2) positionClass = 'pc-card-center';
      if (i === 3) positionClass = 'pc-card-next';
      
      const card = document.createElement('div');
      card.className = `pc-card ${positionClass}`;
      card.dataset.index = sceneIndex;
      
      const hasThumb = scene.thumb && scene.thumb.length > 0;
      const thumbStyle = hasThumb ? `background-image: url('${scene.thumb}');` : `background-color: ${scene.color || '#333'};`;
      
      card.innerHTML = `
        <div class="pc-card-thumb" style="${thumbStyle}"></div>
        <div class="pc-card-info">
          <div class="pc-card-title">${scene.title}</div>
          ${scene.sub ? `<div class="pc-card-sub">${scene.sub}</div>` : ''}
        </div>
        ${i === 2 ? '<div class="pc-card-active-glow"></div>' : ''}
      `;
      
      card.addEventListener('click', () => {
        if (this.isAnimating) return;
        if (i === 1) this.navigate(-1);
        else if (i === 3) this.navigate(1);
        else if (i === 2) this.triggerScene(scene);
      });
      
      this.track.appendChild(card);
    });
  }
  
  navigate(direction) {
    if (this.isAnimating) return;
    this.isAnimating = true;
    
    // Smooth class transitions on existing cards
    const cards = Array.from(this.track.children); // 5 cards
    if (cards.length === 5) {
      if (direction > 0) {
        // Next: everything shifts left
        cards[0].className = 'pc-card pc-card-hidden'; // far left stays hidden
        cards[1].className = 'pc-card pc-card-hidden'; // left becomes far left
        cards[2].className = 'pc-card pc-card-prev';   // center becomes left
        cards[3].className = 'pc-card pc-card-center'; // right becomes center
        cards[4].className = 'pc-card pc-card-next';   // far right becomes right
      } else {
        // Prev: everything shifts right
        cards[0].className = 'pc-card pc-card-prev';   // far left becomes left
        cards[1].className = 'pc-card pc-card-center'; // left becomes center
        cards[2].className = 'pc-card pc-card-next';   // center becomes right
        cards[3].className = 'pc-card pc-card-hidden'; // right becomes far right
        cards[4].className = 'pc-card pc-card-hidden'; // far right stays hidden
      }
    }
    
    // Enable track sliding
    this.track.style.transition = 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
    this.track.classList.add(`sliding-${direction > 0 ? 'next' : 'prev'}`);
    
    setTimeout(() => {
      // Jump to new state instantly without animation
      this.track.style.transition = 'none';
      this.currentIndex = this.getWrappedIndex(this.currentIndex + direction);
      this.renderCarousel();
      this.track.classList.remove('sliding-next', 'sliding-prev');
      
      // Auto-trigger the panorama if needed
      const scene = this.scenes[this.currentIndex];
      this.triggerScene(scene);
      
      // Force reflow
      void this.track.offsetWidth;
      this.track.style.transition = ''; // Let CSS handle it
      
      setTimeout(() => { this.isAnimating = false; }, 20);
    }, 300); // Wait for transition to complete
  }
  
  triggerScene(scene) {
    if (!scene || !scene.action) return;
    const action = scene.action;
    
    if (action.startsWith('node')) {
      if (typeof window.pano !== 'undefined' && window.pano.openNext) {
        window.pano.openNext('{' + action + '}');
        
        if (typeof window.activePanoNode !== 'undefined') window.activePanoNode = action;
        if (typeof window.lsSet === 'function') window.lsSet('latien_active_node', action);
        if (typeof window.syncCommandTimeline === 'function') window.syncCommandTimeline(action);
        if (typeof window.showNotification === 'function') window.showNotification(`Đang chuyển đến: ${scene.title}`);
        
        const label = document.getElementById('cmd-scene-name');
        if (label) label.textContent = scene.title;
      } else {
        console.log("Trigger pano node:", action);
      }
    } else {
      const mockItem = document.createElement('div');
      mockItem.setAttribute('data-action', action);
      if (typeof window.routeNavigation === 'function') {
        window.routeNavigation(mockItem);
      } else {
        console.log("Trigger custom action:", action);
      }
    }
  }
  
  setupEventListeners() {
    this.prevBtn.addEventListener('click', () => this.navigate(-1));
    this.nextBtn.addEventListener('click', () => this.navigate(1));
    
    // Keyboard (bind once)
    if (!window._premiumCarouselKeyBound) {
      document.addEventListener('keydown', (e) => {
        if (!window.premiumCarouselInstance) return;
        if (e.key === 'ArrowLeft') window.premiumCarouselInstance.navigate(-1);
        if (e.key === 'ArrowRight') window.premiumCarouselInstance.navigate(1);
      });
      window._premiumCarouselKeyBound = true;
    }
    
    // Mouse wheel on carousel
    this.container.addEventListener('wheel', (e) => {
      e.preventDefault();
      if (e.deltaY > 0) this.navigate(1);
      else if (e.deltaY < 0) this.navigate(-1);
    });
    
    // Swipe
    let touchStartX = 0;
    this.container.addEventListener('touchstart', e => touchStartX = e.changedTouches[0].screenX);
    this.container.addEventListener('touchend', e => {
      const touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 50) this.navigate(1);
      if (touchEndX - touchStartX > 50) this.navigate(-1);
    });
    
    // Browser
    this.allViewsBtn.addEventListener('click', () => this.openBrowser());
    this.browserClose.addEventListener('click', () => this.closeBrowser());
    this.browserOverlay.addEventListener('click', () => this.closeBrowser());
    
    this.browserSearch.addEventListener('input', (e) => this.filterBrowser(e.target.value));
  }
  
  // Browser logic
  buildBrowser() {
    if (!this.browserGrid) return;
    this.browserGrid.innerHTML = '';
    
    const categories = new Set();
    
    this.scenes.forEach((scene, i) => {
      if (scene.category) categories.add(scene.category);
      
      const thumb = document.createElement('div');
      thumb.className = 'psb-item';
      thumb.dataset.title = scene.title.toLowerCase();
      thumb.dataset.category = scene.category || '';
      
      const hasThumb = scene.thumb && scene.thumb.length > 0;
      const thumbStyle = hasThumb ? `background-image: url('${scene.thumb}');` : `background-color: ${scene.color || '#333'};`;
      
      thumb.innerHTML = `
        <div class="psb-item-thumb" style="${thumbStyle}"></div>
        <div class="psb-item-title">${scene.title}</div>
      `;
      
      thumb.addEventListener('click', () => {
        this.currentIndex = i;
        this.renderCarousel();
        this.triggerScene(scene);
        this.closeBrowser();
      });
      
      this.browserGrid.appendChild(thumb);
    });
    
    // Build filters
    if (this.browserFilters) {
      this.browserFilters.innerHTML = '<button class="psb-filter active" data-filter="all">All</button>';
      categories.forEach(cat => {
        this.browserFilters.innerHTML += `<button class="psb-filter" data-filter="${cat}">${cat}</button>`;
      });
      
      this.browserFilters.querySelectorAll('.psb-filter').forEach(btn => {
        btn.addEventListener('click', (e) => {
          this.browserFilters.querySelectorAll('.psb-filter').forEach(b => b.classList.remove('active'));
          e.target.classList.add('active');
          this.filterBrowser(this.browserSearch.value, e.target.dataset.filter);
        });
      });
    }
  }
  
  filterBrowser(searchTerm, category = 'all') {
    const term = searchTerm.toLowerCase();
    const activeCat = category === 'all' 
      ? (this.browserFilters.querySelector('.psb-filter.active')?.dataset.filter || 'all') 
      : category;
      
    this.browserGrid.querySelectorAll('.psb-item').forEach(item => {
      const matchSearch = item.dataset.title.includes(term);
      const matchCat = activeCat === 'all' || item.dataset.category === activeCat;
      item.style.display = (matchSearch && matchCat) ? 'block' : 'none';
    });
  }
  
  openBrowser() {
    this.browserModal.classList.add('active');
  }
  
  closeBrowser() {
    this.browserModal.classList.remove('active');
  }
}

window.initPremiumCarousel = function() {
  if (window.premiumCarouselInstance) {
    const container = document.getElementById('premium-scene-carousel');
    if (container) {
      window.premiumCarouselInstance.container = container;
      window.premiumCarouselInstance.track = document.getElementById('pc-track');
      window.premiumCarouselInstance.prevBtn = document.getElementById('pc-prev');
      window.premiumCarouselInstance.nextBtn = document.getElementById('pc-next');
      window.premiumCarouselInstance.allViewsBtn = document.getElementById('pc-all-views');
      
      window.premiumCarouselInstance.browserModal = document.getElementById('premium-scene-browser');
      window.premiumCarouselInstance.browserOverlay = document.getElementById('psb-overlay');
      window.premiumCarouselInstance.browserClose = document.getElementById('psb-close');
      window.premiumCarouselInstance.browserGrid = document.getElementById('psb-grid');
      window.premiumCarouselInstance.browserFilters = document.getElementById('psb-filters');
      window.premiumCarouselInstance.browserSearch = document.getElementById('psb-search');
      
      window.premiumCarouselInstance.init();
    }
  } else {
    window.premiumCarouselInstance = new PremiumSceneCarousel();
  }
};

// =========================================================
// BOOTSTRAP INITIALIZATION
// =========================================================

if (document.readyState === "complete" || document.readyState === "interactive") {
  if (typeof injectUI === "function") injectUI();
  if (typeof initPanoHooks === "function") initPanoHooks();
  if (typeof initPremiumCarousel === "function") initPremiumCarousel();
} else {
  window.addEventListener("DOMContentLoaded", () => {
    if (typeof injectUI === "function") injectUI();
    if (typeof initPanoHooks === "function") initPanoHooks();
    if (typeof initPremiumCarousel === "function") initPremiumCarousel();
  });
}

})();
