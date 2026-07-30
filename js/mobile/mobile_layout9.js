/* js/mobile/mobile_layout9.js
   TAV Virtual Tour · Mobile Layout 9 — EDGE CONTROL (Pro Camera Viewfinder)
   Data source : window.TAV_CORE (shared_core.js)
   Architecture: Zero bottom toolbar. UI strictly on edges.
     - Right : Floating vertical glass rail dock
     - Left  : Slide-out scene drawer (trigger button only when closed)
     - Top-L : Compact collapsible mini map
     - Top-R : Independent floating compass
     - Side  : Floating tools panel (pops from right rail)
   API: window.MobileLayout9.init() / .destroy()
*/
(function () {
  'use strict';

  /* ── State ────────────────────────────────────────────────────────── */
  var _initialized  = false;
  var _isMapOpen    = false;
  var _isHotsVis    = true;
  var _isDrawerOpen = false;
  var _isToolsOpen  = false;
  var _compassRaf   = null;
  var _toastTimer   = null;
  var _activeCategory = '';

  /* ── SVG Icons ────────────────────────────────────────────────────── */
  var I = {
    compass:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="9" stroke-width="1.5"/><polygon points="12,4 15,12 12,20 9,12" fill="#5EEAD4" stroke="none"/></svg>',
    scenes:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="3" width="7" height="7" rx="1.5" stroke-width="1.8"/><rect x="14" y="3" width="7" height="7" rx="1.5" stroke-width="1.8"/><rect x="14" y="14" width="7" height="7" rx="1.5" stroke-width="1.8"/><rect x="3" y="14" width="7" height="7" rx="1.5" stroke-width="1.8"/></svg>',
    map:        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" stroke-width="1.8"/><line x1="8" y1="2" x2="8" y2="18" stroke-width="1.8"/><line x1="16" y1="6" x2="16" y2="22" stroke-width="1.8"/></svg>',
    eye:        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke-width="1.8"/><circle cx="12" cy="12" r="3" stroke-width="1.8"/></svg>',
    eyeOff:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" stroke-width="1.8"/><line x1="1" y1="1" x2="23" y2="23" stroke-width="1.8"/></svg>',
    gallery:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="3" width="18" height="18" rx="2" stroke-width="1.8"/><circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/><polyline points="21 15 16 10 5 21" stroke-width="1.8"/></svg>',
    tools:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="3" stroke-width="1.8"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" stroke-width="1.8"/></svg>',
    close:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><line x1="18" y1="6" x2="6" y2="18" stroke-width="2"/><line x1="6" y1="6" x2="18" y2="18" stroke-width="2"/></svg>',
    fullscreen: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" stroke-width="1.8"/></svg>',
    info:       '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10" stroke-width="1.8"/><line x1="12" y1="16" x2="12" y2="12" stroke-width="1.8"/><line x1="12" y1="8" x2="12.01" y2="8" stroke-width="2.5"/></svg>',
    link:       '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke-width="1.8"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke-width="1.8"/></svg>',
    music:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M9 18V5l12-2v13" stroke-width="1.8"/><circle cx="6" cy="18" r="3" stroke-width="1.8"/><circle cx="18" cy="16" r="3" stroke-width="1.8"/></svg>',
    facebook:   '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>',
    share:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="18" cy="5" r="3" stroke-width="1.8"/><circle cx="6" cy="12" r="3" stroke-width="1.8"/><circle cx="18" cy="19" r="3" stroke-width="1.8"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" stroke-width="1.8"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" stroke-width="1.8"/></svg>',
    phone:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.42 2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.08 6.08l.97-.97a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" stroke-width="1.8"/></svg>'
  };

  /* ── Build DOM ────────────────────────────────────────────────────── */
  function buildDOM() {
    var core   = window.TAV_CORE;
    var config = core.config;
    var cats   = core.getCategories();
    _activeCategory = cats[0] || '';

    /* Build drawer: categories + scene rows */
    var drawerInner = '';
    cats.forEach(function (catName) {
      var catScenes = core.getScenesByCategory(catName);
      drawerInner += '<div class="nm9-cat-section">';
      drawerInner += '<div class="nm9-cat-header">' + catName + '</div>';
      drawerInner += '<div class="nm9-scene-list">';
      catScenes.forEach(function (s) {
        var isActive = core.currentScene && core.currentScene.action === s.action;
        drawerInner += '<div class="nm9-scene-row' + (isActive ? ' active' : '') + '" data-action="' + s.action + '">';
        drawerInner += '<img src="' + s.thumb + '" alt="' + s.title + '" loading="lazy" onerror="this.src=\'preview.jpg\'" class="nm9-scene-thumb">';
        drawerInner += '<span class="nm9-scene-name">' + s.title + '</span>';
        drawerInner += '</div>';
      });
      drawerInner += '</div></div>';
    });

    /* Switcher pills */
    var pills = '';
    for (var i = 1; i <= 10; i++) {
      pills += '<button class="nm9-sw-pill' + (i === 9 ? ' active' : '') + '" data-layout-switch="' + i + '">L' + i + '</button>';
    }

    var isMuted = core.isMusicMuted;

    return (
      '<!-- Top Edge: Brand + Compass -->' +
      '<div class="nm9-top-bar">' +
        '<div class="nm9-brand-pill" id="nm9-brand-pill">' +
          '<div class="nm9-brand-dot"></div>' +
          '<div class="nm9-brand-text">' +
            '<span class="nm9-brand-title">' + (config.projectTitle ? config.projectTitle.top : 'TAV Villa') + '</span>' +
            '<span class="nm9-brand-sub">EDGE CONTROL · M9</span>' +
          '</div>' +
        '</div>' +
        '<div class="nm9-compass" id="nm9-compass-btn" title="Đặt lại hướng nhìn">' +
          '<div class="nm9-compass-svg" id="nm9-compass-dial">' + I.compass + '</div>' +
        '</div>' +
      '</div>' +

      '<!-- Left Edge: Scene Trigger Button -->' +
      '<button class="nm9-scene-trigger" id="nm9-scene-trigger" aria-label="Danh sách Cảnh">' +
        '<span class="nm9-trigger-icon">' + I.scenes + '</span>' +
        '<span class="nm9-trigger-label">Cảnh</span>' +
      '</button>' +

      '<!-- Left Slide-Out Scene Drawer -->' +
      '<div class="nm9-drawer" id="nm9-drawer">' +
        '<div class="nm9-drawer-head">' +
          '<span class="nm9-drawer-title">Danh Sách Cảnh</span>' +
          '<button class="nm9-drawer-close" id="nm9-drawer-close">' + I.close + '</button>' +
        '</div>' +
        '<div class="nm9-drawer-body">' + drawerInner + '</div>' +
      '</div>' +

      '<!-- Top-Left Mini Map Card -->' +
      '<div class="nm9-map-card" id="nm9-map-card">' +
        '<div class="nm9-map-head">' +
          '<span class="nm9-map-label">Bản Đồ</span>' +
          '<button class="nm9-map-close" id="nm9-map-close">' + I.close + '</button>' +
        '</div>' +
        '<div class="nm9-map-view" id="nm9-map-viewport">' +
          '<img src="image/Map_optimized.jpg" id="nm9-map-img" alt="Map" class="nm9-map-img">' +
          '<div id="nm9-map-radar" style="position:absolute;top:50%;left:50%;width:0;height:0;z-index:10;">' +
            '<div id="nm9-map-cone" style="position:absolute;width:0;height:0;border-left:14px solid transparent;border-right:14px solid transparent;border-top:28px solid rgba(94,234,212,0.55);transform-origin:bottom center;transform:translate(-50%,-100%);"></div>' +
            '<div style="position:absolute;width:8px;height:8px;background:#5EEAD4;border-radius:50%;transform:translate(-50%,-50%);"></div>' +
          '</div>' +
        '</div>' +
        '<div class="nm9-map-zoom">' +
          '<button class="nm9-map-zbtn" id="nm9-map-zin">+</button>' +
          '<button class="nm9-map-zbtn" id="nm9-map-zout">\u2212</button>' +
        '</div>' +
      '</div>' +

      '<!-- Right Edge Vertical Glass Rail Dock -->' +
      '<nav class="nm9-rail" id="nm9-rail">' +
        '<button class="nm9-rail-btn" id="nm9-rail-map" title="Bản Đồ">' + I.map + '</button>' +
        '<div class="nm9-rail-divider"></div>' +
        '<button class="nm9-rail-btn' + (_isHotsVis ? ' active' : '') + '" id="nm9-rail-hotspot" title="Hotspot">' + (_isHotsVis ? I.eye : I.eyeOff) + '</button>' +
        '<button class="nm9-rail-btn" id="nm9-rail-gallery" title="Thư Viện">' + I.gallery + '</button>' +
        '<div class="nm9-rail-divider"></div>' +
        '<button class="nm9-rail-btn" id="nm9-rail-tools" title="Công Cụ">' + I.tools + '</button>' +
      '</nav>' +

      '<!-- Right Floating Tools Panel -->' +
      '<div class="nm9-tools-panel" id="nm9-tools-panel">' +
        '<div class="nm9-tools-grid nm9-tools-grid-3col">' +
          '<button class="nm9-tool-tile" id="nm9-act-fullscreen">' + I.fullscreen + '<span>Toàn màn hình</span></button>' +
          '<button class="nm9-tool-tile" id="nm9-act-info">' + I.info + '<span>Thông tin</span></button>' +
          '<button class="nm9-tool-tile" id="nm9-act-link">' + I.link + '<span>Liên kết vùng</span></button>' +
          '<button class="nm9-tool-tile' + (!isMuted ? ' active' : '') + '" id="nm9-act-music">' + I.music + '<span>' + (isMuted ? 'Tắt nhạc' : 'Bật nhạc') + '</span></button>' +
          '<button class="nm9-tool-tile" id="nm9-act-contact">' + I.phone + '<span>Liên hệ</span></button>' +
        '</div>' +
        '<div class="nm9-tools-sep"></div>' +
        '<div class="nm9-socials">' +
          '<a href="https://facebook.com" target="_blank" class="nm9-social-btn">' + I.facebook + '</a>' +
          '<button class="nm9-social-btn" id="nm9-act-share">' + I.share + '</button>' +
        '</div>' +
        '<div class="nm9-tools-sep"></div>' +
        '<div class="nm9-switcher-row">' + pills + '</div>' +
      '</div>' +

      '<!-- Toast -->' +
      '<div class="nm9-toast" id="nm9-toast"></div>'
    );
  }

  /* ── Toast ────────────────────────────────────────────────────────── */
  function showToast(msg) {
    var t = document.getElementById('nm9-toast');
    if (!t) return;
    t.textContent = msg;
    t.classList.add('show');
    if (_toastTimer) clearTimeout(_toastTimer);
    _toastTimer = setTimeout(function () { t.classList.remove('show'); }, 2200);
  }

  /* ── Drawer ───────────────────────────────────────────────────────── */
  function setDrawer(open) {
    _isDrawerOpen = open;
    var drawer  = document.getElementById('nm9-drawer');
    var trigger = document.getElementById('nm9-scene-trigger');
    if (open) {
      drawer && drawer.classList.add('open');
      trigger && trigger.classList.add('active');
    } else {
      drawer && drawer.classList.remove('open');
      trigger && trigger.classList.remove('active');
    }
  }

  /* ── Mini Map ─────────────────────────────────────────────────────── */
  function setMap(open) {
    _isMapOpen = open;
    var card    = document.getElementById('nm9-map-card');
    var railBtn = document.getElementById('nm9-rail-map');
    if (open) {
      card    && card.classList.add('open');
      railBtn && railBtn.classList.add('active');
    } else {
      card    && card.classList.remove('open');
      railBtn && railBtn.classList.remove('active');
    }
  }

  /* ── Tools Panel ──────────────────────────────────────────────────── */
  function setTools(open) {
    _isToolsOpen = open;
    var panel   = document.getElementById('nm9-tools-panel');
    var railBtn = document.getElementById('nm9-rail-tools');
    if (open) {
      panel   && panel.classList.add('open');
      railBtn && railBtn.classList.add('active');
    } else {
      panel   && panel.classList.remove('open');
      railBtn && railBtn.classList.remove('active');
    }
  }

  /* ── Active Scene Sync ────────────────────────────────────────────── */
  function syncActiveScene(action) {
    document.querySelectorAll('#nm9-drawer .nm9-scene-row').forEach(function (row) {
      row.classList.toggle('active', row.getAttribute('data-action') === action);
    });
  }

  /* ── Compass Sync (RAF loop) ──────────────────────────────────────── */
  function startCompassSync() {
    var update = function () {
      var dial = document.getElementById('nm9-compass-dial');
      if (dial) {
        var angle = window.TAV_CORE.getCompassAngle();
        dial.style.transform = 'rotate(' + angle + 'deg)';
      }
      var cone = document.getElementById('nm9-map-cone');
      if (cone) {
        var angle2 = window.TAV_CORE.getCompassAngle();
        cone.style.transform = 'rotate(' + angle2 + 'deg)';
      }
      _compassRaf = requestAnimationFrame(update);
    };
    update();
  }

  function stopCompassSync() {
    if (_compassRaf) cancelAnimationFrame(_compassRaf);
    _compassRaf = null;
  }

  /* ── Event Listeners ──────────────────────────────────────────────── */
  function setupEvents() {
    var core = window.TAV_CORE;

    /* Brand pill → home scene */
    var brandBtn = document.getElementById('nm9-brand-pill');
    if (brandBtn) {
      brandBtn.addEventListener('click', function () {
        core.navigateTo('node1');
        showToast('Về Cảnh Đầu');
      });
    }

    /* Compass reset */
    var compassBtn = document.getElementById('nm9-compass-btn');
    if (compassBtn) {
      compassBtn.addEventListener('click', function () {
        core.resetView();
        showToast('Đặt lại hướng nhìn');
      });
    }

    /* Scene trigger button */
    var sceneTrigger = document.getElementById('nm9-scene-trigger');
    if (sceneTrigger) {
      sceneTrigger.addEventListener('click', function () {
        setDrawer(!_isDrawerOpen);
      });
    }

    /* Drawer close */
    var drawerClose = document.getElementById('nm9-drawer-close');
    if (drawerClose) {
      drawerClose.addEventListener('click', function () { setDrawer(false); });
    }

    /* Scene row click */
    var drawerBody = document.querySelector('#nm9-drawer .nm9-drawer-body');
    if (drawerBody) {
      drawerBody.addEventListener('click', function (e) {
        var row = e.target.closest('.nm9-scene-row');
        if (!row) return;
        var action = row.getAttribute('data-action');
        if (action) {
          core.navigateTo(action);
          var scene = core.scenes.find(function (s) { return s.action === action; });
          if (scene) showToast(scene.title);
          setDrawer(false);
        }
      });
    }

    /* Rail: Map */
    var railMap = document.getElementById('nm9-rail-map');
    if (railMap) {
      railMap.addEventListener('click', function () { setMap(!_isMapOpen); });
    }
    var mapClose = document.getElementById('nm9-map-close');
    if (mapClose) {
      mapClose.addEventListener('click', function () { setMap(false); });
    }

    /* Mini Map zoom & pan */
    var mapViewport = document.getElementById('nm9-map-viewport');
    if (mapViewport && window.MobileMinimapEngine) {
      var mapCtrl = window.MobileMinimapEngine.setupMap(mapViewport);
      var zoomIn  = document.getElementById('nm9-map-zin');
      var zoomOut = document.getElementById('nm9-map-zout');
      if (zoomIn)  zoomIn.addEventListener('click',  function (e) { e.stopPropagation(); mapCtrl && mapCtrl.zoomIn(); });
      if (zoomOut) zoomOut.addEventListener('click', function (e) { e.stopPropagation(); mapCtrl && mapCtrl.zoomOut(); });
    }

    /* Rail: Hotspot */
    var railHotspot = document.getElementById('nm9-rail-hotspot');
    if (railHotspot) {
      railHotspot.addEventListener('click', function () {
        _isHotsVis = !_isHotsVis;
        var pano = core.getPano ? core.getPano() : window.pano;
        if (pano) {
          try {
            var action2 = _isHotsVis ? 'show' : 'hide';
            pano.call(action2 + 'hotspots');
          } catch (ex) { /* noop */ }
        }
        railHotspot.innerHTML = _isHotsVis ? I.eye : I.eyeOff;
        railHotspot.classList.toggle('active', _isHotsVis);
        showToast(_isHotsVis ? 'Đã hiện Hotspot' : 'Đã ẩn Hotspot');
      });
    }

    /* Rail: Gallery → opens scene drawer */
    var railGallery = document.getElementById('nm9-rail-gallery');
    if (railGallery) {
      railGallery.addEventListener('click', function () { setDrawer(true); });
    }

    /* Rail: Tools */
    var railTools = document.getElementById('nm9-rail-tools');
    if (railTools) {
      railTools.addEventListener('click', function () { setTools(!_isToolsOpen); });
    }

    /* Tools Panel tiles */
    var actFullscreen = document.getElementById('nm9-act-fullscreen');
    if (actFullscreen) {
      actFullscreen.addEventListener('click', function () {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(function () {});
          showToast('Toàn màn hình');
        } else {
          document.exitFullscreen().catch(function () {});
        }
      });
    }

    var actInfo = document.getElementById('nm9-act-info');
    if (actInfo) {
      actInfo.addEventListener('click', function () {
        setTools(false);
        var infoModal = document.getElementById('project-info-modal');
        if (infoModal) {
          var isNowActive = !infoModal.classList.contains('active');
          infoModal.classList.toggle('active', isNowActive);
        } else {
          /* fallback: trigger through global action dispatcher */
          if (window.handleToolAction) window.handleToolAction('info');
        }
        showToast('Thông tin dự án');
      });
    }

    var actLink = document.getElementById('nm9-act-link');
    if (actLink) {
      actLink.addEventListener('click', function () {
        setTools(false);
        var regionPage = document.getElementById('region-page');
        if (regionPage) {
          document.body.classList.add('region-mode-active');
          var hamburger = document.querySelector('.region-hamburger');
          if (hamburger) hamburger.classList.remove('open');
          var menu = document.getElementById('region-menu-collapsible');
          if (menu) menu.classList.remove('open');
        }
        showToast('Liên kết vùng');
      });
    }

    var actContact = document.getElementById('nm9-act-contact');
    if (actContact) {
      actContact.addEventListener('click', function () {
        setTools(false);
        window.open('https://tav.vn/', '_blank');
        showToast('Đang mở trang liên hệ...');
      });
    }

    var actMusic = document.getElementById('nm9-act-music');
    if (actMusic) {
      actMusic.addEventListener('click', function () {
        core.toggleMusic();
        var muted = core.isMusicMuted;
        actMusic.classList.toggle('active', !muted);
        actMusic.querySelector('span').textContent = muted ? 'Tắt nhạc' : 'Bật nhạc';
        showToast(muted ? 'Đã tắt âm nhạc' : 'Đã bật âm nhạc');
      });
    }

    var actShare = document.getElementById('nm9-act-share');
    if (actShare) {
      actShare.addEventListener('click', function () {
        if (navigator.share) {
          navigator.share({ title: document.title, url: window.location.href }).catch(function () {});
        } else if (navigator.clipboard) {
          navigator.clipboard.writeText(window.location.href);
          showToast('Đã sao chép liên kết');
        }
      });
    }

    /* Layout switcher pills */
    document.querySelectorAll('#nm9-tools-panel .nm9-sw-pill').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var target = parseInt(btn.getAttribute('data-layout-switch'), 10);
        if (window.switchMobileLayout) window.switchMobileLayout(target);
      });
    });

    /* TAV_CORE events */
    core.on('scenechange', function (scene) {
      if (scene) syncActiveScene(scene.action);
    });

    core.on('musicchange', function (muted) {
      var btn = document.getElementById('nm9-act-music');
      if (btn) {
        btn.classList.toggle('active', !muted);
        btn.querySelector('span').textContent = muted ? 'Tắt nhạc' : 'Bật nhạc';
      }
    });
  }

  /* ── Public API ───────────────────────────────────────────────────── */
  window.MobileLayout9 = {
    init: function () {
      if (_initialized) return;
      if (!window.TAV_CORE) {
        console.error('[MobileLayout9] TAV_CORE is not available!');
        return;
      }

      /* Hide desktop UI */
      var style = document.createElement('style');
      style.id = 'ml9-desktop-hide';
      style.textContent =
        'html body #modern-ui-container, html body #modern-ui-overlay,' +
        'html body .prism-nav-container, html body .prism-dock,' +
        'html body .prism-header-pill, html body .prism-bottom-dock,' +
        'html body .modern-header-pill, html body #modern-dock-container,' +
        'html body .prism-dock-container, html body .prism-nav-wrapper,' +
        'html body .prism-tool-container, html body .prism-dock-item,' +
        'html body .prism-nav-item, html body #sidebar-container,' +
        'html body #horizontal-nav-bar, html body #command-bottom-ribbon,' +
        'html body .modern-ui-sidebar, html body .v-rail-container,' +
        'html body .bottom-nav-container, html body .aurora-nav-container,' +
        'html body .aurora-tool-panel, html body .pc-container,' +
        'html body #mobile-ui-overlay, html body #ml2-overlay,' +
        'html body #ml3-overlay, html body #ml4-overlay, html body #ml5-overlay,' +
        'html body #ml6-overlay, html body #ml7-overlay, html body #ml8-overlay,' +
        'html body #ml10-overlay,' +
        'html body #compass-widget, html body .compass-widget,' +
        'html body #minimap-widget, html body .minimap-widget { display:none!important; }';
      document.head.appendChild(style);

      /* Create overlay */
      var overlay = document.createElement('div');
      overlay.id = 'ml9-overlay';
      overlay.innerHTML = buildDOM();
      document.body.appendChild(overlay);

      setupEvents();
      startCompassSync();

      /* Sync initial active scene */
      if (window.TAV_CORE.currentScene) {
        syncActiveScene(window.TAV_CORE.currentScene.action);
      }

      _initialized = true;
      console.log('[MobileLayout9] Initialized — EDGE CONTROL Architecture');
    },

    destroy: function () {
      stopCompassSync();
      if (_toastTimer) clearTimeout(_toastTimer);
      var overlay = document.getElementById('ml9-overlay');
      if (overlay) overlay.remove();
      var style = document.getElementById('ml9-desktop-hide');
      if (style) style.remove();
      _initialized  = false;
      _isMapOpen    = false;
      _isHotsVis    = true;
      _isDrawerOpen = false;
      _isToolsOpen  = false;
      console.log('[MobileLayout9] Destroyed');
    }
  };

})();
