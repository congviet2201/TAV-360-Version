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
    <div class="layout-switcher-pill" id="layout-switcher">
      <div class="switcher-segment" id="opt-layout-classic" data-layout="classic">Cổ điển</div>
      <div class="switcher-segment" id="opt-layout-futuristic" data-layout="futuristic">Tương lai</div>
      <div class="switcher-slider" id="switcher-slider"></div>
    </div>
  `;

  // ==========================================
  // OPTION A: CLASSIC LAYOUT TEMPLATES
  // ==========================================

  // Right Tool Stack (Settings Panel) with gear integrated at the bottom
  const verticalToolStackClassicHTML = `
    <div class="vertical-tool-stack" id="right-tool-stack">
      <!-- Sub-stack containing 5 biometric buttons -->
      <div class="tool-buttons-sub-stack" id="tool-sub-stack">
        <!-- Button 1: Retinal Compass -->
        <div class="tool-button" data-action="compass" id="btn-compass">
          <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="18" cy="18" r="14" stroke="currentColor" stroke-width="1" stroke-dasharray="2 3" opacity="0.6"/>
            <circle cx="18" cy="18" r="10" stroke="currentColor" stroke-width="1.5" />
            <circle cx="18" cy="18" r="6" stroke="currentColor" stroke-width="1" stroke-dasharray="8 4" />
            <path d="M18 2V8M18 28V34M2 18H8M28 18H34" stroke="currentColor" stroke-width="1" opacity="0.7"/>
            <circle cx="18" cy="18" r="2" fill="currentColor"/>
          </svg>
          <div class="tool-label">LA BÀN SINH TRẮC</div>
        </div>

        <!-- Button 2: Biometric Facade (Handprint + Building) -->
        <div class="tool-button" data-action="facade" id="btn-facade">
          <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 8H28V30H8V8Z" stroke="currentColor" stroke-width="1" opacity="0.4"/>
            <path d="M13 8V30M18 8V30M23 8V30M8 14H28M8 20H28M8 26H28" stroke="currentColor" stroke-width="0.8" opacity="0.3"/>
            <path d="M15 15C15 14 16 12 18 12C20 12 21 14 21 15V22M13 18C13 16.5 14 15 15 15M23 18C23 16.5 22 15 21 15M11 20C11 19 12 18 13 18M25 20C25 19 24 18 23 18M18 26C14 26 12 23 12 21.5V18M18 26C22 26 24 23 24 21.5V18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
          <div class="tool-label">MẶT ĐỨNG KIẾN TRÚC</div>
        </div>

        <!-- Button 3: Vault / Archway Eye -->
        <div class="tool-button" data-action="security" id="btn-security">
          <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 30V18C6 11.3726 11.3726 6 18 6C24.6274 6 30 11.3726 30 18V30" stroke="currentColor" stroke-width="1.2" opacity="0.5"/>
            <path d="M10 30V18C10 13.5817 13.5817 10 18 10C22.4183 10 26 13.5817 26 18V30" stroke="currentColor" stroke-width="0.8" opacity="0.3"/>
            <path d="M11 20C13.5 16.5 17.5 15 18 15C18.5 15 22.5 16.5 25 20C22.5 23.5 18.5 25 18 25C17.5 25 13.5 23.5 11 20Z" stroke="currentColor" stroke-width="1.5"/>
            <circle cx="18" cy="20" r="3.5" stroke="currentColor" stroke-width="1"/>
            <circle cx="18" cy="20" r="1.5" fill="currentColor"/>
          </svg>
          <div class="tool-label">KIỂM SOÁT AN NINH</div>
        </div>

        <!-- Button 4: DNA Villa Structure -->
        <div class="tool-button" data-action="analytics" id="btn-analytics">
          <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 24L18 12L30 24" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M11 24H25M18 12V24" stroke="currentColor" stroke-width="0.8" opacity="0.4"/>
            <path d="M12 28C14 26 14 20 18 20C22 20 22 14 24 12" stroke="currentColor" stroke-width="1" stroke-dasharray="1 2"/>
            <path d="M12 12C14 14 14 20 18 20C22 20 22 26 24 28" stroke="currentColor" stroke-width="1" stroke-dasharray="1 2"/>
            <circle cx="15.5" cy="17" r="1.5" fill="currentColor" />
            <circle cx="20.5" cy="23" r="1.5" fill="currentColor" />
            <circle cx="18" cy="20" r="2" fill="currentColor" />
          </svg>
          <div class="tool-label">CẤU TRÚC THIẾT KẾ</div>
        </div>

        <!-- Button 5: Fingerprint Target -->
        <div class="tool-button" data-action="target" id="btn-target">
          <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="7" y="7" width="22" height="22" rx="11" stroke="currentColor" stroke-width="1.2" opacity="0.6"/>
            <rect x="11" y="11" width="14" height="14" rx="7" stroke="currentColor" stroke-width="0.8" opacity="0.4"/>
            <path d="M18 14C19.5 14 20 15 20 16.5V20.5M16 16V20M14 18C14 17 15 15.5 18 15.5C21 15.5 22 17 22 18.5V22M18 24C16 24 13.5 23 13.5 20.5V19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M4 10V4H10M32 10V4H26M4 26V32H10M32 26V32H26" stroke="currentColor" stroke-width="1.5"/>
          </svg>
          <div class="tool-label">ĐO LƯỜNG HỆ THỐNG</div>
        </div>
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

  // Settings Panel on the Right (No gear at the bottom)
  const verticalToolStackFuturisticHTML = `
    <div class="vertical-tool-stack" id="right-tool-stack">
      <div class="tool-stack-header">
        <span>ĐO LƯỜNG</span>
      </div>
      <div class="tool-buttons-sub-stack" id="tool-sub-stack">
        <!-- Button 1: Retinal Compass -->
        <div class="tool-button" data-action="compass" id="btn-compass">
          <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="18" cy="18" r="14" stroke="currentColor" stroke-width="1" stroke-dasharray="2 3" opacity="0.6"/>
            <circle cx="18" cy="18" r="10" stroke="currentColor" stroke-width="1.5" />
            <circle cx="18" cy="18" r="6" stroke="currentColor" stroke-width="1" stroke-dasharray="8 4" />
            <path d="M18 2V8M18 28V34M2 18H8M28 18H34" stroke="currentColor" stroke-width="1" opacity="0.7"/>
            <circle cx="18" cy="18" r="2" fill="currentColor"/>
          </svg>
          <div class="tool-label">LA BÀN SINH TRẮC</div>
        </div>

        <!-- Button 2: Biometric Facade -->
        <div class="tool-button" data-action="facade" id="btn-facade">
          <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 8H28V30H8V8Z" stroke="currentColor" stroke-width="1" opacity="0.4"/>
            <path d="M13 8V30M18 8V30M23 8V30M8 14H28M8 20H28M8 26H28" stroke="currentColor" stroke-width="0.8" opacity="0.3"/>
            <path d="M15 15C15 14 16 12 18 12C20 12 21 14 21 15V22M13 18C13 16.5 14 15 15 15M23 18C23 16.5 22 15 21 15M11 20C11 19 12 18 13 18M25 20C25 19 24 18 23 18M18 26C14 26 12 23 12 21.5V18M18 26C22 26 24 23 24 21.5V18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
          <div class="tool-label">MẶT ĐỨNG KIẾN TRÚC</div>
        </div>

        <!-- Button 3: Vault Eye -->
        <div class="tool-button" data-action="security" id="btn-security">
          <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 30V18C6 11.3726 11.3726 6 18 6C24.6274 6 30 11.3726 30 18V30" stroke="currentColor" stroke-width="1.2" opacity="0.5"/>
            <path d="M10 30V18C10 13.5817 13.5817 10 18 10C22.4183 10 26 13.5817 26 18V30" stroke="currentColor" stroke-width="0.8" opacity="0.3"/>
            <path d="M11 20C13.5 16.5 17.5 15 18 15C18.5 15 22.5 16.5 25 20C22.5 23.5 18.5 25 18 25C17.5 25 13.5 23.5 11 20Z" stroke="currentColor" stroke-width="1.5"/>
            <circle cx="18" cy="20" r="3.5" stroke="currentColor" stroke-width="1"/>
            <circle cx="18" cy="20" r="1.5" fill="currentColor"/>
          </svg>
          <div class="tool-label">KIỂM SOÁT AN NINH</div>
        </div>

        <!-- Button 4: DNA Structure -->
        <div class="tool-button" data-action="analytics" id="btn-analytics">
          <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 24L18 12L30 24" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M11 24H25M18 12V24" stroke="currentColor" stroke-width="0.8" opacity="0.4"/>
            <path d="M12 28C14 26 14 20 18 20C22 20 22 14 24 12" stroke="currentColor" stroke-width="1" stroke-dasharray="1 2"/>
            <path d="M12 12C14 14 14 20 18 20C22 20 22 26 24 28" stroke="currentColor" stroke-width="1" stroke-dasharray="1 2"/>
            <circle cx="15.5" cy="17" r="1.5" fill="currentColor" />
            <circle cx="20.5" cy="23" r="1.5" fill="currentColor" />
            <circle cx="18" cy="20" r="2" fill="currentColor" />
          </svg>
          <div class="tool-label">CẤU TRÚC THIẾT KẾ</div>
        </div>

        <!-- Button 5: Fingerprint Target -->
        <div class="tool-button" data-action="target" id="btn-target">
          <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="7" y="7" width="22" height="22" rx="11" stroke="currentColor" stroke-width="1.2" opacity="0.6"/>
            <rect x="11" y="11" width="14" height="14" rx="7" stroke="currentColor" stroke-width="0.8" opacity="0.4"/>
            <path d="M18 14C19.5 14 20 15 20 16.5V20.5M16 16V20M14 18C14 17 15 15.5 18 15.5C21 15.5 22 17 22 18.5V22M18 24C16 24 13.5 23 13.5 20.5V19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M4 10V4H10M32 10V4H26M4 26V32H10M32 26V32H26" stroke="currentColor" stroke-width="1.5"/>
          </svg>
          <div class="tool-label">ĐO LƯỜNG HỆ THỐNG</div>
        </div>
      </div>
    </div>
  `;

  // Left Collapsible Sidebar Navigation HTML
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
    const slider = document.getElementById("switcher-slider");
    if (!classicSeg || !futuristicSeg || !slider) return;

    requestAnimationFrame(() => {
      const activeSeg = layoutMode === "classic" ? classicSeg : futuristicSeg;
      classicSeg.classList.toggle("active", layoutMode === "classic");
      futuristicSeg.classList.toggle("active", layoutMode === "futuristic");

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
      if (child.id !== "layout-switcher" && !child.innerHTML.includes("<defs>")) {
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
    } else {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = settingsToggleFuturisticHTML + verticalToolStackFuturisticHTML + sidebarNavFuturisticHTML;
      while (tempDiv.firstChild) {
        uiWrapper.appendChild(tempDiv.firstChild);
      }
      setupFuturisticListeners();
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

    const toolButtons = document.querySelectorAll(".tool-button");
    toolButtons.forEach(btn => {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        const action = this.getAttribute("data-action");
        const toolLabel = this.querySelector(".tool-label");
        const labelText = toolLabel ? toolLabel.textContent : action.toUpperCase();
        showNotification(`Kích hoạt đo lường: ${labelText}`);

        this.style.transform = "scale(0.9)";
        setTimeout(() => {
          this.style.transform = "";
        }, 150);
      });
    });

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

    const toolButtons = document.querySelectorAll(".tool-button");
    toolButtons.forEach(btn => {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        const action = this.getAttribute("data-action");
        const toolLabel = this.querySelector(".tool-label");
        const labelText = toolLabel ? toolLabel.textContent : action.toUpperCase();
        showNotification(`Kích hoạt đo lường: ${labelText}`);

        this.style.transform = "scale(0.9)";
        setTimeout(() => {
          this.style.transform = "";
        }, 150);
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

  // Setup outer containers and Layout switch click actions
  function injectUI() {
    // 1. Create outer wrapper container
    const uiWrapper = document.createElement("div");
    uiWrapper.className = `modern-ui-overlay layout-${layoutMode}`;
    uiWrapper.innerHTML = gradientDefs + layoutSwitcherHTML;
    document.body.appendChild(uiWrapper);

    // Sync top-level body classes
    document.body.classList.remove("layout-classic", "layout-futuristic");
    document.body.classList.add(`layout-${layoutMode}`);

    // 2. Inject components for active layout mode
    injectLayoutComponents();

    // 3. Setup Layout Switcher listeners
    const classicSeg = document.getElementById("opt-layout-classic");
    const futuristicSeg = document.getElementById("opt-layout-futuristic");

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
        document.body.classList.remove("layout-classic", "layout-futuristic");
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

        showNotification(layoutMode === "classic" ? "Đã chuyển sang Giao diện Cổ điển" : "Đã chuyển sang Giao diện Tương lai");

      }, 300);
    };

    if (classicSeg && futuristicSeg) {
      classicSeg.addEventListener("click", () => handleSwitch("classic"));
      futuristicSeg.addEventListener("click", () => handleSwitch("futuristic"));
    }

    // 4. Initialize layout Switcher segments
    updateSwitcherUI();

    // -------------------------------------------------------
    // GLOBAL EVENT LISTENERS (registered ONCE, not per layout)
    // -------------------------------------------------------

    // Close submenus/panels when clicking outside any interactive UI element
    document.addEventListener("click", function (e) {
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
      if (e.target.closest(".layout-switcher-pill")) {
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

    const wireframeSVG = pin.isAmenity ? `
      <svg viewBox="0 0 100 40" fill="none" stroke="rgba(0, 242, 254, 0.6)" stroke-width="1">
        <rect x="10" y="5" width="40" height="30" rx="2" />
        <rect x="55" y="10" width="35" height="20" rx="10" />
        <line x1="10" y1="20" x2="50" y2="20" />
        <line x1="25" y1="5" x2="25" y2="35" />
      </svg>
    ` : `
      <svg viewBox="0 0 100 40" fill="none" stroke="rgba(0, 242, 254, 0.6)" stroke-width="1">
        <rect x="5" y="5" width="25" height="30" />
        <rect x="30" y="5" width="40" height="30" />
        <rect x="70" y="5" width="25" height="15" />
        <rect x="70" y="20" width="25" height="15" />
        <circle cx="17.5" cy="35" r="2" fill="#00f2fe" />
        <circle cx="50" cy="35" r="2" fill="#00f2fe" />
      </svg>
    `;

    container.innerHTML = `
      <div class="marker-ground-shadow"></div>
      <div class="marker-stem"></div>
      <div class="hologram-marker-hitbox" title="Click to view"></div>
      <div class="marker-prism-head">
        <div class="prism-content">${pin.label}</div>
      </div>
      <div class="marker-data-projection">
        <div class="projection-header">
          <div class="projection-title">${pin.title}</div>
          <div class="projection-tag">${pin.status}</div>
        </div>
        <div class="projection-body">
          <div class="projection-row">
            <span class="projection-label">DIỆN TÍCH:</span>
            <span class="projection-value">${pin.area}</span>
          </div>
          <div class="projection-row">
            <span class="projection-label">HỆ THỐNG:</span>
            <span class="projection-value">BIOMETRIC OK</span>
          </div>
        </div>
        <div class="projection-wireframe">
          ${wireframeSVG}
        </div>
      </div>
    `;

    const hitbox = container.querySelector(".hologram-marker-hitbox");
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
