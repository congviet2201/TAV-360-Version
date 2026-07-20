function initMobileUI() {
  if (window.innerWidth > 1024) return;
  
  // Hide ALL Desktop UIs
  const desktopSelectors = ['#ui-wrapper', '#minimap-widget', '#compass-widget', '.layout-switcher-wrapper', '#layout-switcher-wrapper', '.layout-switcher-trigger', '.bottom-nav-container', '.vertical-tool-stack', '.sidebar-container', '.gradient-floating-logo', '.cmd-top-ribbon', '.cmd-scene-explorer', '.cmd-spatial-control', '#cmd-top-ribbon', '#cmd-node-label', '#cmd-scene-name', '#cmd-coord-display', '#cmd-pan-val', '#cmd-tilt-val', '#cmd-scene-explorer', '#cmd-explorer-collapse-header', '#cmd-explorer-collapse', '#cmd-explorer-body', '#cmd-explorer-list', '#cmd-spatial-control', '#cmd-music-tile', '#cmd-hotspot-tile', '.cmd-right-nav', '.cmd-left-tools', '.cmd-bottom-dock', '.horizon-top-nav', '.horizon-bottom-nav', '.aurora-glass-nav', '.aurora-glass-toolbar', '#vision-left-dock', '#vision-right-dock', '.blueprint-floating-gallery-container', '#blueprint-gallery-container', '#blueprint-gallery-panel', '.premium-carousel-container', '.premium-scene-browser', '#premium-scene-browser', '.layout-floating-logo', '.gradient-quick-actions', '.quick-nav-panel', '.bottom-nav-bar', '.futuristic-settings-group', '.neo-unified-trigger', '.aurora-nav-pin-btn', '.aurora-tool-pin-btn', '.compass-widget', '.horizon-dock', '.prism-nav-wrapper', '.prism-tool-container', '.nexus-nav-wrapper', '.nexus-tool-container', '.monarch-nav-wrapper', '.monarch-command-panel', '.minimap-widget', '.blueprint-top-ribbon', '.rgl-neo-nav-wrapper', '.rgl-neo-tools-system', '.blueprint-layout-switcher'];
  
  const cssHide = document.createElement('style');
  cssHide.innerHTML = `@media screen and (max-width: 1024px) { ${desktopSelectors.join(', ')} { display: none !important; } }`;
  document.head.appendChild(cssHide);

  // Data Definition
  window.TAV_SCENES = [
    { id: "node1", title: "Top View", sub: "Aerial · Day", category: "TOP VIEW", thumb: "image/thumbnails/thumb_PIN TOP.jpg", action: "node1" },
    { id: "node2", title: "BIRD VIEW 1", sub: "Drone · 80m", category: "TOP VIEW", thumb: "image/thumbnails/PIN BIRD.jpg", action: "node2" },
    { id: "node3", title: "BIRD VIEW 2", sub: "Aerial · Dusk", category: "TOP VIEW", thumb: "image/thumbnails/PIN TOP NIGHT.jpg", action: "node3" },
    { id: "node4", title: "TAV PARK", sub: "Amenity", category: "AMENITIES", thumb: "image/thumbnails/PIN PARK.jpg", action: "node4" },
    { id: "node5", title: "TAV STREET", sub: "Amenity", category: "AMENITIES", thumb: "image/thumbnails/PIN STREET.jpg", action: "node5" },
    { id: "node6", title: "TAV PARK 2", sub: "Amenity", category: "AMENITIES", thumb: "image/thumbnails/PIN PARK 02.jpg", action: "node6" },
    { id: "architecture-1", title: "KIẾN TRÚC 1", sub: "Exterior", category: "ARCHITECTURE", thumb: "image/thumbnails/thumb_PIN TOP.jpg", action: "architecture-1" },
    { id: "architecture-2", title: "KIẾN TRÚC 2", sub: "Exterior", category: "ARCHITECTURE", thumb: "image/thumbnails/thumb_PIN TOP.jpg", action: "architecture-2" },
    { id: "architecture-3", title: "KIẾN TRÚC 3", sub: "Exterior", category: "ARCHITECTURE", thumb: "image/thumbnails/thumb_PIN TOP.jpg", action: "architecture-3" },
    { id: "node7", title: "TAV LIVING 2", sub: "Interior", category: "INTERIOR", thumb: "image/thumbnails/PIN LIVING 2.jpg", action: "node7" },
    { id: "node8", title: "TAV LIVING 1", sub: "Interior", category: "INTERIOR", thumb: "image/thumbnails/PIN LIVING.jpg", action: "node8" },
    { id: "node9", title: "TAV THÔNG TẦNG", sub: "Interior", category: "INTERIOR", thumb: "image/thumbnails/PIN THONG TANG.jpg", action: "node9" },
    { id: "node10", title: "BALCONY", sub: "Interior", category: "INTERIOR", thumb: "image/thumbnails/PIN BALCONY.jpg", action: "node10" },
    { id: "node11", title: "TAV WC", sub: "Interior", category: "INTERIOR", thumb: "image/thumbnails/PIN WC.jpg", action: "node11" }
  ];

  let isHotspotsHidden = false;

  const mobileUI = document.createElement("div");
  mobileUI.id = "mobile-ui-overlay";

  // Carousel HTML (Fixed: using data-action instead of data-node)
  let carouselHTML = window.TAV_SCENES.map(scene => `
    <div class="mob-carousel-item" data-action="${scene.action}" data-node="${scene.action}">
      <img src="${scene.thumb}" alt="${scene.title}" onerror="this.src='preview.jpg'">
      <div class="mob-carousel-text">
        <div class="mob-carousel-title">${scene.title}</div>
      </div>
    </div>
  `).join('');

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
        <button class="mob-grid-tool" data-action="music" id="mob-music-btn"> Âm nhạc </button>
            <button class="mob-grid-tool" data-action="hotspots" id="mob-hotspot-btn"> Điểm chạm </button>
        <button class="mob-grid-tool" data-action="share"> Chia sẻ </button>
        <button class="mob-grid-tool" data-action="contact"> Liên hệ </button>
        <button class="mob-grid-tool" data-action="info"> Thông tin </button>
      </div>
    </div>

    <div class="mob-side-panel" id="mob-nav-sheet">
      <div class="mob-sheet-handle"></div>
          <div class="mob-sheet-title">Tất cả Cảnh (Navigation)</div>
      <div class="mob-menu-list" id="mob-menu-list"></div>
    </div>
  `;

  document.body.appendChild(mobileUI);

  // Generate Menu List dynamically
  const categories = [...new Set(window.TAV_SCENES.map(s => s.category))];
  const menuList = document.getElementById("mob-menu-list");
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
    btn.addEventListener("click", () => {
      const action = btn.getAttribute("data-action");
      if (activeSheet) toggleSheet(activeSheet.id);
      
      if (action.startsWith("node") || action.startsWith("architecture-")) {
        if (window.pano) window.pano.openNext(`{${action}}`);
      } else {
        switch(action) {
          case "autorotate": if(window.pano) window.pano.startAutorotate(0.1, 2, 1); break;
          case "gallery": 
            const galleryBtn = document.querySelector('[data-action="images"]:not(.mob-grid-tool):not(.mob-tool-btn)');
            if (galleryBtn) galleryBtn.click();
            break;
          case "region": 
            const regionBtn = document.querySelector('[data-action="region-page"]:not(.mob-grid-tool):not(.mob-tool-btn)');
            if (regionBtn) regionBtn.click();
            break;
          case "contact": 
            const contactBtn = document.querySelector('[data-action="call"]:not(.mob-grid-tool):not(.mob-tool-btn)');
            if (contactBtn) contactBtn.click();
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
