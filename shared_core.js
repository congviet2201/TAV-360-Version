/**
 * shared_core.js — TAV Virtual Tour Shared Core
 * ============================================================
 * SINGLE SOURCE OF TRUTH for all project data and shared logic.
 * 
 * Architecture layers:
 *   shared_core.js  → window.TAV_CORE  (this file)
 *   modern_ui.js    → Desktop UI (consumes TAV_CORE)
 *   mobile_ui.js    → Mobile UI  (consumes TAV_CORE)
 * 
 * NEVER duplicate project data outside this file.
 * Desktop UI and Mobile UI must read from window.TAV_CORE.
 * ============================================================
 */

(function () {
  'use strict';

  // ============================================================
  // ① PANORAMA SCENE DATA — The canonical scene registry
  //    Add/remove/edit scenes HERE ONLY.
  //    Both Desktop and Mobile update automatically.
  // ============================================================
  const SCENES = [
    { id: 'node1',        title: 'Top View',         sub: 'Aerial · Day',  category: 'TOP VIEW',    thumb: 'image/thumbnails/thumb_PIN TOP.jpg',  action: 'node1'        },
    { id: 'node2',        title: 'BIRD VIEW 1',       sub: 'Drone · 80m',   category: 'BIRD VIEW',   thumb: 'image/thumbnails/PIN BIRD.jpg',        action: 'node2'        },
    { id: 'node3',        title: 'BIRD VIEW 2',       sub: 'Aerial · Dusk', category: 'BIRD VIEW',   thumb: 'image/thumbnails/PIN TOP NIGHT.jpg',   action: 'node3'        },
    { id: 'node4',        title: 'TAV PARK',          sub: 'Amenity',       category: 'AMENITIES',   thumb: 'image/thumbnails/PIN PARK.jpg',        action: 'node4'        },
    { id: 'node5',        title: 'TAV STREET',        sub: 'Amenity',       category: 'AMENITIES',   thumb: 'image/thumbnails/PIN STREET.jpg',      action: 'node5'        },
    { id: 'node6',        title: 'TAV PARK 2',        sub: 'Amenity',       category: 'AMENITIES',   thumb: 'image/thumbnails/PIN PARK 02.jpg',     action: 'node6'        },

    { id: 'node7',        title: 'TAV LIVING 2',      sub: 'Interior',      category: 'INTERIOR',    thumb: 'image/thumbnails/PIN LIVING 2.jpg',    action: 'node7'        },
    { id: 'node8',        title: 'TAV LIVING 1',      sub: 'Interior',      category: 'INTERIOR',    thumb: 'image/thumbnails/PIN LIVING.jpg',      action: 'node8'        },
    { id: 'node9',        title: 'TAV THÔNG TẦNG',    sub: 'Interior',      category: 'INTERIOR',    thumb: 'image/thumbnails/PIN THONG TANG.jpg',  action: 'node9'        },
    { id: 'node10',       title: 'BALCONY',           sub: 'Interior',      category: 'INTERIOR',    thumb: 'image/thumbnails/PIN BALCONY.jpg',     action: 'node10'       },
    { id: 'node11',       title: 'TAV WC',            sub: 'Interior',      category: 'INTERIOR',      thumb: 'image/thumbnails/PIN WC.jpg',            action: 'node11'       },

    // ── Amenities & Street Utilities ───────────────────────────────
    { id: 'node13',       title: 'TAV STREET 2',      sub: 'Street Utility',category: 'AMENITIES',   thumb: 'image/thumbnails/PIN STREET.jpg',      action: 'node13'       },
    { id: 'node14',       title: 'TAV STREET 3',      sub: 'Street Utility',category: 'AMENITIES',   thumb: 'image/thumbnails/PIN STREET.jpg',      action: 'node14'       },

    // ── Architecture ─────────────────────────────────────────────────
    { id: 'node12',       title: 'KIẾN TRÚC 1',       sub: 'Architecture',  category: 'ARCHITECTURE',  thumb: 'image/thumbnails/PIN KIEN TRUC 1.jpg',   action: 'node12'       },
    { id: 'node15',       title: 'KIẾN TRÚC 2',       sub: 'Architecture',  category: 'ARCHITECTURE',  thumb: 'image/thumbnails/PIN KIEN TRUC 1.jpg',   action: 'node15'       }
  ];

  // ============================================================
  // ② PROJECT CONFIGURATION — Nav structure & branding
  //    Consumed by Desktop layout HTML generators and Mobile nav.
  // ============================================================
  const PROJECT_CONFIG = {
    projectTitle: { top: 'TAV', sub: 'V I L L A' },
    navItems: {
      topview:      { label: 'Top View',       node: 'node1' },
      birdview:     { label: 'Bird View',       submenu: [ { node: 'node2', label: 'Bird View 1' }, { node: 'node3', label: 'Bird View 2' } ] },
      amenities:    { label: 'Tiện ích',        submenu: [ { node: 'node4', label: 'TAV Park' }, { node: 'node5', label: 'TAV Street' }, { node: 'node13', label: 'TAV Street 2' }, { node: 'node14', label: 'TAV Street 3' }, { node: 'node6', label: 'TAV Park 2' } ] },
      architecture: { label: 'Kiến Trúc',       submenu: [ { node: 'node12', label: 'Kiến Trúc 1' }, { node: 'node15', label: 'Kiến Trúc 2' } ] },
      interior:     { label: 'Nội Thất',        submenu: [ { node: 'node7', label: 'TAV Living 2' }, { node: 'node8', label: 'TAV Living 1' }, { node: 'node9', label: 'TAV Thông Tầng' }, { node: 'node10', label: 'TAV Balcony' }, { node: 'node11', label: 'TAV WC' } ] },
      surrounding:  { label: 'Liên kết vùng',   action: 'region-page' }
    },
    social: {
      facebook:  'https://www.facebook.com/profile.php?id=100068490675716',
      instagram: 'https://www.instagram.com/tav.visualization',
      zalo:      'https://zalo.me/0776469999'
    },
    audio: {
      src:  'Music/music.mp3',
      loop: true
    }
  };

  // ============================================================
  // ③ AUDIO SYSTEM — Shared across Desktop and Mobile
  // ============================================================
  const bgmAudio = new Audio(PROJECT_CONFIG.audio.src);
  bgmAudio.loop = PROJECT_CONFIG.audio.loop;
  let isMusicMuted = false;

  function tryAutoplay() {
    if (!isMusicMuted) {
      bgmAudio.play().then(() => {
        document.removeEventListener('click',      tryAutoplay);
        document.removeEventListener('touchstart', tryAutoplay);
      }).catch(() => {
        isMusicMuted = true;
        _syncAllMusicButtons(false);
        document.removeEventListener('click',      tryAutoplay);
        document.removeEventListener('touchstart', tryAutoplay);
      });
    }
  }

  function _syncAllMusicButtons(isPlaying) {
    document.querySelectorAll('[data-action="music"]').forEach(btn => {
      btn.classList.toggle('active',      isPlaying);
      btn.classList.toggle('active-tool', isPlaying);
    });
    // Sync hotspot buttons to always-on at startup
    document.querySelectorAll('[data-action="hotspots"]').forEach(btn => {
      btn.classList.add('active', 'active-tool');
    });
  }

  function toggleMusic() {
    isMusicMuted = !isMusicMuted;
    if (isMusicMuted) {
      bgmAudio.pause();
    } else {
      bgmAudio.play().catch(e => console.warn('[TAV_CORE] Audio play blocked:', e));
    }
    _syncAllMusicButtons(!isMusicMuted);
    return isMusicMuted;
  }

  tryAutoplay();

  // ============================================================
  // ④ PANORAMA NAVIGATOR — Safe scene navigation
  //    Both Desktop and Mobile call this instead of pano directly.
  // ============================================================
  function getPano() {
    return window.pano || null;
  }

  function navigateTo(action) {
    const pano = getPano();
    if (!pano) { console.warn('[TAV_CORE] pano not ready for action:', action); return; }

    if (action.startsWith('node') || action.startsWith('architecture-')) {
      pano.openNext('{' + action + '}');
    } else if (action === 'autorotate') {
      if (typeof window.toggleCustomAutorotate === 'function') {
        window.toggleCustomAutorotate();
      } else if (typeof pano.toggleAutorotate === 'function') {
        pano.toggleAutorotate();
      } else {
        pano.startAutorotate(0.15, 0, 0);
      }
    } else if (action === 'fullscreen') {
      if (!document.fullscreenElement) {
        (document.documentElement.requestFullscreen || document.documentElement.webkitRequestFullscreen || function(){}).call(document.documentElement);
      } else {
        (document.exitFullscreen || document.webkitExitFullscreen || function(){}).call(document);
      }
    }
    // Other actions (gallery, region, share, info) are handled by each UI layer
  }

  // ============================================================
  // ⑤ SCENE CHANGE EVENT SYSTEM
  //    Subscribe to scene changes from any layer.
  // ============================================================
  const _sceneChangeCallbacks = [];
  let _currentScene = null;

  function onSceneChange(callback) {
    if (typeof callback === 'function') _sceneChangeCallbacks.push(callback);
  }

  function _notifySceneChange(nodeId) {
    if (nodeId === _currentScene) return;
    _currentScene = nodeId;
    _sceneChangeCallbacks.forEach(cb => { try { cb(nodeId); } catch(e) {} });
  }

  // Poll pano for scene changes (compatible with pano2vr)
  setInterval(() => {
    const pano = getPano();
    if (!pano || typeof pano.getCurrentNode !== 'function') return;
    const node = pano.getCurrentNode();
    if (node) _notifySceneChange(node);
  }, 200);

  // ============================================================
  // ⑥ CATEGORY UTILITIES
  // ============================================================
  function getCategories() {
    return [...new Set(SCENES.map(s => s.category))];
  }

  function getScenesByCategory(category) {
    return SCENES.filter(s => s.category === category);
  }

  function getSceneById(id) {
    return SCENES.find(s => s.id === id) || null;
  }

  // ============================================================
  // ============================================================
  // ⑨ MULTI-LANGUAGE I18N SYSTEM (VI / EN)
  // ============================================================
  const I18N_DICTIONARY = {
    vi: {
      // Landing Page
      landing_welcome: "Chào Mừng Bạn Đến Với TAV",
      landing_eyebrow: "• TRẢI NGHIỆM THỰC TẾ ẢO ĐẲNG CẤP •",
      landing_title: "VR360 TOUR",
      landing_subtitle: "TRẢI NGHIỆM CÁC VERSION SA BÀN 360° CAO CẤP",
      landing_cta: "THAM QUAN DỰ ÁN",
      landing_hint: "Khám phá trải nghiệm 360°",
      
      // Main Nav Items
      nav_topview: "Top View",
      nav_birdview: "Bird View",
      nav_amenities: "Tiện Ích",
      nav_architecture: "Kiến Trúc",
      nav_interior: "Nội Thất",
      nav_surrounding: "Liên Kết Vùng",
      
      // Toolbar Tools & Controls
      tool_map: "Bản Đồ",
      tool_info: "Thông Tin Dự Án",
      tool_gallery: "Bộ Sưu Tập",
      tool_autorotate: "Tự Quay",
      tool_music: "Nhạc Nền",
      tool_hotspots: "Điểm Điều Hướng",
      tool_fullscreen: "Toàn Màn Hình",
      tool_share: "Chia Sẻ",
      tool_call: "Tư Vấn",
      tool_guide: "Hướng Dẫn",

      // Submenus & Categories
      cat_amenities: "Tiện Ích Đẳng Cấp",
      cat_architecture: "Kiến Trúc Độc Bản",
      cat_interior: "Nội Thất Sang Trọng",
      cat_regional: "Liên Kết Vùng Trọng Điểm",

      // Landmark & Regional Hotspots
      hs_marina_01: "Bến Du Thuyền",
      hs_highway6_01: "Quốc Lộ 6",
      hs_expressway_01: "Cao Tốc Hòa Lạc - Hòa Bình",
      hs_bridge_01: "Cầu Hòa Bình 5",
      hs_golf_01: "Sân Golf Hilltop Valley",
      hs_culture_01: "Làng Văn Hóa Các Dân Tộc",
      hs_spring_01: "Suối Ngọc Vua Bà",
      hs_hanoi_01: "HÀ NỘI",
      hs_hongoc_01: "Hồ Ngọc",
      hs_cauthongnhat_01: "Cầu Thống Nhất",
      hs_cauhuunghi_01: "Cầu Hữu Nghị",
      hs_benhvienhb_01: "Bệnh viện Hòa Bình",
      hs_phococuchinhlan_01: "Phố cổ Cù Chính Lan",
      hs_cauhoabinh4_02: "Cầu Hòa Bình 4",
      hs_truongchinhtri_01: "Trường Chính trị Hòa Bình",
      hs_caodangsongda_01: "Trường Cao đẳng Nghề Sông Đà",
      hs_cahoabinh_01: "CA Hòa Bình",
      hs_congvientuoitre_01: "Công viên tuổi trẻ",
      hs_quangtruongtt_01: "Quảng trường trung tâm",
      hs_cauhoabinh4_01: "Cầu Hòa Bình",
      hs_sanvandong_01: "Sân vận động",
      hs_trungtamyte_01: "Trung tâm y tế Hòa Bình",
      hs_caodanghoabinh_01: "Cao đẳng Hòa Bình",
      hs_dapthuydien_01: "Đập thủy điện Hòa Bình",

      // Tour Hotspots
      hs_park: "TAV Park",
      hs_street: "TAV Street",
      hs_park2: "TAV Park 2",
      hs_living2: "TAV Living 2",
      hs_living1: "TAV Living 1",
      hs_mezzanine: "TAV Thông Tầng",
      hs_balcony: "BALCONY",
      hs_wc: "TAV WC",
      hs_arch1: "Kiến Trúc 1",
      hs_arch2: "Kiến Trúc 2",
      hs_street2: "TAV Street 2",
      hs_street3: "TAV Street 3",

      // Guide Modal
      guide_title: "HƯỚNG DẪN THAM QUAN 360°",
      guide_step1_title: "Xoay Góc Nhìn",
      guide_step1_desc: "Kéo chuột hoặc vuốt màn hình để xoay không gian 360°",
      guide_step2_title: "Phóng To / Thu Nhỏ",
      guide_step2_desc: "Cuộn chuột hoặc dùng 2 ngón tay chụm lại để Zoom",
      guide_step3_title: "Di Chuyển Điểm Quan Sát",
      guide_step3_desc: "Nhấn vào các biểu tượng Hotspot phát sáng để đổi vị trí",
      guide_btn: "BẮT ĐẦU THAM QUAN",

      // Modals & Messages
      map_modal_title: "SƠ ĐỒ VỊ TRÍ & MẶT BẰNG 360°",
      gallery_modal_title: "BỘ SƯU TẬP HÌNH ẢNH DỰ ÁN",
      share_modal_title: "CHIA SẺ DỰ ÁN VR360",
      share_copy_btn: "Sao Chép Liên Kết",
      share_copied_toast: "Đã sao chép liên kết vào bộ nhớ tạm!",

      // General
      click_to_enter: "Nhấn để tham quan",
      click_to_fly: "Nhấn để bay",
      powered_by: "Phát triển bởi TAV"
    },
    en: {
      // Landing Page
      landing_welcome: "WELCOME TO TAV",
      landing_eyebrow: "• EXCLUSIVE VIRTUAL EXPERIENCE •",
      landing_title: "VR360 TOUR",
      landing_subtitle: "EXCLUSIVE 360° VIRTUAL MASTERPLAN EXPERIENCE",
      landing_cta: "EXPLORE TOUR",
      landing_hint: "Discover 360° Experience",
      
      // Main Nav Items
      nav_topview: "Top View",
      nav_birdview: "Bird View",
      nav_amenities: "Amenities",
      nav_architecture: "Architecture",
      nav_interior: "Interior",
      nav_surrounding: "Regional Map",
      
      // Toolbar Tools & Controls
      tool_map: "Map",
      tool_info: "Project Info",
      tool_gallery: "Gallery",
      tool_autorotate: "Auto Rotate",
      tool_music: "Music",
      tool_hotspots: "Hotspots",
      tool_fullscreen: "Fullscreen",
      tool_share: "Share",
      tool_call: "Consult",
      tool_guide: "Guide",

      // Submenus & Categories
      cat_amenities: "Premium Amenities",
      cat_architecture: "Unique Architecture",
      cat_interior: "Luxury Interior",
      cat_regional: "Key Regional Connections",

      // Landmark & Regional Hotspots
      hs_marina_01: "Marina Pier",
      hs_highway6_01: "National Highway 6",
      hs_expressway_01: "Hoa Lac - Hoa Binh Expressway",
      hs_bridge_01: "Hoa Binh Bridge 5",
      hs_golf_01: "Hilltop Valley Golf Course",
      hs_culture_01: "Ethnic Culture Village",
      hs_spring_01: "Suoi Ngoc Vua Ba Stream",
      hs_hanoi_01: "HA NOI",
      hs_hongoc_01: "Emerald Lake",
      hs_cauthongnhat_01: "Thong Nhat Bridge",
      hs_cauhuunghi_01: "Huu Nghi Bridge",
      hs_benhvienhb_01: "Hoa Binh Hospital",
      hs_phococuchinhlan_01: "Cu Chinh Lan Old Town",
      hs_cauhoabinh4_02: "Hoa Binh Bridge 4",
      hs_truongchinhtri_01: "Hoa Binh Political Academy",
      hs_caodangsongda_01: "Song Da Vocational College",
      hs_cahoabinh_01: "Hoa Binh Police HQ",
      hs_congvientuoitre_01: "Youth Park",
      hs_quangtruongtt_01: "Central Square",
      hs_cauhoabinh4_01: "Hoa Binh Bridge",
      hs_sanvandong_01: "Sports Stadium",
      hs_trungtamyte_01: "Hoa Binh Medical Center",
      hs_caodanghoabinh_01: "Hoa Binh College",
      hs_dapthuydien_01: "Hoa Binh Hydropower Dam",

      // Tour Hotspots
      hs_park: "TAV Park",
      hs_street: "TAV Street",
      hs_park2: "TAV Park 2",
      hs_living2: "TAV Living 2",
      hs_living1: "TAV Living 1",
      hs_mezzanine: "TAV Mezzanine",
      hs_balcony: "TAV Balcony",
      hs_wc: "TAV WC",
      hs_arch1: "Architecture 1",
      hs_arch2: "Architecture 2",
      hs_street2: "TAV Street 2",
      hs_street3: "TAV Street 3",

      // Guide Modal
      guide_title: "360° TOUR GUIDE",
      guide_step1_title: "Rotate View",
      guide_step1_desc: "Drag mouse or swipe screen to rotate 360° space",
      guide_step2_title: "Zoom In / Out",
      guide_step2_desc: "Scroll mouse wheel or pinch two fingers to Zoom",
      guide_step3_title: "Navigate Viewpoints",
      guide_step3_desc: "Click glowing Hotspot icons to switch positions",
      guide_btn: "START TOUR",

      // Modals & Messages
      map_modal_title: "360° LOCATION MAP & MASTERPLAN",
      gallery_modal_title: "PROJECT PHOTO GALLERY",
      share_modal_title: "SHARE VR360 TOUR",
      share_copy_btn: "Copy Link",
      share_copied_toast: "Link copied to clipboard!",

      // General
      click_to_enter: "Click to Enter",
      click_to_fly: "Click to Fly",
      powered_by: "Powered by TAV"
    }
  };

  let currentLang = localStorage.getItem('tav_language') || 'vi';

  function getI18nText(key, defaultVal) {
    const dict = I18N_DICTIONARY[currentLang] || I18N_DICTIONARY.vi;
    return dict[key] || defaultVal || key;
  }

  function getHotspotName(pin) {
    if (!pin) return '';
    const key = pin.id ? `hs_${pin.id}` : null;
    if (key && I18N_DICTIONARY[currentLang] && I18N_DICTIONARY[currentLang][key]) {
      return I18N_DICTIONARY[currentLang][key];
    }
    return pin.name || pin.title || '';
  }

  function switchLanguage(lang) {
    if (!lang || !I18N_DICTIONARY[lang]) lang = 'vi';
    currentLang = lang;
    window.currentLang = lang;
    localStorage.setItem('tav_language', lang);
    document.documentElement.setAttribute('lang', lang);

    const dict = I18N_DICTIONARY[lang];

    // ─── PRIMARY: Update all elements tagged with [data-i18n-key] ────────────
    // This is the reliable universal method — works across ALL layouts.
    document.querySelectorAll('[data-i18n-key]').forEach(el => {
      const key = el.getAttribute('data-i18n-key');
      if (dict[key] !== undefined) {
        el.textContent = dict[key];
      }
    });

    // ─── Language Toggle Buttons active state (landing + in-tour pill) ────────
    document.querySelectorAll('.landing-lang-btn, .lang-toggle-btn, .tav-lang-btn').forEach(btn => {
      const bLang = btn.getAttribute('data-lang');
      btn.classList.toggle('active', bLang === lang);
    });

    // ─── Landing Page extra elements (not tagged with data-i18n-key) ─────────
    const landingWelcome = document.querySelector('.landing-header-welcome-title');
    if (landingWelcome && !landingWelcome.hasAttribute('data-i18n-key'))
      landingWelcome.textContent = dict.landing_welcome;

    const landingEyebrow = document.querySelector('.landing-eyebrow');
    if (landingEyebrow && !landingEyebrow.hasAttribute('data-i18n-key'))
      landingEyebrow.textContent = dict.landing_eyebrow;

    const landingSubtitle = document.querySelector('.landing-subtitle');
    if (landingSubtitle && !landingSubtitle.hasAttribute('data-i18n-key')) {
      const subText = dict.landing_subtitle || '';
      landingSubtitle.innerHTML = subText.replace(/(SA BÀN 360°|SA BÀN)/gi, '<span class="landing-nowrap">$1</span>');
    }

    const landingCtaSpan = document.querySelector('#landing-cta-btn span');
    if (landingCtaSpan && !landingCtaSpan.hasAttribute('data-i18n-key'))
      landingCtaSpan.textContent = dict.landing_cta;

    const landingHintText = document.querySelector('.landing-hint-text');
    if (landingHintText && !landingHintText.hasAttribute('data-i18n-key'))
      landingHintText.textContent = dict.landing_hint;

    // ─── Fallback: Nav spans by data-id (covers layouts not yet tagged) ───────
    const navMap = {
      topview:      'nav_topview',
      birdview:     'nav_birdview',
      amenities:    'nav_amenities',
      architecture: 'nav_architecture',
      interior:     'nav_interior',
      surrounding:  'nav_surrounding',
    };
    Object.entries(navMap).forEach(([id, key]) => {
      // Update all span/label children of any [data-id="X"] that have NO data-i18n-key yet
      document.querySelectorAll(`[data-id="${id}"] span:not([data-i18n-key]), [data-id="${id}"] .nav-label:not([data-i18n-key])`).forEach(el => {
        if (dict[key]) el.textContent = dict[key];
      });
    });

    // ─── Fallback: Toolbar tooltips by data-action (covers untagged layouts) ──
    const toolActionMap = {
      info:       'tool_info',
      music:      'tool_music',
      images:     'tool_gallery',
      hotspots:   'tool_hotspots',
      autorotate: 'tool_autorotate',
      share:      'tool_share',
      call:       'tool_call',
      fullscreen: 'tool_fullscreen',
    };
    Object.entries(toolActionMap).forEach(([action, key]) => {
      document.querySelectorAll(`[data-action="${action}"] .tool-tooltip:not([data-i18n-key]), [data-action="${action}"] .tool-label:not([data-i18n-key])`)
        .forEach(el => {
          if (dict[key]) el.textContent = dict[key];
        });
      // Update title attributes on tool buttons
      document.querySelectorAll(`[data-action="${action}"]`).forEach(el => {
        if (el.hasAttribute('title') && dict[key]) el.setAttribute('title', dict[key]);
      });
    });

    // Dispatch global event for all custom components to re-render translations
    window.dispatchEvent(new CustomEvent('tavLanguageChanged', { detail: { lang, dict } }));

    console.log('[I18N] Language switched to:', lang.toUpperCase());
  }

  // ============================================================
  // ⑦ EXPOSE window.TAV_CORE — Public API
  // ============================================================
  window.TAV_CORE = Object.freeze({
    // Data
    scenes:  SCENES,
    config:  PROJECT_CONFIG,

    // Audio
    audio:         bgmAudio,
    get isMusicMuted() { return isMusicMuted; },
    toggleMusic:   toggleMusic,

    // Navigation
    getPano:       getPano,
    navigateTo:    navigateTo,

    // Scene events
    onSceneChange: onSceneChange,
    get currentScene() { return _currentScene; },

    // Utilities
    getCategories:       getCategories,
    getScenesByCategory: getScenesByCategory,
    getSceneById:        getSceneById,

    // i18n
    get currentLang() { return currentLang; },
    switchLanguage: switchLanguage,
    dictionary: I18N_DICTIONARY,
    getI18nText: getI18nText,
    getHotspotName: getHotspotName
  });

  // ============================================================
  // ⑧ BACKWARD COMPATIBILITY ALIASES
  //    Desktop and Mobile Layout 1 code references these globals.
  //    They now delegate to TAV_CORE — no duplication.
  // ============================================================
  window.TAV_SCENES            = SCENES;
  window.bgmAudio              = bgmAudio;
  window.isMusicMuted          = false; // kept for legacy read
  window.toggleGlobalMusic     = toggleMusic;

  // Expose global language function
  window.currentLang           = currentLang;
  window.switchLanguage        = switchLanguage;
  window.I18N_DICTIONARY       = I18N_DICTIONARY;
  window.getI18nText           = getI18nText;
  window.getHotspotName        = getHotspotName;

  console.log('[TAV_CORE] Shared Core initialized —', SCENES.length, 'scenes loaded. Language:', currentLang.toUpperCase());

})();
