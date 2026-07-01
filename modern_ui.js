﻿/* modern_ui.js - Combined Dual-Layout switcher (Classic Bottom Nav & Futuristic Left Sidebar) */

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
  const layoutSwitcherHTML = `
    <div class="layout-switcher-wrapper" id="layout-switcher-wrapper">
      <div class="layout-switcher-trigger">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
      </div>
      <div class="layout-switcher-pill" id="layout-switcher">
        <div class="switcher-segment" id="opt-layout-classic" data-layout="classic" title="Giao diện Cổ điển">Cổ điển</div>
        <div class="switcher-segment" id="opt-layout-futuristic" data-layout="futuristic" title="Giao diện Tương lai">Tương lai</div>
        <div class="switcher-segment" id="opt-layout-neo" data-layout="neo" title="Giao diện Neo">Neo</div>
        <div class="switcher-segment" id="opt-layout-gradient" data-layout="gradient" title="Giao diện Gradient">Gradient</div>
        <div class="switcher-segment" id="opt-layout-aurora" data-layout="aurora" title="Giao diện Aurora">Aurora</div>
        <div class="switcher-segment" id="opt-layout-horizon" data-layout="horizon" title="Giao diện Horizon">Horizon</div>
        <div class="switcher-segment" id="opt-layout-prism" data-layout="prism" title="Giao diện Prism">Prism</div>
        <div class="switcher-segment" id="opt-layout-nexus" data-layout="nexus" title="Giao diện Nexus">Nexus</div>
        <div class="switcher-segment" id="opt-layout-monarch" data-layout="monarch" title="Giao diện Monarch">Monarch</div>
        <div class="switcher-segment" id="opt-layout-regal" data-layout="regal" title="Giao diện Regal">Regal</div>
        <div class="switcher-slider" id="switcher-slider"></div>
      </div>
    </div>
  `;

  // ==========================================
  // OPTION 4: GRADIENT LAYOUT TEMPLATES
  // ==========================================

  const gradientTopTitleHTML = ``;

  const gradientQuickActionsHTML = `
    <div class="gradient-quick-actions">
      <div class="quick-action-btn" data-action="fullscreen">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
      </div>
    </div>
  `;

  const gradientRightNavHTML = `
    <div class="v-rail-container left-rail" id="gradient-left-rail">
      <div class="v-rail-trigger" id="gradient-left-trigger" title="Mở menu">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
      </div>
      <div class="v-rail-content" id="vision-left-dock">
        <!-- Logo inside Menu -->
        <div class="gradient-menu-logo">
          <div class="project-name">TAV</div>
          <div class="project-subtitle">V I L L A</div>
        </div>
        <!-- Top View -->
        <div class="vision-icon-wrapper" data-id="topview" data-pano-node="node1" data-action="overview-top">
          <div class="vision-icon" title="Top View">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
          </div>
          <span>Top View</span>
        </div>
        <!-- Bird View -->
        <div class="vision-icon-wrapper" data-id="birdview">
          <div class="vision-icon" title="Bird View">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9M12 4h9M3 12l3-3 3 3M6 9v11M3 20h6"/></svg>
          </div>
          <span>Bird View</span>
          <div class="vision-submenu">
            <div class="v-sub-item" data-action="overview-bird1" data-pano-node="node2">Bird View 1</div>
            <div class="v-sub-item" data-action="overview-bird2" data-pano-node="node3">Bird View 2</div>
            <div class="v-sub-item" data-action="overview-bird3" data-pano-node="node4">Bird View 3</div>
          </div>
        </div>
        <!-- Navigation Amenities -->
        <div class="vision-icon-wrapper" data-id="amenities">
          <div class="vision-icon" title="Tiện ích">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 12l10 5 10-5"/><path d="M2 17l10 5 10-5"/></svg>
          </div>
          <span>Tiện ích</span>
          <div class="vision-submenu">
            <div class="v-sub-item" data-pano-node="node1">Clubhouse</div>
            <div class="v-sub-item" data-pano-node="node1">Bến Du Thuyền</div>
            <div class="v-sub-item" data-pano-node="node2">Khu Thể Thao</div>
            <div class="v-sub-item" data-pano-node="node3">Công Viên</div>
          </div>
        </div>
        <!-- Navigation Architecture -->
        <div class="vision-icon-wrapper" data-id="architecture">
          <div class="vision-icon" title="Kiến trúc">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21V8l9-6 9 6v13"/><path d="M9 21v-6h6v6"/><path d="M14 3v-1h3v4"/></svg>
          </div>
          <span>Kiến trúc</span>
          <div class="vision-submenu">
            <div class="v-sub-item" data-pano-node="node3">Mặt Bằng</div>
            <div class="v-sub-item" data-pano-node="node4">Biệt Thự Song Lập</div>
            <div class="v-sub-item" data-pano-node="node5">Biệt Thự Đơn Lập</div>
          </div>
        </div>
        <!-- Navigation Interior -->
        <div class="vision-icon-wrapper" data-id="interior">
          <div class="vision-icon" title="Nội thất">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/><path d="M7 8h4M7 11h6"/></svg>
          </div>
          <span>Nội thất</span>
          <div class="vision-submenu">
            <div class="v-sub-item" data-action="interior-1">Nội thất 1</div>
            <div class="v-sub-item" data-action="interior-2">Nội thất 2</div>
          </div>
        </div>
        <!-- Navigation Surrounding (Liên kết vùng) -->
        <div class="vision-icon-wrapper" data-id="surrounding" data-action="region-page">
          <div class="vision-icon" title="Liên kết vùng">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"/></svg>
          </div>
          <span>Liên kết vùng</span>
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
        <!-- Tool Info -->
        <div class="vision-icon-wrapper" data-action="info">
          <div class="vision-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          </div>
        </div>
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
                <img src="pano_aerial.png" alt="Top View">
                <span>Top View</span>
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

        <!-- 1. TOP VIEW -->
        <div class="nav-item" data-id="topview" id="nav-topview">
            <svg viewBox="0 0 24 24" fill="none">
              <rect x="2" y="3" width="20" height="14" rx="2" stroke-linecap="round" stroke-linejoin="round"/>
              <line x1="8" y1="21" x2="16" y2="21" stroke-linecap="round" stroke-linejoin="round"/>
              <line x1="12" y1="17" x2="12" y2="21" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Top View</span>
            
          </div>

        <!-- 2. BIRD VIEW -->
        <div class="nav-item" data-id="birdview" id="nav-birdview">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M12 20h9M12 4h9M3 12l3-3 3 3M6 9v11M3 20h6" stroke="currentColor" stroke-width="2"/>
          </svg>
          <span>Bird View</span>
          <!-- Submenu -->
          <div class="nav-submenu">
              <div class="submenu-item" data-pano-node="pin_birdview">Bird View 1</div>
              <div class="submenu-item" data-pano-node="pin_top">Bird View 2</div>
              <div class="submenu-item" data-pano-node="pin_topnight">Bird View 3</div>
            </div>
        </div>

        <!-- 3. TIỆN ÍCH -->
        <div class="nav-item" data-id="amenities" id="nav-amenities">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7l10 5 10-5-10-5z" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2 12l10 5 10-5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2 17l10 5 10-5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>Tiện Ích</span>
          <!-- Submenu -->
          <div class="nav-submenu">
              <div class="submenu-item" data-pano-node="pin_park">TAV Park</div>
              <div class="submenu-item" data-pano-node="pin_park2">TAV Park 2</div>
              <div class="submenu-item" data-pano-node="pin_street">TAV Street</div>
            </div>
        </div>

        <!-- 4. TAV VILLA (Center logo-node with compact Mega Menu) -->
        <div class="nav-item center-logo-node" data-id="latien-brand" id="nav-logo">
          <div class="logo-script-top">TAV</div>
          <div class="logo-script-wave"></div>
          <div class="logo-script-sub">V I L L A</div>

          <!-- MEGA MENU: Compact cards -->
          <div class="nav-submenu mega-menu">

              <!-- Card 1 -->
              <div class="mega-card" data-pano-node="nodegallarey1" data-action="pano-nodegallarey1">
                <img src="tiles/nodegallarey1/thumb.jpg" alt="Gallarey 1" class="mega-card-img" onerror="this.src='pano_aerial.png'">
                <div class="mega-card-overlay"></div>
                <div class="mega-card-title">Gallarey 1</div>
              </div>
              <!-- Card 2 -->
              <div class="mega-card" data-pano-node="nodegallarey2" data-action="pano-nodegallarey2">
                <img src="tiles/nodegallarey2/thumb.jpg" alt="Gallarey 2" class="mega-card-img" onerror="this.src='pano_detached.png'">
                <div class="mega-card-overlay"></div>
                <div class="mega-card-title">Gallarey 2</div>
              </div>
              <!-- Card 3 -->
              <div class="mega-card" data-pano-node="nodegallarey3" data-action="pano-nodegallarey3">
                <img src="tiles/nodegallarey3/thumb.jpg" alt="Gallarey 3" class="mega-card-img" onerror="this.src='pano_semidetached.png'">
                <div class="mega-card-overlay"></div>
                <div class="mega-card-title">Gallarey 3</div>
              </div>
              <!-- Card 4 -->
              <div class="mega-card" data-pano-node="nodegallarey4" data-action="pano-nodegallarey4">
                <img src="tiles/nodegallarey4/thumb.jpg" alt="Gallarey 4" class="mega-card-img" onerror="this.src='pano_townhouse.png'">
                <div class="mega-card-overlay"></div>
                <div class="mega-card-title">Gallarey 4</div>
              </div>
              <!-- Card 5 -->
              <div class="mega-card" data-pano-node="nodegallarey5" data-action="pano-nodegallarey5">
                <img src="tiles/nodegallarey5/thumb.jpg" alt="Gallarey 5" class="mega-card-img" onerror="this.src='pano_aerial.png'">
                <div class="mega-card-overlay"></div>
                <div class="mega-card-title">Gallarey 5</div>
              </div>
              <!-- Card 6 -->
              <div class="mega-card" data-pano-node="nodegallarey6" data-action="pano-nodegallarey6">
                <img src="tiles/nodegallarey6/thumb.jpg" alt="Gallarey 6" class="mega-card-img" onerror="this.src='pano_detached.png'">
                <div class="mega-card-overlay"></div>
                <div class="mega-card-title">Gallarey 6</div>
              </div>
              <!-- Card 7 -->
              <div class="mega-card" data-pano-node="nodegallarey7" data-action="pano-nodegallarey7">
                <img src="tiles/nodegallarey7/thumb.jpg" alt="Gallarey 7" class="mega-card-img" onerror="this.src='pano_semidetached.png'">
                <div class="mega-card-overlay"></div>
                <div class="mega-card-title">Gallarey 7</div>
              </div>
              <!-- Card 8 -->
              <div class="mega-card" data-pano-node="nodegallarey8" data-action="pano-nodegallarey8">
                <img src="tiles/nodegallarey8/thumb.jpg" alt="Gallarey 8" class="mega-card-img" onerror="this.src='pano_townhouse.png'">
                <div class="mega-card-overlay"></div>
                <div class="mega-card-title">Gallarey 8</div>
              </div>

          </div>
        </div>

        <!-- 5. KIẾN TRÚC -->
        <div class="nav-item" data-id="architecture" id="nav-architecture">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M3 21V8l9-6 9 6v13" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"/>
            <path d="M9 21v-6h6v6" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"/>
            <path d="M14 3v-1h3v4" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"/>
          </svg>
          <span>Kiến Trúc</span>
          <!-- Submenu -->
          <div class="nav-submenu">
            <div class="submenu-item" data-action="architecture-1">Kiến Trúc 1</div>
            <div class="submenu-item" data-action="architecture-2">Kiến Trúc 2</div>
            <div class="submenu-item" data-action="architecture-3">Kiến Trúc 3</div>
          </div>
        </div>

        <!-- 6. NỘI THẤT (Interior) -->
        <div class="nav-item" data-id="interior" id="nav-interior">
          <svg viewBox="0 0 24 24" fill="none">
            <rect x="2" y="3" width="20" height="14" rx="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M8 21h8" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 17v4" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M7 8h4M7 11h6" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>Nội Thất</span>
          
        </div>

        <!-- 7. LIÊN KẾT VÙNG (Liên kết vùng) -->
        <div class="nav-item" data-id="surrounding" id="nav-surrounding" data-action="region-page">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"/>
          </svg>
          <span>Liên kết vùng</span>
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

  const sidebarNavFuturisticHTML = `
    <div class="sidebar-container" id="sidebar-container">
      <div class="sidebar-toggle-btn" id="btn-sidebar-toggle" title="Mở rộng menu">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 5l7 7-7 7" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div class="sidebar-content">
        <div class="sidebar-logo" id="sidebar-logo">
          <div class="logo-script-top">TAV</div>
          <div class="logo-script-wave"></div>
          <div class="logo-script-sub">V I L L A</div>
        </div>
        <div class="sidebar-nav-list" id="sidebar-main-nav">
          <!-- Active Back Glow element -->
          <div class="active-nav-glow" id="nav-glow"></div>

          <!-- 1. TOP VIEW -->
          <div class="nav-item" data-id="topview" id="nav-topview">
            <svg viewBox="0 0 24 24" fill="none">
              <rect x="2" y="3" width="20" height="14" rx="2" stroke-linecap="round" stroke-linejoin="round"/>
              <line x1="8" y1="21" x2="16" y2="21" stroke-linecap="round" stroke-linejoin="round"/>
              <line x1="12" y1="17" x2="12" y2="21" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Top View</span>
            
          </div>

          <!-- 2. BIRD VIEW -->
          <div class="nav-item" data-id="birdview" id="nav-birdview">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M12 20h9M12 4h9M3 12l3-3 3 3M6 9v11M3 20h6" stroke="currentColor" stroke-width="2"/>
            </svg>
            <span>Bird View</span>
            <!-- Submenu -->
            <div class="nav-submenu">
              <div class="submenu-item" data-pano-node="pin_birdview">Bird View 1</div>
              <div class="submenu-item" data-pano-node="pin_top">Bird View 2</div>
              <div class="submenu-item" data-pano-node="pin_topnight">Bird View 3</div>
            </div>
          </div>

          <!-- 3. TIỆN ÍCH -->
          <div class="nav-item" data-id="amenities" id="nav-amenities">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5z" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M2 12l10 5 10-5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M2 17l10 5 10-5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Tiện ích</span>
            <!-- Submenu -->
            <div class="nav-submenu">
              <div class="submenu-item" data-pano-node="pin_park">TAV Park</div>
              <div class="submenu-item" data-pano-node="pin_park2">TAV Park 2</div>
              <div class="submenu-item" data-pano-node="pin_street">TAV Street</div>
            </div>
          </div>

          <!-- 4. TAV VILLA (Center script-node) -->
          <div class="nav-item center-logo-node" data-id="latien-brand" id="nav-logo">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M3 21h18M3 10h18M5 10V6a2 2 0 012-2h10a2 2 0 012 2v4M10 21V14h4v7" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"/>
            </svg>
            <span>TAV Villa</span>

            <!-- MEGA MENU: Compact cards -->
            <div class="nav-submenu mega-menu">

              <!-- Card 1 -->
              <div class="mega-card" data-pano-node="nodegallarey1" data-action="pano-nodegallarey1">
                <img src="tiles/nodegallarey1/thumb.jpg" alt="Gallarey 1" class="mega-card-img" onerror="this.src='pano_aerial.png'">
                <div class="mega-card-overlay"></div>
                <div class="mega-card-title">Gallarey 1</div>
              </div>
              <!-- Card 2 -->
              <div class="mega-card" data-pano-node="nodegallarey2" data-action="pano-nodegallarey2">
                <img src="tiles/nodegallarey2/thumb.jpg" alt="Gallarey 2" class="mega-card-img" onerror="this.src='pano_detached.png'">
                <div class="mega-card-overlay"></div>
                <div class="mega-card-title">Gallarey 2</div>
              </div>
              <!-- Card 3 -->
              <div class="mega-card" data-pano-node="nodegallarey3" data-action="pano-nodegallarey3">
                <img src="tiles/nodegallarey3/thumb.jpg" alt="Gallarey 3" class="mega-card-img" onerror="this.src='pano_semidetached.png'">
                <div class="mega-card-overlay"></div>
                <div class="mega-card-title">Gallarey 3</div>
              </div>
              <!-- Card 4 -->
              <div class="mega-card" data-pano-node="nodegallarey4" data-action="pano-nodegallarey4">
                <img src="tiles/nodegallarey4/thumb.jpg" alt="Gallarey 4" class="mega-card-img" onerror="this.src='pano_townhouse.png'">
                <div class="mega-card-overlay"></div>
                <div class="mega-card-title">Gallarey 4</div>
              </div>
              <!-- Card 5 -->
              <div class="mega-card" data-pano-node="nodegallarey5" data-action="pano-nodegallarey5">
                <img src="tiles/nodegallarey5/thumb.jpg" alt="Gallarey 5" class="mega-card-img" onerror="this.src='pano_aerial.png'">
                <div class="mega-card-overlay"></div>
                <div class="mega-card-title">Gallarey 5</div>
              </div>
              <!-- Card 6 -->
              <div class="mega-card" data-pano-node="nodegallarey6" data-action="pano-nodegallarey6">
                <img src="tiles/nodegallarey6/thumb.jpg" alt="Gallarey 6" class="mega-card-img" onerror="this.src='pano_detached.png'">
                <div class="mega-card-overlay"></div>
                <div class="mega-card-title">Gallarey 6</div>
              </div>
              <!-- Card 7 -->
              <div class="mega-card" data-pano-node="nodegallarey7" data-action="pano-nodegallarey7">
                <img src="tiles/nodegallarey7/thumb.jpg" alt="Gallarey 7" class="mega-card-img" onerror="this.src='pano_semidetached.png'">
                <div class="mega-card-overlay"></div>
                <div class="mega-card-title">Gallarey 7</div>
              </div>
              <!-- Card 8 -->
              <div class="mega-card" data-pano-node="nodegallarey8" data-action="pano-nodegallarey8">
                <img src="tiles/nodegallarey8/thumb.jpg" alt="Gallarey 8" class="mega-card-img" onerror="this.src='pano_townhouse.png'">
                <div class="mega-card-overlay"></div>
                <div class="mega-card-title">Gallarey 8</div>
              </div>

            </div>
          </div>

          <!-- 5. KIẾN TRÚC -->
          <div class="nav-item" data-id="architecture" id="nav-architecture">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M3 21V8l9-6 9 6v13" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"/>
              <path d="M9 21v-6h6v6" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"/>
              <path d="M14 3v-1h3v4" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"/>
            </svg>
            <span>Kiến trúc</span>
            <!-- Submenu -->
            <div class="nav-submenu">
              <div class="submenu-item" data-action="architecture-1">Kiến trúc 1</div>
              <div class="submenu-item" data-action="architecture-2">Kiến trúc 2</div>
              <div class="submenu-item" data-action="architecture-3">Kiến trúc 3</div>
            </div>
          </div>

          <!-- 6. NỘI THẤT (Interior) -->
          <div class="nav-item" data-id="interior" id="nav-interior">
            <svg viewBox="0 0 24 24" fill="none">
              <rect x="2" y="3" width="20" height="14" rx="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M8 21h8" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12 17v4" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M7 8h4M7 11h6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Nội thất</span>
            
          </div>

          <!-- 7. LIÊN KẾT VÙNG (Liên kết vùng) -->
          <div class="nav-item" data-id="surrounding" id="nav-surrounding" data-action="region-page">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"/>
            </svg>
            <span>Liên kết vùng</span>
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
  const neoLeftNavHTML = `
    <div class="neo-unified-container collapsed" id="neo-unified-container">
      <!-- Unified three-dot button (...) -->
      <div class="neo-unified-trigger" id="neo-unified-trigger" title="Mở menu">
        <svg viewBox="0 0 24 24" fill="none">
          <circle cx="6" cy="12" r="2" fill="currentColor"/>
          <circle cx="12" cy="12" r="2" fill="currentColor"/>
          <circle cx="18" cy="12" r="2" fill="currentColor"/>
        </svg>
      </div>
      
      <!-- Navigation Panel: RIGHT -> LEFT -->
      <div class="neo-nav-panel" id="neo-nav-panel">
        <!-- Top View Group -->
        <div class="neo-nav-item-group" data-id="topview">
          <div class="neo-nav-card" data-id="topview" id="nav-neo-topview" data-pano-node="node1" data-action="overview-top">
            <svg viewBox="0 0 24 24" fill="none">
              <rect x="2" y="3" width="20" height="14" rx="2" stroke-linecap="round" stroke-linejoin="round"/>
              <line x1="8" y1="21" x2="16" y2="21" stroke-linecap="round" stroke-linejoin="round"/>
              <line x1="12" y1="17" x2="12" y2="21" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Top View</span>
          </div>
        </div>

        <!-- Bird View Group -->
        <div class="neo-nav-item-group" data-id="birdview">
          <div class="neo-nav-card" data-id="birdview" id="nav-neo-birdview">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M12 20h9M12 4h9M3 12l3-3 3 3M6 9v11M3 20h6" stroke="currentColor" stroke-width="2"/>
            </svg>
            <span>Bird View</span>
          </div>
          <div class="neo-submenu-tree">
            <div class="submenu-item" data-action="overview-bird1" data-pano-node="node2">Bird View 1</div>
            <div class="submenu-item" data-action="overview-bird2" data-pano-node="node3">Bird View 2</div>
            <div class="submenu-item" data-action="overview-bird3" data-pano-node="node4">Bird View 3</div>
          </div>
        </div>

        <!-- Amenities Group -->
        <div class="neo-nav-item-group" data-id="amenities">
          <div class="neo-nav-card" data-id="amenities" id="nav-neo-amenities">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5z" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M2 12l10 5 10-5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M2 17l10 5 10-5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Tiện ích</span>
          </div>
          <div class="neo-submenu-tree">
            <div class="submenu-item" data-action="amenity-pool">Hồ Bơi</div>
            <div class="submenu-item" data-action="amenity-gym">Phòng Gym</div>
            <div class="submenu-item" data-action="amenity-park">Công Viên</div>
            <div class="submenu-item" data-action="amenity-spa">Spa & Massage</div>
          </div>
        </div>

        <!-- Architecture Group -->
        <div class="neo-nav-item-group" data-id="architecture">
          <div class="neo-nav-card" data-id="architecture" id="nav-neo-architecture">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M3 21V8l9-6 9 6v13" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"/>
              <path d="M9 21v-6h6v6" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"/>
              <path d="M14 3v-1h3v4" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"/>
            </svg>
            <span>Kiến trúc</span>
          </div>
          <div class="neo-submenu-tree">
            <div class="submenu-item" data-action="architecture-1">Kiến trúc 1</div>
            <div class="submenu-item" data-action="architecture-2">Kiến trúc 2</div>
            <div class="submenu-item" data-action="architecture-3">Kiến trúc 3</div>
          </div>
        </div>

        <!-- Interior Group -->
        <div class="neo-nav-item-group" data-id="interior">
          <div class="neo-nav-card" data-id="interior" id="nav-neo-interior">
            <svg viewBox="0 0 24 24" fill="none">
              <rect x="2" y="3" width="20" height="14" rx="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M8 21h8" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12 17v4" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M7 8h4M7 11h6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Nội thất</span>
          </div>
          <div class="neo-submenu-tree">
            <div class="submenu-item" data-action="interior-1">Nội thất 1</div>
            <div class="submenu-item" data-action="interior-2">Nội thất 2</div>
          </div>
        </div>

        <!-- Liên kết vùng Group -->
        <div class="neo-nav-item-group" data-id="surrounding">
          <div class="neo-nav-card" data-id="surrounding" id="nav-neo-logo" data-action="region-page">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"/>
            </svg>
            <span>Liên kết vùng</span>
          </div>
        </div>
      </div>

      <!-- Toolbar: TOP -> BOTTOM -->
      <div class="neo-toolbar" id="neo-toolbar">
        <!-- Project Information (First as requested) -->
        <div class="neo-dock-item" data-action="info">
          <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/><path d="M12 16v-4M12 8h.01" stroke="currentColor" stroke-width="2"/></svg>
          <div class="neo-tooltip">Thông Tin Dự Án</div>
        </div>

        <!-- Music -->
        <div class="neo-dock-item" data-action="music">
          <svg viewBox="0 0 24 24" fill="none"><path d="M9 18V5l12-2v13" stroke="currentColor" stroke-width="2"/><circle cx="6" cy="18" r="3" stroke="currentColor" stroke-width="2"/><circle cx="18" cy="16" r="3" stroke="currentColor" stroke-width="2"/></svg>
          <div class="neo-tooltip">Nhạc Nền</div>
        </div>
        
        <!-- Images -->
        <div class="neo-dock-item has-children" id="neo-images-parent">
          <svg viewBox="0 0 24 24" fill="none"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/></svg>
          <div class="neo-tooltip">Hình Ảnh</div>
          <div class="neo-dock-submenu">
            <div class="dock-pano-card" onclick="window.pano && window.pano.openNext('node1')">
              <img src="pano_aerial.png" alt="Top View">
              <span>Top View</span>
            </div>
            <div class="dock-pano-card" onclick="window.pano && window.pano.openNext('node2')">
              <img src="pano_detached.png" alt="Đơn lập">
              <span>Biệt thự Đơn lập</span>
            </div>
          </div>
        </div>

        <!-- Hotspots -->
        <div class="neo-dock-item" data-action="hotspots">
          <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" stroke-dasharray="4 4"/><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/></svg>
          <div class="neo-tooltip">Ẩn/Hiện Hotspots</div>
        </div>

        <!-- Share -->
        <div class="neo-dock-item has-children" id="neo-share-parent">
          <svg viewBox="0 0 24 24" fill="none"><path d="M18 8A3 3 0 1018 2a3 3 0 000 6zM6 15a3 3 0 100-6 3 3 0 000 6zM18 22a3 3 0 100-6 3 3 0 000 6zM8.59 13.51l6.83 3.98M15.41 6.51L8.59 10.49" stroke="currentColor" stroke-width="2"/></svg>
          <div class="neo-tooltip">Chia Sẻ</div>
          <div class="neo-dock-submenu flex-col">
            <a href="https://facebook.com" target="_blank" class="dock-share-btn facebook">Facebook</a>
            <a href="https://zalo.me" target="_blank" class="dock-share-btn zalo">Zalo</a>
          </div>
        </div>

        <!-- Call -->
        <div class="neo-dock-item" data-action="call">
          <svg viewBox="0 0 24 24" fill="none"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" stroke="currentColor" stroke-width="2"/></svg>
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

  const auroraLeftNavHTML = `
    <div class="aurora-nav-container collapsed" id="aurora-nav-container">
      <div class="aurora-nav-pin-btn" id="aurora-nav-pin-btn" title="Ghim thanh điều hướng">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="17" x2="12" y2="22" />
          <path d="M5 17h14v-1.76a2 2 0 0 0-.44-1.24l-2.78-3.5A2 2 0 0 1 15 9.26V5a3 3 0 0 0-6 0v4.26a2 2 0 0 1-.78 1.24l-2.78 3.5A2 2 0 0 0 5 15.24z" />
        </svg>
      </div>
      <div class="aurora-nav-list" id="aurora-main-nav">
        <!-- 1. TOP VIEW (Electric Cyan) -->
        <div class="aurora-nav-item-wrapper" data-id="topview">
          <div class="aurora-nav-item" data-id="topview" data-pano-node="node1" data-action="overview-top" style="--accent-color: var(--aurora-cyan);">
            <div class="aurora-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
            </div>
            <span class="aurora-nav-label">Top View</span>
          </div>
        </div>

        <!-- 2. BIRD VIEW (Purple) -->
        <div class="aurora-nav-item-wrapper has-children" data-id="birdview">
          <div class="aurora-nav-item" data-id="birdview" style="--accent-color: var(--aurora-purple);">
            <div class="aurora-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 2L11 13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </div>
            <span class="aurora-nav-label">Bird View</span>
            <svg class="aurora-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
          <div class="aurora-submenu">
            <div class="aurora-submenu-item" data-action="overview-bird1" data-pano-node="node2">Bird View 1</div>
            <div class="aurora-submenu-item" data-action="overview-bird2" data-pano-node="node3">Bird View 2</div>
            <div class="aurora-submenu-item" data-action="overview-bird3" data-pano-node="node4">Bird View 3</div>
          </div>
        </div>

        <!-- 3. AMENITIES (Emerald) -->
        <div class="aurora-nav-item-wrapper" data-id="amenities">
          <div class="aurora-nav-item" data-id="amenities" data-action="amenity-pool" style="--accent-color: var(--aurora-emerald);">
            <div class="aurora-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 9.8a7 7 0 0 1-9 8.2zM9 22v-2" />
              </svg>
            </div>
            <span class="aurora-nav-label">Tiện ích</span>
          </div>
        </div>

        <!-- 4. ARCHITECTURE (Orange) -->
        <div class="aurora-nav-item-wrapper" data-id="architecture">
          <div class="aurora-nav-item" data-id="architecture" data-action="architecture-1" style="--accent-color: var(--aurora-orange);">
            <div class="aurora-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <line x1="9" y1="3" x2="9" y2="21" />
                <line x1="15" y1="3" x2="15" y2="21" />
                <line x1="3" y1="9" x2="21" y2="9" />
                <line x1="3" y1="15" x2="21" y2="15" />
              </svg>
            </div>
            <span class="aurora-nav-label">Kiến trúc</span>
          </div>
        </div>

        <!-- 5. INTERIOR (Pink) -->
        <div class="aurora-nav-item-wrapper has-children" data-id="interior">
          <div class="aurora-nav-item" data-id="interior" style="--accent-color: var(--aurora-pink);">
            <div class="aurora-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M19 10V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v5m14 0a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2m14 0H5" />
                <line x1="6" y1="18" x2="6" y2="21" />
                <line x1="18" y1="18" x2="18" y2="21" />
              </svg>
            </div>
            <span class="aurora-nav-label">Nội thất</span>
            <svg class="aurora-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
          <div class="aurora-submenu">
            <div class="aurora-submenu-item" data-action="interior-1">Nội thất 1</div>
            <div class="aurora-submenu-item" data-action="interior-2">Nội thất 2</div>
          </div>
        </div>

        <!-- 6. LIÊN KẾT VÙNG (Electric Cyan) -->
        <div class="aurora-nav-item-wrapper" data-id="surrounding">
          <div class="aurora-nav-item" data-id="surrounding" data-action="region-page" style="--accent-color: var(--aurora-cyan);">
            <div class="aurora-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <span class="aurora-nav-label">Liên kết vùng</span>
          </div>
        </div>
      </div>
    </div>
  `;

  const auroraRightToolHTML = `
    <div class="aurora-tool-panel collapsed" id="aurora-tool-panel">
      <!-- Pin trigger -->
      <div class="aurora-tool-pin-btn" id="aurora-tool-pin-btn" title="Ghim bảng công cụ">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="17" x2="12" y2="22" />
          <path d="M5 17h14v-1.76a2 2 0 0 0-.44-1.24l-2.78-3.5A2 2 0 0 1 15 9.26V5a3 3 0 0 0-6 0v4.26a2 2 0 0 1-.78 1.24l-2.78 3.5A2 2 0 0 0 5 15.24z" />
        </svg>
      </div>

      <div class="aurora-tool-list">
        <!-- Project Information (Purple) -->
        <div class="aurora-tool-item" data-action="info" title="Thông Tin Dự Án" style="--accent-color: var(--aurora-purple);">
          <div class="aurora-tool-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
          </div>
          <span class="aurora-tool-label">Thông Tin</span>
        </div>

        <!-- Music (Pink) -->
        <div class="aurora-tool-item" data-action="music" title="Nhạc Nền" style="--accent-color: var(--aurora-pink);">
          <div class="aurora-tool-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
          </div>
          <span class="aurora-tool-label">Nhạc Nền</span>
        </div>

        <!-- Images (Purple) -->
        <div class="aurora-tool-item has-submenu" id="aurora-tool-images" title="Hình Ảnh" style="--accent-color: var(--aurora-purple);">
          <div class="aurora-tool-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
          <span class="aurora-tool-label">Hình Ảnh</span>
          <div class="aurora-tool-submenu">
            <div class="aurora-pano-card" onclick="window.pano && window.pano.openNext('node1')">
              <img src="pano_aerial.png" alt="Top View">
              <span>Top View</span>
            </div>
            <div class="aurora-pano-card" onclick="window.pano && window.pano.openNext('node2')">
              <img src="pano_detached.png" alt="Đơn lập">
              <span>Biệt thự Đơn lập</span>
            </div>
          </div>
        </div>

        <!-- Hotspots (Emerald) -->
        <div class="aurora-tool-item" data-action="hotspots" title="Ẩn/Hiện Hotspots" style="--accent-color: var(--aurora-emerald);">
          <div class="aurora-tool-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10" stroke-dasharray="4 4" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </div>
          <span class="aurora-tool-label">Hotspots</span>
        </div>

        <!-- Share (Orange) -->
        <div class="aurora-tool-item has-submenu" id="aurora-tool-share" title="Chia Sẻ" style="--accent-color: var(--aurora-orange);">
          <div class="aurora-tool-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
              <polyline points="16 6 12 2 8 6" />
              <line x1="12" y1="2" x2="12" y2="15" />
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
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </div>
          <span class="aurora-tool-label">Tư Vấn</span>
        </div>


        <!-- Fullscreen (Electric Cyan) -->
        <div class="aurora-tool-item" data-action="fullscreen" title="Toàn Màn Hình" style="--accent-color: var(--aurora-cyan);">
          <div class="aurora-tool-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
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

  const horizonBottomDockHTML = `
    <div class="horizon-nav-container" id="horizon-nav-container">
      <div class="horizon-dock">
        <!-- 1. TOP VIEW -->
        <div class="horizon-nav-item-wrapper" data-id="topview">
          <div class="horizon-nav-item" data-id="topview" data-pano-node="node1" data-action="overview-top">
            <span class="horizon-nav-label">Top View</span>
          </div>
        </div>

        <!-- 2. BIRD VIEW -->
        <div class="horizon-nav-item-wrapper has-submenu" data-id="birdview">
          <div class="horizon-nav-item" data-id="birdview">
            <span class="horizon-nav-label">Bird View</span>
          </div>
          <div class="horizon-submenu">
            <div class="horizon-submenu-item" data-action="overview-bird1" data-pano-node="node2">Bird View 1</div>
            <div class="horizon-submenu-item" data-action="overview-bird2" data-pano-node="node3">Bird View 2</div>
            <div class="horizon-submenu-item" data-action="overview-bird3" data-pano-node="node4">Bird View 3</div>
          </div>
        </div>

        <!-- 3. AMENITIES -->
        <div class="horizon-nav-item-wrapper has-submenu" data-id="amenities">
          <div class="horizon-nav-item" data-id="amenities" data-action="amenity-pool">
            <span class="horizon-nav-label">Tiện ích</span>
          </div>
          <div class="horizon-submenu">
            <div class="horizon-submenu-item" data-action="amenity-pool">Hồ Bơi</div>
            <div class="horizon-submenu-item" data-action="amenity-gym">Phòng Gym</div>
            <div class="horizon-submenu-item" data-action="amenity-park">Công Viên</div>
            <div class="horizon-submenu-item" data-action="amenity-spa">Spa & Massage</div>
          </div>
        </div>

        <!-- 4. ARCHITECTURE -->
        <div class="horizon-nav-item-wrapper has-submenu" data-id="architecture">
          <div class="horizon-nav-item" data-id="architecture" data-action="architecture-1">
            <span class="horizon-nav-label">Kiến trúc</span>
          </div>
          <div class="horizon-submenu">
            <div class="horizon-submenu-item" data-action="architecture-1">Kiến trúc 1</div>
            <div class="horizon-submenu-item" data-action="architecture-2">Kiến trúc 2</div>
            <div class="horizon-submenu-item" data-action="architecture-3">Kiến trúc 3</div>
          </div>
        </div>

        <!-- 5. INTERIOR -->
        <div class="horizon-nav-item-wrapper has-submenu" data-id="interior">
          <div class="horizon-nav-item" data-id="interior">
            <span class="horizon-nav-label">Nội thất</span>
          </div>
          <div class="horizon-submenu">
            <div class="horizon-submenu-item" data-action="interior-1">Nội thất 1</div>
            <div class="horizon-submenu-item" data-action="interior-2">Nội thất 2</div>
          </div>
        </div>

        <!-- 6. LIÊN KẾT VÙNG -->
        <div class="horizon-nav-item-wrapper" data-id="surrounding">
          <div class="horizon-nav-item" data-id="surrounding" data-action="region-page">
            <span class="horizon-nav-label">Liên kết vùng</span>
          </div>
        </div>
      </div>
    </div>
  `;

  const horizonRightToolHTML = `
    <div class="horizon-tool-panel" id="horizon-tool-panel">
      <!-- Project Information -->
      <div class="horizon-tool-item" data-action="info" title="Thông Tin Dự Án">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      </div>

      <!-- Music -->
      <div class="horizon-tool-item" data-action="music" title="Nhạc Nền">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      </div>

      <!-- Images -->
      <div class="horizon-tool-item has-submenu" id="horizon-tool-images" title="Hình Ảnh">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
        <div class="horizon-tool-submenu">
          <div class="horizon-pano-card" onclick="window.pano && window.pano.openNext('node1')">
            <img src="pano_aerial.png" alt="Top View">
            <span>Top View</span>
          </div>
          <div class="horizon-pano-card" onclick="window.pano && window.pano.openNext('node2')">
            <img src="pano_detached.png" alt="Đơn lập">
            <span>Biệt thự Đơn lập</span>
          </div>
        </div>
      </div>

      <!-- Hotspots -->
      <div class="horizon-tool-item" data-action="hotspots" title="Ẩn/Hiện Hotspots">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10" stroke-dasharray="3 3" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </div>

      <!-- Share -->
      <div class="horizon-tool-item has-submenu" id="horizon-tool-share" title="Chia Sẻ">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
          <polyline points="16 6 12 2 8 6" />
          <line x1="12" y1="2" x2="12" y2="15" />
        </svg>
        <div class="horizon-tool-submenu flex-col">
          <a href="https://facebook.com" target="_blank" class="horizon-share-btn facebook">Facebook</a>
          <a href="https://zalo.me" target="_blank" class="horizon-share-btn zalo">Zalo</a>
        </div>
      </div>

      <!-- Call -->
      <div class="horizon-tool-item" data-action="call" title="Tư Vấn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      </div>


      <!-- Fullscreen -->
      <div class="horizon-tool-item" data-action="fullscreen" title="Toàn Màn Hình">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
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
  const prismNavHTML = `
    <div class="prism-nav-container" id="prism-nav-container">
      <div class="prism-nav-wrapper">
        <div class="prism-nav-list">

          <!-- Item 1: Top View -->
          <div class="prism-nav-item" data-id="topview" data-pano-node="node1" data-action="overview-top">
            <div class="prism-nav-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <span class="prism-nav-label">Top View</span>
          </div>

          <!-- Item 2: Bird View (has submenu) -->
          <div class="prism-nav-item has-submenu" data-id="birdview">
            <div class="prism-nav-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <path d="M12 22V12" /><path d="m12 12 8.7-5" /><path d="m12 12-8.7-5" />
              </svg>
            </div>
            <span class="prism-nav-label">Bird View</span>
            <div class="prism-submenu">
              <div class="prism-submenu-item" data-action="overview-bird1" data-pano-node="node2">Bird View 1</div>
              <div class="prism-submenu-item" data-action="overview-bird2" data-pano-node="node3">Bird View 2</div>
              <div class="prism-submenu-item" data-action="overview-bird3" data-pano-node="node4">Bird View 3</div>
            </div>
          </div>

          <!-- Item 3: Amenities -->
          <div class="prism-nav-item" data-id="amenities" data-action="amenity-pool">
            <div class="prism-nav-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m12 3-1.912 5.886H3.88l5.03 3.656L7.002 18.43 12 14.772l4.998 3.656-1.908-5.888 5.03-3.656h-6.208L12 3Z" />
              </svg>
            </div>
            <span class="prism-nav-label">Tiện ích</span>
          </div>

          <!-- Item 4: Architecture -->
          <div class="prism-nav-item" data-id="architecture" data-action="architecture-1">
            <div class="prism-nav-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
                <path d="m8 10 3 3 5-5" />
              </svg>
            </div>
            <span class="prism-nav-label">Kiến trúc</span>
          </div>

          <!-- Item 5: Interior (has submenu) -->
          <div class="prism-nav-item has-submenu" data-id="interior">
            <div class="prism-nav-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M9 3v18" /><path d="M15 3v18" />
                <path d="M3 9h18" /><path d="M3 15h18" />
              </svg>
            </div>
            <span class="prism-nav-label">Nội thất</span>
            <div class="prism-submenu">
              <div class="prism-submenu-item" data-action="interior-1">Nội thất 1</div>
              <div class="prism-submenu-item" data-action="interior-2">Nội thất 2</div>
            </div>
          </div>

          <!-- Item 6: Liên kết vùng -->
          <div class="prism-nav-item" data-id="surrounding" data-action="region-page">
            <div class="prism-nav-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <span class="prism-nav-label">Liên Kết Vùng</span>
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
  const nexusNavHTML = `
    <div class="nexus-nav-container" id="nexus-nav-container">
      <div class="nexus-nav-wrapper">
        <div class="nexus-nav-list">

          <!-- Item 1: Top View -->
          <div class="nexus-nav-item" data-id="topview" data-pano-node="node1" data-action="overview-top">
            <div class="nexus-nav-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0Z" />
              </svg>
            </div>
            <span class="nexus-nav-label">Top View</span>
            <span class="nexus-active-line"></span>
          </div>

          <!-- Item 2: Bird View -->
          <div class="nexus-nav-item has-submenu" data-id="birdview">
            <div class="nexus-nav-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
              </svg>
            </div>
            <span class="nexus-nav-label">Bird View</span>
            <span class="nexus-active-line"></span>
            <div class="nexus-submenu">
              <div class="nexus-submenu-item" data-action="overview-bird1" data-pano-node="node2">Bird View 1</div>
              <div class="nexus-submenu-item" data-action="overview-bird2" data-pano-node="node3">Bird View 2</div>
              <div class="nexus-submenu-item" data-action="overview-bird3" data-pano-node="node4">Bird View 3</div>
            </div>
          </div>

          <!-- Item 3: Amenities -->
          <div class="nexus-nav-item" data-id="amenities" data-action="amenity-pool">
            <div class="nexus-nav-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="m12 3-1.912 5.886H3.88l5.03 3.656L7.002 18.43 12 14.772l4.998 3.656-1.908-5.888 5.03-3.656h-6.208L12 3Z" />
              </svg>
            </div>
            <span class="nexus-nav-label">Tiện ích</span>
            <span class="nexus-active-line"></span>
          </div>

          <!-- Item 4: Architecture -->
          <div class="nexus-nav-item" data-id="architecture" data-action="architecture-1">
            <div class="nexus-nav-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M9 3v18" />
                <path d="m15 9-6 6" />
                <path d="M15 15h3" />
                <path d="M15 9h3" />
              </svg>
            </div>
            <span class="nexus-nav-label">Kiến trúc</span>
            <span class="nexus-active-line"></span>
          </div>

          <!-- Item 5: Interior -->
          <div class="nexus-nav-item has-submenu" data-id="interior">
            <div class="nexus-nav-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 18v3h16v-3" />
                <path d="M4 10v4h16v-4" />
                <path d="M8 10V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v5" />
                <path d="M12 10V3" />
              </svg>
            </div>
            <span class="nexus-nav-label">Nội thất</span>
            <span class="nexus-active-line"></span>
            <div class="nexus-submenu">
              <div class="nexus-submenu-item" data-action="interior-1">Nội thất 1</div>
              <div class="nexus-submenu-item" data-action="interior-2">Nội thất 2</div>
            </div>
          </div>

          <!-- Item 6: Liên kết vùng -->
          <div class="nexus-nav-item" data-id="surrounding" data-action="region-page">
            <div class="nexus-nav-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M9 20 3 17V4l6 3 6-3 6 3v13z" />
                <path d="M9 7v13" />
                <path d="M15 4v13" />
              </svg>
            </div>
            <span class="nexus-nav-label">Liên Kết Vùng</span>
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
  const monarchNavHTML = `
    <div class="monarch-nav-container" id="monarch-nav-container">
      <div class="monarch-nav-wrapper">
        <div class="monarch-nav-dock">
          <div class="monarch-nav-item" data-id="topview" data-pano-node="node1" data-action="overview-top">
            <div class="monarch-nav-btn monarch-hover-sweep">
              <span class="monarch-nav-label">Top View</span>
            </div>
          </div>
          
          <div class="monarch-nav-item has-popover" data-id="birdview">
            <div class="monarch-nav-btn monarch-hover-sweep">
              <span class="monarch-nav-label">Bird View</span>
            </div>
            <div class="monarch-popover">
              <div class="monarch-popover-title">BIRD VIEW</div>
              <div class="monarch-popover-items">
                <div class="monarch-popover-item monarch-hover-sweep" data-action="overview-bird1" data-pano-node="node2">Bird View 1</div>
                <div class="monarch-popover-item monarch-hover-sweep" data-action="overview-bird2" data-pano-node="node3">Bird View 2</div>
                <div class="monarch-popover-item monarch-hover-sweep" data-action="overview-bird3" data-pano-node="node4">Bird View 3</div>
              </div>
            </div>
          </div>
          
          <div class="monarch-nav-item has-popover" data-id="amenities">
            <div class="monarch-nav-btn monarch-hover-sweep">
              <span class="monarch-nav-label">Tiện ích</span>
            </div>
            <div class="monarch-popover">
              <div class="monarch-popover-title">TIỆN ÍCH</div>
              <div class="monarch-popover-items">
                <div class="monarch-popover-item monarch-hover-sweep" data-action="amenity-clubhouse" data-pano-node="node1">Clubhouse</div>
                <div class="monarch-popover-item monarch-hover-sweep" data-action="amenity-marina" data-pano-node="node1">Bến Du Thuyền</div>
                <div class="monarch-popover-item monarch-hover-sweep" data-action="amenity-sport" data-pano-node="node2">Khu Thể Thao</div>
                <div class="monarch-popover-item monarch-hover-sweep" data-action="amenity-park" data-pano-node="node3">Central Park</div>
              </div>
            </div>
          </div>
          
          <div class="monarch-nav-item has-popover" data-id="architecture">
            <div class="monarch-nav-btn monarch-hover-sweep">
              <span class="monarch-nav-label">Kiến trúc</span>
            </div>
            <div class="monarch-popover">
              <div class="monarch-popover-title">KIẾN TRÚC</div>
              <div class="monarch-popover-items">
                <div class="monarch-popover-item monarch-hover-sweep" data-action="arch-layout" data-pano-node="node3">Mặt Bằng Tổng Thể</div>
                <div class="monarch-popover-item monarch-hover-sweep" data-action="arch-semi" data-pano-node="node4">Biệt Thự Song Lập</div>
                <div class="monarch-popover-item monarch-hover-sweep" data-action="arch-detached" data-pano-node="node5">Biệt Thự Đơn Lập</div>
              </div>
            </div>
          </div>
          
          <div class="monarch-nav-item" data-id="interior" data-action="interior-1">
            <div class="monarch-nav-btn monarch-hover-sweep">
              <span class="monarch-nav-label">Nội thất</span>
            </div>
          </div>
          
          <div class="monarch-nav-item" data-id="surrounding" data-action="region-page">
            <div class="monarch-nav-btn monarch-hover-sweep">
              <span class="monarch-nav-label">Liên kết vùng</span>
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

  const monarchLayoutSelectorHTML = `
    <div class="monarch-layout-selector" id="monarch-layout-selector">
      <div class="monarch-selector-header">
        <span>GIAO DIỆN</span>
      </div>
      <div class="monarch-selector-grid">
        <div class="monarch-selector-item monarch-hover-sweep" data-layout="classic">01</div>
        <div class="monarch-selector-item monarch-hover-sweep" data-layout="futuristic">02</div>
        <div class="monarch-selector-item monarch-hover-sweep" data-layout="neo">03</div>
        <div class="monarch-selector-item monarch-hover-sweep" data-layout="gradient">04</div>
        <div class="monarch-selector-item monarch-hover-sweep" data-layout="aurora">05</div>
        <div class="monarch-selector-item monarch-hover-sweep" data-layout="horizon">06</div>
        <div class="monarch-selector-item monarch-hover-sweep" data-layout="prism">08</div>
        <div class="monarch-selector-item monarch-hover-sweep" data-layout="nexus">09</div>
        <div class="monarch-selector-item monarch-hover-sweep" data-layout="monarch">10</div>
        <div class="monarch-selector-item monarch-hover-sweep" data-layout="regal">11</div>
      </div>
    </div>
  `;

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
          <img src="pano_aerial.png" alt="Bản đồ dự án" class="minimap-img" id="minimap-img">
          <!-- Current viewpoint cone indicator -->
          <div class="minimap-viewcone" id="minimap-viewcone"></div>
          <!-- Current position dot -->
          <div class="minimap-dot" id="minimap-dot"></div>
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
    } else if (layoutMode === "aurora") {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = auroraLeftNavHTML + auroraRightToolHTML;
      while (tempDiv.firstChild) {
        uiWrapper.appendChild(tempDiv.firstChild);
      }
      setupAuroraListeners();
    } else if (layoutMode === "horizon") {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = horizonBottomDockHTML + horizonRightToolHTML;
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
      tempDiv.innerHTML = nexusNavHTML + nexusRightToolHTML;
      while (tempDiv.firstChild) {
        uiWrapper.appendChild(tempDiv.firstChild);
      }
      setupNexusListeners();
    } else if (layoutMode === "monarch" || layoutMode === "regal") {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = monarchNavHTML + monarchCommandPanelHTML + monarchLayoutSelectorHTML;
      while (tempDiv.firstChild) {
        uiWrapper.appendChild(tempDiv.firstChild);
      }
      setupMonarchListeners(handleSwitch);
    }

    // Inject Minimap
    const oldMinimap = document.getElementById("minimap-widget");
    if (oldMinimap) {
      oldMinimap.remove();
    }
    const mapDiv = document.createElement("div");
    if (layoutMode === "monarch" || layoutMode === "regal") {
      mapDiv.innerHTML = monarchMinimapHTML;
    } else {
      mapDiv.innerHTML = minimapWidgetHTML;
    }
    document.body.appendChild(mapDiv.firstElementChild);
    setupMinimapListeners();
    populateMinimapMarkers();
    updateMinimapPosition(activePanoNode);
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
    } else if (layoutMode === "monarch" || layoutMode === "regal") {
      compassDiv.innerHTML = monarchCompassHTML;
    } else {
      compassDiv.innerHTML = compassWidgetHTML;
    }
    document.body.appendChild(compassDiv.firstElementChild);

    // Restore selected active highlights
    restoreActiveStates();
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
        if (parentNavItem) {
          parentNavItem.classList.remove("is-open");
        }

        routeNavigation(this);
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
          parentNavItem.classList.remove("is-open");
          if (sidebarContainer) {
            sidebarContainer.classList.remove("submenu-open");
            sidebarContainer.classList.remove("mega-open");
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
            if (action && ["music", "hotspots", "info", "fullscreen", "call"].includes(action)) {
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
          
          // Allow navigation for interior
          const id = this.getAttribute("data-id");
          if (id === "interior") {
            navItems.forEach(n => n.classList.remove("active"));
            submenuItems.forEach(s => s.classList.remove("active"));
            this.classList.add("active");
            
            activeNavItemId = id;
            lsSet("latien_active_nav", activeNavItemId);
            
            routeNavigation(this);
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
          
          // Allow navigation for interior
          const id = this.getAttribute("data-id");
          if (id === "interior") {
            navItems.forEach(n => n.classList.remove("active"));
            submenuItems.forEach(s => s.classList.remove("active"));
            this.classList.add("active");
            
            activeNavItemId = id;
            lsSet("latien_active_nav", activeNavItemId);
            
            routeNavigation(this);
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
          
          // Allow navigation for interior
          const id = this.getAttribute("data-id");
          if (id === "interior") {
            navItems.forEach(n => n.classList.remove("active"));
            submenuItems.forEach(s => s.classList.remove("active"));
            this.classList.add("active");
            
            activeNavItemId = id;
            lsSet("latien_active_nav", activeNavItemId);
            
            routeNavigation(this);
          }
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
          
          // Allow navigation for interior
          const id = this.getAttribute("data-id");
          if (id === "interior") {
            navItems.forEach(n => n.classList.remove("active"));
            submenuItems.forEach(s => s.classList.remove("active"));
            this.classList.add("active");
            
            activeNavItemId = id;
            lsSet("latien_active_nav", activeNavItemId);
            
            routeNavigation(this);
          }
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
  // MONARCH LAYOUT LISTENERS
  // ==========================================
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
        btn.classList.toggle("active-tool", isMusicMuted);
        showNotification(isMusicMuted ? "Nhạc nền đã tắt" : "Nhạc nền đã bật");
        break;

      case "images":
        isImagesHidden = !isImagesHidden;
        if (window.pano && typeof window.pano.setTextureVisible === "function") {
          window.pano.setTextureVisible(!isImagesHidden);
        }
        btn.classList.toggle("active-tool", isImagesHidden);
        showNotification(isImagesHidden ? "Hình ảnh đã ẩn" : "Hình ảnh đã hiện");
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
          navigator.share({ title: "TAV Villa", text: "Khám phá dự án TAV Villa", url: window.location.href })
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

  const node2dPositions = {
    "node1": { x: 50, y: 50 },
    "node2": { x: 42.5, y: 36 },
    "node3": { x: 55.5, y: 38 },
    "node4": { x: 66, y: 47 }
  };

  const node2dCoordinates = {
    "pin_villa_a1": { x: 40, y: 34, color: "#a855f7" }, // Purple
    "pin_villa_a2": { x: 45, y: 38, color: "#a855f7" }, // Purple
    "pin_villa_b1": { x: 58, y: 35, color: "#ec4899" }, // Pink
    "pin_villa_b2": { x: 53, y: 41, color: "#ec4899" }, // Pink
    "pin_villa_c1": { x: 66, y: 47, color: "#10b981" }, // Emerald
    "pin_clubhouse": { x: 32, y: 52, color: "#06b6d4" }, // Cyan
    "pin_beach_bar": { x: 23, y: 65, color: "#f97316" }  // Orange
  };

  function updateMinimapPosition(nodeId) {
    const dot = document.getElementById("minimap-dot");
    const viewcone = document.getElementById("minimap-viewcone");
    if (!dot || !viewcone) return;
    
    const pos = node2dPositions[nodeId] || { x: 50, y: 50 };
    dot.style.left = pos.x + "%";
    dot.style.top = pos.y + "%";
    viewcone.style.left = pos.x + "%";
    viewcone.style.top = pos.y + "%";
  }

  function populateMinimapMarkers() {
    const canvas = document.getElementById("minimap-canvas");
    if (!canvas) return;
    
    const targetContainer = document.getElementById("minimap-zoom-wrapper") || canvas;
    
    const existing = targetContainer.querySelectorAll(".minimap-marker");
    existing.forEach(el => el.remove());
    
    mapMarkers.forEach(pin => {
      const coords = node2dCoordinates[pin.id];
      if (!coords) return;
      
      const marker = document.createElement("div");
      marker.className = "minimap-marker";
      marker.style.left = coords.x + "%";
      marker.style.top = coords.y + "%";
      marker.style.setProperty("--marker-color", coords.color);
      marker.setAttribute("data-id", pin.id);
      marker.setAttribute("data-node-target", pin.nodeTarget);
      
      marker.innerHTML = `
        <span class="marker-pulse-ring"></span>
        <div class="minimap-marker-tooltip">${pin.title}</div>
      `;
      
      marker.addEventListener("click", function(e) {
        e.stopPropagation();
        
        // Open the pano node
        if (window.pano) {
          window.pano.openNext(`{${pin.nodeTarget}}`);
        }
        
        // Highlight active card
        const megaCards = document.querySelectorAll(".mega-card");
        megaCards.forEach(card => {
          if (card.getAttribute("data-pano-node") === pin.nodeTarget) {
            card.click();
          }
        });
      });
      
      targetContainer.appendChild(marker);
    });
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

      // Mouse wheel zoom centered on cursor
      const zoomWrapper = document.getElementById("minimap-zoom-wrapper");
      if (zoomWrapper) {
        let currentZoom = 1.0;
        const maxZoom = 3.5;
        const minZoom = 1.0;
        const step = 0.15;

        canvas.addEventListener("wheel", function(e) {
          e.preventDefault();
          e.stopPropagation();

          if (widget.classList.contains("collapsed")) return;

          if (e.deltaY < 0) {
            currentZoom = Math.min(maxZoom, currentZoom + step);
          } else {
            currentZoom = Math.max(minZoom, currentZoom - step);
          }

          const rect = canvas.getBoundingClientRect();
          const mouseX = ((e.clientX - rect.left) / rect.width) * 100;
          const mouseY = ((e.clientY - rect.top) / rect.height) * 100;

          zoomWrapper.style.transformOrigin = `${mouseX}% ${mouseY}%`;
          zoomWrapper.style.transform = `scale(${currentZoom})`;
        }, { passive: false });
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
    const listItems = document.querySelectorAll("#region-page .region-menu-item");
    const pins = document.querySelectorAll("#region-page .map-pin");

    listItems.forEach(item => {
      item.addEventListener("click", function(e) {
        e.stopPropagation();
        listItems.forEach(li => li.classList.remove("active"));
        this.classList.add("active");

        const category = this.getAttribute("data-category");
        pins.forEach(pin => {
          if (pin.classList.contains(category)) {
            pin.classList.add("active");
          } else {
            pin.classList.remove("active");
          }
        });
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


    // Custom generic gallery pages for Classic Layout
    if (document.body.classList.contains("layout-classic")) {
      if (id === "topview") {
        openClassicSidebarPage("classic-topview-page", "Top View", [
          { title: "Top View Day", node: "pin_top" },
          { title: "Top View Night", node: "pin_topnight" }
        ]);
        return;
      }
      if (id === "interior") {
        openClassicSidebarPage("classic-interior-page", "Interior", [
          { title: "TAV Living 1", node: "pin_living" },
          { title: "TAV Living 2", node: "pin_living2" },
          { title: "TAV WC", node: "pinwc" },
          { title: "TAV Thong Tang", node: "pintangthong" }
        ]);
        return;
      }
    }

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
    uiWrapper.innerHTML = gradientDefs + layoutSwitcherHTML;
    document.body.appendChild(uiWrapper);

    // Sync top-level body classes
    document.body.classList.remove("layout-classic", "layout-futuristic", "layout-neo", "layout-gradient", "layout-aurora", "layout-horizon", "layout-prism", "layout-nexus", "layout-monarch");
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
      regionDiv.innerHTML = `
        <div class="region-sidebar">
          <div class="sidebar-header">
            <h3>LIÊN KẾT VÙNG</h3>
          </div>
          <ul class="region-menu-list">
            <li class="region-menu-item active" data-category="hospital">
              <span class="icon">🏥</span> Bệnh viện
            </li>
            <li class="region-menu-item" data-category="school">
              <span class="icon">🏫</span> Trường học
            </li>
            <li class="region-menu-item" data-category="station">
              <span class="icon">🚉</span> Nhà ga
            </li>
            <li class="region-menu-item" data-category="airport">
              <span class="icon">✈️</span> Sân bay
            </li>
            <li class="region-menu-item" data-category="mall">
              <span class="icon">🛍️</span> Trung tâm thương mại
            </li>
            <li class="region-menu-item" data-category="park">
              <span class="icon">🌳</span> Công viên
            </li>
            <li class="region-menu-item" data-category="admin">
              <span class="icon">🏛️</span> Cơ quan hành chính
            </li>
            <li class="region-menu-item" data-category="highway">
              <span class="icon">🛣️</span> Đường quốc lộ
            </li>
          </ul>
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
            <img src="regional_map.png" alt="Bản đồ liên kết vùng" class="region-map-img">
            <div class="map-pin hospital active" style="top: 45%; left: 35%;">
              <div class="pin-pulse"></div>
              <div class="pin-dot">🏥</div>
              <div class="pin-label">Bệnh viện Đa khoa Quốc tế</div>
            </div>
            <div class="map-pin school" style="top: 30%; left: 60%;">
              <div class="pin-pulse"></div>
              <div class="pin-dot">🏫</div>
              <div class="pin-label">Trường THPT Quốc tế</div>
            </div>
            <div class="map-pin station" style="top: 65%; left: 20%;">
              <div class="pin-pulse"></div>
              <div class="pin-dot">🚉</div>
              <div class="pin-label">Nhà ga Trung tâm</div>
            </div>
            <div class="map-pin airport" style="top: 15%; left: 80%;">
              <div class="pin-pulse"></div>
              <div class="pin-dot">✈️</div>
              <div class="pin-label">Sân bay Quốc tế</div>
            </div>
            <div class="map-pin mall" style="top: 50%; left: 55%;">
              <div class="pin-pulse"></div>
              <div class="pin-dot">🛍️</div>
              <div class="pin-label">Trung tâm Thương mại Latien Mall</div>
            </div>
            <div class="map-pin park" style="top: 40%; left: 45%;">
              <div class="pin-pulse"></div>
              <div class="pin-dot">🌳</div>
              <div class="pin-label">Công viên Trung tâm 10ha</div>
            </div>
            <div class="map-pin admin" style="top: 25%; left: 30%;">
              <div class="pin-pulse"></div>
              <div class="pin-dot">🏛️</div>
              <div class="pin-label">Ủy ban Nhân dân Quận</div>
            </div>
            <div class="map-pin highway" style="top: 75%; left: 70%;">
              <div class="pin-pulse"></div>
              <div class="pin-dot">🛣️</div>
              <div class="pin-label">Đường Quốc lộ 1A</div>
            </div>
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
        document.body.classList.remove("layout-classic", "layout-futuristic", "layout-neo", "layout-gradient", "layout-aurora", "layout-horizon", "layout-prism", "layout-nexus", "layout-monarch", "layout-regal");
        document.body.classList.add(`layout-${layoutMode}`);

        // Update container class namespaces
        uiWrapper.className = `modern-ui-overlay layout-${layoutMode}`;

        // Re-inject layout structures and bind events
        injectLayoutComponents(handleSwitch);

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
        else if (layoutMode === "aurora") notifMsg = "Đã chuyển sang Giao diện Aurora";
        else if (layoutMode === "horizon") notifMsg = "Đã chuyển sang Giao diện Horizon";
        else if (layoutMode === "prism") notifMsg = "Đã chuyển sang Giao diện Prism";
        else if (layoutMode === "nexus") notifMsg = "Đã chuyển sang Giao diện Nexus";
        else if (layoutMode === "monarch") notifMsg = "Đã chuyển sang Giao diện Monarch";
        else if (layoutMode === "regal") notifMsg = "Đã chuyển sang Giao diện Regal";
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

    container.addEventListener("click", function (e) {
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
    updateMinimapPosition(currentNodeId);

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
