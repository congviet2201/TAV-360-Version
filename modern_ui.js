/* modern_ui.js - Combined Dual-Layout switcher (Classic Bottom Nav & Futuristic Left Sidebar) */

(function () {
  console.log("Modern UI Script: Initializing dual-layout switching system...");

  // 1. Shared SVG Gradients definitions to inject
  const gradientDefs = `
    <svg style="position: absolute; width: 0; height: 0; overflow: hidden;" aria-hidden="true">
      <defs>
        <linearGradient id="bio-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#00f2fe" />
          <stop offset="100%" stop-color="#ff007f" />
        </linearGradient>
        <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f3e5ab" />
          <stop offset="50%" stop-color="#d4af37" />
          <stop offset="100%" stop-color="#aa841e" />
        </linearGradient>
        <linearGradient id="cyan-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#e0ffff" />
          <stop offset="100%" stop-color="#00f2fe" />
        </linearGradient>
      </defs>
    </svg>
  `;

  // 1.1 Layout Switcher Widget HTML Template (Vietnamese labels)
  const layoutSwitcherHTML = `
    <div class="layout-switcher-wrapper" id="layout-switcher-wrapper">
      <div class="layout-switcher-trigger">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
      </div>
      <div class="layout-switcher-pill" id="layout-switcher">
        <div class="switcher-segment" id="opt-layout-classic" data-layout="classic">Cổ điển</div>
        <div class="switcher-segment" id="opt-layout-futuristic" data-layout="futuristic">Tương lai</div>
        <div class="switcher-segment" id="opt-layout-neo" data-layout="neo">Neo</div>
        <div class="switcher-segment" id="opt-layout-gradient" data-layout="gradient">Gradient</div>
        <div class="switcher-slider" id="switcher-slider"></div>
      </div>
    </div>
  `;

  // ==========================================
  // OPTION 4: GRADIENT LAYOUT TEMPLATES
  // ==========================================

  const gradientTopTitleHTML = `
    <div class="gradient-top-title-card">
      <div class="project-name">KHU ĐÔ THỊ MỚI LATIEN</div>
      <div class="project-subtitle">Virtual Tour 360&deg;</div>
    </div>
  `;

  const gradientQuickActionsHTML = `
    <div class="gradient-quick-actions">
      <div class="quick-action-btn" data-action="fullscreen">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
      </div>
    </div>
  `;

  const gradientRightNavHTML = `
    <div class="v-rail-container left-rail" id="gradient-left-rail">
      <div class="v-rail-trigger" id="gradient-left-trigger">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
      </div>
      <div class="v-rail-content" id="vision-left-dock">
        <!-- Navigation Overview -->
        <div class="vision-icon-wrapper" data-id="overview">
          <div class="vision-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          </div>
          <div class="vision-submenu">
            <div class="v-sub-item active" data-action="overview-top" data-pano-node="node1">Top View</div>
            <div class="v-sub-item" data-action="overview-bird" data-pano-node="node2">Bird View</div>
          </div>
        </div>
        <!-- Navigation Amenities -->
        <div class="vision-icon-wrapper" data-id="amenities">
          <div class="vision-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 22h20L12 2z"/></svg>
          </div>
          <div class="vision-submenu">
            <div class="v-sub-item" data-pano-node="node1">Clubhouse</div>
            <div class="v-sub-item" data-pano-node="node1">Bến Du Thuyền</div>
            <div class="v-sub-item" data-pano-node="node2">Khu Thể Thao</div>
            <div class="v-sub-item" data-pano-node="node3">Công Viên</div>
          </div>
        </div>
        <!-- Navigation Architecture -->
        <div class="vision-icon-wrapper" data-id="architecture">
          <div class="vision-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
          </div>
          <div class="vision-submenu">
            <div class="v-sub-item" data-pano-node="node3">Mặt Bằng</div>
            <div class="v-sub-item" data-pano-node="node4">Biệt Thự Song Lập</div>
            <div class="v-sub-item" data-pano-node="node5">Biệt Thự Đơn Lập</div>
          </div>
        </div>
        <!-- Navigation Interior -->
        <div class="vision-icon-wrapper" data-id="interior">
          <div class="vision-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/></svg>
          </div>
          <div class="vision-submenu">
            <div class="v-sub-item" data-pano-node="node4">Phòng Khách</div>
            <div class="v-sub-item" data-pano-node="node5">Phòng Ngủ</div>
          </div>
        </div>
        <!-- Navigation Surrounding -->
        <div class="vision-icon-wrapper" data-id="surrounding">
          <div class="vision-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><line x1="2" y1="12" x2="22" y2="12"/></svg>
          </div>
          <div class="vision-submenu">
            <div class="v-sub-item" data-pano-node="node2">Giao Thông</div>
            <div class="v-sub-item" data-pano-node="node1">Tiện Ích Ngoại Khu</div>
          </div>
        </div>
      </div>
    </div>
  `;

  const gradientLeftToolbarHTML = `
    <div class="v-rail-container right-rail" id="gradient-right-rail">
      <div class="v-rail-trigger" id="gradient-right-trigger">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
      </div>
      <div class="v-rail-content" id="vision-right-dock">
        <!-- Tool Music -->
        <div class="vision-icon-wrapper" data-action="music">
          <div class="vision-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
          </div>
        </div>
        <!-- Tool Images -->
        <div class="vision-icon-wrapper has-children">
          <div class="vision-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
          </div>
          <div class="vision-submenu">
              <div class="v-pano-card" onclick="window.pano && window.pano.openNext('node1')">
                <img src="pano_aerial.png" alt="Toàn cảnh">
                <span>Toàn cảnh</span>
              </div>
              <div class="v-pano-card" onclick="window.pano && window.pano.openNext('node2')">
                <img src="pano_detached.png" alt="Đơn lập">
                <span>Biệt thự Đơn lập</span>
              </div>
          </div>
        </div>
        <!-- Tool Hotspots -->
        <div class="vision-icon-wrapper" data-action="hotspots">
          <div class="vision-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
          </div>
        </div>
        <!-- Tool Share -->
        <div class="vision-icon-wrapper has-children">
          <div class="vision-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
          </div>
          <div class="vision-submenu">
            <a href="https://facebook.com" target="_blank" class="v-sub-item">Facebook</a>
            <a href="https://zalo.me" target="_blank" class="v-sub-item">Zalo</a>
          </div>
        </div>
        <!-- Tool Call -->
        <div class="vision-icon-wrapper" data-action="call">
          <div class="vision-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
          </div>
        </div>
        <!-- Tool Info -->
        <div class="vision-icon-wrapper" data-action="info">
          <div class="vision-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          </div>
        </div>
        <!-- Tool Fullscreen -->
        <div class="vision-icon-wrapper" data-action="fullscreen">
          <div class="vision-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
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
        <!-- 1. Music On/Off -->
        <div class="tool-button" data-action="music" id="btn-music">
          <svg class="tool-icon" viewBox="0 0 24 24" fill="none">
            <path d="M9 18V5l12-2v13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="6" cy="18" r="3" stroke="currentColor" stroke-width="2"/>
            <circle cx="18" cy="16" r="3" stroke="currentColor" stroke-width="2"/>
          </svg>
          <div class="tool-tooltip">Nhạc Nền</div>
        </div>
        <!-- 2. Show/Hide Images -->
        <div class="tool-button" data-action="images" id="btn-images">
          <svg class="tool-icon" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" stroke-width="2"/>
            <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" stroke-width="1.5"/>
            <path d="M21 15l-5-5L5 21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <div class="tool-tooltip">Ảnh Toàn Cảnh</div>
        </div>
        <!-- 3. Show/Hide Hotspots -->
        <div class="tool-button" data-action="hotspots" id="btn-hotspots">
          <svg class="tool-icon" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="2.5" fill="currentColor"/>
            <circle cx="12" cy="12" r="5.5" stroke="currentColor" stroke-width="1.5"/>
            <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1" stroke-dasharray="2 2"/>
            <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
          <div class="tool-tooltip">Điểm Điều Hướng</div>
        </div>
        <!-- 4. Share -->
        <div class="tool-button" data-action="share" id="btn-share">
          <svg class="tool-icon" viewBox="0 0 24 24" fill="none">
            <circle cx="18" cy="5" r="3" stroke="currentColor" stroke-width="2"/>
            <circle cx="6" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
            <circle cx="18" cy="19" r="3" stroke="currentColor" stroke-width="2"/>
            <path d="M8.59 13.51L15.42 17.49M15.41 6.51L8.59 10.49" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <div class="tool-tooltip">Chia Sẻ</div>
        </div>
        <!-- 5. Call for Consultation -->
        <div class="tool-button" data-action="call" id="btn-call">
          <svg class="tool-icon" viewBox="0 0 24 24" fill="none">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 015 12a19.79 19.79 0 01-3.07-8.67A2 2 0 013.92 1.5h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <div class="tool-tooltip">Tư Vấn</div>
        </div>
        <!-- 6. Social Links (with sub-dropdown) -->
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
        <!-- 7. Project Information -->
        <div class="tool-button" data-action="info" id="btn-info">
          <svg class="tool-icon" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
            <path d="M12 16v-4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <circle cx="12" cy="8" r="1" fill="currentColor"/>
          </svg>
          <div class="tool-tooltip">Thông Tin Dự Án</div>
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
  const bottomNavClassicHTML = `
    <div class="bottom-nav-container">
      <div class="bottom-nav-bar" id="bottom-main-nav">
        <!-- Active Back Glow element -->
        <div class="active-nav-glow" id="nav-glow"></div>

        <!-- 1. TỔNG QUAN -->
        <div class="nav-item active" data-id="overview" id="nav-home">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M3 9.5L12 3L21 9.5V20C21 20.5 20.5 21 20 21H4C3.5 21 3 20.5 3 20V9.5Z" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M9 21V12H15V21" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>Tổng Quan</span>

          <!-- Submenu -->
          <div class="nav-submenu">
            <div class="submenu-item active" data-action="overview-top">Nhìn Tổng Thể</div>
            <div class="submenu-item" data-action="overview-bird">Góc Nhìn Flycam</div>
          </div>
        </div>

        <!-- 2. TIỆN ÍCH -->
        <div class="nav-item" data-id="amenities" id="nav-amenities">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>Tiện Ích</span>

          <!-- Submenu -->
          <div class="nav-submenu">
            <div class="submenu-item" data-action="amenity-1">Tiện Ích 1</div>
            <div class="submenu-item" data-action="amenity-2">Tiện Ích 2</div>
            <div class="submenu-item" data-action="amenity-3">Tiện Ích 3</div>
          </div>
        </div>

        <!-- 3. LA TIÊN VILLA (Center logo-node with compact Mega Menu) -->
        <div class="nav-item center-logo-node" data-id="latien-brand" id="nav-logo">
          <div class="logo-script-top">LA TIÊN</div>
          <div class="logo-script-wave"></div>
          <div class="logo-script-sub">V I L L A</div>

          <!-- MEGA MENU: Compact cards -->
          <div class="nav-submenu mega-menu">
            <!-- Card 1: Toàn cảnh dự án (Node 1) -->
            <div class="mega-card active" data-pano-node="node1" data-action="pano-node1">
              <img src="pano_aerial.png" alt="Toàn cảnh dự án" class="mega-card-img">
              <div class="mega-card-overlay"></div>
              <div class="mega-card-title">Toàn cảnh dự án</div>
            </div>
            <!-- Card 2: Biệt thự Đơn lập A (Node 2) -->
            <div class="mega-card" data-pano-node="node2" data-action="pano-node2">
              <img src="pano_detached.png" alt="Biệt thự Đơn lập A" class="mega-card-img">
              <div class="mega-card-overlay"></div>
              <div class="mega-card-title">Biệt thự Đơn lập A</div>
            </div>
            <!-- Card 3: Biệt thự Song lập B (Node 3) -->
            <div class="mega-card" data-pano-node="node3" data-action="pano-node3">
              <img src="pano_semidetached.png" alt="Biệt thự Song lập B" class="mega-card-img">
              <div class="mega-card-overlay"></div>
              <div class="mega-card-title">Biệt thự Song lập B</div>
            </div>
            <!-- Card 4: Biệt thự Liền kề C (Node 4) -->
            <div class="mega-card" data-pano-node="node4" data-action="pano-node4">
              <img src="pano_townhouse.png" alt="Biệt thự Liền kề C" class="mega-card-img">
              <div class="mega-card-overlay"></div>
              <div class="mega-card-title">Biệt thự Liền kề C</div>
            </div>
          </div>
        </div>

        <!-- 4. KIẾN TRÚC -->
        <div class="nav-item" data-id="architecture" id="nav-architecture">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M3 21h18M3 10h18M5 10V6a2 2 0 012-2h10a2 2 0 012 2v4M10 21V14h4v7" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"/>
          </svg>
          <span>Kiến Trúc</span>

          <!-- Submenu -->
          <div class="nav-submenu">
            <div class="submenu-item" data-action="architecture-1">Kiến Trúc 1</div>
            <div class="submenu-item" data-action="architecture-2">Kiến Trúc 2</div>
            <div class="submenu-item" data-action="architecture-3">Kiến Trúc 3</div>
          </div>
        </div>

        <!-- 5. NỘI THẤT -->
        <div class="nav-item" data-id="interior" id="nav-interior">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M20 9V7a2 2 0 00-2-2h-2M4 9V7a2 2 0 012-2h2M4 15v2a2 2 0 002 2h2M20 15v2a2 2 0 01-2 2h-2M9 9h6v6H9z" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>Nội Thất</span>

          <!-- Submenu -->
          <div class="nav-submenu">
            <div class="submenu-item" data-action="interior-bedroom">Phòng Ngủ</div>
            <div class="submenu-item" data-action="interior-kitchen">Nhà Bếp</div>
            <div class="submenu-item" data-action="interior-balcony">Ban Công</div>
            <div class="submenu-item" data-action="interior-rooftop">Sân Thượng</div>
          </div>
        </div>
      </div>
    </div>
  `;

  // ==========================================
  // OPTION B: FUTURISTIC LAYOUT TEMPLATES
  // ==========================================

  // Independent settings gear top right
  const settingsToggleFuturisticHTML = `
    <div class="settings-toggle-btn" id="btn-settings-toggle" title="Cài đặt hệ thống">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="currentColor" stroke-width="2"/>
      </svg>
    </div>
  `;

  // Settings Panel on the Right
  const verticalToolStackFuturisticHTML = `
    <div class="vertical-tool-stack" id="right-tool-stack">
      <div class="tool-buttons-sub-stack" id="tool-sub-stack">
        ${toolbarButtonsHTML}
        <!-- (end toolbar buttons) -->
      </div>
    </div>
  `;

  const sidebarNavFuturisticHTML = `
    <div class="sidebar-container" id="sidebar-container">
      <div class="sidebar-toggle-btn" id="btn-sidebar-toggle" title="Mở rộng menu">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 5l7 7-7 7" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div class="sidebar-content">
        <div class="sidebar-logo" id="sidebar-logo">
          <div class="logo-script-top">LA TIÊN</div>
          <div class="logo-script-wave"></div>
          <div class="logo-script-sub">V I L L A</div>
        </div>
        <div class="sidebar-nav-list" id="sidebar-main-nav">
          <!-- Active Back Glow element -->
          <div class="active-nav-glow" id="nav-glow"></div>

          <!-- 1. TỔNG QUAN -->
          <div class="nav-item active" data-id="overview" id="nav-home">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M3 9.5L12 3L21 9.5V20C21 20.5 20.5 21 20 21H4C3.5 21 3 20.5 3 20V9.5Z" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M9 21V12H15V21" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Tổng Quan</span>

            <!-- Submenu -->
            <div class="nav-submenu">
              <div class="submenu-item active" data-action="overview-top">Nhìn Tổng Thể</div>
              <div class="submenu-item" data-action="overview-bird">Góc Nhìn Flycam</div>
            </div>
          </div>

          <!-- 2. TIỆN ÍCH -->
          <div class="nav-item" data-id="amenities" id="nav-amenities">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Tiện Ích</span>

            <!-- Submenu -->
            <div class="nav-submenu">
              <div class="submenu-item" data-action="amenity-1">Tiện Ích 1</div>
              <div class="submenu-item" data-action="amenity-2">Tiện Ích 2</div>
              <div class="submenu-item" data-action="amenity-3">Tiện Ích 3</div>
            </div>
          </div>

          <!-- 3. LA TIÊN VILLA (Center script-node) -->
          <div class="nav-item center-logo-node" data-id="latien-brand" id="nav-logo">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M3 21h18M3 10h18M5 10V6a2 2 0 012-2h10a2 2 0 012 2v4M10 21V14h4v7" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"/>
            </svg>
            <span>La Tiên Villa</span>

            <!-- MEGA MENU: Compact cards -->
            <div class="nav-submenu mega-menu">
              <!-- Card 1: Toàn cảnh dự án (Node 1) -->
              <div class="mega-card active" data-pano-node="node1" data-action="pano-node1">
                <img src="pano_aerial.png" alt="Toàn cảnh dự án" class="mega-card-img">
                <div class="mega-card-overlay"></div>
                <div class="mega-card-title">Toàn cảnh dự án</div>
              </div>
              <!-- Card 2: Biệt thự Đơn lập A (Node 2) -->
              <div class="mega-card" data-pano-node="node2" data-action="pano-node2">
                <img src="pano_detached.png" alt="Biệt thự Đơn lập A" class="mega-card-img">
                <div class="mega-card-overlay"></div>
                <div class="mega-card-title">Biệt thự Đơn lập A</div>
              </div>
              <!-- Card 3: Biệt thự Song lập B (Node 3) -->
              <div class="mega-card" data-pano-node="node3" data-action="pano-node3">
                <img src="pano_semidetached.png" alt="Biệt thự Song lập B" class="mega-card-img">
                <div class="mega-card-overlay"></div>
                <div class="mega-card-title">Biệt thự Song lập B</div>
              </div>
              <!-- Card 4: Biệt thự Liền kề C (Node 4) -->
              <div class="mega-card" data-pano-node="node4" data-action="pano-node4">
                <img src="pano_townhouse.png" alt="Biệt thự Liền kề C" class="mega-card-img">
                <div class="mega-card-overlay"></div>
                <div class="mega-card-title">Biệt thự Liền kề C</div>
              </div>
            </div>
          </div>

          <!-- 4. KIẾN TRÚC -->
          <div class="nav-item" data-id="architecture" id="nav-architecture">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M3 21h18M3 10h18M5 10V6a2 2 0 012-2h10a2 2 0 012 2v4M10 21V14h4v7" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"/>
            </svg>
            <span>Kiến Trúc</span>

            <!-- Submenu -->
            <div class="nav-submenu">
              <div class="submenu-item" data-action="architecture-1">Kiến Trúc 1</div>
              <div class="submenu-item" data-action="architecture-2">Kiến Trúc 2</div>
              <div class="submenu-item" data-action="architecture-3">Kiến Trúc 3</div>
            </div>
          </div>

          <!-- 5. NỘI THẤT -->
          <div class="nav-item" data-id="interior" id="nav-interior">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M20 9V7a2 2 0 00-2-2h-2M4 9V7a2 2 0 012-2h2M4 15v2a2 2 0 002 2h2M20 15v2a2 2 0 01-2 2h-2M9 9h6v6H9z" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Nội Thất</span>

            <!-- Submenu -->
            <div class="nav-submenu">
              <div class="submenu-item" data-action="interior-bedroom">Phòng Ngủ</div>
              <div class="submenu-item" data-action="interior-kitchen">Nhà Bếp</div>
              <div class="submenu-item" data-action="interior-balcony">Ban Công</div>
              <div class="submenu-item" data-action="interior-rooftop">Sân Thượng</div>
            </div>
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
      <div class="logo-script-top">LA TIÊN</div>
      <div class="logo-script-wave"></div>
      <div class="logo-script-sub">V I L L A</div>
    </div>
  `;

  // The Left Nav has floating cards for main categories
  const neoLeftNavHTML = `
    <div class="neo-left-nav-wrapper collapsed" id="neo-left-nav-wrapper">
      <div class="neo-nav-trigger" id="neo-left-trigger" title="Mở menu">
        <svg viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
      <div class="neo-left-nav" id="neo-left-nav">
        <div class="neo-nav-card active" data-id="overview" id="nav-neo-overview">Tổng Quan</div>
        <div class="neo-nav-card" data-id="amenities" id="nav-neo-amenities">Tiện Ích</div>
        <div class="neo-nav-card center-logo-node" data-id="latien-brand" id="nav-neo-logo">Dự Án</div>
        <div class="neo-nav-card" data-id="architecture" id="nav-neo-architecture">Kiến Trúc</div>
        <div class="neo-nav-card" data-id="interior" id="nav-neo-interior">Nội Thất</div>
        
        <!-- Submenu Panel floats next to the active card -->
        <div class="neo-submenu-panel" id="neo-submenu-panel">
          <div class="neo-submenu-content" id="neo-submenu-content"></div>
        </div>
      </div>
    </div>
  `;

  // Right quick panel has been removed from Neo layout to prevent duplication with the bottom dock
  const neoRightQuickPanelHTML = ``;


  // macOS style Bottom Dock
  const neoBottomDockHTML = `
    <div class="neo-dock-wrapper collapsed" id="neo-dock-wrapper">
      <div class="neo-dock-trigger" id="neo-bottom-trigger" title="Mở công cụ">
        <svg viewBox="0 0 24 24" fill="none"><path d="M18 15l-6-6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
      <div class="neo-bottom-dock-container" id="neo-bottom-dock">
        <div class="neo-dock" id="neo-dock">
          <div class="neo-dock-item" data-action="home"><svg viewBox="0 0 24 24" fill="none"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="currentColor" stroke-width="2"/><polyline points="9 22 9 12 15 12 15 22" stroke="currentColor" stroke-width="2"/></svg><div class="neo-tooltip">Trang Chủ</div></div>
          <div class="neo-dock-item" data-action="gallery"><svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2"/><circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" stroke-width="2"/><path d="M21 15l-5-5L5 21" stroke="currentColor" stroke-width="2"/></svg><div class="neo-tooltip">Thư Viện Ảnh</div></div>
          
          <!-- SUBMENU FOR SHARE -->
          <div class="neo-dock-item has-children" id="neo-share-parent">
            <svg viewBox="0 0 24 24" fill="none"><path d="M18 8A3 3 0 1018 2a3 3 0 000 6zM6 15a3 3 0 100-6 3 3 0 000 6zM18 22a3 3 0 100-6 3 3 0 000 6zM8.59 13.51l6.83 3.98M15.41 6.51L8.59 10.49" stroke="currentColor" stroke-width="2"/></svg>
            <div class="neo-tooltip">Chia Sẻ</div>
            <div class="neo-dock-submenu flex-col">
              <a href="https://facebook.com" target="_blank" class="dock-share-btn facebook">Facebook</a>
              <a href="https://zalo.me" target="_blank" class="dock-share-btn zalo">Zalo</a>
            </div>
          </div>
          
          <div class="neo-dock-item" data-action="call"><svg viewBox="0 0 24 24" fill="none"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" stroke="currentColor" stroke-width="2"/></svg><div class="neo-tooltip">Tư Vấn</div></div>
          <div class="neo-dock-item" data-action="info"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/><path d="M12 16v-4M12 8h.01" stroke="currentColor" stroke-width="2"/></svg><div class="neo-tooltip">Thông Tin Dự Án</div></div>
          <div class="neo-dock-divider"></div>
          <div class="neo-dock-item" data-action="music"><svg viewBox="0 0 24 24" fill="none"><path d="M9 18V5l12-2v13" stroke="currentColor" stroke-width="2"/><circle cx="6" cy="18" r="3" stroke="currentColor" stroke-width="2"/><circle cx="18" cy="16" r="3" stroke="currentColor" stroke-width="2"/></svg><div class="neo-tooltip">Nhạc Nền</div></div>
          
          <!-- SUBMENU FOR IMAGES -->
          <div class="neo-dock-item has-children" id="neo-images-parent">
            <svg viewBox="0 0 24 24" fill="none"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/></svg>
            <div class="neo-tooltip">Hình Ảnh</div>
            <div class="neo-dock-submenu">
              <div class="dock-pano-card" onclick="window.pano && window.pano.openNext('node1')">
                <img src="pano_aerial.png" alt="Toàn cảnh">
                <span>Toàn cảnh</span>
              </div>
              <div class="dock-pano-card" onclick="window.pano && window.pano.openNext('node2')">
                <img src="pano_detached.png" alt="Đơn lập">
                <span>Biệt thự Đơn lập</span>
              </div>
            </div>
          </div>

          <div class="neo-dock-item" data-action="hotspots"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" stroke-dasharray="4 4"/><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/></svg><div class="neo-tooltip">Ẩn/Hiện Hotspots</div></div>
        </div>
      </div>
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
      <div class="compass-cardinal n">N</div>
      <div class="compass-degree-display" id="compass-degree">0°</div>
    </div>
  `;

  // Neo Compass Widget
  const neoCompassHTML = `
    <div class="compass-widget neo-compass" id="compass-widget">
      <div class="compass-dial" id="compass-dial">
        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <circle cx="40" cy="40" r="38" fill="rgba(15, 17, 23, 0.4)" stroke="rgba(139, 92, 246, 0.4)" stroke-width="1"/>
          <!-- Glow needle for Neo -->
          <g>
            <polygon points="40,10 43,40 40,36 37,40" fill="#00D9FF"/>
            <polygon points="40,70 43,40 40,44 37,40" fill="rgba(248, 250, 252, 0.2)"/>
          </g>
        </svg>
      </div>
      <div class="compass-cardinal n">N</div>
      <div class="compass-degree-display" id="compass-degree">0°</div>
    </div>
  `;


  // Mini Map Widget - positioned bottom-right
  const minimapWidgetHTML = `
    <div class="minimap-widget collapsed" id="minimap-widget">
      <div class="minimap-header" id="minimap-toggle-btn">
        <svg viewBox="0 0 24 24" fill="none" width="14" height="14">
          <path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3V6z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
          <path d="M9 3v15M15 6v15" stroke="currentColor" stroke-width="1.5"/>
        </svg>
        <span class="minimap-label">BẢN ĐỒ</span>
        <svg class="minimap-chevron" viewBox="0 0 24 24" fill="none" width="12" height="12">
          <path d="M18 15l-6-6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div class="minimap-body" id="minimap-body">
        <div class="minimap-canvas" id="minimap-canvas">
          <img src="pano_aerial.png" alt="Bản đồ dự án" class="minimap-img" id="minimap-img">
          <!-- Current viewpoint cone indicator -->
          <div class="minimap-viewcone" id="minimap-viewcone"></div>
          <!-- Current position dot -->
          <div class="minimap-dot" id="minimap-dot"></div>
        </div>
        <div class="minimap-legend">
          <div class="minimap-legend-item"><span class="dot cyan"></span> Vị trí hiện tại</div>
        </div>
      </div>
    </div>
  `;

  // ==========================================
  // SHARED STATE & DATA STACKS
  // ==========================================

  const mapMarkers = [
    {
      id: "pin_villa_a1",
      pan: -45,
      tilt: -20,
      label: "01",
      title: "BIỆT THỰ ĐƠN LẬP A1",
      area: "420 m²",
      status: "Còn Trống",
      colorClass: "",
      nodeTarget: "node2"
    },
    {
      id: "pin_villa_a2",
      pan: -25,
      tilt: -15,
      label: "02",
      title: "BIỆT THỰ ĐƠN LẬP A2",
      area: "420 m²",
      status: "Đã Đặt",
      colorClass: "active",
      nodeTarget: "node2"
    },
    {
      id: "pin_villa_b1",
      pan: 15,
      tilt: -22,
      label: "03",
      title: "BIỆT THỰ SONG LẬP B1",
      area: "320 m²",
      status: "Còn Trống",
      colorClass: "",
      nodeTarget: "node3"
    },
    {
      id: "pin_villa_b2",
      pan: 35,
      tilt: -12,
      label: "04",
      title: "BIỆT THỰ SONG LẬP B2",
      area: "320 m²",
      status: "Còn Trống",
      colorClass: "",
      nodeTarget: "node3"
    },
    {
      id: "pin_villa_c1",
      pan: 75,
      tilt: -28,
      label: "05",
      title: "BIỆT THỰ LIỀN KỀ C1",
      area: "250 m²",
      status: "Còn Trống",
      colorClass: "",
      nodeTarget: "node4"
    },
    {
      id: "pin_clubhouse",
      pan: -85,
      tilt: -18,
      label: "CH",
      title: "CLUBHOUSE TRUNG TÂM",
      area: "1,200 m²",
      status: "Mở Cửa (8:00 - 22:00)",
      colorClass: "active",
      nodeTarget: "node1",
      isAmenity: true
    },
    {
      id: "pin_beach_bar",
      pan: -135,
      tilt: -24,
      label: "BL",
      title: "BEACH LOUNGE & BAR",
      area: "650 m²",
      status: "Mở Cửa (16:00 - 24:00)",
      colorClass: "",
      nodeTarget: "node1",
      isAmenity: true
    }
  ];

  // Safe localStorage helper (works on file:// protocol)
  function lsGet(key, fallback) {
    try { return localStorage.getItem(key) || fallback; } catch (e) { return fallback; }
  }
  function lsSet(key, value) {
    try { localStorage.setItem(key, value); } catch (e) {}
  }

  // System states (stored & persisted in localStorage)
  let layoutMode = lsGet("latien_layout_mode", "futuristic");
  let activeNavItemId = lsGet("latien_active_nav", "overview");
  let activeSubmenuAction = lsGet("latien_active_submenu", "overview-top");
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

  // Setup layout switcher click events and indicators positioning
  function updateSwitcherUI() {
    const classicSeg = document.getElementById("opt-layout-classic");
    const futuristicSeg = document.getElementById("opt-layout-futuristic");
    const neoSeg = document.getElementById("opt-layout-neo");
    const gradientSeg = document.getElementById("opt-layout-gradient");
    const slider = document.getElementById("switcher-slider");
    if (!classicSeg || !futuristicSeg || !neoSeg || !gradientSeg || !slider) return;

    requestAnimationFrame(() => {
      let activeSeg = classicSeg;
      if (layoutMode === "futuristic") activeSeg = futuristicSeg;
      else if (layoutMode === "neo") activeSeg = neoSeg;
      else if (layoutMode === "gradient") activeSeg = gradientSeg;
      
      classicSeg.classList.toggle("active", layoutMode === "classic");
      futuristicSeg.classList.toggle("active", layoutMode === "futuristic");
      neoSeg.classList.toggle("active", layoutMode === "neo");
      gradientSeg.classList.toggle("active", layoutMode === "gradient");

      slider.style.width = `${activeSeg.offsetWidth}px`;
      slider.style.left = `${activeSeg.offsetLeft}px`;
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
  function injectLayoutComponents() {
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
      tempDiv.innerHTML = verticalToolStackClassicHTML + bottomNavClassicHTML;
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
    }

    // Inject Minimap (shared HTML, styled differently in CSS)
    if (!document.getElementById("minimap-widget")) {
      const mapDiv = document.createElement("div");
      mapDiv.innerHTML = minimapWidgetHTML;
      document.body.appendChild(mapDiv.firstElementChild);
      setupMinimapListeners();
    }

    // Inject Compass
    if (!document.getElementById("compass-widget")) {
      const compassDiv = document.createElement("div");
      if (layoutMode === "neo") {
        compassDiv.innerHTML = neoCompassHTML;
      } else {
        compassDiv.innerHTML = compassWidgetHTML;
      }
      document.body.appendChild(compassDiv.firstElementChild);
    }

    // Restore selected active highlights
    restoreActiveStates();
  }

  // Restore navigation and submenu highlight states on rebuild
  function restoreActiveStates() {
    // 1. Restore main nav highlights
    const navItems = document.querySelectorAll(".nav-item");
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
    const subItems = document.querySelectorAll(".submenu-item, .mega-card");
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
      showNotification(layoutMode === "classic" ? `Đang chuyển đến: ${titleText}` : `Navigating: ${titleText.toUpperCase()}`);
    } else if (action) {
      showNotification(layoutMode === "classic" ? `Đang tải: ${titleText}` : `Loading: ${titleText}`);
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
          parentNavItem.classList.remove("is-open");
        }

        handleSubmenuSelection(this);
      });
    });
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
      settingsToggle.addEventListener("click", function (e) {
        e.stopPropagation();
        rightToolStack.classList.toggle("expanded");
        if (rightToolStack.classList.contains("expanded")) {
          showNotification("Bảng điều khiển đã mở rộng");
        }
      });
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
          parentNavItem.classList.remove("is-open");
          if (sidebarContainer) {
            sidebarContainer.classList.remove("submenu-open");
            sidebarContainer.classList.remove("mega-open");
          }
        }

        handleSubmenuSelection(this);
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
        }, 50); // Reduced from 300ms to 50ms for snappy collapse
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
        }, 50); // Reduced from 200ms to 50ms for snappy collapse
      });
      
      // Click logic (for opening submenus or just clicking a tool)
      wrapper.addEventListener('click', (e) => {
        // If clicking inside a submenu, don't toggle the pinned state
        if (e.target.closest('.vision-submenu')) return;
        
        const hasSubmenu = wrapper.querySelector('.vision-submenu') !== null;
        if (hasSubmenu) {
            const isPinned = wrapper.classList.contains('pinned');
            // Close all others
            iconWrappers.forEach(n => n.classList.remove('pinned', 'hover-open'));
            if (!isPinned) wrapper.classList.add('pinned');
        } else {
            // It's a simple tool, handle it via dispatchToolAction
            iconWrappers.forEach(n => n.classList.remove('pinned', 'hover-open'));
            if (typeof dispatchToolAction === "function" && wrapper.hasAttribute("data-action")) {
              dispatchToolAction(wrapper);
              e.stopPropagation(); // Prevent broken global handlers from interfering
            }
        }
      });
    });

    // Click outside closes everything
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
    // Left Nav Wrapper Logic
    const leftNavWrapper = document.getElementById('neo-left-nav-wrapper');
    const leftNavTrigger = document.getElementById('neo-left-trigger');
    if (leftNavWrapper && leftNavTrigger) {
      leftNavWrapper.addEventListener('mouseenter', () => {
        if (!leftNavWrapper.classList.contains('pinned')) leftNavWrapper.classList.remove('collapsed');
      });
      leftNavWrapper.addEventListener('mouseleave', () => {
        if (!leftNavWrapper.classList.contains('pinned')) leftNavWrapper.classList.add('collapsed');
      });
      leftNavTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const isPinned = leftNavWrapper.classList.contains('pinned');
        if (isPinned) {
          leftNavWrapper.classList.remove('pinned');
          leftNavWrapper.classList.add('collapsed');
        } else {
          leftNavWrapper.classList.add('pinned');
          leftNavWrapper.classList.remove('collapsed');
        }
      });
    }

    // Bottom Dock Wrapper Logic
    const bottomDockWrapper = document.getElementById('neo-dock-wrapper');
    const bottomDockTrigger = document.getElementById('neo-bottom-trigger');
    if (bottomDockWrapper && bottomDockTrigger) {
      bottomDockWrapper.addEventListener('mouseenter', () => {
        if (!bottomDockWrapper.classList.contains('pinned')) bottomDockWrapper.classList.remove('collapsed');
      });
      bottomDockWrapper.addEventListener('mouseleave', () => {
        if (!bottomDockWrapper.classList.contains('pinned')) bottomDockWrapper.classList.add('collapsed');
      });
      bottomDockTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const isPinned = bottomDockWrapper.classList.contains('pinned');
        if (isPinned) {
          bottomDockWrapper.classList.remove('pinned');
          bottomDockWrapper.classList.add('collapsed');
        } else {
          bottomDockWrapper.classList.add('pinned');
          bottomDockWrapper.classList.remove('collapsed');
        }
      });
    }

    document.addEventListener('click', (e) => {
      if (leftNavWrapper && !e.target.closest('.neo-left-nav-wrapper')) {
        leftNavWrapper.classList.remove('pinned');
        leftNavWrapper.classList.add('collapsed');
      }
      if (bottomDockWrapper && !e.target.closest('.neo-dock-wrapper')) {
        bottomDockWrapper.classList.remove('pinned');
        bottomDockWrapper.classList.add('collapsed');
      }
    });

    const navCards = document.querySelectorAll(".layout-neo .neo-nav-card:not(.center-logo-node)");
    const panel = document.getElementById("neo-submenu-panel");
    const content = document.getElementById("neo-submenu-content");

    const submenuData = {
      "overview": `
        <div class="submenu-item" data-action="pano-topview">Top View</div>
        <div class="submenu-item" data-action="pano-birdview">Bird View</div>
      `,
      "amenities": `
        <div class="submenu-item" data-action="amenity-pool">Hồ Bơi</div>
        <div class="submenu-item" data-action="amenity-gym">Phòng Gym</div>
        <div class="submenu-item" data-action="amenity-park">Công Viên</div>
        <div class="submenu-item" data-action="amenity-spa">Spa & Massage</div>
      `,
      "architecture": `
        <div class="submenu-item" data-action="architecture-1">Kiến Trúc 1</div>
        <div class="submenu-item" data-action="architecture-2">Kiến Trúc 2</div>
        <div class="submenu-item" data-action="architecture-3">Kiến Trúc 3</div>
      `,
      "interior": `
        <div class="submenu-item" data-action="interior-bedroom">Phòng Ngủ</div>
        <div class="submenu-item" data-action="interior-kitchen">Nhà Bếp</div>
        <div class="submenu-item" data-action="interior-balcony">Ban Công</div>
        <div class="submenu-item" data-action="interior-rooftop">Sân Thượng</div>
      `,
      "latien-brand": `
        <div class="mega-card" data-pano-node="node1" data-action="pano-node1"><img src="pano_aerial.png" alt="Toàn cảnh" class="mega-card-img"><div class="mega-card-overlay"></div><div class="mega-card-title">Toàn cảnh dự án</div></div>
        <div class="mega-card" data-pano-node="node2" data-action="pano-node2"><img src="pano_detached.png" alt="Biệt thự Đơn lập A" class="mega-card-img"><div class="mega-card-overlay"></div><div class="mega-card-title">Biệt thự Đơn lập A</div></div>
        <div class="mega-card" data-pano-node="node3" data-action="pano-node3"><img src="pano_semidetached.png" alt="Biệt thự Song lập B" class="mega-card-img"><div class="mega-card-overlay"></div><div class="mega-card-title">Biệt thự Song lập B</div></div>
        <div class="mega-card" data-pano-node="node4" data-action="pano-node4"><img src="pano_townhouse.png" alt="Biệt thự Liền kề C" class="mega-card-img"><div class="mega-card-overlay"></div><div class="mega-card-title">Biệt thự Liền kề C</div></div>
      `
    };

    function bindSubmenuItems() {
      if (!content) return;
      const subItems = content.querySelectorAll(".submenu-item, .mega-card");
      subItems.forEach(item => {
        item.addEventListener("click", function (e2) {
          e2.stopPropagation();
          subItems.forEach(s => s.classList.remove("active"));
          this.classList.add("active");
          if (panel) panel.classList.remove("open");
          if (typeof handleSubmenuSelection === "function") handleSubmenuSelection(this);
        });
      });
    }

    navCards.forEach(card => {
      card.addEventListener("mouseenter", () => {
        if (panel && card.classList.contains("pinned")) return;
        const targetId = card.getAttribute("data-id");
        if (targetId && submenuData[targetId] && content) {
          content.innerHTML = submenuData[targetId];
          panel.classList.add("open");
          if (targetId === "latien-brand") panel.classList.add("mega-mode");
          else panel.classList.remove("mega-mode");
          bindSubmenuItems();
          navCards.forEach(c => { if (!c.classList.contains("pinned")) c.classList.remove("active"); });
          if (!document.querySelector(".layout-neo .neo-nav-card.pinned")) card.classList.add("active");
        }
      });

      card.addEventListener("mouseleave", () => {
        if (!card.classList.contains("pinned") && !document.querySelector(".layout-neo .neo-nav-card.pinned")) {
          if (panel) panel.classList.remove("open");
          card.classList.remove("active");
        }
      });

      card.addEventListener("click", (e) => {
        e.stopPropagation();
        const isPinned = card.classList.contains("pinned");
        navCards.forEach(c => { c.classList.remove("pinned", "active"); });
        if (!isPinned) {
          card.classList.add("pinned", "active");
          if (panel) panel.classList.add("open");
        } else {
          if (panel) panel.classList.remove("open");
        }
      });
    });

    document.addEventListener("click", (e) => {
      if (!e.target.closest('.neo-left-nav-wrapper')) {
        navCards.forEach(c => { c.classList.remove("pinned", "active"); });
        if (panel) panel.classList.remove("open");
      }
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
          const isPinned = btn.classList.contains("pinned");
          allTools.forEach(t => t.classList.remove("pinned", "hover-open"));
          if (!isPinned) btn.classList.add("pinned");
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
        btn.classList.toggle("active-tool", isMusicMuted);
        showNotification(isMusicMuted ? "Nhạc nền đã tắt" : "Nhạc nền đã bật");
        break;

      case "images":
        isImagesHidden = !isImagesHidden;
        if (window.pano && typeof window.pano.setTextureVisible === "function") {
          window.pano.setTextureVisible(!isImagesHidden);
        }
        btn.classList.toggle("active-tool", isImagesHidden);
        showNotification(isImagesHidden ? "Ảnh toàn cảnh đã ẩn" : "Ảnh toàn cảnh đã hiện");
        break;

      case "hotspots":
        isHotspotsHidden = !isHotspotsHidden;
        const hotspots = document.querySelectorAll(".hologram-marker-container, [class*='hotspot']");
        hotspots.forEach(hs => {
          hs.style.visibility = isHotspotsHidden ? "hidden" : "visible";
          hs.style.opacity = isHotspotsHidden ? "0" : "";
        });
        btn.classList.toggle("active-tool", isHotspotsHidden);
        showNotification(isHotspotsHidden ? "Điểm điều hướng đã ẩn" : "Điểm điều hướng đã hiện");
        break;

      case "share":
        if (navigator.share) {
          navigator.share({ title: "La Tiên Villa", text: "Khám phá dự án La Tiên Villa", url: window.location.href })
            .catch(err => console.log("Share cancelled", err));
        } else {
          navigator.clipboard.writeText(window.location.href)
            .then(() => showNotification("Link đã sao chép vào clipboard!"))
            .catch(() => showNotification("Không thể chia sẻ. Vui lòng sao chép URL."));
        }
        break;

      case "call":
        window.open("tel:+84000000000", "_self");
        showNotification("Đang kết nối tư vấn viên...");
        break;

      case "info":
        showProjectInfoPanel();
        break;

      case "facebook":
        window.open("https://www.facebook.com", "_blank");
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
          <div class="logo-script-top" style="font-size:14px;letter-spacing:2px;">LA TIÊN</div>
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
          <span class="info-value">La Tiên Investment Group</span>
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

  function syncCompass() {
    if (!window.pano) return;
    try {
      const pan = window.pano.getPan ? window.pano.getPan() : 0;
      const dial = document.getElementById("compass-dial");
      const degDisplay = document.getElementById("compass-degree");

      if (dial) {
        dial.style.transform = `rotate(${-pan}deg)`;
      }
      if (degDisplay) {
        const normalizedDeg = ((pan % 360) + 360) % 360;
        degDisplay.textContent = `${Math.round(normalizedDeg)}°`;
      }

      syncMinimap(pan);
    } catch (e) {}
    compassAnimFrame = requestAnimationFrame(syncCompass);
  }

  function syncMinimap(pan) {
    const viewcone = document.getElementById("minimap-viewcone");
    if (!viewcone) return;
    const normalizedDeg = ((pan % 360) + 360) % 360;
    viewcone.style.transform = `rotate(${normalizedDeg}deg)`;
  }

  function setupMinimapListeners() {
    const toggleBtn = document.getElementById("minimap-toggle-btn");
    const widget = document.getElementById("minimap-widget");
    if (!toggleBtn || !widget) return;

    toggleBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      widget.classList.toggle("collapsed");
      const chevron = widget.querySelector(".minimap-chevron path");
      const isCollapsed = widget.classList.contains("collapsed");
      if (chevron) {
        chevron.setAttribute("d", isCollapsed ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6");
      }
    });
  }

  // Setup outer containers and Layout switch click actions
  function injectUI() {
    // 1. Create outer wrapper container
    const uiWrapper = document.createElement("div");
    uiWrapper.className = `modern-ui-overlay layout-${layoutMode}`;
    uiWrapper.innerHTML = gradientDefs + layoutSwitcherHTML;
    document.body.appendChild(uiWrapper);

    // Sync top-level body classes
    document.body.classList.remove("layout-classic", "layout-futuristic", "layout-neo", "layout-gradient");
    document.body.classList.add(`layout-${layoutMode}`);

    // 2. Inject components for active layout mode
    injectLayoutComponents();

    // 3. Setup Layout Switcher listeners
    const classicSeg = document.getElementById("opt-layout-classic");
    const futuristicSeg = document.getElementById("opt-layout-futuristic");
    const neoSeg = document.getElementById("opt-layout-neo");
    const gradientSeg = document.getElementById("opt-layout-gradient");

    const handleSwitch = (newLayout) => {
      if (layoutMode === newLayout) return;

      // 1. Play fade-out animation
      uiWrapper.classList.add("switching");

      // 2. Record current active selections
      const activeNav = document.querySelector(".nav-item.active");
      if (activeNav) {
        activeNavItemId = activeNav.getAttribute("data-id");
        lsSet("latien_active_nav", activeNavItemId);
      }
      const activeSub = document.querySelector(".submenu-item.active, .mega-card.active");
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
        document.body.classList.remove("layout-classic", "layout-futuristic", "layout-neo", "layout-gradient");
        document.body.classList.add(`layout-${layoutMode}`);

        // Update container class namespaces
        uiWrapper.className = `modern-ui-overlay layout-${layoutMode}`;

        // Re-inject layout structures and bind events
        injectLayoutComponents();

        // Slide the switcher segments
        updateSwitcherUI();

        // 4. Fade back in
        setTimeout(() => {
          uiWrapper.classList.remove("switching");
        }, 50);

        let notifMsg = "Đã chuyển sang Giao diện Neo";
        if (layoutMode === "classic") notifMsg = "Đã chuyển sang Giao diện Cổ điển";
        else if (layoutMode === "futuristic") notifMsg = "Đã chuyển sang Giao diện Tương lai";
        else if (layoutMode === "gradient") notifMsg = "Đã chuyển sang Giao diện Gradient";
        showNotification(notifMsg);

      }, 300);
    };

    if (classicSeg && futuristicSeg && neoSeg && gradientSeg) {
      classicSeg.addEventListener("click", () => handleSwitch("classic"));
      futuristicSeg.addEventListener("click", () => handleSwitch("futuristic"));
      neoSeg.addEventListener("click", () => handleSwitch("neo"));
      gradientSeg.addEventListener("click", () => handleSwitch("gradient"));
    }

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
      if (rightToolStack) rightToolStack.classList.remove("expanded");

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
  }

  // ==========================================
  // HOLOGRAPHIC HOTSPOTS MARKERS (Pano2VR Hooks)
  // ==========================================

  function createHologramMarker(pin) {
    const container = document.createElement("div");
    container.className = `hologram-marker-container ${pin.colorClass}`;
    container.id = `marker-${pin.id}`;

    container.innerHTML = `
      <div class="hotspot-hitbox"></div>
      <div class="hotspot-marker"></div>
      <div class="hotspot-label">${pin.title}</div>
    `;

    const hitbox = container.querySelector(".hotspot-hitbox");
    hitbox.addEventListener("click", function (e) {
      e.stopPropagation();
      console.log(`Marker clicked: ${pin.id} -> target ${pin.nodeTarget}`);

      // Find the FIRST mega-card matching this node target and activate it
      const megaCards = document.querySelectorAll(".mega-card");
      let found = false;
      megaCards.forEach(card => {
        if (card.getAttribute("data-pano-node") === pin.nodeTarget) {
          if (!found) {
            found = true;
            card.click();
          }
        }
      });

      if (!found && window.pano) {
        window.pano.openNext(`{${pin.nodeTarget}}`);
      }
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
  }

  function onNodeChange() {
    if (!window.pano) return;
    const currentNodeId = window.pano.qd();
    if (!currentNodeId) return;
    console.log(`Current Pano Node: ${currentNodeId}`);

    syncStateWithNode(currentNodeId);

    // Clear old hotspots
    if (typeof window.pano.removeHotspots === 'function') {
      window.pano.removeHotspots();
    }

    // Add maps markers on aerial node1
    if (currentNodeId === "node1") {
      console.log("Adding holographic map markers...");
      mapMarkers.forEach(pin => {
        const markerEl = createHologramMarker(pin);
        if (typeof window.pano.addHotspot === 'function') {
          window.pano.addHotspot(pin.id, pin.pan, pin.tilt, markerEl);
        }
      });
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

  // Run initializer
  if (document.readyState === "complete" || document.readyState === "interactive") {
    injectUI();
    initPanoHooks();
  } else {
    window.addEventListener("DOMContentLoaded", () => {
      injectUI();
      initPanoHooks();
    });
  }

})();



// =========================================================
// GLOBAL UI COMPONENTS & EVENT LISTENERS
// =========================================================

const globalModalsHTML = `
  <!-- 1. Project Information Modal -->
  
  <div class="global-modal-overlay" id="project-info-modal">
    <div class="global-modal-content project-info-expanded">
      <div class="modal-header">
        <h2>Thông Tin Dự Án La Tiên</h2>
        <div class="modal-close-btn" onclick="document.getElementById('project-info-modal').classList.remove('active')">&times;</div>
      </div>
      <div class="modal-body scrollable-modal-body">
        <section>
          <h3>Tổng Quan</h3>
          <p>Khu đô thị mới La Tiên mang đến chuẩn mực sống hoàn toàn mới với không gian xanh mát và hệ sinh thái tiện ích đẳng cấp quốc tế. Tọa lạc tại vị trí chiến lược, dự án là viên ngọc quý giữa lòng thành phố.</p>
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
        <div class="modal-close-btn" onclick="document.getElementById('image-gallery-modal').classList.remove('active')">&times;</div>
      </div>
      <div class="modal-body gallery-grid">
        <div class="gallery-card" onclick="window.pano && window.pano.openNext('{node1}'); document.getElementById('image-gallery-modal').classList.remove('active')">
          <img src="pano_aerial.png" alt="Top View" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100%\' height=\'100px\' style=\'background:%23333\'%3E%3C/svg%3E'" />
          <div class="card-title">Top View</div>
        </div>
        <div class="gallery-card" onclick="window.pano && window.pano.openNext('{node2}'); document.getElementById('image-gallery-modal').classList.remove('active')">
          <img src="pano_detached.png" alt="Bird View" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100%\' height=\'100px\' style=\'background:%23333\'%3E%3C/svg%3E'" />
          <div class="card-title">Bird View</div>
        </div>
        <div class="gallery-card" onclick="window.pano && window.pano.openNext('{node3}'); document.getElementById('image-gallery-modal').classList.remove('active')">
          <img src="pano_semidetached.png" alt="Biệt Thự" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100%\' height=\'100px\' style=\'background:%23333\'%3E%3C/svg%3E'" />
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
  const wrapper = document.getElementById("modern-ui-overlay");
  if (wrapper) {
    const temp = document.createElement("div");
    temp.innerHTML = globalModalsHTML;
    while(temp.firstChild) {
      wrapper.appendChild(temp.firstChild);
    }
  }

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
      const modal = document.getElementById('image-gallery-modal');
      if (modal) modal.classList.add('active');
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
      window.location.href = 'consultation.html';
      return;
    }

    // 5. Close Social Share on outside click
    const shareMenu = document.getElementById('social-share-menu');
    if (shareMenu && shareMenu.classList.contains('active')) {
      shareMenu.classList.remove('active');
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
